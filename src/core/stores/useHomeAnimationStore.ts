// src/core/stores/useHomeAnimationStore.ts
import { create } from "zustand";

interface HomeAnimationState {
  isZoomComplete: boolean;
  setIsZoomComplete: (isComplete: boolean) => void;
}

export const useHomeAnimationStore = create<HomeAnimationState>((set) => ({
  isZoomComplete: false,
  setIsZoomComplete: (isComplete) => set({ isZoomComplete: isComplete }),
}));