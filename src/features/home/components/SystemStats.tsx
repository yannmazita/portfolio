// src/features/home/components/SystemStats.tsx
import { useLiveStats } from "../hooks/useLiveStats";
import { CpuStats } from "./CpuStats";
import { MemoryStats } from "./MemoryStats";
import { ProcessList } from "./ProcessList";
import { SystemStatsHeader } from "./SystemStatsHeader";

export const SystemStats: React.FC = () => {
  const { cpuUsages, memoryUsage, swapUsage } = useLiveStats();

  return (
    <div className="w-full max-w-2xl rounded-lg border border-white/20 bg-black/30 p-4 font-mono shadow-lg backdrop-blur-sm">
      <SystemStatsHeader />
      <div className="my-4 h-px bg-white/10" />
      <CpuStats usages={cpuUsages} />
      <div className="my-4 h-px bg-white/10" />
      <MemoryStats memory={memoryUsage} swap={swapUsage} />
      <div className="my-4 h-px bg-white/10" />
      <ProcessList />
    </div>
  );
};
