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
    const { data: documents, error: documentError } = await supabase
      .from('Document')
      .select('*')
      .eq('class_id', class_id)
      .is('deleted', false)

    if (documentError) {
      console.error('Error fetching documents:', documentError);
      return NextResponse.json({ message: 'Documents not found' }, { status: 404 });
    }

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});