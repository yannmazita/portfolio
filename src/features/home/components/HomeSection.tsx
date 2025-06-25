// src/features/home/components/HomeSection.tsx
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Hello, friend.",
];

export const HomeSection: React.FC = () => {
  const { displayLines, isComplete } = useTypewriter(TYPING_SEQUENCE, {
    speed: 30,
    lineDelay: 100,
  });

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center text-center"
    >
      <div className="mb-16 flex flex-col items-center justify-center">
        <Terminal lines={displayLines} isComplete={isComplete} />
        {isComplete && (
          <SystemStats startAnimations={isComplete} className="mt-12" />
        )}
      </div>
    </section>
  );
};
