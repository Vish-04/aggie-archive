import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const { class_id } = await req.json();
    
    if (!class_id) {
        return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }
    
    try {
    const { data: classData, error: classError } = await supabase
      .from('Class')
      .select('*')
      .eq('id', class_id)
      .single()

    if (classError) {
      console.error('Error fetching class:', classError);
      return NextResponse.json({ message: 'Class not found' }, { status: 404 });
    }

    return NextResponse.json(classData, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});