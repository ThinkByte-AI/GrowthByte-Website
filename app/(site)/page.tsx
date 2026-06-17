import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import ProblemSection from '@/components/sections/ProblemSection'
import AIModelSection from '@/components/sections/AIModelSection'
import ServicesSection from '@/components/sections/ServicesSection'

// Lazy-load below-the-fold sections
const IndustriesSection  = dynamic(() => import('@/components/sections/IndustriesSection'))
const CaseStudiesSection = dynamic(() => import('@/components/sections/CaseStudiesSection'))
const ProcessSection     = dynamic(() => import('@/components/sections/ProcessSection'))
const FAQSection         = dynamic(() => import('@/components/sections/FAQSection'))
const ContactSection     = dynamic(() => import('@/components/sections/ContactSection'))

export const metadata: Metadata = {
  title: { absolute: 'AI Marketing Agency for Growth | GrowthByte.ai India' },
  description: 'We pair AI execution with senior strategists so SEO, ads and content pull one way. The result: 42% lower CAC and 3.1x ROAS, measured on revenue.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Marketing Agency for Growth | GrowthByte.ai India',
    description: 'We pair AI execution with senior strategists so SEO, ads and content pull one way. The result: 42% lower CAC and 3.1x ROAS, measured on revenue.',
    url: 'https://www.growthbyte.ai',
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />
      {/* 2. Trust / Proof strip */}
      <TrustStrip />
      {/* 3. Core problem */}
      <ProblemSection />
      {/* 4. AI + Human operating model */}
      <AIModelSection />
      {/* 5. Integrated service framework */}
      <ServicesSection />
      {/* 6. Industry fit */}
      <IndustriesSection />
      {/* 7. Case study highlights */}
      <CaseStudiesSection />
      {/* 8. Process */}
      <ProcessSection />
      {/* 9. FAQ */}
      <FAQSection />
      {/* 10. Final CTA */}
      <ContactSection />
    </>
  )
}
