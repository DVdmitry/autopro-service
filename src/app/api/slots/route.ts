import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { corsOptions, json, errorResponse } from '@/lib/cors';

const SLOT_DURATION_MIN = 60;

export async function OPTIONS(): Promise<Response> {
  return corsOptions();
}

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const mechanicId = req.nextUrl.searchParams.get('mechanicId');
    const date = req.nextUrl.searchParams.get('date');

    if (!mechanicId || !date) {
      return errorResponse('mechanicId and date are required');
    }

    const dayOfWeek = new Date(date).getDay();

    const [schedule, breaks, booked] = await Promise.all([
      getSchedule(mechanicId, dayOfWeek),
      getBreaks(mechanicId, dayOfWeek),
      getBookedSlots(mechanicId, date),
    ]);

    if (!schedule?.is_working) {
      return json({ slots: [] });
    }

    const slots = generateSlots(schedule, breaks, booked, date);
    return json({ slots });
  } catch (err) {
    console.error('[api/slots] Error:', err);
    return errorResponse('Internal server error', 500);
  }
}

interface ScheduleRow {
  start_time: string;
  end_time: string;
  is_working: boolean;
}

interface BreakRow {
  start_time: string;
  end_time: string;
}

async function getSchedule(mechanicId: string, dow: number): Promise<ScheduleRow | null> {
  const { data } = await getSupabase()
    .from('schedules')
    .select('start_time, end_time, is_working')
    .eq('mechanic_id', mechanicId)
    .eq('day_of_week', dow)
    .single();
  return data;
}

async function getBreaks(mechanicId: string, dow: number): Promise<BreakRow[]> {
  const { data } = await getSupabase()
    .from('schedule_breaks')
    .select('start_time, end_time')
    .eq('mechanic_id', mechanicId)
    .eq('day_of_week', dow);
  return data ?? [];
}

async function getBookedSlots(mechanicId: string, date: string): Promise<string[]> {
  const { data } = await getSupabase()
    .from('appointments')
    .select('slot_start_time')
    .eq('mechanic_id', mechanicId)
    .eq('slot_date', date)
    .neq('status', 'cancelled');
  return (data ?? []).map((r) => r.slot_start_time);
}

function generateSlots(
  schedule: ScheduleRow,
  breaks: BreakRow[],
  booked: string[],
  date: string,
): { id: string; startTime: string; endTime: string; status: string }[] {
  const slots: { id: string; startTime: string; endTime: string; status: string }[] = [];
  let current = toMinutes(schedule.start_time);
  const end = toMinutes(schedule.end_time);

  while (current + SLOT_DURATION_MIN <= end) {
    const startStr = fromMinutes(current);
    const endStr = fromMinutes(current + SLOT_DURATION_MIN);

    if (!isDuringBreak(current, current + SLOT_DURATION_MIN, breaks)) {
      const status = booked.includes(startStr) ? 'booked' : 'available';
      slots.push({ id: `${date}_${startStr}`, startTime: startStr, endTime: endStr, status });
    }

    current += SLOT_DURATION_MIN;
  }

  return slots;
}

function isDuringBreak(start: number, end: number, breaks: BreakRow[]): boolean {
  return breaks.some((b) => {
    const bStart = toMinutes(b.start_time);
    const bEnd = toMinutes(b.end_time);
    return start < bEnd && end > bStart;
  });
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function fromMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
