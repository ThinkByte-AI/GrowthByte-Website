import Link from 'next/link'
import WidgetCard from '../WidgetCard'

interface CategoriesWidgetProps {
  categories: string[]
}

const LINK_CLASS = 'text-ink-60 hover:text-teal transition-colors capitalize'

export default function CategoriesWidget({ categories }: CategoriesWidgetProps) {
  return (
    <WidgetCard title="Categories">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat}>
            <Link href={`/blogs?category=${cat}`} className={LINK_CLASS}>
              {cat.replace('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </WidgetCard>
  )
}
