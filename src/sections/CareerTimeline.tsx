import { useRef } from 'react'
import { useReducedMotion } from '@/providers/MotionProvider'
import { useSectionReveal } from '@/motion/useSectionReveal'
import { useMeshMood } from '@/motion/useMeshMood'
import { useScrubSpine } from '@/motion/useScrubSpine'
import { MOOD_ARC } from '@/motion/moodArc'
import { profile } from '@/content/profile'

/** 02 CAREER — 세로 스파인 + 스크럽 진행 펄스, 겹침 없는 경력 카드 3장 */
export function CareerTimeline() {
  const reduced = useReducedMotion()
  const root = useSectionReveal<HTMLElement>()
  const pulseRef = useRef<HTMLDivElement>(null)
  useMeshMood(root, MOOD_ARC.career)
  useScrubSpine(root, { spineSelector: '[data-career-spine]', pulseRef })

  return (
    <section ref={root} id="career" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-32 md:px-10">
      <header className="mb-14 flex items-center gap-4" data-reveal>
        <h2 className="mono-label">02 · CAREER</h2>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
      </header>
      <div className="relative">
        {!reduced && (
          <div className="pointer-events-none absolute -left-1 top-2 bottom-2 hidden w-px bg-mesh-line md:block" aria-hidden="true">
            <div data-career-spine className="h-full w-full bg-mesh-accent" />
            <div ref={pulseRef} className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-mesh-accent shadow-[0_0_16px_rgba(0,0,0,0.35)]" />
          </div>
        )}
        <div className="flex flex-col gap-8 md:pl-10">
          {profile.career.map(item => (
            <article key={item.period} data-career-card data-reveal className="glass-border rounded-3xl p-8 md:p-10">
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
      </div>
    </section>
  )
}
