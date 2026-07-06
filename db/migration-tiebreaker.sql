-- Tie breaking support (run once on existing Neon DBs)
-- No new columns: tie breakers use content JSONB fields:
--   content->>'isTiebreaker' = 'true'
--   content->>'difficulty'   = 'easy' | 'medium' | 'difficult'
--   content->>'answerKey'    = free-text answer (required, no options)

-- Speed up tiebreaker leaderboard (filter + rank per round)
CREATE INDEX IF NOT EXISTS idx_questions_tiebreaker_round
  ON questions ((content->>'difficulty'), net_score DESC)
  WHERE is_active = true AND (content->>'isTiebreaker') = 'true';

-- Speed up competition leaderboard (exclude tie breakers)
CREATE INDEX IF NOT EXISTS idx_questions_competition_round
  ON questions ((content->>'difficulty'), net_score DESC)
  WHERE is_active = true
    AND COALESCE((content->>'isTiebreaker')::boolean, false) = false;

-- Speed up choosing-page fetch by round
CREATE INDEX IF NOT EXISTS idx_questions_tiebreaker_lookup
  ON questions ((content->>'difficulty'))
  WHERE is_active = true AND (content->>'isTiebreaker') = 'true';
