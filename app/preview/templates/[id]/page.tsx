import { notFound } from 'next/navigation'

async function getTemplate(id: string) {
  const res = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/page-templates/${id}?depth=0`, {
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = await getTemplate(id)

  if (!template) {
    notFound()
  }

  const html = template.customLayout?.html || ''
  const css = template.customLayout?.css || ''

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{template.name || 'Template Preview'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; }
          img { max-width: 100%; height: auto; }
          a { color: inherit; }
        ` }} />
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </body>
    </html>
  )
}
