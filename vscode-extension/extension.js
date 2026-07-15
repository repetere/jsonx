const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

const SCHEMA = "jsonx.generative-ui.v1";

const allowedComponents = {
  DemoShell: ["title", "summary"],
  SectionHeader: ["title", "description"],
  MetricRow: ["items"],
  DataTable: ["columns", "rows"],
  Checklist: ["items"],
  ActionPanel: ["title", "primaryAction", "secondaryAction"],
  Timeline: ["items"],
  Alert: ["tone", "title"],
  TextBlock: ["text"],
  MultipleChoiceQuiz: ["questions"],
  SliderPoll: ["question", "min", "max", "step", "value", "leftLabel", "rightLabel"],
  ChoiceList: ["question", "items", "selectionMode"],
};

const allowedActions = new Set([
  "open_detail",
  "draft_response",
  "approve_item",
  "reject_item",
  "filter_table",
  "draft_refund_response",
  "open_customer_timeline",
  "submit_quiz",
  "submit_poll",
  "submit_choice",
]);

const blockedKeys = new Set([
  "__dangerouslyEvalProps",
  "__dangerouslyBindEvalProps",
  "__dangerouslyEvalAllProps",
  "__dangerouslyInsertFunctionComponents",
  "__dangerouslyInsertClassComponents",
  "__dangerouslyInsertComponents",
  "__dangerouslyInsertReactComponents",
  "__dangerouslyInsertJSONXComponents",
  "__functionProps",
  "windowprops",
  "dangerouslySetInnerHTML",
  "style",
]);

let panel;
let latestFile;
let refreshTimer;

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("jsonxGenerativeUi.openLatest", openLatestGeneratedUi),
    vscode.commands.registerCommand("jsonxGenerativeUi.openFile", openGeneratedUiFromFile),
    vscode.commands.registerCommand("jsonxGenerativeUi.createQuizExample", () => createExample("quiz")),
    vscode.commands.registerCommand("jsonxGenerativeUi.createPollExample", () => createExample("poll")),
  );

  for (const folder of vscode.workspace.workspaceFolders || []) {
    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(folder, ".jsonx/ui/*.json"),
    );
    watcher.onDidCreate((uri) => maybeAutoOpen(uri), null, context.subscriptions);
    watcher.onDidChange((uri) => maybeAutoOpen(uri), null, context.subscriptions);
    context.subscriptions.push(watcher);
  }
}

async function maybeAutoOpen(uri) {
  latestFile = uri;
  const config = vscode.workspace.getConfiguration("jsonxGenerativeUi");
  if (!config.get("autoOpen", true)) {
    return;
  }
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    renderUri(uri).catch((error) => showError(error));
  }, 150);
}

async function openLatestGeneratedUi() {
  const uri = latestFile || (await findLatestPayload());
  if (!uri) {
    vscode.window.showInformationMessage("No JSONX generated UI files found under .jsonx/ui.");
    return;
  }
  await renderUri(uri);
}

async function openGeneratedUiFromFile() {
  const selections = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    filters: { JSON: ["json"] },
    title: "Open JSONX Generated UI",
  });
  if (!selections || !selections[0]) {
    return;
  }
  await renderUri(selections[0]);
}

async function findLatestPayload() {
  const files = await vscode.workspace.findFiles("**/.jsonx/ui/*.json", "**/node_modules/**", 50);
  if (!files.length) {
    return undefined;
  }
  const withStats = await Promise.all(
    files.map(async (uri) => ({ uri, mtime: (await fs.promises.stat(uri.fsPath)).mtimeMs })),
  );
  withStats.sort((a, b) => b.mtime - a.mtime);
  return withStats[0].uri;
}

async function renderUri(uri) {
  latestFile = uri;
  const file = await readPayload(uri);
  const errors = validateNode(file.payload);
  showPanel({
    title: file.title || "JSONX Generated UI",
    source: file.source || "workspace",
    filePath: uri.fsPath,
    payload: file.payload,
    errors,
  });
}

async function readPayload(uri) {
  const raw = await fs.promises.readFile(uri.fsPath, "utf8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON in ${uri.fsPath}: ${error.message}`);
  }
  const payload = json.payload || json.jsonx || json;
  if (!payload || typeof payload !== "object") {
    throw new Error(`Missing JSONX payload in ${uri.fsPath}`);
  }
  return {
    schema: json.schema || SCHEMA,
    source: json.source,
    title: json.title || payload.props?.title,
    payload,
  };
}

function validateNode(node, location = "payload", errors = []) {
  if (typeof node === "string") {
    return errors;
  }
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    errors.push(`${location} must be a string or component object`);
    return errors;
  }

  for (const key of Object.keys(node)) {
    if (isBlockedKey(key)) {
      errors.push(`${location}.${key} is blocked`);
    }
  }

  const component = node.component;
  if (!component || !allowedComponents[component]) {
    errors.push(`${location}.component must be an allowed component`);
  }

  const props = node.props || {};
  if (props && (typeof props !== "object" || Array.isArray(props))) {
    errors.push(`${location}.props must be an object`);
    return errors;
  }

  const allowedProps = allowedComponents[component] || [];
  for (const key of Object.keys(props)) {
    if (isBlockedKey(key) || !allowedProps.includes(key)) {
      errors.push(`${location}.props.${key} is not allowed`);
    }
  }

  for (const action of [props.primaryAction, props.secondaryAction].filter(Boolean)) {
    if (!allowedActions.has(action)) {
      errors.push(`${location} action ${action} is not allowed`);
    }
  }

  if (component === "MultipleChoiceQuiz") {
    validateQuiz(props.questions, `${location}.props.questions`, errors);
  }
  if (component === "SliderPoll") {
    validateSlider(props, `${location}.props`, errors);
  }

  const children = node.children;
  if (Array.isArray(children)) {
    children.forEach((child, index) => validateNode(child, `${location}.children[${index}]`, errors));
  } else if (children !== undefined && typeof children !== "string") {
    validateNode(children, `${location}.children`, errors);
  }

  return errors;
}

function validateQuiz(questions, location, errors) {
  if (!Array.isArray(questions) || !questions.length) {
    errors.push(`${location} must be a non-empty array`);
    return;
  }
  questions.slice(0, 10).forEach((question, index) => {
    const itemLocation = `${location}[${index}]`;
    if (!question || typeof question !== "object" || Array.isArray(question)) {
      errors.push(`${itemLocation} must be an object`);
      return;
    }
    const choices = Array.isArray(question.choices) ? question.choices : [];
    if (typeof question.prompt !== "string" || !question.prompt.trim()) {
      errors.push(`${itemLocation}.prompt is required`);
    }
    if (choices.length < 2) {
      errors.push(`${itemLocation}.choices must include at least two choices`);
    }
    if (
      question.answer !== undefined &&
      (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= choices.length)
    ) {
      errors.push(`${itemLocation}.answer must be a valid choice index`);
    }
  });
}

function validateSlider(props, location, errors) {
  const min = Number(props.min);
  const max = Number(props.max);
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) {
    errors.push(`${location}.min and ${location}.max must define a valid range`);
  }
  if (props.step !== undefined && (!Number.isFinite(Number(props.step)) || Number(props.step) <= 0)) {
    errors.push(`${location}.step must be greater than 0`);
  }
}

function isBlockedKey(key) {
  return blockedKeys.has(key) || key.startsWith("on") || key.toLowerCase().includes("html");
}

function showPanel(model) {
  if (!panel) {
    panel = vscode.window.createWebviewPanel(
      "jsonxGenerativeUi",
      "JSONX Generated UI",
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    panel.onDidDispose(() => {
      panel = undefined;
    });
  }
  panel.title = model.title || "JSONX Generated UI";
  panel.webview.html = getWebviewHtml(panel.webview, model);
  panel.reveal(vscode.ViewColumn.Beside);
}

async function createExample(kind) {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) {
    vscode.window.showWarningMessage("Open a workspace folder before creating a JSONX UI example.");
    return;
  }
  const outputDir = path.join(folder.uri.fsPath, ".jsonx", "ui");
  await fs.promises.mkdir(outputDir, { recursive: true });
  const fileName = kind === "poll" ? "example-slider-poll.json" : "example-quiz.json";
  const filePath = path.join(outputDir, fileName);
  const payload = kind === "poll" ? pollExample("vscode") : quizExample("vscode");
  await fs.promises.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await renderUri(vscode.Uri.file(filePath));
}

function quizExample(source) {
  return {
    schema: SCHEMA,
    source,
    title: "Practice Quiz",
    payload: {
      component: "DemoShell",
      props: {
        title: "Practice Quiz",
        summary: "Answer two practice questions and check your reasoning.",
      },
      children: [
        {
          component: "MultipleChoiceQuiz",
          props: {
            questions: [
              {
                id: "q1",
                prompt: "Which output is safest for an IDE-rendered generated UI?",
                choices: [
                  "Inline JavaScript with event handlers",
                  "A validated JSONX payload using allowlisted components",
                  "Raw HTML from the model",
                  "A browser API key stored in local storage",
                ],
                answer: 1,
                explanation: "The host can validate a JSONX payload before rendering it.",
              },
              {
                id: "q2",
                prompt: "Where should an IDE-connected agent write generated UI payloads?",
                choices: [
                  ".jsonx/ui/*.json",
                  "node_modules/jsonx/ui.json",
                  "dist/index.web.js",
                  ".git/config",
                ],
                answer: 0,
                explanation: "The extension watches .jsonx/ui/*.json files in the workspace.",
              },
            ],
          },
        },
      ],
    },
  };
}

function pollExample(source) {
  return {
    schema: SCHEMA,
    source,
    title: "Priority Poll",
    payload: {
      component: "DemoShell",
      props: {
        title: "Priority Poll",
        summary: "Capture a quick priority rating for the proposed work.",
      },
      children: [
        {
          component: "SliderPoll",
          props: {
            question: "How urgent is this change?",
            min: 1,
            max: 5,
            step: 1,
            value: 3,
            leftLabel: "Low",
            rightLabel: "High",
          },
        },
      ],
    },
  };
}

function getWebviewHtml(webview, model) {
  const nonce = getNonce();
  const data = JSON.stringify(model).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <title>${escapeHtml(model.title)}</title>
  <style>
    :root { color-scheme: light dark; --border: color-mix(in srgb, currentColor 18%, transparent); --muted: color-mix(in srgb, currentColor 68%, transparent); --panel: color-mix(in srgb, currentColor 5%, transparent); --accent: #2563eb; --danger: #b42318; --ok: #047857; }
    body { margin: 0; padding: 20px; font: 13px/1.5 var(--vscode-font-family); color: var(--vscode-foreground); background: var(--vscode-editor-background); }
    .chrome { display: grid; gap: 16px; max-width: 1040px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; gap: 16px; align-items: start; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
    h1, h2, h3, h4, p { margin-top: 0; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    h3 { font-size: 18px; margin-bottom: 6px; }
    h4 { font-size: 14px; margin-bottom: 4px; }
    code, pre { font-family: var(--vscode-editor-font-family); }
    small { color: var(--muted); overflow-wrap: anywhere; }
    .error { border: 1px solid color-mix(in srgb, var(--danger) 50%, transparent); background: color-mix(in srgb, var(--danger) 10%, transparent); padding: 12px; }
    .ok { color: var(--ok); }
    .generated-shell, .panel { border: 1px solid var(--border); background: var(--panel); padding: 16px; }
    .generated-shell { display: grid; gap: 14px; }
    .generated-section { border-top: 1px solid var(--border); padding-top: 12px; }
    .metric-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
    .metric-row span { border: 1px solid var(--border); padding: 10px; background: color-mix(in srgb, currentColor 3%, transparent); }
    .metric-row strong { display: block; font-size: 18px; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; overflow-x: auto; display: block; }
    th, td { border-bottom: 1px solid var(--border); padding: 8px; text-align: left; vertical-align: top; }
    ul, ol { padding-left: 20px; }
    button { border: 1px solid var(--accent); background: var(--accent); color: #fff; padding: 7px 10px; cursor: pointer; }
    button.secondary { color: var(--vscode-foreground); border-color: var(--border); background: transparent; }
    .quiz-question { border-top: 1px solid var(--border); padding-top: 12px; }
    .choices { display: grid; gap: 8px; margin: 10px 0; }
    .choice { text-align: left; border-color: var(--border); background: transparent; color: var(--vscode-foreground); }
    .choice.selected { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 14%, transparent); }
    .feedback { margin-top: 8px; color: var(--muted); }
    .slider-value { font-weight: 700; }
    input[type="range"] { width: 100%; }
    .range-labels { display: flex; justify-content: space-between; color: var(--muted); }
    .action-log { border-top: 1px solid var(--border); padding-top: 12px; }
    .raw { white-space: pre-wrap; overflow: auto; max-height: 280px; }
  </style>
</head>
<body>
  <main class="chrome">
    <section class="header">
      <div>
        <h1>${escapeHtml(model.title)}</h1>
        <small>${escapeHtml(model.source)} · ${escapeHtml(model.filePath)}</small>
      </div>
      <div id="status" class="${model.errors.length ? "error" : "ok"}">${model.errors.length ? `${model.errors.length} validation issue(s)` : "Payload passed validation"}</div>
    </section>
    <section id="root"></section>
    <section class="panel">
      <h2>Payload</h2>
      <pre class="raw"><code>${escapeHtml(JSON.stringify(model.payload, null, 2))}</code></pre>
    </section>
  </main>
  <script nonce="${nonce}">
    const model = ${data};
    const log = [];
    const selected = new Map();
    const sliderValues = new Map();
    const root = document.getElementById("root");

    function esc(value) {
      return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      })[char]);
    }

    function renderNode(node, path = "root") {
      if (typeof node === "string") return esc(node);
      const props = node.props || {};
      const children = Array.isArray(node.children)
        ? node.children.map((child, index) => renderNode(child, path + ".children[" + index + "]")).join("")
        : esc(node.children || "");
      switch (node.component) {
        case "DemoShell":
          return '<div class="generated-shell"><div><h3>' + esc(props.title) + '</h3><p>' + esc(props.summary || "") + '</p></div>' + children + renderLog() + '</div>';
        case "SectionHeader":
          return '<section class="generated-section"><h4>' + esc(props.title) + '</h4><p>' + esc(props.description || "") + '</p></section>';
        case "MetricRow":
          return '<div class="metric-row">' + (props.items || []).slice(0, 4).map((item) => '<span>' + esc(item.label) + '<strong>' + esc(item.value) + '</strong></span>').join("") + '</div>';
        case "DataTable":
          return '<table><thead><tr>' + (props.columns || []).map((column) => '<th>' + esc(column) + '</th>').join("") + '</tr></thead><tbody>' + (props.rows || []).slice(0, 6).map((row) => '<tr>' + row.map((cell) => '<td>' + esc(cell) + '</td>').join("") + '</tr>').join("") + '</tbody></table>';
        case "Checklist":
          return '<ul>' + (props.items || []).map((item) => '<li><strong>' + esc(item.status || "open") + '</strong> · ' + esc(item.label) + '</li>').join("") + '</ul>';
        case "Timeline":
          return '<ol>' + (props.items || []).map((item) => '<li><strong>' + esc(item.time || "") + '</strong> ' + esc(item.label) + '</li>').join("") + '</ol>';
        case "Alert":
          return '<div class="error"><strong>' + esc(props.title) + '</strong><p>' + children + '</p></div>';
        case "TextBlock":
          return '<p>' + esc(props.text) + '</p>';
        case "ActionPanel":
          return '<section class="generated-section"><h4>' + esc(props.title) + '</h4><p>' + children + '</p>' + actionButton(props.primaryAction, "primary") + ' ' + actionButton(props.secondaryAction, "secondary") + '</section>';
        case "MultipleChoiceQuiz":
          return renderQuiz(props.questions || [], path);
        case "SliderPoll":
          return renderSlider(props, path);
        case "ChoiceList":
          return renderChoiceList(props, path);
        default:
          return "";
      }
    }

    function actionButton(action, variant) {
      if (!action) return "";
      const cls = variant === "secondary" ? "secondary" : "";
      return '<button class="' + cls + '" data-action="' + esc(action) + '">' + esc(action.replace(/_/g, " ")) + '</button>';
    }

    function renderQuiz(questions, basePath) {
      return '<section class="generated-section"><h4>Quiz</h4>' + questions.map((question, index) => {
        const key = basePath + "." + (question.id || index);
        const selectedIndex = selected.get(key);
        const feedback = selectedIndex === undefined ? "" : '<p class="feedback">' + (selectedIndex === question.answer ? "Correct. " : "Review this one. ") + esc(question.explanation || "") + '</p>';
        return '<div class="quiz-question"><p><strong>' + esc(index + 1) + '.</strong> ' + esc(question.prompt) + '</p><div class="choices">' + (question.choices || []).map((choice, choiceIndex) => {
          const cls = selectedIndex === choiceIndex ? "choice selected" : "choice";
          return '<button class="' + cls + '" data-quiz="' + esc(key) + '" data-choice="' + choiceIndex + '">' + esc(choice) + '</button>';
        }).join("") + '</div>' + feedback + '</div>';
      }).join("") + '</section>';
    }

    function renderSlider(props, path) {
      const value = sliderValues.get(path) ?? Number(props.value ?? props.min ?? 0);
      return '<section class="generated-section"><h4>' + esc(props.question) + '</h4><input type="range" min="' + esc(props.min) + '" max="' + esc(props.max) + '" step="' + esc(props.step || 1) + '" value="' + esc(value) + '" data-slider="' + esc(path) + '"/><div class="range-labels"><span>' + esc(props.leftLabel || props.min) + '</span><span class="slider-value">' + esc(value) + '</span><span>' + esc(props.rightLabel || props.max) + '</span></div><p><button data-action="submit_poll">Submit poll</button></p></section>';
    }

    function renderChoiceList(props, path) {
      return '<section class="generated-section"><h4>' + esc(props.question) + '</h4><div class="choices">' + (props.items || []).map((item, index) => '<button class="choice" data-action="submit_choice" data-choice-list="' + esc(path) + '" data-choice="' + index + '">' + esc(item.label || item) + '</button>').join("") + '</div></section>';
    }

    function renderLog() {
      return '<div class="action-log"><strong>Action log</strong><ol>' + log.map((item) => '<li>' + esc(item) + '</li>').join("") + '</ol></div>';
    }

    function redraw() {
      if (model.errors.length) {
        root.innerHTML = '<section class="error"><h2>Validation issues</h2><ul>' + model.errors.map((error) => '<li>' + esc(error) + '</li>').join("") + '</ul></section>';
      } else {
        root.innerHTML = renderNode(model.payload);
      }
      wire();
    }

    function wire() {
      root.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("click", () => {
          log.unshift(new Date().toLocaleTimeString() + " " + button.dataset.action);
          redraw();
        });
      });
      root.querySelectorAll("[data-quiz]").forEach((button) => {
        button.addEventListener("click", () => {
          selected.set(button.dataset.quiz, Number(button.dataset.choice));
          log.unshift(new Date().toLocaleTimeString() + " selected answer " + (Number(button.dataset.choice) + 1));
          redraw();
        });
      });
      root.querySelectorAll("[data-slider]").forEach((input) => {
        input.addEventListener("input", () => {
          sliderValues.set(input.dataset.slider, Number(input.value));
          redraw();
        });
      });
    }

    redraw();
  </script>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char]);
}

function getNonce() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 32; i += 1) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}

function showError(error) {
  vscode.window.showErrorMessage(error instanceof Error ? error.message : String(error));
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
