export interface BlogCategoryRef {
  id?: string
  slug?: string
  name?: string
  color?: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

// A post's `category` relationship is a populated object at depth >= 1, or a
// raw id string when unpopulated. Only the populated form carries slug/name.
export const resolveBlogCategory = (value: unknown): BlogCategoryRef | null => {
  if (!isRecord(value)) return null
  const slug = typeof value.slug === 'string' ? value.slug : undefined
  const name = typeof value.name === 'string' ? value.name : undefined
  if (!slug && !name) return null
  return {
    id: typeof value.id === 'string' ? value.id : undefined,
    slug,
    name,
    color: typeof value.color === 'string' ? value.color : undefined,
  }
}

export const blogCategorySlug = (value: unknown): string | undefined =>
  resolveBlogCategory(value)?.slug

export const blogCategoryName = (value: unknown): string =>
  resolveBlogCategory(value)?.name || 'Article'

export const blogCategoryColor = (value: unknown): string | undefined =>
  resolveBlogCategory(value)?.color

export const blogCategoryPath = (categorySlug?: string): string =>
  categorySlug ? `/blog/${categorySlug}` : '/blog'

export const blogPostPath = (categorySlug: string | undefined, postSlug: string): string =>
  categorySlug ? `/blog/${categorySlug}/${postSlug}` : `/blog/${postSlug}`
