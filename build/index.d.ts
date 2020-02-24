/// <reference types="numeral" />
import React from "react";
import ReactDOM from "react-dom";
import * as defs from "./types/jsonx/index";
import * as jsonxComponents from "./components";
import * as jsonxProps from "./props";
import * as jsonxChildren from "./children";
import * as jsonxUtils from "./utils";
import * as luxon from "luxon";
import { ReactElementLike } from "prop-types";
import { JSONReactElement, Context } from "./types/jsonx/index";
export declare let renderIndex: number;
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
export declare function jsonxRender(this: defs.Context, config?: defs.RenderConfig): void;
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
export declare function outputHTML(this: defs.OutputHTMLContext, config?: defs.OutputHTMLConfig): string;
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
export declare function getReactElementFromJSONX(this: defs.Context, jsonx?: defs.jsonx | defs.simpleJsonx, resources?: {}): ReactElementLike | JSONReactElement | null;
export declare const getRenderedJSON: typeof getReactElementFromJSONX;
export declare const getReactElement: typeof getReactElementFromJSONX;
/** converts a json object {type,props,children} into a react element
 * @example
 * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
 * @param {Object|String} options.type - 'div' or react component
 * @param {Object} options.props - props for react element
 * @param {String|[Object]} options.children - children elements
 * @returns {function} React element via React.createElement
 */
export declare function getReactElementFromJSON({ type, props, children }: JSONReactElement): ReactElementLike;
/** converts a jsonx json object into a react function component
 * @example
 * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} jsonx - valid JSONX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
 */
export declare function compile(this: Context, jsonx: defs.jsonx, resources?: {}): (props: any) => ReactElementLike;
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export declare function outputJSX(this: Context, jsonx: defs.jsonx, resources?: {}): string;
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
export declare function outputJSON(jsonx: defs.jsonx, resources?: {}): JSONReactElement;
export declare const jsonxHTMLString: typeof outputHTML;
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export declare function jsonToJSX(json: JSONReactElement): string;
/**
 * Exposes react module used in JSONX
 * @returns {Object} React
 */
export declare function __getReact(): typeof React;
/**
 * Exposes react dom module used in JSONX
 * @returns {Object} ReactDOM
 */
export declare function __getReactDOM(): typeof ReactDOM;
export declare const _jsonxChildren: typeof jsonxChildren;
export declare const _jsonxComponents: typeof jsonxComponents;
export declare const _jsonxProps: typeof jsonxProps;
export declare const _jsonxUtils: typeof jsonxUtils;
export declare const _jsonxHelpers: {
    numeral: Numeral;
    luxon: typeof luxon;
};
export { __express, __express as renderFile } from "./express";
export default getReactElementFromJSONX;
