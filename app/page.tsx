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
  title: 'GrowthByte — AI-Powered Growth Partner for Ambitious Companies',
  description: 'GrowthByte deploys integrated AI systems across paid media, SEO, content, and lifecycle marketing — guided by senior strategists. Measurable CAC reduction, ROAS improvement, and revenue growth.',
  openGraph: {
    title: 'GrowthByte — AI-Powered Growth Partner',
    description: 'AI systems + human strategy. Built to drive measurable revenue growth for SaaS, D2C, FinTech, and Healthcare companies.',
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
