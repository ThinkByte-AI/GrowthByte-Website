import Link from 'next/link'
import WidgetCard from '../WidgetCard'

interface TagsWidgetProps {
  tags: string[]
}

const TAG_CLASS = 'px-3 py-1 text-sm bg-ink-5 hover:bg-teal/10 text-ink-60 hover:text-teal rounded-full transition-colors'

export default function TagsWidget({ tags }: TagsWidgetProps) {
  return (
    <WidgetCard title="Tags">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/blogs?tag=${tag}`} className={TAG_CLASS}>
            {tag}
          </Link>
        ))}
      </div>
    </WidgetCard>
  )
}
