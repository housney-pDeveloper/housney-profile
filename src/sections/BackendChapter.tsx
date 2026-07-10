import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/motion/gsap'
import { setMeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'
import { useSectionReveal } from '@/motion/useSectionReveal'
import { SectionLabel } from '@/ui/SectionLabel'
import { GlassCard } from '@/ui/GlassCard'
import { BackendArchitecture } from '@/ui/BackendArchitecture'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

export function BackendChapter() {
  const reduced = useReducedMotion()
  const root = useSectionReveal<HTMLElement>()
  const b = profile.backend

  useGSAP(
    () => {
      if (reduced || !root.current) return
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setMeshMood({ intensity: 0.85, temperature: 0.32 }),
        onEnterBack: () => setMeshMood({ intensity: 0.85, temperature: 0.32 }),
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="backend" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <div data-reveal aria-hidden="true" className="mb-16 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-mesh-line" />
        <span className="h-1.5 w-1.5 rotate-45 bg-mesh-line-strong" />
        <span className="h-px w-16 bg-mesh-line" />
      </div>
      <SectionLabel chapter={b.chapter} title={b.title} era={b.era} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">
        <Sentences text={b.narrative} />
      </p>

      <div data-reveal>
        <BackendArchitecture />
      </div>

      <div data-reveal className="mt-20">
        <span className="mono-label">{b.servicesNote}</span>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {b.services.map(s => (
            <GlassCard key={s.name} className="h-full">
              <div className="font-display text-3xl font-medium text-mesh-text">{s.files.toLocaleString('en-US')}</div>
              <div className="mono-label mt-0.5 text-mesh-muted">files</div>
              <h3 className="mt-4 font-medium text-mesh-text">{s.name}</h3>
              <p className="mt-1 text-xs text-mesh-copy">{s.detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
