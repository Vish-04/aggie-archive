import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const { content, user_email, thread_id, class_id } = await req.json();
    
    if (!content || !user_email || !thread_id || !class_id) {
        return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }
    
    try {
    const { data: post, error: postError } = await supabase
      .from('Post')
      .insert({
        content: content,
        user_email: user_email,
        thread_id: thread_id,
        class_id: class_id,
        deleted: false
      })
      .select('*')
      .single();

    if (postError) {
      console.error('Error creating post:', postError);
      return NextResponse.json({ message: 'Post not created' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});