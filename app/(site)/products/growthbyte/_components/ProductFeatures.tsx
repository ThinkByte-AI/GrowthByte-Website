const FEATURES = [
  {
    badge: 'Execution',
    name: 'AI bid management',
    sub: 'Every hour, every channel',
    points: [
      'Bids tuned hourly across Google, Meta, and LinkedIn',
      'No set-and-forget — the system iterates continuously',
      'Budget shifts toward what converts, automatically',
    ],
  },
  {
    badge: 'Targeting',
    name: 'Audience modelling',
    sub: 'Find and expand what converts',
    points: [
      'Models the audiences that actually drive revenue',
      'Expands lookalikes as the signals sharpen',
      'Pulls spend off segments that do not pay back',
    ],
  },
  {
    badge: 'Guardrails',
    name: 'Anomaly detection',
    sub: 'Catch waste before it burns',
    points: [
      'Flags spend spikes and breakage in real time',
      'Alerts before budget is wasted',
      'Keeps tracking and pixels honest',
    ],
  },
  {
    badge: 'Clarity',
    name: 'Attribution & reporting',
    sub: 'Know what drives revenue',
    points: [
      'Multi-touch attribution across the full funnel',
      'Live dashboards from day one',
      'Decisions backed by data, not gut feel',
    ],
  },
]

export default function ProductFeatures() {
  return (
    <section id="features" className="dark">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">What it does</span>
          <h2>The execution layer, run by AI.</h2>
          <p className="lead">
            The same engine behind 42% CAC reductions and 3.1x ROAS — productised. AI handles the
            high-volume execution; you keep the judgment.
          </p>
        </div>
        <div className="model-cols">
          {FEATURES.map((f) => (
            <div key={f.name} className="mc">
              <span className="mc-badge">{f.badge}</span>
              <div className="mc-name">{f.name}</div>
              <div className="mc-sub">{f.sub}</div>
              <ul className="mc-list">
                {f.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
