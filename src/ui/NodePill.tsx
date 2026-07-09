export function NodePill({ label, metric, href }: { label: string; metric?: string; href?: string }) {
  const inner = (
    <>
      <span className="h-2 w-2 rounded-full bg-mesh-accent shadow-[0_0_10px_rgba(0,0,0,0.25)]" aria-hidden="true" />
      <span className="text-md text-mesh-copy">{label}</span>
      {metric && <span className="font-mono text-[0.8rem] uppercase tracking-[0.1em] text-mesh-accent">{metric}</span>}
    </>
  )
  const cls = 'glass-border inline-flex items-center gap-3 rounded-full px-5 py-2.5 backdrop-blur-md'
  return href ? (
    <a href={href} className={`${cls} transition-colors hover:text-mesh-text`}>{inner}</a>
  ) : (
    <span className={cls}>{inner}</span>
  )
}
