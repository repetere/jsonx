const root = document.getElementById("jsonx-root");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char]);
}

function renderNode(node) {
  if (typeof node === "string") return escapeHtml(node);
  if (!node || typeof node !== "object") return "";
  const props = node.props || {};
  const children = Array.isArray(node.children)
    ? node.children.map(renderNode).join("")
    : node.children
      ? renderNode(node.children)
      : "";

  switch (node.component) {
    case "DemoShell":
      return `<section class="jsonx-shell"><h1>${escapeHtml(props.title)}</h1><p class="muted">${escapeHtml(
        props.summary,
      )}</p>${children}</section>`;
    case "TextBlock":
      return `<p>${escapeHtml(props.text)}</p>`;
    case "Checklist":
      return `<ul>${(props.items || [])
        .map((item) => `<li><strong>${escapeHtml(item.status || "open")}</strong> ${escapeHtml(item.label)}</li>`)
        .join("")}</ul>`;
    case "ChoiceList":
      return `<section class="jsonx-panel"><h2>${escapeHtml(props.question)}</h2><div class="choices">${(
        props.items || []
      )
        .map((item) => `<button class="choice" type="button">${escapeHtml(item.label || item)}</button>`)
        .join("")}</div></section>`;
    case "DataTable":
      return `<div class="jsonx-panel"><table><thead><tr>${(props.columns || [])
        .map((column) => `<th>${escapeHtml(column)}</th>`)
        .join("")}</tr></thead><tbody>${(props.rows || [])
        .map((row) => {
          const cells = Array.isArray(row) ? row : [];
          return `<tr>${cells.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`;
        })
        .join("")}</tbody></table></div>`;
    case "Alert":
      return `<section class="jsonx-panel"><strong>${escapeHtml(props.title)}</strong><p>${children}</p></section>`;
    default:
      return "";
  }
}

function renderStructuredContent(data) {
  if (!data || data.schema !== "jsonx.generative-ui.v1" || !data.payload) {
    root.innerHTML = `<section class="error-state"><h1>Invalid JSONX UI</h1><p>The tool result did not include a valid JSONX UI envelope.</p></section>`;
    return;
  }

  root.innerHTML = renderNode(data.payload);
}

window.addEventListener(
  "message",
  (event) => {
    if (event.source !== window.parent) return;
    const message = event.data;
    if (!message || message.jsonrpc !== "2.0") return;
    if (message.method !== "ui/notifications/tool-result") return;
    renderStructuredContent(message.params?.structuredContent);
  },
  { passive: true },
);
