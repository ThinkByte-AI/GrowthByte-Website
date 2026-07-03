import type { Field } from 'payload'

const valueLabel: Field[] = [
  { name: 'value', type: 'text' },
  { name: 'label', type: 'text' },
]

export const metricBarGroup: Field = {
  name: 'metricBar',
  type: 'group',
  fields: [{
    name: 'items',
    type: 'array',
    fields: valueLabel,
    defaultValue: [
      { value: '42%', label: 'Avg CAC reduction' },
      { value: '3.1×', label: 'Avg ROAS' },
      { value: '₹50Cr+', label: 'Pipeline built' },
      { value: '92%', label: 'Client retention' },
      { value: '4.8/5', label: 'Client satisfaction' },
      { value: '20+', label: 'Brands trusted' },
      { value: '6 weeks', label: 'Audit to live' },
      { value: '90 days', label: 'To first results' },
    ],
  }],
}

export const numbersGroup: Field = {
  name: 'numbers',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'By The Numbers' },
    { name: 'heading', type: 'text', defaultValue: 'Proof, not promises.' },
    {
      name: 'items',
      type: 'array',
      fields: valueLabel,
      defaultValue: [
        { value: '42%', label: 'average CAC reduction within 90 days' },
        { value: '3.1×', label: 'average ROAS improvement' },
        { value: '₹50Cr+', label: 'pipeline built across all clients' },
        { value: '92%', label: 'client retention after 6 months' },
      ],
    },
  ],
}

export const problemGroup: Field = {
  name: 'problem',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Why Growth Stalls' },
    { name: 'heading', type: 'text', defaultValue: 'Effort was never the problem.' },
    {
      name: 'lead',
      type: 'textarea',
      defaultValue:
        'You have the budget, the team, and the intent. What is missing is one system where every channel feeds the same revenue number.',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'q', type: 'text' },
        { name: 'a', type: 'textarea' },
      ],
      defaultValue: [
        { q: 'Five vendors, nobody owns the funnel', a: 'SEO, paid, and design each optimise their own slice. Reports arrive on time, budget gets spent, and revenue never compounds the way it should.' },
        { q: 'Spend climbs, so does your CAC', a: 'Scaling a broken system only makes it more expensive. Broad targeting and no lifecycle engine mean every new customer costs more than the last.' },
        { q: 'Quarterly retainers, no annual owner', a: 'Strategy resets every 90 days, so nobody actually owns your yearly target. The agency ships work, sends an invoice, and moves on.' },
        { q: 'Tools bought, never connected', a: 'A stack of AI tools is not AI-powered growth. The promise only works when someone owns the outcome each tool is meant to drive.' },
      ],
    },
  ],
}
