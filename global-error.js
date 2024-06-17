// global-error.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, // Adjust this value in production
  environment: process.env.NODE_ENV, // Optional, to distinguish between environments
});

// This will catch any React rendering errors
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  window.addEventListener('error', (event) => {
    Sentry.captureException(event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    Sentry.captureException(event.reason);
  });
}