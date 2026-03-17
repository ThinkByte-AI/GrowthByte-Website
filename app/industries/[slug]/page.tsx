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
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All industries
          </Link>
          <span className="tag tag-dark mb-4">Industry</span>
          <h1 className="text-white max-w-[40rem] text-balance mb-4">{industry.name}</h1>
          <p className="text-teal-light text-body-lg font-medium mb-5">{industry.challenge}</p>
          <p className="text-white/55 text-body-lg max-w-[38rem] leading-relaxed">{industry.detail}</p>
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
