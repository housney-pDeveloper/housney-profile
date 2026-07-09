import { useLayoutEffect, useRef } from 'react'
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

  // 프리로더 커튼이 걷히는 동안(booted 전) 히어로가 맨 텍스트로 보였다가 booted 진입
  // 타임라인이 처음부터 다시 숨겼다 올리며 "표시→깜빡 사라짐→재등장"하는 것을 막기 위해,
  // 마운트 시점에 (reduced가 아닐 때만) 미리 숨김 상태로 세팅해 둔다. 이후 booted 진입
  // 타임라인은 이미 숨겨진 상태에서 단 한 번만 리빌한다.
  // reduced에서는 절대 숨기지 않는다 — booted 게이트 없이 즉시 전체 노출이 하드 요구사항이며,
  // (드물게) 부팅 전에 reduced로 전환되는 경우를 대비해 이미 숨겨졌을 수 있는 상태도 되돌린다.
  useLayoutEffect(() => {
    if (!root.current) return
    if (reduced) {
      const hidden = root.current.querySelectorAll('.split-word, [data-hero-fade]')
      if (hidden.length) gsap.set(hidden, { clearProps: 'all' })
      return
    }
    if (booted) return // booted 진입 타임라인이 이미 리빌을 처리
    splitWords(nameRef.current!)
    splitWords(tagRef.current!)
    gsap.set(root.current.querySelectorAll('.split-word'), { yPercent: 110, autoAlpha: 0 })
    gsap.set(root.current.querySelectorAll('[data-hero-fade]'), { y: 24, autoAlpha: 0 })
  }, [reduced, booted])

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
        <p data-hero-fade className="mb-6 flex items-center gap-2 font-mono text-[1.08rem] uppercase tracking-[0.14em] text-mesh-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mesh-accent" aria-hidden="true" />
          {profile.hero.status}
        </p>
        <p data-hero-fade className="font-sans text-2xl font-medium tracking-wide text-mesh-copy md:text-3xl">
          {profile.hero.nameKo}
        </p>
        <h1 ref={nameRef} className="mt-1 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-mesh-text md:text-[7rem]">
          {profile.hero.name}
        </h1>
        <p ref={tagRef} className="mt-6 max-w-xl text-xl text-mesh-copy md:text-2xl">
          {profile.hero.tagline}
        </p>
        <p data-hero-fade className="mt-4 font-mono text-[1.05rem] uppercase tracking-[0.14em] text-mesh-muted">
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
