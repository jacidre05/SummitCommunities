/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string; // Add custom env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
