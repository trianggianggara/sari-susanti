import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from './lib/supabase-server';

const protectedRoutes = ['/admin'];
const redirectRoute = '/admin/login';

export const onRequest = defineMiddleware(async ({ locals, request, url, cookies, redirect, rewrite }, next) => {
  const pathname = url.pathname;

  // Rewrite paths without locale prefix to /id internally for the file router
  // We ignore paths that are already prefixed or system paths
  if (
    !pathname.startsWith('/id/') &&
    !pathname.startsWith('/en/') &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_') &&
    !pathname.includes('.')
  ) {
    const target = pathname === '/' ? '/id/' : `/id${pathname}`;
    return rewrite(target);
  }

  if (pathname.startsWith('/admin')) {
    // Initialize Supabase ONLY for admin routes to avoid cookie warnings during static build
    const supabase = createServerClient(request, cookies);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    locals.supabase = supabase;
    locals.session = session;

    const isLoginRoute = pathname === redirectRoute;

    if (!session && !isLoginRoute) {
      return redirect(redirectRoute);
    }

    if (session && isLoginRoute) {
      return redirect('/admin');
    }
  }

  return next();
});
