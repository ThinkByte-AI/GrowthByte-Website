type MediaInput = { url?: string } | string | undefined

interface HowToStepInput {
  stepName?: string
  stepText?: string
  stepImage?: MediaInput
  url?: string
}

interface HowToInput {
  name?: string
  description?: string
  totalTime?: string
  image?: MediaInput
  steps?: HowToStepInput[]
}

const resolveMediaUrl = (media: MediaInput): string | undefined => {
  if (!media || typeof media === 'string') return undefined
  return media.url
}

const buildStep = (step: HowToStepInput) => ({
  '@type': 'HowToStep',
  ...(step.stepName && { name: step.stepName }),
  text: step.stepText,
  ...(resolveMediaUrl(step.stepImage) && { image: resolveMediaUrl(step.stepImage) }),
  ...(step.url && { url: step.url }),
})

export const generateHowToSchema = (input?: HowToInput) => {
  const validSteps = (input?.steps ?? []).filter((s) => Boolean(s?.stepText?.trim()))
  if (validSteps.length === 0) return null

  const imageUrl = resolveMediaUrl(input?.image)

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    ...(input?.name && { name: input.name }),
    ...(input?.description && { description: input.description }),
    ...(input?.totalTime && { totalTime: input.totalTime }),
    ...(imageUrl && { image: imageUrl }),
    step: validSteps.map(buildStep),
  }
}
