import Link from 'next/link'
import type { ServiceItemData } from './types'

interface ServicePanelProps {
  service: ServiceItemData
  active: boolean
}

export default function ServicePanel({ service, active }: ServicePanelProps) {
  return (
    <div className={`sp${active ? ' on' : ''}`} role="tabpanel">
      <div className="sp-tag">{service.tag}</div>
      <div className="sp-name">{service.name}</div>
      <div className="sp-desc">{service.desc}</div>
      <div className="sp-pills">
        {(service.pills ?? []).map((pill, i) => <span key={i} className="pill">{pill.value}</span>)}
      </div>
      {service.proofValue && (
        <div className="sp-proof">
          <span className="sp-pv">{service.proofValue}</span>
          <span className="sp-pl">{service.proofLabel}</span>
        </div>
      )}
      <Link href={service.href ?? '/services'} className="sp-link">Explore {service.tag} →</Link>
    </div>
  )
}
