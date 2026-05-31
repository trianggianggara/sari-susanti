-- Migration: 007_create_rls_policies
-- Description: Enable RLS and set up policies for all tables

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Read access for everyone (anon and authenticated)
CREATE POLICY "Public profiles are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Public banners are viewable by everyone" ON banners FOR SELECT USING (true);
CREATE POLICY "Public testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public faqs are viewable by everyone" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public site_settings are viewable by everyone" ON site_settings FOR SELECT USING (true);

-- 2. Write access ONLY for authenticated users (Admins)
-- For categories
CREATE POLICY "Authenticated users can insert categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update categories" ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete categories" ON categories FOR DELETE TO authenticated USING (true);

-- For products
CREATE POLICY "Authenticated users can insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete products" ON products FOR DELETE TO authenticated USING (true);

-- For banners
CREATE POLICY "Authenticated users can insert banners" ON banners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update banners" ON banners FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete banners" ON banners FOR DELETE TO authenticated USING (true);

-- For testimonials
CREATE POLICY "Authenticated users can insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- For faqs
CREATE POLICY "Authenticated users can insert faqs" ON faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update faqs" ON faqs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete faqs" ON faqs FOR DELETE TO authenticated USING (true);

-- For site_settings
CREATE POLICY "Authenticated users can insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update site_settings" ON site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete site_settings" ON site_settings FOR DELETE TO authenticated USING (true);
