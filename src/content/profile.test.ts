import { describe, it, expect } from 'vitest'
import { profile, BANNED_PATTERNS } from './profile'

describe('profile SSOT integrity', () => {
  it('PL/SQL 패키지는 정확히 14개, LOC 총합 35,493', () => {
    expect(profile.data.packages).toHaveLength(14)
    const sum = profile.data.packages.reduce((a, p) => a + p.loc, 0)
    expect(sum).toBe(35_493)
  })

  it('레인 구성: 지휘1 · 본선7 · HR3 · 지원3, 본선 step 1..7 유일', () => {
    const by = (lane: string) => profile.data.packages.filter(p => p.lane === lane)
    expect(by('conductor')).toHaveLength(1)
    expect(by('main')).toHaveLength(7)
    expect(by('hr')).toHaveLength(3)
    expect(by('support')).toHaveLength(3)
    const steps = by('main').map(p => p.step).sort((a, b) => a! - b!)
    expect(steps).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('총계 수치 고정: 14 packages · 35,493 LOC · 652 tables', () => {
    expect(profile.data.totals).toEqual({ packages: 14, loc: 35_493, tables: 652, tablesShare: '68%' })
  })

  it('시스템 앱 16개, 담당(owned) 5개', () => {
    expect(profile.systems.apps).toHaveLength(16)
    expect(profile.systems.apps.filter(a => a.owned)).toHaveLength(5)
  })

  it('벤토 6카드(첫 카드 featured), 타임라인 3장 최근 먼저, 스탯 4개', () => {
    expect(profile.ax.cards).toHaveLength(6)
    expect(profile.ax.cards[0].featured).toBe(true)
    expect(profile.timeline).toHaveLength(3)
    expect(profile.timeline[0].period.startsWith('2026')).toBe(true)
    expect(profile.hero.stats).toHaveLength(4)
  })

  it('익명화: 금지 패턴이 콘텐츠 어디에도 없음', () => {
    const blob = JSON.stringify(profile)
    for (const re of BANNED_PATTERNS) {
      expect(blob).not.toMatch(re)
    }
  })
})
