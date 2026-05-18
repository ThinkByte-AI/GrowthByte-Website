interface ServiceSchemaInput {
  title?: string
  description?: string
  capabilities?: Array<{ capability: string }>
}

export const generateServiceSchema = (data: ServiceSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: data.title,
  description: data.description,
  provider: {
    '@type': 'Organization',
    name: 'GrowthByte',
    url: 'https://www.growthbyte.ai',
  },
  serviceType: data.title,
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: data.title,
    itemListElement: (data.capabilities || []).map((cap) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: cap.capability,
      },
    })),
  },
})
