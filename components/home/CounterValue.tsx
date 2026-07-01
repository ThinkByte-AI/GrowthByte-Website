'use client'

import { useEffect, useRef, useState } from 'react'

interface CounterValueProps {
  target: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}

const format = (value: number, decimals: number, prefix: string, suffix: string) =>
  `${prefix}${decimals > 0 ? value.toFixed(decimals) : Math.round(value)}${suffix}`

export default function CounterValue({
  target, suffix = '', prefix = '', decimals = 0, duration = 1200,
}: CounterValueProps) {
  const [text, setText] = useState(() => format(0, decimals, prefix, suffix))
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    let frame = 0
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setText(format(eased * target, decimals, prefix, suffix))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, suffix, prefix, decimals, duration])

  return <div className="hc-val">{text}</div>
}
