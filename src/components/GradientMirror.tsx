import { useEffect, useRef } from "react";
import { IS_MOBILE, PREFERS_REDUCED_MOTION } from "../utils/deviceCapability";

/**
 * Lightweight mirror of the main WebGL gradient canvas.
 *
 * Instead of running its own WebGL context + shader, it copies the relevant
 * viewport slice from the fixed #gradient-source canvas using 2D drawImage().
 * This is a cheap GPU-to-GPU texture blit — no shader evaluation, no extra
 * WebGL context, minimal memory.
 *
 * Mobile optimizations:
 * - Throttled to 30fps (matching the source canvas)
 * - IntersectionObserver pauses when off-screen
 * - Cached getBoundingClientRect (updated on scroll/resize only)
 * - Reduced-motion: renders once then stops
 */
export default function GradientMirror({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;
    let destroyed = false;
    let visible = true;

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    // Wait for the source canvas to be available
    const getSource = () =>
      document.getElementById("gradient-source") as HTMLCanvasElement | null;

    // ── cached rect — updated on scroll/resize, not per-frame ──
    let cachedRect = canvas.getBoundingClientRect();
    const updateRect = () => {
      cachedRect = canvas.getBoundingClientRect();
    };
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);

    // ── resize canvas to match layout ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.0 : 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      updateRect();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── render loop ──
    const targetInterval = IS_MOBILE ? 1000 / 30 : 0;
    let lastFrameTime = 0;
    let renderedOnce = false;

    const render = (now: number) => {
      if (destroyed) return;
      rafId = requestAnimationFrame(render);

      if (!visible) return;

      // Throttle on mobile
      if (targetInterval > 0 && now - lastFrameTime < targetInterval && renderedOnce)
        return;
      lastFrameTime = now;

      const source = getSource();
      if (!source || source.width === 0 || source.height === 0) return;

      // Map this canvas's viewport position to source canvas pixel coords
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const sx = (cachedRect.left / vpW) * source.width;
      const sy = (cachedRect.top / vpH) * source.height;
      const sw = (cachedRect.width / vpW) * source.width;
      const sh = (cachedRect.height / vpH) * source.height;

      ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      renderedOnce = true;

      // Reduced motion: render one frame and stop
      if (PREFERS_REDUCED_MOTION) {
        stop();
        return;
      }
    };
    rafId = requestAnimationFrame(render);

    // ── IntersectionObserver ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      destroyed = true;
      stop();
      observer.disconnect();
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("resize", resize);
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
