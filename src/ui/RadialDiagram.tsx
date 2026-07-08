import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsap'
import { useReducedMotion } from '@/providers/MotionProvider'
import { profile } from '@/content/profile'

const CX = 400
const CY = 400
const R = 300

export function RadialDiagram() {
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const apps = profile.systems.apps

  useGSAP(
    () => {
      if (reduced || !svgRef.current) return
      const lines = svgRef.current.querySelectorAll<SVGLineElement>('line[data-link]')
      lines.forEach(line => {
        const len = Math.hypot(
          Number(line.getAttribute('x2')) - Number(line.getAttribute('x1')),
          Number(line.getAttribute('y2')) - Number(line.getAttribute('y1')),
        )
        line.style.strokeDasharray = String(len)
        line.style.strokeDashoffset = String(len)
      })
      gsap.to(lines, {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: { trigger: svgRef.current, start: 'top 80%', end: 'top 20%', scrub: 1 },
      })
    },
    { scope: svgRef, dependencies: [reduced] },
  )

  return (
    <svg ref={svgRef} viewBox="0 0 800 800" className="mx-auto w-full max-w-3xl" role="img"
      aria-label={`${profile.systems.framework.name}가 ${apps.length}개 업무 앱을 지탱하는 구조. 담당: ${apps.filter(a => a.owned).map(a => a.name).join(', ')}`}>
      {apps.map((app, i) => {
        const angle = (i / apps.length) * Math.PI * 2 - Math.PI / 2
        const x = CX + Math.cos(angle) * R
        const y = CY + Math.sin(angle) * R
        return (
          <g key={app.name}>
            <line data-link x1={CX} y1={CY} x2={x} y2={y}
              stroke={app.owned ? 'rgba(219,234,254,0.45)' : 'rgba(191,219,254,0.14)'} strokeWidth="1" />
            <g data-app-node className={app.owned ? 'owned' : ''}>
              <circle cx={x} cy={y} r={app.owned ? 7 : 4.5}
                fill={app.owned ? '#dbeafe' : '#1e293b'}
                stroke={app.owned ? '#dbeafe' : 'rgba(191,219,254,0.3)'} />
              <text x={x} y={y + (y > CY ? 26 : -16)} textAnchor="middle"
                fill={app.owned ? '#dbeafe' : '#64748b'}
                style={{ font: `500 ${app.owned ? 15 : 13}px var(--font-sans)` }}>
                {app.name}
              </text>
            </g>
          </g>
        )
      })}
      <circle cx={CX} cy={CY} r="86" fill="rgba(7,13,25,0.9)" stroke="rgba(219,234,254,0.4)" />
      <text x={CX} y={CY - 6} textAnchor="middle" fill="#f8fafc" style={{ font: '600 17px var(--font-sans)' }}>
        {profile.systems.framework.name}
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" fill="#9fb2ca" style={{ font: '12px var(--font-mono)' }}>
        {profile.systems.framework.metric}
      </text>
    </svg>
  )
}
