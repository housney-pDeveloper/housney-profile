import { useCountUp } from '@/motion/useCountUp'
import type { HeroStat } from '@/content/profile'

export function StatCounter({ value, suffix, label, sub }: HeroStat) {
  const ref = useCountUp(value)
  return (
    <div className="flex flex-col gap-1.5" data-reveal>
      <div className="font-display text-[2.8rem] font-medium leading-none text-mesh-text md:text-[3.4rem]">
        <span ref={ref}>0</span>
        {suffix && <span className="text-mesh-accent">{suffix}</span>}
      </div>
      <div className="text-[1.3rem] text-mesh-copy">{label}</div>
      {sub && <div className="font-mono text-[1.02rem] uppercase tracking-[0.12em] text-mesh-muted">{sub}</div>}
    </div>
  )
}
