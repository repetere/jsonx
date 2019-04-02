// import React, { createElement, } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

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
 * @property {object} this - options for getRenderedJSON
 */
export function rjxRender(config = {}) {
  const { rjx, resources, querySelector, options, DOM, } = config;
  ReactDOM.render(
    getRenderedJSON.call(this || {}, rjx, resources, options),
    DOM || document.querySelector(querySelector)
  );
}

/**
 * Use ReactDOMServer.renderToString to render html from RJX
 * @example
 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
 * rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.rjx - any valid RJX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getRenderedJSON
 * @returns {string} React genereated html via RJX JSON
 */
export function rjxHTMLString(config = {}) {
  const { rjx, resources, } = config;
  return ReactDOMServer.renderToString(getRenderedJSON.call(this || {}, rjx, resources));
}

/**
 * Use React.createElement and RJX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * rjx.getRenderedJSON({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} rjx - any valid RJX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getRenderedJSON
 * @property {Object} [this.componentLibraries] - react components to render with RJX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */
export function getRenderedJSON(rjx = {}, resources = {}) {
  // eslint-disable-next-line
  const { componentLibraries = {}, debug = false, logError = console.error, boundedComponents = [], } = this || {};
  // const componentLibraries = this.componentLibraries;
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

/**
 * Use RJX for express view rendering
 * @param {string} filePath - path to rjx express view 
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for RJX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback 
 */
export function __express(filePath, options, callback) {
  try {
    const resources = Object.assign({}, options);
    delete resources.__boundConfig;
    delete resources.__DOCTYPE;
    delete resources.__rjx;
    const rjxModule = options.__rjx || require(filePath);
    const rjxRenderedString = rjxHTMLString.call(options.__boundConfig || {}, {
      rjx: rjxModule,
      resources,
    });
    callback(null, `${options.__DOCTYPE || '<!DOCTYPE html>'}
${rjxRenderedString}`);
  } catch (e) {
    callback(e);
  }
}

export function __getReact() {
  return React;
}

export function __getReactDOM() {
  return ReactDOM;
}

export const _rjxChildren = rjxChildren;
export const _rjxComponents = rjxComponents;
export const _rjxProps = rjxProps;
export const _rjxUtils = rjxUtils;

export default getRenderedJSON;