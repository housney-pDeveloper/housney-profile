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

// happy-dom의 navigator.clipboard는 getter만 있는 접근자라 Object.assign으로 덮어쓸 수
// 없다 — 인스턴스에 쓰기 가능한 own 프로퍼티로 새로 정의해 테스트에서 스텁 가능하게 함.
Object.defineProperty(window.navigator, 'clipboard', {
  value: { writeText: () => Promise.resolve() },
  writable: true,
  configurable: true,
})
