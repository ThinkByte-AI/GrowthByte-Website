import TopicTiles from './TopicTiles'

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
            <p className="section-eyebrow-dark">Insights</p>
            <h1 className="text-white text-balance mb-5">Practical growth content. No fluff.</h1>
            <p className="text-white/55 text-body-lg max-w-[34rem] text-balance leading-relaxed">
              Strategy, frameworks, and real campaign breakdowns — written for marketing heads and founders who want to understand the mechanics, not just the headlines.
            </p>
          </div>
          <TopicTiles />
        </div>
      </div>
    </section>
  )
}
