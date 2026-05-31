/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#2D5A27',
          dark: '#1E3D1A',
          light: '#3D7A35',
          muted: '#4a7c40',
          glass: 'rgba(45, 90, 39, 0.08)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8941F',
          light: '#E8CC6E',
          pale: '#F5E8A3',
          glass: 'rgba(212, 175, 55, 0.12)',
        },
        ivory: {
          DEFAULT: '#FDFBF7',
          warm: '#FAF5EC',
          deeper: '#F5EDE0',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
        },
        stone: {
          DEFAULT: '#8B7D6B',
          light: '#A89A8A',
        },
        sand: {
          DEFAULT: '#E8DFD0',
          light: '#F0E8DB',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'brand-sm': '0 2px 4px rgba(45, 90, 39, 0.05)',
        'brand-md': '0 4px 8px rgba(45, 90, 39, 0.08)',
      }
    },
  },
  plugins: [],
};
