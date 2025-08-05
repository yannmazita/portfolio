// src/core/stores/useAnimationStore.ts
import { create } from "zustand";

interface AnimationState {
  topMounted: boolean;
  sidesMounted: boolean;
  textMounted: boolean;
  triggerMountAnimation: (delays?: {
    topDelay?: number;
    sidesDelay?: number;
    textDelay?: number;
  }) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  topMounted: false,
  sidesMounted: false,
  textMounted: false,

  triggerMountAnimation: (
    delays = { topDelay: 100, sidesDelay: 800, textDelay: 500 },
  ) => {
    setTimeout(() => set({ topMounted: true }), delays.topDelay);
    setTimeout(() => set({ sidesMounted: true }), delays.sidesDelay);
    setTimeout(() => set({ textMounted: true }), delays.textDelay);
  },
}));
