import Link from 'next/link'
import { DOORS_ANCHOR } from '@/lib/waitlist/constants'

interface SectionCtaProps {
  line: string
  isDark?: boolean
}

// One CTA shape for every section so each one ends by pointing back to the two doors.
export default function SectionCta({ line, isDark = false }: SectionCtaProps) {
  return (
    <div className={isDark ? 'sec-cta wl-sec-cta wl-sec-cta-dark' : 'sec-cta wl-sec-cta'}>
      <div className="sec-cta-t">{line}</div>
      <Link href={`#${DOORS_ANCHOR}`} className="gb-btn gb-btn-teal">Get a Growth Proposal →</Link>
    </div>
  )
}
