import { IS_MOBILE, PREFERS_REDUCED_MOTION } from "./deviceCapability";

/**
 * Shared gradient sampler.
 *
 * Periodically captures a low-res snapshot of the #gradient-source WebGL
 * canvas and distributes it as a JPEG data URL to subscribed DOM elements.
 * Subscribers use it as a CSS `background-image` with `background-clip: text`
 * to get the live WebGL gradient rendered through text shapes.
 *
 * One RAF loop serves all subscribers — no per-element canvas overhead.
 */

const SAMPLE_SIZE = 64;
const INTERVAL = IS_MOBILE ? 100 : 66; // ~15fps desktop, ~10fps mobile

type Subscriber = (url: string) => void;

const subs = new Set<Subscriber>();
let running = false;
let offscreen: HTMLCanvasElement | null = null;
let offCtx: CanvasRenderingContext2D | null = null;

function ensureOffscreen() {
  if (!offscreen) {
    offscreen = document.createElement("canvas");
    offscreen.width = SAMPLE_SIZE;
    offscreen.height = SAMPLE_SIZE;
    offCtx = offscreen.getContext("2d", { willReadFrequently: true });
  }
}

function startLoop() {
  if (running) return;
  running = true;
  ensureOffscreen();

  let lastUpdate = 0;

  function tick(now: number) {
    if (!running || subs.size === 0) {
      running = false;
      return;
    }

    requestAnimationFrame(tick);

    if (now - lastUpdate < INTERVAL) return;
    lastUpdate = now;

    const source = document.getElementById("gradient-source") as HTMLCanvasElement | null;
    if (!source || source.width === 0 || !offCtx) return;

    offCtx.drawImage(source, 0, 0, source.width, source.height, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const url = offscreen!.toDataURL("image/jpeg", 0.5);
    subs.forEach((fn) => fn(url));

    if (PREFERS_REDUCED_MOTION) {
      running = false;
    }
  }

  requestAnimationFrame(tick);
}

export function subscribe(fn: Subscriber): () => void {
  subs.add(fn);
  startLoop();
  return () => {
    subs.delete(fn);
    if (subs.size === 0) running = false;
  };
}
