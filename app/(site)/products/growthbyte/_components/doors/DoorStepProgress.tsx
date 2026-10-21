interface DoorStepProgressProps {
  step: number
  titles: string[]
}

export default function DoorStepProgress({ step, titles }: DoorStepProgressProps) {
  return (
    <div className="dr-progress">
      <div className="dr-progress-label">
        Step {step + 1} of {titles.length} · <b>{titles[step]}</b>
      </div>
      <div className="dr-progress-bars" aria-hidden="true">
        {titles.map((title, i) => (
          <i key={title} className={i <= step ? 'on' : undefined} />
        ))}
      </div>
    </div>
  )
}
