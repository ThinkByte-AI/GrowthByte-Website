import { VALUES } from './data'

export default function Values() {
  return (
    <section className="section-padding bg-surface-2">
      <div className="container-custom">
        <div className="section-header-center">
          <p className="section-eyebrow">How we operate</p>
          <h2 className="section-heading">Four operating principles.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <div key={i} className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center mb-4 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-semibold text-ink text-[1rem] mb-2">{v.title}</h3>
              <p className="text-sm text-ink-60 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
