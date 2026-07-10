import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
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
    // 자동 글로우 펄스는 제거됨 — 마우스 오버 시 그림자가 뜨는 hover-elevate로 대체.
    // 다이어그램 박스 5개(3티어 + 이벤트 버스 + 파운데이션)가 hover-elevate를 갖는다.
    expect(container.querySelector('[data-flow-node]')).toBeNull()
    expect(container.querySelectorAll('.hover-elevate')).toHaveLength(5)
    expect(container.textContent).toContain(f.bus)
    for (const t of f.tiers) {
      expect(screen.getByText(t.name)).toBeInTheDocument()
    }
    for (const s of f.services) {
      expect(screen.getByText(s.name)).toBeInTheDocument()
    }
    // 칩 문자열 일부(예: 'Spring Cloud Gateway · WebFlux')는 아키텍처 티어 tech에도
    // 등장하므로, 칩 검증은 칩 행 안으로 스코프한다.
    const chipRow = container.querySelector('[data-chip-row]')
    expect(chipRow).toBeTruthy()
    for (const chip of f.chips) expect(within(chipRow as HTMLElement).getByText(chip)).toBeInTheDocument()
  })
})
