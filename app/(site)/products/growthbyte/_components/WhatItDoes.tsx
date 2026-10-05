import SectionCta from './SectionCta'

const STAGES = [
  {
    step: '01',
    name: 'Plan',
    desc: 'Set a goal for each client. GrowthByte OS turns it into a plan and tasks, grounded in that client’s brand and data.',
  },
  {
    step: '02',
    name: 'Execute',
    desc: 'AI workflows do the research, writing and reporting — on a schedule, for every client at once.',
  },
  {
    step: '03',
    name: 'Approve & report',
    desc: 'Your team reviews before anything ships. Clients follow progress in their own portal.',
  },
]

export default function WhatItDoes() {
  return (
    <section id="what-it-does" className="light wl-what">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">What GrowthByte OS does</span>
          <h2>Your agency’s client work, run by AI.</h2>
          <p className="lead">Today your team does every audit, brief, post and report by hand, client by client. GrowthByte OS does that work — your team decides and approves.</p>
        </div>
        <div className="wl-what-grid">
          {STAGES.map((stage) => (
            <div key={stage.name} className="wl-what-card">
              <div className="wl-what-step">{stage.step}</div>
              <div className="wl-what-name">{stage.name}</div>
              <p className="wl-what-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
        <SectionCta line="Want this running your clients’ work? Founding agencies get it first." />
      </div>
    </section>
  )
}
