'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import { PRODUCT_LINKS, SERVICE_LINKS, INDUSTRY_LINKS, TOOLS_LINKS } from '@/components/Footer/links'
import { useHeaderOverBright } from './useHeaderTheme'

type NavChild = { name: string; href: string }
// Entries without `href` are dropdown-only: the label opens the menu instead of navigating.
type NavEntry = { name: string; href?: string; children?: ReadonlyArray<NavChild> }

const NAV: NavEntry[] = [
  { name: 'Product', children: PRODUCT_LINKS },
  { name: 'Services', href: '/services', children: SERVICE_LINKS },
  { name: 'Industries', href: '/industries', children: INDUSTRY_LINKS },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tools', href: '/tools', children: TOOLS_LINKS },
]

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const overBright = useHeaderOverBright()

  return (
    <header className={`hdr${overBright ? ' hdr--light' : ''}`}>
      <nav className="nav-in" aria-label="Primary">
        <Link href="/" className="nav-logo" aria-label="GrowthByte.ai home">
          <Image className="nav-logo-img" src="/logo.jpeg" alt="" width={32} height={32} />
          <span className="nav-logo-name">GrowthByte<b>.ai</b></span>
        </Link>

        <ul className="nav-links" role="list">
          {NAV.map((item) => (
            <li key={item.name} className={item.children ? 'nav-item' : undefined}>
              {item.href ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <button type="button" className="nav-trigger" aria-haspopup="true">{item.name}</button>
              )}
              {item.children && (
                <div className="gb-dd">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>{child.name}</Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link href="/contact" className="nav-cta"><span>Book a Strategy Call</span><ArrowIcon /></Link>

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
        {NAV.map((item) =>
          item.href ? (
            <Link key={item.name} href={item.href} onClick={closeMenu}>{item.name}</Link>
          ) : (
            <div key={item.name} className="gb-mobile-group">
              <span className="gb-mobile-head">{item.name}</span>
              {item.children?.map((child) => (
                <Link key={child.href} href={child.href} onClick={closeMenu}>{child.name}</Link>
              ))}
            </div>
          ),
        )}
        <Link href="/contact" onClick={closeMenu}>Book a Strategy Call</Link>
      </div>
    </header>
  )
}
