import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile, type Lane } from '@/content/profile'
import { LANE_COLOR } from './PipelineDiagram'

export function LocBarChart() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const sorted = [...profile.data.packages].sort((a, b) => b.loc - a.loc)
  const max = sorted[0].loc
  const lanes = Object.entries(profile.data.laneLabels) as [Lane, string][]

  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.fromTo(
        root.current.querySelectorAll('[data-bar-fill]'),
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        },
      )
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <div ref={root}>
      <div className="mb-5 flex flex-wrap gap-3">
        {lanes.map(([lane, label]) => (
          <span key={lane} data-legend-chip className="mono-label inline-flex items-center gap-1.5">
            <i className="h-2 w-2 rounded-full" style={{ background: LANE_COLOR[lane] }} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {sorted.map(p => (
          <div key={p.id} data-bar-row className="grid grid-cols-[minmax(0,190px)_1fr_64px] items-center gap-3"
            role="img" aria-label={`${p.name} ${p.loc.toLocaleString('en-US')} LOC`}>
            <span className="flex items-center gap-2 truncate text-xs text-mesh-copy">
              <i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: LANE_COLOR[p.lane] }} aria-hidden="true" />
              {p.name}
            </span>
            <div className="h-2 rounded-full bg-black/10">
              <div data-bar-fill className="h-full rounded-full"
                style={{ width: `${(p.loc / max) * 100}%`, background: LANE_COLOR[p.lane] }} />
            </div>
            <span className="mono-label text-right normal-case">{p.loc.toLocaleString('en-US')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
