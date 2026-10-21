import { REFERRAL_REWARD_THRESHOLD } from '@/lib/waitlist/constants'
import { describeFoundingWindow, type LaunchSettings } from '@/lib/waitlist/launch-settings'
import SectionCta from './SectionCta'

function buildFaqs(settings: LaunchSettings) {
  return [
    {
      q: 'Who is GrowthByte OS for?',
      a: 'Agencies that run SEO, content, paid, social or AI-search work for clients, from a two-person shop to a large multi-team agency. Workspaces, pods and approvals scale with you. Businesses can get a Growth Strategy for themselves and send it to their agency.',
    },
    {
      q: 'Is there a trial?',
      a: 'There is no free tier. The Growth Proposal and Growth Strategy are how you see GrowthByte OS working on a real business before you commit. Founding agencies onboard directly with our team.',
    },
    {
      q: 'What does it cost?',
      a: 'Pricing is shared on the founding call and locked for founding agencies for as long as they stay.',
    },
    {
      q: 'When do I get access?',
      a: `Founding offers go out when workspaces open; list members hear first, in position order. Nothing is charged until your workspace is open. ${describeFoundingWindow(settings)}`,
    },
    {
      q: 'Can I take my data out?',
      a: 'Yes. Full export of your clients’ knowledge bases, workflows and reports at any time.',
    },
    {
      q: 'Does the AI publish without us?',
      a: 'No. Your team approves before anything ships to a client.',
    },
    {
      q: 'How does the referral work?',
      a: `After you join you get a personal link. When ${REFERRAL_REWARD_THRESHOLD} agencies join from it, you get 3 months free on any paid plan, applied automatically at launch.`,
    },
    {
      q: 'Can more than one person from my agency join?',
      a: 'One place on the list per company, matched by email domain. Colleagues can still request documents, and you add your team to the workspace when it opens.',
    },
  ]
}

export default function WaitlistFaq({ settings }: { settings: LaunchSettings }) {
  return (
    <section id="faq" className="light">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions agency owners ask.</h2>
        </div>
        <div className="faq-list">
          {buildFaqs(settings).map((item) => (
            <details key={item.q} className="fq">
              <summary className="fq-q">{item.q}</summary>
              <div className="fq-a"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
        <p className="faq-contact">Something else? <a href="mailto:agent@growthbyte.ai">agent@growthbyte.ai</a></p>
        <SectionCta line="See it work on a real business first: your client’s, or your own." />
      </div>
    </section>
  )
}
