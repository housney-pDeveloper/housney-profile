import { afterAll } from 'vitest'
import { ScrollTrigger } from '@/motion/gsap'
import '@testing-library/jest-dom/vitest'

// 결정적 테스트: reduced-motion 강제 → 모든 GSAP 경로 생략됨
window.matchMedia = ((query: string) => ({
  matches: query.includes('prefers-reduced-motion'),
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia

class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
;(window as any).IntersectionObserver = IOStub
;(window as any).ResizeObserver = IOStub
window.scrollTo = () => {}

// gsap.registerPlugin(ScrollTrigger)는 import 시점에 내부 틱커/스크롤 싱크 타이머를
// 구동하며 rAF 존재 여부만 감지한다 — 콜백을 실제로 실행해 스케줄을 이어가면(예: setTimeout
// 위임) 테스트 environment teardown 이후까지 틱이 이어지며 다른 테스트 파일 실행 중에
// 미처리 ReferenceError로 불거진다. 다른 스텁(IOStub, scrollTo)과 마찬가지로 콜백을
// 호출하지 않는 완전한 무동작 스텁으로 존재만 만족시킨다.
window.requestAnimationFrame = (() => 0) as unknown as typeof window.requestAnimationFrame
window.cancelAnimationFrame = () => {}

// gsap.registerPlugin(ScrollTrigger)는 등록 즉시(리듀스드모션 여부와 무관하게)
// setInterval(_sync, 250)로 자체 스크롤-싱크 폴링을 시작한다. 이 인터벌은 각 테스트
// 파일의 모듈 그래프마다 새로 생성되지만 순수 Node setInterval이라 vitest의 파일별
// environment teardown으로는 정리되지 않고 이후 파일 실행 도중 미처리
// ReferenceError로 불거진다 — 파일마다 명시적으로 disable() 해 정리한다.
afterAll(() => {
  ScrollTrigger.disable()
})

// happy-dom의 navigator.clipboard는 getter만 있는 접근자라 Object.assign으로 덮어쓸 수
// 없다 — 인스턴스에 쓰기 가능한 own 프로퍼티로 새로 정의해 테스트에서 스텁 가능하게 함.
Object.defineProperty(window.navigator, 'clipboard', {
  value: { writeText: () => Promise.resolve() },
  writable: true,
  configurable: true,
})
