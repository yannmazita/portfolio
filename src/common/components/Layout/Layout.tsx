// src/common/components/Layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { CookieConsentBanner } from "@/common/components/GDPR/CookieConsentBanner";
import { Meta } from "../Meta";
import { StatusBar } from "@/features/status/components/StatusBar";

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Meta />
      <StatusBar />
      <NavigationBar />
      {/* Main content area takes remaining vertical space */}
      <main className="flex grow flex-col px-2 pb-2">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
      {/*<Footer />*/}
      <CookieConsentBanner />
    </div>
  );
};
