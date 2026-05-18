import type { Access, Where } from 'payload'

export const publicReadAccess: Access = ({ req }) => {
  if (req.user) return true

  const now = new Date().toISOString()
  const liveOnly: Where = {
    and: [
      { _status: { equals: 'published' } },
      { publishedAt: { less_than_equal: now } },
    ],
  }
  return liveOnly
}
