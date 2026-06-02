import type { ReactNode } from 'react'

interface CaseStudySectionProps {
  secNo: string
  heading: string
  label: string
  paragraphs?: string[]
  altBg?: boolean
  children?: ReactNode
}

export default function CaseStudySection({ secNo, heading, label, paragraphs, altBg, children }: CaseStudySectionProps) {
  return (
    <section className="cs-section" style={altBg ? { background: 'var(--gb-paper-2)' } : undefined}>
      <div className="gbx-container">
        <div className="cs-section-head">
          <div className="sec-no">{secNo}</div>
          <h2>{heading}</h2>
        </div>
        <div className="body-cols">
          <div className="label">{label}</div>
          <div className="body">
            {paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
