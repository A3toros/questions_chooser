import type { Handler } from '@netlify/functions'
import { getLeaderboard, getTiebreakerLeaderboard } from './lib/leaderboard'
import { corsHeaders, error, json } from './lib/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'GET') return error('Method not allowed', 405)

  try {
    const p = event.queryStringParameters ?? {}
    const bank = p.bank ?? null
    const type = p.type ?? 'competition'

    const data = await Promise.race([
      type === 'tiebreaker' ? getTiebreakerLeaderboard() : getLeaderboard(bank),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 50000)),
    ])
    return json(data)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database error'
    return error(msg, 500)
  }
}
