import type { Database } from './database';

export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Banner = Database['public']['Tables']['banners']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Faq = Database['public']['Tables']['faqs']['Row'];

export interface LocalizedProduct extends Omit<Product, 'name_en' | 'short_description_en' | 'description_en'> {}
export interface LocalizedCategory extends Omit<Category, 'name_en' | 'description_en'> {}
export interface LocalizedBanner extends Omit<Banner, 'title_en' | 'subtitle_en' | 'cta_text_en'> {}
export interface LocalizedTestimonial extends Omit<Testimonial, 'content_en'> {}
export interface LocalizedFaq extends Omit<Faq, 'question_en' | 'answer_en'> {}
