// Evaluated once at module load — same values for every import.
// Pass these to every GradientCanvas instance to keep all gradients in sync.
export const GRADIENT_SEED       = Math.random() * 1000;
export const GRADIENT_START_TIME = performance.now();
