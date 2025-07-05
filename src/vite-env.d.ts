// src/vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GCS_ASSETS_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
