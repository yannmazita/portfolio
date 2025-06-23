import { useLiveStats } from "../hooks/useLiveStats";
import { CpuStats } from "./CpuStats";
import { MemoryStats } from "./MemoryStats";
import { ProcessList } from "./ProcessList";
import { SystemStatsHeader } from "./SystemStatsHeader";

export const SystemStats: React.FC = () => {
  const { cpuUsages, memoryUsage, swapUsage } = useLiveStats();

  return (
    <div className="clip-bl border-portfolio-primary max-w-2xl border bg-black/30 font-mono sm:p-4">
      <SystemStatsHeader />
      <div className="mb-4 h-px bg-white/10"></div>
      <CpuStats usages={cpuUsages} />
      <div className="my-4 h-px bg-white/10"></div>
      <MemoryStats memory={memoryUsage} swap={swapUsage} />
      <div className="my-4 h-px bg-white/10"></div>
      <ProcessList />
    </div>
  );
};
