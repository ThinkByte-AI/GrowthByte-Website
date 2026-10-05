export interface ProductFeature {
  key: string
  badge: string
  name: string
  desc: string
  // Real product screenshot under public/waitlist/features/; omitted until the feature can be shown honestly.
  imageSrc?: string
  // Spans two grid columns; the two wide cards keep seven cards filling a 3×3 grid.
  isWide?: boolean
}

// Only shipped features (checked against D:\growthbyte): no memory, CMS auto-publish, or full-site audit claims.
export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    key: 'workflows',
    imageSrc: '/waitlist/features/workflows.png',
    badge: 'Workflows',
    name: 'Describe it, and it’s built',
    desc: 'Describe the work in plain words or start from a template. Run it for every client, on a schedule.',
    isWide: true,
  },
  {
    key: 'approvals',
    imageSrc: '/waitlist/features/approvals.png',
    badge: 'Human in the loop',
    name: 'Nothing ships without you',
    desc: 'Approval steps pause a run until your team reviews and edits. Clients sign off on strategy and plans in their portal.',
  },
  {
    key: 'knowledge',
    imageSrc: '/waitlist/features/knowledge.png',
    badge: 'Knowledge base',
    name: 'Every client, fully briefed',
    desc: 'A brand and SEO knowledge base per client, filled by AI from their website and files. Every draft is grounded in it.',
  },
  {
    key: 'goals',
    imageSrc: '/waitlist/features/goals.png',
    badge: 'Goals & tasks',
    name: 'From goal to plan in minutes',
    desc: 'Set a client goal and GrowthByte OS drafts the sub-goals and tasks. Track it all on a board, timeline and calendar.',
  },
  {
    key: 'runs',
    imageSrc: '/waitlist/features/runs.png',
    badge: 'Runs',
    name: 'Watch every run — and fix it',
    desc: 'Live steps, files and estimated cost for each run. A step failed? Fix it with AI and run again.',
  },
  {
    key: 'portal',
    imageSrc: '/waitlist/features/portal.png',
    badge: 'Client portal',
    name: 'Clients see the work live',
    desc: 'Each client contact gets their own portal — goals, tasks, results and sign-offs — plus a weekly digest email.',
  },
  {
    key: 'health',
    imageSrc: '/waitlist/features/health.png',
    badge: 'Client Health',
    name: 'Know which client needs you',
    desc: 'A 0–100 health score for every client from traffic, goal pace and delivery — with call prep before you meet.',
    isWide: true,
  },
]
