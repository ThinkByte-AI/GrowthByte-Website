import type { Endpoint } from 'payload'

const BATCH_LIMIT = 100

const transitionPosts = async (
  payload: any,
  whereStatus: string,
  dateField: 'publishedAt' | 'unpublishAt',
  nextStatus: string,
  now: string,
) => {
  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      _status: { equals: whereStatus },
      [dateField]: { less_than_equal: now },
    },
    limit: BATCH_LIMIT,
  })

  for (const post of result.docs) {
    await payload.update({
      collection: 'blog-posts',
      id: post.id,
      data: { _status: nextStatus },
    })
  }

  return result.docs.length
}

export const publishScheduledEndpoint: Endpoint = {
  path: '/publish-scheduled',
  method: 'post',
  handler: async (req) => {
    const now = new Date().toISOString()
    const published = await transitionPosts(req.payload, 'scheduled', 'publishedAt', 'published', now)
    const archived = await transitionPosts(req.payload, 'published', 'unpublishAt', 'archived', now)
    return Response.json({ success: true, published, archived, timestamp: now })
  },
}
