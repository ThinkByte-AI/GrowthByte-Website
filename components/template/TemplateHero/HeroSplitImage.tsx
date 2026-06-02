import type { HeroImageData } from './types'

interface HeroSplitImageProps {
  image: HeroImageData
  fallbackAlt: string
}

export default function HeroSplitImage({ image, fallbackAlt }: HeroSplitImageProps) {
  return (
    <div className="order-1 md:order-2">
      <img
        src={image.url}
        alt={image.alt || fallbackAlt}
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  )
}
