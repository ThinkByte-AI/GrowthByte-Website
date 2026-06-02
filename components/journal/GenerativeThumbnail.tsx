interface Palette {
  bg: string
  fg: string
  accent: string
}

interface GenerativeThumbnailProps {
  seed: string
  category?: string
  variant?: number
  label?: string
}

const TEAL = '#009389'
const INK = '#0b0b0b'
const AMBER = '#935600'
const WHITE = '#ffffff'

const PALETTE_BY_KEYWORD: Array<[string, Palette]> = [
  ['seo', { bg: '#e6f4f3', fg: TEAL, accent: INK }],
  ['paid', { bg: INK, fg: TEAL, accent: '#fdf3e6' }],
  ['performance', { bg: INK, fg: TEAL, accent: '#fdf3e6' }],
  ['growth', { bg: '#fdf3e6', fg: AMBER, accent: INK }],
  ['automation', { bg: TEAL, fg: WHITE, accent: INK }],
  ['ai', { bg: TEAL, fg: WHITE, accent: INK }],
  ['analytics', { bg: '#f8f8f7', fg: INK, accent: TEAL }],
  ['saas', { bg: INK, fg: TEAL, accent: WHITE }],
  ['d2c', { bg: '#fdf3e6', fg: AMBER, accent: INK }],
  ['commerce', { bg: '#fdf3e6', fg: AMBER, accent: INK }],
  ['b2b', { bg: TEAL, fg: WHITE, accent: INK }],
  ['fintech', { bg: TEAL, fg: WHITE, accent: INK }],
  ['health', { bg: '#e6f4f3', fg: TEAL, accent: INK }],
]
const DEFAULT_PALETTE: Palette = { bg: '#e6f4f3', fg: TEAL, accent: INK }

const hashSeed = (value: string): number => {
  let h = 0
  for (let i = 0; i < value.length; i++) h = ((h << 5) - h + value.charCodeAt(i)) | 0
  return Math.abs(h)
}

const resolvePalette = (category?: string): Palette => {
  const key = (category || '').toLowerCase()
  return PALETTE_BY_KEYWORD.find(([word]) => key.includes(word))?.[1] || DEFAULT_PALETTE
}

const W = 800
const H = 500

const buildComposition = (variant: number, palette: Palette, seed: number, category?: string) => {
  const glyphs = ['↗', '+', '%', '×', '∞']
  switch (variant) {
    case 0:
      return (
        <g>
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={i * 100} y1="0" x2={i * 100} y2={H} stroke={palette.fg} strokeOpacity="0.12" strokeWidth="1" />
          ))}
          <circle cx={W * 0.7} cy={H * 0.55} r={H * 0.45} fill={palette.fg} />
          <circle cx={W * 0.7} cy={H * 0.55} r={H * 0.28} fill={palette.bg} />
          <rect x={W * 0.06} y={H * 0.72} width="42" height="42" fill={palette.accent} />
        </g>
      )
    case 1:
      return (
        <g>
          <polyline
            points={[...Array(9)].map((_, i) => {
              const x = i * (W / 8)
              const y = H * 0.85 - (Math.sin((seed + i) * 0.7) * 0.18 + 0.15 + i * 0.06) * H
              return `${x},${y}`
            }).join(' ')}
            fill="none" stroke={palette.fg} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx={W * 0.85} cy={H * 0.25} r="14" fill={palette.fg} />
          <text x="40" y="60" fill={palette.fg} fontFamily="var(--gb-font-mono)" fontSize="14" letterSpacing="2">
            {(category || 'GROWTH').toUpperCase()}
          </text>
        </g>
      )
    case 2:
      return (
        <g>
          <rect x={W * 0.06} y={H * 0.1} width={W * 0.42} height={H * 0.4} fill={palette.fg} />
          <rect x={W * 0.52} y={H * 0.1} width={W * 0.42} height={H * 0.18} fill={palette.accent} />
          <rect x={W * 0.52} y={H * 0.32} width={W * 0.2} height={H * 0.18} fill={palette.fg} fillOpacity="0.3" />
          <rect x={W * 0.74} y={H * 0.32} width={W * 0.2} height={H * 0.58} fill={palette.fg} />
          <rect x={W * 0.06} y={H * 0.54} width={W * 0.66} height={H * 0.36} fill={palette.fg} fillOpacity="0.15" />
        </g>
      )
    case 3:
      return (
        <g>
          <text x="40" y={H * 0.78} fill={palette.fg} fontFamily="var(--gb-font), sans-serif" fontSize="280" fontWeight="700" letterSpacing="-12">
            {glyphs[seed % glyphs.length]}
          </text>
          <text x="40" y="56" fill={palette.accent} fontFamily="var(--gb-font-mono)" fontSize="14" letterSpacing="2.5">
            ESSAY · {String((seed % 12) + 1).padStart(2, '0')}
          </text>
        </g>
      )
    case 4:
      return (
        <g transform={`translate(${W * 0.5}, ${H * 0.5})`}>
          {[1, 0.78, 0.56, 0.34, 0.16].map((s, i) => (
            <circle key={i} r={H * 0.42 * s} fill="none" stroke={palette.fg} strokeOpacity={0.18 + i * 0.16} strokeWidth={i === 4 ? 18 : 1.5} />
          ))}
          <rect x={-W * 0.4} y={-2} width={W * 0.8} height="4" fill={palette.accent} fillOpacity="0.5" />
        </g>
      )
    default:
      return (
        <g>
          <path d={`M0 ${H} L${W * 0.6} 0 L${W} 0 L${W} ${H} Z`} fill={palette.fg} />
          <path d={`M0 ${H} L${W * 0.4} ${H * 0.4} L${W * 0.55} ${H * 0.4} L${W * 0.2} ${H} Z`} fill={palette.accent} fillOpacity="0.7" />
          <circle cx={W * 0.18} cy={H * 0.25} r="10" fill={palette.accent} />
        </g>
      )
  }
}

export default function GenerativeThumbnail({ seed, category, variant, label }: GenerativeThumbnailProps) {
  const palette = resolvePalette(category)
  const h = hashSeed(seed)
  const v = variant != null ? variant : h % 6
  return (
    <svg
      className="gen-thumb"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ background: palette.bg }}
      role="img"
      aria-label={label || `${category || 'Article'} thumbnail`}
    >
      {buildComposition(v, palette, h, category)}
    </svg>
  )
}
