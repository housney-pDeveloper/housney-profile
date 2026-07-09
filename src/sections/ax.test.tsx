import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { ChapterAX } from './ChapterAX'
import { profile } from '@/content/profile'

describe('ChapterAX', () => {
  it('6개 카드와 지표 스트립 렌더, 균등 3열 그리드(featured/2칸 span 없음)', () => {
    const { container } = render(
      <MotionProvider>
        <ChapterAX />
      </MotionProvider>,
    )
    for (const c of profile.ax.cards) {
      expect(screen.getByText(c.title)).toBeInTheDocument()
    }
    expect(screen.getByText(profile.ax.aiMetrics)).toBeInTheDocument()
    // 모든 카드 동일 너비 — 어떤 카드도 2칸을 차지하지 않는다
    expect(container.querySelector('.md\\:col-span-2')).toBeNull()
    expect(container.querySelectorAll('.md\\:grid-cols-3 > [data-reveal]')).toHaveLength(6)
  })
})
