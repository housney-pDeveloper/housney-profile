import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App assembly', () => {
  it('전 섹션이 순서대로 마운트된다', () => {
    const { container } = render(<App />)
    const ids = [...container.querySelectorAll('main > section, main > footer')].map(el => el.id)
    expect(ids).toEqual(['top', '', 'ax', 'systems', 'data', 'timeline', 'capabilities', 'contact'])
    // IdentityShift는 id 없음('') — Rewind 스트립은 div라 제외됨
    expect(container.querySelector('nav')).toBeTruthy()
  })
})
