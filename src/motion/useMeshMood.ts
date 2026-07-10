import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from './gsap'
import { setMeshMood } from '@/canvas/meshBus'
import type { MeshMood } from '@/canvas/meshBus'
import { useReducedMotion } from '@/providers/MotionProvider'

/** 섹션 진입(정방향/역방향) 시 메시 무드 적용 */
export function useMeshMood(root: RefObject<HTMLElement | null>, mood: MeshMood) {
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !root.current) return
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setMeshMood(mood),
        onEnterBack: () => setMeshMood(mood),
      })
    },
    { scope: root, dependencies: [reduced] },
  )
}
