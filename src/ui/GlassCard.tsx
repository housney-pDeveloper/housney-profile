import type { ReactNode } from 'react'

export function GlassCard({
  children,
  className = '',
  featured = false,
}: {
  children: ReactNode
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={`glass-border rounded-3xl p-7 transition-transform duration-300 will-change-transform hover:-translate-y-1 ${
        featured ? 'md:col-span-2' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
