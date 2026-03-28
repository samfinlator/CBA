import { useEffect, useRef } from "react";

/**
 * Animated WebGL gradient background.
 * Loads vertex + fragment shaders from /gradient.vert and /gradient.frag.
 *
 * All instances share the same gradient space via uViewportUvOffset +
 * uViewportUvScale uniforms, computed from the canvas's viewport position
 * each frame. The fixed canvas uses offset=(0,0) scale=(1,1). Local canvases
 * compute their slice from getBoundingClientRect(), so every instance is a
 * window into the same gradient — truly one gradient, masked in different areas.
 */
export default function GradientCanvas({
  className = "",
  fixed = false,
  seed,
  startTime,
}: {
  className?: string;
  fixed?: boolean;
  seed?: number;
  startTime?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    let rafId: number | null = null;
    let destroyed = false;

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    const init = async () => {
      const [vertSrc, fragSrc] = await Promise.all([
        fetch("/gradient.vert").then((r) => r.text()),
        fetch("/gradient.frag").then((r) => r.text()),
      ]);

      if (destroyed) return;

      // ── helpers ──
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(s));
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, vertSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return;

      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        return;
      }

      // ── full-screen quad ──
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );
      const aPos = gl.getAttribLocation(prog, "aPosition");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      // ── uniforms ──
      gl.useProgram(prog);
      const u = {
        uTime:      gl.getUniformLocation(prog, "uTime"),
        uScroll:    gl.getUniformLocation(prog, "uScrollProgress"),
        uPalette:   gl.getUniformLocation(prog, "uColourPalette[0]"),
        uScale:     gl.getUniformLocation(prog, "uUvScale"),
        uIter:      gl.getUniformLocation(prog, "uUvDistortionIterations"),
        uIntensity: gl.getUniformLocation(prog, "uUvDistortionIntensity"),
        uSeed:      gl.getUniformLocation(prog, "uSeed"),
        uVpOffset:  gl.getUniformLocation(prog, "uViewportUvOffset"),
        uVpScale:   gl.getUniformLocation(prog, "uViewportUvScale"),
      };

      // magenta → gold → cyan
      const palette = new Float32Array([
        0.996, 0.004, 0.996,
        1.0,   0.69,  0.0,
        0.0,   0.71,  0.988,
      ]);
      const resolvedSeed = seed ?? Math.random() * 1000;

      gl.uniform3fv(u.uPalette, palette);
      gl.uniform1f(u.uSeed,      resolvedSeed);
      gl.uniform1f(u.uScale,     0.5);
      gl.uniform1f(u.uIter,      6.0);
      gl.uniform1f(u.uIntensity, 0.15);
      gl.disable(gl.DEPTH_TEST);

      // ── resize ──
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let width: number, height: number;
        if (fixed) {
          width  = window.innerWidth;
          height = window.innerHeight;
        } else {
          const parent = canvas.parentElement;
          if (!parent) return;
          ({ width, height } = parent.getBoundingClientRect());
        }
        canvas.width  = width  * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener("resize", resize);

      // ── render loop ──
      const t0 = startTime ?? performance.now();
      const render = (now: number) => {
        if (destroyed || gl.isContextLost()) return;
        const elapsed = (now - t0) / 1000;
        gl.uniform1f(u.uTime,   elapsed * 0.06);
        gl.uniform1f(u.uScroll, 0.0);

        // Map this canvas into the shared viewport gradient space
        if (fixed) {
          gl.uniform2f(u.uVpOffset, 0.0, 0.0);
          gl.uniform2f(u.uVpScale,  1.0, 1.0);
        } else {
          const rect = canvas.getBoundingClientRect();
          const vpW  = window.innerWidth;
          const vpH  = window.innerHeight;
          const offX =  rect.left / vpW;
          // Flip Y: WebGL origin is bottom-left, CSS origin is top-left
          const offY = (vpH - rect.top - rect.height) / vpH;
          const scX  =  rect.width  / vpW;
          const scY  =  rect.height / vpH;
          gl.uniform2f(u.uVpOffset, offX, offY);
          gl.uniform2f(u.uVpScale,  scX,  scY);
        }

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(render);
      };
      rafId = requestAnimationFrame(render);

      // ── cleanup ──
      return () => {
        window.removeEventListener("resize", resize);
      };
    };

    let cleanupExtra: (() => void) | undefined;
    init().then((fn) => { cleanupExtra = fn; });

    return () => {
      destroyed = true;
      stop();
      cleanupExtra?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
