'use client'

import { useEffect } from 'react'

const SCROLL_OFFSET_PX = 150
const ACTIVE_CLASS = 'toc-link-active'

const resolveTargets = () => {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[data-toc-link]'),
  )
  const headings = links
    .map((link) => {
      const id = link.dataset.tocLink
      return id ? document.getElementById(id) : null
    })
    .filter((el): el is HTMLElement => el !== null)
  return { links, headings }
}

const computeActiveIndex = (headings: HTMLElement[]): number => {
  const scrollPosition = window.scrollY + SCROLL_OFFSET_PX
  let active = 0
  headings.forEach((heading, index) => {
    if (heading.offsetTop <= scrollPosition) active = index
  })
  return active
}

export default function TocActiveSpy() {
  useEffect(() => {
    const { links, headings } = resolveTargets()
    if (links.length === 0 || headings.length === 0) return

    const sync = () => {
      const activeIndex = computeActiveIndex(headings)
      links.forEach((link, index) => {
        link.classList.toggle(ACTIVE_CLASS, index === activeIndex)
      })
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    return () => window.removeEventListener('scroll', sync)
  }, [])

  return null
}
