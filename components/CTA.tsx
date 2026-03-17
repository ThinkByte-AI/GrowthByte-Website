import Link from 'next/link'

interface CTAProps {
  primary?: string
  secondary?: string
  primaryHref?: string
  secondaryHref?: string
  className?: string
}

export default function CTA({
  primary = "Book a Strategy Call",
  secondary = "See Case Studies",
  primaryHref = "/contact",
  secondaryHref = "/case-studies",
  className = ""
}: CTAProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <Link href={primaryHref} className="btn-primary btn-lg">
        {primary}
      </Link>
      <Link href={secondaryHref} className="btn-ghost btn-lg">
        {secondary}
      </Link>
    </div>
  )
}
