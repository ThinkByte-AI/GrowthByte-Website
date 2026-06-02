import Link from 'next/link'
import type { TemplateContent } from '@/lib/templates'
import WidgetCard from '../WidgetCard'

interface RelatedWidgetProps {
  items: TemplateContent[]
}

const LINK_CLASS = 'text-ink-60 hover:text-teal transition-colors block'

export default function RelatedWidget({ items }: RelatedWidgetProps) {
  return (
    <WidgetCard title="Related Posts">
      <ul className="space-y-3">
        {items.slice(0, 3).map((item) => (
          <li key={item.id}>
            <Link href={`/blogs/${item.slug}`} className={LINK_CLASS}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
