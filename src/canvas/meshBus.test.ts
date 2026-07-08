import { describe, it, expect, vi } from 'vitest'
import { getMeshMood, setMeshMood, subscribeMesh } from './meshBus'

describe('meshBus', () => {
  it('부분 갱신·구독·해지', () => {
    const fn = vi.fn()
    const off = subscribeMesh(fn)
    setMeshMood({ temperature: 0.5 })
    expect(getMeshMood().temperature).toBe(0.5)
    expect(getMeshMood().intensity).toBe(1)
    expect(fn).toHaveBeenCalledWith({ intensity: 1, temperature: 0.5 })
    off()
    setMeshMood({ intensity: 0.7 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
