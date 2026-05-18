import IdentityPanel from './IdentityPanel'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />
      <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="section-eyebrow-dark">About</p>
            <h1 className="text-white text-balance mb-5">
              Built because fragmented agencies kept failing growth companies.
            </h1>
            <p className="text-white/55 text-body-lg max-w-[38rem] text-balance leading-relaxed">
              GrowthByte exists to give ambitious companies something they could not find anywhere else: a single partner that combines integrated AI systems with senior strategic judgment — and is accountable to revenue, not activity.
            </p>
          </div>
          <IdentityPanel />
        </div>
      </div>
    </section>
  )
}
