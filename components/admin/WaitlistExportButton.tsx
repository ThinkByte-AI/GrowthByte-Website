export default function WaitlistExportButton() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
      <a
        href="/api/waitlist/export"
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: '#009389',
          borderRadius: 6,
          color: '#fff',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <span aria-hidden>⬇</span>
        <span>Export CSV</span>
      </a>
    </div>
  )
}
