// src/features/home/components/HomeSection.tsx
import { useEffect, useState } from "react";
import { useBackgroundZoom } from "@/common/hooks/useBackgroundZoom";
import { useTypewriter } from "@/features/home/hooks/useTypewriter";
import { Terminal } from "@/features/home/components/Terminal";
import { SystemStats } from "@/features/home/components/SystemStats/SystemStats";
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

      <section className="relative h-full w-full overflow-hidden"></section>
    </>
  );
};
