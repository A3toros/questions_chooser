-- Allow vertical and square photos (warning only in UI)
ALTER TABLE photos DROP CONSTRAINT IF EXISTS photos_horizontal;
