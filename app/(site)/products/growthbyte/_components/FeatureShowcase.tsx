import FeatureShot from './FeatureShot'
import SectionCta from './SectionCta'
import { PRODUCT_FEATURES } from './product-features'

export default function FeatureShowcase() {
  return (
    <section id="features" className="dark">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">See it in the product</span>
          <h2>Real screens from GrowthByte.</h2>
          <p className="lead">No mockups — this is the product founding agencies get. Tap any screen to enlarge it.</p>
        </div>
        <div className="wl-feature-grid">
          {PRODUCT_FEATURES.map((feature) => (
            <div key={feature.key} className={feature.isWide ? 'mc wl-feature wl-feature-wide' : 'mc wl-feature'}>
              <FeatureShot feature={feature} />
              <span className="mc-badge">{feature.badge}</span>
              <div className="mc-name">{feature.name}</div>
              <p className="wl-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
        <SectionCta line="This is the product you get — before anyone else." isDark />
      </div>
    </section>
  )
}
