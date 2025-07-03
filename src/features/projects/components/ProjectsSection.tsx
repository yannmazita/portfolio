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
    <section className="relative flex flex-col items-center justify-center overflow-hidden">
      {/* Project name */}
      <h1 className="flex justify-center font-mono text-xl font-bold text-white">
        {projects[projectIndex].name}
      </h1>

      {/* Project link */}
      <a
        href={projects[projectIndex].projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-portfolio-primary mt-2 flex justify-center font-mono text-xs font-light hover:underline md:text-xl"
      >
        {projects[projectIndex].projectLink}
      </a>

      {/* Container for the image and canvas to ensure perfect alignment */}
      <div className="relative mt-8 aspect-[16/9] w-full max-w-[1024px] md:mt-0">
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

      {/* Short description */}
      <div className="flex min-h-20 flex-col justify-center text-center font-mono text-white">
        {projects[projectIndex].shortDescription}
      </div>

      {/* Tech stack */}
      <div className="min-h-16 font-mono font-bold text-white">
        {projects[projectIndex].techStack &&
          projects[projectIndex].techStack.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2 py-1">
              {projects[projectIndex].techStack.map((stack, index) => (
                <span
                  key={index}
                  className="bg-cyan-800/50 px-2 py-0.5 text-xs text-cyan-200"
                >
                  {stack}
                </span>
              ))}
            </div>
          )}
      </div>

      {/* Longer Description */}
      <div className="flex min-h-24 flex-col justify-center text-center font-mono text-sm text-white md:text-lg">
        {projects[projectIndex].description}
      </div>

      {/* Project navigation */}
      <div className="mt-2 flex flex-row gap-x-10">
        <button
          onClick={handlePreviousButton}
          className="active:text-portfolio-primary hover:text-portfolio-secondary px-4 py-2 font-mono font-bold text-white hover:underline active:underline"
        >
          Previous
        </button>
        <button
          onClick={handleNextButton}
          className="active:text-portfolio-primary hover:text-portfolio-secondary px-4 py-2 font-mono font-bold text-white hover:underline active:underline"
        >
          Next
        </button>
      </div>
    </section>
  );
};
