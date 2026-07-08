import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { RewindStrip } from './RewindStrip'
import { ChapterSystems } from './ChapterSystems'
import { profile } from '@/content/profile'

describe('RewindStrip (reduced)', () => {
  it('from ◄ to 정적 표기', () => {
    render(
      <MotionProvider>
        <RewindStrip {...profile.rewinds[0]} />
      </MotionProvider>,
    )
    expect(screen.getByText(/2026/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })
})

describe('ChapterSystems', () => {
  it('방사형 노드 16개(+중앙 1) 렌더, 담당 5개 accent 클래스', () => {
    const { container } = render(
      <MotionProvider>
        <ChapterSystems />
      </MotionProvider>,
    )
    const nodes = container.querySelectorAll('[data-app-node]')
    expect(nodes).toHaveLength(16)
    expect(container.querySelectorAll('[data-app-node].owned')).toHaveLength(5)
    expect(screen.getByText(profile.systems.framework.name)).toBeInTheDocument()
    for (const c of profile.systems.cards) expect(screen.getByText(c.title)).toBeInTheDocument()
  })
})
