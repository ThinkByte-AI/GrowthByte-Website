import type { ProblemData } from './types'

export default function ProblemSection({ data }: { data: ProblemData }) {
  const items = data.items ?? []
  return (
    <section className="dark" id="problem" aria-labelledby="prob-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="prob-h">{data.heading}</h2>
          <p className="lead">{data.lead}</p>
        </div>
        <div className="prob-list">
          {items.map((item, i) => (
            <div className="pb" key={i}>
              <div className="pb-q">{item.q}</div>
              <div className="pb-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
