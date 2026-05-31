-- Migration: create_storage_buckets
-- Description: Create storage buckets for products, testimonials, and banners, and set up RLS policies.

-- 1. Create buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('products', 'products', true),
  ('testimonials', 'testimonials', true),
  ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up Storage Policies
-- Read access for everyone
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id IN ('products', 'testimonials', 'banners') );

-- Insert access for authenticated users
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id IN ('products', 'testimonials', 'banners') );

-- Update access for authenticated users
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id IN ('products', 'testimonials', 'banners') );

-- Delete access for authenticated users
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id IN ('products', 'testimonials', 'banners') );
