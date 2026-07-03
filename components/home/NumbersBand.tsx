import type { NumbersData } from './types'

export default function NumbersBand({ data }: { data: NumbersData }) {
  const items = data.items ?? []
  return (
    <section className="dark" id="numbers" aria-labelledby="num-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="num-h">{data.heading}</h2>
        </div>
        <div className="nums-grid">
          {items.map((item, i) => (
            <div className="num" key={i}>
              <div className="num-v">{item.value}</div>
              <div className="num-l">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
