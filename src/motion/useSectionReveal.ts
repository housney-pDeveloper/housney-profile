import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { useReducedMotion } from '@/providers/MotionProvider'

/** 컨테이너 내부 [data-reveal] 요소들을 fade-up + blur 리빌 (1회) */
export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  useGSAP(() => {
    if (reduced || !ref.current) return
    const items = ref.current.querySelectorAll('[data-reveal]')
    if (!items.length) return
    gsap.fromTo(
      items,
      { y: 36, autoAlpha: 0, filter: 'blur(8px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      },
    )
  }, [reduced])
  return ref
}
