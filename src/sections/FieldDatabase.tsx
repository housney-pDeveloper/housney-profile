import { useSectionReveal } from '@/motion/useSectionReveal'
import { useSplitReveal } from '@/motion/useSplitReveal'
import { useCountUp } from '@/motion/useCountUp'
import { useMeshMood } from '@/motion/useMeshMood'
import { MOOD_ARC } from '@/motion/moodArc'
import { FieldLabel } from '@/ui/FieldLabel'
import { ChipRow } from '@/ui/ChipRow'
import { PipelineDiagram } from '@/ui/PipelineDiagram'
import { LocBarChart } from '@/ui/LocBarChart'
import { Sentences } from '@/ui/Sentences'
import { profile } from '@/content/profile'

const f = profile.work.fields.database

function Totals() {
  const locRef = useCountUp(f.totals.loc)
  const tableRef = useCountUp(f.totals.tables)
  return (
    <p data-reveal className="mt-14 text-center font-display text-2xl text-mesh-text md:text-3xl">
      <span className="text-mesh-accent">{f.totals.packages}</span> packages ·{' '}
      <span ref={locRef} className="text-mesh-accent">0</span> LOC ·{' '}
      <span ref={tableRef} className="text-mesh-accent">0</span> tables
      <span className="ml-2 mono-label">(도메인의 {f.totals.tablesShare})</span>
    </p>
  )
}

export function FieldDatabase() {
  const root = useSectionReveal<HTMLElement>()
  const callbackRef = useSplitReveal<HTMLParagraphElement>()
  useMeshMood(root, MOOD_ARC.database)
  return (
    <section ref={root} id="database" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-32 md:px-10">
      <FieldLabel num={f.num} name={f.name} title={f.title} />
      <p data-reveal className="mb-6 max-w-3xl text-md text-mesh-copy">
        <Sentences text={f.narrative} />
      </p>
      <p ref={callbackRef} className="mb-16 font-display text-2xl text-mesh-text md:text-3xl">
        {f.callback}
      </p>
      <PipelineDiagram />
      <div data-reveal className="mt-20">
        <LocBarChart />
      </div>
      <Totals />
      <ChipRow chips={f.chips} />
    </section>
  )
}
