import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from './lib/supabase-server';

const protectedRoutes = ['/admin'];
const redirectRoute = '/admin/login';

export const onRequest = defineMiddleware(async ({ locals, request, url, cookies, redirect }, next) => {
  // Initialize Supabase for ALL routes so API routes can use it
  const supabase = createServerClient(request, cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  locals.supabase = supabase;
  locals.session = session;

  if (url.pathname.startsWith('/admin')) {
    const isLoginRoute = url.pathname === redirectRoute;

    if (!session && !isLoginRoute) {
      return redirect(redirectRoute);
    }

    if (session && isLoginRoute) {
      return redirect('/admin');
    }
  }

  return next();
});
