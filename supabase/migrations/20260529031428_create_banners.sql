-- Migration: 003_create_banners
-- Description: Create banners table with bilingual support

CREATE TABLE banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  title_en text,
  subtitle text,
  subtitle_en text,
  image_url text NOT NULL,
  cta_text text,
  cta_text_en text,
  cta_link text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TRIGGER update_banners_updated_at
  BEFORE UPDATE ON banners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
