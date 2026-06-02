import Link from 'next/link'
import ContactRow from './ContactRow'
import SocialLinks from './SocialLinks'

export default function BrandColumn() {
  return (
    <div className="lg:col-span-2 pr-0 lg:pr-8">
      <Link href="/" className="inline-block mb-4" aria-label="GrowthByte home">
        <span className="text-xl font-bold tracking-tight">
          Growth<span className="text-teal">Byte</span>
        </span>
      </Link>
      <p className="text-[0.9rem] text-white/50 leading-relaxed mb-6 max-w-[22rem]">
        AI systems + human strategy. Built to drive measurable outcomes — leads, CAC improvement, conversion growth, and revenue.
      </p>
      <ContactRow />
      <SocialLinks />
    </div>
  )
}
