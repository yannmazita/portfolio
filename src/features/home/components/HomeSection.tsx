// src/features/home/components/HomeSection.tsx
import { useEffect, useState } from "react";
import { useBackgroundZoom } from "@/common/hooks/useBackgroundZoom";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";
import { Meta } from "@/common/components/Meta";
import { useResponsiveLaptop } from "@/common/hooks/useResponsiveBackground";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Hello, friend.",
];

export const HomeSection: React.FC = () => {
  const laptopImage = useResponsiveLaptop();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // Laptop zoom animation
  const { zoomScale, isAnimationComplete, showContent, zoomStyle } =
    useBackgroundZoom({
      duration: 3500,
      targetZoomScale: 15,
      transformOrigin: `${laptopImage.screenPosition.x} ${laptopImage.screenPosition.y}`,
      fadeDelay: 300,
      onComplete: () => {
        // Start the typing animation after laptop reveal completes
        setStartTyping(true);
      },
    });

  // Terminal typing animation - only starts after laptop animation
  const { displayLines, isComplete } = useTypewriter(
    startTyping ? TYPING_SEQUENCE : [],
    {
      speed: 30,
      lineDelay: 100,
    },
  );

  // Preload laptop image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = laptopImage.src;
  }, [laptopImage.src]);

  return (
    <>
      <Meta title="Home" description="Yann Mazita - Portfolio" />

      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Laptop zoom animation layer */}
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

        {/* Terminal and SystemStats content */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {showContent && (
            <div className="mb-16 flex flex-col items-center justify-center px-8">
              <Terminal lines={displayLines} isComplete={isComplete} />
              {isComplete && (
                <SystemStats startAnimations={isComplete} className="mt-12" />
              )}
            </div>
          )}
        </div>

        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="animate-pulse text-sm text-white/60">
              Loading...
            </div>
          </div>
        )}
      </section>
    </>
  );
};
