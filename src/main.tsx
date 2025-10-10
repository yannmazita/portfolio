// src/main.tsx
import { scan } from "react-scan";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createHashRouter } from "react-router-dom";
import "./index.css";
import { routes } from "./core/routes";

// GitHub Pages SPA redirect handling
// When a user directly navigates to a hash route (like bookmarking /#/projects),
// GitHub Pages serves our 404.html which stores the URL and redirects here.
// We then restore the intended navigation.
const handleGitHubPagesRedirect = () => {
  const redirect = sessionStorage.getItem("ghpages_redirect");
  if (redirect && redirect !== location.href) {
    sessionStorage.removeItem("ghpages_redirect");
    history.replaceState(null, "", redirect);
  }
};

handleGitHubPagesRedirect();

const router = createHashRouter(routes);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

if (typeof window !== "undefined") {
  if (import.meta.env.DEV) {
    scan({
      enabled: true,
      log: false,
    });
  }
}

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
