import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3({
  Bucket,
  Key,
  Body,
  ContentType,
}: {
  Bucket: string;
  Key: string;
  Body: Buffer | Uint8Array | Blob | string;
  ContentType: string;
}): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket,
      Key,
      Body,
      ContentType,
      ACL: 'public-read',
    })
  );
  return `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
} 