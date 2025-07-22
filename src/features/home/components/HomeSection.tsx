// src/features/home/components/HomeSection.tsx
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";
import { Meta } from "@/common/components/Meta";

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
    <section className="flex flex-col items-center justify-center text-center">
      <Meta
        title="Home"
        description="The personal portfolio of Yann Mazita, a software developer. Discover my projects, skills, and professional experience."
      />

      <div className="mb-16 flex flex-col items-center justify-center">
        <Terminal lines={displayLines} isComplete={isComplete} />
        {isComplete && (
          <SystemStats startAnimations={isComplete} className="mt-12" />
        )}
      </div>
    </section>
  );
};
