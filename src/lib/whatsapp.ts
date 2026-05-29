import { WHATSAPP_NUMBER } from './constants';
import { useTranslations, type Locale } from '../i18n/utils';

export function buildWhatsAppUrl(locale: Locale, productName?: string): string {
  const t = useTranslations(locale);
  
  let message = t('wa.message_prefix');
  
  if (productName) {
    message += t('wa.message_product', { name: productName });
    message += t('wa.message_suffix');
  } else {
    message = t('wa.general_message');
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
