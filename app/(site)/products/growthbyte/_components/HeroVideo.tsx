// Real product recordings only; the hero hides the player until a recording exists.
const HERO_VIDEO_SRC = undefined as string | undefined

export const hasHeroVideo = HERO_VIDEO_SRC !== undefined

export default function HeroVideo() {
  if (!HERO_VIDEO_SRC) return null
  return (
    <div id="watch" className="wrap wl-hero-watch">
      <div className="wl-watch-label">
        <span className="wl-watch-dot" />One client&apos;s week — goal → plan → run → approve → report · 60 sec
      </div>
      <video className="wl-hero-video" src={HERO_VIDEO_SRC} muted autoPlay loop playsInline controls preload="metadata" />
    </div>
  )
}
