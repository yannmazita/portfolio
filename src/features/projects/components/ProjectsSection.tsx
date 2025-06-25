// src/features/projects/components/ProjectsSection.tsx
import { useRef } from "react";
import { useLightning } from "../hooks/useLightning";

export const ProjectsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLightning(canvasRef, { minCreateCount: 10, maxCreateCount: 30 });

  return (
    <section
      id="projects"
      className="flex min-h-screen items-center justify-center"
    >
      {/*
      <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase md:text-7xl lg:text-8xl">
        Projects
      </h1>
      */}
      <canvas ref={canvasRef} className="inset-0" />
    </section>
  );
};
