import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { PipelineDiagram } from './PipelineDiagram'
import { LocBarChart } from './LocBarChart'
import { profile } from '@/content/profile'

const wrap = (ui: React.ReactNode) => render(<MotionProvider>{ui}</MotionProvider>)

describe('PipelineDiagram', () => {
  it('14개 노드 전부 + 출력 노드 렌더, 본선은 step 순서', () => {
    const { container } = wrap(<PipelineDiagram />)
    expect(container.querySelectorAll('[data-pipe-node]')).toHaveLength(14)
    expect(screen.getByText(profile.work.fields.database.output)).toBeInTheDocument()
    const mains = [...container.querySelectorAll('[data-lane="main"] [data-pipe-name]')].map(n => n.textContent)
    expect(mains[0]).toBe('리스크 계약 판별')
    expect(mains[6]).toBe('마감 검증')
  })
})

describe('LocBarChart', () => {
  it('14행 내림차순 + 수치 라벨 + 범례 4칩', () => {
    const { container } = wrap(<LocBarChart />)
    const rows = container.querySelectorAll('[data-bar-row]')
    expect(rows).toHaveLength(14)
    expect(rows[0].textContent).toContain('성과급 산출 엔진')
    expect(rows[0].textContent).toContain('7,579')
    expect(rows[13].textContent).toContain('조직 수수료유형')
    expect(container.querySelectorAll('[data-legend-chip]')).toHaveLength(4)
  })
})
