import Link from 'next/link'
import { ArrowSmallIcon } from '@/components/journal'

export default function ListingCta() {
  return (
    <section style={{ marginTop: 96 }}>
      <div className="gbx-container">
        <div className="cs-listing-cta">
          <div>
            <h2 className="h-section" style={{ margin: 0 }}>Want to be the next one on this page?</h2>
            <p style={{ fontSize: 16, color: 'var(--gb-ink-2)', marginTop: 12, marginBottom: 0, maxWidth: '52ch' }}>
              Book a 30-minute strategy call. We will look at your funnel, name the highest-leverage move,
              and tell you honestly whether we are the right partner.
            </p>
          </div>
          <div className="actions">
            <Link href="/contact" className="gbx-btn gbx-btn-primary">
              Book a strategy call <ArrowSmallIcon />
            </Link>
            <Link href="/blogs" className="gbx-btn gbx-btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
