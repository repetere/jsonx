import assert from "node:assert/strict";
import { cp, mkdir, rm } from "node:fs/promises";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import netlifyHandler from "../netlify/functions/jsonx-renderer.mjs";
import { buildWidgetHtml, createHttpServer, handleWebRequest } from "../src/server.mjs";
import { RENDERER_RESOURCE_URI, RENDER_TOOL_NAME } from "../src/render-tool.mjs";

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve(server.address().port);
    });
  });
}

async function main() {
  delete process.env.JSONX_ENABLE_GSAP;
  const defaultWidgetHtml = buildWidgetHtml();
  assert.match(defaultWidgetHtml, /gsapMotion:false/);
  assert.doesNotMatch(defaultWidgetHtml, /jsonx-gsap-runtime/);

  process.env.JSONX_ENABLE_GSAP = "1";
  const gsapWidgetHtml = buildWidgetHtml();
  assert.match(gsapWidgetHtml, /gsapMotion:true/);
  assert.match(gsapWidgetHtml, /jsonx-gsap-runtime/);
  delete process.env.JSONX_ENABLE_GSAP;

  const webHealth = await handleWebRequest(new Request("https://renderer.example/healthz"));
  assert.equal(webHealth.status, 200);
  assert.deepEqual(await webHealth.json(), { ok: true });

  const netlifyHealth = await netlifyHandler(new Request("https://renderer.example/healthz"));
  assert.equal(netlifyHealth.status, 200);
  assert.deepEqual(await netlifyHealth.json(), { ok: true });

  const webWidget = await handleWebRequest(new Request("https://renderer.example/widget"));
  assert.equal(webWidget.status, 200);
  assert.equal(webWidget.headers.get("content-type"), "text/html;profile=mcp-app");
  assert.match(await webWidget.text(), /jsonx-root/);

  const bundleFixture = new URL("./.tmp-netlify-bundle/", import.meta.url);
  try {
    await rm(bundleFixture, { recursive: true, force: true });
    await mkdir(new URL("netlify/functions/", bundleFixture), { recursive: true });
    await cp(new URL("../web/", import.meta.url), new URL("web/", bundleFixture), { recursive: true });
    await cp(new URL("../src/jsonx-validator.mjs", import.meta.url), new URL("netlify/functions/jsonx-validator.mjs", bundleFixture));
    await cp(new URL("../src/render-tool.mjs", import.meta.url), new URL("netlify/functions/render-tool.mjs", bundleFixture));
    await cp(new URL("../src/server.mjs", import.meta.url), new URL("netlify/functions/server.mjs", bundleFixture));

    const bundledServer = await import(`${new URL("netlify/functions/server.mjs", bundleFixture).href}?smoke=${Date.now()}`);
    const bundledWidget = await bundledServer.handleWebRequest(new Request("https://renderer.example/widget"));
    assert.equal(bundledWidget.status, 200);
    assert.match(await bundledWidget.text(), /jsonx-root/);
  } finally {
    await rm(bundleFixture, { recursive: true, force: true });
  }

  const webPreflight = await handleWebRequest(new Request("https://renderer.example/mcp", { method: "OPTIONS" }));
  assert.equal(webPreflight.status, 204);
  assert.equal(webPreflight.headers.get("Access-Control-Allow-Origin"), "*");

  const webInitialize = await handleWebRequest(
    new Request("https://renderer.example/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2026-01-26",
          capabilities: {},
          clientInfo: { name: "jsonx-web-smoke", version: "0.1.0" },
        },
      }),
    }),
  );
  assert.equal(webInitialize.status, 200);
  assert.equal(webInitialize.headers.get("Access-Control-Allow-Origin"), "*");
  const initializeBody = await webInitialize.json();
  assert.equal(initializeBody.jsonrpc, "2.0");
  assert.equal(initializeBody.id, 1);
  assert.equal(initializeBody.result.serverInfo.name, "jsonx-renderer-app");

  const webTools = await handleWebRequest(
    new Request("https://renderer.example/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {},
      }),
    }),
  );
  assert.equal(webTools.status, 200);
  const webToolsBody = await webTools.json();
  assert.ok(webToolsBody.result.tools.some((tool) => tool.name === RENDER_TOOL_NAME));

  const httpServer = createHttpServer();
  const port = await listen(httpServer);
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const health = await fetch(`${baseUrl}/healthz`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { ok: true });

    const widget = await fetch(`${baseUrl}/widget`);
    assert.equal(widget.status, 200);
    const widgetHtml = await widget.text();
    assert.match(widgetHtml, /text\/html;profile=mcp-app|JSONX Renderer/);
    assert.doesNotMatch(widgetHtml, /src="\.\/widget\.js"/);

    const client = new Client({ name: "jsonx-renderer-smoke", version: "0.1.0" });
    const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`));
    await client.connect(transport);

    const tools = await client.listTools();
    const tool = tools.tools.find((item) => item.name === RENDER_TOOL_NAME);
    assert.ok(tool, "render_jsonx_response tool should be listed");
    assert.equal(tool.annotations?.readOnlyHint, true);
    assert.equal(tool._meta?.ui?.resourceUri, RENDERER_RESOURCE_URI);

    const resource = await client.readResource({ uri: RENDERER_RESOURCE_URI });
    assert.equal(resource.contents[0]?.mimeType, "text/html;profile=mcp-app");
    assert.match(resource.contents[0]?.text ?? "", /jsonx-root/);

    const valid = await client.callTool({
      name: RENDER_TOOL_NAME,
      arguments: {
        purpose: "Render support triage.",
        motionProfile: "subtle-enter",
        payload: {
          component: "DemoShell",
          props: {
            title: "Support Triage",
            summary: "Review open customer issues.",
          },
          children: [
            {
              component: "MetricRow",
              props: {
                items: [
                  { label: "Open cases", value: "18" },
                  { label: "Refund risk", value: "Medium" },
                ],
              },
            },
          ],
        },
      },
    });
    assert.equal(valid.isError, undefined);
    assert.equal(valid.structuredContent.schema, "jsonx.generative-ui.v1");
    assert.equal(valid.structuredContent.motionProfile, "subtle-enter");

    const invalid = await client.callTool({
      name: RENDER_TOOL_NAME,
      arguments: {
        purpose: "Reject unsafe payload.",
        payload: {
          component: "DemoShell",
          props: {
            title: "Unsafe",
            summary: "Should fail.",
            style: { color: "red" },
          },
          children: [],
        },
      },
    });
    assert.equal(invalid.isError, true);
    assert.match(invalid.content[0]?.text ?? "", /Invalid JSONX UI payload/);

    await client.close();
  } finally {
    await new Promise((resolve) => httpServer.close(resolve));
  }

  console.log("jsonx-renderer-app smoke passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
