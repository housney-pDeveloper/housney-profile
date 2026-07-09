import { describe, it, expect } from 'vitest'
import { findViolations } from './check-anonymization.mjs'

describe('anonymization checker', () => {
  it('금지 문자열 검출', () => {
    expect(findViolations('uses PG_CLOSE and epika db', 'x.js')).toHaveLength(2)
    expect(findViolations('행사관리 SaaS · 핀게이트 · 굿리치', 'x.js')).toHaveLength(0)
    expect(findViolations('visit hosting.fingate.kr now', 'x.js')).toHaveLength(1)
  })
})
