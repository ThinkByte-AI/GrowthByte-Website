'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const PLAIN = [
  ['G', 0.04], ['r', 0.08], ['o', 0.13], ['w', 0.18], ['t', 0.22],
  ['h', 0.26], ['B', 0.31], ['y', 0.35], ['t', 0.40], ['e', 0.44],
] as const
const BOLD = [['.', 0.49], ['a', 0.54], ['i', 0.58]] as const

const Letter = ({ char, delay }: { char: string; delay: number }) => (
  <span className="wm-l" style={{ animationDelay: `${delay}s` }}>{char}</span>
)

export default function Wordmark() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      }),
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={`wordmark${inView ? ' in' : ''}`} aria-hidden="true">
      <div className="wm-row">
        <Image className="wm-g" src="/logo.jpeg" alt="" width={72} height={72} />
        <div className="wm-text" role="img" aria-label="GrowthByte.ai">
          {PLAIN.map(([char, delay], i) => <Letter key={i} char={char} delay={delay} />)}
          <b>{BOLD.map(([char, delay], i) => <Letter key={i} char={char} delay={delay} />)}</b>
        </div>
      </div>
      <div className="wm-sub">AI does the work. Humans own the strategy.</div>
    </section>
  )
}
