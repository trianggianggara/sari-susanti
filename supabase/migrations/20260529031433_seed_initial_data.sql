-- Migration: 008_seed_initial_data
-- Description: Seed initial categories, sample products, testimonials, and faqs.

-- 1. Clean up old dummy data safely
DELETE FROM products WHERE id != '00000000-0000-0000-0000-000000000000';
DELETE FROM categories WHERE id != '00000000-0000-0000-0000-000000000000';
DELETE FROM testimonials WHERE id != '00000000-0000-0000-0000-000000000000';
DELETE FROM faqs WHERE id != '00000000-0000-0000-0000-000000000000';

-- 2. Insert Categories
INSERT INTO categories (id, slug, name, name_en, description, description_en, sort_order)
VALUES
  ('3f7c46c1-5e7e-4b47-97d8-111111111111', 'sari-savory', 'Sari Savory', 'Sari Savory', 'Hidangan utama yang mengenyangkan untuk kebutuhan acara formal maupun kasual.', 'Main dishes suitable for formal or casual events.', 1),
  ('3f7c46c1-5e7e-4b47-97d8-222222222222', 'sari-sweet', 'Sari Sweet & Bites', 'Sari Sweet & Bites', 'Aneka kue dan camilan untuk pengisi snack box, arisan, atau pengajian.', 'Assorted cakes and snacks for snack boxes or casual gatherings.', 2),
  ('3f7c46c1-5e7e-4b47-97d8-333333333333', 'sari-tumpeng', 'Sari Tumpeng & Hantaran', 'Sari Tumpeng & Hampers', 'Tumpeng besar tradisional dan versi mini (tumini) untuk hantaran.', 'Traditional large tumpeng and mini versions for special hampers.', 3)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Products (Using reliable public image URLs directly)
INSERT INTO products (category_id, slug, name, name_en, short_description, short_description_en, description, description_en, price, is_featured, sort_order, image_url, is_active)
VALUES
  (
    '3f7c46c1-5e7e-4b47-97d8-111111111111', 'nasi-kotak-premium', 'Nasi Kotak Premium', 'Premium Rice Box', 
    'Nasi putih, ayam bakar madu, sambal goreng kentang, telur balado, kerupuk, buah.', 'White rice, honey grilled chicken, spicy fried potatoes, balado egg, crackers, fruit.', 
    'Nasi Kotak Premium dari Sari Susanti menyajikan hidangan lengkap yang cocok untuk berbagai acara. Dikemas secara higienis dan rapi, setiap kotaknya berisi lauk pauk berkualitas yang dimasak dengan rempah pilihan.', 'Premium Rice Box from Sari Susanti serves a complete meal perfect for any occasion. Packed hygienically, each box contains high-quality side dishes cooked with selected spices.', 
    35000, true, 1, 'https://picsum.photos/seed/sari1/800/800', true
  ),
  (
    '3f7c46c1-5e7e-4b47-97d8-333333333333', 'tumpeng-mini', 'Tumpeng Mini', 'Mini Tumpeng', 
    'Nasi kuning, ayam goreng, perkedel, kering tempe, telur iris, sambal.', 'Yellow rice, fried chicken, potato fritter, sweet tempeh, sliced egg, sambal.', 
    'Tumpeng Mini sangat pas untuk syukuran kecil, ulang tahun, atau sekadar dinikmati bersama keluarga. Dibuat dengan resep asli nasi kuning Nusantara yang gurih dan wangi.', 'Mini Tumpeng is perfect for small thanksgiving, birthdays, or just enjoying with family. Made with the authentic savory and fragrant Nusantara yellow rice recipe.', 
    40000, true, 2, 'https://picsum.photos/seed/sari2/800/800', true
  ),
  (
    '3f7c46c1-5e7e-4b47-97d8-222222222222', 'snack-box-manis', 'Snack Box Manis', 'Sweet Snack Box', 
    'Pie buah, risoles mayo, bolu kukus, air mineral.', 'Fruit pie, mayo rissole, steamed sponge cake, mineral water.', 
    'Pilihan tepat untuk coffee break atau camilan acara Anda. Terdiri dari perpaduan kue manis dan gurih yang dibuat fresh setiap harinya.', 'The right choice for your coffee break or event snack. Consists of a mix of sweet and savory cakes made fresh daily.', 
    15000, true, 3, 'https://picsum.photos/seed/sari3/800/800', true
  ),
  (
    '3f7c46c1-5e7e-4b47-97d8-111111111111', 'nasi-besek', 'Nasi Besek Tradisional', 'Traditional Besek Rice', 
    'Nasi liwet, ayam goreng kampung, tahu tempe bacem, ikan asin, lalapan, sambal terasi.', 'Liwet rice, fried free-range chicken, sweet marinated tofu & tempeh, salted fish, fresh veggies, shrimp paste sambal.', 
    'Membawa nostalgia rasa pedesaan, Nasi Besek disajikan dalam kemasan anyaman bambu tradisional yang ramah lingkungan. Dilengkapi dengan lauk pauk klasik yang membangkitkan selera makan.', 'Bringing rural nostalgia, Besek Rice is served in eco-friendly traditional woven bamboo packaging. Complete with classic side dishes that stimulate your appetite.', 
    45000, true, 4, 'https://picsum.photos/seed/sari4/800/800', true
  )
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert Testimonials
INSERT INTO testimonials (customer_name, rating, content, content_en, is_active, sort_order)
VALUES
  ('Budi Santoso', 5, 'Pesan untuk acara kantor, makanannya enak semua dan tepat waktu pengirimannya. Rekomendasi banget!', 'Ordered for an office event, all the food was delicious and delivered right on time. Highly recommended!', true, 1),
  ('Siti Aminah', 5, 'Tumpengnya cantik dan rasanya gurih pas. Keluarga pada suka semua. Terima kasih Sari Susanti!', 'The tumpeng is beautiful and perfectly savory. The whole family loved it. Thank you Sari Susanti!', true, 2),
  ('Rina Marlina', 4, 'Snack box nya bervariasi, kuenya lembut dan fresh.', 'The snack box has great variety, the cakes are soft and fresh.', true, 3);

-- 5. Insert FAQs
INSERT INTO faqs (question, question_en, answer, answer_en, is_active, sort_order)
VALUES
  ('Berapa minimal order untuk Nasi Kotak?', 'What is the minimum order for Rice Boxes?', 'Minimal pemesanan untuk Nasi Kotak adalah 20 porsi.', 'The minimum order for Rice Boxes is 20 portions.', true, 1),
  ('Apakah melayani pengiriman ke luar kota?', 'Do you deliver out of town?', 'Saat ini kami hanya melayani pengiriman untuk wilayah Tasikmalaya dan sekitarnya.', 'Currently, we only deliver within the Tasikmalaya area and its surroundings.', true, 2),
  ('Berapa hari sebelum acara saya harus memesan?', 'How many days in advance should I order?', 'Untuk hasil yang maksimal, kami sarankan untuk memesan minimal H-3 sebelum acara.', 'For best results, we recommend ordering at least 3 days before your event.', true, 3);

-- 6. Insert Site Settings (Promo Banner)
INSERT INTO site_settings (key, value, description)
VALUES
  ('promo_banner_active', 'true', 'Toggle to show or hide the promo banner (true/false)'),
  ('promo_banner_text_id', '🎉 Promo Spesial: Diskon 20% untuk pemesanan pertama bulan ini!', 'Indonesian text for the promo banner'),
  ('promo_banner_text_en', '🎉 Special Promo: 20% off for your first order this month!', 'English text for the promo banner'),
  ('promo_banner_cta_id', 'Klaim Promo', 'Indonesian text for the CTA button'),
  ('promo_banner_cta_en', 'Claim Promo', 'English text for the CTA button'),
  ('promo_banner_link', '/order', 'URL for the CTA button')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 7. Insert Dummy Banners (For Hero Slider / Admin Dashboard)
INSERT INTO banners (id, title, title_en, subtitle, subtitle_en, image_url, cta_text, cta_text_en, cta_link, is_active, sort_order)
VALUES
  ('3f7c46c1-5e7e-4b47-97d8-999999999991', 'Sari Susanti', 'Sari Susanti', 'Sari Rasa Nusantara, Sentuhan Selera Ibu.', 'The Authentic Taste of Nusantara.', 'https://picsum.photos/seed/hero1/1920/1080', 'Lihat Menu', 'View Menu', '/menu', true, 1),
  ('3f7c46c1-5e7e-4b47-97d8-999999999992', 'Katering Premium', 'Premium Catering', 'Hidangan spesial untuk momen berharga Anda.', 'Special dishes for your precious moments.', 'https://picsum.photos/seed/hero2/1920/1080', 'Pesan Sekarang', 'Order Now', '/order', true, 2)
ON CONFLICT (id) DO NOTHING;
