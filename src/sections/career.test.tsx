import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { CareerTimeline } from './CareerTimeline'
import { profile } from '@/content/profile'

describe('CareerTimeline (#career)', () => {
  it('3장 카드 겹침 없이 렌더(스티키 스택 아님), 최근 경력 먼저', () => {
    const { container } = render(
      <MotionProvider>
        <CareerTimeline />
      </MotionProvider>,
    )
    expect(container.querySelector('#career')).toBeTruthy()
    const cards = container.querySelectorAll('[data-career-card]')
    expect(cards).toHaveLength(3)
    expect(container.querySelector('[data-stack-card]')).toBeNull()
    expect(cards[0].textContent).toContain('Platform AX')
    expect(cards[2].textContent).toContain('굿리치')
    // 전 카드의 포인트·칩이 모두 보인다 (가림 없음 전제: sticky 클래스 미사용)
    for (const item of profile.career) {
      for (const pt of item.points) expect(container.textContent).toContain(pt)
    }
    // jsdom은 레이아웃 엔진이 없어서 sticky 이동은 DOM에 반영 안 되지만,
    // data-stack-card 마크만 제거하고 sticky를 다시 추가한 회귀는 감지 못 함.
    // 따라서 실제 class 속성에서 sticky/will-change-transform 부재를 명시 확인.
    cards.forEach(card => {
      const classList = card.getAttribute('class') || ''
      expect(classList).not.toMatch(/\bsticky\b/)
      expect(classList).not.toMatch(/\bwill-change-transform\b/)
    })
  })
})
