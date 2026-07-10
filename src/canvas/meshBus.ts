export interface MeshMood {
  /** 0(잔잔) ~ 1.3(최대 활성) */
  intensity: number
  /** 0 = steel(과거) ~ 1 = cobalt(현재) */
  temperature: number
}

// 시드는 01 ABOUT 베이스라인 — MOOD_ARC.career(0.3)보다 낮아 아크가 낮게 출발한다
const state: MeshMood = { intensity: 1, temperature: 0.25 }
const listeners = new Set<(m: MeshMood) => void>()

export function getMeshMood(): MeshMood {
  return { ...state }
}

export function setMeshMood(m: Partial<MeshMood>) {
  Object.assign(state, m)
  const snap = getMeshMood()
  listeners.forEach(fn => fn(snap))
}

export function subscribeMesh(fn: (m: MeshMood) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
