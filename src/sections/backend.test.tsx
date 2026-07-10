import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { BackendChapter } from './BackendChapter'
import { profile } from '@/content/profile'

describe('BackendChapter (FIELD 01)', () => {
  it('필드 헤더·내러티브·3티어·도메인 서비스 렌더, 섹션 id backend', () => {
    const { container } = render(
      <MotionProvider>
        <BackendChapter />
      </MotionProvider>,
    )
    const f = profile.work.fields.backend
    expect(container.querySelector('#backend')).toBeTruthy()
    expect(screen.getByRole('heading', { name: f.title })).toBeInTheDocument()
    expect(container.textContent).toContain('아키텍처 자체를 설계합니다')
    expect(container.textContent).not.toContain('굿리치')
    // 요청/이벤트 플로우 펄스 마커 — 3티어 + 이벤트 버스
    expect(container.querySelectorAll('[data-flow-node]')).toHaveLength(3)
    expect(container.querySelector('[data-flow-bus]')).toBeTruthy()
    for (const t of f.tiers) {
      expect(screen.getByText(t.name)).toBeInTheDocument()
    }
    for (const s of f.services) {
      expect(screen.getByText(s.name)).toBeInTheDocument()
    }
  })
})
