import Link from 'next/link'

export default function BottomBar() {
  return (
    <div className="foot-bot">
      <span>
        &copy; {new Date().getFullYear()} GrowthByte.ai (GrowthByte AI Labs Pvt Ltd). All rights reserved.
      </span>
      <div className="foot-leg">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </div>
  )
}
