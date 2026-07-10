/** 03 WORK 서브챕터 공통 헤더 — FIELD 번호 · 분야명 · 타이틀 */
export function FieldLabel({ num, name, title }: { num: string; name: string; title: string }) {
  return (
    <header className="mb-12 flex flex-col gap-3" data-reveal>
      <div className="flex items-center gap-4">
        <span className="h-1.5 w-1.5 rotate-45 bg-mesh-line-strong" aria-hidden="true" />
        <span className="mono-label">FIELD {num}</span>
        <span className="h-px flex-1 bg-mesh-line" aria-hidden="true" />
        <span className="mono-label text-mesh-accent">{name}</span>
      </div>
      <h2 className="font-display text-4xl font-medium tracking-tight text-mesh-text md:text-6xl">
        {title}
      </h2>
    </header>
  )
}
