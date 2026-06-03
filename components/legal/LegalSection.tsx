import type { LegalBlock, LegalListItem, LegalSection as LegalSectionData } from './types'

function LegalParagraph({ text }: { text: string }) {
  return <p className="text-body-md text-ink-60 leading-relaxed">{text}</p>
}

function LegalBulletList({ items }: { items: LegalListItem[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-body-md text-ink-60 leading-relaxed">
          <span className="mt-[0.6em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" aria-hidden="true" />
          <span>
            {item.term && <strong>{item.term} </strong>}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}

function LegalBlockContent({ block }: { block: LegalBlock }) {
  if (block.type === 'list') return <LegalBulletList items={block.items} />
  return <LegalParagraph text={block.text} />
}

export default function LegalSection({ section }: { section: LegalSectionData }) {
  return (
    <section id={section.id} className="scroll-mt-header">
      <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-ink mb-4 tracking-[-0.01em]">
        {section.heading}
      </h2>
      <div className="space-y-4">
        {section.blocks.map((block, i) => (
          <LegalBlockContent key={i} block={block} />
        ))}
      </div>
    </section>
  )
}
