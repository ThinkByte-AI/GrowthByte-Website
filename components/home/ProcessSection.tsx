const STEPS = [
  {
    idx: '01', when: 'Weeks 1 to 2', name: 'Audit and discovery',
    desc: 'We take apart your analytics, ad accounts, SEO, email, and CRM, then map where the leverage is.',
    deliverable: 'Growth audit and scorecard',
  },
  {
    idx: '02', when: 'Weeks 3 to 4', name: 'Strategy and architecture',
    desc: 'Channel priorities, audience design, messaging, and 90-day targets. You approve before it goes live.',
    deliverable: 'Strategy doc and KPI dashboard',
  },
  {
    idx: '03', when: 'Weeks 5 to 6', name: 'Build and launch',
    desc: 'Campaigns, automations, and tracking go live. The AI starts learning. You see performance daily.',
    deliverable: 'Live campaigns and tracking',
  },
  {
    idx: '04', when: 'Ongoing', name: 'Optimise and scale',
    desc: 'AI handles daily optimisation. Strategists review weekly, adjust monthly, plan quarterly.',
    deliverable: 'Weekly reports, monthly review',
  },
]

export default function ProcessSection() {
  return (
    <section className="light" id="process" aria-labelledby="proc-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">How It Works</span>
          <h2 id="proc-h">Audit to live in six weeks.</h2>
          <p className="lead">No onboarding limbo. No strategy-only quarter. We move fast because the system is proven.</p>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step" key={step.idx}>
              <span className="step-bn" aria-hidden="true">{step.idx}</span>
              <div className="step-idx">{step.idx}</div>
              <div className="step-when">{step.when}</div>
              <div className="step-name">{step.name}</div>
              <p className="step-desc">{step.desc}</p>
              <div className="step-del">{step.deliverable}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
