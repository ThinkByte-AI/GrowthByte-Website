import type { ReactNode } from 'react'

export interface ServiceItem {
  id: string
  navLabel: string
  tag: string
  name: string
  desc: string
  pills: string[]
  proof?: { value: string; label: string }
  href: string
  icon: ReactNode
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'gs', navLabel: 'Growth Strategy', tag: 'Growth Strategy', name: 'The blueprint before the build.',
    desc: 'We audit your business end to end, benchmark competitors, and build a roadmap with channel priorities, audience architecture, and 90-day KPI targets you approve before anything runs.',
    pills: ['Full-funnel audit', 'Competitive mapping', 'KPI architecture', 'ICP definition'],
    href: '/services/growth-strategy',
    icon: <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>,
  },
  {
    id: 'pm', navLabel: 'Performance Marketing', tag: 'Performance Marketing', name: 'Lower CAC. Better ROAS.',
    desc: 'Google, Meta, and LinkedIn campaigns with AI bid management running around the clock. We rebuild audience architecture and tighten creative-to-page alignment so every rupee works harder.',
    pills: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'AI bid management'],
    proof: { value: '42% avg CAC reduction', label: 'within 90 days' },
    href: '/services/performance-marketing',
    icon: <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
  },
  {
    id: 'seo', navLabel: 'SEO and Content', tag: 'SEO and Content', name: 'Organic that compounds.',
    desc: 'Technical SEO, on-page, link building, AEO, and GEO. We build content engines that rank for queries your buyers actually search and convert them into pipeline, not just traffic.',
    pills: ['Technical SEO', 'Link Building', 'AEO and GEO', 'Local SEO'],
    proof: { value: '12x organic pipeline', label: 'B2B SaaS, 8 months' },
    href: '/services/seo',
    icon: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  },
  {
    id: 'cas', navLabel: 'Content at Scale', tag: 'Content at Scale', name: 'Volume without the slop.',
    desc: 'Articles, landing pages, and assets drafted by our generator and refined by editors. High-volume content delivered fast, every piece built around real intent and a conversion path.',
    pills: ['Bulk article writing', 'Landing pages', 'AI plus expert refinement'],
    href: '/services/content-at-scale',
    icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  },
  {
    id: 'smm', navLabel: 'Social Media', tag: 'Social Media Marketing', name: 'Channels that build trust.',
    desc: 'Instagram, Facebook, LinkedIn, and YouTube strategy and management, aligned to your funnel rather than chasing engagement that never converts.',
    pills: ['Instagram', 'LinkedIn', 'YouTube', 'Facebook'],
    href: '/services/social-media-marketing',
    icon: <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    id: 'em', navLabel: 'Email Marketing', tag: 'Email Marketing', name: 'Your most underused channel.',
    desc: 'Automation, lead scoring, segmentation, and testing built around where each person is in the journey. No batch-and-blast. Every email has a purpose and a next step.',
    pills: ['Automation sequences', 'Lead scoring', 'Segmentation'],
    href: '/services/email-marketing',
    icon: <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  },
  {
    id: 'cr', navLabel: 'Creative', tag: 'Creative', name: 'Built to perform.',
    desc: 'Ad creative, landing pages, brand assets, and video, grounded in what your audience responds to. We test rather than assume, and build systems that keep improving.',
    pills: ['Ad creative', 'Landing pages', 'Brand assets', 'Video'],
    href: '/services/creative',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>,
  },
  {
    id: 'cro', navLabel: 'CRO', tag: 'CRO', name: 'More from the traffic you have.',
    desc: 'A/B testing, heatmaps, funnel analysis, and conversion optimisation. We find the leaks in your funnel and fix them before recommending you scale any spend.',
    pills: ['A/B testing', 'Funnel analysis', 'Heatmaps', 'Checkout optimisation'],
    href: '/services/cro',
    icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  },
]
