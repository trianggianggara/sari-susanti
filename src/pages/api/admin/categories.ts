import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { supabase } = locals;
    const formData = await request.formData();

    const name       = formData.get('name') as string;
    const name_en    = formData.get('name_en') as string;
    const slug       = formData.get('slug') as string;
    const is_active  = formData.get('is_active') === 'on';
    const sort_order = parseInt(formData.get('sort_order') as string) || 0;

    if (!name || !slug) {
      return new Response(JSON.stringify({ error: 'Nama dan Slug wajib diisi.' }), { status: 400 });
    }

    const { error: insertError } = await supabase.from('categories').insert([{
      name, name_en, slug, is_active, sort_order,
    }]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
