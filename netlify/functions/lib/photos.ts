import { getDb } from './db'

export async function getPhotos() {
  const sql = getDb()
  return sql`
    SELECT id, storage_path, url, width, height, mime_type, created_at
    FROM photos
    ORDER BY created_at DESC
    LIMIT 500
  `
}

export async function createPhoto(photo: {
  storagePath: string
  url: string
  width: number
  height: number
  mimeType?: string | null
}) {
  const sql = getDb()
  const [row] = await sql`
    INSERT INTO photos (storage_path, url, width, height, mime_type)
    VALUES (
      ${photo.storagePath},
      ${photo.url},
      ${photo.width},
      ${photo.height},
      ${photo.mimeType ?? null}
    )
    RETURNING id, storage_path, url, width, height, mime_type, created_at
  `
  return row
}

export async function deletePhotoById(id: string) {
  const sql = getDb()
  const [row] = await sql`
    DELETE FROM photos WHERE id = ${id}
    RETURNING id, storage_path
  `
  if (!row) throw new Error('Photo not found')
  return row
}
