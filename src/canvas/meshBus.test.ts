import { describe, it, expect, vi } from 'vitest'
import { getMeshMood, setMeshMood, subscribeMesh } from './meshBus'

describe('meshBus', () => {
  it('초기 시드는 01 ABOUT 베이스라인(temperature 0.25, MOOD_ARC.career 0.3 미만)', () => {
    // 상승 아크가 낮은 온도에서 시작하도록 시드가 AX 정점(1)이 아닌 01 베이스라인이어야 한다.
    // (다른 테스트가 setMeshMood로 상태를 덮으므로 이 단언은 첫 read여야 유효)
    expect(getMeshMood().temperature).toBe(0.25)
    expect(getMeshMood().intensity).toBe(1)
  })

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
