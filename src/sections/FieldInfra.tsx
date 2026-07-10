import { useSectionReveal } from '@/motion/useSectionReveal'
import { useMeshMood } from '@/motion/useMeshMood'
import { MOOD_ARC } from '@/motion/moodArc'
import { FieldLabel } from '@/ui/FieldLabel'
import { ChipRow } from '@/ui/ChipRow'
import { GlassCard } from '@/ui/GlassCard'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

/** 03 · FIELD 04 — 엣지 라우팅 계층 + 운영 성과 카드.
    엣지·플레인 박스는 마우스 오버 시 그림자가 떠오른다(.hover-elevate). */
export function FieldInfra() {
  const root = useSectionReveal<HTMLElement>()
  const f = profile.work.fields.infra
  useMeshMood(root, MOOD_ARC.infra)

  return (
    <section ref={root} id="infra" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <FieldLabel num={f.num} name={f.name} title={f.title} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">
        <Sentences text={f.narrative} />
      </p>

      <div data-reveal className="flex flex-col gap-3">
        <div data-infra-edge className="hover-elevate glass-border rounded-2xl px-5 py-4 text-center">
          <span className="font-display font-medium text-mesh-text">{f.edge.name}</span>
          <p className="mono-label mt-1 normal-case tracking-normal text-mesh-copy">{f.edge.role}</p>
        </div>
        <span className="mono-label text-center text-mesh-muted" aria-hidden="true">
          ↓
        </span>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {f.planes.map(p => (
            <div key={p.name} data-infra-plane className="hover-elevate glass-border rounded-2xl px-4 py-3 text-center">
              <div className="font-medium text-mesh-text">{p.name}</div>
              <div className="mono-label mt-0.5">{p.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
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

      <ChipRow chips={f.chips} />
    </section>
  )
}
