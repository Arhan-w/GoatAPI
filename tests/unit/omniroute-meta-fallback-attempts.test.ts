import test from "node:test";
import assert from "node:assert/strict";
import { OMNIROUTE_RESPONSE_HEADERS } from "../../src/shared/constants/headers.ts";
import { buildGoatAPIResponseMetaHeaders } from "../../src/domain/goatapiResponseMeta.ts";

test("headers constant exposes the fallback-attempts key", () => {
  assert.equal(
    OMNIROUTE_RESPONSE_HEADERS.fallbackAttempts,
    "X-GoatAPI-Fallback-Attempts"
  );
});

test("buildGoatAPIResponseMetaHeaders emits the fallback-attempts count when > 0", () => {
  const h = buildGoatAPIResponseMetaHeaders({ model: "gpt", provider: "openai", fallbackAttempts: 2 });
  assert.equal(h["X-GoatAPI-Fallback-Attempts"], "2");
});

test("buildGoatAPIResponseMetaHeaders omits the header when 0 / absent", () => {
  const none = buildGoatAPIResponseMetaHeaders({ model: "gpt" });
  assert.equal(none["X-GoatAPI-Fallback-Attempts"], undefined);
  const zero = buildGoatAPIResponseMetaHeaders({ model: "gpt", fallbackAttempts: 0 });
  assert.equal(zero["X-GoatAPI-Fallback-Attempts"], undefined);
});
