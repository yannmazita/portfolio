// src/features/home/components/TypedText.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { useSimpleTypewriter } from "../hooks/useSimpleTypewriter";

/**
 * @interface TypedTextProps
 * @field text - The full string to type out.
 * @field start - When true, the animation will begin.
 * @field classname - Optional CSS classes for the container.
 * @field startDelay - Optional delay in ms before typing starts.
 */
interface TypedTextProps {
  text: string;
  start: boolean;
  className?: string;
  startDelay?: number;
}

/**
 * A component that renders text with a typewriter effect.
 */
export const TypedText: React.FC<TypedTextProps> = ({
  text,
  start,
  className,
  startDelay,
}) => {
  const { displayText, isTyping } = useSimpleTypewriter(text, start, {
    startDelay,
  });

  return (
    <span className={cn("relative inline-block", className)}>
      {/* Invisible placeholder to reserve the full width and height */}
      <span className="invisible" aria-hidden="true">
        {text}
      </span>

      {/* Absolutely positioned visible text that types out on top */}
      <span className="absolute top-0 left-0">
        {displayText}
        {isTyping && (
          <span className="animate-blink ml-px inline-block h-4 w-2 bg-current" />
        )}
      </span>
    </span>
  );
};
