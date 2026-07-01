'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const HEADER_HEIGHT = 64
// Midpoint between teal (~102) and white (255): teal keeps the dark header, white flips it light.
const BRIGHT_THRESHOLD = 140

interface Rgb { r: number; g: number; b: number; a: number }

const parseRgb = (value: string): Rgb | null => {
  const match = value.match(/rgba?\(([^)]+)\)/)
  if (!match) return null
  const [r, g, b, a = 1] = match[1].split(',').map((part) => parseFloat(part))
  return { r, g, b, a }
}

const isBright = ({ r, g, b }: Rgb) => 0.299 * r + 0.587 * g + 0.114 * b > BRIGHT_THRESHOLD

// True when the section currently under the header has a bright background,
// so the header can flip to its light theme instead of clashing as a dark bar.
export function useHeaderOverBright(): boolean {
  const [bright, setBright] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const x = Math.max(1, Math.floor(window.innerWidth / 2))
      const stack = document.elementsFromPoint(x, HEADER_HEIGHT + 4) as HTMLElement[]
      let node: HTMLElement | null = stack.find((el) => !el.closest('.hdr')) ?? document.body
      while (node && node !== document.documentElement) {
        const rgb = parseRgb(getComputedStyle(node).backgroundColor)
        if (rgb && rgb.a > 0.5) { setBright(isBright(rgb)); return }
        node = node.parentElement
      }
      setBright(false)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return bright
}
