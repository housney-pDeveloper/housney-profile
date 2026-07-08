export function SectionLabel({ chapter, title, era }: { chapter: string; title: string; era: string }) {
  return (
    <header className="mb-12 flex flex-col gap-3" data-reveal>
      <div className="flex items-center gap-4">
        <span className="h-1.5 w-1.5 bg-mesh-line-strong" aria-hidden="true" />
        <span className="mono-label">{chapter}</span>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
        <span className="mono-label text-mesh-accent">{era}</span>
      </div>
      <h2 className="font-display text-4xl font-medium tracking-tight text-mesh-text md:text-6xl">
        {title}
      </h2>
    </header>
  )
}
