import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.title} — GrowthByte`,
    description: service.description,
  }
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) notFound()

  const otherServices = SERVICES.filter(s => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All services
          </Link>
          <p className="section-eyebrow-dark">Service</p>
          <h1 className="text-white max-w-[36rem] text-balance mb-4">{service.title}</h1>
          <p className="text-teal-light text-body-lg font-medium mb-6">{service.outcome}</p>
          <p className="text-white/55 text-body-lg max-w-[38rem] leading-relaxed">{service.description}</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="section-eyebrow">What is included</p>
              <h2 className="section-heading text-balance">Capabilities within this service</h2>
              <p className="text-body-lg text-ink-60 leading-relaxed">
                Every capability below is run as part of an integrated system — not as a standalone deliverable. AI systems handle execution; your strategist owns the direction.
              </p>
            </div>
            <ul className="space-y-4">
              {service.capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-xl border border-surface-border bg-surface hover:border-teal/20 hover:bg-teal-muted/20 transition-all duration-250">
                  <div className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0 tabular-nums mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-ink font-medium text-[0.9375rem]">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
        <div className="container-custom">
          <h2 className="text-[1.375rem] font-bold text-ink mb-8">Related services</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherServices.map(s => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block bg-surface border border-surface-border rounded-xl p-5 hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                <h3 className="font-semibold text-ink text-[0.9375rem] mb-1">{s.title}</h3>
                <p className="text-xs text-teal mb-3">{s.outcome}</p>
                <span className="text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Learn more
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-surface border-t border-surface-border">
        <div className="container-custom text-center">
          <h2 className="text-balance mb-4 max-w-[28rem] mx-auto">Ready to get started with {service.shortTitle}?</h2>
          <p className="text-ink-60 text-body-lg mb-8 max-w-[30rem] mx-auto">
            Book a strategy call. We will audit your current setup and show you a clear starting point.
          </p>
          <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}
