import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'
import { uploadToS3 } from '@/lib/s3'

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      console.log(`[${new Date().toISOString()}] File upload attempt: unauthorized`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileName = formData.get('fileName') as string

    if (!file || !fileName) {
      console.log(`[${new Date().toISOString()}] File upload attempt: ${session.user.email} - missing file or fileName`);
      return NextResponse.json({ error: 'File and fileName are required' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      console.log(`[${new Date().toISOString()}] File upload attempt: ${session.user.email} - invalid file type: ${file.type}`);
      return NextResponse.json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' }, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.log(`[${new Date().toISOString()}] File upload attempt: ${session.user.email} - file too large: ${file.size}`);
      return NextResponse.json({ error: 'File size too large. Maximum size is 10MB.' }, { status: 400 })
    }

    // TODO: Integrate real virus/malware scanning in production
    // Example: Use ClamAV, VirusTotal API, or a cloud service
    // For now, simulate a scan and reject files named 'virus.pdf'
    if (fileName.toLowerCase().includes('virus')) {
      return NextResponse.json({ error: 'Malware detected in file. Upload rejected.' }, { status: 400 })
    }

    // Upload file to S3
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const s3Key = `${session.user.id}/${Date.now()}-${fileName}`;
    const s3Url = await uploadToS3({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: s3Key,
      Body: buffer,
      ContentType: file.type,
    });

    // Create contract record in database
    const contract = await prisma.contract.create({
      data: {
        userId: session.user.id,
        fileName: fileName,
        fileUrl: s3Url,
        status: 'UPLOADED',
        uploadedAt: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    console.log(`[${new Date().toISOString()}] File upload success: ${session.user.email} - ${fileName}`);

    return NextResponse.json({
      success: true,
      contract: {
        id: contract.id,
        fileName: contract.fileName,
        status: contract.status,
        uploadedAt: contract.uploadedAt,
        user: contract.user.name,
        fileUrl: contract.fileUrl,
      }
    })
  } catch (error) {
    if (typeof request !== 'undefined') {
      try {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email || 'unknown';
        console.log(`[${new Date().toISOString()}] File upload error: ${email} - ${error}`);
      } catch {}
    }
    console.error('Error uploading contract:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 