import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildTypographyCss, renderTemplate, type DynamicData } from '@/lib/templateRenderer'
import TocActiveSpy from '@/components/TocActiveSpy'

import { getService, getAllServices, getRelatedServices, resolveServiceTemplate } from './_fetchers'
import ServiceDetail, { type ServiceView, type RelatedService } from './_components/ServiceDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toServiceView = (doc: any): ServiceView => ({
  slug: String(doc.slug),
  title: String(doc.title ?? ''),
  shortTitle: String(doc.shortTitle ?? ''),
  outcome: String(doc.outcome ?? ''),
  description: String(doc.description ?? ''),
  capabilities: Array.isArray(doc.capabilities)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? doc.capabilities.map((c: any) => (typeof c === 'string' ? c : c?.capability ?? '')).filter(Boolean)
    : [],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toRelatedService = (doc: any): RelatedService => ({
  slug: String(doc.slug),
  title: String(doc.title ?? ''),
  outcome: String(doc.outcome ?? ''),
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  const title = service.metaTitle
    ? { absolute: service.metaTitle }
    : service.title
  return {
    title,
    description: service.metaDescription || service.description,
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const template = await resolveServiceTemplate(service)
  const relatedServices = await getRelatedServices(slug, 3)

  if (template?.customLayout?.html) {
    const dynamicData: DynamicData = { relatedPosts: relatedServices }
    const { html, css } = renderTemplate(
      { html: template.customLayout.html, css: template.customLayout.css },
      service,
      { contentType: 'service', dynamicData },
    )
    const typographyCss = buildTypographyCss(template.styling)
    return (
      <>
        {typographyCss && <style dangerouslySetInnerHTML={{ __html: typographyCss }} />}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <TocActiveSpy />
      </>
    )
  }

  const allServices = await getAllServices(30)
  const otherServices = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map(toRelatedService)

  return <ServiceDetail service={toServiceView(service)} otherServices={otherServices} />
}
