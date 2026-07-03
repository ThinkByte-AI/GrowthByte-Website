import Link from 'next/link'
import { ArrowIcon } from './icons'
import { TOOL_ICONS } from './toolIcons'
import type { ToolsData } from './types'

export default function ToolsSection({ data }: { data: ToolsData }) {
  const items = data.items ?? []
  return (
    <section className="light" id="tools" aria-labelledby="tools-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 id="tools-h">{data.heading}</h2>
          </div>
          <Link href={data.allHref ?? '/tools'} className="gb-btn gb-btn-ot">{data.allLabel} <ArrowIcon /></Link>
        </div>
        <div className="tools-grid">
          {items.map((tool, i) => (
            <Link href={tool.href ?? '/tools'} className="tcard" key={i}>
              <div className="tcard-ico">{TOOL_ICONS[tool.iconKey ?? '']}</div>
              <div className="tcard-name">{tool.name}</div>
              <div className="tcard-desc">{tool.desc}</div>
              <div className="tcard-link">Try it →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
