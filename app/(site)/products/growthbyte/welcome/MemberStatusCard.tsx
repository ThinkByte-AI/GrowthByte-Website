import { FOUNDING_SLOTS, type WaitlistMember } from '@/lib/waitlist/constants'
import ReferralShareCard from './ReferralShareCard'

interface MemberStatusCardProps {
  member: WaitlistMember
  origin: string
  callUrl: string
}

function listBadgeOf(member: WaitlistMember): string | null {
  if (member.door === 'business' || !member.position) return null
  return member.position <= FOUNDING_SLOTS ? 'Founding list' : 'Early Access'
}

export default function MemberStatusCard({ member, origin, callUrl }: MemberStatusCardProps) {
  const badge = listBadgeOf(member)
  return (
    <div className="wl-member">
      {badge && <span className="badge"><span className="badge-dot" />{badge}</span>}
      <h1>You are <em>#{member.position}</em> on the GrowthByte OS list.</h1>
      <p className="hero-sub">Founding offers go out when workspaces open. List members hear first, in position order.</p>
      <ReferralShareCard member={member} origin={origin} callUrl={callUrl} />
    </div>
  )
}
