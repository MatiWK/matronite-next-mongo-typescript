import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime';

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        const contentType = mime.getType(file.name) || 'application/octet-stream';
        const fileName = `${Date.now()}-${file.name}`;
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array

        const params = {
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
            Key: fileName,
            Body: uint8Array, // Use Uint8Array
            ContentType: contentType,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileName}`;

        return NextResponse.json({ fileName, fileUrl });
    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
