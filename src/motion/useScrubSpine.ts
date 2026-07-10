import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from '@/providers/MotionProvider'

/**
 * 세로 스파인 스크럽 애니메이션 — 스크롤 진행에 맞춰 스파인을 top→bottom으로 채우고,
 * 진행률(0~1)을 펄스 요소의 style.top(%)에 기록한다. onProgress로 추가 동작(예: 레인
 * 노드 활성화 토글)을 주입할 수 있다. reduced-motion에서는 아무것도 하지 않는다.
 */
export function useScrubSpine<T extends HTMLElement>(
  root: RefObject<T | null>,
  opts: { spineSelector: string; pulseRef: RefObject<HTMLElement | null>; onProgress?: (p: number) => void },
): void {
  const reduced = useReducedMotion()
  const { spineSelector, pulseRef, onProgress } = opts
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const spine = root.current.querySelector<HTMLElement>(spineSelector)
      if (!spine || !spine.offsetHeight) return
      gsap.set(spine, { scaleY: 0, transformOrigin: 'top' })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 1,
            onUpdate: self => {
              const p = self.progress
              if (pulseRef.current) pulseRef.current.style.top = `${p * 100}%`
              onProgress?.(p)
            },
          },
        })
        .to(spine, { scaleY: 1, ease: 'none' })
    },
    { scope: root, dependencies: [reduced] },
  )
}
