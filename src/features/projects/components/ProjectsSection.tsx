// src/features/projects/components/ProjectsSection.tsx
import { useRef } from "react";
import { useLightning } from "../hooks/useLightning";

export const ProjectsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLightning(canvasRef, {
    perimeterMode: "rectangle",
    perimeterSize: 0.85,
    perimeterAspectRatio: 16 / 9,
    perimeterBidirectional: true,

    minDelay: 5,
    maxDelay: 50,

    minCreateCount: 1,
    maxCreateCount: 1,

    minPathLength: (canvasWidth) => {
      return canvasWidth > 1000 ? 80 : 40;
    },
    maxPathLength: (canvasWidth) => {
      return canvasWidth > 1000 ? 120 : 50;
    },

    minSpeed: 15,
    maxSpeed: 25,

    minLineWidth: 2,
    maxLineWidth: 3,
    trailLength: 30,
    blur: 20,
    blurColor: "rgba(120, 180, 255, 0.8)",
    strokeColor: "rgba(220, 235, 255, 1)",
  });

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute bottom-32 left-1/2 h-full w-full max-w-[1280px] -translate-x-1/2"
      />
    </section>
  );
};
