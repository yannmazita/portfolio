// src/features/home/hooks/useBackgroundZoom.ts
import { easingFunctions } from "@/common/utils/math";
import { useEffect, useState, useRef } from "react";

export interface BackgroundZoomOptions {
  duration?: number;
  targetZoomScale?: number;
  transformOrigin?: string;
  fadeDelay?: number;
  onComplete?: () => void;
  easing?: (t: number) => number;
}

export const useBackgroundZoom = (options: BackgroundZoomOptions = {}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const animationRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);

  const {
    duration = 3000, // 3 seconds
    targetZoomScale = 5,
    transformOrigin = "center center",
    fadeDelay = 200,
    onComplete,
    easing = easingFunctions.easeOut,
  } = options;

  useEffect(() => {
    if (isAnimationComplete) return;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - (startTimeRef.current ?? 0);
      const progress = Math.min(elapsed / duration, 1); // Clamp to 1

      // Apply easing to progress
      const easedProgress = easing(progress);

      const currentScale = 1 + (targetZoomScale - 1) * easedProgress;
      setZoomScale(currentScale);

      if (progress >= 1) {
        // we're done
        setZoomScale(targetZoomScale);
        setIsAnimationComplete(true);

        // Delay content fade-in
        setTimeout(() => {
          setShowContent(true);
          onComplete?.();
        }, fadeDelay);
      } else {
        // Continue animation
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    duration,
    targetZoomScale,
    easing,
    fadeDelay,
    onComplete,
    isAnimationComplete,
  ]);

  // Reset function to restart animation
  const resetAnimation = () => {
    setZoomScale(1);
    setIsAnimationComplete(false);
    setShowContent(false);
    startTimeRef.current = null;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return {
    zoomScale,
    isAnimationComplete,
    showContent,
    resetAnimation,
    zoomStyle: {
      transform: `scale(${zoomScale})`,
      transformOrigin,
      willChange: "transform",
    },
  };
};
