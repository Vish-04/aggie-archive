import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { User } from '@/utils/types';

export const PUT = withApiAuthRequired(async function handler(
  req: NextRequest
) {
    if (req.method !== 'PUT') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
    
    const body = await req.json();
    const { email, ...updateData } = body;
    
    if (!email) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Remove any fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.created_at;
    
    try {
        const { data: user, error: updateError } = await supabase
            .from('User')
            .update(updateData)
            .eq('email', email)
            .select('*')
            .single();

        if (updateError) {
            console.error('Error updating user:', updateError);
            return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
        }

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error updating user in Supabase:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
});
