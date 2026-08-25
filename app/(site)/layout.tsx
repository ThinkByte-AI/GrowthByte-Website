import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import './gb-theme.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Wordmark from '@/components/Wordmark'
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
    template: '%s — GrowthByte',
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
    icon: [{ url: '/logo.jpeg', type: 'image/jpeg' }],
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  other: {
    'script:ld+json': [
      JSON.stringify(organizationSchema),
      JSON.stringify(websiteSchema),
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-ink text-ink">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen bg-surface">{children}</main>
        <Footer />
        <Wordmark />

        {/* Google Analytics - loads after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BRK30WK0FW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BRK30WK0FW');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y7r4h1t3v9");
          `}
        </Script>
      </body>
    </html>
  )
}
