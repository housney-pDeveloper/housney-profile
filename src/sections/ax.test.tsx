import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { ChapterAX } from './ChapterAX'
import { profile } from '@/content/profile'

describe('ChapterAX', () => {
  it('6개 카드와 지표 스트립 렌더, 첫 카드는 2칸(featured)', () => {
    const { container } = render(
      <MotionProvider>
        <ChapterAX />
      </MotionProvider>,
    )
    for (const c of profile.ax.cards) {
      expect(screen.getByText(c.title)).toBeInTheDocument()
    }
    expect(screen.getByText(profile.ax.aiMetrics)).toBeInTheDocument()
    const featured = container.querySelector('.md\\:col-span-2')
    expect(featured?.textContent).toContain(profile.ax.cards[0].title)
  })
})
