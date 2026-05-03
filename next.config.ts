import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode for better development experience
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      // Sanity CDN for staff photos and service images
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Cloudinary if used for additional images
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256, 400],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Allow Stripe and Cal.com iframes
      {
        source: '/book(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src https://cal.com https://js.stripe.com https://hooks.stripe.com;",
          },
        ],
      },
    ]
  },

  // Redirect legacy URLs if migrating from old site structure
  async redirects() {
    return [
      // Example: old contact form to new contact page
      { source: '/contact-us', destination: '/contact', permanent: true },
      // Add more as needed after auditing old site URLs
    ]
  },

  // Webpack for QR code library
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, canvas: false }
    return config
  },
}

export default nextConfig
