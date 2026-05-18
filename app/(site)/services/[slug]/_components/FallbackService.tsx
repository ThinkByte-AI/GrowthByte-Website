import type { TemplateContent } from '@/lib/templateRenderer'

const Capabilities = ({ items }: { items: TemplateContent['capabilities'] }) => {
  if (!items || items.length === 0) return null
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Capabilities</h2>
      <ul className="space-y-2">
        {items.map((cap, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-teal-500 rounded-full" />
            {cap.capability}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FallbackService({ service }: { service: TemplateContent }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          {service.outcome && (
            <p className="text-xl text-teal-600 font-medium mb-6">{service.outcome}</p>
          )}
          {service.description && (
            <p className="text-lg text-gray-600 mb-8">{service.description}</p>
          )}
          <Capabilities items={service.capabilities} />
        </div>
      </section>
    </div>
  )
}
