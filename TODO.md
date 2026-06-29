# VocabForm — Build Todo List

React · Tailwind CSS · Framer Motion · Neon · Netlify

---

## Phase 1 — Project scaffold

- [ ] Initialize Vite + React + TypeScript (`npm create vite@latest`)
- [ ] Install dependencies: `tailwindcss`, `framer-motion`, `react-router-dom`, `@tanstack/react-query`
- [ ] Configure Tailwind v4 (or v3) + PostCSS
- [ ] Add `netlify.toml` (build, functions, SPA redirects)
- [ ] Create `.env.example` with `DATABASE_URL`, `VITE_API_BASE`
- [ ] Folder structure: `src/components`, `src/hooks`, `src/lib`, `netlify/functions`
- [ ] Run Neon `schema.sql` + all seed files (`seed-01` … `seed-05`)

---

## Phase 2 — Design system (light / Netlify-style)

- [ ] `src/index.css` — CSS variables: bg, surface, border, primary `#00ad9f`, like/dislike, round colors
- [ ] Category color map in `src/lib/categories.ts` (grammar, vocabulary, GK, spelling, pop_culture, etc.)
- [ ] `Layout.tsx` — header, nav (Choosing · Leaderboard), max-width container, soft gradient bg
- [ ] Reusable primitives: `Button`, `Badge`, `Card`, `Modal` shell
- [ ] Typography: Inter/system stack, rounded-xl cards, `shadow-sm`

---

## Phase 3 — API layer (Netlify Functions + Neon)

- [ ] `netlify/functions/db.ts` — `@neondatabase/serverless` client
- [ ] `GET /api/questions` — filters: `bank`, `category`, `difficulty`, `unrated`, `teacherId`
- [ ] `POST /api/questions` — bulk insert with `content` JSONB
- [ ] `POST /api/ratings` — upsert like/dislike, **recalculate question score** in same transaction
- [ ] `GET /api/leaderboard` — top questions per level (`easy` 20, `medium` 15, `difficult` 10)
- [ ] `src/lib/api.ts` — typed fetch wrappers
- [ ] `src/lib/teacher.ts` — generate/store `teacherId` in `localStorage`

### DB additions for score-on-vote

- [ ] Add to `questions` table: `likes INT`, `dislikes INT`, `net_score INT` (default 0)
- [ ] Trigger or function: on `ratings` upsert/delete → recount scores for that question
- [ ] View `top_by_level` — rank within each `content.difficulty`, mark selected top N

---

## Phase 4 — Choosing page (main flow)

- [ ] `CategoryTabs.tsx` — Grammar · Vocabulary · GK (+ bank switcher for other sets)
- [ ] `RoundTabs.tsx` — Easy · Medium · Difficult (filter by `content.difficulty`)
- [ ] `QuestionCard.tsx` — category badge, round badge, text, MC options list (a/b/c/d)
- [ ] `VoteButtons.tsx` — Like (green) / Dislike (red), disabled while submitting
- [ ] `useQuestions` hook — fetch unrated queue for active category + round + bank
- [ ] On vote: optimistic UI → `POST /ratings` → remove card → fetch next
- [ ] `ProgressBar.tsx` — “Grammar · Easy: 3/5 rated”
- [ ] “Review rated” toggle — show already-voted questions, allow changing vote
- [ ] Empty state — all questions in this slice rated

### Framer Motion — Choosing

- [ ] Card enter: `initial={{ opacity: 0, y: 12 }}` → `animate`
- [ ] Card exit on vote: `AnimatePresence` + slide left (like) / slide right (dislike) + fade
- [ ] Vote buttons: `whileTap={{ scale: 0.95 }}`, `whileHover={{ scale: 1.02 }}`
- [ ] Category/round tabs: `layoutId` underline spring on active tab
- [ ] MC options: stagger children `fadeIn` (delay 0.05s each)

---

## Phase 5 — Add Questions modal

- [ ] `AddQuestionsModal.tsx` — open from header button
- [ ] Form fields: bank, category, difficulty, questions textarea, optional answer-keys textarea
- [ ] Parser: split by blank line (paragraph) or single newline; detect MC blocks (`a)` lines)
- [ ] Preview list before submit (count + first 3 samples)
- [ ] `POST /api/questions` bulk insert → close modal → refresh choosing queue

### Framer Motion — Modal

- [ ] Overlay: fade in/out
- [ ] Panel: `scale 0.96 → 1` + opacity spring
- [ ] Preview rows: `staggerChildren` on parse

---

## Phase 6 — Leaderboard page

- [ ] `LeaderboardTable.tsx` — 3 sections: Round 1 (20) · Round 2 (15) · Round 3 (10)
- [ ] Columns: rank, question (truncate + expand), category, likes, dislikes, net score, selected ✓
- [ ] Filters: bank, category
- [ ] Fetch on page load + refetch after own vote if on page (no interval polling required)
- [ ] `SelectedSummary.tsx` — category mix bars per round

### Framer Motion — Leaderboard

- [ ] Row reorder: `layout` prop when rank changes
- [ ] Score change: brief background flash (`animate` color pulse)
- [ ] Selected checkmark: spring `scale` when entering top N
- [ ] Expand row: `AnimatePresence` height animation for full text + options

---

## Phase 7 — Routing & app shell

- [ ] `App.tsx` — React Router: `/` (Choosing), `/leaderboard`
- [ ] `QueryClientProvider` wrapper
- [ ] Loading skeletons for card + table
- [ ] Error toasts / inline error on failed vote or fetch
- [ ] 404 / fallback route

---

## Phase 8 — Polish

- [ ] Responsive layout (mobile: stacked tabs, full-width buttons)
- [ ] Keyboard: Enter = like, Backspace = dislike (optional)
- [ ] Hide `answerKey` in choosing view; show in leaderboard expand (admin toggle)
- [ ] Bank selector: core · mixed · tournament · set4 · set5
- [ ] Favicon + page title “VocabForm”
- [ ] README: local dev, env vars, deploy steps

---

## Phase 9 — Deploy

- [ ] Connect repo to Netlify
- [ ] Set `DATABASE_URL` in Netlify env
- [ ] Verify functions work in production
- [ ] Smoke test: vote → score updates → leaderboard reflects top picks
- [ ] Run seeds on production Neon (once)

---

## Component checklist

| Component | Status |
|-----------|--------|
| `Layout` | ⬜ |
| `CategoryTabs` | ⬜ |
| `RoundTabs` | ⬜ |
| `QuestionCard` | ⬜ |
| `VoteButtons` | ⬜ |
| `ProgressBar` | ⬜ |
| `AddQuestionsModal` | ⬜ |
| `LeaderboardTable` | ⬜ |
| `SelectedSummary` | ⬜ |
| `Badge` / `Button` / `Card` | ⬜ |

---

## Animation checklist

| Interaction | Motion |
|-------------|--------|
| Question card enter/exit | ⬜ slide + fade |
| Like / Dislike tap | ⬜ scale |
| Tab switch | ⬜ layoutId underline |
| Modal open/close | ⬜ scale + fade |
| MC options appear | ⬜ stagger |
| Leaderboard reorder | ⬜ layout |
| Score flash | ⬜ color pulse |
| Selected ✓ | ⬜ spring scale |

---

## Done when

- [ ] Teacher picks category + round, likes/dislikes questions with smooth animations
- [ ] Add-questions modal bulk-writes to Neon
- [ ] Leaderboard shows top 20 / 15 / 10 per level from live scores
- [ ] Score updates on every vote (no stale data after refetch)
- [ ] Deployed on Netlify with Neon backend
