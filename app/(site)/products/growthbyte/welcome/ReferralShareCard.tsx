import { REFERRAL_REWARD_THRESHOLD, type WaitlistMember } from '@/lib/waitlist/constants'
import { buildReferralUrl } from '@/lib/waitlist/links'
import FoundingCallLink from '../_components/FoundingCallLink'
import CopyLinkButton from './CopyLinkButton'
import ShareButtons from './ShareButtons'

interface ReferralShareCardProps {
  member: WaitlistMember
  origin: string
  callUrl: string
}

// Business owners refer their agency for priority, not free months, so they never see the reward count.
function describeReferralProgress(member: WaitlistMember): string {
  if (member.door === 'business') return 'Already work with an agency? Send them your link when your Growth Strategy arrives.'
  if ((member.reward ?? 'none') !== 'none') return '3 months free is yours at launch.'
  const count = member.referralCount ?? 0
  return `When ${REFERRAL_REWARD_THRESHOLD} agencies join from your link, you get 3 months free on any paid plan, applied at launch. Referrals so far: ${count} / ${REFERRAL_REWARD_THRESHOLD}.`
}

export default function ReferralShareCard({ member, origin, callUrl }: ReferralShareCardProps) {
  const referralUrl = buildReferralUrl(origin, member.referralCode ?? '')
  return (
    <div className="cta-card wl-member-card">
      <div className="cta-card-h">Your link</div>
      <div className="wl-link-row">
        <code className="wl-link">{referralUrl}</code>
        <CopyLinkButton value={referralUrl} />
      </div>
      <div className="wl-share">
        <ShareButtons referralUrl={referralUrl} />
        <FoundingCallLink href={callUrl} placement="confirmation" className="gb-btn gb-btn-ghost wl-copy" />
      </div>
      <p className="wl-progress">{describeReferralProgress(member)}</p>
      <p className="cf-micro">Bookmark this page. It always shows your latest count.</p>
    </div>
  )
}
