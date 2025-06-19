"use client";
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from 'react-error-boundary';

export default function SentryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
          <h1 className="text-5xl font-bold text-red-600 mb-4">오류 발생</h1>
          <p className="text-xl text-gray-700 mb-8">문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
          <button onClick={resetErrorBoundary} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors mb-4">다시 시도</button>
        </div>
      )}
      onError={(error, info) => {
        Sentry.captureException(error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
} 