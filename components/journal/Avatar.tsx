interface AvatarProps {
  name?: string
  size?: number
  imageUrl?: string
}

const PALETTES = [
  { bg: '#009389', fg: '#ffffff' },
  { bg: '#0b0b0b', fg: '#009389' },
  { bg: '#935600', fg: '#fdf3e6' },
  { bg: '#fdf3e6', fg: '#935600' },
  { bg: '#e6f4f3', fg: '#007870' },
]

const hashName = (value: string): number => {
  let h = 0
  for (let i = 0; i < value.length; i++) h = ((h << 5) - h + value.charCodeAt(i)) | 0
  return Math.abs(h)
}

const initialsOf = (name: string): string =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

export function Avatar({ name = 'GrowthByte', size = 32, imageUrl }: AvatarProps) {
  if (imageUrl) {
    return (
      <span style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, display: 'inline-block' }}>
        <img src={imageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </span>
    )
  }
  const palette = PALETTES[hashName(name) % PALETTES.length]
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: palette.bg,
        color: palette.fg,
        display: 'inline-grid',
        placeItems: 'center',
        fontSize: size * 0.36,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        flexShrink: 0,
      }}
    >
      {initialsOf(name)}
    </span>
  )
}

export function AuthorChip({ name = 'GrowthByte', size = 24, imageUrl }: AvatarProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Avatar name={name} size={size} imageUrl={imageUrl} />
      <span style={{ fontSize: 13, color: 'var(--gb-ink-2)', fontWeight: 500 }}>{name}</span>
    </span>
  )
}
