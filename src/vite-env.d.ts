/**
 * @fileoverview Vite environment type definitions.
 *
 * TypeScript definitions for Vite's import.meta.env environment variables.
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
