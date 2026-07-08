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
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
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
