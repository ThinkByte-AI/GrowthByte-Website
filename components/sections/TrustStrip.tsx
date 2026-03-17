import { PROOF_STATS } from '@/lib/constants'

export default function TrustStrip() {
  return (
    <section className="bg-surface-2 border-y border-surface-border py-8 md:py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Label */}
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-40 whitespace-nowrap">
            Verified outcomes
          </p>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-surface-border flex-shrink-0" aria-hidden="true" />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 flex-1">
            {PROOF_STATS.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div
                  className="font-bold text-ink tabular-nums"
                  style={{ fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2rem)', letterSpacing: '-0.025em', lineHeight: '1' }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.8125rem] text-ink-40 font-medium mt-1.5 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
