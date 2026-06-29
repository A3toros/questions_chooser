# VocabForm

Teacher question rating — **Vite + React + Tailwind + Framer Motion + Neon + Netlify**.

## Setup

```bash
npm install
cp .env.example .env   # paste your Neon DATABASE_URL
```

Run SQL in Neon console:

```sql
\i db/schema.sql
\i db/seed-01-core.sql
-- … other seeds
```

## Development

**Option A — Netlify (recommended, matches production):**

```bash
npm run dev:netlify
```

Open **http://localhost:8888** — API via Netlify Functions + Neon.

**Option B — Vite + local API:**

```bash
npm run dev:local
```

Open **http://localhost:5175** — API proxied to localhost:3001.

> Do **not** use port 5173 if another project is running there.
> Do **not** run `vite` alone — the API server must be running or you get 504 timeouts.

**Health check:** http://localhost:8888/api/health

## Build & deploy

```bash
npm run build
```

Deploy to Netlify, set `DATABASE_URL` in site env. Functions in `netlify/functions/`.

## Features

- Like / Dislike voting with **“Saving to database…”** overlay
- Category + round tabs with spring animations
- Add questions modal (bulk paste)
- Live leaderboard — top 20 / 15 / 10 per difficulty
- Scores update on every vote via `refresh_question_scores()`
