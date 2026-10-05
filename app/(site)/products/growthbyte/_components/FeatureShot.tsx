'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProductFeature } from './product-features'

// Dev-only frame so the layout can be judged before screenshots exist; production never shows a fake.
const isDevPreview = process.env.NODE_ENV !== 'production'

function ScreenshotLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Portalled to <body>: the card's hover transform would otherwise trap position:fixed inside the card.
  return createPortal(
    <div className="wl-lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="wl-lightbox-close" aria-label="Close" onClick={onClose}>×</button>
      <div className="wl-lightbox-pan" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt={alt} width={1600} height={900} sizes="200vw" className="wl-lightbox-img" />
      </div>
      <p className="wl-lightbox-hint">Swipe to pan · tap outside to close</p>
    </div>,
    document.body,
  )
}

export default function FeatureShot({ feature }: { feature: ProductFeature }) {
  const [isOpen, setIsOpen] = useState(false)
  const alt = `${feature.badge} in GrowthByte`

  if (!feature.imageSrc) {
    if (!isDevPreview) return null
    return (
      <div className="wl-shot wl-shot-empty" aria-hidden="true">
        <span>Screenshot: public/waitlist/features/{feature.key}.png</span>
      </div>
    )
  }

  return (
    <>
      <button type="button" className="wl-shot wl-shot-btn" onClick={() => setIsOpen(true)} aria-label={`Enlarge: ${alt}`}>
        <Image src={feature.imageSrc} alt={alt} width={1200} height={750} sizes="(max-width: 820px) 100vw, 50vw" />
        <span className="wl-shot-zoom" aria-hidden="true">⤢ Tap to enlarge</span>
      </button>
      {isOpen && <ScreenshotLightbox src={feature.imageSrc} alt={alt} onClose={() => setIsOpen(false)} />}
    </>
  )
}
