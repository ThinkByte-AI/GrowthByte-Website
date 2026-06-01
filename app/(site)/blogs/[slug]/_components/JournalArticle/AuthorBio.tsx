import { XIcon, LinkedInIcon } from '@/components/journal'
import type { JournalPost } from '../../../_components/types'

const initials = (name: string) => name.split(' ').map((s) => s[0]).join('').toUpperCase()

export default function AuthorBio({ post }: { post: JournalPost }) {
  const name = post.author || 'GrowthByte'
  const firstName = name.split(' ')[0]
  const bio = post.authorBio ||
    `${firstName} writes for GrowthByte on growth engineering, performance marketing, and the systems behind durable revenue.`
  return (
    <div className="author-bio">
      <div className="author-avatar">
        {post.authorImageUrl ? (
          <img src={post.authorImageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--gb-accent)', color: 'var(--gb-white)', display: 'grid', placeItems: 'center', fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {initials(name)}
          </div>
        )}
      </div>
      <div>
        <h4>{name}</h4>
        <div className="role">GrowthByte</div>
        <p>{bio}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <a href="https://www.linkedin.com/company/growthbyte" target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="https://twitter.com/growthbyte" target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="X"><XIcon /></a>
        </div>
      </div>
    </div>
  )
}
