"use strict";
exports.__esModule = true;
var react_1 = require("react");
var main_1 = require("./main");
var utilities = require("./utils");
var components_1 = require("./components");
// if (typeof window === 'undefined') {
//   var window = window || {};
// }
//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
exports.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
exports.ARGUMENT_NAMES = /([^\s,]+)/g;
/**
 * returns the names of parameters from a function declaration
 * @example
 * const arrowFunctionAdd = (a,b)=>a+b;
 * function regularFunctionAdd(c,d){return c+d;}
 * getParamNames(arrowFunctionAdd) // => ['a','b']
 * getParamNames(regularFunctionAdd) // => ['c','d']
 * @param {Function} func
 * @todo write tests
 */
function getParamNames(func) {
    var fnStr = func.toString().replace(exports.STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(exports.ARGUMENT_NAMES);
    if (result === null) {
        result = [];
    }
    return result;
}
exports.getParamNames = getParamNames;
/**
 * It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
 * @param {Object} [traverseObject={}] - the object that contains values of propName
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} [options.propName='asyncprops'] - Property on JSONX to resolve values onto, i.e (asyncprops,thisprops,windowprops)
 * @returns {Object} resolved object
 * @example
 const traverseObject = {
  user: {
    name: 'jsonx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};
const testJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
  },
  asyncprops:{
    auth: [ 'authentication', ],
    username: [ 'user', 'name', ],
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
      },
      children:'hello world',
    },
  ],
};
const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
// => {
//   auth: 'OAuth2',
//   username: 'jsonx'
// }

//finally resolves:
const testJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
    auth: 'OAuth2',
    username: 'jsonx',
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
      },
      children:'hello world',
    },
  ],
};
 */
function getJSONXProps(options) {
    if (options === void 0) { options = {}; }
    // eslint-disable-next-line
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a, _b = options.propName, propName = _b === void 0 ? 'asyncprops' : _b, _c = options.traverseObject, traverseObject = _c === void 0 ? {} : _c;
    // return (jsonx.asyncprops && typeof jsonx.asyncprops === 'object')
    // ? utilities.traverse(jsonx.asyncprops, resources)
    // : {};
    return (jsonx[propName] && typeof jsonx[propName] === 'object')
        ? utilities.traverse(jsonx[propName], traverseObject)
        : {};
}
exports.getJSONXProps = getJSONXProps;
/**
 * returns children jsonx components defined on __spreadComponent spread over an array on props.__spread
 * @param {*} options
 */
function getChildrenComponents(options) {
    if (options === void 0) { options = {}; }
    var _a = options.allProps, allProps = _a === void 0 ? {} : _a, _b = options.jsonx, jsonx = _b === void 0 ? {} : _b;
    // const asyncprops = getJSONXProps({ jsonx, propName: 'spreadprops', traverseObject: allProps, });
    if (Array.isArray(allProps.__spread) === false) {
        if ((this && this.debug) || jsonx.debug) {
            return {
                children: new Error('Using __spreadComponent requires an array prop \'__spread\'').toString()
            };
        }
        else {
            return { children: undefined };
        }
    }
    else {
        return {
            _children: allProps.__spread.map(function (__item) {
                var clonedChild = Object.assign({}, jsonx.__spreadComponent);
                var clonedChildProps = Object.assign({}, clonedChild.props);
                clonedChildProps.__item = __item;
                clonedChild.props = clonedChildProps;
                return clonedChild;
            })
        };
    }
}
exports.getChildrenComponents = getChildrenComponents;
function boundArgsReducer(jsonx) {
    var _this = this;
    if (jsonx === void 0) { jsonx = {}; }
    return function (args, arg) {
        var val;
        if (_this && _this.state && typeof _this.state[arg] !== 'undefined')
            val = (_this.state[arg]);
        else if (_this && _this.props && typeof _this.props[arg] !== 'undefined')
            val = (_this.props[arg]);
        else if (jsonx.props && typeof jsonx.props[arg] !== 'undefined')
            val = (jsonx.props[arg]);
        if (typeof val !== 'undefined')
            args.push(val);
        return args.filter(function (a) { return typeof a !== 'undefined'; });
    };
}
exports.boundArgsReducer = boundArgsReducer;
/**
 * Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @returns {Object} returns resolved object with evaluated javascript
 * @example
 const testVals = {
    auth: 'true',
    username: '(user={})=>user.name',
  };
  const testJSONX = Object.assign({}, sampleJSONX, {
    __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
      email: '(function getUser(user={}){ return this.testBound(); })',
    },
  });
  const JSONXP = getEvalProps.call({ testBound: () => 'bounded', }, { jsonx: testJSONX, });
  const evalutedComputedFunc = JSONXP.username({ name: 'bob', });
  const evalutedComputedBoundFunc = JSONXP.email({ email:'test@email.domain', });
  // expect(JSONXP.auth).to.be.true;
  // expect(evalutedComputedFunc).to.eql('bob');
  // expect(evalutedComputedBoundFunc).to.eql('bounded');
 */
function getEvalProps(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var jsonx = options.jsonx;
    var scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
    var evAllProps = {};
    if (jsonx.__dangerouslyEvalAllProps) {
        var evVal = void 0;
        try {
            // eslint-disable-next-line
            evVal = (typeof evVal === 'function')
                ? jsonx.__dangerouslyEvalAllProps
                : scopedEval(jsonx.__dangerouslyEvalAllProps);
        }
        catch (e) {
            if (this.debug || jsonx.debug)
                evVal = e;
        }
        evAllProps = evVal.call(this, { jsonx: jsonx });
    }
    var evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce(function (eprops, epropName) {
        var evVal;
        var evValString;
        try {
            // eslint-disable-next-line
            evVal = scopedEval(jsonx.__dangerouslyEvalProps[epropName]);
            evValString = evVal.toString();
        }
        catch (e) {
            if (_this.debug || jsonx.debug)
                evVal = e;
        }
        eprops[epropName] = (typeof evVal === 'function')
            ? evVal.call(_this, { jsonx: jsonx })
            : evVal;
        if (_this.exposeEval)
            eprops["__eval_" + epropName] = evValString;
        return eprops;
    }, {});
    var evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce(function (eprops, epropName) {
        var evVal;
        var evValString;
        try {
            var args = void 0;
            var functionBody = jsonx.__dangerouslyBindEvalProps[epropName];
            // InlineFunction = Function.prototype.constructor.apply({}, args);
            var functionDefinition = void 0;
            if (typeof functionBody === 'function') {
                functionDefinition = functionBody;
            }
            else {
                functionDefinition = scopedEval(jsonx.__dangerouslyBindEvalProps[epropName]);
                evValString = functionDefinition.toString();
            } // eslint-disable-next-line
            if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
                args = [_this,].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(_this, jsonx), []));
            }
            else if (jsonx.__functionparams === false) {
                args = [_this,];
            }
            else {
                var functionDefArgs = getParamNames(functionDefinition);
                args = [_this,].concat(functionDefArgs.reduce(boundArgsReducer.call(_this, jsonx), []));
            }
            // eslint-disable-next-line
            evVal = functionDefinition.bind.apply(functionDefinition, args);
        }
        catch (e) {
            if (_this.debug || jsonx.debug)
                evVal = e;
        }
        // eslint-disable-next-line
        eprops[epropName] = evVal;
        if (_this.exposeEval)
            eprops["__eval_" + epropName] = evValString;
        return eprops;
    }, {});
    return Object.assign({}, evProps, evBindProps, evAllProps);
}
exports.getEvalProps = getEvalProps;
/**
 * Resolves jsonx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} [options.resources={}] - object to use for resourceprops(asyncprops), usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
function getComponentProps(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var jsonx = options.jsonx, resources = options.resources;
    return Object.keys(jsonx.__dangerouslyInsertComponents).reduce(function (cprops, cpropName) {
        var componentVal;
        try {
            // eslint-disable-next-line
            componentVal = main_1.getRenderedJSON.call(_this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
        }
        catch (e) {
            if (_this.debug || jsonx.debug)
                componentVal = e;
        }
        cprops[cpropName] = componentVal;
        return cprops;
    }, {});
}
exports.getComponentProps = getComponentProps;
function getReactComponents(options) {
    var _this = this;
    var jsonx = options.jsonx, resources = options.resources;
    var functionComponents = (!jsonx.__dangerouslyInsertFunctionComponents)
        ? {}
        : Object.keys(jsonx.__dangerouslyInsertFunctionComponents).reduce(function (cprops, cpropName) {
            var componentVal;
            try {
                var args = jsonx.__dangerouslyInsertFunctionComponents[cpropName];
                args.options = Object.assign({}, args.options, { resources: resources });
                // eslint-disable-next-line
                componentVal = components_1.getReactFunctionComponent.call(_this, args.reactComponent, args.functionBody, args.options);
            }
            catch (e) {
                if (_this.debug || jsonx.debug)
                    componentVal = e;
            }
            cprops[cpropName] = cpropName === '_children' ? [componentVal] : componentVal;
            return cprops;
        }, {});
    var classComponents = (!jsonx.__dangerouslyInsertClassComponents)
        ? {}
        : Object.keys(jsonx.__dangerouslyInsertClassComponents).reduce(function (cprops, cpropName) {
            var componentVal;
            try {
                var args = jsonx.__dangerouslyInsertClassComponents[cpropName];
                args.options = Object.assign({}, args.options, { resources: resources });
                // eslint-disable-next-line
                componentVal = components_1.getReactFunctionComponent.call(_this, args.reactComponent, args.options);
            }
            catch (e) {
                if (_this.debug || jsonx.debug)
                    componentVal = e;
            }
            cprops[cpropName] = cpropName === '_children' ? [componentVal] : componentVal;
            return cprops;
        }, {});
    return Object.assign({}, functionComponents, classComponents);
}
exports.getReactComponents = getReactComponents;
/**
 * Resolves jsonx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points.
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
//  * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @returns {Object} resolved object of React Components
 */
function getReactComponentProps(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var jsonx = options.jsonx;
    if (jsonx.__dangerouslyInsertJSONXComponents && Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) {
        return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce(function (cprops, cpropName) {
            var componentVal;
            try {
                componentVal = components_1.getComponentFromMap({
                    jsonx: jsonx.__dangerouslyInsertJSONXComponents[cpropName],
                    reactComponents: _this.reactComponents,
                    componentLibraries: _this.componentLibraries
                });
            }
            catch (e) {
                if (_this.debug || jsonx.debug)
                    componentVal = e;
            }
            // eslint-disable-next-line
            cprops[cpropName] = componentVal;
            return cprops;
        }, {});
    }
    else {
        return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce(function (cprops, cpropName) {
            var componentVal;
            try {
                componentVal = components_1.getComponentFromMap({
                    jsonx: {
                        component: jsonx.__dangerouslyInsertReactComponents[cpropName],
                        props: jsonx.__dangerouslyInsertComponentProps
                            ? jsonx.__dangerouslyInsertComponentProps[cpropName]
                            : {}
                    },
                    reactComponents: _this.reactComponents,
                    componentLibraries: _this.componentLibraries
                });
            }
            catch (e) {
                if (_this.debug || jsonx.debug)
                    componentVal = e;
            }
            // eslint-disable-next-line
            cprops[cpropName] = componentVal;
            return cprops;
        }, {});
    }
}
exports.getReactComponentProps = getReactComponentProps;
/**
 * Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep
 * @param {Object} options
 * @param {String} [options.propFunc='func:'] - function string, like func:window.LocalStorage.getItem or func:this.props.onClick  or func:inline.myInlineFunction
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Function} returns a function from this.props or window functions
 * @example
 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
 */
function getFunctionFromProps(options) {
    var _a = options.propFunc, propFunc = _a === void 0 ? 'func:' : _a, propBody = options.propBody, jsonx = options.jsonx, _b = options.functionProperty, functionProperty = _b === void 0 ? '' : _b;
    // eslint-disable-next-line
    var _c = this, _d = _c.logError, logError = _d === void 0 ? console.error : _d, debug = _c.debug;
    var windowObject = this.window || global.window || {};
    try {
        var functionNameString = propFunc.split(':')[1] || '';
        var functionNameArray = functionNameString.split('.');
        var functionName = (functionNameArray.length) ? functionNameArray[functionNameArray.length - 1] : '';
        if (propFunc.includes('func:inline')) {
            // eslint-disable-next-line
            var InlineFunction = void 0;
            if (jsonx.__functionargs) {
                var args = [].concat(jsonx.__functionargs[functionProperty]);
                args.push(propBody);
                InlineFunction = Function.prototype.constructor.apply({}, args);
            }
            else {
                InlineFunction = Function('param1', 'param2', '"use strict";' + propBody);
            }
            var _e = propFunc.split('.'), propFuncName = _e[0], funcName = _e[1];
            Object.defineProperty(InlineFunction, 'name', {
                value: funcName
            });
            if (jsonx.__functionargs) {
                var boundArgs = [this,].concat(jsonx.__functionargs[functionProperty].map(function (arg) { return jsonx.props[arg]; }));
                return InlineFunction.bind.apply(InlineFunction, boundArgs);
            }
            else {
                return InlineFunction.bind(this);
            }
        }
        else if (propFunc.indexOf('func:window') !== -1) {
            if (functionNameArray.length === 3) {
                try {
                    return windowObject[functionNameArray[1]][functionName].bind(this);
                }
                catch (e) {
                    if (debug) {
                        logError(e);
                    }
                    return windowObject[functionNameArray[1]][functionName];
                }
            }
            else {
                try {
                    return windowObject[functionName].bind(this);
                }
                catch (e) {
                    if (debug) {
                        logError(e);
                    }
                    return windowObject[functionName];
                }
            }
        }
        else if (functionNameArray.length === 4) {
            return (this.props)
                ? this.props[functionNameArray[2]][functionName]
                : jsonx.props[functionNameArray[2]][functionName];
        }
        else if (functionNameArray.length === 3) {
            return (this.props)
                ? this.props[functionName].bind(this)
                : jsonx.props[functionName].bind(this);
        }
        else {
            return function () { };
        }
    }
    catch (e) {
        if (this.debug) {
            logError(e);
            if (jsonx && jsonx.debug)
                return e;
        }
        return function () { };
    }
}
exports.getFunctionFromProps = getFunctionFromProps;
/**
 * Returns a resolved object from function strings that has functions pulled from jsonx.__functionProps
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of functions from function strings
 */
function getFunctionProps(options) {
    if (options === void 0) { options = {}; }
    var _a = options.allProps, allProps = _a === void 0 ? {} : _a, _b = options.jsonx, jsonx = _b === void 0 ? {} : _b;
    var getFunction = getFunctionFromProps.bind(this);
    var funcProps = jsonx.__functionProps;
    //Allowing for window functions
    Object.keys(funcProps).forEach(function (key) {
        if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
            allProps[key] = getFunction({
                propFunc: funcProps[key],
                propBody: (jsonx.__inline) ? jsonx.__inline[key] : '',
                jsonx: jsonx,
                functionProperty: key
            });
        }
    });
    return allProps;
}
exports.getFunctionProps = getFunctionProps;
/**
 * Returns a resolved object that has React Components pulled from window.__jsonx_custom_elements
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, asyncprops, windowprops, evalProps, insertedComponents);
 * @returns {Object} resolved object of with React Components from a window property window.__jsonx_custom_elements
 */
function getWindowComponents(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var allProps = options.allProps, jsonx = options.jsonx;
    var windowComponents = jsonx.__windowComponents;
    var window = this.window || global.window || {};
    var windowFuncPrefix = 'func:window.__jsonx_custom_elements';
    // if (jsonx.hasWindowComponent && window.__jsonx_custom_elements) {
    Object.keys(windowComponents).forEach(function (key) {
        var windowKEY = (typeof windowComponents[key] === 'string')
            ? windowComponents[key].replace(windowFuncPrefix + ".", '')
            : '';
        if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window.__jsonx_custom_elements[windowKEY] === 'function') {
            var windowComponentElement = window.__jsonx_custom_elements[windowKEY];
            var windowComponentProps = (allProps['__windowComponentProps']) ? allProps['__windowComponentProps']
                : _this.props;
            allProps[key] = react_1["default"].createElement(windowComponentElement, windowComponentProps, null);
        }
    });
    return allProps;
}
exports.getWindowComponents = getWindowComponents;
/**
 * Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
 * @param {Number} options.renderIndex - number used for React key prop
 * @param {function} [options.logError=console.error] - error logging function
 * @param {Object} [options.componentLibraries] - react components to render with JSONX
 * @param {Boolean} [options.useReduxState=true] - use redux props in this.props
 * @param {Boolean} [options.ignoreReduxPropsInComponentLibraries=true] - ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties
 * @param {boolean} [options.debug=false] - use debug messages
 * @example
const testJSONX = { component: 'div',
  props: { id: 'generatedJSONX', className: 'jsonx' },
  children: [ [Object] ],
  asyncprops: { auth: [Array], username: [Array] },
  __dangerouslyEvalProps: { getUsername: '(user={})=>user.name' },
  __dangerouslyInsertComponents: { myComponent: [Object] }
const resources = {
  user: {
    name: 'jsonx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};
const renderIndex = 1;
getComputedProps.call({}, {
        jsonx: testJSONX,
        resources,
        renderIndex,
      });
computedProps = { key: 1,
     id: 'generatedJSONX',
     className: 'jsonx',
     auth: 'OAuth2',
     username: 'jsonx',
     getUsername: [Function],
     myComponent:
      { '$$typeof': Symbol(react.element),
        type: 'p',
        key: '8',
        ref: null,
        props: [Object],
        _owner: null,
        _store: {} } } }
 *
 */
function getComputedProps(options) {
    if (options === void 0) { options = {}; }
    // eslint-disable-next-line
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a, _b = options.resources, resources = _b === void 0 ? {} : _b, renderIndex = options.renderIndex, _c = options.logError, logError = _c === void 0 ? console.error : _c, _d = options.useReduxState, useReduxState = _d === void 0 ? true : _d, _e = options.ignoreReduxPropsInComponentLibraries, ignoreReduxPropsInComponentLibraries = _e === void 0 ? true : _e, _f = options.disableRenderIndexKey, disableRenderIndexKey = _f === void 0 ? true : _f, componentLibraries = options.componentLibraries, debug = options.debug;
    try {
        var componentThisProp = (jsonx.thisprops)
            ? Object.assign({
                __jsonx: {
                    _component: jsonx,
                    _resources: resources
                }
            }, this.props, jsonx.props, (useReduxState && !jsonx.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[jsonx.component]))
                ? (this.props && this.props.getState) ? this.props.getState() : {}
                : {})
            : undefined;
        var windowTraverse = typeof window !== 'undefined' ? window : {};
        var asyncprops = jsonx.asyncprops ? getJSONXProps({ jsonx: jsonx, propName: 'asyncprops', traverseObject: resources }) : {};
        var resourceprops = jsonx.resourceprops ? getJSONXProps({ jsonx: jsonx, propName: 'resourceprops', traverseObject: resources }) : {};
        var windowprops = jsonx.windowprops ? getJSONXProps({ jsonx: jsonx, propName: 'windowprops', traverseObject: windowTraverse }) : {};
        var thisprops = jsonx.thisprops ? getJSONXProps({ jsonx: jsonx, propName: 'thisprops', traverseObject: componentThisProp }) : {};
        var thisstate = jsonx.thisstate ? getJSONXProps({ jsonx: jsonx, propName: 'thisstate', traverseObject: this.state }) : {};
        //allowing javascript injections
        var evalProps = (jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps)
            ? getEvalProps.call(this, { jsonx: jsonx })
            : {};
        var insertedComponents = (jsonx.__dangerouslyInsertComponents)
            ? getComponentProps.call(this, { jsonx: jsonx, resources: resources, debug: debug })
            : {};
        var insertedReactComponents = (jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents)
            ? getReactComponentProps.call(this, { jsonx: jsonx, debug: debug })
            : {};
        var insertedComputedComponents = (jsonx.__dangerouslyInsertFunctionComponents || jsonx.__dangerouslyInsertClassComponents)
            ? getReactComponents.call(this, { jsonx: jsonx, debug: debug })
            : {};
        var evalAllProps = (jsonx.__dangerouslyEvalAllProps)
            ? getEvalProps.call(this, { jsonx: jsonx })
            : {};
        var allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey ? {} : { key: renderIndex }, jsonx.props, thisprops, thisstate, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents, insertedComputedComponents);
        var computedProps = Object.assign({}, allProps, jsonx.__functionProps ? getFunctionProps.call(this, { allProps: allProps, jsonx: jsonx }) : {}, jsonx.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, jsonx: jsonx }) : {}, jsonx.__spreadComponent ? getChildrenComponents.call(this, { allProps: allProps, jsonx: jsonx }) : {}, evalAllProps);
        if (jsonx.debug)
            console.debug({ jsonx: jsonx, computedProps: computedProps });
        return computedProps;
    }
    catch (e) {
        debug && logError(e, (e.stack) ? e.stack : 'no stack');
        return null;
    }
}
exports.getComputedProps = getComputedProps;
