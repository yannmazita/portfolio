import { cn } from "@/common/shadcn/lib/utils";
import { useLiveStats } from "../hooks/useLiveStats";
import { CpuStats } from "./CpuStats";
import { MemoryStats } from "./MemoryStats";
import { ProcessList } from "./ProcessList";
import { SystemStatsHeader } from "./SystemStatsHeader";

interface SystemStatsProps {
  className?: string;
  startAnimations: boolean;
}

export const SystemStats: React.FC<SystemStatsProps> = ({
  className,
  startAnimations,
}) => {
  const { cpuUsages, memoryUsage, swapUsage } = useLiveStats();

  return (
    <div
      className={cn(
        "clip-bl border-portfolio-primary max-w-2xl border bg-black/30 font-mono sm:p-4",
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
    </div>
  );
};
