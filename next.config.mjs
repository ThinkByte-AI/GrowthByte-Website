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
      '/services/content-at-scale',
      '/services/social-media-marketing',
      '/services/email-marketing',
      '/services/creative',
      '/services/cro',
      '/industries/ai-companies',
    ]
    return [
      ...comingSoon.map((source) => ({ source, destination: '/contact', permanent: false })),
      // Single product for now — send the bare /products to it.
      { source: '/products', destination: '/products/growthbyte', permanent: false },
      // /insights was a hardcoded duplicate blog — consolidate onto the CMS blog.
      // permanent (301) so search engines transfer ranking/authority to /blog.
      { source: '/insights', destination: '/blog', permanent: true },
      { source: '/insights/:path*', destination: '/blog', permanent: true },
    ]
  },
  // Unlisted prospect demo: a self-contained static page in public/, served at a
  // clean URL that nothing on the site links to.
  async rewrites() {
    return [{ source: '/modalx/smb-offering', destination: '/modalx/smb-offering.html' }]
  },
  // The demo must stay out of search and AI training/answer sets. The header
  // covers crawlers that fetch the URL directly and ignore in-page meta tags.
  async headers() {
    return [
      {
        source: '/modalx/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, {
  configPath: './src/payload.config.ts',
})
