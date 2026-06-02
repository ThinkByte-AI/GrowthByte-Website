import type { TemplateContent } from '@/lib/templates'

interface AdditionalBlocksProps {
  blocks?: TemplateContent['additionalBlocks']
}

const PullQuote = ({ text }: { text: string }) => (
  <blockquote className="text-2xl italic text-center text-ink-70 border-l-4 border-teal pl-6 py-4 bg-teal/5 rounded-r-lg">
    &ldquo;{text}&rdquo;
  </blockquote>
)

const VideoEmbed = ({ src }: { src: string }) => (
  <div className="aspect-video rounded-lg overflow-hidden">
    <iframe
      src={src}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)

const Gallery = ({ items }: { items: NonNullable<TemplateContent['additionalBlocks']>['gallery'] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {items?.map((item, i) => (
      <figure key={i} className="relative">
        <img src={item.image.url} alt={item.caption || ''} className="w-full rounded-lg" />
        {item.caption && (
          <figcaption className="text-sm text-ink-50 mt-2 text-center">{item.caption}</figcaption>
        )}
      </figure>
    ))}
  </div>
)

export default function AdditionalBlocks({ blocks }: AdditionalBlocksProps) {
  if (!blocks) return null
  return (
    <div className="mt-12 space-y-8">
      {blocks.pullQuote && <PullQuote text={blocks.pullQuote} />}
      {blocks.videoEmbed && <VideoEmbed src={blocks.videoEmbed} />}
      {blocks.gallery && blocks.gallery.length > 0 && <Gallery items={blocks.gallery} />}
    </div>
  )
}
