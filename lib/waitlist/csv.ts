type CsvValue = string | number | boolean | null | undefined

// Spreadsheet apps execute cells starting with = + - @ as formulas; a leading quote keeps them plain text.
function escapeCsvCell(value: CsvValue): string {
  const text = value === null || value === undefined ? '' : String(value)
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

export function buildCsv(header: string[], rows: CsvValue[][]): string {
  return [header, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
}
