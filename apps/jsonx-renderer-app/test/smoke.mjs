import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { buildWidgetHtml, createHttpServer } from "../src/server.mjs";
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
