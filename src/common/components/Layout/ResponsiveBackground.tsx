// src/common/components/Layout/ResponsiveBackground.tsx
import { useLocation } from "react-router-dom";
import { HomePageBackground } from "./HomePageBackground";

export const ResponsiveBackground: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return isHomePage ? <HomePageBackground /> : null;
};
