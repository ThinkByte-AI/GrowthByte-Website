import { getPayloadClient } from '@/src/get-payload'
import type { Industry } from './[slug]/_components/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toIndustry = (doc: any): Industry => ({
  slug: String(doc.slug),
  name: String(doc.name ?? ''),
  challenge: String(doc.challenge ?? ''),
  detail: String(doc.detail ?? ''),
})

export const getIndustry = async (slug: string): Promise<Industry | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  return docs[0] ? toIndustry(docs[0]) : null
}

export const getAllIndustries = async (limit: number = 30): Promise<Industry[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'industries',
    limit,
    sort: 'createdAt',
    depth: 0,
  })
  return docs.map(toIndustry)
}
