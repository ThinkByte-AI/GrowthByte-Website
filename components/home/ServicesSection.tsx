'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICES } from './services/serviceData'
import ServicePanel from './ServicePanel'
import { ArrowIcon } from './icons'

export default function ServicesSection() {
  const [active, setActive] = useState(SERVICES[0].id)

  return (
    <section className="light" id="services" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">What We Do</span>
            <h2 id="svc-h">More than you see here.</h2>
          </div>
          <Link href="/services" className="gb-btn gb-btn-ot">All Services <ArrowIcon /></Link>
        </div>
        <div className="svc-shell">
          <div className="svc-nav" role="tablist" aria-label="Services">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`sv${active === service.id ? ' on' : ''}`}
                role="tab"
                aria-selected={active === service.id}
                onClick={() => setActive(service.id)}
              >
                <span className="sv-ico">{service.icon}</span>{service.navLabel}
              </button>
            ))}
          </div>
          <div className="svc-panels">
            {SERVICES.map((service) => (
              <ServicePanel key={service.id} service={service} active={active === service.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
