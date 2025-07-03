// src/common/utils/math.ts

export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const jitter = (
  value: number,
  min: number,
  max: number,
  variation: number,
) => Math.max(min, Math.min(max, value + random(-variation, variation)));
