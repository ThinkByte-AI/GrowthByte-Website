import type { ProcessData } from './types'

export default function ProcessSection({ data }: { data: ProcessData }) {
  const steps = data.steps ?? []
  return (
    <section className="light" id="process" aria-labelledby="proc-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="proc-h">{data.heading}</h2>
          <p className="lead">{data.lead}</p>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={i}>
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
