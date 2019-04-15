import UAParser from 'ua-parser-js';


/**
 * Used to evaluate whether or not to render a component
 * @param {Object} options 
 * @param {Object} options.rjx - Valid RJX JSON 
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
 const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className: 'rjx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testRJX = Object.assign({}, sampleRJX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ rjx: testRJX, props: testRJX2.props, }) // => false
 */
export function displayComponent(options = {}) {
  const { rjx = {}, props, } = options;
  const propsToCompare = rjx.comparisonprops;
  const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(comp => {
    const compares = {};
    if (Array.isArray(comp.left)) {
      compares.left = comp.left;
    }
    if (Array.isArray(comp.right)) {
      compares.right = comp.right;
    }
    const propcompares = traverse(compares, props||rjx.props);
    const opscompares = Object.assign({}, comp, propcompares);
    // console.debug({ opscompares, compares, renderedCompProps });
    switch (opscompares.operation) {
    case 'eq':
    case '==':
      // return opscompares.left == opscompares.right;
      // eslint-disable-next-line
      return opscompares.left == opscompares.right;
    case 'dneq':
    case '!=':
    case '!':
      // return opscompares.left != opscompares.right;
      return opscompares.left !== opscompares.right;
    case 'dnseq':
    case '!==':
      return opscompares.left !== opscompares.right;
    case 'seq':
    case '===':
      return opscompares.left === opscompares.right;
    case 'lt':
    case '<':
      return opscompares.left < opscompares.right;
    case 'lte':
    case '<=':
      return opscompares.left <= opscompares.right;
    case 'gt':
    case '>':
      return opscompares.left > opscompares.right;
    case 'gte':
    case '>=':
      return opscompares.left >= opscompares.right;
    case 'dne':
    case 'undefined':
    case 'null':
      return opscompares.left === undefined || opscompares.left === null; 
    case '!null':
    case '!undefined':
    case 'exists':
    default://'exists'
      return opscompares.left !== undefined && opscompares.left !== null;
    }
    // }
    // if (opscompares.operation === 'eq') {
    //   // return opscompares.left == opscompares.right;
    //   // eslint-disable-next-line
    //   return opscompares.left == opscompares.right;
    // } else if (opscompares.operation === 'dneq') {
    //   // return opscompares.left != opscompares.right;
    //   return opscompares.left !== opscompares.right;
    // } else if (opscompares.operation === 'dnseq') {
    //   return opscompares.left !== opscompares.right;
    // } else if (opscompares.operation === 'seq') {
    //   return opscompares.left === opscompares.right;
    // } else if (opscompares.operation === 'lt') {
    //   return opscompares.left < opscompares.right;
    // } else if (opscompares.operation === 'lte') {
    //   return opscompares.left <= opscompares.right;
    // } else if (opscompares.operation === 'gt') {
    //   return opscompares.left > opscompares.right;
    // } else if (opscompares.operation === 'gte') {
    //   return opscompares.left >= opscompares.right;
    // } else if (opscompares.operation === 'dne') {
    //   return opscompares.left === undefined || opscompares.left === null;
    // } else { //'exists'
    //   return opscompares.left !== undefined && opscompares.left !== null;
    // }
  }) : [];
  const validProps = comparisons.filter(comp => comp === true);
  if (!rjx.comparisonprops) {
    return true;
  } else if (rjx.comparisonorprops && validProps.length < 1) {
    return false;
  } else if (validProps.length !== comparisons.length && !rjx.comparisonorprops) {
    return false;
  } else {
    return true;
  }
}

/**
 * Use to test if can bind components this context for react-redux-router 
 * @returns {Boolean} true if browser is not IE or old android / chrome
 */
export function getAdvancedBinding() {
  
  if (typeof window === 'undefined') {
    var window = (this && this.window)
      ? this.window
      : global.window || {};
    if (!window.navigator) return false;
  }
  try {
    if (window && window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
      // console.log('window.navigator.userAgent',window.navigator.userAgent)
      if(window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      const uastring = window.navigator.userAgent;
      const parser = new UAParser();
      parser.setUA(uastring);
      const parseUserAgent = parser.getResult();
      // console.log({ parseUserAgent, });
      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView' ) && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }
      if (parseUserAgent.browser.name === 'Android Browser') {
        return false;
      }
    }
  } catch (e) {
    e;
    console.error(e);
    // console.warn('could not detect browser support', e);
    return false;
  }
  return true;
}

/**
 * take an object of array paths to traverse and resolve
 * @example
 * const testObj = {
      user: {
        name: 'rjx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'rjx',  }
 * @param {Object} paths - an object to resolve array property paths 
 * @param {Object} data - object to traverse
 * @returns {Object} resolved object with traversed properties
 * @throws {TypeError} 
 */
export function traverse(paths = {}, data = {}) {
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

/**
 * Validates RJX JSON Syntax
 * @example
 * validateRJX({component:'p',children:'hello world'})=>true
 * validateRJX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} rjx - RJX JSON to validate 
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if RJX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */
export function validateRJX(rjx = {}, returnAllErrors = false) {
  const dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops', 'thisstate',];
  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps',];
  const validKeys = ['component', 'props', 'children', '__spreadComponent', '__inline','__functionargs', '__dangerouslyInsertComponents', '__dangerouslyInsertComponentProps', '__dangerouslyInsertRJXComponents', '__functionProps', '__functionparams', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops', 'debug' ].concat(dynamicPropsNames, evalPropNames);
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
  if (rjx.__windowComponentProps && (typeof rjx.__windowComponentProps !=='object' || Array.isArray(rjx.__windowComponentProps))) {
    errors.push(TypeError('[0013] rjx.__windowComponentProps  must be an object'));
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
  if (typeof rjx.comparisonorprops !== 'undefined' && typeof rjx.comparisonorprops !== 'boolean') {
    errors.push(TypeError('[0016] rjx.comparisonorprops  must be boolean'));
  }
  if (rjx.comparisonprops) {
    if(!Array.isArray(rjx.comparisonprops)) {
      errors.push(TypeError('[0017] rjx.comparisonprops  must be an array or comparisons'));
    } else {
      rjx.comparisonprops.forEach(c => {
        if (typeof c !== 'object') {
          errors.push(TypeError('[0018] rjx.comparisonprops  must be an array or comparisons objects'));
        } else if(typeof c.left==='undefined') {
          errors.push(TypeError('[0019] rjx.comparisonprops  must be have a left comparison value'));
        }
      });
    }
  }
  if (typeof rjx.passprops !== 'undefined' && typeof rjx.passprops !== 'boolean') {
    errors.push(TypeError('[0020] rjx.passprops  must be boolean'));
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

/**
 * validates simple RJX Syntax {[component]:{props,children}}
 * @param {Object} simpleRJX - Any valid simple RJX Syntax
 * @return {Boolean} returns true if simpleRJX is valid
 */
export function validSimpleRJXSyntax(simpleRJX = {}) {
  if (Object.keys(simpleRJX).length !== 1 && !simpleRJX.component) {
    return false;
  } else {
    const componentName = Object.keys(simpleRJX)[ 0 ];
    return (Object.keys(simpleRJX).length === 1  && !simpleRJX[componentName].component && typeof simpleRJX[componentName]==='object')
      ? true
      : false; 
  }
}

/**
 * Transforms SimpleRJX to Valid RJX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleRJX JSON Object 
 * @return {Object} - returns a valid RJX JSON Object from a simple RJX JSON Object
 */
export function simpleRJXSyntax(simpleRJX = {}) {
  const component = Object.keys(simpleRJX)[ 0 ];
  try {
    return Object.assign({},
      {
        component,
      },
      simpleRJX[ component ], {
        children: (simpleRJX[ component ].children && Array.isArray(simpleRJX[ component ].children))
          ? simpleRJX[ component ].children
            .map(simpleRJXSyntax)
          : simpleRJX[ component ].children,
      });
  } catch (e) {
    throw SyntaxError('Invalid Simple RXJ Syntax', e);
  }   
}

/**
 * Transforms Valid RJX JSON to SimpleRJX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} rjx Valid RJX JSON object 
 * @return {Object} - returns a simple RJX JSON Object from a valid RJX JSON Object 
 */
export function getSimplifiedRJX(rjx = {}) {
  try {
    if (!rjx.component) return rjx; //already simple
    const componentName = rjx.component;
    rjx.children = (Array.isArray(rjx.children))
      ? rjx.children
        .filter(child => child)//remove empty children
        .map(getSimplifiedRJX) 
      : rjx.children;
    delete rjx.component;
    return {
      [ componentName ]: rjx,
    };
  } catch (e) {
    throw e;
  }
}