export const JSONX_UI_SCHEMA = "jsonx.generative-ui.v1";
export const MAX_BYTES = 65536;
export const MAX_DEPTH = 8;
export const MAX_ARRAY_ITEMS = 50;

export const ALLOWED_COMPONENTS = {
  DemoShell: new Set(["title", "summary"]),
  SectionHeader: new Set(["title", "description"]),
  MetricRow: new Set(["items"]),
  DataTable: new Set(["columns", "rows"]),
  Checklist: new Set(["items"]),
  ActionPanel: new Set(["title", "primaryAction", "secondaryAction"]),
  Timeline: new Set(["items"]),
  Alert: new Set(["tone", "title"]),
  TextBlock: new Set(["text"]),
  MultipleChoiceQuiz: new Set(["questions"]),
  SliderPoll: new Set(["question", "min", "max", "step", "value", "leftLabel", "rightLabel"]),
  ChoiceList: new Set(["question", "items", "selectionMode"]),
};

export const ALLOWED_ACTIONS = new Set([
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

export const ALLOWED_MOTION_PROFILES = new Set([
  "none",
  "subtle-enter",
  "morph-list-to-detail",
  "state-change-highlight",
]);

const BLOCKED_KEYS = new Set([
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
].map((key) => key.toLowerCase()));

const ALLOWED_NODE_KEYS = new Set(["component", "props", "children"]);
const ALLOWED_TOP_LEVEL_KEYS = new Set(["schema", "source", "title", "purpose", "motionProfile", "payload"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isBlockedKey(key) {
  const lowered = key.toLowerCase();
  return BLOCKED_KEYS.has(lowered) || lowered.startsWith("on") || lowered.includes("html");
}

function validateAny(value, location, errors, depth) {
  if (depth > MAX_DEPTH) {
    errors.push(`${location} exceeds max depth ${MAX_DEPTH}`);
    return;
  }
  if (Array.isArray(value)) {
    if (value.length > MAX_ARRAY_ITEMS) {
      errors.push(`${location} has more than ${MAX_ARRAY_ITEMS} items`);
    }
    value.forEach((nested, index) => validateAny(nested, `${location}[${index}]`, errors, depth + 1));
    return;
  }
  if (!isObject(value)) return;
  for (const [key, nested] of Object.entries(value)) {
    if (isBlockedKey(key)) {
      errors.push(`${location}.${key} is blocked`);
    }
    validateAny(nested, `${location}.${key}`, errors, depth + 1);
  }
}

export function validateJsonxNode(node, location = "payload", errors = [], depth = 0) {
  if (depth > MAX_DEPTH) {
    errors.push(`${location} exceeds max depth ${MAX_DEPTH}`);
    return errors;
  }
  if (typeof node === "string") {
    return errors;
  }
  if (!isObject(node)) {
    errors.push(`${location} must be a string or component object`);
    return errors;
  }

  for (const key of Object.keys(node)) {
    if (isBlockedKey(key)) {
      errors.push(`${location}.${key} is blocked`);
    } else if (!ALLOWED_NODE_KEYS.has(key)) {
      errors.push(`${location}.${key} is not allowed`);
    }
  }

  const component = node.component;
  if (!ALLOWED_COMPONENTS[component]) {
    errors.push(`${location}.component must be an allowed component`);
    return errors;
  }

  const props = node.props ?? {};
  if (!isObject(props)) {
    errors.push(`${location}.props must be an object`);
    return errors;
  }

  const allowedProps = ALLOWED_COMPONENTS[component];
  for (const [key, value] of Object.entries(props)) {
    if (isBlockedKey(key) || !allowedProps.has(key)) {
      errors.push(`${location}.props.${key} is not allowed`);
    }
    validateAny(value, `${location}.props.${key}`, errors, depth + 1);
  }

  for (const actionKey of ["primaryAction", "secondaryAction"]) {
    const action = props[actionKey];
    if (action && !ALLOWED_ACTIONS.has(action)) {
      errors.push(`${location}.props.${actionKey} is not an allowed action`);
    }
  }

  const children = node.children;
  if (Array.isArray(children)) {
    if (children.length > MAX_ARRAY_ITEMS) {
      errors.push(`${location}.children has more than ${MAX_ARRAY_ITEMS} items`);
    }
    children.forEach((child, index) => validateJsonxNode(child, `${location}.children[${index}]`, errors, depth + 1));
  } else if (children !== undefined) {
    validateJsonxNode(children, `${location}.children`, errors, depth + 1);
  }

  return errors;
}

export function validateJsonxDocument(document) {
  const errors = [];
  let byteLength = 0;

  try {
    byteLength = Buffer.byteLength(JSON.stringify(document), "utf8");
  } catch {
    errors.push("document must be JSON serializable");
  }

  if (byteLength > MAX_BYTES) {
    errors.push(`document exceeds max size ${MAX_BYTES} bytes`);
  }
  if (!isObject(document)) {
    return { ok: false, errors: ["document must be an object"] };
  }

  for (const key of Object.keys(document)) {
    if (!ALLOWED_TOP_LEVEL_KEYS.has(key)) {
      errors.push(`${key} is not allowed at the top level`);
    }
  }
  if (document.schema !== JSONX_UI_SCHEMA) {
    errors.push(`schema must be ${JSONX_UI_SCHEMA}`);
  }
  if (typeof document.purpose !== "string" || document.purpose.trim().length === 0) {
    errors.push("purpose must be a non-empty string");
  }
  if (document.motionProfile && !ALLOWED_MOTION_PROFILES.has(document.motionProfile)) {
    errors.push("motionProfile is not allowed");
  }
  if (!("payload" in document)) {
    errors.push("payload is required");
  } else {
    validateJsonxNode(document.payload, "payload", errors);
  }

  return { ok: errors.length === 0, errors };
}

export function normalizeRenderInput(input) {
  if (!isObject(input)) {
    return { ok: false, errors: ["input must be an object"] };
  }

  const document = {
    schema: JSONX_UI_SCHEMA,
    purpose: input.purpose,
    payload: input.payload,
  };

  if (input.motionProfile) {
    document.motionProfile = input.motionProfile;
  }

  const validation = validateJsonxDocument(document);
  if (!validation.ok) {
    return validation;
  }

  return { ok: true, document };
}
