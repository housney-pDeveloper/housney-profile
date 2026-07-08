import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      setDone(true)
      onComplete()
    }
    if (reduced) {
      finish()
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish })
    tl.fromTo(barRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.1 })
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.15')
    const guard = setTimeout(finish, 4000) // 타임아웃 가드
    return () => {
      clearTimeout(guard)
      tl.kill()
    }
  }, [reduced, onComplete])

  if (done) return null
  return (
    <div ref={rootRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-mesh-bg" aria-hidden="true">
      <span className="font-mono text-2xl font-bold text-mesh-accent">HS</span>
      <div className="h-px w-40 bg-mesh-line">
        <div ref={barRef} className="h-full w-full bg-mesh-accent" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
