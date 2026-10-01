interface DemoClip {
  title: string
  caption: string
  videoSrc?: string
}

// Real product recordings only: a clip stays text-only until its feature works on staging.
const DEMO_CLIPS: DemoClip[] = [
  { title: 'An SEO audit that runs itself', caption: 'Audit → findings → action items, end to end.' },
  { title: 'Client dashboards, live', caption: 'Your clients see progress as the work happens.' },
  { title: 'Strategy → tasks', caption: 'The chat console turns a strategy into action items.' },
  { title: 'It never forgets', caption: 'Memory keeps every client preference across runs.' },
]

const LoopingClip = ({ src, label }: { src: string; label: string }) => (
  <video className="wl-clip" src={src} muted autoPlay loop playsInline preload="none" aria-label={label} />
)

export default function DemoShowcase() {
  return (
    <section id="demo" className="dark">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">What it runs</span>
          <h2>The work your team does every week. Done by AI.</h2>
          <p className="lead">Your team decides what matters for each client. GrowthByte does the work.</p>
        </div>
        <div className="model-cols">
          {DEMO_CLIPS.map((clip) => (
            <div key={clip.title} className="mc">
              {clip.videoSrc && <LoopingClip src={clip.videoSrc} label={clip.title} />}
              <div className="mc-name">{clip.title}</div>
              <div className="mc-sub">{clip.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
