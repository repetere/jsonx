import React from 'react';
import { getRenderedJSON, } from './main';
import * as utilities from './utils';

if (typeof window === 'undefined') {
  var window = {};
}

export let componentMap = Object.assign({}, React.DOM, (typeof window!=='undefined') ? window.__rjx_custom_elements : {});

export function getRJXProps(options = {}) {
  // eslint-disable-next-line
  const { rjx, resources, renderIndex, logError = console.error, useReduxState = true, propName = 'asyncprops', traverseObject = {}, } = options;
  // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
  // ? utilities.traverse(rjx.asyncprops, resources)
  // : {};
  return (rjx[ propName ] && typeof rjx[ propName ] === 'object')
    ? utilities.traverse(rjx[ propName ], traverseObject)
    : {};
}

export function getEvalProps(options = {}) {
  const { rjx, } = options;
  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
  return Object.keys(rjx.__dangerouslyEvalProps).reduce((eprops, epropName) => {
    // eslint-disable-next-line
    eprops[ epropName ] = (rjx.__dangerouslyBindEvalProps[ epropName ])
      ? scopedEval(rjx.__dangerouslyEvalProps[ epropName ]).bind(this)
      : scopedEval(rjx.__dangerouslyEvalProps[ epropName ]);
    return eprops;
  }, {});
}


export function getComponentProps(options = {}) {
  const { rjx, resources, debug, } = options;
  return Object.keys(rjx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
    // eslint-disable-next-line
    cprops[ cpropName ] = getRenderedJSON.call(this, rjx.__dangerouslyInsertComponents[ cpropName ], resources, debug);
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
  const { allProps, rjx = {}, } = options;
  const getFunction = getFunctionFromProps.bind(this);
  const funcProps = rjx.__functionProps;
  //Allowing for window functions
  Object.keys(funcProps).forEach(key => {
    if (typeof funcProps[key] ==='string' && funcProps[key].indexOf('func:') !== -1 ){
      allProps[ key ] = getFunction({ propFunc: allProps[ key ], });
    } 
  });
  return allProps;
}

export function getWindowComponents(options = {}) {
  const { allProps, rjx, } = options;
  const windowComponents = rjx.__windowComponents;
  // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {
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
  const { rjx, resources, renderIndex, logError = console.error, useReduxState=true, ignoreReduxPropsInComponentLibraries=true, componentLibraries, debug, } = options;
  try {
    const componentThisProp = (rjx.thisprops)
      ? Object.assign({
        __rjx: {
          _component: rjx,
          _resources: resources,
        },
      }, this.props,
      rjx.props,
      (useReduxState && !rjx.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[rjx.component])) 
        ? (this.props && this.props.getState) ? this.props.getState() : {}
        : {}
      )
      : undefined;
    const asyncprops = getRJXProps({ rjx, propName: 'asyncprops', traverseObject: resources, });
    const windowprops = getRJXProps({ rjx, propName: 'windowprops', traverseObject: window, });
    const thisprops = getRJXProps({ rjx, propName: 'thisprops', traverseObject: componentThisProp, });

    //allowing javascript injections
    const evalProps = (rjx.__dangerouslyEvalProps)
      ? getEvalProps.call(this, { rjx, })
      : {};
    const insertedComponents = (rjx.__dangerouslyInsertComponents)
      ? getComponentProps.call(this, { rjx, resources, debug, })
      : {};
    const allProps = Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
    const computedProps = Object.assign(allProps,
      rjx.__functionProps ? getFunctionProps.call(this, { allProps, rjx, }) : {},
      rjx.__windowComponents ? getWindowComponents.call(this, { allProps, rjx, }) : {});
    
    return computedProps;
  } catch (e) {
    logError(e, (e.stack) ? e.stack : 'no stack');
    return null;
  }
}