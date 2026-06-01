import type { GeneratedTemplate } from './types'

const html = `<section class="pricing-hero">
  <div class="container">
    <span class="eyebrow">Pricing</span>
    <h1>Plans that compound with you.</h1>
    <p class="lede">Start lean, scale into a full operator engagement when the metrics are moving. No long contracts. No hidden fees.</p>
    <div class="toggle"><button class="active">Monthly</button><button>Annual <span class="save">−20%</span></button></div>
  </div>
</section>
<section class="tiers">
  <div class="container">
    <div class="grid">
      <div class="tier">
        <span class="tier-name">Starter</span>
        <div class="price"><span class="amt">$2,400</span><span class="per">/mo</span></div>
        <p class="tier-sub">For founders shipping their first paid program.</p>
        <a href="#" class="btn btn-ghost">Book intro call</a>
        <ul>
          <li>1 channel managed</li>
          <li>Weekly performance review</li>
          <li>Creative testing (4 variants/mo)</li>
          <li>Slack channel access</li>
        </ul>
      </div>
      <div class="tier featured">
        <span class="badge">Most popular</span>
        <span class="tier-name">Operator</span>
        <div class="price"><span class="amt">$6,800</span><span class="per">/mo</span></div>
        <p class="tier-sub">For growth teams ready to compound.</p>
        <a href="#" class="btn btn-primary">Book strategy call</a>
        <ul>
          <li>Up to 3 channels managed</li>
          <li>Twice-weekly working sessions</li>
          <li>Creative testing (12 variants/mo)</li>
          <li>Attribution dashboard + audit</li>
          <li>Dedicated growth lead</li>
        </ul>
      </div>
      <div class="tier">
        <span class="tier-name">Enterprise</span>
        <div class="price"><span class="amt">Custom</span></div>
        <p class="tier-sub">For brands operating at scale.</p>
        <a href="#" class="btn btn-ghost">Talk to us</a>
        <ul>
          <li>Unlimited channels</li>
          <li>Embedded operator team</li>
          <li>Custom AI workflows</li>
          <li>Quarterly board reviews</li>
          <li>White-glove onboarding</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="faq">
  <div class="container">
    <h2>The questions everyone asks first.</h2>
    <div class="qa"><h3>How fast will I see results?</h3><p>Most engagements show measurable lift in 30–60 days. Compounding effects show up in quarter 2.</p></div>
    <div class="qa"><h3>Do you take equity?</h3><p>No. We are a cash-fee agency. We win when you win, measured by the metrics we agree on day one.</p></div>
    <div class="qa"><h3>Can I cancel anytime?</h3><p>Month-to-month after the first 90 days. We earn the next month every month.</p></div>
  </div>
</section>`

const css = `*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 32px}
.pricing-hero{padding:96px 0 48px;text-align:center;background:#fafaf9}
.eyebrow{display:inline-block;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0d9488;margin-bottom:16px}
.pricing-hero h1{font-size:clamp(40px,4.5vw,60px);font-weight:700;letter-spacing:-.025em;margin:0 0 20px;color:#0a0a0a}
.lede{font-size:18px;line-height:1.55;color:#525252;max-width:54ch;margin:0 auto 40px}
.toggle{display:inline-flex;padding:4px;background:#fff;border:1px solid #e5e5e5;border-radius:999px}
.toggle button{padding:10px 20px;border:none;background:transparent;border-radius:999px;font-size:14px;font-weight:600;color:#525252;cursor:pointer}
.toggle button.active{background:#0a0a0a;color:#fff}
.toggle .save{margin-left:6px;color:#2dd4bf;font-size:12px}
.tiers{padding:64px 0 96px;background:#fafaf9}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.tier{padding:40px 32px;background:#fff;border:1px solid #e5e5e5;border-radius:20px;display:flex;flex-direction:column;gap:16px;position:relative}
.tier.featured{border-color:#0a0a0a;box-shadow:0 20px 50px -20px rgba(0,0,0,.15);transform:translateY(-8px)}
.badge{position:absolute;top:-12px;left:32px;padding:6px 12px;background:#2dd4bf;color:#0a0a0a;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.tier-name{font-size:14px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#737373}
.price{display:flex;align-items:baseline;gap:6px}
.amt{font-size:44px;font-weight:700;letter-spacing:-.025em;color:#0a0a0a}
.per{font-size:16px;color:#737373}
.tier-sub{font-size:14px;color:#525252;margin:0;min-height:42px}
.btn{display:inline-block;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px;text-decoration:none;text-align:center}
.btn-primary{background:#0a0a0a;color:#fff}
.btn-ghost{background:transparent;color:#0a0a0a;border:1px solid #e5e5e5}
.tier ul{list-style:none;padding:0;margin:8px 0 0;display:flex;flex-direction:column;gap:10px}
.tier li{font-size:14px;color:#404040;padding-left:22px;position:relative}
.tier li::before{content:"✓";position:absolute;left:0;color:#0d9488;font-weight:700}
.faq{padding:96px 0;background:#fff}
.faq h2{font-size:clamp(28px,3vw,40px);font-weight:700;letter-spacing:-.02em;margin:0 0 40px;color:#0a0a0a;text-align:center}
.qa{max-width:720px;margin:0 auto;padding:24px 0;border-bottom:1px solid #e5e5e5}
.qa h3{font-size:18px;font-weight:600;margin:0 0 8px;color:#0a0a0a}
.qa p{font-size:15px;line-height:1.6;color:#525252;margin:0}
@media(max-width:900px){.grid{grid-template-columns:1fr}.tier.featured{transform:none}}`

export const pricingPage: GeneratedTemplate = {
  name: 'Pricing Page',
  type: 'landing',
  description: 'Three-tier pricing with featured plan, monthly/annual toggle, and FAQ block.',
  html,
  css,
}
