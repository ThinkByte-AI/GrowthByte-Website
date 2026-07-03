import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'
import { ArrowIcon, PhoneIcon } from './icons'
import type { MidCtaData } from './types'

export default function MidCta({ data }: { data: MidCtaData }) {
  return (
    <div className="midcta">
      <div className="midcta-in">
        <div>
          <div className="midcta-t">{data.title}</div>
          <div className="midcta-sub">{data.subtitle}</div>
        </div>
        <div className="midcta-r">
          <span className="midcta-call">
            <PhoneIcon />
            <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
          </span>
          <Link href="/contact" className="gb-btn gb-btn-white">
            {data.buttonLabel} <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
