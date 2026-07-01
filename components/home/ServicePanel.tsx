import Link from 'next/link'
import type { ServiceItem } from './services/serviceData'

interface ServicePanelProps {
  service: ServiceItem
  active: boolean
}

export default function ServicePanel({ service, active }: ServicePanelProps) {
  return (
    <div className={`sp${active ? ' on' : ''}`} id={`p-${service.id}`} role="tabpanel">
      <div className="sp-tag">{service.tag}</div>
      <div className="sp-name">{service.name}</div>
      <div className="sp-desc">{service.desc}</div>
      <div className="sp-pills">
        {service.pills.map((pill) => <span key={pill} className="pill">{pill}</span>)}
      </div>
      {service.proof && (
        <div className="sp-proof">
          <span className="sp-pv">{service.proof.value}</span>
          <span className="sp-pl">{service.proof.label}</span>
        </div>
      )}
      <Link href={service.href} className="sp-link">Explore {service.tag} →</Link>
    </div>
  )
}
