import Link from 'next/link'

interface LinkColumnProps {
  title: string
  links: ReadonlyArray<{ name: string; href: string }>
}

export default function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/40 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
