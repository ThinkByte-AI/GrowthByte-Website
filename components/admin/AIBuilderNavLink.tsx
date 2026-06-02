import Link from 'next/link'

export default function AIBuilderNavLink() {
  return (
    <Link href="/admin/ai-builder"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        margin: '4px 0',
        background: 'linear-gradient(135deg, rgba(45,212,191,0.12), rgba(45,212,191,0.04))',
        border: '1px solid rgba(45,212,191,0.35)',
        borderRadius: 8,
        color: '#2dd4bf',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.01em',
      }}>
      <img src="/logo.jpeg" alt="" width={20} height={20} style={{ borderRadius: 4, display: 'block', flexShrink: 0 }} />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1, fontWeight: 700, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#f5f5f5' }}>Growth</span>
          <span style={{ color: '#2dd4bf' }}>Byte</span>
        </span>
        <span style={{ color: '#a3a3a3', fontWeight: 500 }}>Agent</span>
      </span>
      <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 6px', background: 'rgba(45,212,191,0.2)', borderRadius: 4, fontWeight: 700, letterSpacing: '0.05em' }}>NEW</span>
    </Link>
  )
}
