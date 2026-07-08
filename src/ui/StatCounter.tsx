import { useCountUp } from '@/motion/useCountUp'
import type { HeroStat } from '@/content/profile'

export function StatCounter({ value, suffix, label, sub }: HeroStat) {
  const ref = useCountUp(value)
  return (
    <div className="flex flex-col gap-1" data-reveal>
      <div className="font-display text-3xl font-medium text-mesh-text md:text-4xl">
        <span ref={ref}>0</span>
        {suffix && <span className="text-mesh-accent">{suffix}</span>}
      </div>
      <div className="text-sm text-mesh-copy">{label}</div>
      {sub && <div className="mono-label normal-case tracking-normal">{sub}</div>}
    </div>
  )
}
