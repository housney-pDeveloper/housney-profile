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
              stroke={app.owned ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'} strokeWidth="1" />
            <g data-app-node className={app.owned ? 'owned' : ''}>
              <circle cx={x} cy={y} r={app.owned ? 7 : 4.5}
                fill={app.owned ? '#0a0a0a' : '#d4d4d8'}
                stroke={app.owned ? '#0a0a0a' : 'rgba(0,0,0,0.2)'} />
              <text x={x} y={y + (y > CY ? 26 : -16)} textAnchor="middle"
                fill={app.owned ? '#0a0a0a' : '#8a8a92'}
                style={{ font: `500 ${app.owned ? 15 : 13}px var(--font-sans)` }}>
                {app.name}
              </text>
            </g>
          </g>
        )
      })}
      <circle cx={CX} cy={CY} r="135" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.35)" />
      <text x={CX} y={CY - 6} textAnchor="middle" fill="#0a0a0a" style={{ font: '600 17px var(--font-sans)' }}>
        {profile.systems.framework.name}
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" fill="#52525b" style={{ font: '12px var(--font-mono)' }}>
        {profile.systems.framework.metric}
      </text>
    </svg>
  )
}
