import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { Preloader } from './Preloader'
import { Hero } from './Hero'
import { profile } from '@/content/profile'

describe('Preloader', () => {
  it('reduced에서는 즉시 onComplete 호출', () => {
    const done = vi.fn()
    render(
      <MotionProvider>
        <Preloader onComplete={done} />
      </MotionProvider>,
    )
    expect(done).toHaveBeenCalled()
  })
})

describe('Hero', () => {
  it('이름·선언·상태 라벨·스탯 4개·노드 3개 렌더', () => {
    render(
      <MotionProvider>
        <Hero booted />
      </MotionProvider>,
    )
    expect(screen.getByRole('heading', { name: 'LEE HYEONSU' })).toBeInTheDocument()
    expect(screen.getByText(profile.hero.tagline)).toBeInTheDocument()
    expect(screen.getByText(profile.hero.status)).toBeInTheDocument()
    for (const s of profile.hero.stats) expect(screen.getByText(s.label)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /nodes|Gate|Marketplace|Graph/i }).length).toBeGreaterThanOrEqual(3)
  })
})
