import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from '@/providers/MotionProvider'

export function formatStat(n: number): string {
  return n.toLocaleString('en-US')
}

/** span에 0→target 카운트업. reduced면 즉시 최종값. */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.textContent = formatStat(target)
      return
    }
    const obj = { v: 0 }
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = formatStat(Math.round(obj.v))
      },
    })
  }, [reduced, target])
  return ref
}
