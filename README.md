# AI Contract Review Service

## Environment Setup

To run this application, you need to set up the following environment variables:

### Database
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lawyer"
```

### NextAuth
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### OAuth Providers

#### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials
5. Create OAuth 2.0 Client ID
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the client ID and secret

```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### Kakao
1. Go to [Kakao Developers](https://developers.kakao.com)
2. Create a new application
3. Add platform: Web
4. Set redirect URI: `http://localhost:3000/api/auth/callback/kakao`
5. Copy the client ID and secret

```bash
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"
```

#### Naver
1. Go to [Naver Developers](https://developers.naver.com)
2. Create a new application
3. Set callback URL: `http://localhost:3000/api/auth/callback/naver`
4. Copy the client ID and secret

```bash
NAVER_CLIENT_ID="your-naver-client-id"
NAVER_CLIENT_SECRET="your-naver-client-secret"
```

### Email (SMTP)
For Gmail:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the following settings:

```bash
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-specific-password"
SMTP_FROM="your-email@gmail.com"
```

### Application
```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Run the development server:
```bash
npm run dev
```

## Features

- User authentication with email/password
- Social authentication (Google, Kakao, Naver)
- Email verification
- Password reset
- Subscription management
- Contract review with AI
- Payment processing

## Tech Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Nodemailer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production Launch Checklist

- Set `SENTRY_DSN` in your environment for error monitoring (see Sentry docs).
- Use Redis for rate limiting in `middleware.ts` (replace in-memory store).
- Review and complete all items in `SECURITY_REVIEW.md`.
- Run all tests: `npm test` and `npx playwright test`.
- Complete manual QA in `QA_ERROR_PAGES.md`.

## Mobile & Accessibility QA Checklist
- [ ] Test all pages on mobile (iOS/Android) and major browsers
- [ ] Check all forms and buttons are accessible via keyboard
- [ ] Use Lighthouse (Chrome DevTools) to check a11y and performance
- [ ] All images have alt text
- [ ] Sufficient color contrast

## Automated a11y/mobile check
You can run Lighthouse CI or use Chrome DevTools > Lighthouse tab for automated checks.
