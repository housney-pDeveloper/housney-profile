import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'

/** 각 파트의 활성 범위 서술자 — 레일 순서대로, 시작/끝 앵커 셀렉터 */
export const RAIL_RANGES = [
  { id: 'about', startSel: '#top', endSel: '#about' },
  { id: 'career', startSel: '#career', endSel: '#career' },
  { id: 'work', startSel: '#work', endSel: '#ax' },
] as const satisfies readonly { id: string; startSel: string; endSel: string }[]

/** 좌측 고정 레일 — 01/02/03 진행 표시, 03(WORK) 활성 시 필드 도트 5개 */
export function Rail() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState('')
  const [activeField, setActiveField] = useState('')

  useGSAP(() => {
    if (reduced) return
    // 각 파트의 활성 범위: 시작 요소 top 55% ~ 끝 요소 bottom 45%
    RAIL_RANGES.forEach(r => {
      const startEl = document.querySelector(r.startSel)
      const endEl = document.querySelector(r.endSel)
      if (!startEl || !endEl) return
      ScrollTrigger.create({
        trigger: startEl,
        start: 'top 55%',
        endTrigger: endEl,
        end: 'bottom 45%',
        onToggle: self => {
          setActive(prev => (self.isActive ? r.id : prev === r.id ? '' : prev))
        },
      })
    })
    profile.work.fieldOrder.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: self => {
          setActiveField(prev => (self.isActive ? id : prev === id ? '' : prev))
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
          {item.id === 'work' && active === 'work' && (
            <span className="mt-1 flex flex-col items-center gap-1.5">
              {profile.work.fieldOrder.map(id => (
                <i
                  key={id}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${activeField === id ? 'bg-mesh-accent' : 'bg-mesh-line-strong'}`}
                />
              ))}
            </span>
          )}
        </div>
      ))}
      <span className="h-16 w-px bg-mesh-line" />
    </aside>
  )
}
