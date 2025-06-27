// src/features/projects/components/ProjectsSection.tsx
import { useRef } from "react";
import { useLightning } from "../hooks/useLightning";

export const ProjectsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLightning(canvasRef, {
    perimeterMode: "rectangle",
    perimeterSize: (w, h) => {
      return {
        width: w / 2,
        height: h / 2,
      };
    },
    perimeterBidirectional: true,

    minDelay: 5,
    maxDelay: 50,

    minCreateCount: 1,
    maxCreateCount: 1,

    minPathLength: 80,
    maxPathLength: 120,

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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </section>
  );
};
