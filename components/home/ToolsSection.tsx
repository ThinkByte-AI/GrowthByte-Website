import Link from 'next/link'
import { ArrowIcon } from './icons'

const TOOLS = [
  {
    href: '/tools/customer-acquisition-cost-calculator', name: 'CAC Calculator',
    desc: 'Find your true acquisition cost and where the funnel leaks money.',
    icon: <svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /></svg>,
  },
  {
    href: '/tools/marketing-roi-calculator', name: 'Marketing ROI Calculator',
    desc: 'See the exact return on every rupee spent across all channels.',
    icon: <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  },
  {
    href: '/tools/seo-audit-tool', name: 'SEO Audit Tool',
    desc: 'Technical and on-page audit of your site in under 60 seconds.',
    icon: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  },
  {
    href: '/tools/keyword-research-tool', name: 'Keyword Research Tool',
    desc: 'Find keywords your competitors have not targeted yet.',
    icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  },
]

export default function ToolsSection() {
  return (
    <section className="light" id="tools" aria-labelledby="tools-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">Tools</span>
            <h2 id="tools-h">Find where revenue leaks.</h2>
          </div>
          <Link href="/tools" className="gb-btn gb-btn-ot">All Tools <ArrowIcon /></Link>
        </div>
        <div className="tools-grid">
          {TOOLS.map((tool) => (
            <Link href={tool.href} className="tcard" key={tool.name}>
              <div className="tcard-ico">{tool.icon}</div>
              <div className="tcard-name">{tool.name}</div>
              <div className="tcard-desc">{tool.desc}</div>
              <div className="tcard-link">Try it →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
