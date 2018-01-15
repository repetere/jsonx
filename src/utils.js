import UAParser from 'ua-parser-js';


export function displayComponent(options = {}) {
  const { rjx, props, } = options;
  const propsToCompare = rjx.comparisonprops;
  const comparisons = propsToCompare.map(comp => {
    const compares = {};
    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }
    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }
    const propcompares = traverse(compares, props);
    const opscompares = Object.assign({}, comp, propcompares);
    // console.debug({ opscompares, compares, renderedCompProps });
    if (opscompares.operation === 'eq') {
      // return opscompares.left == opscompares.right;
      return opscompares.left === opscompares.right;
    } else if (opscompares.operation === 'dneq') {
      // return opscompares.left != opscompares.right;
      return opscompares.left !== opscompares.right;
    } else if (opscompares.operation === 'dnseq') {
      return opscompares.left !== opscompares.right;
    } else if (opscompares.operation === 'seq') {
      return opscompares.left === opscompares.right;
    } else if (opscompares.operation === 'lt') {
      return opscompares.left < opscompares.right;
    } else if (opscompares.operation === 'lte') {
      return opscompares.left <= opscompares.right;
    } else if (opscompares.operation === 'gt') {
      return opscompares.left > opscompares.right;
    } else if (opscompares.operation === 'gte') {
      return opscompares.left >= opscompares.right;
    } else if (opscompares.operation === 'dne') {
      return opscompares.left === undefined || opscompares.left === null;
    } else { //'exists'
      return opscompares.left !== undefined || opscompares.left !== null;
    }
  });
  const validProps = comparisons.filter(comp => comp === true);
  if (rjx.comparisonorprops && validProps.length<1) {
    return false;
  } else if (validProps.length !== comparisons.length) {
    return false;
  } else {
    return true;
  }
}

export function getAdvancedBinding() {
  try {
    if (window && window.navigator && window.navigator.userAgent &&  typeof window.navigator.userAgent==='string') {
      if(window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      var uastring = window.navigator.userAgent;
      var parser = new UAParser();
      parser.setUA(uastring);
      var parseUserAgent = parser.getResult();
      // console.debug({ parseUserAgent, });
      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView' ) && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }
      if (parseUserAgent.browser.name === 'Android Browser') {
        return false;
      }
    }
  } catch (e) {
    e;
    // console.warn('could not detect browser support', e);
    return false;
  }
  return true;
}

export function traverse(paths = [], data = {}) {
  let keys = Object.keys(paths);
  if (!keys.length) return paths;
  return keys.reduce((result, key) => {
    if (typeof paths[key] === 'string') result[key] = data[paths[key]];
    else if (Array.isArray(paths[key])) {
      let _path = Object.assign([], paths[key]);
      let value = data;
      while (_path.length && value && typeof value === 'object') {
        let prop = _path.shift();
        value = value[prop];
      }
      result[key] = (_path.length) ? undefined : value;
    } else throw new TypeError('dynamic property paths must be a string or an array of strings or numeric indexes');
    return result;
  }, {});
}

export function validateRJX(rjx = {}, returnAllErrors = false) {
  const dynamicPropsNames = ['asyncprops', 'windowprops', 'thisprops', ];
  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps', ];
  const validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', 'windowCompProps',].concat(dynamicPropsNames, evalPropNames);
  let errors = [];
  if (!rjx.component) {
    errors.push(SyntaxError('[0001] Missing React Component'));
  }
  if (rjx.props) {
    if (typeof rjx.props !== 'object' || Array.isArray(rjx.props)) {
      errors.push(TypeError('[0002] '+rjx.component+': props must be an Object / valid React props'));
    }
    if (rjx.props.children && (typeof rjx.props.children !== 'string' || !Array.isArray(rjx.props.children))) {
      errors.push(TypeError('[0003] '+rjx.component+': props.children must be an array of RJX JSON objects or a string'));
    }
    if (rjx.props._children && (typeof rjx.props._children !== 'string' || !Array.isArray(rjx.props._children))) {
      errors.push(TypeError('[0004] '+rjx.component+': props._children must be an array of RJX JSON objects or a string'));
    }
  }
  if (rjx.children) {
    if (typeof rjx.children !== 'string' && !Array.isArray(rjx.children)) {
      errors.push(TypeError('[0005] '+rjx.component+': children must be an array of RJX JSON objects or a string'));
    }
    if (Array.isArray(rjx.children)) {
      const childrenErrors = rjx.children
        .filter(c => typeof c === 'object')
        .map(c => validateRJX(c, returnAllErrors));
      errors = errors.concat(...childrenErrors);
    }
  }
  dynamicPropsNames.forEach(dynamicprop => {
    const rjxDynamicProps = rjx[ dynamicprop ];
    if (rjxDynamicProps) {
      // if (dynamicprop === 'thisprops') {
      //   console.log({ dynamicprop, rjxDynamicProps });
      // }
      if (typeof rjxDynamicProps !== 'object') {
        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
      }
      Object.keys(rjxDynamicProps).forEach(resolvedDynamicProp => {
        if (!Array.isArray(rjxDynamicProps[ resolvedDynamicProp ])) {
          errors.push(TypeError(`[0007] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
        }
        if (Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
          const allStringArray = rjxDynamicProps[resolvedDynamicProp].filter(propArrayItem => typeof propArrayItem === 'string');
          
          if (allStringArray.length !== rjxDynamicProps[ resolvedDynamicProp ].length) {
            errors.push(TypeError(`[0008] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
          }
        }
      });
    }
  });
  const evalProps = rjx.__dangerouslyEvalProps;
  const boundEvalProps = rjx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if ((evalProps && typeof evalProps !== 'object') || (boundEvalProps && typeof boundEvalProps !== 'object')) {
      errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
    }
    evalPropNames
      .filter(evalProp => rjx[ evalProp ])
      .forEach(eProps => {
        const evProp = rjx[ eProps ];
        const scopedEval = eval; 
        Object.keys(evProp).forEach(propToEval => {
          if (typeof evProp[ propToEval ] !== 'string') {
            errors.push(TypeError(`[0010] rjx.${eProps}.${evProp} must be a string`));
          }
          try {
            // console.log({ eProps });
            if (eProps === '__dangerouslyBindEvalProps') {
              const funcToBind = scopedEval(`(${evProp[ propToEval ]})`);
              funcToBind.call({ bounded: true, });
            } else {
              scopedEval(evProp[ propToEval ]);
            }
          } catch (e) {
            errors.push(e);
          }
        });
      });
  }
  if (rjx.__dangerouslyInsertComponents) {
    Object.keys(rjx.__dangerouslyInsertComponents).forEach(insertedComponents => {
      try {
        validateRJX(rjx.__dangerouslyInsertComponents[ insertedComponents ]);
      } catch (e) {
        errors.push(TypeError(`[0011] rjx.__dangerouslyInsertComponents.${insertedComponents} must be a valid RJX JSON Object: ${e.toString()}`));
      }
    });
  }
  if (rjx.__functionProps) {
    if (typeof rjx.__functionProps !== 'object') {
      errors.push(TypeError('[0012] rjx.__functionProps  must be an object'));
    } else {
      
      Object.keys(rjx.__functionProps)
        .forEach(fProp => {
          if (rjx.__functionProps[fProp] &&( typeof rjx.__functionProps[fProp] !=='string' || rjx.__functionProps[fProp].indexOf('func:') === -1)) {
            errors.push(ReferenceError(`[0013] rjx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
          }
        });
    }
  }
  if (rjx.windowCompProps && (typeof rjx.windowCompProps !=='object' || Array.isArray(rjx.windowCompProps))) {
    errors.push(TypeError('[0013] rjx.windowCompProps  must be an object'));
  }
  if (rjx.__windowComponents) {
    if (typeof rjx.__windowComponents !== 'object') {
      errors.push(TypeError('[0014] rjx.__windowComponents must be an object'));
    }
    Object.keys(rjx.__windowComponents)
      .forEach(cProp => {
        if (typeof rjx.__windowComponents[cProp]!=='string'||rjx.__windowComponents[cProp].indexOf('func:') === -1) {
          errors.push(ReferenceError(`[0015] rjx.__windowComponents.${cProp} must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)`));
        }
      });
  }
  const invalidKeys = Object.keys(rjx).filter(key => validKeys.indexOf(key) === -1);
  if (errors.length) {
    if (returnAllErrors) return errors;
    throw errors[ 0 ];
  }
  return invalidKeys.length
    ? `Warning: Invalid Keys [${invalidKeys.join()}]`
    : true;
}