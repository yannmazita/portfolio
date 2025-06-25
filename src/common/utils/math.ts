// src/common/utils/math.ts

export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
