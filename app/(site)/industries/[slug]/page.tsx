import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { INDUSTRIES, SERVICES } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = INDUSTRIES.find(i => i.slug === params.slug)
  if (!industry) return {}
  return {
    title: `${industry.name} Growth Marketing — GrowthByte`,
    description: `${industry.challenge}. GrowthByte builds integrated AI-powered growth systems for ${industry.name} companies.`,
  }
}

export default function IndustryPage({ params }: Props) {
  const industry = INDUSTRIES.find(i => i.slug === params.slug)
  if (!industry) notFound()

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
            {/* Right: growth levers visual */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[300px]">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                  <p className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-semibold mb-4">Growth levers we activate</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Acquisition', desc: 'CAC reduction via AI bid management' },
                      { label: 'Conversion', desc: 'Funnel optimisation + CRO' },
                      { label: 'Retention', desc: 'LTV improvement + lifecycle' },
                      { label: 'Revenue ops', desc: 'Attribution + pipeline reporting' },
                    ].map((lever, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal text-[0.5625rem] font-bold tabular-nums">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-[0.8125rem] font-semibold text-white/70 leading-none">{lever.label}</p>
                          <p className="text-[0.6875rem] text-white/35 mt-0.5 leading-snug">{lever.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.6875rem] font-semibold text-teal uppercase tracking-wider">Proven playbook</span>
                      <span className="text-teal">✓</span>
                    </div>
                    <p className="text-[0.6875rem] text-white/30 mt-1">Adapted specifically for {industry.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do in this vertical */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="section-header">
            <p className="section-eyebrow">Services for {industry.name}</p>
            <h2 className="section-heading max-w-[36rem] text-balance">
              Every service we run is adapted to your vertical.
            </h2>
            <p className="section-subheading text-body-lg text-ink-60">
              The channels, benchmarks, buyer journeys, and compliance considerations are different in {industry.name}. Our playbooks reflect that.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(service => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-surface border border-surface-border rounded-xl p-6 hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                <h3 className="font-semibold text-ink text-[1rem] mb-1.5 group-hover:text-teal transition-colors">{service.title}</h3>
                <p className="text-xs text-teal mb-3">{service.outcome}</p>
                <p className="text-sm text-ink-60 leading-relaxed line-clamp-2">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
        <div className="container-custom text-center">
          <h2 className="text-balance mb-4 max-w-[30rem] mx-auto">
            Ready to build a growth system for your {industry.name} business?
          </h2>
          <p className="text-ink-60 text-body-lg mb-8 max-w-[30rem] mx-auto">
            Book a 30-minute strategy call. We will audit your setup and show you what we would do.
          </p>
          <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}
