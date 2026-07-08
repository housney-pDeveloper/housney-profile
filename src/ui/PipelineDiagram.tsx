import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile, type Lane, type PipelinePackage } from '@/content/profile'

export const LANE_COLOR: Record<Lane, string> = {
  conductor: '#e4e4e7',
  main: '#a1a1aa',
  hr: '#71717a',
  support: '#52525b',
}

function Node({ pkg }: { pkg: PipelinePackage }) {
  return (
    <div
      data-pipe-node
      data-lane={pkg.lane}
      className="glass-border rounded-2xl px-5 py-4 transition-all duration-500"
      style={{ borderLeft: `2px solid ${LANE_COLOR[pkg.lane]}` }}
      aria-label={`${pkg.name} — ${pkg.role} (${pkg.loc.toLocaleString('en-US')} LOC)`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span data-pipe-name className="font-medium text-mesh-text">{pkg.name}</span>
        <span className="mono-label shrink-0">{pkg.loc.toLocaleString('en-US')}</span>
      </div>
      <p className="mt-1 text-xs text-mesh-copy">{pkg.role}</p>
      {pkg.step && <span className="mono-label mt-2 inline-block text-mesh-accent">STEP {pkg.step}</span>}
    </div>
  )
}

export function PipelineDiagram() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const pkgs = profile.data.packages
  const conductor = pkgs.find(p => p.lane === 'conductor')!
  const mains = pkgs.filter(p => p.lane === 'main').sort((a, b) => a.step! - b.step!)
  const hrs = pkgs.filter(p => p.lane === 'hr')
  const supports = pkgs.filter(p => p.lane === 'support')

  useGSAP(
    () => {
      if (reduced || !root.current) return
      const spine = root.current.querySelector<HTMLElement>('[data-spine]')
      const nodes = root.current.querySelectorAll<HTMLElement>('[data-lane="main"] [data-pipe-node], [data-lane-col="out"]')
      if (!spine || !spine.offsetHeight) return
      gsap.set(spine, { scaleY: 0, transformOrigin: 'top' })
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: 1,
          onUpdate: self => {
            const p = self.progress
            if (pulseRef.current) pulseRef.current.style.top = `${p * 100}%`
            nodes.forEach((n, i) => {
              const threshold = (i + 0.5) / nodes.length
              n.classList.toggle('pipe-active', p >= threshold)
            })
          },
        },
      }).to(spine, { scaleY: 1, ease: 'none' })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <div ref={root} className="relative">
      {/* 지휘 노드 */}
      <div className="mx-auto max-w-xl" data-lane="conductor">
        <Node pkg={conductor} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,540px)_1fr]">
        {/* HR 선행 레인 */}
        <div className="flex flex-col gap-3 lg:pt-4" data-lane="hr">
          <span className="mono-label" style={{ color: LANE_COLOR.hr }}>{profile.data.laneLabels.hr}</span>
          {hrs.map(p => <Node key={p.id} pkg={p} />)}
        </div>

        {/* 본선 스파인 */}
        <div className="relative flex flex-col gap-4" data-lane="main">
          <span className="mono-label" style={{ color: LANE_COLOR.main }}>{profile.data.laneLabels.main}</span>
          {!reduced && (
            <div className="pointer-events-none absolute -left-4 top-8 bottom-8 w-px bg-mesh-line" aria-hidden="true">
              <div data-spine className="h-full w-full bg-mesh-accent" />
              <div ref={pulseRef} className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-mesh-accent shadow-[0_0_16px_rgba(255,255,255,0.85)]" />
            </div>
          )}
          {mains.map(p => <Node key={p.id} pkg={p} />)}
          <div data-lane-col="out" className="glass-border rounded-2xl border-mesh-accent px-5 py-4 text-center">
            <span className="font-medium text-mesh-accent">{profile.data.output}</span>
          </div>
        </div>

        {/* 지원 레인 */}
        <div className="flex flex-col gap-3 lg:pt-4" data-lane="support">
          <span className="mono-label" style={{ color: LANE_COLOR.support }}>{profile.data.laneLabels.support}</span>
          {supports.map(p => <Node key={p.id} pkg={p} />)}
        </div>
      </div>
    </div>
  )
}
