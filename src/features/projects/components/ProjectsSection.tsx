// src/features/projects/components/ProjectsSection.tsx
import { useRef } from "react";
import { useLightning } from "../hooks/useLightning";
import { random } from "@/common/utils/math";

export const ProjectsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLightning(canvasRef, {
    minCreateCount: 10,
    maxCreateCount: 30,
    trailLength: 30,
    minLineWidth: 1,
    maxLineWidth: 15,
    startPosition: (w, h) => ({
      x: w / 2 + random(-w / 10, w / 10),
      y: h / 2 + h / 7,
    }),
    startVelocity: () => ({
      vx: random(-1, 1),
      vy: 1,
    }),
  });

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase md:text-7xl lg:text-8xl">
        Projects
      </h1>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </section>
  );
};
