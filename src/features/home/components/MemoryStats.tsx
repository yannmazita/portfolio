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

interface MemoryStatRowProps {
  label: string;
  stat: Stat;
}

const formatBytes = (megabytes: number) => {
  if (megabytes < 1024) {
    return `${megabytes.toFixed(0)}MB`;
  }
  return `${(megabytes / 1024).toFixed(2)}GB`;
};

const MemoryStatRow: React.FC<MemoryStatRowProps> = ({ label, stat }) => (
  <div className="flex min-h-10 items-center gap-2 px-4 text-sm">
    <span className="w-12 shrink-0 text-left text-white/70">{label}</span>
    <div className="flex-1">
      <ProgressBar value={stat.percent} />
    </div>
    <span className="w-28 shrink-0 text-right font-mono text-white">
      {formatBytes(stat.used)} / {formatBytes(stat.total)}
    </span>
  </div>
);

export const MemoryStats: React.FC<MemoryStatsProps> = ({ memory, swap }) => {
  return (
    <div className="space-y-1">
      <MemoryStatRow label="Mem" stat={memory} />
      <MemoryStatRow label="Swp" stat={swap} />
    </div>
  );
};
