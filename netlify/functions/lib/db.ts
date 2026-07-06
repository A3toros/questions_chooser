import { neon, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Required for Netlify Functions (Node) — without this, DB calls can hang → 504
neonConfig.webSocketConstructor = ws
neonConfig.fetchConnectionCache = true

let sql: ReturnType<typeof neon> | null = null

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set — add it to .env or Netlify env vars')
  if (!sql) sql = neon(url)
  return sql
}

export const ROUND_LIMITS = { easy: 20, medium: 15, difficult: 10 } as const
export const TIEBREAKER_ROUND_LIMITS = { easy: 1, medium: 1, difficult: 1 } as const

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

export async function pingDb(): Promise<boolean> {
  const db = getDb()
  await db`SELECT 1`
  return true
}
