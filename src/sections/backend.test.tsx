import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { BackendChapter } from './BackendChapter'
import { profile } from '@/content/profile'

describe('BackendChapter', () => {
  it('제목·내러티브·3티어·도메인 서비스 렌더, 섹션 id backend', () => {
    const { container } = render(
      <MotionProvider>
        <BackendChapter />
      </MotionProvider>,
    )
    expect(container.querySelector('#backend')).toBeTruthy()
    expect(screen.getByRole('heading', { name: profile.backend.title })).toBeInTheDocument()
    expect(screen.getByText(profile.backend.narrative)).toBeInTheDocument()
    for (const t of profile.backend.tiers) {
      expect(screen.getByText(t.name)).toBeInTheDocument()
    }
    for (const s of profile.backend.services) {
      expect(screen.getByText(s.name)).toBeInTheDocument()
    }
  })
})
