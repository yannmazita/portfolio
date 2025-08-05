// src/features/home/hooks/useReponsiveBackground.ts
import { useEffect, useState } from "react";
import { getAssetUrl } from "@/common/utils/assets";

interface LaptopImageData {
  src: string;
  width: number;
  screenPosition: { x: string; y: string };
}

// Based on: screen center at (2806.5, 7041.5) in 5632×14393 canvas
const laptopImages: LaptopImageData[] = [
  {
    src: getAssetUrl("images/laptop_375px_wide.webp"),
    width: 375,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_430px_wide.webp"),
    width: 430,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_768px_wide.webp"),
    width: 768,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_1024px_wide.webp"),
    width: 1024,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_1920px_wide.webp"),
    width: 1920,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_2560px_wide.webp"),
    width: 2560,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
  {
    src: getAssetUrl("images/laptop_3840px_wide.webp"),
    width: 3840,
    screenPosition: { x: "49.83%", y: "48.93%" },
  },
];

export const useResponsiveLaptop = () => {
  const [selectedImage, setSelectedImage] = useState<LaptopImageData>(
    laptopImages[0],
  );

  useEffect(() => {
    const updateImage = () => {
      const viewportWidth = window.innerWidth;

      // Find the largest image that is <= viewport width (closest lower width)
      // If no image is smaller than viewport, use the smallest available
      const appropriate =
        laptopImages
          .filter((img) => img.width <= viewportWidth)
          .sort((a, b) => b.width - a.width)[0] || laptopImages[0];

      setSelectedImage(appropriate);
    };

    updateImage();
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

  return selectedImage;
};
