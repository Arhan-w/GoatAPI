import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getDeployBasePath,
  normalizeBasePath,
  withBasePath,
} from "../../../src/shared/utils/basePath";

describe("normalizeBasePath", () => {
  it("normalizes leading/trailing slashes", () => {
    assert.equal(normalizeBasePath("goatapi"), "/goatapi");
    assert.equal(normalizeBasePath("/goatapi/"), "/goatapi");
    assert.equal(normalizeBasePath("/goatapi"), "/goatapi");
    assert.equal(normalizeBasePath(""), "");
    assert.equal(normalizeBasePath("/"), "");
    assert.equal(normalizeBasePath(null), "");
  });
});

describe("getDeployBasePath", () => {
  it("reads NEXT_PUBLIC_OMNIROUTE_BASE_PATH first", () => {
    assert.equal(
      getDeployBasePath({
        NEXT_PUBLIC_OMNIROUTE_BASE_PATH: "/goatapi",
        OMNIROUTE_BASE_PATH: "/other",
      } as NodeJS.ProcessEnv),
      "/goatapi"
    );
  });

  it("falls back to OMNIROUTE_BASE_PATH", () => {
    assert.equal(
      getDeployBasePath({
        OMNIROUTE_BASE_PATH: "/goatapi",
      } as NodeJS.ProcessEnv),
      "/goatapi"
    );
  });
});

describe("withBasePath", () => {
  const base = "/goatapi";

  it("is a no-op when basePath is empty", () => {
    assert.equal(withBasePath("/api/health/ping", ""), "/api/health/ping");
  });

  it("prefixes absolute app paths", () => {
    assert.equal(withBasePath("/api/health/ping", base), "/goatapi/api/health/ping");
    assert.equal(withBasePath("/v1/models", base), "/goatapi/v1/models");
  });

  it("does not double-prefix", () => {
    assert.equal(withBasePath("/goatapi/api/health/ping", base), "/goatapi/api/health/ping");
    assert.equal(withBasePath("/goatapi", base), "/goatapi");
  });

  it("rewrites same-origin absolute URLs", () => {
    assert.equal(
      withBasePath("https://host.example/api/x", base, "https://host.example"),
      "https://host.example/goatapi/api/x"
    );
  });

  it("leaves external absolute URLs alone", () => {
    assert.equal(
      withBasePath("https://other.example/api/x", base, "https://host.example"),
      "https://other.example/api/x"
    );
  });

  it("leaves protocol-relative URLs alone", () => {
    assert.equal(withBasePath("//cdn.example/app.js", base), "//cdn.example/app.js");
  });
});
