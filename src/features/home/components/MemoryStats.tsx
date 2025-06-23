// src/features/home/components/MemoryStats.tsx
import { ProgressBar } from "./ProgressBar";

interface Stat {
  used: number;
  total: number;
  percent: number;
}

interface MemoryStatsProps {
  memory: Stat;
  swap: Stat;
}

const formatBytes = (megabytes: number) => {
  if (megabytes < 1024) {
    return `${megabytes.toFixed(0)}MB`;
  }
  return `${(megabytes / 1024).toFixed(2)}GB`;
};

export const MemoryStats: React.FC<MemoryStatsProps> = ({ memory, swap }) => {
  return (
    <div className="space-y-1">
      {/* Memory */}
      <div className="flex items-center gap-2 text-sm">
        <span className="w-12 text-left text-white/70">Mem</span>
        <div className="flex-1">
          <ProgressBar value={memory.percent} />
        </div>
        <span className="w-32 text-right font-mono text-white">
          {formatBytes(memory.used)} / {formatBytes(memory.total)}
        </span>
      </div>
      {/* Swap */}
      <div className="flex items-center gap-2 text-sm">
        <span className="w-12 text-left text-white/70">Swp</span>
        <div className="flex-1">
          <ProgressBar value={swap.percent} />
        </div>
        <span className="w-32 text-right font-mono text-white">
          {formatBytes(swap.used)} / {formatBytes(swap.total)}
        </span>
      </div>
    </div>
  );
};
