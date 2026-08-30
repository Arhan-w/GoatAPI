/** JobRegistry singleton - survives Next.js HMR via globalThis. */

import { JobRegistry } from "./registry";
import type { JobDefinition } from "./core";

declare global {
  var __goatapiJobRegistry: JobRegistry | undefined;
}

export function getJobRegistry(): JobRegistry {
  if (!globalThis.__goatapiJobRegistry) {
    globalThis.__goatapiJobRegistry = new JobRegistry();
  }
  return globalThis.__goatapiJobRegistry;
}

/** Test-only: drop the singleton so each test starts fresh. */
export function __resetJobRegistry(): void {
  globalThis.__goatapiJobRegistry = undefined;
}

export type { JobDefinition, JobRecord, HandlerResult, JobRun } from "./core";
