import Link from 'next/link'

export default function Cta() {
  return (
    <section className="section-padding-sm bg-surface border-t border-surface-border">
      <div className="container-custom text-center">
        <h2 className="text-balance mb-4 max-w-[28rem] mx-auto">Want to work with a team that owns the outcome?</h2>
        <p className="text-ink-60 text-body-lg mb-8 max-w-[30rem] mx-auto">
          Book a strategy call. Thirty minutes. No decks. Just a real conversation about your growth.
        </p>
        <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
      </div>
    </section>
  )
}
