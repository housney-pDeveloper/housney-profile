import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { SectionLabel } from './SectionLabel'
import { StatCounter } from './StatCounter'
import { NodePill } from './NodePill'
import { EmailCta } from './EmailCta'
import { FieldLabel } from './FieldLabel'
import { ChipRow } from './ChipRow'

const wrap = (ui: React.ReactNode) => render(<MotionProvider>{ui}</MotionProvider>)

describe('ui primitives', () => {
  it('SectionLabel — 챕터·타이틀·연대 렌더', () => {
    wrap(<SectionLabel chapter="CHAPTER 01" title="AX. NOW." era="2026 —" />)
    expect(screen.getByText('CHAPTER 01')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'AX. NOW.' })).toBeInTheDocument()
    expect(screen.getByText('2026 —')).toBeInTheDocument()
  })

  it('StatCounter — reduced에서 즉시 최종값 + 접미', () => {
    wrap(<StatCounter value={300} suffix="+" label="AI 플러그인 자산" />)
    expect(screen.getByText('300')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('AI 플러그인 자산')).toBeInTheDocument()
  })

  it('NodePill — 라벨·메트릭·앵커', () => {
    wrap(<NodePill label="CI AI Review Gate" metric="MR auto-review" href="#ax" />)
    const link = screen.getByRole('link', { name: /CI AI Review Gate/ })
    expect(link).toHaveAttribute('href', '#ax')
  })

  it('EmailCta — 클릭 시 클립보드 복사', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    wrap(<EmailCta email="hyeonsu1013@naver.com" />)
    fireEvent.click(screen.getByRole('link', { name: /hyeonsu1013@naver.com/ }))
    expect(writeText).toHaveBeenCalledWith('hyeonsu1013@naver.com')
    expect(await screen.findByText('클립보드에 복사됨')).toBeInTheDocument()
  })

  it('FieldLabel — FIELD 번호·분야명·타이틀 렌더', () => {
    wrap(<FieldLabel num="01" name="Backend" title="BACKEND & SERVICES" />)
    expect(screen.getByText('FIELD 01')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'BACKEND & SERVICES' })).toBeInTheDocument()
  })

  it('ChipRow — 칩 전부 렌더', () => {
    wrap(<ChipRow chips={['Java 21', 'Redis']} />)
    expect(screen.getByText('Java 21')).toBeInTheDocument()
    expect(screen.getByText('Redis')).toBeInTheDocument()
  })
})
