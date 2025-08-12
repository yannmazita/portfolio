// src/common/components/Layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { CookieConsentBanner } from "@/common/components/GDPR/CookieConsentBanner";
import { StatusBar } from "@/features/status/components/StatusBar";
import { useAnimationStore } from "@/core/stores/useAnimationStore";
import { cn } from "@/common/shadcn/lib/utils";
import { useEffect } from "react";

export const Layout: React.FC = () => {
  const { topMounted, triggerMountAnimation } = useAnimationStore();

  // Trigger the animation sequence once on component mount
  useEffect(() => {
    triggerMountAnimation();
  }, [triggerMountAnimation]);

  return (
    <div className={cn("flex min-h-screen flex-col")}>
      <header
        className={cn(
          "sticky top-0 z-50",
          "animate-in fade-in slide-in-from-top-8 duration-500",
          topMounted ? "opacity-100" : "opacity-0",
        )}
      >
        <StatusBar />
        <NavigationBar />
      </header>
      <main className="flex grow flex-col justify-center px-2 pb-2">
        <Outlet />
      </main>
      {/*<Footer />*/}
      <CookieConsentBanner />
    </div>
  );
};
