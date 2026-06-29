export { corsHeaders, ROUND_LIMITS, getDb, pingDb } from './db'

export function json(data: unknown, statusCode = 200) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data),
  }
}

export function error(message: string, statusCode = 400) {
  return json({ error: message }, statusCode)
}
