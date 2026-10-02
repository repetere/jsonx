// Shared MCP and Web-standard request handling. No Node APIs or filesystem access.
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import {
  RENDERER_RESOURCE_URI,
  RENDER_TOOL_NAME,
  renderJsonxResponse,
  renderJsonxResponseTool,
} from "./render-tool.mjs";
import { ALLOWED_MOTION_PROFILES, JSONX_UI_SCHEMA } from "./jsonx-validator.mjs";

export const MCP_PATH = "/mcp";

export const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, mcp-session-id, mcp-protocol-version, last-event-id",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

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

export function buildWidgetHtml({ html, css, js, gsap = "" }) {
  const motionConfig = `<script>window.JSONX_RENDERER_CONFIG={gsapMotion:${gsap ? "true" : "false"}};</script>`;
  const motionRuntime = gsap ? `<script>${gsap}\n//# sourceURL=jsonx-gsap-runtime.js</script>` : "";
  return html
    .replace('<link rel="stylesheet" href="./widget.css" />', `<style>${css}</style>`)
    .replace(
      /<script\s+(?:type="module"\s+src="\.\/widget\.js"|src="\.\/widget\.js"\s+type="module")><\/script>/,
      `${motionConfig}${motionRuntime}<script type="module">${js}</script>`,
    );
}

function widgetUiMeta(widgetDomain) {
  const meta = {
    prefersBorder: true,
    csp: {
      connectDomains: [],
      resourceDomains: [],
    },
  };
  if (widgetDomain) {
    meta.domain = widgetDomain;
  }
  return meta;
}

export function createJsonxMcpServer({ getWidgetHtml, widgetDomain } = {}) {
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
        ui: widgetUiMeta(widgetDomain),
      },
    },
    async () => ({
      contents: [
        {
          uri: RENDERER_RESOURCE_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: getWidgetHtml(),
          _meta: {
            ui: widgetUiMeta(widgetDomain),
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

function jsonResponse(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });
}

function textResponse(status, body, contentType = "text/plain; charset=utf-8", headers = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      ...headers,
    },
  });
}

function withMcpCorsHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(MCP_CORS_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function handleWebRequest(request, options) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS" && url.pathname === MCP_PATH) {
    return new Response(null, {
      status: 204,
      headers: MCP_CORS_HEADERS,
    });
  }

  if (request.method === "GET" && url.pathname === "/") {
    return jsonResponse(200, {
      name: "jsonx-renderer-app",
      mcp: MCP_PATH,
      renderer: RENDERER_RESOURCE_URI,
    });
  }

  if (request.method === "GET" && url.pathname === "/healthz") {
    return jsonResponse(200, { ok: true });
  }

  if (request.method === "GET" && url.pathname === "/widget") {
    return textResponse(200, options.getWidgetHtml(), RESOURCE_MIME_TYPE);
  }

  if (url.pathname === MCP_PATH && ["POST", "GET", "DELETE"].includes(request.method)) {
    const server = createJsonxMcpServer(options);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    try {
      await server.connect(transport);
      const response = await transport.handleRequest(request);
      return withMcpCorsHeaders(response);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      return withMcpCorsHeaders(
        jsonResponse(500, {
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        }),
      );
    } finally {
      await transport.close();
      await server.close();
    }
  }

  return textResponse(404, "Not Found");
}

