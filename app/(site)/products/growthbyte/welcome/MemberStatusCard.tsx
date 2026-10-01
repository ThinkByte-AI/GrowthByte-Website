import { REFERRAL_REWARD_THRESHOLD, type WaitlistMember } from '@/lib/waitlist/constants'
import { buildLinkedInShareUrl, buildReferralUrl, buildWhatsAppShareUrl } from '@/lib/waitlist/links'
import CopyLinkButton from './CopyLinkButton'

interface MemberStatusCardProps {
  member: WaitlistMember
  origin: string
}

function describeReferralProgress(count: number, hasReward: boolean): string {
  if (hasReward) return '3 months free is yours at launch.'
  return `Referrals: ${count} / ${REFERRAL_REWARD_THRESHOLD} for 3 months free.`
}

export default function MemberStatusCard({ member, origin }: MemberStatusCardProps) {
  const referralUrl = buildReferralUrl(origin, member.referralCode ?? '')
  const referralCount = member.referralCount ?? 0
  const hasReward = (member.reward ?? 'none') !== 'none'

  return (
    <div className="wl-member">
      <span className="badge"><span className="badge-dot" />Founding cohort</span>
      <h1>You are in. <em>You are #{member.position}.</em></h1>
      <p className="hero-sub">Early access before public launch + the founding price for the founding 50.</p>
      <div className="cta-card wl-member-card">
        <div className="cta-card-h">Your link</div>
        <div className="wl-link-row">
          <code className="wl-link">{referralUrl}</code>
          <CopyLinkButton value={referralUrl} />
        </div>
        <div className="wl-share">
          <a className="gb-btn gb-btn-teal" href={buildWhatsAppShareUrl(referralUrl)} target="_blank" rel="noopener noreferrer">
            Share on WhatsApp
          </a>
          <a className="gb-btn gb-btn-teal" href={buildLinkedInShareUrl(referralUrl)} target="_blank" rel="noopener noreferrer">
            Share on LinkedIn
          </a>
        </div>
        <p className="wl-progress">{describeReferralProgress(referralCount, hasReward)}</p>
        <p className="cf-micro">Bookmark this page — it always shows your latest count.</p>
      </div>
    </div>
  )
}
