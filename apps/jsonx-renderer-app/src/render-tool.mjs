import { ALLOWED_MOTION_PROFILES, JSONX_UI_SCHEMA, normalizeRenderInput } from "./jsonx-validator.mjs";

export const RENDER_TOOL_NAME = "render_jsonx_response";
export const RENDERER_RESOURCE_URI = "ui://jsonx/renderer-v1.html";

export const renderJsonxResponseTool = {
  name: RENDER_TOOL_NAME,
  title: "Render JSONX response",
  description:
    "Use this when a model has prepared a safe JSONX UI payload and the user wants it rendered as inline interface output.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["purpose", "payload"],
    properties: {
      purpose: {
        type: "string",
        minLength: 1,
        maxLength: 240,
      },
      motionProfile: {
        type: "string",
        enum: Array.from(ALLOWED_MOTION_PROFILES),
      },
      payload: {
        type: "object",
      },
    },
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["schema", "purpose", "payload"],
    properties: {
      schema: {
        const: JSONX_UI_SCHEMA,
      },
      purpose: {
        type: "string",
      },
      motionProfile: {
        type: "string",
        enum: Array.from(ALLOWED_MOTION_PROFILES),
      },
      payload: {
        type: "object",
      },
    },
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  _meta: {
    ui: {
      resourceUri: RENDERER_RESOURCE_URI,
    },
    "openai/outputTemplate": RENDERER_RESOURCE_URI,
    "openai/toolInvocation/invoking": "Rendering JSONX UI...",
    "openai/toolInvocation/invoked": "Rendered JSONX UI.",
  },
};

export function renderJsonxResponse(input) {
  const normalized = normalizeRenderInput(input);
  if (!normalized.ok) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Invalid JSONX UI payload: ${normalized.errors.join("; ")}`,
        },
      ],
    };
  }

  return {
    structuredContent: normalized.document,
    content: [
      {
        type: "text",
        text: "Rendered JSONX UI.",
      },
    ],
  };
}
