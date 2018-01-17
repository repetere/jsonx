import React from 'react';
import { default as ReactDOMElements, } from 'react-dom-factories';
import { getAdvancedBinding, } from './utils';

if (typeof window === 'undefined') {
  var window = global.window || {};
}
export let advancedBinding = getAdvancedBinding();

/**
 * object of all react components available for RJX
 */
export let componentMap = Object.assign({}, ReactDOMElements, window.__rjx_custom_elements);

/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
 * @param {Object} options - options for getBoundedComponents 
 * @param {Object} options.reactComponents - all react components available for RJX
 * @param {string[]} boundedComponents - list of components to bind RJX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for RJX
 */
export function getBoundedComponents(options = {}) {
  const { reactComponents, boundedComponents=[], } = options;
  if (advancedBinding || options.advancedBinding) {
    return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
      result[ componentName ] = reactComponents[ componentName ].bind(this);
      return result;
    }, {}));
    // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
  } else return reactComponents;
}

/**
 * returns a react component from a component library
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.rjx={}] - any valid RJX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
export function getComponentFromLibrary(options = {}) {
  const { componentLibraries = {}, rjx = {}, } = options;
  const libComponent = Object.keys(componentLibraries)
    .map(libraryName => {
      const cleanLibraryName = rjx.component.replace(`${libraryName}.`, '');
      const libraryNameArray = cleanLibraryName.split('.');
      if (libraryNameArray.length === 2 && typeof componentLibraries[ libraryName ][ libraryNameArray[0] ][libraryNameArray[1]] !== 'undefined') {
        return componentLibraries[ libraryName ][ libraryNameArray[ 0 ] ][ libraryNameArray[ 1 ] ];
      } else if (typeof componentLibraries[ libraryName ][ cleanLibraryName ] !== 'undefined') {
        return componentLibraries[ libraryName ][ cleanLibraryName ];
      }
    })
    .filter(val => val)[ 0 ];
  return libComponent;
}

/**
 * returns a react element from rjx.component
 * @example
 * // returns react elements
 * getComponentFromMap({rjx:{component:'div'}})=>div
 * getComponentFromMap({rjx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModal
 * getComponentFromMap({rjx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
 * @param {Object} options - options for getComponentFromMap
 * @param {object} [options.rjx={}] - any valid RJX JSON object
 * @param {Object} [options.reactComponents={}] - react components to render
 * @param {Object} [options.componentLibraries={}] - react components to render from another component library like bootstrap or bulma
 * @param {function} [options.logError=console.error] - error logging function
 * @param {boolean} [options.debug=false] - use debug messages
 * @returns {string|function|class} valid react element
 */
export function getComponentFromMap(options = {}) {
  // eslint-disable-next-line
  const { rjx = {}, reactComponents = {}, componentLibraries = {}, logError = console.error, debug } = options;

  try {
    if (typeof rjx.component !== 'string' && typeof rjx.component === 'function') {
      return rjx.component;
    } else if (ReactDOMElements[rjx.component]) {
      return rjx.component;
    } else if (reactComponents[ rjx.component ]) {
      return reactComponents[rjx.component];
    } else if (typeof rjx.component ==='string' && rjx.component.indexOf('.') > 0 && getComponentFromLibrary({ rjx, componentLibraries, })) {
      return getComponentFromLibrary({ rjx, componentLibraries, });
    } else {
      throw new ReferenceError(`Invalid React Component (${rjx.component})`);
    }
  } catch (e) {
    if(debug) logError(e, (e.stack) ? e.stack : 'no stack');
    throw e;
  }
}

/**
 * if (recharts[rjx.component.replace('recharts.', '')]) {
      return recharts[rjx.component.replace('recharts.', '')];
    }
 */