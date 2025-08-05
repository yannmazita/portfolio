// src/common/components/Layout/HomePageBackground.tsx
import { useEffect, useState } from "react";
import { useBackgroundZoom } from "@/features/home/hooks/useBackgroundZoom";
import { useResponsiveLaptop } from "@/common/hooks/useResponsiveBackground";
import { useHomeAnimationStore } from "@/core/stores/useHomeAnimationStore";

export const HomePageBackground: React.FC = () => {
  const laptopImage = useResponsiveLaptop();
  const [imageLoaded, setImageLoaded] = useState(false);
  const setIsZoomComplete = useHomeAnimationStore(
    (state) => state.setIsZoomComplete,
  );

  // Laptop zoom animation
  const { isAnimationComplete, zoomStyle } = useBackgroundZoom({
    duration: 3500,
    targetZoomScale: 15,
    transformOrigin: `${laptopImage.screenPosition.x} ${laptopImage.screenPosition.y}`,
    fadeDelay: 300,
    onComplete: () => setIsZoomComplete(true),
  });

  // Preload laptop image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = laptopImage.src;
  }, [laptopImage.src]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {imageLoaded && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isAnimationComplete ? "opacity-0" : "opacity-100"
          }`}
          style={zoomStyle}
        >
          <img
            src={laptopImage.src}
            alt="Laptop opening portal"
            className="h-auto w-full max-w-none object-cover object-center"
            style={{
              minHeight: "100vh",
              objectPosition: "center center",
            }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};
