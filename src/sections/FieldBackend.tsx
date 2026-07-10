import { useSectionReveal } from '@/motion/useSectionReveal'
import { useMeshMood } from '@/motion/useMeshMood'
import { MOOD_ARC } from '@/motion/moodArc'
import { FieldLabel } from '@/ui/FieldLabel'
import { ChipRow } from '@/ui/ChipRow'
import { GlassCard } from '@/ui/GlassCard'
import { BackendArchitecture } from '@/ui/BackendArchitecture'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

export function FieldBackend() {
  const root = useSectionReveal<HTMLElement>()
  const f = profile.work.fields.backend
  useMeshMood(root, MOOD_ARC.backend)

  return (
    <section ref={root} id="backend" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <FieldLabel num={f.num} name={f.name} title={f.title} />
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

      <ChipRow chips={f.chips} />
    </section>
  )
}
