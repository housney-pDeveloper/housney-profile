import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'
import App from '@/App'
import { Rail, RAIL_RANGES } from './Rail'

describe('Rail', () => {
  // reduced-motion 계약: 테스트 환경은 reduced를 강제하므로 Rail은 마크업을
  // 만들지 않는다. 문서화된 이 동작을 고정한다.
  it('reduced-motion에서는 아무 DOM도 렌더하지 않는다', () => {
    const { container } = render(
      <MotionProvider>
        <Rail />
      </MotionProvider>,
    )
    expect(container.firstChild).toBeNull()
  })

  // 앵커 무결성: RAIL_RANGES가 참조하는 모든 셀렉터와 fieldOrder의 모든 id가
  // App이 실제로 렌더하는 섹션 id로 해석되어야 한다. 누군가 섹션 id를 바꾸면
  // 레일의 스크롤 스파이가 시각적 오류도 크래시도 없이 조용히 멈추는데, 이
  // 테스트가 그 무성한 실패를 잡아낸다.
  it('RAIL_RANGES와 fieldOrder가 참조하는 앵커 id가 모두 실제로 존재한다', () => {
    const { container } = render(<App />)
    const ids = new Set([...container.querySelectorAll('[id]')].map(el => el.id))

    for (const range of RAIL_RANGES) {
      for (const sel of [range.startSel, range.endSel]) {
        const id = sel.replace(/^#/, '')
        expect(
          ids.has(id),
          `RAIL_RANGES["${range.id}"] references missing anchor id "${id}" (selector "${sel}")`,
        ).toBe(true)
      }
    }

    for (const field of profile.work.fieldOrder) {
      expect(
        ids.has(field),
        `profile.work.fieldOrder references missing section id "${field}"`,
      ).toBe(true)
    }
  })
})
