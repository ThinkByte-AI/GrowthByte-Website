import WidgetCard from '../WidgetCard'

interface AuthorWidgetProps {
  author: string
  authorImage?: { url: string; alt?: string }
  authorBio?: string
}

export default function AuthorWidget({ author, authorImage, authorBio }: AuthorWidgetProps) {
  return (
    <WidgetCard title="Written By">
      <div className="flex items-center gap-3">
        {authorImage && (
          <img src={authorImage.url} alt={author} className="w-12 h-12 rounded-full object-cover" />
        )}
        <div>
          <p className="font-medium text-ink">{author}</p>
          {authorBio && <p className="text-sm text-ink-50 mt-1">{authorBio}</p>}
        </div>
      </div>
    </WidgetCard>
  )
}
