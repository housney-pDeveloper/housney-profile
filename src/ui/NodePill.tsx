export function NodePill({ label, metric, href }: { label: string; metric?: string; href?: string }) {
  const inner = (
    <>
      <span className="h-1.5 w-1.5 rounded-full bg-mesh-accent shadow-[0_0_18px_rgba(147,197,253,0.72)]" aria-hidden="true" />
      <span className="text-xs text-mesh-copy">{label}</span>
      {metric && <span className="mono-label text-[0.62rem] text-mesh-accent">{metric}</span>}
    </>
  )
  const cls = 'glass-border inline-flex items-center gap-2 rounded-full px-3.5 py-2 backdrop-blur-md'
  return href ? (
    <a href={href} className={`${cls} transition-colors hover:text-mesh-text`}>{inner}</a>
  ) : (
    <span className={cls}>{inner}</span>
  )
}
