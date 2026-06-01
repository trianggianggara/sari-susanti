import idStrings from './locales/id.json';
import enStrings from './locales/en.json';

export type Locale = 'id' | 'en';
export type TranslationKey = keyof typeof idStrings;

const translations: Record<Locale, Record<string, string>> = {
  id: idStrings,
  en: enStrings,
};

/**
 * Returns a typed translation function for the given locale.
 * Falls back to Indonesian if a key is missing in English.
 */
export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    const str =
      translations[locale]?.[key] ??
      translations['id'][key] ??
      key;

    if (!vars) return str;

    return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
  };
}

/**
 * Returns the alternate locale (for language switcher)
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'id' ? 'en' : 'id';
}

/**
 * Returns locale-aware URL from current path
 */
export function getLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] as Locale;

  const isCurrentLocalePrefix = currentLocale === 'id' || currentLocale === 'en';

  if (targetLocale === 'id') {
    if (isCurrentLocalePrefix) {
      segments.shift(); // Remove the locale prefix
    }
  } else {
    if (isCurrentLocalePrefix) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
  }

  return '/' + segments.join('/') + (segments.length === 1 ? '/' : '');
}

/**
 * Validates if a string is a supported locale
 */
export function isLocale(value: string): value is Locale {
  return value === 'id' || value === 'en';
}

export const LOCALES: Locale[] = ['id', 'en'];
export const DEFAULT_LOCALE: Locale = 'id';
