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
  })
})
