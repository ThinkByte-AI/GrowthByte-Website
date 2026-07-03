import type { GlobalAfterChangeHook } from 'payload'

// Refresh the ISR cache for the homepage when the global is edited. Dynamic
// import + try/catch because the hook can also run outside a Next request scope.
export const revalidateHome: GlobalAfterChangeHook = async () => {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')
  } catch {
    /* not in a Next request scope; nothing to revalidate */
  }
}
