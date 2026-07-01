import type { ReactNode } from 'react'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

interface Founder { initials: string; name: string; role: string; bio: ReactNode }

const FOUNDERS: Founder[] = [
  {
    initials: 'ST', name: 'SriHarsha Thota', role: 'Co-Founder',
    bio: <>ex-VP Consumer Growth at <strong>MediBuddy</strong>, delivered <strong>15x growth in one year</strong>. Founding engineer through exit. BITS Pilani.</>,
  },
  {
    initials: 'VK', name: 'Vinay Kumar Kovvuri', role: 'Co-Founder, AI/ML',
    bio: <>Shipped <strong>20+ production AI products</strong> across healthcare and consumer tech. AI/ML product leadership. BITS Pilani.</>,
  },
  {
    initials: 'RG', name: 'Raghu Gorrela', role: 'Co-Founder, Global GTM',
    bio: <>Global client strategy across <strong>US, SEA, and India</strong>. BITS Pilani and <strong>XLRI Jamshedpur</strong>. Turns strategy into revenue.</>,
  },
]

const linkedInSearch = (name: string) =>
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`

export default function FoundersSection() {
  return (
    <section className="dark" id="team" aria-labelledby="team-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">The Founders</span>
          <h2 id="team-h">Operators, not account managers.</h2>
          <p className="lead">
            Engineers and product leaders who built real companies, scaled them, and know what growth looks like from the inside.
          </p>
        </div>
        <div className="founders-grid">
          {FOUNDERS.map((founder) => (
            <div className="fc" key={founder.name}>
              <div className="fc-top">
                <div className="fc-av">{founder.initials}</div>
                <div>
                  <div className="fc-name">{founder.name}</div>
                  <div className="fc-role">{founder.role}</div>
                </div>
              </div>
              <p className="fc-bio">{founder.bio}</p>
              <a href={linkedInSearch(founder.name)} className="fc-li" target="_blank" rel="noopener">
                <LinkedInIcon />LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
