import Link from 'next/link'
import type { Industry } from './types'

export interface IndustryServiceCard {
  slug: string
  title: string
  outcome: string
  description: string
}

interface Props {
  industry: Industry
  services: IndustryServiceCard[]
}

export default function ServicesForIndustry({ industry, services }: Props) {
  return (
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
          {services.map((service) => (
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
  )
}
