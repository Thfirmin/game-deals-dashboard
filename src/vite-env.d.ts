/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHEAPSHARK_API_HOST: string
  readonly VITE_AWESOME_API_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
