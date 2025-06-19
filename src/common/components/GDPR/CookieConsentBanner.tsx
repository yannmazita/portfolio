// src/common/components/GDPR/CookieConsentBanner.tsx
import { useEffect, useState } from "react";
import { cn } from "@/common/shadcn/lib/utils";

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  // Start hiding after 5 seconds, then remove from DOM after animation
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
      // Give time for slide-out animation to finish before unmounting
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // match css animation duration
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      data-state={isHiding ? "closed" : "open"}
      className={cn(
        "bg-background fixed right-0 bottom-0 left-0 z-50 p-4",
        "border-border border-t text-center text-sm text-black",
        "animate-in slide-in-from-bottom duration-300",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:duration-300",
      )}
      role="note"
      aria-live="polite"
      aria-label="Privacy Notice"
    >
      <div className="container mx-auto">
        This website does not use cookies or collect personal data.
      </div>
    </div>
  );
};
