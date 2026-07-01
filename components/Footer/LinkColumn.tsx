import Link from 'next/link'

interface LinkColumnProps {
  title: string
  links: ReadonlyArray<{ name: string; href: string }>
}

export default function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div className="flc">
      <div className="flc-h">{title}</div>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
