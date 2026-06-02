import Link from 'next/link'
import type { Industry } from './types'
import GrowthLevers from './GrowthLevers'

export default function Hero({ industry }: { industry: Industry }) {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />
      <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All industries
            </Link>
            <span className="tag tag-dark mb-4 inline-block">Industry</span>
            <h1 className="text-white text-balance mb-4">{industry.name}</h1>
            <p className="text-teal-light text-body-lg font-medium mb-5">{industry.challenge}</p>
            <p className="text-white/55 text-body-lg max-w-[38rem] leading-relaxed">{industry.detail}</p>
          </div>
          <GrowthLevers industry={industry} />
        </div>
      </div>
    </section>
  )
}
