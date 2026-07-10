import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { useSectionReveal } from '@/motion/useSectionReveal'
import { useMeshMood } from '@/motion/useMeshMood'
import { MOOD_ARC } from '@/motion/moodArc'
import { GLOW, NO_GLOW } from '@/motion/glowPulse'
import { FieldLabel } from '@/ui/FieldLabel'
import { ChipRow } from '@/ui/ChipRow'
import { GlassCard } from '@/ui/GlassCard'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

/** 03 · FIELD 04 — 엣지 라우팅 계층 + 운영 성과 카드 */
export function FieldInfra() {
  const reduced = useReducedMotion()
  const root = useSectionReveal<HTMLElement>()
  const f = profile.work.fields.infra
  useMeshMood(root, MOOD_ARC.infra)

  // 엣지 → 플레인으로 트래픽이 흐르는 글로우 펄스 (뷰포트 안에서만 루프)
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const edge = root.current.querySelector<HTMLElement>('[data-infra-edge]')
      const planes = root.current.querySelectorAll<HTMLElement>('[data-infra-plane]')
      if (!edge || !planes.length) return
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.8,
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play pause resume pause',
        },
      })
      tl.fromTo(edge, { boxShadow: NO_GLOW }, { boxShadow: GLOW, duration: 0.35 }, 0)
        .to(edge, { boxShadow: NO_GLOW, duration: 0.6 }, 0.55)
      planes.forEach((p, i) => {
        const at = 0.4 + i * 0.18
        tl.fromTo(p, { boxShadow: NO_GLOW }, { boxShadow: GLOW, duration: 0.3 }, at)
          .to(p, { boxShadow: NO_GLOW, duration: 0.55 }, at + 0.45)
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="infra" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <FieldLabel num={f.num} name={f.name} title={f.title} />
      <p data-reveal className="mb-14 max-w-2xl text-lg text-mesh-copy">
        <Sentences text={f.narrative} />
      </p>

      <div data-reveal className="flex flex-col gap-3">
        <div data-infra-edge className="glass-border rounded-2xl px-5 py-4 text-center">
          <span className="font-display font-medium text-mesh-text">{f.edge.name}</span>
          <p className="mono-label mt-1 normal-case tracking-normal text-mesh-copy">{f.edge.role}</p>
        </div>
        <span className="mono-label text-center text-mesh-muted" aria-hidden="true">
          ↓
        </span>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {f.planes.map(p => (
            <div key={p.name} data-infra-plane className="glass-border rounded-2xl px-4 py-3 text-center">
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
