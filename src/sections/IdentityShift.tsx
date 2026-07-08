import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { splitWords } from '@/motion/splitWords'
import { setMeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'

export function IdentityShift() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const beforeRef = useRef<HTMLParagraphElement>(null)
  const afterRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [y0, y1] = profile.identity.years

  useGSAP(
    () => {
      if (reduced || !root.current) return
      splitWords(afterRef.current!)
      const afterWords = afterRef.current!.querySelectorAll('.split-word')
      const accentWords: readonly string[] = profile.identity.accentWords
      afterWords.forEach(w => {
        if (accentWords.includes(w.textContent ?? '')) {
          ;(w as HTMLElement).style.color = 'var(--color-mesh-accent)'
        }
      })
      gsap.set(afterRef.current, { autoAlpha: 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: self => setMeshMood({ temperature: self.progress }),
        },
      })
      tl.fromTo(beforeRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.05)
        .to(beforeRef.current, { autoAlpha: 0, y: -60, filter: 'blur(8px)', duration: 0.18 }, 0.4)
        .fromTo(afterWords, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.02, duration: 0.3 }, 0.55)
        .fromTo(barRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1 }, 0)
    },
    { scope: root, dependencies: [reduced] },
  )

  if (reduced) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="text-2xl text-mesh-copy">{profile.identity.before}</p>
        <p className="mt-6 font-display text-3xl text-mesh-text md:text-5xl">{profile.identity.after}</p>
        <p className="mono-label mt-10">
          <span>{y0}</span> ───── <span>{y1}</span>
        </p>
      </section>
    )
  }

  return (
    <section ref={root} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <p ref={beforeRef} className="max-w-3xl text-2xl text-mesh-copy opacity-0 md:text-4xl">
          {profile.identity.before}
        </p>
        <p ref={afterRef} className="mt-8 max-w-4xl font-display text-3xl font-medium text-mesh-text opacity-0 md:text-6xl">
          {profile.identity.after}
        </p>
        <div className="absolute bottom-16 flex w-64 items-center gap-3">
          <span className="mono-label">{y0}</span>
          <div className="h-px flex-1 bg-mesh-line">
            <div ref={barRef} className="h-full bg-mesh-accent" style={{ transform: 'scaleX(0)' }} />
          </div>
          <span className="mono-label">{y1}</span>
        </div>
      </div>
    </section>
  )
}
