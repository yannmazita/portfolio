// src/features/resume/components/ResumeEntryCard.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { ResumeEntry } from "../types";

interface ResumeEntryCardProps {
  entry: ResumeEntry;
  className?: string;
  style?: React.CSSProperties;
}

export const ResumeEntryCard: React.FC<ResumeEntryCardProps> = ({
  entry,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "clip-bl border border-white/20 bg-black/30 p-4 font-mono text-white",
        className,
      )}
      style={style}
    >
      {/* Header */}
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h3 className="text-portfolio-secondary text-lg font-bold">
          {entry.company}
        </h3>
        <p className="text-sm text-white/70 sm:text-right">{entry.period}</p>
      </div>
      <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
        <h4 className="font-semibold text-white">{entry.role}</h4>
        <p className="text-sm text-white/70 sm:text-right">{entry.location}</p>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-white/10"></div>

      {/* Description */}
      <ul className="space-y-2 text-sm text-white/90">
        {entry.description.map((point, index) => (
          <li key={index} className="flex">
            <span className="text-portfolio-primary mr-2">{">"}</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
