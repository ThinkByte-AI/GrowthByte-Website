import type { GlobalConfig } from 'payload'
import { seoGroup, heroGroup } from './fields/hero'
import { metricBarGroup, numbersGroup, problemGroup } from './fields/proof'
import { comparisonGroup, operatingModelGroup, midCtaOneGroup, midCtaTwoGroup } from './fields/compare'
import { servicesGroup } from './fields/services'
import { caseStudiesGroup, industriesGroup } from './fields/showcase'
import { processGroup, foundersGroup, toolsGroup } from './fields/process'
import { finalCtaGroup, faqGroup } from './fields/closing'
import { revalidateHome } from './hooks'

export const HomePage: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  access: { read: () => true },
  admin: { group: 'Content' },
  fields: [
    seoGroup,
    heroGroup,
    metricBarGroup,
    problemGroup,
    comparisonGroup,
    midCtaOneGroup,
    operatingModelGroup,
    servicesGroup,
    numbersGroup,
    caseStudiesGroup,
    midCtaTwoGroup,
    industriesGroup,
    processGroup,
    foundersGroup,
    toolsGroup,
    finalCtaGroup,
    faqGroup,
  ],
  hooks: { afterChange: [revalidateHome] },
}
