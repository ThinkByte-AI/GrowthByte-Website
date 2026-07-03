import type { OperatingModelData } from './types'

export default function OperatingModelSection({ data }: { data: OperatingModelData }) {
  const columns = data.columns ?? []
  return (
    <section className="dark" id="model" aria-labelledby="model-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="model-h">{data.heading}</h2>
          <p className="lead">{data.lead}</p>
        </div>
        <div className="model-cols">
          {columns.map((col, i) => (
            <div className="mc" key={i}>
              <span className="mc-badge">{col.badge}</span>
              <div className="mc-name">{col.name}</div>
              <div className="mc-sub">{col.sub}</div>
              <ul className="mc-list">
                {(col.items ?? []).map((item, j) => <li key={j}>{item.value}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="model-bar">
          <p>{data.barText}</p>
          <span className="model-bar-stat">{data.barStat}</span>
        </div>
      </div>
    </section>
  )
}
