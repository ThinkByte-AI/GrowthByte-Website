const NUMBERS = [
  { value: '42%', label: 'average CAC reduction within 90 days' },
  { value: '3.1×', label: 'average ROAS improvement' },
  { value: '₹50Cr+', label: 'pipeline built across all clients' },
  { value: '92%', label: 'client retention after 6 months' },
]

export default function NumbersBand() {
  return (
    <section className="dark" id="numbers" aria-labelledby="num-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">By The Numbers</span>
          <h2 id="num-h">Proof, not promises.</h2>
        </div>
        <div className="nums-grid">
          {NUMBERS.map((item) => (
            <div className="num" key={item.label}>
              <div className="num-v">{item.value}</div>
              <div className="num-l">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
