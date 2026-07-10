import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { Timeline } from './Timeline'

describe('Timeline', () => {
  it('3장 카드, 첫 카드가 최근(Platform AX), 섹션 id career', () => {
    const { container } = render(
      <MotionProvider>
        <Timeline />
      </MotionProvider>,
    )
    expect(container.querySelector('#career')).toBeTruthy()
    const cards = container.querySelectorAll('[data-stack-card]')
    expect(cards).toHaveLength(3)
    expect(cards[0].textContent).toContain('Platform AX')
    expect(cards[0].textContent).toContain('2026.03')
    expect(cards[2].textContent).toContain('굿리치')
  })
})
