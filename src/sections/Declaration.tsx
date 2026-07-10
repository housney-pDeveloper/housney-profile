import { useSectionReveal } from '@/motion/useSectionReveal'
import { useSplitReveal } from '@/motion/useSplitReveal'
import { profile } from '@/content/profile'

/** 01 ABOUT 마무리 — 정체성 선언 + AI 협업 지표 */
export function Declaration() {
  const root = useSectionReveal<HTMLElement>()
  const stmtRef = useSplitReveal<HTMLParagraphElement>()
  return (
    <section ref={root} id="about" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-32 text-center md:px-10">
      <p ref={stmtRef} className="font-display text-2xl text-mesh-text md:text-4xl">
        {profile.declaration.statement}
      </p>
      <p data-reveal className="mono-label mt-8 text-mesh-muted">
        {profile.declaration.metrics}
      </p>
    </section>
  )
}
