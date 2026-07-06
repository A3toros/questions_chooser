-- Optional index for tie breaking question queries
CREATE INDEX IF NOT EXISTS idx_questions_is_tiebreaker
  ON questions (((content->>'isTiebreaker')))
  WHERE is_active = true;
