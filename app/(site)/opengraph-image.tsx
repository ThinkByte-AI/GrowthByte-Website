import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'GrowthByte — AI-Powered Growth Partner'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public', 'og-logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B0B0B 0%, #05201E 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={alt} width={840} height={198} />
        <div
          style={{
            fontSize: 36,
            color: '#E6E6E6',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          AI-Powered Growth Partner
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
