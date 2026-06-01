import type { GeneratedTemplate } from './types'

const html = `<section class="cs-hero">
  <div class="container">
    <div class="crumb"><a href="/case-studies">← All case studies</a> <span>/</span> <span class="industry">{{industry}}</span></div>
    <span class="tag">{{industry}}</span>
    <h1 class="headline"><span class="metric">{{metric}}</span> {{metricLabel}}</h1>
    <p class="lede">{{summary}}</p>
    <div class="meta">
      <div><span class="k">Industry</span><span class="v">{{industry}}</span></div>
      <div><span class="k">Duration</span><span class="v">{{timeframe}}</span></div>
      <div><span class="k">Focus</span><span class="v">{{metricLabel}}</span></div>
      <div><span class="k">Result</span><span class="v">{{metric}}</span></div>
    </div>
  </div>
</section>
<section class="cs-section">
  <div class="container">
    <div class="head"><span class="no">01 · The Challenge</span><h2>A growth problem disguised as a channel problem.</h2></div>
    <div class="body"><div class="label">Context</div><div class="text">{{challenge}}</div></div>
  </div>
</section>
<section class="cs-section alt">
  <div class="container">
    <div class="head"><span class="no">02 · Our Approach</span><h2>Diagnose first. Subtract before adding. Compound from there.</h2></div>
    <div class="body"><div class="label">How we framed it</div><div class="text">{{approach}}</div></div>
  </div>
</section>
<section class="cs-section dark">
  <div class="container">
    <div class="head"><span class="no">03 · The Results</span><h2>What the engagement moved.</h2></div>
    <div class="body"><div class="label">Outcome</div>
      <div class="text">
        <div class="big-metric"><span class="num">{{metric}}</span><span class="unit">{{metricLabel}} · {{timeframe}}</span></div>
        <p>{{resultsParagraph}}</p>
      </div>
    </div>
  </div>
</section>`

const css = `*{box-sizing:border-box}
.container{max-width:1120px;margin:0 auto;padding:0 32px}
.cs-hero{padding:96px 0 80px;background:#fafaf9;border-bottom:1px solid #e5e5e5}
.crumb{display:flex;gap:10px;align-items:center;font-size:13px;color:#737373;margin-bottom:24px}
.crumb a{color:#525252;text-decoration:none}
.crumb .industry{color:#0a0a0a}
.tag{display:inline-block;padding:6px 12px;background:#ccfbf1;color:#0d9488;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:32px}
.headline{font-size:clamp(48px,6vw,88px);font-weight:700;letter-spacing:-.03em;line-height:1;margin:0;color:#0a0a0a}
.metric{color:#0d9488}
.lede{font-size:20px;line-height:1.55;color:#525252;max-width:56ch;margin:32px 0 0}
.meta{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;padding-top:32px;border-top:1px solid #e5e5e5}
.meta>div{display:flex;flex-direction:column;gap:4px}
.k{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#737373}
.v{font-size:16px;font-weight:600;color:#0a0a0a}
.cs-section{padding:80px 0;border-bottom:1px solid #e5e5e5}
.cs-section.alt{background:#fafaf9}
.cs-section.dark{background:#0a0a0a;color:#fff;border-bottom:none}
.cs-section .head{margin-bottom:48px}
.no{font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0d9488;display:block;margin-bottom:12px}
.cs-section.dark .no{color:rgba(45,212,191,.85)}
.cs-section h2{font-size:clamp(32px,3.5vw,44px);font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.1;max-width:24ch}
.body{display:grid;grid-template-columns:180px 1fr;gap:64px}
.label{font-size:13px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#737373}
.cs-section.dark .label{color:rgba(255,255,255,.5)}
.text{font-size:17px;line-height:1.7;color:#404040;max-width:64ch}
.cs-section.dark .text{color:rgba(255,255,255,.78)}
.big-metric{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:32px}
.big-metric .num{font-size:clamp(56px,7vw,96px);font-weight:700;letter-spacing:-.04em;line-height:.98;color:#2dd4bf}
.big-metric .unit{font-size:20px;font-weight:600;color:rgba(255,255,255,.78)}
@media(max-width:768px){.body{grid-template-columns:1fr;gap:24px}.meta{grid-template-columns:repeat(2,1fr)}}`

export const agencyCaseStudy: GeneratedTemplate = {
  name: 'Agency Case Study',
  type: 'case-study',
  description: 'Narrative case study with big metric hero and structured Challenge → Approach → Results sections.',
  html,
  css,
  previewUrl: '/case-studies/saas-cac-reduction',
}
