import type { Handler } from '@netlify/functions'
import { submitRating } from './lib/ratings'
import { corsHeaders, error, json } from './lib/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'POST') return error('Method not allowed', 405)

  let body: { questionId?: string; teacherId?: string; vote?: 'like' | 'dislike' }
  try {
    body = JSON.parse(event.body ?? '{}')
  } catch {
    return error('Invalid JSON')
  }

  const { questionId, teacherId, vote } = body
  if (!questionId || !teacherId || !vote) return error('questionId, teacherId, vote required')
  if (vote !== 'like' && vote !== 'dislike') return error('vote must be like or dislike')

  try {
    const result = await Promise.race([
      submitRating(questionId, teacherId, vote),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 50000)),
    ])
    return json(result)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database error'
    return error(msg, 500)
  }
}
