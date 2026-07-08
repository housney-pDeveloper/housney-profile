import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { MeshField } from './MeshField'

describe('MeshField', () => {
  it('reduced-motion에서는 정적 그라디언트 div를 렌더', () => {
    const { container } = render(
      <MotionProvider>
        <MeshField />
      </MotionProvider>,
    )
    expect(container.querySelector('.mesh-static')).toBeTruthy()
    expect(container.querySelector('canvas')).toBeFalsy()
  })
})
