'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import { NAVIGATION_ITEMS } from '@/lib/constants'

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className="hdr">
      <nav className="nav-in" aria-label="Primary">
        <Link href="/" className="nav-logo" aria-label="GrowthByte.ai home">
          <Image className="nav-logo-img" src="/logo.jpeg" alt="" width={32} height={32} />
          <span className="nav-logo-name">GrowthByte<b>.ai</b></span>
        </Link>

        <ul className="nav-links" role="list">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}><Link href={item.href}>{item.name}</Link></li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta">
          <span>Book a Strategy Call</span>
          <ArrowIcon />
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </nav>

      <div className={`gb-mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAVIGATION_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>{item.name}</Link>
        ))}
        <Link href="/contact" onClick={closeMenu}>Book a Strategy Call</Link>
      </div>
    </header>
  )
}
