import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const { content, user_email, thread_id, class_id, parent_id } = await req.json();
    
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
        deleted: false,
        parent_id: parent_id
      })
      .select('*')
      .single();

    if (postError) {
      console.error('Error creating post:', postError);
      return NextResponse.json({ message: postError.message }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const thread_id = searchParams.get('thread_id');
  let query = supabase.from('Post')
    .select('*')
    .order('created_at', {ascending:false});
  
  if(thread_id){
    query = query.eq('thread_id', thread_id);
  }

  const { data, error } = await query;
  if(error){
    console.error('Error fetching threads:', error);
    return NextResponse.json({message: "Error fetching threads"}, {status:500})
  }
  return NextResponse.json(data, { status: 200 });
}