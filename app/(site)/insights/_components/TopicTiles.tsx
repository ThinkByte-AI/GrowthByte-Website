import { TOPIC_TILES } from './data'

const tileClass = (isPlaceholder: boolean) =>
  `rounded-lg px-3 py-2 ${
    isPlaceholder
      ? 'border border-dashed border-white/[0.08] flex items-center justify-center'
      : 'bg-white/[0.04] border border-white/[0.06]'
  }`

export default function TopicTiles() {
  return (
    <div className="hidden lg:flex justify-end">
      <div className="w-[300px]">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
          <p className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-semibold mb-4">Topics covered</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {TOPIC_TILES.map((cat, i) => (
              <div key={i} className={tileClass(i === TOPIC_TILES.length - 1)}>
                {i === TOPIC_TILES.length - 1 ? (
                  <span className="text-[0.625rem] text-white/20 font-medium">More soon</span>
                ) : (
                  <>
                    <p className="text-[0.6875rem] font-semibold text-white/70 leading-snug">{cat.name}</p>
                    {cat.count && <p className="text-[0.625rem] text-teal mt-0.5">{cat.count}</p>}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
            <span className="text-[0.6875rem] text-white/40">Written by senior practitioners</span>
          </div>
        </div>
      </div>
    </div>
  )
}
