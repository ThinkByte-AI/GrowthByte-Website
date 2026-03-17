'use client'

import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'
import { NAVIGATION_ITEMS } from '@/lib/constants'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu  = useCallback(() => setMobileMenuOpen(p => !p), [])
  const closeMenu   = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-surface-border'
          : 'bg-surface/95 backdrop-blur-md border-b border-surface-border'
      }`}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="GrowthByte home">
            <span className="text-xl md:text-[1.375rem] font-bold text-ink tracking-tight group-hover:text-teal transition-colors duration-250">
              Growth<span className="text-teal">Byte</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-[0.9rem] font-medium text-ink-60 hover:text-ink transition-colors duration-250 rounded-md hover:bg-surface-2 group"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 rounded-md text-ink-60 hover:text-ink hover:bg-surface-2 transition-colors"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-surface-border py-4 space-y-1"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2.5 text-[0.95rem] font-medium text-ink-60 hover:text-ink hover:bg-surface-2 rounded-md transition-colors"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 pb-1 px-0">
              <Link
                href="/contact"
                className="btn-primary block text-center text-sm"
                onClick={closeMenu}
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
