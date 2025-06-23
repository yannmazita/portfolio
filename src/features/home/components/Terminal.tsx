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
  return (
    <div
      className={cn(
        "font-mono text-lg text-white md:text-xl",
        "w-full max-w-md text-left",
        className,
      )}
    >
      {lines.map((line, index) => (
        <div key={index}>
          <span className="text-portfolio-secondary">&nbsp;</span>
          <span>{line}</span>
          {/* Show cursor only on the last line and if not complete */}
          {index === lines.length - 1 && !isComplete && (
            <span className="animate-blink" aria-hidden="true">
              _
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
