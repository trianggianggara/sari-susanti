-- Migration: 004_create_testimonials
-- Description: Create testimonials table with bilingual support

CREATE TABLE testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  customer_role text,
  customer_avatar_url text,
  content text NOT NULL,
  content_en text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
