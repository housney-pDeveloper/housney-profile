import { describe, it, expect } from 'vitest'
import { formatStat } from './useCountUp'

describe('formatStat', () => {
  it('천 단위 콤마', () => {
    expect(formatStat(35493)).toBe('35,493')
    expect(formatStat(90)).toBe('90')
    expect(formatStat(8126)).toBe('8,126')
  })
})
