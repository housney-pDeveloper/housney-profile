/** 필드 하단 기술 칩 행 */
export function ChipRow({ chips }: { chips: readonly string[] }) {
  return (
    <div data-reveal className="mt-12 flex flex-wrap gap-2">
      {chips.map(chip => (
        <span key={chip} className="glass-border rounded-full px-3 py-1.5 text-xs text-mesh-copy">
          {chip}
        </span>
      ))}
    </div>
  )
}
