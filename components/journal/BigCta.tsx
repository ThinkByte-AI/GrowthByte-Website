import Link from 'next/link'
import { ArrowSmallIcon } from './icons'

interface CtaLink {
  label: string
  href: string
}

interface BigCtaProps {
  eyebrow: string
  heading: string
  sub: string
  primary: CtaLink
  secondary?: CtaLink
}

export default function BigCta({ eyebrow, heading, sub, primary, secondary }: BigCtaProps) {
  return (
    <section className="big-cta">
      <div className="glow-1" />
      <div className="gbx-container big-cta-inner">
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>{eyebrow}</div>
          <h2>{heading}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
          <p className="sub">{sub}</p>
          <div className="actions">
            <Link href={primary.href} className="gbx-btn gbx-btn-primary">
              {primary.label} <ArrowSmallIcon />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="gbx-btn gbx-btn-ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
