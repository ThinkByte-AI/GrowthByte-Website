import type { GeneratedTemplate } from './types'

const html = `<section class="hero">
  <div class="container">
    <span class="eyebrow">For modern SaaS teams</span>
    <h1>The growth platform built for <span class="accent">compounding outcomes</span>.</h1>
    <p class="lede">Replace 6 disconnected tools with one operator-grade system. Ship campaigns in hours, not weeks — with AI co-pilots on every channel.</p>
    <div class="cta-row">
      <a href="#" class="btn btn-primary">Book a strategy call</a>
      <a href="#" class="btn btn-ghost">See the platform →</a>
    </div>
    <div class="proof">
      <span>Trusted by 120+ growth teams</span>
      <div class="logos">
        <span>ACME</span><span>NORTH</span><span>RIVER</span><span>OCTAVE</span><span>HELIX</span>
      </div>
    </div>
  </div>
</section>
<section class="features">
  <div class="container">
    <h2>Everything a modern growth org needs. Nothing it doesn't.</h2>
    <div class="grid">
      <div class="feat"><div class="ico">◆</div><h3>AI campaign builder</h3><p>Generate, test, and ship paid campaigns across Meta, Google, and LinkedIn in a single workflow.</p></div>
      <div class="feat"><div class="ico">◇</div><h3>Attribution that holds up</h3><p>Multi-touch attribution that survives ATT, cookie loss, and dark social. Audit-ready dashboards.</p></div>
      <div class="feat"><div class="ico">▲</div><h3>Creative testing on autopilot</h3><p>Brief → variants → in-market in 48 hours. Winning creative surfaced automatically.</p></div>
    </div>
  </div>
</section>
<section class="cta-band">
  <div class="container">
    <h2>Ready to compound?</h2>
    <p>30-minute strategy call. We'll tell you whether you need us — honestly.</p>
    <a href="#" class="btn btn-primary">Book the call</a>
  </div>
</section>`

const css = `*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 32px}
.hero{padding:96px 0 64px;background:linear-gradient(180deg,#fafaf9 0%,#fff 100%)}
.eyebrow{display:inline-block;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0d9488;margin-bottom:20px}
.hero h1{font-size:clamp(40px,5vw,68px);font-weight:700;letter-spacing:-.025em;line-height:1.04;margin:0 0 24px;color:#0a0a0a;max-width:18ch}
.accent{color:#0d9488}
.lede{font-size:20px;line-height:1.55;color:#525252;max-width:60ch;margin:0 0 32px}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:64px}
.btn{display:inline-flex;align-items:center;padding:14px 24px;border-radius:999px;font-weight:600;font-size:15px;text-decoration:none;transition:transform .15s}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:#0a0a0a;color:#fff}
.btn-ghost{background:transparent;color:#0a0a0a;border:1px solid #e5e5e5}
.proof{display:flex;flex-direction:column;gap:16px}
.proof>span{font-size:12px;color:#737373;letter-spacing:.05em;text-transform:uppercase}
.logos{display:flex;gap:32px;flex-wrap:wrap}
.logos span{font-size:18px;font-weight:700;letter-spacing:-.02em;color:#a3a3a3}
.features{padding:96px 0;background:#fff}
.features h2{font-size:clamp(32px,3.5vw,48px);font-weight:700;letter-spacing:-.02em;margin:0 0 56px;max-width:24ch;color:#0a0a0a}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.feat{padding:32px;border:1px solid #e5e5e5;border-radius:16px;background:#fff;transition:border-color .2s}
.feat:hover{border-color:#0d9488}
.ico{width:48px;height:48px;border-radius:12px;background:#ccfbf1;color:#0d9488;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:20px}
.feat h3{font-size:20px;font-weight:700;margin:0 0 12px;color:#0a0a0a}
.feat p{font-size:15px;line-height:1.6;color:#525252;margin:0}
.cta-band{padding:96px 0;background:#0a0a0a;color:#fff;text-align:center}
.cta-band h2{font-size:clamp(32px,3vw,44px);font-weight:700;margin:0 0 16px;letter-spacing:-.02em}
.cta-band p{font-size:18px;color:#a3a3a3;margin:0 0 32px}
.cta-band .btn-primary{background:#2dd4bf;color:#0a0a0a}
@media(max-width:768px){.grid{grid-template-columns:1fr}}`

export const saasLanding: GeneratedTemplate = {
  name: 'SaaS Landing Page',
  type: 'landing',
  description: 'Clean modern landing page for B2B SaaS — hero, three-up features, dark CTA band.',
  html,
  css,
}
