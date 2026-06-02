import type { RenderOptions, TemplateContent } from './types'
import { replacePlaceholders } from './replaceContent'
import { replaceBlockPlaceholders } from './replaceBlocks'

interface TemplateSource {
  html: string
  css?: string
}

export const renderTemplate = (
  template: TemplateSource,
  content: TemplateContent,
  options: RenderOptions = {},
): { html: string; css: string } => {
  let html = replacePlaceholders(template.html, content)
  const css = template.css || ''

  if (options.dynamicData) {
    html = replaceBlockPlaceholders(html, options.dynamicData)
  }

  if (options.wrapInContainer) {
    html = `<div class="template-container">${html}</div>`
  }

  return { html, css }
}
