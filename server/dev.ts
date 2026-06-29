/**
 * Local API server — npm run dev:api (used by dev:local)
 * Vite proxies /api → localhost:3001
 */
import 'dotenv/config'
import { createServer } from 'node:http'
import { createQuestions, getQuestions } from '../netlify/functions/lib/questions.ts'
import { submitRating } from '../netlify/functions/lib/ratings.ts'
import { getLeaderboard } from '../netlify/functions/lib/leaderboard.ts'
import { corsHeaders, pingDb } from '../netlify/functions/lib/db.ts'

const PORT = 3001

function send(res: import('node:http').ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { ...corsHeaders, 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

async function readBody(req: import('node:http').IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return Buffer.concat(chunks).toString()
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders)
    res.end()
    return
  }

  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`)
  const path = url.pathname.replace(/^\/api/, '')

  try {
    if (path === '/health' && req.method === 'GET') {
      await pingDb()
      return send(res, 200, { ok: true, db: 'connected' })
    }

    if (path === '/questions' && req.method === 'GET') {
      const questions = await getQuestions({
        bank: url.searchParams.get('bank'),
        category: url.searchParams.get('category'),
        difficulty: url.searchParams.get('difficulty'),
        teacherId: url.searchParams.get('teacherId'),
        unrated: url.searchParams.get('unrated') === 'true',
      })
      return send(res, 200, { questions })
    }

    if (path === '/questions' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req))
      if (!body.questions?.length) return send(res, 400, { error: 'questions array required' })
      const questions = await createQuestions(body.questions)
      return send(res, 201, { questions })
    }

    if (path === '/ratings' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req))
      const { questionId, teacherId, vote } = body
      if (!questionId || !teacherId || !vote) {
        return send(res, 400, { error: 'questionId, teacherId, vote required' })
      }
      const result = await submitRating(questionId, teacherId, vote)
      return send(res, 200, result)
    }

    if (path === '/leaderboard' && req.method === 'GET') {
      const data = await getLeaderboard(url.searchParams.get('bank'))
      return send(res, 200, data)
    }

    send(res, 404, { error: 'Not found' })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    console.error('[api]', msg)
    send(res, 500, { error: msg })
  }
})

server.listen(PORT, () => {
  console.log(`API server → http://localhost:${PORT}`)
  console.log(`Health     → http://localhost:${PORT}/api/health`)
  if (!process.env.DATABASE_URL) console.warn('⚠ DATABASE_URL not set in .env')
})
