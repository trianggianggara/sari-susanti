import type { Locale } from '../i18n/utils';
import type { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Faq = Database['public']['Tables']['faqs']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type Banner = Database['public']['Tables']['banners']['Row'];

/**
 * Localizes a product by falling back to ID if EN content is missing
 */
export function localizeProduct(product: Product, locale: Locale) {
  const isEn = locale === 'en';
  return {
    ...product,
    name: (isEn && product.name_en) ? product.name_en : product.name,
    short_description: (isEn && product.short_description_en) ? product.short_description_en : product.short_description,
    description: (isEn && product.description_en) ? product.description_en : product.description,
  };
}

export function localizeCategory(category: Category, locale: Locale) {
  const isEn = locale === 'en';
  return {
    ...category,
    name: (isEn && category.name_en) ? category.name_en : category.name,
    description: (isEn && category.description_en) ? category.description_en : category.description,
  };
}

export function localizeFaq(faq: Faq, locale: Locale) {
  const isEn = locale === 'en';
  return {
    ...faq,
    question: (isEn && faq.question_en) ? faq.question_en : faq.question,
    answer: (isEn && faq.answer_en) ? faq.answer_en : faq.answer,
  };
}

export function localizeTestimonial(testimonial: Testimonial, locale: Locale) {
  const isEn = locale === 'en';
  return {
    ...testimonial,
    content: (isEn && testimonial.content_en) ? testimonial.content_en : testimonial.content,
  };
}

export function localizeBanner(banner: Banner, locale: Locale) {
  const isEn = locale === 'en';
  return {
    ...banner,
    title: (isEn && banner.title_en) ? banner.title_en : banner.title,
    subtitle: (isEn && banner.subtitle_en) ? banner.subtitle_en : banner.subtitle,
    cta_text: (isEn && banner.cta_text_en) ? banner.cta_text_en : banner.cta_text,
  };
}
