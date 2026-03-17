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
  title: {
    default: 'GrowthByte — AI-Powered Growth Partner',
    template: '%s — GrowthByte'
  },
  description: 'GrowthByte deploys integrated AI systems across paid media, SEO, content, and lifecycle marketing — guided by senior strategists. Measurable CAC reduction, ROAS improvement, and revenue growth.',
  keywords: ['AI growth partner', 'performance marketing', 'CAC reduction', 'ROAS improvement', 'SEO', 'marketing automation', 'growth strategy', 'SaaS marketing', 'D2C marketing'],
  authors: [{ name: 'GrowthByte' }],
  creator: 'GrowthByte',
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
