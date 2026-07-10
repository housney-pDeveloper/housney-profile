import { describe, it, expect } from 'vitest'
import { profile, BANNED_PATTERNS } from './profile'

describe('profile SSOT integrity', () => {
  it('PL/SQL 패키지는 정확히 14개, LOC 총합 35,493', () => {
    expect(profile.work.fields.database.packages).toHaveLength(14)
    const sum = profile.work.fields.database.packages.reduce((a, p) => a + p.loc, 0)
    expect(sum).toBe(35_493)
  })

  it('레인 구성: 지휘1 · 본선7 · HR3 · 지원3, 본선 step 1..7 유일', () => {
    const by = (lane: string) => profile.work.fields.database.packages.filter(p => p.lane === lane)
    expect(by('conductor')).toHaveLength(1)
    expect(by('main')).toHaveLength(7)
    expect(by('hr')).toHaveLength(3)
    expect(by('support')).toHaveLength(3)
    const steps = by('main').map(p => p.step).sort((a, b) => a! - b!)
    expect(steps).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('총계 수치 고정: 14 packages · 35,493 LOC · 652 tables', () => {
    expect(profile.work.fields.database.totals).toEqual({ packages: 14, loc: 35_493, tables: 652, tablesShare: '68%' })
  })

  it('시스템 앱 16개, 담당(owned) 5개', () => {
    expect(profile.work.fields.frontend.apps).toHaveLength(16)
    expect(profile.work.fields.frontend.apps.filter(a => a.owned)).toHaveLength(5)
  })

  it('AX 벤토 6카드, 경력 3장 최근 먼저, 스탯 4개', () => {
    expect(profile.work.fields.ax.cards).toHaveLength(6)
    expect(profile.career).toHaveLength(3)
    expect(profile.career[0].period.startsWith('2026')).toBe(true)
    expect(profile.hero.stats).toHaveLength(4)
  })

  it('익명화: 금지 패턴이 콘텐츠 어디에도 없음', () => {
    const blob = JSON.stringify(profile)
    for (const re of BANNED_PATTERNS) {
      expect(blob).not.toMatch(re)
    }
  })

  it('3부 구조: nav 4항목 · rail 3항목 · 필드 5개 상승 아크 순서', () => {
    expect(profile.nav.map(n => n.id)).toEqual(['about', 'career', 'work', 'contact'])
    expect(profile.rail.map(r => `${r.num} ${r.id}`)).toEqual(['01 about', '02 career', '03 work'])
    expect(profile.work.fieldOrder).toEqual(['backend', 'database', 'frontend', 'infra', 'ax'])
    // 필드 번호는 순서와 일치
    profile.work.fieldOrder.forEach((id, i) => {
      expect(profile.work.fields[id].num).toBe(`0${i + 1}`)
    })
    // 모든 필드는 칩을 가진다
    for (const id of profile.work.fieldOrder) {
      expect(profile.work.fields[id].chips.length).toBeGreaterThan(0)
    }
  })

  it('01 선언: ax 오프닝이 declaration으로 이전, 대비 호응 유지', () => {
    expect(profile.declaration.statement.startsWith('개인의 생산성 도구가 아니라')).toBe(true)
    expect(profile.declaration.metrics).toContain('90 AI 세션')
    expect('opening' in profile.work.fields.ax).toBe(false)
    expect('aiMetrics' in profile.work.fields.ax).toBe(false)
  })

  it('채용 흐름: AX 최초 정의 · database 시간 정합 · AX 클로징 · 명시적 클로징', () => {
    // 브레드크럼은 필드 순서를 미리 보여주는 페이지 맵 — 길이가 fieldOrder와 일치해야 함
    expect(profile.hero.breadcrumb).toHaveLength(profile.work.fieldOrder.length)
    expect(profile.hero.breadcrumb[profile.hero.breadcrumb.length - 1]).toContain('AI Transformation')
    const n = profile.work.fields.database.narrative
    expect(n).toContain('2021')
    expect(n.indexOf('굿리치')).toBeGreaterThan(0)
    expect(n.indexOf('굿리치')).toBeLessThan(n.indexOf('핀게이트'))
    expect(profile.work.fields.database.callback).toContain('핀게이트')
    expect(profile.work.fields.ax.closing.length).toBeGreaterThan(0)
    expect(profile.contact.meta).toContain('이 페이지')
  })

  it('되감기·Capabilities 잔재 없음', () => {
    expect('rewinds' in profile).toBe(false)
    expect('capabilities' in profile).toBe(false)
    expect('timeline' in profile).toBe(false)
    expect('bridge' in profile.work.fields.backend).toBe(false)
  })
})
