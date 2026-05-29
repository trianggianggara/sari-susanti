import { createServerClient } from '@supabase/ssr';
import type { Database } from '../types/database';

export function createSupabaseClient(cookies: any) {
  return createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(key: string) {
          return cookies.get(key)?.value;
        },
        set(key: string, value: string, options: any) {
          cookies.set(key, value, options);
        },
        remove(key: string, options: any) {
          cookies.delete(key, options);
        },
      },
    }
  );
}
