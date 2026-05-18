import type { PageTemplate } from '@/lib/templates'

type Styling = NonNullable<PageTemplate['styling']>

const px = (value?: number) => (value && value > 0 ? `${value}px` : undefined)

const cssRule = (selector: string, declarations: Record<string, string | undefined>): string => {
  const valid = Object.entries(declarations).filter(([, v]) => v !== undefined && v !== '')
  if (valid.length === 0) return ''
  const body = valid.map(([key, value]) => `${key}: ${value};`).join(' ')
  return `${selector} { ${body} }`
}

const SCOPE = '.rich-content'

export const buildTypographyCss = (styling?: Styling): string => {
  if (!styling) return ''

  const headingColor = styling.headingColor
  const lines = [
    cssRule(`${SCOPE} h1`, { 'font-size': px(styling.h1Size), color: headingColor }),
    cssRule(`${SCOPE} h2`, { 'font-size': px(styling.h2Size), color: headingColor }),
    cssRule(`${SCOPE} h3`, { 'font-size': px(styling.h3Size), color: headingColor }),
    cssRule(SCOPE, { color: styling.bodyColor }),
    cssRule(`${SCOPE} p, ${SCOPE} li`, { 'font-size': px(styling.bodySize) }),
    cssRule(`${SCOPE} a`, { color: styling.linkColor }),
  ]

  return lines.filter(Boolean).join('\n')
}
