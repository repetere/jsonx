const root = document.getElementById("jsonx-root");
const JSONX_UI_SCHEMA = "jsonx.generative-ui.v1";
const bridgeState = {
  ready: false,
  rpcId: 0,
  pending: new Map(),
};
const uiState = {
  choices: {},
  checklist: {},
  quiz: {},
  sliders: {},
};
const motionState = {
  timeline: null,
};
let currentStructuredContent = null;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char]);
}

function rpcNotify(method, params = {}) {
  window.parent.postMessage({ jsonrpc: "2.0", method, params }, "*");
}

function rpcRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++bridgeState.rpcId;
    const timeout = window.setTimeout(() => {
      bridgeState.pending.delete(id);
      reject(new Error(`Timed out waiting for ${method}`));
    }, 3000);
    bridgeState.pending.set(id, { resolve, reject, timeout });
    window.parent.postMessage({ jsonrpc: "2.0", id, method, params }, "*");
  });
}

async function initializeBridge() {
  try {
    await rpcRequest("ui/initialize", {
      appInfo: { name: "jsonx-renderer", version: "0.1.0" },
      appCapabilities: {},
      protocolVersion: "2026-01-26",
    });
    bridgeState.ready = true;
    rpcNotify("ui/notifications/initialized");
  } catch {
    bridgeState.ready = false;
  }
}

function updateModelContext(summary, structuredContent = {}) {
  if (window.openai?.setWidgetState) {
    window.openai.setWidgetState({ summary, uiState });
  }
  if (!bridgeState.ready) return;
  void rpcRequest("ui/update-model-context", {
    content: [{ type: "text", text: summary }],
    structuredContent,
  }).catch(() => {});
}

function normalizeItem(item, fallbackLabel = "") {
  if (item && typeof item === "object") {
    return {
      label: item.label ?? item.title ?? fallbackLabel,
      value: item.value ?? item.id ?? item.label ?? fallbackLabel,
      status: item.status,
      detail: item.detail ?? item.description,
      priority: item.priority,
    };
  }
  return { label: item ?? fallbackLabel, value: item ?? fallbackLabel };
}

function renderChildren(node, path) {
  const children = node.children;
  if (Array.isArray(children)) {
    return children.map((child, index) => renderNode(child, `${path}-${index}`)).join("");
  }
  return children !== undefined ? renderNode(children, `${path}-child`) : "";
}

function renderMetricRow(props) {
  return `<section class="metric-row">${(props.items || [])
    .map((raw, index) => {
      const item = normalizeItem(raw, `Metric ${index + 1}`);
      return `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong>${
        item.status ? `<small>${escapeHtml(item.status)}</small>` : ""
      }</article>`;
    })
    .join("")}</section>`;
}

function renderDataTable(props) {
  const columns = props.columns || [];
  const rows = props.rows || [];
  return `<div class="jsonx-panel table-panel"><table><thead><tr>${columns
    .map((column) => `<th>${escapeHtml(column.label ?? column.key ?? column)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map((row) => {
      const cells = Array.isArray(row)
        ? row
        : columns.map((column) => row?.[column.key ?? column] ?? "");
      return `<tr>${cells.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`;
    })
    .join("")}</tbody></table></div>`;
}

function renderChecklist(props, path) {
  return `<section class="jsonx-panel"><ul class="checklist">${(props.items || [])
    .map((raw, index) => {
      const item = normalizeItem(raw, `Item ${index + 1}`);
      const key = `${path}-${index}`;
      const checked = uiState.checklist[key] ?? item.status === "done";
      return `<li><label><input type="checkbox" data-jsonx-kind="checklist" data-key="${escapeHtml(
        key,
      )}" ${checked ? "checked" : ""} /><span>${escapeHtml(item.label)}</span></label>${
        item.status ? `<small>${escapeHtml(item.status)}</small>` : ""
      }</li>`;
    })
    .join("")}</ul></section>`;
}

function renderChoiceList(props, path) {
  const multiple = props.selectionMode === "multiple";
  const selected = uiState.choices[path] || [];
  return `<section class="jsonx-panel"><h2>${escapeHtml(props.question)}</h2><div class="choices">${(
    props.items || []
  )
    .map((raw, index) => {
      const item = normalizeItem(raw, `Choice ${index + 1}`);
      const value = String(item.value);
      const isSelected = selected.includes(value);
      return `<button class="choice" type="button" data-jsonx-kind="choice" data-key="${escapeHtml(
        path,
      )}" data-value="${escapeHtml(value)}" data-multiple="${String(multiple)}" aria-pressed="${String(
        isSelected,
      )}">${escapeHtml(item.label)}</button>`;
    })
    .join("")}</div></section>`;
}

function renderActionPanel(props) {
  const actions = [props.primaryAction, props.secondaryAction].filter(Boolean);
  return `<section class="jsonx-panel action-panel"><h2>${escapeHtml(props.title)}</h2><div>${actions
    .map(
      (action) =>
        `<button type="button" data-jsonx-kind="action" data-action="${escapeHtml(action)}">${escapeHtml(action)}</button>`,
    )
    .join("")}</div></section>`;
}

function renderTimeline(props) {
  return `<section class="jsonx-panel"><ol class="timeline">${(props.items || [])
    .map((raw, index) => {
      const item = normalizeItem(raw, `Step ${index + 1}`);
      return `<li><strong>${escapeHtml(item.label)}</strong>${
        item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ""
      }</li>`;
    })
    .join("")}</ol></section>`;
}

function renderQuiz(props, path) {
  return `<section class="jsonx-panel quiz"><h2>Quiz</h2>${(props.questions || [])
    .map((question, questionIndex) => {
      const key = `${path}-${questionIndex}`;
      const selected = uiState.quiz[key];
      return `<fieldset><legend>${escapeHtml(question.prompt ?? question.question)}</legend>${(
        question.choices || []
      )
        .map((choice, choiceIndex) => {
          const item = normalizeItem(choice, `Choice ${choiceIndex + 1}`);
          const value = String(item.value ?? choiceIndex);
          return `<button class="choice" type="button" data-jsonx-kind="quiz" data-key="${escapeHtml(
            key,
          )}" data-value="${escapeHtml(value)}" aria-pressed="${String(selected === value)}">${escapeHtml(
            item.label,
          )}</button>`;
        })
        .join("")}</fieldset>`;
    })
    .join("")}</section>`;
}

function renderSliderPoll(props, path) {
  const min = Number(props.min ?? 0);
  const max = Number(props.max ?? 10);
  const step = Number(props.step ?? 1);
  const value = Number(uiState.sliders[path] ?? props.value ?? min);
  return `<section class="jsonx-panel slider-poll"><h2>${escapeHtml(props.question)}</h2><input type="range" min="${escapeHtml(
    min,
  )}" max="${escapeHtml(max)}" step="${escapeHtml(step)}" value="${escapeHtml(
    value,
  )}" data-jsonx-kind="slider" data-key="${escapeHtml(path)}" /><div class="range-labels"><span>${escapeHtml(
    props.leftLabel ?? min,
  )}</span><strong data-slider-value="${escapeHtml(path)}">${escapeHtml(value)}</strong><span>${escapeHtml(
    props.rightLabel ?? max,
  )}</span></div></section>`;
}

function renderNode(node, path = "root") {
  if (typeof node === "string") return escapeHtml(node);
  if (!node || typeof node !== "object") return "";
  const props = node.props || {};
  const children = renderChildren(node, path);

  switch (node.component) {
    case "DemoShell":
      return `<section class="jsonx-shell"><header><h1>${escapeHtml(props.title)}</h1><p class="muted">${escapeHtml(
        props.summary,
      )}</p></header>${children}</section>`;
    case "SectionHeader":
      return `<header class="section-header"><h2>${escapeHtml(props.title)}</h2><p class="muted">${escapeHtml(
        props.description,
      )}</p></header>`;
    case "TextBlock":
      return `<p>${escapeHtml(props.text)}</p>`;
    case "MetricRow":
      return renderMetricRow(props);
    case "DataTable":
      return renderDataTable(props);
    case "Checklist":
      return renderChecklist(props, path);
    case "ChoiceList":
      return renderChoiceList(props, path);
    case "ActionPanel":
      return renderActionPanel(props);
    case "Timeline":
      return renderTimeline(props);
    case "Alert":
      return `<section class="jsonx-panel alert alert-${escapeHtml(props.tone ?? "info")}"><strong>${escapeHtml(
        props.title,
      )}</strong><p>${children}</p></section>`;
    case "MultipleChoiceQuiz":
      return renderQuiz(props, path);
    case "SliderPoll":
      return renderSliderPoll(props, path);
    default:
      return "";
  }
}

function renderStructuredContent(data) {
  if (!data || data.schema !== JSONX_UI_SCHEMA || !data.payload) {
    cleanupMotion();
    root.innerHTML = `<section class="error-state"><h1>Invalid JSONX UI</h1><p>The tool result did not include a valid JSONX UI envelope.</p></section>`;
    return;
  }

  currentStructuredContent = data;
  cleanupMotion();
  root.innerHTML = renderNode(data.payload);
  applyMotion(data.motionProfile || "none");
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
}

function cleanupMotion() {
  if (motionState.timeline) {
    motionState.timeline.kill();
    motionState.timeline = null;
  }
}

function getGsap() {
  if (!window.JSONX_RENDERER_CONFIG?.gsapMotion) return null;
  return window.gsap || null;
}

function animatedPanels() {
  return Array.from(root.querySelectorAll(".jsonx-shell, .jsonx-panel, .section-header"));
}

function runGsapMotion(profile) {
  const gsap = getGsap();
  if (!gsap || prefersReducedMotion() || profile === "none") return false;

  const panels = animatedPanels();
  if (!panels.length) return false;

  const timeline = gsap.timeline({ defaults: { ease: "power1.out", overwrite: "auto" } });

  if (profile === "subtle-enter") {
    timeline.fromTo(
      panels,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.025, clearProps: "opacity,transform,visibility" },
    );
  }

  if (profile === "state-change-highlight") {
    const active = root.querySelectorAll('.choice[aria-pressed="true"], input:checked + span');
    timeline.fromTo(
      active.length ? active : panels,
      { scale: 0.98 },
      { scale: 1, duration: 0.16, stagger: 0.015, clearProps: "transform" },
    );
  }

  if (profile === "morph-list-to-detail") {
    timeline.fromTo(
      panels,
      { autoAlpha: 0, x: 12, scale: 0.99 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.26, stagger: 0.035, clearProps: "opacity,transform,visibility" },
    );
  }

  motionState.timeline = timeline;
  return timeline.getChildren().length > 0;
}

function applyMotion(profile) {
  root.dataset.motion = profile;
  root.dataset.motionEngine = runGsapMotion(profile) ? "gsap" : "css";
}

function handleRpcResponse(message) {
  const pending = bridgeState.pending.get(message.id);
  if (!pending) return true;
  bridgeState.pending.delete(message.id);
  window.clearTimeout(pending.timeout);
  if (message.error) {
    pending.reject(message.error);
  } else {
    pending.resolve(message.result);
  }
  return true;
}

window.addEventListener(
  "message",
  (event) => {
    if (event.source !== window.parent) return;
    const message = event.data;
    if (!message || message.jsonrpc !== "2.0") return;
    if (typeof message.id === "number") {
      handleRpcResponse(message);
      return;
    }
    if (message.method === "ui/notifications/tool-result") {
      renderStructuredContent(message.params?.structuredContent);
    }
  },
  { passive: true },
);

root.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("[data-jsonx-kind]") : null;
  if (!target) return;

  if (target.dataset.jsonxKind === "choice") {
    const key = target.dataset.key;
    const value = target.dataset.value;
    const multiple = target.dataset.multiple === "true";
    const current = uiState.choices[key] || [];
    uiState.choices[key] = multiple
      ? current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      : [value];
    renderStructuredContent(currentStructuredContent);
    updateModelContext(`User selected ${uiState.choices[key].join(", ")}.`, { choices: uiState.choices[key] });
  }

  if (target.dataset.jsonxKind === "quiz") {
    uiState.quiz[target.dataset.key] = target.dataset.value;
    renderStructuredContent(currentStructuredContent);
    updateModelContext("User answered a quiz question.", { quiz: uiState.quiz });
  }

  if (target.dataset.jsonxKind === "action") {
    const action = target.dataset.action;
    updateModelContext(`User selected action ${action}.`, { action });
  }
});

root.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.dataset.jsonxKind) return;

  if (target.dataset.jsonxKind === "checklist") {
    uiState.checklist[target.dataset.key] = target.checked;
    updateModelContext("User updated the checklist.", { checklist: uiState.checklist });
  }

  if (target.dataset.jsonxKind === "slider") {
    uiState.sliders[target.dataset.key] = target.value;
    updateModelContext(`User set the slider to ${target.value}.`, { sliders: uiState.sliders });
  }
});

root.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.dataset.jsonxKind !== "slider") return;
  const output = root.querySelector(`[data-slider-value="${CSS.escape(target.dataset.key)}"]`);
  if (output) output.textContent = target.value;
});

void initializeBridge();
if (window.openai?.toolOutput) {
  renderStructuredContent(window.openai.toolOutput);
}
