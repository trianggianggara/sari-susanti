import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, params }) => {
  try {
    const { supabase } = locals;
    const { id } = params;
    const formData = await request.formData();

    const customer_name = formData.get('customer_name') as string;
    const customer_role = formData.get('customer_role') as string;
    const content       = formData.get('content') as string;
    const content_en    = formData.get('content_en') as string;
    const rating        = parseInt(formData.get('rating') as string) || 5;
    const event_type    = formData.get('event_type') as string;
    const is_active     = formData.get('is_active') === 'on';
    const is_featured   = formData.get('is_featured') === 'on';
    const sort_order    = parseInt(formData.get('sort_order') as string) || 0;
    const image         = formData.get('image') as File;

    if (!customer_name || !content) {
      return new Response(JSON.stringify({ error: 'Nama pelanggan dan isi testimoni wajib diisi.' }), { status: 400 });
    }

    // Fetch existing testimonial for current image
    const { data: testimonial } = await supabase.from('testimonials').select('customer_image_url').eq('id', id).single();
    let customer_image_url = testimonial?.customer_image_url || '';

    if (image && image.size > 0) {
      const fileExt  = image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('testimonials').upload(filePath, image);

      if (uploadError) {
        return new Response(JSON.stringify({ error: `Gagal upload gambar: ${uploadError.message}` }), { status: 400 });
      }

      const { data: publicUrlData } = supabase.storage.from('testimonials').getPublicUrl(filePath);
      customer_image_url = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabase.from('testimonials').update({
      customer_name, customer_role, customer_image_url,
      content, content_en, rating, event_type, is_active, is_featured, sort_order,
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
