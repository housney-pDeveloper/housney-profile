import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/motion/gsap'
import { setMeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'
import { useSectionReveal } from '@/motion/useSectionReveal'
import { useSplitReveal } from '@/motion/useSplitReveal'
import { SectionLabel } from '@/ui/SectionLabel'
import { GlassCard } from '@/ui/GlassCard'
import { profile } from '@/content/profile'

export function ChapterAX() {
  const reduced = useReducedMotion()
  const root = useSectionReveal<HTMLElement>()
  const openingRef = useSplitReveal<HTMLParagraphElement>()

  useGSAP(
    () => {
      if (reduced || !root.current) return
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setMeshMood({ intensity: 1.25, temperature: 1 }),
        onEnterBack: () => setMeshMood({ intensity: 1.25, temperature: 1 }),
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="ax" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <SectionLabel chapter={profile.ax.chapter} title={profile.ax.title} era={profile.ax.era} />
      <p ref={openingRef} className="mb-6 max-w-3xl font-display text-2xl text-mesh-copy md:text-3xl">
        {profile.ax.opening}
      </p>
      <div data-reveal className="mb-14 flex items-center gap-3">
        <span className="h-1 w-1 rounded-full bg-mesh-accent" aria-hidden="true" />
        <span className="mono-label text-mesh-copy">{profile.ax.proof}</span>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {profile.ax.cards.map(card => (
          <div key={card.id} data-reveal>
            <GlassCard className="h-full">
              <h3 className="font-display text-xl font-medium text-mesh-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mesh-copy">{card.body}</p>
              {card.metric && <p className="mono-label mt-5 text-mesh-accent">{card.metric}</p>}
            </GlassCard>
          </div>
        ))}
      </div>
      <p data-reveal className="mono-label mt-12 text-center text-mesh-muted">
        {profile.ax.aiMetrics}
      </p>
    </section>
  )
}
