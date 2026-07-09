import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

// 스펙 §2.1 — src/content/profile.ts의 BANNED_PATTERNS와 동일 목록 유지
const BANNED = [
  /moggoji/i,
  /eventflow/i,
  /모꼬지/,
  /epika/i,
  /에피카/,
  /c_common/i,
  /fingate\.kr/i,
  /PG_[A-Z]/,
  /\bAIA\b/,
]
const EXTS = new Set(['.html', '.js', '.css', '.json', '.txt', '.svg'])

export function findViolations(text, file) {
  const hits = []
  for (const re of BANNED) {
    const m = text.match(re)
    if (m) hits.push({ file, pattern: String(re), sample: m[0] })
  }
  return hits
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (EXTS.has(extname(p))) out.push(p)
  }
  return out
}

// 직접 실행 시에만 dist 검사 (테스트에서 import해도 부작용 없음)
if (process.argv[1] && process.argv[1].endsWith('check-anonymization.mjs')) {
  const files = walk('dist')
  const violations = files.flatMap(f => findViolations(readFileSync(f, 'utf-8'), f))
  if (violations.length) {
    console.error('[ANONYMIZATION GATE] FAILED:')
    for (const v of violations) console.error(`  ${v.file} — ${v.pattern} → "${v.sample}"`)
    process.exit(1)
  }
  console.log(`[ANONYMIZATION GATE] OK — ${files.length} files clean`)
}
