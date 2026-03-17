import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { corsOptions, json, errorResponse } from '@/lib/cors';

export async function OPTIONS(): Promise<Response> {
  return corsOptions();
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const serviceId = req.nextUrl.searchParams.get('serviceId');

    if (serviceId) {
      return getMechanicsForService(serviceId);
    }

    const { data, error } = await getSupabase()
      .from('mechanics')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) {
      return errorResponse(error.message, 500);
    }

    return json({ mechanics: data ?? [] });
  } catch (err) {
    console.error('[api/mechanics] Error:', err);
    return errorResponse('Internal server error', 500);
  }
}

async function getMechanicsForService(serviceId: string): Promise<Response> {
  const { data, error } = await getSupabase()
    .from('mechanic_services')
    .select('mechanic_id, mechanics(*)')
    .eq('service_id', serviceId);

  if (error) {
    return errorResponse(error.message, 500);
  }

  const mechanics = (data ?? [])
    .map((row) => row.mechanics)
    .filter(Boolean);

  return json({ mechanics });
}
