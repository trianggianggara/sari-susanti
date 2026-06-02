import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, params }) => {
  try {
    const { supabase } = locals;
    const { id } = params;
    const formData = await request.formData();

    const question    = formData.get('question') as string;
    const question_en = formData.get('question_en') as string;
    const answer      = formData.get('answer') as string;
    const answer_en   = formData.get('answer_en') as string;
    const category    = formData.get('category') as string;
    const is_active   = formData.get('is_active') === 'on';
    const sort_order  = parseInt(formData.get('sort_order') as string) || 0;

    if (!question || !answer) {
      return new Response(JSON.stringify({ error: 'Pertanyaan dan Jawaban wajib diisi.' }), { status: 400 });
    }

    const { error: updateError } = await supabase.from('faqs').update({
      question, question_en, answer, answer_en, category, is_active, sort_order,
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
