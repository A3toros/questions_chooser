import { getDb } from './db'

export async function submitRating(questionId: string, teacherId: string, vote: 'like' | 'dislike') {
  const sql = getDb()

  await sql`
    INSERT INTO ratings (question_id, teacher_id, vote)
    VALUES (${questionId}, ${teacherId}, ${vote})
    ON CONFLICT (question_id, teacher_id)
    DO UPDATE SET vote = ${vote}, updated_at = now()
  `

  await sql`SELECT refresh_question_scores(${questionId}::uuid)`

  const [question] = await sql`
    SELECT id, bank, category, content, likes, dislikes, net_score
    FROM questions WHERE id = ${questionId}
  `

  return { question, vote }
}
