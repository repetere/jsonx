import { fileURLToPath } from "node:url";
import { createTestHarness } from "wrangler";
import { checkEndpoint } from "./endpoint-smoke.mjs";

// This app does not use Request.cf; avoid a network probe in local/CI tests.
process.env.CLOUDFLARE_CF_FETCH_ENABLED = "false";

const root = fileURLToPath(new URL("../", import.meta.url));
// Exercise the production bundle/config in workerd, without Node compatibility
// flags, remote bindings, account credentials, or Worker runtime mocks.
const harness = createTestHarness({ root, workers: [{ configPath: "wrangler.toml" }] });
try {
  await harness.listen();
  await checkEndpoint((path, init) => harness.fetch(path, init));
  await harness.update({
    root,
    workers: [{
      configPath: "wrangler.toml",
      vars: { JSONX_ENABLE_GSAP: "yes", JSONX_WIDGET_DOMAIN: "https://widget.example" },
    }],
  });
  await checkEndpoint((path, init) => harness.fetch(path, init), {
    gsap: true, widgetDomain: "https://widget.example",
  });
  console.log("jsonx-renderer-app Workers runtime smoke passed (GSAP off/on)");
} finally {
  await harness.close();
}
