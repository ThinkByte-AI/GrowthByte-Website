import Link from 'next/link'
import { ArrowIcon } from './icons'

const COLUMNS = ['You are comparing', 'Traditional Agency', 'AI-Only Tools', 'GrowthByte.ai']

const ROWS = [
  ['Speed to first result', '90-day onboarding', 'Fast setup, zero direction', 'Live in 6 weeks'],
  ['Strategy ownership', 'Rotating account manager', 'No one owns it', 'Senior strategist plus AI'],
  ['Revenue accountability', 'Vanity metric reports', 'No outcome ownership', 'Your revenue goal, owned'],
  ['Channel integration', 'Siloed, paid or SEO', 'Single-channel by design', 'Every channel, one system'],
  ['Contract flexibility', '12-month lock-in', 'Monthly subscription', 'Flexible, no lock-in'],
  ['CAC over time', 'Manual, lagging', 'Optimises blindly', 'Avg 42% lower in 90 days'],
]

export default function ComparisonSection() {
  return (
    <section className="light" id="why" aria-labelledby="why-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">The GrowthByte Difference</span>
          <h2 id="why-h">Not an agency. Not a tool.</h2>
          <p className="lead">How the three options most companies weigh compare on the things that actually move revenue.</p>
        </div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead>
              <tr>{COLUMNS.map((col) => <th key={col} scope="col">{col}</th>)}</tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sec-cta">
          <span className="sec-cta-t">One system. Every channel. One number.</span>
          <Link href="/services" className="gb-btn gb-btn-ob">Explore Services <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  )
}
