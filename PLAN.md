# VocabForm — Teacher Question Rating Plan

## Overview

Teachers review quiz questions **within a category** and vote **Like** or **Dislike** only. Each question already belongs to a fixed round via `content.difficulty`:

| Round | `content.difficulty` | Target picks |
|-------|----------------------|--------------|
| Round 1 | `easy`               | 20 questions |
| Round 2 | `medium`             | 15 questions |
| Round 3 | `difficult`          | 10 questions |

Teachers do **not** assign or change the round — they only signal whether a question is good enough to keep. Highest-liked questions win slots within their round.

**Total selected: 45 questions.**

**Stack:** React · Tailwind CSS · Framer Motion · Neon (Postgres) · Netlify  
**Theme:** Light palette — soft whites, muted blues/grays, Netlify teal accent

---

## Question Banks & Categories

Two question banks, each with **3 categories × 5 questions per difficulty × 3 difficulties = 45 questions** (90 total).

### Bank A — Core (`core`)

| Category | Slug |
|----------|------|
| Grammar | `grammar` |
| Vocabulary | `vocabulary` |
| General Knowledge | `general_knowledge` |

### Bank B — Literacy (`literacy`)

| Category | Slug |
|----------|------|
| Spelling | `spelling` |
| Sentence Completion | `sentence_completion` |

### Difficulty rounds (fixed on question — not voted on)

Round is set at import/add time in `content.difficulty`. Teachers never change it.

| Round | `content.difficulty` | UI label |
|-------|----------------------|----------|
| Round 1 | `easy` | Easy |
| Round 2 | `medium` | Medium |
| Round 3 | `difficult` | Difficult |

### Teacher vote (like / dislike only)

| Vote | Meaning |
|------|---------|
| `like` | Keep — good question for its round |
| `dislike` | Reject — do not use |

One vote per teacher per question (upsert to change).

### Question formats

All question body fields live in **one JSONB column** (`content`). Top-level columns (`category`, `bank`) stay separate for filtering.

```jsonc
// Plain text
{ "text": "What is the past tense of play?", "difficulty": "easy" }

// Multiple choice — options omitted when not needed
{
  "text": "Choose the correct sentence:",
  "options": ["She go to school.", "She goes to school."],
  "difficulty": "easy",
  "answerKey": "b"
}
```

| Field in `content` | Required | Notes |
|--------------------|----------|-------|
| `text` | yes | Question stem |
| `difficulty` | yes | `easy` · `medium` · `difficult` |
| `options` | no | `string[]` — only when MC; omit key entirely for open questions |
| `answerKey` | no | Admin/export only; hidden during choosing |

Full seed data: [`data/seed-questions.json`](data/seed-questions.json) (90 questions — mapped into `content` on import).

---

## Choosing Flow (by category)

Teachers rate questions **inside one category at a time**. Core bank uses 3 categories (Grammar, Vocabulary, General Knowledge); Literacy bank uses 2 (Spelling, Sentence Completion).

```
┌─────────────────────────────────────────────────────────┐
│  [Grammar] [Vocabulary] [General Knowledge]             │  ← pick one category
├─────────────────────────────────────────────────────────┤
│  Round 1 · Easy          Progress: 3 / 5 unrated       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │  GRAMMAR                                        │    │
│  │  Which word is a noun in this sentence:         │    │
│  │  "The dog barked loudly."                       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│         [  Like  ]          [  Dislike  ]              │
└─────────────────────────────────────────────────────────┘
```

1. **Category tabs** — teacher picks one of the 3 core categories (or switches bank for Literacy categories).
2. **Round sub-tabs** — within a category, browse Easy / Medium / Difficult questions separately (round comes from `content.difficulty`, read-only badge on card).
3. **Question card** — category badge, round badge, text, MC options if present.
4. **Two vote buttons** — Like / Dislike (Framer Motion tap + card exit).
5. **Progress** — per category + per round (“Grammar · Easy: 3/5 rated”).
6. Teachers can **change a vote** (upsert); “Review rated” toggle to revisit.

### Rating semantics

| Vote | Label | Score |
|------|-------|-------|
| `like` | Like | +1 |
| `dislike` | Dislike | −1 |

```
net_score = like_count − dislike_count
```

---

## Scoring & Final Selection

### Per-question score

```
net_score = likes − dislikes
round     = content.difficulty   -- fixed, never from votes
```

### Selection algorithm

Within each round, pick the top N questions by `net_score` (tie-break: more likes, then fewer dislikes):

```ts
const LIMITS = { easy: 20, medium: 15, difficult: 10 };

function computeSelected(questions: ScoredQuestion[]): Set<string> {
  const selected = new Set<string>();

  for (const difficulty of ['easy', 'medium', 'difficult'] as const) {
    const pool = questions
      .filter(q => q.difficulty === difficulty && q.net_score > 0)
      .sort((a, b) => b.net_score - a.net_score || b.likes - a.likes);

    pickWithCategoryCaps(pool, LIMITS[difficulty]).forEach(id => selected.add(id));
  }
  return selected;
}
```

Questions with `net_score ≤ 0` are never auto-selected.

### Category balance (recommended default)

To avoid all 20 Easy picks coming from one category, apply **soft quotas** within each round:

| Round | Total | Suggested per-category cap |
|-------|-------|----------------------------|
| Round 1 | 20 | max 8 per category |
| Round 2 | 15 | max 6 per category |
| Round 3 | 10 | max 4 per category |

Algorithm: greedy fill by score within round, skip if category cap reached, then backfill remaining slots without cap. Show “category mix” bar in Selected Summary.

---

## Database Schema (Neon)

Question text, optional options, and difficulty are stored together in a single **`content` JSONB** column. `category` and `bank` are top-level columns for fast filtering during choosing.

```sql
CREATE TYPE question_category AS ENUM (
  'grammar', 'vocabulary', 'general_knowledge',
  'spelling', 'sentence_completion'
);

CREATE TYPE bank_id AS ENUM ('core', 'literacy');
CREATE TYPE vote_type AS ENUM ('like', 'dislike');

CREATE TABLE questions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank        bank_id NOT NULL DEFAULT 'core',
  category    question_category NOT NULL,
  content     JSONB NOT NULL,          -- { text, difficulty, options?, answerKey? }
  created_at  TIMESTAMPTZ DEFAULT now(),
  created_by  TEXT,
  is_active   BOOLEAN DEFAULT true,

  CONSTRAINT content_has_text CHECK (content ? 'text' AND (content->>'text') <> ''),
  CONSTRAINT content_has_difficulty CHECK (
    content->>'difficulty' IN ('easy', 'medium', 'difficult')
  )
);

CREATE TABLE ratings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id   UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  teacher_id    TEXT NOT NULL,
  vote          vote_type NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (question_id, teacher_id)
);

CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_bank ON questions(bank);
CREATE INDEX idx_questions_difficulty ON questions ((content->>'difficulty'));
CREATE INDEX idx_questions_content_gin ON questions USING GIN (content);
CREATE INDEX idx_ratings_question ON ratings(question_id);
```

### `content` JSONB shape (TypeScript)

```ts
type QuestionContent = {
  text: string;
  difficulty: 'easy' | 'medium' | 'difficult';
  options?: string[];   // present only for MC; never store null — omit key
  answerKey?: string;
};
```

### Insert example

```sql
INSERT INTO questions (bank, category, content) VALUES (
  'core',
  'grammar',
  '{"text": "Choose the correct sentence:", "difficulty": "easy", "options": ["She go to school.", "She goes to school."], "answerKey": "b"}'
);
```

### Seed import mapping

`data/seed-questions.json` fields map to DB rows like this:

```ts
{
  bank: item.bank,
  category: item.category,
  content: {
    text: item.text,
    difficulty: item.sourceRound,       // easy | medium | difficult
    ...(item.options?.length && { options: item.options }),
    ...(item.answerKey && { answerKey: item.answerKey }),
  },
}
```

### Leaderboard view

```sql
CREATE VIEW question_scores AS
SELECT
  q.id,
  q.bank,
  q.category,
  q.content,
  q.content->>'text'       AS text,
  q.content->>'difficulty' AS difficulty,
  q.content->'options'     AS options,
  q.content->>'answerKey'  AS answer_key,
  COUNT(r.id) FILTER (WHERE r.vote = 'like')    AS likes,
  COUNT(r.id) FILTER (WHERE r.vote = 'dislike') AS dislikes,
  COALESCE(SUM(CASE r.vote
    WHEN 'like' THEN 1 WHEN 'dislike' THEN -1 END), 0) AS net_score
FROM questions q
LEFT JOIN ratings r ON r.question_id = q.id
WHERE q.is_active = true
GROUP BY q.id, q.bank, q.category, q.content;
```

---

## App Structure

```
vocabform/
├── data/
│   └── seed-questions.json       # 90 questions (both banks)
├── db/
│   └── schema.sql
│   └── seed.ts                   # import JSON → Neon
├── netlify/functions/
│   ├── questions.ts
│   ├── ratings.ts
│   └── leaderboard.ts
├── src/
│   ├── App.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── categories.ts         # labels, colors, bank mapping
│   │   └── selection.ts          # computeSelected + category caps
│   ├── hooks/
│   │   ├── useLeaderboard.ts
│   │   └── useQuestions.ts
│   └── components/
│       ├── Layout.tsx
│       ├── CategoryChips.tsx
│       ├── QuestionCard.tsx      # text + MC options + badges
│       ├── RatingButtons.tsx
│       ├── AddQuestionsModal.tsx
│       ├── LeaderboardTable.tsx
│       └── SelectedSummary.tsx
├── PLAN.md
├── package.json
└── netlify.toml
```

---

## Pages & UX

### 1. Choosing (main view)

- Category tabs (Grammar · Vocabulary · General Knowledge — or Literacy categories)
- Round sub-tabs (Easy / Medium / Difficult) — filters by `content.difficulty`
- Question card with category + round badges, optional MC list
- **Two** rating buttons: Like / Dislike
- Header: per-category + per-round progress, link to leaderboard

### 2. Add Questions modal

Bulk paste for new questions. Extended fields in modal:

| Field | Required | Notes |
|-------|----------|-------|
| Category | yes | dropdown |
| Difficulty | yes | Easy / Medium / Difficult → `content.difficulty` |
| Bank | yes | Core / Literacy |
| Questions | yes | textarea — one per line or paragraph-separated |
| Answer keys | optional | second textarea, same order (line-aligned) |

Parse blocks → build `content` JSONB per row → preview table → POST bulk insert → appear in Choosing + Leaderboard.

Each inserted row:

```json
{
  "bank": "core",
  "category": "grammar",
  "content": {
    "text": "What is the past tense of play?",
    "difficulty": "easy",
    "answerKey": "played"
  }
}
```

For MC questions pasted as multi-line blocks, treat first line as stem, following `a)` / `b)` lines as options.

### 3. Live Leaderboard

| Rank | Question | Category | Round | Likes | Dislikes | Net | Selected |
|------|----------|----------|-------|-------|----------|-----|----------|

- Filters: by category · by round (easy/medium/difficult) · Selected only
- Auto-refresh every 4 s
- Framer Motion `layout` on reorder + score-change flash
- Expand row → full text, options, answer key (admin toggle)

### 4. Selected Summary

Three collapsible sections (20 / 15 / 10) with category mix bars:

```
Round 1 · Easy (18/20)
  Grammar ████░░ 6    Vocabulary ███░░░ 5    GK ███░░░ 4    …
```

Export CSV (phase 2): question, category, round, answer key.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/questions` | `?category=&bank=&difficulty=&unrated=true&teacherId=` |
| POST | `/api/questions` | Bulk `{ questions: [{ bank, category, content: { text, difficulty, options?, answerKey? } }] }` |
| POST | `/api/questions/seed` | One-time import from `seed-questions.json` |
| GET | `/api/ratings?teacherId=` | Teacher's votes |
| POST | `/api/ratings` | Upsert `{ questionId, teacherId, vote: 'like' | 'dislike' }` |
| GET | `/api/leaderboard` | Scores, `selected`, grouped by round + category |

---

## Design Tokens

```css
--color-bg:       #fafafa;
--color-surface:  #ffffff;
--color-primary:  #00ad9f;
--color-like:     #10b981;
--color-dislike:  #ef4444;
--color-easy:     #10b981;   /* Round 1 */
--color-medium:   #3b82f6;   /* Round 2 */
--color-hard:     #f59e0b;   /* Round 3 */

/* Category accents */
--cat-grammar:    #8b5cf6;
--cat-vocabulary: #14b8a6;
--cat-gk:         #0ea5e9;
--cat-spelling:   #f59e0b;
--cat-sentence:   #f43f5e;
```

---

## Framer Motion

| Element | Animation |
|---------|-----------|
| Category chip | `layoutId` underline on active |
| Question card | `AnimatePresence` slide-out on vote |
| MC options | stagger `children` fade-in |
| Leaderboard rows | `layout` reorder + score flash |
| Selected checkmark | spring `scale` when entering top N |

---

## Seed Data Summary

| Bank | Categories | Per round | Total |
|------|------------|-----------|-------|
| Core | Grammar, Vocabulary, General Knowledge | 5 each × 3 rounds | 45 |
| Literacy | Spelling, Sentence Completion | 5 each × 3 rounds | 45 |
| **Total** | 5 categories | 15 per round × 3 | **90** |

Import via `db/seed.ts` on deploy or `POST /api/questions/seed`.

---

## Implementation Phases

### Phase 1 — Foundation
- [ ] Vite + React + TS + Tailwind + Framer Motion
- [ ] Neon schema + seed import (90 questions)
- [ ] Netlify functions + light theme layout

### Phase 2 — Category choosing
- [ ] Category tabs + round sub-tabs
- [ ] QuestionCard (text + MC options + badges)
- [ ] Like / Dislike buttons + optimistic vote + card animation

### Phase 3 — Add Questions modal
- [ ] Extended form (category, round, bank, answer keys)
- [ ] Multi-line / paragraph parser + MC block detection
- [ ] Preview + bulk POST

### Phase 4 — Live leaderboard & selection
- [ ] LeaderboardTable with category/round filters + polling
- [ ] Selection algorithm with category caps
- [ ] SelectedSummary with mix bars

### Phase 5 — Deploy
- [ ] Netlify + Neon env
- [ ] Empty states, errors, smoke test with teachers

---

## Open Questions

1. **One bank or both for the live competition?** — 45 slots fits one bank; using all 90 means teachers pick best across both. Default: **all 90 in pool**, select top 45.
2. **Show answer keys during choosing?** — Default: **hidden** (teachers judge fit, not correctness).
3. **Category caps enforced or advisory?** — Default: **soft caps** with UI warning if mix is skewed.
4. **Many teachers vs one committee?** — Default: aggregate all teacher votes globally.

---

## Success Criteria

- [ ] Teachers pick a category, then like/dislike questions per round
- [ ] Round (easy/medium/difficult) is fixed on the question, not voted on
- [ ] Bulk add writes to DB with category + difficulty in `content`
- [ ] Live leaderboard updates within ~5 s with likes/dislikes/net score
- [ ] Top 20 / 15 / 10 liked questions per round with category mix
- [ ] 90 seed questions loaded from provided banks
