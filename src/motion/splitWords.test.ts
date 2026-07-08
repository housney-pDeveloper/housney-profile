import { describe, it, expect } from 'vitest'
import { splitWords } from './splitWords'

describe('splitWords', () => {
  it('단어를 마스크 스팬으로 분해하고 aria-label을 보존한다', () => {
    const el = document.createElement('p')
    el.textContent = '코드를 쓰는 시스템'
    splitWords(el)
    expect(el.getAttribute('aria-label')).toBe('코드를 쓰는 시스템')
    expect(el.querySelectorAll('.split-word')).toHaveLength(3)
    expect(el.querySelector('.split-word-mask')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('멱등 — 두 번 호출해도 다시 분해하지 않는다', () => {
    const el = document.createElement('p')
    el.textContent = 'one two'
    splitWords(el)
    splitWords(el)
    expect(el.querySelectorAll('.split-word')).toHaveLength(2)
  })
})
