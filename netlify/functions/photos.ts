import type { Handler } from '@netlify/functions'
import { createPhoto, deletePhotoById, getPhotos } from './lib/photos'
import { corsHeaders, error, json } from './lib/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod === 'GET') {
    try {
      const photos = await getPhotos()
      return json({ photos })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Database error'
      return error(msg, 500)
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body: {
        action?: string
        id?: string
        storagePath?: string
        url?: string
        width?: number
        height?: number
        mimeType?: string | null
      } = JSON.parse(event.body ?? '{}')

      if (body.action === 'delete') {
        if (!body.id) return error('id is required')
        await deletePhotoById(body.id)
        return json({ ok: true })
      }

      if (!body.storagePath || !body.url || body.width == null || body.height == null) {
        return error('storagePath, url, width, and height are required')
      }

      const photo = await createPhoto({
        storagePath: body.storagePath,
        url: body.url,
        width: body.width,
        height: body.height,
        mimeType: body.mimeType,
      })
      return json({ photo }, 201)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Database error'
      return error(msg, e instanceof Error && e.message === 'Photo not found' ? 404 : 500)
    }
  }

  if (event.httpMethod === 'DELETE') {
    try {
      const id = event.queryStringParameters?.id
      if (!id) return error('id is required')
      await deletePhotoById(id)
      return json({ ok: true })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Database error'
      return error(msg, e instanceof Error && e.message === 'Photo not found' ? 404 : 500)
    }
  }

  return error('Method not allowed', 405)
}
