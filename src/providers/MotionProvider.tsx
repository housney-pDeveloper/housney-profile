import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const Ctx = createContext(false)

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return <Ctx.Provider value={reduced}>{children}</Ctx.Provider>
}

export function useReducedMotion() {
  return useContext(Ctx)
}
