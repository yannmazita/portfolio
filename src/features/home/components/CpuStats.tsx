// src/features/home/components/CpuStats.tsx
import { ProgressBar } from "./ProgressBar";
import { CPU_CORES } from "../utils/stats-data";

interface CpuStatsProps {
  usages: number[]; // Array of percentages, one for each core
}

export const CpuStats: React.FC<CpuStatsProps> = ({ usages }) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
      {CPU_CORES.map((core, index) => (
        <div key={core.id} className="flex items-center gap-2 text-sm">
          <span className="w-4 text-right text-white/70">{core.id}</span>
          <div className="flex-1">
            <ProgressBar value={usages[index] ?? 0} />
          </div>
          <span className="text-portfolio-secondary w-16 text-left font-mono">
            [{core.name}]
          </span>
          <span className="w-12 text-right text-white">
            {(usages[index] ?? 0).toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};
