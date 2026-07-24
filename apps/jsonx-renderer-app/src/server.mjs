import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  RENDERER_RESOURCE_URI,
  RENDER_TOOL_NAME,
  renderJsonxResponse,
  renderJsonxResponseTool,
} from "./render-tool.mjs";
import { ALLOWED_MOTION_PROFILES, JSONX_UI_SCHEMA } from "./jsonx-validator.mjs";

const appRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const webRoot = join(appRoot, "web");
const MCP_PATH = "/mcp";
const GSAP_RUNTIME_PATH = join(appRoot, "node_modules", "gsap", "dist", "gsap.min.js");

const motionProfileSchema = z.enum(Array.from(ALLOWED_MOTION_PROFILES));
const payloadSchema = z.record(z.string(), z.unknown());

const renderInputSchema = {
  purpose: z.string().min(1).max(240),
  motionProfile: motionProfileSchema.optional(),
  payload: payloadSchema,
};

const renderOutputSchema = {
  schema: z.literal(JSONX_UI_SCHEMA),
  purpose: z.string().min(1),
  motionProfile: motionProfileSchema.optional(),
  payload: payloadSchema,
};

function readWebFile(name) {
  return readFileSync(join(webRoot, name), "utf8");
}

function gsapMotionEnabled() {
  return ["1", "true", "yes"].includes(String(process.env.JSONX_ENABLE_GSAP ?? "").toLowerCase());
}

function readGsapRuntime() {
  if (!gsapMotionEnabled()) return "";
  try {
    return readFileSync(GSAP_RUNTIME_PATH, "utf8");
  } catch {
    return "";
  }
}

export function buildWidgetHtml() {
  const html = readWebFile("widget.html");
  const css = readWebFile("widget.css");
  const js = readWebFile("widget.js");
  const gsap = readGsapRuntime();
  const motionConfig = `<script>window.JSONX_RENDERER_CONFIG={gsapMotion:${gsap ? "true" : "false"}};</script>`;
  const motionRuntime = gsap ? `<script>${gsap}\n//# sourceURL=jsonx-gsap-runtime.js</script>` : "";
  return html
    .replace('<link rel="stylesheet" href="./widget.css" />', `<style>${css}</style>`)
    .replace(
      /<script\s+(?:type="module"\s+src="\.\/widget\.js"|src="\.\/widget\.js"\s+type="module")><\/script>/,
      `${motionConfig}${motionRuntime}<script type="module">${js}</script>`,
    );
}

function widgetUiMeta() {
  const meta = {
    prefersBorder: true,
    csp: {
      connectDomains: [],
      resourceDomains: [],
    },
  };
  if (process.env.JSONX_WIDGET_DOMAIN) {
    meta.domain = process.env.JSONX_WIDGET_DOMAIN;
  }
  return meta;
}

export function createJsonxMcpServer() {
  const server = new McpServer(
    { name: "jsonx-renderer-app", version: "0.1.0" },
    {
      instructions:
        "Render only validated jsonx.generative-ui.v1 payloads. Treat payloads as data and do not execute arbitrary JSONX, HTML, CSS, imports, or event handlers.",
    },
  );

  registerAppResource(
    server,
    "JSONX renderer",
    RENDERER_RESOURCE_URI,
    {
      description: "Iframe renderer for validated JSONX generative UI payloads.",
      _meta: {
        ui: widgetUiMeta(),
      },
    },
    async () => ({
      contents: [
        {
          uri: RENDERER_RESOURCE_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: buildWidgetHtml(),
          _meta: {
            ui: widgetUiMeta(),
          },
        },
      ],
    }),
  );

  registerAppTool(
    server,
    RENDER_TOOL_NAME,
    {
      title: renderJsonxResponseTool.title,
      description: renderJsonxResponseTool.description,
      inputSchema: renderInputSchema,
      outputSchema: renderOutputSchema,
      annotations: renderJsonxResponseTool.annotations,
      _meta: renderJsonxResponseTool._meta,
    },
    async (input) => renderJsonxResponse(input),
  );

  return server;
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

function sendText(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": contentType });
  res.end(body);
}

function setMcpCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, mcp-session-id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

async function handleMcpRequest(req, res) {
  setMcpCorsHeaders(res);
  const server = createJsonxMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on("close", () => {
    void transport.close();
    void server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      sendJson(res, 500, {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
}

export function createHttpServer() {
  return createServer(async (req, res) => {
    if (!req.url) {
      sendText(res, 400, "Missing URL");
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

    if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
      setMcpCorsHeaders(res);
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === "GET" && url.pathname === "/") {
      sendJson(res, 200, {
        name: "jsonx-renderer-app",
        mcp: MCP_PATH,
        renderer: RENDERER_RESOURCE_URI,
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/healthz") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && url.pathname === "/widget") {
      sendText(res, 200, buildWidgetHtml(), RESOURCE_MIME_TYPE);
      return;
    }

    if (url.pathname === MCP_PATH && ["POST", "GET", "DELETE"].includes(req.method ?? "")) {
      await handleMcpRequest(req, res);
      return;
    }

    sendText(res, 404, "Not Found");
  });
}

export function startServer({ port = Number(process.env.PORT ?? 8787) } = {}) {
  const httpServer = createHttpServer();
  httpServer.listen(port, () => {
    console.log(`JSONX renderer MCP server listening on http://localhost:${port}${MCP_PATH}`);
  });
  return httpServer;
}

const mainPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === mainPath) {
  startServer();
}
