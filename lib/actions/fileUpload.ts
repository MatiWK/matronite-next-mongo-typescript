'use server';

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime'

const dateFileId =  Date.now();

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string
    }
});

async function uploadFileToS3(buffer: Buffer, fileName: string) {
    const contentType = mime.getType(fileName) || 'application/octet-stream';
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `${fileName}${dateFileId}`,
        Body: buffer,
        ContentType: contentType
    };

    const command = new PutObjectCommand(params);
    try {
        const response = await s3Client.send(command);
        console.log('file uploaded', response);
        return fileName;
    } catch (error) {
        throw error;
    }
}

export async function uploadFile(base64String: string, fileName: string) {
    try {
        if (!base64String) return;

        // Convert base64 string back to buffer
        const buffer = Buffer.from(base64String, 'base64');
        
        await uploadFileToS3(buffer, fileName);

        revalidatePath("/");
        return JSON.parse(JSON.stringify({fileName, dateFileId}))
    } catch (error) {
        return { status: "error", message: "Failed to upload file" };
    }
}
