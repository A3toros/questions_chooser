import type { Handler } from '@netlify/functions'
import { createQuestions, getQuestions } from './lib/questions'
import { corsHeaders, error, json } from './lib/http'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod === 'GET') {
    try {
      const p = event.queryStringParameters ?? {}
      const questions = await Promise.race([
        getQuestions({
          bank: p.bank ?? null,
          category: p.category ?? null,
          difficulty: p.difficulty ?? null,
          teacherId: p.teacherId ?? null,
          unrated: p.unrated === 'true',
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 50000)),
      ])
      return json({ questions })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Database error'
      return error(msg, 500)
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body: { questions?: Array<{ bank: string; category: string; content: Record<string, unknown> }> } =
        JSON.parse(event.body ?? '{}')
      if (!body.questions?.length) return error('questions array required')
      const questions = await Promise.race([
        createQuestions(body.questions),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 50000)),
      ])
      return json({ questions }, 201)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Database error'
      return error(msg, 500)
    }
  }

  return error('Method not allowed', 405)
}
