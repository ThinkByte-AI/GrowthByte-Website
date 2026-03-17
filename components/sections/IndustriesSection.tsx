import Link from 'next/link'
import { INDUSTRIES } from '@/lib/constants'

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-surface scroll-mt-header">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <p className="section-eyebrow">Industry fit</p>
            <h2 className="section-heading text-balance">
              Built for your vertical, not for every vertical.
            </h2>
            <p className="text-body-lg text-ink-60 leading-relaxed mb-8">
              Generic growth playbooks fail because the buyer journey, CAC benchmarks, and channel mix are completely different across industries. We work in five verticals — and know the nuances of each.
            </p>
            <Link href="/industries" className="btn-secondary">
              Explore by industry
            </Link>
          </div>

          {/* Right: industry cards */}
          <div className="space-y-3">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="flex items-start gap-4 p-5 rounded-xl border border-surface-border bg-surface hover:border-teal/25 hover:bg-teal-muted/20 transition-all duration-250 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-ink text-[0.9375rem]">{industry.name}</h4>
                    <span className="tag-teal text-[0.7rem] opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </span>
                  </div>
                  <p className="text-sm text-ink-60 leading-relaxed">{industry.challenge}</p>
                </div>
                <svg className="w-4 h-4 text-ink-20 group-hover:text-teal flex-shrink-0 mt-1 transition-colors duration-250 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
