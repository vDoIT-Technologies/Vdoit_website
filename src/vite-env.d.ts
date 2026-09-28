/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Origin of the mail relay that sends the contact form
   * (github.com/vDoIT-Technologies/Vdoit_website_backend).
   *
   * Left unset in production: nginx and Apache both proxy `/api` to the
   * backend on the same host, so the browser makes a same-origin request and
   * the backend's CORS allowlist never comes into it. Local development points
   * it at `http://localhost:4000`, which does cross origins — that is why
   * localhost is in the backend's `ALLOWED_ORIGINS`.
   */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
