import html from "../web/widget.html";
import css from "../web/widget.css";
import js from "../web/widget.js";
import gsap from "gsap/dist/gsap.min.js";
import { buildWidgetHtml, handleWebRequest } from "./app.mjs";

// Assets are imported as text at build time. No filesystem, Node server, or CDN
// is needed in the Worker. Only the enabled variant sends GSAP to the iframe.
const widgets = new Map();

function getWidgetHtml(enabled) {
  if (!widgets.has(enabled)) {
    widgets.set(enabled, buildWidgetHtml({ html, css, js, gsap: enabled ? gsap : "" }));
  }
  return widgets.get(enabled);
}

export default {
  fetch(request, env = {}) {
    const enabled = ["1", "true", "yes"].includes(String(env.JSONX_ENABLE_GSAP ?? "").toLowerCase());
    return handleWebRequest(request, {
      getWidgetHtml: () => getWidgetHtml(enabled),
      widgetDomain: env.JSONX_WIDGET_DOMAIN,
    });
  },
};
