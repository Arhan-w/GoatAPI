import test from "node:test";
import assert from "node:assert/strict";
import {
  GoatAPIPlugin,
  OMNIROUTE_PROVIDER_KEY,
  DEFAULT_MODEL_CACHE_TTL_MS,
  resolveGoatAPIPluginOptions,
} from "../src/index.js";

test("scaffold: exports public surface", () => {
  assert.equal(
    typeof GoatAPIPlugin,
    "function",
    "GoatAPIPlugin must be a function (Plugin factory)"
  );
  assert.equal(OMNIROUTE_PROVIDER_KEY, "goatapi");
  assert.equal(DEFAULT_MODEL_CACHE_TTL_MS, 300_000);
});

test("scaffold: default export is v1 plugin shape { id, server: GoatAPIPlugin }", async () => {
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.default, "object");
  assert.equal(mod.default.id, "@goatapi/opencode-plugin");
  assert.equal(mod.default.server, mod.GoatAPIPlugin);
});

test("resolveGoatAPIPluginOptions: defaults", () => {
  const r = resolveGoatAPIPluginOptions();
  assert.equal(r.providerId, "opencode-goatapi");
  assert.equal(r.displayName, "GoatAPI");
  assert.equal(r.modelCacheTtl, 300_000);
  assert.equal(r.baseURL, undefined);
});

test("resolveGoatAPIPluginOptions: custom providerId derives displayName", () => {
  const r = resolveGoatAPIPluginOptions({ providerId: "goatapi-preprod" });
  assert.equal(r.providerId, "opencode-goatapi-preprod");
  assert.equal(r.displayName, "GoatAPI (opencode-goatapi-preprod)");
});

test("resolveGoatAPIPluginOptions: explicit displayName wins", () => {
  const r = resolveGoatAPIPluginOptions({
    providerId: "goatapi-x",
    displayName: "Custom Label",
  });
  assert.equal(r.displayName, "Custom Label");
});

test("resolveGoatAPIPluginOptions: invalid TTL falls back to default", () => {
  assert.equal(resolveGoatAPIPluginOptions({ modelCacheTtl: 0 }).modelCacheTtl, 300_000);
  assert.equal(resolveGoatAPIPluginOptions({ modelCacheTtl: -1 }).modelCacheTtl, 300_000);
});

test("resolveGoatAPIPluginOptions: positive TTL respected", () => {
  assert.equal(resolveGoatAPIPluginOptions({ modelCacheTtl: 60_000 }).modelCacheTtl, 60_000);
});

test("GoatAPIPlugin: returns an empty hooks object (scaffold)", async () => {
  const fakeCtx = {} as Parameters<typeof GoatAPIPlugin>[0];
  const hooks = await GoatAPIPlugin(fakeCtx);
  assert.equal(typeof hooks, "object");
  assert.notEqual(hooks, null);
});

test("scaffold: built ESM default export resolves with the v1 plugin shape", async () => {
  // The plugin is ESM-only now — the CJS bundle was dropped to fix the OpenCode
  // loader (#3883), so there is no more ../dist/index.cjs. Validate that the built
  // distributable's default export still carries the OpenCode v1 { id, server } shape.
  const mod = await import("../dist/index.js");
  assert.strictEqual(typeof mod.default, "object");
  assert.strictEqual(mod.default.id, "@goatapi/opencode-plugin");
  assert.strictEqual(typeof mod.default.server, "function");
});
