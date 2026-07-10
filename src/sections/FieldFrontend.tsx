import { useSectionReveal } from '@/motion/useSectionReveal'
import { FieldLabel } from '@/ui/FieldLabel'
import { ChipRow } from '@/ui/ChipRow'
import { GlassCard } from '@/ui/GlassCard'
import { RadialDiagram } from '@/ui/RadialDiagram'
import { profile } from '@/content/profile'

export function FieldFrontend() {
  const root = useSectionReveal<HTMLElement>()
  const f = profile.work.fields.frontend
  return (
    <section ref={root} id="frontend" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <FieldLabel num={f.num} name={f.name} title={f.title} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">{f.narrative}</p>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {f.cards.map(card => (
          <div key={card.id} data-reveal>
            <GlassCard className="h-full">
              <h3 className="font-display text-lg font-medium text-mesh-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mesh-copy">{card.body}</p>
              {card.metric && <p className="mono-label mt-5 text-mesh-accent">{card.metric}</p>}
            </GlassCard>
          </div>
        ))}
      </div>
      <div data-reveal>
        <RadialDiagram />
        <p className="mono-label mt-4 text-center">{f.appsNote}</p>
      </div>
      <ChipRow chips={f.chips} />
    </section>
  )
}
