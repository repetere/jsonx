import UAParser from "ua-parser-js";
import * as defs from "./types/jsonx/index";

declare global {
  interface window {}
}

var global: any =
  typeof global !== "undefined"
    ? global
    : typeof globalThis !== "undefined"
    ? globalThis
    : {};

/**
 * Used to evaluate whether or not to render a component
 * @param {Object} options 
 * @param {Object} options.jsonx - Valid JSONX JSON 
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops) 
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
 const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testJSONX = Object.assign({}, sampleJSONX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ jsonx: testJSONX, props: testJSONX2.props, }) // => false
 */
export function displayComponent(
  options: {
    jsonx?: defs.jsonx;
    props?: any;
    renderIndex?: number;
    componentLibraries?: defs.jsonxLibrary;
    debug?: boolean;
  } = {}
): boolean {
  const { jsonx = {}, props } = options;
  const propsToCompare = jsonx.comparisonprops;
  const comparisons = Array.isArray(propsToCompare)
    ? propsToCompare.map(comp => {
        const compares: defs.jsonxCompare = {};
        if (Array.isArray(comp.left)) {
          compares.left = comp.left;
        }
        if (Array.isArray(comp.right)) {
          compares.right = comp.right;
        }
        const propcompares = traverse(compares, props || jsonx.props);
        const opscompares = Object.assign({}, comp, propcompares);
        // console.debug({ opscompares, compares, renderedCompProps });
        switch (opscompares.operation) {
          case "eq":
          case "==":
            // return opscompares.left == opscompares.right;
            // eslint-disable-next-line
            return opscompares.left == opscompares.right;
          case "dneq":
          case "!=":
          case "!":
            // return opscompares.left != opscompares.right;
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
            return opscompares.left === undefined || opscompares.left === null;
          case "!null":
          case "!undefined":
          case "exists":
          default:
            //'exists'
            return opscompares.left !== undefined && opscompares.left !== null;
        }
        // }
        // if (opscompares.operation === 'eq') {
        //   // return opscompares.left == opscompares.right;
        //   // eslint-disable-next-line
        //   return opscompares.left == opscompares.right;
        // } else if (opscompares.operation === 'dneq') {
        //   // return opscompares.left != opscompares.right;
        //   return opscompares.left !== opscompares.right;
        // } else if (opscompares.operation === 'dnseq') {
        //   return opscompares.left !== opscompares.right;
        // } else if (opscompares.operation === 'seq') {
        //   return opscompares.left === opscompares.right;
        // } else if (opscompares.operation === 'lt') {
        //   return opscompares.left < opscompares.right;
        // } else if (opscompares.operation === 'lte') {
        //   return opscompares.left <= opscompares.right;
        // } else if (opscompares.operation === 'gt') {
        //   return opscompares.left > opscompares.right;
        // } else if (opscompares.operation === 'gte') {
        //   return opscompares.left >= opscompares.right;
        // } else if (opscompares.operation === 'dne') {
        //   return opscompares.left === undefined || opscompares.left === null;
        // } else { //'exists'
        //   return opscompares.left !== undefined && opscompares.left !== null;
        // }
      })
    : [];
  const validProps = comparisons.filter(comp => comp === true);
  if (!jsonx.comparisonprops) {
    return true;
  } else if (jsonx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (
    validProps.length !== comparisons.length &&
    !jsonx.comparisonorprops
  ) {
    return false;
  } else {
    return true;
  }
}

/**
 * Use to test if can bind components this context for react-redux-router
 * @returns {Boolean} true if browser is not IE or old android / chrome
 */
export function getAdvancedBinding(this: defs.globalThisWindow): boolean {
  var window: any = window;
  if (typeof window === "undefined") {
    if (this && this.window) {
      window = this.window;
    } else if (typeof global !== "undefined" && global.window) {
      window = global.window;
    } else if (typeof globalThis !== "undefined" && globalThis.window) {
      window = globalThis.window;
    }
    if (!window.navigator) return false;
  }
  try {
    if (
      window &&
      window.navigator &&
      window.navigator.userAgent &&
      typeof window.navigator.userAgent === "string"
    ) {
      // console.log('window.navigator.userAgent',window.navigator.userAgent)
      if (window.navigator.userAgent.indexOf("Trident") !== -1) {
        return false;
      }
      const uastring = window.navigator.userAgent;
      //@ts-ignore
      const parser = new UAParser();
      parser.setUA(uastring);
      const parseUserAgent = parser.getResult();
      // console.log({ parseUserAgent, });
      if (
        (parseUserAgent.browser.name === "Chrome" ||
          parseUserAgent.browser.name === "Chrome WebView") &&
        parseUserAgent.os.name === "Android" &&
        parseInt(parseUserAgent.browser.version, 10) < 50
      ) {
        return false;
      }
      if (parseUserAgent.browser.name === "Android Browser") {
        return false;
      }
    }
  } catch (e) {
    e;
    console.error(e);
    // console.warn('could not detect browser support', e);
    return false;
  }
  return true;
}

/**
 * take an object of array paths to traverse and resolve
 * @example
 * const testObj = {
      user: {
        name: 'jsonx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'jsonx',  }
 * @param {Object} paths - an object to resolve array property paths 
 * @param {Object} data - object to traverse
 * @returns {Object} resolved object with traversed properties
 * @throws {TypeError} 
 */
export function traverse(paths: defs.traversePaths = {}, data = {}) {
  let keys = Object.keys(paths);
  if (!keys.length) return paths;
  return keys.reduce((result: defs.jsonxResourceProps, key: string) => {
    //@ts-ignore
    if (typeof paths[key] === "string") result[key] = data[paths[key]];
    else if (Array.isArray(paths[key])) {
      let _path = Object.assign([], paths[key]);
      let value = data;
      while (_path.length && value && typeof value === "object") {
        let prop = _path.shift();
        //@ts-ignore
        value = value[prop];
      }
      result[key] = _path.length ? undefined : value;
    } else
      throw new TypeError(
        "dynamic property paths must be a string or an array of strings or numeric indexes"
      );
    return result;
  }, {});
}

/**
 * Validates JSONX JSON Syntax
 * @example
 * validateJSONX({component:'p',children:'hello world'})=>true
 * validateJSONX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} jsonx - JSONX JSON to validate
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if JSONX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */
export function validateJSONX(
  jsonx: defs.jsonx = {},
  returnAllErrors = false
): boolean | string {
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
  let errors: any = [];
  if (!jsonx.component) {
    errors.push(SyntaxError("[0001] Missing React Component"));
  }
  if (jsonx.props) {
    if (typeof jsonx.props !== "object" || Array.isArray(jsonx.props)) {
      errors.push(
        TypeError(
          "[0002] " +
            jsonx.component +
            ": props must be an Object / valid React props"
        )
      );
    }
    if (
      jsonx.props.children &&
      (typeof jsonx.props.children !== "string" ||
        !Array.isArray(jsonx.props.children))
    ) {
      errors.push(
        TypeError(
          "[0003] " +
            jsonx.component +
            ": props.children must be an array of JSONX JSON objects or a string"
        )
      );
    }
    if (
      jsonx.props._children &&
      (typeof jsonx.props._children !== "string" ||
        !Array.isArray(jsonx.props._children))
    ) {
      errors.push(
        TypeError(
          "[0004] " +
            jsonx.component +
            ": props._children must be an array of JSONX JSON objects or a string"
        )
      );
    }
  }
  if (jsonx.children) {
    if (typeof jsonx.children !== "string" && !Array.isArray(jsonx.children)) {
      errors.push(
        TypeError(
          "[0005] " +
            jsonx.component +
            ": children must be an array of JSONX JSON objects or a string"
        )
      );
    }
    if (Array.isArray(jsonx.children)) {
      const childrenErrors = jsonx.children
        .filter(c => typeof c === "object")
        .map(c => validateJSONX(c, returnAllErrors));
      errors = errors.concat(...childrenErrors);
    }
  }
  dynamicPropsNames.forEach(dynamicprop => {
    const jsonxDynamicProps = jsonx[dynamicprop];
    if (jsonxDynamicProps) {
      // if (dynamicprop === 'thisprops') {
      //   console.log({ dynamicprop, jsonxDynamicProps });
      // }
      if (typeof jsonxDynamicProps !== "object") {
        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
      }
      Object.keys(jsonxDynamicProps).forEach(resolvedDynamicProp => {
        if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          errors.push(
            TypeError(
              `[0007] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`
            )
          );
        }
        if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
          const allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter(
            (propArrayItem: any) => typeof propArrayItem === "string"
          );

          if (
            allStringArray.length !==
            jsonxDynamicProps[resolvedDynamicProp].length
          ) {
            errors.push(
              TypeError(
                `[0008] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`
              )
            );
          }
        }
      });
    }
  });
  const evalProps = jsonx.__dangerouslyEvalProps;
  const boundEvalProps = jsonx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if (
      (evalProps && typeof evalProps !== "object") ||
      (boundEvalProps && typeof boundEvalProps !== "object")
    ) {
      errors.push(
        TypeError(
          "[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript"
        )
      );
    }
    evalPropNames
      .filter(evalProp => jsonx[evalProp])
      .forEach(eProps => {
        const evProp = jsonx[eProps];
        const scopedEval = eval;
        Object.keys(evProp).forEach(propToEval => {
          if (typeof evProp[propToEval] !== "string") {
            errors.push(
              TypeError(`[0010] jsonx.${eProps}.${evProp} must be a string`)
            );
          }
          try {
            // console.log({ eProps });
            if (eProps === "__dangerouslyBindEvalProps") {
              const funcToBind = scopedEval(`(${evProp[propToEval]})`);
              funcToBind.call({ bounded: true });
            } else {
              scopedEval(evProp[propToEval]);
            }
          } catch (e) {
            errors.push(e);
          }
        });
      });
  }
  if (jsonx.__dangerouslyInsertComponents) {
    Object.keys(jsonx.__dangerouslyInsertComponents).forEach(
      insertedComponents => {
        try {
          if (jsonx.__dangerouslyInsertComponents)
            validateJSONX(
              jsonx.__dangerouslyInsertComponents[insertedComponents]
            );
        } catch (e) {
          errors.push(
            TypeError(
              `[0011] jsonx.__dangerouslyInsertComponents.${insertedComponents} must be a valid JSONX JSON Object: ${e.toString()}`
            )
          );
        }
      }
    );
  }
  if (jsonx.__functionProps) {
    if (typeof jsonx.__functionProps !== "object") {
      errors.push(TypeError("[0012] jsonx.__functionProps  must be an object"));
    } else {
      Object.keys(jsonx.__functionProps).forEach(fProp => {
        if (
          jsonx.__functionProps &&
          jsonx.__functionProps[fProp] &&
          (typeof jsonx.__functionProps[fProp] !== "string" ||
            jsonx.__functionProps[fProp].indexOf("func:") === -1)
        ) {
          errors.push(
            ReferenceError(
              `[0013] jsonx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`
            )
          );
        }
      });
    }
  }
  if (
    jsonx.__windowComponentProps &&
    (typeof jsonx.__windowComponentProps !== "object" ||
      Array.isArray(jsonx.__windowComponentProps))
  ) {
    errors.push(
      TypeError("[0013] jsonx.__windowComponentProps  must be an object")
    );
  }
  if (jsonx.__windowComponents) {
    if (typeof jsonx.__windowComponents !== "object") {
      errors.push(
        TypeError("[0014] jsonx.__windowComponents must be an object")
      );
    }
    Object.keys(jsonx.__windowComponents).forEach(cProp => {
      if (
        typeof jsonx.__windowComponents[cProp] !== "string" ||
        jsonx.__windowComponents[cProp].indexOf("func:") === -1
      ) {
        errors.push(
          ReferenceError(
            `[0015] jsonx.__windowComponents.${cProp} must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)`
          )
        );
      }
    });
  }
  if (
    typeof jsonx.comparisonorprops !== "undefined" &&
    typeof jsonx.comparisonorprops !== "boolean"
  ) {
    errors.push(TypeError("[0016] jsonx.comparisonorprops  must be boolean"));
  }
  if (jsonx.comparisonprops) {
    if (!Array.isArray(jsonx.comparisonprops)) {
      errors.push(
        TypeError(
          "[0017] jsonx.comparisonprops  must be an array or comparisons"
        )
      );
    } else {
      jsonx.comparisonprops.forEach(c => {
        if (typeof c !== "object") {
          errors.push(
            TypeError(
              "[0018] jsonx.comparisonprops  must be an array or comparisons objects"
            )
          );
        } else if (typeof c.left === "undefined") {
          errors.push(
            TypeError(
              "[0019] jsonx.comparisonprops  must be have a left comparison value"
            )
          );
        }
      });
    }
  }
  if (
    typeof jsonx.passprops !== "undefined" &&
    typeof jsonx.passprops !== "boolean"
  ) {
    errors.push(TypeError("[0020] jsonx.passprops  must be boolean"));
  }
  const invalidKeys = Object.keys(jsonx).filter(
    key => validKeys.indexOf(key) === -1
  );
  if (errors.length) {
    if (returnAllErrors) return errors;
    throw errors[0];
  }
  return invalidKeys.length
    ? `Warning: Invalid Keys [${invalidKeys.join()}]`
    : true;
}

/**
 * validates simple JSONX Syntax {[component]:{props,children}}
 * @param {Object} simpleJSONX - Any valid simple JSONX Syntax
 * @return {Boolean} returns true if simpleJSONX is valid
 */
export function validSimpleJSONXSyntax(simpleJSONX: any = {}) {
  if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
    return false;
  } else {
    const componentName = Object.keys(simpleJSONX)[0];
    return Object.keys(simpleJSONX).length === 1 &&
      !simpleJSONX[componentName].component &&
      (typeof simpleJSONX[componentName] === "object" 
      ||
      typeof simpleJSONX[componentName] === "string")
      ? true
      : false;
  }
}

/**
 * Transforms SimpleJSONX to Valid JSONX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleJSONX JSON Object
 * @return {Object} - returns a valid JSONX JSON Object from a simple JSONX JSON Object
 */
export function simpleJSONXSyntax(
  simpleJSONX: defs.simpleJsonx = {}
): defs.jsonx {
  if(simpleJSONX.component) return simpleJSONX
  const component = Object.keys(simpleJSONX)[0];
  try {
    const children = typeof simpleJSONX[component] ==='string' || Array.isArray(simpleJSONX[component])
      ? simpleJSONX[component]
      : simpleJSONX[component] && simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children)
        ? (simpleJSONX[component].children as defs.simpleJsonx[]).map(simpleJSONXSyntax)
        : simpleJSONX[component].children;
    const jsonxprops = typeof simpleJSONX[component] ==='object'
      ? simpleJSONX[component]
      : undefined;
    const jsonx = {component,...jsonxprops,children}
    return jsonx as defs.jsonx;
    // return Object.assign(
    //   {},
    //   {
    //     component
    //   },
    //   simpleJSONX[component],
    //   {
    //     children:
    //       simpleJSONX[component] &&
    //       simpleJSONX[component].children &&
    //       Array.isArray(simpleJSONX[component].children)
    //         ? (simpleJSONX[component].children as defs.simpleJsonx[]).map(
    //             simpleJSONXSyntax
    //           )
    //         : simpleJSONX[component].children
    //   }
    // );
  } catch (e) {
    throw SyntaxError("Invalid Simple JSONX Syntax");
  }
}

/**
 * Transforms Valid JSONX JSON to SimpleJSONX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} jsonx Valid JSONX JSON object
 * @return {Object} - returns a simple JSONX JSON Object from a valid JSONX JSON Object
 */
export function getSimplifiedJSONX(jsonx: defs.jsonx = {}) {
  try {
    if (!jsonx.component) return jsonx; //already simple
    const componentName = jsonx.component;
    jsonx.children = Array.isArray(jsonx.children)
      ? jsonx.children
          .filter(child => child) //remove empty children
          .map(getSimplifiedJSONX)
      : jsonx.children;
    delete jsonx.component;
    return {
      [componentName]: jsonx
    };
  } catch (e) {
    throw e;
  }
}

/**
 * Fetches JSON from remote path
 * @param {String} path - fetch path url
 * @param {Object} options - fetch options
 * @return {Object} - returns fetched JSON data
 */
export async function fetchJSON(path: string = "", options = {}) {
  try {
    const response = await fetch(path, options);
    return await response.json();
  } catch (e) {
    throw e;
  }
}
