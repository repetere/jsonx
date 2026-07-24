import { handleWebRequest } from "../../src/server.mjs";

export default async function jsonxRenderer(request) {
  return handleWebRequest(request);
}

export const config = {
  path: ["/", "/healthz", "/widget", "/mcp"],
  method: ["GET", "POST", "DELETE", "OPTIONS"],
};
