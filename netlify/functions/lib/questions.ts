import { getDb } from './db'

export async function getQuestions(params: {
  bank?: string | null
  category?: string | null
  difficulty?: string | null
  teacherId?: string | null
  unrated?: boolean
}) {
  const sql = getDb()
  const { bank, category, difficulty, teacherId, unrated } = params

  return sql`
    SELECT q.id, q.bank, q.category, q.content, q.likes, q.dislikes, q.net_score,
           r.vote AS my_vote
    FROM questions q
    LEFT JOIN ratings r ON r.question_id = q.id AND r.teacher_id = ${teacherId}
    WHERE q.is_active = true
      AND (${bank ?? null}::text IS NULL OR q.bank::text = ${bank ?? null})
      AND (${category ?? null}::text IS NULL OR q.category::text = ${category ?? null})
      AND (${difficulty ?? null}::text IS NULL OR q.content->>'difficulty' = ${difficulty ?? null})
      AND (${!unrated}::boolean OR ${teacherId ?? null}::text IS NULL OR NOT EXISTS (
        SELECT 1 FROM ratings rx WHERE rx.question_id = q.id AND rx.teacher_id = ${teacherId ?? null}
      ))
    ORDER BY q.created_at ASC
    LIMIT 500
  `
}

export async function createQuestions(
  questions: Array<{ bank: string; category: string; content: Record<string, unknown> }>
) {
  const sql = getDb()
  const inserted = []
  for (const q of questions) {
    const [row] = await sql`
      INSERT INTO questions (bank, category, content)
      VALUES (${q.bank}, ${q.category}, ${JSON.stringify(q.content)}::jsonb)
      RETURNING id, bank, category, content, likes, dislikes, net_score
    `
    inserted.push(row)
  }
  return inserted
}
