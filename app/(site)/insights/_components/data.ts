export interface InsightPost {
  slug: string
  category: string
  title: string
  summary: string
  readTime: string
  date: string
}

export const INSIGHTS: InsightPost[] = [
  {
    slug: 'reducing-cac-with-ai-bid-management',
    category: 'Performance Marketing',
    title: 'How AI Bid Management Reduces CAC Without Reducing Volume',
    summary: 'Manual bidding strategies leave 20–30% efficiency on the table. Here is what changes when AI handles bid orchestration across Google and Meta simultaneously.',
    readTime: '6 min',
    date: 'Feb 2025',
  },
  {
    slug: 'saas-trial-to-paid-email-sequences',
    category: 'Marketing Automation',
    title: 'The 5-Email Sequence That Improved Trial-to-Paid by 22%',
    summary: 'Most SaaS trial sequences focus on features. This one focused on outcomes — and the conversion rate difference was significant.',
    readTime: '8 min',
    date: 'Jan 2025',
  },
  {
    slug: 'technical-seo-saas-guide',
    category: 'SEO',
    title: 'Technical SEO for SaaS: The 12 Issues That Cause 80% of Lost Traffic',
    summary: 'After auditing 40+ SaaS sites, the same 12 issues appear repeatedly. Most are fixable in under a day. Here is the full list and how to address each one.',
    readTime: '11 min',
    date: 'Dec 2024',
  },
  {
    slug: 'growth-strategy-before-channels',
    category: 'Growth Strategy',
    title: 'Why Your Channel Strategy Is Failing (And It Has Nothing to Do with the Channels)',
    summary: 'Before choosing channels, you need to answer four questions. Most companies skip them — and end up rebuilding strategy every 90 days.',
    readTime: '7 min',
    date: 'Nov 2024',
  },
  {
    slug: 'd2c-meta-ads-structure',
    category: 'Performance Marketing',
    title: 'The Meta Ads Structure That Delivered 3.8× ROAS for a D2C Brand',
    summary: 'Campaign architecture matters more than creative once you are past a certain spend level. Here is the exact structure — and why each decision was made.',
    readTime: '9 min',
    date: 'Oct 2024',
  },
  {
    slug: 'attribution-models-explained',
    category: 'Analytics',
    title: 'Last-Click Attribution Is Lying to You. Here Is What to Use Instead.',
    summary: 'Last-click attribution systematically undervalues the channels that build demand. Here is a practical framework for multi-touch attribution without a data science team.',
    readTime: '10 min',
    date: 'Sep 2024',
  },
]

export const CATEGORIES = ['All', 'Growth Strategy', 'Performance Marketing', 'SEO', 'Marketing Automation', 'Analytics']

export const TOPIC_TILES = [
  { name: 'Growth Strategy', count: '4 pieces' },
  { name: 'Performance Marketing', count: '2 pieces' },
  { name: 'SEO', count: '2 pieces' },
  { name: 'Automation', count: '1 piece' },
  { name: 'Analytics', count: '1 piece' },
  { name: 'More soon', count: '' },
]
