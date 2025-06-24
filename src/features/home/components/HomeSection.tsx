// src/features/home/components/HomeSection.tsx
import { cn } from "@/common/shadcn/lib/utils";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Welcome, friend.",
];

export const HomeSection: React.FC = () => {
  const { displayLines, isComplete } = useTypewriter(TYPING_SEQUENCE, {
    speed: 15,
    lineDelay: 100,
  });

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center text-center"
    >
      <div
        className={cn(
          "flex min-h-40 flex-col items-center justify-center transition-opacity duration-1000",
        )}
      >
        <Terminal lines={displayLines} isComplete={isComplete} />
        {isComplete && (
          <div className={cn("mt-4")}>
            <SystemStats startAnimations={isComplete} />
          </div>
        )}
      </div>
    </section>
  );
};
