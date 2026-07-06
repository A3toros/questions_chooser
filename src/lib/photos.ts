import { deletePhotoMetadata, fetchPhotos, savePhotoMetadata } from './api'
import { PHOTOS_BUCKET, supabase } from './supabase'
import type { Photo } from '../types'

const JPEG_QUALITY = 0.95

const IMAGE_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'heic',
  'heif',
  'avif',
  'bmp',
  'tif',
  'tiff',
])

const UNIVERSAL_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp'])

const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  heic: 'image/heic',
  heif: 'image/heif',
  avif: 'image/avif',
  bmp: 'image/bmp',
  tif: 'image/tiff',
  tiff: 'image/tiff',
}

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.')
  }
  return supabase
}

function extensionFromName(name: string): string {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? parts.pop()! : ''
}

function baseNameFrom(file: File): string {
  return file.name.replace(/\.[^.]+$/i, '') || 'photo'
}

function isRecognizedFormat(file: File): boolean {
  if (file.type.startsWith('image/')) return true
  return IMAGE_EXTENSIONS.has(extensionFromName(file.name))
}

function isUniversallyDisplayable(file: File): boolean {
  const mime = mimeTypeFor(file)
  if (mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp') return true
  return UNIVERSAL_EXTENSIONS.has(extensionFromName(file.name))
}

function isHeicFile(file: File): boolean {
  const ext = extensionFromName(file.name)
  const mime = file.type.toLowerCase()
  return ext === 'heic' || ext === 'heif' || mime === 'image/heic' || mime === 'image/heif'
}

function mimeTypeFor(file: File): string {
  if (file.type && file.type !== 'application/octet-stream') return file.type
  return EXT_TO_MIME[extensionFromName(file.name)] ?? 'application/octet-stream'
}

function dimensionsFromImageElement(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('decode failed'))
    }
    img.src = url
  })
}

async function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  try {
    return await dimensionsFromImageElement(blob)
  } catch {
    if (typeof createImageBitmap === 'function') {
      const bitmap = await createImageBitmap(blob)
      const dims = { width: bitmap.width, height: bitmap.height }
      bitmap.close()
      return dims
    }
    throw new Error('Could not read image file')
  }
}

async function tryDecode(blob: Blob): Promise<{ width: number; height: number } | null> {
  try {
    return await getImageDimensions(blob)
  } catch {
    return null
  }
}

async function convertHeicToJpeg(file: File): Promise<File> {
  const { default: heic2any } = await import('heic2any')
  const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: JPEG_QUALITY })
  const blob = Array.isArray(result) ? result[0] : result
  return new File([blob], `${baseNameFrom(file)}.jpg`, { type: 'image/jpeg' })
}

async function tryHeicConversion(file: File): Promise<File | null> {
  try {
    return await convertHeicToJpeg(file)
  } catch {
    return null
  }
}

function canvasToJpegFile(canvas: HTMLCanvasElement, name: string): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not read image file'))
          return
        }
        resolve(new File([blob], `${name}.jpg`, { type: 'image/jpeg' }))
      },
      'image/jpeg',
      JPEG_QUALITY
    )
  })
}

async function rasterizeBitmapToJpeg(bitmap: ImageBitmap, name: string): Promise<File> {
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not read image file')
  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()
  return canvasToJpegFile(canvas, name)
}

async function rasterizeToJpeg(file: Blob, name: string): Promise<File> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file)
      return rasterizeBitmapToJpeg(bitmap, name)
    } catch {
      /* try Image element next */
    }
  }

  const url = URL.createObjectURL(file)
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = async () => {
        URL.revokeObjectURL(url)
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not read image file'))
            return
          }
          ctx.drawImage(img, 0, 0)
          resolve(await canvasToJpegFile(canvas, name))
        } catch (e) {
          reject(e)
        }
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Could not read image file'))
      }
      img.src = url
    })
  } catch (e) {
    URL.revokeObjectURL(url)
    throw e
  }
}

export interface PreparedPhoto {
  file: File
  width: number
  height: number
  isVertical: boolean
}

interface DecodedImage {
  file: File
  width: number
  height: number
}

/** Decode or convert to JPEG in-browser so every photo is readable and displayable. */
async function ensureReadableImage(file: File): Promise<DecodedImage> {
  const name = baseNameFrom(file)
  const decoded = await tryDecode(file)

  if (decoded && isRecognizedFormat(file) && isUniversallyDisplayable(file)) {
    return { file, ...decoded }
  }

  if (isHeicFile(file) || !isRecognizedFormat(file)) {
    const heicJpeg = await tryHeicConversion(file)
    if (heicJpeg) {
      const heicDims = await tryDecode(heicJpeg)
      if (heicDims) return { file: heicJpeg, ...heicDims }
    }
  }

  if (decoded) {
    const jpeg = await rasterizeToJpeg(file, name)
    const jpegDims = await tryDecode(jpeg)
    if (jpegDims) return { file: jpeg, ...jpegDims }
  }

  const heicJpeg = await tryHeicConversion(file)
  if (heicJpeg) {
    const heicDims = await tryDecode(heicJpeg)
    if (heicDims) return { file: heicJpeg, ...heicDims }
  }

  const jpeg = await rasterizeToJpeg(file, name)
  const jpegDims = await tryDecode(jpeg)
  if (jpegDims) return { file: jpeg, ...jpegDims }

  throw new Error('Could not read image file. Try a different photo.')
}

export async function preparePhotoForUpload(file: File): Promise<PreparedPhoto> {
  const { file: uploadFile, width, height } = await ensureReadableImage(file)
  return { file: uploadFile, width, height, isVertical: width <= height }
}

function extensionFromFile(file: File): string {
  const fromName = extensionFromName(file.name)
  if (fromName && /^[a-z0-9]+$/.test(fromName)) {
    if (fromName === 'jpeg') return 'jpg'
    return fromName
  }

  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/avif': 'avif',
  }
  return mimeMap[mimeTypeFor(file)] ?? 'jpg'
}

export async function uploadPhoto(file: File): Promise<{ photo: Photo; isVertical: boolean }> {
  const client = assertSupabase()
  const { file: uploadFile, width, height, isVertical } = await preparePhotoForUpload(file)

  const ext = extensionFromFile(uploadFile)
  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`
  const contentType = mimeTypeFor(uploadFile)

  const { error } = await client.storage.from(PHOTOS_BUCKET).upload(path, uploadFile, {
    contentType: contentType !== 'application/octet-stream' ? contentType : undefined,
    upsert: false,
  })

  if (error) throw new Error(error.message)

  const { data } = client.storage.from(PHOTOS_BUCKET).getPublicUrl(path)
  const url = data.publicUrl

  try {
    const { photo } = await savePhotoMetadata({
      storagePath: path,
      url,
      width,
      height,
      mimeType: contentType !== 'application/octet-stream' ? contentType : null,
    })
    return { photo, isVertical }
  } catch (e) {
    await client.storage.from(PHOTOS_BUCKET).remove([path])
    throw e
  }
}

export async function listPhotos(): Promise<Photo[]> {
  const { photos } = await fetchPhotos()
  return photos
}

export async function downloadPhoto(photo: Photo): Promise<void> {
  const res = await fetch(photo.url)
  if (!res.ok) throw new Error('Download failed')
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = photo.storage_path
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
}

export async function deletePhoto(photo: Photo): Promise<void> {
  if (supabase) {
    const { error } = await supabase.storage.from(PHOTOS_BUCKET).remove([photo.storage_path])
    if (error) throw new Error(error.message)
  }
  await deletePhotoMetadata(photo.id)
}
