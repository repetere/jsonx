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
exports.__esModule = true;
var ua_parser_js_1 = require("ua-parser-js");
/**
 * Used to evaluate whether or not to render a component
 * @param {Object} options
 * @param {Object} options.jsonx - Valid JSONX JSON
 * @param {Object} options.props - Props to test comparison values against, usually Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops)
 * @returns {Boolean} returns true if all comparisons are true or if using or comparisons, at least one condition is true
 * @example
 const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};
const testJSONX = Object.assign({}, sampleJSONX, {
  comparisonprops: [{
    left: ['truthy',],
    operation:'==',
    right:['falsey',],
  }],
});
displayComponent({ jsonx: testJSONX, props: testJSONX2.props, }) // => false
 */
function displayComponent(options) {
    if (options === void 0) { options = {}; }
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a, props = options.props;
    var propsToCompare = jsonx.comparisonprops;
    var comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(function (comp) {
        var compares = {};
        if (Array.isArray(comp.left)) {
            compares.left = comp.left;
        }
        if (Array.isArray(comp.right)) {
            compares.right = comp.right;
        }
        var propcompares = traverse(compares, props || jsonx.props);
        var opscompares = Object.assign({}, comp, propcompares);
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
            default: //'exists'
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
    var validProps = comparisons.filter(function (comp) { return comp === true; });
    if (!jsonx.comparisonprops) {
        return true;
    }
    else if (jsonx.comparisonorprops && validProps.length < 1) {
        return false;
    }
    else if (validProps.length !== comparisons.length && !jsonx.comparisonorprops) {
        return false;
    }
    else {
        return true;
    }
}
exports.displayComponent = displayComponent;
/**
 * Use to test if can bind components this context for react-redux-router
 * @returns {Boolean} true if browser is not IE or old android / chrome
 */
function getAdvancedBinding() {
    if (typeof window === 'undefined') {
        var window = (this && this.window)
            ? this.window
            : global.window || {};
        if (!window.navigator)
            return false;
    }
    try {
        if (window && window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
            // console.log('window.navigator.userAgent',window.navigator.userAgent)
            if (window.navigator.userAgent.indexOf('Trident') !== -1) {
                return false;
            }
            var uastring = window.navigator.userAgent;
            var parser = new ua_parser_js_1["default"]();
            parser.setUA(uastring);
            var parseUserAgent = parser.getResult();
            // console.log({ parseUserAgent, });
            if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView') && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
                return false;
            }
            if (parseUserAgent.browser.name === 'Android Browser') {
                return false;
            }
        }
    }
    catch (e) {
        e;
        console.error(e);
        // console.warn('could not detect browser support', e);
        return false;
    }
    return true;
}
exports.getAdvancedBinding = getAdvancedBinding;
/**
 * take an object of array paths to traverse and resolve
 * @example
 * const testObj = {
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
const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };

 traverse(testVals, testObj) // =>{ auth:'OAuth2', username:'jsonx',  }
 * @param {Object} paths - an object to resolve array property paths
 * @param {Object} data - object to traverse
 * @returns {Object} resolved object with traversed properties
 * @throws {TypeError}
 */
function traverse(paths, data) {
    if (paths === void 0) { paths = {}; }
    if (data === void 0) { data = {}; }
    var keys = Object.keys(paths);
    if (!keys.length)
        return paths;
    return keys.reduce(function (result, key) {
        if (typeof paths[key] === 'string')
            result[key] = data[paths[key]];
        else if (Array.isArray(paths[key])) {
            var _path = Object.assign([], paths[key]);
            var value = data;
            while (_path.length && value && typeof value === 'object') {
                var prop = _path.shift();
                value = value[prop];
            }
            result[key] = (_path.length) ? undefined : value;
        }
        else
            throw new TypeError('dynamic property paths must be a string or an array of strings or numeric indexes');
        return result;
    }, {});
}
exports.traverse = traverse;
/**
 * Validates JSONX JSON Syntax
 * @example
 * validateJSONX({component:'p',children:'hello world'})=>true
 * validateJSONX({children:'hello world'})=>throw SyntaxError('[0001] Missing React Component')
 * @param {Object} jsonx - JSONX JSON to validate
 * @param {Boolean} [returnAllErrors=false] - flag to either throw error or to return all errors in an array of errors
 * @returns {Boolean|Error[]} either returns true if JSONX is valid, or throws validation error or returns list of errors in array
 * @throws {SyntaxError|TypeError|ReferenceError}
 */
function validateJSONX(jsonx, returnAllErrors) {
    if (jsonx === void 0) { jsonx = {}; }
    if (returnAllErrors === void 0) { returnAllErrors = false; }
    var dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops', 'thisstate',];
    var evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps',];
    var validKeys = ['component', 'props', 'children', '__spreadComponent', '__inline', '__functionargs', '__dangerouslyInsertComponents', '__dangerouslyInsertComponentProps', '__dangerouslyInsertJSONXComponents', '__functionProps', '__functionparams', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops', 'debug'].concat(dynamicPropsNames, evalPropNames);
    var errors = [];
    if (!jsonx.component) {
        errors.push(SyntaxError('[0001] Missing React Component'));
    }
    if (jsonx.props) {
        if (typeof jsonx.props !== 'object' || Array.isArray(jsonx.props)) {
            errors.push(TypeError('[0002] ' + jsonx.component + ': props must be an Object / valid React props'));
        }
        if (jsonx.props.children && (typeof jsonx.props.children !== 'string' || !Array.isArray(jsonx.props.children))) {
            errors.push(TypeError('[0003] ' + jsonx.component + ': props.children must be an array of JSONX JSON objects or a string'));
        }
        if (jsonx.props._children && (typeof jsonx.props._children !== 'string' || !Array.isArray(jsonx.props._children))) {
            errors.push(TypeError('[0004] ' + jsonx.component + ': props._children must be an array of JSONX JSON objects or a string'));
        }
    }
    if (jsonx.children) {
        if (typeof jsonx.children !== 'string' && !Array.isArray(jsonx.children)) {
            errors.push(TypeError('[0005] ' + jsonx.component + ': children must be an array of JSONX JSON objects or a string'));
        }
        if (Array.isArray(jsonx.children)) {
            var childrenErrors = jsonx.children
                .filter(function (c) { return typeof c === 'object'; })
                .map(function (c) { return validateJSONX(c, returnAllErrors); });
            errors = errors.concat.apply(errors, childrenErrors);
        }
    }
    dynamicPropsNames.forEach(function (dynamicprop) {
        var jsonxDynamicProps = jsonx[dynamicprop];
        if (jsonxDynamicProps) {
            // if (dynamicprop === 'thisprops') {
            //   console.log({ dynamicprop, jsonxDynamicProps });
            // }
            if (typeof jsonxDynamicProps !== 'object') {
                errors.push(TypeError("[0006] " + dynamicprop + " must be an object"));
            }
            Object.keys(jsonxDynamicProps).forEach(function (resolvedDynamicProp) {
                if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
                    errors.push(TypeError("[0007] jsonx." + dynamicprop + "." + resolvedDynamicProp + " must be an array of strings"));
                }
                if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
                    var allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter(function (propArrayItem) { return typeof propArrayItem === 'string'; });
                    if (allStringArray.length !== jsonxDynamicProps[resolvedDynamicProp].length) {
                        errors.push(TypeError("[0008] jsonx." + dynamicprop + "." + resolvedDynamicProp + " must be an array of strings"));
                    }
                }
            });
        }
    });
    var evalProps = jsonx.__dangerouslyEvalProps;
    var boundEvalProps = jsonx.__dangerouslyBindEvalProps;
    if (evalProps || boundEvalProps) {
        if ((evalProps && typeof evalProps !== 'object') || (boundEvalProps && typeof boundEvalProps !== 'object')) {
            errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
        }
        evalPropNames
            .filter(function (evalProp) { return jsonx[evalProp]; })
            .forEach(function (eProps) {
            var evProp = jsonx[eProps];
            var scopedEval = eval;
            Object.keys(evProp).forEach(function (propToEval) {
                if (typeof evProp[propToEval] !== 'string') {
                    errors.push(TypeError("[0010] jsonx." + eProps + "." + evProp + " must be a string"));
                }
                try {
                    // console.log({ eProps });
                    if (eProps === '__dangerouslyBindEvalProps') {
                        var funcToBind = scopedEval("(" + evProp[propToEval] + ")");
                        funcToBind.call({ bounded: true });
                    }
                    else {
                        scopedEval(evProp[propToEval]);
                    }
                }
                catch (e) {
                    errors.push(e);
                }
            });
        });
    }
    if (jsonx.__dangerouslyInsertComponents) {
        Object.keys(jsonx.__dangerouslyInsertComponents).forEach(function (insertedComponents) {
            try {
                validateJSONX(jsonx.__dangerouslyInsertComponents[insertedComponents]);
            }
            catch (e) {
                errors.push(TypeError("[0011] jsonx.__dangerouslyInsertComponents." + insertedComponents + " must be a valid JSONX JSON Object: " + e.toString()));
            }
        });
    }
    if (jsonx.__functionProps) {
        if (typeof jsonx.__functionProps !== 'object') {
            errors.push(TypeError('[0012] jsonx.__functionProps  must be an object'));
        }
        else {
            Object.keys(jsonx.__functionProps)
                .forEach(function (fProp) {
                if (jsonx.__functionProps[fProp] && (typeof jsonx.__functionProps[fProp] !== 'string' || jsonx.__functionProps[fProp].indexOf('func:') === -1)) {
                    errors.push(ReferenceError("[0013] jsonx.__functionProps." + fProp + " must reference a function (i.e. func:this.props.logoutUser())"));
                }
            });
        }
    }
    if (jsonx.__windowComponentProps && (typeof jsonx.__windowComponentProps !== 'object' || Array.isArray(jsonx.__windowComponentProps))) {
        errors.push(TypeError('[0013] jsonx.__windowComponentProps  must be an object'));
    }
    if (jsonx.__windowComponents) {
        if (typeof jsonx.__windowComponents !== 'object') {
            errors.push(TypeError('[0014] jsonx.__windowComponents must be an object'));
        }
        Object.keys(jsonx.__windowComponents)
            .forEach(function (cProp) {
            if (typeof jsonx.__windowComponents[cProp] !== 'string' || jsonx.__windowComponents[cProp].indexOf('func:') === -1) {
                errors.push(ReferenceError("[0015] jsonx.__windowComponents." + cProp + " must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)"));
            }
        });
    }
    if (typeof jsonx.comparisonorprops !== 'undefined' && typeof jsonx.comparisonorprops !== 'boolean') {
        errors.push(TypeError('[0016] jsonx.comparisonorprops  must be boolean'));
    }
    if (jsonx.comparisonprops) {
        if (!Array.isArray(jsonx.comparisonprops)) {
            errors.push(TypeError('[0017] jsonx.comparisonprops  must be an array or comparisons'));
        }
        else {
            jsonx.comparisonprops.forEach(function (c) {
                if (typeof c !== 'object') {
                    errors.push(TypeError('[0018] jsonx.comparisonprops  must be an array or comparisons objects'));
                }
                else if (typeof c.left === 'undefined') {
                    errors.push(TypeError('[0019] jsonx.comparisonprops  must be have a left comparison value'));
                }
            });
        }
    }
    if (typeof jsonx.passprops !== 'undefined' && typeof jsonx.passprops !== 'boolean') {
        errors.push(TypeError('[0020] jsonx.passprops  must be boolean'));
    }
    var invalidKeys = Object.keys(jsonx).filter(function (key) { return validKeys.indexOf(key) === -1; });
    if (errors.length) {
        if (returnAllErrors)
            return errors;
        throw errors[0];
    }
    return invalidKeys.length
        ? "Warning: Invalid Keys [" + invalidKeys.join() + "]"
        : true;
}
exports.validateJSONX = validateJSONX;
/**
 * validates simple JSONX Syntax {[component]:{props,children}}
 * @param {Object} simpleJSONX - Any valid simple JSONX Syntax
 * @return {Boolean} returns true if simpleJSONX is valid
 */
function validSimpleJSONXSyntax(simpleJSONX) {
    if (simpleJSONX === void 0) { simpleJSONX = {}; }
    if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
        return false;
    }
    else {
        var componentName = Object.keys(simpleJSONX)[0];
        return (Object.keys(simpleJSONX).length === 1 && !simpleJSONX[componentName].component && typeof simpleJSONX[componentName] === 'object')
            ? true
            : false;
    }
}
exports.validSimpleJSONXSyntax = validSimpleJSONXSyntax;
/**
 * Transforms SimpleJSONX to Valid JSONX JSON {[component]:{props,children}} => {component,props,children}
 * @param {Object} simpleJSONX JSON Object
 * @return {Object} - returns a valid JSONX JSON Object from a simple JSONX JSON Object
 */
function simpleJSONXSyntax(simpleJSONX) {
    if (simpleJSONX === void 0) { simpleJSONX = {}; }
    var component = Object.keys(simpleJSONX)[0];
    try {
        return Object.assign({}, {
            component: component
        }, simpleJSONX[component], {
            children: (simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children))
                ? simpleJSONX[component].children
                    .map(simpleJSONXSyntax)
                : simpleJSONX[component].children
        });
    }
    catch (e) {
        throw SyntaxError('Invalid Simple JSONX Syntax', e);
    }
}
exports.simpleJSONXSyntax = simpleJSONXSyntax;
/**
 * Transforms Valid JSONX JSON to SimpleJSONX  {component,props,children} => {[component]:{props,children}}
 * @param {Object} jsonx Valid JSONX JSON object
 * @return {Object} - returns a simple JSONX JSON Object from a valid JSONX JSON Object
 */
function getSimplifiedJSONX(jsonx) {
    var _a;
    if (jsonx === void 0) { jsonx = {}; }
    try {
        if (!jsonx.component)
            return jsonx; //already simple
        var componentName = jsonx.component;
        jsonx.children = (Array.isArray(jsonx.children))
            ? jsonx.children
                .filter(function (child) { return child; }) //remove empty children
                .map(getSimplifiedJSONX)
            : jsonx.children;
        delete jsonx.component;
        return _a = {},
            _a[componentName] = jsonx,
            _a;
    }
    catch (e) {
        throw e;
    }
}
exports.getSimplifiedJSONX = getSimplifiedJSONX;
/**
 * Fetches JSON from remote path
 * @param {String} path - fetch path url
 * @param {Object} options - fetch options
 * @return {Object} - returns fetched JSON data
 */
function fetchJSON(path, options) {
    if (path === void 0) { path = ''; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(path, options)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchJSON = fetchJSON;
