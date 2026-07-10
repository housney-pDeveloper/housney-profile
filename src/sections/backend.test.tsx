import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { FieldBackend } from './FieldBackend'
import { profile } from '@/content/profile'

describe('FieldBackend (FIELD 01)', () => {
  it('필드 헤더·내러티브·3티어·도메인 서비스 렌더, 섹션 id backend', () => {
    const { container } = render(
      <MotionProvider>
        <FieldBackend />
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
    // 칩 문자열 일부(예: 'Spring Cloud Gateway · WebFlux')는 아키텍처 티어 tech에도
    // 등장하므로 getAllByText로 최소 1회 렌더를 확인한다.
    for (const chip of f.chips) {
      expect(screen.getAllByText(chip).length).toBeGreaterThan(0)
    }
  })
})
