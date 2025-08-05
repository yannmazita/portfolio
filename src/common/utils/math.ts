// src/common/utils/math.ts
export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const jitter = (
  value: number,
  min: number,
  max: number,
  variation: number,
) => Math.max(min, Math.min(max, value + random(-variation, variation)));

export const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};
