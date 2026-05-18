import Link from 'next/link'

const LEGAL_LINK_CLASS = 'text-[0.8125rem] text-white/30 hover:text-white/60 transition-colors'

export default function BottomBar() {
  return (
    <div className="border-t border-white/8">
      <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[0.8125rem] text-white/30">
          &copy; {new Date().getFullYear()} GrowthByte. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className={LEGAL_LINK_CLASS}>Privacy Policy</Link>
          <Link href="/terms" className={LEGAL_LINK_CLASS}>Terms</Link>
        </div>
      </div>
    </div>
  )
}
