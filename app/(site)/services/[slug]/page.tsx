import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { renderTemplate, type DynamicData } from '@/lib/templateRenderer'

import { getService, getRelatedServices, resolveServiceTemplate } from './_fetchers'
import FallbackService from './_components/FallbackService'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return {
    title: service.metaTitle || `${service.title} — GrowthByte`,
    description: service.metaDescription || service.description,
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
    return (
      <>
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    )
  }

  return <FallbackService service={service} />
}
