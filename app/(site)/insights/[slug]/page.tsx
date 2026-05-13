import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return {
    title,
    description: 'Growth strategy, performance marketing, SEO, and automation insights from GrowthByte.',
  }
}

export default function InsightPage({ params }: Props) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-surface-border bg-surface py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-ink-40">
            <Link href="/insights" className="hover:text-ink transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-ink truncate">Article</span>
          </nav>
        </div>
      </div>

      {/* Article container */}
      <article className="section-padding bg-surface">
        <div className="container-narrow">
          <header className="mb-10">
            <span className="tag tag-teal text-xs mb-4 inline-block">Category</span>
            <h1 className="text-balance mb-5">Article title will appear here</h1>
            <div className="flex items-center gap-4 text-sm text-ink-40">
              <span>GrowthByte</span>
              <span>·</span>
              <span>Date</span>
              <span>·</span>
              <span>X min read</span>
            </div>
          </header>

          {/* Article body placeholder */}
          <div className="prose max-w-none">
            <p className="text-body-lg text-ink-60 leading-relaxed">
              This insight is coming soon. In the meantime, browse our other published insights or book a strategy call to discuss your specific growth challenges directly.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 p-7 rounded-2xl bg-teal-muted border border-teal/20">
            <h3 className="font-bold text-ink text-[1.0625rem] mb-2">Want to apply this to your business?</h3>
            <p className="text-sm text-ink-60 mb-4">Book a 30-minute strategy call. We will show you exactly how these ideas apply to your specific situation.</p>
            <Link href="/contact" className="btn-primary text-sm">Book a Strategy Call</Link>
          </div>
        </div>
      </article>

      {/* Back */}
      <div className="border-t border-surface-border bg-surface-2 py-6">
        <div className="container-custom">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-ink-60 hover:text-ink transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insights
          </Link>
        </div>
      </div>
    </>
  )
}
