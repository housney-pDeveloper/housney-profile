import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionProvider, useReducedMotion } from './MotionProvider'

function Probe() {
  return <span>{useReducedMotion() ? 'reduced' : 'full'}</span>
}

describe('MotionProvider', () => {
  it('테스트 환경(matchMedia mock)에서는 reduced', () => {
    render(
      <MotionProvider>
        <Probe />
      </MotionProvider>,
    )
    expect(screen.getByText('reduced')).toBeInTheDocument()
  })
})
