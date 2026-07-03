import { permanentRedirect } from 'next/navigation'

// /blog → /blogs (the CMS blog). Permanent (308) so link authority consolidates.
export default function BlogRedirect() {
  permanentRedirect('/blogs')
}
