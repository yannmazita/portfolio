// src/common/hooks/useScrollSpy.ts
import { useEffect, useRef } from "react";
import { navigationItems } from "@/common/utils/navigation";

/**
 * Observes DOM sections and updates the active menu item on scroll.
 * @param onIntersect - The callback invoked with the index of the section currently in view.
 * @returns An object with a function to temporarily pause the observer.
 */
export const useScrollSpy = (onIntersect: (index: number) => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Prevent jumping indexes: for ex cur index 1, user clicks on 3
  // index goes 1, 3 (click), 2, then 3 again instead of 1 then 3
  const pauseObserver = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    isPausedRef.current = true;
    pauseTimeoutRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
    }, 1000); // Ignore intersections for 1s after a click
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isPausedRef.current) return; // Do nothing if paused

        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          const activeIndex = navigationItems.findIndex(
            (item) => item.id === intersectingEntry.target.id,
          );
          if (activeIndex !== -1) {
            onIntersect(activeIndex);
          }
        }
      },
      {
        threshold: 0.5,
      },
    );

    const observer = observerRef.current;

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [onIntersect]);

  return { pauseObserver };
};
