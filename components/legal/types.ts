export type LegalListItem = {
  term?: string
  text: string
}

export type LegalBlock =
  | { type: 'text'; text: string }
  | { type: 'list'; items: LegalListItem[] }

export type LegalSection = {
  id: string
  heading: string
  blocks: LegalBlock[]
}

export type LegalDocument = {
  eyebrow: string
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}
