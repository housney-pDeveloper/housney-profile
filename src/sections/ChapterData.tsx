import { useSectionReveal } from '@/motion/useSectionReveal'
import { useSplitReveal } from '@/motion/useSplitReveal'
import { useCountUp } from '@/motion/useCountUp'
import { SectionLabel } from '@/ui/SectionLabel'
import { PipelineDiagram } from '@/ui/PipelineDiagram'
import { LocBarChart } from '@/ui/LocBarChart'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

function Totals() {
  const locRef = useCountUp(profile.data.totals.loc)
  const tableRef = useCountUp(profile.data.totals.tables)
  return (
    <p data-reveal className="mt-14 text-center font-display text-2xl text-mesh-text md:text-3xl">
      <span className="text-mesh-accent">{profile.data.totals.packages}</span> packages ·{' '}
      <span ref={locRef} className="text-mesh-accent">0</span> LOC ·{' '}
      <span ref={tableRef} className="text-mesh-accent">0</span> tables
      <span className="ml-2 mono-label">(도메인의 {profile.data.totals.tablesShare})</span>
    </p>
  )
}

export function ChapterData() {
  const root = useSectionReveal<HTMLElement>()
  const callbackRef = useSplitReveal<HTMLParagraphElement>()
  return (
    <section ref={root} id="data" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <SectionLabel chapter={profile.data.chapter} title={profile.data.title} era={profile.data.era} />
      <p data-reveal className="mb-6 max-w-3xl text-md text-mesh-copy">
        <Sentences text={profile.data.narrative} />
      </p>
      <p ref={callbackRef} className="mb-16 font-display text-2xl text-mesh-text md:text-3xl">
        {profile.data.callback}
      </p>
      <PipelineDiagram />
      <div data-reveal className="mt-20">
        <LocBarChart />
      </div>
      <Totals />
    </section>
  )
}
