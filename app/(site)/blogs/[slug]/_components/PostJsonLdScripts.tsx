import type { TemplateContent } from '@/lib/templateRenderer'
import { JsonLd, generateFaqPageSchema, generateHowToSchema } from '@/lib/schema'
import { generateBlogSchema } from '@/src/collections/BlogPosts/schema'

interface PostJsonLdScriptsProps {
  post: TemplateContent
}

export default function PostJsonLdScripts({ post }: PostJsonLdScriptsProps) {
  const blogPosting = generateBlogSchema(post)
  const faqPage = generateFaqPageSchema(post.faqItems)
  const howTo = generateHowToSchema(post.howTo)

  return (
    <>
      <JsonLd data={blogPosting} />
      <JsonLd data={faqPage} />
      <JsonLd data={howTo} />
    </>
  )
}
