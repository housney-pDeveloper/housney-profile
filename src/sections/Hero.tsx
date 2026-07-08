import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { splitWords } from '@/motion/splitWords'
import { useReducedMotion } from '@/providers/MotionProvider'
import { StatCounter } from '@/ui/StatCounter'
import { NodePill } from '@/ui/NodePill'
import { profile } from '@/content/profile'

export function Hero({ booted }: { booted: boolean }) {
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (reduced || !booted || !root.current) return
      splitWords(nameRef.current!)
      splitWords(tagRef.current!)
      const words = root.current.querySelectorAll('.split-word')
      const rest = root.current.querySelectorAll('[data-hero-fade]')
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(
          words,
          { yPercent: 110, autoAlpha: 0, filter: 'blur(8px)' },
          { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.95, stagger: 0.05 },
        )
        .fromTo(rest, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 }, '-=0.5')
      // 스크롤 아웃 패럴랙스
      gsap.to(root.current.querySelector('[data-hero-inner]'), {
        yPercent: -14,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: root, dependencies: [reduced, booted] },
  )

  return (
    <section ref={root} id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div data-hero-inner className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10">
        <p data-hero-fade className="mono-label mb-6 flex items-center gap-2 text-mesh-copy">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mesh-accent" aria-hidden="true" />
          {profile.hero.status}
        </p>
        <h1 ref={nameRef} className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-mesh-text md:text-[9rem]">
          {profile.hero.name}
        </h1>
        <p ref={tagRef} className="mt-6 max-w-xl text-xl text-mesh-copy md:text-2xl">
          {profile.hero.tagline}
        </p>
        <p data-hero-fade className="mono-label mt-4 text-mesh-muted">
          {profile.hero.breadcrumb.join(' → ')}
        </p>

        <div data-hero-fade className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {profile.hero.stats.map(s => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>

        <div data-hero-fade className="mt-12 flex flex-wrap gap-3">
          {profile.hero.nodes.map(n => (
            <NodePill key={n.label} {...n} />
          ))}
        </div>

        <p data-hero-fade className="mono-label mt-16 text-mesh-muted">
          ⌄ {profile.hero.scrollCue}
        </p>
      </div>
    </section>
  )
}
