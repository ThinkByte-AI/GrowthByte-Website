import type { Metadata } from 'next'
import Link from 'next/link'
import { INDUSTRIES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Industries — GrowthByte | Vertical-Specific Growth Systems',
  description: 'GrowthByte works in SaaS, D2C/E-Commerce, Healthcare, FinTech, and Professional Services. Proven playbooks, industry benchmarks, and prior results in each vertical.',
}

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <p className="section-eyebrow-dark">Industries</p>
              <h1 className="text-white text-balance mb-5">
                We specialise. Not generalise.
              </h1>
              <p className="text-white/55 text-body-lg max-w-[36rem] text-balance leading-relaxed">
                Generic growth playbooks fail because buyer journeys, CAC benchmarks, and channel mix differ completely across industries. We operate in five — and have proven playbooks for each.
              </p>
            </div>
            {/* Right: industry vertical stack */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[300px] space-y-2.5">
                {[
                  { name: 'SaaS', note: 'Trial-to-paid · CAC reduction' },
                  { name: 'D2C / E-Commerce', note: 'ROAS · Retention · LTV' },
                  { name: 'Healthcare', note: 'Compliant acquisition · Trust' },
                  { name: 'FinTech', note: 'Regulated channels · Pipeline' },
                  { name: 'Professional Services', note: 'Authority · Inbound · BD' },
                ].map((ind, i) => (
                  <div
                    key={ind.name}
                    className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3"
                    style={{ opacity: 1 - i * 0.06 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal text-[0.625rem] font-bold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/80 leading-none">{ind.name}</p>
                      <p className="text-[0.6875rem] text-white/35 mt-0.5">{ind.note}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-[0.6875rem] text-teal font-semibold">Proven ✓</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col bg-surface border border-surface-border rounded-2xl p-7 hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                <h2 className="font-bold text-ink text-[1.125rem] mb-2 group-hover:text-teal transition-colors">{industry.name}</h2>
                <p className="text-sm font-medium text-teal mb-4">{industry.challenge}</p>
                <p className="text-sm text-ink-60 leading-relaxed flex-1">{industry.detail}</p>
                <div className="flex items-center gap-1 mt-5 text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  View playbook
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}

            {/* CTA card */}
            <div className="flex flex-col justify-between bg-teal rounded-2xl p-7">
              <div>
                <h2 className="font-bold text-white text-[1.125rem] mb-3">Not sure if we cover your industry?</h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Book a 30-minute call. We will tell you honestly whether we are the right fit.
                </p>
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 bg-ink text-white font-semibold text-sm px-5 py-3 rounded-lg hover:bg-ink-90 transition-colors">
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
