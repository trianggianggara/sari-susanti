import { createServerClient as _createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { Database } from '../types/database';

export function createServerClient(request: Request, cookies: AstroCookies) {
  return _createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          const parsed = parseCookieHeader(request.headers.get('Cookie') ?? '');
          return parsed.map(cookie => ({
            name: cookie.name,
            value: cookie.value ?? ''
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              ...options,
              sameSite: options.sameSite as any,
            });
          });
        },
      },
    }
  );
}
