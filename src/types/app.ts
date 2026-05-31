import type { Database } from './database';

export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Banner = Database['public']['Tables']['banners']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Faq = Database['public']['Tables']['faqs']['Row'];

export interface LocalizedProduct extends Product {
  categories?: {
    slug: string;
    name: string;
    name_en?: string | null;
  } | null;
}
export interface LocalizedCategory extends Category {}
export interface LocalizedBanner extends Banner {}
export interface LocalizedTestimonial extends Testimonial {}
export interface LocalizedFaq extends Faq {}
