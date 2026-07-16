import { permanentRedirect } from 'next/navigation'

// The blog moved from /blogs to /blog (singular). Permanent (308) so link
// authority consolidates onto the new listing.
export default function BlogsListingRedirect() {
  permanentRedirect('/blog')
}
