export default function RevenueSparkline() {
  return (
    <div className="mt-6 pt-5 border-t border-white/[0.06]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-medium">Revenue trend</span>
        <span className="text-[0.6875rem] text-teal font-semibold">↑ Compounding</span>
      </div>
      <svg viewBox="0 0 240 60" className="w-full h-12" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#009389" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#009389" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,55 C30,50 50,44 70,36 C90,28 110,20 130,13 C150,7 170,3 200,1 L240,0 L240,60 L0,60 Z"
          fill="url(#heroChartGrad)"
        />
        <path
          d="M0,55 C30,50 50,44 70,36 C90,28 110,20 130,13 C150,7 170,3 200,1 L240,0"
          stroke="#009389"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="70" cy="36" r="2.5" fill="#009389" />
        <circle cx="130" cy="13" r="2.5" fill="#009389" />
        <circle cx="220" cy="0.5" r="3" fill="#00b5aa" />
      </svg>
      <div className="flex justify-between mt-1">
        <span className="text-[0.625rem] text-white/20">Month 1</span>
        <span className="text-[0.625rem] text-white/20">Month 6</span>
      </div>
    </div>
  )
}
