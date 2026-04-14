import { useEffect, useRef, useState } from "react";
import { IS_MOBILE, PREFERS_REDUCED_MOTION } from "../utils/deviceCapability";

const CSS_GRADIENT = "linear-gradient(135deg, #ff0cf0 0%, #ffb103 50%, #00b5fc 100%)";

/**
 * Animated WebGL gradient background.
 * Loads vertex + fragment shaders from /gradient.vert and /gradient.frag.
 *
 * All instances share the same gradient space via uViewportUvOffset +
 * uViewportUvScale uniforms, computed from the canvas's viewport position
 * each frame. The fixed canvas uses offset=(0,0) scale=(1,1). Local canvases
 * compute their slice from getBoundingClientRect(), so every instance is a
 * window into the same gradient — truly one gradient, masked in different areas.
 *
 * Mobile optimizations:
 * - DPR capped at 1.0 (vs 2.0 on desktop)
 * - RAF throttled to 30fps
 * - Reduced noise iterations (2 vs 6)
 * - Grain effect disabled
 * - IntersectionObserver pauses off-screen non-fixed canvases
 * - getBoundingClientRect cached (updated on scroll/resize only)
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
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctxOpts = {
      alpha: false,
      antialias: false,
      // preserveDrawingBuffer is needed when other canvases read from this one
      // via drawImage(). Without it the backbuffer may be cleared after compositing.
      preserveDrawingBuffer: fixed,
    };
    // Try WebGL2 first (better ANGLE/Windows compatibility), fall back to WebGL1
    const gl =
      (canvas.getContext("webgl2", ctxOpts) as WebGLRenderingContext | null) ??
      canvas.getContext("webgl", ctxOpts);
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    let rafId: number | null = null;
    let destroyed = false;
    let visible = true; // IntersectionObserver state

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    // Handle GPU context loss/restore
    const handleContextLost = (e: Event) => {
      e.preventDefault(); // signal browser we want a restore
      stop(); // pause RAF but don't set destroyed — allow restart
    };
    const handleContextRestored = () => {
      // Re-initialize shaders/buffers (GPU state is gone after context loss)
      init().then((fn) => { cleanupExtra = fn; });
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    const init = async () => {
      const [vertSrc, fragSrc] = await Promise.all([
        fetch("/gradient.vert").then((r) => r.text()),
        fetch("/gradient.frag").then((r) => r.text()),
      ]);

      if (destroyed) return;

      // ── helpers ──
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.error("Shader compile error:", gl.getShaderInfoLog(s));
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compile(gl.VERTEX_SHADER, vertSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) { setWebglFailed(true); return; }

      const prog = gl.createProgram();
      if (!prog) { setWebglFailed(true); return; }
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(prog));
        setWebglFailed(true);
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
        uGrain:     gl.getUniformLocation(prog, "uGrain"),
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
      gl.uniform1f(u.uIter,      IS_MOBILE ? 2.0 : 6.0);
      gl.uniform1f(u.uIntensity, 0.15);
      gl.uniform1f(u.uGrain,     IS_MOBILE ? 0.0 : 1.0);
      gl.disable(gl.DEPTH_TEST);

      // ── resize ──
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.0 : 2);
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

      // ── cached rect for non-fixed canvases ──
      let cachedRect = canvas.getBoundingClientRect();
      const updateCachedRect = () => {
        cachedRect = canvas.getBoundingClientRect();
      };
      if (!fixed) {
        window.addEventListener("scroll", updateCachedRect, { passive: true });
        window.addEventListener("resize", updateCachedRect);
      }

      // ── render loop ──
      const t0 = startTime ?? performance.now();
      const targetInterval = IS_MOBILE ? 1000 / 30 : 0; // 30fps on mobile
      let lastFrameTime = 0;
      let renderedOnce = false;

      const render = (now: number) => {
        if (destroyed) return;

        // If context was lost, don't render but keep the loop alive
        // so it can resume when the context is restored
        if (gl.isContextLost()) {
          rafId = requestAnimationFrame(render);
          return;
        }

        // Schedule next frame first
        rafId = requestAnimationFrame(render);

        // Skip if not visible (non-fixed canvases)
        if (!visible && !fixed) return;

        // Throttle on mobile
        if (targetInterval > 0 && now - lastFrameTime < targetInterval && renderedOnce) return;
        lastFrameTime = now;
        renderedOnce = true;

        const elapsed = (now - t0) / 1000;
        gl.uniform1f(u.uTime,   elapsed * 0.06);
        gl.uniform1f(u.uScroll, 0.0);

        // Map this canvas into the shared viewport gradient space
        if (fixed) {
          gl.uniform2f(u.uVpOffset, 0.0, 0.0);
          gl.uniform2f(u.uVpScale,  1.0, 1.0);
        } else {
          const rect = cachedRect;
          const vpW  = window.innerWidth;
          const vpH  = window.innerHeight;
          const offX =  rect.left / vpW;
          const offY = (vpH - rect.top - rect.height) / vpH;
          const scX  =  rect.width  / vpW;
          const scY  =  rect.height / vpH;
          gl.uniform2f(u.uVpOffset, offX, offY);
          gl.uniform2f(u.uVpScale,  scX,  scY);
        }

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // If reduced motion, render one frame and stop
        if (PREFERS_REDUCED_MOTION) {
          stop();
          return;
        }
      };
      rafId = requestAnimationFrame(render);

      // ── IntersectionObserver for non-fixed canvases ──
      let observer: IntersectionObserver | undefined;
      if (!fixed) {
        observer = new IntersectionObserver(
          ([entry]) => { visible = entry.isIntersecting; },
          { threshold: 0 }
        );
        observer.observe(canvas);
      }

      // ── Restart render loop when tab becomes visible again ──
      // Browsers pause RAF for backgrounded tabs. When the user returns,
      // the loop may be dead. This kicks it back to life.
      const handleVisibility = () => {
        if (document.visibilityState === "visible" && !destroyed && rafId === null) {
          rafId = requestAnimationFrame(render);
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      // ── cleanup ──
      return () => {
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", handleVisibility);
        if (!fixed) {
          window.removeEventListener("scroll", updateCachedRect);
          window.removeEventListener("resize", updateCachedRect);
        }
        observer?.disconnect();
      };
    };

    let cleanupExtra: (() => void) | undefined;
    init().then((fn) => { cleanupExtra = fn; });

    return () => {
      destroyed = true;
      stop();
      cleanupExtra?.();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, []);

  return (
    <>
      {webglFailed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: CSS_GRADIENT,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        id={fixed ? "gradient-source" : undefined}
        className={className}
        style={{
          display: webglFailed ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
}
