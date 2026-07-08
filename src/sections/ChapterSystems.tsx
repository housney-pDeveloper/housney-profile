import { useSectionReveal } from '@/motion/useSectionReveal'
import { SectionLabel } from '@/ui/SectionLabel'
import { GlassCard } from '@/ui/GlassCard'
import { RadialDiagram } from '@/ui/RadialDiagram'
import { profile } from '@/content/profile'

export function ChapterSystems() {
  const root = useSectionReveal<HTMLElement>()
  return (
    <section ref={root} id="systems" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <SectionLabel chapter={profile.systems.chapter} title={profile.systems.title} era={profile.systems.era} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">{profile.systems.narrative}</p>
      <div data-reveal>
        <RadialDiagram />
        <p className="mono-label mt-4 text-center">{profile.systems.appsNote}</p>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {profile.systems.cards.map(card => (
          <div key={card.id} data-reveal>
            <GlassCard className="h-full">
              <h3 className="font-display text-lg font-medium text-mesh-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mesh-copy">{card.body}</p>
              {card.metric && <p className="mono-label mt-5 text-mesh-accent">{card.metric}</p>}
            </GlassCard>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-10 flex flex-wrap gap-2">
        {profile.systems.chips.map(chip => (
          <span key={chip} className="glass-border rounded-full px-3 py-1.5 text-xs text-mesh-copy">{chip}</span>
        ))}
      </div>
    </section>
  )
}
