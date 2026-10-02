import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { RENDERER_RESOURCE_URI, RENDER_TOOL_NAME } from "../src/render-tool.mjs";

const protocolHeaders = {
  accept: "application/json, text/event-stream",
  "content-type": "application/json",
};

export async function checkEndpoint(fetchRequest, { gsap = false, widgetDomain } = {}) {
  const root = await fetchRequest("/");
  assert.equal(root.status, 200);
  assert.equal((await root.json()).mcp, "/mcp");
  const health = await fetchRequest("/healthz");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { ok: true });

  const widget = await fetchRequest("/widget");
  assert.equal(widget.status, 200);
  assert.equal(widget.headers.get("content-type"), "text/html;profile=mcp-app");
  const widgetHtml = await widget.text();
  assert.match(widgetHtml, /jsonx-root/);
  assert.match(widgetHtml, new RegExp(`gsapMotion:${gsap}`));
  assert.doesNotMatch(widgetHtml, /(?:src|href)="\.\/widget\./);
  assert.equal(widgetHtml.includes("jsonx-gsap-runtime"), gsap);
  if (gsap) assert.match(widgetHtml, /GSAP/);

  const preflight = await fetchRequest("/mcp", { method: "OPTIONS" });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("access-control-allow-origin"), "*");
  assert.equal(preflight.headers.get("access-control-allow-methods"), "POST, GET, DELETE, OPTIONS");
  assert.match(preflight.headers.get("access-control-allow-headers"), /mcp-protocol-version/);
  assert.match(preflight.headers.get("access-control-expose-headers"), /Mcp-Session-Id/);
  assert.equal(await preflight.text(), "");

  let id = 0;
  async function rpc(method, params = {}) {
    const requestId = ++id;
    const response = await fetchRequest("/mcp", {
      method: "POST", headers: protocolHeaders,
      body: JSON.stringify({ jsonrpc: "2.0", id: requestId, method, params }),
    });
    assert.equal(response.status, 200, `${method}: ${response.status}`);
    assert.equal(response.headers.get("access-control-allow-origin"), "*");
    assert.equal(response.headers.get("mcp-session-id"), null, "renderer must remain stateless");
    const body = await response.json();
    assert.equal(body.jsonrpc, "2.0");
    assert.equal(body.id, requestId);
    assert.equal(body.error, undefined, JSON.stringify(body.error));
    return body.result;
  }

  const initialized = await rpc("initialize", {
    protocolVersion: "2026-01-26", capabilities: {},
    clientInfo: { name: "jsonx-endpoint-smoke", version: "0.1.0" },
  });
  assert.equal(initialized.serverInfo.name, "jsonx-renderer-app");
  const notified = await fetchRequest("/mcp", {
    method: "POST", headers: protocolHeaders,
    body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  });
  assert.equal(notified.status, 202);
  await notified.text();

  const tools = await rpc("tools/list");
  assert.equal(tools.tools.length, 1);
  assert.equal(tools.tools[0].name, RENDER_TOOL_NAME);
  assert.deepEqual(tools.tools[0].annotations, {
    readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false,
  });
  assert.equal(tools.tools[0]._meta.ui.resourceUri, RENDERER_RESOURCE_URI);
  const resources = await rpc("resources/list");
  assert.ok(resources.resources.some(({ uri }) => uri === RENDERER_RESOURCE_URI));
  const resource = await rpc("resources/read", { uri: RENDERER_RESOURCE_URI });
  assert.equal(resource.contents[0].mimeType, "text/html;profile=mcp-app");
  assert.equal(resource.contents[0].text, widgetHtml);
  assert.deepEqual(resource.contents[0]._meta.ui.csp, { connectDomains: [], resourceDomains: [] });
  assert.equal(resource.contents[0]._meta.ui.domain, widgetDomain);

  const fixtureNames = [
    "support-triage", "text-block", "checklist", "choice-list", "data-table",
    "alert", "quiz", "slider-poll", "motion-subtle", "bad-unknown-component",
    "bad-blocked-prop", "bad-event-handler", "bad-motion-profile", "bad-oversized",
  ];
  for (const name of fixtureNames) {
    const fixture = JSON.parse(await readFile(new URL(`../../../plugins/jsonx-generative-ui-plugin/fixtures/${name}.json`, import.meta.url), "utf8"));
    const result = await rpc("tools/call", {
      name: RENDER_TOOL_NAME,
      arguments: {
        purpose: fixture.purpose || fixture.title,
        ...(fixture.motionProfile ? { motionProfile: fixture.motionProfile } : {}),
        payload: fixture.payload,
      },
    });
    if (name.startsWith("bad-")) {
      assert.equal(result.isError, true, `${name} must be rejected`);
      assert.equal(result.structuredContent, undefined, `${name} must not return renderable data`);
      assert.ok(result.content[0].text.length > 0);
    } else {
      assert.equal(result.isError, undefined, `${name}: ${JSON.stringify(result)}`);
      assert.equal(result.structuredContent.schema, "jsonx.generative-ui.v1");
      assert.deepEqual(result.structuredContent.payload, fixture.payload);
      if (fixture.motionProfile) assert.equal(result.structuredContent.motionProfile, fixture.motionProfile);
    }
  }

  const malformed = await fetchRequest("/mcp", { method: "POST", headers: protocolHeaders, body: "{" });
  assert.equal(malformed.status, 400);
  assert.equal(malformed.headers.get("access-control-allow-origin"), "*");
  assert.equal((await malformed.json()).error.code, -32700);
  for (const method of ["GET", "DELETE"]) {
    const response = await fetchRequest("/mcp", { method, headers: protocolHeaders });
    assert.equal(response.status, 200);
    if (method === "GET") assert.equal(response.headers.get("content-type"), "text/event-stream");
    assert.equal(response.headers.get("access-control-allow-origin"), "*");
    await response.text();
  }
  const missing = await fetchRequest("/not-found");
  assert.equal(missing.status, 404);
  await missing.text();
  await Promise.all([rpc("tools/list"), rpc("tools/list")]);
}

if (import.meta.url === (process.argv[1] ? pathToFileURL(process.argv[1]).href : "")) {
  const urlIndex = process.argv.indexOf("--url");
  if (urlIndex < 0 || !process.argv[urlIndex + 1]) {
    throw new Error("Usage: node test/endpoint-smoke.mjs --url https://<verified-worker-origin> [--gsap] [--widget-domain <domain>]");
  }
  const origin = new URL(process.argv[urlIndex + 1]);
  const domainIndex = process.argv.indexOf("--widget-domain");
  await checkEndpoint((path, init) => fetch(new URL(path, origin), {
    ...init, signal: AbortSignal.timeout(30_000),
  }), {
    gsap: process.argv.includes("--gsap"),
    widgetDomain: domainIndex < 0 ? undefined : process.argv[domainIndex + 1],
  });
  console.log(`jsonx hosted endpoint smoke passed: ${origin.origin}`);
}
