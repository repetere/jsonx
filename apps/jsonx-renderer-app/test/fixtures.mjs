import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateJsonxDocument } from "../src/jsonx-validator.mjs";

const appRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const repoRoot = resolve(appRoot, "..", "..");
const fixtureRoot = resolve(repoRoot, "plugins", "jsonx-generative-ui-plugin", "fixtures");

const validFixtures = [
  "support-triage",
  "text-block",
  "checklist",
  "choice-list",
  "data-table",
  "alert",
  "quiz",
  "slider-poll",
  "motion-subtle",
];

const invalidFixtures = [
  "bad-unknown-component",
  "bad-blocked-prop",
  "bad-event-handler",
  "bad-motion-profile",
  "bad-oversized",
];

async function readFixture(name) {
  return JSON.parse(await readFile(resolve(fixtureRoot, `${name}.json`), "utf8"));
}

for (const name of validFixtures) {
  const result = validateJsonxDocument(await readFixture(name));
  assert.equal(result.ok, true, `${name} should pass validation: ${result.errors.join("; ")}`);
}

for (const name of invalidFixtures) {
  const result = validateJsonxDocument(await readFixture(name));
  assert.equal(result.ok, false, `${name} should fail validation`);
  assert.ok(result.errors.length > 0, `${name} should return validation errors`);
}

console.log(`jsonx fixture validation passed: ${validFixtures.length} valid, ${invalidFixtures.length} invalid`);
