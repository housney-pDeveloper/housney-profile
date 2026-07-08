import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { IdentityShift } from './IdentityShift'
import { profile } from '@/content/profile'

describe('IdentityShift (reduced)', () => {
  it('두 문장이 모두 정적으로 보인다', () => {
    render(
      <MotionProvider>
        <IdentityShift />
      </MotionProvider>,
    )
    expect(screen.getByText(profile.identity.before)).toBeInTheDocument()
    expect(screen.getByText(profile.identity.after)).toBeInTheDocument()
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.getByText('2026')).toBeInTheDocument()
  })
})
