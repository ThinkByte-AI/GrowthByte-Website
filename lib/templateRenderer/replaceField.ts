const placeholderRegex = (key: string) => new RegExp(`\\{\\{${key}\\}\\}`, 'g')

export const replacePlaceholder = (html: string, key: string, value: any): string => {
  const pattern = placeholderRegex(key)

  if (value === null || value === undefined) return html.replace(pattern, '')
  if (typeof value === 'object' && value.url) return html.replace(pattern, value.url)
  if (Array.isArray(value)) return html.replace(pattern, JSON.stringify(value))
  return html.replace(pattern, String(value))
}

const resolveNestedValue = (key: string, source: any): any => {
  const parts = key.split('.')
  let current = source
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return undefined
    }
  }
  if (current && typeof current === 'object' && 'url' in current) return current.url
  return current
}

export const replaceNestedPlaceholder = (html: string, key: string, source: any): string => {
  const pattern = placeholderRegex(key)
  const resolved = resolveNestedValue(key, source)
  if (resolved === undefined) return html.replace(pattern, '')
  return html.replace(pattern, String(resolved ?? ''))
}
