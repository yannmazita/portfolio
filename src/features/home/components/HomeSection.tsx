// src/features/home/components/HomeSection.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Welcome, friend.",
];

export const HomeSection: React.FC = () => {
  const { displayLines, isComplete } = useTypewriter(TYPING_SEQUENCE, {
    speed: 30,
    lineDelay: 100,
  });

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <div
        className={cn(
          "flex min-h-40 flex-col items-center justify-center transition-opacity duration-1000",
        )}
      >
        <Terminal lines={displayLines} isComplete={isComplete} />
        {isComplete && (
          <div
            className={cn(
              "animate-in fade-in slide-in-from-bottom-8 mt-4 delay-300 duration-1000",
            )}
          ></div>
        )}
      </div>
    </section>
  );
};
