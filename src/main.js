// import React, { createElement, } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import useGlobalHook from 'use-global-hook';

import * as rjxComponents from './components';
import * as rjxProps from './props';
import * as rjxChildren from './children';
import * as rjxUtils from './utils';
const createElement = React.createElement;
const { componentMap, getComponentFromMap, getBoundedComponents, } = rjxComponents;
const { getComputedProps, } = rjxProps;
const { getRJXChildren, } = rjxChildren;
const { displayComponent, } = rjxUtils;
export let renderIndex = 0;

/**
 * Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="rjx-generated"><p style="color:red;">hello world</p></div></div></body>
 * rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getReactElementFromRJX
 */
export function rjxRender(config = {}) {
  const { rjx, resources, querySelector, options, DOM, } = config;
  ReactDOM.render(
    getReactElementFromRJX.call(this || {}, rjx, resources, options),
    DOM || document.querySelector(querySelector)
  );
}

/**
 * Use ReactDOMServer.renderToString to render html from RJX
 * @example
 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
 * rjx.outputHTML({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromRJX
 * @returns {string} React genereated html via RJX JSON
 */
export function outputHTML(config = {}) {
  const { rjx, resources, } = config;
  return ReactDOMServer.renderToString(getReactElementFromRJX.call(this || {}, rjx, resources));
}

/**
 * Use React.createElement and RJX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * rjx.getReactElementFromRJX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromRJX
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
 * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */
export function getReactElementFromRJX(rjx = {}, resources = {}) {
  // eslint-disable-next-line
  const { componentLibraries = {}, debug = false, returnJSON=false, logError = console.error, boundedComponents = [], disableRenderIndexKey = false, } = this || {};
  // const componentLibraries = this.componentLibraries;
  if (!rjx) return null;
  if (rjx.type) rjx.component = rjx.type;
  if (rjxUtils.validSimpleRJXSyntax(rjx)) rjx = rjxUtils.simpleRJXSyntax(rjx);
  if (!rjx.component) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');
  try {
    const components = Object.assign({}, componentMap, this.reactComponents);

    const reactComponents = (boundedComponents.length)
      ? getBoundedComponents.call(this, { boundedComponents, reactComponents: components, })
      : components;
    renderIndex++;
    const element = getComponentFromMap({ rjx, reactComponents, componentLibraries, debug, logError, });
    const props = getComputedProps.call(this, { rjx, resources, renderIndex, componentLibraries, debug, logError, });
    const displayElement = (rjx.comparisonprops)
      ? displayComponent.call(this, { rjx, props, renderIndex, componentLibraries, debug, })
      : true;
    if (displayElement) {
      const children = getRJXChildren.call(this, { rjx, props, resources, renderIndex, });
      if (this.returnJSON) return { type:element, props, children, };
      return createElement(element, props, children);
    } else {
      return null;
    }
  } catch (e) {
    if (debug) {
      logError({ rjx, resources, }, 'this', this);
      logError(e, (e.stack) ? e.stack : 'no stack');
    }
    throw e;
  }
}

export const getRenderedJSON = getReactElementFromRJX;
export const getReactElement = getReactElementFromRJX;

/** converts a json object {type,props,children} into a react element 
 * @example
 * rjx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
 * @param {Object|String} options.type - 'div' or react component
 * @param {Object} options.props - props for react element
 * @param {String|[Object]} options.children - children elements
 * @returns {function} React element via React.createElement
*/
export function getReactElementFromJSON({ type, props, children, }) {
  return createElement(type, props, Array.isArray(children)
    ? children.map(getReactElementFromJSON)
    : children);
}

/** converts a rjx json object into a react function component 
 * @example
 * rjx.compile({rjx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} rjx - valid RJX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
*/
export function compile(rjx, resources) {
  const context = Object.assign({}, this, { returnJSON: true, });
  const json = getReactElementFromRJX.call(context, rjx, resources);
  const func = function compiledRJX(props) {
    json.props = Object.assign({}, json.props, props);
    return getReactElementFromJSON(json);
  };
  Object.defineProperty(func, 'name', { value: this.name, });
  return func;
}

/**
 * converts RJX JSON IR to JSX
 * @example
 * rjx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export function outputJSX(rjx, resources) {
  const context = Object.assign({}, this, { returnJSON: true, });
  const json = getReactElementFromRJX.call(context, rjx, resources);
  return jsonToJSX(json);
}

/**
 * Compiles RJX into JSON IR format for react create element
 * @example
 * rjx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
 props: { key: 5, title: 'test' },
 children: 'hello' }
 * @property {object} this - options for getReactElementFromRJX
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @returns {Object} json - {type,props,children}
 */
export function outputJSON(rjx, resources) {
  const context = Object.assign({}, this, { returnJSON: true, });
  return getReactElementFromRJX.call(context, rjx, resources);
}
export const rjxHTMLString = outputHTML;

/**
 * converts RJX JSON IR to JSX
 * @example
 * rjx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
export function jsonToJSX(json) {
  const propsString = json.props
    ? Object.keys(json.props)
      .filter(prop => prop.includes('__eval_') === false)
      .reduce((propString, prop) => {
        propString += ` ${prop.toString()}=${
          typeof json.props[ prop ] === 'string'
            ? `"${json.props[ prop ].toString()}"`
            : `{${(json.props[ `__eval_${prop}` ]||json.props[ prop ]).toString()}}`
        }`;
        return propString;
      }, '')
    : '';
  return Array.isArray(json.children)
    ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX)}
</${json.type}>`
    : `<${json.type}${propsString}>${json.children}</${json.type}>`;
}
/**
 * Exposes react module used in RJX
 * @returns {Object} React
 */
export function __getReact() {
  return React;
}

/**
 * Exposes react dom module used in RJX
 * @returns {Object} ReactDOM
 */
export function __getReactDOM() {
  return ReactDOM;
}

/**
 * Exposes global hook used in RJX
 * @returns {Object} useGlobalHook
 */
export function __getUseGlobalHook() {
  return useGlobalHook;
}

export const _rjxChildren = rjxChildren;
export const _rjxComponents = rjxComponents;
export const _rjxProps = rjxProps;
export const _rjxUtils = rjxUtils;
export { __express, } from './express';

export default getReactElementFromRJX;