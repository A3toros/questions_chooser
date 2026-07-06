import { getDb, ROUND_LIMITS, TIEBREAKER_LIMIT } from './db'

export async function getLeaderboard(bank?: string | null) {
  const sql = getDb()

  const rows = await sql`
    SELECT id, bank, category, content, likes, dislikes, net_score,
           content->>'text' AS text,
           content->>'difficulty' AS difficulty,
           content->'options' AS options,
           content->>'answerKey' AS answer_key,
           ROW_NUMBER() OVER (
             PARTITION BY content->>'difficulty'
             ORDER BY net_score DESC, likes DESC
           )::int AS rank
    FROM questions
    WHERE is_active = true
      AND net_score > 0
      AND COALESCE((content->>'isTiebreaker')::boolean, false) = false
      AND (${bank ?? null}::text IS NULL OR bank::text = ${bank ?? null})
    ORDER BY content->>'difficulty', net_score DESC, likes DESC
  `

  const rounds: Record<string, typeof rows> = { easy: [], medium: [], difficult: [] }
  for (const row of rows) {
    const d = row.difficulty as keyof typeof ROUND_LIMITS
    if (d in rounds && rounds[d].length < ROUND_LIMITS[d]) {
      rounds[d].push({ ...row, selected: true })
    }
  }

  const questions = rows.map((row) => {
    const d = row.difficulty as keyof typeof ROUND_LIMITS
    const limit = ROUND_LIMITS[d] ?? 0
    return { ...row, selected: row.rank <= limit && row.net_score > 0 }
  })

  return { rounds, questions, limits: ROUND_LIMITS }
}

export async function getTiebreakerLeaderboard() {
  const sql = getDb()

  const rows = await sql`
    SELECT id, bank, category, content, likes, dislikes, net_score,
           content->>'text' AS text,
           content->>'difficulty' AS difficulty,
           content->'options' AS options,
           content->>'answerKey' AS answer_key,
           ROW_NUMBER() OVER (
             ORDER BY net_score DESC, likes DESC
           )::int AS rank
    FROM questions
    WHERE is_active = true
      AND net_score > 0
      AND (content->>'isTiebreaker') = 'true'
    ORDER BY net_score DESC, likes DESC
  `

  const questions = rows.map((row) => ({
    ...row,
    selected: row.rank <= TIEBREAKER_LIMIT,
  }))

  return { questions, limit: TIEBREAKER_LIMIT }
}
