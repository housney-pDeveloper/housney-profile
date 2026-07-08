import { useStickyStack } from '@/motion/useStickyStack'
import { profile } from '@/content/profile'

export function Timeline() {
  const root = useStickyStack<HTMLElement>()
  return (
    <section ref={root} id="timeline" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-32 md:px-10">
      <header className="mb-14 flex items-center gap-4">
        <span className="mono-label">JOURNEY — FACTS</span>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
      </header>
      <div className="flex flex-col gap-8">
        {profile.timeline.map(item => (
          <article
            key={item.period}
            data-stack-card
            className="glass-border sticky top-[12vh] origin-top rounded-3xl p-8 will-change-transform md:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-medium text-mesh-text">{item.company}</h3>
              <span className="mono-label text-mesh-accent">{item.period}</span>
            </div>
            <p className="mono-label mt-1">{item.role}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {item.points.map(pt => (
                <li key={pt} className="flex gap-3 text-sm leading-relaxed text-mesh-copy">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mesh-accent" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.chips.map(chip => (
                <span key={chip} className="rounded-full border border-mesh-line px-2.5 py-1 text-xs text-mesh-muted">
                  {chip}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
