import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { FieldInfra } from './FieldInfra'
import { profile } from '@/content/profile'

describe('FieldInfra (FIELD 04)', () => {
  it('엣지·플레인 4개·카드 4장·칩 렌더, 섹션 id infra', () => {
    const { container } = render(
      <MotionProvider>
        <FieldInfra />
      </MotionProvider>,
    )
    const f = profile.work.fields.infra
    expect(container.querySelector('#infra')).toBeTruthy()
    expect(container.querySelector('[data-infra-edge]')).toBeTruthy()
    expect(container.querySelectorAll('[data-infra-plane]')).toHaveLength(4)
    // 자동 글로우 펄스는 제거됨 — 엣지 1 + 플레인 4가 마우스 오버 그림자(hover-elevate)를 갖는다.
    expect(container.querySelectorAll('.hover-elevate')).toHaveLength(5)
    expect(screen.getByText(f.edge.name)).toBeInTheDocument()
    for (const c of f.cards) expect(screen.getByText(c.title)).toBeInTheDocument()
    // 'GitLab CI'는 카드 metric·칩 양쪽에 렌더되므로, 칩 검증은 칩 행 안으로 스코프한다.
    const chipRow = container.querySelector('[data-chip-row]')
    expect(chipRow).toBeTruthy()
    for (const chip of f.chips) expect(within(chipRow as HTMLElement).getByText(chip)).toBeInTheDocument()
  })
})
