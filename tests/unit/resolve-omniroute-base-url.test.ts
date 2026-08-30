import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_OMNIROUTE_BASE_URL,
  resolveGoatAPIBaseUrl,
} from "../../src/shared/utils/resolveGoatAPIBaseUrl.ts";

test("resolveGoatAPIBaseUrl prefers OMNIROUTE_BASE_URL", () => {
  assert.equal(
    resolveGoatAPIBaseUrl({
      OMNIROUTE_BASE_URL: "https://internal.example.com/",
      BASE_URL: "https://base.example.com",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://internal.example.com"
  );
});

test("resolveGoatAPIBaseUrl falls back to BASE_URL", () => {
  assert.equal(
    resolveGoatAPIBaseUrl({
      BASE_URL: "https://base.example.com/",
      NEXT_PUBLIC_BASE_URL: "https://public.example.com",
    }),
    "https://base.example.com"
  );
});

test("resolveGoatAPIBaseUrl falls back to NEXT_PUBLIC_BASE_URL", () => {
  assert.equal(
    resolveGoatAPIBaseUrl({
      NEXT_PUBLIC_BASE_URL: "https://public.example.com/",
    }),
    "https://public.example.com"
  );
});

test("resolveGoatAPIBaseUrl ignores blank values", () => {
  assert.equal(
    resolveGoatAPIBaseUrl({
      OMNIROUTE_BASE_URL: "   ",
      BASE_URL: "",
      NEXT_PUBLIC_BASE_URL: " https://public.example.com/ ",
    }),
    "https://public.example.com"
  );
});

test("resolveGoatAPIBaseUrl uses the default localhost fallback", () => {
  assert.equal(resolveGoatAPIBaseUrl({}), DEFAULT_OMNIROUTE_BASE_URL);
});
