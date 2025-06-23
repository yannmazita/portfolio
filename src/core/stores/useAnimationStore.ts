// src/core/stores/useAnimationStore.ts
import { create } from "zustand";

/**
 * This store manages the choreography of the initial mount animation.
 * It determines when different parts of the UI should start animating.
 *
 * - The `delays` in `triggerMountAnimation` are JavaScript `setTimeout` values.
 *   They act as a director, telling components when to begin their entrance.
 *
 * - The actual animation *speed* and *style* (ex: "fade in over 500ms")
 *   are defined in the components' CSS classes (ex: `duration-500`).
 *
 * This separation allows us to orchestrate a complex sequence from one
 * central place while keeping the animation styling co-located with the
 * components themselves.
 */

interface AnimationState {
  /** Controls the animation state for the main header/status bar. */
  topMounted: boolean;
  /** Controls the animation state for the navigation buttons. */
  sidesMounted: boolean;
  /** Controls the animation state for the primary text content (like in the Home section). */
  textMounted: boolean;
  /**
   * Triggers the staggered mount animation sequence.
   * Call this once from a `useEffect` in the main layout component.
   * @param delays - Optional overrides for the default animation start times.
   */
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
    // Default delays for the animation sequence.
    delays = { topDelay: 100, sidesDelay: 800, textDelay: 500 },
  ) => {
    // Prevent animations from re-triggering on hot-reloads in dev mode.
    if (useAnimationStore.getState().topMounted) return;

    setTimeout(() => set({ topMounted: true }), delays.topDelay);
    setTimeout(() => set({ sidesMounted: true }), delays.sidesDelay);
    setTimeout(() => set({ textMounted: true }), delays.textDelay);
  },
}));
