import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import { splitWords } from './splitWords'
import { useReducedMotion } from '@/providers/MotionProvider'

/** ref 대상 요소의 텍스트를 단어 마스크 리빌 (뷰포트 진입 시 1회) */
export function useSplitReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  useGSAP(() => {
    if (reduced || !ref.current) return
    splitWords(ref.current)
    const words = ref.current.querySelectorAll('.split-word')
    gsap.fromTo(
      words,
      { yPercent: 110, autoAlpha: 0, filter: 'blur(8px)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      },
    )
  }, [reduced])
  return ref
}
