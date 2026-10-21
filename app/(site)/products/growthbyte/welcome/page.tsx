import type { Metadata } from 'next'
import { headers } from 'next/headers'
import type { Payload } from 'payload'
import '../../../gb-home.css'
import '../waitlist.css'
import { getPayloadClient } from '@/src/get-payload'
import { findDocRequestByConfirmKey } from '@/lib/doors/requests'
import { getLaunchSettings } from '@/lib/waitlist/launch-settings'
import { findMemberWhere } from '@/lib/waitlist/members'
import MemberStatusCard from './MemberStatusCard'
import DocConfirmation from './DocConfirmation'
import WaitlistNotice from '../_components/WaitlistNotice'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'You are in — GrowthByte OS' },
  robots: { index: false, follow: false },
}

interface WelcomeSearchParams {
  m?: string
  r?: string
}

async function requestOrigin(): Promise<string> {
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host') ?? 'www.growthbyte.ai'
  const protocol = headerList.get('x-forwarded-proto') ?? 'https'
  return `${protocol}://${host}`
}

async function renderWelcomeContent(payload: Payload, { m: memberKey, r: confirmKey }: WelcomeSearchParams) {
  const [origin, { foundingCallUrl }] = await Promise.all([requestOrigin(), getLaunchSettings(payload)])
  if (confirmKey) {
    const request = await findDocRequestByConfirmKey(payload, confirmKey)
    if (request) {
      const memberId = typeof request.member === 'string' ? request.member : request.member?.id
      const member = memberId ? await findMemberWhere(payload, { id: { equals: memberId } }) : null
      return <DocConfirmation request={request} member={member} origin={origin} callUrl={foundingCallUrl} />
    }
  }
  if (memberKey) {
    const member = await findMemberWhere(payload, { memberKey: { equals: memberKey }, verified: { equals: true } })
    if (member) return <MemberStatusCard member={member} origin={origin} callUrl={foundingCallUrl} />
  }
  return (
    <WaitlistNotice
      title="We could not find your page"
      body="This link is not valid. Request a document again with the same work email and we will send you a fresh link."
    />
  )
}

export default async function WaitlistWelcomePage({ searchParams }: { searchParams: Promise<WelcomeSearchParams> }) {
  const content = await renderWelcomeContent(await getPayloadClient(), await searchParams)
  return (
    <div className="gb-home">
      <section className="hero">
        <div className="wrap">{content}</div>
      </section>
    </div>
  )
}
