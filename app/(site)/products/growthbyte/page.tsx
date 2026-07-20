import type { Metadata } from 'next'
import '../../gb-home.css'
import ProductHero from './_components/ProductHero'
import ProductFeatures from './_components/ProductFeatures'
import WaitlistSection from './_components/WaitlistSection'

export const metadata: Metadata = {
  title: { absolute: 'GrowthByte — The AI Growth Engine | Join the Waitlist' },
  description:
    'GrowthByte is the AI growth engine behind 42% CAC reductions and 3.1x ROAS — bid management, audience modelling, anomaly detection, and reporting. Join the early-access waitlist.',
  alternates: { canonical: '/products/growthbyte' },
  openGraph: {
    title: 'GrowthByte — The AI Growth Engine',
    description: 'The AI system our strategists run to lower CAC and lift ROAS. Now opening to a first cohort.',
    url: 'https://www.growthbyte.ai/products/growthbyte',
  },
}

export default function GrowthByteProductPage() {
  return (
    <div className="gb-home">
      <ProductHero />
      <ProductFeatures />
      <WaitlistSection />
    </div>
  )
}
