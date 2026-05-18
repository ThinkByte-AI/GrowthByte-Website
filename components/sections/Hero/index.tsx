import HeroBackground from './HeroBackground'
import HeroCopy from './HeroCopy'
import HeroDashboard from './HeroDashboard'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      <HeroBackground />
      <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          <HeroCopy />
          <HeroDashboard />
        </div>
      </div>
    </section>
  )
}
