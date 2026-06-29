import type { Handler } from '@netlify/functions'
import { pingDb } from './lib/db'
import { corsHeaders, error, json } from './lib/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  try {
    await pingDb()
    return json({ ok: true, db: 'connected' })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database unreachable'
    return error(msg, 503)
  }
}
