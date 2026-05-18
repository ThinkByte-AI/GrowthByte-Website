import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { renderTemplate, TemplateContent, DynamicData } from '@/lib/templateRenderer'

const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

interface Props {
  params: Promise<{ slug: string }>
}

async function getService(slug: string): Promise<TemplateContent | null> {
  const res = await fetch(
    `${API_URL}/api/services?where[slug][equals]=${slug}&depth=2&limit=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

async function getTemplate(templateId: string) {
  const res = await fetch(
    `${API_URL}/api/page-templates/${templateId}?depth=0`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  return res.json()
}

async function getDefaultServiceTemplate() {
  const res = await fetch(
    `${API_URL}/api/page-templates?where[type][equals]=service&where[isDefault][equals]=true&limit=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

async function getRelatedServices(currentSlug: string, limit: number = 3): Promise<TemplateContent[]> {
  const res = await fetch(
    `${API_URL}/api/services?where[slug][not_equals]=${currentSlug}&limit=${limit}&depth=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
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

  if (!service) {
    notFound()
  }

  // Get template - from service, or default
  let template = null
  if (service.template) {
    template = typeof service.template === 'string'
      ? await getTemplate(service.template)
      : service.template
  }

  if (!template?.customLayout?.html) {
    template = await getDefaultServiceTemplate()
  }

  // Get related services
  const relatedServices = await getRelatedServices(slug, 3)

  // If we have a visual builder template, use it
  if (template?.customLayout?.html) {
    const dynamicData: DynamicData = {
      relatedPosts: relatedServices, // Reuse same block name for consistency
    }

    const { html, css } = renderTemplate(
      {
        html: template.customLayout.html,
        css: template.customLayout.css,
      },
      service,
      { contentType: 'service', dynamicData }
    )

    return (
      <>
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    )
  }

  // Fallback: Default template if no custom template
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          {service.outcome && (
            <p className="text-xl text-teal-600 font-medium mb-6">{service.outcome}</p>
          )}
          {service.description && (
            <p className="text-lg text-gray-600 mb-8">{service.description}</p>
          )}

          {service.capabilities && service.capabilities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Capabilities</h2>
              <ul className="space-y-2">
                {service.capabilities.map((cap: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    {cap.capability}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
