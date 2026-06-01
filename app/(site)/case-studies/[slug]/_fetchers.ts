import { getPayloadClient } from '@/src/get-payload'
import type { CaseStudyDoc } from '../_components/types'

export const getCaseStudy = async (slug: string): Promise<CaseStudyDoc | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return (docs[0] as unknown as CaseStudyDoc) || null
}

export const getAllCaseStudies = async (limit = 30): Promise<CaseStudyDoc[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    limit,
    sort: '-updatedAt',
    depth: 0,
  })
  return docs as unknown as CaseStudyDoc[]
}

export const getRelatedCaseStudies = async (currentSlug: string, limit = 3): Promise<CaseStudyDoc[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { not_equals: currentSlug } },
    limit,
    sort: '-updatedAt',
    depth: 0,
  })
  return docs as unknown as CaseStudyDoc[]
}
