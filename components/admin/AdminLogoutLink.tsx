import Link from 'next/link'

export default function AdminLogoutLink() {
  return (
    <Link href="/admin/logout"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        margin: '12px 0 4px',
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 8,
        color: '#a3a3a3',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 500,
      }}>
      <span aria-hidden style={{ fontSize: 14 }}>↗</span>
      <span>Log out</span>
    </Link>
  )
}
