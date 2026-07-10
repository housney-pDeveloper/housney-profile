import { describe, it, expect } from 'vitest'
import { MOOD_ARC, ARC_ORDER } from './moodArc'
import { profile } from '@/content/profile'

describe('mood arc', () => {
  it('ARC_ORDER는 SSOT와 일치: career + 필드 순서', () => {
    expect(ARC_ORDER).toEqual(['career', ...profile.work.fieldOrder])
  })

  it('온도는 career→ax로 단조 증가, ax가 최고 온도·최대 강도', () => {
    const temps = ARC_ORDER.map(k => MOOD_ARC[k].temperature)
    for (let i = 1; i < temps.length; i++) {
      expect(temps[i]).toBeGreaterThan(temps[i - 1])
    }
    expect(MOOD_ARC.ax.temperature).toBe(1)
    const maxIntensity = Math.max(...ARC_ORDER.map(k => MOOD_ARC[k].intensity))
    expect(MOOD_ARC.ax.intensity).toBe(maxIntensity)
    // Contact는 클라이맥스 직후 잔열 (ax보다 낮되 따뜻하게)
    expect(MOOD_ARC.contact.temperature).toBeGreaterThan(0.5)
    expect(MOOD_ARC.contact.temperature).toBeLessThan(MOOD_ARC.ax.temperature)
  })
})
