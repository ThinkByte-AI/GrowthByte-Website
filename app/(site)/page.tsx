import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import MetricBar from '@/components/home/MetricBar'
import ProblemSection from '@/components/home/ProblemSection'
import ComparisonSection from '@/components/home/ComparisonSection'
import MidCta from '@/components/home/MidCta'
import OperatingModelSection from '@/components/home/OperatingModelSection'
import ServicesSection from '@/components/home/ServicesSection'
import NumbersBand from '@/components/home/NumbersBand'
import CaseStudiesSection from '@/components/home/CaseStudiesSection'
import IndustriesSection from '@/components/home/IndustriesSection'
import ProcessSection from '@/components/home/ProcessSection'
import FoundersSection from '@/components/home/FoundersSection'
import ToolsSection from '@/components/home/ToolsSection'
import FinalCtaSection from '@/components/home/FinalCtaSection'
import FaqSection from '@/components/home/FaqSection'
import Wordmark from '@/components/home/Wordmark'

export const metadata: Metadata = {
  title: { absolute: 'GrowthByte.ai | AI Marketing Agency India | Lower CAC, Higher ROAS' },
  description: 'GrowthByte.ai pairs senior strategists with AI systems to lower CAC by an average of 42%, lift ROAS 3.1x, and build compounding revenue pipelines for SaaS, D2C, FinTech and Healthcare companies in India.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'GrowthByte.ai | AI Marketing Agency India',
    description: 'Senior strategists and AI systems on one mandate: your revenue number. Lower CAC, lift ROAS, build pipeline that compounds.',
    url: 'https://www.growthbyte.ai',
  },
}

export default function HomePage() {
  return (
    <div className="gb-home">
      <Hero />
      <MetricBar />
      <ProblemSection />
      <ComparisonSection />
      <MidCta
        title="Stop running five vendors. Start running one engine."
        subtitle="One team owns every channel and the revenue behind it."
        buttonLabel="Book a free audit"
      />
      <OperatingModelSection />
      <ServicesSection />
      <NumbersBand />
      <CaseStudiesSection />
      <MidCta
        title="See what one engine could do for your revenue."
        subtitle="Thirty minutes with a senior strategist. Zero obligation."
        buttonLabel="Book a strategy call"
      />
      <IndustriesSection />
      <ProcessSection />
      <FoundersSection />
      <ToolsSection />
      <FinalCtaSection />
      <FaqSection />
      <Wordmark />
    </div>
  )
}
