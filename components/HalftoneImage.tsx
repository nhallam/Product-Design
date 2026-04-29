'use client'

import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG = `
  precision highp float;
  uniform sampler2D u_tex;
  uniform float u_progress;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  void main() {
    vec4 color = texture2D(u_tex, v_uv);
    float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    float scale = 55.0;
    float aspect = u_resolution.x / u_resolution.y;

    // Rotate 45deg for classic newspaper halftone angle
    float angle = 0.7854;
    float c = cos(angle), s = sin(angle);
    vec2 rotUV = vec2(
      c * v_uv.x * aspect - s * v_uv.y,
      s * v_uv.x * aspect + c * v_uv.y
    );

    vec2 cell = fract(rotUV * scale) - 0.5;
    float dist = length(cell);

    // Darker pixels = larger dots
    float radius = sqrt(max(0.0, 1.0 - lum)) * 0.68;
    float dot = smoothstep(radius + 0.02, radius - 0.02, dist);

    // Black dots on white paper
    vec3 halftone = vec3(1.0 - dot);
    vec3 final = mix(color.rgb, halftone, u_progress);

    gl_FragColor = vec4(final, color.a);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

interface Props {
  src: string
  width: number
  height: number
  alt: string
  className?: string
}

export default function HalftoneImage({ src, width, height, alt, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef({
    gl: null as WebGLRenderingContext | null,
    uProgress: null as WebGLUniformLocation | null,
    progress: 0,
    target: 0,
    raf: 0,
    ready: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const s = state.current
    s.gl = gl

    const prog = gl.createProgram()!
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    s.uProgress = gl.getUniformLocation(prog, 'u_progress')
    gl.uniform1f(s.uProgress, 0)
    gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), width, height)

    // Load texture
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.viewport(0, 0, width, height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      s.ready = true
    }

    return () => cancelAnimationFrame(s.raf)
  }, [src, width, height])

  function animate() {
    const s = state.current
    if (!s.gl || !s.ready) return
    const diff = s.target - s.progress
    if (Math.abs(diff) < 0.001) {
      s.progress = s.target
      s.gl.uniform1f(s.uProgress, s.progress)
      s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4)
      return
    }
    s.progress += diff * 0.06
    s.gl.uniform1f(s.uProgress, s.progress)
    s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4)
    s.raf = requestAnimationFrame(animate)
  }

  function onEnter() {
    const s = state.current
    s.target = 1
    cancelAnimationFrame(s.raf)
    s.raf = requestAnimationFrame(animate)
  }

  function onLeave() {
    const s = state.current
    s.target = 0
    cancelAnimationFrame(s.raf)
    s.raf = requestAnimationFrame(animate)
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-label={alt}
      className={className}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      style={{ cursor: 'crosshair' }}
    />
  )
}
