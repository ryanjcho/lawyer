/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'randomuser.me'],
  },
  webpack: (config) => {
    // Exclude problematic OpenTelemetry packages
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@opentelemetry/api': false,
      '@opentelemetry/core': false,
      '@opentelemetry/instrumentation': false,
    };
    
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src *; font-src 'self'; frame-src 'none';"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
        ]
      }
    ]
  },
  // TODO: Review for XSS/CSRF vulnerabilities before production
};

module.exports = nextConfig;
