export const SITE_URL = 'https://sarisusanti.id';
export const WHATSAPP_NUMBER = import.meta.env.WHATSAPP_NUMBER || '6281234567890'; // Default fallback for dev

export const BRAND = {
  name: 'Sari Susanti Catering & Jajanan Pasar',
  shortName: 'Sari Susanti',
  tagline: 'Sari Rasa Nusantara, Sentuhan Selera Ibu.',
  email: 'hello@sarisusanti.id',
  instagram: '@sarisusanti.catering',
  address: 'Jl. H. Mugeni II No.27 10, RT.10/RW.4, Pisangan Tim., Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13230',
};

export const CONTACT_LINKS = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: `https://instagram.com/${BRAND.instagram.replace('@', '')}`,
  email: `mailto:${BRAND.email}`,
};

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: CONTACT_LINKS.instagram, icon: 'mdi:instagram' },
  { name: 'WhatsApp', url: CONTACT_LINKS.whatsapp, icon: 'mdi:whatsapp' },
];
