import type { HeroImageData, HeroOverlay } from './types'

interface HeroBackgroundProps {
  image: HeroImageData
  overlay: HeroOverlay
  fallbackAlt: string
}

const OVERLAY_CLASSES: Record<HeroOverlay, string> = {
  none: '',
  dark: 'bg-black/50',
  light: 'bg-white/30',
  gradient: 'bg-gradient-to-b from-black/60 to-transparent',
}

export default function HeroBackground({ image, overlay, fallbackAlt }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <img src={image.url} alt={image.alt || fallbackAlt} className="w-full h-full object-cover" />
      <div className={`absolute inset-0 ${OVERLAY_CLASSES[overlay]}`} />
    </div>
  )
}
