export const PROOF_STATS = [
  { value: '42%', label: 'avg. CAC reduction' },
  { value: '3.1×', label: 'avg. ROAS improvement' },
  { value: '90 days', label: 'to first measurable results' },
  { value: '₹50Cr+', label: 'in pipeline generated' },
] as const

export const CASE_STUDY_HIGHLIGHTS = [
  {
    slug: 'saas-cac-reduction',
    industry: 'SaaS',
    headline: 'Reduced CAC by 44% in 90 days',
    metric: '44%',
    metricLabel: 'CAC reduction',
    summary:
      'Rebuilt the paid acquisition strategy from scratch — new audience architecture, tighter creative testing, and daily AI-driven bid management.',
    timeframe: '90 days',
  },
  {
    slug: 'd2c-roas-growth',
    industry: 'D2C / E-Commerce',
    headline: '3.8× ROAS on Meta within 60 days',
    metric: '3.8×',
    metricLabel: 'ROAS',
    summary:
      'Restructured Meta campaigns with AI-generated creative variants, tightened attribution, and a full lifecycle email overhaul that recovered abandoned carts.',
    timeframe: '60 days',
  },
  {
    slug: 'b2b-organic-growth',
    industry: 'B2B SaaS',
    headline: '12× organic pipeline in 8 months',
    metric: '12×',
    metricLabel: 'organic pipeline',
    summary:
      'Built a content engine targeting high-intent search queries. Technical SEO fixes unlocked crawlability. 47 net-new ranking keywords in the first 90 days.',
    timeframe: '8 months',
  },
] as const
