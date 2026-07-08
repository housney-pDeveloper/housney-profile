import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from '@/providers/MotionProvider'

/** [data-stack-card] sticky 카드가 다음 카드 도착 시 물러남 (cinematic 패턴) */
export function useStickyStack<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  useGSAP(() => {
    if (reduced || !ref.current) return
    const cards = gsap.utils.toArray<HTMLElement>(ref.current.querySelectorAll('[data-stack-card]'))
    cards.forEach((card, i) => {
      const next = cards[i + 1]
      if (!next) return
      gsap.to(card, {
        scale: 0.92 + i * 0.015,
        autoAlpha: 0.72,
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: next,
          start: 'top 78%',
          end: 'top 24%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })
  }, [reduced])
  return ref
}
