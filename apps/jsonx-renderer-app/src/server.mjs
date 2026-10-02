import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { RENDERER_RESOURCE_URI } from "./render-tool.mjs";
import {
  MCP_PATH,
  MCP_CORS_HEADERS,
  buildWidgetHtml as assembleWidgetHtml,
  createJsonxMcpServer as createMcpServer,
  handleWebRequest as handleAppRequest,
} from "./app.mjs";

const moduleDir = dirname(fileURLToPath(import.meta.url));
const appRoot = findAppRoot();
const webRoot = join(appRoot, "web");
const GSAP_RUNTIME_PATH = join(appRoot, "node_modules", "gsap", "dist", "gsap.min.js");

function findAppRoot() {
  const candidates = [dirname(moduleDir), dirname(dirname(moduleDir)), process.cwd()];
  for (const candidate of [...new Set(candidates)]) {
    if (existsSync(join(candidate, "web", "widget.html"))) {
      return candidate;
    }
  }
  return dirname(moduleDir);
}

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
  return assembleWidgetHtml({
    html: readWebFile("widget.html"),
    css: readWebFile("widget.css"),
    js: readWebFile("widget.js"),
    gsap: readGsapRuntime(),
  });
}

function appOptions() {
  return { getWidgetHtml: buildWidgetHtml, widgetDomain: process.env.JSONX_WIDGET_DOMAIN };
}

export function createJsonxMcpServer() {
  return createMcpServer(appOptions());
}

export function handleWebRequest(request) {
  return handleAppRequest(request, appOptions());
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
  for (const [name, value] of Object.entries(MCP_CORS_HEADERS)) {
    res.setHeader(name, value);
  }
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
