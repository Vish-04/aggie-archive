import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const { thread_id } = await req.json();
    
    if (!thread_id) {
        return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }
    
    try {
    const { data: posts, error: postError } = await supabase
      .from('Post')
      .select('*')
      .eq('thread_id', thread_id)
      .is('deleted', false)

    if (postError) {
      console.error('Error fetching posts:', postError);
      return NextResponse.json({ message: 'Posts not found' }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});