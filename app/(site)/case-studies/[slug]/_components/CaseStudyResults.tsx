import type { CaseStudy } from '../../_components/types'

interface CaseStudyResultsProps {
  cs: CaseStudy
  paragraph: string
}

export default function CaseStudyResults({ cs, paragraph }: CaseStudyResultsProps) {
  return (
    <section className="cs-section" style={{ background: 'var(--gb-black)', color: 'var(--gb-white)', borderTop: 'none' }}>
      <div className="gbx-container">
        <div className="cs-section-head">
          <div className="sec-no" style={{ color: 'rgba(255,255,255,0.5)' }}>04 · The Results</div>
          <h2 style={{ color: 'var(--gb-white)' }}>What the engagement moved.</h2>
        </div>
        <div className="body-cols">
          <div className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>Outcome</div>
          <div className="body">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, color: 'var(--gb-accent)' }}>
                {cs.metric}
              </span>
              <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.78)', fontWeight: 600 }}>
                {cs.metricLabel} · {cs.timeframe}
              </span>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', marginTop: 32 }}>{paragraph}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
