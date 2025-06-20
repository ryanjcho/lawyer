#!/usr/bin/env ts-node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

console.log('🔧 Setting up environment variables...\n');

const envPath = join(process.cwd(), '.env');
const envExamplePath = join(process.cwd(), '.env.example');

// Check if .env already exists
if (existsSync(envPath)) {
  console.log('⚠️  .env file already exists. This script will not overwrite it.');
  console.log('   If you want to start fresh, delete the .env file and run this script again.\n');
  process.exit(0);
}

// Read .env.example
if (!existsSync(envExamplePath)) {
  console.error('❌ .env.example file not found. Please create it first.');
  process.exit(1);
}

const envExample = readFileSync(envExamplePath, 'utf8');

// Generate a secure NEXTAUTH_SECRET
const nextAuthSecret = randomBytes(32).toString('hex');

// Replace placeholder values
let envContent = envExample
  .replace('your-nextauth-secret-here', nextAuthSecret)
  .replace('your-s3-bucket-name', 'lawscan-uploads')
  .replace('your-openai-api-key', 'sk-your-openai-api-key-here')
  .replace('your-sentry-dsn', 'https://your-sentry-dsn@sentry.io/project-id')
  .replace('your-imp-key', 'your-imp-key-here')
  .replace('your-imp-secret', 'your-imp-secret-here')
  .replace('your-imp-user-code', 'your-imp-user-code-here')
  .replace('your-virus-scan-api-key', 'your-virus-total-api-key-here');

// Write .env file
writeFileSync(envPath, envContent);

console.log('✅ .env file created successfully!');
console.log('✅ Generated secure NEXTAUTH_SECRET');
console.log('\n📋 Next steps:');
console.log('1. Edit the .env file and fill in your actual values:');
console.log('   - AWS credentials (S3 bucket, access keys)');
console.log('   - OpenAI API key');
console.log('   - Email SMTP settings');
console.log('   - Payment gateway credentials (I\'mport)');
console.log('   - Virus scanning API key (VirusTotal)');
console.log('   - Sentry DSN for error monitoring');
console.log('\n2. Set up your database:');
console.log('   npm run prisma:migrate');
console.log('\n3. Start the development server:');
console.log('   npm run dev');
console.log('\n🔒 Security notes:');
console.log('- Never commit the .env file to version control');
console.log('- Use strong, unique passwords for all services');
console.log('- Enable 2FA on all external service accounts');
console.log('- Regularly rotate API keys and secrets'); 