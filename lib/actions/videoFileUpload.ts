'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime';

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

const dateFileId = Date.now();

export async function uploadVideoFile(file: File) {
    const contentType = mime.getType(file.name) || 'application/octet-stream';
    const fileNameWithId = `${file.name}${dateFileId}`;

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: fileNameWithId,
        Body: file, // Send file directly as a binary stream
        ContentType: contentType,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log('File uploaded successfully');
        return { fileName: fileNameWithId, url: `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileNameWithId}` };
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error('Failed to upload file');
    }
}
