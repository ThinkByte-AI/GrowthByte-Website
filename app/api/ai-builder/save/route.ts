import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/src/get-payload'

interface SaveBody {
  name: string
  type: 'blog' | 'service' | 'landing' | 'case-study'
  description?: string
  html: string
  css: string
  prompt?: string
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as SaveBody | null
  if (!body?.name || !body?.html) {
    return NextResponse.json({ error: 'Missing name or html' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  const doc = await payload.create({
    collection: 'page-templates',
    data: {
      name: body.name,
      type: body.type,
      description: body.description || (body.prompt ? `Generated from prompt: ${body.prompt}` : 'AI-generated template'),
      customLayout: {
        html: body.html,
        css: body.css,
      },
    },
  })

  return NextResponse.json({ id: doc.id, name: doc.name })
}
