import Link from 'next/link'
import type { Industry } from './types'

export default function Cta({ industry }: { industry: Industry }) {
  return (
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
  )
}
