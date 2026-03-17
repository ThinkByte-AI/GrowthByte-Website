import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Insights — GrowthByte | Growth Strategy, Paid Media, SEO',
  description: 'Practical insights on growth strategy, performance marketing, SEO, and marketing automation for SaaS, D2C, and B2B companies.',
}

// Placeholder posts — replace with CMS/MDX data when ready
const INSIGHTS = [
  {
    slug:      'reducing-cac-with-ai-bid-management',
    category:  'Performance Marketing',
    title:     'How AI Bid Management Reduces CAC Without Reducing Volume',
    summary:   'Manual bidding strategies leave 20–30% efficiency on the table. Here is what changes when AI handles bid orchestration across Google and Meta simultaneously.',
    readTime:  '6 min',
    date:      'Feb 2025',
  },
  {
    slug:      'saas-trial-to-paid-email-sequences',
    category:  'Marketing Automation',
    title:     'The 5-Email Sequence That Improved Trial-to-Paid by 22%',
    summary:   'Most SaaS trial sequences focus on features. This one focused on outcomes — and the conversion rate difference was significant.',
    readTime:  '8 min',
    date:      'Jan 2025',
  },
  {
    slug:      'technical-seo-saas-guide',
    category:  'SEO',
    title:     'Technical SEO for SaaS: The 12 Issues That Cause 80% of Lost Traffic',
    summary:   'After auditing 40+ SaaS sites, the same 12 issues appear repeatedly. Most are fixable in under a day. Here is the full list and how to address each one.',
    readTime:  '11 min',
    date:      'Dec 2024',
  },
  {
    slug:      'growth-strategy-before-channels',
    category:  'Growth Strategy',
    title:     'Why Your Channel Strategy Is Failing (And It Has Nothing to Do with the Channels)',
    summary:   'Before choosing channels, you need to answer four questions. Most companies skip them — and end up rebuilding strategy every 90 days.',
    readTime:  '7 min',
    date:      'Nov 2024',
  },
  {
    slug:      'd2c-meta-ads-structure',
    category:  'Performance Marketing',
    title:     'The Meta Ads Structure That Delivered 3.8× ROAS for a D2C Brand',
    summary:   'Campaign architecture matters more than creative once you are past a certain spend level. Here is the exact structure — and why each decision was made.',
    readTime:  '9 min',
    date:      'Oct 2024',
  },
  {
    slug:      'attribution-models-explained',
    category:  'Analytics',
    title:     'Last-Click Attribution Is Lying to You. Here Is What to Use Instead.',
    summary:   'Last-click attribution systematically undervalues the channels that build demand. Here is a practical framework for multi-touch attribution without a data science team.',
    readTime:  '10 min',
    date:      'Sep 2024',
  },
]

const CATEGORIES = ['All', 'Growth Strategy', 'Performance Marketing', 'SEO', 'Marketing Automation', 'Analytics']

export default function InsightsPage() {
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
              <p className="section-eyebrow-dark">Insights</p>
              <h1 className="text-white text-balance mb-5">
                Practical growth content. No fluff.
              </h1>
              <p className="text-white/55 text-body-lg max-w-[34rem] text-balance leading-relaxed">
                Strategy, frameworks, and real campaign breakdowns — written for marketing heads and founders who want to understand the mechanics, not just the headlines.
              </p>
            </div>
            {/* Right: content categories visual */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[300px]">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                  <p className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-semibold mb-4">Topics covered</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { name: 'Growth Strategy', count: '4 pieces' },
                      { name: 'Performance Marketing', count: '2 pieces' },
                      { name: 'SEO', count: '2 pieces' },
                      { name: 'Automation', count: '1 piece' },
                      { name: 'Analytics', count: '1 piece' },
                      { name: 'More soon', count: '' },
                    ].map((cat, i) => (
                      <div key={i} className={`rounded-lg px-3 py-2 ${i === 5 ? 'border border-dashed border-white/[0.08] flex items-center justify-center' : 'bg-white/[0.04] border border-white/[0.06]'}`}>
                        {i === 5 ? (
                          <span className="text-[0.625rem] text-white/20 font-medium">More soon</span>
                        ) : (
                          <>
                            <p className="text-[0.6875rem] font-semibold text-white/70 leading-snug">{cat.name}</p>
                            {cat.count && <p className="text-[0.625rem] text-teal mt-0.5">{cat.count}</p>}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                    <span className="text-[0.6875rem] text-white/40">Written by senior practitioners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter — static for now */}
      <div className="border-b border-surface-border bg-surface sticky top-[72px] z-20">
        <div className="container-custom py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                cat === 'All'
                  ? 'bg-ink text-white'
                  : 'text-ink-60 hover:text-ink hover:bg-surface-3'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIGHTS.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group flex flex-col bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                {/* Placeholder image area */}
                <div className="h-[7rem] bg-surface-3 border-b border-surface-border" />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="tag tag-teal text-xs">{post.category}</span>
                    <span className="text-xs text-ink-40">{post.date}</span>
                  </div>
                  <h2 className="font-bold text-ink text-[1rem] leading-snug mb-2 group-hover:text-teal transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink-60 leading-relaxed mt-2">{post.summary}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs text-ink-40 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime} read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
