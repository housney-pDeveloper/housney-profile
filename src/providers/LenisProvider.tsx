import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/motion/gsap'
import { useReducedMotion } from './MotionProvider'

const Ctx = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9 })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    let unmounted = false
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    // 스펙 §7: 폰트 로드 후 refresh — 셀프호스팅 가변 폰트는 window 'load' 이후에도
    // 비동기로 스왑될 수 있어, load 시점 refresh만으로는 스왑 전 메트릭 기준으로 스크롤트리거
    // 시작/끝 위치가 어긋날 수 있다. 폰트 준비 완료 후 한 번 더 refresh 한다.
    document.fonts?.ready?.then(() => {
      if (!unmounted) ScrollTrigger.refresh()
    })
    return () => {
      unmounted = true
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <Ctx.Provider value={lenis}>{children}</Ctx.Provider>
}

export function useLenis() {
  return useContext(Ctx)
}
