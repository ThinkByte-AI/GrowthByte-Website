import { XIcon, LinkedInIcon, GlobeIcon, MailIcon } from '@/components/journal'
import type { JournalPost } from '../../../_components/types'

const initials = (name: string) => name.split(' ').map((s) => s[0]).join('').toUpperCase()

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

const buildSocialLinks = (post: JournalPost): SocialLink[] => {
  const links: SocialLink[] = []
  if (post.authorLinkedinUrl) links.push({ href: post.authorLinkedinUrl, label: 'LinkedIn', icon: <LinkedInIcon /> })
  if (post.authorXUrl) links.push({ href: post.authorXUrl, label: 'X', icon: <XIcon /> })
  if (post.authorWebsiteUrl) links.push({ href: post.authorWebsiteUrl, label: 'Website', icon: <GlobeIcon /> })
  if (post.authorEmail) links.push({ href: `mailto:${post.authorEmail}`, label: 'Email', icon: <MailIcon /> })
  return links
}

export default function AuthorBio({ post }: { post: JournalPost }) {
  const name = post.author || 'GrowthByte'
  const role = post.authorRole || 'GrowthByte'
  const firstName = name.split(' ')[0]
  const bio = post.authorBio ||
    `${firstName} writes for GrowthByte on growth engineering, performance marketing, and the systems behind durable revenue.`
  const socials = buildSocialLinks(post)
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
        <div className="role">{role}</div>
        <p>{bio}</p>
        {socials.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
