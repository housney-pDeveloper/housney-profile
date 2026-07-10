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
  const f = profile.work.fields.backend

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
      <SectionLabel chapter={`FIELD ${f.num}`} title={f.title} era={f.name} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">
        <Sentences text={f.narrative} />
      </p>

      <div data-reveal>
        <BackendArchitecture />
      </div>

      <div data-reveal className="mt-20">
        <span className="mono-label">{f.servicesNote}</span>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {f.services.map(s => (
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
