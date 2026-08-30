/**
 * T-08 options-schema tests.
 *
 * Covers `parseGoatAPIPluginOptions(opts)` — the strict Zod gate that
 * validates the second-arg `PluginOptions` bag from opencode.json before
 * any hook is wired. Anti-pattern checklist mirrored here:
 *
 *  - `null` / `undefined` must collapse to `{}` (defaults apply downstream).
 *  - Unknown keys must THROW (`.strict()` catches opencode.json typos).
 *  - Validation runs at parse time, not import time (module loads cleanly).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { parseGoatAPIPluginOptions } from "../src/index.js";

test("parseGoatAPIPluginOptions: undefined → {}", () => {
  assert.deepEqual(parseGoatAPIPluginOptions(undefined), {});
});

test("parseGoatAPIPluginOptions: null → {}", () => {
  assert.deepEqual(parseGoatAPIPluginOptions(null), {});
});

test("parseGoatAPIPluginOptions: empty object → {}", () => {
  assert.deepEqual(parseGoatAPIPluginOptions({}), {});
});

test("parseGoatAPIPluginOptions: valid providerId → returns it", () => {
  const r = parseGoatAPIPluginOptions({ providerId: "goatapi-preprod" });
  assert.equal(r.providerId, "goatapi-preprod");
});

test("parseGoatAPIPluginOptions: invalid providerId (special chars) → throws", () => {
  assert.throws(
    () => parseGoatAPIPluginOptions({ providerId: "goatapi prod!" }),
    /providerId.*slug/i
  );
});

test("parseGoatAPIPluginOptions: empty providerId → throws", () => {
  assert.throws(() => parseGoatAPIPluginOptions({ providerId: "" }), /providerId/i);
});

test("parseGoatAPIPluginOptions: valid modelCacheTtl → returns it", () => {
  const r = parseGoatAPIPluginOptions({ modelCacheTtl: 60_000 });
  assert.equal(r.modelCacheTtl, 60_000);
});

test("parseGoatAPIPluginOptions: negative modelCacheTtl → throws", () => {
  assert.throws(() => parseGoatAPIPluginOptions({ modelCacheTtl: -1 }), /modelCacheTtl/i);
});

test("parseGoatAPIPluginOptions: zero modelCacheTtl → throws (positive required)", () => {
  assert.throws(() => parseGoatAPIPluginOptions({ modelCacheTtl: 0 }), /modelCacheTtl/i);
});

test("parseGoatAPIPluginOptions: invalid baseURL (not a URL) → throws", () => {
  assert.throws(() => parseGoatAPIPluginOptions({ baseURL: "not-a-url" }), /baseURL/i);
});

test("parseGoatAPIPluginOptions: unknown key → throws (strict mode catches typos)", () => {
  assert.throws(
    () =>
      parseGoatAPIPluginOptions({
        providerId: "goatapi",
        provider_id: "typo-here",
      }),
    /provider_id|unrecognized/i
  );
});

test("parseGoatAPIPluginOptions: all four fields populated correctly → returns them", () => {
  const opts = {
    providerId: "goatapi-prod",
    displayName: "GoatAPI Production",
    modelCacheTtl: 120_000,
    baseURL: "https://or.example.com/v1",
  };
  const r = parseGoatAPIPluginOptions(opts);
  assert.deepEqual(r, opts);
});

test("parseGoatAPIPluginOptions: error message lists every issue path", () => {
  // Two bad fields at once → error string should mention BOTH.
  try {
    parseGoatAPIPluginOptions({
      providerId: "",
      baseURL: "garbage",
    });
    assert.fail("expected throw");
  } catch (err) {
    const msg = (err as Error).message;
    assert.match(msg, /providerId/);
    assert.match(msg, /baseURL/);
  }
});

test("parseGoatAPIPluginOptions: module import alone does NOT throw", async () => {
  // Re-importing the entry must not trigger validation; validation only fires
  // on explicit parseGoatAPIPluginOptions / GoatAPIPlugin invocation.
  const mod = await import("../src/index.js");
  assert.equal(typeof mod.parseGoatAPIPluginOptions, "function");
});
