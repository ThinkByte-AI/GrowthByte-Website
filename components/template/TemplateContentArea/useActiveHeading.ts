import { useEffect, useState } from 'react'
import type { Heading } from './types'

const SCROLL_OFFSET_PX = 150

export const useActiveHeading = (headings: Heading[], enabled: boolean): string => {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!enabled || headings.length === 0) return

    const handleScroll = () => {
      const elements = headings
        .map((h) => document.getElementById(`heading-${h.id}`))
        .filter(Boolean) as HTMLElement[]

      const scrollPosition = window.scrollY + SCROLL_OFFSET_PX

      for (let i = elements.length - 1; i >= 0; i--) {
        if (elements[i].offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, headings])

  return activeId
}
