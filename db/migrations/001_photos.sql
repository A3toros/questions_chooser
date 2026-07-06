-- Run on existing databases that already have the base schema
CREATE TABLE IF NOT EXISTS photos (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL UNIQUE,
  url          TEXT NOT NULL,
  width        INT NOT NULL,
  height       INT NOT NULL,
  mime_type    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos (created_at DESC);
