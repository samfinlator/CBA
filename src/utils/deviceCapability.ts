// Evaluated once at module load — same values for every import.

export const IS_MOBILE: boolean = (() => {
  if (typeof navigator === "undefined") return false;
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    ("ontouchstart" in window && navigator.maxTouchPoints > 0)
  );
})();

export const PREFERS_REDUCED_MOTION: boolean = (() => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
})();
