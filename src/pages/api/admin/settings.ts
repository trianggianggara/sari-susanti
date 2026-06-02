import type { APIRoute } from 'astro';

export const prerender = false;

const ALL_KEYS = [
  'promo_banner_active',
  'promo_banner_text_id',
  'promo_banner_text_en',
  'promo_banner_cta_id',
  'promo_banner_cta_en',
  'promo_banner_link',
];

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { supabase } = locals;
    const formData = await request.formData();

    let hasError = false;
    for (const key of ALL_KEYS) {
      let value: string;
      if (key === 'promo_banner_active') {
        value = formData.get(key) === 'on' ? 'true' : 'false';
      } else {
        value = (formData.get(key) as string) ?? '';
      }

      const { error: upsertError } = await supabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);

      if (upsertError) {
        console.error(`Failed to update setting ${key}:`, upsertError);
        hasError = true;
      }
    }

    if (hasError) {
      return new Response(
        JSON.stringify({ error: 'Pengaturan berhasil disimpan sebagian. Silakan periksa kembali.' }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
