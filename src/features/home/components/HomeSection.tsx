// src/features/home/components/HomeSection.tsx
import { useEffect, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { Terminal } from "./Terminal";
import { SystemStats } from "./SystemStats";
import { Meta } from "@/common/components/Meta";
import { useHomeAnimationStore } from "@/core/stores/useHomeAnimationStore";

const TYPING_SEQUENCE: string[] = [
  "Connecting to console...",
  "Authenticating...",
  "Connection established.",
  "Hello, friend.",
];

export const HomeSection: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const isZoomComplete = useHomeAnimationStore((state) => state.isZoomComplete);

  // Start typing animation when the zoom is complete
  useEffect(() => {
    if (isZoomComplete) {
      // A small delay to allow the fade-in to start
      setTimeout(() => {
        setShowContent(true);
        setStartTyping(true);
      }, 100);
    }
  }, [isZoomComplete]);

  // Terminal typing animation
  const { displayLines, isComplete } = useTypewriter(
    startTyping ? TYPING_SEQUENCE : [],
    {
      speed: 30,
      lineDelay: 100,
    },
  );

  return (
    <>
      <Meta title="Home" description="Yann Mazita - Portfolio" />

      <section className="relative flex h-full w-full items-center justify-center">
        {/* Terminal and SystemStats content */}
        <div
          className={`flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="mb-16 flex flex-col items-center justify-center px-8">
            <Terminal lines={displayLines} isComplete={isComplete} />
            {isComplete && (
              <SystemStats startAnimations={isComplete} className="mt-12" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
