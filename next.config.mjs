import withPayload from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: '*.growthbyte.ai' },
      { protocol: 'https', hostname: '*.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 's3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Pages not built yet — funnel these to /contact until they ship.
  async redirects() {
    const comingSoon = [
      '/tools',
      '/tools/:path*',
      '/products',
      '/products/:path*',
      '/services/content-at-scale',
      '/services/social-media-marketing',
      '/services/email-marketing',
      '/services/creative',
      '/services/cro',
      '/industries/ai-companies',
    ]
    return comingSoon.map((source) => ({ source, destination: '/contact', permanent: false }))
  },
}

export default withPayload(nextConfig, {
  configPath: './src/payload.config.ts',
})
