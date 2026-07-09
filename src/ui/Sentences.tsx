/**
 * 문장 단위 줄바꿈 — 각 문장을 블록으로 렌더해 자체 줄에서 시작하게 한다.
 * 문장이 한 줄에 안 들어가면 전역 `word-break: keep-all`에 따라 어절(단어) 단위로 감긴다.
 * ("기본은 문장 단위, 안 되면 단어 단위")
 *
 * 마침표/물음표/느낌표 **뒤에 공백이 올 때만** 분리하므로,
 * 소수점(2021.02)이나 약어 안의 점은 나뉘지 않는다.
 */
export function Sentences({ text }: { text: string }) {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean)
  return (
    <>
      {parts.map((s, i) => (
        <span key={i} className="block">
          {s}
        </span>
      ))}
    </>
  )
}
