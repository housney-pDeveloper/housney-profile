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
