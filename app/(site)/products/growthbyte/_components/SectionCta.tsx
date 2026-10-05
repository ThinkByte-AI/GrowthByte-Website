import Link from 'next/link'

interface SectionCtaProps {
  line: string
  isDark?: boolean
}

// One CTA shape for every section so each one ends by pointing back to the form.
export default function SectionCta({ line, isDark = false }: SectionCtaProps) {
  return (
    <div className={isDark ? 'sec-cta wl-sec-cta wl-sec-cta-dark' : 'sec-cta wl-sec-cta'}>
      <div className="sec-cta-t">{line}</div>
      <Link href="#waitlist" className="gb-btn gb-btn-teal">Claim my founding slot →</Link>
    </div>
  )
}
