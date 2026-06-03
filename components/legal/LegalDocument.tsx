import LegalHero from './LegalHero'
import LegalSection from './LegalSection'
import LegalContactCard from './LegalContactCard'
import type { LegalDocument as LegalDocumentData } from './types'

export default function LegalDocument({ doc }: { doc: LegalDocumentData }) {
  return (
    <>
      <LegalHero eyebrow={doc.eyebrow} title={doc.title} lastUpdated={doc.lastUpdated} />
      <div className="section-padding bg-surface">
        <div className="container-narrow">
          <p className="text-lead text-ink-60 leading-relaxed mb-12">{doc.intro}</p>
          <div className="space-y-12">
            {doc.sections.map((section) => (
              <LegalSection key={section.id} section={section} />
            ))}
          </div>
          <LegalContactCard />
        </div>
      </div>
    </>
  )
}
