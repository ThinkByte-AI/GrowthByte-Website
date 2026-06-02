interface FaqInputItem {
  question?: string
  answer?: string
}

interface ValidFaqItem {
  question: string
  answer: string
}

const isValidItem = (item: FaqInputItem | undefined): item is ValidFaqItem =>
  Boolean(item?.question?.trim() && item?.answer?.trim())

export const generateFaqPageSchema = (items?: FaqInputItem[]) => {
  const valid = (items ?? []).filter(isValidItem)
  if (valid.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
