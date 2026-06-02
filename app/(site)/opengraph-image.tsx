import { ImageResponse } from 'next/og'

export const alt = 'GrowthByte - AI-Powered Marketing Agency'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6B35',
          fontWeight: 'bold',
        }}
      >
        <div>GrowthByte</div>
        <div style={{ fontSize: 48, color: '#FFFFFF', marginTop: 20 }}>
          AI-Powered Marketing Agency
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
