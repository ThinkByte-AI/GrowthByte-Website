import type { Field } from 'payload'

export const finalCtaGroup: Field = {
  name: 'finalCta',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Ready to Grow?' },
    { name: 'headingBefore', type: 'text', defaultValue: 'Book a 30-minute audit. ' },
    { name: 'headingEmphasis', type: 'text', defaultValue: 'Keep the plan.' },
    { name: 'body', type: 'textarea', defaultValue: 'We walk your current setup, find the biggest opportunities in your funnel, and tell you exactly what we would fix in the first 90 days. The audit is yours whether you work with us or not.' },
    {
      name: 'checks',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
      defaultValue: [
        { value: '30 minutes with a senior strategist, not a sales rep' },
        { value: 'We audit your current setup live on the call' },
        { value: 'Your top 3 opportunities, clearly identified' },
        { value: 'Zero obligation' },
      ],
    },
    { name: 'proof', type: 'text', defaultValue: 'Joining 20+ SaaS, D2C, FinTech, and Healthcare companies.' },
    { name: 'formHeading', type: 'text', defaultValue: 'Get your free growth audit' },
    { name: 'formSub', type: 'text', defaultValue: 'We set up a call within 24 hours.' },
    { name: 'submitLabel', type: 'text', defaultValue: 'Book My Free Audit' },
    { name: 'secondaryLabel', type: 'text', defaultValue: 'See Results First' },
    { name: 'formMicro', type: 'text', defaultValue: 'No spam. No lock-in. Response within 24 hours.' },
  ],
}

export const faqGroup: Field = {
  name: 'faq',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Common Questions' },
    { name: 'heading', type: 'text', defaultValue: 'Answers, no caveats.' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'q', type: 'text' },
        { name: 'a', type: 'textarea' },
      ],
      defaultValue: [
        { q: 'What does AI-powered actually mean here?', a: 'AI runs the high-volume execution: bid management every hour, audience modelling, anomaly detection, and reporting. Senior strategists own the direction: channel strategy, creative, offers, and the calls data cannot make. You get the speed of automation with the judgment of experienced operators.' },
        { q: 'How long until we see results?', a: 'You are live in six weeks and see the first measurable results within 90 days. Paid channels move first. SEO and content compound over a longer horizon, usually showing clear momentum by months three to six.' },
        { q: 'What is the minimum investment?', a: 'We work with companies in the ₹5Cr to ₹100Cr revenue range and scope each engagement to the goal. Start with the channels that move the number first, then scale. There is no long-term lock-in, so you expand only when results justify it.' },
        { q: 'Do you work with our in-house team?', a: 'Yes. We plug in as an extension of your team, take the channels you want off your plate, and share one dashboard so everyone sees the same numbers. Your team stays focused on what it does best.' },
        { q: 'How do you report results?', a: 'A live dashboard from day one, weekly performance reports, a bi-weekly review call, a monthly strategy session, and quarterly planning. You are never left wondering what is happening with your budget.' },
      ],
    },
  ],
}
