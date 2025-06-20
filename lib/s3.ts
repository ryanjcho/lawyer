import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { envConfig } from '@/config/env.config';

const s3 = new S3Client({
  region: envConfig.aws.region,
  credentials: {
    accessKeyId: envConfig.aws.accessKeyId,
    secretAccessKey: envConfig.aws.secretAccessKey,
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
  return `https://${Bucket}.s3.${envConfig.aws.region}.amazonaws.com/${Key}`;
} 