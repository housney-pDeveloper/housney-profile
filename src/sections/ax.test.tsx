import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { FieldAX } from './FieldAX'
import { profile } from '@/content/profile'

describe('FieldAX (FIELD 05)', () => {
  it('6개 카드와 내러티브 렌더, 균등 3열 그리드', () => {
    const { container } = render(
      <MotionProvider>
        <FieldAX />
      </MotionProvider>,
    )
    for (const c of profile.work.fields.ax.cards) {
      expect(screen.getByText(c.title)).toBeInTheDocument()
    }
    expect(container.textContent).toContain(profile.work.fields.ax.narrative)
    expect(container.querySelector('.md\\:col-span-2')).toBeNull()
    expect(container.querySelectorAll('.md\\:grid-cols-3 > [data-reveal]')).toHaveLength(6)
    expect(container.textContent).toContain(profile.work.fields.ax.closing)
    for (const chip of profile.work.fields.ax.chips) {
      expect(screen.getByText(chip)).toBeInTheDocument()
    }
  })
})
