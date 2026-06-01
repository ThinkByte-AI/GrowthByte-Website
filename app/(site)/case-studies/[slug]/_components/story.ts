import type { CaseStudyHighlight } from '../../_components/types'

export interface CaseStudyStep {
  title: string
  detail: string
  tags: string[]
}

export interface CaseStudyStory {
  challenge: string[]
  approach: string[]
  steps: CaseStudyStep[]
  resultsParagraph: string
}

export const buildCaseStudyStory = (cs: CaseStudyHighlight): CaseStudyStory => {
  const goal = cs.metricLabel.toLowerCase()
  return {
    challenge: [
      `${cs.industry} came to us with a growth problem that looked like a channel problem and turned out to be something else. The team had run hard and the dashboard had stopped moving in the direction it needed to.`,
      `The brief was specific: move ${goal} without slowing growth, and do it inside the engagement window. The internal team had ideas — they needed an outside pair of eyes and a tighter operating cadence.`,
    ],
    approach: [
      'We started with diagnostics, not delivery. A focused deep dive into the customer file, channel-level economics, and the cohort decay curves surfaced where the leverage actually was.',
      'From there the program ran in three phases: subtraction (kill what is not working), depth (concentrate where conviction is highest), and infrastructure (measurement and creative testing that scales).',
    ],
    steps: [
      { title: 'Audit', detail: 'A two-week deep dive across the funnel, channel economics, and cohort behaviour. A single-page diagnostic delivered to leadership.', tags: ['Analytics'] },
      { title: 'Strategy', detail: 'A prioritised roadmap built before a single campaign change. The highest-leverage moves sequenced first.', tags: ['Growth Strategy'] },
      { title: 'Execution', detail: 'AI systems configured across the primary channels. Weekly reviews, with structural changes made on early signal.', tags: ['Paid Media', 'Automation'] },
      { title: 'Results', detail: `Compounding impact: ${cs.metric} ${goal} in ${cs.timeframe}, plus faster decisions and cleaner attribution.`, tags: ['Analytics'] },
    ],
    resultsParagraph: `The headline metric — ${cs.metric} ${goal} — is what made the board memo. The compounding effects we kept seeing afterward — faster decisions, cleaner attribution, and a cadence the team can run without us — are what made it durable.`,
  }
}
