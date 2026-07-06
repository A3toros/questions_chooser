import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const key = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const PHOTOS_BUCKET = 'photos'

export function isSupabaseConfigured(): boolean {
  return Boolean(url && key)
}

export const supabase = isSupabaseConfigured()
  ? createClient(url!, key!)
  : null
