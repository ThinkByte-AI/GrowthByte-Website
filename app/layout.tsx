import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.growthbyte.ai'),
  title: {
    default: 'GrowthByte — AI-Powered Growth Partner',
    template: '%s — GrowthByte'
  },
  description: 'Integrated AI systems + senior strategists. Driving measurable CAC reduction, ROAS improvement, and revenue growth for SaaS, D2C, FinTech, and Healthcare companies.',
  keywords: ['AI growth partner', 'performance marketing', 'CAC reduction', 'ROAS improvement', 'SEO', 'marketing automation', 'growth strategy', 'SaaS marketing', 'D2C marketing'],
  authors: [{ name: 'GrowthByte' }],
  creator: 'GrowthByte',
  verification: {
    google: 'jbQWvQPuXS1f5YYxhgJpuqaE0Ey0DplprdQtFdcaO0s',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.growthbyte.ai',
    siteName: 'GrowthByte',
    title: 'GrowthByte — AI-Powered Growth Partner',
    description: 'AI systems + human strategy. Built to drive measurable revenue growth.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthByte — AI-Powered Growth Partner',
    description: 'AI systems + human strategy. Built to drive measurable revenue growth.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BRK30WK0FW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BRK30WK0FW');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased bg-surface text-ink">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
