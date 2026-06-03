type LegalHeroProps = {
  eyebrow: string
  title: string
  lastUpdated: string
}

export default function LegalHero({ eyebrow, title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />
      <div className="container-narrow relative z-10 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="section-eyebrow-dark">{eyebrow}</p>
        <h1 className="text-white text-balance mb-5">{title}</h1>
        <p className="text-white/50 text-body-md">Last updated: {lastUpdated}</p>
      </div>
    </section>
  )
}
