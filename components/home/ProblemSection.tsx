const PROBLEMS = [
  {
    q: 'Five vendors, nobody owns the funnel',
    a: 'SEO, paid, and design each optimise their own slice. Reports arrive on time, budget gets spent, and revenue never compounds the way it should.',
  },
  {
    q: 'Spend climbs, so does your CAC',
    a: 'Scaling a broken system only makes it more expensive. Broad targeting and no lifecycle engine mean every new customer costs more than the last.',
  },
  {
    q: 'Quarterly retainers, no annual owner',
    a: 'Strategy resets every 90 days, so nobody actually owns your yearly target. The agency ships work, sends an invoice, and moves on.',
  },
  {
    q: 'Tools bought, never connected',
    a: 'A stack of AI tools is not AI-powered growth. The promise only works when someone owns the outcome each tool is meant to drive.',
  },
]

export default function ProblemSection() {
  return (
    <section className="dark" id="problem" aria-labelledby="prob-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Why Growth Stalls</span>
          <h2 id="prob-h">Effort was never the problem.</h2>
          <p className="lead">
            You have the budget, the team, and the intent. What is missing is one system where every channel feeds the same revenue number.
          </p>
        </div>
        <div className="prob-list">
          {PROBLEMS.map((item) => (
            <div className="pb" key={item.q}>
              <div className="pb-q">{item.q}</div>
              <div className="pb-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
