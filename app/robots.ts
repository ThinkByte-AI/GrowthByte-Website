import { MetadataRoute } from 'next'

// Unlisted demo pages under /modalx are off-limits to every crawler. AI agents get
// their own groups because a named group overrides the wildcard one for that agent.
const UNLISTED_PATHS = ['/api/', '/modalx/']

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'Diffbot',
  'ImagesiftBot',
  'cohere-ai',
  'YouBot',
  'AI2Bot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: UNLISTED_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: UNLISTED_PATHS })),
    ],
    sitemap: 'https://www.growthbyte.ai/sitemap.xml',
  }
}
