import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MotionProvider } from '@/providers/MotionProvider'
import { WorkIntro } from './WorkIntro'
import { profile } from '@/content/profile'

describe('WorkIntro (#work)', () => {
  it('03 라벨·내러티브·필드 인덱스 5개 앵커 렌더', () => {
    const { container } = render(
      <MotionProvider>
        <WorkIntro />
      </MotionProvider>,
    )
    expect(container.querySelector('#work')).toBeTruthy()
    expect(container.textContent).toContain(profile.work.intro.narrative)
    for (const id of profile.work.fieldOrder) {
      const link = container.querySelector(`a[href="#${id}"]`)
      expect(link).toBeTruthy()
      expect(link!.textContent).toContain(profile.work.fields[id].name)
    }
  })
})
