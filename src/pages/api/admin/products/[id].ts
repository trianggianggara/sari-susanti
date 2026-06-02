import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, params }) => {
  try {
    const { supabase } = locals;
    const { id } = params;
    const formData = await request.formData();

    const name                 = formData.get('name') as string;
    const name_en              = formData.get('name_en') as string;
    const slug                 = formData.get('slug') as string;
    const category_id          = formData.get('category_id') as string;
    const price                = parseInt(formData.get('price') as string) || 0;
    const price_max            = parseInt(formData.get('price_max') as string) || null;
    const short_description    = formData.get('short_description') as string;
    const short_description_en = formData.get('short_description_en') as string;
    const description          = formData.get('description') as string;
    const description_en       = formData.get('description_en') as string;
    const is_active            = formData.get('is_active') === 'on';
    const is_featured          = formData.get('is_featured') === 'on';
    const sort_order           = parseInt(formData.get('sort_order') as string) || 0;
    const image                = formData.get('image') as File;

    if (!name || !slug || !category_id) {
      return new Response(JSON.stringify({ error: 'Nama, Slug, dan Kategori wajib diisi.' }), { status: 400 });
    }

    // Fetch existing product for current image_url
    const { data: product } = await supabase.from('products').select('image_url').eq('id', id).single();
    let image_url = product?.image_url || '';

    if (image && image.size > 0) {
      const fileExt  = image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('products').upload(filePath, image);

      if (uploadError) {
        return new Response(JSON.stringify({ error: `Gagal upload gambar: ${uploadError.message}` }), { status: 400 });
      }

      const { data: urlData } = supabase.storage.from('products').getPublicUrl(filePath);
      image_url = urlData.publicUrl;
    }

    const { error: updateError } = await supabase.from('products').update({
      name, name_en, slug, category_id, price, price_max,
      short_description, short_description_en, description, description_en,
      image_url, is_active, is_featured, sort_order,
      updated_at: new Date().toISOString(),
    }).eq('id', id);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
