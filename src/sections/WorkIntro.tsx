import { useLenis } from '@/providers/LenisProvider'
import { useSectionReveal } from '@/motion/useSectionReveal'
import { SectionLabel } from '@/ui/SectionLabel'
import { profile } from '@/content/profile'

/** 03 WORK 도입 — 분야 인덱스 (클릭 시 해당 필드로 스크롤) */
export function WorkIntro() {
  const root = useSectionReveal<HTMLElement>()
  const lenis = useLenis()
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = `#${id}`
    if (lenis) lenis.scrollTo(target, { offset: -80 })
    else document.querySelector(target)?.scrollIntoView()
  }
  return (
    <section ref={root} id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-8 pt-32 md:px-10">
      <SectionLabel chapter={profile.work.intro.chapter} title={profile.work.intro.title} era={profile.work.intro.era} />
      <p data-reveal className="max-w-2xl text-lg text-mesh-copy">{profile.work.intro.narrative}</p>
      <div data-reveal className="mt-10 flex flex-wrap gap-3">
        {profile.work.fieldOrder.map(id => {
          const f = profile.work.fields[id]
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => go(e, id)}
              className="glass-border flex items-baseline gap-2 rounded-full px-4 py-2 text-sm text-mesh-copy transition-colors hover:text-mesh-text"
            >
              <span className="mono-label text-mesh-accent">{f.num}</span>
              {f.name}
            </a>
          )
        })}
      </div>
    </section>
  )
}
