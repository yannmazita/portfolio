// src/features/projects/components/ProjectsSection.tsx
import { useRef, useState } from "react";
import { useLightning } from "../hooks/useLightning";
import { projectsData } from "../utils/projectsData";

export const ProjectsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const projects = projectsData();
  const [projectIndex, setProjectIndex] = useState(0);
  const perimeterSize = 85;

  const handlePreviousButton = () => {
    setProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };
  const handleNextButton = () => {
    setProjectIndex((prev) => (prev + 1) % projects.length);
  };

  useLightning(canvasRef, {
    perimeterMode: "rectangle",
    perimeterSize: perimeterSize / 100,
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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Container for the image and canvas to ensure perfect alignment */}
      <div className="relative aspect-[16/9] w-full max-w-[1280px]">
        {/* This container scales the image to fit inside the lightning perimeter */}
        <div
          className="absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${perimeterSize}%`,
            height: `${perimeterSize}%`,
          }}
        >
          <img
            src={projects[projectIndex].mediaUrl}
            alt={`${projects[projectIndex].name} timelapse`}
            className="h-full w-full object-cover text-white"
          />
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      <div className="mt-8 flex flex-row gap-x-10">
        <button onClick={handlePreviousButton} className="px-4 py-2 text-white">
          Previous
        </button>
        <button onClick={handleNextButton} className="px-4 py-2 text-white">
          Next
        </button>
      </div>
    </section>
  );
};
