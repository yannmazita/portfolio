// src/common/components/Meta.tsx
import { useEffect } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

const APP_NAME = "Yann Mazita";
const DEFAULT_DESCRIPTION =
  "Developer specializing in React, Python, TypeScript, and full-stack development.";

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  noIndex = false,
}) => {
  const pageTitle = title
    ? `${title} | ${APP_NAME}`
    : `${APP_NAME} - Developer Portfolio`;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;

  useEffect(() => {
    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", pageTitle);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", pageDescription);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", pageTitle);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", pageDescription);
    }

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow",
    );
  }, [pageTitle, pageDescription, noIndex]);

  return null; // This component only manages side effects
};
