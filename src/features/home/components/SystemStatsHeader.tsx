// src/features/home/components/SystemStatsHeader.tsx
import { useState, useEffect } from "react";
import { cn } from "@/common/shadcn/lib/utils";

interface SystemStatsHeaderProps {
  className?: string;
}

// Helper to format seconds into HH:MM:SS
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const SystemStatsHeader: React.FC<SystemStatsHeaderProps> = ({
  className,
}) => {
  // Start uptime from a random-ish high number to look "authentic"
  const [uptime, setUptime] = useState(3 * 24 * 3600 + 14 * 3600 + 25 * 60); // 3d 14h 25m

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prevUptime) => prevUptime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "flex items-baseline justify-between p-2 text-sm text-white/90",
        className,
      )}
    >
      <h2 className="text-lg font-bold text-white">SYSTEM STATUS</h2>
      <span>
        Uptime:{" "}
        <span className="text-portfolio-secondary font-semibold">
          {formatTime(uptime)}
        </span>
      </span>
    </div>
  );
};
