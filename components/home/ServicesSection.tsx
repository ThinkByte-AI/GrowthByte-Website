'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICE_ICONS } from './services/serviceIcons'
import ServicePanel from './ServicePanel'
import { ArrowIcon } from './icons'
import type { ServicesData } from './types'

export default function ServicesSection({ data }: { data: ServicesData }) {
  const items = data.items ?? []
  const [active, setActive] = useState(0)

  return (
    <section className="light" id="services" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 id="svc-h">{data.heading}</h2>
          </div>
          <Link href={data.allHref ?? '/services'} className="gb-btn gb-btn-ot">{data.allLabel} <ArrowIcon /></Link>
        </div>
        <div className="svc-shell">
          <div className="svc-nav" role="tablist" aria-label="Services">
            {items.map((service, i) => (
              <button
                key={i}
                type="button"
                className={`sv${active === i ? ' on' : ''}`}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
              >
                <span className="sv-ico">{SERVICE_ICONS[service.iconKey ?? '']}</span>{service.navLabel}
              </button>
            ))}
          </div>
          <div className="svc-panels">
            {items.map((service, i) => (
              <ServicePanel key={i} service={service} active={active === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
