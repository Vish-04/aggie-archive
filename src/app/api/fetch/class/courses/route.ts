import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';

  console.log("search: ", search);

  if (!search) {
    return NextResponse.json([], { status: 200 });
  }


  const { data, error } = await supabase
  .from('Class')
  .select('*')
  .or(`course_code.ilike.%${search}%,title.ilike.%${search}%`);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // return classes
  return NextResponse.json(data || [], { status: 200 });
}