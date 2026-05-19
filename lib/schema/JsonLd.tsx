interface JsonLdProps {
  data: unknown
}

const escapeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')

export default function JsonLd({ data }: JsonLdProps) {
  if (data == null) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(data) }}
    />
  )
}
