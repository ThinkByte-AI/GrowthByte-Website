import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'
import { ArrowIcon, PhoneIcon } from './icons'

interface MidCtaProps {
  title: string
  subtitle: string
  buttonLabel: string
}

export default function MidCta({ title, subtitle, buttonLabel }: MidCtaProps) {
  return (
    <div className="midcta">
      <div className="midcta-in">
        <div>
          <div className="midcta-t">{title}</div>
          <div className="midcta-sub">{subtitle}</div>
        </div>
        <div className="midcta-r">
          <span className="midcta-call">
            <PhoneIcon />
            <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
          </span>
          <Link href="/contact" className="gb-btn gb-btn-white">
            {buttonLabel} <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
