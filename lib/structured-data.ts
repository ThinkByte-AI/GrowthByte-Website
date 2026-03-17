// JSON-LD structured data for SEO

const DESCRIPTION = 'GrowthByte deploys integrated AI systems + human strategy to drive measurable revenue growth for SaaS, D2C, FinTech, and Healthcare companies.'
const URL = 'https://www.growthbyte.ai'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthByte',
  url: URL,
  logo: `${URL}/logo.png`,
  description: DESCRIPTION,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8904879011',
    contactType: 'Customer Service',
    email: 'harsha@thinkbyte.ai',
  },
  sameAs: [
    'https://www.linkedin.com/company/growthbyte',
    'https://twitter.com/growthbyte',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GrowthByte',
  url: URL,
  description: DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'GrowthByte',
  },
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI-Powered Growth Marketing',
  provider: {
    '@type': 'Organization',
    name: 'GrowthByte',
  },
  areaServed: 'India',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${URL}/contact`,
  },
}
