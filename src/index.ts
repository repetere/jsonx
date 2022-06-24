// import React, { createElement, } from 'react';
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import ReactDOMServer from "react-dom/server";
import * as defs from "./types/jsonx/index";

import * as jsonxComponents from "./components";
import * as jsonxProps from "./props";
import * as jsonxChildren from "./children";
import * as jsonxUtils from "./utils";
import numeral from "numeral";
import * as luxon from "luxon";

import { ReactElementLike } from "prop-types";
import { JSONReactElement, Context } from "./types/jsonx/index";
const createElement = React.createElement;
const {
  componentMap,
  getComponentFromMap,
  getBoundedComponents,
  DynamicComponent,
  FormComponent,
  ReactHookForm,
  getReactLibrariesAndComponents,
} = jsonxComponents;
const { getComputedProps } = jsonxProps;
const { getJSONXChildren } = jsonxChildren;
const { displayComponent, validSimpleJSONXSyntax, simpleJSONXSyntax } = jsonxUtils;
export let renderIndex = 0;

/**
 * Use JSONX without any configuration to render JSONX JSON to HTML and insert JSONX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="jsonx-generated"><p style="color:red;">hello world</p></div></div></body>
 * jsonx.jsonxRender({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getReactElementFromJSONX
 */
export function jsonxRender(
  this: defs.Context,
  config: defs.RenderConfig = { jsonx: { component: "" }, querySelector: "" }
): void {
  const { jsonx, resources, querySelector, DOM, portal } = config;
  const RenderDOM: HTMLElement | null =
    DOM || document.querySelector(querySelector);
  const JSONXReactElement: any = getReactElementFromJSONX.call(
    this || {},
    jsonx,
    resources
  );
  if (!JSONXReactElement) throw ReferenceError("Invalid React Element");
  else if (!RenderDOM) throw ReferenceError("Invalid Render DOM Element");
  if(portal) ReactDOM.createPortal(JSONXReactElement, RenderDOM);
  else {
    const root = createRoot(RenderDOM);
    root.render(JSONXReactElement);
  }
}

/**
 * Use ReactDOMServer.renderToString to render html from JSONX
 * @example
 * // Uses react to create <div class="jsonx-generated"><p style="color:red;">hello world</p></div>
 * jsonx.outputHTML({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @returns {string} React genereated html via JSONX JSON
 */
export function outputHTML(
  this: defs.OutputHTMLContext,
  config: defs.OutputHTMLConfig = { jsonx: { component: "" } }
): string {
  const { jsonx, resources, type, props, children } = config;

  return this && this.useJSON
    ? ReactDOMServer.renderToString(
        getReactElementFromJSON.call(this || {}, { type:(type||jsonx.type||jsonx.component||'Fragment' as string), props:props||jsonx.props, children:children||jsonx.children })
      )
    : ReactDOMServer.renderToString(
        getReactElementFromJSONX.call(
          this || {},
          jsonx,
          resources
        ) as ReactElementLike
      );
}

/**
 * Use React.createElement and JSONX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * jsonx.getReactElementFromJSONX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
 * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */
export function getReactElementFromJSONX(
  this: defs.Context,
  jsonx?: defs.jsonx | defs.simpleJsonx,
  resources = {}
): ReactElementLike | JSONReactElement | null |string|undefined{
  // eslint-disable-next-line
  const {
    customComponents,
    debug = false,
    returnJSON = false,
    logError = console.error,
    boundedComponents = [],
    disableRenderIndexKey = true
  } = this || {};
  let {
    componentLibraries = {},
  } = this ||{};
  componentLibraries.ReactHookForm = ReactHookForm
  if (!jsonx) return null;
  if (jsonx.type) jsonx.component = jsonx.type;
  if (!jsonx.component && validSimpleJSONXSyntax(jsonx)) {
    jsonx = simpleJSONXSyntax(jsonx);
  }
  if (!jsonx || !jsonx.component)
    return createElement(
      "span",
      {},
      debug ? "Error: Missing Component Object" : ""
    );
  try {
    let components = Object.assign(
      { DynamicComponent: DynamicComponent.bind(this) },
      { FormComponent: FormComponent.bind(this) },
      componentMap,
      this?.reactComponents
    );

    let reactComponents = boundedComponents.length
      ? getBoundedComponents.call(this, {
          boundedComponents,
          reactComponents: components
        })
      : components;
    if(customComponents && Array.isArray(customComponents) && customComponents.length){
      const cxt = {...this,componentLibraries,reactComponents:components}
      const {
        customComponentLibraries,
        customReactComponents
      } = getReactLibrariesAndComponents.call(cxt,customComponents);
      componentLibraries = {...componentLibraries, ...customComponentLibraries};
      reactComponents = {...reactComponents, ...customReactComponents};
    }
    if(disableRenderIndexKey===false) renderIndex++;
    const element = getComponentFromMap.call(this, {
      jsonx,
      reactComponents,
      componentLibraries,
      debug,
      logError
    });
    const props = getComputedProps.call(this, {
      jsonx,
      resources,
      renderIndex,
      componentLibraries,
      debug,
      logError,
      disableRenderIndexKey
    });
    const displayElement = jsonx.comparisonprops
      ? displayComponent.call(this, {
          jsonx,
          props,
          renderIndex,
          componentLibraries,
          debug
        })
      : true;
    if (displayElement) {
      const children = getJSONXChildren.call(this, {
        jsonx,
        props,
        resources,
        renderIndex
      }) as ReactNode[];
      //@ts -ignore
      if (returnJSON) return { type: element as string, props, children };
      else if (jsonx.test) return JSON.stringify({ element, props, children }, null, 2);
      //TODO: Fix
      else return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ jsonx, resources }, "getReactElementFromJSONX this", this);
      logError(e, (e as Error).stack ? (e as Error).stack : "no stack");
      return (e as Error).toString()
    }
    throw e;
  }
}

export const getRenderedJSON = getReactElementFromJSONX;
export const getReactElement = getReactElementFromJSONX;

/** converts a json object {type,props,children} into a react element
 * @example
 * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
 * @param {Object|String} options.type - 'div' or react component
 * @param {Object} options.props - props for react element
 * @param {String|[Object]} options.children - children elements
 * @returns {function} React element via React.createElement
 */
export function getReactElementFromJSON({
  type,
  props,
  children
}: JSONReactElement): ReactElementLike {
  return createElement(
    type,
    props,
    children && Array.isArray(children)
      ? children.map(getReactElementFromJSON)
      : children
  );
}

/** converts a jsonx json object into a react function component
 * @example
 * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} jsonx - valid JSONX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
 */
export function compile(this: Context, jsonx: defs.jsonx, resources = {}) {
  const context = Object.assign({}, this, { returnJSON: true });
  const json = getReactElementFromJSONX.call(
    context,
    jsonx,
    resources
  ) as defs.JSONReactElement;
  const func = function compiledJSONX(props: any) {
    json.props = Object.assign({}, json.props, props);
    return getReactElementFromJSON(json);
  };
  Object.defineProperty(func, "name", { value: this.name });
  return func;
}

/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export function outputJSX(this: Context, jsonx: defs.jsonx, resources = {}) {
  const context = Object.assign({}, this, { returnJSON: true });
  const json = getReactElementFromJSONX.call(
    context,
    jsonx,
    resources
  ) as defs.JSONReactElement;
  return jsonToJSX(json);
}

/**
 * Compiles JSONX into JSON IR format for react create element
 * @example
 * jsonx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
 props: { key: 5, title: 'test' },
 children: 'hello' }
 * @property {object} this - options for getReactElementFromJSONX
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @returns {Object} json - {type,props,children}
 */
export function outputJSON(
  jsonx: defs.jsonx,
  resources = {}
): JSONReactElement {
  //@ts-ignore
  const context = Object.assign({}, this, { returnJSON: true });
  return getReactElementFromJSONX.call(
    context,
    jsonx,
    resources
  ) as JSONReactElement;
}
export const jsonxHTMLString = outputHTML;

/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export function jsonToJSX(json: JSONReactElement): string {
  const propsString = json.props
    ? Object.keys(json.props)
        .filter(prop => prop.includes("__eval_") === false)
        .reduce((propString, prop) => {
          propString += ` ${prop.toString()}=${
            typeof json.props[prop] === "string"
              ? `"${json.props[prop].toString()}"`
              : `{${(
                  json.props[`__eval_${prop}`] || json.props[prop]
                ).toString()}}`
          }`;
          return propString;
        }, "")
    : "";
  return Array.isArray(json.children)
    ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX).join('\r\n')}
</${json.type}>`
    : `<${json.type}${propsString}>${json.children}</${json.type}>`;
}
/**
 * Exposes react module used in JSONX
 * @returns {Object} React
 */
export function __getReact() {
  return React;
}

/**
 * Exposes react dom module used in JSONX
 * @returns {Object} ReactDOM
 */
export function __getReactDOM() {
  return ReactDOM;
}

export const _jsonxChildren = jsonxChildren;
export const _jsonxComponents = jsonxComponents;
export const _jsonxProps = jsonxProps;
export const _jsonxUtils = jsonxUtils;
export const _jsonxHelpers = { numeral, luxon };
export { __express, __express as renderFile } from "./express";

export default getReactElementFromJSONX;
