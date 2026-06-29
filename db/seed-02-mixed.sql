-- Seed file 2 of 5: Mixed bank — one question per category per level (A–D MC format)
-- 5 easy + 5 medium + 5 difficult + 1 bonus = 16 rows
-- Run after schema.sql (and seed-01-core.sql if applicable)
--
-- If schema already exists, run first:
--   ALTER TYPE question_category ADD VALUE IF NOT EXISTS 'conversation_completion';
--   ALTER TYPE bank_id ADD VALUE IF NOT EXISTS 'mixed';

INSERT INTO questions (bank, category, content) VALUES

-- =============================================================================
-- EASY (Questions 1–5)
-- =============================================================================

('mixed', 'grammar', '{
  "text": "Choose the correct sentence.",
  "difficulty": "easy",
  "options": ["She don''t like coffee.", "She doesn''t likes coffee.", "She doesn''t like coffee.", "She not like coffee."],
  "answerKey": "C"
}'::jsonb),

('mixed', 'vocabulary', '{
  "text": "What is the meaning of the word generous?",
  "difficulty": "easy",
  "options": ["Kind and willing to share", "Angry and rude", "Lazy and careless", "Quiet and shy"],
  "answerKey": "A"
}'::jsonb),

('mixed', 'spelling', '{
  "text": "Which word is spelled correctly?",
  "difficulty": "easy",
  "options": ["Recieve", "Receive", "Receeve", "Receve"],
  "answerKey": "B"
}'::jsonb),

('mixed', 'general_knowledge', '{
  "text": "Which planet is known as the Red Planet?",
  "difficulty": "easy",
  "options": ["Venus", "Jupiter", "Mars", "Saturn"],
  "answerKey": "C"
}'::jsonb),

('mixed', 'conversation_completion', '{
  "text": "A: How was your weekend?\nB: __________",
  "difficulty": "easy",
  "options": ["Thank you very much.", "It was great! I visited my grandparents.", "I am a student.", "See you tomorrow."],
  "answerKey": "B"
}'::jsonb),

-- =============================================================================
-- MEDIUM (Questions 6–10)
-- =============================================================================

('mixed', 'grammar', '{
  "text": "If I _____ enough money, I would buy a new laptop.",
  "difficulty": "medium",
  "options": ["have", "had", "has", "having"],
  "answerKey": "B"
}'::jsonb),

('mixed', 'vocabulary', '{
  "text": "Choose the synonym of vulnerable.",
  "difficulty": "medium",
  "options": ["Strong", "Protected", "Easily harmed", "Wealthy"],
  "answerKey": "C"
}'::jsonb),

('mixed', 'spelling', '{
  "text": "Which word is spelled correctly?",
  "difficulty": "medium",
  "options": ["Accommodate", "Acommodate", "Accomodate", "Accommadate"],
  "answerKey": "A"
}'::jsonb),

('mixed', 'general_knowledge', '{
  "text": "What is the largest ocean on Earth?",
  "difficulty": "medium",
  "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
  "answerKey": "D"
}'::jsonb),

('mixed', 'conversation_completion', '{
  "text": "A: Could you help me with this assignment?\nB: __________",
  "difficulty": "medium",
  "options": ["Sure, I''d be happy to help.", "I went to school yesterday.", "The weather is hot today.", "I don''t know your name."],
  "answerKey": "A"
}'::jsonb),

-- =============================================================================
-- DIFFICULT (Questions 11–15)
-- =============================================================================

('mixed', 'grammar', '{
  "text": "Identify the sentence with correct punctuation.",
  "difficulty": "difficult",
  "options": [
    "Although it was raining, we decided to continue the match.",
    "Although it was raining we decided, to continue the match.",
    "Although, it was raining we decided to continue the match.",
    "Although it was raining we, decided to continue the match."
  ],
  "answerKey": "A"
}'::jsonb),

('mixed', 'vocabulary', '{
  "text": "The word deteriorate most nearly means:",
  "difficulty": "difficult",
  "options": ["Improve", "Strengthen", "Worsen", "Expand"],
  "answerKey": "C"
}'::jsonb),

('mixed', 'spelling', '{
  "text": "Which word is spelled correctly?",
  "difficulty": "difficult",
  "options": ["Maintenance", "Maintenence", "Maintanance", "Maintinance"],
  "answerKey": "A"
}'::jsonb),

('mixed', 'general_knowledge', '{
  "text": "Who developed the theory of relativity?",
  "difficulty": "difficult",
  "options": ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"],
  "answerKey": "C"
}'::jsonb),

('mixed', 'conversation_completion', '{
  "text": "A: I heard you won the science competition. Congratulations!\nB: __________",
  "difficulty": "difficult",
  "options": ["That''s very kind of you. Thank you!", "I am watching television.", "The library closes at five.", "Yesterday was Monday."],
  "answerKey": "A"
}'::jsonb),

-- =============================================================================
-- BONUS
-- =============================================================================

('mixed', 'vocabulary', '{
  "text": "Choose the best word to complete the sentence: \"The city continued to _____ despite economic challenges.\"",
  "difficulty": "difficult",
  "options": ["Prosper", "Deteriorate", "Vacant", "Prompt"],
  "answerKey": "A",
  "isBonus": true
}'::jsonb);
