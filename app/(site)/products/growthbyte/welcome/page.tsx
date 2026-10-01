import type { Metadata } from 'next'
import { headers } from 'next/headers'
import '../../../gb-home.css'
import '../waitlist.css'
import { getPayloadClient } from '@/src/get-payload'
import { findMemberWhere } from '@/lib/waitlist/members'
import MemberStatusCard from './MemberStatusCard'
import WaitlistNotice from '../_components/WaitlistNotice'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'You are in — GrowthByte waitlist' },
  robots: { index: false, follow: false },
}

async function requestOrigin(): Promise<string> {
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host') ?? 'www.growthbyte.ai'
  const protocol = headerList.get('x-forwarded-proto') ?? 'https'
  return `${protocol}://${host}`
}

export default async function WaitlistWelcomePage({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const { m: memberKey } = await searchParams
  const member = memberKey
    ? await findMemberWhere(await getPayloadClient(), { memberKey: { equals: memberKey }, verified: { equals: true } })
    : null

  return (
    <div className="gb-home">
      <section className="hero">
        <div className="wrap">
          {member ? (
            <MemberStatusCard member={member} origin={await requestOrigin()} />
          ) : (
            <WaitlistNotice
              title="We could not find your spot"
              body="This link is not valid. Join again with the same email and we will send you your personal link."
            />
          )}
        </div>
      </section>
    </div>
  )
}
