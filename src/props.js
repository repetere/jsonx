import React from 'react';
import { getRenderedJSON, } from './main';
import * as utilities from './utils';

if (typeof window === 'undefined') {
  var window = {};
}

export let componentMap = Object.assign({}, React.DOM, window.__rjx_custom_elements);

export function getRJXProps(options = {}) {
  // eslint-disable-next-line
  const { componentObject, resources, renderIndex, logError = console.error, useReduxState = true, propName = 'asyncProps', traverseObject = {}, } = options;
  // return (componentObject.asyncprops && typeof componentObject.asyncprops === 'object')
  // ? utilities.traverse(componentObject.asyncprops, resources)
  // : {};
  return (componentObject[ propName ] && typeof componentObject[ propName ] === 'object')
    ? utilities.traverse(componentObject[ propName ], traverseObject)
    : {};
}

export function getEvalProps(options = {}) {
  const { componentObject, } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  return Object.keys(componentObject.__dangerouslyEvalProps).reduce((eprops, epropName) => {
    // eslint-disable-next-line
    eprops[ epropName ] = (componentObject.__dangerouslyBindEvalProps[ epropName ])
      ? scopedEval(componentObject.__dangerouslyEvalProps[ epropName ]).bind(this)
      : scopedEval(componentObject.__dangerouslyEvalProps[ epropName ]);
    return eprops;
  }, {});
}


export function getComponentProps(options = {}) {
  const { componentObject, resources, debug, } = options;
  return Object.keys(componentObject.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    // eslint-disable-next-line
    cprops[ cpropName ] = getRenderedJSON.call(this, componentObject.__dangerouslyInsertComponents[ cpropName ], resources, debug);
    return cprops;
  }, {});
}

export function getFunctionFromProps(options) {
  const { propFunc, } = options;

  if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props.reduxRouter') !== -1) {
    return this.props.reduxRouter[ propFunc.replace('func:this.props.reduxRouter.', '') ];
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:this.props') !== -1) {
    return this.props[ propFunc.replace('func:this.props.', '') ].bind(this);
  } else if (typeof propFunc === 'string' && propFunc.indexOf('func:window') !== -1 && typeof window[propFunc.replace('func:window.', '')] ==='function') {
    return window[ propFunc.replace('func:window.', '') ].bind(this);
  } else if(typeof this.props[propFunc] ==='function') {
    return propFunc.bind(this);
  } else {
    return function () { }
  }
}

export function getFunctionProps(options = {}) {
  const { allProps, componentObject = {}, } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = componentObject.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] ==='string' && funcProps[key].indexOf('func:') !== -1 ){
      allProps[ key ] = getFunction({ propFunc: allProps[ key ], });
    } 
  });
  return allProps;
}

export function getWindowComponents(options = {}) {
  const { allProps, componentObject, } = options;
  const windowComponents = componentObject.__windowComponents;
  // if (componentObject.hasWindowComponent && window.__rjx_custom_elements) {
  Object.keys(windowComponents).forEach(key => {
    if (typeof windowComponents[ key ] === 'string' && windowComponents[ key ].indexOf('func:window.__rjx_custom_elements') !== -1 && typeof window.__rjx_custom_elements[ windowComponents[ key ].replace('func:window.__rjx_custom_elements.', '') ] === 'function') {
      const windowComponentElement = window.__rjx_custom_elements[ allProps[ key ].replace('func:window.__rjx_custom_elements.', '') ];
      const windowComponentProps = (allProps[ 'windowCompProps' ]) ? allProps[ 'windowCompProps' ]
        : this.props;
      allProps[ key ] = React.createElement(
        windowComponentElement,
        windowComponentProps,
        null);
    }
  });
  return allProps;
}

//any property that's prefixed with __ is a computedProperty
export function getComputedProps(options = {}) {
  // eslint-disable-next-line
  const { componentObject, resources, renderIndex, logError = console.error, useReduxState=true, ignoreReduxPropsInComponentLibraries=true, componentLibraries, debug, } = options;
  try {
    const componentThisProp = (componentObject.asyncprops)
      ? Object.assign({
        __rjx: {
          _component: componentObject,
          _resources: resources,
        },
      }, this.props,
      componentObject.props,
      (useReduxState && !componentObject.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[componentObject.component])) 
        ? this.props.getState() : {})
      : undefined;
    const asyncprops = getRJXProps({ componentObject, propName: 'asyncprops', traverseObject: resources, });
    const windowprops = getRJXProps({ componentObject, propName: 'windowprops', traverseObject: window, });
    const thisprops = getRJXProps({ componentObject, propName: 'thisprops', traverseObject: componentThisProp, });

    //allowing javascript injections
    const evalProps = (componentObject.__dangerouslyEvalProps)
      ? getEvalProps.call(this, { componentObject, })
      : {};
    const insertedComponents = (componentObject.__dangerouslyInsertComponents)
      ? getComponentProps.call(this, { componentObject, resources, debug, })
      : {};
    const allProps = Object.assign({ key: renderIndex, }, thisprops, componentObject.props, asyncprops, windowprops, evalProps, insertedComponents);
    const computedProps = Object.assign(allProps,
      componentObject.__functionProps ? getFunctionProps.call(this, { allProps, componentObject, }) : {},
      componentObject.__windowComponents ? getWindowComponents.call(this,{ allProps, componentObject, }) : {});
    
    return computedProps;
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}