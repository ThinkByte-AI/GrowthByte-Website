import { GenerativeThumbnail, BigCta } from '@/components/journal'
import type { JournalPost } from '../../../_components/types'
import { extractToc } from '../extractToc'
import ArticleHeader from './ArticleHeader'
import ArticleToc from './ArticleToc'
import ShareRail from './ShareRail'
import AuthorBio from './AuthorBio'
import RelatedPosts from './RelatedPosts'

interface JournalArticleProps {
  post: JournalPost
  contentHtml: string
  relatedPosts: JournalPost[]
}

const ArticleHero = ({ post }: { post: JournalPost }) => {
  const heroSrc = post.heroImageUrl || post.imageUrl
  return (
    <div className="gbx-container-narrow">
      <div style={{ aspectRatio: '21 / 9', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
        {heroSrc
          ? <img src={heroSrc} alt={post.imageAlt || post.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <GenerativeThumbnail seed={post.slug} variant={1} category={post.category} />}
      </div>
    </div>
  )
}

export default function JournalArticle({ post, contentHtml, relatedPosts }: JournalArticleProps) {
  const toc = extractToc(contentHtml)
  return (
    <div className="gbx">
      <ArticleHeader post={post} />
      <ArticleHero post={post} />
      <div className="article-wrap">
        <ArticleToc items={toc} readTime={post.readTime} />
        <div>
          <article className="article-body" id="gbx-article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <AuthorBio post={post} />
        </div>
        <ShareRail title={post.title} />
      </div>
      <RelatedPosts posts={relatedPosts} />
      <BigCta
        eyebrow="Ready to compress your payback?"
        heading="The next quarter is decided in the next 30 days."
        sub="Book a 30-minute strategy call. We will look at your numbers, name the one thing that would move the needle fastest, and tell you whether you need us or not."
        primary={{ label: 'Book a strategy call', href: '/contact' }}
        secondary={{ label: 'See case studies', href: '/case-studies' }}
      />
    </div>
  )
}
