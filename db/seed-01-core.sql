-- Seed file 1 of 5: Core bank — Grammar, Vocabulary, General Knowledge
-- 5 questions × 3 categories × 3 difficulties = 45 rows
-- Run after schema.sql

INSERT INTO questions (bank, category, content) VALUES

-- =============================================================================
-- EASY ROUND
-- =============================================================================

-- Grammar (easy)
('core', 'grammar', '{"text": "Which word is a noun in this sentence: \"The dog barked loudly.\"", "difficulty": "easy", "answerKey": "dog"}'::jsonb),
('core', 'grammar', '{"text": "Choose the correct sentence:", "difficulty": "easy", "options": ["She go to school.", "She goes to school."], "answerKey": "b"}'::jsonb),
('core', 'grammar', '{"text": "What is the past tense of play?", "difficulty": "easy", "answerKey": "played"}'::jsonb),
('core', 'grammar', '{"text": "Fill in the blank: I ___ happy today.", "difficulty": "easy", "options": ["am", "are"], "answerKey": "a"}'::jsonb),
('core', 'grammar', '{"text": "Which punctuation mark ends a question?", "difficulty": "easy", "answerKey": "question mark (?)"}'::jsonb),

-- Vocabulary (easy)
('core', 'vocabulary', '{"text": "What is the opposite of hot?", "difficulty": "easy", "answerKey": "cold"}'::jsonb),
('core', 'vocabulary', '{"text": "What does tiny mean?", "difficulty": "easy", "answerKey": "very small"}'::jsonb),
('core', 'vocabulary', '{"text": "Which word means \"a place where books are kept\"?", "difficulty": "easy", "answerKey": "library"}'::jsonb),
('core', 'vocabulary', '{"text": "What is a synonym for happy?", "difficulty": "easy", "answerKey": "joyful/glad"}'::jsonb),
('core', 'vocabulary', '{"text": "What does brave mean?", "difficulty": "easy", "answerKey": "showing courage"}'::jsonb),

-- General Knowledge (easy)
('core', 'general_knowledge', '{"text": "How many days are there in a week?", "difficulty": "easy", "answerKey": "7"}'::jsonb),
('core', 'general_knowledge', '{"text": "What planet do we live on?", "difficulty": "easy", "answerKey": "Earth"}'::jsonb),
('core', 'general_knowledge', '{"text": "What color do you get when you mix red and blue?", "difficulty": "easy", "answerKey": "purple"}'::jsonb),
('core', 'general_knowledge', '{"text": "Which animal is known as the \"King of the Jungle\"?", "difficulty": "easy", "answerKey": "lion"}'::jsonb),
('core', 'general_knowledge', '{"text": "How many months are there in a year?", "difficulty": "easy", "answerKey": "12"}'::jsonb),

-- =============================================================================
-- MEDIUM ROUND
-- =============================================================================

-- Grammar (medium)
('core', 'grammar', '{"text": "Identify the adjective in this sentence: \"The beautiful garden attracted visitors.\"", "difficulty": "medium", "answerKey": "beautiful"}'::jsonb),
('core', 'grammar', '{"text": "Choose the correct form: Neither of the boys ___ present.", "difficulty": "medium", "options": ["were", "was"], "answerKey": "b"}'::jsonb),
('core', 'grammar', '{"text": "Rewrite in passive voice: \"The chef prepared the meal.\"", "difficulty": "medium", "answerKey": "The meal was prepared by the chef."}'::jsonb),
('core', 'grammar', '{"text": "What type of sentence is this: \"Please close the door.\"", "difficulty": "medium", "answerKey": "imperative"}'::jsonb),
('core', 'grammar', '{"text": "Fill in the blank: If I ___ enough money, I would travel the world.", "difficulty": "medium", "options": ["have", "had"], "answerKey": "b"}'::jsonb),

-- Vocabulary (medium)
('core', 'vocabulary', '{"text": "What is a synonym for ancient?", "difficulty": "medium", "answerKey": "old/antique"}'::jsonb),
('core', 'vocabulary', '{"text": "What does reluctant mean?", "difficulty": "medium", "answerKey": "unwilling or hesitant"}'::jsonb),
('core', 'vocabulary', '{"text": "Choose the correct meaning of abundant:", "difficulty": "medium", "options": ["Scarce", "Plenty", "Dangerous"], "answerKey": "b"}'::jsonb),
('core', 'vocabulary', '{"text": "What is the antonym of expand?", "difficulty": "medium", "answerKey": "contract/shrink"}'::jsonb),
('core', 'vocabulary', '{"text": "Use fortunate in a sentence.", "difficulty": "medium", "answerKey": "answers may vary"}'::jsonb),

-- General Knowledge (medium)
('core', 'general_knowledge', '{"text": "What is the capital of Australia?", "difficulty": "medium", "answerKey": "Canberra"}'::jsonb),
('core', 'general_knowledge', '{"text": "Which gas do plants absorb from the atmosphere?", "difficulty": "medium", "answerKey": "carbon dioxide"}'::jsonb),
('core', 'general_knowledge', '{"text": "Who wrote Romeo and Juliet?", "difficulty": "medium", "answerKey": "William Shakespeare"}'::jsonb),
('core', 'general_knowledge', '{"text": "Which continent is the largest by land area?", "difficulty": "medium", "answerKey": "Asia"}'::jsonb),
('core', 'general_knowledge', '{"text": "What is the chemical symbol for gold?", "difficulty": "medium", "answerKey": "Au"}'::jsonb),

-- =============================================================================
-- DIFFICULT ROUND
-- =============================================================================

-- Grammar (difficult)
('core', 'grammar', '{"text": "Identify the subordinate clause in this sentence: \"Although it was raining, they continued the match.\"", "difficulty": "difficult", "answerKey": "Although it was raining"}'::jsonb),
('core', 'grammar', '{"text": "Correct the error: \"Each of the students have completed their assignment.\"", "difficulty": "difficult", "answerKey": "Each of the students has completed their assignment."}'::jsonb),
('core', 'grammar', '{"text": "What is the difference between a gerund and a participle?", "difficulty": "difficult", "answerKey": "A gerund acts as a noun; a participle acts as an adjective or forms verb tenses"}'::jsonb),
('core', 'grammar', '{"text": "Rewrite using reported speech: She said, \"I have finished the project.\"", "difficulty": "difficult", "answerKey": "She said that she had finished the project"}'::jsonb),
('core', 'grammar', '{"text": "Identify the figure of speech: \"Time flies when you''re having fun.\"", "difficulty": "difficult", "answerKey": "idiom/metaphorical expression"}'::jsonb),

-- Vocabulary (difficult)
('core', 'vocabulary', '{"text": "Define ubiquitous.", "difficulty": "difficult", "answerKey": "present everywhere"}'::jsonb),
('core', 'vocabulary', '{"text": "What is the meaning of ephemeral?", "difficulty": "difficult", "answerKey": "short-lived"}'::jsonb),
('core', 'vocabulary', '{"text": "Provide a synonym for magnanimous.", "difficulty": "difficult", "answerKey": "generous"}'::jsonb),
('core', 'vocabulary', '{"text": "What does parsimonious mean?", "difficulty": "difficult", "answerKey": "excessively frugal/stingy"}'::jsonb),
('core', 'vocabulary', '{"text": "Use cognizant correctly in a sentence.", "difficulty": "difficult", "answerKey": "answers may vary"}'::jsonb),

-- General Knowledge (difficult)
('core', 'general_knowledge', '{"text": "Who developed the theory of relativity?", "difficulty": "difficult", "answerKey": "Albert Einstein"}'::jsonb),
('core', 'general_knowledge', '{"text": "What is the smallest unit of matter that retains the properties of an element?", "difficulty": "difficult", "answerKey": "atom"}'::jsonb),
('core', 'general_knowledge', '{"text": "In which year did the Apollo 11 Moon Landing occur?", "difficulty": "difficult", "answerKey": "1969"}'::jsonb),
('core', 'general_knowledge', '{"text": "What is the longest river in the world according to the most commonly accepted measurement?", "difficulty": "difficult", "answerKey": "Nile River (commonly accepted answer)"}'::jsonb),
('core', 'general_knowledge', '{"text": "Which layer of the Earth lies directly beneath the crust?", "difficulty": "difficult", "answerKey": "mantle"}'::jsonb);
