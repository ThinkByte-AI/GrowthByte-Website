import Link from 'next/link'
import type { HeroBackLink } from './types'

interface BackLinkProps {
  link: HeroBackLink
  onImageBg: boolean
}

export default function BackLink({ link, onImageBg }: BackLinkProps) {
  const colorClass = onImageBg
    ? 'text-white/80 hover:text-white'
    : 'text-teal hover:text-teal-dark'
  return (
    <Link
      href={link.href}
      className={`${colorClass} transition-colors mb-6 inline-flex items-center gap-1`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {link.label}
    </Link>
  )
}
