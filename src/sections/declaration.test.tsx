import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { Declaration } from './Declaration'
import { profile } from '@/content/profile'

describe('Declaration (#about)', () => {
  it('선언문·지표 렌더, 섹션 id about', () => {
    const { container } = render(
      <MotionProvider>
        <Declaration />
      </MotionProvider>,
    )
    expect(container.querySelector('#about')).toBeTruthy()
    expect(screen.getByText(profile.declaration.statement)).toBeInTheDocument()
    expect(screen.getByText(profile.declaration.metrics)).toBeInTheDocument()
  })
})
