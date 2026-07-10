import type { MeshMood } from '@/canvas/meshBus'

/** 상승 아크 — 과거(서늘)에서 AX(최고 온도)로 단조 증가 (스펙 §7) */
export const MOOD_ARC = {
  career: { intensity: 0.8, temperature: 0.3 },
  backend: { intensity: 0.85, temperature: 0.4 },
  database: { intensity: 0.9, temperature: 0.5 },
  frontend: { intensity: 0.95, temperature: 0.6 },
  infra: { intensity: 1.05, temperature: 0.75 },
  ax: { intensity: 1.25, temperature: 1 },
  contact: { intensity: 1, temperature: 0.8 },
} as const satisfies Record<string, MeshMood>

export const ARC_ORDER = ['career', 'backend', 'database', 'frontend', 'infra', 'ax'] as const
