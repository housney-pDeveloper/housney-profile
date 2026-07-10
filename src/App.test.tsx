import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App assembly', () => {
  it('전 섹션이 순서대로 마운트된다', () => {
    const { container } = render(<App />)
    const ids = [...container.querySelectorAll('main > section, main > footer')].map(el => el.id)
    expect(ids).toEqual(['top', '', 'about', 'career', 'work', 'backend', 'database', 'frontend', 'infra', 'ax', 'contact'])
    // IdentityShift는 id 없음('')
    expect(container.querySelector('nav')).toBeTruthy()
  })
})
