import { NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import path from 'path'
import { matchTemplate } from '@/components/admin/AIBuilder/templates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CHUNK_SIZE = 48
const CHUNK_DELAY_MS = 18
const THINKING_DELAY_MS = 380

const encode = (obj: unknown) => new TextEncoder().encode(JSON.stringify(obj) + '\n')

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

let JOURNAL_CSS: string | null = null
const getJournalCss = (): string => {
  if (JOURNAL_CSS !== null) return JOURNAL_CSS
  try {
    JOURNAL_CSS = readFileSync(path.join(process.cwd(), 'components', 'journal', 'journal.css'), 'utf8')
  } catch {
    JOURNAL_CSS = ''
  }
  return JOURNAL_CSS
}

export async function POST(req: NextRequest) {
  const { prompt = '' } = (await req.json().catch(() => ({}))) as { prompt?: string }
  const template = matchTemplate(prompt)

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encode({ type: 'thinking', message: 'Analysing prompt…' }))
      await sleep(THINKING_DELAY_MS)
      controller.enqueue(encode({ type: 'thinking', message: 'Picking layout primitives…' }))
      await sleep(THINKING_DELAY_MS)
      controller.enqueue(encode({ type: 'meta', name: template.name, templateType: template.type, description: template.description, previewUrl: template.previewUrl || null }))
      await sleep(THINKING_DELAY_MS)

      for (let i = 0; i < template.html.length; i += CHUNK_SIZE) {
        controller.enqueue(encode({ type: 'html_chunk', chunk: template.html.slice(i, i + CHUNK_SIZE) }))
        await sleep(CHUNK_DELAY_MS)
      }

      controller.enqueue(encode({ type: 'css', css: template.css }))
      controller.enqueue(encode({ type: 'done' }))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
