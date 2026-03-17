import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { corsOptions, json, errorResponse } from '@/lib/cors';

export async function OPTIONS(): Promise<Response> {
  return corsOptions();
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const category = req.nextUrl.searchParams.get('category');

    let query = getSupabase()
      .from('services')
      .select('*')
      .order('category')
      .order('base_price');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return errorResponse(error.message, 500);
    }

    return json({ services: data ?? [] });
  } catch (err) {
    console.error('[api/services] Error:', err);
    return errorResponse('Internal server error', 500);
  }
}
