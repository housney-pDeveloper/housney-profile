import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { ChapterSystems } from './ChapterSystems'
import { profile } from '@/content/profile'

describe('ChapterSystems (FIELD 03 Frontend)', () => {
  it('방사형 노드 16개(+중앙 1) 렌더, 담당 5개 accent 클래스, 섹션 id frontend', () => {
    const { container } = render(
      <MotionProvider>
        <ChapterSystems />
      </MotionProvider>,
    )
    expect(container.querySelector('#frontend')).toBeTruthy()
    const nodes = container.querySelectorAll('[data-app-node]')
    expect(nodes).toHaveLength(16)
    expect(container.querySelectorAll('[data-app-node].owned')).toHaveLength(5)
    expect(screen.getByText(profile.work.fields.frontend.framework.name)).toBeInTheDocument()
    for (const c of profile.work.fields.frontend.cards) expect(screen.getByText(c.title)).toBeInTheDocument()
  })
})
