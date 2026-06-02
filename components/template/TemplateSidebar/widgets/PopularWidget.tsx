import Link from 'next/link'
import type { TemplateContent } from '@/lib/templates'
import WidgetCard from '../WidgetCard'

interface PopularWidgetProps {
  items: TemplateContent[]
}

const LINK_CLASS = 'text-ink-60 hover:text-teal transition-colors block text-sm'

export default function PopularWidget({ items }: PopularWidgetProps) {
  return (
    <WidgetCard title="Popular Posts">
      <ul className="space-y-3">
        {items.slice(0, 5).map((item) => (
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
