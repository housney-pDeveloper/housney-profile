import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/providers/MotionProvider'
import { getMeshMood, subscribeMesh, type MeshMood } from './meshBus'
import { VERT, FRAG } from './meshShader'

function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return null

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null
    return sh
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)

  // 풀스크린 트라이앵글
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  return {
    gl,
    u: {
      res: gl.getUniformLocation(prog, 'u_res'),
      time: gl.getUniformLocation(prog, 'u_time'),
      intensity: gl.getUniformLocation(prog, 'u_intensity'),
      temp: gl.getUniformLocation(prog, 'u_temp'),
      pointer: gl.getUniformLocation(prog, 'u_pointer'),
    },
  }
}

/** 2D 캔버스 폴백 — 라디얼 그라디언트 드리프트 */
function draw2D(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, mood: MeshMood) {
  ctx.fillStyle = '#030712'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'screen'
  const cobalt = `rgba(29,78,216,${0.5 * mood.intensity})`
  const steel = `rgba(56,90,124,${0.45 * mood.intensity})`
  const warm = mood.temperature > 0.5 ? cobalt : steel
  const pts = [
    { x: 0.22 + Math.sin(time * 0.00018) * 0.05, y: 0.32, r: 0.45, c: warm },
    { x: 0.76, y: 0.22 + Math.cos(time * 0.00016) * 0.05, r: 0.38, c: `rgba(49,46,129,${0.5 * mood.intensity})` },
    { x: 0.7, y: 0.74, r: 0.52, c: steel },
  ]
  for (const p of pts) {
    const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, Math.max(w, h) * p.r)
    g.addColorStop(0, p.c)
    g.addColorStop(1, 'rgba(3,7,18,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }
  ctx.globalCompositeOperation = 'source-over'
}

export function MeshField() {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
    }
    resize()

    // mood: 목표값(meshBus) → 현재값 lerp
    const target = getMeshMood()
    const current: MeshMood = { ...target }
    const offMesh = subscribeMesh(m => Object.assign(target, m))

    const pointer = { x: 0, y: 0 }
    const pointerTarget = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      pointerTarget.x = e.clientX / w - 0.5
      pointerTarget.y = 0.5 - e.clientY / h
    }

    let raf = 0
    let running = true
    const webgl = initWebGL(canvas)
    const ctx2d = webgl ? null : canvas.getContext('2d')

    const frame = (time: number) => {
      if (!running) return
      current.intensity += (target.intensity - current.intensity) * 0.04
      current.temperature += (target.temperature - current.temperature) * 0.04
      pointer.x += (pointerTarget.x - pointer.x) * 0.06
      pointer.y += (pointerTarget.y - pointer.y) * 0.06

      if (webgl) {
        const { gl, u } = webgl
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform2f(u.res, canvas.width, canvas.height)
        gl.uniform1f(u.time, time)
        gl.uniform1f(u.intensity, current.intensity)
        gl.uniform1f(u.temp, current.temperature)
        gl.uniform2f(u.pointer, pointer.x, pointer.y)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      } else if (ctx2d) {
        draw2D(ctx2d, canvas.width, canvas.height, time, current)
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(frame)
      else cancelAnimationFrame(raf)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      offMesh()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  if (reduced) return <div className="mesh-static" aria-hidden="true" />
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  )
}
