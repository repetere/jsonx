(function () {
  "use strict";

  var demoStyles = {
    card: {
      border: "1px solid #d9ded8",
      borderRadius: 8,
      padding: 16,
      background: "#fff",
      boxShadow: "0 1px 0 rgba(24,32,28,.06)"
    },
    stack: {
      display: "grid",
      gap: 10
    },
    muted: {
      color: "#5b6860"
    },
    badge: {
      display: "inline-block",
      borderRadius: 999,
      background: "#e5f2ee",
      color: "#0f5f51",
      padding: "3px 8px",
      fontSize: 12,
      fontWeight: 700
    },
    button: {
      border: "1px solid #147a68",
      borderRadius: 6,
      background: "#147a68",
      color: "white",
      padding: "8px 10px",
      font: "inherit",
      cursor: "pointer"
    },
    input: {
      width: "100%",
      border: "1px solid #cbd4cf",
      borderRadius: 6,
      padding: 8,
      font: "inherit"
    }
  };

  var examples = {
    "getting-started-basic": {
      title: "Getting Started Basic Example",
      code: [
        "const view = {",
        "  component: 'section',",
        "  props: {",
        "    style: helpers.styles.card,",
        "    title: 'Rendered from JSONX'",
        "  },",
        "  children: [",
        "    { component: 'h2', children: 'Hello from JSONX' },",
        "    {",
        "      component: 'p',",
        "      props: { style: helpers.styles.muted },",
        "      children: 'This React view is defined as browser-editable data.'",
        "    }",
        "  ]",
        "};",
        "",
        "return view;"
      ].join("\n")
    },
    "traverse-props": {
      title: "Advanced Props: Traverse Props",
      code: [
        "const resources = {",
        "  user: {",
        "    name: 'jsonx',",
        "    description: 'React views defined as data'",
        "  },",
        "  authentication: 'OAuth2'",
        "};",
        "",
        "const JXM = {",
        "  component: 'section',",
        "  props: {",
        "    style: helpers.styles.card",
        "  },",
        "  resourceprops: {",
        "    title: ['user', 'description']",
        "  },",
        "  children: [",
        "    { component: 'h3', children: 'Traverse props' },",
        "    {",
        "      component: 'p',",
        "      asyncprops: { _children: ['user', 'name'] }",
        "    },",
        "    {",
        "      component: 'small',",
        "      props: { style: helpers.styles.muted },",
        "      resourceprops: { _children: ['authentication'] }",
        "    }",
        "  ]",
        "};",
        "",
        "return { jsonx: JXM, resources };"
      ].join("\n")
    },
    "evaluation-props": {
      title: "Advanced Props: Evaluation Props",
      code: [
        "const JXM = {",
        "  component: 'section',",
        "  children: [",
        "    { component: 'h3', children: 'Evaluation props' },",
        "    { component: 'p', children: 'Style and title were computed from strings.' },",
        "    {",
        "      component: 'button',",
        "      props: { type: 'button' },",
        "      __dangerouslyEvalProps: {",
        "        style: 'window.__jsonxSimulatorHelpers.styles.button',",
        "        title: '\"Open the console, then click\"'",
        "      },",
        "      __dangerouslyBindEvalProps: {",
        "        onClick: '(function onClick(){ console.log(\"JSONX evaluated this click handler in the browser.\"); })'",
        "      },",
        "      children: 'Log from evaluated handler'",
        "    }",
        "  ],",
        "  __dangerouslyEvalAllProps: '(() => ({ style: window.__jsonxSimulatorHelpers.styles.card }))'",
        "};",
        "",
        "return { jsonx: JXM, context: { exposeEval: true } };"
      ].join("\n")
    },
    "spread-component": {
      title: "Advanced Props: __spreadComponent",
      code: [
        "const users = [",
        "  { name: 'Bob Smith', email: 'bob.smith@example.com' },",
        "  { name: 'Jane Doe', email: 'jane.doe@example.com' },",
        "  { name: 'Billy Bob', email: 'billy.bob@example.com' }",
        "];",
        "",
        "const JXM = {",
        "  component: 'ul',",
        "  props: {",
        "    style: { display: 'grid', gap: 8, paddingLeft: 18 },",
        "    __spread: users",
        "  },",
        "  __spreadComponent: {",
        "    component: 'li',",
        "    __dangerouslyEvalAllProps: '(({ jsonx }) => ({ children: jsonx.props.__item.name + \" - \" + jsonx.props.__item.email }))'",
        "  }",
        "};",
        "",
        "return JXM;"
      ].join("\n")
    },
    "component-evaluation-props": {
      title: "Advanced Props: Component Evaluation Props",
      code: [
        "function MetricCard(props) {",
        "  return React.createElement(",
        "    'section',",
        "    { style: helpers.styles.card },",
        "    React.createElement('h3', null, props.label),",
        "    React.createElement('p', { style: { fontSize: 28, fontWeight: 700, margin: 0 } }, props.value),",
        "    props.footer",
        "  );",
        "}",
        "",
        "const JXM = {",
        "  component: 'MetricCard',",
        "  props: { label: 'Open items', value: 7 },",
        "  __dangerouslyInsertComponents: {",
        "    footer: {",
        "      component: 'small',",
        "      props: { style: helpers.styles.muted },",
        "      children: 'Footer inserted as a React element prop'",
        "    }",
        "  }",
        "};",
        "",
        "return {",
        "  jsonx: JXM,",
        "  context: { reactComponents: { MetricCard } }",
        "};"
      ].join("\n")
    },
    "function-props-legacy": {
      title: "Advanced Props: __functionProps",
      code: [
        "const JXM = {",
        "  component: 'button',",
        "  props: {",
        "    type: 'button',",
        "    name: 'legacy-button',",
        "    style: helpers.styles.button",
        "  },",
        "  __functionProps: {",
        "    onClick: 'func:this.props.showMessage'",
        "  },",
        "  children: 'Call function from this.props'",
        "};",
        "",
        "return {",
        "  jsonx: JXM,",
        "  context: {",
        "    props: {",
        "      showMessage: function () {",
        "        console.log('Legacy __functionProps resolved this.props.showMessage');",
        "      }",
        "    }",
        "  }",
        "};"
      ].join("\n")
    },
    "format-props": {
      title: "Advanced Props: Format Props",
      code: [
        "const JXM = {",
        "  component: 'section',",
        "  props: { style: helpers.styles.card },",
        "  children: [",
        "    { component: 'h3', children: 'Format props' },",
        "    { component: 'p', children: 15204.39084, ___toNumeral: '0,0.00' },",
        "    {",
        "      component: 'p',",
        "      children: '2026-06-26T14:30:00.000Z',",
        "      ___ISOtoLuxonString: 'ff',",
        "      ___FromLuxonTimeZone: 'America/New_York'",
        "    },",
        "    {",
        "      component: 'pre',",
        "      props: { style: { whiteSpace: 'pre-wrap' } },",
        "      children: { package: 'jsonx', format: 'json' },",
        "      ___stringifyChildren: true",
        "    }",
        "  ]",
        "};",
        "",
        "return JXM;"
      ].join("\n")
    },
    "utility-props": {
      title: "Advanced Props: Utility Props",
      code: [
        "const JXM = {",
        "  component: 'section',",
        "  props: {",
        "    type: 'email',",
        "    placeholder: 'name@example.com',",
        "    style: helpers.styles.card",
        "  },",
        "  passprops: ['type', 'placeholder'],",
        "  children: [",
        "    { component: 'h3', children: 'passprops' },",
        "    { component: 'input', props: { style: helpers.styles.input } },",
        "    {",
        "      component: 'small',",
        "      props: { style: helpers.styles.muted },",
        "      children: 'The parent passed type and placeholder into the input.'",
        "    }",
        "  ]",
        "};",
        "",
        "return JXM;"
      ].join("\n")
    },
    "display-props": {
      title: "Advanced Props: Display Props",
      code: [
        "const JXM = {",
        "  component: 'section',",
        "  props: { style: helpers.styles.card },",
        "  children: [",
        "    { component: 'h3', children: 'Display props' },",
        "    {",
        "      component: 'p',",
        "      props: { status: 'active' },",
        "      comparisonprops: [",
        "        { left: ['status'], operation: 'eq', right: 'active' }",
        "      ],",
        "      children: 'This renders because status is active.'",
        "    },",
        "    {",
        "      component: 'p',",
        "      props: { status: 'inactive' },",
        "      comparisonprops: [",
        "        { left: ['status'], operation: 'eq', right: 'active' }",
        "      ],",
        "      children: 'This does not render.'",
        "    }",
        "  ]",
        "};",
        "",
        "return JXM;"
      ].join("\n")
    },
    "component-library": {
      title: "Component Library Example",
      code: [
        "const DemoKit = {",
        "  Stack: function Stack(props) {",
        "    return React.createElement('div', { style: helpers.styles.stack }, props.children);",
        "  },",
        "  Alert: function Alert(props) {",
        "    return React.createElement('div', { style: Object.assign({}, helpers.styles.card, { borderColor: '#147a68' }) }, props.children);",
        "  },",
        "  Badge: function Badge(props) {",
        "    return React.createElement('span', { style: helpers.styles.badge }, props.children);",
        "  }",
        "};",
        "",
        "const view = {",
        "  component: 'DemoKit.Stack',",
        "  children: [",
        "    {",
        "      component: 'DemoKit.Alert',",
        "      children: [",
        "        { component: 'DemoKit.Badge', children: 'DemoKit' },",
        "        { component: 'p', children: 'A component library can be registered under a namespace.' }",
        "      ]",
        "    }",
        "  ]",
        "};",
        "",
        "return {",
        "  jsonx: view,",
        "  context: { componentLibraries: { DemoKit } }",
        "};"
      ].join("\n")
    },
    "custom-component": {
      title: "Custom Component Example",
      code: [
        "function CalendarCard(props) {",
        "  const value = props.value || new Date();",
        "  return React.createElement(",
        "    'section',",
        "    { style: helpers.styles.card },",
        "    React.createElement('strong', null, value.toDateString()),",
        "    React.createElement('p', { style: helpers.styles.muted }, 'Registered through reactComponents')",
        "  );",
        "}",
        "",
        "const view = {",
        "  component: 'main',",
        "  children: [",
        "    { component: 'h3', children: 'Custom component' },",
        "    { component: 'CalendarCard', props: { value: new Date('2026-06-26T12:00:00') } }",
        "  ]",
        "};",
        "",
        "return {",
        "  jsonx: view,",
        "  context: { reactComponents: { CalendarCard } }",
        "};"
      ].join("\n")
    },
    "function-component": {
      title: "Create Components: Function Component",
      code: [
        "const Counter = jsonx._jsonxComponents.getReactFunctionComponent(",
        "  {",
        "    component: 'section',",
        "    props: { style: helpers.styles.card },",
        "    passprops: true,",
        "    children: [",
        "      { component: 'h3', children: 'Function component with hooks' },",
        "      { component: 'p', thisprops: { _children: ['clicks'] } },",
        "      {",
        "        component: 'button',",
        "        props: { type: 'button', style: helpers.styles.button },",
        "        thisprops: { clicks: ['clicks'], setClicks: ['setClicks'] },",
        "        __dangerouslyBindEvalProps: {",
        "          onClick: '(function onClick(clicks, setClicks) { setClicks(clicks + 1); })'",
        "        },",
        "        children: 'Increment'",
        "      }",
        "    ]",
        "  },",
        "  'const [clicks, setClicks] = useState(0); const exposeprops = { clicks, setClicks };',",
        "  { name: 'Counter' }",
        ");",
        "",
        "return {",
        "  jsonx: { component: 'Counter' },",
        "  context: { reactComponents: { Counter } }",
        "};"
      ].join("\n")
    },
    "class-component": {
      title: "Create Components: Class Component",
      code: [
        "const StatusCard = jsonx._jsonxComponents.getReactClassComponent(",
        "  {",
        "    getInitialState: {",
        "      body: 'return { status: \"loaded from initial state\" };',",
        "      arguments: []",
        "    },",
        "    render: {",
        "      body: {",
        "        component: 'section',",
        "        props: { style: helpers.styles.card },",
        "        children: [",
        "          { component: 'h3', children: 'Class component' },",
        "          { component: 'p', thisstate: { _children: ['status'] } }",
        "        ]",
        "      }",
        "    }",
        "  },",
        "  { name: 'StatusCard' }",
        ");",
        "",
        "return {",
        "  jsonx: { component: 'StatusCard' },",
        "  context: { reactComponents: { StatusCard } }",
        "};"
      ].join("\n")
    },
    "dynamic-component": {
      title: "Create Components: Dynamic Component",
      code: [
        "const LoadedStatus = jsonx._jsonxComponents.DynamicComponent.call({}, {",
        "  name: 'LoadedStatus',",
        "  fetchURL: '/manual/simulator/mock-status.json',",
        "  fetchFunction: function () {",
        "    return new Promise(function (resolve) {",
        "      setTimeout(function () {",
        "        resolve({ result: 'Loaded from a browser Promise' });",
        "      }, 400);",
        "    });",
        "  },",
        "  loadingJSONX: { component: 'p', children: 'Loading...' },",
        "  jsonx: {",
        "    component: 'section',",
        "    props: { style: helpers.styles.card },",
        "    children: [",
        "      { component: 'h3', children: 'Dynamic component' },",
        "      { component: 'p', resourceprops: { _children: ['DynamicComponentData', 'result'] } }",
        "    ]",
        "  }",
        "});",
        "",
        "return {",
        "  jsonx: { component: 'LoadedStatus' },",
        "  context: { reactComponents: { LoadedStatus } }",
        "};"
      ].join("\n")
    },
    "form-component": {
      title: "Create Components: Form Component",
      code: [
        "const EmailForm = jsonx._jsonxComponents.FormComponent.call({}, {",
        "  name: 'EmailForm',",
        "  hookFormOptions: { defaultValues: { email: 'docs@example.com' } },",
        "  formWrapperProps: { style: Object.assign({}, helpers.styles.card, helpers.styles.stack) },",
        "  onSubmit: function (data) { console.log('Form submit', data); },",
        "  formComponent: {",
        "    component: 'div',",
        "    props: { style: helpers.styles.stack },",
        "    children: [",
        "      { component: 'h3', children: 'Form component' },",
        "      {",
        "        component: 'label',",
        "        children: [",
        "          { component: 'span', children: 'Email' },",
        "          {",
        "            component: 'input',",
        "            props: { name: 'email', type: 'email', style: helpers.styles.input },",
        "            useformregister: true",
        "          }",
        "        ]",
        "      },",
        "      { component: 'button', props: { type: 'submit', style: helpers.styles.button }, children: 'Submit' }",
        "    ]",
        "  }",
        "});",
        "",
        "return {",
        "  jsonx: { component: 'EmailForm' },",
        "  context: { reactComponents: { EmailForm } }",
        "};"
      ].join("\n")
    }
  };

  function getRuntime() {
    var runtime = window.jsonx;
    if (!runtime) return null;
    return {
      jsonx: runtime,
      React:
        typeof runtime.__getReact === "function"
          ? runtime.__getReact()
          : window.React,
      ReactDOM:
        typeof runtime.__getReactDOM === "function"
          ? runtime.__getReactDOM()
          : window.ReactDOM
    };
  }

  function normalizeResult(result) {
    if (result && typeof result === "object" && result.jsonx) {
      return result;
    }
    return { jsonx: result };
  }

  function setStatus(statusNode, type, message) {
    statusNode.textContent = message;
    statusNode.dataset.status = type;
  }

  function renderError(mountNode, error) {
    mountNode.innerHTML = "";
    var errorNode = document.createElement("pre");
    errorNode.className = "jsonx-simulator__error";
    errorNode.textContent = error && error.stack ? error.stack : String(error);
    mountNode.appendChild(errorNode);
  }

  function evaluateSimulator(state) {
    var runtime = getRuntime();
    if (!runtime) {
      renderError(state.mountNode, new Error("JSONX browser bundle is not loaded."));
      setStatus(state.statusNode, "error", "Runtime missing");
      return;
    }

    try {
      if (state.root && typeof state.root.unmount === "function") {
        state.root.unmount();
        state.root = null;
      }

      state.mountNode.innerHTML = "";
      var renderHost = document.createElement("div");
      renderHost.className = "jsonx-simulator__render-root";
      state.mountNode.appendChild(renderHost);

      var helpers = {
        styles: demoStyles
      };
      window.__jsonxSimulatorHelpers = helpers;
      var runExample = new Function(
        "jsonx",
        "React",
        "ReactDOM",
        "helpers",
        '"use strict";\n' + state.editor.value
      );
      var result = normalizeResult(
        runExample(runtime.jsonx, runtime.React, runtime.ReactDOM, helpers)
      );
      var context = Object.assign(
        {
          exposeEval: true,
          debug: false,
          window: window,
          logError: function () {
            if (window.console && typeof window.console.warn === "function") {
              window.console.warn.apply(window.console, arguments);
            }
          }
        },
        result.context || {}
      );

      state.root = runtime.jsonx.jsonxRender.call(context, {
        jsonx: result.jsonx,
        resources: result.resources || {},
        DOM: renderHost
      });
      setStatus(state.statusNode, "ready", "Rendered");
    } catch (error) {
      renderError(state.mountNode, error);
      setStatus(state.statusNode, "error", "Error");
    }
  }

  function createSimulator(container) {
    var id = container.dataset.example;
    var example = examples[id];
    if (!example) {
      container.textContent = "Missing simulator example: " + id;
      return;
    }

    container.id = container.id || "jsonx-simulator-" + id;
    container.innerHTML = "";

    var header = document.createElement("div");
    header.className = "jsonx-simulator__header";

    var title = document.createElement("h3");
    title.className = "jsonx-simulator__title";
    title.textContent = example.title;

    var statusNode = document.createElement("span");
    statusNode.className = "jsonx-simulator__status";
    statusNode.dataset.status = "ready";
    statusNode.textContent = "Ready";

    var resetButton = document.createElement("button");
    resetButton.className = "jsonx-simulator__reset";
    resetButton.type = "button";
    resetButton.textContent = "Reset";

    header.appendChild(title);
    header.appendChild(statusNode);
    header.appendChild(resetButton);

    var grid = document.createElement("div");
    grid.className = "jsonx-simulator__grid";

    var editorPane = document.createElement("section");
    editorPane.className = "jsonx-simulator__pane";

    var editorLabel = document.createElement("div");
    editorLabel.className = "jsonx-simulator__label";
    editorLabel.textContent = "JavaScript";

    var editor = document.createElement("textarea");
    editor.className = "jsonx-simulator__editor";
    editor.spellcheck = false;
    editor.value = example.code;
    editor.setAttribute("aria-label", example.title + " JavaScript");

    editorPane.appendChild(editorLabel);
    editorPane.appendChild(editor);

    var outputPane = document.createElement("section");
    outputPane.className = "jsonx-simulator__pane";

    var outputLabel = document.createElement("div");
    outputLabel.className = "jsonx-simulator__label";
    outputLabel.textContent = "Output";

    var mountNode = document.createElement("div");
    mountNode.className = "jsonx-simulator__output";
    mountNode.setAttribute("aria-live", "polite");

    outputPane.appendChild(outputLabel);
    outputPane.appendChild(mountNode);

    grid.appendChild(editorPane);
    grid.appendChild(outputPane);

    container.appendChild(header);
    container.appendChild(grid);

    var state = {
      editor: editor,
      mountNode: mountNode,
      root: null,
      statusNode: statusNode
    };
    var timer = null;
    var queueRender = function () {
      setStatus(statusNode, "pending", "Updating");
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        evaluateSimulator(state);
      }, 180);
    };

    editor.addEventListener("input", queueRender);
    resetButton.addEventListener("click", function () {
      editor.value = example.code;
      evaluateSimulator(state);
      editor.focus();
    });

    evaluateSimulator(state);
  }

  function init() {
    var simulators = document.querySelectorAll(".jsonx-simulator[data-example]");
    simulators.forEach(createSimulator);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
