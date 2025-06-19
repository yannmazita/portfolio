// src/common/components/Layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { CookieConsentBanner } from "@/common/components/GDPR/CookieConsentBanner";
import { Meta } from "../Meta";
import { StatusBar } from "@/features/status/components/StatusBar";
import { useScrollSpy } from "@/common/hooks/useScrollSpy";
import { useMenuStore } from "@/core/stores/useMenuStore";

export const Layout: React.FC = () => {
  const { setSelectedIndex } = useMenuStore();
  const { pauseObserver } = useScrollSpy(setSelectedIndex);

  return (
    <div className="flex min-h-screen flex-col">
      <Meta />
      <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-sm">
        <StatusBar />
        <NavigationBar pauseScrollSpy={pauseObserver} />
      </header>
      <main className="flex grow flex-col px-2 pb-2">
        <Outlet />
      </main>
      {/*<Footer />*/}
      <CookieConsentBanner />
    </div>
  );
};
