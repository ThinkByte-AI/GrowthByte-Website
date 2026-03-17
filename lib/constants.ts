// ─── Navigation ─────────────────────────────────────────────────────────────
export const NAVIGATION_ITEMS = [
  { name: 'Services',     href: '/services' },
  { name: 'Industries',   href: '/industries' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About',        href: '/about' },
  { name: 'Insights',     href: '/insights' },
] as const

// ─── Company ─────────────────────────────────────────────────────────────────
export const COMPANY_INFO = {
  name:      'GrowthByte',
  tagline:   'AI-Powered Growth Partner',
  website:   'https://www.growthbyte.ai',
  url:       'https://www.growthbyte.ai',
} as const

// ─── Contact ─────────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  email:     'harsha@thinkbyte.ai',
  phone:     '+91-8904879011',
  phoneHref: 'tel:+918904879011',
  emailHref: 'mailto:harsha@thinkbyte.ai',
} as const

// ─── Social ───────────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  linkedin:  '#',
  twitter:   '#',
  instagram: '#',
} as const

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    slug:        'growth-strategy',
    title:       'Growth Strategy',
    shortTitle:  'Strategy',
    outcome:     'A clear blueprint for where to invest and what to expect',
    description: 'We start with a deep audit of your business, funnel, and competitive landscape. What comes out is a channel-level strategy tied to revenue targets — not traffic goals.',
    capabilities: ['Full-funnel audit', 'Competitive mapping', 'KPI architecture', 'Budget allocation modelling'],
  },
  {
    slug:        'performance-marketing',
    title:       'Performance Marketing',
    shortTitle:  'Paid Media',
    outcome:     'Lower CAC, higher ROAS, predictable pipeline',
    description: 'AI-optimised campaigns across Google, Meta, and LinkedIn. We don\'t set and forget — our systems iterate daily and our strategists review weekly.',
    capabilities: ['Google & Meta Ads', 'LinkedIn B2B campaigns', 'AI bid optimisation', 'Conversion tracking'],
  },
  {
    slug:        'seo',
    title:       'SEO & Content',
    shortTitle:  'SEO',
    outcome:     'Compounding organic growth that runs without ad spend',
    description: 'Technical SEO, content strategy, and link building that builds durable traffic. Organic compounds. You build it once, it pays for years.',
    capabilities: ['Technical SEO audit', 'Content strategy & production', 'Link building', 'Core Web Vitals'],
  },
  {
    slug:        'marketing-automation',
    title:       'Marketing Automation',
    shortTitle:  'Automation',
    outcome:     'Leads nurtured and converted without manual intervention',
    description: 'Lifecycle sequences, lead scoring, and CRM orchestration that move prospects through your funnel even when your team is offline.',
    capabilities: ['Email & SMS sequences', 'Lead scoring models', 'CRM integration', 'Re-engagement campaigns'],
  },
  {
    slug:        'analytics-reporting',
    title:       'Analytics & Attribution',
    shortTitle:  'Analytics',
    outcome:     'Know exactly which channels drive revenue — and which don\'t',
    description: 'Custom dashboards and multi-touch attribution models that give you clarity on what\'s working. Decision-making backed by data, not gut feel.',
    capabilities: ['GA4 & custom dashboards', 'Multi-touch attribution', 'Cohort analysis', 'Executive reporting'],
  },
  {
    slug:        'creative-cro',
    title:       'Creative & CRO',
    shortTitle:  'Creative',
    outcome:     'Higher conversion rates across every touchpoint',
    description: 'Landing pages, ad creatives, and website experiences built to convert. We test systematically and iterate fast.',
    capabilities: ['Landing page design', 'A/B & multivariate testing', 'Ad creative production', 'UX audits'],
  },
] as const

// ─── Industries ───────────────────────────────────────────────────────────────
export const INDUSTRIES = [
  {
    slug:      'saas',
    name:      'SaaS',
    challenge: 'Reduce CAC, improve trial-to-paid, extend LTV',
    detail:    'Product-led and sales-led motions require different playbooks. We know both.',
  },
  {
    slug:      'd2c-ecommerce',
    name:      'D2C & E-Commerce',
    challenge: 'Lower ROAS targets, higher AOV, stronger retention',
    detail:    'Full-funnel from discovery to repeat purchase — with a strong emphasis on lifecycle marketing.',
  },
  {
    slug:      'healthcare',
    name:      'Healthcare',
    challenge: 'Patient acquisition within strict compliance boundaries',
    detail:    'Growth marketing that respects privacy regulations and builds trust with cautious buyers.',
  },
  {
    slug:      'fintech',
    name:      'FinTech',
    challenge: 'Qualified lead generation with trust at the centre',
    detail:    'Regulated categories need precision targeting and credibility-first creative. We know the playbook.',
  },
  {
    slug:      'professional-services',
    name:      'Professional Services',
    challenge: 'Position for enterprise, shorten sales cycles',
    detail:    'Content, ABM, and thought leadership strategies that build pipeline for high-value service firms.',
  },
] as const

// ─── Homepage stats (proof strip) ────────────────────────────────────────────
export const PROOF_STATS = [
  { value: '42%',    label: 'avg. CAC reduction' },
  { value: '3.1×',   label: 'avg. ROAS improvement' },
  { value: '90 days',label: 'to first measurable results' },
  { value: '₹50Cr+', label: 'in pipeline generated' },
] as const

// ─── Case study highlights ────────────────────────────────────────────────────
export const CASE_STUDY_HIGHLIGHTS = [
  {
    slug:      'saas-cac-reduction',
    industry:  'SaaS',
    headline:  'Reduced CAC by 44% in 90 days',
    metric:    '44%',
    metricLabel: 'CAC reduction',
    summary:   'Rebuilt the paid acquisition strategy from scratch — new audience architecture, tighter creative testing, and daily AI-driven bid management.',
    timeframe: '90 days',
  },
  {
    slug:      'd2c-roas-growth',
    industry:  'D2C / E-Commerce',
    headline:  '3.8× ROAS on Meta within 60 days',
    metric:    '3.8×',
    metricLabel: 'ROAS',
    summary:   'Restructured Meta campaigns with AI-generated creative variants, tightened attribution, and a full lifecycle email overhaul that recovered abandoned carts.',
    timeframe: '60 days',
  },
  {
    slug:      'b2b-organic-growth',
    industry:  'B2B SaaS',
    headline:  '12× organic pipeline in 8 months',
    metric:    '12×',
    metricLabel: 'organic pipeline',
    summary:   'Built a content engine targeting high-intent search queries. Technical SEO fixes unlocked crawlability. 47 net-new ranking keywords in the first 90 days.',
    timeframe: '8 months',
  },
] as const
