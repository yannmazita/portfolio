// src/common/utils/assets.ts

/**
 * The base URL for assets stored in Google Cloud Storage.
 * This is loaded from the .env file.
 * Empty string in dev, causing assets to be served from the `public` directory.
 */
const GCS_ASSETS_BASE_URL = import.meta.env.VITE_GCS_ASSETS_BASE_URL || "";

/**
 * Constructs a full URL for a given asset path.
 *
 * @param path - The relative path to the asset (like 'videos/project.mp4').
 * @returns The full URL to the asset, prefixed with the GCS base URL in production,
 *          or a root-relative path in development.
 */
export const getAssetUrl = (path: string): string => {
  if (GCS_ASSETS_BASE_URL) {
    // remove double slash
    return `${GCS_ASSETS_BASE_URL.replace(/\/$/, "")}/${path.replace(
      /^\//,
      "",
    )}`;
  }
  // In dev, return a root-relative path for Vite to serve from the `public` directory.
  return `/${path.replace(/^\//, "")}`;
};
