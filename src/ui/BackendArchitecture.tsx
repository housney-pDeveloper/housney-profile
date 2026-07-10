import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'

type Tier = (typeof profile.backend.tiers)[number]

const GLOW = '0 0 0 1px rgba(0, 0, 0, 0.14), 0 14px 40px rgba(0, 0, 0, 0.12)'
const NO_GLOW = '0 0 0 0 rgba(0, 0, 0, 0)'

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div data-flow-node className="glass-border flex-1 rounded-2xl p-5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-lg font-medium text-mesh-text">{tier.name}</span>
        <span className="mono-label shrink-0 text-mesh-accent">{tier.note}</span>
      </div>
      <p className="mono-label mt-2 normal-case tracking-normal text-mesh-copy">{tier.tech}</p>
      <p className="mt-2 text-sm text-mesh-copy">{tier.role}</p>
    </div>
  )
}

/** 3-서버 경계(Gateway → Application ⇄ Worker) + 이벤트 버스 + 공통 파운데이션 흐름도 */
export function BackendArchitecture() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const b = profile.backend
  const [gateway, app, worker] = b.tiers

  // 요청/이벤트가 실제로 흐르는 듯한 글로우 펄스 — 뷰포트 안에서만 루프
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const nodes = root.current.querySelectorAll<HTMLElement>('[data-flow-node]')
      const arrows = root.current.querySelectorAll<HTMLElement>('[data-flow-arrow]')
      const bus = root.current.querySelector<HTMLElement>('[data-flow-bus]')
      if (nodes.length < 3 || !bus) return
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.6,
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play pause resume pause',
        },
      })
      const glow = (el: HTMLElement, at: number) => {
        tl.fromTo(el, { boxShadow: NO_GLOW }, { boxShadow: GLOW, duration: 0.35 }, at)
          .to(el, { boxShadow: NO_GLOW, duration: 0.6 }, at + 0.55)
      }
      const flash = (el: HTMLElement | undefined, at: number) => {
        if (!el) return
        tl.fromTo(el, { color: '#8a8a92' }, { color: '#0a0a0a', duration: 0.25 }, at)
          .to(el, { color: '#8a8a92', duration: 0.45 }, at + 0.35)
      }
      // 요청: Gateway → Application, 이벤트: Application → 버스 → Worker
      glow(nodes[0], 0)
      flash(arrows[0], 0.3)
      glow(nodes[1], 0.55)
      glow(bus, 1.05)
      flash(arrows[1], 1.05)
      glow(nodes[2], 1.5)
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <div ref={root} className="flex flex-col gap-4">
      <span className="mono-label">{b.archTitle}</span>

      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        <TierCard tier={gateway} />
        <span data-flow-arrow className="mono-label hidden shrink-0 text-mesh-muted lg:block" aria-hidden="true">→</span>
        <TierCard tier={app} />
        <span data-flow-arrow className="mono-label hidden shrink-0 text-mesh-muted lg:block" aria-hidden="true">⇄</span>
        <TierCard tier={worker} />
      </div>

      {/* Application ⇄ Worker 를 잇는 이벤트 버스 */}
      <div data-flow-bus className="rounded-full border border-mesh-line px-5 py-2 text-center">
        <span className="mono-label normal-case tracking-normal text-mesh-copy">{b.bus}</span>
      </div>

      {/* 전 계층 공통 파운데이션 */}
      <div className="glass-border rounded-2xl px-5 py-3 text-center">
        <span className="text-sm text-mesh-copy">{b.foundation}</span>
      </div>

      <p className="mono-label mt-1 text-mesh-muted">{b.archMetric}</p>
    </div>
  )
}
