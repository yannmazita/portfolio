// src/features/home/components/ProgressBar.tsx
import { cn } from "@/common/shadcn/lib/utils";

interface ProgressBarProps {
  value: number; // Percentage from 0 to 100
  className?: string;
  barColor?: string; // TailwindCSS class
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  barColor,
}) => {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn(
        "h-2.5 w-full border border-white/20 bg-black/50 p-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "h-full transition-[width] duration-300 ease-in-out",
          barColor ?? "bg-portfolio-primary",
        )}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
