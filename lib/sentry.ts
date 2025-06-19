// Sentry integration for error monitoring
// TODO: Replace with your Sentry DSN
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || '', // Add your Sentry DSN here
  tracesSampleRate: 1.0,
}); 