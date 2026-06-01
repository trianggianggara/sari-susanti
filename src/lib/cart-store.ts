/**
 * Cart Store — localStorage-backed cart with custom event bus
 * Usage: import { cart } from './cart-store';
 */

export interface CartItem {
  slug: string;
  name: string;
  price: number | null;
  image: string;
  qty: number;
}

const CART_KEY = 'ss_cart';
const CART_UPDATED_EVENT = 'ss:cart-updated';

function readCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: items }));
}

export const cart = {
  getItems(): CartItem[] {
    return readCart();
  },

  getCount(): number {
    return readCart().reduce((sum, item) => sum + item.qty, 0);
  },

  add(item: Omit<CartItem, 'qty'>, qty = 1): void {
    const items = readCart();
    const existing = items.find((i) => i.slug === item.slug);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...item, qty });
    }
    saveCart(items);
  },

  updateQty(slug: string, qty: number): void {
    const items = readCart();
    const existing = items.find((i) => i.slug === slug);
    if (!existing) return;
    if (qty <= 0) {
      this.remove(slug);
      return;
    }
    existing.qty = qty;
    saveCart(items);
  },

  remove(slug: string): void {
    saveCart(readCart().filter((i) => i.slug !== slug));
  },

  clear(): void {
    saveCart([]);
  },

  onUpdate(callback: (items: CartItem[]) => void): () => void {
    const handler = (e: Event) => callback((e as CustomEvent<CartItem[]>).detail);
    window.addEventListener(CART_UPDATED_EVENT, handler);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handler);
  },
};

/** Build WhatsApp message from cart items */
export function buildCartWhatsAppUrl(
  items: CartItem[],
  locale: string,
  phone: string
): string {
  if (items.length === 0) return `https://wa.me/${phone}`;

  const isEn = locale === 'en';
  let msg = isEn
    ? "Hello Sari Susanti! I'd like to order:\n\n"
    : 'Halo Sari Susanti! Saya ingin memesan:\n\n';

  items.forEach((item, i) => {
    msg += `${i + 1}. *${item.name}* × ${item.qty}\n`;
  });

  msg += isEn
    ? '\nPlease let me know availability and pricing. Thank you 🙏'
    : '\nMohon informasi ketersediaan dan harganya. Terima kasih 🙏';

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
