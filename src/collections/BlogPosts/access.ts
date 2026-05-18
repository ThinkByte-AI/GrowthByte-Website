import type { Access, Where } from 'payload'

export const publicReadAccess: Access = ({ req }) => {
  if (req.user) return true

  const now = new Date().toISOString()
  const liveOnly: Where = {
    and: [
      { workflowStatus: { in: ['published', 'scheduled'] } },
      { publishedAt: { less_than_equal: now } },
    ],
  }
  return liveOnly
}
