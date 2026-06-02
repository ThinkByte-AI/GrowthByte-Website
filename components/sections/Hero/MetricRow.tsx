interface MetricRowProps {
  label: string
  value: string
  percentWidth: number
  highlight?: boolean
}

export default function MetricRow({ label, value, percentWidth, highlight = false }: MetricRowProps) {
  const dotClass = highlight ? 'bg-teal' : 'bg-teal-light/70'
  const valueClass = highlight ? 'text-teal' : 'text-teal-light'
  const barClass = highlight ? 'bg-gradient-to-r from-teal to-teal-light' : 'bg-teal-light/50'

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass} flex-shrink-0`} />
          <span className="text-xs text-white/50">{label}</span>
        </div>
        <span className={`text-sm font-bold ${valueClass} tabular-nums`}>{value}</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full ${barClass} rounded-full`} style={{ width: `${percentWidth}%` }} />
      </div>
    </div>
  )
}
