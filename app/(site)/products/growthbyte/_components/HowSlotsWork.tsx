import { describeFirstLogins, describeFoundingWindow, type LaunchSettings } from '@/lib/waitlist/launch-settings'
import SectionCta from './SectionCta'

function buildSteps(settings: LaunchSettings) {
  return [
    {
      when: 'Today · 2 minutes',
      name: 'Pick your door',
      desc: 'Agencies enter a client’s website and goal. Businesses enter their own. Work email only.',
    },
    {
      when: 'Right after',
      name: 'Confirm your email',
      desc: 'Click the link we email you. Your place on the GrowthByte OS list is fixed in that order and never changes.',
    },
    {
      when: 'Within 24 hours',
      name: 'Your document arrives',
      desc: 'A Growth Proposal for your client, or a Growth Strategy for your business — built by GrowthByte OS on the real website.',
    },
    {
      when: describeFirstLogins(settings),
      name: 'Founding offers go out',
      desc: `List members hear first, in position order. ${describeFoundingWindow(settings)}`,
    },
  ]
}

export default function HowSlotsWork({ settings }: { settings: LaunchSettings }) {
  return (
    <section id="how-it-works" className="light">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">How it works</span>
          <h2>See GrowthByte OS work on a real business first.</h2>
          <p className="lead">There is no free tier. The document is how you try it — on your client or your own business.</p>
        </div>
        <div className="steps">
          {buildSteps(settings).map((step, i) => (
            <div key={step.name} className="step">
              <div className="step-bn" aria-hidden="true">{i + 1}</div>
              <div className="step-idx">0{i + 1}</div>
              <div className="step-when">{step.when}</div>
              <div className="step-name">{step.name}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
        <SectionCta line="Founding offers go out in list order. Get your document and your place now." />
      </div>
    </section>
  )
}
