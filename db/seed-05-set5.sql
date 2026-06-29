-- Seed file 5 of 5: Set 5 — Easy (20) + Difficult (20) = 40 open-answer questions
-- No medium round in this set
--
-- If schema already exists:
--   ALTER TYPE question_category ADD VALUE IF NOT EXISTS 'pop_culture';
--   ALTER TYPE bank_id ADD VALUE IF NOT EXISTS 'set5';

INSERT INTO questions (bank, category, content) VALUES

-- =============================================================================
-- 1ST ROUND — EASY: General Knowledge & Pop Culture (10)
-- =============================================================================

('set5', 'general_knowledge', '{"number": 1, "text": "What''s the boiling temperature of water?", "difficulty": "easy", "answerKey": "100°C / 212°F"}'::jsonb),
('set5', 'general_knowledge', '{"number": 2, "text": "Name the 4 seasons of the year.", "difficulty": "easy", "answerKey": "spring, summer, autumn/fall, winter"}'::jsonb),
('set5', 'general_knowledge', '{"number": 3, "text": "What is the tallest mountain in Thailand?", "difficulty": "easy", "answerKey": "Doi Inthanon"}'::jsonb),
('set5', 'general_knowledge', '{"number": 4, "text": "Name the American president who freed the slaves.", "difficulty": "easy", "answerKey": "Abraham Lincoln"}'::jsonb),

('set5', 'pop_culture', '{"number": 5, "text": "What did Cinderella''s carriage turn into after midnight?", "difficulty": "easy", "answerKey": "pumpkin"}'::jsonb),
('set5', 'pop_culture', '{"number": 6, "text": "Who, apart from Thor, could lift his hammer?", "difficulty": "easy", "answerKey": "Vision / Captain America (answers may vary)"}'::jsonb),
('set5', 'pop_culture', '{"number": 7, "text": "Name the popular meme that is related to the bathroom.", "difficulty": "easy", "answerKey": "Skibidi toilet"}'::jsonb),
('set5', 'pop_culture', '{"number": 8, "text": "This pop singer released a song with a member of Black Pink; the song is about an apartment.", "difficulty": "easy", "answerKey": "APT. — Bruno Mars and Rosé"}'::jsonb),
('set5', 'pop_culture', '{"number": 9, "text": "What is the name of the protagonist of the popular game about mining and crafting?", "difficulty": "easy", "answerKey": "Steve"}'::jsonb),
('set5', 'pop_culture', '{"number": 10, "text": "This sport is famous for elbow strikes.", "difficulty": "easy", "answerKey": "Muay Thai"}'::jsonb),

-- =============================================================================
-- 1ST ROUND — EASY: Vocabulary (5)
-- =============================================================================

('set5', 'vocabulary', '{"number": 11, "text": "Getting your money back after returning the thing you bought to the store.", "difficulty": "easy", "answerKey": "refund"}'::jsonb),
('set5', 'vocabulary', '{"number": 12, "text": "An old person who doesn''t work anymore and receives money from the government.", "difficulty": "easy", "answerKey": "pensioner / retiree"}'::jsonb),
('set5', 'vocabulary', '{"number": 13, "text": "A self-assured person.", "difficulty": "easy", "answerKey": "confident / self-confident"}'::jsonb),
('set5', 'vocabulary', '{"number": 14, "text": "A person whose lack of thoughtfulness and care for other people causes inconvenience or harm to people.", "difficulty": "easy", "answerKey": "inconsiderate"}'::jsonb),
('set5', 'vocabulary', '{"number": 15, "text": "To speak about somebody behind their back.", "difficulty": "easy", "answerKey": "gossip / backbite"}'::jsonb),

-- =============================================================================
-- 1ST ROUND — EASY: Grammar (5)
-- =============================================================================

('set5', 'grammar', '{"number": 16, "text": "The police ___ chasing the criminal.", "difficulty": "easy", "answerKey": "are"}'::jsonb),
('set5', 'grammar', '{"number": 17, "text": "There ___ a pen on the table.", "difficulty": "easy", "answerKey": "is"}'::jsonb),
('set5', 'grammar', '{"number": 18, "text": "Find the mistake: She have a lot of friends.", "difficulty": "easy", "answerKey": "She has a lot of friends."}'::jsonb),

('set5', 'grammar', '{
  "number": 19,
  "text": "Shery ___ Terry yesterday at 5 pm.",
  "difficulty": "easy",
  "options": ["see", "will see", "has seen", "saw", "sow"],
  "answerKey": "d"
}'::jsonb),

('set5', 'grammar', '{"number": 20, "text": "What construction do we use to say that we often did something in the past, but don''t do that anymore?", "difficulty": "easy", "answerKey": "used to + infinitive"}'::jsonb),

-- =============================================================================
-- 3RD ROUND — DIFFICULT: General Knowledge & Pop Culture (10)
-- =============================================================================

('set5', 'general_knowledge', '{"number": 1, "text": "Who was the first person to step on the Moon?", "difficulty": "difficult", "answerKey": "Neil Armstrong"}'::jsonb),
('set5', 'general_knowledge', '{"number": 2, "text": "Name the longest wall on Earth.", "difficulty": "difficult", "answerKey": "Great Wall of China"}'::jsonb),
('set5', 'general_knowledge', '{"number": 3, "text": "What is the common name for sodium chloride?", "difficulty": "difficult", "answerKey": "salt"}'::jsonb),
('set5', 'general_knowledge', '{"number": 4, "text": "Who invented the light bulb?", "difficulty": "difficult", "answerKey": "Thomas Edison"}'::jsonb),
('set5', 'general_knowledge', '{"number": 5, "text": "Because of this Thai King''s self-sufficiency economy concept, many products are now being manufactured in Thailand instead of being imported. Name the king.", "difficulty": "difficult", "answerKey": "King Bhumibol Adulyadej (Rama IX)"}'::jsonb),

('set5', 'pop_culture', '{"number": 6, "text": "What is Lisa''s birth name? (Blackpink)", "difficulty": "difficult", "answerKey": "Lalisa Manobal / Pranpriya Manobal"}'::jsonb),
('set5', 'pop_culture', '{"number": 7, "text": "Name the famous actor from the meme who is \"Literally me\".", "difficulty": "difficult", "answerKey": "Ryan Gosling"}'::jsonb),
('set5', 'pop_culture', '{"number": 8, "text": "Name the famous painter who cut his ear off.", "difficulty": "difficult", "answerKey": "Vincent van Gogh"}'::jsonb),
('set5', 'pop_culture', '{"number": 9, "text": "This famous retired boxer used to rob people on the streets before becoming popular.", "difficulty": "difficult", "answerKey": "Mike Tyson"}'::jsonb),
('set5', 'pop_culture', '{"number": 10, "text": "German rock band Rammstein characterized American culture with this one sentence.", "difficulty": "difficult", "answerKey": "We''re all living in Amerika / This is not a love song"}'::jsonb),

-- =============================================================================
-- 3RD ROUND — DIFFICULT: Vocabulary (5)
-- =============================================================================

('set5', 'vocabulary', '{"number": 11, "text": "To soak up liquid (like a sponge).", "difficulty": "difficult", "answerKey": "absorb"}'::jsonb),
('set5', 'vocabulary', '{"number": 12, "text": "To publicly support a cause or policy.", "difficulty": "difficult", "answerKey": "advocate"}'::jsonb),
('set5', 'vocabulary', '{"number": 13, "text": "A secret agreement to act together (often against somebody else) to achieve a common goal.", "difficulty": "difficult", "answerKey": "conspiracy / collusion"}'::jsonb),
('set5', 'vocabulary', '{"number": 14, "text": "We describe something that requires a great deal of effort, something difficult and tiring as:", "difficulty": "difficult", "answerKey": "arduous / laborious / exhausting"}'::jsonb),
('set5', 'vocabulary', '{"number": 15, "text": "To gain possession of something, to obtain.", "difficulty": "difficult", "answerKey": "acquire / obtain"}'::jsonb),

-- =============================================================================
-- 3RD ROUND — DIFFICULT: Grammar (5)
-- =============================================================================

('set5', 'grammar', '{"number": 16, "text": "What is the past form (V2) of the verb cost?", "difficulty": "difficult", "answerKey": "cost"}'::jsonb),
('set5', 'grammar', '{"number": 17, "text": "Form an adverb from the adjective \"fast\".", "difficulty": "difficult", "answerKey": "fast (fast can function as an adverb)"}'::jsonb),
('set5', 'grammar', '{"number": 18, "text": "Find the mistake: \"Gentrification leave thousands of people unable to pay the increasing rent.\"", "difficulty": "difficult", "answerKey": "Gentrification leaves thousands of people unable to pay the increasing rent."}'::jsonb),
('set5', 'grammar', '{"number": 19, "text": "Put the following sentence into passive voice: \"The strong current brought the bottle to the shore.\"", "difficulty": "difficult", "answerKey": "The bottle was brought to the shore by the strong current."}'::jsonb),
('set5', 'grammar', '{"number": 20, "text": "What grammatical construction do we usually use to fantasize about the present or future?", "difficulty": "difficult", "answerKey": "second conditional (If I were / If I had...)"}'::jsonb);
