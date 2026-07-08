import { useSectionReveal } from '@/motion/useSectionReveal'
import { profile } from '@/content/profile'

export function Capabilities() {
  const root = useSectionReveal<HTMLElement>()
  return (
    <section ref={root} id="capabilities" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <header className="mb-14 flex items-center gap-4" data-reveal>
        <span className="mono-label">CAPABILITIES — EVIDENCE BASED</span>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
      </header>
      <div className="grid gap-10 md:grid-cols-4">
        {profile.capabilities.map(cat => (
          <div key={cat.category} data-reveal>
            <h3 className="font-display text-lg font-medium text-mesh-accent">{cat.category}</h3>
            <ul className="mt-5 flex flex-col gap-2.5">
              {cat.chips.map(chip => (
                <li key={chip} className="text-sm text-mesh-copy">{chip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
