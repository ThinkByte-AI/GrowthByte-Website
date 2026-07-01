const MODEL_COLUMNS = [
  {
    badge: 'AI Systems',
    name: 'Speed at scale',
    sub: 'Runs 24 hours a day, no intervention',
    items: [
      'Bid optimisation across platforms, hourly',
      'Audience segmentation and lookalike modelling',
      'Real-time anomaly detection and pivots',
      'A/B and multivariate test orchestration',
      'Predictive performance forecasting',
      'Automated attribution and reporting',
    ],
  },
  {
    badge: 'Human Strategists',
    name: 'Judgment at the top',
    sub: 'What only senior operators can own',
    items: [
      'Channel strategy and budget architecture',
      'Creative direction and messaging hierarchy',
      'Offer development and brand positioning',
      'Quarterly planning and market pivots',
      'Stakeholder alignment',
      'The calls data alone cannot make',
    ],
  },
]

export default function OperatingModelSection() {
  return (
    <section className="dark" id="model" aria-labelledby="model-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Operating Model</span>
          <h2 id="model-h">AI runs the volume. Humans run the call.</h2>
          <p className="lead">
            AI without strategy burns budget at scale. Strategy without AI is too slow to compete. We run both in parallel, every day.
          </p>
        </div>
        <div className="model-cols">
          {MODEL_COLUMNS.map((col) => (
            <div className="mc" key={col.badge}>
              <span className="mc-badge">{col.badge}</span>
              <div className="mc-name">{col.name}</div>
              <div className="mc-sub">{col.sub}</div>
              <ul className="mc-list">
                {col.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="model-bar">
          <p>AI output informs the strategy. The strategy configures the AI. That loop compounds month over month instead of plateauing.</p>
          <span className="model-bar-stat">avg. CAC ↓42% in 90 days</span>
        </div>
      </div>
    </section>
  )
}
