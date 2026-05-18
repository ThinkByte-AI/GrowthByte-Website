export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -25%)' }}
      />
    </>
  )
}
