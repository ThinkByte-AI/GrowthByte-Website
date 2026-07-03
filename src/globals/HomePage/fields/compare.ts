import type { Field } from 'payload'

export const comparisonGroup: Field = {
  name: 'comparison',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'The GrowthByte Difference' },
    { name: 'heading', type: 'text', defaultValue: 'Not an agency. Not a tool.' },
    { name: 'lead', type: 'textarea', defaultValue: 'How the three options most companies weigh compare on the things that actually move revenue.' },
    {
      name: 'columns',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
      defaultValue: [
        { value: 'You are comparing' }, { value: 'Traditional Agency' },
        { value: 'AI-Only Tools' }, { value: 'GrowthByte.ai' },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' }, { name: 'agency', type: 'text' },
        { name: 'tools', type: 'text' }, { name: 'growthbyte', type: 'text' },
      ],
      defaultValue: [
        { label: 'Speed to first result', agency: '90-day onboarding', tools: 'Fast setup, zero direction', growthbyte: 'Live in 6 weeks' },
        { label: 'Strategy ownership', agency: 'Rotating account manager', tools: 'No one owns it', growthbyte: 'Senior strategist plus AI' },
        { label: 'Revenue accountability', agency: 'Vanity metric reports', tools: 'No outcome ownership', growthbyte: 'Your revenue goal, owned' },
        { label: 'Channel integration', agency: 'Siloed, paid or SEO', tools: 'Single-channel by design', growthbyte: 'Every channel, one system' },
        { label: 'Contract flexibility', agency: '12-month lock-in', tools: 'Monthly subscription', growthbyte: 'Flexible, no lock-in' },
        { label: 'CAC over time', agency: 'Manual, lagging', tools: 'Optimises blindly', growthbyte: 'Avg 42% lower in 90 days' },
      ],
    },
    { name: 'ctaText', type: 'text', defaultValue: 'One system. Every channel. One number.' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Explore Services' },
    { name: 'ctaHref', type: 'text', defaultValue: '/services' },
  ],
}

export const operatingModelGroup: Field = {
  name: 'operatingModel',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Operating Model' },
    { name: 'heading', type: 'text', defaultValue: 'AI runs the volume. Humans run the call.' },
    { name: 'lead', type: 'textarea', defaultValue: 'AI without strategy burns budget at scale. Strategy without AI is too slow to compete. We run both in parallel, every day.' },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'badge', type: 'text' }, { name: 'name', type: 'text' }, { name: 'sub', type: 'text' },
        { name: 'items', type: 'array', fields: [{ name: 'value', type: 'text' }] },
      ],
      defaultValue: [
        { badge: 'AI Systems', name: 'Speed at scale', sub: 'Runs 24 hours a day, no intervention', items: [
          { value: 'Bid optimisation across platforms, hourly' }, { value: 'Audience segmentation and lookalike modelling' },
          { value: 'Real-time anomaly detection and pivots' }, { value: 'A/B and multivariate test orchestration' },
          { value: 'Predictive performance forecasting' }, { value: 'Automated attribution and reporting' } ] },
        { badge: 'Human Strategists', name: 'Judgment at the top', sub: 'What only senior operators can own', items: [
          { value: 'Channel strategy and budget architecture' }, { value: 'Creative direction and messaging hierarchy' },
          { value: 'Offer development and brand positioning' }, { value: 'Quarterly planning and market pivots' },
          { value: 'Stakeholder alignment' }, { value: 'The calls data alone cannot make' } ] },
      ],
    },
    { name: 'barText', type: 'textarea', defaultValue: 'AI output informs the strategy. The strategy configures the AI. That loop compounds month over month instead of plateauing.' },
    { name: 'barStat', type: 'text', defaultValue: 'avg. CAC ↓42% in 90 days' },
  ],
}

const midCta = (name: string, title: string, subtitle: string, buttonLabel: string): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: title },
    { name: 'subtitle', type: 'text', defaultValue: subtitle },
    { name: 'buttonLabel', type: 'text', defaultValue: buttonLabel },
  ],
})

export const midCtaOneGroup = midCta('midCtaOne', 'Stop running five vendors. Start running one engine.', 'One team owns every channel and the revenue behind it.', 'Book a free audit')
export const midCtaTwoGroup = midCta('midCtaTwo', 'See what one engine could do for your revenue.', 'Thirty minutes with a senior strategist. Zero obligation.', 'Book a strategy call')
