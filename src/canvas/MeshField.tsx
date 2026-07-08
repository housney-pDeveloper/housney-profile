import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/providers/MotionProvider'
import { getMeshMood, subscribeMesh, type MeshMood } from './meshBus'
import { VERT, FRAG } from './meshShader'

/**
 * 버텍스/프래그먼트 셰이더를 컴파일하고 프로그램을 링크한다.
 * 어느 단계든 실패하면 그 시점까지 만들어진 GL 리소스(셰이더/프로그램)를
 * 정리한 뒤 null을 반환한다 — non-null 단언(`!`) 없이, 절대 throw하지 않는다.
 */
function compileProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)
    if (!sh) return null
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh)
      return null
    }
    return sh
  }

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) {
    // 한쪽만 컴파일에 성공했다면 누수되지 않도록 정리
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    return null
  }

  const prog = gl.createProgram()
  if (!prog) {
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  const linked = gl.getProgramParameter(prog, gl.LINK_STATUS)
  // 링크 성공 여부와 무관하게 셰이더 객체는 더 이상 직접 필요 없다 — attach된
  // 상태라면 GL이 실제 해제를 프로그램 삭제 시점까지 미루므로 안전하다.
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!linked) {
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

/**
 * 실제 캔버스를 건드리기 전에, 별도의 스크래치 캔버스에서 WebGL 파이프라인
 * (컨텍스트 획득 + 셰이더 컴파일 + 프로그램 링크) 전체를 검증한다.
 *
 * 캔버스는 getContext()가 한 번 성공하면 그 컨텍스트 타입에 영구히 고정된다.
 * 실제 캔버스에서 곧바로 'webgl'을 시도했다가 컴파일/링크에 실패하면 그
 * 캔버스는 '2d'로도 더 이상 전환할 수 없다. 셰이더 소스는 정적이므로 스크래치
 * 캔버스에서의 성공은 실제 캔버스에서의 성공을 보장하며, 이 검증을 통과했을
 * 때만 실제 캔버스를 'webgl'에 바인딩한다.
 */
function canUseWebGL(): boolean {
  try {
    const scratch = document.createElement('canvas')
    const gl = scratch.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return false
    const prog = compileProgram(gl)
    if (!prog) return false
    gl.deleteProgram(prog)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return null

  const prog = compileProgram(gl)
  if (!prog) return null
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
  ctx.fillStyle = '#f7f7f8'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'multiply'
  const a = Math.min(0.10 + 0.10 * mood.intensity, 0.22)
  const cloud = `rgba(0,0,0,${a})`
  const pts = [
    { x: 0.22 + Math.sin(time * 0.00018) * 0.05, y: 0.32, r: 0.45, c: cloud },
    { x: 0.76, y: 0.22 + Math.cos(time * 0.00016) * 0.05, r: 0.38, c: `rgba(0,0,0,${a * 0.9})` },
    { x: 0.7, y: 0.74, r: 0.52, c: cloud },
  ]
  for (const p of pts) {
    const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, Math.max(w, h) * p.r)
    g.addColorStop(0, p.c)
    g.addColorStop(1, 'rgba(0,0,0,0)')
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

    // WebGL 컨텍스트/셰이더 초기화 중 예기치 못한 예외가 발생해도 (이 앱에는
    // ErrorBoundary가 없으므로) 페이지 전체가 하얗게 죽지 않도록, 셋업 전체를
    // 감싼다. 실패 시 리스너/rAF 없이 조용히 종료한다 — 안전망일 뿐, 정상
    // 경로에서는 canUseWebGL/initWebGL이 이미 null만 반환할 뿐 throw하지 않는다.
    try {
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

      // 실제 캔버스는 getContext()가 성공하는 순간 그 타입에 영구 고정되므로,
      // 스크래치 캔버스에서 전체 파이프라인을 먼저 검증한 뒤에만 'webgl'로 바인딩한다.
      const webgl = canUseWebGL() ? initWebGL(canvas) : null
      const ctx2d = webgl ? null : canvas.getContext('2d')
      if (!webgl && !ctx2d) return

      // mood: 목표값(meshBus) → 현재값 lerp
      const target = getMeshMood()
      const current: MeshMood = { ...target }
      const offMesh = subscribeMesh(m => Object.assign(target, m))

      const pointer = { x: 0, y: 0 }
      const pointerTarget = { x: 0, y: 0 }
      const onMove = (e: MouseEvent) => {
        // w/h가 0이면 정규화가 NaN이 되고 이후 lerp를 통해 영구히 전파된다
        if (w <= 0 || h <= 0) return
        pointerTarget.x = e.clientX / w - 0.5
        pointerTarget.y = 0.5 - e.clientY / h
      }

      let raf = 0
      let running = true

      const frame = (time: number) => {
        if (!running) return
        current.intensity += (target.intensity - current.intensity) * 0.04
        current.temperature += (target.temperature - current.temperature) * 0.04
        pointer.x += (pointerTarget.x - pointer.x) * 0.06
        pointer.y += (pointerTarget.y - pointer.y) * 0.06

        // 캔버스가 0×0이면 u_res로 나누는 셰이더 연산이 NaN이 되므로 드로우 스킵
        if (canvas.width > 0 && canvas.height > 0) {
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
    } catch {
      return undefined
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
