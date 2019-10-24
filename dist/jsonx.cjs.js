'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var ReactDOMElements = _interopDefault(require('react-dom-factories'));
var UAParser = _interopDefault(require('ua-parser-js'));
var createReactClass = _interopDefault(require('create-react-class'));
var path = _interopDefault(require('path'));

function setState(store, newState, afterUpdateCallback) {
  const listenersLength = store.listeners.length;
  store.state = { ...store.state,
    ...newState
  };
  store.listeners.forEach(listener => {
    listener.run(store.state);
  });
  afterUpdateCallback && afterUpdateCallback();
}

function useCustom(store, React, mapState, mapActions) {
  const [, originalHook] = React.useState(Object.create(null));
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(() => mapActions ? mapActions(store.actions) : store.actions, [mapActions, store.actions]);
  React.useEffect(() => {
    const newListener = {
      oldState: {}
    };
    newListener.run = mapState ? newState => {
      const mappedState = mapState(newState);

      if (mappedState !== newListener.oldState) {
        newListener.oldState = mappedState;
        originalHook(mappedState);
      }
    } : originalHook;
    store.listeners.push(newListener);
    newListener.run(store.state);
    return () => {
      store.listeners = store.listeners.filter(listener => listener !== newListener);
    };
  }, []); // eslint-disable-line

  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }

    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = {
    state: initialState,
    listeners: []
  };
  store.setState = setState.bind(null, store);
  store.actions = associateActions(store, actions);
  if (initializer) initializer(store);
  return useCustom.bind(null, store, React);
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function Cache() {
  var _cache = Object.create(null);

  var _hitCount = 0;
  var _missCount = 0;
  var _size = 0;
  var _debug = false;

  this.put = function (key, value, time, timeoutCallback) {
    if (_debug) {
      console.log('caching: %s = %j (@%s)', key, value, time);
    }

    if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
      throw new Error('Cache timeout must be a positive number');
    } else if (typeof timeoutCallback !== 'undefined' && typeof timeoutCallback !== 'function') {
      throw new Error('Cache timeout callback must be a function');
    }

    var oldRecord = _cache[key];

    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
    } else {
      _size++;
    }

    var record = {
      value: value,
      expire: time + Date.now()
    };

    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(function () {
        _del(key);

        if (timeoutCallback) {
          timeoutCallback(key, value);
        }
      }.bind(this), time);
    }

    _cache[key] = record;
    return value;
  };

  this.del = function (key) {
    var canDelete = true;
    var oldRecord = _cache[key];

    if (oldRecord) {
      clearTimeout(oldRecord.timeout);

      if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
        canDelete = false;
      }
    } else {
      canDelete = false;
    }

    if (canDelete) {
      _del(key);
    }

    return canDelete;
  };

  function _del(key) {
    _size--;
    delete _cache[key];
  }

  this.clear = function () {
    for (var key in _cache) {
      clearTimeout(_cache[key].timeout);
    }

    _size = 0;
    _cache = Object.create(null);

    if (_debug) {
      _hitCount = 0;
      _missCount = 0;
    }
  };

  this.get = function (key) {
    var data = _cache[key];

    if (typeof data != "undefined") {
      if (isNaN(data.expire) || data.expire >= Date.now()) {
        if (_debug) _hitCount++;
        return data.value;
      } else {
        // free some space
        if (_debug) _missCount++;
        _size--;
        delete _cache[key];
      }
    } else if (_debug) {
      _missCount++;
    }

    return null;
  };

  this.size = function () {
    return _size;
  };

  this.memsize = function () {
    var size = 0,
        key;

    for (key in _cache) {
      size++;
    }

    return size;
  };

  this.debug = function (bool) {
    _debug = bool;
  };

  this.hits = function () {
    return _hitCount;
  };

  this.misses = function () {
    return _missCount;
  };

  this.keys = function () {
    return Object.keys(_cache);
  };

  this.exportJson = function () {
    var plainJsCache = {}; // Discard the `timeout` property.
    // Note: JSON doesn't support `NaN`, so convert it to `'NaN'`.

    for (var key in _cache) {
      var record = _cache[key];
      plainJsCache[key] = {
        value: record.value,
        expire: record.expire || 'NaN'
      };
    }

    return JSON.stringify(plainJsCache);
  };

  this.importJson = function (jsonToImport, options) {
    var cacheToImport = JSON.parse(jsonToImport);
    var currTime = Date.now();
    var skipDuplicates = options && options.skipDuplicates;

    for (var key in cacheToImport) {
      if (cacheToImport.hasOwnProperty(key)) {
        if (skipDuplicates) {
          var existingRecord = _cache[key];

          if (existingRecord) {
            if (_debug) {
              console.log('Skipping duplicate imported key \'%s\'', key);
            }

            continue;
          }
        }

        var record = cacheToImport[key]; // record.expire could be `'NaN'` if no expiry was set.
        // Try to subtract from it; a string minus a number is `NaN`, which is perfectly fine here.

        var remainingTime = record.expire - currTime;

        if (remainingTime <= 0) {
          // Delete any record that might exist with the same key, since this key is expired.
          this.del(key);
          continue;
        } // Remaining time must now be either positive or `NaN`,
        // but `put` will throw an error if we try to give it `NaN`.


        remainingTime = remainingTime > 0 ? remainingTime : undefined;
        this.put(key, record.value, remainingTime);
      }
    }

    return this.size();
  };
}

module.exports = new Cache();
module.exports.Cache = Cache;

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
            var parser = new UAParser();
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
                        funcToBind.call({ bounded: true, });
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
            component: component,
        }, simpleJSONX[component], {
            children: (simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children))
                ? simpleJSONX[component].children
                    .map(simpleJSONXSyntax)
                : simpleJSONX[component].children,
        });
    }
    catch (e) {
        throw SyntaxError('Invalid Simple JSONX Syntax', e);
    }
}
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

var jsonxUtils = /*#__PURE__*/Object.freeze({
  displayComponent: displayComponent,
  getAdvancedBinding: getAdvancedBinding,
  traverse: traverse,
  validateJSONX: validateJSONX,
  validSimpleJSONXSyntax: validSimpleJSONXSyntax,
  simpleJSONXSyntax: simpleJSONXSyntax,
  getSimplifiedJSONX: getSimplifiedJSONX,
  fetchJSON: fetchJSON
});

var cache = new undefined();
// if (typeof window === 'undefined') {
//   var window = window || global.window || {};
// }
/**
 
 */
var advancedBinding = getAdvancedBinding();
// require;
/**
 * object of all react components available for JSONX
 
 */
var componentMap = Object.assign({ Fragment: React.Fragment, Suspense: React.Suspense, }, ReactDOMElements, (typeof window === 'object') ? window.__jsonx_custom_elements : {});
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
    if (advancedBinding || options.advancedBinding) {
        return Object.assign({}, reactComponents, boundedComponents.reduce(function (result, componentName) {
            result[componentName] = reactComponents[componentName].bind(_this);
            return result;
        }, {}));
        // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
    }
    else
        return reactComponents;
}
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
        else if (ReactDOMElements[jsonx.component]) {
            return jsonx.component;
        }
        else if (reactComponents[jsonx.component]) {
            return reactComponents[jsonx.component];
        }
        else if (typeof jsonx.component === 'string' && jsonx.component.indexOf('.') > 0 && getComponentFromLibrary({ jsonx: jsonx, componentLibraries: componentLibraries, })) {
            return getComponentFromLibrary({ jsonx: jsonx, componentLibraries: componentLibraries, });
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
    var evalFunction = Function.prototype.constructor.apply({ name: name, }, argus);
    if (name) {
        Object.defineProperty(evalFunction, 'name', { value: name, });
    }
    return evalFunction;
}
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
        return React.lazy(function () { return options.lazy(reactComponent, Object.assign({}, options, { lazy: false, })).then(function (lazyComponent) {
            return {
                default: getReactClassComponent.apply(void 0, lazyComponent),
            };
        }); });
    }
    var context = this || {};
    var _a = options.returnFactory, returnFactory = _a === void 0 ? true : _a, _b = options.resources, resources = _b === void 0 ? {} : _b, _c = options.use_getState, use_getState = _c === void 0 ? true : _c, _d = options.bindContext, bindContext = _d === void 0 ? true : _d, _e = options.disableRenderIndexKey, disableRenderIndexKey = _e === void 0 ? true : _e;
    var rjc = Object.assign({
        getDefaultProps: {
            body: 'return {};',
        },
        getInitialState: {
            body: 'return {};',
        },
    }, reactComponent);
    var rjcKeys = Object.keys(rjc);
    if (rjcKeys.includes('render') === false) {
        throw new ReferenceError('React components require a render method');
    }
    var classOptions = rjcKeys.reduce(function (result, val) {
        if (typeof rjc[val] === 'function')
            rjc[val] = { body: rjc[val], };
        var args = rjc[val].arguments;
        var body = rjc[val].body;
        if (!body) {
            console.warn({ rjc: rjc, });
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
                return getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : {}, { disableRenderIndexKey: disableRenderIndexKey, }, {
                    props: use_getState
                        ? Object.assign({}, this.props, { getState: function () { return _this.state; }, })
                        : this.props,
                }), body, resources);
            };
        }
        else {
            result[val] = typeof body === 'function'
                ? body
                : getFunctionFromEval({
                    body: body,
                    args: args,
                });
        }
        return result;
    }, {});
    var reactComponentClass = createReactClass(classOptions);
    if (options.name) {
        Object.defineProperty(reactComponentClass, 'name', {
            value: options.name,
        });
    }
    var reactClass = returnFactory
        ? React__default.createFactory(reactComponentClass)
        : reactComponentClass;
    return reactClass;
}
function DynamicComponent(props) {
    if (props === void 0) { props = {}; }
    var _a = props.useCache, useCache = _a === void 0 ? true : _a, _b = props.cacheTimeout, cacheTimeout = _b === void 0 ? 60 * 60 * 5 : _b, _c = props.loadingJSONX, loadingJSONX = _c === void 0 ? { component: 'div', children: '...Loading', } : _c, _d = props.loadingErrorJSONX, loadingErrorJSONX = _d === void 0 ? { component: 'div', children: [{ component: 'span', children: 'Error: ' }, { component: 'span', resourceprops: { _children: ['error', 'message'] }, }], } : _d, _e = props.cacheTimeoutFunction, cacheTimeoutFunction = _e === void 0 ? function () { } : _e, jsonx = props.jsonx, _f = props.transformFunction, transformFunction = _f === void 0 ? function (data) { return data; } : _f, fetchURL = props.fetchURL, fetchOptions = props.fetchOptions, fetchFunction = props.fetchFunction;
    var context = this || {};
    var _g = React.useState({ hasLoaded: false, hasError: false, resources: {}, error: undefined, }), state = _g[0], setState = _g[1];
    var transformer = React.useMemo(function () { return getFunctionFromEval(transformFunction); }, [transformFunction]);
    var timeoutFunction = React.useMemo(function () { return getFunctionFromEval(cacheTimeoutFunction); }, [cacheTimeoutFunction]);
    var renderJSONX = React.useMemo(function () { return getReactElementFromJSONX.bind(context); }, [context]);
    var loadingComponent = React.useMemo(function () { return renderJSONX(loadingJSONX); }, [loadingJSONX]);
    var loadingError = React.useMemo(function () { return renderJSONX(loadingErrorJSONX, { error: state.error }); }, [loadingErrorJSONX, state.error]);
    React.useEffect(function () {
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
                        case 3: return [4 /*yield*/, fetchJSON(fetchURL, fetchOptions)];
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
                            setState(function (prevState) { return Object.assign({}, prevState, { hasLoaded: true, hasError: false, resources: { DynamicComponentData: transformedData_1, }, }); });
                            return [3 /*break*/, 9];
                        case 8:
                            e_1 = _a.sent();
                            if (context.debug)
                                console.warn(e_1);
                            setState({ hasError: true, error: e_1, });
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
        return React.lazy(function () { return options.lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false, })).then(function (lazyComponent) {
            return {
                default: getReactFunctionComponent.apply(void 0, lazyComponent),
            };
        }); });
    }
    if (typeof options === 'undefined' || typeof options.bind === 'undefined')
        options.bind = true;
    var _a = options.resources, resources = _a === void 0 ? {} : _a, _b = options.args;
    var props = reactComponent.props;
    var functionArgs = [React__default, React.useState, React.useEffect, React.useContext, React.useReducer, React.useCallback, React.useMemo, React.useRef, React.useImperativeHandle, React.useLayoutEffect, React.useDebugValue, getReactElementFromJSONX, reactComponent, resources, props,];
    if (typeof functionBody === 'function')
        functionBody = functionBody.toString();
    var functionComponent = Function('React', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'getReactElementFromJSONX', 'reactComponent', 'resources', 'props', "\n    const self = this;\n    return function " + (options.name || 'Anonymous') + "(props){\n      " + functionBody + "\n      if(typeof exposeProps==='undefined' || exposeProps){\n        reactComponent.props = Object.assign({},props,typeof exposeProps==='undefined'?{}:exposeProps);\n        // reactComponent.__functionargs = Object.keys(exposeProps);\n      } else{\n        reactComponent.props =  props;\n      }\n      if(!props.children) delete props.children;\n      const context = " + (options.bind ? 'Object.assign(self,this)' : 'this') + ";\n      return getReactElementFromJSONX.call(context, reactComponent);\n    }\n  ");
    if (options.name) {
        Object.defineProperty(functionComponent, 'name', {
            value: options.name,
        });
    }
    return (options.bind) ? functionComponent.call.apply(functionComponent, __spreadArrays([this], functionArgs)) : functionComponent.apply(void 0, functionArgs);
}
/**
 *
 */
function getReactContext(options) {
    if (options === void 0) { options = {}; }
    return React.createContext(options.value);
}

var jsonxComponents = /*#__PURE__*/Object.freeze({
  advancedBinding: advancedBinding,
  componentMap: componentMap,
  getBoundedComponents: getBoundedComponents,
  getComponentFromLibrary: getComponentFromLibrary,
  getComponentFromMap: getComponentFromMap,
  getFunctionFromEval: getFunctionFromEval,
  getReactClassComponent: getReactClassComponent,
  DynamicComponent: DynamicComponent,
  getReactFunctionComponent: getReactFunctionComponent,
  getReactContext: getReactContext
});

// if (typeof window === 'undefined') {
//   var window = window || {};
// }
//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
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
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
        result = [];
    }
    return result;
}
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
        ? traverse(jsonx[propName], traverseObject)
        : {};
}
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
                children: new Error('Using __spreadComponent requires an array prop \'__spread\'').toString(),
            };
        }
        else {
            return { children: undefined, };
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
            }),
        };
    }
}
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
        evAllProps = evVal.call(this, { jsonx: jsonx, });
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
            ? evVal.call(_this, { jsonx: jsonx, })
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
            componentVal = getRenderedJSON.call(_this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
        }
        catch (e) {
            if (_this.debug || jsonx.debug)
                componentVal = e;
        }
        cprops[cpropName] = componentVal;
        return cprops;
    }, {});
}
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
                componentVal = getReactFunctionComponent.call(_this, args.reactComponent, args.functionBody, args.options);
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
                componentVal = getReactFunctionComponent.call(_this, args.reactComponent, args.options);
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
                componentVal = getComponentFromMap({
                    jsonx: jsonx.__dangerouslyInsertJSONXComponents[cpropName],
                    reactComponents: _this.reactComponents,
                    componentLibraries: _this.componentLibraries,
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
                componentVal = getComponentFromMap({
                    jsonx: {
                        component: jsonx.__dangerouslyInsertReactComponents[cpropName],
                        props: jsonx.__dangerouslyInsertComponentProps
                            ? jsonx.__dangerouslyInsertComponentProps[cpropName]
                            : {},
                    },
                    reactComponents: _this.reactComponents,
                    componentLibraries: _this.componentLibraries,
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
                value: funcName,
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
                functionProperty: key,
            });
        }
    });
    return allProps;
}
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
            allProps[key] = React__default.createElement(windowComponentElement, windowComponentProps, null);
        }
    });
    return allProps;
}
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
                    _resources: resources,
                },
            }, this.props, jsonx.props, (useReduxState && !jsonx.ignoreReduxProps && (ignoreReduxPropsInComponentLibraries && !componentLibraries[jsonx.component]))
                ? (this.props && this.props.getState) ? this.props.getState() : {}
                : {})
            : undefined;
        var windowTraverse = typeof window !== 'undefined' ? window : {};
        var asyncprops = jsonx.asyncprops ? getJSONXProps({ jsonx: jsonx, propName: 'asyncprops', traverseObject: resources, }) : {};
        var resourceprops = jsonx.resourceprops ? getJSONXProps({ jsonx: jsonx, propName: 'resourceprops', traverseObject: resources, }) : {};
        var windowprops = jsonx.windowprops ? getJSONXProps({ jsonx: jsonx, propName: 'windowprops', traverseObject: windowTraverse, }) : {};
        var thisprops = jsonx.thisprops ? getJSONXProps({ jsonx: jsonx, propName: 'thisprops', traverseObject: componentThisProp, }) : {};
        var thisstate = jsonx.thisstate ? getJSONXProps({ jsonx: jsonx, propName: 'thisstate', traverseObject: this.state, }) : {};
        //allowing javascript injections
        var evalProps = (jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps)
            ? getEvalProps.call(this, { jsonx: jsonx, })
            : {};
        var insertedComponents = (jsonx.__dangerouslyInsertComponents)
            ? getComponentProps.call(this, { jsonx: jsonx, resources: resources, debug: debug, })
            : {};
        var insertedReactComponents = (jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents)
            ? getReactComponentProps.call(this, { jsonx: jsonx, debug: debug, })
            : {};
        var insertedComputedComponents = (jsonx.__dangerouslyInsertFunctionComponents || jsonx.__dangerouslyInsertClassComponents)
            ? getReactComponents.call(this, { jsonx: jsonx, debug: debug, })
            : {};
        var evalAllProps = (jsonx.__dangerouslyEvalAllProps)
            ? getEvalProps.call(this, { jsonx: jsonx, })
            : {};
        var allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey ? {} : { key: renderIndex, }, jsonx.props, thisprops, thisstate, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents, insertedComputedComponents);
        var computedProps = Object.assign({}, allProps, jsonx.__functionProps ? getFunctionProps.call(this, { allProps: allProps, jsonx: jsonx, }) : {}, jsonx.__windowComponents ? getWindowComponents.call(this, { allProps: allProps, jsonx: jsonx, }) : {}, jsonx.__spreadComponent ? getChildrenComponents.call(this, { allProps: allProps, jsonx: jsonx, }) : {}, evalAllProps);
        if (jsonx.debug)
            console.debug({ jsonx: jsonx, computedProps: computedProps, });
        return computedProps;
    }
    catch (e) {
        debug && logError(e, (e.stack) ? e.stack : 'no stack');
        return null;
    }
}

var jsonxProps = /*#__PURE__*/Object.freeze({
  STRIP_COMMENTS: STRIP_COMMENTS,
  ARGUMENT_NAMES: ARGUMENT_NAMES,
  getParamNames: getParamNames,
  getJSONXProps: getJSONXProps,
  getChildrenComponents: getChildrenComponents,
  boundArgsReducer: boundArgsReducer,
  getEvalProps: getEvalProps,
  getComponentProps: getComponentProps,
  getReactComponents: getReactComponents,
  getReactComponentProps: getReactComponentProps,
  getFunctionFromProps: getFunctionFromProps,
  getFunctionProps: getFunctionProps,
  getWindowComponents: getWindowComponents,
  getComputedProps: getComputedProps
});

/**
 * returns a valid jsonx.children property
 * @param {Object} options
 * @param {Object} [options.jsonx ={}]- Valid JSONX JSON
 * @param {Object} [options.props=options.jsonx.children] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops)
 * @returns {Object[]|String} returns a valid jsonx.children property that's either an array of JSONX objects or a string
 * @example
 * const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
        },
      },
      children:'hello world',
    },
    {
      component: 'div',
      children: [
        {
          component: 'ul',
          children: [
            {
              component: 'li',
              children:'list',
            },
          ],
        },
      ],
    },
  ],
};
const JSONXChildren = getChildrenProperty({ jsonx: sampleJSONX, }); //=> [ [jsonx Object],[jsonx Object]]
const JSONXChildrenPTag = getChildrenProperty({ jsonx: sampleJSONX.children[ 0 ], }); //=>hello world
 */
function getChildrenProperty(options) {
    if (options === void 0) { options = {}; }
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a;
    var props = options.props || jsonx.props || {};
    if (typeof props._children !== 'undefined' /* && !jsonx.children */) {
        if (Array.isArray(props._children) || typeof props._children === 'string' || typeof props._children === 'number') {
            return props._children;
        }
        else {
            return jsonx.children;
        }
    }
    else if (typeof jsonx.children === 'undefined') {
        if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
            return props.children;
        }
        else {
            return null;
        }
    }
    else {
        return jsonx.children;
    }
}
/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.jsonx ={}] - Valid JSONX JSON
 * @param {Object} [options.childjsonx ={}] - Valid JSONX JSON
 * @param {Number} options.renderIndex - React key property
 * @param {Object} [options.props=options.jsonx.props] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops)
 * @returns {Object|String} returns a valid  Valid JSONX Child object or a string
 */
function getChildrenProps(options) {
    if (options === void 0) { options = {}; }
    var _a = options.jsonx, jsonx = _a === void 0 ? {} : _a, childjsonx = options.childjsonx, renderIndex = options.renderIndex;
    var props = options.props || jsonx.props || {};
    return (jsonx.passprops && typeof childjsonx === 'object')
        ? Object.assign({}, childjsonx, {
            props: Object.assign({}, props, ((childjsonx.thisprops && childjsonx.thisprops.style) // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
                || (childjsonx.asyncprops && childjsonx.asyncprops.style)
                || (childjsonx.windowprops && childjsonx.windowprops.style))
                ? {}
                : {
                    style: {},
                }, childjsonx.props, { key: renderIndex + Math.random(), }),
        })
        : childjsonx;
}
/**
 * returns React Child Elements via JSONX
 * @param {*} options
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */
function getJSONXChildren(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    // eslint-disable-next-line
    var jsonx = options.jsonx, resources = options.resources, renderIndex = options.renderIndex, _a = options.logError, logError = _a === void 0 ? console.error : _a;
    try {
        var props_1 = options.props || jsonx.props || {};
        jsonx.children = getChildrenProperty({ jsonx: jsonx, props: props_1, });
        props_1._children = undefined;
        delete props_1._children;
        return (jsonx.children && Array.isArray(jsonx.children) && typeof jsonx.children !== 'string')
            ? jsonx.children.map(function (childjsonx) { return getReactElementFromJSONX.call(_this, getChildrenProps({ jsonx: jsonx, childjsonx: childjsonx, props: props_1, renderIndex: renderIndex, }), resources); })
            : jsonx.children;
    }
    catch (e) {
        logError(e);
        return null;
    }
}

var jsonxChildren = /*#__PURE__*/Object.freeze({
  getChildrenProperty: getChildrenProperty,
  getChildrenProps: getChildrenProps,
  getJSONXChildren: getJSONXChildren
});

/**
 * Use JSONX for express view rendering
 * @param {string} filePath - path to jsonx express view
 * @param {object} options - property used for express view {locals}
 * @param {object} options.__boundConfig - property used to bind this object for JSONX, can be used to add custom components
 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
 * @param {*} callback
 */
function __express(filePath, options, callback) {
    try {
        var jsonxModule = options.__jsonx; //|| require(filePath);
        var resources = Object.assign({}, options);
        delete resources.__boundConfig;
        delete resources.__DOCTYPE;
        delete resources.__jsonx;
        var context = Object.assign({}, options.__boundConfig);
        if (path.extname('.json'))
            context.useJSON = true;
        var jsonxRenderedString = outputHTML.call(context, {
            jsonx: jsonxModule,
            resources: resources,
        });
        var template = (options.__DOCTYPE || '<!DOCTYPE html>') + "\n" + jsonxRenderedString;
        if (typeof callback === 'function')
            callback(null, template);
        else
            return template;
    }
    catch (e) {
        if (typeof callback === 'function')
            callback(e);
        else
            throw e;
    }
}

// import React, { createElement, } from 'react';
var createElement = React__default.createElement;
var componentMap$1 = componentMap, getComponentFromMap$1 = getComponentFromMap, getBoundedComponents$1 = getBoundedComponents, DynamicComponent$1 = DynamicComponent;
var getComputedProps$1 = getComputedProps;
var getJSONXChildren$1 = getJSONXChildren;
var displayComponent$1 = displayComponent;
exports.renderIndex = 0;
/**
 * Use JSONX without any configuration to render JSONX JSON to HTML and insert JSONX into querySelector using ReactDOM.render
 * @example
 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="jsonx-generated"><p style="color:red;">hello world</p></div></div></body>
 * jsonx.jsonxRender({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @param {string} config.querySelector - selector for document.querySelector
 * @property {object} this - options for getReactElementFromJSONX
 */
function jsonxRender(config) {
    if (config === void 0) { config = { jsonx: { component: "" }, querySelector: "" }; }
    var jsonx = config.jsonx, resources = config.resources, querySelector = config.querySelector, DOM = config.DOM, portal = config.portal;
    var Render = portal ? ReactDOM.createPortal : ReactDOM.render;
    var RenderDOM = DOM || document.querySelector(querySelector);
    var JSONXReactElement = getReactElementFromJSONX.call(this || {}, jsonx, resources);
    if (!JSONXReactElement)
        throw ReferenceError("Invalid React Element");
    else if (!RenderDOM)
        throw ReferenceError("Invalid Render DOM Element");
    Render(JSONXReactElement, RenderDOM);
}
/**
 * Use ReactDOMServer.renderToString to render html from JSONX
 * @example
 * // Uses react to create <div class="jsonx-generated"><p style="color:red;">hello world</p></div>
 * jsonx.outputHTML({ jsonx: { component: 'div', props:{className:'jsonx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
 * @param {object} config - options used to inject html via ReactDOM.render
 * @param {object} config.jsonx - any valid JSONX JSON object
 * @param {object} config.resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @returns {string} React genereated html via JSONX JSON
 */
function outputHTML(config) {
    if (config === void 0) { config = { jsonx: { component: "" } }; }
    var jsonx = config.jsonx, resources = config.resources, _a = config.type, type = _a === void 0 ? "Fragment" : _a, props = config.props, children = config.children;
    return this && this.useJSON
        ? ReactDOMServer.renderToString(getReactElementFromJSON.call(this || {}, { type: type, props: props, children: children }))
        : ReactDOMServer.renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
}
/**
 * Use React.createElement and JSONX JSON to create React elements
 * @example
 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
 * jsonx.getReactElementFromJSONX({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {boolean} [this.returnJSON=false] - return json object of {type,props,children} instead of react element
 * @property {boolean} [this.disableRenderIndexKey=false] - disables auto assign a key prop
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 * @returns {function} React element via React.createElement
 */
function getReactElementFromJSONX(jsonx, resources) {
    if (resources === void 0) { resources = {}; }
    // eslint-disable-next-line
    var _a = this || {}, _b = _a.componentLibraries, componentLibraries = _b === void 0 ? {} : _b, _c = _a.debug, debug = _c === void 0 ? false : _c, _d = _a.returnJSON, returnJSON = _d === void 0 ? false : _d, _e = _a.logError, logError = _e === void 0 ? console.error : _e, _f = _a.boundedComponents, boundedComponents = _f === void 0 ? [] : _f, _g = _a.disableRenderIndexKey, disableRenderIndexKey = _g === void 0 ? true : _g;
    // const componentLibraries = this.componentLibraries;
    if (!jsonx)
        return null;
    if (jsonx.type)
        jsonx.component = jsonx.type;
    if (validSimpleJSONXSyntax(jsonx))
        jsonx = simpleJSONXSyntax(jsonx);
    if (!jsonx.component)
        return createElement("span", {}, debug ? "Error: Missing Component Object" : "");
    try {
        var components = Object.assign({ DynamicComponent: DynamicComponent$1.bind(this) }, componentMap$1, this.reactComponents);
        var reactComponents = boundedComponents.length
            ? getBoundedComponents$1.call(this, {
                boundedComponents: boundedComponents,
                reactComponents: components,
            })
            : components;
        exports.renderIndex++;
        var element = getComponentFromMap$1({
            jsonx: jsonx,
            reactComponents: reactComponents,
            componentLibraries: componentLibraries,
            debug: debug,
            logError: logError,
        });
        var props = getComputedProps$1.call(this, {
            jsonx: jsonx,
            resources: resources,
            renderIndex: exports.renderIndex,
            componentLibraries: componentLibraries,
            debug: debug,
            logError: logError,
            disableRenderIndexKey: disableRenderIndexKey,
        });
        var displayElement = jsonx.comparisonprops
            ? displayComponent$1.call(this, {
                jsonx: jsonx,
                props: props,
                renderIndex: exports.renderIndex,
                componentLibraries: componentLibraries,
                debug: debug,
            })
            : true;
        if (displayElement) {
            var children = getJSONXChildren$1.call(this, {
                jsonx: jsonx,
                props: props,
                resources: resources,
                renderIndex: exports.renderIndex,
            });
            if (returnJSON)
                return { type: element, props: props, children: children };
            return createElement(element, props, children);
        }
        else {
            return null;
        }
    }
    catch (e) {
        if (debug) {
            logError({ jsonx: jsonx, resources: resources }, "this", this);
            logError(e, e.stack ? e.stack : "no stack");
        }
        throw e;
    }
}
var getRenderedJSON = getReactElementFromJSONX;
var getReactElement = getReactElementFromJSONX;
/** converts a json object {type,props,children} into a react element
 * @example
 * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
 * @param {Object|String} options.type - 'div' or react component
 * @param {Object} options.props - props for react element
 * @param {String|[Object]} options.children - children elements
 * @returns {function} React element via React.createElement
 */
function getReactElementFromJSON(_a) {
    var type = _a.type, props = _a.props, children = _a.children;
    return createElement(type, props, Array.isArray(children) ? children.map(getReactElementFromJSON) : children);
}
/** converts a jsonx json object into a react function component
 * @example
 * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
 * @param {Object} jsonx - valid JSONX JSON
 * @param {Object} resources - props for react element
 * @returns {function} React element via React.createElement
 */
function compile(jsonx, resources) {
    if (resources === void 0) { resources = {}; }
    var context = Object.assign({}, this, { returnJSON: true });
    var json = getReactElementFromJSONX.call(context, jsonx, resources);
    var func = function compiledJSONX(props) {
        json.props = Object.assign({}, json.props, props);
        return getReactElementFromJSON(json);
    };
    Object.defineProperty(func, "name", { value: this.name });
    return func;
}
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
function outputJSX(jsonx, resources) {
    if (resources === void 0) { resources = {}; }
    var context = Object.assign({}, this, { returnJSON: true });
    var json = getReactElementFromJSONX.call(context, jsonx, resources);
    return jsonToJSX(json);
}
/**
 * Compiles JSONX into JSON IR format for react create element
 * @example
 * jsonx.outputJSON({ component: 'div', props: { title: 'test', }, children: 'hello', }); //=> { type: 'div',
 props: { key: 5, title: 'test' },
 children: 'hello' }
 * @property {object} this - options for getReactElementFromJSONX
 * @param {object} jsonx - any valid JSONX JSON object
 * @param {object} resources - any additional resource used for asynchronous properties
 * @returns {Object} json - {type,props,children}
 */
function outputJSON(jsonx, resources) {
    if (resources === void 0) { resources = {}; }
    var context = Object.assign({}, this, { returnJSON: true });
    return getReactElementFromJSONX.call(context, jsonx, resources);
}
var jsonxHTMLString = outputHTML;
/**
 * converts JSONX JSON IR to JSX
 * @example
 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
 * @param {Object} json - {type,props,children}
 * @returns {String} jsx string
 */
function jsonToJSX(json) {
    var propsString = json.props
        ? Object.keys(json.props)
            .filter(function (prop) { return prop.includes("__eval_") === false; })
            .reduce(function (propString, prop) {
            propString += " " + prop.toString() + "=" + (typeof json.props[prop] === "string"
                ? "\"" + json.props[prop].toString() + "\""
                : "{" + (json.props["__eval_" + prop] || json.props[prop]).toString() + "}");
            return propString;
        }, "")
        : "";
    return Array.isArray(json.children)
        ? "<" + json.type + " " + propsString + ">\n  " + json.children.map(jsonToJSX) + "\n</" + json.type + ">"
        : "<" + json.type + propsString + ">" + json.children + "</" + json.type + ">";
}
/**
 * Exposes react module used in JSONX
 * @returns {Object} React
 */
function __getReact() {
    return React__default;
}
/**
 * Exposes react dom module used in JSONX
 * @returns {Object} ReactDOM
 */
function __getReactDOM() {
    return ReactDOM;
}
/**
 * Exposes global hook used in JSONX
 * @returns {Object} useGlobalHook
 */
function __getUseGlobalHook() {
    return useStore;
}
var _jsonxChildren = jsonxChildren;
var _jsonxComponents = jsonxComponents;
var _jsonxProps = jsonxProps;
var _jsonxUtils = jsonxUtils;

exports.__express = __express;
exports.__getReact = __getReact;
exports.__getReactDOM = __getReactDOM;
exports.__getUseGlobalHook = __getUseGlobalHook;
exports._jsonxChildren = _jsonxChildren;
exports._jsonxComponents = _jsonxComponents;
exports._jsonxProps = _jsonxProps;
exports._jsonxUtils = _jsonxUtils;
exports.compile = compile;
exports.default = getReactElementFromJSONX;
exports.getReactElement = getReactElement;
exports.getReactElementFromJSON = getReactElementFromJSON;
exports.getReactElementFromJSONX = getReactElementFromJSONX;
exports.getRenderedJSON = getRenderedJSON;
exports.jsonToJSX = jsonToJSX;
exports.jsonxHTMLString = jsonxHTMLString;
exports.jsonxRender = jsonxRender;
exports.outputHTML = outputHTML;
exports.outputJSON = outputJSON;
exports.outputJSX = outputJSX;
exports.renderFile = __express;
