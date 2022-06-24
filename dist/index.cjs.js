"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  __express: () => __express,
  __getReact: () => __getReact,
  __getReactDOM: () => __getReactDOM,
  _jsonxChildren: () => _jsonxChildren,
  _jsonxComponents: () => _jsonxComponents,
  _jsonxHelpers: () => _jsonxHelpers,
  _jsonxProps: () => _jsonxProps,
  _jsonxUtils: () => _jsonxUtils,
  compile: () => compile,
  default: () => src_default,
  getReactElement: () => getReactElement,
  getReactElementFromJSON: () => getReactElementFromJSON,
  getReactElementFromJSONX: () => getReactElementFromJSONX,
  getRenderedJSON: () => getRenderedJSON,
  jsonToJSX: () => jsonToJSX,
  jsonxHTMLString: () => jsonxHTMLString,
  jsonxRender: () => jsonxRender,
  outputHTML: () => outputHTML,
  outputJSON: () => outputJSON,
  outputJSX: () => outputJSX,
  renderFile: () => __express,
  renderIndex: () => renderIndex
});
module.exports = __toCommonJS(src_exports);
var import_react3 = __toESM(require("react"), 1);
var import_react_dom = __toESM(require("react-dom"), 1);
var import_client = require("react-dom/client");
var import_server = __toESM(require("react-dom/server"), 1);

// src/components.ts
var components_exports = {};
__export(components_exports, {
  DynamicComponent: () => DynamicComponent,
  FormComponent: () => FormComponent,
  ReactHookForm: () => ReactHookForm,
  advancedBinding: () => advancedBinding,
  componentMap: () => componentMap,
  generatedCustomComponents: () => generatedCustomComponents,
  getBoundedComponents: () => getBoundedComponents,
  getComponentFromLibrary: () => getComponentFromLibrary,
  getComponentFromMap: () => getComponentFromMap,
  getCustomComponentsCacheKey: () => getCustomComponentsCacheKey,
  getCustomFunctionComponent: () => getCustomFunctionComponent,
  getFunctionBody: () => getFunctionBody,
  getFunctionFromEval: () => getFunctionFromEval,
  getReactClassComponent: () => getReactClassComponent,
  getReactContext: () => getReactContext,
  getReactFunctionComponent: () => getReactFunctionComponent,
  getReactLibrariesAndComponents: () => getReactLibrariesAndComponents,
  makeFunctionComponent: () => makeFunctionComponent
});
var import_react = __toESM(require("react"), 1);
var memoryCache = __toESM(require("memory-cache"), 1);
var import_react_hook_form = require("react-hook-form");
var import_error_message = require("@hookform/error-message");
var import_react_dom_factories = __toESM(require("react-dom-factories"), 1);

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  displayComponent: () => displayComponent,
  fetchJSON: () => fetchJSON,
  getAdvancedBinding: () => getAdvancedBinding,
  getSimplifiedJSONX: () => getSimplifiedJSONX,
  simpleJSONXSyntax: () => simpleJSONXSyntax,
  traverse: () => traverse,
  validSimpleJSONXSyntax: () => validSimpleJSONXSyntax,
  validateJSONX: () => validateJSONX
});
var import_ua_parser_js = __toESM(require("ua-parser-js"), 1);
var global2 = typeof global2 !== "undefined" ? global2 : typeof globalThis !== "undefined" ? globalThis : {};
function displayComponent(options = {}) {
  const { jsonx = {}, props } = options;
  const propsToCompare = jsonx.comparisonprops;
  const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map((comp) => {
    const compares = {};
    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }
    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }
    const propcompares = traverse(compares, props || jsonx.props);
    const opscompares = Object.assign({}, comp, propcompares);
    switch (opscompares.operation) {
      case "eq":
      case "==":
        return opscompares.left == opscompares.right;
      case "dneq":
      case "!=":
      case "!":
        return opscompares.left !== opscompares.right;
      case "dnseq":
      case "!==":
        return opscompares.left !== opscompares.right;
      case "seq":
      case "===":
        return opscompares.left === opscompares.right;
      case "lt":
      case "<":
        return opscompares.left < opscompares.right;
      case "lte":
      case "<=":
        return opscompares.left <= opscompares.right;
      case "gt":
      case ">":
        return opscompares.left > opscompares.right;
      case "gte":
      case ">=":
        return opscompares.left >= opscompares.right;
      case "dne":
      case "undefined":
      case "null":
        return opscompares.left === void 0 || opscompares.left === null;
      case "!null":
      case "!undefined":
      case "exists":
      default:
        return opscompares.left !== void 0 && opscompares.left !== null;
    }
  }) : [];
  const validProps = comparisons.filter((comp) => comp === true);
  if (!jsonx.comparisonprops) {
    return true;
  } else if (jsonx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (validProps.length !== comparisons.length && !jsonx.comparisonorprops) {
    return false;
  } else {
    return true;
  }
}
function getAdvancedBinding() {
  var window2 = window2;
  if (typeof window2 === "undefined") {
    if (this && this.window) {
      window2 = this.window;
    } else if (typeof global2 !== "undefined" && global2.window) {
      window2 = global2.window;
    } else if (typeof globalThis !== "undefined" && globalThis.window) {
      window2 = globalThis.window;
    }
    if (!window2 || !window2.navigator)
      return false;
  }
  try {
    if (window2 && window2.navigator && window2.navigator.userAgent && typeof window2.navigator.userAgent === "string") {
      if (window2.navigator.userAgent.indexOf("Trident") !== -1) {
        return false;
      }
      const uastring = window2.navigator.userAgent;
      const parser = new import_ua_parser_js.default();
      parser.setUA(uastring);
      const parseUserAgent = parser.getResult();
      if ((parseUserAgent.browser.name === "Chrome" || parseUserAgent.browser.name === "Chrome WebView") && parseUserAgent.os.name === "Android" && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }
      if (parseUserAgent.browser.name === "Android Browser") {
        return false;
      }
    }
  } catch (e) {
    e;
    console.error(e);
    return false;
  }
  return true;
}
function traverse(paths = {}, data = {}) {
  let keys = Object.keys(paths);
  if (!keys.length)
    return paths;
  return keys.reduce((result, key) => {
    if (typeof paths[key] === "string")
      result[key] = data[paths[key]];
    else if (Array.isArray(paths[key])) {
      let _path = Object.assign([], paths[key]);
      let value = data;
      while (_path.length && value && typeof value === "object") {
        let prop = _path.shift();
        value = value[prop];
      }
      result[key] = _path.length ? void 0 : value;
    } else
      throw new TypeError("dynamic property paths must be a string or an array of strings or numeric indexes");
    return result;
  }, {});
}
function validateJSONX(jsonx = {}, returnAllErrors = false) {
  const dynamicPropsNames = [
    "asyncprops",
    "resourceprops",
    "windowprops",
    "thisprops",
    "thisstate",
    "thiscontext"
  ];
  const evalPropNames = [
    "__dangerouslyEvalProps",
    "__dangerouslyBindEvalProps"
  ];
  const validKeys = [
    "component",
    "props",
    "test",
    "children",
    "__spreadComponent",
    "__inline",
    "__functionargs",
    "__dangerouslyInsertComponents",
    "__dangerouslyInsertComponentProps",
    "__dangerouslyInsertJSONXComponents",
    "__functionProps",
    "__functionparams",
    "__windowComponents",
    "__windowComponentProps",
    "comparisonprops",
    "comparisonorprops",
    "passprops",
    "removeprops",
    "includeprops",
    "exposeprops",
    "useformregister",
    "debug",
    "___stringifyChildren",
    "___toStringChildren",
    "___toNumeral",
    "___FromLuxonTimeZone",
    "___ISOtoLuxonString",
    "___JSDatetoLuxonString",
    "___template"
  ].concat(dynamicPropsNames, evalPropNames);
  let errors = [];
  if (!jsonx.component) {
    errors.push(SyntaxError("[0001] Missing React Component"));
  }
  if (jsonx.props) {
    if (typeof jsonx.props !== "object" || Array.isArray(jsonx.props)) {
      errors.push(TypeError("[0002] " + jsonx.component + ": props must be an Object / valid React props"));
    }
    if (jsonx.props.children && (typeof jsonx.props.children !== "string" || !Array.isArray(jsonx.props.children))) {
      errors.push(TypeError("[0003] " + jsonx.component + ": props.children must be an array of JSONX JSON objects or a string"));
    }
    if (jsonx.props._children && (typeof jsonx.props._children !== "string" || !Array.isArray(jsonx.props._children))) {
      errors.push(TypeError("[0004] " + jsonx.component + ": props._children must be an array of JSONX JSON objects or a string"));
    }
  }
  if (jsonx.children) {
    if (typeof jsonx.children !== "string" && !Array.isArray(jsonx.children)) {
      errors.push(TypeError("[0005] " + jsonx.component + ": children must be an array of JSONX JSON objects or a string"));
    }
    if (Array.isArray(jsonx.children)) {
      const childrenErrors = jsonx.children.filter((c) => typeof c === "object").map((c) => validateJSONX(c, returnAllErrors));
      errors = errors.concat(...childrenErrors);
    }
  }
  dynamicPropsNames.forEach((dynamicprop) => {
    const jsonxDynamicProps = jsonx[dynamicprop];
    if (jsonxDynamicProps) {
      if (typeof jsonxDynamicProps !== "object") {
        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
      }
      Object.keys(jsonxDynamicProps).forEach((resolvedDynamicProp) => {
        if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          errors.push(TypeError(`[0007] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
        }
        if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          const allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter((propArrayItem) => typeof propArrayItem === "string");
          if (allStringArray.length !== jsonxDynamicProps[resolvedDynamicProp].length) {
            errors.push(TypeError(`[0008] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
          }
        }
      });
    }
  });
  const evalProps = jsonx.__dangerouslyEvalProps;
  const boundEvalProps = jsonx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if (evalProps && typeof evalProps !== "object" || boundEvalProps && typeof boundEvalProps !== "object") {
      errors.push(TypeError("[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript"));
    }
    evalPropNames.filter((evalProp) => jsonx[evalProp]).forEach((eProps) => {
      const evProp = jsonx[eProps];
      const scopedEval3 = eval;
      Object.keys(evProp).forEach((propToEval) => {
        if (typeof evProp[propToEval] !== "string") {
          errors.push(TypeError(`[0010] jsonx.${eProps}.${evProp} must be a string`));
        }
        try {
          if (eProps === "__dangerouslyBindEvalProps") {
            const funcToBind = scopedEval3(`(${evProp[propToEval]})`);
            funcToBind.call({ bounded: true });
          } else {
            scopedEval3(evProp[propToEval]);
          }
        } catch (e) {
          errors.push(e);
        }
      });
    });
  }
  if (jsonx.__dangerouslyInsertComponents) {
    Object.keys(jsonx.__dangerouslyInsertComponents).forEach((insertedComponents) => {
      try {
        if (jsonx.__dangerouslyInsertComponents)
          validateJSONX(jsonx.__dangerouslyInsertComponents[insertedComponents]);
      } catch (e) {
        errors.push(TypeError(`[0011] jsonx.__dangerouslyInsertComponents.${insertedComponents} must be a valid JSONX JSON Object: ${e?.toString()}`));
      }
    });
  }
  if (jsonx.__functionProps) {
    if (typeof jsonx.__functionProps !== "object") {
      errors.push(TypeError("[0012] jsonx.__functionProps  must be an object"));
    } else {
      Object.keys(jsonx.__functionProps).forEach((fProp) => {
        if (jsonx.__functionProps && jsonx.__functionProps[fProp] && (typeof jsonx.__functionProps[fProp] !== "string" || jsonx.__functionProps[fProp].indexOf("func:") === -1)) {
          errors.push(ReferenceError(`[0013] jsonx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
        }
      });
    }
  }
  if (jsonx.__windowComponentProps && (typeof jsonx.__windowComponentProps !== "object" || Array.isArray(jsonx.__windowComponentProps))) {
    errors.push(TypeError("[0013] jsonx.__windowComponentProps  must be an object"));
  }
  if (jsonx.__windowComponents) {
    if (typeof jsonx.__windowComponents !== "object") {
      errors.push(TypeError("[0014] jsonx.__windowComponents must be an object"));
    }
    Object.keys(jsonx.__windowComponents).forEach((cProp) => {
      if (typeof jsonx.__windowComponents[cProp] !== "string" || jsonx.__windowComponents[cProp].indexOf("func:") === -1) {
        errors.push(ReferenceError(`[0015] jsonx.__windowComponents.${cProp} must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)`));
      }
    });
  }
  if (typeof jsonx.comparisonorprops !== "undefined" && typeof jsonx.comparisonorprops !== "boolean") {
    errors.push(TypeError("[0016] jsonx.comparisonorprops  must be boolean"));
  }
  if (jsonx.comparisonprops) {
    if (!Array.isArray(jsonx.comparisonprops)) {
      errors.push(TypeError("[0017] jsonx.comparisonprops  must be an array or comparisons"));
    } else {
      jsonx.comparisonprops.forEach((c) => {
        if (typeof c !== "object") {
          errors.push(TypeError("[0018] jsonx.comparisonprops  must be an array or comparisons objects"));
        } else if (typeof c.left === "undefined") {
          errors.push(TypeError("[0019] jsonx.comparisonprops  must be have a left comparison value"));
        }
      });
    }
  }
  if (typeof jsonx.passprops !== "undefined" && typeof jsonx.passprops !== "boolean") {
    errors.push(TypeError("[0020] jsonx.passprops  must be boolean"));
  }
  const invalidKeys = Object.keys(jsonx).filter((key) => validKeys.indexOf(key) === -1);
  if (errors.length) {
    if (returnAllErrors)
      return errors;
    throw errors[0];
  }
  return invalidKeys.length ? `Warning: Invalid Keys [${invalidKeys.join()}]` : true;
}
function validSimpleJSONXSyntax(simpleJSONX = {}) {
  if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
    return false;
  } else {
    const componentName = Object.keys(simpleJSONX)[0];
    return Object.keys(simpleJSONX).length === 1 && !simpleJSONX[componentName].component && (typeof simpleJSONX[componentName] === "object" || typeof simpleJSONX[componentName] === "string") ? true : false;
  }
}
function simpleJSONXSyntax(simpleJSONX = {}) {
  if (simpleJSONX.component)
    return simpleJSONX;
  const component = Object.keys(simpleJSONX)[0];
  try {
    const children = typeof simpleJSONX[component] === "string" || Array.isArray(simpleJSONX[component]) ? simpleJSONX[component] : simpleJSONX[component] && simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children) ? simpleJSONX[component].children.map(simpleJSONXSyntax) : simpleJSONX[component].children;
    const jsonxprops = typeof simpleJSONX[component] === "object" ? simpleJSONX[component] : void 0;
    const jsonx = { component, ...jsonxprops, children };
    return jsonx;
  } catch (e) {
    throw SyntaxError("Invalid Simple JSONX Syntax");
  }
}
function getSimplifiedJSONX(jsonx = {}) {
  try {
    if (!jsonx.component)
      return jsonx;
    const componentName = jsonx.component;
    jsonx.children = Array.isArray(jsonx.children) ? jsonx.children.filter((child) => child).map(getSimplifiedJSONX) : jsonx.children;
    delete jsonx.component;
    return {
      [componentName]: jsonx
    };
  } catch (e) {
    throw e;
  }
}
async function fetchJSON(path3 = "", options = {}) {
  try {
    const response = await fetch(path3, options);
    return await response.json();
  } catch (e) {
    throw e;
  }
}

// src/components.ts
var import_create_react_class = __toESM(require("create-react-class"), 1);
var cache = new memoryCache.Cache();
var ReactHookForm = { ErrorMessage: import_error_message.ErrorMessage, Controller: import_react_hook_form.Controller };
var generatedCustomComponents = /* @__PURE__ */ new Map();
var advancedBinding = getAdvancedBinding();
var componentMap = Object.assign({ Fragment: import_react.Fragment, Suspense: import_react.Suspense }, import_react_dom_factories.default, typeof window === "object" && window ? window.__jsonx_custom_elements : {});
function getBoundedComponents(options = {}) {
  const { reactComponents, boundedComponents = [] } = options;
  if (typeof options.advancedBinding === "boolean" && options.advancedBinding || typeof options.advancedBinding === "undefined" && advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
      result[componentName] = reactComponents[componentName].bind(this);
      return result;
    }, {}));
  } else
    return reactComponents;
}
function getComponentFromLibrary(options = { jsonx: {} }) {
  const { componentLibraries = {}, jsonx = {} } = options;
  const libComponent = Object.keys(componentLibraries).map((libraryName) => {
    const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, "");
    const libraryNameArray = cleanLibraryName.split(".");
    if (libraryNameArray.length === 2 && componentLibraries[libraryName] && componentLibraries[libraryName][libraryNameArray[0]] && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== "undefined") {
      return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
    } else if (typeof componentLibraries[libraryName][cleanLibraryName] !== "undefined") {
      return componentLibraries[libraryName][cleanLibraryName];
    }
  }).filter((val) => val)[0];
  return libComponent;
}
function getComponentFromMap(options = {}) {
  const {
    jsonx = {},
    reactComponents = {},
    componentLibraries = {},
    logError = console.error,
    debug
  } = options;
  try {
    if (typeof jsonx.component !== "string" && typeof jsonx.component === "function") {
      return jsonx.component;
    } else if (jsonx.component && import_react_dom_factories.default[jsonx.component]) {
      return jsonx.component;
    } else if (reactComponents[jsonx.component]) {
      return reactComponents[jsonx.component];
    } else if (typeof jsonx.component === "string" && jsonx.component.indexOf(".") > 0 && getComponentFromLibrary({ jsonx, componentLibraries })) {
      return getComponentFromLibrary({ jsonx, componentLibraries });
    } else {
      throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
    }
  } catch (e) {
    if (debug)
      logError(e, e.stack ? e.stack : "no stack");
    throw e;
  }
}
function getFunctionFromEval(options = {}) {
  if (typeof options === "function")
    return options;
  const { body = "", args = [], name } = options;
  const argus = [].concat(args);
  argus.push(body);
  const evalFunction = Function.prototype.constructor.apply({ name }, argus);
  if (name) {
    Object.defineProperty(evalFunction, "name", { value: name });
  }
  return evalFunction;
}
function getReactClassComponent(reactComponent = {}, options = {}) {
  if (options.lazy) {
    return (0, import_react.lazy)(() => options.lazy(reactComponent, Object.assign({}, options, { lazy: false })).then((lazyComponent) => {
      return {
        default: getReactClassComponent(...lazyComponent)
      };
    }));
  }
  const context = this || {};
  const {
    returnFactory = true,
    resources = {},
    use_getState = true,
    bindContext = true,
    disableRenderIndexKey = true
  } = options;
  const rjc = {
    getDefaultProps: {
      body: "return {};"
    },
    getInitialState: {
      body: "return {};"
    },
    componentDidMount: void 0,
    UNSAFE_componentWillMount: void 0,
    shouldComponentUpdate: void 0,
    getSnapshotBeforeUpdate: void 0,
    componentDidUpdate: void 0,
    UNSAFE_componentWillUpdate: void 0,
    UNSAFE_componentWillReceiveProps: void 0,
    componentWillUnmount: void 0,
    ...reactComponent
  };
  const rjcKeys = Object.keys(rjc);
  if (rjcKeys.includes("render") === false) {
    throw new ReferenceError("React components require a render method");
  }
  const classOptions = rjcKeys.reduce((result, val) => {
    if (!rjc[val])
      return result;
    if (typeof rjc[val] === "function")
      rjc[val] = { body: rjc[val] };
    const args = rjc[val].arguments;
    const body = rjc[val].body;
    if (!body) {
      console.warn({ rjc });
      throw new SyntaxError(`Function(${val}) requires a function body`);
    }
    if (args && !Array.isArray(args) && args.length && args.length && args.filter((arg) => typeof arg === "string").length) {
      throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
    }
    if (val === "render") {
      result[val] = function() {
        if (options.passprops && this && this.props)
          body.props = Object.assign({}, body.props, this.props);
        if (options.passstate && this.state)
          body.props = Object.assign({}, body.props, this.state);
        return getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : { props: {} }, { disableRenderIndexKey }, {
          props: use_getState && this && this.props ? Object.assign({}, this.props, {
            getState: () => this.state
          }) : this.props
        }), body, resources);
      };
    } else {
      result[val] = typeof body === "function" ? body : getFunctionFromEval({
        body,
        args
      });
    }
    return result;
  }, {});
  const reactComponentClass = (0, import_create_react_class.default)(classOptions);
  if (options.name) {
    Object.defineProperty(reactComponentClass, "name", {
      value: options.name
    });
  }
  const reactClass = returnFactory ? import_react.default.createFactory(reactComponentClass) : reactComponentClass;
  return reactClass;
}
function FormComponent(props = {}) {
  function FormComponentFunction(componentProps) {
    const {
      hookFormOptions = {},
      onSubmit,
      formWrapperComponent,
      formKey,
      formWrapperProps
    } = props;
    const formComponent = {
      component: "div",
      children: "empty form",
      ...props.formComponent
    };
    formComponent.props = { ...formComponent.props, ...componentProps };
    const reactHookForm = (0, import_react_hook_form.useForm)(hookFormOptions);
    const context = {
      ...this || {},
      ...{ reactHookForm }
    };
    if (!context.componentLibraries || !context.componentLibraries.ReactHookForm) {
      context.componentLibraries = {
        ...context.componentLibraries,
        ...{
          ReactHookForm: {
            Controller: import_react_hook_form.Controller,
            ErrorMessage: import_error_message.ErrorMessage
          }
        }
      };
    }
    const formWrapperJXM = formWrapperComponent || {
      component: "form",
      props: {
        onSubmit: onSubmit ? reactHookForm.handleSubmit(onSubmit) : void 0,
        key: formKey ? `formWrapperJXM-${formKey}` : void 0,
        ...formWrapperProps
      }
    };
    formWrapperJXM.children = Array.isArray(formComponent) ? formComponent : [formComponent];
    const renderJSONX = (0, import_react.useMemo)(() => getReactElementFromJSONX.bind(context), [
      context
    ]);
    return renderJSONX(formWrapperJXM) || null;
  }
  if (props.name) {
    Object.defineProperty(FormComponentFunction, "name", {
      value: props.name
    });
  }
  return FormComponentFunction.bind(this);
}
function DynamicComponent(props = {}) {
  function DynamicComponentFunction(componentProps) {
    const {
      useCache = true,
      cacheTimeout = 60 * 60 * 5,
      loadingJSONX = { component: "div", children: "...Loading" },
      loadingErrorJSONX = {
        component: "div",
        children: [
          { component: "span", children: "Error: " },
          {
            component: "span",
            resourceprops: { _children: ["error", "message"] }
          }
        ]
      },
      cacheTimeoutFunction = () => {
      },
      transformFunction = (data) => data,
      fetchURL,
      fetchOptions,
      fetchFunction
    } = props;
    const jsonx = {
      ...props.jsonx
    };
    jsonx.props = { ...jsonx.props, ...componentProps };
    const context = this || {};
    const [state, setState] = (0, import_react.useState)({
      hasLoaded: false,
      hasError: false,
      resources: {},
      error: void 0
    });
    const transformer = (0, import_react.useMemo)(() => getFunctionFromEval(transformFunction), [
      transformFunction
    ]);
    const timeoutFunction = (0, import_react.useMemo)(() => getFunctionFromEval(cacheTimeoutFunction), [cacheTimeoutFunction]);
    const renderJSONX = (0, import_react.useMemo)(() => getReactElementFromJSONX.bind(context), [
      context
    ]);
    const loadingComponent = (0, import_react.useMemo)(() => renderJSONX(loadingJSONX), [
      loadingJSONX
    ]);
    const loadingError = (0, import_react.useMemo)(() => renderJSONX(loadingErrorJSONX, { error: state.error }), [loadingErrorJSONX, state.error]);
    (0, import_react.useEffect)(() => {
      async function getData() {
        try {
          let transformedData;
          if (useCache && cache.get(fetchURL)) {
            transformedData = cache.get(fetchURL);
          } else {
            let fetchedData;
            if (fetchFunction) {
              fetchedData = await fetchFunction(fetchURL, fetchOptions);
            } else
              fetchedData = await fetchJSON(fetchURL, fetchOptions);
            transformedData = await transformer(fetchedData);
            if (useCache)
              cache.put(fetchURL, transformedData, cacheTimeout, timeoutFunction);
          }
          setState((prevState) => Object.assign({}, prevState, {
            hasLoaded: true,
            hasError: false,
            resources: { DynamicComponentData: transformedData }
          }));
        } catch (e) {
          if (context.debug)
            console.warn(e);
          setState({ hasError: true, error: e });
        }
      }
      if (fetchURL)
        getData();
    }, [fetchURL, fetchOptions]);
    if (!fetchURL)
      return null;
    else if (state.hasError) {
      return loadingError;
    } else if (state.hasLoaded === false) {
      return loadingComponent;
    } else
      return renderJSONX(jsonx, state.resources);
  }
  if (props.name) {
    Object.defineProperty(DynamicComponentFunction, "name", {
      value: props.name
    });
  }
  return DynamicComponentFunction.bind(this);
}
function getReactFunctionComponent(reactComponent = {}, functionBody = "", options = {}) {
  if (options.lazy) {
    return (0, import_react.lazy)(() => options.lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false })).then((lazyComponent) => {
      return {
        default: getReactFunctionComponent(...lazyComponent)
      };
    }));
  }
  if (typeof options === "undefined" || typeof options.bind === "undefined")
    options.bind = true;
  const { resources = {}, args = [] } = options;
  const props = Object.assign({}, reactComponent.props);
  const functionArgs = [
    import_react.default,
    import_react.useState,
    import_react.useEffect,
    import_react.useContext,
    import_react.useReducer,
    import_react.useCallback,
    import_react.useMemo,
    import_react.useRef,
    import_react.useImperativeHandle,
    import_react.useLayoutEffect,
    import_react.useDebugValue,
    getReactElementFromJSONX,
    reactComponent,
    resources,
    props,
    import_react_hook_form.useForm,
    import_react_hook_form.useController,
    import_react_hook_form.useFieldArray,
    import_react_hook_form.useWatch
  ];
  if (typeof functionBody === "function")
    functionBody = functionBody.toString();
  const functionComponent = Function("React", "useState", "useEffect", "useContext", "useReducer", "useCallback", "useMemo", "useRef", "useImperativeHandle", "useLayoutEffect", "useDebugValue", "getReactElementFromJSONX", "reactComponent", "resources", "props", "useForm", "useController", "useFieldArray", "useWatch", `
    'use strict';
    const self = this || {};

    return function ${options.name || "Anonymous"}(props){
      try {
        ${functionBody}
        if(typeof exposeprops==='undefined' || exposeprops){
          reactComponent.props = Object.assign({},props,typeof exposeprops==='undefined'?{}:exposeprops);
          if(typeof exposeprops!=='undefined') reactComponent.__functionargs = Object.keys(exposeprops);
        } else{
          reactComponent.props =  props;
        }
        if(!props?.children) {
        //  delete props.children;
        }
        const context = ${options.bind ? "Object.assign(self,this||{})" : "this"};
        return getReactElementFromJSONX.call(context, reactComponent);

      } catch(e){
        if(self.debug) return e.toString()
        else throw e
      }
    }
  `);
  if (options.name) {
    Object.defineProperty(functionComponent, "name", {
      value: options.name
    });
  }
  return options.bind ? functionComponent.call(this, ...functionArgs) : functionComponent(...functionArgs);
}
function getFunctionBody(func) {
  const functionString = func.toString();
  if (functionString.includes("return") === false)
    throw new EvalError("JSONX Function Components can not use implicit returns");
  return functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
}
function makeFunctionComponent(func, options) {
  const scopedEval3 = eval;
  const fullFunctionBody = getFunctionBody(func);
  const [functionBody] = fullFunctionBody.split("return");
  let reactComponentString = fullFunctionBody.replace(functionBody, "").trim();
  const reactComponent = scopedEval3(`(()=>{${reactComponentString}})()`);
  const functionOptions = { name: func.name, ...options };
  return getReactFunctionComponent.call(this, reactComponent, functionBody, functionOptions);
}
function getReactContext(options = {}) {
  return (0, import_react.createContext)(options.value);
}
function getCustomFunctionComponent(customComponent) {
  const { options, functionBody, functionComponent, jsonxComponent } = customComponent;
  if (functionComponent) {
    return makeFunctionComponent.call(this, functionComponent, options);
  } else {
    return getReactFunctionComponent.call(this, jsonxComponent, functionBody, options);
  }
}
function getCustomComponentsCacheKey(customComponents) {
  return customComponents.map(({ name }) => name).join("");
}
function getReactLibrariesAndComponents(customComponents) {
  const customComponentsCacheKey = getCustomComponentsCacheKey(customComponents);
  if (generatedCustomComponents.has(customComponentsCacheKey))
    return generatedCustomComponents.get(customComponentsCacheKey);
  const cxt = {
    componentLibraries: {},
    reactComponents: {},
    ...this
  };
  const customComponentLibraries = {};
  const customReactComponents = {};
  if (customComponents && customComponents.length) {
    customComponents.forEach((customComponent) => {
      const { type, name, jsonx, options, functionBody, functionComponent, jsonxComponent } = customComponent;
      if (type === "library") {
        if (jsonx) {
          customComponentLibraries[name] = Object.keys(jsonx).reduce((result, prop) => {
            const libraryComponent = jsonx[prop];
            const {
              type: type2,
              name: name2,
              jsonxComponent: jsonxComponent2,
              options: options2,
              functionBody: functionBody2
            } = libraryComponent;
            if (type2 === "component") {
              result[name2] = getReactClassComponent.call(this, jsonxComponent2, options2);
            } else {
              result[name2] = getCustomFunctionComponent.call(this, { options: options2, functionBody: functionBody2, functionComponent, jsonxComponent: jsonxComponent2 });
            }
            return result;
          }, {});
        } else
          customComponentLibraries[name] = window[name];
        cxt.componentLibraries[name] = customComponentLibraries[name];
      } else if (type === "component") {
        if (jsonx) {
          customReactComponents[name] = getReactClassComponent.call(this, jsonx, options);
        } else
          customReactComponents[name] = window[name];
        cxt.reactComponents[name] = customReactComponents[name];
      } else if (type === "function") {
        if (functionComponent || functionBody) {
          customReactComponents[name] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent: jsonx });
        } else
          customReactComponents[name] = window[name];
        cxt.reactComponents[name] = customReactComponents[name];
      }
    });
  }
  generatedCustomComponents.set(customComponentsCacheKey, {
    customComponentLibraries,
    customReactComponents
  });
  return {
    customComponentLibraries,
    customReactComponents
  };
}

// src/props.ts
var props_exports = {};
__export(props_exports, {
  ARGUMENT_NAMES: () => ARGUMENT_NAMES,
  STRIP_COMMENTS: () => STRIP_COMMENTS,
  boundArgsReducer: () => boundArgsReducer,
  getChildrenComponents: () => getChildrenComponents,
  getComponentProps: () => getComponentProps,
  getComputedProps: () => getComputedProps,
  getEvalProps: () => getEvalProps,
  getFunctionFromProps: () => getFunctionFromProps,
  getFunctionProps: () => getFunctionProps,
  getJSONXProps: () => getJSONXProps,
  getParamNames: () => getParamNames,
  getReactComponentProps: () => getReactComponentProps,
  getReactComponents: () => getReactComponents,
  getWindowComponents: () => getWindowComponents,
  useFormRegisterHandler: () => useFormRegisterHandler
});
var import_react2 = __toESM(require("react"), 1);
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
  if (result === null) {
    result = [];
  }
  return result;
}
function getJSONXProps(options = {}) {
  let { jsonx = {}, propName = "asyncprops", traverseObject = {} } = options;
  return jsonx[propName] && typeof jsonx[propName] === "object" ? traverse(jsonx[propName], traverseObject) : {};
}
function getChildrenComponents(options = {}) {
  const { allProps = {}, jsonx = {} } = options;
  if (Array.isArray(allProps.__spread) === false) {
    if (this && this.debug || jsonx.debug) {
      return {
        children: new Error("Using __spreadComponent requires an array prop '__spread'").toString()
      };
    } else {
      return { children: void 0 };
    }
  } else {
    return {
      _children: allProps.__spread.map((__item, __idx) => {
        const clonedChild = Object.assign({}, jsonx.__spreadComponent);
        const clonedChildProps = Object.assign({}, clonedChild.props);
        clonedChildProps.__item = __item;
        clonedChildProps.__idx = __idx;
        clonedChild.props = clonedChildProps;
        return clonedChild;
      })
    };
  }
}
function useFormRegisterHandler(options = {}) {
  return this.reactHookForm.register(options?.jsonx?.props?.name);
}
function boundArgsReducer(jsonx = {}) {
  return (args, arg) => {
    let val;
    if (this && this.state && typeof this.state[arg] !== "undefined")
      val = this.state[arg];
    else if (this && this.props && typeof this.props[arg] !== "undefined")
      val = this.props[arg];
    else if (jsonx.props && typeof jsonx.props[arg] !== "undefined")
      val = jsonx.props[arg];
    if (typeof val !== "undefined")
      args.push(val);
    return args.filter((a) => typeof a !== "undefined");
  };
}
function getEvalProps(options = { jsonx: {} }) {
  const { jsonx } = options;
  const scopedEval3 = eval;
  let evAllProps = {};
  if (jsonx.__dangerouslyEvalAllProps) {
    let evVal;
    try {
      evVal = typeof evVal === "function" ? jsonx.__dangerouslyEvalAllProps : scopedEval3(jsonx.__dangerouslyEvalAllProps);
    } catch (e) {
      if (this.debug || jsonx.debug)
        evVal = function() {
          return { error: e };
        };
    }
    evAllProps = typeof evVal === "function" ? evVal.call(this, { jsonx }) : evVal;
  }
  const evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;
    try {
      evVal = scopedEval3(jsonx.__dangerouslyEvalProps[epropName]);
      evValString = evVal.toString();
    } catch (e) {
      if (this.debug || jsonx.debug)
        evVal = e;
    }
    eprops[epropName] = typeof evVal === "function" ? evVal.call(this, { jsonx }) : evVal;
    if (this.exposeEval)
      eprops[`__eval_${epropName}`] = evValString;
    return eprops;
  }, {});
  const evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
    let evVal;
    let evValString;
    try {
      let args;
      const functionBody = jsonx.__dangerouslyBindEvalProps[epropName];
      let functionDefinition;
      if (typeof functionBody === "function") {
        functionDefinition = functionBody;
      } else if (jsonx.__dangerouslyBindEvalProps) {
        functionDefinition = scopedEval3(jsonx.__dangerouslyBindEvalProps[epropName]);
        evValString = functionDefinition.toString();
      }
      if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
        args = [this].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(this, jsonx), []));
      } else if (jsonx.__functionparams === false) {
        args = [this];
      } else {
        const functionDefArgs = getParamNames(functionDefinition);
        args = [this].concat(functionDefArgs.reduce(boundArgsReducer.call(this, jsonx), []));
      }
      evVal = functionDefinition.bind(...args);
    } catch (e) {
      if (this.debug || jsonx.debug)
        evVal = e;
    }
    eprops[epropName] = evVal;
    if (this.exposeEval)
      eprops[`__eval_${epropName}`] = evValString;
    return eprops;
  }, {});
  return Object.assign({}, evProps, evBindProps, evAllProps);
}
function getComponentProps(options = { jsonx: {} }) {
  const { jsonx, resources } = options;
  return Object.keys(jsonx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    let componentVal;
    try {
      if (jsonx.__dangerouslyInsertComponents) {
        componentVal = getRenderedJSON.call(this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
      }
    } catch (e) {
      if (this.debug || jsonx.debug)
        componentVal = e;
    }
    cprops[cpropName] = componentVal;
    return cprops;
  }, {});
}
function getReactComponents(options) {
  const { jsonx, resources } = options;
  const functionComponents = !jsonx.__dangerouslyInsertFunctionComponents ? {} : Object.keys(jsonx.__dangerouslyInsertFunctionComponents).reduce((cprops, cpropName) => {
    let componentVal;
    try {
      const args = jsonx.__dangerouslyInsertFunctionComponents && jsonx.__dangerouslyInsertFunctionComponents[cpropName];
      if (args) {
        args.options = Object.assign({}, args.options, { resources });
        if (args.function) {
          const newComponent = makeFunctionComponent.call(this, args.function, args.options);
          componentVal = args?.invoke ? newComponent(jsonx.props) : newComponent;
        } else {
          const newComponent = getReactFunctionComponent.call(this, args.reactComponent, args.functionBody, args.options);
          componentVal = args?.invoke ? newComponent(jsonx.props) : newComponent;
        }
      }
    } catch (e) {
      if (this.debug || jsonx.debug)
        componentVal = e;
    }
    cprops[cpropName] = cpropName === "_children" ? [componentVal] : componentVal;
    return cprops;
  }, {});
  const classComponents = !jsonx.__dangerouslyInsertClassComponents ? {} : Object.keys(jsonx.__dangerouslyInsertClassComponents).reduce((cprops, cpropName) => {
    let componentVal;
    try {
      const args = jsonx.__dangerouslyInsertClassComponents && jsonx.__dangerouslyInsertClassComponents[cpropName];
      if (args) {
        args.options = Object.assign({}, args.options, { resources });
        componentVal = getReactClassComponent.call(this, args.reactComponent, args.options);
      }
    } catch (e) {
      if (this.debug || jsonx.debug)
        componentVal = e;
    }
    cprops[cpropName] = cpropName === "_children" ? [componentVal] : componentVal;
    return cprops;
  }, {});
  return Object.assign({}, functionComponents, classComponents);
}
function getReactComponentProps(options = { jsonx: {} }) {
  const { jsonx } = options;
  const customComponents = this && this.reactComponents ? this.reactComponents : {};
  const customLibraries = this && this.componentLibraries ? this.componentLibraries : {};
  if (jsonx.__dangerouslyInsertJSONXComponents && Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) {
    return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        componentVal = getComponentFromMap({
          jsonx: jsonx.__dangerouslyInsertJSONXComponents && jsonx.__dangerouslyInsertJSONXComponents[cpropName],
          reactComponents: customComponents,
          componentLibraries: customLibraries
        });
      } catch (e) {
        if (this.debug || jsonx.debug)
          componentVal = e;
      }
      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  } else if (jsonx.__dangerouslyInsertReactComponents && Object.keys(jsonx.__dangerouslyInsertReactComponents).length) {
    return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        componentVal = getComponentFromMap({
          jsonx: {
            component: jsonx.__dangerouslyInsertReactComponents && jsonx.__dangerouslyInsertReactComponents[cpropName],
            props: jsonx.__dangerouslyInsertComponentProps ? jsonx.__dangerouslyInsertComponentProps[cpropName] : {}
          },
          reactComponents: customComponents,
          componentLibraries: customLibraries
        });
      } catch (e) {
        if (this.debug || jsonx.debug)
          componentVal = e;
      }
      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  }
}
function getFunctionFromProps(options = { jsonx: {}, propBody: "" }) {
  const {
    propFunc = "func:",
    propBody,
    jsonx,
    functionProperty = ""
  } = options;
  const { logError = console.error, debug } = this;
  let windowObject = {};
  if (this.window)
    windowObject = this.window;
  else if (typeof global !== "undefined" && global.window)
    windowObject = global.window;
  try {
    const functionNameString = propFunc.split(":")[1] || "";
    const functionNameArray = functionNameString.split(".");
    const functionName = functionNameArray.length ? functionNameArray[functionNameArray.length - 1] : "";
    if (propFunc.includes("func:inline")) {
      let InlineFunction;
      if (jsonx.__functionargs) {
        const args = [].concat(jsonx.__functionargs[functionProperty]);
        args.push(propBody);
        InlineFunction = Function.prototype.constructor.apply({}, args);
      } else {
        InlineFunction = Function("param1", "param2", '"use strict";' + propBody);
      }
      const [propFuncName, funcName] = propFunc.split(".");
      Object.defineProperty(InlineFunction, "name", {
        value: funcName
      });
      if (jsonx.__functionargs) {
        const boundArgs = [this].concat(jsonx.__functionargs[functionProperty].map((arg) => jsonx.props[arg]));
        return InlineFunction.bind(...boundArgs);
      } else {
        return InlineFunction.bind(this);
      }
    } else if (propFunc.indexOf("func:window") !== -1) {
      if (functionNameArray.length === 3) {
        try {
          return windowObject[functionNameArray[1]][functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return windowObject[functionNameArray[1]][functionName];
        }
      } else {
        try {
          return windowObject[functionName].bind(this);
        } catch (e) {
          if (debug) {
            logError(e);
          }
          return windowObject[functionName];
        }
      }
    } else if (functionNameArray.length === 4) {
      return this.props ? this.props[functionNameArray[2]][functionName] : jsonx.props[functionNameArray[2]][functionName];
    } else if (functionNameArray.length === 3) {
      return this.props ? this.props[functionName].bind(this) : jsonx.props[functionName].bind(this);
    } else {
      return function() {
      };
    }
  } catch (e) {
    if (this.debug) {
      logError(e);
      if (jsonx && jsonx.debug)
        return e;
    }
    return function() {
    };
  }
}
function getFunctionProps(options = { jsonx: {} }) {
  const { allProps = {}, jsonx = {} } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = jsonx.__functionProps;
  if (funcProps) {
    Object.keys(funcProps).forEach((key) => {
      if (typeof funcProps[key] === "string" && funcProps[key].indexOf("func:") !== -1) {
        allProps[key] = getFunction({
          propFunc: funcProps[key],
          propBody: jsonx.__inline ? jsonx.__inline[key] : "",
          jsonx,
          functionProperty: key
        });
      }
    });
  }
  return allProps;
}
function getWindowComponents(options = { jsonx: {} }) {
  const { allProps, jsonx } = options;
  const windowComponents = jsonx.__windowComponents;
  const window2 = this.window || global.window || {};
  const windowFuncPrefix = "func:window.__jsonx_custom_elements";
  Object.keys(windowComponents).forEach((key) => {
    const windowKEY = typeof windowComponents[key] === "string" ? windowComponents[key].replace(`${windowFuncPrefix}.`, "") : "";
    if (typeof windowComponents[key] === "string" && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window2.__jsonx_custom_elements[windowKEY] === "function") {
      const windowComponentElement = window2.__jsonx_custom_elements[windowKEY];
      const windowComponentProps = allProps["__windowComponentProps"] ? allProps["__windowComponentProps"] : this.props;
      allProps[key] = import_react2.default.createElement(windowComponentElement, windowComponentProps, null);
    }
  });
  return allProps;
}
function getComputedProps(options = {}) {
  const {
    jsonx = {},
    resources = {},
    renderIndex: renderIndex2,
    logError = console.error,
    useReduxState = true,
    ignoreReduxPropsInComponentLibraries = true,
    disableRenderIndexKey = true,
    debug,
    componentLibraries = {}
  } = options;
  try {
    const componentThisProp = jsonx.thisprops ? Object.assign({
      __jsonx: {
        _component: jsonx,
        _resources: resources
      }
    }, this.props, jsonx.props, useReduxState && !jsonx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && jsonx.component && !componentLibraries[jsonx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : void 0;
    const windowTraverse = typeof window !== "undefined" ? window : {};
    const asyncprops = jsonx.asyncprops ? getJSONXProps({
      jsonx,
      propName: "asyncprops",
      traverseObject: resources
    }) : {};
    const resourceprops = jsonx.resourceprops ? getJSONXProps({
      jsonx,
      propName: "resourceprops",
      traverseObject: resources
    }) : {};
    const windowprops = jsonx.windowprops ? getJSONXProps({
      jsonx,
      propName: "windowprops",
      traverseObject: windowTraverse
    }) : {};
    const thisprops = jsonx.thisprops ? getJSONXProps({
      jsonx,
      propName: "thisprops",
      traverseObject: componentThisProp
    }) : {};
    const thisstate = jsonx.thisstate ? getJSONXProps({
      jsonx,
      propName: "thisstate",
      traverseObject: this.state
    }) : {};
    let thiscontext = jsonx.thiscontext ? getJSONXProps({
      jsonx,
      propName: "thiscontext",
      traverseObject: this || {}
    }) : {};
    if (jsonx.useformregister) {
      const evalJSONX = {
        ...jsonx,
        __dangerouslyEvalAllProps: useFormRegisterHandler
      };
      const contextProps = getEvalProps.call(this, {
        jsonx: evalJSONX
      });
      thiscontext = {
        ...thiscontext,
        ...contextProps
      };
    }
    const evalProps = jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps ? getEvalProps.call(this, { jsonx }) : {};
    const insertedComponents = jsonx.__dangerouslyInsertComponents ? getComponentProps.call(this, { jsonx, resources, debug }) : {};
    const insertedReactComponents = jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents ? getReactComponentProps.call(this, { jsonx, debug }) : {};
    const insertedComputedComponents = jsonx.__dangerouslyInsertFunctionComponents || jsonx.__dangerouslyInsertClassComponents ? getReactComponents.call(this, { jsonx, debug }) : {};
    const evalAllProps = jsonx.__dangerouslyEvalAllProps ? getEvalProps.call(this, { jsonx }) : {};
    const allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey ? {} : { key: renderIndex2 }, jsonx.props, thisprops, thisstate, thiscontext, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents, insertedComputedComponents);
    const computedProps = Object.assign({}, allProps, jsonx.__functionProps ? getFunctionProps.call(this, { allProps, jsonx }) : {}, jsonx.__windowComponents ? getWindowComponents.call(this, { allProps, jsonx }) : {}, jsonx.__spreadComponent ? getChildrenComponents.call(this, { allProps, jsonx }) : {}, evalAllProps);
    if (jsonx.useremoveprops && Array.isArray(jsonx.useremoveprops)) {
      for (const prop of jsonx.useremoveprops) {
        computedProps[prop] = void 0;
        delete computedProps[prop];
      }
    }
    if (jsonx.debug)
      console.debug({ jsonx, computedProps });
    return jsonx.useincludeprops && Array.isArray(jsonx.useincludeprops) ? jsonx.useincludeprops.concat(["key"], Object.keys(thisprops), Object.keys(thisstate), Object.keys(thiscontext), Object.keys(resourceprops), Object.keys(asyncprops), Object.keys(windowprops), Object.keys(evalProps), Object.keys(insertedComponents), Object.keys(insertedReactComponents), Object.keys(insertedComputedComponents)).reduce((includedProps, prop) => {
      includedProps[prop] = computedProps[prop];
      return includedProps;
    }, {}) : computedProps;
  } catch (e) {
    debug && logError(e, e.stack ? e.stack : "no stack");
    return null;
  }
}

// src/children.ts
var children_exports = {};
__export(children_exports, {
  clearTemplateCache: () => clearTemplateCache,
  fetchJSONSync: () => fetchJSONSync,
  getChildrenProperty: () => getChildrenProperty,
  getChildrenProps: () => getChildrenProps,
  getChildrenTemplate: () => getChildrenTemplate,
  getJSONXChildren: () => getJSONXChildren,
  templateCache: () => templateCache
});
var import_numeral = __toESM(require("numeral"), 1);
var luxon = __toESM(require("luxon"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var scopedEval = eval;
var templateCache = /* @__PURE__ */ new Map();
function getChildrenProperty(options = {}) {
  const { jsonx = {} } = options;
  const props = options.props || jsonx.props || {};
  if (typeof props._children !== "undefined") {
    if (Array.isArray(props._children) || typeof props._children === "string" || typeof props._children === "number") {
      return props._children;
    } else {
      return jsonx.children;
    }
  } else if (typeof jsonx.children === "undefined") {
    if (props && props.children && (typeof props.children !== "undefined" || Array.isArray(props.children))) {
      return props.children;
    } else {
      return null;
    }
  } else {
    return jsonx.children;
  }
}
function getChildrenProps(options = {}) {
  const { jsonx = {}, childjsonx, renderIndex: renderIndex2 } = options;
  const props = options.props || jsonx.props || {};
  if (jsonx.passprops && childjsonx && typeof childjsonx === "object") {
    const passedChildJsonx = Object.assign({}, childjsonx, {
      props: Object.assign({}, Array.isArray(jsonx.passprops) ? jsonx.passprops.reduce((passedProps, prop) => {
        passedProps[prop] = props[prop];
        return passedProps;
      }, {}) : props, childjsonx.thisprops && childjsonx.thisprops.style || childjsonx.asyncprops && childjsonx.asyncprops.style || childjsonx.windowprops && childjsonx.windowprops.style ? {} : {}, childjsonx.props, typeof this !== "undefined" || this && this.disableRenderIndexKey ? {} : {
        key: typeof renderIndex2 !== "undefined" ? renderIndex2 + Math.random() : Math.random()
      })
    });
    return passedChildJsonx;
  } else
    return childjsonx;
}
function fetchJSONSync(path3, options) {
  try {
    const config = {
      method: "GET",
      headers: [],
      ...options
    };
    const request = new XMLHttpRequest();
    request.open(config && config.method || "GET", path3, false);
    if (config.headers) {
      Object.keys(config.headers).forEach((header) => {
        request.setRequestHeader(header, config.headers[header]);
      });
    }
    request.send(config.body ? JSON.stringify(config.body) : void 0);
    if (request.status !== 200) {
      throw new Error(request.responseText);
    } else
      return request.responseText;
  } catch (e) {
    throw e;
  }
}
function getChildrenTemplate(template, type) {
  const cachedTemplate = templateCache.get(template);
  if (cachedTemplate) {
    return cachedTemplate;
  } else if (typeof window !== "undefined" && typeof window.XMLHttpRequest === "function" && (!import_fs.default.readFileSync || type === "fetch")) {
    const jsFile = fetchJSONSync(template);
    const jsonxModule = scopedEval(`(${jsFile})`);
    templateCache.set(template, jsonxModule);
    return jsonxModule;
  } else if (typeof template === "string" || type === "file") {
    const jsFile = import_fs.default.readFileSync(import_path.default.resolve(template)).toString();
    const jsonxModule = scopedEval(`(${jsFile})`);
    templateCache.set(template, jsonxModule);
    return jsonxModule;
  }
  return null;
}
function clearTemplateCache() {
  templateCache.clear();
}
function getJSONXChildren(options = { jsonx: {} }) {
  const { jsonx, resources, renderIndex: renderIndex2, logError = console.error } = options;
  try {
    const context = this || {};
    const props = options && options.props ? options.props : jsonx && jsonx.props ? jsonx.props : {};
    if (!jsonx)
      return null;
    jsonx.children = getChildrenProperty({ jsonx, props });
    props._children = void 0;
    delete props._children;
    if (jsonx.___template)
      jsonx.children = [getChildrenTemplate(jsonx.___template)];
    else if (typeof jsonx.children === "undefined" || jsonx.children === null)
      return void 0;
    else if (jsonx.children && jsonx.___stringifyChildren && Array.isArray(jsonx.___stringifyChildren)) {
      const args = [jsonx.children, ...jsonx.___stringifyChildren];
      jsonx.children = JSON.stringify.apply(null, args);
    } else if (jsonx.children && jsonx.___stringifyChildren)
      jsonx.children = JSON.stringify.apply(null, [jsonx.children, null, 2]);
    else if (jsonx.children && jsonx.___toStringChildren)
      jsonx.children = jsonx.children.toString();
    else if (jsonx.children && jsonx.___toNumeral)
      jsonx.children = (0, import_numeral.default)(jsonx.children).format(jsonx.___toNumeral);
    else if (jsonx.children && jsonx.___JSDatetoLuxonString)
      jsonx.children = luxon.DateTime.fromJSDate(jsonx.children).toFormat(jsonx.___JSDatetoLuxonString);
    else if (jsonx.children && jsonx.___ISOtoLuxonString)
      jsonx.children = luxon.DateTime.fromISO(jsonx.children, {
        zone: jsonx.___FromLuxonTimeZone
      }).toFormat(jsonx.___ISOtoLuxonString);
    if (typeof jsonx.children === "string")
      return jsonx.children;
    const children = jsonx.children && Array.isArray(jsonx.children) ? jsonx.children.map((childjsonx) => getReactElementFromJSONX.call(context, getChildrenProps.call(this, { jsonx, childjsonx, props, renderIndex: renderIndex2 }), resources)).filter((child) => child !== null) : jsonx.children;
    return children;
  } catch (e) {
    this && this.debug && logError(e, e.stack ? e.stack : "no stack");
    return null;
  }
}

// src/index.ts
var import_numeral2 = __toESM(require("numeral"), 1);
var luxon2 = __toESM(require("luxon"), 1);

// src/express.ts
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var scopedEval2 = eval;
function __express(filePath, options, callback) {
  try {
    let jsonxModule = options?.__jsonx;
    let isJSON = false;
    if (filePath) {
      isJSON = [".json", ".jsonx"].includes(import_path2.default.extname(filePath));
      const jsFile = import_fs2.default.readFileSync(filePath).toString();
      jsonxModule = isJSON ? scopedEval2(`(${jsFile})`) : scopedEval2(jsFile);
    }
    const resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__jsonx;
    const context = Object.assign({ disableRenderIndexKey: false }, options?.__boundConfig);
    const jsonxRenderedString = outputHTML.call(context, {
      jsonx: jsonxModule,
      resources
    });
    const template = `${options?.__DOCTYPE || "<!DOCTYPE html>"}
${jsonxRenderedString}`;
    if (typeof callback === "function")
      callback(null, template);
    else
      return template;
  } catch (e) {
    if (typeof callback === "function")
      callback(e);
    else
      throw e;
  }
}

// src/index.ts
var createElement = import_react3.default.createElement;
var {
  componentMap: componentMap2,
  getComponentFromMap: getComponentFromMap2,
  getBoundedComponents: getBoundedComponents2,
  DynamicComponent: DynamicComponent2,
  FormComponent: FormComponent2,
  ReactHookForm: ReactHookForm2,
  getReactLibrariesAndComponents: getReactLibrariesAndComponents2
} = components_exports;
var { getComputedProps: getComputedProps2 } = props_exports;
var { getJSONXChildren: getJSONXChildren2 } = children_exports;
var { displayComponent: displayComponent2, validSimpleJSONXSyntax: validSimpleJSONXSyntax2, simpleJSONXSyntax: simpleJSONXSyntax2 } = utils_exports;
var renderIndex = 0;
function jsonxRender(config = { jsonx: { component: "" }, querySelector: "" }) {
  const { jsonx, resources, querySelector, DOM, portal } = config;
  const RenderDOM = DOM || document.querySelector(querySelector);
  const JSONXReactElement = getReactElementFromJSONX.call(this || {}, jsonx, resources);
  if (!JSONXReactElement)
    throw ReferenceError("Invalid React Element");
  else if (!RenderDOM)
    throw ReferenceError("Invalid Render DOM Element");
  if (portal)
    import_react_dom.default.createPortal(JSONXReactElement, RenderDOM);
  else {
    const root = (0, import_client.createRoot)(RenderDOM);
    root.render(JSONXReactElement);
  }
}
function outputHTML(config = { jsonx: { component: "" } }) {
  const { jsonx, resources, type, props, children } = config;
  return this && this.useJSON ? import_server.default.renderToString(getReactElementFromJSON.call(this || {}, { type: type || jsonx.type || jsonx.component || "Fragment", props: props || jsonx.props, children: children || jsonx.children })) : import_server.default.renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
}
function getReactElementFromJSONX(jsonx, resources = {}) {
  const {
    customComponents,
    debug = false,
    returnJSON = false,
    logError = console.error,
    boundedComponents = [],
    disableRenderIndexKey = true
  } = this || {};
  let {
    componentLibraries = {}
  } = this || {};
  componentLibraries.ReactHookForm = ReactHookForm2;
  if (!jsonx)
    return null;
  if (jsonx.type)
    jsonx.component = jsonx.type;
  if (!jsonx.component && validSimpleJSONXSyntax2(jsonx)) {
    jsonx = simpleJSONXSyntax2(jsonx);
  }
  if (!jsonx || !jsonx.component)
    return createElement("span", {}, debug ? "Error: Missing Component Object" : "");
  try {
    let components = Object.assign({ DynamicComponent: DynamicComponent2.bind(this) }, { FormComponent: FormComponent2.bind(this) }, componentMap2, this?.reactComponents);
    let reactComponents = boundedComponents.length ? getBoundedComponents2.call(this, {
      boundedComponents,
      reactComponents: components
    }) : components;
    if (customComponents && Array.isArray(customComponents) && customComponents.length) {
      const cxt = { ...this, componentLibraries, reactComponents: components };
      const {
        customComponentLibraries,
        customReactComponents
      } = getReactLibrariesAndComponents2.call(cxt, customComponents);
      componentLibraries = { ...componentLibraries, ...customComponentLibraries };
      reactComponents = { ...reactComponents, ...customReactComponents };
    }
    if (disableRenderIndexKey === false)
      renderIndex++;
    const element = getComponentFromMap2.call(this, {
      jsonx,
      reactComponents,
      componentLibraries,
      debug,
      logError
    });
    const props = getComputedProps2.call(this, {
      jsonx,
      resources,
      renderIndex,
      componentLibraries,
      debug,
      logError,
      disableRenderIndexKey
    });
    const displayElement = jsonx.comparisonprops ? displayComponent2.call(this, {
      jsonx,
      props,
      renderIndex,
      componentLibraries,
      debug
    }) : true;
    if (displayElement) {
      const children = getJSONXChildren2.call(this, {
        jsonx,
        props,
        resources,
        renderIndex
      });
      if (returnJSON)
        return { type: element, props, children };
      else if (jsonx.test)
        return JSON.stringify({ element, props, children }, null, 2);
      else
        return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ jsonx, resources }, "getReactElementFromJSONX this", this);
      logError(e, e.stack ? e.stack : "no stack");
      return e.toString();
    }
    throw e;
  }
}
var getRenderedJSON = getReactElementFromJSONX;
var getReactElement = getReactElementFromJSONX;
function getReactElementFromJSON({
  type,
  props,
  children
}) {
  return createElement(type, props, children && Array.isArray(children) ? children.map(getReactElementFromJSON) : children);
}
function compile(jsonx, resources = {}) {
  const context = Object.assign({}, this, { returnJSON: true });
  const json = getReactElementFromJSONX.call(context, jsonx, resources);
  const func = function compiledJSONX(props) {
    json.props = Object.assign({}, json.props, props);
    return getReactElementFromJSON(json);
  };
  Object.defineProperty(func, "name", { value: this.name });
  return func;
}
function outputJSX(jsonx, resources = {}) {
  const context = Object.assign({}, this, { returnJSON: true });
  const json = getReactElementFromJSONX.call(context, jsonx, resources);
  return jsonToJSX(json);
}
function outputJSON(jsonx, resources = {}) {
  const context = Object.assign({}, this, { returnJSON: true });
  return getReactElementFromJSONX.call(context, jsonx, resources);
}
var jsonxHTMLString = outputHTML;
function jsonToJSX(json) {
  const propsString = json.props ? Object.keys(json.props).filter((prop) => prop.includes("__eval_") === false).reduce((propString, prop) => {
    propString += ` ${prop.toString()}=${typeof json.props[prop] === "string" ? `"${json.props[prop].toString()}"` : `{${(json.props[`__eval_${prop}`] || json.props[prop]).toString()}}`}`;
    return propString;
  }, "") : "";
  return Array.isArray(json.children) ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX).join("\r\n")}
</${json.type}>` : `<${json.type}${propsString}>${json.children}</${json.type}>`;
}
function __getReact() {
  return import_react3.default;
}
function __getReactDOM() {
  return import_react_dom.default;
}
var _jsonxChildren = children_exports;
var _jsonxComponents = components_exports;
var _jsonxProps = props_exports;
var _jsonxUtils = utils_exports;
var _jsonxHelpers = { numeral: import_numeral2.default, luxon: luxon2 };
var src_default = getReactElementFromJSONX;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  __express,
  __getReact,
  __getReactDOM,
  _jsonxChildren,
  _jsonxComponents,
  _jsonxHelpers,
  _jsonxProps,
  _jsonxUtils,
  compile,
  getReactElement,
  getReactElementFromJSON,
  getReactElementFromJSONX,
  getRenderedJSON,
  jsonToJSX,
  jsonxHTMLString,
  jsonxRender,
  outputHTML,
  outputJSON,
  outputJSX,
  renderFile,
  renderIndex
});
