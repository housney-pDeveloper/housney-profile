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

  it('벤토 6카드, 타임라인 3장 최근 먼저, 스탯 4개', () => {
    expect(profile.ax.cards).toHaveLength(6)
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

  it('backend는 엔지니어링 쇼케이스 — 시간 서사 필드(legacy/chips) 제거', () => {
    expect(profile.backend.chapter).toBe('ENGINEERING · DEEP DIVE')
    expect(profile.backend.era).toBe('JAVA · SPRING · EVENT-DRIVEN')
    expect(profile.backend.title).toBe('BACKEND & SERVICES')
    expect(profile.backend.narrative).toBe(
      '서버를 짜는 일을 넘어, 요청과 이벤트가 흐르는 아키텍처 자체를 설계합니다. 아래는 지금 운영 중인 백엔드의 실제 골격입니다.',
    )
    // Timeline(여정의 끝) 뒤에 다시 기술 챕터가 나오는 기어 변속을 안내하는 브릿지
    expect(profile.backend.bridge).toBe('여정은 여기까지 — 지금부터는 엔지니어를 위한 딥다이브입니다.')
    expect('legacy' in profile.backend).toBe(false)
    expect('chips' in profile.backend).toBe(false)
  })

  it('채용 흐름 보강: AX 최초 정의 · 데이터 챕터 시간 정합 · 명시적 클로징', () => {
    // 첫 등장(히어로 브레드크럼)에서 AX를 1회 풀어쓴다
    expect(profile.hero.breadcrumb[profile.hero.breadcrumb.length - 1]).toContain('AI Transformation')
    // 대비 호응: '생산성을 만들다'가 아니라 '생산성 도구'
    expect(profile.ax.opening.startsWith('개인의 생산성 도구가 아니라')).toBe(true)
    // 되감기가 2021에 착지하므로 챕터도 2021 기원(굿리치)부터 시간순으로 전개
    const n = profile.data.narrative
    expect(n).toContain('2021')
    expect(n.indexOf('굿리치')).toBeGreaterThan(0)
    expect(n.indexOf('굿리치')).toBeLessThan(n.indexOf('핀게이트'))
    // 35,000줄 파이프라인이 핀게이트 시기 작업임을 콜백이 명시 — Timeline과의 모순 제거
    expect(profile.data.callback).toContain('핀게이트')
    // 기원 각주는 내러티브 도입부로 흡수되어 제거
    expect('legacy' in profile.data).toBe(false)
    // 클로징: '제가 일하는 방식 그대로'가 이 페이지 자체를 가리킴을 명시
    expect(profile.contact.meta).toContain('이 페이지')
  })

  it('번호 rail은 되감기 3장(ax·systems·data)만 — backend 없음', () => {
    expect(profile.rail.map(r => r.id)).toEqual(['ax', 'systems', 'data'])
  })

  it('nav 순서: backend는 timeline 뒤', () => {
    expect(profile.nav.map(n => n.id)).toEqual(['ax', 'systems', 'data', 'timeline', 'backend', 'contact'])
  })
})
