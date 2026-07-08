import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { setMeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'
import type { profile } from '@/content/profile'

type Rewind = (typeof profile.rewinds)[number]

export function RewindStrip({ from, to, mood }: Rewind) {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
          onUpdate: self => {
            const p = self.progress
            if (yearRef.current) {
              yearRef.current.textContent = String(Math.round(gsap.utils.interpolate(from, to, p)))
            }
            setMeshMood({
              intensity: gsap.utils.interpolate(mood.intensity[0], mood.intensity[1], p),
              temperature: gsap.utils.interpolate(mood.temperature[0], mood.temperature[1], p),
            })
          },
        },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  if (reduced) {
    return (
      <div className="py-10 text-center mono-label" aria-hidden="true">
        {from} ◄────── {to}
      </div>
    )
  }

  return (
    <div ref={root} className="flex h-[40vh] items-center justify-center" aria-hidden="true">
      <div className="flex items-center gap-6">
        <span className="mono-label">REWIND</span>
        <span ref={yearRef} className="font-mono text-5xl font-bold tracking-tight text-mesh-accent md:text-7xl">
          {from}
        </span>
        <span className="h-px w-24 bg-mesh-line-strong" />
      </div>
    </div>
  )
}
