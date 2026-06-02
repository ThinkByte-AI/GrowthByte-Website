import type { TemplateContent } from '@/lib/templateRenderer'
import { getPayloadClient } from '@/src/get-payload'

export const getAllServices = async (limit: number = 30): Promise<TemplateContent[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    limit,
    sort: 'createdAt',
    depth: 0,
  })
  return docs as TemplateContent[]
}

export const getService = async (slug: string): Promise<TemplateContent | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (docs[0] as TemplateContent) || null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTemplate = async (templateId: string): Promise<any> => {
  const payload = await getPayloadClient()
  try {
    return await payload.findByID({ collection: 'page-templates', id: templateId, depth: 0 })
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultServiceTemplate = async (): Promise<any> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'page-templates',
    where: {
      type: { equals: 'service' },
      isDefault: { equals: true },
    },
    limit: 1,
  })
  return docs[0] || null
}

export const getRelatedServices = async (
  currentSlug: string,
  limit: number = 3,
): Promise<TemplateContent[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { not_equals: currentSlug } },
    limit,
    depth: 1,
  })
  return docs as TemplateContent[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveServiceTemplate = async (service: TemplateContent): Promise<any> => {
  let template = null
  if (service.template) {
    template = typeof service.template === 'string'
      ? await getTemplate(service.template)
      : service.template
  }
  if (!template?.customLayout?.html) {
    template = await getDefaultServiceTemplate()
  }
  return template
}
