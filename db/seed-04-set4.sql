-- Seed file 4 of 5: Set 4 — Round 1 (easy) / Round 2 (medium) / Round 3 (hard)
-- 5 + 6 + 5 = 16 questions
--
-- If schema already exists:
--   ALTER TYPE bank_id ADD VALUE IF NOT EXISTS 'set4';

INSERT INTO questions (bank, category, content) VALUES

-- =============================================================================
-- ROUND 1 — EASY (5 questions)
-- =============================================================================

('set4', 'grammar', '{
  "number": 1,
  "text": "Identify the error in the sentence: Neither of the proposals have been approved.",
  "difficulty": "easy",
  "options": ["Neither", "proposals", "have", "approved"],
  "answerKey": "C"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 2,
  "text": "What does the expression \"the ball is in your court\" mean?",
  "difficulty": "easy",
  "options": [
    "You are playing a game.",
    "It is your turn to take action.",
    "You have won the competition.",
    "You should avoid responsibility."
  ],
  "answerKey": "B"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 3,
  "text": "What does \"break the ice\" mean?",
  "difficulty": "easy",
  "options": [
    "To damage something",
    "To begin a conversation",
    "To make someone angry",
    "To leave early"
  ],
  "answerKey": "B"
}'::jsonb),

('set4', 'general_knowledge', '{
  "number": 4,
  "text": "Which country has the largest population in the world as of 2026?",
  "difficulty": "easy",
  "options": ["United States", "Indonesia", "China", "India"],
  "answerKey": "D"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 5,
  "text": "Which word contains all five vowels exactly once and in alphabetical order?",
  "difficulty": "easy",
  "options": ["Education", "Sequoia", "Abstemious", "Ambitious"],
  "answerKey": "C"
}'::jsonb),

-- =============================================================================
-- ROUND 2 — MEDIUM (6 questions)
-- =============================================================================

('set4', 'grammar', '{
  "number": 1,
  "text": "Which sentence uses the passive voice?",
  "difficulty": "medium",
  "options": [
    "The committee approved the proposal.",
    "The proposal was approved by the committee.",
    "The committee is approving the proposal.",
    "The committee will approve the proposal."
  ],
  "answerKey": "B"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 2,
  "text": "Despite the witness''s seemingly candid testimony, the jury suspected she was being ______.",
  "difficulty": "medium",
  "options": ["forthright", "evasive", "sincere", "transparent"],
  "answerKey": "B"
}'::jsonb),

('set4', 'general_knowledge', '{
  "number": 3,
  "text": "Who wrote Romeo and Juliet?",
  "difficulty": "medium",
  "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
  "answerKey": "B"
}'::jsonb),

('set4', 'grammar', '{
  "number": 4,
  "text": "Which sentence contains a split infinitive?",
  "difficulty": "medium",
  "options": [
    "She promised to arrive early.",
    "She decided to carefully examine the evidence.",
    "She refused to answer.",
    "She wanted to leave."
  ],
  "answerKey": "B"
}'::jsonb),

('set4', 'general_knowledge', '{
  "number": 5,
  "text": "Which punctuation mark was invented first?",
  "difficulty": "medium",
  "options": ["Question mark", "Comma", "Apostrophe", "Quotation marks"],
  "answerKey": "B"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 6,
  "text": "They''re going to play _______ a very strong team, they better step _______ their game if they want to win.",
  "difficulty": "medium",
  "options": ["Against / up", "With / in", "For / down", "From / out"],
  "answerKey": "A"
}'::jsonb),

-- =============================================================================
-- ROUND 3 — HARD (5 questions)
-- =============================================================================

('set4', 'conversation_completion', '{
  "number": 1,
  "text": "Your friend asks: \"How did your interview go?\"\nYou reply: \"I wouldn''t hold my breath.\"\nWhat do you mean?",
  "difficulty": "difficult",
  "options": [
    "The interview room had poor air quality.",
    "You are optimistic about the result.",
    "You don''t expect a positive outcome soon.",
    "You forgot to answer some questions."
  ],
  "answerKey": "C"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 2,
  "text": "Which word does not belong in the same word family?",
  "difficulty": "difficult",
  "options": ["actual", "active", "activism", "act"],
  "answerKey": "A"
}'::jsonb),

('set4', 'grammar', '{
  "number": 3,
  "text": "\"Stop talking in the quiet zone immediately!\" What type of sentence is this?",
  "difficulty": "difficult",
  "options": ["imperative", "declarative", "exclamatory", "interrogative"],
  "answerKey": "A"
}'::jsonb),

('set4', 'grammar', '{
  "number": 4,
  "text": "What is the grammatical function of \"eating\" in the sentence: \"Eating too much can make you feel unwell\"?",
  "difficulty": "difficult",
  "options": [
    "infinitive as subject",
    "participle modifying subject",
    "gerund as subject",
    "gerund as object"
  ],
  "answerKey": "C"
}'::jsonb),

('set4', 'vocabulary', '{
  "number": 5,
  "text": "The educational committee _____________ a return to traditional teaching methods, seeing the benefits of that over the excessive use of technology in lessons.",
  "difficulty": "difficult",
  "options": ["irked", "prevented", "conjoined", "advocated"],
  "answerKey": "D"
}'::jsonb);
