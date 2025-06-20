import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'
import { uploadToS3 } from '@/lib/s3'
import { VirusScanService } from '@/lib/virusScan'
import { envConfig } from '@/config/env.config'

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

    // Convert file to buffer for virus scanning
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Virus scanning
    const virusScanService = VirusScanService.getInstance();
    const scanResult = await virusScanService.scanFile(buffer, fileName);
    
    if (!scanResult.isClean) {
      console.log(`[${new Date().toISOString()}] File upload attempt: ${session.user.email} - virus detected: ${scanResult.threats.join(', ')}`);
      return NextResponse.json({ 
        error: 'Malware detected in file. Upload rejected.',
        threats: scanResult.threats,
        provider: scanResult.provider
      }, { status: 400 })
    }

    // Upload file to S3
    const s3Key = `${session.user.id}/${Date.now()}-${fileName}`;
    const s3Url = await uploadToS3({
      Bucket: envConfig.aws.s3Bucket,
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

    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPLOAD_CONTRACT',
        details: `Contract ${contract.id} uploaded by ${session.user.email}. Virus scan: ${scanResult.provider} - Clean: ${scanResult.isClean}`
      }
    });

    console.log(`[${new Date().toISOString()}] File upload success: ${session.user.email} - ${fileName} (Virus scan: ${scanResult.provider})`);

    return NextResponse.json({
      success: true,
      contract: {
        id: contract.id,
        fileName: contract.fileName,
        status: contract.status,
        uploadedAt: contract.uploadedAt,
        user: contract.user.name,
        fileUrl: contract.fileUrl,
      },
      virusScan: {
        isClean: scanResult.isClean,
        provider: scanResult.provider,
        scanDate: scanResult.scanDate
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