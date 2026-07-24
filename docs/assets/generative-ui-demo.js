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

const allowedActions = [
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
];

const blocked = [
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
];

const fixtures = {
  quiz: {
    label: "Practice quiz",
    prompt: "Help me study A* search with a multiple-choice quiz.",
    payload: {
      component: "DemoShell",
      props: {
        title: "A* Search Practice Quiz",
        summary: "Answer three practice questions about frontier ordering and heuristic use.",
      },
      children: [
        {
          component: "MultipleChoiceQuiz",
          props: {
            questions: [
              {
                id: "q1",
                prompt: "What does A* prioritize when choosing the next node?",
                choices: [
                  "Lowest g(n) only",
                  "Lowest h(n) only",
                  "Lowest f(n) = g(n) + h(n)",
                  "Highest path cost",
                ],
                answer: 2,
                explanation: "A* uses known path cost plus the heuristic estimate.",
              },
              {
                id: "q2",
                prompt: "What makes a heuristic admissible?",
                choices: [
                  "It never overestimates the true remaining cost.",
                  "It always returns zero.",
                  "It ignores terrain costs.",
                  "It ranks nodes by insertion order.",
                ],
                answer: 0,
                explanation: "An admissible heuristic is optimistic about the remaining cost.",
              },
            ],
          },
        },
      ],
    },
  },
  poll: {
    label: "Slider poll",
    prompt: "Poll the team on how urgent this feature is.",
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
  },
  support: {
    label: "Support triage",
    prompt: "Create a support triage screen for a refund request.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Customer Support Triage",
        summary: "Refund request from a high-value customer with a delayed shipment.",
      },
      children: [
        {
          component: "MetricRow",
          props: {
            items: [
              { label: "Open cases", value: "18", status: "watch" },
              { label: "Refund risk", value: "Medium", status: "warn" },
              { label: "SLA", value: "4h left", status: "ok" },
            ],
          },
        },
        {
          component: "DataTable",
          props: {
            columns: ["Signal", "Detail", "Priority"],
            rows: [
              ["Order delay", "Package is 6 days late", "High"],
              ["Customer tier", "Enterprise buyer", "High"],
              ["Policy fit", "Refund exception may apply", "Medium"],
            ],
          },
        },
        {
          component: "ActionPanel",
          props: {
            title: "Recommended next step",
            primaryAction: "draft_refund_response",
            secondaryAction: "open_customer_timeline",
          },
          children: "Review the customer timeline before sending the response.",
        },
      ],
    },
  },
  privacy: {
    label: "Privacy review",
    prompt: "Create a data privacy review checklist for a new data-sharing request.",
    payload: {
      component: "DemoShell",
      props: {
        title: "Data Privacy Review",
        summary: "Checklist for a proposed analytics data share.",
      },
      children: [
        {
          component: "SectionHeader",
          props: {
            title: "Required controls",
            description: "Confirm that the request meets minimization and retention requirements.",
          },
        },
        {
          component: "Checklist",
          props: {
            items: [
              { label: "Confirm lawful basis", status: "required" },
              { label: "Remove direct identifiers", status: "required" },
              { label: "Set 30-day retention window", status: "required" },
              { label: "Document recipient access", status: "required" },
            ],
          },
        },
        {
          component: "Timeline",
          props: {
            items: [
              { label: "Request received", time: "09:10" },
              { label: "DPIA started", time: "10:30" },
              { label: "Security review pending", time: "Next" },
            ],
          },
        },
        {
          component: "ActionPanel",
          props: {
            title: "Decision",
            primaryAction: "approve_item",
            secondaryAction: "reject_item",
          },
          children: "Approve only after the retention and access notes are complete.",
        },
      ],
    },
  },
};

function esc(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char]);
}

function validateNode(node, path = "root", errors = []) {
  if (typeof node === "string") return errors;
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    errors.push(`${path} must be a string or component object`);
    return errors;
  }

  for (const key of Object.keys(node)) {
    if (isBlockedKey(key)) errors.push(`${path}.${key} is blocked`);
  }

  const component = node.component;
  if (!component || !allowedComponents[component]) {
    errors.push(`${path}.component must be an allowed component`);
  }

  const props = node.props || {};
  if (props && (typeof props !== "object" || Array.isArray(props))) {
    errors.push(`${path}.props must be an object`);
    return errors;
  }

  const allowed = allowedComponents[component] || [];
  for (const key of Object.keys(props)) {
    if (isBlockedKey(key) || !allowed.includes(key)) {
      errors.push(`${path}.props.${key} is not allowed`);
    }
  }

  for (const action of [props.primaryAction, props.secondaryAction].filter(Boolean)) {
    if (!allowedActions.includes(action)) errors.push(`${path} action ${action} is not allowed`);
  }

  if (component === "MultipleChoiceQuiz") validateQuiz(props.questions, `${path}.props.questions`, errors);
  if (component === "SliderPoll") validateSlider(props, `${path}.props`, errors);

  const children = node.children;
  if (Array.isArray(children)) {
    children.forEach((child, index) => validateNode(child, `${path}.children[${index}]`, errors));
  } else if (children !== undefined && typeof children !== "string") {
    validateNode(children, `${path}.children`, errors);
  }
  return errors;
}

function isBlockedKey(key) {
  return blocked.includes(key) || key.startsWith("on") || key.toLowerCase().includes("html");
}

function validateQuiz(questions, path, errors) {
  if (!Array.isArray(questions) || !questions.length) {
    errors.push(`${path} must be a non-empty array`);
    return;
  }
  questions.forEach((question, index) => {
    const location = `${path}[${index}]`;
    if (!question || typeof question !== "object" || Array.isArray(question)) {
      errors.push(`${location} must be an object`);
      return;
    }
    const choices = Array.isArray(question.choices) ? question.choices : [];
    if (typeof question.prompt !== "string" || !question.prompt.trim()) {
      errors.push(`${location}.prompt is required`);
    }
    if (choices.length < 2) {
      errors.push(`${location}.choices must include at least two choices`);
    }
    if (
      question.answer !== undefined &&
      (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= choices.length)
    ) {
      errors.push(`${location}.answer must be a valid choice index`);
    }
  });
}

function validateSlider(props, path, errors) {
  const min = Number(props.min);
  const max = Number(props.max);
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) {
    errors.push(`${path}.min and ${path}.max must define a valid range`);
  }
  if (props.step !== undefined && (!Number.isFinite(Number(props.step)) || Number(props.step) <= 0)) {
    errors.push(`${path}.step must be greater than 0`);
  }
}

function renderNode(node, state, path = "root") {
  if (typeof node === "string") return esc(node);
  const props = node.props || {};
  const children = Array.isArray(node.children)
    ? node.children.map((child, index) => renderNode(child, state, `${path}.children[${index}]`)).join("")
    : esc(node.children || "");

  switch (node.component) {
    case "DemoShell":
      return `<div class="generated-shell"><h3>${esc(props.title)}</h3><p>${esc(
        props.summary || "",
      )}</p>${children}</div>`;
    case "SectionHeader":
      return `<section class="generated-section"><h4>${esc(props.title)}</h4><p>${esc(
        props.description || "",
      )}</p></section>`;
    case "MetricRow":
      return `<div class="metric-row">${(props.items || [])
        .slice(0, 4)
        .map((item) => `<span>${esc(item.label)}<strong>${esc(item.value)}</strong></span>`)
        .join("")}</div>`;
    case "DataTable":
      return `<table class="generated-table"><thead><tr>${(props.columns || [])
        .map((column) => `<th>${esc(column)}</th>`)
        .join("")}</tr></thead><tbody>${(props.rows || [])
        .slice(0, 6)
        .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
    case "Checklist":
      return `<ul class="generated-checklist">${(props.items || [])
        .map((item) => `<li><strong>${esc(item.status || "open")}</strong> ${esc(item.label)}</li>`)
        .join("")}</ul>`;
    case "Timeline":
      return `<ol>${(props.items || [])
        .map((item) => `<li><strong>${esc(item.time || "")}</strong> ${esc(item.label)}</li>`)
        .join("")}</ol>`;
    case "Alert":
      return `<div class="alert"><strong>${esc(props.title)}</strong><p>${children}</p></div>`;
    case "TextBlock":
      return `<p>${esc(props.text)}</p>`;
    case "ActionPanel":
      return `<div class="generated-section"><h4>${esc(props.title)}</h4><p>${children}</p>${actionButton(
        props.primaryAction,
      )} ${actionButton(props.secondaryAction, "secondary-button")}</div>`;
    case "MultipleChoiceQuiz":
      return renderQuiz(props.questions || [], state, path);
    case "SliderPoll":
      return renderSlider(props, state, path);
    case "ChoiceList":
      return renderChoiceList(props, path);
    default:
      return "";
  }
}

function actionButton(action, className = "") {
  if (!action) return "";
  return `<button class="${className}" data-action="${esc(action)}">${esc(action.replace(/_/g, " "))}</button>`;
}

function renderQuiz(questions, state, path) {
  return `<section class="generated-section"><h4>Quiz</h4>${questions
    .map((question, index) => {
      const key = `${path}.${question.id || index}`;
      const selected = state.quizSelections.get(key);
      const feedback =
        selected === undefined
          ? ""
          : `<p class="quiz-feedback">${selected === question.answer ? "Correct. " : "Review this one. "}${esc(
              question.explanation || "",
            )}</p>`;
      return `<div class="quiz-question"><p><strong>${index + 1}.</strong> ${esc(
        question.prompt,
      )}</p><div class="quiz-choices">${(question.choices || [])
        .map((choice, choiceIndex) => {
          const selectedClass = selected === choiceIndex ? " selected-choice" : "";
          return `<button class="secondary-button quiz-choice${selectedClass}" data-quiz="${esc(
            key,
          )}" data-choice="${choiceIndex}">${esc(choice)}</button>`;
        })
        .join("")}</div>${feedback}</div>`;
    })
    .join("")}</section>`;
}

function renderSlider(props, state, path) {
  const value = state.sliderValues.get(path) ?? Number(props.value ?? props.min ?? 0);
  return `<section class="generated-section slider-poll"><h4>${esc(
    props.question,
  )}</h4><input type="range" min="${esc(props.min)}" max="${esc(props.max)}" step="${esc(
    props.step || 1,
  )}" value="${esc(value)}" data-slider="${esc(path)}"/><div class="range-labels"><span>${esc(
    props.leftLabel || props.min,
  )}</span><strong>${esc(value)}</strong><span>${esc(props.rightLabel || props.max)}</span></div><p>${actionButton(
    "submit_poll",
  )}</p></section>`;
}

function renderChoiceList(props, path) {
  return `<section class="generated-section"><h4>${esc(props.question)}</h4><div class="quiz-choices">${(
    props.items || []
  )
    .map(
      (item, index) =>
        `<button class="secondary-button quiz-choice" data-action="submit_choice" data-choice-list="${esc(
          path,
        )}" data-choice="${index}">${esc(item.label || item)}</button>`,
    )
    .join("")}</div></section>`;
}

function initDemo() {
  const root = document.getElementById("generative-ui-demo");
  if (!root) return;

  const state = {
    current: fixtures.quiz.payload,
    activeFixture: "quiz",
    log: [],
    quizSelections: new Map(),
    sliderValues: new Map(),
  };

  function draw() {
    const errors = validateNode(state.current);
    root.innerHTML = `<div class="demo-grid"><div class="demo-controls"><label for="demo-mode">Mode</label><select id="demo-mode"><option value="fixture">Fixture mode</option><option value="paste">Paste JSONX mode</option><option value="endpoint">Bring your own endpoint</option></select><label for="fixture">Sample prompt</label><select id="fixture">${Object.entries(
      fixtures,
    )
      .map(([key, value]) => `<option value="${key}"${key === state.activeFixture ? " selected" : ""}>${esc(value.label)}</option>`)
      .join("")}</select><label for="prompt">Prompt</label><textarea id="prompt">${esc(
      fixtures[state.activeFixture].prompt,
    )}</textarea><label for="payload">JSONX payload or endpoint response</label><textarea id="payload">${esc(
      JSON.stringify(state.current, null, 2),
    )}</textarea><div id="endpoint-fields" hidden><label for="endpoint">CORS endpoint URL</label><input id="endpoint" placeholder="https://your-endpoint.example/generate"/><label for="credential">Optional bearer credential</label><input id="credential" type="password" autocomplete="off" placeholder="Kept in memory only"/></div><div class="demo-actions"><button id="run-demo">Render payload</button><button class="secondary-button" id="call-endpoint">Call endpoint</button></div></div><div><div class="demo-output"><div class="demo-panel code-panel"><div class="panel-title">Validation</div><p class="${
      errors.length ? "validation-error" : "validation-ok"
    }">${errors.length ? esc(errors.join("\n")) : "Payload passes the safe generated-output profile."}</p><pre><code>${esc(
      JSON.stringify(state.current, null, 2),
    )}</code></pre></div><div class="demo-panel"><div class="panel-title">Rendered UI</div>${
      errors.length ? "<p>Fix validation errors before rendering.</p>" : renderNode(state.current, state)
    }<div class="action-log"><strong>Action log</strong><ol>${state.log
      .map((item) => `<li>${esc(item)}</li>`)
      .join("")}</ol></div></div></div></div></div>`;
    wire();
  }

  function wire() {
    root.querySelectorAll("[data-action]").forEach((button) => {
      button.onclick = () => {
        state.log.unshift(`${new Date().toLocaleTimeString()} ${button.dataset.action}`);
        draw();
      };
    });
    root.querySelectorAll("[data-quiz]").forEach((button) => {
      button.onclick = () => {
        state.quizSelections.set(button.dataset.quiz, Number(button.dataset.choice));
        state.log.unshift(`${new Date().toLocaleTimeString()} selected answer ${Number(button.dataset.choice) + 1}`);
        draw();
      };
    });
    root.querySelectorAll("[data-slider]").forEach((input) => {
      input.oninput = () => {
        state.sliderValues.set(input.dataset.slider, Number(input.value));
        draw();
      };
    });
    root.querySelector("#fixture").onchange = (event) => {
      const fixture = fixtures[event.target.value];
      state.activeFixture = event.target.value;
      state.current = fixture.payload;
      state.log = [];
      state.quizSelections.clear();
      state.sliderValues.clear();
      draw();
    };
    root.querySelector("#run-demo").onclick = () => {
      try {
        const parsed = JSON.parse(root.querySelector("#payload").value);
        state.current = parsed.payload || parsed;
        state.log = [];
        state.quizSelections.clear();
        state.sliderValues.clear();
        draw();
      } catch (error) {
        alert(`Invalid JSON: ${error.message}`);
      }
    };
    const mode = root.querySelector("#demo-mode");
    mode.onchange = () => {
      root.querySelector("#endpoint-fields").hidden = mode.value !== "endpoint";
    };
    root.querySelector("#call-endpoint").onclick = async () => {
      const url = root.querySelector("#endpoint").value;
      if (!url) return alert("Enter a CORS-enabled endpoint URL.");
      const headers = { "content-type": "application/json" };
      const token = root.querySelector("#credential").value;
      if (token) headers.authorization = `Bearer ${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt: root.querySelector("#prompt").value }),
      });
      const parsed = await response.json();
      state.current = parsed.payload || parsed;
      state.log = [];
      state.quizSelections.clear();
      state.sliderValues.clear();
      draw();
    };
  }

  draw();
}

function initSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  const surfaceLabels = {
    codex: "Codex",
    claude: "Claude Code",
    opencode: "OpenCode",
  };
  fetch("skills/index.json")
    .then((response) => response.json())
    .catch(() => [])
    .then((skills) => {
      grid.innerHTML = skills
        .map(
          (skill) => {
            const install = Object.entries(skill.install || {})
              .map(
                ([surface, command]) =>
                  `<details><summary>${esc(
                    surfaceLabels[surface] || surface,
                  )}</summary><code>${esc(command)}</code></details>`,
              )
              .join("");
            const surfaces = (skill.surfaces || [])
              .map((surface) => surfaceLabels[surface] || surface)
              .join(", ");
            return `<article class="skill-card"><p class="skill-family">${esc(
              skill.family || "Skill",
            )}</p><h3>${esc(skill.name)}</h3><p>${esc(
              skill.purpose,
            )}</p>${install}<p><strong>Example:</strong> ${esc(
              skill.example,
            )}</p><small>${esc(surfaces)} · Version ${esc(
              skill.version,
            )} · Updated ${esc(skill.updated)}</small></article>`;
          },
        )
        .join("");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initDemo();
  initSkills();
});
