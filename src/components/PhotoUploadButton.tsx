import { useRef, useState } from 'react'
import { uploadPhoto } from '../lib/photos'
import { isSupabaseConfigured } from '../lib/supabase'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface PhotoUploadButtonProps {
  onUploaded?: () => void
  onError?: (message: string) => void
  onSuccess?: (message: string) => void
  onVerticalWarning?: (width: number, height: number) => void
  className?: string
}

export function PhotoUploadButton({ onUploaded, onError, onSuccess, onVerticalWarning, className }: PhotoUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files?.length || uploading) return

    setUploading(true)
    let uploaded = 0

    try {
      for (const file of Array.from(files)) {
        const { photo, isVertical } = await uploadPhoto(file)
        uploaded += 1
        if (isVertical) onVerticalWarning?.(photo.width, photo.height)
        onSuccess?.(`Uploaded ${photo.width}×${photo.height} photo`)
      }
      if (uploaded > 0) onUploaded?.()
    } catch (e) {
      onError?.(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-amber-700">
        Photo upload is unavailable — set Supabase environment variables.
      </p>
    )
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
      />
      <Button
        type="button"
        variant="primary"
        className={className}
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Uploading…
          </>
        ) : (
          'Upload photo'
        )}
      </Button>
    </>
  )
}
