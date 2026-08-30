export type ServerLifecyclePhase = "starting" | "ready" | "stopping";

declare global {
  var __goatapiServerLifecycle: ServerLifecyclePhase | undefined;
}

export function getServerLifecyclePhase(): ServerLifecyclePhase {
  return globalThis.__goatapiServerLifecycle ?? "starting";
}

export function markServerStarting(): void {
  globalThis.__goatapiServerLifecycle = "starting";
}

export function markServerReady(): void {
  if (getServerLifecyclePhase() !== "stopping") {
    globalThis.__goatapiServerLifecycle = "ready";
  }
}

export function markServerStopping(): void {
  globalThis.__goatapiServerLifecycle = "stopping";
}
