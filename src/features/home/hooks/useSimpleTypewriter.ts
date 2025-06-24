// src/features/home/hooks/useSimpleTypewriter.ts
import { useState, useEffect } from "react";

interface TypewriterOptions {
  speed?: number;
  startDelay?: number;
}

const DEFAULT_SPEED = 50;
const DEFAULT_START_DELAY = 0;

/**
 * Creates a typewriter effect for a single string.
 * @param text - The full string to be typed out.
 * @param start - A boolean to trigger the typing animation.
 * @param options - Configuration for speed and start delay.
 * @returns An object with the text to display and a completion status.
 */
export const useSimpleTypewriter = (
  text: string,
  start: boolean,
  options: TypewriterOptions = {},
) => {
  const { speed = DEFAULT_SPEED, startDelay = DEFAULT_START_DELAY } = options;
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!start || !text) {
      // Reset if start is false or text is empty
      setDisplayText("");
      setIsTyping(false);
      return;
    }

    setDisplayText(""); // Clear previous text
    setIsTyping(true);

    const startTimeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          i++;
          setDisplayText(text.substring(0, i));
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, start, speed, startDelay]);

  return { displayText, isTyping };
};
