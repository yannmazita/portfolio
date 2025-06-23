// src/features/home/hooks/useTypewriter.ts
import { useState, useEffect } from "react";

export interface TypewriterOptions {
  /** Typing speed in milliseconds. */
  speed?: number;
  /** Delay between lines in milliseconds. */
  lineDelay?: number;
  /** Callback fired when all lines are typed. */
  onComplete?: () => void;
}

const DEFAULT_SPEED = 60;
const DEFAULT_LINE_DELAY = 300;

/**
 * Creates a typewriter effect with multiple persistent lines.
 * @param lines - An array of strings to be typed out.
 * @param options - Configuration for speed, delay, and completion.
 * @returns An object with the lines to display and a completion status.
 */
export const useTypewriter = (
  lines: string[],
  options: TypewriterOptions = {},
) => {
  const {
    speed = DEFAULT_SPEED,
    lineDelay = DEFAULT_LINE_DELAY,
    onComplete,
  } = options;

  const [displayLines, setDisplayLines] = useState<string[]>([""]); // Array that the UI will actually render
  const [lineIndex, setLineIndex] = useState(0); // Current typed line index
  const [charIndex, setCharIndex] = useState(0); // Current typed character index from the lineIndex line
  const [isComplete, setIsComplete] = useState(false); // Whether the animation is finished or not

  // Effect for typing characters of the current line
  useEffect(() => {
    if (isComplete || lineIndex >= lines.length) {
      return;
    }

    // Stop typing if the current line is already complete to prevent
    // retriggering and cancelling the line transition timeout.
    if (charIndex >= lines[lineIndex].length) {
      return;
    }

    const typingTimeout = setTimeout(() => {
      const currentLine = lines[lineIndex];
      setDisplayLines((prev) => {
        const newLines = [...prev];
        newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
        return newLines;
      });
      setCharIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, lineIndex, lines, speed, isComplete]);

  // Effect for handling line transitions and completion
  useEffect(() => {
    if (isComplete || lineIndex >= lines.length) {
      return;
    }

    // When the current line is fully typed.
    if (charIndex >= lines[lineIndex].length) {
      // If there are more lines to type, move to the next one
      if (lineIndex < lines.length - 1) {
        const lineCompleteTimeout = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          // Add a new empty line for the next typing animation
          setDisplayLines((prev) => [...prev, ""]);
        }, lineDelay);
        return () => clearTimeout(lineCompleteTimeout);
      } else {
        // All lines are typed, mark as complete
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [charIndex, lineIndex, lines, lineDelay, onComplete, isComplete]);

  return { displayLines, isComplete };
};
