import { redirect } from 'next/navigation'

// /blog → /insights (permanent redirect)
export default function BlogRedirect() {
  redirect('/insights')
}
