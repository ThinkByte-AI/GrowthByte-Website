import { lexicalToHtml } from '@/lib/lexicalToHtml'
import type { FoundersData } from './types'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const linkedInSearch = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`

export default function FoundersSection({ data }: { data: FoundersData }) {
  const items = data.items ?? []
  return (
    <section className="dark" id="team" aria-labelledby="team-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="team-h">{data.heading}</h2>
          <p className="lead">{data.lead}</p>
        </div>
        <div className="founders-grid">
          {items.map((founder, i) => (
            <div className="fc" key={i}>
              <div className="fc-top">
                <div className="fc-av">{founder.initials}</div>
                <div>
                  <div className="fc-name">{founder.name}</div>
                  <div className="fc-role">{founder.role}</div>
                </div>
              </div>
              <div className="fc-bio" dangerouslySetInnerHTML={{ __html: lexicalToHtml(founder.bio) }} />
              <a href={linkedInSearch(founder.name ?? '')} className="fc-li" target="_blank" rel="noopener">
                <LinkedInIcon />LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
