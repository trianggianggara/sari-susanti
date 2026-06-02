import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { supabase } = locals;
    const formData = await request.formData();

    const title       = formData.get('title') as string;
    const title_en    = formData.get('title_en') as string;
    const subtitle    = formData.get('subtitle') as string;
    const subtitle_en = formData.get('subtitle_en') as string;
    const cta_text    = formData.get('cta_text') as string;
    const cta_text_en = formData.get('cta_text_en') as string;
    const cta_link    = formData.get('cta_link') as string;
    const is_active   = formData.get('is_active') === 'on';
    const sort_order  = parseInt(formData.get('sort_order') as string) || 0;
    const image       = formData.get('image') as File;

    if (!title) {
      return new Response(JSON.stringify({ error: 'Judul wajib diisi.' }), { status: 400 });
    }

    let image_url = '';

    if (image && image.size > 0) {
      const fileExt  = image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('banners').upload(filePath, image);

      if (uploadError) {
        return new Response(JSON.stringify({ error: `Gagal upload gambar: ${uploadError.message}` }), { status: 400 });
      }

      const { data: publicUrlData } = supabase.storage.from('banners').getPublicUrl(filePath);
      image_url = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('banners').insert([{
      title, title_en, subtitle, subtitle_en, image_url: image_url || null,
      cta_text, cta_text_en, cta_link, is_active, sort_order,
    }]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
