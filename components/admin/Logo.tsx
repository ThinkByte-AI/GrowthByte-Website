'use client'

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <img src="/logo.jpeg" alt="GrowthByte" width={36} height={36} style={{ borderRadius: 8, display: 'block' }} />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1 }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--theme-text)' }}>
          Growth
        </span>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#2dd4bf' }}>
          Byte
        </span>
      </span>
    </div>
  )
}
