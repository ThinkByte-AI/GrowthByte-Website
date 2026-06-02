import type { CaseStudyStep } from '../../_components/types'

export default function CaseStudySteps({ steps }: { steps: CaseStudyStep[] }) {
  return (
    <div className="steps">
      {steps.map((step, i) => (
        <div key={step.title} className="step">
          <div className="no">
            Step <span className="big">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="content">
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
            <div className="tag-list">
              {step.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <div className="marker" />
        </div>
      ))}
    </div>
  )
}
