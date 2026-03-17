import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services — GrowthByte | AI-Powered Growth Services',
  description: 'Six integrated growth capabilities — from performance marketing and SEO to automation and analytics. Every service feeds the same revenue outcome.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <p className="section-eyebrow-dark">Services</p>
              <h1 className="text-white text-balance mb-5">
                Six capabilities. One growth system.
              </h1>
              <p className="text-white/55 text-body-lg max-w-[36rem] text-balance leading-relaxed">
                Each service is designed to compound with the others. You can start with one — but the real gains come from integration.
              </p>
            </div>
            {/* Right: service system visual */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-[340px]">
                {/* Central hub */}
                <div className="flex flex-col gap-3">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Growth Strategy', 'Performance Marketing'].map((name) => (
                      <div key={name} className="bg-white/[0.04] border border-teal/20 rounded-xl px-4 py-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal mb-2" />
                        <p className="text-[0.75rem] font-semibold text-white/70 leading-snug">{name}</p>
                      </div>
                    ))}
                  </div>
                  {/* Row 2 — center hub */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white/[0.04] border border-teal/20 rounded-xl px-4 py-3 flex-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal mb-2" />
                      <p className="text-[0.75rem] font-semibold text-white/70 leading-snug">SEO & Content</p>
                    </div>
                    <div className="bg-teal/10 border border-teal/30 rounded-xl px-4 py-3 flex-1 flex flex-col items-center justify-center">
                      <div className="text-[0.625rem] text-teal/70 uppercase tracking-wider font-semibold mb-1">Integrated</div>
                      <div className="text-xs text-white font-bold">AI System</div>
                    </div>
                    <div className="bg-white/[0.04] border border-teal/20 rounded-xl px-4 py-3 flex-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal mb-2" />
                      <p className="text-[0.75rem] font-semibold text-white/70 leading-snug">Automation</p>
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Analytics & BI', 'Creative & CRO'].map((name) => (
                      <div key={name} className="bg-white/[0.04] border border-teal/20 rounded-xl px-4 py-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal mb-2" />
                        <p className="text-[0.75rem] font-semibold text-white/70 leading-snug">{name}</p>
                      </div>
                    ))}
                  </div>
                  {/* Outcome bar */}
                  <div className="mt-1 bg-teal/10 border border-teal/20 rounded-xl px-4 py-2.5 flex items-center justify-between">
                    <span className="text-xs text-teal/80 font-medium">Combined outcome</span>
                    <span className="text-xs font-bold text-teal">↑ Revenue growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-surface border border-surface-border rounded-2xl p-7 lg:p-8 hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-bold text-ink text-[1.1875rem] mb-1">{service.title}</h2>
                    <p className="text-sm font-medium text-teal">{service.outcome}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-ink-20 group-hover:text-teal flex-shrink-0 mt-1 transition-colors duration-250"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-body-sm text-ink-60 leading-relaxed mb-5">{service.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-ink-60">
                      <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
        <div className="container-custom text-center">
          <h2 className="text-balance mb-4">Not sure which services you need?</h2>
          <p className="text-ink-60 text-body-lg mb-8 max-w-[32rem] mx-auto">
            Book a strategy call. We will audit your current setup and recommend a prioritised starting point.
          </p>
          <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}
