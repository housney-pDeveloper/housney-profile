import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { BackendChapter } from './BackendChapter'
import { profile } from '@/content/profile'

describe('BackendChapter', () => {
  it('쇼케이스 헤더·내러티브·3티어·도메인 서비스 렌더, 섹션 id backend', () => {
    const { container } = render(
      <MotionProvider>
        <BackendChapter />
      </MotionProvider>,
    )
    expect(container.querySelector('#backend')).toBeTruthy()
    expect(screen.getByRole('heading', { name: profile.backend.title })).toBeInTheDocument()
    // 스토리 챕터가 아니라 엔지니어링 쇼케이스 — 챕터 번호 대신 딥다이브 라벨
    expect(container.textContent).toContain('ENGINEERING · DEEP DIVE')
    expect(container.textContent).not.toContain('CHAPTER 04')
    // 내러티브: 아키텍처 설계 선언 + 딥다이브 신호 문장
    expect(container.textContent).toContain('아키텍처 자체를 설계합니다')
    expect(container.textContent).toContain('실제 골격')
    // 시간 원점(굿리치 커리어 시작) 문구는 제거됨 — 바로 위 Timeline이 담당
    expect(container.textContent).not.toContain('굿리치')
    for (const t of profile.backend.tiers) {
      expect(screen.getByText(t.name)).toBeInTheDocument()
    }
    for (const s of profile.backend.services) {
      expect(screen.getByText(s.name)).toBeInTheDocument()
    }
  })
})
