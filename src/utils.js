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

export function traverse(paths, data) {
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
    } else throw new TypeError('asyncprop paths must be a string or an array of strings or numeric indexes');
    return result;
  }, {});
}

export function validateRJX(rjx) {
  const dynamicPropsNames = ['asyncprops', 'windowprops', 'thisprops',];
  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps',];
  const validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', 'windowCompProps',].concat(dynamicPropsNames, evalPropNames);
  if (!rjx.component) {
    throw new Error('Missing React Component');
  }
  if (rjx.props) {
    if (typeof rjx.props !== 'object') {
      throw new Error('props must be an Object / valid React props');
    }
    if (rjx.props.children) {
      if (typeof rjx.props.children !== 'string' || !Array.isArray(rjx.props.children)) {
        throw new Error('props.children must be an array of RJX JSON objects or a string');
      }
      if (typeof rjx.props._children !== 'string' || !Array.isArray(rjx.props._children)) {
        throw new Error('props._children must be an array of RJX JSON objects or a string');
      }
    }
  }
  if (rjx.children) {
    if (typeof rjx.children !== 'string' || !Array.isArray(rjx.children)) {
      throw new Error('children must be an array of RJX JSON objects or a string');
    }
  }
  dynamicPropsNames.forEach(dynamicprop => {
    const rjxDynamicProps = rjx[ dynamicprop ];
    if (rjxDynamicProps) {
      if (typeof rjxDynamicProps !== 'object') {
        throw new TypeError(`${dynamicprop} must be an object`);
      }
      Object.keys(rjxDynamicProps).forEach(resolvedDynamicProp => {
        if (!Array.isArray(rjxDynamicProps[ resolvedDynamicProp ])) {
          throw new TypeError(`rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`);
        }
        const allStringArray = resolvedDynamicProp.filter(propArrayItem => typeof propArrayItem === 'string');
        if (allStringArray.length !== rjxDynamicProps[ resolvedDynamicProp ].length) {
          throw new TypeError(`rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`);
        }
      });
    }
  });
  const evalProps = rjx.__dangerouslyEvalProps;
  const boundEvalProps = rjx.__dangerouslyBindEvalProps;
  if (evalProps || boundEvalProps) {
    if ((evalProps && typeof evalProps !== 'object') || (boundEvalProps && typeof boundEvalProps !== 'object')) {
      throw new TypeError('__dangerouslyEvalProps must be an object of strings to convert to valid javascript');
    }
    evalPropNames
      .filter(evalProp => rjx[ evalProp ])
      .forEach(eProps => {
        const evProp = rjx[ eProps ];
        const scopedEval = eval; 
        Object.keys(evProp).forEach(propToEval => {
          if (typeof evProp[ propToEval ] !== 'string') {
            throw new TypeError(`rjx.${eProps}.${evProp} must be a string`);
          }
          try {
            scopedEval(evProp[ propToEval ]);
          } catch (e) {
            throw e;
          }
        });
      });
  }
  if (rjx.__dangerouslyInsertComponents) {
    Object.keys(rjx.__dangerouslyInsertComponents).forEach(insertedComponents => {
      try {
        validateRJX(rjx.__dangerouslyInsertComponents[ insertedComponents ]);
      } catch (e) {
        throw new TypeError(`rjx.__dangerouslyInsertComponents.${insertedComponents} must be a valid RJX JSON Object`, e);
      }
    });
  }
  if (rjx.__functionProps) {
    if (typeof rjx.__functionProps !== 'object') {
      throw new TypeError('rjx.__functionProps  must be an object');
    }
    Object.keys(rjx.__functionProps)
      .forEach(fProp => {
        if (fProp.indexOf('func:') === -1) {
          throw new ReferenceError(`rjx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`);
        }
      });
  }
  if (rjx.windowCompProps && typeof rjx.windowCompProps) {
    throw new TypeError('rjx.windowCompProps  must be an object');
  }
  if (rjx.__windowComponents) {
    if (typeof rjx.__windowComponents !== 'object') {
      throw new TypeError('rjx.__windowComponents must be an object');
    }
    Object.keys(rjx.__windowComponents)
      .forEach(cProp => {
        if (cProp.indexOf('func:') === -1) {
          throw new ReferenceError(`rjx.__windowComponents.${cProp} must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)`);
        }
      });
  }
  const invalidKeys = Object.keys(rjx).filter(key => validKeys.indexOf(key) >= 0);
  return invalidKeys.length
    ? `Warning: Invalid Keys [${invalidKeys.join()}]`
    : true;
}