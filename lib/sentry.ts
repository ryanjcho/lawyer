// Sentry integration for error monitoring
// TODO: Replace with your Sentry DSN
import * as Sentry from '@sentry/nextjs';
import { envConfig } from '@/config/env.config';

Sentry.init({
  dsn: envConfig.sentry.dsn, // Add your Sentry DSN here
  tracesSampleRate: 1.0,
}); 