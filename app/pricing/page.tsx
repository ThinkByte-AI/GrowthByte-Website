import { redirect } from 'next/navigation'

// /pricing → /contact (permanent redirect — pricing is discussed on strategy calls)
export default function PricingRedirect() {
  redirect('/contact')
}
