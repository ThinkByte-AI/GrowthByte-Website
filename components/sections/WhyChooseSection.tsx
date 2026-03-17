// WhyChooseSection is deprecated — content folded into AIModelSection and ProblemSection.
// Kept as empty pass-through to avoid import errors during transition.
export default function WhyChooseSection() {
  const differentiators = [
    {
      title: 'Truly Integrated',
      description: 'One team, one strategy, all channels unified.',
    },
    {
      title: 'Results-Focused',
      description: 'Revenue and ROI. Not vanity metrics.',
    },
    {
      title: 'AI + Human',
      description: 'AI optimizes. Humans strategize.',
    },
    {
      title: 'Flexible Scale',
      description: 'Start small. Grow at your pace.',
    },
  ]

  return (
    <section id="why-choose" className="section-padding bg-secondary text-white overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label bg-primary/20 text-primary-light">
            Why Us
          </span>
          <h2 className="text-white">Why GrowthByte</h2>
          <p className="section-subtitle text-gray-400">Four pillars that drive your growth</p>
        </div>

        {/* Interconnected Grid */}
        <div className="max-w-4xl mx-auto relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Horizontal line top */}
            <div className="absolute top-[88px] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            {/* Horizontal line bottom */}
            <div className="absolute bottom-[88px] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            {/* Vertical line left */}
            <div className="absolute left-[25%] top-[88px] bottom-[88px] w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
            {/* Vertical line right */}
            <div className="absolute right-[25%] top-[88px] bottom-[88px] w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  {/* Number with connecting dot */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <span className="text-primary text-xl font-bold">0{index + 1}</span>
                      </div>
                      {/* Connector dot */}
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary to-transparent"></div>
                    <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-primary to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center badge */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 bg-secondary border-2 border-primary/50 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-gray-500 text-sm mt-10 md:mt-12">
          All four working together = <span className="text-primary font-medium">exponential growth</span>
        </p>
      </div>
    </section>
  )
}
