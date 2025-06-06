import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export const POST =  withApiAuthRequired(async function handler(
  req: NextRequest
) {
    
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const { name, class_id, content, user_email } = await req.json();
    
    if (!name || !class_id) {
        return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }
    
    try {
    const { data: thread, error: threadError } = await supabase
      .from('Thread')
      
      .insert({
        name: name,
        class_id: class_id,
        content: content,
        user_email: user_email,
      })
      .select('*')
      .single();

    if (threadError) {
      console.error('Error creating thread:', threadError);
      return NextResponse.json({ message: 'Thread not created' }, { status: 404 });
    }

    return NextResponse.json(thread, { status: 200 });
  } catch (error) {
    console.error('Error querying Supabase:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const class_id = searchParams.get('class_id');
  let query = supabase.from('Thread')
    .select('*')
    .order('created_at', {ascending:false});
  
  if(class_id){
    query = query.eq('class_id', class_id);
  }

  const { data, error } = await query;
  if(error){
    console.error('Error fetching threads:', error);
    return NextResponse.json({message: "Error fetching threads"}, {status:500})
  }
  return NextResponse.json(data, { status: 200 });
}