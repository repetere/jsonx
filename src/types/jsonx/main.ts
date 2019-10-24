import { jsonx } from "./jsonx";
// import React from 'react';

export type JSONReactElement = {
    type: string;
    props?: any;
    children?: null | string | JSONReactElement[];
};

export type Context = {
    componentLibraries?: jsonx.jsonxLibrary;
    reactComponents?: jsonx.jsonxComponents;
    debug?: boolean;
    returnJSON?: boolean;
    logError?: any;
    boundedComponents?: string[];
    disableRenderIndexKey?: boolean;
    name?: string;
};

export type Config = {
  jsonx: jsonx;
  resources?: any;
};

export type RenderConfig = Config & {
  querySelector: string;
  options?: any;
  DOM?: HTMLElement;
  portal?: boolean;
};

export type OutputHTMLContext = {
  useJSON: boolean;
} & Context;

export type OutputHTMLConfig = {
  type?: string;
  props?: any;
  children?: null | string | JSONReactElement[];
} & Config;

// /**
//  * Use ReactDOMServer.renderToString to render html from JSONX
//  * @example
//  * // Uses react to create <div class="jsonx-generated"><p style="color:red;">hello world</p></div>
//  * jsonx.outputHTML({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
//  * @param {object} config - options used to inject html via ReactDOM.render
//  * @param {object} config.jsonx - any valid JSONX JSON object
//  * @param {object} config.resources - any additional resource used for asynchronous properties
//  * @property {object} this - options for getReactElementFromJSONX
//  * @returns {string} React genereated html via JSONX JSON
//  */
// declare function outputHTML(config: {
//     jsonx: any;
//     resources: any;
// }): string;

// /**
//  * Use React.createElement and JSONX JSON to create React elements
//  * @example
//  * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
//  * jsonx.getReactElementFromJSONX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
//  * @param {object} jsonx - any valid JSONX JSON object
//  * @param {object} resources - any additional resource used for asynchronous properties
//  * @property {object} this - options for getReactElementFromJSONX
//  * @property {Object} [this.componentLibraries] - react components to render with JSONX
//  * @property {boolean} [this.debug=false] - use debug messages
//  * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
//  * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
//  * @property {function} [this.logError=console.error] - error logging function
//  * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
//  * @returns {function} React element via React.createElement
//  */
// declare function getReactElementFromJSONX(jsonx: any, resources: any): (...params: any[]) => any;

// /** converts a json object {type,props,children} into a react element
//  * @example
//  * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
//  * @param {Object|String} options.type - 'div' or react component
//  * @param {Object} options.props - props for react element
//  * @param {String|[Object]} options.children - children elements
//  * @returns {function} React element via React.createElement
//  */
// declare function getReactElementFromJSON(): (...params: any[]) => any;

// /** converts a jsonx json object into a react function component
//  * @example
//  * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
//  * @param {Object} jsonx - valid JSONX JSON
//  * @param {Object} resources - props for react element
//  * @returns {function} React element via React.createElement
//  */
// declare function compile(jsonx: any, resources: any): (...params: any[]) => any;

// /**
//  * converts JSONX JSON IR to JSX
//  * @example
//  * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
//  * @param {Object} json - {type,props,children}
//  * @returns {String} jsx string
//  */
// declare function outputJSX(json: any): string;

// /**
//  * Compiles JSONX into JSON IR format for react create element
//  * @example
//  * jsonx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
//  props: { key: 5, title: 'test' },
//  children: 'hello' }
//  * @property {object} this - options for getReactElementFromJSONX
//  * @param {object} jsonx - any valid JSONX JSON object
//  * @param {object} resources - any additional resource used for asynchronous properties
//  * @returns {Object} json - {type,props,children}
//  */
// declare function outputJSON(jsonx: any, resources: any): {
//     this: any;
// };

// /**
//  * converts JSONX JSON IR to JSX
//  * @example
//  * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
//  * @param {Object} json - {type,props,children}
//  * @returns {String} jsx string
//  */
// declare function jsonToJSX(json: any): string;

// /**
//  * Exposes react module used in JSONX
//  * @returns {Object} React
//  */
// declare function __getReact(): any;

// /**
//  * Exposes react dom module used in JSONX
//  * @returns {Object} ReactDOM
//  */
// declare function __getReactDOM(): any;

// /**
//  * Exposes global hook used in JSONX
//  * @returns {Object} useGlobalHook
//  */
// declare function __getUseGlobalHook(): any;
