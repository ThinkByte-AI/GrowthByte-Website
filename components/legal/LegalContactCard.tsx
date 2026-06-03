import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/company'

export default function LegalContactCard() {
  return (
    <div className="card-tinted mt-14">
      <h2 className="text-[1.25rem] font-semibold text-ink mb-2 tracking-[-0.01em]">Questions?</h2>
      <p className="text-body-md text-ink-60 leading-relaxed mb-5">
        If anything here is unclear, or you would like to exercise your rights, get in touch and we will be glad to help.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={CONTACT_INFO.emailHref} className="text-body-md font-semibold text-teal hover:text-teal-dark">
          {CONTACT_INFO.email}
        </a>
        <Link href="/contact" className="text-body-md font-semibold text-ink hover:text-teal">
          Book a strategy call &rarr;
        </Link>
      </div>
    </div>
  )
}
