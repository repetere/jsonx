export const RENDER_TOOL_NAME = "render_jsonx_response";
export const JSONX_UI_SCHEMA = "jsonx.generative-ui.v1";
export const RENDERER_RESOURCE_URI = "ui://jsonx/renderer.html";

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
        enum: ["none", "subtle-enter", "morph-list-to-detail", "state-change-highlight"],
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
        enum: ["none", "subtle-enter", "morph-list-to-detail", "state-change-highlight"],
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
  },
};

export function renderJsonxResponse(input) {
  const result = {
    schema: JSONX_UI_SCHEMA,
    purpose: input.purpose,
    payload: input.payload,
  };

  if (input.motionProfile) {
    result.motionProfile = input.motionProfile;
  }

  return {
    structuredContent: result,
    content: [
      {
        type: "text",
        text: "Rendered JSONX UI.",
      },
    ],
  };
}
