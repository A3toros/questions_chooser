-- Seed file 3 of 5: Tournament bank — Easy / Elimination / Final (45 questions)
-- Easy round (1–15) → difficulty easy
-- Elimination round (16–30) → difficulty medium
-- Final round (31–45) → difficulty difficult
--
-- If schema already exists:
--   ALTER TYPE question_category ADD VALUE IF NOT EXISTS 'pronunciation';
--   ALTER TYPE bank_id ADD VALUE IF NOT EXISTS 'tournament';

INSERT INTO questions (bank, category, content) VALUES

-- =============================================================================
-- EASY ROUND (Questions 1–15)
-- =============================================================================

-- Grammar (1–5)
('tournament', 'grammar', '{"number": 1, "text": "Which sentence contains an adjective clause?", "difficulty": "easy", "options": ["I left because I was tired.", "The book that I borrowed is interesting.", "If it rains, we will stay home.", "She sings beautifully."], "answerKey": "B"}'::jsonb),
('tournament', 'grammar', '{"number": 2, "text": "Which connector shows contrast?", "difficulty": "easy", "options": ["Moreover", "Therefore", "However", "Furthermore"], "answerKey": "C"}'::jsonb),
('tournament', 'grammar', '{"number": 3, "text": "What do you call ''to + base form of the verb''?", "difficulty": "easy", "options": ["Gerund", "Infinitive", "Participle", "Clause"], "answerKey": "B"}'::jsonb),
('tournament', 'grammar', '{"number": 4, "text": "Which sentence contains an adverb clause?", "difficulty": "easy", "options": ["The woman who teaches English is kind.", "I stayed home because I was sick.", "The parked car is mine.", "The broken vase was expensive."], "answerKey": "B"}'::jsonb),
('tournament', 'grammar', '{"number": 5, "text": "Which sentence is grammatically correct?", "difficulty": "easy", "options": ["Neither the students nor the teacher were absent.", "Neither the students nor the teacher was absent.", "Neither the students nor the teacher are absent.", "Neither the students nor the teacher have been absent."], "answerKey": "B"}'::jsonb),

-- Spelling (6–10)
('tournament', 'spelling', '{"number": 6, "text": "Which word is spelled correctly?", "difficulty": "easy", "options": ["Accomodation", "Accommodation", "Acommodation", "Accommadation"], "answerKey": "B"}'::jsonb),
('tournament', 'spelling', '{"number": 7, "text": "Which word is spelled correctly?", "difficulty": "easy", "options": ["Priviledge", "Privelege", "Privilege", "Privilage"], "answerKey": "C"}'::jsonb),
('tournament', 'spelling', '{"number": 8, "text": "Which word is spelled correctly?", "difficulty": "easy", "options": ["Entrepreneur", "Entreprenuer", "Enterpreneur", "Entreperneur"], "answerKey": "A"}'::jsonb),
('tournament', 'spelling', '{"number": 9, "text": "Which word is spelled correctly?", "difficulty": "easy", "options": ["Miscellanious", "Miscellaneous", "Mischellaneous", "Miscelaneous"], "answerKey": "B"}'::jsonb),
('tournament', 'spelling', '{"number": 10, "text": "Which word is spelled correctly?", "difficulty": "easy", "options": ["Definately", "Definatly", "Definitely", "Definetely"], "answerKey": "C"}'::jsonb),

-- General Knowledge (11–15)
('tournament', 'general_knowledge', '{"number": 11, "text": "Who invented the telephone?", "difficulty": "easy", "options": ["Edison", "Tesla", "Alexander Graham Bell", "Marconi"], "answerKey": "C"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 12, "text": "What is the chemical symbol for gold?", "difficulty": "easy", "options": ["Ag", "Fe", "Au", "Go"], "answerKey": "C"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 13, "text": "Who developed the theory of relativity?", "difficulty": "easy", "options": ["Newton", "Galileo", "Einstein", "Hawking"], "answerKey": "C"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 14, "text": "Which invention is associated with Gutenberg?", "difficulty": "easy", "options": ["Steam Engine", "Printing Press", "Telephone", "Light Bulb"], "answerKey": "B"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 15, "text": "Which planet is known as the Red Planet?", "difficulty": "easy", "options": ["Venus", "Mars", "Jupiter", "Mercury"], "answerKey": "B"}'::jsonb),

-- =============================================================================
-- ELIMINATION ROUND (Questions 16–30) → medium
-- =============================================================================

-- Grammar (16–20)
('tournament', 'grammar', '{"number": 16, "text": "Which sentence contains a reduced adjective clause?", "difficulty": "medium", "options": ["Students who are studying in the library are quiet.", "Students studying in the library are quiet.", "Students study in the library.", "Students have studied in the library."], "answerKey": "B"}'::jsonb),
('tournament', 'grammar', '{"number": 17, "text": "Which sentence correctly uses ''consequently''?", "difficulty": "medium", "options": ["The road was flooded; consequently, classes were suspended.", "The road was flooded; however, classes were suspended.", "The road was flooded; moreover, classes were suspended.", "The road was flooded; likewise, classes were suspended."], "answerKey": "A"}'::jsonb),
('tournament', 'grammar', '{"number": 18, "text": "Which sentence contains an adjective clause?", "difficulty": "medium", "options": ["The scientist who discovered the element won a Nobel Prize.", "The scientist worked hard.", "The scientist arrived early.", "The scientist retired last year."], "answerKey": "A"}'::jsonb),
('tournament', 'grammar', '{"number": 19, "text": "Which sentence contains an adverb clause?", "difficulty": "medium", "options": ["The athlete who won the medal trained daily.", "The teacher whom we admire retired.", "We will leave when the ceremony ends.", "The damaged building was repaired."], "answerKey": "C"}'::jsonb),
('tournament', 'grammar', '{"number": 20, "text": "Which sentence is grammatically correct?", "difficulty": "medium", "options": ["Each of the students have submitted their work.", "Each of the students has submitted their work.", "Each of the students have submitted his work.", "Each of the students were submitted."], "answerKey": "B"}'::jsonb),

-- Spelling (21–24)
('tournament', 'spelling', '{"number": 21, "text": "Which word is spelled correctly?", "difficulty": "medium", "options": ["Conscientous", "Conscientious", "Consciencious", "Consientious"], "answerKey": "B"}'::jsonb),
('tournament', 'spelling', '{"number": 22, "text": "Which word is spelled correctly?", "difficulty": "medium", "options": ["Simultaneous", "Simultanious", "Similtaneous", "Simultanous"], "answerKey": "A"}'::jsonb),
('tournament', 'spelling', '{"number": 23, "text": "Which word is spelled correctly?", "difficulty": "medium", "options": ["Embarrasment", "Embarrassment", "Embarassment", "Embarasment"], "answerKey": "B"}'::jsonb),
('tournament', 'spelling', '{"number": 24, "text": "Which word is spelled correctly?", "difficulty": "medium", "options": ["Questionnaire", "Questionaire", "Questionnair", "Questionnare"], "answerKey": "A"}'::jsonb),

-- Pronunciation (25)
('tournament', 'pronunciation', '{"number": 25, "text": "Which word is pronounced /nkwannr/?", "difficulty": "medium", "options": ["Choir", "Chore", "Quire", "Char"], "answerKey": "A"}'::jsonb),

-- General Knowledge (26–30)
('tournament', 'general_knowledge', '{"number": 26, "text": "In what year did World War I begin?", "difficulty": "medium", "options": ["1912", "1914", "1916", "1918"], "answerKey": "B"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 27, "text": "Who formulated the laws of motion?", "difficulty": "medium", "options": ["Einstein", "Newton", "Darwin", "Pasteur"], "answerKey": "B"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 28, "text": "What is the largest organ in the human body?", "difficulty": "medium", "options": ["Liver", "Brain", "Skin", "Lungs"], "answerKey": "C"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 29, "text": "Which country first sent a human into space?", "difficulty": "medium", "options": ["USA", "Germany", "Soviet Union", "China"], "answerKey": "C"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 30, "text": "In what year did the Berlin Wall fall?", "difficulty": "medium", "options": ["1987", "1988", "1989", "1990"], "answerKey": "C"}'::jsonb),

-- =============================================================================
-- FINAL ROUND (Questions 31–45) → difficult
-- =============================================================================

-- Grammar — Error Identification (31–35)
('tournament', 'grammar', '{"number": 31, "text": "Which sentence contains an error?", "difficulty": "difficult", "options": ["Neither of the candidates who were invited responded.", "Neither of the candidates who was invited responded.", "Neither of the candidates who was invited have submitted reports.", "Neither of the candidates who was invited has submitted reports."], "answerKey": "C"}'::jsonb),
('tournament', 'grammar', '{"number": 32, "text": "Which sentence contains an error?", "difficulty": "difficult", "options": ["The proposal was submitted on time.", "The proposal was submitted by the team.", "The proposal were submitted on time.", "The proposal was submitted before the deadline."], "answerKey": "C"}'::jsonb),
('tournament', 'grammar', '{"number": 33, "text": "Which sentence contains an error?", "difficulty": "difficult", "options": ["Hardly had she arrived when the meeting started.", "No sooner had she arrived than the meeting started.", "Scarcely had she arrived when the meeting started.", "No sooner had she arrived when the meeting started."], "answerKey": "D"}'::jsonb),
('tournament', 'grammar', '{"number": 34, "text": "Which sentence contains an error?", "difficulty": "difficult", "options": ["The number of applicants has increased.", "The number of applicants have increased.", "The number of applicants has risen sharply.", "The number of applicants has grown steadily."], "answerKey": "B"}'::jsonb),
('tournament', 'grammar', '{"number": 35, "text": "Which sentence contains a dangling modifier?", "difficulty": "difficult", "options": ["Walking through the park, Maria saw a beautiful fountain.", "Walking through the park, a beautiful fountain caught Maria''s attention.", "While walking through the park, Maria noticed a beautiful fountain.", "Walking through the park, Maria enjoyed the beautiful fountain."], "answerKey": "B"}'::jsonb),

-- Spelling (36–39)
('tournament', 'spelling', '{"number": 36, "text": "Which word is spelled correctly?", "difficulty": "difficult", "options": ["Incomprehensibility", "Incomprehensability", "Incomprehenibility", "Incomprehensiblity"], "answerKey": "A"}'::jsonb),
('tournament', 'spelling', '{"number": 37, "text": "Which word is spelled correctly?", "difficulty": "difficult", "options": ["Meticulous", "Meticulus", "Meticulious", "Metticulous"], "answerKey": "A"}'::jsonb),
('tournament', 'spelling', '{"number": 38, "text": "Which word is spelled correctly?", "difficulty": "difficult", "options": ["Iconoclast", "Iconomclast", "Iconoclaust", "Iconaclast"], "answerKey": "A"}'::jsonb),
('tournament', 'spelling', '{"number": 39, "text": "Which word is spelled correctly?", "difficulty": "difficult", "options": ["Obsequious", "Obsequius", "Obsequous", "Obseqious"], "answerKey": "A"}'::jsonb),

-- Pronunciation (40)
('tournament', 'pronunciation', '{"number": 40, "text": "Which word is pronounced /nepntnmi/?", "difficulty": "difficult", "options": ["Epitaph", "Epitome", "Epithet", "Epithetic"], "answerKey": "B"}'::jsonb),

-- General Knowledge — Historical Dates (41–45)
('tournament', 'general_knowledge', '{"number": 41, "text": "On what date was the U.S. Declaration of Independence adopted?", "difficulty": "difficult", "options": ["Jul 4, 1776", "Jul 14, 1776", "Jun 4, 1776", "Jul 4, 1789"], "answerKey": "A"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 42, "text": "On what date did Pearl Harbor occur?", "difficulty": "difficult", "options": ["Dec 6, 1941", "Dec 7, 1941", "Dec 8, 1941", "Nov 7, 1941"], "answerKey": "B"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 43, "text": "In what year was the Magna Carta signed?", "difficulty": "difficult", "options": ["1066", "1215", "1492", "1453"], "answerKey": "B"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 44, "text": "In what year did Constantinople fall?", "difficulty": "difficult", "options": ["1453", "1492", "1517", "1415"], "answerKey": "A"}'::jsonb),
('tournament', 'general_knowledge', '{"number": 45, "text": "On what date did the Storming of the Bastille occur?", "difficulty": "difficult", "options": ["Jul 4, 1776", "Jun 14, 1789", "Jul 14, 1789", "Aug 14, 1789"], "answerKey": "C"}'::jsonb);
