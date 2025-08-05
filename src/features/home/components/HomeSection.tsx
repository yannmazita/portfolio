// src/features/home/components/HomeSection.tsx
import { useEffect, useState } from "react";
import { useBackgroundZoom } from "../hooks/useBackgroundZoom";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";
import { Meta } from "@/common/components/Meta";
import { getAssetUrl } from "@/common/utils/assets";

interface LaptopImageData {
  src: string;
  width: number;
  screenPosition: { x: string; y: string };
}

// these ratios are incorrect and for testing
const laptopImages: LaptopImageData[] = [
  {
    src: getAssetUrl("images/laptop_375px_wide.webp"),
    width: 375,
    screenPosition: { x: "52%", y: "42%" },
  },
  {
    src: getAssetUrl("images/laptop_430px_wide.webp"),
    width: 430,
    screenPosition: { x: "52.1%", y: "41.8%" },
  },
  {
    src: getAssetUrl("images/laptop_768px_wide.webp"),
    width: 768,
    screenPosition: { x: "52.3%", y: "41.7%" },
  },
  {
    src: getAssetUrl("images/laptop_1024px_wide.webp"),
    width: 1024,
    screenPosition: { x: "52.2%", y: "41.9%" },
  },
  {
    src: getAssetUrl("images/laptop_1920px_wide.webp"),
    width: 1920,
    screenPosition: { x: "50%", y: "50%" },
  },
  {
    src: getAssetUrl("images/laptop_2560px_wide.webp"),
    width: 2560,
    screenPosition: { x: "52.2%", y: "41.9%" },
  },
  {
    src: getAssetUrl("images/laptop_3840px_wide.webp"),
    width: 3840,
    screenPosition: { x: "52.2%", y: "41.9%" },
  },
];

const useResponsiveLaptop = () => {
  const [selectedImage, setSelectedImage] = useState<LaptopImageData>(
    laptopImages[0],
  );

  useEffect(() => {
    const updateImage = () => {
      const containerWidth = window.innerWidth;

      const appropriate =
        laptopImages
          .filter((img) => img.width >= containerWidth)
          .sort((a, b) => a.width - b.width)[0] ||
        laptopImages[laptopImages.length - 1];

      setSelectedImage(appropriate);
    };

    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return selectedImage;
};

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
      targetZoomScale: 20,
      transformOrigin: `${laptopImage.screenPosition.x} ${laptopImage.screenPosition.y}`,
      fadeDelay: 0,
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
    console.log(img.src);
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
              className="h-full w-auto max-w-none object-contain"
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
