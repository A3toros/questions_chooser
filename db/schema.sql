-- VocabForm schema — question body in single JSONB `content` cell
-- Teachers vote like | dislike only; round lives in content.difficulty

CREATE TYPE question_category AS ENUM (
  'grammar',
  'vocabulary',
  'general_knowledge',
  'spelling',
  'conversation_completion',
  'pronunciation',
  'pop_culture'
);

CREATE TYPE bank_id AS ENUM ('core', 'literacy', 'mixed', 'tournament', 'set4', 'set5');

CREATE TYPE vote_type AS ENUM ('like', 'dislike');

CREATE TABLE questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank        bank_id NOT NULL DEFAULT 'core',
  category    question_category NOT NULL,
  content     JSONB NOT NULL,
  likes       INT NOT NULL DEFAULT 0,
  dislikes    INT NOT NULL DEFAULT 0,
  net_score   INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,

  CONSTRAINT content_has_text CHECK (content ? 'text' AND btrim(content->>'text') <> ''),
  CONSTRAINT content_has_difficulty CHECK (
    content->>'difficulty' IN ('easy', 'medium', 'difficult')
  )
);

CREATE TABLE ratings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  teacher_id  TEXT NOT NULL,
  vote        vote_type NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (question_id, teacher_id)
);

CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_bank ON questions(bank);
CREATE INDEX idx_questions_difficulty ON questions ((content->>'difficulty'));
CREATE INDEX idx_questions_content_gin ON questions USING GIN (content);
CREATE INDEX idx_ratings_question ON ratings(question_id);
CREATE INDEX idx_ratings_teacher ON ratings(teacher_id);
CREATE INDEX idx_questions_net_score ON questions (net_score DESC);
CREATE INDEX idx_questions_is_active ON questions (is_active);
CREATE INDEX idx_questions_active_bank_cat_diff ON questions (is_active, bank, category, (content->>'difficulty'));

-- Tie breaking: ranked per round via content.isTiebreaker + content.difficulty
CREATE INDEX idx_questions_tiebreaker_round ON questions ((content->>'difficulty'), net_score DESC)
  WHERE is_active = true AND (content->>'isTiebreaker') = 'true';
CREATE INDEX idx_questions_competition_round ON questions ((content->>'difficulty'), net_score DESC)
  WHERE is_active = true AND COALESCE((content->>'isTiebreaker')::boolean, false) = false;
CREATE INDEX idx_questions_tiebreaker_lookup ON questions ((content->>'difficulty'))
  WHERE is_active = true AND (content->>'isTiebreaker') = 'true';

CREATE OR REPLACE FUNCTION refresh_question_scores(p_question_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE questions q SET
    likes = COALESCE(s.likes, 0),
    dislikes = COALESCE(s.dislikes, 0),
    net_score = COALESCE(s.net_score, 0)
  FROM (
    SELECT
      COUNT(*) FILTER (WHERE vote = 'like') AS likes,
      COUNT(*) FILTER (WHERE vote = 'dislike') AS dislikes,
      COALESCE(SUM(CASE vote WHEN 'like' THEN 1 WHEN 'dislike' THEN -1 END), 0) AS net_score
    FROM ratings WHERE question_id = p_question_id
  ) s
  WHERE q.id = p_question_id;
END;
$$ LANGUAGE plpgsql;

CREATE VIEW question_scores AS
SELECT
  q.id,
  q.bank,
  q.category,
  q.content,
  q.likes,
  q.dislikes,
  q.net_score,
  q.content->>'text'       AS text,
  q.content->>'difficulty' AS difficulty,
  q.content->'options'     AS options,
  q.content->>'answerKey'  AS answer_key
FROM questions q
WHERE q.is_active = true;
