'use client'

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--theme-text)' }}>
        Growth
      </span>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#2dd4bf' }}>
        Byte
      </span>
    </div>
  )
}
