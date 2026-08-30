import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  patchBasePathLiterals,
  patchJsonManifestFile,
  patchStandaloneBasePath,
  patchProcessEnvShim,
  patchBakedAssetUrls,
} from "../../scripts/docker/patch-standalone-base-path.mjs";

test("patchBasePathLiterals rewrites empty basePath literals", () => {
  const input = 'const cfg={basePath:"",assetPrefix:void 0};"basePath":""';
  const output = patchBasePathLiterals(input, "/goatapi");
  assert.match(output, /basePath:"\/goatapi"/);
  assert.match(output, /"basePath":"\/goatapi"/);
});

test("patchJsonManifestFile updates nested basePath fields", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "goatapi-basepath-"));
  const filePath = path.join(dir, "routes-manifest.json");
  fs.writeFileSync(filePath, JSON.stringify({ basePath: "", nested: { basePath: "" } }, null, 2));
  assert.equal(patchJsonManifestFile(filePath, "/goatapi"), true);
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  assert.equal(parsed.basePath, "/goatapi");
  assert.equal(parsed.nested.basePath, "/goatapi");
});

test("patchStandaloneBasePath rewrites a root-path standalone tree", () => {
  const appRoot = fs.mkdtempSync(path.join(os.tmpdir(), "goatapi-standalone-"));
  const distRoot = path.join(appRoot, ".build", "next");
  fs.mkdirSync(path.join(distRoot, "server"), { recursive: true });
  fs.writeFileSync(path.join(distRoot, "routes-manifest.json"), JSON.stringify({ basePath: "" }));
  fs.writeFileSync(path.join(distRoot, "server", "chunk.js"), 'export const config={basePath:""};');
  fs.writeFileSync(path.join(appRoot, "BUILD_OMNIROUTE_BASE_PATH"), "\n");

  const result = patchStandaloneBasePath({
    appRoot,
    fromBasePath: "",
    toBasePath: "/goatapi",
  });

  assert.equal(result.changed, true);
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(distRoot, "routes-manifest.json"), "utf8")).basePath,
    "/goatapi"
  );
  assert.match(fs.readFileSync(path.join(distRoot, "server", "chunk.js"), "utf8"), /\/goatapi/);
});

test("patchStandaloneBasePath rejects mismatched non-root builds", () => {
  assert.throws(
    () =>
      patchStandaloneBasePath({
        appRoot: process.cwd(),
        fromBasePath: "/custom",
        toBasePath: "/goatapi",
      }),
    /does not match the image build/
  );
});

test("patchBasePathLiterals rewrites assetPrefix literals (Next 16 SSR asset URLs)", () => {
  // Next 16 app-router renders SSR asset URLs from assetPrefix ALONE.
  assert.equal(
    patchBasePathLiterals('{"assetPrefix":""}', "/goatapi"),
    '{"assetPrefix":"/goatapi"}'
  );
  assert.equal(patchBasePathLiterals('assetPrefix:""', "/goatapi"), 'assetPrefix:"/goatapi"');
  assert.equal(
    patchBasePathLiterals("assetPrefix:void 0", "/goatapi"),
    'assetPrefix:"/goatapi"'
  );
  // Asset prefix must mirror the basePath so both routing and assets align.
  const mixed = patchBasePathLiterals('{"basePath":"","assetPrefix":""}', "/goatapi");
  assert.match(mixed, /"basePath":"\/goatapi"/);
  assert.match(mixed, /"assetPrefix":"\/goatapi"/);
});

test("patchBasePathLiterals rewrites the NEXT_PUBLIC env mirror", () => {
  assert.equal(
    patchBasePathLiterals('{"env":{"NEXT_PUBLIC_OMNIROUTE_BASE_PATH":""}}', "/goatapi"),
    '{"env":{"NEXT_PUBLIC_OMNIROUTE_BASE_PATH":"/goatapi"}}'
  );
  assert.equal(
    patchBasePathLiterals('NEXT_PUBLIC_OMNIROUTE_BASE_PATH:""', "/goatapi"),
    'NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"/goatapi"'
  );
});

test("patchProcessEnvShim populates the Turbopack client process env", () => {
  assert.equal(
    patchProcessEnvShim("o.env={},o.argv=[]", "/goatapi"),
    'o.env={OMNIROUTE_BASE_PATH:"/goatapi",NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"/goatapi"},o.argv=[]'
  );
  // Non-empty env objects are left untouched (never clobber baked values).
  assert.equal(patchProcessEnvShim("o.env={A:1}", "/goatapi"), "o.env={A:1}");
});

test("patchBakedAssetUrls prefixes absolute _next/static URLs", () => {
  assert.equal(
    patchBakedAssetUrls('"/_next/static/chunks/a.js"', "/goatapi"),
    '"/goatapi/_next/static/chunks/a.js"'
  );
  assert.equal(
    patchBakedAssetUrls("'/_next/static/media/m.png'", "/goatapi"),
    "'/goatapi/_next/static/media/m.png'"
  );
  // Already-prefixed URLs are stable.
  assert.equal(
    patchBakedAssetUrls('"/goatapi/_next/static/a.js"', "/goatapi"),
    '"/goatapi/_next/static/a.js"'
  );
});
