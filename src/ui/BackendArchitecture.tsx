import { profile } from '@/content/profile'

type Tier = (typeof profile.work.fields.backend.tiers)[number]

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div className="hover-elevate glass-border flex-1 rounded-2xl p-5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-lg font-medium text-mesh-text">{tier.name}</span>
        <span className="mono-label shrink-0 text-mesh-accent">{tier.note}</span>
      </div>
      <p className="mono-label mt-2 normal-case tracking-normal text-mesh-copy">{tier.tech}</p>
      <p className="mt-2 text-sm text-mesh-copy">{tier.role}</p>
    </div>
  )
}

/** 3-서버 경계(Gateway → Application ⇄ Worker) + 이벤트 버스 + 공통 파운데이션 흐름도.
    각 박스는 마우스 오버 시 그림자가 떠오른다(.hover-elevate). */
export function BackendArchitecture() {
  const b = profile.work.fields.backend
  const [gateway, app, worker] = b.tiers

  return (
    <div className="flex flex-col gap-4">
      <span className="mono-label">{b.archTitle}</span>

      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        <TierCard tier={gateway} />
        <span className="mono-label hidden shrink-0 text-mesh-muted lg:block" aria-hidden="true">→</span>
        <TierCard tier={app} />
        <span className="mono-label hidden shrink-0 text-mesh-muted lg:block" aria-hidden="true">⇄</span>
        <TierCard tier={worker} />
      </div>

      {/* Application ⇄ Worker 를 잇는 이벤트 버스 */}
      <div className="hover-elevate rounded-full border border-mesh-line px-5 py-2 text-center">
        <span className="mono-label normal-case tracking-normal text-mesh-copy">{b.bus}</span>
      </div>

      {/* 전 계층 공통 파운데이션 */}
      <div className="hover-elevate glass-border rounded-2xl px-5 py-3 text-center">
        <span className="text-sm text-mesh-copy">{b.foundation}</span>
      </div>

      <p className="mono-label mt-1 text-mesh-muted">{b.archMetric}</p>
    </div>
  )
}
