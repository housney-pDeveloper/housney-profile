import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'

export function Rail() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState('')

  useGSAP(() => {
    if (reduced) return
    profile.rail.forEach(item => {
      const el = document.getElementById(item.id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: self => {
          if (self.isActive) setActive(item.id)
        },
      })
    })
  }, [reduced])

  if (reduced) return null
  return (
    <aside className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex" aria-hidden="true">
      <span className="h-16 w-px bg-mesh-line" />
      {profile.rail.map(item => (
        <div key={item.id} className={`flex flex-col items-center gap-1 transition-opacity ${active === item.id ? 'opacity-100' : 'opacity-35'}`}>
          <span className="font-mono text-xs font-bold text-mesh-accent">{item.num}</span>
          <span className="mono-label text-[0.58rem]">{item.label}</span>
        </div>
      ))}
      <span className="h-16 w-px bg-mesh-line" />
    </aside>
  )
}
