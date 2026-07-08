import { useState } from 'react'

export function EmailCta({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <span className="inline-flex flex-col items-center gap-3">
      <a
        href={`mailto:${email}`}
        onClick={() => {
          navigator.clipboard?.writeText(email).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
        }}
        className="rounded-full bg-mesh-text px-8 py-4 font-display text-lg font-medium text-mesh-bg shadow-[0_16px_36px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5"
      >
        {email}
      </a>
      <span className="mono-label h-4" aria-live="polite">
        {copied ? '클립보드에 복사됨' : ''}
      </span>
    </span>
  )
}
