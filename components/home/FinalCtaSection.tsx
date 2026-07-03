import AuditForm from './AuditForm'
import { CheckIcon } from './icons'
import type { FinalCtaData } from './types'

export default function FinalCtaSection({ data }: { data: FinalCtaData }) {
  const checks = data.checks ?? []
  return (
    <section className="final" id="contact" aria-labelledby="cta-h">
      <div className="wrap cta-in">
        <div>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="cta-h">{data.headingBefore}<em>{data.headingEmphasis}</em></h2>
          <p className="cta-body">{data.body}</p>
          <ul className="cta-checks">
            {checks.map((check, i) => (
              <li key={i}><span className="cta-chk"><CheckIcon /></span>{check.value}</li>
            ))}
          </ul>
          <p className="cta-proof">{data.proof}</p>
        </div>
        <AuditForm
          heading={data.formHeading}
          sub={data.formSub}
          submitLabel={data.submitLabel}
          secondaryLabel={data.secondaryLabel}
          micro={data.formMicro}
        />
      </div>
    </section>
  )
}
