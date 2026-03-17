import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { corsOptions, json, errorResponse } from '@/lib/cors';

export async function OPTIONS(): Promise<Response> {
  return corsOptions();
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const serviceId = req.nextUrl.searchParams.get('serviceId');
    const make = req.nextUrl.searchParams.get('make');

    if (!serviceId) {
      return errorResponse('serviceId is required');
    }

    const { data, error } = await getSupabase()
      .from('service_options')
      .select('*')
      .eq('service_id', serviceId)
      .order('tier')
      .order('price');

    if (error) {
      return errorResponse(error.message, 500);
    }

    let options = data ?? [];

    if (make) {
      options = filterByMake(options, make);
    }

    return json({ options });
  } catch (err) {
    console.error('[api/options] Error:', err);
    return errorResponse('Internal server error', 500);
  }
}

interface OptionRow {
  compatible_makes: string[] | null;
  [key: string]: unknown;
}

function filterByMake(options: OptionRow[], make: string): OptionRow[] {
  return options.filter((opt) => {
    const makes = opt.compatible_makes ?? [];
    return makes.length === 0 || makes.includes(make);
  });
}
