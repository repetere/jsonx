"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var memoryCache = require("memory-cache");
// import {cache} from 'memory-cache';
// import cache from 'memory-cache';
var react_dom_factories_1 = require("react-dom-factories");
var utils_1 = require("./utils");
var create_react_class_1 = require("create-react-class");
var main_1 = require("./main");
var cache = new memoryCache.Cache();
// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }
/**
 
 */
exports.advancedBinding = utils_1.getAdvancedBinding();
// require;
/**
 * object of all react components available for JSONX
 
 */
exports.componentMap = Object.assign({ Fragment: react_1.Fragment, Suspense: react_1.Suspense }, react_dom_factories_1["default"], (typeof window === 'object') ? window.__jsonx_custom_elements : {});
/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
 
 * @param {Object} options - options for getBoundedComponents
 * @param {Object} options.reactComponents - all react components available for JSONX
 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for JSONX
 */
function getBoundedComponents(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var reactComponents = options.reactComponents, _a = options.boundedComponents, boundedComponents = _a === void 0 ? [] : _a;
    if (exports.advancedBinding || options.advancedBinding) {
        return Object.assign({}, reactComponents, boundedComponents.reduce(function (result, componentName) {
            result[componentName] = reactComponents[componentName].bind(_this);
            return result;
        }, {}));
        // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
    }
    else
        return reactComponents;
}
exports.getBoundedComponents = getBoundedComponents;
/**
 * returns a react component from a component library
 
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.jsonx={}] - any valid JSONX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
function getComponentFromLibrary(options) {
    if (options === void 0) { options = {}; }
    var _a = options.componentLibraries, componentLibraries = _a === void 0 ? {} : _a, _b = options.jsonx, jsonx = _b === void 0 ? {} : _b;
    var libComponent = Object.keys(componentLibraries)
        .map(function (libraryName) {
        var cleanLibraryName = jsonx.component.replace(libraryName + ".", '');
        var libraryNameArray = cleanLibraryName.split('.');
        if (libraryNameArray.length === 2
            && componentLibraries[libraryName]
            && componentLibraries[libraryName][libraryNameArray[0]]
            && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== 'undefined') {
            return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
        }
        else if (typeof componentLibraries[libraryName][cleanLibraryName] !== 'undefined') {
            return componentLibraries[libraryName][cleanLibraryName];
        }
    })
        .filter(function (val) { return val; })[0];
    return libComponent;
}
exports.getComponentFromLibrary = getComponentFromLibrary;
/**
 * returns a react element from jsonx.component
 
 * @example
 * // returns react elements
 * getComponentFromMap({jsonx:{component:'div'}})=>div
 * getComponentFromMap({jsonx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModal
 * getComponentFromMap({jsonx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
 * @param {Object} options - options for getComponentFromMap
 * @param {object} [options.jsonx={}] - any valid JSONX JSON object
 * @param {Object} [options.reactComponents={}] - react components to render
 * @param {Object} [options.componentLibraries={}] - react components to render from another component library like bootstrap or bulma
 * @param {function} [options.logError=console.error] - error logging function
 * @param {boolean} [options.debug=false] - use debug messages
 * @returns {string|function|class} valid react element
 */
function getComponentFromMap(options) {
    if (options === void 0) { options = {}; }
    // eslint-disable-next-line
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a, _b = options.reactComponents, reactComponents = _b === void 0 ? {} : _b, _c = options.componentLibraries, componentLibraries = _c === void 0 ? {} : _c, _d = options.logError, logError = _d === void 0 ? console.error : _d, debug = options.debug;
    try {
        if (typeof jsonx.component !== 'string' && typeof jsonx.component === 'function') {
            return jsonx.component;
        }
        else if (react_dom_factories_1["default"][jsonx.component]) {
            return jsonx.component;
        }
        else if (reactComponents[jsonx.component]) {
            return reactComponents[jsonx.component];
        }
        else if (typeof jsonx.component === 'string' && jsonx.component.indexOf('.') > 0 && getComponentFromLibrary({ jsonx: jsonx, componentLibraries: componentLibraries })) {
            return getComponentFromLibrary({ jsonx: jsonx, componentLibraries: componentLibraries });
        }
        else {
            throw new ReferenceError("Invalid React Component (" + jsonx.component + ")");
        }
    }
    catch (e) {
        if (debug)
            logError(e, (e.stack) ? e.stack : 'no stack');
        throw e;
    }
}
exports.getComponentFromMap = getComponentFromMap;
/**
 * Returns a new function from an options object
 
 * @param {Object} options
 * @param {String} [options.body=''] - Function string body
 * @param {String[]} [options.args=[]] - Function arguments
 * @returns {Function}
 */
function getFunctionFromEval(options) {
    if (options === void 0) { options = {}; }
    if (typeof options === 'function')
        return options;
    var _a = options.body, body = _a === void 0 ? '' : _a, _b = options.args, args = _b === void 0 ? [] : _b, name = options.name;
    var argus = [].concat(args);
    argus.push(body);
    var evalFunction = Function.prototype.constructor.apply({ name: name }, argus);
    if (name) {
        Object.defineProperty(evalFunction, 'name', { value: name });
    }
    return evalFunction;
}
exports.getFunctionFromEval = getFunctionFromEval;
/**
 * Returns a new React Component
 
 * @param {Boolean} [options.returnFactory=true] - returns a React component if true otherwise returns Component Class
 * @param {Object} [options.resources={}] - asyncprops for component
 * @param {String} [options.name ] - Component name
 * @param {Function} [options.lazy ] - function that resolves {reactComponent,options} to lazy load component for code splitting
 * @param {Boolean} [options.use_getState=true] - define getState prop
 * @param {Boolean} [options.bindContext=true] - bind class this reference to render function components
 * @param {Boolean} [options.passprops ] - pass props to rendered component
 * @param {Boolean} [options.passstate] - pass state as props to rendered component
 * @param {Object} [reactComponent={}] - an object of functions used for create-react-class
 * @param {Object} reactComponent.render.body - Valid JSONX JSON
 * @param {String} reactComponent.getDefaultProps.body - return an object for the default props
 * @param {String} reactComponent.getInitialState.body - return an object for the default state
 * @returns {Function}
 * @see {@link https://reactjs.org/docs/react-without-es6.html}
 */
function getReactClassComponent(reactComponent, options) {
    if (reactComponent === void 0) { reactComponent = {}; }
    if (options === void 0) { options = {}; }
    // const util = require('util');
    // console.log(util.inspect({ reactComponent },{depth:20}));
    if (options.lazy) {
        return react_1.lazy(function () { return options.lazy(reactComponent, Object.assign({}, options, { lazy: false })).then(function (lazyComponent) {
            return {
                "default": getReactClassComponent.apply(void 0, lazyComponent)
            };
        }); });
    }
    var context = this || {};
    var _a = options.returnFactory, returnFactory = _a === void 0 ? true : _a, _b = options.resources, resources = _b === void 0 ? {} : _b, _c = options.use_getState, use_getState = _c === void 0 ? true : _c, _d = options.bindContext, bindContext = _d === void 0 ? true : _d, _e = options.disableRenderIndexKey, disableRenderIndexKey = _e === void 0 ? true : _e;
    var rjc = Object.assign({
        getDefaultProps: {
            body: 'return {};'
        },
        getInitialState: {
            body: 'return {};'
        }
    }, reactComponent);
    var rjcKeys = Object.keys(rjc);
    if (rjcKeys.includes('render') === false) {
        throw new ReferenceError('React components require a render method');
    }
    var classOptions = rjcKeys.reduce(function (result, val) {
        if (typeof rjc[val] === 'function')
            rjc[val] = { body: rjc[val] };
        var args = rjc[val].arguments;
        var body = rjc[val].body;
        if (!body) {
            console.warn({ rjc: rjc });
            throw new SyntaxError("Function(" + val + ") requires a function body");
        }
        if (args && !Array.isArray(args) && (args.length && (args.length && args.filter(function (arg) { return typeof arg === 'string'; }).length))) {
            throw new TypeError("Function(" + val + ") arguments must be an array or variable names");
        }
        if (val === 'render') {
            result[val] = function () {
                var _this = this;
                if (options.passprops && this.props)
                    body.props = Object.assign({}, body.props, this.props);
                if (options.passstate && this.state)
                    body.props = Object.assign({}, body.props, this.state);
                return main_1.getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : {}, { disableRenderIndexKey: disableRenderIndexKey }, {
                    props: use_getState
                        ? Object.assign({}, this.props, { getState: function () { return _this.state; } })
                        : this.props
                }), body, resources);
            };
        }
        else {
            result[val] = typeof body === 'function'
                ? body
                : getFunctionFromEval({
                    body: body,
                    args: args
                });
        }
        return result;
    }, {});
    var reactComponentClass = create_react_class_1["default"](classOptions);
    if (options.name) {
        Object.defineProperty(reactComponentClass, 'name', {
            value: options.name
        });
    }
    var reactClass = returnFactory
        ? react_1["default"].createFactory(reactComponentClass)
        : reactComponentClass;
    return reactClass;
}
exports.getReactClassComponent = getReactClassComponent;
function DynamicComponent(props) {
    if (props === void 0) { props = {}; }
    var _a = props.useCache, useCache = _a === void 0 ? true : _a, _b = props.cacheTimeout, cacheTimeout = _b === void 0 ? 60 * 60 * 5 : _b, _c = props.loadingJSONX, loadingJSONX = _c === void 0 ? { component: 'div', children: '...Loading' } : _c, _d = props.loadingErrorJSONX, loadingErrorJSONX = _d === void 0 ? { component: 'div', children: [{ component: 'span', children: 'Error: ' }, { component: 'span', resourceprops: { _children: ['error', 'message'] } }] } : _d, _e = props.cacheTimeoutFunction, cacheTimeoutFunction = _e === void 0 ? function () { } : _e, jsonx = props.jsonx, _f = props.transformFunction, transformFunction = _f === void 0 ? function (data) { return data; } : _f, fetchURL = props.fetchURL, fetchOptions = props.fetchOptions, fetchFunction = props.fetchFunction;
    var context = this || {};
    var _g = react_1.useState({ hasLoaded: false, hasError: false, resources: {}, error: undefined }), state = _g[0], setState = _g[1];
    var transformer = react_1.useMemo(function () { return getFunctionFromEval(transformFunction); }, [transformFunction]);
    var timeoutFunction = react_1.useMemo(function () { return getFunctionFromEval(cacheTimeoutFunction); }, [cacheTimeoutFunction]);
    var renderJSONX = react_1.useMemo(function () { return main_1.getReactElementFromJSONX.bind(context); }, [context]);
    var loadingComponent = react_1.useMemo(function () { return renderJSONX(loadingJSONX); }, [loadingJSONX]);
    var loadingError = react_1.useMemo(function () { return renderJSONX(loadingErrorJSONX, { error: state.error }); }, [loadingErrorJSONX, state.error]);
    react_1.useEffect(function () {
        function getData() {
            return __awaiter(this, void 0, void 0, function () {
                var transformedData_1, fetchedData, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            if (!(useCache && cache.get(fetchURL))) return [3 /*break*/, 1];
                            transformedData_1 = cache.get(fetchURL);
                            return [3 /*break*/, 7];
                        case 1:
                            fetchedData = void 0;
                            if (!fetchFunction) return [3 /*break*/, 3];
                            return [4 /*yield*/, fetchFunction(fetchURL, fetchOptions)];
                        case 2:
                            fetchedData = _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, utils_1.fetchJSON(fetchURL, fetchOptions)];
                        case 4:
                            fetchedData = _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, transformer(fetchedData)];
                        case 6:
                            transformedData_1 = _a.sent();
                            if (useCache)
                                cache.put(fetchURL, transformedData_1, cacheTimeout, timeoutFunction);
                            _a.label = 7;
                        case 7:
                            setState(function (prevState) { return Object.assign({}, prevState, { hasLoaded: true, hasError: false, resources: { DynamicComponentData: transformedData_1 } }); });
                            return [3 /*break*/, 9];
                        case 8:
                            e_1 = _a.sent();
                            if (context.debug)
                                console.warn(e_1);
                            setState({ hasError: true, error: e_1 });
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        if (fetchURL)
            getData();
    }, [fetchURL, fetchOptions]);
    if (!fetchURL)
        return null;
    else if (state.hasError) {
        return loadingError;
    }
    else if (state.hasLoaded === false) {
        return loadingComponent;
    }
    else
        return renderJSONX(jsonx, state.resources);
}
exports.DynamicComponent = DynamicComponent;
/**
 * Returns new React Function Component
 
 * @todo set 'functionprops' to set arguments for function
 * @param {*} reactComponent - Valid JSONX to render
 * @param {String} functionBody - String of function component body
 * @param {String} options.name - Function Component name
 * @returns {Function}
 * @see {@link https://reactjs.org/docs/hooks-intro.html}
 * @example
  const jsonxRender = {
   component:'div',
   passprops:'true',
   children:[
     {
      component:'input',
      thisprops:{
          value:['count'],
        },
     },
      {
        component:'button',
       __dangerouslyBindEvalProps:{
        onClick:function(count,setCount){
          setCount(count+1);
          console.log('this is inline',{count,setCount});
        },
        // onClick:`(function(count,setCount){
        //   setCount(count+1)
        //   console.log('this is inline',{count,setCount});
        // })`,
        children:'Click me'
      }
   ]
  };
  const functionBody = 'const [count, setCount] = useState(0); const functionprops = {count,setCount};'
  const options = { name: IntroHook}
  const MyCustomFunctionComponent = jsonx._jsonxComponents.getReactFunctionComponent({jsonxRender, functionBody, options});
   */
function getReactFunctionComponent(reactComponent, functionBody, options) {
    if (reactComponent === void 0) { reactComponent = {}; }
    if (functionBody === void 0) { functionBody = ''; }
    if (options === void 0) { options = {}; }
    if (options.lazy) {
        return react_1.lazy(function () { return options.lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false })).then(function (lazyComponent) {
            return {
                "default": getReactFunctionComponent.apply(void 0, lazyComponent)
            };
        }); });
    }
    if (typeof options === 'undefined' || typeof options.bind === 'undefined')
        options.bind = true;
    var _a = options.resources, resources = _a === void 0 ? {} : _a, _b = options.args, args = _b === void 0 ? [] : _b;
    var props = reactComponent.props;
    var functionArgs = [react_1["default"], react_1.useState, react_1.useEffect, react_1.useContext, react_1.useReducer, react_1.useCallback, react_1.useMemo, react_1.useRef, react_1.useImperativeHandle, react_1.useLayoutEffect, react_1.useDebugValue, main_1.getReactElementFromJSONX, reactComponent, resources, props,];
    if (typeof functionBody === 'function')
        functionBody = functionBody.toString();
    var functionComponent = Function('React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'getReactElementFromJSONX', 'reactComponent', 'resources', 'props', "\n    const self = this;\n    return function " + (options.name || 'Anonymous') + "(props){\n      " + functionBody + "\n      if(typeof exposeProps==='undefined' || exposeProps){\n        reactComponent.props = Object.assign({},props,typeof exposeProps==='undefined'?{}:exposeProps);\n        // reactComponent.__functionargs = Object.keys(exposeProps);\n      } else{\n        reactComponent.props =  props;\n      }\n      if(!props.children) delete props.children;\n      const context = " + (options.bind ? 'Object.assign(self,this)' : 'this') + ";\n      return getReactElementFromJSONX.call(context, reactComponent);\n    }\n  ");
    if (options.name) {
        Object.defineProperty(functionComponent, 'name', {
            value: options.name
        });
    }
    return (options.bind) ? functionComponent.call.apply(functionComponent, __spreadArrays([this], functionArgs)) : functionComponent.apply(void 0, functionArgs);
}
exports.getReactFunctionComponent = getReactFunctionComponent;
/**
 *
 */
function getReactContext(options) {
    if (options === void 0) { options = {}; }
    return react_1.createContext(options.value);
}
exports.getReactContext = getReactContext;
