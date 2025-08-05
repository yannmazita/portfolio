// src/features/home/components/Terminal.tsx
import { cn } from "@/common/shadcn/lib/utils";

interface TerminalProps {
  /** The lines of text to display. */
  lines: string[];
  /** Whether the typing animation is complete. */
  isComplete: boolean;
  className?: string;
}

/**
 * A component that renders text with a terminal-like appearance.
 */
export const Terminal: React.FC<TerminalProps> = ({
  lines,
  isComplete,
  className,
}) => {
  const displayedLines = isComplete ? lines : lines.slice(0, -1);
  const currentLine = isComplete ? "" : lines[lines.length - 1];

  return (
    <div
      className={cn(
        "font-mono text-lg text-white md:text-xl",
        "w-full max-w-md text-left",
        className,
      )}
    >
      {displayedLines.map((line, index) => (
        <div key={index}>
          <span className="text-portfolio-secondary mr-2">{">"}</span>
          <span>{line}</span>
        </div>
      ))}
      {currentLine && (
        <div>
          <span className="text-portfolio-secondary mr-2">{">"}</span>
          <span>{currentLine}</span>
          <span className="animate-blink ml-1" aria-hidden="true">
            _
          </span>
        </div>
      )}
    </div>
  );
};
