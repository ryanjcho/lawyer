# Priority 2 Implementation: Security & Infrastructure

This document outlines the implementation of Priority 2 items: Environment Variables Setup, Email Verification System, Virus/Malware Scanning, and Production Rate Limiting.

## 🚀 Quick Start

1. **Setup Environment Variables:**
   ```bash
   npm run setup-env
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure your .env file** with actual values

4. **Start Redis server** (required for rate limiting)

5. **Run the application:**
   ```bash
   npm run dev
   ```

## 📋 Implemented Features

### 1. Environment Variables Setup

#### Files Modified:
- `config/env.config.ts` - Comprehensive environment configuration
- `.env.example` - Template with all required variables
- `scripts/setup-env.ts` - Automated setup script

#### New Environment Variables:
```bash
# AWS S3
AWS_REGION="ap-northeast-2"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_S3_BUCKET="your-s3-bucket-name"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Sentry (Error Monitoring)
SENTRY_DSN="your-sentry-dsn"

# Payment (I'mport)
IMP_KEY="your-imp-key"
IMP_SECRET="your-imp-secret"
IMP_USER_CODE="your-imp-user-code"

# Security
RATE_LIMIT_WINDOW_MS="60000"
RATE_LIMIT_MAX_REQUESTS="30"
VIRUS_SCAN_ENABLED="true"
VIRUS_SCAN_API_KEY="your-virus-scan-api-key"
VIRUS_SCAN_API_URL="https://api.virustotal.com/v3/files"

# Redis (for rate limiting)
REDIS_URL="redis://localhost:6379"
```

#### Features:
- ✅ Environment validation on startup
- ✅ Type-safe configuration
- ✅ Default values for development
- ✅ Required variable checking
- ✅ Automated setup script

### 2. Email Verification System

#### Files Modified:
- `app/api/auth/[...nextauth]/authOptions.ts` - Enabled email verification
- `app/verify-email/page.tsx` - Complete verification page
- `app/api/auth/verify-email/route.ts` - Verification API (already existed)

#### Features:
- ✅ Email verification required for login
- ✅ Verification email templates
- ✅ Token-based verification
- ✅ Resend verification email functionality
- ✅ User-friendly verification page
- ✅ Proper error handling

#### Flow:
1. User registers → Verification email sent
2. User clicks link → Email verified
3. User can now login → Access granted

### 3. Virus/Malware Scanning

#### Files Created:
- `lib/virusScan.ts` - Virus scanning service
- Updated `app/api/contracts/upload/route.ts` - Integrated scanning

#### Features:
- ✅ VirusTotal API integration
- ✅ File hash checking (avoid re-scanning)
- ✅ Multiple antivirus engine results
- ✅ Configurable scanning (can be disabled)
- ✅ Threat detection and reporting
- ✅ Audit logging for scan results

#### Supported Services:
- VirusTotal (primary)
- Extensible for other services (ClamAV, etc.)

#### Configuration:
```bash
VIRUS_SCAN_ENABLED="true"
VIRUS_SCAN_API_KEY="your-virus-total-api-key"
VIRUS_SCAN_API_URL="https://api.virustotal.com/v3/files"
```

### 4. Production Rate Limiting

#### Files Created:
- `lib/redis.ts` - Redis client configuration
- `lib/rateLimit.ts` - Rate limiting service
- Updated `middleware.ts` - Redis-based rate limiting

#### Features:
- ✅ Redis-based rate limiting (production-ready)
- ✅ Sliding window algorithm
- ✅ Configurable limits per endpoint
- ✅ Rate limit headers in responses
- ✅ Graceful degradation (allows requests if Redis is down)
- ✅ IP-based limiting with fallback

#### Configuration:
```bash
RATE_LIMIT_WINDOW_MS="60000"  # 1 minute window
RATE_LIMIT_MAX_REQUESTS="30"  # 30 requests per window
REDIS_URL="redis://localhost:6379"
```

#### Rate Limit Headers:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Reset time (Unix timestamp)
- `Retry-After` - Seconds to wait (when limited)

## 🔧 Additional Infrastructure

### Startup Scripts
- `lib/startup.ts` - Service initialization and validation
- Environment validation on startup
- Database connection testing
- Redis connection testing

### Error Handling
- Graceful degradation for external services
- Proper error logging
- User-friendly error messages

### Security Improvements
- ✅ Email verification required
- ✅ Virus scanning for uploads
- ✅ Rate limiting for API endpoints
- ✅ Environment variable validation
- ✅ Secure token generation

## 🚀 Deployment Checklist

### Required Services:
1. **Redis Server** - For rate limiting
2. **PostgreSQL Database** - For data storage
3. **AWS S3** - For file storage
4. **VirusTotal API** - For virus scanning
5. **SMTP Server** - For email sending

### Environment Setup:
1. Run `npm run setup-env`
2. Configure all environment variables
3. Set up Redis server
4. Configure database
5. Set up AWS S3 bucket
6. Configure email service

### Security Checklist:
- [ ] All API keys are secure
- [ ] Database is properly secured
- [ ] Redis is properly configured
- [ ] Email verification is enabled
- [ ] Virus scanning is enabled
- [ ] Rate limiting is configured
- [ ] Environment variables are validated

## 🧪 Testing

### Manual Testing:
1. **Email Verification:**
   - Register new user
   - Check email for verification link
   - Click link to verify
   - Try to login (should work)

2. **Virus Scanning:**
   - Upload clean file (should work)
   - Upload file with "virus" in name (should be rejected)
   - Check audit logs for scan results

3. **Rate Limiting:**
   - Make multiple API requests quickly
   - Check for 429 status code
   - Verify rate limit headers

### Automated Testing:
```bash
# Run tests
npm test

# Run E2E tests
npx playwright test
```

## 📊 Monitoring

### Logs to Monitor:
- Email verification attempts
- Virus scan results
- Rate limiting events
- Environment validation errors
- Service connection status

### Metrics to Track:
- Email verification success rate
- Virus scan success rate
- Rate limiting effectiveness
- Service uptime

## 🔄 Future Enhancements

### Potential Improvements:
1. **Virus Scanning:**
   - Add support for ClamAV
   - Implement local scanning
   - Add file type validation

2. **Rate Limiting:**
   - User-based rate limiting
   - Endpoint-specific limits
   - Rate limit analytics

3. **Email Verification:**
   - SMS verification option
   - Two-factor authentication
   - Email templates customization

4. **Environment Management:**
   - Environment-specific configs
   - Secret management service
   - Configuration validation UI

## 🆘 Troubleshooting

### Common Issues:

1. **Redis Connection Failed:**
   - Check Redis server is running
   - Verify REDIS_URL in .env
   - Check firewall settings

2. **Email Not Sending:**
   - Verify SMTP settings
   - Check email service credentials
   - Test SMTP connection

3. **Virus Scan Failing:**
   - Check VirusTotal API key
   - Verify API quota limits
   - Check network connectivity

4. **Rate Limiting Not Working:**
   - Verify Redis connection
   - Check rate limit configuration
   - Monitor Redis memory usage

### Debug Commands:
```bash
# Test Redis connection
redis-cli ping

# Check environment variables
npm run setup-env

# Test database connection
npm run setup-db

# View logs
tail -f logs/app.log
```

## 📚 Resources

- [VirusTotal API Documentation](https://developers.virustotal.com/reference)
- [Redis Documentation](https://redis.io/documentation)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [I'mport Payment Documentation](https://docs.iamport.kr/)

---

This implementation provides a solid foundation for production deployment with proper security measures, monitoring, and scalability considerations. 