import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { supabase } from '@/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_REGION || 'us-west-1',
    credentials: {
        accessKeyId: process.env.NEXT_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_AWS_SECRET_KEY!
    }
});

export const POST = async function handler(
    req: NextRequest,
    context: { params: Record<string, string | string[]> }
) {
    return withApiAuthRequired(async () => {
        try {
            const { fileName, fileType, class_id, user_email } = await req.json();

            if (!fileName || !fileType || !class_id || !user_email) {
                return NextResponse.json(
                    { error: 'fileName, fileType, class_id, and user_email are required' },
                    { status: 400 }
                );
            }

            const uniqueFileName = `${uuidv4()}-${fileName}`;

            const command = new PutObjectCommand({
                Bucket: process.env.NEXT_AWS_BUCKET_NAME!,
                Key: `uploads/${uniqueFileName}`,
                ContentType: fileType,
            });

            const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            
            // Create document record in Supabase
            const { data: document, error: documentError } = await supabase
                .from('Document')
                .insert({
                    name: fileName,
                    aws_url: `https://${process.env.NEXT_AWS_BUCKET_NAME}.s3.${process.env.NEXT_AWS_REGION}.amazonaws.com/uploads/${uniqueFileName}`,
                    user_email: user_email,
                    class_id: class_id,
                    created_at: new Date().toISOString()
                })
                .select('*')
                .single();

            if (documentError) {
                console.error('Error creating document record:', documentError);
                return NextResponse.json(
                    { error: 'Failed to create document record' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ presignedUrl, document });
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            return NextResponse.json(
                { error: 'Failed to generate presigned URL' },
                { status: 500 }
            );
        }
    })(req, context);
}; 