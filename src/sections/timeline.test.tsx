import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { Timeline } from './Timeline'
import { Capabilities } from './Capabilities'
import { profile } from '@/content/profile'

describe('Timeline', () => {
  it('3장 카드, 첫 카드가 최근(Platform AX)', () => {
    const { container } = render(
      <MotionProvider>
        <Timeline />
      </MotionProvider>,
    )
    const cards = container.querySelectorAll('[data-stack-card]')
    expect(cards).toHaveLength(3)
    expect(cards[0].textContent).toContain('Platform AX')
    expect(cards[0].textContent).toContain('2026.03')
    expect(cards[2].textContent).toContain('굿리치')
  })
})

describe('Capabilities', () => {
  it('4개 카테고리(AI Engineering 첫 번째) + 전체 칩', () => {
    render(
      <MotionProvider>
        <Capabilities />
      </MotionProvider>,
    )
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings[0]).toHaveTextContent('AI Engineering')
    expect(headings).toHaveLength(4)
    for (const cat of profile.capabilities)
      for (const chip of cat.chips) expect(screen.getByText(chip)).toBeInTheDocument()
  })
})
