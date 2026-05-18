interface WidgetCardProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'highlight'
}

const VARIANT_CLASSES = {
  default: 'bg-surface border border-ink-10',
  highlight: 'bg-teal/5 border border-teal/20',
} as const

export default function WidgetCard({ title, children, variant = 'default' }: WidgetCardProps) {
  return (
    <div className={`${VARIANT_CLASSES[variant]} rounded-lg p-6`}>
      <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  )
}
