import { cn } from "@/common/shadcn/lib/utils";
import { useLiveStats } from "../hooks/useLiveStats";
import { CpuStats } from "./CpuStats";
import { MemoryStats } from "./MemoryStats";
import { ProcessList } from "./ProcessList";
import { SystemStatsHeader } from "./SystemStatsHeader";
import { useLightning } from "@/features/projects/hooks/useLightning";
import { useRef } from "react";

interface SystemStatsProps {
  className?: string;
  startAnimations: boolean;
}

export const SystemStats: React.FC<SystemStatsProps> = ({
  className,
  startAnimations,
}) => {
  const { cpuUsages, memoryUsage, swapUsage } = useLiveStats();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLightning(canvasRef, {
    perimeterMode: "rectangle",
    perimeterSize: (w, h) => {
      return { width: w, height: h };
    },
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
    <div
      className={cn(
        "relative max-w-2xl bg-black/30 font-mono sm:p-4",
        className,
      )}
    >
      <SystemStatsHeader />
      <div className="mb-4 h-px bg-white/10"></div>
      <CpuStats usages={cpuUsages} startTyping={startAnimations} />
      <div className="my-4 h-px bg-white/10"></div>
      <MemoryStats memory={memoryUsage} swap={swapUsage} />
      <div className="my-4 h-px bg-white/10"></div>
      <ProcessList startTyping={startAnimations} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
