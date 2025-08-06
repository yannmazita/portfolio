// src/features/home/components/CpuStats.tsx
import { ProgressBar } from "@/features/home/components/SystemStats/ProgressBar";
import { CPU_CORES } from "@/features/home/utils/stats-data";
import { TypedText } from "@/features/home/components/SystemStats/TypedText";

/**
 * @interface CpuStatsProps
 * @field usages - Array of percentages, one for each core
 * @field startTyping - When true, the typing animation will begin.
 */
interface CpuStatsProps {
  usages: number[];
  startTyping: boolean;
}

export const CpuStats: React.FC<CpuStatsProps> = ({ usages, startTyping }) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-1 px-2 sm:grid-cols-2">
      {CPU_CORES.map((core, index) => (
        <div key={core.id} className="flex items-center gap-2 text-sm">
          <span className="w-6 shrink-0 text-right text-white/70">
            {core.id}
          </span>
          <div className="flex-1">
            <ProgressBar value={usages[index] ?? 0} />
          </div>
          <span className="text-portfolio-secondary w-20 shrink-0 text-left font-mono">
            <TypedText
              text={`[${core.name}]`}
              start={startTyping}
              startDelay={index * 200}
            />
          </span>
          <span className="w-12 shrink-0 text-right text-white">
            {(usages[index] ?? 0).toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};
