import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { cn } from "@/common/shadcn/lib/utils";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { useState } from "react";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Welcome, friend.",
];

const FINAL_HERO_TITLE = "MAZITA";
const FINAL_HERO_SUBTITLE = "Fullstack Developer";

export const HomeSection: React.FC = () => {
  const textMounted = useAnimationStore((state) => state.textMounted);
  const [typingComplete, setTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    // A small delay before showing the final content for a smoother transition.
    // This delay should be lower than the necessary time for useTypeWriter to
    // write everything
    // Todo: better implementation?
    setTimeout(() => {
      setTypingComplete(true);
    }, 1000);
  };

  const { displayLines, isComplete: typewriterHookIsComplete } = useTypewriter(
    TYPING_SEQUENCE,
    {
      speed: 30,
      lineDelay: 100,
      onComplete: handleTypingComplete,
    },
  );

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <div
        className={cn(
          "flex h-40 items-center justify-center transition-opacity duration-1000",
          textMounted ? "opacity-100" : "opacity-0",
        )}
      >
        {!typingComplete ? (
          <Terminal
            lines={displayLines}
            isComplete={typewriterHookIsComplete}
          />
        ) : (
          <div className={cn("animate-in fade-in duration-1000")}>
            <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase md:text-7xl lg:text-8xl">
              {FINAL_HERO_TITLE}
            </h1>
            <h2 className="text-portfolio-primary mt-4 text-xl font-semibold tracking-wider uppercase md:text-2xl">
              {FINAL_HERO_SUBTITLE}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};
