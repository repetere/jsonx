var SemanticUI = (function (exports, React, ReactDOM) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * The function that correctly handles passing refs.
   *
   * @param ref An ref object or function
   * @param node A node that should be passed by ref
   */
  var handleRef = function handleRef(ref, node) {

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref !== null && _typeof(ref) === 'object') {
      ref.current = node;
    }
  };

  /** Checks that the passed object is a valid React ref object. */
  var isRefObject = function isRefObject(ref) {
    return (// https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
      ref !== null && _typeof(ref) === 'object' && ref.hasOwnProperty('current')
    );
  };

  var nullRefObject = {
    current: null // A map of created ref objects to provide memoization.

  };
  var refObjects = new WeakMap();
  /** Creates a React ref object from existing DOM node. */

  var toRefObject = function toRefObject(node) {
    // A "null" is not valid key for a WeakMap
    if (node === null) {
      return nullRefObject;
    }

    if (refObjects.has(node)) {
      return refObjects.get(node);
    }

    var refObject = {
      current: node
    };
    refObjects.set(node, refObject);
    return refObject;
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret_1) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    }  shim.isRequired = shim;
    function getShim() {
      return shim;
    }  // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,

      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
  });
  var propTypes_1 = propTypes.func;
  var propTypes_2 = propTypes.object;
  var propTypes_3 = propTypes.oneOfType;
  var propTypes_4 = propTypes.element;

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
  60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
  exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
  exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
  exports.isSuspense=function(a){return t(a)===p};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
  var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_6 = reactIs_production_min.Element;
  var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_8 = reactIs_production_min.Fragment;
  var reactIs_production_min_9 = reactIs_production_min.Lazy;
  var reactIs_production_min_10 = reactIs_production_min.Memo;
  var reactIs_production_min_11 = reactIs_production_min.Portal;
  var reactIs_production_min_12 = reactIs_production_min.Profiler;
  var reactIs_production_min_13 = reactIs_production_min.StrictMode;
  var reactIs_production_min_14 = reactIs_production_min.Suspense;
  var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
  var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_20 = reactIs_production_min.isElement;
  var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_22 = reactIs_production_min.isFragment;
  var reactIs_production_min_23 = reactIs_production_min.isLazy;
  var reactIs_production_min_24 = reactIs_production_min.isMemo;
  var reactIs_production_min_25 = reactIs_production_min.isPortal;
  var reactIs_production_min_26 = reactIs_production_min.isProfiler;
  var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
  var reactIs_production_min_28 = reactIs_production_min.isSuspense;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_production_min;
  }
  });
  var reactIs_1 = reactIs.isForwardRef;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var RefFindNode =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(RefFindNode, _React$Component);

    function RefFindNode() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, RefFindNode);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RefFindNode)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "prevNode", null);

      return _this;
    }

    _createClass(RefFindNode, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.prevNode = ReactDOM.findDOMNode(this);
        handleRef(this.props.innerRef, this.prevNode);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var currentNode = ReactDOM.findDOMNode(this);

        if (this.prevNode !== currentNode) {
          this.prevNode = currentNode;
          handleRef(this.props.innerRef, currentNode);
        }

        if (prevProps.innerRef !== this.props.innerRef) {
          handleRef(this.props.innerRef, currentNode);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        handleRef(this.props.innerRef, null);
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;
        return children;
      }
    }]);

    return RefFindNode;
  }(React.Component);

  _defineProperty(RefFindNode, "displayName", 'RefFindNode');

  _defineProperty(RefFindNode, "propTypes",  {});

  var RefForward =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(RefForward, _React$Component);

    function RefForward() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, RefForward);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RefForward)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "handleRefOverride", function (node) {
        var _this$props = _this.props,
            children = _this$props.children,
            innerRef = _this$props.innerRef;
        handleRef(children.ref, node);
        handleRef(innerRef, node);
      });

      return _this;
    }

    _createClass(RefForward, [{
      key: "render",
      value: function render() {
        var children = this.props.children;
        return React.cloneElement(children, {
          ref: this.handleRefOverride
        });
      }
    }]);

    return RefForward;
  }(React.Component);

  _defineProperty(RefForward, "displayName", 'RefForward');

  _defineProperty(RefForward, "propTypes",  {});

  var Ref = function Ref(props) {
    var children = props.children,
        innerRef = props.innerRef;
    var child = React.Children.only(children);
    var ElementType = reactIs_1(child) ? RefForward : RefFindNode;
    return React.createElement(ElementType, {
      innerRef: innerRef
    }, child);
  };

  Ref.displayName = 'Ref'; // TODO: use Babel plugin for this

  var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
  });

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck$1;

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass$1;

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized$1;

  function _possibleConstructorReturn$1(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn$1;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits$1;

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
  }

  var _baseHas = baseHas;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$2.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_1(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map');

  var _Map = Map$1;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache;

  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) &&
      (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && _hasPath(object, path, _baseHas);
  }

  var has_1 = has;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  var last_1 = last;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  var _baseSlice = baseSlice;

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
  }

  var _parent = parent;

  /**
   * The base implementation of `_.invoke` without support for individual
   * method arguments.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the method to invoke.
   * @param {Array} args The arguments to invoke the method with.
   * @returns {*} Returns the result of the invoked method.
   */
  function baseInvoke(object, path, args) {
    path = _castPath(path, object);
    object = _parent(object, path);
    var func = object == null ? object : object[_toKey(last_1(path))];
    return func == null ? undefined : _apply(func, object, args);
  }

  var _baseInvoke = baseInvoke;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  var defineProperty$1 = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty$2 = defineProperty$1;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty$2 ? identity_1 : function(func, string) {
    return _defineProperty$2(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Invokes the method at `path` of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the method to invoke.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {*} Returns the result of the invoked method.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
   *
   * _.invoke(object, 'a[0].b.c.slice', 1, 3);
   * // => [2, 3]
   */
  var invoke = _baseRest(_baseInvoke);

  var invoke_1 = invoke;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  /**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */
  function isUndefined(value) {
    return value === undefined;
  }

  var isUndefined_1 = isUndefined;

  /**
   * The base implementation of `_.clamp` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   */
  function baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }

  var _baseClamp = baseClamp;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Used as references for various `Number` constants. */
  var INFINITY$2 = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber_1(value);
    if (value === INFINITY$2 || value === -INFINITY$2) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  var toFinite_1 = toFinite;

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite_1(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  var toInteger_1 = toInteger;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike_1(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn);

  var _baseEach = baseEach;

  /**
   * The base implementation of `_.filter` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function baseFilter(collection, predicate) {
    var result = [];
    _baseEach(collection, function(value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

  var _baseFilter = baseFilter;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED$2);
    return this;
  }

  var _setCacheAdd = setCacheAdd;

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  var _setCacheHas = setCacheHas;

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new _MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
  SetCache.prototype.has = _setCacheHas;

  var _SetCache = SetCache;

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var _arraySome = arraySome;

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  var _cacheHas = cacheHas;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!_arraySome(other, function(othValue, othIndex) {
              if (!_cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  var _equalArrays = equalArrays;

  /** Built-in value references. */
  var Uint8Array$1 = _root.Uint8Array;

  var _Uint8Array = Uint8Array$1;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  var _mapToArray = mapToArray;

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  var _setToArray = setToArray;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$1:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$1:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq_1(+object, +other);

      case errorTag$1:
        return object.name == other.name && object.message == other.message;

      case regexpTag$1:
      case stringTag$1:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag$1:
        var convert = _mapToArray;

      case setTag$1:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = _setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$1;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  var _equalByTag = equalByTag;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
        objProps = _getAllKeys(object),
        objLength = objProps.length,
        othProps = _getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
        return false;
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  var _equalObjects = equalObjects;

  /* Built-in method references that are verified to be native. */
  var DataView$1 = _getNative(_root, 'DataView');

  var _DataView = DataView$1;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set$1 = _getNative(_root, 'Set');

  var _Set = Set$1;

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap$1;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
      (_Map && getTag(new _Map) != mapTag$2) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$2) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$2;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$2;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_1(object),
        othIsArr = isArray_1(other),
        objTag = objIsArr ? arrayTag$1 : _getTag(object),
        othTag = othIsArr ? arrayTag$1 : _getTag(other);

    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer_1(object)) {
      if (!isBuffer_1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new _Stack);
      return (objIsArr || isTypedArray_1(object))
        ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new _Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new _Stack);
    return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

  var _baseIsEqualDeep = baseIsEqualDeep;

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
      return value !== value && other !== other;
    }
    return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  var _baseIsEqual = baseIsEqual;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$4 = 1,
      COMPARE_UNORDERED_FLAG$2 = 2;

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new _Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  var _baseIsMatch = baseIsMatch;

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject_1(value);
  }

  var _isStrictComparable = isStrictComparable;

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys_1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, _isStrictComparable(value)];
    }
    return result;
  }

  var _getMatchData = getMatchData;

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  var _matchesStrictComparable = matchesStrictComparable;

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = _getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || _baseIsMatch(object, source, matchData);
    };
  }

  var _baseMatches = baseMatches;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  var _baseHasIn = baseHasIn;

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && _hasPath(object, path, _baseHasIn);
  }

  var hasIn_1 = hasIn;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$5 = 1,
      COMPARE_UNORDERED_FLAG$3 = 2;

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (_isKey(path) && _isStrictComparable(srcValue)) {
      return _matchesStrictComparable(_toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get_1(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn_1(object, path)
        : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

  var _baseMatchesProperty = baseMatchesProperty;

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var _baseProperty = baseProperty;

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return _baseGet(object, path);
    };
  }

  var _basePropertyDeep = basePropertyDeep;

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
  }

  var property_1 = property;

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity_1;
    }
    if (typeof value == 'object') {
      return isArray_1(value)
        ? _baseMatchesProperty(value[0], value[1])
        : _baseMatches(value);
    }
    return property_1(value);
  }

  var _baseIteratee = baseIteratee;

  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * **Note:** Unlike `_.remove`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   * @see _.reject
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   */
  function filter(collection, predicate) {
    var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
    return func(collection, _baseIteratee(predicate));
  }

  var filter_1 = filter;

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]',
      setTag$3 = '[object Set]';

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArrayLike_1(value) &&
        (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
          isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
      return !value.length;
    }
    var tag = _getTag(value);
    if (tag == mapTag$3 || tag == setTag$3) {
      return !value.size;
    }
    if (_isPrototype(value)) {
      return !_baseKeys(value).length;
    }
    for (var key in value) {
      if (hasOwnProperty$a.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  var isEmpty_1 = isEmpty;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? _strictIndexOf(array, value, fromIndex)
      : _baseFindIndex(array, _baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf;

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && _baseIndexOf(array, value, 0) > -1;
  }

  var _arrayIncludes = arrayIncludes;

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  var _arrayIncludesWith = arrayIncludesWith;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * The base implementation of methods like `_.intersection`, without support
   * for iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of shared values.
   */
  function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? _arrayIncludesWith : _arrayIncludes,
        length = arrays[0].length,
        othLength = arrays.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];

    while (othIndex--) {
      var array = arrays[othIndex];
      if (othIndex && iteratee) {
        array = _arrayMap(array, _baseUnary(iteratee));
      }
      maxLength = nativeMin(array.length, maxLength);
      caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
        ? new _SetCache(othIndex && array)
        : undefined;
    }
    array = arrays[0];

    var index = -1,
        seen = caches[0];

    outer:
    while (++index < length && result.length < maxLength) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (!(seen
            ? _cacheHas(seen, computed)
            : includes(result, computed, comparator)
          )) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache
                ? _cacheHas(cache, computed)
                : includes(arrays[othIndex], computed, comparator))
              ) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  var _baseIntersection = baseIntersection;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * Casts `value` to an empty array if it's not an array like object.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array|Object} Returns the cast array-like object.
   */
  function castArrayLikeObject(value) {
    return isArrayLikeObject_1(value) ? value : [];
  }

  var _castArrayLikeObject = castArrayLikeObject;

  /**
   * Creates an array of unique values that are included in all given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. The order and references of result values are
   * determined by the first array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersection([2, 1], [2, 3]);
   * // => [2]
   */
  var intersection = _baseRest(function(arrays) {
    var mapped = _arrayMap(arrays, _castArrayLikeObject);
    return (mapped.length && mapped[0] === arrays[0])
      ? _baseIntersection(mapped)
      : [];
  });

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity_1;
  }

  var _castFunction = castFunction;

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayEach : _baseEach;
    return func(collection, _castFunction(iteratee));
  }

  var forEach_1 = forEach;

  var each = forEach_1;

  var getDefaultPropName = function getDefaultPropName(prop) {
    return "default".concat(prop[0].toUpperCase() + prop.slice(1));
  };
  /**
   * Return the auto controlled state value for a give prop. The initial value is chosen in this order:
   *  - regular props
   *  - then, default props
   *  - then, initial state
   *  - then, `checked` defaults to false
   *  - then, `value` defaults to '' or [] if props.multiple
   *  - else, undefined
   *
   *  @param {string} propName A prop name
   *  @param {object} [props] A props object
   *  @param {object} [state] A state object
   *  @param {boolean} [includeDefaults=false] Whether or not to heed the default props or initial state
   */

  var getAutoControlledStateValue = function getAutoControlledStateValue(propName, props, state) {
    var includeDefaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // regular props
    var propValue = props[propName];
    if (propValue !== undefined) return propValue;

    if (includeDefaults) {
      // defaultProps
      var defaultProp = props[getDefaultPropName(propName)];
      if (defaultProp !== undefined) return defaultProp; // initial state - state may be null or undefined

      if (state) {
        var initialState = state[propName];
        if (initialState !== undefined) return initialState;
      }
    } // React doesn't allow changing from uncontrolled to controlled components,
    // default checked/value if they were not present.


    if (propName === 'checked') return false;
    if (propName === 'value') return props.multiple ? [] : ''; // otherwise, undefined
  };

  var AutoControlledComponent =
  /*#__PURE__*/
  function (_Component) {
    inherits(AutoControlledComponent, _Component);

    function AutoControlledComponent() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, AutoControlledComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(AutoControlledComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "trySetState", function (state, callback) {
        var newState = Object.keys(state).reduce(function (acc, prop) {
          // ignore props defined by the parent
          if (_this.props[prop] !== undefined) return acc;
          acc[prop] = state[prop];
          return acc;
        }, {});
        if (Object.keys(newState).length > 0) _this.setState(newState, callback);
      });

      var autoControlledProps = _this.constructor.autoControlledProps;

      var _state = invoke_1(assertThisInitialized(_this), 'getInitialAutoControlledState', _this.props) || {};
      // Set initial state by copying auto controlled props to state.
      // Also look for the default prop for any auto controlled props (foo => defaultFoo)
      // so we can set initial values from defaults.


      var initialAutoControlledState = autoControlledProps.reduce(function (acc, prop) {
        acc[prop] = getAutoControlledStateValue(prop, _this.props, _state, true);

        return acc;
      }, {});
      _this.state = objectSpread({}, _state, initialAutoControlledState);
      return _this;
    } // eslint-disable-next-line camelcase


    createClass(AutoControlledComponent, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var autoControlledProps = this.constructor.autoControlledProps; // Solve the next state for autoControlledProps

        var newState = autoControlledProps.reduce(function (acc, prop) {
          var isNextDefined = !isUndefined_1(nextProps[prop]); // if next is defined then use its value

          if (isNextDefined) acc[prop] = nextProps[prop];
          return acc;
        }, {});
        if (Object.keys(newState).length > 0) this.setState(newState);
      }
      /**
       * Safely attempt to set state for props that might be controlled by the user.
       * Second argument is a state object that is always passed to setState.
       * @param {object} state State that corresponds to controlled props.
       * @param {function} [callback] Callback which is called after setState applied.
       */

    }]);

    return AutoControlledComponent;
  }(React.Component);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty$2) {
      _defineProperty$2(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  var _arrayAggregator = arrayAggregator;

  /**
   * Aggregates elements of `collection` on `accumulator` with keys transformed
   * by `iteratee` and values set by `setter`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function baseAggregator(collection, setter, iteratee, accumulator) {
    _baseEach(collection, function(value, key, collection) {
      setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
  }

  var _baseAggregator = baseAggregator;

  /**
   * Creates a function like `_.groupBy`.
   *
   * @private
   * @param {Function} setter The function to set accumulator values.
   * @param {Function} [initializer] The accumulator object initializer.
   * @returns {Function} Returns the new aggregator function.
   */
  function createAggregator(setter, initializer) {
    return function(collection, iteratee) {
      var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator,
          accumulator = initializer ? initializer() : {};

      return func(collection, setter, _baseIteratee(iteratee), accumulator);
    };
  }

  var _createAggregator = createAggregator;

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` thru `iteratee`. The corresponding value of
   * each key is the last element responsible for generating the key. The
   * iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * var array = [
   *   { 'dir': 'left', 'code': 97 },
   *   { 'dir': 'right', 'code': 100 }
   * ];
   *
   * _.keyBy(array, function(o) {
   *   return String.fromCharCode(o.code);
   * });
   * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   *
   * _.keyBy(array, 'dir');
   * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
   */
  var keyBy = _createAggregator(function(result, value, key) {
    _baseAssignValue(result, key, value);
  });

  var keyBy_1 = keyBy;

  /**
   * Given `this.props.children`, return an object mapping key to child.
   *
   * @param {object} children Element's children
   * @return {object} Mapping of key to child
   */

  var getChildMapping = function getChildMapping(children) {
    return keyBy_1(filter_1(React.Children.toArray(children), React.isValidElement), 'key');
  };

  var getPendingKeys = function getPendingKeys(prev, next) {
    var nextKeysPending = {};
    var pendingKeys = [];

    forEach_1(keys_1(prev), function (prevKey) {
      if (!has_1(next, prevKey)) {
        pendingKeys.push(prevKey);
        return;
      }

      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    });

    return [nextKeysPending, pendingKeys];
  };

  var getValue$1 = function getValue(key, prev, next) {
    return has_1(next, key) ? next[key] : prev[key];
  };
  /**
   * When you're adding or removing children some may be added or removed in the same render pass. We want to show *both*
   * since we want to simultaneously animate elements in and out. This function takes a previous set of keys and a new set
   * of keys and merges them with its best guess of the correct ordering.
   *
   * @param {object} prev Prev children as returned from `getChildMapping()`
   * @param {object} next Next children as returned from `getChildMapping()`
   * @return {object} A key set that contains all keys in `prev` and all keys in `next` in a reasonable order
   */


  var mergeChildMappings = function mergeChildMappings() {
    var prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var childMapping = {};

    var _getPendingKeys = getPendingKeys(prev, next),
        _getPendingKeys2 = slicedToArray(_getPendingKeys, 2),
        nextKeysPending = _getPendingKeys2[0],
        pendingKeys = _getPendingKeys2[1];

    forEach_1(keys_1(next), function (nextKey) {
      if (has_1(nextKeysPending, nextKey)) {
        forEach_1(nextKeysPending[nextKey], function (pendingKey) {
          childMapping[pendingKey] = getValue$1(pendingKey, prev, next);
        });
      }

      childMapping[nextKey] = getValue$1(nextKey, prev, next);
    });

    forEach_1(pendingKeys, function (pendingKey) {
      childMapping[pendingKey] = getValue$1(pendingKey, prev, next);
    });

    return childMapping;
  };

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection);
      if (!isArrayLike_1(collection)) {
        var iteratee = _baseIteratee(predicate);
        collection = keys_1(collection);
        predicate = function(key) { return iteratee(iterable[key], key, iterable); };
      }
      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
  }

  var _createFind = createFind;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max;

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
    if (index < 0) {
      index = nativeMax$1(length + index, 0);
    }
    return _baseFindIndex(array, _baseIteratee(predicate), index);
  }

  var findIndex_1 = findIndex;

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  var find = _createFind(findIndex_1);

  var find_1 = find;

  /**
   * The base implementation of `_.some` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function baseSome(collection, predicate) {
    var result;

    _baseEach(collection, function(value, index, collection) {
      result = predicate(value, index, collection);
      return !result;
    });
    return !!result;
  }

  var _baseSome = baseSome;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike_1(object) && _isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq_1(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * Iteration is stopped once `predicate` returns truthy. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.some(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.some(users, 'active');
   * // => true
   */
  function some(collection, predicate, guard) {
    var func = isArray_1(collection) ? _arraySome : _baseSome;
    if (guard && _isIterateeCall(collection, predicate, guard)) {
      predicate = undefined;
    }
    return func(collection, _baseIteratee(predicate));
  }

  var some_1 = some;

  /**
   * Determine if child by type exists in children.
   * @param {Object} children The children prop of a component.
   * @param {string|Function} type An html tag name string or React component.
   * @returns {Boolean}
   */

  var someByType = function someByType(children, type) {
    return some_1(React.Children.toArray(children), {
      type: type
    });
  };
  /**
   * Tests if children are nil in React and Preact.
   * @param {Object} children The children prop of a component.
   * @returns {Boolean}
   */

  var isNil = function isNil(children) {
    return children === null || children === undefined || Array.isArray(children) && children.length === 0;
  };

  var numberToWordMap = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen'
    /**
     * Return the number word for numbers 1-16.
     * Returns strings or numbers as is if there is no corresponding word.
     * Returns an empty string if value is not a string or number.
     * @param {string|number} value The value to convert to a word.
     * @returns {string}
     */

  };
  function numberToWord(value) {
    var type = _typeof_1(value);

    if (type === 'string' || type === 'number') {
      return numberToWordMap[value] || value;
    }

    return '';
  }

  /*
   * There are 3 prop patterns used to build up the className for a component.
   * Each utility here is meant for use in a classnames() argument.
   *
   * There is no util for valueOnly() because it would simply return val.
   * Use the prop value inline instead.
   *   <Label size='big' />
   *   <div class="ui big label"></div>
   */

  /**
   * Props where only the prop key is used in the className.
   * @param {*} val A props value
   * @param {string} key A props key
   *
   * @example
   * <Label tag />
   * <div class="ui tag label"></div>
   */

  var useKeyOnly = function useKeyOnly(val, key) {
    return val && key;
  };
  /**
   * Props that require both a key and value to create a className.
   * @param {*} val A props value
   * @param {string} key A props key
   *
   * @example
   * <Label corner='left' />
   * <div class="ui left corner label"></div>
   */

  var useValueAndKey = function useValueAndKey(val, key) {
    return val && val !== true && "".concat(val, " ").concat(key);
  };
  /**
   * Props whose key will be used in className, or value and key.
   * @param {*} val A props value
   * @param {string} key A props key
   *
   * @example Key Only
   * <Label pointing />
   * <div class="ui pointing label"></div>
   *
   * @example Key and Value
   * <Label pointing='left' />
   * <div class="ui left pointing label"></div>
   */

  var useKeyOrValueAndKey = function useKeyOrValueAndKey(val, key) {
    return val && (val === true ? key : "".concat(val, " ").concat(key));
  }; //
  // Prop to className exceptions
  //

  /**
   * The "multiple" prop implements control of visibility and reserved classes for Grid subcomponents.
   *
   * @param {*} val The value of the "multiple" prop
   * @param {*} key A props key
   *
   * @example
   * <Grid.Row only='mobile' />
   * <Grid.Row only='mobile tablet' />
   * <div class="mobile only row"></div>
   * <div class="mobile only tablet only row"></div>
   */

  var useMultipleProp = function useMultipleProp(val, key) {
    if (!val || val === true) return null;
    return val.replace('large screen', 'large-screen').replace(/ vertically/g, '-vertically').split(' ').map(function (prop) {
      return "".concat(prop.replace('-', ' '), " ").concat(key);
    }).join(' ');
  };
  /**
   * The "textAlign" prop follows the useValueAndKey except when the value is "justified'.
   * In this case, only the class "justified" is used, ignoring the "aligned" class.
   * @param {*} val The value of the "textAlign" prop
   *
   * @example
   * <Container textAlign='justified' />
   * <div class="ui justified container"></div>
   *
   * @example
   * <Container textAlign='left' />
   * <div class="ui left aligned container"></div>
   */

  var useTextAlignProp = function useTextAlignProp(val) {
    return val === 'justified' ? 'justified' : useValueAndKey(val, 'aligned');
  };
  /**
   * The "verticalAlign" prop follows the useValueAndKey.
   *
   * @param {*} val The value of the "verticalAlign" prop
   *
   * @example
   * <Grid verticalAlign='middle' />
   * <div class="ui middle aligned grid"></div>
   */

  var useVerticalAlignProp = function useVerticalAlignProp(val) {
    return useValueAndKey(val, 'aligned');
  };
  /**
   * Create "X", "X wide" and "equal width" classNames.
   * "X" is a numberToWord value and "wide" is configurable.
   * @param {*} val The prop value
   * @param {string} [widthClass=''] The class
   * @param {boolean} [canEqual=false] Flag that indicates possibility of "equal" value
   *
   * @example
   * <Grid columns='equal' />
   * <div class="ui equal width grid"></div>
   *
   * <Form widths='equal' />
   * <div class="ui equal width form"></div>
   *
   * <FieldGroup widths='equal' />
   * <div class="equal width fields"></div>
   *
   * @example
   * <Grid columns={4} />
   * <div class="ui four column grid"></div>
   */

  var useWidthProp = function useWidthProp(val) {
    var widthClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var canEqual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (canEqual && val === 'equal') {
      return 'equal width';
    }

    var valType = _typeof_1(val);

    if ((valType === 'string' || valType === 'number') && widthClass) {
      return "".concat(numberToWord(val), " ").concat(widthClass);
    }

    return numberToWord(val);
  };

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  var _mapping = createCommonjsModule(function (module, exports) {
  /** Used to map aliases to their real names. */
  exports.aliasToReal = {

    // Lodash aliases.
    'each': 'forEach',
    'eachRight': 'forEachRight',
    'entries': 'toPairs',
    'entriesIn': 'toPairsIn',
    'extend': 'assignIn',
    'extendAll': 'assignInAll',
    'extendAllWith': 'assignInAllWith',
    'extendWith': 'assignInWith',
    'first': 'head',

    // Methods that are curried variants of others.
    'conforms': 'conformsTo',
    'matches': 'isMatch',
    'property': 'get',

    // Ramda aliases.
    '__': 'placeholder',
    'F': 'stubFalse',
    'T': 'stubTrue',
    'all': 'every',
    'allPass': 'overEvery',
    'always': 'constant',
    'any': 'some',
    'anyPass': 'overSome',
    'apply': 'spread',
    'assoc': 'set',
    'assocPath': 'set',
    'complement': 'negate',
    'compose': 'flowRight',
    'contains': 'includes',
    'dissoc': 'unset',
    'dissocPath': 'unset',
    'dropLast': 'dropRight',
    'dropLastWhile': 'dropRightWhile',
    'equals': 'isEqual',
    'identical': 'eq',
    'indexBy': 'keyBy',
    'init': 'initial',
    'invertObj': 'invert',
    'juxt': 'over',
    'omitAll': 'omit',
    'nAry': 'ary',
    'path': 'get',
    'pathEq': 'matchesProperty',
    'pathOr': 'getOr',
    'paths': 'at',
    'pickAll': 'pick',
    'pipe': 'flow',
    'pluck': 'map',
    'prop': 'get',
    'propEq': 'matchesProperty',
    'propOr': 'getOr',
    'props': 'at',
    'symmetricDifference': 'xor',
    'symmetricDifferenceBy': 'xorBy',
    'symmetricDifferenceWith': 'xorWith',
    'takeLast': 'takeRight',
    'takeLastWhile': 'takeRightWhile',
    'unapply': 'rest',
    'unnest': 'flatten',
    'useWith': 'overArgs',
    'where': 'conformsTo',
    'whereEq': 'isMatch',
    'zipObj': 'zipObject'
  };

  /** Used to map ary to method names. */
  exports.aryMethod = {
    '1': [
      'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
      'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
      'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
      'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
      'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
      'uniqueId', 'words', 'zipAll'
    ],
    '2': [
      'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
      'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
      'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
      'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
      'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
      'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
      'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
      'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
      'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
      'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
      'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
      'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
      'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
      'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
      'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
      'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
      'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
      'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
      'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
      'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
      'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
      'zipObjectDeep'
    ],
    '3': [
      'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
      'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
      'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
      'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
      'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
      'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
      'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
      'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
      'xorWith', 'zipWith'
    ],
    '4': [
      'fill', 'setWith', 'updateWith'
    ]
  };

  /** Used to map ary to rearg configs. */
  exports.aryRearg = {
    '2': [1, 0],
    '3': [2, 0, 1],
    '4': [3, 2, 0, 1]
  };

  /** Used to map method names to their iteratee ary. */
  exports.iterateeAry = {
    'dropRightWhile': 1,
    'dropWhile': 1,
    'every': 1,
    'filter': 1,
    'find': 1,
    'findFrom': 1,
    'findIndex': 1,
    'findIndexFrom': 1,
    'findKey': 1,
    'findLast': 1,
    'findLastFrom': 1,
    'findLastIndex': 1,
    'findLastIndexFrom': 1,
    'findLastKey': 1,
    'flatMap': 1,
    'flatMapDeep': 1,
    'flatMapDepth': 1,
    'forEach': 1,
    'forEachRight': 1,
    'forIn': 1,
    'forInRight': 1,
    'forOwn': 1,
    'forOwnRight': 1,
    'map': 1,
    'mapKeys': 1,
    'mapValues': 1,
    'partition': 1,
    'reduce': 2,
    'reduceRight': 2,
    'reject': 1,
    'remove': 1,
    'some': 1,
    'takeRightWhile': 1,
    'takeWhile': 1,
    'times': 1,
    'transform': 2
  };

  /** Used to map method names to iteratee rearg configs. */
  exports.iterateeRearg = {
    'mapKeys': [1],
    'reduceRight': [1, 0]
  };

  /** Used to map method names to rearg configs. */
  exports.methodRearg = {
    'assignInAllWith': [1, 0],
    'assignInWith': [1, 2, 0],
    'assignAllWith': [1, 0],
    'assignWith': [1, 2, 0],
    'differenceBy': [1, 2, 0],
    'differenceWith': [1, 2, 0],
    'getOr': [2, 1, 0],
    'intersectionBy': [1, 2, 0],
    'intersectionWith': [1, 2, 0],
    'isEqualWith': [1, 2, 0],
    'isMatchWith': [2, 1, 0],
    'mergeAllWith': [1, 0],
    'mergeWith': [1, 2, 0],
    'padChars': [2, 1, 0],
    'padCharsEnd': [2, 1, 0],
    'padCharsStart': [2, 1, 0],
    'pullAllBy': [2, 1, 0],
    'pullAllWith': [2, 1, 0],
    'rangeStep': [1, 2, 0],
    'rangeStepRight': [1, 2, 0],
    'setWith': [3, 1, 2, 0],
    'sortedIndexBy': [2, 1, 0],
    'sortedLastIndexBy': [2, 1, 0],
    'unionBy': [1, 2, 0],
    'unionWith': [1, 2, 0],
    'updateWith': [3, 1, 2, 0],
    'xorBy': [1, 2, 0],
    'xorWith': [1, 2, 0],
    'zipWith': [1, 2, 0]
  };

  /** Used to map method names to spread configs. */
  exports.methodSpread = {
    'assignAll': { 'start': 0 },
    'assignAllWith': { 'start': 0 },
    'assignInAll': { 'start': 0 },
    'assignInAllWith': { 'start': 0 },
    'defaultsAll': { 'start': 0 },
    'defaultsDeepAll': { 'start': 0 },
    'invokeArgs': { 'start': 2 },
    'invokeArgsMap': { 'start': 2 },
    'mergeAll': { 'start': 0 },
    'mergeAllWith': { 'start': 0 },
    'partial': { 'start': 1 },
    'partialRight': { 'start': 1 },
    'without': { 'start': 1 },
    'zipAll': { 'start': 0 }
  };

  /** Used to identify methods which mutate arrays or objects. */
  exports.mutate = {
    'array': {
      'fill': true,
      'pull': true,
      'pullAll': true,
      'pullAllBy': true,
      'pullAllWith': true,
      'pullAt': true,
      'remove': true,
      'reverse': true
    },
    'object': {
      'assign': true,
      'assignAll': true,
      'assignAllWith': true,
      'assignIn': true,
      'assignInAll': true,
      'assignInAllWith': true,
      'assignInWith': true,
      'assignWith': true,
      'defaults': true,
      'defaultsAll': true,
      'defaultsDeep': true,
      'defaultsDeepAll': true,
      'merge': true,
      'mergeAll': true,
      'mergeAllWith': true,
      'mergeWith': true,
    },
    'set': {
      'set': true,
      'setWith': true,
      'unset': true,
      'update': true,
      'updateWith': true
    }
  };

  /** Used to map real names to their aliases. */
  exports.realToAlias = (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        object = exports.aliasToReal,
        result = {};

    for (var key in object) {
      var value = object[key];
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }
    return result;
  }());

  /** Used to map method names to other names. */
  exports.remap = {
    'assignAll': 'assign',
    'assignAllWith': 'assignWith',
    'assignInAll': 'assignIn',
    'assignInAllWith': 'assignInWith',
    'curryN': 'curry',
    'curryRightN': 'curryRight',
    'defaultsAll': 'defaults',
    'defaultsDeepAll': 'defaultsDeep',
    'findFrom': 'find',
    'findIndexFrom': 'findIndex',
    'findLastFrom': 'findLast',
    'findLastIndexFrom': 'findLastIndex',
    'getOr': 'get',
    'includesFrom': 'includes',
    'indexOfFrom': 'indexOf',
    'invokeArgs': 'invoke',
    'invokeArgsMap': 'invokeMap',
    'lastIndexOfFrom': 'lastIndexOf',
    'mergeAll': 'merge',
    'mergeAllWith': 'mergeWith',
    'padChars': 'pad',
    'padCharsEnd': 'padEnd',
    'padCharsStart': 'padStart',
    'propertyOf': 'get',
    'rangeStep': 'range',
    'rangeStepRight': 'rangeRight',
    'restFrom': 'rest',
    'spreadFrom': 'spread',
    'trimChars': 'trim',
    'trimCharsEnd': 'trimEnd',
    'trimCharsStart': 'trimStart',
    'zipAll': 'zip'
  };

  /** Used to track methods that skip fixing their arity. */
  exports.skipFixed = {
    'castArray': true,
    'flow': true,
    'flowRight': true,
    'iteratee': true,
    'mixin': true,
    'rearg': true,
    'runInContext': true
  };

  /** Used to track methods that skip rearranging arguments. */
  exports.skipRearg = {
    'add': true,
    'assign': true,
    'assignIn': true,
    'bind': true,
    'bindKey': true,
    'concat': true,
    'difference': true,
    'divide': true,
    'eq': true,
    'gt': true,
    'gte': true,
    'isEqual': true,
    'lt': true,
    'lte': true,
    'matchesProperty': true,
    'merge': true,
    'multiply': true,
    'overArgs': true,
    'partial': true,
    'partialRight': true,
    'propertyOf': true,
    'random': true,
    'range': true,
    'rangeRight': true,
    'subtract': true,
    'zip': true,
    'zipObject': true,
    'zipObjectDeep': true
  };
  });
  var _mapping_1 = _mapping.aliasToReal;
  var _mapping_2 = _mapping.aryMethod;
  var _mapping_3 = _mapping.aryRearg;
  var _mapping_4 = _mapping.iterateeAry;
  var _mapping_5 = _mapping.iterateeRearg;
  var _mapping_6 = _mapping.methodRearg;
  var _mapping_7 = _mapping.methodSpread;
  var _mapping_8 = _mapping.mutate;
  var _mapping_9 = _mapping.realToAlias;
  var _mapping_10 = _mapping.remap;
  var _mapping_11 = _mapping.skipFixed;
  var _mapping_12 = _mapping.skipRearg;

  /**
   * The default argument placeholder value for methods.
   *
   * @type {Object}
   */
  var placeholder = {};

  /** Built-in value reference. */
  var push = Array.prototype.push;

  /**
   * Creates a function, with an arity of `n`, that invokes `func` with the
   * arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} n The arity of the new function.
   * @returns {Function} Returns the new function.
   */
  function baseArity(func, n) {
    return n == 2
      ? function(a, b) { return func.apply(undefined, arguments); }
      : function(a) { return func.apply(undefined, arguments); };
  }

  /**
   * Creates a function that invokes `func`, with up to `n` arguments, ignoring
   * any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function baseAry(func, n) {
    return n == 2
      ? function(a, b) { return func(a, b); }
      : function(a) { return func(a); };
  }

  /**
   * Creates a clone of `array`.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the cloned array.
   */
  function cloneArray(array) {
    var length = array ? array.length : 0,
        result = Array(length);

    while (length--) {
      result[length] = array[length];
    }
    return result;
  }

  /**
   * Creates a function that clones a given object using the assignment `func`.
   *
   * @private
   * @param {Function} func The assignment function.
   * @returns {Function} Returns the new cloner function.
   */
  function createCloner(func) {
    return function(object) {
      return func({}, object);
    };
  }

  /**
   * A specialized version of `_.spread` which flattens the spread array into
   * the arguments of the invoked `func`.
   *
   * @private
   * @param {Function} func The function to spread arguments over.
   * @param {number} start The start position of the spread.
   * @returns {Function} Returns the new function.
   */
  function flatSpread(func, start) {
    return function() {
      var length = arguments.length,
          lastIndex = length - 1,
          args = Array(length);

      while (length--) {
        args[length] = arguments[length];
      }
      var array = args[start],
          otherArgs = args.slice(0, start);

      if (array) {
        push.apply(otherArgs, array);
      }
      if (start != lastIndex) {
        push.apply(otherArgs, args.slice(start + 1));
      }
      return func.apply(this, otherArgs);
    };
  }

  /**
   * Creates a function that wraps `func` and uses `cloner` to clone the first
   * argument it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} cloner The function to clone arguments.
   * @returns {Function} Returns the new immutable function.
   */
  function wrapImmutable(func, cloner) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return;
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var result = args[0] = cloner.apply(undefined, args);
      func.apply(undefined, args);
      return result;
    };
  }

  /**
   * The base implementation of `convert` which accepts a `util` object of methods
   * required to perform conversions.
   *
   * @param {Object} util The util object.
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
   * @param {boolean} [options.curry=true] Specify currying.
   * @param {boolean} [options.fixed=true] Specify fixed arity.
   * @param {boolean} [options.immutable=true] Specify immutable operations.
   * @param {boolean} [options.rearg=true] Specify rearranging arguments.
   * @returns {Function|Object} Returns the converted function or object.
   */
  function baseConvert(util, name, func, options) {
    var isLib = typeof name == 'function',
        isObj = name === Object(name);

    if (isObj) {
      options = func;
      func = name;
      name = undefined;
    }
    if (func == null) {
      throw new TypeError;
    }
    options || (options = {});

    var config = {
      'cap': 'cap' in options ? options.cap : true,
      'curry': 'curry' in options ? options.curry : true,
      'fixed': 'fixed' in options ? options.fixed : true,
      'immutable': 'immutable' in options ? options.immutable : true,
      'rearg': 'rearg' in options ? options.rearg : true
    };

    var defaultHolder = isLib ? func : placeholder,
        forceCurry = ('curry' in options) && options.curry,
        forceFixed = ('fixed' in options) && options.fixed,
        forceRearg = ('rearg' in options) && options.rearg,
        pristine = isLib ? func.runInContext() : undefined;

    var helpers = isLib ? func : {
      'ary': util.ary,
      'assign': util.assign,
      'clone': util.clone,
      'curry': util.curry,
      'forEach': util.forEach,
      'isArray': util.isArray,
      'isError': util.isError,
      'isFunction': util.isFunction,
      'isWeakMap': util.isWeakMap,
      'iteratee': util.iteratee,
      'keys': util.keys,
      'rearg': util.rearg,
      'toInteger': util.toInteger,
      'toPath': util.toPath
    };

    var ary = helpers.ary,
        assign = helpers.assign,
        clone = helpers.clone,
        curry = helpers.curry,
        each = helpers.forEach,
        isArray = helpers.isArray,
        isError = helpers.isError,
        isFunction = helpers.isFunction,
        isWeakMap = helpers.isWeakMap,
        keys = helpers.keys,
        rearg = helpers.rearg,
        toInteger = helpers.toInteger,
        toPath = helpers.toPath;

    var aryMethodKeys = keys(_mapping.aryMethod);

    var wrappers = {
      'castArray': function(castArray) {
        return function() {
          var value = arguments[0];
          return isArray(value)
            ? castArray(cloneArray(value))
            : castArray.apply(undefined, arguments);
        };
      },
      'iteratee': function(iteratee) {
        return function() {
          var func = arguments[0],
              arity = arguments[1],
              result = iteratee(func, arity),
              length = result.length;

          if (config.cap && typeof arity == 'number') {
            arity = arity > 2 ? (arity - 2) : 1;
            return (length && length <= arity) ? result : baseAry(result, arity);
          }
          return result;
        };
      },
      'mixin': function(mixin) {
        return function(source) {
          var func = this;
          if (!isFunction(func)) {
            return mixin(func, Object(source));
          }
          var pairs = [];
          each(keys(source), function(key) {
            if (isFunction(source[key])) {
              pairs.push([key, func.prototype[key]]);
            }
          });

          mixin(func, Object(source));

          each(pairs, function(pair) {
            var value = pair[1];
            if (isFunction(value)) {
              func.prototype[pair[0]] = value;
            } else {
              delete func.prototype[pair[0]];
            }
          });
          return func;
        };
      },
      'nthArg': function(nthArg) {
        return function(n) {
          var arity = n < 0 ? 1 : (toInteger(n) + 1);
          return curry(nthArg(n), arity);
        };
      },
      'rearg': function(rearg) {
        return function(func, indexes) {
          var arity = indexes ? indexes.length : 0;
          return curry(rearg(func, indexes), arity);
        };
      },
      'runInContext': function(runInContext) {
        return function(context) {
          return baseConvert(util, runInContext(context), options);
        };
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * Casts `func` to a function with an arity capped iteratee if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @returns {Function} Returns the cast function.
     */
    function castCap(name, func) {
      if (config.cap) {
        var indexes = _mapping.iterateeRearg[name];
        if (indexes) {
          return iterateeRearg(func, indexes);
        }
        var n = !isLib && _mapping.iterateeAry[name];
        if (n) {
          return iterateeAry(func, n);
        }
      }
      return func;
    }

    /**
     * Casts `func` to a curried function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity of `func`.
     * @returns {Function} Returns the cast function.
     */
    function castCurry(name, func, n) {
      return (forceCurry || (config.curry && n > 1))
        ? curry(func, n)
        : func;
    }

    /**
     * Casts `func` to a fixed arity function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity cap.
     * @returns {Function} Returns the cast function.
     */
    function castFixed(name, func, n) {
      if (config.fixed && (forceFixed || !_mapping.skipFixed[name])) {
        var data = _mapping.methodSpread[name],
            start = data && data.start;

        return start  === undefined ? ary(func, n) : flatSpread(func, start);
      }
      return func;
    }

    /**
     * Casts `func` to an rearged function if needed.
     *
     * @private
     * @param {string} name The name of the function to inspect.
     * @param {Function} func The function to inspect.
     * @param {number} n The arity of `func`.
     * @returns {Function} Returns the cast function.
     */
    function castRearg(name, func, n) {
      return (config.rearg && n > 1 && (forceRearg || !_mapping.skipRearg[name]))
        ? rearg(func, _mapping.methodRearg[name] || _mapping.aryRearg[n])
        : func;
    }

    /**
     * Creates a clone of `object` by `path`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {Array|string} path The path to clone by.
     * @returns {Object} Returns the cloned object.
     */
    function cloneByPath(object, path) {
      path = toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          result = clone(Object(object)),
          nested = result;

      while (nested != null && ++index < length) {
        var key = path[index],
            value = nested[key];

        if (value != null &&
            !(isFunction(value) || isError(value) || isWeakMap(value))) {
          nested[key] = clone(index == lastIndex ? value : Object(value));
        }
        nested = nested[key];
      }
      return result;
    }

    /**
     * Converts `lodash` to an immutable auto-curried iteratee-first data-last
     * version with conversion `options` applied.
     *
     * @param {Object} [options] The options object. See `baseConvert` for more details.
     * @returns {Function} Returns the converted `lodash`.
     */
    function convertLib(options) {
      return _.runInContext.convert(options)(undefined);
    }

    /**
     * Create a converter function for `func` of `name`.
     *
     * @param {string} name The name of the function to convert.
     * @param {Function} func The function to convert.
     * @returns {Function} Returns the new converter function.
     */
    function createConverter(name, func) {
      var realName = _mapping.aliasToReal[name] || name,
          methodName = _mapping.remap[realName] || realName,
          oldOptions = options;

      return function(options) {
        var newUtil = isLib ? pristine : helpers,
            newFunc = isLib ? pristine[methodName] : func,
            newOptions = assign(assign({}, oldOptions), options);

        return baseConvert(newUtil, realName, newFunc, newOptions);
      };
    }

    /**
     * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
     * arguments, ignoring any additional arguments.
     *
     * @private
     * @param {Function} func The function to cap iteratee arguments for.
     * @param {number} n The arity cap.
     * @returns {Function} Returns the new function.
     */
    function iterateeAry(func, n) {
      return overArg(func, function(func) {
        return typeof func == 'function' ? baseAry(func, n) : func;
      });
    }

    /**
     * Creates a function that wraps `func` to invoke its iteratee with arguments
     * arranged according to the specified `indexes` where the argument value at
     * the first index is provided as the first argument, the argument value at
     * the second index is provided as the second argument, and so on.
     *
     * @private
     * @param {Function} func The function to rearrange iteratee arguments for.
     * @param {number[]} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     */
    function iterateeRearg(func, indexes) {
      return overArg(func, function(func) {
        var n = indexes.length;
        return baseArity(rearg(baseAry(func, n), indexes), n);
      });
    }

    /**
     * Creates a function that invokes `func` with its first argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function() {
        var length = arguments.length;
        if (!length) {
          return func();
        }
        var args = Array(length);
        while (length--) {
          args[length] = arguments[length];
        }
        var index = config.rearg ? 0 : (length - 1);
        args[index] = transform(args[index]);
        return func.apply(undefined, args);
      };
    }

    /**
     * Creates a function that wraps `func` and applys the conversions
     * rules by `name`.
     *
     * @private
     * @param {string} name The name of the function to wrap.
     * @param {Function} func The function to wrap.
     * @returns {Function} Returns the converted function.
     */
    function wrap(name, func, placeholder) {
      var result,
          realName = _mapping.aliasToReal[name] || name,
          wrapped = func,
          wrapper = wrappers[realName];

      if (wrapper) {
        wrapped = wrapper(func);
      }
      else if (config.immutable) {
        if (_mapping.mutate.array[realName]) {
          wrapped = wrapImmutable(func, cloneArray);
        }
        else if (_mapping.mutate.object[realName]) {
          wrapped = wrapImmutable(func, createCloner(func));
        }
        else if (_mapping.mutate.set[realName]) {
          wrapped = wrapImmutable(func, cloneByPath);
        }
      }
      each(aryMethodKeys, function(aryKey) {
        each(_mapping.aryMethod[aryKey], function(otherName) {
          if (realName == otherName) {
            var data = _mapping.methodSpread[realName],
                afterRearg = data && data.afterRearg;

            result = afterRearg
              ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
              : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

            result = castCap(realName, result);
            result = castCurry(realName, result, aryKey);
            return false;
          }
        });
        return !result;
      });

      result || (result = wrapped);
      if (result == func) {
        result = forceCurry ? curry(result, 1) : function() {
          return func.apply(this, arguments);
        };
      }
      result.convert = createConverter(realName, func);
      result.placeholder = func.placeholder = placeholder;

      return result;
    }

    /*--------------------------------------------------------------------------*/

    if (!isObj) {
      return wrap(name, func, defaultHolder);
    }
    var _ = func;

    // Convert methods by ary cap.
    var pairs = [];
    each(aryMethodKeys, function(aryKey) {
      each(_mapping.aryMethod[aryKey], function(key) {
        var func = _[_mapping.remap[key] || key];
        if (func) {
          pairs.push([key, wrap(key, func, _)]);
        }
      });
    });

    // Convert remaining methods.
    each(keys(_), function(key) {
      var func = _[key];
      if (typeof func == 'function') {
        var length = pairs.length;
        while (length--) {
          if (pairs[length][0] == key) {
            return;
          }
        }
        func.convert = createConverter(key, func);
        pairs.push([key, func]);
      }
    });

    // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
    each(pairs, function(pair) {
      _[pair[0]] = pair[1];
    });

    _.convert = convertLib;
    _.placeholder = _;

    // Assign aliases.
    each(keys(_), function(key) {
      each(_mapping.realToAlias[key] || [], function(alias) {
        _[alias] = _[key];
      });
    });

    return _;
  }

  var _baseConvert = baseConvert;

  /** Used to store function metadata. */
  var metaMap = _WeakMap && new _WeakMap;

  var _metaMap = metaMap;

  /**
   * The base implementation of `setData` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var baseSetData = !_metaMap ? identity_1 : function(func, data) {
    _metaMap.set(func, data);
    return func;
  };

  var _baseSetData = baseSetData;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Creates a function that produces an instance of `Ctor` regardless of
   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
   *
   * @private
   * @param {Function} Ctor The constructor to wrap.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCtor(Ctor) {
    return function() {
      // Use a `switch` statement to work with class constructors. See
      // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
      // for more details.
      var args = arguments;
      switch (args.length) {
        case 0: return new Ctor;
        case 1: return new Ctor(args[0]);
        case 2: return new Ctor(args[0], args[1]);
        case 3: return new Ctor(args[0], args[1], args[2]);
        case 4: return new Ctor(args[0], args[1], args[2], args[3]);
        case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
        case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      }
      var thisBinding = _baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, args);

      // Mimic the constructor's `return` behavior.
      // See https://es5.github.io/#x13.2.2 for more details.
      return isObject_1(result) ? result : thisBinding;
    };
  }

  var _createCtor = createCtor;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1;

  /**
   * Creates a function that wraps `func` to invoke it with the optional `this`
   * binding of `thisArg`.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createBind(func, bitmask, thisArg) {
    var isBind = bitmask & WRAP_BIND_FLAG,
        Ctor = _createCtor(func);

    function wrapper() {
      var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
  }

  var _createBind = createBind;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$2 = Math.max;

  /**
   * Creates an array that is the composition of partially applied arguments,
   * placeholders, and provided arguments into a single array of arguments.
   *
   * @private
   * @param {Array} args The provided arguments.
   * @param {Array} partials The arguments to prepend to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @params {boolean} [isCurried] Specify composing for a curried function.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgs(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersLength = holders.length,
        leftIndex = -1,
        leftLength = partials.length,
        rangeLength = nativeMax$2(argsLength - holdersLength, 0),
        result = Array(leftLength + rangeLength),
        isUncurried = !isCurried;

    while (++leftIndex < leftLength) {
      result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
    }
    while (rangeLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }

  var _composeArgs = composeArgs;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$3 = Math.max;

  /**
   * This function is like `composeArgs` except that the arguments composition
   * is tailored for `_.partialRight`.
   *
   * @private
   * @param {Array} args The provided arguments.
   * @param {Array} partials The arguments to append to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @params {boolean} [isCurried] Specify composing for a curried function.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgsRight(args, partials, holders, isCurried) {
    var argsIndex = -1,
        argsLength = args.length,
        holdersIndex = -1,
        holdersLength = holders.length,
        rightIndex = -1,
        rightLength = partials.length,
        rangeLength = nativeMax$3(argsLength - holdersLength, 0),
        result = Array(rangeLength + rightLength),
        isUncurried = !isCurried;

    while (++argsIndex < rangeLength) {
      result[argsIndex] = args[argsIndex];
    }
    var offset = argsIndex;
    while (++rightIndex < rightLength) {
      result[offset + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
      if (isUncurried || argsIndex < argsLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
    }
    return result;
  }

  var _composeArgsRight = composeArgsRight;

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  var _countHolders = countHolders;

  /**
   * The function whose prototype chain sequence wrappers inherit from.
   *
   * @private
   */
  function baseLodash() {
    // No operation performed.
  }

  var _baseLodash = baseLodash;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295;

  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @constructor
   * @param {*} value The value to wrap.
   */
  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
  }

  // Ensure `LazyWrapper` is an instance of `baseLodash`.
  LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;

  var _LazyWrapper = LazyWrapper;

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {
    // No operation performed.
  }

  var noop_1 = noop;

  /**
   * Gets metadata for `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {*} Returns the metadata for `func`.
   */
  var getData = !_metaMap ? noop_1 : function(func) {
    return _metaMap.get(func);
  };

  var _getData = getData;

  /** Used to lookup unminified function names. */
  var realNames = {};

  var _realNames = realNames;

  /** Used for built-in method references. */
  var objectProto$e = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$e.hasOwnProperty;

  /**
   * Gets the name of `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {string} Returns the function name.
   */
  function getFuncName(func) {
    var result = (func.name + ''),
        array = _realNames[result],
        length = hasOwnProperty$b.call(_realNames, result) ? array.length : 0;

    while (length--) {
      var data = array[length],
          otherFunc = data.func;
      if (otherFunc == null || otherFunc == func) {
        return data.name;
      }
    }
    return result;
  }

  var _getFuncName = getFuncName;

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */
  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
  }

  LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  var _LodashWrapper = LodashWrapper;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * Creates a clone of `wrapper`.
   *
   * @private
   * @param {Object} wrapper The wrapper to clone.
   * @returns {Object} Returns the cloned wrapper.
   */
  function wrapperClone(wrapper) {
    if (wrapper instanceof _LazyWrapper) {
      return wrapper.clone();
    }
    var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = _copyArray(wrapper.__actions__);
    result.__index__  = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
  }

  var _wrapperClone = wrapperClone;

  /** Used for built-in method references. */
  var objectProto$f = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$f.hasOwnProperty;

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array and iteratees accept only
   * one argument. The heuristic for whether a section qualifies for shortcut
   * fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash(value) {
    if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
      if (value instanceof _LodashWrapper) {
        return value;
      }
      if (hasOwnProperty$c.call(value, '__wrapped__')) {
        return _wrapperClone(value);
      }
    }
    return new _LodashWrapper(value);
  }

  // Ensure wrappers are instances of `baseLodash`.
  lodash.prototype = _baseLodash.prototype;
  lodash.prototype.constructor = lodash;

  var wrapperLodash = lodash;

  /**
   * Checks if `func` has a lazy counterpart.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
   *  else `false`.
   */
  function isLaziable(func) {
    var funcName = _getFuncName(func),
        other = wrapperLodash[funcName];

    if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
      return false;
    }
    if (func === other) {
      return true;
    }
    var data = _getData(other);
    return !!data && func === data[0];
  }

  var _isLaziable = isLaziable;

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity
   * function to avoid garbage collection pauses in V8. See
   * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = _shortOut(_baseSetData);

  var _setData = setData;

  /** Used to match wrap detail comments. */
  var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /**
   * Extracts wrapper details from the `source` body comment.
   *
   * @private
   * @param {string} source The source to inspect.
   * @returns {Array} Returns the wrapper details.
   */
  function getWrapDetails(source) {
    var match = source.match(reWrapDetails);
    return match ? match[1].split(reSplitDetails) : [];
  }

  var _getWrapDetails = getWrapDetails;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

  /**
   * Inserts wrapper `details` in a comment at the top of the `source` body.
   *
   * @private
   * @param {string} source The source to modify.
   * @returns {Array} details The details to insert.
   * @returns {string} Returns the modified source.
   */
  function insertWrapDetails(source, details) {
    var length = details.length;
    if (!length) {
      return source;
    }
    var lastIndex = length - 1;
    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
    details = details.join(length > 2 ? ', ' : ' ');
    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
  }

  var _insertWrapDetails = insertWrapDetails;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$1 = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG$1],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /**
   * Updates wrapper `details` based on `bitmask` flags.
   *
   * @private
   * @returns {Array} details The details to modify.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @returns {Array} Returns `details`.
   */
  function updateWrapDetails(details, bitmask) {
    _arrayEach(wrapFlags, function(pair) {
      var value = '_.' + pair[0];
      if ((bitmask & pair[1]) && !_arrayIncludes(details, value)) {
        details.push(value);
      }
    });
    return details.sort();
  }

  var _updateWrapDetails = updateWrapDetails;

  /**
   * Sets the `toString` method of `wrapper` to mimic the source of `reference`
   * with wrapper details in a comment at the top of the source body.
   *
   * @private
   * @param {Function} wrapper The function to modify.
   * @param {Function} reference The reference function.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @returns {Function} Returns `wrapper`.
   */
  function setWrapToString(wrapper, reference, bitmask) {
    var source = (reference + '');
    return _setToString(wrapper, _insertWrapDetails(source, _updateWrapDetails(_getWrapDetails(source), bitmask)));
  }

  var _setWrapToString = setWrapToString;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$2 = 1,
      WRAP_BIND_KEY_FLAG$1 = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG$1 = 8,
      WRAP_PARTIAL_FLAG$1 = 32,
      WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

  /**
   * Creates a function that wraps `func` to continue currying.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {Function} wrapFunc The function to create the `func` wrapper.
   * @param {*} placeholder The placeholder value.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to
   *  the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
    var isCurry = bitmask & WRAP_CURRY_FLAG$1,
        newHolders = isCurry ? holders : undefined,
        newHoldersRight = isCurry ? undefined : holders,
        newPartials = isCurry ? partials : undefined,
        newPartialsRight = isCurry ? undefined : partials;

    bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

    if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
      bitmask &= ~(WRAP_BIND_FLAG$2 | WRAP_BIND_KEY_FLAG$1);
    }
    var newData = [
      func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
      newHoldersRight, argPos, ary, arity
    ];

    var result = wrapFunc.apply(undefined, newData);
    if (_isLaziable(func)) {
      _setData(result, newData);
    }
    result.placeholder = placeholder;
    return _setWrapToString(result, func, bitmask);
  }

  var _createRecurry = createRecurry;

  /**
   * Gets the argument placeholder value for `func`.
   *
   * @private
   * @param {Function} func The function to inspect.
   * @returns {*} Returns the placeholder value.
   */
  function getHolder(func) {
    var object = func;
    return object.placeholder;
  }

  var _getHolder = getHolder;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin$1 = Math.min;

  /**
   * Reorder `array` according to the specified indexes where the element at
   * the first index is assigned as the first element, the element at
   * the second index is assigned as the second element, and so on.
   *
   * @private
   * @param {Array} array The array to reorder.
   * @param {Array} indexes The arranged array indexes.
   * @returns {Array} Returns `array`.
   */
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = nativeMin$1(indexes.length, arrLength),
        oldArray = _copyArray(array);

    while (length--) {
      var index = indexes[length];
      array[length] = _isIndex(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }

  var _reorder = reorder;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  var _replaceHolders = replaceHolders;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$3 = 1,
      WRAP_BIND_KEY_FLAG$2 = 2,
      WRAP_CURRY_FLAG$2 = 8,
      WRAP_CURRY_RIGHT_FLAG$1 = 16,
      WRAP_ARY_FLAG$1 = 128,
      WRAP_FLIP_FLAG$1 = 512;

  /**
   * Creates a function that wraps `func` to invoke it with optional `this`
   * binding of `thisArg`, partial application, and currying.
   *
   * @private
   * @param {Function|string} func The function or method name to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to
   *  the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [partialsRight] The arguments to append to those provided
   *  to the new function.
   * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & WRAP_ARY_FLAG$1,
        isBind = bitmask & WRAP_BIND_FLAG$3,
        isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
        isCurried = bitmask & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1),
        isFlip = bitmask & WRAP_FLIP_FLAG$1,
        Ctor = isBindKey ? undefined : _createCtor(func);

    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length;

      while (index--) {
        args[index] = arguments[index];
      }
      if (isCurried) {
        var placeholder = _getHolder(wrapper),
            holdersCount = _countHolders(args, placeholder);
      }
      if (partials) {
        args = _composeArgs(args, partials, holders, isCurried);
      }
      if (partialsRight) {
        args = _composeArgsRight(args, partialsRight, holdersRight, isCurried);
      }
      length -= holdersCount;
      if (isCurried && length < arity) {
        var newHolders = _replaceHolders(args, placeholder);
        return _createRecurry(
          func, bitmask, createHybrid, wrapper.placeholder, thisArg,
          args, newHolders, argPos, ary, arity - length
        );
      }
      var thisBinding = isBind ? thisArg : this,
          fn = isBindKey ? thisBinding[func] : func;

      length = args.length;
      if (argPos) {
        args = _reorder(args, argPos);
      } else if (isFlip && length > 1) {
        args.reverse();
      }
      if (isAry && ary < length) {
        args.length = ary;
      }
      if (this && this !== _root && this instanceof wrapper) {
        fn = Ctor || _createCtor(fn);
      }
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }

  var _createHybrid = createHybrid;

  /**
   * Creates a function that wraps `func` to enable currying.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {number} arity The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCurry(func, bitmask, arity) {
    var Ctor = _createCtor(func);

    function wrapper() {
      var length = arguments.length,
          args = Array(length),
          index = length,
          placeholder = _getHolder(wrapper);

      while (index--) {
        args[index] = arguments[index];
      }
      var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
        ? []
        : _replaceHolders(args, placeholder);

      length -= holders.length;
      if (length < arity) {
        return _createRecurry(
          func, bitmask, _createHybrid, wrapper.placeholder, undefined,
          args, holders, undefined, undefined, arity - length);
      }
      var fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;
      return _apply(fn, this, args);
    }
    return wrapper;
  }

  var _createCurry = createCurry;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$4 = 1;

  /**
   * Creates a function that wraps `func` to invoke it with the `this` binding
   * of `thisArg` and `partials` prepended to the arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to
   *  the new function.
   * @returns {Function} Returns the new wrapped function.
   */
  function createPartial(func, bitmask, thisArg, partials) {
    var isBind = bitmask & WRAP_BIND_FLAG$4,
        Ctor = _createCtor(func);

    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = (this && this !== _root && this instanceof wrapper) ? Ctor : func;

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      return _apply(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  var _createPartial = createPartial;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER$1 = '__lodash_placeholder__';

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$5 = 1,
      WRAP_BIND_KEY_FLAG$3 = 2,
      WRAP_CURRY_BOUND_FLAG$1 = 4,
      WRAP_CURRY_FLAG$3 = 8,
      WRAP_ARY_FLAG$2 = 128,
      WRAP_REARG_FLAG$1 = 256;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin$2 = Math.min;

  /**
   * Merges the function metadata of `source` into `data`.
   *
   * Merging metadata reduces the number of wrappers used to invoke a function.
   * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
   * may be applied regardless of execution order. Methods like `_.ary` and
   * `_.rearg` modify function arguments, making the order in which they are
   * executed important, preventing the merging of metadata. However, we make
   * an exception for a safe combined case where curried functions have `_.ary`
   * and or `_.rearg` applied.
   *
   * @private
   * @param {Array} data The destination metadata.
   * @param {Array} source The source metadata.
   * @returns {Array} Returns `data`.
   */
  function mergeData(data, source) {
    var bitmask = data[1],
        srcBitmask = source[1],
        newBitmask = bitmask | srcBitmask,
        isCommon = newBitmask < (WRAP_BIND_FLAG$5 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2);

    var isCombo =
      ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_CURRY_FLAG$3)) ||
      ((srcBitmask == WRAP_ARY_FLAG$2) && (bitmask == WRAP_REARG_FLAG$1) && (data[7].length <= source[8])) ||
      ((srcBitmask == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$1)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$3));

    // Exit early if metadata can't be merged.
    if (!(isCommon || isCombo)) {
      return data;
    }
    // Use source `thisArg` if available.
    if (srcBitmask & WRAP_BIND_FLAG$5) {
      data[2] = source[2];
      // Set when currying a bound function.
      newBitmask |= bitmask & WRAP_BIND_FLAG$5 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
    }
    // Compose partial arguments.
    var value = source[3];
    if (value) {
      var partials = data[3];
      data[3] = partials ? _composeArgs(partials, value, source[4]) : value;
      data[4] = partials ? _replaceHolders(data[3], PLACEHOLDER$1) : source[4];
    }
    // Compose partial right arguments.
    value = source[5];
    if (value) {
      partials = data[5];
      data[5] = partials ? _composeArgsRight(partials, value, source[6]) : value;
      data[6] = partials ? _replaceHolders(data[5], PLACEHOLDER$1) : source[6];
    }
    // Use source `argPos` if available.
    value = source[7];
    if (value) {
      data[7] = value;
    }
    // Use source `ary` if it's smaller.
    if (srcBitmask & WRAP_ARY_FLAG$2) {
      data[8] = data[8] == null ? source[8] : nativeMin$2(data[8], source[8]);
    }
    // Use source `arity` if one is not provided.
    if (data[9] == null) {
      data[9] = source[9];
    }
    // Use source `func` and merge bitmasks.
    data[0] = source[0];
    data[1] = newBitmask;

    return data;
  }

  var _mergeData = mergeData;

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG$6 = 1,
      WRAP_BIND_KEY_FLAG$4 = 2,
      WRAP_CURRY_FLAG$4 = 8,
      WRAP_CURRY_RIGHT_FLAG$2 = 16,
      WRAP_PARTIAL_FLAG$2 = 32,
      WRAP_PARTIAL_RIGHT_FLAG$2 = 64;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$4 = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to wrap.
   * @param {number} bitmask The bitmask flags.
   *    1 - `_.bind`
   *    2 - `_.bindKey`
   *    4 - `_.curry` or `_.curryRight` of a bound function
   *    8 - `_.curry`
   *   16 - `_.curryRight`
   *   32 - `_.partial`
   *   64 - `_.partialRight`
   *  128 - `_.rearg`
   *  256 - `_.ary`
   *  512 - `_.flip`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG$4;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(WRAP_PARTIAL_FLAG$2 | WRAP_PARTIAL_RIGHT_FLAG$2);
      partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax$4(toInteger_1(ary), 0);
    arity = arity === undefined ? arity : toInteger_1(arity);
    length -= holders ? holders.length : 0;

    if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = undefined;
    }
    var data = isBindKey ? undefined : _getData(func);

    var newData = [
      func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
      argPos, ary, arity
    ];

    if (data) {
      _mergeData(newData, data);
    }
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] === undefined
      ? (isBindKey ? 0 : func.length)
      : nativeMax$4(newData[9] - length, 0);

    if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
      bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
    }
    if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
      var result = _createBind(func, bitmask, thisArg);
    } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
      result = _createCurry(func, bitmask, arity);
    } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
      result = _createPartial(func, bitmask, thisArg, partials);
    } else {
      result = _createHybrid.apply(undefined, newData);
    }
    var setter = data ? _baseSetData : _setData;
    return _setWrapToString(setter(result, newData), func, bitmask);
  }

  var _createWrap = createWrap;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_ARY_FLAG$3 = 128;

  /**
   * Creates a function that invokes `func`, with up to `n` arguments,
   * ignoring any additional arguments.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to cap arguments for.
   * @param {number} [n=func.length] The arity cap.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new capped function.
   * @example
   *
   * _.map(['6', '8', '10'], _.ary(parseInt, 1));
   * // => [6, 8, 10]
   */
  function ary(func, n, guard) {
    n = guard ? undefined : n;
    n = (func && n == null) ? func.length : n;
    return _createWrap(func, WRAP_ARY_FLAG$3, undefined, undefined, undefined, undefined, n);
  }

  var ary_1 = ary;

  /** Used for built-in method references. */
  var objectProto$g = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$d = objectProto$g.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$d.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$h = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$e = objectProto$h.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$e.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$1(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn$1;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /** Used for built-in method references. */
  var objectProto$i = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$f = objectProto$i.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$f.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag$2 = '[object Symbol]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$3 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return _cloneArrayBuffer(object);

      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object);

      case dataViewTag$3:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$4:
        return new Ctor;

      case numberTag$2:
      case stringTag$2:
        return new Ctor(object);

      case regexpTag$2:
        return _cloneRegExp(object);

      case setTag$4:
        return new Ctor;

      case symbolTag$2:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$5 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$5;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$5 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$5;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** `Object#toString` result references. */
  var argsTag$3 = '[object Arguments]',
      arrayTag$2 = '[object Array]',
      boolTag$3 = '[object Boolean]',
      dateTag$3 = '[object Date]',
      errorTag$2 = '[object Error]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      mapTag$6 = '[object Map]',
      numberTag$3 = '[object Number]',
      objectTag$3 = '[object Object]',
      regexpTag$3 = '[object RegExp]',
      setTag$6 = '[object Set]',
      stringTag$3 = '[object String]',
      symbolTag$3 = '[object Symbol]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$3 = '[object ArrayBuffer]',
      dataViewTag$4 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
  cloneableTags[arrayBufferTag$3] = cloneableTags[dataViewTag$4] =
  cloneableTags[boolTag$3] = cloneableTags[dateTag$3] =
  cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
  cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
  cloneableTags[int32Tag$2] = cloneableTags[mapTag$6] =
  cloneableTags[numberTag$3] = cloneableTags[objectTag$3] =
  cloneableTags[regexpTag$3] = cloneableTags[setTag$6] =
  cloneableTags[stringTag$3] = cloneableTags[symbolTag$3] =
  cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
  cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
  cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
  cloneableTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag$2 || tag == genTag$1;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$3 || tag == argsTag$3 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_SYMBOLS_FLAG$1 = 4;

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return _baseClone(value, CLONE_SYMBOLS_FLAG$1);
  }

  var clone_1 = clone;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_CURRY_FLAG$5 = 8;

  /**
   * Creates a function that accepts arguments of `func` and either invokes
   * `func` returning its result, if at least `arity` number of arguments have
   * been provided, or returns a function that accepts the remaining `func`
   * arguments, and so on. The arity of `func` may be specified if `func.length`
   * is not sufficient.
   *
   * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for provided arguments.
   *
   * **Note:** This method doesn't set the "length" property of curried functions.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Function
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var abc = function(a, b, c) {
   *   return [a, b, c];
   * };
   *
   * var curried = _.curry(abc);
   *
   * curried(1)(2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2, 3);
   * // => [1, 2, 3]
   *
   * // Curried with placeholders.
   * curried(1)(_, 3)(2);
   * // => [1, 2, 3]
   */
  function curry(func, arity, guard) {
    arity = guard ? undefined : arity;
    var result = _createWrap(func, WRAP_CURRY_FLAG$5, undefined, undefined, undefined, undefined, undefined, arity);
    result.placeholder = curry.placeholder;
    return result;
  }

  // Assign default placeholders.
  curry.placeholder = {};

  var curry_1 = curry;

  /** `Object#toString` result references. */
  var objectTag$4 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$j = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$g = objectProto$j.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString$2.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$4) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$g.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString$2.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /** `Object#toString` result references. */
  var domExcTag = '[object DOMException]',
      errorTag$3 = '[object Error]';

  /**
   * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
   * `SyntaxError`, `TypeError`, or `URIError` object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
   * @example
   *
   * _.isError(new Error);
   * // => true
   *
   * _.isError(Error);
   * // => false
   */
  function isError(value) {
    if (!isObjectLike_1(value)) {
      return false;
    }
    var tag = _baseGetTag(value);
    return tag == errorTag$3 || tag == domExcTag ||
      (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject_1(value));
  }

  var isError_1 = isError;

  /** `Object#toString` result references. */
  var weakMapTag$3 = '[object WeakMap]';

  /**
   * Checks if `value` is classified as a `WeakMap` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
   * @example
   *
   * _.isWeakMap(new WeakMap);
   * // => true
   *
   * _.isWeakMap(new Map);
   * // => false
   */
  function isWeakMap(value) {
    return isObjectLike_1(value) && _getTag(value) == weakMapTag$3;
  }

  var isWeakMap_1 = isWeakMap;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1;

  /**
   * Creates a function that invokes `func` with the arguments of the created
   * function. If `func` is a property name, the created function returns the
   * property value for a given element. If `func` is an array or object, the
   * created function returns `true` for elements that contain the equivalent
   * source properties, otherwise it returns `false`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Util
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, _.iteratee(['user', 'fred']));
   * // => [{ 'user': 'fred', 'age': 40 }]
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, _.iteratee('user'));
   * // => ['barney', 'fred']
   *
   * // Create custom iteratee shorthands.
   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
   *     return func.test(string);
   *   };
   * });
   *
   * _.filter(['abc', 'def'], /ef/);
   * // => ['def']
   */
  function iteratee(func) {
    return _baseIteratee(typeof func == 'function' ? func : _baseClone(func, CLONE_DEEP_FLAG$1));
  }

  var iteratee_1 = iteratee;

  /** Built-in value references. */
  var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray_1(value) || isArguments_1(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  var _isFlattenable = isFlattenable;

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = _isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          _arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  var _baseFlatten = baseFlatten;

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten(array, 1) : [];
  }

  var flatten_1 = flatten;

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return _setToString(_overRest(func, undefined, flatten_1), func + '');
  }

  var _flatRest = flatRest;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_REARG_FLAG$2 = 256;

  /**
   * Creates a function that invokes `func` with arguments arranged according
   * to the specified `indexes` where the argument value at the first index is
   * provided as the first argument, the argument value at the second index is
   * provided as the second argument, and so on.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} func The function to rearrange arguments for.
   * @param {...(number|number[])} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var rearged = _.rearg(function(a, b, c) {
   *   return [a, b, c];
   * }, [2, 0, 1]);
   *
   * rearged('b', 'c', 'a')
   * // => ['a', 'b', 'c']
   */
  var rearg = _flatRest(function(func, indexes) {
    return _createWrap(func, WRAP_REARG_FLAG$2, undefined, undefined, undefined, indexes);
  });

  var rearg_1 = rearg;

  /**
   * Converts `value` to a property path array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Util
   * @param {*} value The value to convert.
   * @returns {Array} Returns the new property path array.
   * @example
   *
   * _.toPath('a.b.c');
   * // => ['a', 'b', 'c']
   *
   * _.toPath('a[0].b.c');
   * // => ['a', '0', 'b', 'c']
   */
  function toPath(value) {
    if (isArray_1(value)) {
      return _arrayMap(value, _toKey);
    }
    return isSymbol_1(value) ? [value] : _copyArray(_stringToPath(toString_1(value)));
  }

  var toPath_1 = toPath;

  var _util = {
    'ary': ary_1,
    'assign': _baseAssign,
    'clone': clone_1,
    'curry': curry_1,
    'forEach': _arrayEach,
    'isArray': isArray_1,
    'isError': isError_1,
    'isFunction': isFunction_1,
    'isWeakMap': isWeakMap_1,
    'iteratee': iteratee_1,
    'keys': _baseKeys,
    'rearg': rearg_1,
    'toInteger': toInteger_1,
    'toPath': toPath_1
  };

  /**
   * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied. If `name` is an object its methods
   * will be converted.
   *
   * @param {string} name The name of the function to wrap.
   * @param {Function} [func] The function to wrap.
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function|Object} Returns the converted function or object.
   */
  function convert(name, func, options) {
    return _baseConvert(_util, name, func, options);
  }

  var convert_1 = convert;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE$1 = 200;

  /**
   * The base implementation of methods like `_.difference` without support
   * for excluding multiple arrays or iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;

    if (!length) {
      return result;
    }
    if (iteratee) {
      values = _arrayMap(values, _baseUnary(iteratee));
    }
    if (comparator) {
      includes = _arrayIncludesWith;
      isCommon = false;
    }
    else if (values.length >= LARGE_ARRAY_SIZE$1) {
      includes = _cacheHas;
      isCommon = false;
      values = new _SetCache(values);
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee == null ? value : iteratee(value);

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      }
      else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
    return result;
  }

  var _baseDifference = baseDifference;

  /**
   * Creates an array of `array` values not included in the other given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. The order and references of result values are
   * determined by the first array.
   *
   * **Note:** Unlike `_.pullAll`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.without, _.xor
   * @example
   *
   * _.difference([2, 1], [2, 3]);
   * // => [1]
   */
  var difference = _baseRest(function(array, values) {
    return isArrayLikeObject_1(array)
      ? _baseDifference(array, _baseFlatten(values, 1, isArrayLikeObject_1, true))
      : [];
  });

  var difference_1 = difference;

  var func = convert_1('difference', difference_1);

  func.placeholder = placeholder;

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : _baseSlice(array, start, end);
  }

  var _castSlice = castSlice;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsEndIndex = charsEndIndex;

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsStartIndex = charsStartIndex;

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  var _asciiToArray = asciiToArray;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsZWJ = '\\u200d';

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  var _hasUnicode = hasUnicode;

  /** Used to compose unicode character classes. */
  var rsAstralRange$1 = '\\ud800-\\udfff',
      rsComboMarksRange$1 = '\\u0300-\\u036f',
      reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsVarRange$1 = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange$1 + ']',
      rsCombo = '[' + rsComboRange$1 + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange$1 + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ$1 = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange$1 + ']?',
      rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  var _unicodeToArray = unicodeToArray;

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return _hasUnicode(string)
      ? _unicodeToArray(string)
      : _asciiToArray(string);
  }

  var _stringToArray = stringToArray;

  /** Used to match leading and trailing whitespace. */
  var reTrim$1 = /^\s+|\s+$/g;

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = toString_1(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim$1, '');
    }
    if (!string || !(chars = _baseToString(chars))) {
      return string;
    }
    var strSymbols = _stringToArray(string),
        chrSymbols = _stringToArray(chars),
        start = _charsStartIndex(strSymbols, chrSymbols),
        end = _charsEndIndex(strSymbols, chrSymbols) + 1;

    return _castSlice(strSymbols, start, end).join('');
  }

  var trim_1 = trim;

  var func$1 = convert_1('trim', trim_1);

  func$1.placeholder = placeholder;

  var _falseOptions = {
    'cap': false,
    'curry': false,
    'fixed': false,
    'immutable': false,
    'rearg': false
  };

  var func$2 = convert_1('isObject', isObject_1, _falseOptions);

  func$2.placeholder = placeholder;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject_1(object)) {
      return object;
    }
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = _toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject_1(objValue)
            ? objValue
            : (_isIndex(path[index + 1]) ? [] : {});
        }
      }
      _assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  var _baseSet = baseSet;

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
      var path = paths[index],
          value = _baseGet(object, path);

      if (predicate(value, path)) {
        _baseSet(result, _castPath(path, object), value);
      }
    }
    return result;
  }

  var _basePickBy = basePickBy;

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, paths) {
    return _basePickBy(object, paths, function(value, path) {
      return hasIn_1(object, path);
    });
  }

  var _basePick = basePick;

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = _flatRest(function(object, paths) {
    return object == null ? {} : _basePick(object, paths);
  });

  var pick_1 = pick;

  var func$3 = convert_1('pick', pick_1);

  func$3.placeholder = placeholder;

  var func$4 = convert_1('keys', keys_1, _falseOptions);

  func$4.placeholder = placeholder;

  var func$5 = convert_1('isPlainObject', isPlainObject_1, _falseOptions);

  func$5.placeholder = placeholder;

  var func$6 = convert_1('isFunction', isFunction_1, _falseOptions);

  func$6.placeholder = placeholder;

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are falsey.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var compact_1 = compact;

  var func$7 = convert_1('compact', compact_1, _falseOptions);

  func$7.placeholder = placeholder;

  /**
   * Checks if `value` is `null` or `undefined`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   * @example
   *
   * _.isNil(null);
   * // => true
   *
   * _.isNil(void 0);
   * // => true
   *
   * _.isNil(NaN);
   * // => false
   */
  function isNil$1(value) {
    return value == null;
  }

  var isNil_1 = isNil$1;

  var func$8 = convert_1('isNil', isNil_1, _falseOptions);

  func$8.placeholder = placeholder;

  /**
   * Creates a slice of `array` with `n` elements taken from the beginning.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.take([1, 2, 3]);
   * // => [1]
   *
   * _.take([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.take([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.take([1, 2, 3], 0);
   * // => []
   */
  function take(array, n, guard) {
    if (!(array && array.length)) {
      return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_1(n);
    return _baseSlice(array, 0, n < 0 ? 0 : n);
  }

  var take_1 = take;

  var func$9 = convert_1('take', take_1);

  func$9.placeholder = placeholder;

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike_1(collection) ? Array(collection.length) : [];

    _baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  var _baseMap = baseMap;

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  var _baseSortBy = baseSortBy;

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
          valIsNull = value === null,
          valIsReflexive = value === value,
          valIsSymbol = isSymbol_1(value);

      var othIsDefined = other !== undefined,
          othIsNull = other === null,
          othIsReflexive = other === other,
          othIsSymbol = isSymbol_1(other);

      if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
          (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
          (valIsNull && othIsDefined && othIsReflexive) ||
          (!valIsDefined && othIsReflexive) ||
          !valIsReflexive) {
        return 1;
      }
      if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
          (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
          (othIsNull && valIsDefined && valIsReflexive) ||
          (!othIsDefined && valIsReflexive) ||
          !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }

  var _compareAscending = compareAscending;

  /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = _compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * (order == 'desc' ? -1 : 1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  var _compareMultiple = compareMultiple;

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = _arrayMap(iteratees.length ? iteratees : [identity_1], _baseUnary(_baseIteratee));

    var result = _baseMap(collection, function(value, key, collection) {
      var criteria = _arrayMap(iteratees, function(iteratee) {
        return iteratee(value);
      });
      return { 'criteria': criteria, 'index': ++index, 'value': value };
    });

    return _baseSortBy(result, function(object, other) {
      return _compareMultiple(object, other, orders);
    });
  }

  var _baseOrderBy = baseOrderBy;

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, [function(o) { return o.user; }]);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
   */
  var sortBy = _baseRest(function(collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length = iteratees.length;
    if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length > 2 && _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
  });

  var sortBy_1 = sortBy;

  var func$a = convert_1('sortBy', sortBy_1);

  func$a.placeholder = placeholder;

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  var _baseSum = baseSum;

  /**
   * Computes the sum of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 2, 8, 6]);
   * // => 20
   */
  function sum(array) {
    return (array && array.length)
      ? _baseSum(array, identity_1)
      : 0;
  }

  var sum_1 = sum;

  var func$b = convert_1('sum', sum_1, _falseOptions);

  func$b.placeholder = placeholder;

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index],
          current = iteratee(value);

      if (current != null && (computed === undefined
            ? (current === current && !isSymbol_1(current))
            : comparator(current, computed)
          )) {
        var computed = current,
            result = value;
      }
    }
    return result;
  }

  var _baseExtremum = baseExtremum;

  /**
   * The base implementation of `_.lt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than `other`,
   *  else `false`.
   */
  function baseLt(value, other) {
    return value < other;
  }

  var _baseLt = baseLt;

  /**
   * Computes the minimum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => undefined
   */
  function min(array) {
    return (array && array.length)
      ? _baseExtremum(array, identity_1, _baseLt)
      : undefined;
  }

  var min_1 = min;

  var func$c = convert_1('min', min_1, _falseOptions);

  func$c.placeholder = placeholder;

  /**
   * Creates an array of values by running each element in `collection` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayMap : _baseMap;
    return func(collection, _baseIteratee(iteratee));
  }

  var map_1 = map;

  var func$d = convert_1('map', map_1);

  func$d.placeholder = placeholder;
  var map$1 = func$d;

  /** Error message constants. */
  var FUNC_ERROR_TEXT$2 = 'Expected a function';

  /** Used to compose bitmasks for function metadata. */
  var WRAP_CURRY_FLAG$6 = 8,
      WRAP_PARTIAL_FLAG$3 = 32,
      WRAP_ARY_FLAG$4 = 128,
      WRAP_REARG_FLAG$3 = 256;

  /**
   * Creates a `_.flow` or `_.flowRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new flow function.
   */
  function createFlow(fromRight) {
    return _flatRest(function(funcs) {
      var length = funcs.length,
          index = length,
          prereq = _LodashWrapper.prototype.thru;

      if (fromRight) {
        funcs.reverse();
      }
      while (index--) {
        var func = funcs[index];
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT$2);
        }
        if (prereq && !wrapper && _getFuncName(func) == 'wrapper') {
          var wrapper = new _LodashWrapper([], true);
        }
      }
      index = wrapper ? index : length;
      while (++index < length) {
        func = funcs[index];

        var funcName = _getFuncName(func),
            data = funcName == 'wrapper' ? _getData(func) : undefined;

        if (data && _isLaziable(data[0]) &&
              data[1] == (WRAP_ARY_FLAG$4 | WRAP_CURRY_FLAG$6 | WRAP_PARTIAL_FLAG$3 | WRAP_REARG_FLAG$3) &&
              !data[4].length && data[9] == 1
            ) {
          wrapper = wrapper[_getFuncName(data[0])].apply(wrapper, data[3]);
        } else {
          wrapper = (func.length == 1 && _isLaziable(func))
            ? wrapper[funcName]()
            : wrapper.thru(func);
        }
      }
      return function() {
        var args = arguments,
            value = args[0];

        if (wrapper && args.length == 1 && isArray_1(value)) {
          return wrapper.plant(value).value();
        }
        var index = 0,
            result = length ? funcs[index].apply(this, args) : value;

        while (++index < length) {
          result = funcs[index].call(this, result);
        }
        return result;
      };
    });
  }

  var _createFlow = createFlow;

  /**
   * Creates a function that returns the result of invoking the given functions
   * with the `this` binding of the created function, where each successive
   * invocation is supplied the return value of the previous.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {...(Function|Function[])} [funcs] The functions to invoke.
   * @returns {Function} Returns the new composite function.
   * @see _.flowRight
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var addSquare = _.flow([_.add, square]);
   * addSquare(1, 2);
   * // => 9
   */
  var flow = _createFlow();

  var flow_1 = flow;

  var func$e = convert_1('flow', flow_1);

  func$e.placeholder = placeholder;
  var flow$1 = func$e;

  var func$f = convert_1('memoize', memoize_1);

  func$f.placeholder = placeholder;

  /** A checker that matches the React.RefObject type. */

  var refObject = propTypes.shape({
    current: propTypes.object
  });
  /** A checker that matches the React.Ref type. */

  var ref = propTypes.oneOfType([propTypes.func, refObject]);

  var exenv = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2015 Jed Watson.
    Based on code that is Copyright 2013-2015, Facebook, Inc.
    All rights reserved.
  */
  /* global define */

  (function () {

  	var canUseDOM = !!(
  		typeof window !== 'undefined' &&
  		window.document &&
  		window.document.createElement
  	);

  	var ExecutionEnvironment = {

  		canUseDOM: canUseDOM,

  		canUseWorkers: typeof Worker !== 'undefined',

  		canUseEventListeners:
  			canUseDOM && !!(window.addEventListener || window.attachEvent),

  		canUseViewport: canUseDOM && !!window.screen

  	};

  	if ( module.exports) {
  		module.exports = ExecutionEnvironment;
  	} else {
  		window.ExecutionEnvironment = ExecutionEnvironment;
  	}

  }());
  });

  var eventStack_production = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});function _typeof(e){return (_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t);}function _getPrototypeOf(e){return (_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return (_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return !t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}var EventSet=function(){function e(t){_classCallCheck(this,e),_defineProperty(this,"handlers",void 0),this.handlers=t.slice(0);}return _createClass(e,[{key:"addHandlers",value:function(t){for(var n=this.handlers.slice(0),r=t.length,o=0;o<r;o+=1)n.push(t[o]);return new e(n)}},{key:"dispatchEvent",value:function(e,t){var n=this.handlers.length-1;if(t){for(var r=n;r>=0;r-=1)this.handlers[r].called||(this.handlers[r].called=!0,this.handlers[r](e));for(var o=n;o>=0;o-=1)this.handlers[o].called=!1;}else {(0, this.handlers[n])(e);}}},{key:"hasHandlers",value:function(){return this.handlers.length>0}},{key:"removeHandlers",value:function(t){for(var n=[],r=this.handlers.length,o=0;o<r;o+=1){var a=this.handlers[o];-1===t.indexOf(a)&&n.push(a);}return new e(n)}}]),e}();function cloneMap(e){var t=new Map;return e.forEach(function(e,n){t.set(n,e);}),t}function normalizeHandlers(e){return Array.isArray(e)?e:[e]}var isRefObject=function(e){return null!==e&&"object"===_typeof(e)&&e.hasOwnProperty("current")};function normalizeTarget(e){return "document"===e?document:"window"===e?window:isRefObject(e)?e.current||document:e||document}var EventPool=function(){function e(t,n){_classCallCheck(this,e),_defineProperty(this,"handlerSets",void 0),_defineProperty(this,"poolName",void 0),this.handlerSets=n,this.poolName=t;}return _createClass(e,[{key:"addHandlers",value:function(t,n){var r=cloneMap(this.handlerSets);if(r.has(t)){var o=r.get(t);r.set(t,o.addHandlers(n));}else r.set(t,new EventSet(n));return new e(this.poolName,r)}},{key:"dispatchEvent",value:function(e,t){var n=this.handlerSets.get(e),r="default"===this.poolName;n&&n.dispatchEvent(t,r);}},{key:"hasHandlers",value:function(e){if(!e)return this.handlerSets.size>0;var t=this.handlerSets.get(e);return !!t&&t.hasHandlers()}},{key:"removeHandlers",value:function(t,n){var r=cloneMap(this.handlerSets);if(!r.has(t))return new e(this.poolName,r);var o=r.get(t).removeHandlers(n);return o.hasHandlers()?r.set(t,o):r.delete(t),new e(this.poolName,r)}}]),e}();_defineProperty(EventPool,"createByType",function(e,t,n){var r=new Map;return r.set(t,new EventSet(n)),new EventPool(e,r)});var EventTarget=function(){function e(t){var n=this;_classCallCheck(this,e),_defineProperty(this,"handlers",new Map),_defineProperty(this,"pools",new Map),_defineProperty(this,"target",void 0),_defineProperty(this,"createEmitter",function(e){return function(t){n.pools.forEach(function(n){n.dispatchEvent(e,t);});}}),this.target=t;}return _createClass(e,[{key:"addHandlers",value:function(e,t,n){if(this.pools.has(e)){var r=this.pools.get(e);this.pools.set(e,r.addHandlers(t,n));}else this.pools.set(e,EventPool.createByType(e,t,n));this.handlers.has(t)||this.addTargetHandler(t);}},{key:"hasHandlers",value:function(){return this.handlers.size>0}},{key:"removeHandlers",value:function(e,t,n){if(this.pools.has(e)){var r=this.pools.get(e).removeHandlers(t,n);r.hasHandlers()?this.pools.set(e,r):this.pools.delete(e);var o=!1;this.pools.forEach(function(e){return o=o||e.hasHandlers(t)}),o||this.removeTargetHandler(t);}}},{key:"addTargetHandler",value:function(e){var t=this.createEmitter(e);this.handlers.set(e,t),this.target.addEventListener(e,t,!0);}},{key:"removeTargetHandler",value:function(e){this.handlers.has(e)&&(this.target.removeEventListener(e,this.handlers.get(e),!0),this.handlers.delete(e));}}]),e}(),EventStack=function(){function e(){var t=this;_classCallCheck(this,e),_defineProperty(this,"targets",new Map),_defineProperty(this,"getTarget",function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=normalizeTarget(e);if(t.targets.has(r))return t.targets.get(r);if(!n)return null;var o=new EventTarget(r);return t.targets.set(r,o),o}),_defineProperty(this,"removeTarget",function(e){t.targets.delete(normalizeTarget(e));});}return _createClass(e,[{key:"sub",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(exenv.canUseDOM){var r=n.target,o=void 0===r?document:r,a=n.pool,s=void 0===a?"default":a;this.getTarget(o).addHandlers(s,e,normalizeHandlers(t));}}},{key:"unsub",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(exenv.canUseDOM){var r=n.target,o=void 0===r?document:r,a=n.pool,s=void 0===a?"default":a,i=this.getTarget(o,!1);i&&(i.removeHandlers(s,e,normalizeHandlers(t)),i.hasHandlers()||this.removeTarget(o));}}}]),e}(),instance=new EventStack,EventStack$1=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,_getPrototypeOf(t).apply(this,arguments))}return _inherits(t,React__default.PureComponent),_createClass(t,[{key:"componentDidMount",value:function(){this.subscribe(this.props);}},{key:"componentDidUpdate",value:function(e){this.unsubscribe(e),this.subscribe(this.props);}},{key:"componentWillUnmount",value:function(){this.unsubscribe(this.props);}},{key:"subscribe",value:function(e){var t=e.name,n=e.on,r=e.pool,o=e.target;instance.sub(t,n,{pool:r,target:o});}},{key:"unsubscribe",value:function(e){var t=e.name,n=e.on,r=e.pool,o=e.target;instance.unsub(t,n,{pool:r,target:o});}},{key:"render",value:function(){return null}}]),t}();_defineProperty(EventStack$1,"defaultProps",{pool:"default",target:"document"}),EventStack$1.propTypes={},exports.instance=instance,exports.default=EventStack$1;
  });

  unwrapExports(eventStack_production);
  var eventStack_production_1 = eventStack_production.instance;

  var stack;

  {
    stack = eventStack_production;
  }

  var lib = stack.default;
  var instance = stack.instance;
  lib.instance = instance;

  /** Used as references for various `Number` constants. */
  var INFINITY$3 = 1 / 0;

  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$3) ? noop_1 : function(values) {
    return new _Set(values);
  };

  var _createSet = createSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE$2 = 200;

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee, comparator) {
    var index = -1,
        includes = _arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = _arrayIncludesWith;
    }
    else if (length >= LARGE_ARRAY_SIZE$2) {
      var set = iteratee ? null : _createSet(array);
      if (set) {
        return _setToArray(set);
      }
      isCommon = false;
      includes = _cacheHas;
      seen = new _SetCache;
    }
    else {
      seen = iteratee ? [] : result;
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      }
      else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  var _baseUniq = baseUniq;

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurrence of each element
   * is kept. The order of result values is determined by the order they occur
   * in the array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   */
  function uniq(array) {
    return (array && array.length) ? _baseUniq(array) : [];
  }

  var uniq_1 = uniq;

  /** `Object#toString` result references. */
  var numberTag$4 = '[object Number]';

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' ||
      (isObjectLike_1(value) && _baseGetTag(value) == numberTag$4);
  }

  var isNumber_1 = isNumber;

  /** `Object#toString` result references. */
  var stringTag$4 = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$4);
  }

  var isString_1 = isString;

  /** `Object#toString` result references. */
  var boolTag$4 = '[object Boolean]';

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false ||
      (isObjectLike_1(value) && _baseGetTag(value) == boolTag$4);
  }

  var isBoolean_1 = isBoolean;

  var classnames = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  /* global define */

  (function () {

  	var hasOwn = {}.hasOwnProperty;

  	function classNames () {
  		var classes = [];

  		for (var i = 0; i < arguments.length; i++) {
  			var arg = arguments[i];
  			if (!arg) continue;

  			var argType = typeof arg;

  			if (argType === 'string' || argType === 'number') {
  				classes.push(arg);
  			} else if (Array.isArray(arg) && arg.length) {
  				var inner = classNames.apply(null, arg);
  				if (inner) {
  					classes.push(inner);
  				}
  			} else if (argType === 'object') {
  				for (var key in arg) {
  					if (hasOwn.call(arg, key) && arg[key]) {
  						classes.push(key);
  					}
  				}
  			}
  		}

  		return classes.join(' ');
  	}

  	if ( module.exports) {
  		classNames.default = classNames;
  		module.exports = classNames;
  	} else {
  		window.classNames = classNames;
  	}
  }());
  });

  // Factories
  // ============================================================

  /**
   * A more robust React.createElement. It can create elements from primitive values.
   *
   * @param {function|string} Component A ReactClass or string
   * @param {function} mapValueToProps A function that maps a primitive value to the Component props
   * @param {string|object|function} val The value to create a ReactElement from
   * @param {Object} [options={}]
   * @param {object} [options.defaultProps={}] Default props object
   * @param {object|function} [options.overrideProps={}] Override props object or function (called with regular props)
   * @param {boolean} [options.autoGenerateKey=true] Whether or not automatic key generation is allowed
   * @returns {object|null}
   */

  function createShorthand(Component, mapValueToProps, val) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (typeof Component !== 'function' && typeof Component !== 'string') {
      throw new Error('createShorthand() Component must be a string or function.');
    } // short circuit noop values


    if (isNil_1(val) || isBoolean_1(val)) return null;

    var valIsString = isString_1(val);

    var valIsNumber = isNumber_1(val);

    var valIsFunction = isFunction_1(val);

    var valIsReactElement = React.isValidElement(val);

    var valIsPropsObject = isPlainObject_1(val);

    var valIsPrimitiveValue = valIsString || valIsNumber || isArray_1(val); // unhandled type return null

    /* eslint-disable no-console */


    if (!valIsFunction && !valIsReactElement && !valIsPropsObject && !valIsPrimitiveValue) {

      return null;
    }
    /* eslint-enable no-console */
    // ----------------------------------------
    // Build up props
    // ----------------------------------------


    var _options$defaultProps = options.defaultProps,
        defaultProps = _options$defaultProps === void 0 ? {} : _options$defaultProps; // User's props

    var usersProps = valIsReactElement && val.props || valIsPropsObject && val || valIsPrimitiveValue && mapValueToProps(val); // Override props

    var _options$overrideProp = options.overrideProps,
        overrideProps = _options$overrideProp === void 0 ? {} : _options$overrideProp;
    overrideProps = isFunction_1(overrideProps) ? overrideProps(objectSpread({}, defaultProps, usersProps)) : overrideProps; // Merge props

    /* eslint-disable react/prop-types */

    var props = objectSpread({}, defaultProps, usersProps, overrideProps); // Merge className


    if (defaultProps.className || overrideProps.className || usersProps.className) {
      var mergedClassesNames = classnames(defaultProps.className, overrideProps.className, usersProps.className);
      props.className = uniq_1(mergedClassesNames.split(' ')).join(' ');
    } // Merge style


    if (defaultProps.style || overrideProps.style || usersProps.style) {
      props.style = objectSpread({}, defaultProps.style, usersProps.style, overrideProps.style);
    } // ----------------------------------------
    // Get key
    // ----------------------------------------
    // Use key, childKey, or generate key


    if (isNil_1(props.key)) {
      var childKey = props.childKey;
      var _options$autoGenerate = options.autoGenerateKey,
          autoGenerateKey = _options$autoGenerate === void 0 ? true : _options$autoGenerate;

      if (!isNil_1(childKey)) {
        // apply and consume the childKey
        props.key = typeof childKey === 'function' ? childKey(props) : childKey;
        delete props.childKey;
      } else if (autoGenerateKey && (valIsString || valIsNumber)) {
        // use string/number shorthand values as the key
        props.key = val;
      }
    } // ----------------------------------------
    // Create Element
    // ----------------------------------------
    // Clone ReactElements


    if (valIsReactElement) return React.cloneElement(val, props); // Create ReactElements from built up props

    if (valIsPrimitiveValue || valIsPropsObject) return React__default.createElement(Component, props); // Call functions with args similar to createElement()

    if (valIsFunction) return val(Component, props, props.children);
    /* eslint-enable react/prop-types */
  } // ============================================================
  // Factory Creators
  // ============================================================

  /**
   * Creates a `createShorthand` function that is waiting for a value and options.
   *
   * @param {function|string} Component A ReactClass or string
   * @param {function} mapValueToProps A function that maps a primitive value to the Component props
   * @returns {function} A shorthand factory function waiting for `val` and `defaultProps`.
   */

  createShorthand.handledProps = [];
  function createShorthandFactory(Component, mapValueToProps) {
    if (typeof Component !== 'function' && typeof Component !== 'string') {
      throw new Error('createShorthandFactory() Component must be a string or function.');
    }

    return function (val, options) {
      return createShorthand(Component, mapValueToProps, val, options);
    };
  } // ============================================================
  // HTML Factories
  // ============================================================

  var createHTMLDivision = createShorthandFactory('div', function (val) {
    return {
      children: val
    };
  });
  var createHTMLIframe = createShorthandFactory('iframe', function (src) {
    return {
      src: src
    };
  });
  var createHTMLImage = createShorthandFactory('img', function (val) {
    return {
      src: val
    };
  });
  var createHTMLInput = createShorthandFactory('input', function (val) {
    return {
      type: val
    };
  });
  var createHTMLLabel = createShorthandFactory('label', function (val) {
    return {
      children: val
    };
  });
  var createHTMLParagraph = createShorthandFactory('p', function (val) {
    return {
      children: val
    };
  });

  /**
   * Returns an object consisting of props beyond the scope of the Component.
   * Useful for getting and spreading unknown props from the user.
   * @param {function} Component A function or ReactClass.
   * @param {object} props A ReactElement props object
   * @returns {{}} A shallow copy of the prop object
   */
  var getUnhandledProps = function getUnhandledProps(Component, props) {
    // Note that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
    var _Component$handledPro = Component.handledProps,
        handledProps = _Component$handledPro === void 0 ? [] : _Component$handledPro;
    return Object.keys(props).reduce(function (acc, prop) {
      if (prop === 'childKey') return acc;
      if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
      return acc;
    }, {});
  };

  /**
   * Returns a createElement() type based on the props of the Component.
   * Useful for calculating what type a component should render as.
   *
   * @param {function} Component A function or ReactClass.
   * @param {object} props A ReactElement props object
   * @param {function} [getDefault] A function that returns a default element type.
   * @returns {string|function} A ReactElement type
   */
  function getElementType(Component, props, getDefault) {
    var _Component$defaultPro = Component.defaultProps,
        defaultProps = _Component$defaultPro === void 0 ? {} : _Component$defaultPro; // ----------------------------------------
    // user defined "as" element type

    if (props.as && props.as !== defaultProps.as) return props.as; // ----------------------------------------
    // computed default element type

    if (getDefault) {
      var computedDefault = getDefault();
      if (computedDefault) return computedDefault;
    } // ----------------------------------------
    // infer anchor links


    if (props.href) return 'a'; // ----------------------------------------
    // use defaultProp or 'div'

    return defaultProps.as || 'div';
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return _arrayMap(props, function(key) {
      return object[key];
    });
  }

  var _baseValues = baseValues;

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object == null ? [] : _baseValues(object, keys_1(object));
  }

  var values_1 = values;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$5 = Math.max;

  /**
   * Checks if `value` is in `collection`. If `collection` is a string, it's
   * checked for a substring of `value`, otherwise
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * is used for equality comparisons. If `fromIndex` is negative, it's used as
   * the offset from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'a': 1, 'b': 2 }, 1);
   * // => true
   *
   * _.includes('abcd', 'bc');
   * // => true
   */
  function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike_1(collection) ? collection : values_1(collection);
    fromIndex = (fromIndex && !guard) ? toInteger_1(fromIndex) : 0;

    var length = collection.length;
    if (fromIndex < 0) {
      fromIndex = nativeMax$5(length + fromIndex, 0);
    }
    return isString_1(collection)
      ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
      : (!!length && _baseIndexOf(collection, value, fromIndex) > -1);
  }

  var includes_1 = includes;

  var htmlInputAttrs = [// REACT
  'selected', 'defaultValue', 'defaultChecked', // LIMITED HTML PROPS
  'accept', 'autoCapitalize', 'autoComplete', 'autoCorrect', 'autoFocus', 'checked', 'disabled', 'form', 'id', 'lang', 'list', 'max', 'maxLength', 'min', 'minLength', 'multiple', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'step', 'title', 'type', 'value'];
  var htmlInputEvents = [// EVENTS
  // keyboard
  'onKeyDown', 'onKeyPress', 'onKeyUp', // focus
  'onFocus', 'onBlur', // form
  'onChange', 'onInput', // mouse
  'onClick', 'onContextMenu', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', // selection
  'onSelect', // touch
  'onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
  var htmlInputProps = [].concat(htmlInputAttrs, htmlInputEvents);
  var htmlImageProps = ['alt', 'height', 'src', 'srcSet', 'width'];
  /**
   * Returns an array of objects consisting of: props of html input element and rest.
   * @param {object} props A ReactElement props object
   * @param {Object} [options={}]
   * @param {Array} [options.htmlProps] An array of html input props
   * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
   * @returns {[{}, {}]} An array of objects
   */

  var partitionHTMLProps = function partitionHTMLProps(props) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$htmlProps = options.htmlProps,
        htmlProps = _options$htmlProps === void 0 ? htmlInputProps : _options$htmlProps,
        _options$includeAria = options.includeAria,
        includeAria = _options$includeAria === void 0 ? true : _options$includeAria;
    var inputProps = {};
    var rest = {};

    forEach_1(props, function (val, prop) {
      var possibleAria = includeAria && (/^aria-.*$/.test(prop) || prop === 'role');
      var target = includes_1(htmlProps, prop) || possibleAria ? inputProps : rest;
      target[prop] = val;
    });

    return [inputProps, rest];
  };

  var hasDocument = (typeof document === "undefined" ? "undefined" : _typeof_1(document)) === 'object' && document !== null;
  var hasWindow = (typeof window === "undefined" ? "undefined" : _typeof_1(window)) === 'object' && window !== null && window.self === window; // eslint-disable-next-line no-confusing-arrow

  var isBrowser = function isBrowser() {
    return !isNil_1(isBrowser.override) ? isBrowser.override : hasDocument && hasWindow;
  };

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$6 = Math.max,
      nativeMin$3 = Math.min;

  /**
   * The base implementation of `_.inRange` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to check.
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   */
  function baseInRange(number, start, end) {
    return number >= nativeMin$3(start, end) && number < nativeMax$6(start, end);
  }

  var _baseInRange = baseInRange;

  /**
   * Checks if `n` is between `start` and up to, but not including, `end`. If
   * `end` is not specified, it's set to `start` with `start` then set to `0`.
   * If `start` is greater than `end` the params are swapped to support
   * negative ranges.
   *
   * @static
   * @memberOf _
   * @since 3.3.0
   * @category Number
   * @param {number} number The number to check.
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
   * @see _.range, _.rangeRight
   * @example
   *
   * _.inRange(3, 2, 4);
   * // => true
   *
   * _.inRange(4, 8);
   * // => true
   *
   * _.inRange(4, 2);
   * // => false
   *
   * _.inRange(2, 2);
   * // => false
   *
   * _.inRange(1.2, 2);
   * // => true
   *
   * _.inRange(5.2, 4);
   * // => false
   *
   * _.inRange(-3, -2, -6);
   * // => true
   */
  function inRange(number, start, end) {
    start = toFinite_1(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite_1(end);
    }
    number = toNumber_1(number);
    return _baseInRange(number, start, end);
  }

  var inRange_1 = inRange;

  /**
   * Gets the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias first
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.head([1, 2, 3]);
   * // => 1
   *
   * _.head([]);
   * // => undefined
   */
  function head(array) {
    return (array && array.length) ? array[0] : undefined;
  }

  var head_1 = head;

  var first = head_1;

  /**
   * Determines if a click's coordinates are within the bounds of a node.
   *
   * @see https://github.com/Semantic-Org/Semantic-UI-React/pull/2384
   *
   * @param {object} node - A DOM node.
   * @param {object} e - A SyntheticEvent or DOM Event.
   * @returns {boolean}
   */
  var doesNodeContainClick = function doesNodeContainClick(node, e) {
    if (some_1([e, node], isNil_1)) return false; // if there is an e.target and it is in the document, use a simple node.contains() check

    if (e.target) {
      invoke_1(e.target, 'setAttribute', 'data-suir-click-target', true);

      if (document.querySelector('[data-suir-click-target=true]')) {
        invoke_1(e.target, 'removeAttribute', 'data-suir-click-target');

        return node.contains(e.target);
      }
    } // Below logic handles cases where the e.target is no longer in the document.
    // The result of the click likely has removed the e.target node.
    // Instead of node.contains(), we'll identify the click by X/Y position.
    // return early if the event properties aren't available
    // prevent measuring the node and repainting if we don't need to


    var clientX = e.clientX,
        clientY = e.clientY;
    if (some_1([clientX, clientY], isNil_1)) return false; // false if the node is not visible

    var clientRects = node.getClientRects(); // Heads Up!
    // getClientRects returns a DOMRectList, not an array nor a plain object
    // We explicitly avoid _.isEmpty and check .length to cover all possible shapes

    if (!node.offsetWidth || !node.offsetHeight || !clientRects || !clientRects.length) return false; // false if the node doesn't have a valid bounding rect

    var _first2 = first(clientRects),
        top = _first2.top,
        bottom = _first2.bottom,
        left = _first2.left,
        right = _first2.right;

    if (some_1([top, bottom, left, right], isNil_1)) return false; // we add a small decimal to the upper bound just to make it inclusive
    // don't add an whole pixel (1) as the event/node values may be decimal sensitive

    return inRange_1(clientY, top, bottom + 0.001) && inRange_1(clientX, left, right + 0.001);
  };

  /**
   * @param {number} pageNumber
   * @return {Object}
   */
  var createEllipsisItem = function createEllipsisItem(pageNumber) {
    return {
      active: false,
      type: 'ellipsisItem',
      value: pageNumber
    };
  };
  /**
   * @return {Object}
   */

  var createFirstPage = function createFirstPage() {
    return {
      active: false,
      type: 'firstItem',
      value: 1
    };
  };
  /**
   * @param {number} activePage
   * @return {Object}
   */

  var createPrevItem = function createPrevItem(activePage) {
    return {
      active: false,
      type: 'prevItem',
      value: Math.max(1, activePage - 1)
    };
  };
  /**
   * @param {number} activePage
   * @return {function}
   */

  var createPageFactory = function createPageFactory(activePage) {
    return function (pageNumber) {
      return {
        active: activePage === pageNumber,
        type: 'pageItem',
        value: pageNumber
      };
    };
  };
  /**
   * @param {number} activePage
   * @param {number} totalPages
   * @return {Object}
   */

  var createNextItem = function createNextItem(activePage, totalPages) {
    return {
      active: false,
      type: 'nextItem',
      value: Math.min(activePage + 1, totalPages)
    };
  };
  /**
   * @param {number} totalPages
   * @return {Object}
   */

  var createLastItem = function createLastItem(totalPages) {
    return {
      active: false,
      type: 'lastItem',
      value: totalPages
    };
  };

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil,
      nativeMax$7 = Math.max;

  /**
   * The base implementation of `_.range` and `_.rangeRight` which doesn't
   * coerce arguments.
   *
   * @private
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @param {number} step The value to increment or decrement by.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Array} Returns the range of numbers.
   */
  function baseRange(start, end, step, fromRight) {
    var index = -1,
        length = nativeMax$7(nativeCeil((end - start) / (step || 1)), 0),
        result = Array(length);

    while (length--) {
      result[fromRight ? length : ++index] = start;
      start += step;
    }
    return result;
  }

  var _baseRange = baseRange;

  /**
   * Creates a `_.range` or `_.rangeRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new range function.
   */
  function createRange(fromRight) {
    return function(start, end, step) {
      if (step && typeof step != 'number' && _isIterateeCall(start, end, step)) {
        end = step = undefined;
      }
      // Ensure the sign of `-0` is preserved.
      start = toFinite_1(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite_1(end);
      }
      step = step === undefined ? (start < end ? 1 : -1) : toFinite_1(step);
      return _baseRange(start, end, step, fromRight);
    };
  }

  var _createRange = createRange;

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to, but not including, `end`. A step of `-1` is used if a negative
   * `start` is specified without an `end` or `step`. If `end` is not specified,
   * it's set to `start` with `start` then set to `0`.
   *
   * **Note:** JavaScript follows the IEEE-754 standard for resolving
   * floating-point values which can produce unexpected results.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @param {number} [step=1] The value to increment or decrement by.
   * @returns {Array} Returns the range of numbers.
   * @see _.inRange, _.rangeRight
   * @example
   *
   * _.range(4);
   * // => [0, 1, 2, 3]
   *
   * _.range(-4);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 5);
   * // => [1, 2, 3, 4]
   *
   * _.range(0, 20, 5);
   * // => [0, 5, 10, 15]
   *
   * _.range(0, -4, -1);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 4, 0);
   * // => [1, 1, 1]
   *
   * _.range(0);
   * // => []
   */
  var range = _createRange();

  var range_1 = range;

  var createInnerPrefix = function createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory) {
    var prefixPage = innerGroupStart - 1;
    var showEllipsis = prefixPage !== firstGroupEnd + 1;
    var prefixFactory = showEllipsis ? createEllipsisItem : pageFactory;
    return prefixFactory(prefixPage);
  };
  var createInnerSuffix = function createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory) {
    var suffixPage = innerGroupEnd + 1;
    var showEllipsis = suffixPage !== lastGroupStart - 1;
    var suffixFactory = showEllipsis ? createEllipsisItem : pageFactory;
    return suffixFactory(suffixPage);
  };

  var createSimpleRange = function createSimpleRange(start, end, pageFactory) {
    return map_1(range_1(start, end + 1), pageFactory);
  };
  var createComplexRange = function createComplexRange(options, pageFactory) {
    var activePage = options.activePage,
        boundaryRange = options.boundaryRange,
        hideEllipsis = options.hideEllipsis,
        siblingRange = options.siblingRange,
        totalPages = options.totalPages;
    var ellipsisSize = hideEllipsis ? 0 : 1;
    var firstGroupEnd = boundaryRange;
    var firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory);
    var lastGroupStart = totalPages + 1 - boundaryRange;
    var lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory);
    var innerGroupStart = Math.min(Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1), lastGroupStart - ellipsisSize - 2 * siblingRange - 1);
    var innerGroupEnd = innerGroupStart + 2 * siblingRange;
    var innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);
    return [].concat(toConsumableArray(firstGroup), [!hideEllipsis && createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory)], toConsumableArray(innerGroup), [!hideEllipsis && createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory)], toConsumableArray(lastGroup)).filter(Boolean);
  };

  /**
   * Checks the possibility of using simple range generation, if number of generated pages is equal
   * or greater than total pages to show.
   *
   * @param {object} options
   * @param {number} options.boundaryRange Number of always visible pages at the beginning and end.
   * @param {number} options.siblingRange Number of always visible pages before and after the current one.
   * @param {number} options.totalPages Total number of pages.
   * @return {boolean}
   */
  var isSimplePagination = function isSimplePagination(_ref) {
    var boundaryRange = _ref.boundaryRange,
        hideEllipsis = _ref.hideEllipsis,
        siblingRange = _ref.siblingRange,
        totalPages = _ref.totalPages;
    var boundaryRangeSize = 2 * boundaryRange;
    var ellipsisSize = hideEllipsis ? 0 : 2;
    var siblingRangeSize = 2 * siblingRange;
    return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages;
  };
  var typifyOptions = function typifyOptions(_ref2) {
    var activePage = _ref2.activePage,
        boundaryRange = _ref2.boundaryRange,
        hideEllipsis = _ref2.hideEllipsis,
        siblingRange = _ref2.siblingRange,
        totalPages = _ref2.totalPages;
    return {
      activePage: +activePage,
      boundaryRange: +boundaryRange,
      hideEllipsis: !!hideEllipsis,
      siblingRange: +siblingRange,
      totalPages: +totalPages
    };
  };

  /**
   * @param {object} rawOptions
   * @param {number|string} rawOptions.activePage
   * @param {number|string} rawOptions.boundaryRange Number of always visible pages at the beginning and end.
   * @param {boolean} rawOptions.hideEllipsis Marks if ellipsis should be hidden.
   * @param {number|string} rawOptions.siblingRange Number of always visible pages before and after the current one.
   * @param {number|string} rawOptions.totalPages Total number of pages.
   */

  var createPaginationItems = function createPaginationItems(rawOptions) {
    var options = typifyOptions(rawOptions);
    var activePage = options.activePage,
        totalPages = options.totalPages;
    var pageFactory = createPageFactory(activePage);
    var innerRange = isSimplePagination(options) ? createSimpleRange(1, totalPages, pageFactory) : createComplexRange(options, pageFactory);
    return [createFirstPage(), createPrevItem(activePage)].concat(toConsumableArray(innerRange), [createNextItem(activePage, totalPages), createLastItem(totalPages)]);
  };

  var WIDTHS = [].concat(toConsumableArray(keys_1(numberToWordMap)), toConsumableArray(keys_1(numberToWordMap).map(Number)), toConsumableArray(values_1(numberToWordMap)));
  var DIRECTIONAL_TRANSITIONS = ['browse', 'browse right', 'drop', 'fade', 'fade up', 'fade down', 'fade left', 'fade right', 'fly up', 'fly down', 'fly left', 'fly right', 'horizontal flip', 'vertical flip', 'scale', 'slide up', 'slide down', 'slide left', 'slide right', 'swing up', 'swing down', 'swing left', 'swing right', 'zoom'];
  // https://github.com/Semantic-Org/Semantic-UI/blob/master/dist/components/icon.css

  var ACCESSIBILITY = ['american sign language interpreting', 'assistive listening systems', 'audio description', 'blind', 'braille', 'closed captioning', 'closed captioning outline', 'deaf', 'low vision', 'phone volume', 'question circle', 'question circle outline', 'sign language', 'tty', 'universal access', 'wheelchair'];
  var ARROWS = ['angle double down', 'angle double left', 'angle double right', 'angle double up', 'angle down', 'angle left', 'angle right', 'angle up', 'arrow alternate circle down', 'arrow alternate circle down outline', 'arrow alternate circle left', 'arrow alternate circle left outline', 'arrow alternate circle right', 'arrow alternate circle right outline', 'arrow alternate circle up', 'arrow alternate circle up outline', 'arrow circle down', 'arrow circle left', 'arrow circle right', 'arrow circle up', 'arrow down', 'arrow left', 'arrow right', 'arrow up', 'arrows alternate', 'arrows alternate horizontal', 'arrows alternate vertical', 'caret down', 'caret left', 'caret right', 'caret square down', 'caret square down outline', 'caret square left', 'caret square left outline', 'caret square right', 'caret square right outline', 'caret square up', 'caret square up outline', 'caret up', 'cart arrow down', 'chart line', 'chevron circle down', 'chevron circle left', 'chevron circle right', 'chevron circle up', 'chevron down', 'chevron left', 'chevron right', 'chevron up', 'cloud download', 'cloud upload', 'download', 'exchange', 'expand arrows alternate', 'external alternate', 'external square alternate', 'hand point down', 'hand point down outline', 'hand point left', 'hand point left outline', 'hand point right', 'hand point right outline', 'hand point up', 'hand point up outline', 'hand pointer', 'hand pointer outline', 'history', 'level down alternate', 'level up alternate', 'location arrow', 'long arrow alternate down', 'long arrow alternate left', 'long arrow alternate right', 'long arrow alternate up', 'mouse pointer', 'play', 'random', 'recycle', 'redo', 'redo alternate', 'reply', 'reply all', 'retweet', 'share', 'share square', 'share square outline', 'sign-in', 'sign-out', 'sign-in alternate', 'sign-out alternate', 'sort', 'sort alphabet down', 'sort alphabet up', 'sort amount down', 'sort amount up', 'sort down', 'sort numeric down', 'sort numeric up', 'sort up', 'sync', 'sync alternate', 'text height', 'text width', 'undo', 'undo alternate', 'upload', 'zoom-in', 'zoom-out'];
  var AUDIO_VIDEO = ['audio description', 'backward', 'circle', 'circle outline', 'closed captioning', 'closed captioning outline', 'compress', 'eject', 'expand', 'expand arrows alternate', 'fast backward', 'fast forward', 'file audio', 'file audio outline', 'file video', 'file video outline', 'film', 'forward', 'headphones', 'microphone', 'microphone slash', 'music', 'pause', 'pause circle', 'pause circle outline', 'phone volume', 'play', 'play circle', 'play circle outline', 'podcast', 'random', 'redo', 'redo alternate', 'rss', 'rss square', 'step backward', 'step forward', 'stop', 'stop circle', 'stop circle outline', 'sync', 'sync alternate', 'undo', 'undo alternate', 'video', 'volume down', 'volume off', 'volume up'];
  var BUSINESS = ['address book', 'address book outline', 'address card', 'address card outline', 'archive', 'balance scale', 'birthday cake', 'book', 'briefcase', 'building', 'building outline', 'bullhorn', 'bullseye', 'calculator', 'calendar', 'calendar outline', 'calendar alternate', 'calendar alternate outline', 'certificate', 'chart area', 'chart bar', 'chart bar outline', 'chart line', 'chart pie', 'clipboard', 'clipboard outline', 'coffee', 'columns', 'compass', 'compass outline', 'copy', 'copy outline', 'copyright', 'copyright outline', 'cut', 'edit', 'edit outline', 'envelope', 'envelope outline', 'envelope open', 'envelope open outline', 'envelope square', 'eraser', 'fax', 'file', 'file outline', 'file alternate', 'file alternate outline', 'folder', 'folder outline', 'folder open', 'folder open outline', 'globe', 'industry', 'paperclip', 'paste', 'pen square', 'pencil alternate', 'percent', 'phone', 'phone square', 'phone volume', 'registered', 'registered outline', 'save', 'save outline', 'sitemap', 'sticky note', 'sticky note outline', 'suitcase', 'table', 'tag', 'tags', 'tasks', 'thumbtack', 'trademark'];
  var CHESS = ['chess', 'chess bishop', 'chess board', 'chess king', 'chess knight', 'chess pawn', 'chess queen', 'chess rook', 'square full'];
  var CODE = ['archive', 'barcode', 'bath', 'bug', 'code', 'code branch', 'coffee', 'file', 'file outline', 'file alternate', 'file alternate outline', 'file code', 'file code outline', 'filter', 'fire extinguisher', 'folder', 'folder outline', 'folder open', 'folder open outline', 'keyboard', 'keyboard outline', 'microchip', 'qrcode', 'shield alternate', 'sitemap', 'terminal', 'user secret', 'window close', 'window close outline', 'window maximize', 'window maximize outline', 'window minimize', 'window minimize outline', 'window restore', 'window restore outline'];
  var COMMUNICATION = ['address book', 'address book outline', 'address card', 'address card outline', 'american sign language interpreting', 'assistive listening systems', 'at', 'bell', 'bell outline', 'bell slash', 'bell slash outline', 'bullhorn', 'comment', 'comment outline', 'comment alternate', 'comment alternate outline', 'comments', 'comments outline', 'envelope', 'envelope outline', 'envelope open', 'envelope open outline', 'envelope square', 'fax', 'inbox', 'language', 'microphone', 'microphone slash', 'mobile', 'mobile alternate', 'paper plane', 'paper plane outline', 'phone', 'phone square', 'phone volume', 'rss', 'rss square', 'tty', 'wifi'];
  var COMPUTERS = ['desktop', 'download', 'hdd', 'hdd outline', 'headphones', 'keyboard', 'keyboard outline', 'laptop', 'microchip', 'mobile', 'mobile alternate', 'plug', 'power off', 'print', 'save', 'save outline', 'server', 'tablet', 'tablet alternate', 'tv', 'upload'];
  var CURRENCY = ['dollar sign', 'euro sign', 'lira sign', 'money bill alternate', 'money bill alternate outline', 'pound sign', 'ruble sign', 'rupee sign', 'shekel sign', 'won sign', 'yen sign'];
  var DATE_TIME = ['bell', 'bell outline', 'bell slash', 'bell slash outline', 'calendar', 'calendar outline', 'calendar alternate', 'calendar alternate outline', 'calendar check', 'calendar check outline', 'calendar minus', 'calendar minus outline', 'calendar plus', 'calendar plus outline', 'calendar times', 'calendar times outline', 'clock', 'clock outline', 'hourglass', 'hourglass outline', 'hourglass end', 'hourglass half', 'hourglass start', 'stopwatch'];
  var DESIGN = ['adjust', 'clone', 'clone outline', 'copy', 'copy outline', 'crop', 'crosshairs', 'cut', 'edit', 'edit outline', 'eraser', 'eye', 'eye dropper', 'eye slash', 'eye slash outline', 'object group', 'object group outline', 'object ungroup', 'object ungroup outline', 'paint brush', 'paste', 'pencil alternate', 'save', 'save outline', 'tint'];
  var EDITORS = ['align center', 'align justify', 'align left', 'align right', 'bold', 'clipboard', 'clipboard outline', 'clone', 'clone outline', 'columns', 'copy', 'copy outline', 'cut', 'edit', 'edit outline', 'eraser', 'file', 'file outline', 'file alternate', 'file alternate outline', 'font', 'heading', 'i cursor', 'indent', 'italic', 'linkify', 'list', 'list alternate', 'list alternate outline', 'list ol', 'list ul', 'outdent', 'paper plane', 'paper plane outline', 'paperclip', 'paragraph', 'paste', 'pencil alternate', 'print', 'quote left', 'quote right', 'redo', 'redo alternate', 'reply', 'reply all', 'share', 'strikethrough', 'subscript', 'superscript', 'sync', 'sync alternate', 'table', 'tasks', 'text height', 'text width', 'th', 'th large', 'th list', 'trash', 'trash alternate', 'trash alternate outline', 'underline', 'undo', 'undo alternate', 'unlink'];
  var FILES = ['archive', 'clone', 'clone outline', 'copy', 'copy outline', 'cut', 'file', 'file outline', 'file alternate', 'file alternate outline', 'file archive', 'file archive outline', 'file audio', 'file audio outline', 'file code', 'file code outline', 'file excel', 'file excel outline', 'file image', 'file image outline', 'file pdf', 'file pdf outline', 'file powerpoint', 'file powerpoint outline', 'file video', 'file video outline', 'file word', 'file word outline', 'folder', 'folder outline', 'folder open', 'folder open outline', 'paste', 'save', 'save outline', 'sticky note', 'sticky note outline'];
  var GENDERS = ['genderless', 'mars', 'mars double', 'mars stroke', 'mars stroke horizontal', 'mars stroke vertical', 'mercury', 'neuter', 'transgender', 'transgender alternate', 'venus', 'venus double', 'venus mars'];
  var HANDS_GESTURES = ['hand lizard', 'hand lizard outline', 'hand paper', 'hand paper outline', 'hand peace', 'hand peace outline', 'hand point down', 'hand point down outline', 'hand point left', 'hand point left outline', 'hand point right', 'hand point right outline', 'hand point up', 'hand point up outline', 'hand pointer', 'hand pointer outline', 'hand rock', 'hand rock outline', 'hand scissors', 'hand scissors outline', 'hand spock', 'hand spock outline', 'handshake', 'handshake outline', 'thumbs down', 'thumbs down outline', 'thumbs up', 'thumbs up outline'];
  var HEALTH = ['ambulance', 'h square', 'heart', 'heart outline', 'heartbeat', 'hospital', 'hospital outline', 'medkit', 'plus square', 'plus square outline', 'stethoscope', 'user md', 'wheelchair'];
  var IMAGES = ['adjust', 'bolt', 'camera', 'camera retro', 'clone', 'clone outline', 'compress', 'expand', 'eye', 'eye dropper', 'eye slash', 'eye slash outline', 'file image', 'file image outline', 'film', 'id badge', 'id badge outline', 'id card', 'id card outline', 'image', 'image outline', 'images', 'images outline', 'sliders horizontal', 'tint'];
  var INTERFACES = ['ban', 'barcode', 'bars', 'beer', 'bell', 'bell outline', 'bell slash', 'bell slash outline', 'bug', 'bullhorn', 'bullseye', 'calculator', 'calendar', 'calendar outline', 'calendar alternate', 'calendar alternate outline', 'calendar check', 'calendar check outline', 'calendar minus', 'calendar minus outline', 'calendar plus', 'calendar plus outline', 'calendar times', 'calendar times outline', 'certificate', 'check', 'check circle', 'check circle outline', 'check square', 'check square outline', 'circle', 'circle outline', 'clipboard', 'clipboard outline', 'clone', 'clone outline', 'cloud', 'cloud download', 'cloud upload', 'coffee', 'cog', 'cogs', 'copy', 'copy outline', 'cut', 'database', 'dot circle', 'dot circle outline', 'download', 'edit', 'edit outline', 'ellipsis horizontal', 'ellipsis vertical', 'envelope', 'envelope outline', 'envelope open', 'envelope open outline', 'eraser', 'exclamation', 'exclamation circle', 'exclamation triangle', 'external alternate', 'external square alternate', 'eye', 'eye slash', 'eye slash outline', 'file', 'file outline', 'file alternate', 'file alternate outline', 'filter', 'flag', 'flag outline', 'flag checkered', 'folder', 'folder outline', 'folder open', 'folder open outline', 'frown', 'frown outline', 'hashtag', 'heart', 'heart outline', 'history', 'home', 'i cursor', 'info', 'info circle', 'language', 'magic', 'meh', 'meh outline', 'microphone', 'microphone slash', 'minus', 'minus circle', 'minus square', 'minus square outline', 'paste', 'pencil alternate', 'plus', 'plus circle', 'plus square', 'plus square outline', 'qrcode', 'question', 'question circle', 'question circle outline', 'quote left', 'quote right', 'redo', 'redo alternate', 'reply', 'reply all', 'rss', 'rss square', 'save', 'save outline', 'search', 'search minus', 'search plus', 'share', 'share alternate', 'share alternate square', 'share square', 'share square outline', 'shield alternate', 'sign-in', 'sign-out', 'signal', 'sitemap', 'sliders horizontal', 'smile', 'smile outline', 'sort', 'sort alphabet down', 'sort alphabet up', 'sort amount down', 'sort amount up', 'sort down', 'sort numeric down', 'sort numeric up', 'sort up', 'star', 'star outline', 'star half', 'star half outline', 'sync', 'sync alternate', 'thumbs down', 'thumbs down outline', 'thumbs up', 'thumbs up outline', 'times', 'times circle', 'times circle outline', 'toggle off', 'toggle on', 'trash', 'trash alternate', 'trash alternate outline', 'trophy', 'undo', 'undo alternate', 'upload', 'user', 'user outline', 'user circle', 'user circle outline', 'wifi'];
  var LOGISTICS = ['box', 'boxes', 'clipboard check', 'clipboard list', 'dolly', 'dolly flatbed', 'pallet', 'shipping fast', 'truck', 'warehouse'];
  var MAPS = ['ambulance', 'anchor', 'balance scale', 'bath', 'bed', 'beer', 'bell', 'bell outline', 'bell slash', 'bell slash outline', 'bicycle', 'binoculars', 'birthday cake', 'blind', 'bomb', 'book', 'bookmark', 'bookmark outline', 'briefcase', 'building', 'building outline', 'car', 'coffee', 'crosshairs', 'dollar sign', 'eye', 'eye slash', 'eye slash outline', 'fighter jet', 'fire', 'fire extinguisher', 'flag', 'flag outline', 'flag checkered', 'flask', 'gamepad', 'gavel', 'gift', 'glass martini', 'globe', 'graduation cap', 'h square', 'heart', 'heart outline', 'heartbeat', 'home', 'hospital', 'hospital outline', 'image', 'image outline', 'images', 'images outline', 'industry', 'info', 'info circle', 'key', 'leaf', 'lemon', 'lemon outline', 'life ring', 'life ring outline', 'lightbulb', 'lightbulb outline', 'location arrow', 'low vision', 'magnet', 'male', 'map', 'map outline', 'map marker', 'map marker alternate', 'map pin', 'map signs', 'medkit', 'money bill alternate', 'money bill alternate outline', 'motorcycle', 'music', 'newspaper', 'newspaper outline', 'paw', 'phone', 'phone square', 'phone volume', 'plane', 'plug', 'plus', 'plus square', 'plus square outline', 'print', 'recycle', 'road', 'rocket', 'search', 'search minus', 'search plus', 'ship', 'shopping bag', 'shopping basket', 'shopping cart', 'shower', 'street view', 'subway', 'suitcase', 'tag', 'tags', 'taxi', 'thumbtack', 'ticket alternate', 'tint', 'train', 'tree', 'trophy', 'truck', 'tty', 'umbrella', 'university', 'utensil spoon', 'utensils', 'wheelchair', 'wifi', 'wrench'];
  var MEDICAL = ['ambulance', 'band aid', 'dna', 'first aid', 'heart', 'heart outline', 'heartbeat', 'hospital', 'hospital outline', 'hospital symbol', 'pills', 'plus', 'stethoscope', 'syringe', 'thermometer', 'user md', 'weight'];
  var OBJECTS = ['ambulance', 'anchor', 'archive', 'balance scale', 'bath', 'bed', 'beer', 'bell', 'bell outline', 'bicycle', 'binoculars', 'birthday cake', 'bomb', 'book', 'bookmark', 'bookmark outline', 'briefcase', 'bug', 'building', 'building outline', 'bullhorn', 'bullseye', 'bus', 'calculator', 'calendar', 'calendar outline', 'calendar alternate', 'calendar alternate outline', 'camera', 'camera retro', 'car', 'clipboard', 'clipboard outline', 'cloud', 'coffee', 'cog', 'cogs', 'compass', 'compass outline', 'copy', 'copy outline', 'cube', 'cubes', 'cut', 'envelope', 'envelope outline', 'envelope open', 'envelope open outline', 'eraser', 'eye', 'eye dropper', 'fax', 'fighter jet', 'file', 'file outline', 'file alternate', 'file alternate outline', 'film', 'fire', 'fire extinguisher', 'flag', 'flag outline', 'flag checkered', 'flask', 'futbol', 'futbol outline', 'gamepad', 'gavel', 'gem', 'gem outline', 'gift', 'glass martini', 'globe', 'graduation cap', 'hdd', 'hdd outline', 'headphones', 'heart', 'heart outline', 'home', 'hospital', 'hospital outline', 'hourglass', 'hourglass outline', 'image', 'image outline', 'images', 'images outline', 'industry', 'key', 'keyboard', 'keyboard outline', 'laptop', 'leaf', 'lemon', 'lemon outline', 'life ring', 'life ring outline', 'lightbulb', 'lightbulb outline', 'lock', 'lock open', 'magic', 'magnet', 'map', 'map outline', 'map marker', 'map marker alternate', 'map pin', 'map signs', 'medkit', 'microchip', 'microphone', 'mobile', 'mobile alternate', 'money bill alternate', 'money bill alternate outline', 'moon', 'moon outline', 'motorcycle', 'newspaper', 'newspaper outline', 'paint brush', 'paper plane', 'paper plane outline', 'paperclip', 'paste', 'paw', 'pencil alternate', 'phone', 'plane', 'plug', 'print', 'puzzle piece', 'road', 'rocket', 'save', 'save outline', 'search', 'shield alternate', 'shopping bag', 'shopping basket', 'shopping cart', 'shower', 'snowflake', 'snowflake outline', 'space shuttle', 'star', 'star outline', 'sticky note', 'sticky note outline', 'stopwatch', 'subway', 'suitcase', 'sun', 'sun outline', 'tablet', 'tablet alternate', 'tachometer alternate', 'tag', 'tags', 'taxi', 'thumbtack', 'ticket alternate', 'train', 'trash', 'trash alternate', 'trash alternate outline', 'tree', 'trophy', 'truck', 'tv', 'umbrella', 'university', 'unlock', 'unlock alternate', 'utensil spoon', 'utensils', 'wheelchair', 'wrench'];
  var PAYMENTS_SHOPPING = ['bell', 'bell outline', 'bookmark', 'bookmark outline', 'bullhorn', 'camera', 'camera retro', 'cart arrow down', 'cart plus', 'certificate', 'credit card', 'credit card outline', 'gem', 'gem outline', 'gift', 'handshake', 'handshake outline', 'heart', 'heart outline', 'key', 'shopping bag', 'shopping basket', 'shopping cart', 'star', 'star outline', 'tag', 'tags', 'thumbs down', 'thumbs down outline', 'thumbs up', 'thumbs up outline', 'trophy'];
  var SHAPES = ['bookmark', 'bookmark outline', 'calendar', 'calendar outline', 'certificate', 'circle', 'circle outline', 'cloud', 'comment', 'comment outline', 'file', 'file outline', 'folder', 'folder outline', 'heart', 'heart outline', 'map marker', 'play', 'square', 'square outline', 'star', 'star outline'];
  var SPINNERS = ['asterisk', 'certificate', 'circle notch', 'cog', 'compass', 'compass outline', 'crosshairs', 'life ring', 'life ring outline', 'snowflake', 'snowflake outline', 'spinner', 'sun', 'sun outline', 'sync'];
  var SPORTS = ['baseball ball', 'basketball ball', 'bowling ball', 'football ball', 'futbol', 'futbol outline', 'golf ball', 'hockey puck', 'quidditch', 'table tennis', 'volleyball ball'];
  var STATUS = ['ban', 'battery empty', 'battery full', 'battery half', 'battery quarter', 'battery three quarters', 'bell', 'bell outline', 'bell slash', 'bell slash outline', 'calendar', 'calendar outline', 'calendar alternate', 'calendar alternate outline', 'calendar check', 'calendar check outline', 'calendar minus', 'calendar minus outline', 'calendar plus', 'calendar plus outline', 'calendar times', 'calendar times outline', 'cart arrow down', 'cart plus', 'exclamation', 'exclamation circle', 'exclamation triangle', 'eye', 'eye slash', 'eye slash outline', 'file', 'file outline', 'file alternate', 'file alternate outline', 'folder', 'folder outline', 'folder open', 'folder open outline', 'info', 'info circle', 'lock', 'lock open', 'minus', 'minus circle', 'minus square', 'minus square outline', 'plus', 'plus circle', 'plus square', 'plus square outline', 'question', 'question circle', 'question circle outline', 'shield alternate', 'shopping cart', 'sign in alternate', 'sign out alternate', 'thermometer empty', 'thermometer full', 'thermometer half', 'thermometer quarter', 'thermometer three quarters', 'thumbs down', 'thumbs down outline', 'thumbs up', 'thumbs up outline', 'toggle off', 'toggle on', 'unlock', 'unlock alternate'];
  var USERS_PEOPLE = ['address book', 'address book outline', 'address card', 'address card outline', 'bed', 'blind', 'child', 'female', 'frown', 'frown outline', 'id badge', 'id badge outline', 'id card', 'id card outline', 'male', 'meh', 'meh outline', 'power off', 'smile', 'smile outline', 'street view', 'user', 'user outline', 'user circle', 'user circle outline', 'user md', 'user plus', 'user secret', 'user times', 'users', 'wheelchair'];
  var VEHICLES = ['ambulance', 'bicycle', 'bus', 'car', 'fighter jet', 'motorcycle', 'paper plane', 'paper plane outline', 'plane', 'rocket', 'ship', 'shopping cart', 'space shuttle', 'subway', 'taxi', 'train', 'truck', 'wheelchair'];
  var WRITING = ['archive', 'book', 'bookmark', 'bookmark outline', 'edit', 'edit outline', 'envelope', 'envelope outline', 'envelope open', 'envelope open outline', 'eraser', 'file', 'file outline', 'file alternate', 'file alternate outline', 'folder', 'folder outline', 'folder open', 'folder open outline', 'keyboard', 'keyboard outline', 'newspaper', 'newspaper outline', 'paper plane', 'paper plane outline', 'paperclip', 'paragraph', 'pen square', 'pencil alternate', 'quote left', 'quote right', 'sticky note', 'sticky note outline', 'thumbtack'];
  var BRANDS = ['500px', 'accessible', 'accusoft', 'adn', 'adversal', 'affiliatetheme', 'algolia', 'amazon', 'amazon pay', 'amilia', 'android', 'angellist', 'angrycreative', 'angular', 'app store', 'app store ios', 'apper', 'apple', 'apple pay', 'asymmetrik', 'audible', 'autoprefixer', 'avianex', 'aviato', 'aws', 'bandcamp', 'behance', 'behance square', 'bimobject', 'bitbucket', 'bitcoin', 'bity', 'black tie', 'blackberry', 'blogger', 'blogger b', 'bluetooth', 'bluetooth b', 'btc', 'buromobelexperte', 'buysellads', 'cc amazon pay', 'cc amex', 'cc apple pay', 'cc diners club', 'cc discover', 'cc jcb', 'cc mastercard', 'cc paypal', 'cc stripe', 'cc visa', 'centercode', 'chrome', 'cloudscale', 'cloudsmith', 'cloudversify', 'codepen', 'codiepie', 'connectdevelop', 'contao', 'cpanel', 'creative commons', 'css3', 'css3 alternate', 'cuttlefish', 'd and d', 'dashcube', 'delicious', 'deploydog', 'deskpro', 'deviantart', 'digg', 'digital ocean', 'discord', 'discourse', 'dochub', 'docker', 'draft2digital', 'dribbble', 'dribbble square', 'dropbox', 'drupal', 'dyalog', 'earlybirds', 'edge', 'elementor', 'ember', 'empire', 'envira', 'erlang', 'ethereum', 'etsy', 'expeditedssl', 'facebook', 'facebook f', 'facebook messenger', 'facebook square', 'firefox', 'first order', 'firstdraft', 'flickr', 'flipboard', 'fly', 'font awesome', 'font awesome alternate', 'font awesome flag', 'fonticons', 'fonticons fi', 'fort awesome', 'fort awesome alternate', 'forumbee', 'foursquare', 'free code camp', 'freebsd', 'get pocket', 'gg', 'gg circle', 'git', 'git square', 'github', 'github alternate', 'github square', 'gitkraken', 'gitlab', 'gitter', 'glide', 'glide g', 'gofore', 'goodreads', 'goodreads g', 'google', 'google drive', 'google play', 'google plus', 'google plus g', 'google plus square', 'google wallet', 'gratipay', 'grav', 'gripfire', 'grunt', 'gulp', 'hacker news', 'hacker news square', 'hips', 'hire a helper', 'hooli', 'hotjar', 'houzz', 'html5', 'hubspot', 'imdb', 'instagram', 'internet explorer', 'ioxhost', 'itunes', 'itunes note', 'jenkins', 'joget', 'joomla', 'js', 'js square', 'jsfiddle', 'keycdn', 'kickstarter', 'kickstarter k', 'korvue', 'laravel', 'lastfm', 'lastfm square', 'leanpub', 'less', 'linechat', 'linkedin', 'linkedin alternate', 'linode', 'linux', 'lyft', 'magento', 'maxcdn', 'medapps', 'medium', 'medium m', 'medrt', 'meetup', 'microsoft', 'mix', 'mixcloud', 'mizuni', 'modx', 'monero', 'napster', 'nintendo switch', 'node', 'node js', 'npm', 'ns8', 'nutritionix', 'odnoklassniki', 'odnoklassniki square', 'opencart', 'openid', 'opera', 'optin monster', 'osi', 'page4', 'pagelines', 'palfed', 'patreon', 'paypal', 'periscope', 'phabricator', 'phoenix framework', 'php', 'pied piper', 'pied piper alternate', 'pied piper pp', 'pinterest', 'pinterest p', 'pinterest square', 'playstation', 'product hunt', 'pushed', 'python', 'qq', 'quinscape', 'quora', 'ravelry', 'react', 'rebel', 'redriver', 'reddit', 'reddit alien', 'reddit square', 'rendact', 'renren', 'replyd', 'resolving', 'rocketchat', 'rockrms', 'safari', 'sass', 'schlix', 'scribd', 'searchengin', 'sellcast', 'sellsy', 'servicestack', 'shirtsinbulk', 'simplybuilt', 'sistrix', 'skyatlas', 'skype', 'slack', 'slack hash', 'slideshare', 'snapchat', 'snapchat ghost', 'snapchat square', 'soundcloud', 'speakap', 'spotify', 'stack exchange', 'stack overflow', 'staylinked', 'steam', 'steam square', 'steam symbol', 'sticker mule', 'strava', 'stripe', 'stripe s', 'studiovinari', 'stumbleupon', 'stumbleupon circle', 'superpowers', 'supple', 'telegram', 'telegram plane', 'tencent weibo', 'themeisle', 'trello', 'tripadvisor', 'tumblr', 'tumblr square', 'twitch', 'twitter', 'twitter square', 'typo3', 'uber', 'uikit', 'uniregistry', 'untappd', 'usb', 'ussunnah', 'vaadin', 'viacoin', 'viadeo', 'viadeo square', 'viber', 'vimeo', 'vimeo square', 'vimeo v', 'vine', 'vk', 'vnv', 'vuejs', 'wechat', 'weibo', 'weixin', 'whatsapp', 'whatsapp square', 'whmcs', 'wikipedia w', 'windows', 'wordpress', 'wordpress simple', 'wpbeginner', 'wpexplorer', 'wpforms', 'xbox', 'xing', 'xing square', 'y combinator', 'yahoo', 'yandex', 'yandex international', 'yelp', 'yoast', 'youtube', 'youtube square'];
  var ICONS = uniq_1([].concat(ACCESSIBILITY, ARROWS, AUDIO_VIDEO, BUSINESS, CHESS, CODE, COMMUNICATION, COMPUTERS, CURRENCY, DATE_TIME, DESIGN, EDITORS, FILES, GENDERS, HANDS_GESTURES, HEALTH, IMAGES, INTERFACES, LOGISTICS, MAPS, MEDICAL, OBJECTS, PAYMENTS_SHOPPING, SHAPES, SPINNERS, SPORTS, STATUS, USERS_PEOPLE, VEHICLES, WRITING, BRANDS));
  var ICON_ALIASES = ['chess rock', 'ordered list', 'unordered list', 'user doctor', 'shield', 'puzzle', 'add circle', 'add square', 'add to calendar', 'add to cart', 'add user', 'add', 'alarm mute', 'alarm', 'ald', 'als', 'announcement', 'area chart', 'area graph', 'arrow down cart', 'asexual', 'asl interpreting', 'asl', 'assistive listening devices', 'attach', 'attention', 'balance', 'bar', 'bathtub', 'battery four', 'battery high', 'battery low', 'battery one', 'battery three', 'battery two', 'battery zero', 'birthday', 'block layout', 'bluetooth alternative', 'broken chain', 'browser', 'call square', 'call', 'cancel', 'cart', 'cc', 'chain', 'chat', 'checked calendar', 'checkmark', 'circle notched', 'close', 'cny', 'cocktail', 'commenting', 'computer', 'configure', 'content', 'deafness', 'delete calendar', 'delete', 'detective', 'discussions', 'doctor', 'dollar', 'dont', 'drivers license', 'dropdown', 'emergency', 'envira gallery', 'erase', 'eur', 'euro', 'eyedropper', 'factory', 'favorite', 'feed', 'female homosexual', 'file text', 'file text outline', 'find', 'first aid', 'fork', 'game', 'gay', 'gbp', 'google plus circle', 'google plus official', 'grab', 'graduation', 'grid layout', 'group', 'h', 'hand victory', 'handicap', 'hard of hearing', 'header', 'help circle', 'help', 'heterosexual', 'hide', 'hotel', 'hourglass four', 'hourglass full', 'hourglass one', 'hourglass three', 'hourglass two', 'idea', 'ils', 'in cart', 'inr', 'intergender', 'intersex', 'jpy', 'krw', 'lab', 'law', 'legal', 'lesbian', 'lightning', 'like', 'line graph', 'linkedin square', 'linkify', 'lira', 'list layout', 'magnify', 'mail forward', 'mail outline', 'mail square', 'mail', 'male homosexual', 'man', 'marker', 'mars alternate', 'mars horizontal', 'mars vertical', 'microsoft edge', 'military', 'ms edge', 'mute', 'new pied piper', 'non binary transgender', 'numbered list', 'options', 'other gender horizontal', 'other gender vertical', 'other gender', 'payment', 'paypal card', 'pencil square', 'photo', 'picture', 'pie chart', 'pie graph', 'pied piper hat', 'pin', 'plus cart', 'point', 'pointing down', 'pointing left', 'pointing right', 'pointing up', 'pound', 'power cord', 'power', 'privacy', 'r circle', 'rain', 'record', 'refresh', 'remove circle', 'remove from calendar', 'remove user', 'remove', 'repeat', 'rmb', 'rouble', 'rub', 'ruble', 'rupee', 's15', 'selected radio', 'send', 'setting', 'settings', 'shekel', 'sheqel', 'shipping', 'shop', 'shuffle', 'shutdown', 'sidebar', 'signing', 'signup', 'sliders', 'soccer', 'sort alphabet ascending', 'sort alphabet descending', 'sort ascending', 'sort content ascending', 'sort content descending', 'sort descending', 'sort numeric ascending', 'sort numeric descending', 'sound', 'spy', 'stripe card', 'student', 'talk', 'target', 'teletype', 'television', 'text cursor', 'text telephone', 'theme', 'thermometer', 'thumb tack', 'time', 'tm', 'toggle down', 'toggle left', 'toggle right', 'toggle up', 'translate', 'travel', 'treatment', 'triangle down', 'triangle left', 'triangle right', 'triangle up', 'try', 'unhide', 'unlinkify', 'unmute', 'usd', 'user cancel', 'user close', 'user delete', 'user x', 'vcard', 'video camera', 'video play', 'volume control phone', 'wait', 'warning circle', 'warning sign', 'warning', 'wi-fi', 'winner', 'wizard', 'woman', 'won', 'wordpress beginner', 'wordpress forms', 'world', 'write square', 'x', 'yen', 'zip', 'zoom in', 'zoom out', 'zoom', 'bitbucket square', 'checkmark box', 'circle thin', 'cloud download', 'cloud upload', 'compose', 'conversation', 'credit card alternative', 'currency', 'dashboard', 'diamond', 'disk', 'exchange', 'external share', 'external square', 'external', 'facebook official', 'food', 'hourglass zero', 'level down', 'level up', 'log out', 'meanpath', 'money', 'move', 'pencil', 'protect', 'radio', 'remove bookmark', 'resize horizontal', 'resize vertical', 'sign in', 'sign out', 'spoon', 'star half empty', 'star half full', 'ticket', 'times rectangle', 'write', 'youtube play'];
  var ICONS_AND_ALIASES = uniq_1([].concat(toConsumableArray(ICONS), ICON_ALIASES)); // Some icon names are not part of icons.css.
  // These are only valid as children of other components.
  // Their CSS rules are defined by a specific component's CSS.
  // We don't want to show name warnings for those usages so we add them as valid names here.

  var COMPONENT_CONTEXT_SPECIFIC_ICONS = ['left dropdown'];
  var ALL_ICONS_IN_ALL_CONTEXTS = uniq_1([].concat(toConsumableArray(ICONS_AND_ALIASES), COMPONENT_CONTEXT_SPECIFIC_ICONS));

  /**
   * Normalizes the offset value.
   * @param {number|array} value The value to normalize.
   * @returns {number}
   */
  var normalizeOffset = (function (value) {
    return typeof value === 'number' || typeof value === 'string' ? [value, value] : value;
  });

  /**
   * Normalizes the duration of a transition.
   * @param {number|object} duration The value to normalize.
   * @param {'hide'|'show'} type The type of transition.
   * @returns {number}
   */
  var normalizeTransitionDuration = (function (duration, type) {
    return typeof duration === 'number' || typeof duration === 'string' ? duration : duration[type];
  });

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */
  function isEqual(value, other) {
    return _baseIsEqual(value, other);
  }

  var isEqual_1 = isEqual;

  /**
   * Creates an array excluding all given values using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * **Note:** Unlike `_.pull`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.xor
   * @example
   *
   * _.without([2, 1, 2, 3], 1, 2);
   * // => [3]
   */
  var without = _baseRest(function(array, values) {
    return isArrayLikeObject_1(array)
      ? _baseDifference(array, values)
      : [];
  });

  var without_1 = without;

  /**
   * Several icons can be used together as a group.
   */

  function IconGroup(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        size = props.size;
    var classes = classnames(size, 'icons', className);
    var rest = getUnhandledProps(IconGroup, props);
    var ElementType = getElementType(IconGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  IconGroup.handledProps = ["as", "children", "className", "content", "size"];
  IconGroup.propTypes =  {};
  IconGroup.defaultProps = {
    as: 'i'
  };

  /**
   * An icon is a glyph used to represent something else.
   * @see Image
   */

  var Icon =
  /*#__PURE__*/
  function (_PureComponent) {
    inherits(Icon, _PureComponent);

    function Icon() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Icon);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Icon)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var disabled = _this.props.disabled;

        if (disabled) {
          e.preventDefault();
          return;
        }

        invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(Icon, [{
      key: "getIconAriaOptions",
      value: function getIconAriaOptions() {
        var ariaOptions = {};
        var _this$props = this.props,
            ariaLabel = _this$props['aria-label'],
            ariaHidden = _this$props['aria-hidden'];

        if (isNil_1(ariaLabel)) {
          ariaOptions['aria-hidden'] = 'true';
        } else {
          ariaOptions['aria-label'] = ariaLabel;
        }

        if (!isNil_1(ariaHidden)) {
          ariaOptions['aria-hidden'] = ariaHidden;
        }

        return ariaOptions;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            bordered = _this$props2.bordered,
            circular = _this$props2.circular,
            className = _this$props2.className,
            color = _this$props2.color,
            corner = _this$props2.corner,
            disabled = _this$props2.disabled,
            fitted = _this$props2.fitted,
            flipped = _this$props2.flipped,
            inverted = _this$props2.inverted,
            link = _this$props2.link,
            loading = _this$props2.loading,
            name = _this$props2.name,
            rotated = _this$props2.rotated,
            size = _this$props2.size;
        var classes = classnames(color, name, size, useKeyOnly(bordered, 'bordered'), useKeyOnly(circular, 'circular'), useKeyOnly(disabled, 'disabled'), useKeyOnly(fitted, 'fitted'), useKeyOnly(inverted, 'inverted'), useKeyOnly(link, 'link'), useKeyOnly(loading, 'loading'), useKeyOrValueAndKey(corner, 'corner'), useValueAndKey(flipped, 'flipped'), useValueAndKey(rotated, 'rotated'), 'icon', className);
        var rest = getUnhandledProps(Icon, this.props);
        var ElementType = getElementType(Icon, this.props);
        var ariaOptions = this.getIconAriaOptions();
        return React__default.createElement(ElementType, _extends_1({}, rest, ariaOptions, {
          className: classes,
          onClick: this.handleClick
        }));
      }
    }]);

    return Icon;
  }(React.PureComponent);

  defineProperty(Icon, "defaultProps", {
    as: 'i'
  });

  defineProperty(Icon, "Group", IconGroup);

  defineProperty(Icon, "handledProps", ["aria-hidden", "aria-label", "as", "bordered", "circular", "className", "color", "corner", "disabled", "fitted", "flipped", "inverted", "link", "loading", "name", "rotated", "size"]);

  Icon.propTypes =  {};
  Icon.create = createShorthandFactory(Icon, function (value) {
    return {
      name: value
    };
  });

  var isObject$1 = function isObject(val) {
    return val !== null && !Array.isArray(val) && typeof val === 'object'
  };

  var codes = {
    // ----------------------------------------
    // By Code
    // ----------------------------------------
    3: 'Cancel',
    6: 'Help',
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    28: 'Convert',
    29: 'NonConvert',
    30: 'Accept',
    31: 'ModeChange',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    41: 'Select',
    42: 'Print',
    43: 'Execute',
    44: 'PrintScreen',
    45: 'Insert',
    46: 'Delete',
    48: ['0', ')'],
    49: ['1', '!'],
    50: ['2', '@'],
    51: ['3', '#'],
    52: ['4', '$'],
    53: ['5', '%'],
    54: ['6', '^'],
    55: ['7', '&'],
    56: ['8', '*'],
    57: ['9', '('],
    91: 'OS',
    93: 'ContextMenu',
    144: 'NumLock',
    145: 'ScrollLock',
    181: 'VolumeMute',
    182: 'VolumeDown',
    183: 'VolumeUp',
    186: [';', ':'],
    187: ['=', '+'],
    188: [',', '<'],
    189: ['-', '_'],
    190: ['.', '>'],
    191: ['/', '?'],
    192: ['`', '~'],
    219: ['[', '{'],
    220: ['\\', '|'],
    221: [']', '}'],
    222: ["'", '"'],
    224: 'Meta',
    225: 'AltGraph',
    246: 'Attn',
    247: 'CrSel',
    248: 'ExSel',
    249: 'EraseEof',
    250: 'Play',
    251: 'ZoomOut',
  };

  // Function Keys (F1-24)
  for (var i = 0; i < 24; i += 1) {
    codes[112 + i] = 'F' + (i + 1);
  }

  // Alphabet (a-Z)
  for (var j = 0; j < 26; j += 1) {
    var n = j + 65;
    codes[n] = [String.fromCharCode(n + 32), String.fromCharCode(n)];
  }

  var keyboardKey = {
    codes: codes,

    /**
     * Get the `keyCode` or `which` value from a keyboard event or `key` name.
     * @param {string|object} eventOrKey A keyboard event-like object or `key` name.
     * @param {string} [eventOrKey.key] If object, it must have one of these keys.
     * @param {number} [eventOrKey.keyCode] If object, it must have one of these keys.
     * @param {number} [eventOrKey.which] If object, it must have one of these keys.
     * @returns {number|undefined}
     */
    getCode: function getCode(eventOrKey) {
      if (isObject$1(eventOrKey)) {
        return eventOrKey.keyCode || eventOrKey.which || this[eventOrKey.key]
      }
      return this[eventOrKey]
    },

    /**
     * Get the key name from a keyboard event, `keyCode`, or `which` value.
     * @param {number|object} eventOrCode A keyboard event-like object or key code.
     * @param {string} [eventOrCode.key] If object with a `key` name, it will be returned.
     * @param {number} [eventOrCode.keyCode] If object, it must have one of these keys.
     * @param {number} [eventOrCode.which] If object, it must have one of these keys.
     * @param {boolean} [eventOrCode.shiftKey] If object, it must have one of these keys.
     * @returns {string|undefined}
     */
    getKey: function getKey(eventOrCode) {
      var isEvent = isObject$1(eventOrCode);

      // handle events with a `key` already defined
      if (isEvent && eventOrCode.key) {
        return eventOrCode.key
      }

      var name = codes[isEvent ? eventOrCode.keyCode || eventOrCode.which : eventOrCode];

      if (Array.isArray(name)) {
        if (isEvent) {
          name = name[eventOrCode.shiftKey ? 1 : 0];
        } else {
          name = name[0];
        }
      }

      return name
    },

    // ----------------------------------------
    // By Name
    // ----------------------------------------
    // declare these manually for static analysis
    Cancel: 3,
    Help: 6,
    Backspace: 8,
    Tab: 9,
    Clear: 12,
    Enter: 13,
    Shift: 16,
    Control: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    Escape: 27,
    Convert: 28,
    NonConvert: 29,
    Accept: 30,
    ModeChange: 31,
    ' ': 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    Select: 41,
    Print: 42,
    Execute: 43,
    PrintScreen: 44,
    Insert: 45,
    Delete: 46,
    0: 48,
    ')': 48,
    1: 49,
    '!': 49,
    2: 50,
    '@': 50,
    3: 51,
    '#': 51,
    4: 52,
    $: 52,
    5: 53,
    '%': 53,
    6: 54,
    '^': 54,
    7: 55,
    '&': 55,
    8: 56,
    '*': 56,
    9: 57,
    '(': 57,
    a: 65,
    A: 65,
    b: 66,
    B: 66,
    c: 67,
    C: 67,
    d: 68,
    D: 68,
    e: 69,
    E: 69,
    f: 70,
    F: 70,
    g: 71,
    G: 71,
    h: 72,
    H: 72,
    i: 73,
    I: 73,
    j: 74,
    J: 74,
    k: 75,
    K: 75,
    l: 76,
    L: 76,
    m: 77,
    M: 77,
    n: 78,
    N: 78,
    o: 79,
    O: 79,
    p: 80,
    P: 80,
    q: 81,
    Q: 81,
    r: 82,
    R: 82,
    s: 83,
    S: 83,
    t: 84,
    T: 84,
    u: 85,
    U: 85,
    v: 86,
    V: 86,
    w: 87,
    W: 87,
    x: 88,
    X: 88,
    y: 89,
    Y: 89,
    z: 90,
    Z: 90,
    OS: 91,
    ContextMenu: 93,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NumLock: 144,
    ScrollLock: 145,
    VolumeMute: 181,
    VolumeDown: 182,
    VolumeUp: 183,
    ';': 186,
    ':': 186,
    '=': 187,
    '+': 187,
    ',': 188,
    '<': 188,
    '-': 189,
    _: 189,
    '.': 190,
    '>': 190,
    '/': 191,
    '?': 191,
    '`': 192,
    '~': 192,
    '[': 219,
    '{': 219,
    '\\': 220,
    '|': 220,
    ']': 221,
    '}': 221,
    "'": 222,
    '"': 222,
    Meta: 224,
    AltGraph: 225,
    Attn: 246,
    CrSel: 247,
    ExSel: 248,
    EraseEof: 249,
    Play: 250,
    ZoomOut: 251,
  };

  // ----------------------------------------
  // By Alias
  // ----------------------------------------
  // provide dot-notation accessible keys for all key names
  keyboardKey.Spacebar = keyboardKey[' '];
  keyboardKey.Digit0 = keyboardKey['0'];
  keyboardKey.Digit1 = keyboardKey['1'];
  keyboardKey.Digit2 = keyboardKey['2'];
  keyboardKey.Digit3 = keyboardKey['3'];
  keyboardKey.Digit4 = keyboardKey['4'];
  keyboardKey.Digit5 = keyboardKey['5'];
  keyboardKey.Digit6 = keyboardKey['6'];
  keyboardKey.Digit7 = keyboardKey['7'];
  keyboardKey.Digit8 = keyboardKey['8'];
  keyboardKey.Digit9 = keyboardKey['9'];
  keyboardKey.Tilde = keyboardKey['~'];
  keyboardKey.GraveAccent = keyboardKey['`'];
  keyboardKey.ExclamationPoint = keyboardKey['!'];
  keyboardKey.AtSign = keyboardKey['@'];
  keyboardKey.PoundSign = keyboardKey['#'];
  keyboardKey.PercentSign = keyboardKey['%'];
  keyboardKey.Caret = keyboardKey['^'];
  keyboardKey.Ampersand = keyboardKey['&'];
  keyboardKey.PlusSign = keyboardKey['+'];
  keyboardKey.MinusSign = keyboardKey['-'];
  keyboardKey.EqualsSign = keyboardKey['='];
  keyboardKey.DivisionSign = keyboardKey['/'];
  keyboardKey.MultiplicationSign = keyboardKey['*'];
  keyboardKey.Comma = keyboardKey[','];
  keyboardKey.Decimal = keyboardKey['.'];
  keyboardKey.Colon = keyboardKey[':'];
  keyboardKey.Semicolon = keyboardKey[';'];
  keyboardKey.Pipe = keyboardKey['|'];
  keyboardKey.BackSlash = keyboardKey['\\'];
  keyboardKey.QuestionMark = keyboardKey['?'];
  keyboardKey.SingleQuote = keyboardKey["'"];
  keyboardKey.DoubleQuote = keyboardKey['"'];
  keyboardKey.LeftCurlyBrace = keyboardKey['{'];
  keyboardKey.RightCurlyBrace = keyboardKey['}'];
  keyboardKey.LeftParenthesis = keyboardKey['('];
  keyboardKey.RightParenthesis = keyboardKey[')'];
  keyboardKey.LeftAngleBracket = keyboardKey['<'];
  keyboardKey.RightAngleBracket = keyboardKey['>'];
  keyboardKey.LeftSquareBracket = keyboardKey['['];
  keyboardKey.RightSquareBracket = keyboardKey[']'];

  var keyboardKey_1 = keyboardKey;

  /**
   * An inner component that allows you to render children outside their parent.
   */
  var PortalInner =
  /*#__PURE__*/
  function (_Component) {
    inherits(PortalInner, _Component);

    function PortalInner() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, PortalInner);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PortalInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleRef", function (c) {
        handleRef(_this.props.innerRef, c);
      });

      return _this;
    }

    createClass(PortalInner, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        invoke_1(this.props, 'onMount', null, this.props);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        invoke_1(this.props, 'onUnmount', null, this.props);
      }
    }, {
      key: "render",
      value: function render() {
        if (!isBrowser()) return null;
        var _this$props = this.props,
            children = _this$props.children,
            _this$props$mountNode = _this$props.mountNode,
            mountNode = _this$props$mountNode === void 0 ? document.body : _this$props$mountNode;
        return ReactDOM.createPortal(React__default.createElement(Ref, {
          innerRef: this.handleRef
        }, children), mountNode);
      }
    }]);

    return PortalInner;
  }(React.Component);

  defineProperty(PortalInner, "handledProps", ["children", "innerRef", "mountNode", "onMount", "onUnmount"]);

  PortalInner.propTypes =  {};

  /**
   * A component that allows you to render children outside their parent.
   * @see Modal
   * @see Popup
   * @see Dimmer
   * @see Confirm
   */
  var Portal =
  /*#__PURE__*/
  function (_Component) {
    inherits(Portal, _Component);

    function Portal() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Portal);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Portal)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "contentRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "triggerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "latestDocumentMouseDownEvent", null);

      defineProperty(assertThisInitialized(_this), "handleDocumentMouseDown", function (e) {
        _this.latestDocumentMouseDownEvent = e;
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentClick", function (e) {
        var closeOnDocumentClick = _this.props.closeOnDocumentClick;
        var currentMouseDownEvent = _this.latestDocumentMouseDownEvent;
        _this.latestDocumentMouseDownEvent = null;

        if (!_this.contentRef.current || // no portal
        doesNodeContainClick(_this.triggerRef.current, e) || // event happened in trigger (delegate to trigger handlers)
        currentMouseDownEvent && doesNodeContainClick(_this.contentRef.current, currentMouseDownEvent) || // event originated in the portal but was ended outside
        doesNodeContainClick(_this.contentRef.current, e) // event happened in the portal
        ) {
            return;
          } // ignore the click


        if (closeOnDocumentClick) {
          _this.close(e);
        }
      });

      defineProperty(assertThisInitialized(_this), "handleEscape", function (e) {
        if (!_this.props.closeOnEscape) return;
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Escape) return;

        _this.close(e);
      });

      defineProperty(assertThisInitialized(_this), "handlePortalMouseLeave", function (e) {
        var _this$props = _this.props,
            closeOnPortalMouseLeave = _this$props.closeOnPortalMouseLeave,
            mouseLeaveDelay = _this$props.mouseLeaveDelay;
        if (!closeOnPortalMouseLeave) return; // Do not close the portal when 'mouseleave' is triggered by children

        if (e.target !== _this.contentRef.current) return;
        _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
      });

      defineProperty(assertThisInitialized(_this), "handlePortalMouseEnter", function () {
        // In order to enable mousing from the trigger to the portal, we need to
        // clear the mouseleave timer that was set when leaving the trigger.
        var closeOnPortalMouseLeave = _this.props.closeOnPortalMouseLeave;
        if (!closeOnPortalMouseLeave) return;
        clearTimeout(_this.mouseLeaveTimer);
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerBlur", function (e) {
        var _this$props2 = _this.props,
            trigger = _this$props2.trigger,
            closeOnTriggerBlur = _this$props2.closeOnTriggerBlur; // Call original event handler

        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        invoke_1.apply(void 0, [trigger, 'props.onBlur', e].concat(rest)); // IE 11 doesn't work with relatedTarget in blur events


        var target = e.relatedTarget || document.activeElement; // do not close if focus is given to the portal

        var didFocusPortal = invoke_1(_this.contentRef.current, 'contains', target);

        if (!closeOnTriggerBlur || didFocusPortal) return;

        _this.close(e);
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerClick", function (e) {
        var _this$props3 = _this.props,
            trigger = _this$props3.trigger,
            closeOnTriggerClick = _this$props3.closeOnTriggerClick,
            openOnTriggerClick = _this$props3.openOnTriggerClick;
        var open = _this.state.open; // Call original event handler

        for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          rest[_key3 - 1] = arguments[_key3];
        }

        invoke_1.apply(void 0, [trigger, 'props.onClick', e].concat(rest));

        if (open && closeOnTriggerClick) {
          _this.close(e);
        } else if (!open && openOnTriggerClick) {
          _this.open(e);
        }
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerFocus", function (e) {
        var _this$props4 = _this.props,
            trigger = _this$props4.trigger,
            openOnTriggerFocus = _this$props4.openOnTriggerFocus; // Call original event handler

        for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          rest[_key4 - 1] = arguments[_key4];
        }

        invoke_1.apply(void 0, [trigger, 'props.onFocus', e].concat(rest));

        if (!openOnTriggerFocus) return;

        _this.open(e);
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerMouseLeave", function (e) {
        clearTimeout(_this.mouseEnterTimer);
        var _this$props5 = _this.props,
            trigger = _this$props5.trigger,
            closeOnTriggerMouseLeave = _this$props5.closeOnTriggerMouseLeave,
            mouseLeaveDelay = _this$props5.mouseLeaveDelay; // Call original event handler

        for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          rest[_key5 - 1] = arguments[_key5];
        }

        invoke_1.apply(void 0, [trigger, 'props.onMouseLeave', e].concat(rest));

        if (!closeOnTriggerMouseLeave) return;
        _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerMouseEnter", function (e) {
        clearTimeout(_this.mouseLeaveTimer);
        var _this$props6 = _this.props,
            trigger = _this$props6.trigger,
            mouseEnterDelay = _this$props6.mouseEnterDelay,
            openOnTriggerMouseEnter = _this$props6.openOnTriggerMouseEnter; // Call original event handler

        for (var _len6 = arguments.length, rest = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          rest[_key6 - 1] = arguments[_key6];
        }

        invoke_1.apply(void 0, [trigger, 'props.onMouseEnter', e].concat(rest));

        if (!openOnTriggerMouseEnter) return;
        _this.mouseEnterTimer = _this.openWithTimeout(e, mouseEnterDelay);
      });

      defineProperty(assertThisInitialized(_this), "open", function (e) {
        var onOpen = _this.props.onOpen;
        if (onOpen) onOpen(e, _this.props);

        _this.trySetState({
          open: true
        });
      });

      defineProperty(assertThisInitialized(_this), "openWithTimeout", function (e, delay) {
        // React wipes the entire event object and suggests using e.persist() if
        // you need the event for async access. However, even with e.persist
        // certain required props (e.g. currentTarget) are null so we're forced to clone.
        var eventClone = objectSpread({}, e);

        return setTimeout(function () {
          return _this.open(eventClone);
        }, delay || 0);
      });

      defineProperty(assertThisInitialized(_this), "close", function (e) {
        var onClose = _this.props.onClose;
        if (onClose) onClose(e, _this.props);

        _this.trySetState({
          open: false
        });
      });

      defineProperty(assertThisInitialized(_this), "closeWithTimeout", function (e, delay) {
        // React wipes the entire event object and suggests using e.persist() if
        // you need the event for async access. However, even with e.persist
        // certain required props (e.g. currentTarget) are null so we're forced to clone.
        var eventClone = objectSpread({}, e);

        return setTimeout(function () {
          return _this.close(eventClone);
        }, delay || 0);
      });

      defineProperty(assertThisInitialized(_this), "handleMount", function () {
        invoke_1(_this.props, 'onMount', null, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleUnmount", function () {
        invoke_1(_this.props, 'onUnmount', null, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleTriggerRef", function (c) {
        _this.triggerRef.current = c;
        handleRef(_this.props.triggerRef, c);
      });

      return _this;
    }

    createClass(Portal, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // Clean up timers
        clearTimeout(this.mouseEnterTimer);
        clearTimeout(this.mouseLeaveTimer);
      } // ----------------------------------------
      // Document Event Handlers
      // ----------------------------------------

    }, {
      key: "render",
      value: function render() {
        var _this$props7 = this.props,
            children = _this$props7.children,
            eventPool = _this$props7.eventPool,
            mountNode = _this$props7.mountNode,
            trigger = _this$props7.trigger;
        var open = this.state.open;
        return React__default.createElement(React.Fragment, null, open && React__default.createElement(React.Fragment, null, React__default.createElement(PortalInner, {
          innerRef: this.contentRef,
          mountNode: mountNode,
          onMount: this.handleMount,
          onUnmount: this.handleUnmount
        }, children), React__default.createElement(lib, {
          name: "mouseleave",
          on: this.handlePortalMouseLeave,
          pool: eventPool,
          target: this.contentRef
        }), React__default.createElement(lib, {
          name: "mouseenter",
          on: this.handlePortalMouseEnter,
          pool: eventPool,
          target: this.contentRef
        }), React__default.createElement(lib, {
          name: "mousedown",
          on: this.handleDocumentMouseDown,
          pool: eventPool
        }), React__default.createElement(lib, {
          name: "click",
          on: this.handleDocumentClick,
          pool: eventPool
        }), React__default.createElement(lib, {
          name: "keydown",
          on: this.handleEscape,
          pool: eventPool
        })), trigger && React__default.createElement(Ref, {
          innerRef: this.handleTriggerRef
        }, React.cloneElement(trigger, {
          onBlur: this.handleTriggerBlur,
          onClick: this.handleTriggerClick,
          onFocus: this.handleTriggerFocus,
          onMouseLeave: this.handleTriggerMouseLeave,
          onMouseEnter: this.handleTriggerMouseEnter
        })));
      }
    }]);

    return Portal;
  }(AutoControlledComponent);

  defineProperty(Portal, "defaultProps", {
    closeOnDocumentClick: true,
    closeOnEscape: true,
    eventPool: 'default',
    openOnTriggerClick: true
  });

  defineProperty(Portal, "autoControlledProps", ['open']);

  defineProperty(Portal, "Inner", PortalInner);

  defineProperty(Portal, "handledProps", ["children", "closeOnDocumentClick", "closeOnEscape", "closeOnPortalMouseLeave", "closeOnTriggerBlur", "closeOnTriggerClick", "closeOnTriggerMouseLeave", "defaultOpen", "eventPool", "mountNode", "mouseEnterDelay", "mouseLeaveDelay", "onClose", "onMount", "onOpen", "onUnmount", "open", "openOnTriggerClick", "openOnTriggerFocus", "openOnTriggerMouseEnter", "trigger", "triggerRef"]);

  Portal.propTypes =  {};

  /**
   * A dimmable sub-component for Dimmer.
   */

  function DimmerDimmable(props) {
    var blurring = props.blurring,
        className = props.className,
        children = props.children,
        content = props.content,
        dimmed = props.dimmed;
    var classes = classnames(useKeyOnly(blurring, 'blurring'), useKeyOnly(dimmed, 'dimmed'), 'dimmable', className);
    var rest = getUnhandledProps(DimmerDimmable, props);
    var ElementType = getElementType(DimmerDimmable, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  DimmerDimmable.handledProps = ["as", "blurring", "children", "className", "content", "dimmed"];
  DimmerDimmable.propTypes =  {};

  /**
   * An inner element for a Dimmer.
   */

  var DimmerInner =
  /*#__PURE__*/
  function (_Component) {
    inherits(DimmerInner, _Component);

    function DimmerInner() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, DimmerInner);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(DimmerInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "containerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "contentRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var contentRef = _this.contentRef.current;

        invoke_1(_this.props, 'onClick', e, _this.props);

        if (contentRef && contentRef !== e.target && doesNodeContainClick(contentRef, e)) {
          return;
        }

        invoke_1(_this.props, 'onClickOutside', e, _this.props);
      });

      return _this;
    }

    createClass(DimmerInner, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var active = this.props.active;
        this.toggleStyles(active);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var currentActive = this.props.active;
        var prevActive = prevProps.active;
        if (prevActive !== currentActive) this.toggleStyles(currentActive);
      }
    }, {
      key: "toggleStyles",
      value: function toggleStyles(active) {
        var containerRef = this.containerRef.current;
        if (!containerRef || !containerRef.style) return;

        if (active) {
          containerRef.style.setProperty('display', 'flex', 'important');
        } else {
          containerRef.style.removeProperty('display');
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content,
            disabled = _this$props.disabled,
            inverted = _this$props.inverted,
            page = _this$props.page,
            simple = _this$props.simple,
            verticalAlign = _this$props.verticalAlign;
        var classes = classnames('ui', useKeyOnly(active, 'active transition visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(inverted, 'inverted'), useKeyOnly(page, 'page'), useKeyOnly(simple, 'simple'), useVerticalAlignProp(verticalAlign), 'dimmer', className);
        var rest = getUnhandledProps(DimmerInner, this.props);
        var ElementType = getElementType(DimmerInner, this.props);
        var childrenContent = isNil(children) ? content : children;
        return React__default.createElement(Ref, {
          innerRef: this.containerRef
        }, React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), childrenContent && React__default.createElement("div", {
          className: "content",
          ref: this.contentRef
        }, childrenContent)));
      }
    }]);

    return DimmerInner;
  }(React.Component);

  defineProperty(DimmerInner, "handledProps", ["active", "as", "children", "className", "content", "disabled", "inverted", "onClick", "onClickOutside", "page", "simple", "verticalAlign"]);
  DimmerInner.propTypes =  {};

  /**
   * A dimmer hides distractions to focus attention on particular content.
   */

  var Dimmer =
  /*#__PURE__*/
  function (_Component) {
    inherits(Dimmer, _Component);

    function Dimmer() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Dimmer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Dimmer)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handlePortalMount", function () {
        if (!isBrowser()) return; // Heads up, IE doesn't support second argument in add()

        document.body.classList.add('dimmed');
        document.body.classList.add('dimmable');
      });

      defineProperty(assertThisInitialized(_this), "handlePortalUnmount", function () {
        if (!isBrowser()) return; // Heads up, IE doesn't support second argument in add()

        document.body.classList.remove('dimmed');
        document.body.classList.remove('dimmable');
      });

      return _this;
    }

    createClass(Dimmer, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            page = _this$props.page;
        var rest = getUnhandledProps(Dimmer, this.props);

        if (page) {
          return React__default.createElement(Portal, {
            closeOnEscape: false,
            closeOnDocumentClick: false,
            onMount: this.handlePortalMount,
            onUnmount: this.handlePortalUnmount,
            open: active,
            openOnTriggerClick: false
          }, React__default.createElement(DimmerInner, _extends_1({}, rest, {
            active: active,
            page: page
          })));
        }

        return React__default.createElement(DimmerInner, _extends_1({}, rest, {
          active: active,
          page: page
        }));
      }
    }]);

    return Dimmer;
  }(React.Component);

  defineProperty(Dimmer, "Dimmable", DimmerDimmable);

  defineProperty(Dimmer, "Inner", DimmerInner);

  defineProperty(Dimmer, "handledProps", ["active", "page"]);
  Dimmer.propTypes =  {};
  Dimmer.create = createShorthandFactory(Dimmer, function (value) {
    return {
      content: value
    };
  });

  /**
   * A group of images.
   */

  function ImageGroup(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        size = props.size;
    var classes = classnames('ui', size, className, 'images');
    var rest = getUnhandledProps(ImageGroup, props);
    var ElementType = getElementType(ImageGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ImageGroup.handledProps = ["as", "children", "className", "content", "size"];
  ImageGroup.propTypes =  {};

  /**
   * An image is a graphic representation of something.
   * @see Icon
   */

  function Image(props) {
    var avatar = props.avatar,
        bordered = props.bordered,
        centered = props.centered,
        children = props.children,
        circular = props.circular,
        className = props.className,
        content = props.content,
        dimmer = props.dimmer,
        disabled = props.disabled,
        floated = props.floated,
        fluid = props.fluid,
        hidden = props.hidden,
        href = props.href,
        inline = props.inline,
        label = props.label,
        rounded = props.rounded,
        size = props.size,
        spaced = props.spaced,
        verticalAlign = props.verticalAlign,
        wrapped = props.wrapped,
        ui = props.ui;
    var classes = classnames(useKeyOnly(ui, 'ui'), size, useKeyOnly(avatar, 'avatar'), useKeyOnly(bordered, 'bordered'), useKeyOnly(circular, 'circular'), useKeyOnly(centered, 'centered'), useKeyOnly(disabled, 'disabled'), useKeyOnly(fluid, 'fluid'), useKeyOnly(hidden, 'hidden'), useKeyOnly(inline, 'inline'), useKeyOnly(rounded, 'rounded'), useKeyOrValueAndKey(spaced, 'spaced'), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), 'image', className);
    var rest = getUnhandledProps(Image, props);

    var _partitionHTMLProps = partitionHTMLProps(rest, {
      htmlProps: htmlImageProps
    }),
        _partitionHTMLProps2 = slicedToArray(_partitionHTMLProps, 2),
        imgTagProps = _partitionHTMLProps2[0],
        rootProps = _partitionHTMLProps2[1];

    var ElementType = getElementType(Image, props, function () {
      if (!isNil_1(dimmer) || !isNil_1(label) || !isNil_1(wrapped) || !isNil(children)) {
        return 'div';
      }
    });

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    if (ElementType === 'img') {
      return React__default.createElement(ElementType, _extends_1({}, rootProps, imgTagProps, {
        className: classes
      }));
    }

    return React__default.createElement(ElementType, _extends_1({}, rootProps, {
      className: classes,
      href: href
    }), Dimmer.create(dimmer, {
      autoGenerateKey: false
    }), Label.create(label, {
      autoGenerateKey: false
    }), React__default.createElement("img", imgTagProps));
  }

  Image.handledProps = ["as", "avatar", "bordered", "centered", "children", "circular", "className", "content", "dimmer", "disabled", "floated", "fluid", "hidden", "href", "inline", "label", "rounded", "size", "spaced", "ui", "verticalAlign", "wrapped"];
  Image.Group = ImageGroup;
  Image.propTypes =  {};
  Image.defaultProps = {
    as: 'img',
    ui: true
  };
  Image.create = createShorthandFactory(Image, function (value) {
    return {
      src: value
    };
  });

  function LabelDetail(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('detail', className);
    var rest = getUnhandledProps(LabelDetail, props);
    var ElementType = getElementType(LabelDetail, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  LabelDetail.handledProps = ["as", "children", "className", "content"];
  LabelDetail.propTypes =  {};
  LabelDetail.create = createShorthandFactory(LabelDetail, function (val) {
    return {
      content: val
    };
  });

  /**
   * A label can be grouped.
   */

  function LabelGroup(props) {
    var children = props.children,
        circular = props.circular,
        className = props.className,
        color = props.color,
        content = props.content,
        size = props.size,
        tag = props.tag;
    var classes = classnames('ui', color, size, useKeyOnly(circular, 'circular'), useKeyOnly(tag, 'tag'), 'labels', className);
    var rest = getUnhandledProps(LabelGroup, props);
    var ElementType = getElementType(LabelGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  LabelGroup.handledProps = ["as", "children", "circular", "className", "color", "content", "size", "tag"];
  LabelGroup.propTypes =  {};

  /**
   * A label displays content classification.
   */

  var Label =
  /*#__PURE__*/
  function (_Component) {
    inherits(Label, _Component);

    function Label() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Label);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Label)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var onClick = _this.props.onClick;
        if (onClick) onClick(e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleIconOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e) {
            invoke_1(predefinedProps, 'onClick', e);

            invoke_1(_this.props, 'onRemove', e, _this.props);
          }
        };
      });

      return _this;
    }

    createClass(Label, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            attached = _this$props.attached,
            basic = _this$props.basic,
            children = _this$props.children,
            circular = _this$props.circular,
            className = _this$props.className,
            color = _this$props.color,
            content = _this$props.content,
            corner = _this$props.corner,
            detail = _this$props.detail,
            empty = _this$props.empty,
            floating = _this$props.floating,
            horizontal = _this$props.horizontal,
            icon = _this$props.icon,
            image = _this$props.image,
            onRemove = _this$props.onRemove,
            pointing = _this$props.pointing,
            prompt = _this$props.prompt,
            removeIcon = _this$props.removeIcon,
            ribbon = _this$props.ribbon,
            size = _this$props.size,
            tag = _this$props.tag;
        var pointingClass = pointing === true && 'pointing' || (pointing === 'left' || pointing === 'right') && "".concat(pointing, " pointing") || (pointing === 'above' || pointing === 'below') && "pointing ".concat(pointing);
        var classes = classnames('ui', color, pointingClass, size, useKeyOnly(active, 'active'), useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(empty, 'empty'), useKeyOnly(floating, 'floating'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(image === true, 'image'), useKeyOnly(prompt, 'prompt'), useKeyOnly(tag, 'tag'), useKeyOrValueAndKey(corner, 'corner'), useKeyOrValueAndKey(ribbon, 'ribbon'), useValueAndKey(attached, 'attached'), 'label', className);
        var rest = getUnhandledProps(Label, this.props);
        var ElementType = getElementType(Label, this.props);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            onClick: this.handleClick
          }), children);
        }

        var removeIconShorthand = isUndefined_1(removeIcon) ? 'delete' : removeIcon;
        return React__default.createElement(ElementType, _extends_1({
          className: classes,
          onClick: this.handleClick
        }, rest), Icon.create(icon, {
          autoGenerateKey: false
        }), typeof image !== 'boolean' && Image.create(image, {
          autoGenerateKey: false
        }), content, LabelDetail.create(detail, {
          autoGenerateKey: false
        }), onRemove && Icon.create(removeIconShorthand, {
          autoGenerateKey: false,
          overrideProps: this.handleIconOverrides
        }));
      }
    }]);

    return Label;
  }(React.Component);

  defineProperty(Label, "Detail", LabelDetail);

  defineProperty(Label, "Group", LabelGroup);

  defineProperty(Label, "handledProps", ["active", "as", "attached", "basic", "children", "circular", "className", "color", "content", "corner", "detail", "empty", "floating", "horizontal", "icon", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "size", "tag"]);
  Label.propTypes =  {};
  Label.create = createShorthandFactory(Label, function (value) {
    return {
      content: value
    };
  });

  /**
   * Used in some Button types, such as `animated`.
   */

  function ButtonContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        hidden = props.hidden,
        visible = props.visible;
    var classes = classnames(useKeyOnly(visible, 'visible'), useKeyOnly(hidden, 'hidden'), 'content', className);
    var rest = getUnhandledProps(ButtonContent, props);
    var ElementType = getElementType(ButtonContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ButtonContent.handledProps = ["as", "children", "className", "content", "hidden", "visible"];
  ButtonContent.propTypes =  {};

  /**
   * Buttons can be grouped.
   */

  function ButtonGroup(props) {
    var attached = props.attached,
        basic = props.basic,
        buttons = props.buttons,
        children = props.children,
        className = props.className,
        color = props.color,
        compact = props.compact,
        content = props.content,
        floated = props.floated,
        fluid = props.fluid,
        icon = props.icon,
        inverted = props.inverted,
        labeled = props.labeled,
        negative = props.negative,
        positive = props.positive,
        primary = props.primary,
        secondary = props.secondary,
        size = props.size,
        toggle = props.toggle,
        vertical = props.vertical,
        widths = props.widths;
    var classes = classnames('ui', color, size, useKeyOnly(basic, 'basic'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(icon, 'icon'), useKeyOnly(inverted, 'inverted'), useKeyOnly(labeled, 'labeled'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(primary, 'primary'), useKeyOnly(secondary, 'secondary'), useKeyOnly(toggle, 'toggle'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useValueAndKey(floated, 'floated'), useWidthProp(widths), 'buttons', className);
    var rest = getUnhandledProps(ButtonGroup, props);
    var ElementType = getElementType(ButtonGroup, props);

    if (isNil_1(buttons)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), isNil(children) ? content : children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), map_1(buttons, function (button) {
      return Button.create(button);
    }));
  }

  ButtonGroup.handledProps = ["as", "attached", "basic", "buttons", "children", "className", "color", "compact", "content", "floated", "fluid", "icon", "inverted", "labeled", "negative", "positive", "primary", "secondary", "size", "toggle", "vertical", "widths"];
  ButtonGroup.propTypes =  {};

  /**
   * Button groups can contain conditionals.
   */

  function ButtonOr(props) {
    var className = props.className,
        text = props.text;
    var classes = classnames('or', className);
    var rest = getUnhandledProps(ButtonOr, props);
    var ElementType = getElementType(ButtonOr, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes,
      "data-text": text
    }));
  }

  ButtonOr.handledProps = ["as", "className", "text"];
  ButtonOr.propTypes =  {};

  /**
   * A Button indicates a possible user action.
   * @see Form
   * @see Icon
   * @see Label
   */

  var Button =
  /*#__PURE__*/
  function (_Component) {
    inherits(Button, _Component);

    function Button() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Button);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "computeElementType", function () {
        var _this$props = _this.props,
            attached = _this$props.attached,
            label = _this$props.label;
        if (!isNil_1(attached) || !isNil_1(label)) return 'div';
      });

      defineProperty(assertThisInitialized(_this), "computeTabIndex", function (ElementType) {
        var _this$props2 = _this.props,
            disabled = _this$props2.disabled,
            tabIndex = _this$props2.tabIndex;
        if (!isNil_1(tabIndex)) return tabIndex;
        if (disabled) return -1;
        if (ElementType === 'div') return 0;
      });

      defineProperty(assertThisInitialized(_this), "focus", function () {
        return invoke_1(_this.ref.current, 'focus');
      });

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var disabled = _this.props.disabled;

        if (disabled) {
          e.preventDefault();
          return;
        }

        invoke_1(_this.props, 'onClick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "hasIconClass", function () {
        var _this$props3 = _this.props,
            labelPosition = _this$props3.labelPosition,
            children = _this$props3.children,
            content = _this$props3.content,
            icon = _this$props3.icon;
        if (icon === true) return true;
        return icon && (labelPosition || isNil(children) && isNil_1(content));
      });

      return _this;
    }

    createClass(Button, [{
      key: "computeButtonAriaRole",
      value: function computeButtonAriaRole(ElementType) {
        var role = this.props.role;
        if (!isNil_1(role)) return role;
        if (ElementType !== 'button') return 'button';
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            active = _this$props4.active,
            animated = _this$props4.animated,
            attached = _this$props4.attached,
            basic = _this$props4.basic,
            children = _this$props4.children,
            circular = _this$props4.circular,
            className = _this$props4.className,
            color = _this$props4.color,
            compact = _this$props4.compact,
            content = _this$props4.content,
            disabled = _this$props4.disabled,
            floated = _this$props4.floated,
            fluid = _this$props4.fluid,
            icon = _this$props4.icon,
            inverted = _this$props4.inverted,
            label = _this$props4.label,
            labelPosition = _this$props4.labelPosition,
            loading = _this$props4.loading,
            negative = _this$props4.negative,
            positive = _this$props4.positive,
            primary = _this$props4.primary,
            secondary = _this$props4.secondary,
            size = _this$props4.size,
            toggle = _this$props4.toggle;
        var baseClasses = classnames(color, size, useKeyOnly(active, 'active'), useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(this.hasIconClass(), 'icon'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(primary, 'primary'), useKeyOnly(secondary, 'secondary'), useKeyOnly(toggle, 'toggle'), useKeyOrValueAndKey(animated, 'animated'), useKeyOrValueAndKey(attached, 'attached'));
        var labeledClasses = classnames(useKeyOrValueAndKey(labelPosition || !!label, 'labeled'));
        var wrapperClasses = classnames(useKeyOnly(disabled, 'disabled'), useValueAndKey(floated, 'floated'));
        var rest = getUnhandledProps(Button, this.props);
        var ElementType = getElementType(Button, this.props, this.computeElementType);
        var tabIndex = this.computeTabIndex(ElementType);

        if (!isNil_1(label)) {
          var buttonClasses = classnames('ui', baseClasses, 'button', className);
          var containerClasses = classnames('ui', labeledClasses, 'button', className, wrapperClasses);
          var labelElement = Label.create(label, {
            defaultProps: {
              basic: true,
              pointing: labelPosition === 'left' ? 'right' : 'left'
            },
            autoGenerateKey: false
          });
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: containerClasses,
            onClick: this.handleClick
          }), labelPosition === 'left' && labelElement, React__default.createElement(Ref, {
            innerRef: this.ref
          }, React__default.createElement("button", {
            className: buttonClasses,
            "aria-pressed": toggle ? !!active : undefined,
            disabled: disabled,
            tabIndex: tabIndex
          }, Icon.create(icon, {
            autoGenerateKey: false
          }), " ", content)), (labelPosition === 'right' || !labelPosition) && labelElement);
        }

        var classes = classnames('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className);
        var hasChildren = !isNil(children);
        var role = this.computeButtonAriaRole(ElementType);
        return React__default.createElement(Ref, {
          innerRef: this.ref
        }, React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          "aria-pressed": toggle ? !!active : undefined,
          disabled: disabled && ElementType === 'button' || undefined,
          onClick: this.handleClick,
          role: role,
          tabIndex: tabIndex
        }), hasChildren && children, !hasChildren && Icon.create(icon, {
          autoGenerateKey: false
        }), !hasChildren && content));
      }
    }]);

    return Button;
  }(React.Component);

  defineProperty(Button, "defaultProps", {
    as: 'button'
  });

  defineProperty(Button, "Content", ButtonContent);

  defineProperty(Button, "Group", ButtonGroup);

  defineProperty(Button, "Or", ButtonOr);

  defineProperty(Button, "handledProps", ["active", "animated", "as", "attached", "basic", "children", "circular", "className", "color", "compact", "content", "disabled", "floated", "fluid", "icon", "inverted", "label", "labelPosition", "loading", "negative", "onClick", "positive", "primary", "role", "secondary", "size", "tabIndex", "toggle"]);

  Button.propTypes =  {};
  Button.create = createShorthandFactory(Button, function (value) {
    return {
      content: value
    };
  });

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  var _arrayReduce = arrayReduce;

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  var _baseReduce = baseReduce;

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` thru `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not given, the first element of `collection` is used as the initial
   * value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
   * and `sortBy`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduceRight
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * }, 0);
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   *   return result;
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator) {
    var func = isArray_1(collection) ? _arrayReduce : _baseReduce,
        initAccum = arguments.length < 3;

    return func(collection, _baseIteratee(iteratee), accumulator, initAccum, _baseEach);
  }

  var reduce_1 = reduce;

  //

  var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for (var idx = 0; idx < keysA.length; idx++) {
      var key = keysA[idx];

      if (!bHasOwnProperty(key)) {
        return false;
      }

      var valueA = objA[key];
      var valueB = objB[key];

      ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

      if (ret === false || (ret === void 0 && valueA !== valueB)) {
        return false;
      }
    }

    return true;
  };

  /**
   * Given `this.props`, return a `node` value or undefined.
   *
   * @param {object|React.RefObject} props Component's props
   * @return {React.RefObject|undefined}
   */

  var getNodeRefFromProps = function getNodeRefFromProps(props) {
    var node = props.node;

    if (isBrowser()) {
      if (isRefObject(node)) return node;
      return isNil_1(node) ? toRefObject(document.body) : toRefObject(node);
    }
  };

  var func$g = convert_1('uniq', uniq_1, _falseOptions);

  func$g.placeholder = placeholder;
  var uniq$1 = func$g;

  var func$h = convert_1('identity', identity_1, _falseOptions);

  func$h.placeholder = placeholder;
  var identity$1 = func$h;

  var func$i = convert_1('filter', filter_1);

  func$i.placeholder = placeholder;
  var filter$1 = func$i;

  /** `Object#toString` result references. */
  var regexpTag$4 = '[object RegExp]';

  /**
   * The base implementation of `_.isRegExp` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   */
  function baseIsRegExp(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == regexpTag$4;
  }

  var _baseIsRegExp = baseIsRegExp;

  /* Node.js helper references. */
  var nodeIsRegExp = _nodeUtil && _nodeUtil.isRegExp;

  /**
   * Checks if `value` is classified as a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */
  var isRegExp = nodeIsRegExp ? _baseUnary(nodeIsRegExp) : _baseIsRegExp;

  var isRegExp_1 = isRegExp;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH$1 = 4294967295;

  /**
   * Splits `string` by `separator`.
   *
   * **Note:** This method is based on
   * [`String#split`](https://mdn.io/String/split).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to split.
   * @param {RegExp|string} separator The separator pattern to split by.
   * @param {number} [limit] The length to truncate results to.
   * @returns {Array} Returns the string segments.
   * @example
   *
   * _.split('a-b-c', '-', 2);
   * // => ['a', 'b']
   */
  function split(string, separator, limit) {
    if (limit && typeof limit != 'number' && _isIterateeCall(string, separator, limit)) {
      separator = limit = undefined;
    }
    limit = limit === undefined ? MAX_ARRAY_LENGTH$1 : limit >>> 0;
    if (!limit) {
      return [];
    }
    string = toString_1(string);
    if (string && (
          typeof separator == 'string' ||
          (separator != null && !isRegExp_1(separator))
        )) {
      separator = _baseToString(separator);
      if (!separator && _hasUnicode(string)) {
        return _castSlice(_stringToArray(string), 0, limit);
      }
    }
    return string.split(separator, limit);
  }

  var split_1 = split;

  var func$j = convert_1('split', split_1);

  func$j.placeholder = placeholder;
  var split$1 = func$j;

  /**
   * Creates a flattened array of values by running each element in `collection`
   * thru `iteratee` and flattening the mapped results. The iteratee is invoked
   * with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * function duplicate(n) {
   *   return [n, n];
   * }
   *
   * _.flatMap([1, 2], duplicate);
   * // => [1, 1, 2, 2]
   */
  function flatMap(collection, iteratee) {
    return _baseFlatten(map_1(collection, iteratee), 1);
  }

  var flatMap_1 = flatMap;

  var func$k = convert_1('flatMap', flatMap_1);

  func$k.placeholder = placeholder;
  var flatMap$1 = func$k;

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  var _iteratorToArray = iteratorToArray;

  /** `Object#toString` result references. */
  var mapTag$7 = '[object Map]',
      setTag$7 = '[object Set]';

  /** Built-in value references. */
  var symIterator = _Symbol ? _Symbol.iterator : undefined;

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray(value) {
    if (!value) {
      return [];
    }
    if (isArrayLike_1(value)) {
      return isString_1(value) ? _stringToArray(value) : _copyArray(value);
    }
    if (symIterator && value[symIterator]) {
      return _iteratorToArray(value[symIterator]());
    }
    var tag = _getTag(value),
        func = tag == mapTag$7 ? _mapToArray : (tag == setTag$7 ? _setToArray : values_1);

    return func(value);
  }

  var toArray_1 = toArray;

  var func$l = convert_1('toArray', toArray_1, _falseOptions);

  func$l.placeholder = placeholder;
  var toArray$1 = func$l;

  var computeClassNames = flow$1(toArray$1, map$1('props.className'), flatMap$1(split$1(/\s+/)), filter$1(identity$1), uniq$1);

  var computeClassNamesDifference = function computeClassNamesDifference(prevClassNames, currentClassNames) {
    return [difference_1(currentClassNames, prevClassNames), difference_1(prevClassNames, currentClassNames)];
  };

  var prevClassNames = new Map();
  /**
   * @param {React.RefObject} nodeRef
   * @param {Object[]} components
   */

  var handleClassNamesChange = function handleClassNamesChange(nodeRef, components) {
    var currentClassNames = computeClassNames(components);

    var _computeClassNamesDif = computeClassNamesDifference(prevClassNames.get(nodeRef), currentClassNames),
        _computeClassNamesDif2 = slicedToArray(_computeClassNamesDif, 2),
        forAdd = _computeClassNamesDif2[0],
        forRemoval = _computeClassNamesDif2[1];

    if (nodeRef.current) {
      forEach_1(forAdd, function (className) {
        return nodeRef.current.classList.add(className);
      });

      forEach_1(forRemoval, function (className) {
        return nodeRef.current.classList.remove(className);
      });
    }

    prevClassNames.set(nodeRef, currentClassNames);
  };

  var NodeRegistry = function NodeRegistry() {
    var _this = this;

    classCallCheck(this, NodeRegistry);

    defineProperty(this, "add", function (nodeRef, component) {
      if (_this.nodes.has(nodeRef)) {
        var set = _this.nodes.get(nodeRef);

        set.add(component);
        return;
      }

      _this.nodes.set(nodeRef, new Set([component]));
    });

    defineProperty(this, "del", function (nodeRef, component) {
      if (!_this.nodes.has(nodeRef)) return;

      var set = _this.nodes.get(nodeRef);

      if (set.size === 1) {
        _this.nodes["delete"](nodeRef);

        return;
      }

      set["delete"](component);
    });

    defineProperty(this, "emit", function (nodeRef, callback) {
      callback(nodeRef, _this.nodes.get(nodeRef));
    });

    this.nodes = new Map();
  };

  var nodeRegistry = new NodeRegistry();
  /**
   * A component that allows to manage classNames on a DOM node in declarative manner.
   */

  var MountNode =
  /*#__PURE__*/
  function (_Component) {
    inherits(MountNode, _Component);

    function MountNode() {
      classCallCheck(this, MountNode);

      return possibleConstructorReturn(this, getPrototypeOf(MountNode).apply(this, arguments));
    }

    createClass(MountNode, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(_ref) {
        var nextClassName = _ref.className;
        var currentClassName = this.props.className;
        return nextClassName !== currentClassName;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var nodeRef = getNodeRefFromProps(this.props);
        nodeRegistry.add(nodeRef, this);
        nodeRegistry.emit(nodeRef, handleClassNamesChange);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        nodeRegistry.emit(getNodeRefFromProps(this.props), handleClassNamesChange);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var nodeRef = getNodeRefFromProps(this.props);
        nodeRegistry.del(nodeRef, this);
        nodeRegistry.emit(nodeRef, handleClassNamesChange);
      }
    }, {
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return MountNode;
  }(React.Component);

  defineProperty(MountNode, "handledProps", ["className", "node"]);
  MountNode.propTypes =  {};

  /**
   * A modal can have a header.
   */

  function ModalHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames(className, 'header');
    var rest = getUnhandledProps(ModalHeader, props);
    var ElementType = getElementType(ModalHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ModalHeader.handledProps = ["as", "children", "className", "content"];
  ModalHeader.propTypes =  {};
  ModalHeader.create = createShorthandFactory(ModalHeader, function (content) {
    return {
      content: content
    };
  });

  /**
   * A modal can contain content.
   */

  function ModalContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        image = props.image,
        scrolling = props.scrolling;
    var classes = classnames(className, useKeyOnly(image, 'image'), useKeyOnly(scrolling, 'scrolling'), 'content');
    var rest = getUnhandledProps(ModalContent, props);
    var ElementType = getElementType(ModalContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ModalContent.handledProps = ["as", "children", "className", "content", "image", "scrolling"];
  ModalContent.propTypes =  {};
  ModalContent.create = createShorthandFactory(ModalContent, function (content) {
    return {
      content: content
    };
  });

  /**
   * A modal can contain a row of actions.
   */

  var ModalActions =
  /*#__PURE__*/
  function (_Component) {
    inherits(ModalActions, _Component);

    function ModalActions() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, ModalActions);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(ModalActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleButtonOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, buttonProps) {
            invoke_1(predefinedProps, 'onClick', e, buttonProps);

            invoke_1(_this.props, 'onActionClick', e, buttonProps);
          }
        };
      });

      return _this;
    }

    createClass(ModalActions, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            actions = _this$props.actions,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content;
        var classes = classnames('actions', className);
        var rest = getUnhandledProps(ModalActions, this.props);
        var ElementType = getElementType(ModalActions, this.props);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes
          }), children);
        }

        if (!isNil(content)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes
          }), content);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), map_1(actions, function (action) {
          return Button.create(action, {
            overrideProps: _this2.handleButtonOverrides
          });
        }));
      }
    }]);

    return ModalActions;
  }(React.Component);

  defineProperty(ModalActions, "handledProps", ["actions", "as", "children", "className", "content", "onActionClick"]);
  ModalActions.propTypes =  {};
  ModalActions.create = createShorthandFactory(ModalActions, function (actions) {
    return {
      actions: actions
    };
  });

  /**
   * A modal can contain a description with one or more paragraphs.
   */

  function ModalDescription(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('description', className);
    var rest = getUnhandledProps(ModalDescription, props);
    var ElementType = getElementType(ModalDescription, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ModalDescription.handledProps = ["as", "children", "className", "content"];
  ModalDescription.propTypes =  {};

  // https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L956
  var OFFSET = 0; // https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L990

  var PADDING = 50;
  /**
   * Ensures that modal can fit viewport without scroll.
   *
   * @param modalRect {DOMRect}
   *
   * @see https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L608
   */

  var canFit = function canFit(modalRect) {
    // original: scrollHeight = $module.prop('scrollHeight'),
    // is replaced by .height because scrollHeight provides integer which produces glitches
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/2221
    var scrollHeight = modalRect.height + OFFSET; // $module.outerHeight() + settings.offset

    var height = modalRect.height + OFFSET; // original: $(window).height()

    var contextHeight = window.innerHeight;
    var verticalCenter = contextHeight / 2;
    var topOffset = -(height / 2); // padding with edge of page

    var paddingHeight = PADDING;
    var startPosition = verticalCenter + topOffset; // 0
    // original: scrollHeight > height
    //     ? startPosition + scrollHeight + paddingHeight < contextHeight
    //     : height + paddingHeight * 2 < contextHeight

    return startPosition + scrollHeight + paddingHeight < contextHeight;
  };
  /**
   * Creates legacy styles for IE11.
   *
   * @param isFitted {Boolean}
   * @param centered {Boolean}
   * @param modalRect {DOMRect}
   *
   * @see https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L718
   */

  var getLegacyStyles = function getLegacyStyles(isFitted, centered, modalRect) {
    var marginTop = centered && isFitted ? -(modalRect.height / 2) : 0;
    var marginLeft = -(modalRect.width / 2);
    return {
      marginLeft: marginLeft,
      marginTop: marginTop
    };
  }; // https://github.com/Semantic-Org/Semantic-UI/blob/2.4.1/src/definitions/modules/modal.js#L631

  /* istanbul ignore next */

  var isLegacy = function isLegacy() {
    return !window.ActiveXObject && 'ActiveXObject' in window;
  };

  /**
   * A modal displays content that temporarily blocks interactions with the main view of a site.
   * @see Confirm
   * @see Portal
   */
  var Modal =
  /*#__PURE__*/
  function (_Component) {
    inherits(Modal, _Component);

    function Modal() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Modal);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "legacy", isBrowser() && isLegacy());

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "dimmerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "latestDocumentMouseDownEvent", null);

      defineProperty(assertThisInitialized(_this), "getMountNode", function () {
        return isBrowser() ? _this.props.mountNode || document.body : null;
      });

      defineProperty(assertThisInitialized(_this), "handleActionsOverrides", function (predefinedProps) {
        return {
          onActionClick: function onActionClick(e, actionProps) {
            invoke_1(predefinedProps, 'onActionClick', e, actionProps);

            invoke_1(_this.props, 'onActionClick', e, _this.props);

            _this.handleClose(e);
          }
        };
      });

      defineProperty(assertThisInitialized(_this), "handleClose", function (e) {
        invoke_1(_this.props, 'onClose', e, _this.props);

        _this.trySetState({
          open: false
        });
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentMouseDown", function (e) {
        _this.latestDocumentMouseDownEvent = e;
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentClick", function (e) {
        var closeOnDimmerClick = _this.props.closeOnDimmerClick;
        var currentDocumentMouseDownEvent = _this.latestDocumentMouseDownEvent;
        _this.latestDocumentMouseDownEvent = null;
        if (!closeOnDimmerClick || doesNodeContainClick(_this.ref.current, currentDocumentMouseDownEvent) || doesNodeContainClick(_this.ref.current, e)) return;

        invoke_1(_this.props, 'onClose', e, _this.props);

        _this.trySetState({
          open: false
        });
      });

      defineProperty(assertThisInitialized(_this), "handleIconOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e) {
            invoke_1(predefinedProps, 'onClick', e);

            _this.handleClose(e);
          }
        };
      });

      defineProperty(assertThisInitialized(_this), "handleOpen", function (e) {
        invoke_1(_this.props, 'onOpen', e, _this.props);

        _this.trySetState({
          open: true
        });
      });

      defineProperty(assertThisInitialized(_this), "handlePortalMount", function (e) {
        var eventPool = _this.props.eventPool;

        _this.setState({
          scrolling: false
        });

        _this.setPositionAndClassNames();

        instance.sub('mousedown', _this.handleDocumentMouseDown, {
          pool: eventPool,
          target: _this.dimmerRef.current
        });
        instance.sub('click', _this.handleDocumentClick, {
          pool: eventPool,
          target: _this.dimmerRef.current
        });

        invoke_1(_this.props, 'onMount', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handlePortalUnmount", function (e) {
        var eventPool = _this.props.eventPool;
        cancelAnimationFrame(_this.animationRequestId);
        instance.unsub('mousedown', _this.handleDocumentMouseDown, {
          pool: eventPool,
          target: _this.dimmerRef.current
        });
        instance.unsub('click', _this.handleDocumentClick, {
          pool: eventPool,
          target: _this.dimmerRef.current
        });

        invoke_1(_this.props, 'onUnmount', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "setDimmerNodeStyle", function () {
        var current = _this.dimmerRef.current;

        if (current && current.style && current.style.display !== 'flex') {
          current.style.setProperty('display', 'flex', 'important');
        }
      });

      defineProperty(assertThisInitialized(_this), "setPositionAndClassNames", function () {
        var _this$props = _this.props,
            centered = _this$props.centered,
            dimmer = _this$props.dimmer;
        var scrolling;
        var newState = {};

        if (_this.ref.current) {
          var rect = _this.ref.current.getBoundingClientRect();

          var isFitted = canFit(rect);
          scrolling = !isFitted; // Styles should be computed for IE11

          var legacyStyles = _this.legacy ? getLegacyStyles(isFitted, centered, rect) : {};

          if (!shallowequal(_this.state.legacyStyles, legacyStyles)) {
            newState.legacyStyles = legacyStyles;
          }

          if (_this.state.scrolling !== scrolling) {
            newState.scrolling = scrolling;
          }
        }

        var classes = classnames(useKeyOnly(dimmer, 'dimmable dimmed'), useKeyOnly(dimmer === 'blurring', ' blurring'), useKeyOnly(scrolling, ' scrolling'));
        if (_this.state.mountClasses !== classes) newState.mountClasses = classes;
        if (!isEmpty_1(newState)) _this.setState(newState);
        _this.animationRequestId = requestAnimationFrame(_this.setPositionAndClassNames);

        _this.setDimmerNodeStyle();
      });

      defineProperty(assertThisInitialized(_this), "renderContent", function (rest) {
        var _this$props2 = _this.props,
            actions = _this$props2.actions,
            basic = _this$props2.basic,
            children = _this$props2.children,
            className = _this$props2.className,
            closeIcon = _this$props2.closeIcon,
            content = _this$props2.content,
            header = _this$props2.header,
            mountNode = _this$props2.mountNode,
            size = _this$props2.size,
            style = _this$props2.style;
        var _this$state = _this.state,
            legacyStyles = _this$state.legacyStyles,
            mountClasses = _this$state.mountClasses,
            scrolling = _this$state.scrolling;
        var classes = classnames('ui', size, useKeyOnly(basic, 'basic'), useKeyOnly(_this.legacy, 'legacy'), useKeyOnly(scrolling, 'scrolling'), 'modal transition visible active', className);
        var ElementType = getElementType(Modal, _this.props);
        var closeIconName = closeIcon === true ? 'close' : closeIcon;
        var closeIconJSX = Icon.create(closeIconName, {
          overrideProps: _this.handleIconOverrides
        });
        return React__default.createElement(Ref, {
          innerRef: _this.ref
        }, React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          style: objectSpread({}, legacyStyles, style)
        }), React__default.createElement(MountNode, {
          className: mountClasses,
          node: mountNode
        }), closeIconJSX, isNil(children) ? React__default.createElement(React.Fragment, null, ModalHeader.create(header, {
          autoGenerateKey: false
        }), ModalContent.create(content, {
          autoGenerateKey: false
        }), ModalActions.create(actions, {
          overrideProps: _this.handleActionsOverrides
        })) : children));
      });

      return _this;
    }

    createClass(Modal, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.handlePortalUnmount();
      } // Do not access document when server side rendering

    }, {
      key: "render",
      value: function render() {
        var open = this.state.open;
        var _this$props3 = this.props,
            centered = _this$props3.centered,
            closeOnDocumentClick = _this$props3.closeOnDocumentClick,
            dimmer = _this$props3.dimmer,
            eventPool = _this$props3.eventPool,
            trigger = _this$props3.trigger;
        var mountNode = this.getMountNode(); // Short circuit when server side rendering

        if (!isBrowser()) {
          return React.isValidElement(trigger) ? trigger : null;
        }

        var unhandled = getUnhandledProps(Modal, this.props);
        var portalPropNames = Portal.handledProps;

        var rest = reduce_1(unhandled, function (acc, val, key) {
          if (!includes_1(portalPropNames, key)) acc[key] = val;
          return acc;
        }, {});

        var portalProps = pick_1(unhandled, portalPropNames); // wrap dimmer modals


        var dimmerClasses = classnames('ui', dimmer === 'inverted' && 'inverted', !centered && 'top aligned', 'page modals dimmer transition visible active'); // Heads up!
        //
        // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
        // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
        //
        // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
        // We need the immediate child to be the dimmer to :not() blur the modal itself!
        // Otherwise, the portal div is also blurred, blurring the modal.
        //
        // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

        return React__default.createElement(Portal, _extends_1({
          closeOnDocumentClick: closeOnDocumentClick
        }, portalProps, {
          trigger: trigger,
          eventPool: eventPool,
          mountNode: mountNode,
          open: open,
          onClose: this.handleClose,
          onMount: this.handlePortalMount,
          onOpen: this.handleOpen,
          onUnmount: this.handlePortalUnmount
        }), React__default.createElement("div", {
          className: dimmerClasses,
          ref: this.dimmerRef
        }, this.renderContent(rest)));
      }
    }]);

    return Modal;
  }(AutoControlledComponent);

  defineProperty(Modal, "defaultProps", {
    centered: true,
    dimmer: true,
    closeOnDimmerClick: true,
    closeOnDocumentClick: false,
    eventPool: 'Modal'
  });

  defineProperty(Modal, "autoControlledProps", ['open']);

  defineProperty(Modal, "Header", ModalHeader);

  defineProperty(Modal, "Content", ModalContent);

  defineProperty(Modal, "Description", ModalDescription);

  defineProperty(Modal, "Actions", ModalActions);

  defineProperty(Modal, "handledProps", ["actions", "as", "basic", "centered", "children", "className", "closeIcon", "closeOnDimmerClick", "closeOnDocumentClick", "content", "defaultOpen", "dimmer", "eventPool", "header", "mountNode", "onActionClick", "onClose", "onMount", "onOpen", "onUnmount", "open", "size", "style", "trigger"]);

  Modal.propTypes =  {};

  /**
   * A Confirm modal gives the user a choice to confirm or cancel an action/
   * @see Modal
   */

  var Confirm =
  /*#__PURE__*/
  function (_Component) {
    inherits(Confirm, _Component);

    function Confirm() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Confirm);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Confirm)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleCancel", function (e) {
        invoke_1(_this.props, 'onCancel', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleCancelOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, buttonProps) {
            invoke_1(predefinedProps, 'onClick', e, buttonProps);

            _this.handleCancel(e);
          }
        };
      });

      defineProperty(assertThisInitialized(_this), "handleConfirmOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, buttonProps) {
            invoke_1(predefinedProps, 'onClick', e, buttonProps);

            invoke_1(_this.props, 'onConfirm', e, _this.props);
          }
        };
      });

      return _this;
    }

    createClass(Confirm, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            cancelButton = _this$props.cancelButton,
            confirmButton = _this$props.confirmButton,
            content = _this$props.content,
            header = _this$props.header,
            open = _this$props.open,
            size = _this$props.size;
        var rest = getUnhandledProps(Confirm, this.props); // `open` is auto controlled by the Modal
        // It cannot be present (even undefined) with `defaultOpen`
        // only apply it if the user provided an open prop

        var openProp = {};
        if (has_1(this.props, 'open')) openProp.open = open;
        return React__default.createElement(Modal, _extends_1({}, rest, openProp, {
          size: size,
          onClose: this.handleCancel
        }), Modal.Header.create(header, {
          autoGenerateKey: false
        }), Modal.Content.create(content, {
          autoGenerateKey: false
        }), React__default.createElement(Modal.Actions, null, Button.create(cancelButton, {
          autoGenerateKey: false,
          overrideProps: this.handleCancelOverrides
        }), Button.create(confirmButton, {
          autoGenerateKey: false,
          defaultProps: {
            primary: true
          },
          overrideProps: this.handleConfirmOverrides
        })));
      }
    }]);

    return Confirm;
  }(React.Component);

  defineProperty(Confirm, "defaultProps", {
    cancelButton: 'Cancel',
    confirmButton: 'OK',
    content: 'Are you sure?',
    size: 'small'
  });

  defineProperty(Confirm, "handledProps", ["cancelButton", "confirmButton", "content", "header", "onCancel", "onConfirm", "open", "size"]);

  Confirm.propTypes =  {};

  /**
   * A menu item may include a header or may itself be a header.
   */

  function MenuHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(MenuHeader, props);
    var ElementType = getElementType(MenuHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  MenuHeader.handledProps = ["as", "children", "className", "content"];
  MenuHeader.propTypes =  {};

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  var _basePropertyOf = basePropertyOf;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = _basePropertyOf(deburredLetters);

  var _deburrLetter = deburrLetter;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to compose unicode character classes. */
  var rsComboMarksRange$2 = '\\u0300-\\u036f',
      reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
      rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;

  /** Used to compose unicode capture groups. */
  var rsCombo$1 = '[' + rsComboRange$2 + ']';

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo$1, 'g');

  /**
   * Deburrs `string` by converting
   * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
   * letters to basic Latin letters and removing
   * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * _.deburr('déjà vu');
   * // => 'deja vu'
   */
  function deburr(string) {
    string = toString_1(string);
    return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
  }

  var deburr_1 = deburr;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  var _asciiWords = asciiWords;

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  var _hasUnicodeWord = hasUnicodeWord;

  /** Used to compose unicode character classes. */
  var rsAstralRange$2 = '\\ud800-\\udfff',
      rsComboMarksRange$3 = '\\u0300-\\u036f',
      reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
      rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange$2 = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo$2 = '[' + rsComboRange$3 + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
      rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
      rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
      rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ$2 = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod$1 = rsModifier$1 + '?',
      rsOptVar$1 = '[' + rsVarRange$2 + ']?',
      rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
      rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  var _unicodeWords = unicodeWords;

  /**
   * Splits `string` into an array of its words.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {RegExp|string} [pattern] The pattern to match words.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the words of `string`.
   * @example
   *
   * _.words('fred, barney, & pebbles');
   * // => ['fred', 'barney', 'pebbles']
   *
   * _.words('fred, barney, & pebbles', /[^, ]+/g);
   * // => ['fred', 'barney', '&', 'pebbles']
   */
  function words(string, pattern, guard) {
    string = toString_1(string);
    pattern = guard ? undefined : pattern;

    if (pattern === undefined) {
      return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
    }
    return string.match(pattern) || [];
  }

  var words_1 = words;

  /** Used to compose unicode capture groups. */
  var rsApos$1 = "['\u2019]";

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos$1, 'g');

  /**
   * Creates a function like `_.camelCase`.
   *
   * @private
   * @param {Function} callback The function to combine each word.
   * @returns {Function} Returns the new compounder function.
   */
  function createCompounder(callback) {
    return function(string) {
      return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
    };
  }

  var _createCompounder = createCompounder;

  /**
   * Creates a function like `_.lowerFirst`.
   *
   * @private
   * @param {string} methodName The name of the `String` case method to use.
   * @returns {Function} Returns the new case function.
   */
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString_1(string);

      var strSymbols = _hasUnicode(string)
        ? _stringToArray(string)
        : undefined;

      var chr = strSymbols
        ? strSymbols[0]
        : string.charAt(0);

      var trailing = strSymbols
        ? _castSlice(strSymbols, 1).join('')
        : string.slice(1);

      return chr[methodName]() + trailing;
    };
  }

  var _createCaseFirst = createCaseFirst;

  /**
   * Converts the first character of `string` to upper case.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.upperFirst('fred');
   * // => 'Fred'
   *
   * _.upperFirst('FRED');
   * // => 'FRED'
   */
  var upperFirst = _createCaseFirst('toUpperCase');

  var upperFirst_1 = upperFirst;

  /**
   * Converts `string` to
   * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
   *
   * @static
   * @memberOf _
   * @since 3.1.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the start cased string.
   * @example
   *
   * _.startCase('--foo-bar--');
   * // => 'Foo Bar'
   *
   * _.startCase('fooBar');
   * // => 'Foo Bar'
   *
   * _.startCase('__FOO_BAR__');
   * // => 'FOO BAR'
   */
  var startCase = _createCompounder(function(result, word, index) {
    return result + (index ? ' ' : '') + upperFirst_1(word);
  });

  var startCase_1 = startCase;

  /**
   * A menu can contain an item.
   */

  var MenuItem =
  /*#__PURE__*/
  function (_Component) {
    inherits(MenuItem, _Component);

    function MenuItem() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, MenuItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var disabled = _this.props.disabled;
        if (!disabled) invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(MenuItem, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            color = _this$props.color,
            content = _this$props.content,
            disabled = _this$props.disabled,
            fitted = _this$props.fitted,
            header = _this$props.header,
            icon = _this$props.icon,
            link = _this$props.link,
            name = _this$props.name,
            onClick = _this$props.onClick,
            position = _this$props.position;
        var classes = classnames(color, position, useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(icon === true || icon && !(name || content), 'icon'), useKeyOnly(header, 'header'), useKeyOnly(link, 'link'), useKeyOrValueAndKey(fitted, 'fitted'), 'item', className);
        var ElementType = getElementType(MenuItem, this.props, function () {
          if (onClick) return 'a';
        });
        var rest = getUnhandledProps(MenuItem, this.props);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            onClick: this.handleClick
          }), children);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), Icon.create(icon, {
          autoGenerateKey: false
        }), isNil(content) ? startCase_1(name) : content);
      }
    }]);

    return MenuItem;
  }(React.Component);

  defineProperty(MenuItem, "handledProps", ["active", "as", "children", "className", "color", "content", "disabled", "fitted", "header", "icon", "index", "link", "name", "onClick", "position"]);
  MenuItem.propTypes =  {};
  MenuItem.create = createShorthandFactory(MenuItem, function (val) {
    return {
      content: val,
      name: val
    };
  });

  /**
   * A menu can contain a sub menu.
   */

  function MenuMenu(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        position = props.position;
    var classes = classnames(position, 'menu', className);
    var rest = getUnhandledProps(MenuMenu, props);
    var ElementType = getElementType(MenuMenu, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  MenuMenu.handledProps = ["as", "children", "className", "content", "position"];
  MenuMenu.propTypes =  {};

  /**
   * A menu displays grouped navigation actions.
   * @see Dropdown
   */

  var Menu =
  /*#__PURE__*/
  function (_Component) {
    inherits(Menu, _Component);

    function Menu() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Menu);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleItemOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, itemProps) {
            var index = itemProps.index;

            _this.trySetState({
              activeIndex: index
            });

            invoke_1(predefinedProps, 'onClick', e, itemProps);

            invoke_1(_this.props, 'onItemClick', e, itemProps);
          }
        };
      });

      return _this;
    }

    createClass(Menu, [{
      key: "renderItems",
      value: function renderItems() {
        var _this2 = this;

        var items = this.props.items;
        var activeIndex = this.state.activeIndex;
        return map_1(items, function (item, index) {
          return MenuItem.create(item, {
            defaultProps: {
              active: parseInt(activeIndex, 10) === index,
              index: index
            },
            overrideProps: _this2.handleItemOverrides
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            attached = _this$props.attached,
            borderless = _this$props.borderless,
            children = _this$props.children,
            className = _this$props.className,
            color = _this$props.color,
            compact = _this$props.compact,
            fixed = _this$props.fixed,
            floated = _this$props.floated,
            fluid = _this$props.fluid,
            icon = _this$props.icon,
            inverted = _this$props.inverted,
            pagination = _this$props.pagination,
            pointing = _this$props.pointing,
            secondary = _this$props.secondary,
            size = _this$props.size,
            stackable = _this$props.stackable,
            tabular = _this$props.tabular,
            text = _this$props.text,
            vertical = _this$props.vertical,
            widths = _this$props.widths;
        var classes = classnames('ui', color, size, useKeyOnly(borderless, 'borderless'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), useKeyOnly(pagination, 'pagination'), useKeyOnly(pointing, 'pointing'), useKeyOnly(secondary, 'secondary'), useKeyOnly(stackable, 'stackable'), useKeyOnly(text, 'text'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useKeyOrValueAndKey(floated, 'floated'), useKeyOrValueAndKey(icon, 'icon'), useKeyOrValueAndKey(tabular, 'tabular'), useValueAndKey(fixed, 'fixed'), useWidthProp(widths, 'item'), className, 'menu');
        var rest = getUnhandledProps(Menu, this.props);
        var ElementType = getElementType(Menu, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), isNil(children) ? this.renderItems() : children);
      }
    }]);

    return Menu;
  }(AutoControlledComponent);

  defineProperty(Menu, "autoControlledProps", ['activeIndex']);

  defineProperty(Menu, "Header", MenuHeader);

  defineProperty(Menu, "Item", MenuItem);

  defineProperty(Menu, "Menu", MenuMenu);

  defineProperty(Menu, "handledProps", ["activeIndex", "as", "attached", "borderless", "children", "className", "color", "compact", "defaultActiveIndex", "fixed", "floated", "fluid", "icon", "inverted", "items", "onItemClick", "pagination", "pointing", "secondary", "size", "stackable", "tabular", "text", "vertical", "widths"]);

  Menu.propTypes =  {};
  Menu.create = createShorthandFactory(Menu, function (items) {
    return {
      items: items
    };
  });

  /**
   * An item of a pagination.
   */

  var PaginationItem =
  /*#__PURE__*/
  function (_Component) {
    inherits(PaginationItem, _Component);

    function PaginationItem() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, PaginationItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PaginationItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        invoke_1(_this.props, 'onClick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleKeyDown", function (e) {
        invoke_1(_this.props, 'onKeyDown', e, _this.props);

        if (keyboardKey_1.getCode(e) === keyboardKey_1.Enter) invoke_1(_this.props, 'onClick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleOverrides", function () {
        return {
          onClick: _this.handleClick,
          onKeyDown: _this.handleKeyDown
        };
      });

      return _this;
    }

    createClass(PaginationItem, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            type = _this$props.type;
        var disabled = this.props.disabled || type === 'ellipsisItem';
        return MenuItem.create(this.props, {
          defaultProps: {
            active: active,
            'aria-current': active,
            'aria-disabled': disabled,
            disabled: disabled,
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
            tabIndex: disabled ? -1 : 0
          },
          overrideProps: this.handleOverrides
        });
      }
    }]);

    return PaginationItem;
  }(React.Component);

  defineProperty(PaginationItem, "handledProps", ["active", "disabled", "onClick", "onKeyDown", "type"]);

  PaginationItem.propTypes =  {};
  PaginationItem.create = createShorthandFactory(PaginationItem, function (content) {
    return {
      content: content
    };
  });

  /**
   * A component to render a pagination.
   */

  var Pagination =
  /*#__PURE__*/
  function (_Component) {
    inherits(Pagination, _Component);

    function Pagination() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Pagination);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleItemClick", function (e, _ref) {
        var nextActivePage = _ref.value;
        var prevActivePage = _this.state.activePage; // Heads up! We need the cast to the "number" type there, as `activePage` can be a string

        if (+prevActivePage === +nextActivePage) return;

        _this.trySetState({
          activePage: nextActivePage
        });

        invoke_1(_this.props, 'onPageChange', e, objectSpread({}, _this.props, {
          activePage: nextActivePage
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleItemOverrides", function (active, type, value) {
        return function (predefinedProps) {
          return {
            active: active,
            type: type,
            key: "".concat(type, "-").concat(value),
            onClick: function onClick(e, itemProps) {
              invoke_1(predefinedProps, 'onClick', e, itemProps);

              if (itemProps.type !== 'ellipsisItem') _this.handleItemClick(e, itemProps);
            }
          };
        };
      });

      return _this;
    }

    createClass(Pagination, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            ariaLabel = _this$props['aria-label'],
            boundaryRange = _this$props.boundaryRange,
            disabled = _this$props.disabled,
            ellipsisItem = _this$props.ellipsisItem,
            siblingRange = _this$props.siblingRange,
            totalPages = _this$props.totalPages;
        var activePage = this.state.activePage;
        var items = createPaginationItems({
          activePage: activePage,
          boundaryRange: boundaryRange,
          hideEllipsis: isNil_1(ellipsisItem),
          siblingRange: siblingRange,
          totalPages: totalPages
        });
        var rest = getUnhandledProps(Pagination, this.props);
        return React__default.createElement(Menu, _extends_1({}, rest, {
          "aria-label": ariaLabel,
          pagination: true,
          role: "navigation"
        }), map_1(items, function (_ref2) {
          var active = _ref2.active,
              type = _ref2.type,
              value = _ref2.value;
          return PaginationItem.create(_this2.props[type], {
            defaultProps: {
              content: value,
              disabled: disabled,
              value: value
            },
            overrideProps: _this2.handleItemOverrides(active, type, value)
          });
        }));
      }
    }]);

    return Pagination;
  }(AutoControlledComponent);

  defineProperty(Pagination, "autoControlledProps", ['activePage']);

  defineProperty(Pagination, "defaultProps", {
    'aria-label': 'Pagination Navigation',
    boundaryRange: 1,
    ellipsisItem: '...',
    firstItem: {
      'aria-label': 'First item',
      content: '«'
    },
    lastItem: {
      'aria-label': 'Last item',
      content: '»'
    },
    nextItem: {
      'aria-label': 'Next item',
      content: '⟩'
    },
    pageItem: {},
    prevItem: {
      'aria-label': 'Previous item',
      content: '⟨'
    },
    siblingRange: 1
  });

  defineProperty(Pagination, "Item", PaginationItem);

  defineProperty(Pagination, "handledProps", ["activePage", "aria-label", "boundaryRange", "defaultActivePage", "disabled", "ellipsisItem", "firstItem", "lastItem", "nextItem", "onPageChange", "pageItem", "prevItem", "siblingRange", "totalPages"]);
  Pagination.propTypes =  {};

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : _baseSet(object, path, value);
  }

  var set_1 = set;

  /**
   * A checkbox allows a user to select a value from a small set of options, often binary.
   * @see Form
   * @see Radio
   */
  var Checkbox =
  /*#__PURE__*/
  function (_Component) {
    inherits(Checkbox, _Component);

    function Checkbox() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Checkbox);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "inputRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "labelRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "canToggle", function () {
        var _this$props = _this.props,
            disabled = _this$props.disabled,
            radio = _this$props.radio,
            readOnly = _this$props.readOnly;
        var checked = _this.state.checked;
        return !disabled && !readOnly && !(radio && checked);
      });

      defineProperty(assertThisInitialized(_this), "computeTabIndex", function () {
        var _this$props2 = _this.props,
            disabled = _this$props2.disabled,
            tabIndex = _this$props2.tabIndex;
        if (!isNil_1(tabIndex)) return tabIndex;
        return disabled ? -1 : 0;
      });

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var id = _this.props.id;
        var _this$state = _this.state,
            checked = _this$state.checked,
            indeterminate = _this$state.indeterminate;

        var isInputClick = invoke_1(_this.inputRef.current, 'contains', e.target);

        var isLabelClick = invoke_1(_this.labelRef.current, 'contains', e.target);

        var isRootClick = !isLabelClick && !isInputClick;
        var hasId = !isNil_1(id);
        var isLabelClickAndForwardedToInput = isLabelClick && hasId; // https://github.com/Semantic-Org/Semantic-UI-React/pull/3351

        if (!isLabelClickAndForwardedToInput) {
          invoke_1(_this.props, 'onClick', e, objectSpread({}, _this.props, {
            checked: !checked,
            indeterminate: !!indeterminate
          }));
        }

        if (_this.isClickFromMouse) {
          _this.isClickFromMouse = false;

          if (isLabelClick && !hasId) {
            _this.handleChange(e);
          } // Changes should be triggered for the slider variation


          if (isRootClick) {
            _this.handleChange(e);
          }

          if (isLabelClick && hasId) {
            // To prevent two clicks from being fired from the component we have to stop the propagation
            // from the "input" click: https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
            e.stopPropagation();
          }
        }
      });

      defineProperty(assertThisInitialized(_this), "handleChange", function (e) {
        var checked = _this.state.checked;
        if (!_this.canToggle()) return;

        invoke_1(_this.props, 'onChange', e, objectSpread({}, _this.props, {
          checked: !checked,
          indeterminate: false
        }));

        _this.trySetState({
          checked: !checked,
          indeterminate: false
        });
      });

      defineProperty(assertThisInitialized(_this), "handleMouseDown", function (e) {
        var _this$state2 = _this.state,
            checked = _this$state2.checked,
            indeterminate = _this$state2.indeterminate;

        invoke_1(_this.props, 'onMouseDown', e, objectSpread({}, _this.props, {
          checked: !!checked,
          indeterminate: !!indeterminate
        }));

        if (!e.defaultPrevented) {
          invoke_1(_this.inputRef.current, 'focus');
        } // Heads up!
        // We need to call "preventDefault" to keep element focused.


        e.preventDefault();
      });

      defineProperty(assertThisInitialized(_this), "handleMouseUp", function (e) {
        var _this$state3 = _this.state,
            checked = _this$state3.checked,
            indeterminate = _this$state3.indeterminate;
        _this.isClickFromMouse = true;

        invoke_1(_this.props, 'onMouseUp', e, objectSpread({}, _this.props, {
          checked: !!checked,
          indeterminate: !!indeterminate
        }));
      });

      defineProperty(assertThisInitialized(_this), "setIndeterminate", function () {
        var indeterminate = _this.state.indeterminate;

        set_1(_this.inputRef, 'current.indeterminate', !!indeterminate);
      });

      return _this;
    }

    createClass(Checkbox, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setIndeterminate();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.setIndeterminate();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            className = _this$props3.className,
            disabled = _this$props3.disabled,
            label = _this$props3.label,
            id = _this$props3.id,
            name = _this$props3.name,
            radio = _this$props3.radio,
            readOnly = _this$props3.readOnly,
            slider = _this$props3.slider,
            toggle = _this$props3.toggle,
            type = _this$props3.type,
            value = _this$props3.value;
        var _this$state4 = this.state,
            checked = _this$state4.checked,
            indeterminate = _this$state4.indeterminate;
        var classes = classnames('ui', useKeyOnly(checked, 'checked'), useKeyOnly(disabled, 'disabled'), useKeyOnly(indeterminate, 'indeterminate'), // auto apply fitted class to compact white space when there is no label
        // https://semantic-ui.com/modules/checkbox.html#fitted
        useKeyOnly(isNil_1(label), 'fitted'), useKeyOnly(radio, 'radio'), useKeyOnly(readOnly, 'read-only'), useKeyOnly(slider, 'slider'), useKeyOnly(toggle, 'toggle'), 'checkbox', className);
        var unhandled = getUnhandledProps(Checkbox, this.props);
        var ElementType = getElementType(Checkbox, this.props);

        var _partitionHTMLProps = partitionHTMLProps(unhandled, {
          htmlProps: htmlInputAttrs
        }),
            _partitionHTMLProps2 = slicedToArray(_partitionHTMLProps, 2),
            htmlInputProps = _partitionHTMLProps2[0],
            rest = _partitionHTMLProps2[1]; // Heads Up!
        // Do not remove empty labels, they are required by SUI CSS


        var labelElement = createHTMLLabel(label, {
          defaultProps: {
            htmlFor: id
          },
          autoGenerateKey: false
        }) || React__default.createElement("label", {
          htmlFor: id
        });
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick,
          onChange: this.handleChange,
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp
        }), React__default.createElement(Ref, {
          innerRef: this.inputRef
        }, React__default.createElement("input", _extends_1({}, htmlInputProps, {
          checked: checked,
          className: "hidden",
          disabled: disabled,
          id: id,
          name: name,
          readOnly: true,
          tabIndex: this.computeTabIndex(),
          type: type,
          value: value
        }))), React__default.createElement(Ref, {
          innerRef: this.labelRef
        }, labelElement));
      }
    }]);

    return Checkbox;
  }(AutoControlledComponent);

  defineProperty(Checkbox, "defaultProps", {
    type: 'checkbox'
  });

  defineProperty(Checkbox, "autoControlledProps", ['checked', 'indeterminate']);

  defineProperty(Checkbox, "handledProps", ["as", "checked", "className", "defaultChecked", "defaultIndeterminate", "disabled", "fitted", "id", "indeterminate", "label", "name", "onChange", "onClick", "onMouseDown", "onMouseUp", "radio", "readOnly", "slider", "tabIndex", "toggle", "type", "value"]);
  Checkbox.propTypes =  {};

  /**
   * A Radio is sugar for <Checkbox radio />.
   * Useful for exclusive groups of sliders or toggles.
   * @see Checkbox
   * @see Form
   */

  function Radio(props) {
    var slider = props.slider,
        toggle = props.toggle,
        type = props.type;
    var rest = getUnhandledProps(Radio, props); // const ElementType = getElementType(Radio, props)
    // radio, slider, toggle are exclusive
    // use an undefined radio if slider or toggle are present

    var radio = !(slider || toggle) || undefined;
    return React__default.createElement(Checkbox, _extends_1({}, rest, {
      type: type,
      radio: radio,
      slider: slider,
      toggle: toggle
    }));
  }

  Radio.handledProps = ["slider", "toggle", "type"];
  Radio.propTypes =  {};
  Radio.defaultProps = {
    type: 'radio'
  };

  var fitsMaxWidth = function fitsMaxWidth(width, maxWidth) {
    return isNil_1(maxWidth) ? true : width <= maxWidth;
  };

  var fitsMinWidth = function fitsMinWidth(width, minWidth) {
    return isNil_1(minWidth) ? true : width >= minWidth;
  };

  var isVisible = function isVisible(width, _ref) {
    var maxWidth = _ref.maxWidth,
        minWidth = _ref.minWidth;
    return fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth);
  };

  /**
   * Responsive can control visibility of content.
   */

  var Responsive =
  /*#__PURE__*/
  function (_Component) {
    inherits(Responsive, _Component);

    function Responsive() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Responsive);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Responsive)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "state", {
        visible: true
      });

      defineProperty(assertThisInitialized(_this), "handleResize", function (e) {
        if (_this.ticking) return;
        _this.ticking = true;
        _this.frameId = requestAnimationFrame(function () {
          return _this.handleUpdate(e);
        });
      });

      defineProperty(assertThisInitialized(_this), "handleUpdate", function (e) {
        _this.ticking = false;
        var visible = _this.state.visible;

        var width = invoke_1(_this.props, 'getWidth');

        var nextVisible = isVisible(width, _this.props);
        if (visible !== nextVisible) _this.setState({
          visible: nextVisible
        });

        invoke_1(_this.props, 'onUpdate', e, objectSpread({}, _this.props, {
          width: width
        }));
      });

      return _this;
    }

    createClass(Responsive, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var fireOnMount = this.props.fireOnMount;
        instance.sub('resize', this.handleResize, {
          target: 'window'
        });
        if (fireOnMount) this.handleUpdate();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        instance.unsub('resize', this.handleResize, {
          target: 'window'
        });
        cancelAnimationFrame(this.frameId);
      } // ----------------------------------------
      // Event handlers
      // ----------------------------------------

    }, {
      key: "render",
      // ----------------------------------------
      // Render
      // ----------------------------------------
      value: function render() {
        var children = this.props.children;
        var visible = this.state.visible;
        var ElementType = getElementType(Responsive, this.props);
        var rest = getUnhandledProps(Responsive, this.props);
        if (visible) return React__default.createElement(ElementType, rest, children);
        return null;
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props) {
        var width = invoke_1(props, 'getWidth');

        var visible = isVisible(width, props);
        return {
          visible: visible
        };
      }
    }]);

    return Responsive;
  }(React.Component);

  defineProperty(Responsive, "defaultProps", {
    getWidth: function getWidth() {
      return isBrowser() ? window.innerWidth : 0;
    }
  });

  defineProperty(Responsive, "onlyMobile", {
    minWidth: 320,
    maxWidth: 767
  });

  defineProperty(Responsive, "onlyTablet", {
    minWidth: 768,
    maxWidth: 991
  });

  defineProperty(Responsive, "onlyComputer", {
    minWidth: 992
  });

  defineProperty(Responsive, "onlyLargeScreen", {
    minWidth: 1200,
    maxWidth: 1919
  });

  defineProperty(Responsive, "onlyWidescreen", {
    minWidth: 1920
  });

  defineProperty(Responsive, "handledProps", ["as", "children", "fireOnMount", "getWidth", "maxWidth", "minWidth", "onUpdate"]);
  Responsive.propTypes =  {};

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get$1 = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  var _arrayEvery = arrayEvery;

  /**
   * The base implementation of `_.every` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true;
    _baseEach(collection, function(value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  var _baseEvery = baseEvery;

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * Iteration is stopped once `predicate` returns falsey. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * **Note:** This method returns `true` for
   * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
   * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
   * elements of empty collections.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.every(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.every(users, 'active');
   * // => false
   */
  function every(collection, predicate, guard) {
    var func = isArray_1(collection) ? _arrayEvery : _baseEvery;
    if (guard && _isIterateeCall(collection, predicate, guard)) {
      predicate = undefined;
    }
    return func(collection, _baseIteratee(predicate));
  }

  var every_1 = every;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar$1.source);

  /**
   * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
   * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escapeRegExp('[lodash](https://lodash.com/)');
   * // => '\[lodash\]\(https://lodash\.com/\)'
   */
  function escapeRegExp(string) {
    string = toString_1(string);
    return (string && reHasRegExpChar.test(string))
      ? string.replace(reRegExpChar$1, '\\$&')
      : string;
  }

  var escapeRegExp_1 = escapeRegExp;

  /**
   * Creates a slice of `array` with `n` elements dropped from the end.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.dropRight([1, 2, 3]);
   * // => [1, 2]
   *
   * _.dropRight([1, 2, 3], 2);
   * // => [1]
   *
   * _.dropRight([1, 2, 3], 5);
   * // => []
   *
   * _.dropRight([1, 2, 3], 0);
   * // => [1, 2, 3]
   */
  function dropRight(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_1(n);
    n = length - n;
    return _baseSlice(array, 0, n < 0 ? 0 : n);
  }

  var dropRight_1 = dropRight;

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = _baseProperty('length');

  var _asciiSize = asciiSize;

  /** Used to compose unicode character classes. */
  var rsAstralRange$3 = '\\ud800-\\udfff',
      rsComboMarksRange$4 = '\\u0300-\\u036f',
      reComboHalfMarksRange$4 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$4 = '\\u20d0-\\u20ff',
      rsComboRange$4 = rsComboMarksRange$4 + reComboHalfMarksRange$4 + rsComboSymbolsRange$4,
      rsVarRange$3 = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral$1 = '[' + rsAstralRange$3 + ']',
      rsCombo$3 = '[' + rsComboRange$4 + ']',
      rsFitz$2 = '\\ud83c[\\udffb-\\udfff]',
      rsModifier$2 = '(?:' + rsCombo$3 + '|' + rsFitz$2 + ')',
      rsNonAstral$2 = '[^' + rsAstralRange$3 + ']',
      rsRegional$2 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair$2 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ$3 = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod$2 = rsModifier$2 + '?',
      rsOptVar$2 = '[' + rsVarRange$3 + ']?',
      rsOptJoin$2 = '(?:' + rsZWJ$3 + '(?:' + [rsNonAstral$2, rsRegional$2, rsSurrPair$2].join('|') + ')' + rsOptVar$2 + reOptMod$2 + ')*',
      rsSeq$2 = rsOptVar$2 + reOptMod$2 + rsOptJoin$2,
      rsSymbol$1 = '(?:' + [rsNonAstral$2 + rsCombo$3 + '?', rsCombo$3, rsRegional$2, rsSurrPair$2, rsAstral$1].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode$1 = RegExp(rsFitz$2 + '(?=' + rsFitz$2 + ')|' + rsSymbol$1 + rsSeq$2, 'g');

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode$1.lastIndex = 0;
    while (reUnicode$1.test(string)) {
      ++result;
    }
    return result;
  }

  var _unicodeSize = unicodeSize;

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return _hasUnicode(string)
      ? _unicodeSize(string)
      : _asciiSize(string);
  }

  var _stringSize = stringSize;

  /** `Object#toString` result references. */
  var mapTag$8 = '[object Map]',
      setTag$8 = '[object Set]';

  /**
   * Gets the size of `collection` by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns the collection size.
   * @example
   *
   * _.size([1, 2, 3]);
   * // => 3
   *
   * _.size({ 'a': 1, 'b': 2 });
   * // => 2
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    if (collection == null) {
      return 0;
    }
    if (isArrayLike_1(collection)) {
      return isString_1(collection) ? _stringSize(collection) : collection.length;
    }
    var tag = _getTag(collection);
    if (tag == mapTag$8 || tag == setTag$8) {
      return collection.size;
    }
    return _baseKeys(collection).length;
  }

  var size_1 = size;

  /**
   * Creates an array of unique values, in order, from all given arrays using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([2], [1, 2]);
   * // => [2, 1]
   */
  var union = _baseRest(function(arrays) {
    return _baseUniq(_baseFlatten(arrays, 1, isArrayLikeObject_1, true));
  });

  var union_1 = union;

  /**
   * A dropdown menu can contain dividers to separate related content.
   */

  function DropdownDivider(props) {
    var className = props.className;
    var classes = classnames('divider', className);
    var rest = getUnhandledProps(DropdownDivider, props);
    var ElementType = getElementType(DropdownDivider, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }));
  }

  DropdownDivider.handledProps = ["as", "className"];
  DropdownDivider.propTypes =  {};

  /**
   * A flag is is used to represent a political state.
   */

  var Flag =
  /*#__PURE__*/
  function (_PureComponent) {
    inherits(Flag, _PureComponent);

    function Flag() {
      classCallCheck(this, Flag);

      return possibleConstructorReturn(this, getPrototypeOf(Flag).apply(this, arguments));
    }

    createClass(Flag, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            className = _this$props.className,
            name = _this$props.name;
        var classes = classnames(name, 'flag', className);
        var rest = getUnhandledProps(Flag, this.props);
        var ElementType = getElementType(Flag, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }));
      }
    }]);

    return Flag;
  }(React.PureComponent);

  defineProperty(Flag, "defaultProps", {
    as: 'i'
  });

  defineProperty(Flag, "handledProps", ["as", "className", "name"]);

  Flag.propTypes =  {};
  Flag.create = createShorthandFactory(Flag, function (value) {
    return {
      name: value
    };
  });

  /**
   * An item sub-component for Dropdown component.
   */

  var DropdownItem =
  /*#__PURE__*/
  function (_Component) {
    inherits(DropdownItem, _Component);

    function DropdownItem() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, DropdownItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(DropdownItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(DropdownItem, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content,
            disabled = _this$props.disabled,
            description = _this$props.description,
            flag = _this$props.flag,
            icon = _this$props.icon,
            image = _this$props.image,
            label = _this$props.label,
            selected = _this$props.selected,
            text = _this$props.text;
        var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(selected, 'selected'), 'item', className); // add default dropdown icon if item contains another menu

        var iconName = isNil_1(icon) ? someByType(children, 'DropdownMenu') && 'dropdown' : icon;
        var rest = getUnhandledProps(DropdownItem, this.props);
        var ElementType = getElementType(DropdownItem, this.props);
        var ariaOptions = {
          role: 'option',
          'aria-disabled': disabled,
          'aria-checked': active,
          'aria-selected': selected
        };

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, ariaOptions, {
            className: classes,
            onClick: this.handleClick
          }), children);
        }

        var flagElement = Flag.create(flag, {
          autoGenerateKey: false
        });
        var iconElement = Icon.create(iconName, {
          autoGenerateKey: false
        });
        var imageElement = Image.create(image, {
          autoGenerateKey: false
        });
        var labelElement = Label.create(label, {
          autoGenerateKey: false
        });
        var descriptionElement = createShorthand('span', function (val) {
          return {
            children: val
          };
        }, description, {
          defaultProps: {
            className: 'description'
          },
          autoGenerateKey: false
        });
        var textElement = createShorthand('span', function (val) {
          return {
            children: val
          };
        }, isNil(content) ? text : content, {
          defaultProps: {
            className: 'text'
          },
          autoGenerateKey: false
        });
        return React__default.createElement(ElementType, _extends_1({}, rest, ariaOptions, {
          className: classes,
          onClick: this.handleClick
        }), imageElement, iconElement, flagElement, labelElement, descriptionElement, textElement);
      }
    }]);

    return DropdownItem;
  }(React.Component);

  defineProperty(DropdownItem, "handledProps", ["active", "as", "children", "className", "content", "description", "disabled", "flag", "icon", "image", "label", "onClick", "selected", "text", "value"]);

  DropdownItem.propTypes =  {};
  DropdownItem.create = createShorthandFactory(DropdownItem, function (opts) {
    return opts;
  });

  /**
   * A dropdown menu can contain a header.
   */

  function DropdownHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        icon = props.icon;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(DropdownHeader, props);
    var ElementType = getElementType(DropdownHeader, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), Icon.create(icon, {
      autoGenerateKey: false
    }), content);
  }

  DropdownHeader.handledProps = ["as", "children", "className", "content", "icon"];
  DropdownHeader.propTypes =  {};
  DropdownHeader.create = createShorthandFactory(DropdownHeader, function (content) {
    return {
      content: content
    };
  });

  /**
   * A dropdown menu can contain a menu.
   */

  function DropdownMenu(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        direction = props.direction,
        open = props.open,
        scrolling = props.scrolling;
    var classes = classnames(direction, useKeyOnly(open, 'visible'), useKeyOnly(scrolling, 'scrolling'), 'menu transition', className);
    var rest = getUnhandledProps(DropdownMenu, props);
    var ElementType = getElementType(DropdownMenu, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  DropdownMenu.handledProps = ["as", "children", "className", "content", "direction", "open", "scrolling"];
  DropdownMenu.propTypes =  {};

  /**
   * A search item sub-component for Dropdown component.
   */

  var DropdownSearchInput =
  /*#__PURE__*/
  function (_Component) {
    inherits(DropdownSearchInput, _Component);

    function DropdownSearchInput() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, DropdownSearchInput);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(DropdownSearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleChange", function (e) {
        var value = get_1(e, 'target.value');

        invoke_1(_this.props, 'onChange', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      return _this;
    }

    createClass(DropdownSearchInput, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            autoComplete = _this$props.autoComplete,
            className = _this$props.className,
            tabIndex = _this$props.tabIndex,
            type = _this$props.type,
            value = _this$props.value;
        var classes = classnames('search', className);
        var rest = getUnhandledProps(DropdownSearchInput, this.props);
        return React__default.createElement("input", _extends_1({}, rest, {
          "aria-autocomplete": "list",
          autoComplete: autoComplete,
          className: classes,
          onChange: this.handleChange,
          tabIndex: tabIndex,
          type: type,
          value: value
        }));
      }
    }]);

    return DropdownSearchInput;
  }(React.Component);

  defineProperty(DropdownSearchInput, "defaultProps", {
    autoComplete: 'off',
    type: 'text'
  });

  defineProperty(DropdownSearchInput, "handledProps", ["as", "autoComplete", "className", "tabIndex", "type", "value"]);

  DropdownSearchInput.propTypes =  {};
  DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, function (type) {
    return {
      type: type
    };
  });

  var getKeyOrValue = function getKeyOrValue(key, value) {
    return isNil_1(key) ? value : key;
  };
  /**
   * A dropdown allows a user to select a value from a series of options.
   * @see Form
   * @see Select
   * @see Menu
   */


  var Dropdown =
  /*#__PURE__*/
  function (_Component) {
    inherits(Dropdown, _Component);

    function Dropdown() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Dropdown);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Dropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "searchRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "sizerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "handleChange", function (e, value) {
        invoke_1(_this.props, 'onChange', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      defineProperty(assertThisInitialized(_this), "closeOnChange", function (e) {
        var _this$props = _this.props,
            closeOnChange = _this$props.closeOnChange,
            multiple = _this$props.multiple;
        var shouldClose = isUndefined_1(closeOnChange) ? !multiple : closeOnChange;
        if (shouldClose) _this.close(e, noop_1);
      });

      defineProperty(assertThisInitialized(_this), "closeOnEscape", function (e) {
        if (!_this.props.closeOnEscape) return;
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Escape) return;
        e.preventDefault();

        _this.close(e);
      });

      defineProperty(assertThisInitialized(_this), "moveSelectionOnKeyDown", function (e) {
        var _moves;

        var _this$props2 = _this.props,
            multiple = _this$props2.multiple,
            selectOnNavigation = _this$props2.selectOnNavigation;
        var moves = (_moves = {}, defineProperty(_moves, keyboardKey_1.ArrowDown, 1), defineProperty(_moves, keyboardKey_1.ArrowUp, -1), _moves);
        var move = moves[keyboardKey_1.getCode(e)];
        if (move === undefined) return;
        e.preventDefault();

        _this.moveSelectionBy(move);

        if (!multiple && selectOnNavigation) _this.makeSelectedItemActive(e);
      });

      defineProperty(assertThisInitialized(_this), "openOnSpace", function (e) {
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Spacebar) return;
        e.preventDefault();

        _this.open(e);
      });

      defineProperty(assertThisInitialized(_this), "openOnArrow", function (e) {
        var code = keyboardKey_1.getCode(e);
        if (!includes_1([keyboardKey_1.ArrowDown, keyboardKey_1.ArrowUp], code)) return;
        if (_this.state.open) return;
        e.preventDefault();

        _this.open(e);
      });

      defineProperty(assertThisInitialized(_this), "makeSelectedItemActive", function (e) {
        var _this$state = _this.state,
            open = _this$state.open,
            value = _this$state.value;
        var multiple = _this.props.multiple;

        var item = _this.getSelectedItem();

        var selectedValue = get_1(item, 'value'); // prevent selecting null if there was no selected item value
        // prevent selecting duplicate items when the dropdown is closed


        if (isNil_1(selectedValue) || !open) return; // state value may be undefined

        var newValue = multiple ? union_1(_this.state.value, [selectedValue]) : selectedValue;
        var valueHasChanged = multiple ? !!difference_1(newValue, value).length : newValue !== value;

        if (valueHasChanged) {
          // notify the onChange prop that the user is trying to change value
          _this.setValue(newValue);

          _this.setSelectedIndex(newValue);

          _this.handleChange(e, newValue); // Heads up! This event handler should be called after `onChange`
          // Notify the onAddItem prop if this is a new value


          if (item['data-additional']) {
            invoke_1(_this.props, 'onAddItem', e, objectSpread({}, _this.props, {
              value: selectedValue
            }));
          }
        }
      });

      defineProperty(assertThisInitialized(_this), "selectItemOnEnter", function (e) {
        var search = _this.props.search;
        var shouldSelect = keyboardKey_1.getCode(e) === keyboardKey_1.Enter || // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
        !search && keyboardKey_1.getCode(e) === keyboardKey_1.Spacebar;
        if (!shouldSelect) return;
        e.preventDefault();

        var optionSize = size_1(_this.getMenuOptions());

        if (search && optionSize === 0) return;

        _this.makeSelectedItemActive(e);

        _this.closeOnChange(e);

        _this.clearSearchQuery();

        if (search) invoke_1(_this.searchRef.current, 'focus');
      });

      defineProperty(assertThisInitialized(_this), "removeItemOnBackspace", function (e) {
        var _this$props3 = _this.props,
            multiple = _this$props3.multiple,
            search = _this$props3.search;
        var _this$state2 = _this.state,
            searchQuery = _this$state2.searchQuery,
            value = _this$state2.value;
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Backspace) return;
        if (searchQuery || !search || !multiple || isEmpty_1(value)) return;
        e.preventDefault(); // remove most recent value

        var newValue = dropRight_1(value);

        _this.setValue(newValue);

        _this.setSelectedIndex(newValue);

        _this.handleChange(e, newValue);
      });

      defineProperty(assertThisInitialized(_this), "closeOnDocumentClick", function (e) {
        if (!_this.props.closeOnBlur) return; // If event happened in the dropdown, ignore it

        if (_this.ref.current && doesNodeContainClick(_this.ref.current, e)) return;

        _this.close();
      });

      defineProperty(assertThisInitialized(_this), "handleMouseDown", function (e) {
        _this.isMouseDown = true;

        invoke_1(_this.props, 'onMouseDown', e, _this.props);

        document.addEventListener('mouseup', _this.handleDocumentMouseUp);
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentMouseUp", function () {
        _this.isMouseDown = false;
        document.removeEventListener('mouseup', _this.handleDocumentMouseUp);
      });

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var _this$props4 = _this.props,
            minCharacters = _this$props4.minCharacters,
            search = _this$props4.search;
        var _this$state3 = _this.state,
            open = _this$state3.open,
            searchQuery = _this$state3.searchQuery;

        invoke_1(_this.props, 'onClick', e, _this.props); // prevent closeOnDocumentClick()


        e.stopPropagation();
        if (!search) return _this.toggle(e);

        if (open) {
          invoke_1(_this.searchRef.current, 'focus');

          return;
        }

        if (searchQuery.length >= minCharacters || minCharacters === 1) {
          _this.open(e);

          return;
        }

        invoke_1(_this.searchRef.current, 'focus');
      });

      defineProperty(assertThisInitialized(_this), "handleIconClick", function (e) {
        var clearable = _this.props.clearable;

        var hasValue = _this.hasValue();

        invoke_1(_this.props, 'onClick', e, _this.props); // prevent handleClick()


        e.stopPropagation();

        if (clearable && hasValue) {
          _this.clearValue(e);
        } else {
          _this.toggle(e);
        }
      });

      defineProperty(assertThisInitialized(_this), "handleItemClick", function (e, item) {
        var _this$props5 = _this.props,
            multiple = _this$props5.multiple,
            search = _this$props5.search;
        var currentValue = _this.state.value;
        var value = item.value; // prevent toggle() in handleClick()

        e.stopPropagation(); // prevent closeOnDocumentClick() if multiple or item is disabled

        if (multiple || item.disabled) e.nativeEvent.stopImmediatePropagation();
        if (item.disabled) return;
        var isAdditionItem = item['data-additional'];
        var newValue = multiple ? union_1(_this.state.value, [value]) : value;
        var valueHasChanged = multiple ? !!difference_1(newValue, currentValue).length : newValue !== currentValue; // notify the onChange prop that the user is trying to change value

        if (valueHasChanged) {
          _this.setValue(newValue);

          _this.setSelectedIndex(value);

          _this.handleChange(e, newValue);
        }

        _this.clearSearchQuery(value);

        if (search) {
          invoke_1(_this.searchRef.current, 'focus');
        } else {
          invoke_1(_this.ref.current, 'focus');
        }

        _this.closeOnChange(e); // Heads up! This event handler should be called after `onChange`
        // Notify the onAddItem prop if this is a new value


        if (isAdditionItem) invoke_1(_this.props, 'onAddItem', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleFocus", function (e) {
        var focus = _this.state.focus;
        if (focus) return;

        invoke_1(_this.props, 'onFocus', e, _this.props);

        _this.setState({
          focus: true
        });
      });

      defineProperty(assertThisInitialized(_this), "handleBlur", function (e) {
        // Heads up! Don't remove this.
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
        var currentTarget = get_1(e, 'currentTarget');

        if (currentTarget && currentTarget.contains(document.activeElement)) return;
        var _this$props6 = _this.props,
            closeOnBlur = _this$props6.closeOnBlur,
            multiple = _this$props6.multiple,
            selectOnBlur = _this$props6.selectOnBlur; // do not "blur" when the mouse is down inside of the Dropdown

        if (_this.isMouseDown) return;

        invoke_1(_this.props, 'onBlur', e, _this.props);

        if (selectOnBlur && !multiple) {
          _this.makeSelectedItemActive(e);

          if (closeOnBlur) _this.close();
        }

        _this.setState({
          focus: false
        });

        _this.clearSearchQuery();
      });

      defineProperty(assertThisInitialized(_this), "handleSearchChange", function (e, _ref) {
        var value = _ref.value;
        // prevent propagating to this.props.onChange()
        e.stopPropagation();
        var minCharacters = _this.props.minCharacters;
        var open = _this.state.open;
        var newQuery = value;

        invoke_1(_this.props, 'onSearchChange', e, objectSpread({}, _this.props, {
          searchQuery: newQuery
        }));

        _this.trySetState({
          searchQuery: newQuery,
          selectedIndex: 0
        }); // open search dropdown on search query


        if (!open && newQuery.length >= minCharacters) {
          _this.open();

          return;
        } // close search dropdown if search query is too small


        if (open && minCharacters !== 1 && newQuery.length < minCharacters) _this.close();
      });

      defineProperty(assertThisInitialized(_this), "getKeyAndValues", function (options) {
        return options ? options.map(function (option) {
          return pick_1(option, ['key', 'value']);
        }) : options;
      });

      defineProperty(assertThisInitialized(_this), "getMenuOptions", function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
        var searchQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.state.searchQuery;
        var _this$props7 = _this.props,
            additionLabel = _this$props7.additionLabel,
            additionPosition = _this$props7.additionPosition,
            allowAdditions = _this$props7.allowAdditions,
            deburr = _this$props7.deburr,
            multiple = _this$props7.multiple,
            search = _this$props7.search;
        var filteredOptions = options; // filter out active options

        if (multiple) {
          filteredOptions = filter_1(filteredOptions, function (opt) {
            return !includes_1(value, opt.value);
          });
        } // filter by search query


        if (search && searchQuery) {
          if (isFunction_1(search)) {
            filteredOptions = search(filteredOptions, searchQuery);
          } else {
            // remove diacritics on search input and options, if deburr prop is set
            var strippedQuery = deburr ? deburr_1(searchQuery) : searchQuery;
            var re = new RegExp(escapeRegExp_1(strippedQuery), 'i');
            filteredOptions = filter_1(filteredOptions, function (opt) {
              return re.test(deburr ? deburr_1(opt.text) : opt.text);
            });
          }
        } // insert the "add" item


        if (allowAdditions && search && searchQuery && !some_1(filteredOptions, {
          text: searchQuery
        })) {
          var additionLabelElement = React__default.isValidElement(additionLabel) ? React__default.cloneElement(additionLabel, {
            key: 'addition-label'
          }) : additionLabel || '';
          var addItem = {
            key: 'addition',
            // by using an array, we can pass multiple elements, but when doing so
            // we must specify a `key` for React to know which one is which
            text: [additionLabelElement, React__default.createElement("b", {
              key: "addition-query"
            }, searchQuery)],
            value: searchQuery,
            className: 'addition',
            'data-additional': true
          };
          if (additionPosition === 'top') filteredOptions.unshift(addItem);else filteredOptions.push(addItem);
        }

        return filteredOptions;
      });

      defineProperty(assertThisInitialized(_this), "getSelectedItem", function () {
        var selectedIndex = _this.state.selectedIndex;

        var options = _this.getMenuOptions();

        return get_1(options, "[".concat(selectedIndex, "]"));
      });

      defineProperty(assertThisInitialized(_this), "getEnabledIndices", function (givenOptions) {
        var options = givenOptions || _this.getMenuOptions();

        return reduce_1(options, function (memo, item, index) {
          if (!item.disabled) memo.push(index);
          return memo;
        }, []);
      });

      defineProperty(assertThisInitialized(_this), "getItemByValue", function (value) {
        var options = _this.props.options;
        return find_1(options, {
          value: value
        });
      });

      defineProperty(assertThisInitialized(_this), "getMenuItemIndexByValue", function (value, givenOptions) {
        var options = givenOptions || _this.getMenuOptions();

        return findIndex_1(options, ['value', value]);
      });

      defineProperty(assertThisInitialized(_this), "getDropdownAriaOptions", function () {
        var _this$props8 = _this.props,
            loading = _this$props8.loading,
            disabled = _this$props8.disabled,
            search = _this$props8.search,
            multiple = _this$props8.multiple;
        var open = _this.state.open;
        var ariaOptions = {
          role: search ? 'combobox' : 'listbox',
          'aria-busy': loading,
          'aria-disabled': disabled,
          'aria-expanded': !!open
        };

        if (ariaOptions.role === 'listbox') {
          ariaOptions['aria-multiselectable'] = multiple;
        }

        return ariaOptions;
      });

      defineProperty(assertThisInitialized(_this), "clearSearchQuery", function (value) {
        var searchQuery = _this.state.searchQuery;
        if (searchQuery === undefined || searchQuery === '') return;

        _this.trySetState({
          searchQuery: ''
        });

        _this.setSelectedIndex(value, undefined, '');
      });

      defineProperty(assertThisInitialized(_this), "setValue", function (value) {
        _this.trySetState({
          value: value
        });
      });

      defineProperty(assertThisInitialized(_this), "setSelectedIndex", function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
        var optionsProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.options;
        var searchQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.state.searchQuery;
        var multiple = _this.props.multiple;
        var selectedIndex = _this.state.selectedIndex;

        var options = _this.getMenuOptions(value, optionsProps, searchQuery);

        var enabledIndicies = _this.getEnabledIndices(options);

        var newSelectedIndex; // update the selected index

        if (!selectedIndex || selectedIndex < 0) {
          var firstIndex = enabledIndicies[0]; // Select the currently active item, if none, use the first item.
          // Multiple selects remove active items from the list,
          // their initial selected index should be 0.

          newSelectedIndex = multiple ? firstIndex : _this.getMenuItemIndexByValue(value, options) || enabledIndicies[0];
        } else if (multiple) {
          // multiple selects remove options from the menu as they are made active
          // keep the selected index within range of the remaining items
          if (selectedIndex >= options.length - 1) {
            newSelectedIndex = enabledIndicies[enabledIndicies.length - 1];
          }
        } else {
          var activeIndex = _this.getMenuItemIndexByValue(value, options); // regular selects can only have one active item
          // set the selected index to the currently active item


          newSelectedIndex = includes_1(enabledIndicies, activeIndex) ? activeIndex : undefined;
        }

        if (!newSelectedIndex || newSelectedIndex < 0) {
          newSelectedIndex = enabledIndicies[0];
        }

        _this.setState({
          selectedIndex: newSelectedIndex
        });
      });

      defineProperty(assertThisInitialized(_this), "handleLabelClick", function (e, labelProps) {
        // prevent focusing search input on click
        e.stopPropagation();

        _this.setState({
          selectedLabel: labelProps.value
        });

        invoke_1(_this.props, 'onLabelClick', e, labelProps);
      });

      defineProperty(assertThisInitialized(_this), "handleLabelRemove", function (e, labelProps) {
        // prevent focusing search input on click
        e.stopPropagation();
        var value = _this.state.value;

        var newValue = without_1(value, labelProps.value);

        _this.setValue(newValue);

        _this.setSelectedIndex(newValue);

        _this.handleChange(e, newValue);
      });

      defineProperty(assertThisInitialized(_this), "moveSelectionBy", function (offset) {
        var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.selectedIndex;

        var options = _this.getMenuOptions(); // Prevent infinite loop
        // TODO: remove left part of condition after children API will be removed


        if (options === undefined || every_1(options, 'disabled')) return;
        var lastIndex = options.length - 1;
        var wrapSelection = _this.props.wrapSelection; // next is after last, wrap to beginning
        // next is before first, wrap to end

        var nextIndex = startIndex + offset; // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change

        if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
          nextIndex = startIndex;
        } else if (nextIndex > lastIndex) nextIndex = 0;else if (nextIndex < 0) nextIndex = lastIndex;

        if (options[nextIndex].disabled) {
          _this.moveSelectionBy(offset, nextIndex);

          return;
        }

        _this.setState({
          selectedIndex: nextIndex
        });

        _this.scrollSelectedItemIntoView();
      });

      defineProperty(assertThisInitialized(_this), "handleIconOverrides", function (predefinedProps) {
        var clearable = _this.props.clearable;
        var classes = classnames(clearable && _this.hasValue() && 'clear', predefinedProps.className);
        return {
          className: classes,
          onClick: function onClick(e) {
            invoke_1(predefinedProps, 'onClick', e, predefinedProps);

            _this.handleIconClick(e);
          }
        };
      });

      defineProperty(assertThisInitialized(_this), "clearValue", function (e) {
        var multiple = _this.props.multiple;
        var newValue = multiple ? [] : '';

        _this.setValue(newValue);

        _this.setSelectedIndex(newValue);

        _this.handleChange(e, newValue);
      });

      defineProperty(assertThisInitialized(_this), "computeSearchInputTabIndex", function () {
        var _this$props9 = _this.props,
            disabled = _this$props9.disabled,
            tabIndex = _this$props9.tabIndex;
        if (!isNil_1(tabIndex)) return tabIndex;
        return disabled ? -1 : 0;
      });

      defineProperty(assertThisInitialized(_this), "computeSearchInputWidth", function () {
        var searchQuery = _this.state.searchQuery;

        if (_this.sizerRef.current && searchQuery) {
          // resize the search input, temporarily show the sizer so we can measure it
          _this.sizerRef.current.style.display = 'inline';
          _this.sizerRef.current.textContent = searchQuery;
          var searchWidth = Math.ceil(_this.sizerRef.current.getBoundingClientRect().width);

          _this.sizerRef.current.style.removeProperty('display');

          return searchWidth;
        }
      });

      defineProperty(assertThisInitialized(_this), "computeTabIndex", function () {
        var _this$props10 = _this.props,
            disabled = _this$props10.disabled,
            search = _this$props10.search,
            tabIndex = _this$props10.tabIndex; // don't set a root node tabIndex as the search input has its own tabIndex

        if (search) return undefined;
        if (disabled) return -1;
        return isNil_1(tabIndex) ? 0 : tabIndex;
      });

      defineProperty(assertThisInitialized(_this), "handleSearchInputOverrides", function (predefinedProps) {
        return {
          onChange: function onChange(e, inputProps) {
            invoke_1(predefinedProps, 'onChange', e, inputProps);

            _this.handleSearchChange(e, inputProps);
          }
        };
      });

      defineProperty(assertThisInitialized(_this), "hasValue", function () {
        var multiple = _this.props.multiple;
        var value = _this.state.value;
        return multiple ? !isEmpty_1(value) : !isNil_1(value) && value !== '';
      });

      defineProperty(assertThisInitialized(_this), "scrollSelectedItemIntoView", function () {
        if (!_this.ref.current) return;

        var menu = _this.ref.current.querySelector('.menu.visible');

        if (!menu) return;
        var item = menu.querySelector('.item.selected');
        if (!item) return;
        var isOutOfUpperView = item.offsetTop < menu.scrollTop;
        var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

        if (isOutOfUpperView) {
          menu.scrollTop = item.offsetTop;
        } else if (isOutOfLowerView) {
          // eslint-disable-next-line no-mixed-operators
          menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
        }
      });

      defineProperty(assertThisInitialized(_this), "setOpenDirection", function () {
        if (!_this.ref.current) return;

        var menu = _this.ref.current.querySelector('.menu.visible');

        if (!menu) return;

        var dropdownRect = _this.ref.current.getBoundingClientRect();

        var menuHeight = menu.clientHeight;
        var spaceAtTheBottom = document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight;
        var spaceAtTheTop = dropdownRect.top - menuHeight;
        var upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom; // set state only if there's a relevant difference

        if (!upward !== !_this.state.upward) {
          _this.trySetState({
            upward: upward
          });
        }
      });

      defineProperty(assertThisInitialized(_this), "open", function (e) {
        var _this$props11 = _this.props,
            disabled = _this$props11.disabled,
            open = _this$props11.open,
            search = _this$props11.search;
        if (disabled) return;
        if (search) invoke_1(_this.searchRef.current, 'focus');

        invoke_1(_this.props, 'onOpen', e, _this.props);

        _this.trySetState({
          open: true
        });

        _this.scrollSelectedItemIntoView();
      });

      defineProperty(assertThisInitialized(_this), "close", function (e) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.handleClose;
        var open = _this.state.open;

        if (open) {
          invoke_1(_this.props, 'onClose', e, _this.props);

          _this.trySetState({
            open: false
          }, callback);
        }
      });

      defineProperty(assertThisInitialized(_this), "handleClose", function () {
        var hasSearchFocus = document.activeElement === _this.searchRef.current; // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
        // Blur the Dropdown on close so it is blurred after selecting an item.
        // This is to prevent it from re-opening when switching tabs after selecting an item.

        if (!hasSearchFocus && _this.ref.current) {
          _this.ref.current.blur();
        }

        var hasDropdownFocus = document.activeElement === _this.ref.current;
        var hasFocus = hasSearchFocus || hasDropdownFocus; // We need to keep the virtual model in sync with the browser focus change
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/692

        _this.setState({
          focus: hasFocus
        });
      });

      defineProperty(assertThisInitialized(_this), "toggle", function (e) {
        return _this.state.open ? _this.close(e) : _this.open(e);
      });

      defineProperty(assertThisInitialized(_this), "renderText", function () {
        var _this$props12 = _this.props,
            multiple = _this$props12.multiple,
            placeholder = _this$props12.placeholder,
            search = _this$props12.search,
            text = _this$props12.text;
        var _this$state4 = _this.state,
            searchQuery = _this$state4.searchQuery,
            value = _this$state4.value,
            open = _this$state4.open;

        var hasValue = _this.hasValue();

        var classes = classnames(placeholder && !hasValue && 'default', 'text', search && searchQuery && 'filtered');
        var _text = placeholder;

        if (text) {
          _text = text;
        } else if (open && !multiple) {
          _text = get_1(_this.getSelectedItem(), 'text');
        } else if (hasValue) {
          _text = get_1(_this.getItemByValue(value), 'text');
        }

        return React__default.createElement("div", {
          className: classes,
          role: "alert",
          "aria-live": "polite",
          "aria-atomic": true
        }, _text);
      });

      defineProperty(assertThisInitialized(_this), "renderSearchInput", function () {
        var _this$props13 = _this.props,
            search = _this$props13.search,
            searchInput = _this$props13.searchInput;
        var searchQuery = _this.state.searchQuery;
        return search && React__default.createElement(Ref, {
          innerRef: _this.searchRef
        }, DropdownSearchInput.create(searchInput, {
          defaultProps: {
            style: {
              width: _this.computeSearchInputWidth()
            },
            tabIndex: _this.computeSearchInputTabIndex(),
            value: searchQuery
          },
          overrideProps: _this.handleSearchInputOverrides
        }));
      });

      defineProperty(assertThisInitialized(_this), "renderSearchSizer", function () {
        var _this$props14 = _this.props,
            search = _this$props14.search,
            multiple = _this$props14.multiple;
        return search && multiple && React__default.createElement("span", {
          className: "sizer",
          ref: _this.sizerRef
        });
      });

      defineProperty(assertThisInitialized(_this), "renderLabels", function () {
        var _this$props15 = _this.props,
            multiple = _this$props15.multiple,
            renderLabel = _this$props15.renderLabel;
        var _this$state5 = _this.state,
            selectedLabel = _this$state5.selectedLabel,
            value = _this$state5.value;

        if (!multiple || isEmpty_1(value)) {
          return;
        }

        var selectedItems = map_1(value, _this.getItemByValue);

        // if no item could be found for a given state value the selected item will be undefined
        // compact the selectedItems so we only have actual objects left
        return map_1(compact_1(selectedItems), function (item, index) {
          var defaultProps = {
            active: item.value === selectedLabel,
            as: 'a',
            key: getKeyOrValue(item.key, item.value),
            onClick: _this.handleLabelClick,
            onRemove: _this.handleLabelRemove,
            value: item.value
          };
          return Label.create(renderLabel(item, index, defaultProps), {
            defaultProps: defaultProps
          });
        });
      });

      defineProperty(assertThisInitialized(_this), "renderOptions", function () {
        var _this$props16 = _this.props,
            lazyLoad = _this$props16.lazyLoad,
            multiple = _this$props16.multiple,
            search = _this$props16.search,
            noResultsMessage = _this$props16.noResultsMessage;
        var _this$state6 = _this.state,
            open = _this$state6.open,
            selectedIndex = _this$state6.selectedIndex,
            value = _this$state6.value; // lazy load, only render options when open

        if (lazyLoad && !open) return null;

        var options = _this.getMenuOptions();

        if (noResultsMessage !== null && search && isEmpty_1(options)) {
          return React__default.createElement("div", {
            className: "message"
          }, noResultsMessage);
        }

        var isActive = multiple ? function (optValue) {
          return includes_1(value, optValue);
        } : function (optValue) {
          return optValue === value;
        };
        return map_1(options, function (opt, i) {
          return DropdownItem.create(objectSpread({
            active: isActive(opt.value),
            onClick: _this.handleItemClick,
            selected: selectedIndex === i
          }, opt, {
            key: getKeyOrValue(opt.key, opt.value),
            // Needed for handling click events on disabled items
            style: objectSpread({}, opt.style, {
              pointerEvents: 'all'
            })
          }));
        });
      });

      defineProperty(assertThisInitialized(_this), "renderMenu", function () {
        var _this$props17 = _this.props,
            children = _this$props17.children,
            direction = _this$props17.direction,
            header = _this$props17.header;
        var open = _this.state.open;

        var ariaOptions = _this.getDropdownMenuAriaOptions(); // single menu child


        if (!isNil(children)) {
          var menuChild = React.Children.only(children);
          var className = classnames(direction, useKeyOnly(open, 'visible'), menuChild.props.className);
          return React.cloneElement(menuChild, objectSpread({
            className: className
          }, ariaOptions));
        }

        return React__default.createElement(DropdownMenu, _extends_1({}, ariaOptions, {
          direction: direction,
          open: open
        }), DropdownHeader.create(header, {
          autoGenerateKey: false
        }), _this.renderOptions());
      });

      return _this;
    }

    createClass(Dropdown, [{
      key: "getInitialAutoControlledState",
      value: function getInitialAutoControlledState() {
        return {
          focus: false,
          searchQuery: ''
        };
      } // eslint-disable-next-line camelcase

    }, {
      key: "UNSAFE_componentWillMount",
      value: function UNSAFE_componentWillMount() {
        var _this$state7 = this.state,
            open = _this$state7.open,
            value = _this$state7.value;
        this.setValue(value);
        this.setSelectedIndex(value);

        if (open) {
          this.open();
        }
      } // eslint-disable-next-line camelcase

    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        get$1(getPrototypeOf(Dropdown.prototype), "UNSAFE_componentWillReceiveProps", this).call(this, nextProps);
        /* eslint-enable no-console */


        if (!shallowequal(nextProps.value, this.props.value)) {
          this.setValue(nextProps.value);
          this.setSelectedIndex(nextProps.value);
        } // The selected index is only dependent on option keys/values.
        // We only check those properties to avoid recursive performance impacts.
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000


        if (!isEqual_1(this.getKeyAndValues(nextProps.options), this.getKeyAndValues(this.props.options))) {
          this.setSelectedIndex(undefined, nextProps.options);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        // eslint-disable-line complexity
        var _this$props18 = this.props,
            closeOnBlur = _this$props18.closeOnBlur,
            minCharacters = _this$props18.minCharacters,
            openOnFocus = _this$props18.openOnFocus,
            search = _this$props18.search; // focused / blurred

        if (!prevState.focus && this.state.focus) {
          if (!this.isMouseDown) {
            var openable = !search || search && minCharacters === 1 && !this.state.open;
            if (openOnFocus && openable) this.open();
          }
        } else if (prevState.focus && !this.state.focus) {
          if (!this.isMouseDown && closeOnBlur) {
            this.close();
          }
        } // opened / closed


        if (!prevState.open && this.state.open) {
          this.setOpenDirection();
          this.scrollSelectedItemIntoView();
        } else if (prevState.open && !this.state.open) ;
      } // ----------------------------------------
      // Document Event Handlers
      // ----------------------------------------
      // onChange needs to receive a value
      // can't rely on props.value if we are controlled

    }, {
      key: "getDropdownMenuAriaOptions",
      value: function getDropdownMenuAriaOptions() {
        var _this$props19 = this.props,
            search = _this$props19.search,
            multiple = _this$props19.multiple;
        var ariaOptions = {};

        if (search) {
          ariaOptions['aria-multiselectable'] = multiple;
          ariaOptions.role = 'listbox';
        }

        return ariaOptions;
      } // ----------------------------------------
      // Setters
      // ----------------------------------------

    }, {
      key: "render",
      value: function render() {
        var _this$props20 = this.props,
            basic = _this$props20.basic,
            button = _this$props20.button,
            className = _this$props20.className,
            compact = _this$props20.compact,
            disabled = _this$props20.disabled,
            error = _this$props20.error,
            fluid = _this$props20.fluid,
            floating = _this$props20.floating,
            icon = _this$props20.icon,
            inline = _this$props20.inline,
            item = _this$props20.item,
            labeled = _this$props20.labeled,
            loading = _this$props20.loading,
            multiple = _this$props20.multiple,
            pointing = _this$props20.pointing,
            search = _this$props20.search,
            selection = _this$props20.selection,
            scrolling = _this$props20.scrolling,
            simple = _this$props20.simple,
            trigger = _this$props20.trigger;
        var _this$state8 = this.state,
            focus = _this$state8.focus,
            open = _this$state8.open,
            upward = _this$state8.upward; // Classes

        var classes = classnames('ui', useKeyOnly(open, 'active visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(loading, 'loading'), useKeyOnly(basic, 'basic'), useKeyOnly(button, 'button'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(floating, 'floating'), useKeyOnly(inline, 'inline'), // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
        // TODO: the icon class is only required when a dropdown is a button
        // useKeyOnly(icon, 'icon'),
        useKeyOnly(labeled, 'labeled'), useKeyOnly(item, 'item'), useKeyOnly(multiple, 'multiple'), useKeyOnly(search, 'search'), useKeyOnly(selection, 'selection'), useKeyOnly(simple, 'simple'), useKeyOnly(scrolling, 'scrolling'), useKeyOnly(upward, 'upward'), useKeyOrValueAndKey(pointing, 'pointing'), 'dropdown', className);
        var rest = getUnhandledProps(Dropdown, this.props);
        var ElementType = getElementType(Dropdown, this.props);
        var ariaOptions = this.getDropdownAriaOptions(ElementType, this.props);
        return React__default.createElement(Ref, {
          innerRef: this.ref
        }, React__default.createElement(ElementType, _extends_1({}, rest, ariaOptions, {
          className: classes,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          onMouseDown: this.handleMouseDown,
          onFocus: this.handleFocus,
          onChange: this.handleChange,
          tabIndex: this.computeTabIndex()
        }), this.renderLabels(), this.renderSearchInput(), this.renderSearchSizer(), trigger || this.renderText(), Icon.create(icon, {
          overrideProps: this.handleIconOverrides,
          autoGenerateKey: false
        }), this.renderMenu(), open && React__default.createElement(lib, {
          name: "keydown",
          on: this.closeOnEscape
        }), open && React__default.createElement(lib, {
          name: "keydown",
          on: this.moveSelectionOnKeyDown
        }), open && React__default.createElement(lib, {
          name: "click",
          on: this.closeOnDocumentClick
        }), open && React__default.createElement(lib, {
          name: "keydown",
          on: this.selectItemOnEnter
        }), focus && React__default.createElement(lib, {
          name: "keydown",
          on: this.removeItemOnBackspace
        }), focus && !open && React__default.createElement(lib, {
          name: "keydown",
          on: this.openOnArrow
        }), focus && !open && React__default.createElement(lib, {
          name: "keydown",
          on: this.openOnSpace
        })));
      }
    }]);

    return Dropdown;
  }(AutoControlledComponent);

  defineProperty(Dropdown, "defaultProps", {
    additionLabel: 'Add ',
    additionPosition: 'top',
    closeOnBlur: true,
    closeOnEscape: true,
    deburr: false,
    icon: 'dropdown',
    minCharacters: 1,
    noResultsMessage: 'No results found.',
    openOnFocus: true,
    renderLabel: function renderLabel(_ref2) {
      var text = _ref2.text;
      return text;
    },
    searchInput: 'text',
    selectOnBlur: true,
    selectOnNavigation: true,
    wrapSelection: true
  });

  defineProperty(Dropdown, "autoControlledProps", ['open', 'searchQuery', 'selectedLabel', 'value', 'upward']);

  defineProperty(Dropdown, "Divider", DropdownDivider);

  defineProperty(Dropdown, "Header", DropdownHeader);

  defineProperty(Dropdown, "Item", DropdownItem);

  defineProperty(Dropdown, "Menu", DropdownMenu);

  defineProperty(Dropdown, "SearchInput", DropdownSearchInput);

  defineProperty(Dropdown, "handledProps", ["additionLabel", "additionPosition", "allowAdditions", "as", "basic", "button", "children", "className", "clearable", "closeOnBlur", "closeOnChange", "closeOnEscape", "compact", "deburr", "defaultOpen", "defaultSearchQuery", "defaultSelectedLabel", "defaultUpward", "defaultValue", "direction", "disabled", "error", "floating", "fluid", "header", "icon", "inline", "item", "labeled", "lazyLoad", "loading", "minCharacters", "multiple", "noResultsMessage", "onAddItem", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onLabelClick", "onMouseDown", "onOpen", "onSearchChange", "open", "openOnFocus", "options", "placeholder", "pointing", "renderLabel", "scrolling", "search", "searchInput", "searchQuery", "selectOnBlur", "selectOnNavigation", "selectedLabel", "selection", "simple", "tabIndex", "text", "trigger", "upward", "value", "wrapSelection"]);
  Dropdown.propTypes =  {};

  /**
   * A Select is sugar for <Dropdown selection />.
   * @see Dropdown
   * @see Form
   */

  function Select(props) {
    return React__default.createElement(Dropdown, _extends_1({}, props, {
      selection: true
    }));
  }

  Select.handledProps = ["options"];
  Select.propTypes =  {};
  Select.Divider = Dropdown.Divider;
  Select.Header = Dropdown.Header;
  Select.Item = Dropdown.Item;
  Select.Menu = Dropdown.Menu;

  /**
   * A TextArea can be used to allow for extended user input.
   * @see Form
   */

  var TextArea =
  /*#__PURE__*/
  function (_Component) {
    inherits(TextArea, _Component);

    function TextArea() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, TextArea);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(TextArea)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "focus", function () {
        return _this.ref.current.focus();
      });

      defineProperty(assertThisInitialized(_this), "handleChange", function (e) {
        var value = get_1(e, 'target.value');

        invoke_1(_this.props, 'onChange', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleInput", function (e) {
        var value = get_1(e, 'target.value');

        invoke_1(_this.props, 'onInput', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      return _this;
    }

    createClass(TextArea, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            rows = _this$props.rows,
            value = _this$props.value;
        var rest = getUnhandledProps(TextArea, this.props);
        var ElementType = getElementType(TextArea, this.props);
        return React__default.createElement(Ref, {
          innerRef: this.ref
        }, React__default.createElement(ElementType, _extends_1({}, rest, {
          onChange: this.handleChange,
          onInput: this.handleInput,
          rows: rows,
          value: value
        })));
      }
    }]);

    return TextArea;
  }(React.Component);

  defineProperty(TextArea, "defaultProps", {
    as: 'textarea',
    rows: 3
  });

  defineProperty(TextArea, "handledProps", ["as", "onChange", "onInput", "rows", "value"]);

  TextArea.propTypes =  {};

  /**
   * Creates an object with the same keys as `object` and values generated
   * by running each own enumerable string keyed property of `object` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns the new mapped object.
   * @see _.mapKeys
   * @example
   *
   * var users = {
   *   'fred':    { 'user': 'fred',    'age': 40 },
   *   'pebbles': { 'user': 'pebbles', 'age': 1 }
   * };
   *
   * _.mapValues(users, function(o) { return o.age; });
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   *
   * // The `_.property` iteratee shorthand.
   * _.mapValues(users, 'age');
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   */
  function mapValues(object, iteratee) {
    var result = {};
    iteratee = _baseIteratee(iteratee);

    _baseForOwn(object, function(value, key, object) {
      _baseAssignValue(result, key, iteratee(value, key, object));
    });
    return result;
  }

  var mapValues_1 = mapValues;

  /**
   * A Transition.Group animates children as they mount and unmount.
   */
  var TransitionGroup =
  /*#__PURE__*/
  function (_React$Component) {
    inherits(TransitionGroup, _React$Component);

    function TransitionGroup() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, TransitionGroup);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(TransitionGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleOnHide", function (nothing, childProps) {
        var reactKey = childProps.reactKey;

        _this.setState(function (state) {
          var children = objectSpread({}, state.children);

          delete children[reactKey];
          return {
            children: children
          };
        });
      });

      defineProperty(assertThisInitialized(_this), "wrapChild", function (child) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var _this$props = _this.props,
            animation = _this$props.animation,
            directional = _this$props.directional,
            duration = _this$props.duration;
        var key = child.key;
        var _options$visible = options.visible,
            visible = _options$visible === void 0 ? true : _options$visible,
            _options$transitionOn = options.transitionOnMount,
            transitionOnMount = _options$transitionOn === void 0 ? false : _options$transitionOn;
        return React__default.createElement(Transition, {
          animation: animation,
          directional: directional,
          duration: duration,
          key: key,
          onHide: _this.handleOnHide,
          reactKey: key,
          transitionOnMount: transitionOnMount,
          visible: visible
        }, child);
      });

      var _children = _this.props.children;
      _this.state = {
        children: mapValues_1(getChildMapping(_children), function (child) {
          return _this.wrapChild(child);
        })
      };
      return _this;
    } // eslint-disable-next-line camelcase


    createClass(TransitionGroup, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var prevMapping = this.state.children;
        var nextMapping = getChildMapping(nextProps.children);
        var children = mergeChildMappings(prevMapping, nextMapping);

        forEach_1(children, function (child, key) {
          var hasPrev = has_1(prevMapping, key);

          var hasNext = has_1(nextMapping, key);

          var prevChild = prevMapping[key];
          var isLeaving = !get_1(prevChild, 'props.visible'); // Heads up!
          // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped

          if (hasNext && (!hasPrev || isLeaving)) {
            children[key] = _this2.wrapChild(child, {
              transitionOnMount: true
            });
            return;
          } // Heads up!
          // An item is old (exiting), it will be picked from `prevChildren`, so it has been already
          // wrapped, so should be only updated


          if (!hasNext && hasPrev && !isLeaving) {
            children[key] = React.cloneElement(prevChild, {
              visible: false
            });
            return;
          } // Heads up!
          // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
          // so we should wrap it again


          var _prevChild$props = prevChild.props,
              visible = _prevChild$props.visible,
              transitionOnMount = _prevChild$props.transitionOnMount;
          children[key] = _this2.wrapChild(child, {
            transitionOnMount: transitionOnMount,
            visible: visible
          });
        });

        this.setState({
          children: children
        });
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.state.children;
        var ElementType = getElementType(TransitionGroup, this.props);
        var rest = getUnhandledProps(TransitionGroup, this.props);
        return React__default.createElement(ElementType, rest, values_1(children));
      }
    }]);

    return TransitionGroup;
  }(React__default.Component);

  defineProperty(TransitionGroup, "defaultProps", {
    as: React.Fragment,
    animation: 'fade',
    duration: 500
  });

  defineProperty(TransitionGroup, "handledProps", ["animation", "as", "children", "directional", "duration"]);
  TransitionGroup.propTypes =  {};

  var TRANSITION_TYPE = {
    ENTERING: 'show',
    EXITING: 'hide'
    /**
     * A transition is an animation usually used to move content in or out of view.
     */

  };

  var Transition =
  /*#__PURE__*/
  function (_Component) {
    inherits(Transition, _Component);

    function Transition() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Transition);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Transition)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleStart", function () {
        var duration = _this.props.duration;
        var status = _this.nextStatus;
        _this.nextStatus = null;

        _this.setState({
          status: status,
          animating: true
        }, function () {
          var durationType = TRANSITION_TYPE[status];
          var durationValue = normalizeTransitionDuration(duration, durationType);

          invoke_1(_this.props, 'onStart', null, objectSpread({}, _this.props, {
            status: status
          }));

          _this.timeoutId = setTimeout(_this.handleComplete, durationValue);
        });
      });

      defineProperty(assertThisInitialized(_this), "handleComplete", function () {
        var current = _this.state.status;

        invoke_1(_this.props, 'onComplete', null, objectSpread({}, _this.props, {
          status: current
        }));

        if (_this.nextStatus) {
          _this.handleStart();

          return;
        }

        var status = _this.computeCompletedStatus();

        var callback = current === Transition.ENTERING ? 'onShow' : 'onHide';

        _this.setState({
          status: status,
          animating: false
        }, function () {
          invoke_1(_this.props, callback, null, objectSpread({}, _this.props, {
            status: status
          }));
        });
      });

      defineProperty(assertThisInitialized(_this), "updateStatus", function () {
        var animating = _this.state.animating;

        if (_this.nextStatus) {
          _this.nextStatus = _this.computeNextStatus();
          if (!animating) _this.handleStart();
        }
      });

      defineProperty(assertThisInitialized(_this), "computeClasses", function () {
        var _this$props = _this.props,
            animation = _this$props.animation,
            directional = _this$props.directional,
            children = _this$props.children;
        var _this$state = _this.state,
            animating = _this$state.animating,
            status = _this$state.status;

        var childClasses = get_1(children, 'props.className');

        var isDirectional = isNil_1(directional) ? includes_1(DIRECTIONAL_TRANSITIONS, animation) : directional;

        if (isDirectional) {
          return classnames(animation, childClasses, useKeyOnly(animating, 'animating'), useKeyOnly(status === Transition.ENTERING, 'in'), useKeyOnly(status === Transition.EXITING, 'out'), useKeyOnly(status === Transition.EXITED, 'hidden'), useKeyOnly(status !== Transition.EXITED, 'visible'), 'transition');
        }

        return classnames(animation, childClasses, useKeyOnly(animating, 'animating transition'));
      });

      defineProperty(assertThisInitialized(_this), "computeCompletedStatus", function () {
        var unmountOnHide = _this.props.unmountOnHide;
        var status = _this.state.status;
        if (status === Transition.ENTERING) return Transition.ENTERED;
        return unmountOnHide ? Transition.UNMOUNTED : Transition.EXITED;
      });

      defineProperty(assertThisInitialized(_this), "computeInitialStatuses", function () {
        var _this$props2 = _this.props,
            visible = _this$props2.visible,
            mountOnShow = _this$props2.mountOnShow,
            transitionOnMount = _this$props2.transitionOnMount,
            unmountOnHide = _this$props2.unmountOnHide;

        if (visible) {
          if (transitionOnMount) {
            return {
              initial: Transition.EXITED,
              next: Transition.ENTERING
            };
          }

          return {
            initial: Transition.ENTERED
          };
        }

        if (mountOnShow || unmountOnHide) return {
          initial: Transition.UNMOUNTED
        };
        return {
          initial: Transition.EXITED
        };
      });

      defineProperty(assertThisInitialized(_this), "computeNextStatus", function () {
        var _this$state2 = _this.state,
            animating = _this$state2.animating,
            status = _this$state2.status;
        if (animating) return status === Transition.ENTERING ? Transition.EXITING : Transition.ENTERING;
        return status === Transition.ENTERED ? Transition.EXITING : Transition.ENTERING;
      });

      defineProperty(assertThisInitialized(_this), "computeStatuses", function (props) {
        var status = _this.state.status;
        var visible = props.visible;

        if (visible) {
          return {
            current: status === Transition.UNMOUNTED && Transition.EXITED,
            next: status !== Transition.ENTERING && status !== Transition.ENTERED && Transition.ENTERING
          };
        }

        return {
          next: (status === Transition.ENTERING || status === Transition.ENTERED) && Transition.EXITING
        };
      });

      defineProperty(assertThisInitialized(_this), "computeStyle", function () {
        var _this$props3 = _this.props,
            children = _this$props3.children,
            duration = _this$props3.duration;
        var status = _this.state.status;

        var childStyle = get_1(children, 'props.style');

        var type = TRANSITION_TYPE[status];
        var animationDuration = type && "".concat(normalizeTransitionDuration(duration, type), "ms");
        return objectSpread({}, childStyle, {
          animationDuration: animationDuration
        });
      });

      var _this$computeInitialS = _this.computeInitialStatuses(),
          _status = _this$computeInitialS.initial,
          next = _this$computeInitialS.next;

      _this.nextStatus = next;
      _this.state = {
        status: _status
      };
      return _this;
    } // ----------------------------------------
    // Lifecycle
    // ----------------------------------------


    createClass(Transition, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateStatus();
      } // eslint-disable-next-line camelcase

    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var _this$computeStatuses = this.computeStatuses(nextProps),
            status = _this$computeStatuses.current,
            next = _this$computeStatuses.next;

        this.nextStatus = next;
        if (status) this.setState({
          status: status
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.updateStatus();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.timeoutId);
      } // ----------------------------------------
      // Callback handling
      // ----------------------------------------

    }, {
      key: "render",
      // ----------------------------------------
      // Render
      // ----------------------------------------
      value: function render() {
        var children = this.props.children;
        var status = this.state.status;
        if (status === Transition.UNMOUNTED) return null;
        return React.cloneElement(children, {
          className: this.computeClasses(),
          style: this.computeStyle()
        });
      }
    }]);

    return Transition;
  }(React.Component);

  defineProperty(Transition, "defaultProps", {
    animation: 'fade',
    duration: 500,
    visible: true,
    mountOnShow: true,
    transitionOnMount: false,
    unmountOnHide: false
  });

  defineProperty(Transition, "ENTERED", 'ENTERED');

  defineProperty(Transition, "ENTERING", 'ENTERING');

  defineProperty(Transition, "EXITED", 'EXITED');

  defineProperty(Transition, "EXITING", 'EXITING');

  defineProperty(Transition, "UNMOUNTED", 'UNMOUNTED');

  defineProperty(Transition, "Group", TransitionGroup);

  defineProperty(Transition, "handledProps", ["animation", "children", "directional", "duration", "mountOnShow", "onComplete", "onHide", "onShow", "onStart", "reactKey", "transitionOnMount", "unmountOnHide", "visible"]);
  Transition.propTypes =  {};

  /**
   * A sugar for `Portal` and `Transition`.
   * @see Portal
   * @see Transition
   */
  var TransitionablePortal =
  /*#__PURE__*/
  function (_Component) {
    inherits(TransitionablePortal, _Component);

    function TransitionablePortal(props) {
      var _this;

      classCallCheck(this, TransitionablePortal);

      _this = possibleConstructorReturn(this, getPrototypeOf(TransitionablePortal).call(this, props));

      defineProperty(assertThisInitialized(_this), "handlePortalClose", function () {
        _this.setState({
          portalOpen: false
        });
      });

      defineProperty(assertThisInitialized(_this), "handlePortalOpen", function () {
        _this.setState({
          portalOpen: true
        });
      });

      defineProperty(assertThisInitialized(_this), "handleTransitionHide", function (nothing, data) {
        var portalOpen = _this.state.portalOpen;

        _this.setState({
          transitionVisible: false
        });

        invoke_1(_this.props, 'onClose', null, objectSpread({}, data, {
          portalOpen: false,
          transitionVisible: false
        }));

        invoke_1(_this.props, 'onHide', null, objectSpread({}, data, {
          portalOpen: portalOpen,
          transitionVisible: false
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleTransitionStart", function (nothing, data) {
        var portalOpen = _this.state.portalOpen;
        var status = data.status;
        var transitionVisible = status === Transition.ENTERING;

        invoke_1(_this.props, 'onStart', null, objectSpread({}, data, {
          portalOpen: portalOpen,
          transitionVisible: transitionVisible
        })); // Heads up! TransitionablePortal fires onOpen callback on the start of transition animation


        if (!transitionVisible) return;

        _this.setState({
          transitionVisible: transitionVisible
        });

        invoke_1(_this.props, 'onOpen', null, objectSpread({}, data, {
          transitionVisible: transitionVisible,
          portalOpen: true
        }));
      });

      _this.state = {
        portalOpen: props.open
      };
      return _this;
    } // ----------------------------------------
    // Lifecycle
    // ----------------------------------------
    // eslint-disable-next-line camelcase


    createClass(TransitionablePortal, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(_ref) {
        var open = _ref.open;
        this.setState({
          portalOpen: open
        });
      } // ----------------------------------------
      // Callback handling
      // ----------------------------------------

    }, {
      key: "render",
      // ----------------------------------------
      // Render
      // ----------------------------------------
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            transition = _this$props.transition;
        var _this$state = this.state,
            portalOpen = _this$state.portalOpen,
            transitionVisible = _this$state.transitionVisible;
        var open = portalOpen || transitionVisible;
        var rest = getUnhandledProps(TransitionablePortal, this.props);
        return React__default.createElement(Portal, _extends_1({}, rest, {
          open: open,
          onOpen: this.handlePortalOpen,
          onClose: this.handlePortalClose
        }), React__default.createElement(Transition, _extends_1({}, transition, {
          transitionOnMount: true,
          onStart: this.handleTransitionStart,
          onHide: this.handleTransitionHide,
          visible: portalOpen
        }), children));
      }
    }]);

    return TransitionablePortal;
  }(React.Component);

  defineProperty(TransitionablePortal, "defaultProps", {
    transition: {
      animation: 'scale',
      duration: 400
    }
  });

  defineProperty(TransitionablePortal, "handledProps", ["children", "onClose", "onHide", "onOpen", "onStart", "open", "transition"]);
  TransitionablePortal.propTypes =  {};

  /**
   * Visibility provides a set of callbacks for when a content appears in the viewport.
   */

  var Visibility =
  /*#__PURE__*/
  function (_Component) {
    inherits(Visibility, _Component);

    function Visibility() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Visibility);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Visibility)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "calculations", {
        bottomPassed: false,
        bottomVisible: false,
        fits: false,
        passing: false,
        offScreen: false,
        onScreen: false,
        topPassed: false,
        topVisible: false
      });

      defineProperty(assertThisInitialized(_this), "firedCallbacks", []);

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "fire", function (_ref, value) {
        var callback = _ref.callback,
            name = _ref.name;
        var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _this$props = _this.props,
            continuous = _this$props.continuous,
            once = _this$props.once; // Heads up! For the execution is required:
        // - current value correspond to the fired direction
        // - `continuous` is true or calculation values are different

        var matchesDirection = _this.calculations[value] !== reverse;
        var executionPossible = continuous || _this.calculations[value] !== _this.oldCalculations[value];
        if (matchesDirection && executionPossible) _this.execute(callback, name); // Heads up! We should remove callback from the happened when it's not `once`

        if (!once) _this.firedCallbacks = without_1(_this.firedCallbacks, name);
      });

      defineProperty(assertThisInitialized(_this), "handleUpdate", function () {
        if (_this.ticking) return;
        _this.ticking = true;
        _this.frameId = requestAnimationFrame(_this.update);
      });

      defineProperty(assertThisInitialized(_this), "update", function () {
        if (!_this.mounted) return;
        _this.ticking = false;
        _this.oldCalculations = _this.calculations;
        _this.calculations = _this.computeCalculations();
        _this.pageYOffset = _this.getPageYOffset();
        var _this$props2 = _this.props,
            onBottomPassed = _this$props2.onBottomPassed,
            onBottomPassedReverse = _this$props2.onBottomPassedReverse,
            onBottomVisible = _this$props2.onBottomVisible,
            onBottomVisibleReverse = _this$props2.onBottomVisibleReverse,
            onPassing = _this$props2.onPassing,
            onPassingReverse = _this$props2.onPassingReverse,
            onTopPassed = _this$props2.onTopPassed,
            onTopPassedReverse = _this$props2.onTopPassedReverse,
            onTopVisible = _this$props2.onTopVisible,
            onTopVisibleReverse = _this$props2.onTopVisibleReverse,
            onOffScreen = _this$props2.onOffScreen,
            onOnScreen = _this$props2.onOnScreen,
            updateOn = _this$props2.updateOn;
        var forward = {
          bottomPassed: {
            callback: onBottomPassed,
            name: 'onBottomPassed'
          },
          bottomVisible: {
            callback: onBottomVisible,
            name: 'onBottomVisible'
          },
          passing: {
            callback: onPassing,
            name: 'onPassing'
          },
          offScreen: {
            callback: onOffScreen,
            name: 'onOffScreen'
          },
          onScreen: {
            callback: onOnScreen,
            name: 'onOnScreen'
          },
          topPassed: {
            callback: onTopPassed,
            name: 'onTopPassed'
          },
          topVisible: {
            callback: onTopVisible,
            name: 'onTopVisible'
          }
        };
        var reverse = {
          bottomPassed: {
            callback: onBottomPassedReverse,
            name: 'onBottomPassedReverse'
          },
          bottomVisible: {
            callback: onBottomVisibleReverse,
            name: 'onBottomVisibleReverse'
          },
          passing: {
            callback: onPassingReverse,
            name: 'onPassingReverse'
          },
          topPassed: {
            callback: onTopPassedReverse,
            name: 'onTopPassedReverse'
          },
          topVisible: {
            callback: onTopVisibleReverse,
            name: 'onTopVisibleReverse'
          }
        };

        invoke_1(_this.props, 'onUpdate', null, objectSpread({}, _this.props, {
          calculations: _this.calculations
        }));

        _this.fireOnPassed(); // Heads up! Reverse callbacks should be fired first


        forEach_1(reverse, function (data, value) {
          return _this.fire(data, value, true);
        });

        forEach_1(forward, function (data, value) {
          return _this.fire(data, value);
        });

        if (updateOn === 'repaint') _this.handleUpdate();
      });

      return _this;
    }

    createClass(Visibility, [{
      key: "UNSAFE_componentWillReceiveProps",
      // ----------------------------------------
      // Lifecycle
      // ----------------------------------------
      // eslint-disable-next-line camelcase
      value: function UNSAFE_componentWillReceiveProps(_ref2) {
        var continuous = _ref2.continuous,
            once = _ref2.once,
            context = _ref2.context,
            updateOn = _ref2.updateOn;
        var cleanHappened = continuous !== this.props.continuous || once !== this.props.once || updateOn !== this.props.updateOn; // Heads up! We should clean up array of happened callbacks, if values of these props are changed

        if (cleanHappened) this.firedCallbacks = [];

        if (context !== this.props.context || updateOn !== this.props.updateOn) {
          this.unattachHandlers(this.props.context);
          this.attachHandlers(context, updateOn);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;
        if (!isBrowser()) return;
        var _this$props3 = this.props,
            context = _this$props3.context,
            fireOnMount = _this$props3.fireOnMount,
            updateOn = _this$props3.updateOn;
        this.pageYOffset = this.getPageYOffset();
        this.attachHandlers(context, updateOn);
        if (fireOnMount) this.update();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var context = this.props.context;
        this.unattachHandlers(context);
        this.mounted = false;
      }
    }, {
      key: "attachHandlers",
      value: function attachHandlers(context, updateOn) {
        if (updateOn === 'events') {
          if (context) {
            instance.sub('resize', this.handleUpdate, {
              target: context
            });
            instance.sub('scroll', this.handleUpdate, {
              target: context
            });
          }

          return;
        } // Heads up!
        // We will deal with `repaint` there


        this.handleUpdate();
      }
    }, {
      key: "unattachHandlers",
      value: function unattachHandlers(context) {
        if (context) {
          instance.unsub('resize', this.handleUpdate, {
            target: context
          });
          instance.unsub('scroll', this.handleUpdate, {
            target: context
          });
        }

        if (this.frameId) cancelAnimationFrame(this.frameId);
      } // ----------------------------------------
      // Callback handling
      // ----------------------------------------

    }, {
      key: "execute",
      value: function execute(callback, name) {
        var continuous = this.props.continuous;
        if (!callback) return; // Heads up! When `continuous` is true, callback will be fired always

        if (!continuous && includes_1(this.firedCallbacks, name)) return;
        callback(null, objectSpread({}, this.props, {
          calculations: this.calculations
        }));
        this.firedCallbacks.push(name);
      }
    }, {
      key: "fireOnPassed",
      value: function fireOnPassed() {
        var _this2 = this;

        var _this$calculations = this.calculations,
            percentagePassed = _this$calculations.percentagePassed,
            pixelsPassed = _this$calculations.pixelsPassed;
        var onPassed = this.props.onPassed;

        forEach_1(onPassed, function (callback, passed) {
          var pixelsValue = Number(passed);

          if (pixelsValue && pixelsPassed >= pixelsValue) {
            _this2.execute(callback, passed);

            return;
          }

          var matchPercentage = "".concat(passed).match(/^(\d+)%$/);
          if (!matchPercentage) return;
          var percentageValue = Number(matchPercentage[1]) / 100;
          if (percentagePassed >= percentageValue) _this2.execute(callback, passed);
        });
      }
    }, {
      key: "computeCalculations",
      // ----------------------------------------
      // Helpers
      // ----------------------------------------
      value: function computeCalculations() {
        var offset = this.props.offset;

        var _this$ref$current$get = this.ref.current.getBoundingClientRect(),
            bottom = _this$ref$current$get.bottom,
            height = _this$ref$current$get.height,
            top = _this$ref$current$get.top,
            width = _this$ref$current$get.width;

        var _normalizeOffset = normalizeOffset(offset),
            _normalizeOffset2 = slicedToArray(_normalizeOffset, 2),
            topOffset = _normalizeOffset2[0],
            bottomOffset = _normalizeOffset2[1];

        var newOffset = this.getPageYOffset();
        var direction = newOffset > this.pageYOffset ? 'down' : 'up';
        var topPassed = top < topOffset;
        var bottomPassed = bottom < bottomOffset;
        var pixelsPassed = bottomPassed ? 0 : Math.max(top * -1, 0);
        var percentagePassed = pixelsPassed / height;
        var bottomVisible = bottom >= bottomOffset && bottom <= window.innerHeight;
        var topVisible = top >= topOffset && top <= window.innerHeight;
        var fits = topVisible && bottomVisible;
        var passing = topPassed && !bottomPassed;
        var onScreen = (topVisible || topPassed) && !bottomPassed;
        var offScreen = !onScreen;
        return {
          bottomPassed: bottomPassed,
          bottomVisible: bottomVisible,
          direction: direction,
          fits: fits,
          height: height,
          passing: passing,
          percentagePassed: percentagePassed,
          pixelsPassed: pixelsPassed,
          offScreen: offScreen,
          onScreen: onScreen,
          topPassed: topPassed,
          topVisible: topVisible,
          width: width
        };
      }
    }, {
      key: "getPageYOffset",
      value: function getPageYOffset() {
        var context = this.props.context;

        if (context) {
          // Heads up! `window` doesn't have `pageYOffset` property
          return context === window ? window.pageYOffset : context.scrollTop;
        }

        return 0;
      } // ----------------------------------------
      // Render
      // ----------------------------------------

    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;
        var ElementType = getElementType(Visibility, this.props);
        var rest = getUnhandledProps(Visibility, this.props);
        return React__default.createElement(Ref, {
          innerRef: this.ref
        }, React__default.createElement(ElementType, rest, children));
      }
    }]);

    return Visibility;
  }(React.Component);

  defineProperty(Visibility, "defaultProps", {
    context: isBrowser() ? window : null,
    continuous: false,
    offset: [0, 0],
    once: true,
    updateOn: 'events'
  });

  defineProperty(Visibility, "handledProps", ["as", "children", "context", "continuous", "fireOnMount", "offset", "onBottomPassed", "onBottomPassedReverse", "onBottomVisible", "onBottomVisibleReverse", "onOffScreen", "onOnScreen", "onPassed", "onPassing", "onPassingReverse", "onTopPassed", "onTopPassedReverse", "onTopVisible", "onTopVisibleReverse", "onUpdate", "once", "updateOn"]);
  Visibility.propTypes =  {};

  /**
   * A divider sub-component for Breadcrumb component.
   */

  function BreadcrumbDivider(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        icon = props.icon;
    var classes = classnames('divider', className);
    var rest = getUnhandledProps(BreadcrumbDivider, props);
    var ElementType = getElementType(BreadcrumbDivider, props);

    if (!isNil_1(icon)) {
      return Icon.create(icon, {
        defaultProps: objectSpread({}, rest, {
          className: classes
        }),
        autoGenerateKey: false
      });
    }

    if (!isNil_1(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? '/' : children);
  }

  BreadcrumbDivider.handledProps = ["as", "children", "className", "content", "icon"];
  BreadcrumbDivider.propTypes =  {};
  BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, function (icon) {
    return {
      icon: icon
    };
  });

  /**
   * A section sub-component for Breadcrumb component.
   */

  var BreadcrumbSection =
  /*#__PURE__*/
  function (_Component) {
    inherits(BreadcrumbSection, _Component);

    function BreadcrumbSection() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, BreadcrumbSection);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(BreadcrumbSection)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "computeElementType", function () {
        var _this$props = _this.props,
            link = _this$props.link,
            onClick = _this$props.onClick;
        if (link || onClick) return 'a';
      });

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        return invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(BreadcrumbSection, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            active = _this$props2.active,
            children = _this$props2.children,
            className = _this$props2.className,
            content = _this$props2.content,
            href = _this$props2.href;
        var classes = classnames(useKeyOnly(active, 'active'), 'section', className);
        var rest = getUnhandledProps(BreadcrumbSection, this.props);
        var ElementType = getElementType(BreadcrumbSection, this.props, this.computeElementType);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), isNil(children) ? content : children);
      }
    }]);

    return BreadcrumbSection;
  }(React.Component);

  defineProperty(BreadcrumbSection, "handledProps", ["active", "as", "children", "className", "content", "href", "link", "onClick"]);
  BreadcrumbSection.propTypes =  {};
  BreadcrumbSection.create = createShorthandFactory(BreadcrumbSection, function (content) {
    return {
      content: content,
      link: true
    };
  });

  /**
   * A breadcrumb is used to show hierarchy between content.
   */

  function Breadcrumb(props) {
    var children = props.children,
        className = props.className,
        divider = props.divider,
        icon = props.icon,
        sections = props.sections,
        size = props.size;
    var classes = classnames('ui', size, 'breadcrumb', className);
    var rest = getUnhandledProps(Breadcrumb, props);
    var ElementType = getElementType(Breadcrumb, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    var childElements = [];

    each(sections, function (section, index) {
      // section
      var breadcrumbElement = BreadcrumbSection.create(section);
      childElements.push(breadcrumbElement); // divider

      if (index !== sections.length - 1) {
        var key = "".concat(breadcrumbElement.key, "_divider") || JSON.stringify(section);
        childElements.push(BreadcrumbDivider.create({
          content: divider,
          icon: icon,
          key: key
        }));
      }
    });

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), childElements);
  }

  Breadcrumb.handledProps = ["as", "children", "className", "divider", "icon", "sections", "size"];
  Breadcrumb.propTypes =  {};
  Breadcrumb.Divider = BreadcrumbDivider;
  Breadcrumb.Section = BreadcrumbSection;

  /**
   * A field is a form element containing a label and an input.
   * @see Form
   * @see Button
   * @see Checkbox
   * @see Dropdown
   * @see Input
   * @see Radio
   * @see Select
   * @see Visibility
   */

  function FormField(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        control = props.control,
        disabled = props.disabled,
        error = props.error,
        inline = props.inline,
        label = props.label,
        required = props.required,
        type = props.type,
        width = props.width,
        id = props.id;
    var classes = classnames(useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(inline, 'inline'), useKeyOnly(required, 'required'), useWidthProp(width, 'wide'), 'field', className);
    var rest = getUnhandledProps(FormField, props);
    var ElementType = getElementType(FormField, props);

    var errorPointing = get_1(error, 'pointing', 'above');

    var errorLabel = Label.create(error, {
      autoGenerateKey: false,
      defaultProps: {
        prompt: true,
        pointing: errorPointing,
        id: id ? "".concat(id, "-error-message") : undefined,
        role: 'alert',
        'aria-atomic': true
      }
    });
    var errorLabelBefore = (errorPointing === 'below' || errorPointing === 'right') && errorLabel;
    var errorLabelAfter = (errorPointing === 'above' || errorPointing === 'left') && errorLabel; // ----------------------------------------
    // No Control
    // ----------------------------------------

    if (isNil_1(control)) {
      if (isNil_1(label)) {
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), isNil(children) ? content : children);
      }

      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), errorLabelBefore, createHTMLLabel(label, {
        autoGenerateKey: false
      }), errorLabelAfter);
    } // ----------------------------------------
    // Checkbox/Radio Control
    // ----------------------------------------


    var ariaDescribedBy = id && error ? "".concat(id, "-error-message") : null;
    var ariaAttrs = {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': error !== undefined ? true : undefined
    };

    var controlProps = objectSpread({}, rest, {
      content: content,
      children: children,
      disabled: disabled,
      required: required,
      type: type,
      id: id // wrap HTML checkboxes/radios in the label

    });

    if (control === 'input' && (type === 'checkbox' || type === 'radio')) {
      return React__default.createElement(ElementType, {
        className: classes
      }, React__default.createElement("label", null, errorLabelBefore, React.createElement(control, objectSpread({}, ariaAttrs, controlProps)), " ", label, errorLabelAfter));
    } // pass label prop to controls that support it


    if (control === Checkbox || control === Radio) {
      return React__default.createElement(ElementType, {
        className: classes
      }, errorLabelBefore, React.createElement(control, objectSpread({}, ariaAttrs, controlProps, {
        label: label
      })), errorLabelAfter);
    } // ----------------------------------------
    // Other Control
    // ----------------------------------------


    return React__default.createElement(ElementType, {
      className: classes
    }, createHTMLLabel(label, {
      defaultProps: {
        htmlFor: id
      },
      autoGenerateKey: false
    }), errorLabelBefore, React.createElement(control, objectSpread({}, ariaAttrs, controlProps)), errorLabelAfter);
  }

  FormField.handledProps = ["as", "children", "className", "content", "control", "disabled", "error", "id", "inline", "label", "required", "type", "width"];
  FormField.propTypes =  {};

  /**
   * Sugar for <Form.Field control={Button} />.
   * @see Button
   * @see Form
   */

  function FormButton(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormButton, props);
    var ElementType = getElementType(FormButton, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormButton.handledProps = ["as", "control"];
  FormButton.propTypes =  {};
  FormButton.defaultProps = {
    as: FormField,
    control: Button
  };

  /**
   * Sugar for <Form.Field control={Checkbox} />.
   * @see Checkbox
   * @see Form
   */

  function FormCheckbox(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormCheckbox, props);
    var ElementType = getElementType(FormCheckbox, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormCheckbox.handledProps = ["as", "control"];
  FormCheckbox.propTypes =  {};
  FormCheckbox.defaultProps = {
    as: FormField,
    control: Checkbox
  };

  /**
   * Sugar for <Form.Field control={Dropdown} />.
   * @see Dropdown
   * @see Form
   */

  function FormDropdown(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormDropdown, props);
    var ElementType = getElementType(FormDropdown, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormDropdown.handledProps = ["as", "control"];
  FormDropdown.propTypes =  {};
  FormDropdown.defaultProps = {
    as: FormField,
    control: Dropdown
  };

  /**
   * A set of fields can appear grouped together.
   * @see Form
   */

  function FormGroup(props) {
    var children = props.children,
        className = props.className,
        grouped = props.grouped,
        inline = props.inline,
        unstackable = props.unstackable,
        widths = props.widths;
    var classes = classnames(useKeyOnly(grouped, 'grouped'), useKeyOnly(inline, 'inline'), useKeyOnly(unstackable, 'unstackable'), useWidthProp(widths, null, true), 'fields', className);
    var rest = getUnhandledProps(FormGroup, props);
    var ElementType = getElementType(FormGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), children);
  }

  FormGroup.handledProps = ["as", "children", "className", "grouped", "inline", "unstackable", "widths"];
  FormGroup.propTypes =  {};

  /**
   * An Input is a field used to elicit a response from a user.
   * @see Button
   * @see Form
   * @see Icon
   * @see Label
   */

  var Input =
  /*#__PURE__*/
  function (_Component) {
    inherits(Input, _Component);

    function Input() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Input);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Input)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "inputRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "computeIcon", function () {
        var _this$props = _this.props,
            loading = _this$props.loading,
            icon = _this$props.icon;
        if (!isNil_1(icon)) return icon;
        if (loading) return 'spinner';
      });

      defineProperty(assertThisInitialized(_this), "computeTabIndex", function () {
        var _this$props2 = _this.props,
            disabled = _this$props2.disabled,
            tabIndex = _this$props2.tabIndex;
        if (!isNil_1(tabIndex)) return tabIndex;
        if (disabled) return -1;
      });

      defineProperty(assertThisInitialized(_this), "focus", function () {
        return _this.inputRef.current.focus();
      });

      defineProperty(assertThisInitialized(_this), "select", function () {
        return _this.inputRef.current.select();
      });

      defineProperty(assertThisInitialized(_this), "handleChange", function (e) {
        var value = get_1(e, 'target.value');

        invoke_1(_this.props, 'onChange', e, objectSpread({}, _this.props, {
          value: value
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleChildOverrides", function (child, defaultProps) {
        return objectSpread({}, defaultProps, child.props, {
          ref: function ref(c) {
            handleRef(child.ref, c);
            _this.inputRef.current = c;
          }
        });
      });

      defineProperty(assertThisInitialized(_this), "partitionProps", function () {
        var _this$props3 = _this.props,
            disabled = _this$props3.disabled,
            type = _this$props3.type;

        var tabIndex = _this.computeTabIndex();

        var unhandled = getUnhandledProps(Input, _this.props);

        var _partitionHTMLProps = partitionHTMLProps(unhandled),
            _partitionHTMLProps2 = slicedToArray(_partitionHTMLProps, 2),
            htmlInputProps = _partitionHTMLProps2[0],
            rest = _partitionHTMLProps2[1];

        return [objectSpread({}, htmlInputProps, {
          disabled: disabled,
          type: type,
          tabIndex: tabIndex,
          onChange: _this.handleChange,
          ref: _this.inputRef
        }), rest];
      });

      return _this;
    }

    createClass(Input, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props4 = this.props,
            action = _this$props4.action,
            actionPosition = _this$props4.actionPosition,
            children = _this$props4.children,
            className = _this$props4.className,
            disabled = _this$props4.disabled,
            error = _this$props4.error,
            fluid = _this$props4.fluid,
            focus = _this$props4.focus,
            icon = _this$props4.icon,
            iconPosition = _this$props4.iconPosition,
            input = _this$props4.input,
            inverted = _this$props4.inverted,
            label = _this$props4.label,
            labelPosition = _this$props4.labelPosition,
            loading = _this$props4.loading,
            size = _this$props4.size,
            transparent = _this$props4.transparent,
            type = _this$props4.type;
        var classes = classnames('ui', size, useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(fluid, 'fluid'), useKeyOnly(focus, 'focus'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(transparent, 'transparent'), useValueAndKey(actionPosition, 'action') || useKeyOnly(action, 'action'), useValueAndKey(iconPosition, 'icon') || useKeyOnly(icon || loading, 'icon'), useValueAndKey(labelPosition, 'labeled') || useKeyOnly(label, 'labeled'), 'input', className);
        var ElementType = getElementType(Input, this.props);

        var _this$partitionProps = this.partitionProps(),
            _this$partitionProps2 = slicedToArray(_this$partitionProps, 2),
            htmlInputProps = _this$partitionProps2[0],
            rest = _this$partitionProps2[1]; // Render with children
        // ----------------------------------------


        if (!isNil(children)) {
          // add htmlInputProps to the `<input />` child
          var childElements = map_1(React.Children.toArray(children), function (child) {
            if (child.type !== 'input') return child;
            return React.cloneElement(child, _this2.handleChildOverrides(child, htmlInputProps));
          });

          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes
          }), childElements);
        } // Render Shorthand
        // ----------------------------------------


        var actionElement = Button.create(action, {
          autoGenerateKey: false
        });
        var labelElement = Label.create(label, {
          defaultProps: {
            className: classnames('label', // add 'left|right corner'
            includes_1(labelPosition, 'corner') && labelPosition)
          },
          autoGenerateKey: false
        });
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), actionPosition === 'left' && actionElement, labelPosition !== 'right' && labelElement, createHTMLInput(input || type, {
          defaultProps: htmlInputProps,
          autoGenerateKey: false
        }), Icon.create(this.computeIcon(), {
          autoGenerateKey: false
        }), actionPosition !== 'left' && actionElement, labelPosition === 'right' && labelElement);
      }
    }]);

    return Input;
  }(React.Component);

  defineProperty(Input, "defaultProps", {
    type: 'text'
  });

  defineProperty(Input, "handledProps", ["action", "actionPosition", "as", "children", "className", "disabled", "error", "fluid", "focus", "icon", "iconPosition", "input", "inverted", "label", "labelPosition", "loading", "onChange", "size", "tabIndex", "transparent", "type"]);

  Input.propTypes =  {};
  Input.create = createShorthandFactory(Input, function (type) {
    return {
      type: type
    };
  });

  /**
   * Sugar for <Form.Field control={Input} />.
   * @see Form
   * @see Input
   */

  function FormInput(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormInput, props);
    var ElementType = getElementType(FormInput, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormInput.handledProps = ["as", "control"];
  FormInput.propTypes =  {};
  FormInput.defaultProps = {
    as: FormField,
    control: Input
  };

  /**
   * Sugar for <Form.Field control={Radio} />.
   * @see Form
   * @see Radio
   */

  function FormRadio(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormRadio, props);
    var ElementType = getElementType(FormRadio, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormRadio.handledProps = ["as", "control"];
  FormRadio.propTypes =  {};
  FormRadio.defaultProps = {
    as: FormField,
    control: Radio
  };

  /**
   * Sugar for <Form.Field control={Select} />.
   * @see Form
   * @see Select
   */

  function FormSelect(props) {
    var control = props.control,
        options = props.options;
    var rest = getUnhandledProps(FormSelect, props);
    var ElementType = getElementType(FormSelect, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control,
      options: options
    }));
  }

  FormSelect.handledProps = ["as", "control", "options"];
  FormSelect.propTypes =  {};
  FormSelect.defaultProps = {
    as: FormField,
    control: Select
  };

  /**
   * Sugar for <Form.Field control={TextArea} />.
   * @see Form
   * @see TextArea
   */

  function FormTextArea(props) {
    var control = props.control;
    var rest = getUnhandledProps(FormTextArea, props);
    var ElementType = getElementType(FormTextArea, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      control: control
    }));
  }

  FormTextArea.handledProps = ["as", "control"];
  FormTextArea.propTypes =  {};
  FormTextArea.defaultProps = {
    as: FormField,
    control: TextArea
  };

  /**
   * A Form displays a set of related user input fields in a structured way.
   * @see Button
   * @see Checkbox
   * @see Dropdown
   * @see Input
   * @see Message
   * @see Radio
   * @see Select
   * @see Visibility
   */

  var Form =
  /*#__PURE__*/
  function (_Component) {
    inherits(Form, _Component);

    function Form() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Form);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      defineProperty(assertThisInitialized(_this), "handleSubmit", function (e) {
        var action = _this.props.action; // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
        // method.

        if (typeof action !== 'string') invoke_1(e, 'preventDefault');

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        invoke_1.apply(void 0, [_this.props, 'onSubmit', e, _this.props].concat(args));
      });

      return _this;
    }

    createClass(Form, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            action = _this$props.action,
            children = _this$props.children,
            className = _this$props.className,
            error = _this$props.error,
            inverted = _this$props.inverted,
            loading = _this$props.loading,
            reply = _this$props.reply,
            size = _this$props.size,
            success = _this$props.success,
            unstackable = _this$props.unstackable,
            warning = _this$props.warning,
            widths = _this$props.widths;
        var classes = classnames('ui', size, useKeyOnly(error, 'error'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(reply, 'reply'), useKeyOnly(success, 'success'), useKeyOnly(unstackable, 'unstackable'), useKeyOnly(warning, 'warning'), useWidthProp(widths, null, true), 'form', className);
        var rest = getUnhandledProps(Form, this.props);
        var ElementType = getElementType(Form, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          action: action,
          className: classes,
          onSubmit: this.handleSubmit
        }), children);
      }
    }]);

    return Form;
  }(React.Component);

  defineProperty(Form, "defaultProps", {
    as: 'form'
  });

  defineProperty(Form, "Field", FormField);

  defineProperty(Form, "Button", FormButton);

  defineProperty(Form, "Checkbox", FormCheckbox);

  defineProperty(Form, "Dropdown", FormDropdown);

  defineProperty(Form, "Group", FormGroup);

  defineProperty(Form, "Input", FormInput);

  defineProperty(Form, "Radio", FormRadio);

  defineProperty(Form, "Select", FormSelect);

  defineProperty(Form, "TextArea", FormTextArea);

  defineProperty(Form, "handledProps", ["action", "as", "children", "className", "error", "inverted", "loading", "onSubmit", "reply", "size", "success", "unstackable", "warning", "widths"]);

  Form.propTypes =  {};

  /**
   * A column sub-component for Grid.
   */

  function GridColumn(props) {
    var children = props.children,
        className = props.className,
        computer = props.computer,
        color = props.color,
        floated = props.floated,
        largeScreen = props.largeScreen,
        mobile = props.mobile,
        only = props.only,
        stretched = props.stretched,
        tablet = props.tablet,
        textAlign = props.textAlign,
        verticalAlign = props.verticalAlign,
        widescreen = props.widescreen,
        width = props.width;
    var classes = classnames(color, useKeyOnly(stretched, 'stretched'), useMultipleProp(only, 'only'), useTextAlignProp(textAlign), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), useWidthProp(computer, 'wide computer'), useWidthProp(largeScreen, 'wide large screen'), useWidthProp(mobile, 'wide mobile'), useWidthProp(tablet, 'wide tablet'), useWidthProp(widescreen, 'wide widescreen'), useWidthProp(width, 'wide'), 'column', className);
    var rest = getUnhandledProps(GridColumn, props);
    var ElementType = getElementType(GridColumn, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), children);
  }

  GridColumn.handledProps = ["as", "children", "className", "color", "computer", "floated", "largeScreen", "mobile", "only", "stretched", "tablet", "textAlign", "verticalAlign", "widescreen", "width"];
  GridColumn.propTypes =  {};
  GridColumn.create = createShorthandFactory(GridColumn, function (children) {
    return {
      children: children
    };
  });

  /**
   * A row sub-component for Grid.
   */

  function GridRow(props) {
    var centered = props.centered,
        children = props.children,
        className = props.className,
        color = props.color,
        columns = props.columns,
        divided = props.divided,
        only = props.only,
        reversed = props.reversed,
        stretched = props.stretched,
        textAlign = props.textAlign,
        verticalAlign = props.verticalAlign;
    var classes = classnames(color, useKeyOnly(centered, 'centered'), useKeyOnly(divided, 'divided'), useKeyOnly(stretched, 'stretched'), useMultipleProp(only, 'only'), useMultipleProp(reversed, 'reversed'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), useWidthProp(columns, 'column', true), 'row', className);
    var rest = getUnhandledProps(GridRow, props);
    var ElementType = getElementType(GridRow, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), children);
  }

  GridRow.handledProps = ["as", "centered", "children", "className", "color", "columns", "divided", "only", "reversed", "stretched", "textAlign", "verticalAlign"];
  GridRow.propTypes =  {};

  /**
   * A grid is used to harmonize negative space in a layout.
   */

  function Grid(props) {
    var celled = props.celled,
        centered = props.centered,
        children = props.children,
        className = props.className,
        columns = props.columns,
        container = props.container,
        divided = props.divided,
        doubling = props.doubling,
        inverted = props.inverted,
        padded = props.padded,
        relaxed = props.relaxed,
        reversed = props.reversed,
        stackable = props.stackable,
        stretched = props.stretched,
        textAlign = props.textAlign,
        verticalAlign = props.verticalAlign;
    var classes = classnames('ui', useKeyOnly(centered, 'centered'), useKeyOnly(container, 'container'), useKeyOnly(doubling, 'doubling'), useKeyOnly(inverted, 'inverted'), useKeyOnly(stackable, 'stackable'), useKeyOnly(stretched, 'stretched'), useKeyOrValueAndKey(celled, 'celled'), useKeyOrValueAndKey(divided, 'divided'), useKeyOrValueAndKey(padded, 'padded'), useKeyOrValueAndKey(relaxed, 'relaxed'), useMultipleProp(reversed, 'reversed'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), useWidthProp(columns, 'column', true), 'grid', className);
    var rest = getUnhandledProps(Grid, props);
    var ElementType = getElementType(Grid, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), children);
  }

  Grid.handledProps = ["as", "celled", "centered", "children", "className", "columns", "container", "divided", "doubling", "inverted", "padded", "relaxed", "reversed", "stackable", "stretched", "textAlign", "verticalAlign"];
  Grid.Column = GridColumn;
  Grid.Row = GridRow;
  Grid.propTypes =  {};

  /**
   * A message can contain a content.
   */

  function MessageContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(MessageContent, props);
    var ElementType = getElementType(MessageContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  MessageContent.handledProps = ["as", "children", "className", "content"];
  MessageContent.propTypes =  {};

  /**
   * A message can contain a header.
   */

  function MessageHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(MessageHeader, props);
    var ElementType = getElementType(MessageHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  MessageHeader.handledProps = ["as", "children", "className", "content"];
  MessageHeader.propTypes =  {};
  MessageHeader.create = createShorthandFactory(MessageHeader, function (val) {
    return {
      content: val
    };
  });

  /**
   * A message list can contain an item.
   */

  function MessageItem(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(MessageItem, props);
    var ElementType = getElementType(MessageItem, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  MessageItem.handledProps = ["as", "children", "className", "content"];
  MessageItem.propTypes =  {};
  MessageItem.defaultProps = {
    as: 'li'
  };
  MessageItem.create = createShorthandFactory(MessageItem, function (content) {
    return {
      content: content
    };
  });

  /**
   * A message can contain a list of items.
   */

  function MessageList(props) {
    var children = props.children,
        className = props.className,
        items = props.items;
    var classes = classnames('list', className);
    var rest = getUnhandledProps(MessageList, props);
    var ElementType = getElementType(MessageList, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? map_1(items, MessageItem.create) : children);
  }

  MessageList.handledProps = ["as", "children", "className", "items"];
  MessageList.propTypes =  {};
  MessageList.defaultProps = {
    as: 'ul'
  };
  MessageList.create = createShorthandFactory(MessageList, function (val) {
    return {
      items: val
    };
  });

  /**
   * A message displays information that explains nearby content.
   * @see Form
   */

  var Message =
  /*#__PURE__*/
  function (_Component) {
    inherits(Message, _Component);

    function Message() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Message);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Message)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleDismiss", function (e) {
        var onDismiss = _this.props.onDismiss;
        if (onDismiss) onDismiss(e, _this.props);
      });

      return _this;
    }

    createClass(Message, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            attached = _this$props.attached,
            children = _this$props.children,
            className = _this$props.className,
            color = _this$props.color,
            compact = _this$props.compact,
            content = _this$props.content,
            error = _this$props.error,
            floating = _this$props.floating,
            header = _this$props.header,
            hidden = _this$props.hidden,
            icon = _this$props.icon,
            info = _this$props.info,
            list = _this$props.list,
            negative = _this$props.negative,
            onDismiss = _this$props.onDismiss,
            positive = _this$props.positive,
            size = _this$props.size,
            success = _this$props.success,
            visible = _this$props.visible,
            warning = _this$props.warning;
        var classes = classnames('ui', color, size, useKeyOnly(compact, 'compact'), useKeyOnly(error, 'error'), useKeyOnly(floating, 'floating'), useKeyOnly(hidden, 'hidden'), useKeyOnly(icon, 'icon'), useKeyOnly(info, 'info'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(success, 'success'), useKeyOnly(visible, 'visible'), useKeyOnly(warning, 'warning'), useKeyOrValueAndKey(attached, 'attached'), 'message', className);
        var dismissIcon = onDismiss && React__default.createElement(Icon, {
          name: "close",
          onClick: this.handleDismiss
        });
        var rest = getUnhandledProps(Message, this.props);
        var ElementType = getElementType(Message, this.props);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes
          }), dismissIcon, children);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), dismissIcon, Icon.create(icon, {
          autoGenerateKey: false
        }), (!isNil_1(header) || !isNil_1(content) || !isNil_1(list)) && React__default.createElement(MessageContent, null, MessageHeader.create(header, {
          autoGenerateKey: false
        }), MessageList.create(list, {
          autoGenerateKey: false
        }), createHTMLParagraph(content, {
          autoGenerateKey: false
        })));
      }
    }]);

    return Message;
  }(React.Component);

  defineProperty(Message, "Content", MessageContent);

  defineProperty(Message, "Header", MessageHeader);

  defineProperty(Message, "List", MessageList);

  defineProperty(Message, "Item", MessageItem);

  defineProperty(Message, "handledProps", ["as", "attached", "children", "className", "color", "compact", "content", "error", "floating", "header", "hidden", "icon", "info", "list", "negative", "onDismiss", "positive", "size", "success", "visible", "warning"]);
  Message.propTypes =  {};

  function TableBody(props) {
    var children = props.children,
        className = props.className;
    var classes = classnames(className);
    var rest = getUnhandledProps(TableBody, props);
    var ElementType = getElementType(TableBody, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), children);
  }

  TableBody.handledProps = ["as", "children", "className"];
  TableBody.defaultProps = {
    as: 'tbody'
  };
  TableBody.propTypes =  {};

  /**
   * A table row can have cells.
   */

  function TableCell(props) {
    var active = props.active,
        children = props.children,
        className = props.className,
        collapsing = props.collapsing,
        content = props.content,
        disabled = props.disabled,
        error = props.error,
        icon = props.icon,
        negative = props.negative,
        positive = props.positive,
        selectable = props.selectable,
        singleLine = props.singleLine,
        textAlign = props.textAlign,
        verticalAlign = props.verticalAlign,
        warning = props.warning,
        width = props.width;
    var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(collapsing, 'collapsing'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(selectable, 'selectable'), useKeyOnly(singleLine, 'single line'), useKeyOnly(warning, 'warning'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), useWidthProp(width, 'wide'), className);
    var rest = getUnhandledProps(TableCell, props);
    var ElementType = getElementType(TableCell, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), Icon.create(icon), content);
  }

  TableCell.handledProps = ["active", "as", "children", "className", "collapsing", "content", "disabled", "error", "icon", "negative", "positive", "selectable", "singleLine", "textAlign", "verticalAlign", "warning", "width"];
  TableCell.defaultProps = {
    as: 'td'
  };
  TableCell.propTypes =  {};
  TableCell.create = createShorthandFactory(TableCell, function (content) {
    return {
      content: content
    };
  });

  /**
   * A table can have a header.
   */

  function TableHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        fullWidth = props.fullWidth;
    var classes = classnames(useKeyOnly(fullWidth, 'full-width'), className);
    var rest = getUnhandledProps(TableHeader, props);
    var ElementType = getElementType(TableHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  TableHeader.handledProps = ["as", "children", "className", "content", "fullWidth"];
  TableHeader.defaultProps = {
    as: 'thead'
  };
  TableHeader.propTypes =  {};

  /**
   * A table can have a footer.
   */

  function TableFooter(props) {
    var as = props.as;
    var rest = getUnhandledProps(TableFooter, props);
    return React__default.createElement(TableHeader, _extends_1({}, rest, {
      as: as
    }));
  }

  TableFooter.handledProps = ["as"];
  TableFooter.propTypes =  {};
  TableFooter.defaultProps = {
    as: 'tfoot'
  };

  /**
   * A table can have a header cell.
   */

  function TableHeaderCell(props) {
    var as = props.as,
        className = props.className,
        sorted = props.sorted;
    var classes = classnames(useValueAndKey(sorted, 'sorted'), className);
    var rest = getUnhandledProps(TableHeaderCell, props);
    return React__default.createElement(TableCell, _extends_1({}, rest, {
      as: as,
      className: classes
    }));
  }

  TableHeaderCell.handledProps = ["as", "className", "sorted"];
  TableHeaderCell.propTypes =  {};
  TableHeaderCell.defaultProps = {
    as: 'th'
  };

  /**
   * A table can have rows.
   */

  function TableRow(props) {
    var active = props.active,
        cellAs = props.cellAs,
        cells = props.cells,
        children = props.children,
        className = props.className,
        disabled = props.disabled,
        error = props.error,
        negative = props.negative,
        positive = props.positive,
        textAlign = props.textAlign,
        verticalAlign = props.verticalAlign,
        warning = props.warning;
    var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(warning, 'warning'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), className);
    var rest = getUnhandledProps(TableRow, props);
    var ElementType = getElementType(TableRow, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), map_1(cells, function (cell) {
      return TableCell.create(cell, {
        defaultProps: {
          as: cellAs
        }
      });
    }));
  }

  TableRow.handledProps = ["active", "as", "cellAs", "cells", "children", "className", "disabled", "error", "negative", "positive", "textAlign", "verticalAlign", "warning"];
  TableRow.defaultProps = {
    as: 'tr',
    cellAs: 'td'
  };
  TableRow.propTypes =  {};
  TableRow.create = createShorthandFactory(TableRow, function (cells) {
    return {
      cells: cells
    };
  });

  /**
   * A table displays a collections of data grouped into rows.
   */

  function Table(props) {
    var attached = props.attached,
        basic = props.basic,
        celled = props.celled,
        children = props.children,
        className = props.className,
        collapsing = props.collapsing,
        color = props.color,
        columns = props.columns,
        compact = props.compact,
        definition = props.definition,
        fixed = props.fixed,
        footerRow = props.footerRow,
        headerRow = props.headerRow,
        headerRows = props.headerRows,
        inverted = props.inverted,
        padded = props.padded,
        renderBodyRow = props.renderBodyRow,
        selectable = props.selectable,
        singleLine = props.singleLine,
        size = props.size,
        sortable = props.sortable,
        stackable = props.stackable,
        striped = props.striped,
        structured = props.structured,
        tableData = props.tableData,
        textAlign = props.textAlign,
        unstackable = props.unstackable,
        verticalAlign = props.verticalAlign;
    var classes = classnames('ui', color, size, useKeyOnly(celled, 'celled'), useKeyOnly(collapsing, 'collapsing'), useKeyOnly(definition, 'definition'), useKeyOnly(fixed, 'fixed'), useKeyOnly(inverted, 'inverted'), useKeyOnly(selectable, 'selectable'), useKeyOnly(singleLine, 'single line'), useKeyOnly(sortable, 'sortable'), useKeyOnly(stackable, 'stackable'), useKeyOnly(striped, 'striped'), useKeyOnly(structured, 'structured'), useKeyOnly(unstackable, 'unstackable'), useKeyOrValueAndKey(attached, 'attached'), useKeyOrValueAndKey(basic, 'basic'), useKeyOrValueAndKey(compact, 'compact'), useKeyOrValueAndKey(padded, 'padded'), useTextAlignProp(textAlign), useVerticalAlignProp(verticalAlign), useWidthProp(columns, 'column'), 'table', className);
    var rest = getUnhandledProps(Table, props);
    var ElementType = getElementType(Table, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    var hasHeaderRows = headerRow || headerRows;
    var headerShorthandOptions = {
      defaultProps: {
        cellAs: 'th'
      }
    };
    var headerElement = hasHeaderRows && React__default.createElement(TableHeader, null, TableRow.create(headerRow, headerShorthandOptions), map_1(headerRows, function (data) {
      return TableRow.create(data, headerShorthandOptions);
    }));
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), headerElement, React__default.createElement(TableBody, null, renderBodyRow && map_1(tableData, function (data, index) {
      return TableRow.create(renderBodyRow(data, index));
    })), footerRow && React__default.createElement(TableFooter, null, TableRow.create(footerRow)));
  }

  Table.handledProps = ["as", "attached", "basic", "celled", "children", "className", "collapsing", "color", "columns", "compact", "definition", "fixed", "footerRow", "headerRow", "headerRows", "inverted", "padded", "renderBodyRow", "selectable", "singleLine", "size", "sortable", "stackable", "striped", "structured", "tableData", "textAlign", "unstackable", "verticalAlign"];
  Table.defaultProps = {
    as: 'table'
  };
  Table.propTypes =  {};
  Table.Body = TableBody;
  Table.Cell = TableCell;
  Table.Footer = TableFooter;
  Table.Header = TableHeader;
  Table.HeaderCell = TableHeaderCell;
  Table.Row = TableRow;

  /**
   * A container limits content to a maximum width.
   */

  function Container(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        fluid = props.fluid,
        text = props.text,
        textAlign = props.textAlign;
    var classes = classnames('ui', useKeyOnly(text, 'text'), useKeyOnly(fluid, 'fluid'), useTextAlignProp(textAlign), 'container', className);
    var rest = getUnhandledProps(Container, props);
    var ElementType = getElementType(Container, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Container.handledProps = ["as", "children", "className", "content", "fluid", "text", "textAlign"];
  Container.propTypes =  {};

  /**
   * A divider visually segments content into groups.
   */

  function Divider(props) {
    var children = props.children,
        className = props.className,
        clearing = props.clearing,
        content = props.content,
        fitted = props.fitted,
        hidden = props.hidden,
        horizontal = props.horizontal,
        inverted = props.inverted,
        section = props.section,
        vertical = props.vertical;
    var classes = classnames('ui', useKeyOnly(clearing, 'clearing'), useKeyOnly(fitted, 'fitted'), useKeyOnly(hidden, 'hidden'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useKeyOnly(section, 'section'), useKeyOnly(vertical, 'vertical'), 'divider', className);
    var rest = getUnhandledProps(Divider, props);
    var ElementType = getElementType(Divider, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Divider.handledProps = ["as", "children", "className", "clearing", "content", "fitted", "hidden", "horizontal", "inverted", "section", "vertical"];
  Divider.propTypes =  {};

  /**
   * Headers may contain subheaders.
   */

  function HeaderSubheader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('sub header', className);
    var rest = getUnhandledProps(HeaderSubheader, props);
    var ElementType = getElementType(HeaderSubheader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  HeaderSubheader.handledProps = ["as", "children", "className", "content"];
  HeaderSubheader.propTypes =  {};
  HeaderSubheader.create = createShorthandFactory(HeaderSubheader, function (content) {
    return {
      content: content
    };
  });

  /**
   * Header content wraps the main content when there is an adjacent Icon or Image.
   */

  function HeaderContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(HeaderContent, props);
    var ElementType = getElementType(HeaderContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  HeaderContent.handledProps = ["as", "children", "className", "content"];
  HeaderContent.propTypes =  {};

  /**
   * A header provides a short summary of content
   */

  function Header(props) {
    var attached = props.attached,
        block = props.block,
        children = props.children,
        className = props.className,
        color = props.color,
        content = props.content,
        disabled = props.disabled,
        dividing = props.dividing,
        floated = props.floated,
        icon = props.icon,
        image = props.image,
        inverted = props.inverted,
        size = props.size,
        sub = props.sub,
        subheader = props.subheader,
        textAlign = props.textAlign;
    var classes = classnames('ui', color, size, useKeyOnly(block, 'block'), useKeyOnly(disabled, 'disabled'), useKeyOnly(dividing, 'dividing'), useValueAndKey(floated, 'floated'), useKeyOnly(icon === true, 'icon'), useKeyOnly(image === true, 'image'), useKeyOnly(inverted, 'inverted'), useKeyOnly(sub, 'sub'), useKeyOrValueAndKey(attached, 'attached'), useTextAlignProp(textAlign), 'header', className);
    var rest = getUnhandledProps(Header, props);
    var ElementType = getElementType(Header, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    var iconElement = Icon.create(icon, {
      autoGenerateKey: false
    });
    var imageElement = Image.create(image, {
      autoGenerateKey: false
    });
    var subheaderElement = HeaderSubheader.create(subheader, {
      autoGenerateKey: false
    });

    if (iconElement || imageElement) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), iconElement || imageElement, (content || subheaderElement) && React__default.createElement(HeaderContent, null, content, subheaderElement));
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), content, subheaderElement);
  }

  Header.handledProps = ["as", "attached", "block", "children", "className", "color", "content", "disabled", "dividing", "floated", "icon", "image", "inverted", "size", "sub", "subheader", "textAlign"];
  Header.propTypes =  {};
  Header.Content = HeaderContent;
  Header.Subheader = HeaderSubheader;

  /**
   * A list item can contain a description.
   */

  function ListDescription(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames(className, 'description');
    var rest = getUnhandledProps(ListDescription, props);
    var ElementType = getElementType(ListDescription, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ListDescription.handledProps = ["as", "children", "className", "content"];
  ListDescription.propTypes =  {};
  ListDescription.create = createShorthandFactory(ListDescription, function (content) {
    return {
      content: content
    };
  });

  /**
   * A list item can contain a header.
   */

  function ListHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(ListHeader, props);
    var ElementType = getElementType(ListHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ListHeader.handledProps = ["as", "children", "className", "content"];
  ListHeader.propTypes =  {};
  ListHeader.create = createShorthandFactory(ListHeader, function (content) {
    return {
      content: content
    };
  });

  /**
   * A list item can contain a content.
   */

  function ListContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        description = props.description,
        floated = props.floated,
        header = props.header,
        verticalAlign = props.verticalAlign;
    var classes = classnames(useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), 'content', className);
    var rest = getUnhandledProps(ListContent, props);
    var ElementType = getElementType(ListContent, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), ListHeader.create(header), ListDescription.create(description), content);
  }

  ListContent.handledProps = ["as", "children", "className", "content", "description", "floated", "header", "verticalAlign"];
  ListContent.propTypes =  {};
  ListContent.create = createShorthandFactory(ListContent, function (content) {
    return {
      content: content
    };
  });

  /**
   * A list item can contain an icon.
   */

  function ListIcon(props) {
    var className = props.className,
        verticalAlign = props.verticalAlign;
    var classes = classnames(useVerticalAlignProp(verticalAlign), className);
    var rest = getUnhandledProps(ListIcon, props);
    return React__default.createElement(Icon, _extends_1({}, rest, {
      className: classes
    }));
  }

  ListIcon.handledProps = ["className", "verticalAlign"];
  ListIcon.propTypes =  {};
  ListIcon.create = createShorthandFactory(ListIcon, function (name) {
    return {
      name: name
    };
  });

  /**
   * A list item can contain a set of items.
   */

  var ListItem =
  /*#__PURE__*/
  function (_Component) {
    inherits(ListItem, _Component);

    function ListItem() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, ListItem);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(ListItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var disabled = _this.props.disabled;
        if (!disabled) invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(ListItem, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content,
            description = _this$props.description,
            disabled = _this$props.disabled,
            header = _this$props.header,
            icon = _this$props.icon,
            image = _this$props.image,
            value = _this$props.value;
        var ElementType = getElementType(ListItem, this.props);
        var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(ElementType !== 'li', 'item'), className);
        var rest = getUnhandledProps(ListItem, this.props);
        var valueProp = ElementType === 'li' ? {
          value: value
        } : {
          'data-value': value
        };

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, valueProp, {
            role: "listitem",
            className: classes,
            onClick: this.handleClick
          }, rest), children);
        }

        var iconElement = ListIcon.create(icon, {
          autoGenerateKey: false
        });
        var imageElement = Image.create(image, {
          autoGenerateKey: false
        }); // See description of `content` prop for explanation about why this is necessary.

        if (!React.isValidElement(content) && isPlainObject_1(content)) {
          return React__default.createElement(ElementType, _extends_1({}, valueProp, {
            role: "listitem",
            className: classes,
            onClick: this.handleClick
          }, rest), iconElement || imageElement, ListContent.create(content, {
            autoGenerateKey: false,
            defaultProps: {
              header: header,
              description: description
            }
          }));
        }

        var headerElement = ListHeader.create(header, {
          autoGenerateKey: false
        });
        var descriptionElement = ListDescription.create(description, {
          autoGenerateKey: false
        });

        if (iconElement || imageElement) {
          return React__default.createElement(ElementType, _extends_1({}, valueProp, {
            role: "listitem",
            className: classes,
            onClick: this.handleClick
          }, rest), iconElement || imageElement, (content || headerElement || descriptionElement) && React__default.createElement(ListContent, null, headerElement, descriptionElement, content));
        }

        return React__default.createElement(ElementType, _extends_1({}, valueProp, {
          role: "listitem",
          className: classes,
          onClick: this.handleClick
        }, rest), headerElement, descriptionElement, content);
      }
    }]);

    return ListItem;
  }(React.Component);

  defineProperty(ListItem, "handledProps", ["active", "as", "children", "className", "content", "description", "disabled", "header", "icon", "image", "onClick", "value"]);

  ListItem.propTypes =  {};
  ListItem.create = createShorthandFactory(ListItem, function (content) {
    return {
      content: content
    };
  });

  /**
   * A list can contain a sub list.
   */

  function ListList(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var rest = getUnhandledProps(ListList, props);
    var ElementType = getElementType(ListList, props);
    var classes = classnames(useKeyOnly(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ListList.handledProps = ["as", "children", "className", "content"];
  ListList.propTypes =  {};

  /**
   * A list groups related content.
   */

  var List =
  /*#__PURE__*/
  function (_Component) {
    inherits(List, _Component);

    function List() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, List);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(List)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleItemOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, itemProps) {
            invoke_1(predefinedProps, 'onClick', e, itemProps);

            invoke_1(_this.props, 'onItemClick', e, itemProps);
          }
        };
      });

      return _this;
    }

    createClass(List, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            animated = _this$props.animated,
            bulleted = _this$props.bulleted,
            celled = _this$props.celled,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content,
            divided = _this$props.divided,
            floated = _this$props.floated,
            horizontal = _this$props.horizontal,
            inverted = _this$props.inverted,
            items = _this$props.items,
            link = _this$props.link,
            ordered = _this$props.ordered,
            relaxed = _this$props.relaxed,
            selection = _this$props.selection,
            size = _this$props.size,
            verticalAlign = _this$props.verticalAlign;
        var classes = classnames('ui', size, useKeyOnly(animated, 'animated'), useKeyOnly(bulleted, 'bulleted'), useKeyOnly(celled, 'celled'), useKeyOnly(divided, 'divided'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useKeyOnly(link, 'link'), useKeyOnly(ordered, 'ordered'), useKeyOnly(selection, 'selection'), useKeyOrValueAndKey(relaxed, 'relaxed'), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), 'list', className);
        var rest = getUnhandledProps(List, this.props);
        var ElementType = getElementType(List, this.props);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({
            role: "list",
            className: classes
          }, rest), children);
        }

        if (!isNil(content)) {
          return React__default.createElement(ElementType, _extends_1({
            role: "list",
            className: classes
          }, rest), content);
        }

        return React__default.createElement(ElementType, _extends_1({
          role: "list",
          className: classes
        }, rest), map_1(items, function (item) {
          return ListItem.create(item, {
            overrideProps: _this2.handleItemOverrides
          });
        }));
      }
    }]);

    return List;
  }(React.Component);

  defineProperty(List, "Content", ListContent);

  defineProperty(List, "Description", ListDescription);

  defineProperty(List, "Header", ListHeader);

  defineProperty(List, "Icon", ListIcon);

  defineProperty(List, "Item", ListItem);

  defineProperty(List, "List", ListList);

  defineProperty(List, "handledProps", ["animated", "as", "bulleted", "celled", "children", "className", "content", "divided", "floated", "horizontal", "inverted", "items", "link", "onItemClick", "ordered", "relaxed", "selection", "size", "verticalAlign"]);

  List.propTypes =  {};

  /**
   * A loader alerts a user to wait for an activity to complete.
   * @see Dimmer
   */

  function Loader(props) {
    var active = props.active,
        children = props.children,
        className = props.className,
        content = props.content,
        disabled = props.disabled,
        indeterminate = props.indeterminate,
        inline = props.inline,
        inverted = props.inverted,
        size = props.size;
    var classes = classnames('ui', size, useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(indeterminate, 'indeterminate'), useKeyOnly(inverted, 'inverted'), useKeyOnly(children || content, 'text'), useKeyOrValueAndKey(inline, 'inline'), 'loader', className);
    var rest = getUnhandledProps(Loader, props);
    var ElementType = getElementType(Loader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Loader.handledProps = ["active", "as", "children", "className", "content", "disabled", "indeterminate", "inline", "inverted", "size"];
  Loader.propTypes =  {};

  /**
   * A placeholder can contain a header.
   */

  function PlaceholderHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        image = props.image;
    var classes = classnames(useKeyOnly(image, 'image'), 'header', className);
    var rest = getUnhandledProps(PlaceholderHeader, props);
    var ElementType = getElementType(PlaceholderHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  PlaceholderHeader.handledProps = ["as", "children", "className", "content", "image"];
  PlaceholderHeader.propTypes =  {};

  /**
   * A placeholder can contain an image.
   */

  function PlaceholderImage(props) {
    var className = props.className,
        square = props.square,
        rectangular = props.rectangular;
    var classes = classnames(useKeyOnly(square, 'square'), useKeyOnly(rectangular, 'rectangular'), 'image', className);
    var rest = getUnhandledProps(PlaceholderImage, props);
    var ElementType = getElementType(PlaceholderImage, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }));
  }

  PlaceholderImage.handledProps = ["as", "className", "rectangular", "square"];
  PlaceholderImage.propTypes =  {};

  /**
   * A placeholder can contain have lines of text.
   */

  function PlaceholderLine(props) {
    var className = props.className,
        length = props.length;
    var classes = classnames('line', length, className);
    var rest = getUnhandledProps(PlaceholderLine, props);
    var ElementType = getElementType(PlaceholderLine, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }));
  }

  PlaceholderLine.handledProps = ["as", "className", "length"];
  PlaceholderLine.propTypes =  {};

  /**
   * A placeholder can contain a paragraph.
   */

  function PlaceholderParagraph(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('paragraph', className);
    var rest = getUnhandledProps(PlaceholderParagraph, props);
    var ElementType = getElementType(PlaceholderParagraph, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  PlaceholderParagraph.handledProps = ["as", "children", "className", "content"];
  PlaceholderParagraph.propTypes =  {};

  /**
   * A placeholder is used to reserve splace for content that soon will appear in a layout.
   */

  function Placeholder(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        fluid = props.fluid,
        inverted = props.inverted;
    var classes = classnames('ui', useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), 'placeholder', className);
    var rest = getUnhandledProps(Placeholder, props);
    var ElementType = getElementType(Placeholder, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Placeholder.handledProps = ["as", "children", "className", "content", "fluid", "inverted"];
  Placeholder.propTypes =  {};
  Placeholder.Header = PlaceholderHeader;
  Placeholder.Image = PlaceholderImage;
  Placeholder.Line = PlaceholderLine;
  Placeholder.Paragraph = PlaceholderParagraph;

  /**
   * A rail is used to show accompanying content outside the boundaries of the main view of a site.
   */

  function Rail(props) {
    var attached = props.attached,
        children = props.children,
        className = props.className,
        close = props.close,
        content = props.content,
        dividing = props.dividing,
        internal = props.internal,
        position = props.position,
        size = props.size;
    var classes = classnames('ui', position, size, useKeyOnly(attached, 'attached'), useKeyOnly(dividing, 'dividing'), useKeyOnly(internal, 'internal'), useKeyOrValueAndKey(close, 'close'), 'rail', className);
    var rest = getUnhandledProps(Rail, props);
    var ElementType = getElementType(Rail, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Rail.handledProps = ["as", "attached", "children", "className", "close", "content", "dividing", "internal", "position", "size"];
  Rail.propTypes =  {};

  /**
   * A content sub-component for the Reveal.
   */

  function RevealContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        hidden = props.hidden,
        visible = props.visible;
    var classes = classnames('ui', useKeyOnly(hidden, 'hidden'), useKeyOnly(visible, 'visible'), 'content', className);
    var rest = getUnhandledProps(RevealContent, props);
    var ElementType = getElementType(RevealContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  RevealContent.handledProps = ["as", "children", "className", "content", "hidden", "visible"];
  RevealContent.propTypes =  {};

  /**
   * A reveal displays additional content in place of previous content when activated.
   */

  function Reveal(props) {
    var active = props.active,
        animated = props.animated,
        children = props.children,
        className = props.className,
        content = props.content,
        disabled = props.disabled,
        instant = props.instant;
    var classes = classnames('ui', animated, useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(instant, 'instant'), 'reveal', className);
    var rest = getUnhandledProps(Reveal, props);
    var ElementType = getElementType(Reveal, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Reveal.handledProps = ["active", "animated", "as", "children", "className", "content", "disabled", "instant"];
  Reveal.propTypes =  {};
  Reveal.Content = RevealContent;

  /**
   * A group of segments can be formatted to appear together.
   */

  function SegmentGroup(props) {
    var children = props.children,
        className = props.className,
        compact = props.compact,
        content = props.content,
        horizontal = props.horizontal,
        piled = props.piled,
        raised = props.raised,
        size = props.size,
        stacked = props.stacked;
    var classes = classnames('ui', size, useKeyOnly(compact, 'compact'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(piled, 'piled'), useKeyOnly(raised, 'raised'), useKeyOnly(stacked, 'stacked'), 'segments', className);
    var rest = getUnhandledProps(SegmentGroup, props);
    var ElementType = getElementType(SegmentGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  SegmentGroup.handledProps = ["as", "children", "className", "compact", "content", "horizontal", "piled", "raised", "size", "stacked"];
  SegmentGroup.propTypes =  {};

  /**
   * A placeholder segment can be inline.
   */

  function SegmentInline(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('inline', className);
    var rest = getUnhandledProps(SegmentInline, props);
    var ElementType = getElementType(SegmentInline, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  SegmentInline.handledProps = ["as", "children", "className", "content"];
  SegmentInline.propTypes =  {};

  /**
   * A segment is used to create a grouping of related content.
   */

  function Segment(props) {
    var attached = props.attached,
        basic = props.basic,
        children = props.children,
        circular = props.circular,
        className = props.className,
        clearing = props.clearing,
        color = props.color,
        compact = props.compact,
        content = props.content,
        disabled = props.disabled,
        floated = props.floated,
        inverted = props.inverted,
        loading = props.loading,
        placeholder = props.placeholder,
        padded = props.padded,
        piled = props.piled,
        raised = props.raised,
        secondary = props.secondary,
        size = props.size,
        stacked = props.stacked,
        tertiary = props.tertiary,
        textAlign = props.textAlign,
        vertical = props.vertical;
    var classes = classnames('ui', color, size, useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(clearing, 'clearing'), useKeyOnly(compact, 'compact'), useKeyOnly(disabled, 'disabled'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(placeholder, 'placeholder'), useKeyOnly(piled, 'piled'), useKeyOnly(raised, 'raised'), useKeyOnly(secondary, 'secondary'), useKeyOnly(stacked, 'stacked'), useKeyOnly(tertiary, 'tertiary'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useKeyOrValueAndKey(padded, 'padded'), useTextAlignProp(textAlign), useValueAndKey(floated, 'floated'), 'segment', className);
    var rest = getUnhandledProps(Segment, props);
    var ElementType = getElementType(Segment, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Segment.handledProps = ["as", "attached", "basic", "children", "circular", "className", "clearing", "color", "compact", "content", "disabled", "floated", "inverted", "loading", "padded", "piled", "placeholder", "raised", "secondary", "size", "stacked", "tertiary", "textAlign", "vertical"];
  Segment.Group = SegmentGroup;
  Segment.Inline = SegmentInline;
  Segment.propTypes =  {};

  function StepDescription(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('description', className);
    var rest = getUnhandledProps(StepDescription, props);
    var ElementType = getElementType(StepDescription, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  StepDescription.handledProps = ["as", "children", "className", "content"];
  StepDescription.propTypes =  {};
  StepDescription.create = createShorthandFactory(StepDescription, function (content) {
    return {
      content: content
    };
  });

  /**
   * A step can contain a title.
   */

  function StepTitle(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('title', className);
    var rest = getUnhandledProps(StepTitle, props);
    var ElementType = getElementType(StepTitle, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  StepTitle.handledProps = ["as", "children", "className", "content"];
  StepTitle.propTypes =  {};
  StepTitle.create = createShorthandFactory(StepTitle, function (content) {
    return {
      content: content
    };
  });

  /**
   * A step can contain a content.
   */

  function StepContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        description = props.description,
        title = props.title;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(StepContent, props);
    var ElementType = getElementType(StepContent, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), StepTitle.create(title, {
      autoGenerateKey: false
    }), StepDescription.create(description, {
      autoGenerateKey: false
    }));
  }

  StepContent.handledProps = ["as", "children", "className", "content", "description", "title"];
  StepContent.propTypes =  {};
  StepContent.create = createShorthandFactory(StepContent, function (content) {
    return {
      content: content
    };
  });

  /**
   * A set of steps.
   */

  function StepGroup(props) {
    var attached = props.attached,
        children = props.children,
        className = props.className,
        content = props.content,
        fluid = props.fluid,
        items = props.items,
        ordered = props.ordered,
        size = props.size,
        stackable = props.stackable,
        unstackable = props.unstackable,
        vertical = props.vertical,
        widths = props.widths;
    var classes = classnames('ui', size, useKeyOnly(fluid, 'fluid'), useKeyOnly(ordered, 'ordered'), useKeyOnly(unstackable, 'unstackable'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useValueAndKey(stackable, 'stackable'), useWidthProp(widths), 'steps', className);
    var rest = getUnhandledProps(StepGroup, props);
    var ElementType = getElementType(StepGroup, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), map_1(items, function (item) {
      return Step.create(item);
    }));
  }

  StepGroup.handledProps = ["as", "attached", "children", "className", "content", "fluid", "items", "ordered", "size", "stackable", "unstackable", "vertical", "widths"];
  StepGroup.propTypes =  {};

  /**
   * A step shows the completion status of an activity in a series of activities.
   */

  var Step =
  /*#__PURE__*/
  function (_Component) {
    inherits(Step, _Component);

    function Step() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Step);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Step)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "computeElementType", function () {
        var onClick = _this.props.onClick;
        if (onClick) return 'a';
      });

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var disabled = _this.props.disabled;
        if (!disabled) invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(Step, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            completed = _this$props.completed,
            content = _this$props.content,
            description = _this$props.description,
            disabled = _this$props.disabled,
            href = _this$props.href,
            icon = _this$props.icon,
            link = _this$props.link,
            title = _this$props.title;
        var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(completed, 'completed'), useKeyOnly(disabled, 'disabled'), useKeyOnly(link, 'link'), 'step', className);
        var rest = getUnhandledProps(Step, this.props);
        var ElementType = getElementType(Step, this.props, this.computeElementType);

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            href: href,
            onClick: this.handleClick
          }), children);
        }

        if (!isNil(content)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            href: href,
            onClick: this.handleClick
          }), content);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), Icon.create(icon, {
          autoGenerateKey: false
        }), StepContent.create({
          description: description,
          title: title
        }, {
          autoGenerateKey: false
        }));
      }
    }]);

    return Step;
  }(React.Component);

  defineProperty(Step, "Content", StepContent);

  defineProperty(Step, "Description", StepDescription);

  defineProperty(Step, "Group", StepGroup);

  defineProperty(Step, "Title", StepTitle);

  defineProperty(Step, "handledProps", ["active", "as", "children", "className", "completed", "content", "description", "disabled", "href", "icon", "link", "onClick", "ordered", "title"]);

  Step.propTypes =  {};
  Step.create = createShorthandFactory(Step, function (content) {
    return {
      content: content
    };
  });

  /**
   * A title sub-component for Accordion component.
   */

  var AccordionTitle =
  /*#__PURE__*/
  function (_Component) {
    inherits(AccordionTitle, _Component);

    function AccordionTitle() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, AccordionTitle);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(AccordionTitle)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        return invoke_1(_this.props, 'onClick', e, _this.props);
      });

      return _this;
    }

    createClass(AccordionTitle, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            children = _this$props.children,
            className = _this$props.className,
            content = _this$props.content,
            icon = _this$props.icon;
        var classes = classnames(useKeyOnly(active, 'active'), 'title', className);
        var rest = getUnhandledProps(AccordionTitle, this.props);
        var ElementType = getElementType(AccordionTitle, this.props);
        var iconValue = isNil_1(icon) ? 'dropdown' : icon;

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            onClick: this.handleClick
          }), children);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), Icon.create(iconValue, {
          autoGenerateKey: false
        }), content);
      }
    }]);

    return AccordionTitle;
  }(React.Component);

  defineProperty(AccordionTitle, "handledProps", ["active", "as", "children", "className", "content", "icon", "index", "onClick"]);
  AccordionTitle.propTypes =  {};
  AccordionTitle.create = createShorthandFactory(AccordionTitle, function (content) {
    return {
      content: content
    };
  });

  /**
   * A content sub-component for Accordion component.
   */

  function AccordionContent(props) {
    var active = props.active,
        children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('content', useKeyOnly(active, 'active'), className);
    var rest = getUnhandledProps(AccordionContent, props);
    var ElementType = getElementType(AccordionContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  AccordionContent.handledProps = ["active", "as", "children", "className", "content"];
  AccordionContent.propTypes =  {};
  AccordionContent.create = createShorthandFactory(AccordionContent, function (content) {
    return {
      content: content
    };
  });

  /**
   * A panel sub-component for Accordion component.
   */

  var AccordionPanel =
  /*#__PURE__*/
  function (_Component) {
    inherits(AccordionPanel, _Component);

    function AccordionPanel() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, AccordionPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(AccordionPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleTitleOverrides", function (predefinedProps) {
        return {
          onClick: function onClick(e, titleProps) {
            invoke_1(predefinedProps, 'onClick', e, titleProps);

            invoke_1(_this.props, 'onTitleClick', e, titleProps);
          }
        };
      });

      return _this;
    }

    createClass(AccordionPanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            content = _this$props.content,
            index = _this$props.index,
            title = _this$props.title;
        return React__default.createElement(React.Fragment, null, AccordionTitle.create(title, {
          autoGenerateKey: false,
          defaultProps: {
            active: active,
            index: index
          },
          overrideProps: this.handleTitleOverrides
        }), AccordionContent.create(content, {
          autoGenerateKey: false,
          defaultProps: {
            active: active
          }
        }));
      }
    }]);

    return AccordionPanel;
  }(React.Component);

  defineProperty(AccordionPanel, "handledProps", ["active", "content", "index", "onTitleClick", "title"]);

  AccordionPanel.propTypes =  {};
  AccordionPanel.create = createShorthandFactory(AccordionPanel, null);

  /**
   * An Accordion can contain sub-accordions.
   */


  var AccordionAccordion =
  /*#__PURE__*/
  function (_Component) {
    inherits(AccordionAccordion, _Component);

    function AccordionAccordion() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, AccordionAccordion);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(AccordionAccordion)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "computeNewIndex", function (index) {
        var exclusive = _this.props.exclusive;
        var activeIndex = _this.state.activeIndex;
        if (exclusive) return index === activeIndex ? -1 : index; // check to see if index is in array, and remove it, if not then add it

        return includes_1(activeIndex, index) ? without_1(activeIndex, index) : [].concat(toConsumableArray(activeIndex), [index]);
      });

      defineProperty(assertThisInitialized(_this), "handleTitleClick", function (e, titleProps) {
        var index = titleProps.index;

        _this.trySetState({
          activeIndex: _this.computeNewIndex(index)
        });

        invoke_1(_this.props, 'onTitleClick', e, titleProps);
      });

      defineProperty(assertThisInitialized(_this), "isIndexActive", function (index) {
        var exclusive = _this.props.exclusive;
        var activeIndex = _this.state.activeIndex;
        return exclusive ? activeIndex === index : includes_1(activeIndex, index);
      });

      return _this;
    }

    createClass(AccordionAccordion, [{
      key: "getInitialAutoControlledState",
      value: function getInitialAutoControlledState(_ref) {
        var exclusive = _ref.exclusive;
        return {
          activeIndex: exclusive ? -1 : []
        };
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            className = _this$props.className,
            children = _this$props.children,
            panels = _this$props.panels;
        var classes = classnames('accordion', className);
        var rest = getUnhandledProps(AccordionAccordion, this.props);
        var ElementType = getElementType(AccordionAccordion, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), isNil(children) ? map_1(panels, function (panel, index) {
          return AccordionPanel.create(panel, {
            defaultProps: {
              active: _this2.isIndexActive(index),
              index: index,
              onTitleClick: _this2.handleTitleClick
            }
          });
        }) : children);
      }
    }]);

    return AccordionAccordion;
  }(AutoControlledComponent);

  defineProperty(AccordionAccordion, "defaultProps", {
    exclusive: true
  });

  defineProperty(AccordionAccordion, "autoControlledProps", ['activeIndex']);

  defineProperty(AccordionAccordion, "handledProps", ["activeIndex", "as", "children", "className", "defaultActiveIndex", "exclusive", "onTitleClick", "panels"]);
  AccordionAccordion.propTypes =  {};
  AccordionAccordion.create = createShorthandFactory(AccordionAccordion, function (content) {
    return {
      content: content
    };
  });

  /**
   * An accordion allows users to toggle the display of sections of content.
   */

  function Accordion(props) {
    var className = props.className,
        fluid = props.fluid,
        inverted = props.inverted,
        styled = props.styled;
    var classes = classnames('ui', useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), useKeyOnly(styled, 'styled'), className);
    var rest = getUnhandledProps(Accordion, props);
    return React__default.createElement(AccordionAccordion, _extends_1({}, rest, {
      className: classes
    }));
  }

  Accordion.handledProps = ["className", "fluid", "inverted", "styled"];
  Accordion.propTypes =  {};
  Accordion.Accordion = AccordionAccordion;
  Accordion.Content = AccordionContent;
  Accordion.Panel = AccordionPanel;
  Accordion.Title = AccordionTitle;

  /**
   * An embed displays content from other websites like YouTube videos or Google Maps.
   */

  var Embed =
  /*#__PURE__*/
  function (_Component) {
    inherits(Embed, _Component);

    function Embed() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Embed);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Embed)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var onClick = _this.props.onClick;
        var active = _this.state.active;
        if (onClick) onClick(e, objectSpread({}, _this.props, {
          active: true
        }));
        if (!active) _this.trySetState({
          active: true
        });
      });

      return _this;
    }

    createClass(Embed, [{
      key: "getSrc",
      value: function getSrc() {
        var _this$props = this.props,
            _this$props$autoplay = _this$props.autoplay,
            autoplay = _this$props$autoplay === void 0 ? true : _this$props$autoplay,
            _this$props$brandedUI = _this$props.brandedUI,
            brandedUI = _this$props$brandedUI === void 0 ? false : _this$props$brandedUI,
            _this$props$color = _this$props.color,
            color = _this$props$color === void 0 ? '#444444' : _this$props$color,
            _this$props$hd = _this$props.hd,
            hd = _this$props$hd === void 0 ? true : _this$props$hd,
            id = _this$props.id,
            source = _this$props.source,
            url = _this$props.url;

        if (source === 'youtube') {
          return ["//www.youtube.com/embed/".concat(id), '?autohide=true', "&amp;autoplay=".concat(autoplay), "&amp;color=".concat(encodeURIComponent(color)), "&amp;hq=".concat(hd), '&amp;jsapi=false', "&amp;modestbranding=".concat(brandedUI), "&amp;rel=".concat(brandedUI ? 0 : 1)].join('');
        }

        if (source === 'vimeo') {
          return ["//player.vimeo.com/video/".concat(id), '?api=false', "&amp;autoplay=".concat(autoplay), '&amp;byline=false', "&amp;color=".concat(encodeURIComponent(color)), '&amp;portrait=false', '&amp;title=false'].join('');
        }

        return url;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            aspectRatio = _this$props2.aspectRatio,
            className = _this$props2.className,
            icon = _this$props2.icon,
            placeholder = _this$props2.placeholder;
        var active = this.state.active;
        var classes = classnames('ui', aspectRatio, useKeyOnly(active, 'active'), 'embed', className);
        var rest = getUnhandledProps(Embed, this.props);
        var ElementType = getElementType(Embed, this.props);
        var iconShorthand = icon !== undefined ? icon : 'video play';
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), Icon.create(iconShorthand, {
          autoGenerateKey: false
        }), placeholder && React__default.createElement("img", {
          className: "placeholder",
          src: placeholder
        }), this.renderEmbed());
      }
    }, {
      key: "renderEmbed",
      value: function renderEmbed() {
        var _this$props3 = this.props,
            children = _this$props3.children,
            content = _this$props3.content,
            iframe = _this$props3.iframe,
            source = _this$props3.source;
        var active = this.state.active;
        if (!active) return null;
        if (!isNil(children)) return React__default.createElement("div", {
          className: "embed"
        }, children);
        if (!isNil(content)) return React__default.createElement("div", {
          className: "embed"
        }, content);
        return React__default.createElement("div", {
          className: "embed"
        }, createHTMLIframe(isNil(iframe) ? this.getSrc() : iframe, {
          defaultProps: {
            allowFullScreen: false,
            frameBorder: 0,
            height: '100%',
            scrolling: 'no',
            src: this.getSrc(),
            title: "Embedded content from ".concat(source, "."),
            width: '100%'
          },
          autoGenerateKey: false
        }));
      }
    }]);

    return Embed;
  }(AutoControlledComponent);

  defineProperty(Embed, "autoControlledProps", ['active']);

  defineProperty(Embed, "handledProps", ["active", "as", "aspectRatio", "autoplay", "brandedUI", "children", "className", "color", "content", "defaultActive", "hd", "icon", "id", "iframe", "onClick", "placeholder", "source", "url"]);
  Embed.propTypes =  {};

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_1(object[key], value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;
        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        }
        else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    _baseFor(source, function(srcValue, key) {
      stack || (stack = new _Stack);
      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = _createAssigner(function(object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });

  var merge_1 = merge;

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  var toStr = Object.prototype.toString;

  var isArguments$1 = function isArguments(value) {
  	var str = toStr.call(value);
  	var isArgs = str === '[object Arguments]';
  	if (!isArgs) {
  		isArgs = str !== '[object Array]' &&
  			value !== null &&
  			typeof value === 'object' &&
  			typeof value.length === 'number' &&
  			value.length >= 0 &&
  			toStr.call(value.callee) === '[object Function]';
  	}
  	return isArgs;
  };

  var keysShim;
  if (!Object.keys) {
  	// modified from https://github.com/es-shims/es5-shim
  	var has$1 = Object.prototype.hasOwnProperty;
  	var toStr$1 = Object.prototype.toString;
  	var isArgs = isArguments$1; // eslint-disable-line global-require
  	var isEnumerable = Object.prototype.propertyIsEnumerable;
  	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
  	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  	var dontEnums = [
  		'toString',
  		'toLocaleString',
  		'valueOf',
  		'hasOwnProperty',
  		'isPrototypeOf',
  		'propertyIsEnumerable',
  		'constructor'
  	];
  	var equalsConstructorPrototype = function (o) {
  		var ctor = o.constructor;
  		return ctor && ctor.prototype === o;
  	};
  	var excludedKeys = {
  		$applicationCache: true,
  		$console: true,
  		$external: true,
  		$frame: true,
  		$frameElement: true,
  		$frames: true,
  		$innerHeight: true,
  		$innerWidth: true,
  		$onmozfullscreenchange: true,
  		$onmozfullscreenerror: true,
  		$outerHeight: true,
  		$outerWidth: true,
  		$pageXOffset: true,
  		$pageYOffset: true,
  		$parent: true,
  		$scrollLeft: true,
  		$scrollTop: true,
  		$scrollX: true,
  		$scrollY: true,
  		$self: true,
  		$webkitIndexedDB: true,
  		$webkitStorageInfo: true,
  		$window: true
  	};
  	var hasAutomationEqualityBug = (function () {
  		/* global window */
  		if (typeof window === 'undefined') { return false; }
  		for (var k in window) {
  			try {
  				if (!excludedKeys['$' + k] && has$1.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
  					try {
  						equalsConstructorPrototype(window[k]);
  					} catch (e) {
  						return true;
  					}
  				}
  			} catch (e) {
  				return true;
  			}
  		}
  		return false;
  	}());
  	var equalsConstructorPrototypeIfNotBuggy = function (o) {
  		/* global window */
  		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
  			return equalsConstructorPrototype(o);
  		}
  		try {
  			return equalsConstructorPrototype(o);
  		} catch (e) {
  			return false;
  		}
  	};

  	keysShim = function keys(object) {
  		var isObject = object !== null && typeof object === 'object';
  		var isFunction = toStr$1.call(object) === '[object Function]';
  		var isArguments = isArgs(object);
  		var isString = isObject && toStr$1.call(object) === '[object String]';
  		var theKeys = [];

  		if (!isObject && !isFunction && !isArguments) {
  			throw new TypeError('Object.keys called on a non-object');
  		}

  		var skipProto = hasProtoEnumBug && isFunction;
  		if (isString && object.length > 0 && !has$1.call(object, 0)) {
  			for (var i = 0; i < object.length; ++i) {
  				theKeys.push(String(i));
  			}
  		}

  		if (isArguments && object.length > 0) {
  			for (var j = 0; j < object.length; ++j) {
  				theKeys.push(String(j));
  			}
  		} else {
  			for (var name in object) {
  				if (!(skipProto && name === 'prototype') && has$1.call(object, name)) {
  					theKeys.push(String(name));
  				}
  			}
  		}

  		if (hasDontEnumBug) {
  			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

  			for (var k = 0; k < dontEnums.length; ++k) {
  				if (!(skipConstructor && dontEnums[k] === 'constructor') && has$1.call(object, dontEnums[k])) {
  					theKeys.push(dontEnums[k]);
  				}
  			}
  		}
  		return theKeys;
  	};
  }
  var implementation = keysShim;

  var slice = Array.prototype.slice;


  var origKeys = Object.keys;
  var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

  var originalKeys = Object.keys;

  keysShim$1.shim = function shimObjectKeys() {
  	if (Object.keys) {
  		var keysWorksWithArguments = (function () {
  			// Safari 5.0 bug
  			var args = Object.keys(arguments);
  			return args && args.length === arguments.length;
  		}(1, 2));
  		if (!keysWorksWithArguments) {
  			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
  				if (isArguments$1(object)) {
  					return originalKeys(slice.call(object));
  				}
  				return originalKeys(object);
  			};
  		}
  	} else {
  		Object.keys = keysShim$1;
  	}
  	return Object.keys || keysShim$1;
  };

  var objectKeys = keysShim$1;

  var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
  var toStr$2 = Object.prototype.toString;

  var isStandardArguments = function isArguments(value) {
  	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
  		return false;
  	}
  	return toStr$2.call(value) === '[object Arguments]';
  };

  var isLegacyArguments = function isArguments(value) {
  	if (isStandardArguments(value)) {
  		return true;
  	}
  	return value !== null &&
  		typeof value === 'object' &&
  		typeof value.length === 'number' &&
  		value.length >= 0 &&
  		toStr$2.call(value) !== '[object Array]' &&
  		toStr$2.call(value.callee) === '[object Function]';
  };

  var supportsStandardArguments = (function () {
  	return isStandardArguments(arguments);
  }());

  isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

  var isArguments$2 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

  // http://www.ecma-international.org/ecma-262/6.0/#sec-object.is

  var numberIsNaN = function (value) {
  	return value !== value;
  };

  var objectIs = function is(a, b) {
  	if (a === 0 && b === 0) {
  		return 1 / a === 1 / b;
  	}
  	if (a === b) {
  		return true;
  	}
  	if (numberIsNaN(a) && numberIsNaN(b)) {
  		return true;
  	}
  	return false;
  };

  /* eslint no-invalid-this: 1 */

  var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
  var slice$1 = Array.prototype.slice;
  var toStr$3 = Object.prototype.toString;
  var funcType = '[object Function]';

  var implementation$1 = function bind(that) {
      var target = this;
      if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice$1.call(arguments, 1);

      var bound;
      var binder = function () {
          if (this instanceof bound) {
              var result = target.apply(
                  this,
                  args.concat(slice$1.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return this;
          } else {
              return target.apply(
                  that,
                  args.concat(slice$1.call(arguments))
              );
          }
      };

      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
          boundArgs.push('$' + i);
      }

      bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

      if (target.prototype) {
          var Empty = function Empty() {};
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
      }

      return bound;
  };

  var functionBind = Function.prototype.bind || implementation$1;

  var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

  var regexExec = RegExp.prototype.exec;
  var gOPD = Object.getOwnPropertyDescriptor;

  var tryRegexExecCall = function tryRegexExec(value) {
  	try {
  		var lastIndex = value.lastIndex;
  		value.lastIndex = 0; // eslint-disable-line no-param-reassign

  		regexExec.call(value);
  		return true;
  	} catch (e) {
  		return false;
  	} finally {
  		value.lastIndex = lastIndex; // eslint-disable-line no-param-reassign
  	}
  };
  var toStr$4 = Object.prototype.toString;
  var regexClass = '[object RegExp]';
  var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

  var isRegex = function isRegex(value) {
  	if (!value || typeof value !== 'object') {
  		return false;
  	}
  	if (!hasToStringTag$1) {
  		return toStr$4.call(value) === regexClass;
  	}

  	var descriptor = gOPD(value, 'lastIndex');
  	var hasLastIndexDataProperty = descriptor && src(descriptor, 'value');
  	if (!hasLastIndexDataProperty) {
  		return false;
  	}

  	return tryRegexExecCall(value);
  };

  var toStr$5 = Object.prototype.toString;

  var isArguments$3 = function isArguments(value) {
  	var str = toStr$5.call(value);
  	var isArgs = str === '[object Arguments]';
  	if (!isArgs) {
  		isArgs = str !== '[object Array]' &&
  			value !== null &&
  			typeof value === 'object' &&
  			typeof value.length === 'number' &&
  			value.length >= 0 &&
  			toStr$5.call(value.callee) === '[object Function]';
  	}
  	return isArgs;
  };

  var keysShim$2;
  if (!Object.keys) {
  	// modified from https://github.com/es-shims/es5-shim
  	var has$2 = Object.prototype.hasOwnProperty;
  	var toStr$6 = Object.prototype.toString;
  	var isArgs$1 = isArguments$3; // eslint-disable-line global-require
  	var isEnumerable$1 = Object.prototype.propertyIsEnumerable;
  	var hasDontEnumBug$1 = !isEnumerable$1.call({ toString: null }, 'toString');
  	var hasProtoEnumBug$1 = isEnumerable$1.call(function () {}, 'prototype');
  	var dontEnums$1 = [
  		'toString',
  		'toLocaleString',
  		'valueOf',
  		'hasOwnProperty',
  		'isPrototypeOf',
  		'propertyIsEnumerable',
  		'constructor'
  	];
  	var equalsConstructorPrototype$1 = function (o) {
  		var ctor = o.constructor;
  		return ctor && ctor.prototype === o;
  	};
  	var excludedKeys$1 = {
  		$applicationCache: true,
  		$console: true,
  		$external: true,
  		$frame: true,
  		$frameElement: true,
  		$frames: true,
  		$innerHeight: true,
  		$innerWidth: true,
  		$onmozfullscreenchange: true,
  		$onmozfullscreenerror: true,
  		$outerHeight: true,
  		$outerWidth: true,
  		$pageXOffset: true,
  		$pageYOffset: true,
  		$parent: true,
  		$scrollLeft: true,
  		$scrollTop: true,
  		$scrollX: true,
  		$scrollY: true,
  		$self: true,
  		$webkitIndexedDB: true,
  		$webkitStorageInfo: true,
  		$window: true
  	};
  	var hasAutomationEqualityBug$1 = (function () {
  		/* global window */
  		if (typeof window === 'undefined') { return false; }
  		for (var k in window) {
  			try {
  				if (!excludedKeys$1['$' + k] && has$2.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
  					try {
  						equalsConstructorPrototype$1(window[k]);
  					} catch (e) {
  						return true;
  					}
  				}
  			} catch (e) {
  				return true;
  			}
  		}
  		return false;
  	}());
  	var equalsConstructorPrototypeIfNotBuggy$1 = function (o) {
  		/* global window */
  		if (typeof window === 'undefined' || !hasAutomationEqualityBug$1) {
  			return equalsConstructorPrototype$1(o);
  		}
  		try {
  			return equalsConstructorPrototype$1(o);
  		} catch (e) {
  			return false;
  		}
  	};

  	keysShim$2 = function keys(object) {
  		var isObject = object !== null && typeof object === 'object';
  		var isFunction = toStr$6.call(object) === '[object Function]';
  		var isArguments = isArgs$1(object);
  		var isString = isObject && toStr$6.call(object) === '[object String]';
  		var theKeys = [];

  		if (!isObject && !isFunction && !isArguments) {
  			throw new TypeError('Object.keys called on a non-object');
  		}

  		var skipProto = hasProtoEnumBug$1 && isFunction;
  		if (isString && object.length > 0 && !has$2.call(object, 0)) {
  			for (var i = 0; i < object.length; ++i) {
  				theKeys.push(String(i));
  			}
  		}

  		if (isArguments && object.length > 0) {
  			for (var j = 0; j < object.length; ++j) {
  				theKeys.push(String(j));
  			}
  		} else {
  			for (var name in object) {
  				if (!(skipProto && name === 'prototype') && has$2.call(object, name)) {
  					theKeys.push(String(name));
  				}
  			}
  		}

  		if (hasDontEnumBug$1) {
  			var skipConstructor = equalsConstructorPrototypeIfNotBuggy$1(object);

  			for (var k = 0; k < dontEnums$1.length; ++k) {
  				if (!(skipConstructor && dontEnums$1[k] === 'constructor') && has$2.call(object, dontEnums$1[k])) {
  					theKeys.push(dontEnums$1[k]);
  				}
  			}
  		}
  		return theKeys;
  	};
  }
  var implementation$2 = keysShim$2;

  var slice$2 = Array.prototype.slice;


  var origKeys$1 = Object.keys;
  var keysShim$3 = origKeys$1 ? function keys(o) { return origKeys$1(o); } : implementation$2;

  var originalKeys$1 = Object.keys;

  keysShim$3.shim = function shimObjectKeys() {
  	if (Object.keys) {
  		var keysWorksWithArguments = (function () {
  			// Safari 5.0 bug
  			var args = Object.keys(arguments);
  			return args && args.length === arguments.length;
  		}(1, 2));
  		if (!keysWorksWithArguments) {
  			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
  				if (isArguments$3(object)) {
  					return originalKeys$1(slice$2.call(object));
  				}
  				return originalKeys$1(object);
  			};
  		}
  	} else {
  		Object.keys = keysShim$3;
  	}
  	return Object.keys || keysShim$3;
  };

  var objectKeys$1 = keysShim$3;

  var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

  var toStr$7 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var origDefineProperty = Object.defineProperty;

  var isFunction$1 = function (fn) {
  	return typeof fn === 'function' && toStr$7.call(fn) === '[object Function]';
  };

  var arePropertyDescriptorsSupported = function () {
  	var obj = {};
  	try {
  		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
  		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
  		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
  			return false;
  		}
  		return obj.x === obj;
  	} catch (e) { /* this is IE 8. */
  		return false;
  	}
  };
  var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

  var defineProperty$2 = function (object, name, value, predicate) {
  	if (name in object && (!isFunction$1(predicate) || !predicate())) {
  		return;
  	}
  	if (supportsDescriptors) {
  		origDefineProperty(object, name, {
  			configurable: true,
  			enumerable: false,
  			value: value,
  			writable: true
  		});
  	} else {
  		object[name] = value;
  	}
  };

  var defineProperties = function (object, map) {
  	var predicates = arguments.length > 2 ? arguments[2] : {};
  	var props = objectKeys$1(map);
  	if (hasSymbols) {
  		props = concat.call(props, Object.getOwnPropertySymbols(map));
  	}
  	for (var i = 0; i < props.length; i += 1) {
  		defineProperty$2(object, props[i], map[props[i]], predicates[props[i]]);
  	}
  };

  defineProperties.supportsDescriptors = !!supportsDescriptors;

  var defineProperties_1 = defineProperties;

  /* eslint complexity: [2, 18], max-statements: [2, 33] */
  var shams = function hasSymbols() {
  	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
  	if (typeof Symbol.iterator === 'symbol') { return true; }

  	var obj = {};
  	var sym = Symbol('test');
  	var symObj = Object(sym);
  	if (typeof sym === 'string') { return false; }

  	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
  	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

  	// temp disabled per https://github.com/ljharb/object.assign/issues/17
  	// if (sym instanceof Symbol) { return false; }
  	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  	// if (!(symObj instanceof Symbol)) { return false; }

  	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
  	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  	var symVal = 42;
  	obj[sym] = symVal;
  	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
  	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

  	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

  	var syms = Object.getOwnPropertySymbols(obj);
  	if (syms.length !== 1 || syms[0] !== sym) { return false; }

  	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

  	if (typeof Object.getOwnPropertyDescriptor === 'function') {
  		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
  		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
  	}

  	return true;
  };

  var origSymbol = commonjsGlobal.Symbol;


  var hasSymbols$1 = function hasNativeSymbols() {
  	if (typeof origSymbol !== 'function') { return false; }
  	if (typeof Symbol !== 'function') { return false; }
  	if (typeof origSymbol('foo') !== 'symbol') { return false; }
  	if (typeof Symbol('bar') !== 'symbol') { return false; }

  	return shams();
  };

  /* globals
  	Atomics,
  	SharedArrayBuffer,
  */

  var undefined$1;

  var $TypeError = TypeError;

  var $gOPD = Object.getOwnPropertyDescriptor;
  if ($gOPD) {
  	try {
  		$gOPD({}, '');
  	} catch (e) {
  		$gOPD = null; // this is IE 8, which has a broken gOPD
  	}
  }

  var throwTypeError = function () { throw new $TypeError(); };
  var ThrowTypeError = $gOPD
  	? (function () {
  		try {
  			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
  			arguments.callee; // IE 8 does not throw here
  			return throwTypeError;
  		} catch (calleeThrows) {
  			try {
  				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
  				return $gOPD(arguments, 'callee').get;
  			} catch (gOPDthrows) {
  				return throwTypeError;
  			}
  		}
  	}())
  	: throwTypeError;

  var hasSymbols$2 = hasSymbols$1();

  var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto
  var generatorFunction =  undefined$1;
  var asyncFunction =  undefined$1;
  var asyncGenFunction =  undefined$1;

  var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

  var INTRINSICS = {
  	'%Array%': Array,
  	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer.prototype,
  	'%ArrayIteratorPrototype%': hasSymbols$2 ? getProto([][Symbol.iterator]()) : undefined$1,
  	'%ArrayPrototype%': Array.prototype,
  	'%ArrayProto_entries%': Array.prototype.entries,
  	'%ArrayProto_forEach%': Array.prototype.forEach,
  	'%ArrayProto_keys%': Array.prototype.keys,
  	'%ArrayProto_values%': Array.prototype.values,
  	'%AsyncFromSyncIteratorPrototype%': undefined$1,
  	'%AsyncFunction%': asyncFunction,
  	'%AsyncFunctionPrototype%':  undefined$1,
  	'%AsyncGenerator%':  undefined$1,
  	'%AsyncGeneratorFunction%': asyncGenFunction,
  	'%AsyncGeneratorPrototype%':  undefined$1,
  	'%AsyncIteratorPrototype%':  undefined$1,
  	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  	'%Boolean%': Boolean,
  	'%BooleanPrototype%': Boolean.prototype,
  	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$1 : DataView.prototype,
  	'%Date%': Date,
  	'%DatePrototype%': Date.prototype,
  	'%decodeURI%': decodeURI,
  	'%decodeURIComponent%': decodeURIComponent,
  	'%encodeURI%': encodeURI,
  	'%encodeURIComponent%': encodeURIComponent,
  	'%Error%': Error,
  	'%ErrorPrototype%': Error.prototype,
  	'%eval%': eval, // eslint-disable-line no-eval
  	'%EvalError%': EvalError,
  	'%EvalErrorPrototype%': EvalError.prototype,
  	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array.prototype,
  	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array.prototype,
  	'%Function%': Function,
  	'%FunctionPrototype%': Function.prototype,
  	'%Generator%':  undefined$1,
  	'%GeneratorFunction%': generatorFunction,
  	'%GeneratorPrototype%':  undefined$1,
  	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array.prototype,
  	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$1 : Int8Array.prototype,
  	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array.prototype,
  	'%isFinite%': isFinite,
  	'%isNaN%': isNaN,
  	'%IteratorPrototype%': hasSymbols$2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$1,
  	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
  	'%MapPrototype%': typeof Map === 'undefined' ? undefined$1 : Map.prototype,
  	'%Math%': Math,
  	'%Number%': Number,
  	'%NumberPrototype%': Number.prototype,
  	'%Object%': Object,
  	'%ObjectPrototype%': Object.prototype,
  	'%ObjProto_toString%': Object.prototype.toString,
  	'%ObjProto_valueOf%': Object.prototype.valueOf,
  	'%parseFloat%': parseFloat,
  	'%parseInt%': parseInt,
  	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype,
  	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype.then,
  	'%Promise_all%': typeof Promise === 'undefined' ? undefined$1 : Promise.all,
  	'%Promise_reject%': typeof Promise === 'undefined' ? undefined$1 : Promise.reject,
  	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined$1 : Promise.resolve,
  	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  	'%RangeError%': RangeError,
  	'%RangeErrorPrototype%': RangeError.prototype,
  	'%ReferenceError%': ReferenceError,
  	'%ReferenceErrorPrototype%': ReferenceError.prototype,
  	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  	'%RegExp%': RegExp,
  	'%RegExpPrototype%': RegExp.prototype,
  	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
  	'%SetPrototype%': typeof Set === 'undefined' ? undefined$1 : Set.prototype,
  	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer.prototype,
  	'%String%': String,
  	'%StringIteratorPrototype%': hasSymbols$2 ? getProto(''[Symbol.iterator]()) : undefined$1,
  	'%StringPrototype%': String.prototype,
  	'%Symbol%': hasSymbols$2 ? Symbol : undefined$1,
  	'%SymbolPrototype%': hasSymbols$2 ? Symbol.prototype : undefined$1,
  	'%SyntaxError%': SyntaxError,
  	'%SyntaxErrorPrototype%': SyntaxError.prototype,
  	'%ThrowTypeError%': ThrowTypeError,
  	'%TypedArray%': TypedArray,
  	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined$1,
  	'%TypeError%': $TypeError,
  	'%TypeErrorPrototype%': $TypeError.prototype,
  	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array.prototype,
  	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray.prototype,
  	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array.prototype,
  	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array.prototype,
  	'%URIError%': URIError,
  	'%URIErrorPrototype%': URIError.prototype,
  	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap.prototype,
  	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
  	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet.prototype
  };


  var $replace = functionBind.call(Function.call, String.prototype.replace);

  /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
  var rePropName$1 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar$1 = /\\(\\)?/g; /** Used to match backslashes in property paths. */
  var stringToPath$1 = function stringToPath(string) {
  	var result = [];
  	$replace(string, rePropName$1, function (match, number, quote, subString) {
  		result[result.length] = quote ? $replace(subString, reEscapeChar$1, '$1') : (number || match);
  	});
  	return result;
  };
  /* end adaptation */

  var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  	if (!(name in INTRINSICS)) {
  		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
  	}

  	// istanbul ignore if // hopefully this is impossible to test :-)
  	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
  		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  	}

  	return INTRINSICS[name];
  };

  var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
  	if (typeof name !== 'string' || name.length === 0) {
  		throw new TypeError('intrinsic name must be a non-empty string');
  	}
  	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
  		throw new TypeError('"allowMissing" argument must be a boolean');
  	}

  	var parts = stringToPath$1(name);

  	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
  	for (var i = 1; i < parts.length; i += 1) {
  		if (value != null) {
  			if ($gOPD && (i + 1) >= parts.length) {
  				var desc = $gOPD(value, parts[i]);
  				if (!allowMissing && !(parts[i] in value)) {
  					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
  				}
  				value = desc ? (desc.get || desc.value) : value[parts[i]];
  			} else {
  				value = value[parts[i]];
  			}
  		}
  	}
  	return value;
  };

  var $Function = GetIntrinsic('%Function%');
  var $apply = $Function.apply;
  var $call = $Function.call;

  var callBind = function callBind() {
  	return functionBind.apply($call, arguments);
  };

  var apply$1 = function applyBind() {
  	return functionBind.apply($apply, arguments);
  };
  callBind.apply = apply$1;

  var $Object = Object;
  var $TypeError$1 = TypeError;

  var implementation$3 = function flags() {
  	if (this != null && this !== $Object(this)) {
  		throw new $TypeError$1('RegExp.prototype.flags getter called on non-object');
  	}
  	var result = '';
  	if (this.global) {
  		result += 'g';
  	}
  	if (this.ignoreCase) {
  		result += 'i';
  	}
  	if (this.multiline) {
  		result += 'm';
  	}
  	if (this.dotAll) {
  		result += 's';
  	}
  	if (this.unicode) {
  		result += 'u';
  	}
  	if (this.sticky) {
  		result += 'y';
  	}
  	return result;
  };

  var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
  var $gOPD$1 = Object.getOwnPropertyDescriptor;
  var $TypeError$2 = TypeError;

  var polyfill = function getPolyfill() {
  	if (!supportsDescriptors$1) {
  		throw new $TypeError$2('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  	}
  	if ((/a/mig).flags === 'gim') {
  		var descriptor = $gOPD$1(RegExp.prototype, 'flags');
  		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
  			return descriptor.get;
  		}
  	}
  	return implementation$3;
  };

  var supportsDescriptors$2 = defineProperties_1.supportsDescriptors;

  var gOPD$1 = Object.getOwnPropertyDescriptor;
  var defineProperty$3 = Object.defineProperty;
  var TypeErr = TypeError;
  var getProto$1 = Object.getPrototypeOf;
  var regex = /a/;

  var shim = function shimFlags() {
  	if (!supportsDescriptors$2 || !getProto$1) {
  		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  	}
  	var polyfill$1 = polyfill();
  	var proto = getProto$1(regex);
  	var descriptor = gOPD$1(proto, 'flags');
  	if (!descriptor || descriptor.get !== polyfill$1) {
  		defineProperty$3(proto, 'flags', {
  			configurable: true,
  			enumerable: false,
  			get: polyfill$1
  		});
  	}
  	return polyfill$1;
  };

  var flagsBound = callBind(implementation$3);

  defineProperties_1(flagsBound, {
  	getPolyfill: polyfill,
  	implementation: implementation$3,
  	shim: shim
  });

  var regexp_prototype_flags = flagsBound;

  var getDay = Date.prototype.getDay;
  var tryDateObject = function tryDateGetDayCall(value) {
  	try {
  		getDay.call(value);
  		return true;
  	} catch (e) {
  		return false;
  	}
  };

  var toStr$8 = Object.prototype.toString;
  var dateClass = '[object Date]';
  var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

  var isDateObject = function isDateObject(value) {
  	if (typeof value !== 'object' || value === null) {
  		return false;
  	}
  	return hasToStringTag$2 ? tryDateObject(value) : toStr$8.call(value) === dateClass;
  };

  var getTime = Date.prototype.getTime;

  function deepEqual(actual, expected, options) {
    var opts = options || {};

    // 7.1. All identical values are equivalent, as determined by ===.
    if (opts.strict ? objectIs(actual, expected) : actual === expected) {
      return true;
    }

    // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
    if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
      return opts.strict ? objectIs(actual, expected) : actual == expected;
    }

    /*
     * 7.4. For all other Object pairs, including Array objects, equivalence is
     * determined by having the same number of owned properties (as verified
     * with Object.prototype.hasOwnProperty.call), the same set of keys
     * (although not necessarily the same order), equivalent values for every
     * corresponding key, and an identical 'prototype' property. Note: this
     * accounts for both named and indexed properties on Arrays.
     */
    // eslint-disable-next-line no-use-before-define
    return objEquiv(actual, expected, opts);
  }

  function isUndefinedOrNull(value) {
    return value === null || value === undefined;
  }

  function isBuffer(x) {
    if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
      return false;
    }
    if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
      return false;
    }
    if (x.length > 0 && typeof x[0] !== 'number') {
      return false;
    }
    return true;
  }

  function objEquiv(a, b, opts) {
    /* eslint max-statements: [2, 50] */
    var i, key;
    if (typeof a !== typeof b) { return false; }
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }

    // an identical 'prototype' property.
    if (a.prototype !== b.prototype) { return false; }

    if (isArguments$2(a) !== isArguments$2(b)) { return false; }

    var aIsRegex = isRegex(a);
    var bIsRegex = isRegex(b);
    if (aIsRegex !== bIsRegex) { return false; }
    if (aIsRegex || bIsRegex) {
      return a.source === b.source && regexp_prototype_flags(a) === regexp_prototype_flags(b);
    }

    if (isDateObject(a) && isDateObject(b)) {
      return getTime.call(a) === getTime.call(b);
    }

    var aIsBuffer = isBuffer(a);
    var bIsBuffer = isBuffer(b);
    if (aIsBuffer !== bIsBuffer) { return false; }
    if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
      if (a.length !== b.length) { return false; }
      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) { return false; }
      }
      return true;
    }

    if (typeof a !== typeof b) { return false; }

    try {
      var ka = objectKeys(a);
      var kb = objectKeys(b);
    } catch (e) { // happens when one is a string literal and the other isn't
      return false;
    }
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length !== kb.length) { return false; }

    // the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    // ~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i]) { return false; }
    }
    // equivalent values for every corresponding key, and ~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!deepEqual(a[key], b[key], opts)) { return false; }
    }

    return true;
  }

  var deepEqual_1 = deepEqual;

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser$1 && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction$2(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck$1 = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass$1 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty$4 = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find$1(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex$1(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find$1(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex$1(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction$2(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser$1 && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find$1(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find$1(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$4(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$4(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find$1(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty$4({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty$4({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty$4({}, side, reference[side]),
        end: defineProperty$4({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find$1(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck$1(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction$2(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass$1(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global$1).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  var key = '__global_unique_id__';

  var gud = function() {
    return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
  };

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning = function() {};

  var warning_1 = warning;

  var implementation$4 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _react2 = _interopRequireDefault(React__default);



  var _propTypes2 = _interopRequireDefault(propTypes);



  var _gud2 = _interopRequireDefault(gud);



  var _warning2 = _interopRequireDefault(warning_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var MAX_SIGNED_31_BIT_INT = 1073741823;

  // Inlined Object.is polyfill.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  function objectIs(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  function createEventEmitter(value) {
    var handlers = [];
    return {
      on: function on(handler) {
        handlers.push(handler);
      },
      off: function off(handler) {
        handlers = handlers.filter(function (h) {
          return h !== handler;
        });
      },
      get: function get() {
        return value;
      },
      set: function set(newValue, changedBits) {
        value = newValue;
        handlers.forEach(function (handler) {
          return handler(value, changedBits);
        });
      }
    };
  }

  function onlyChild(children) {
    return Array.isArray(children) ? children[0] : children;
  }

  function createReactContext(defaultValue, calculateChangedBits) {
    var _Provider$childContex, _Consumer$contextType;

    var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';

    var Provider = function (_Component) {
      _inherits(Provider, _Component);

      function Provider() {
        var _temp, _this, _ret;

        _classCallCheck(this, Provider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
      }

      Provider.prototype.getChildContext = function getChildContext() {
        var _ref;

        return _ref = {}, _ref[contextProp] = this.emitter, _ref;
      };

      Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
          var oldValue = this.props.value;
          var newValue = nextProps.value;
          var changedBits = void 0;

          if (objectIs(oldValue, newValue)) {
            changedBits = 0; // No change
          } else {
            changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

            changedBits |= 0;

            if (changedBits !== 0) {
              this.emitter.set(nextProps.value, changedBits);
            }
          }
        }
      };

      Provider.prototype.render = function render() {
        return this.props.children;
      };

      return Provider;
    }(React__default.Component);

    Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);

    var Consumer = function (_Component2) {
      _inherits(Consumer, _Component2);

      function Consumer() {
        var _temp2, _this2, _ret2;

        _classCallCheck(this, Consumer);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
          value: _this2.getValue()
        }, _this2.onUpdate = function (newValue, changedBits) {
          var observedBits = _this2.observedBits | 0;
          if ((observedBits & changedBits) !== 0) {
            _this2.setState({ value: _this2.getValue() });
          }
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
      }

      Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var observedBits = nextProps.observedBits;

        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      };

      Consumer.prototype.componentDidMount = function componentDidMount() {
        if (this.context[contextProp]) {
          this.context[contextProp].on(this.onUpdate);
        }
        var observedBits = this.props.observedBits;

        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      };

      Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.context[contextProp]) {
          this.context[contextProp].off(this.onUpdate);
        }
      };

      Consumer.prototype.getValue = function getValue() {
        if (this.context[contextProp]) {
          return this.context[contextProp].get();
        } else {
          return defaultValue;
        }
      };

      Consumer.prototype.render = function render() {
        return onlyChild(this.props.children)(this.state.value);
      };

      return Consumer;
    }(React__default.Component);

    Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);


    return {
      Provider: Provider,
      Consumer: Consumer
    };
  }

  exports.default = createReactContext;
  module.exports = exports['default'];
  });

  unwrapExports(implementation$4);

  var lib$1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _react2 = _interopRequireDefault(React__default);



  var _implementation2 = _interopRequireDefault(implementation$4);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _react2.default.createContext || _implementation2.default;
  module.exports = exports['default'];
  });

  var createContext = unwrapExports(lib$1);

  var ManagerReferenceNodeContext = createContext();
  var ManagerReferenceNodeSetterContext = createContext();

  /**
   * Takes an argument and if it's an array, returns the first item in the array,
   * otherwise returns the argument. Used for Preact compatibility.
   */
  var unwrapArray = function unwrapArray(arg) {
    return Array.isArray(arg) ? arg[0] : arg;
  };
  /**
   * Takes a maybe-undefined function and arbitrary args and invokes the function
   * only if it is defined.
   */

  var safeInvoke = function safeInvoke(fn) {
    if (typeof fn === "function") {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, args);
    }
  };
  /**
   * Sets a ref using either a ref callback or a ref object
   */

  var setRef = function setRef(ref, node) {
    // if its a function call it
    if (typeof ref === "function") {
      return safeInvoke(ref, node);
    } // otherwise we should treat it as a ref object
    else if (ref != null) {
        ref.current = node;
      }
  };

  var initialStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none'
  };
  var initialArrowStyle = {};
  var InnerPopper =
  /*#__PURE__*/
  function (_React$Component) {
    inheritsLoose(InnerPopper, _React$Component);

    function InnerPopper() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      defineProperty(assertThisInitialized(_this), "state", {
        data: undefined,
        placement: undefined
      });

      defineProperty(assertThisInitialized(_this), "popperInstance", void 0);

      defineProperty(assertThisInitialized(_this), "popperNode", null);

      defineProperty(assertThisInitialized(_this), "arrowNode", null);

      defineProperty(assertThisInitialized(_this), "setPopperNode", function (popperNode) {
        if (!popperNode || _this.popperNode === popperNode) return;
        setRef(_this.props.innerRef, popperNode);
        _this.popperNode = popperNode;

        _this.updatePopperInstance();
      });

      defineProperty(assertThisInitialized(_this), "setArrowNode", function (arrowNode) {
        _this.arrowNode = arrowNode;
      });

      defineProperty(assertThisInitialized(_this), "updateStateModifier", {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          var placement = data.placement;

          _this.setState({
            data: data,
            placement: placement
          });

          return data;
        }
      });

      defineProperty(assertThisInitialized(_this), "getOptions", function () {
        return {
          placement: _this.props.placement,
          eventsEnabled: _this.props.eventsEnabled,
          positionFixed: _this.props.positionFixed,
          modifiers: _extends_1({}, _this.props.modifiers, {
            arrow: _extends_1({}, _this.props.modifiers && _this.props.modifiers.arrow, {
              enabled: !!_this.arrowNode,
              element: _this.arrowNode
            }),
            applyStyle: {
              enabled: false
            },
            updateStateModifier: _this.updateStateModifier
          })
        };
      });

      defineProperty(assertThisInitialized(_this), "getPopperStyle", function () {
        return !_this.popperNode || !_this.state.data ? initialStyle : _extends_1({
          position: _this.state.data.offsets.popper.position
        }, _this.state.data.styles);
      });

      defineProperty(assertThisInitialized(_this), "getPopperPlacement", function () {
        return !_this.state.data ? undefined : _this.state.placement;
      });

      defineProperty(assertThisInitialized(_this), "getArrowStyle", function () {
        return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
      });

      defineProperty(assertThisInitialized(_this), "getOutOfBoundariesState", function () {
        return _this.state.data ? _this.state.data.hide : undefined;
      });

      defineProperty(assertThisInitialized(_this), "destroyPopperInstance", function () {
        if (!_this.popperInstance) return;

        _this.popperInstance.destroy();

        _this.popperInstance = null;
      });

      defineProperty(assertThisInitialized(_this), "updatePopperInstance", function () {
        _this.destroyPopperInstance();

        var _assertThisInitialize = assertThisInitialized(_this),
            popperNode = _assertThisInitialize.popperNode;

        var referenceElement = _this.props.referenceElement;
        if (!referenceElement || !popperNode) return;
        _this.popperInstance = new Popper(referenceElement, popperNode, _this.getOptions());
      });

      defineProperty(assertThisInitialized(_this), "scheduleUpdate", function () {
        if (_this.popperInstance) {
          _this.popperInstance.scheduleUpdate();
        }
      });

      return _this;
    }

    var _proto = InnerPopper.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      // If the Popper.js options have changed, update the instance (destroy + create)
      if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || !deepEqual_1(this.props.modifiers, prevProps.modifiers, {
        strict: true
      })) {

        this.updatePopperInstance();
      } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
        this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
      } // A placement difference in state means popper determined a new placement
      // apart from the props value. By the time the popper element is rendered with
      // the new position Popper has already measured it, if the place change triggers
      // a size change it will result in a misaligned popper. So we schedule an update to be sure.


      if (prevState.placement !== this.state.placement) {
        this.scheduleUpdate();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      setRef(this.props.innerRef, null);
      this.destroyPopperInstance();
    };

    _proto.render = function render() {
      return unwrapArray(this.props.children)({
        ref: this.setPopperNode,
        style: this.getPopperStyle(),
        placement: this.getPopperPlacement(),
        outOfBoundaries: this.getOutOfBoundariesState(),
        scheduleUpdate: this.scheduleUpdate,
        arrowProps: {
          ref: this.setArrowNode,
          style: this.getArrowStyle()
        }
      });
    };

    return InnerPopper;
  }(React.Component);

  defineProperty(InnerPopper, "defaultProps", {
    placement: 'bottom',
    eventsEnabled: true,
    referenceElement: undefined,
    positionFixed: false
  });
  function Popper$1(_ref) {
    var referenceElement = _ref.referenceElement,
        props = objectWithoutPropertiesLoose(_ref, ["referenceElement"]);

    return React.createElement(ManagerReferenceNodeContext.Consumer, null, function (referenceNode) {
      return React.createElement(InnerPopper, _extends_1({
        referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
      }, props));
    });
  }

  /**
   * The base implementation of `_.invert` and `_.invertBy` which inverts
   * `object` with values transformed by `iteratee` and set by `setter`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform values.
   * @param {Object} accumulator The initial inverted object.
   * @returns {Function} Returns `accumulator`.
   */
  function baseInverter(object, setter, iteratee, accumulator) {
    _baseForOwn(object, function(value, key, object) {
      setter(accumulator, iteratee(value), key, object);
    });
    return accumulator;
  }

  var _baseInverter = baseInverter;

  /**
   * Creates a function like `_.invertBy`.
   *
   * @private
   * @param {Function} setter The function to set accumulator values.
   * @param {Function} toIteratee The function to resolve iteratees.
   * @returns {Function} Returns the new inverter function.
   */
  function createInverter(setter, toIteratee) {
    return function(object, iteratee) {
      return _baseInverter(object, setter, toIteratee(iteratee), {});
    };
  }

  var _createInverter = createInverter;

  /** Used for built-in method references. */
  var objectProto$k = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$2 = objectProto$k.toString;

  /**
   * Creates an object composed of the inverted keys and values of `object`.
   * If `object` contains duplicate values, subsequent values overwrite
   * property assignments of previous values.
   *
   * @static
   * @memberOf _
   * @since 0.7.0
   * @category Object
   * @param {Object} object The object to invert.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   */
  var invert = _createInverter(function(result, value, key) {
    if (value != null &&
        typeof value.toString != 'function') {
      value = nativeObjectToString$2.call(value);
    }

    result[value] = key;
  }, constant_1(identity_1));

  var invert_1 = invert;

  var positionsMapping = {
    'top center': 'top',
    'top left': 'top-start',
    'top right': 'top-end',
    'bottom center': 'bottom',
    'bottom left': 'bottom-start',
    'bottom right': 'bottom-end',
    'right center': 'right',
    'left center': 'left'
  };
  var positions = keys_1(positionsMapping);
  var placementMapping = invert_1(positionsMapping);

  var ReferenceProxy =
  /*#__PURE__*/
  function () {
    function ReferenceProxy(refObject) {
      classCallCheck(this, ReferenceProxy);

      this.ref = refObject;
    }

    createClass(ReferenceProxy, [{
      key: "getBoundingClientRect",
      value: function getBoundingClientRect() {
        return invoke_1(this.ref.current, 'getBoundingClientRect', {});
      }
    }, {
      key: "clientWidth",
      get: function get() {
        return this.getBoundingClientRect().width;
      }
    }, {
      key: "clientHeight",
      get: function get() {
        return this.getBoundingClientRect().height;
      }
    }, {
      key: "parentNode",
      get: function get() {
        return this.ref.current ? this.ref.current.parentNode : undefined;
      }
    }]);

    return ReferenceProxy;
  }();
  /**
   * Popper.js does not support ref objects from `createRef()` as referenceElement. If we will pass
   * directly `ref`, `ref.current` will be `null` at the render process. We use memoize to keep the
   * same reference between renders.
   *
   * @see https://popper.js.org/popper-documentation.html#referenceObject
   */


  var createReferenceProxy = memoize_1(function (reference) {
    return new ReferenceProxy(isRefObject(reference) ? reference : toRefObject(reference));
  });

  /**
   * A PopupContent displays the content body of a Popover.
   */

  function PopupContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(PopupContent, props);
    var ElementType = getElementType(PopupContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }
  PopupContent.handledProps = ["as", "children", "className", "content"];
  PopupContent.propTypes =  {};
  PopupContent.create = createShorthandFactory(PopupContent, function (children) {
    return {
      children: children
    };
  });

  /**
   * A PopupHeader displays a header in a Popover.
   */

  function PopupHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(PopupHeader, props);
    var ElementType = getElementType(PopupHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }
  PopupHeader.handledProps = ["as", "children", "className", "content"];
  PopupHeader.propTypes =  {};
  PopupHeader.create = createShorthandFactory(PopupHeader, function (children) {
    return {
      children: children
    };
  });

  /**
   * A Popup displays additional information on top of a page.
   */
  var Popup =
  /*#__PURE__*/
  function (_Component) {
    inherits(Popup, _Component);

    function Popup() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Popup);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "state", {});

      defineProperty(assertThisInitialized(_this), "open", false);

      defineProperty(assertThisInitialized(_this), "triggerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "getPortalProps", function () {
        var portalProps = {};
        var _this$props = _this.props,
            on = _this$props.on,
            hoverable = _this$props.hoverable;
        var normalizedOn = isArray_1(on) ? on : [on];

        if (hoverable) {
          portalProps.closeOnPortalMouseLeave = true;
          portalProps.mouseLeaveDelay = 300;
        }

        if (includes_1(normalizedOn, 'hover')) {
          portalProps.openOnTriggerClick = false;
          portalProps.closeOnTriggerClick = false;
          portalProps.openOnTriggerMouseEnter = true;
          portalProps.closeOnTriggerMouseLeave = true; // Taken from SUI: https://git.io/vPmCm

          portalProps.mouseLeaveDelay = 70;
          portalProps.mouseEnterDelay = 50;
        }

        if (includes_1(normalizedOn, 'click')) {
          portalProps.openOnTriggerClick = true;
          portalProps.closeOnTriggerClick = true;
          portalProps.closeOnDocumentClick = true;
        }

        if (includes_1(normalizedOn, 'focus')) {
          portalProps.openOnTriggerFocus = true;
          portalProps.closeOnTriggerBlur = true;
        }

        return portalProps;
      });

      defineProperty(assertThisInitialized(_this), "hideOnScroll", function (e) {
        _this.setState({
          closed: true
        });

        instance.unsub('scroll', _this.hideOnScroll, {
          target: window
        });
        _this.timeoutId = setTimeout(function () {
          _this.setState({
            closed: false
          });
        }, 50);

        _this.handleClose(e);
      });

      defineProperty(assertThisInitialized(_this), "handleClose", function (e) {
        invoke_1(_this.props, 'onClose', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleOpen", function (e) {
        invoke_1(_this.props, 'onOpen', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handlePortalMount", function (e) {
        invoke_1(_this.props, 'onMount', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handlePortalUnmount", function (e) {
        _this.positionUpdate = null;

        invoke_1(_this.props, 'onUnmount', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "renderContent", function (_ref) {
        var popperPlacement = _ref.placement,
            popperRef = _ref.ref,
            scheduleUpdate = _ref.scheduleUpdate,
            popperStyle = _ref.style;
        var _this$props2 = _this.props,
            basic = _this$props2.basic,
            children = _this$props2.children,
            className = _this$props2.className,
            content = _this$props2.content,
            hideOnScroll = _this$props2.hideOnScroll,
            flowing = _this$props2.flowing,
            header = _this$props2.header,
            inverted = _this$props2.inverted,
            size = _this$props2.size,
            style = _this$props2.style,
            wide = _this$props2.wide;
        var contentRestProps = _this.state.contentRestProps;
        _this.positionUpdate = scheduleUpdate;
        var classes = classnames('ui', placementMapping[popperPlacement], size, useKeyOrValueAndKey(wide, 'wide'), useKeyOnly(basic, 'basic'), useKeyOnly(flowing, 'flowing'), useKeyOnly(inverted, 'inverted'), 'popup transition visible', className);
        var ElementType = getElementType(Popup, _this.props);

        var styles = objectSpread({
          // Heads up! We need default styles to get working correctly `flowing`
          left: 'auto',
          right: 'auto'
        }, popperStyle, style);

        return React__default.createElement(Ref, {
          innerRef: popperRef
        }, React__default.createElement(ElementType, _extends_1({}, contentRestProps, {
          className: classes,
          style: styles
        }), isNil(children) ? React__default.createElement(React__default.Fragment, null, PopupHeader.create(header, {
          autoGenerateKey: false
        }), PopupContent.create(content, {
          autoGenerateKey: false
        })) : children, hideOnScroll && React__default.createElement(lib, {
          on: _this.hideOnScroll,
          name: "scroll",
          target: "window"
        })));
      });

      return _this;
    }

    createClass(Popup, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var depsEqual = shallowequal(this.props.popperDependencies, prevProps.popperDependencies);

        if (!depsEqual) {
          this.handleUpdate();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.timeoutId);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        if (this.positionUpdate) this.positionUpdate();
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            context = _this$props3.context,
            disabled = _this$props3.disabled,
            eventsEnabled = _this$props3.eventsEnabled,
            offset = _this$props3.offset,
            pinned = _this$props3.pinned,
            popperModifiers = _this$props3.popperModifiers,
            position = _this$props3.position,
            positionFixed = _this$props3.positionFixed,
            trigger = _this$props3.trigger;
        var _this$state = this.state,
            closed = _this$state.closed,
            portalRestProps = _this$state.portalRestProps;
        if (closed || disabled) return trigger;

        var modifiers = merge_1({
          arrow: {
            enabled: false
          },
          flip: {
            enabled: !pinned
          },
          // There are issues with `keepTogether` and `offset`
          // https://github.com/FezVrasta/popper.js/issues/557
          keepTogether: {
            enabled: !!offset
          },
          offset: {
            offset: offset
          }
        }, popperModifiers);

        var referenceElement = createReferenceProxy(isNil_1(context) ? this.triggerRef : context);

        var mergedPortalProps = objectSpread({}, this.getPortalProps(), portalRestProps);

        return React__default.createElement(Portal, _extends_1({}, mergedPortalProps, {
          onClose: this.handleClose,
          onMount: this.handlePortalMount,
          onOpen: this.handleOpen,
          onUnmount: this.handlePortalUnmount,
          trigger: trigger,
          triggerRef: this.triggerRef
        }), React__default.createElement(Popper$1, {
          eventsEnabled: eventsEnabled,
          modifiers: modifiers,
          placement: positionsMapping[position],
          positionFixed: positionFixed,
          referenceElement: referenceElement
        }, this.renderContent));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        if (state.closed || state.disabled) return {};
        var unhandledProps = getUnhandledProps(Popup, props);

        var contentRestProps = reduce_1(unhandledProps, function (acc, val, key) {
          if (!includes_1(Portal.handledProps, key)) acc[key] = val;
          return acc;
        }, {});

        var portalRestProps = pick_1(unhandledProps, Portal.handledProps);

        return {
          contentRestProps: contentRestProps,
          portalRestProps: portalRestProps
        };
      }
    }]);

    return Popup;
  }(React.Component);

  defineProperty(Popup, "defaultProps", {
    disabled: false,
    eventsEnabled: true,
    offset: 0,
    on: ['click', 'hover'],
    pinned: false,
    position: 'top left'
  });

  defineProperty(Popup, "Content", PopupContent);

  defineProperty(Popup, "Header", PopupHeader);

  defineProperty(Popup, "handledProps", ["as", "basic", "children", "className", "content", "context", "disabled", "eventsEnabled", "flowing", "header", "hideOnScroll", "hoverable", "inverted", "offset", "on", "onClose", "onMount", "onOpen", "onUnmount", "pinned", "popperDependencies", "popperModifiers", "position", "positionFixed", "size", "style", "trigger", "wide"]);
  Popup.propTypes =  {};

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsFinite = _root.isFinite,
      nativeMin$4 = Math.min;

  /**
   * Creates a function like `_.round`.
   *
   * @private
   * @param {string} methodName The name of the `Math` method to use when rounding.
   * @returns {Function} Returns the new round function.
   */
  function createRound(methodName) {
    var func = Math[methodName];
    return function(number, precision) {
      number = toNumber_1(number);
      precision = precision == null ? 0 : nativeMin$4(toInteger_1(precision), 292);
      if (precision && nativeIsFinite(number)) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        var pair = (toString_1(number) + 'e').split('e'),
            value = func(pair[0] + 'e' + (+pair[1] + precision));

        pair = (toString_1(value) + 'e').split('e');
        return +(pair[0] + 'e' + (+pair[1] - precision));
      }
      return func(number);
    };
  }

  var _createRound = createRound;

  /**
   * Computes `number` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */
  var round = _createRound('round');

  var round_1 = round;

  /**
   * Clamps `number` within the inclusive `lower` and `upper` bounds.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Number
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   * @example
   *
   * _.clamp(-10, -5, 5);
   * // => -5
   *
   * _.clamp(10, -5, 5);
   * // => 5
   */
  function clamp(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = toNumber_1(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = toNumber_1(lower);
      lower = lower === lower ? lower : 0;
    }
    return _baseClamp(toNumber_1(number), lower, upper);
  }

  var clamp_1 = clamp;

  /**
   * A progress bar shows the progression of a task.
   */

  var Progress =
  /*#__PURE__*/
  function (_Component) {
    inherits(Progress, _Component);

    function Progress() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Progress);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Progress)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "calculatePercent", function () {
        var _this$props = _this.props,
            percent = _this$props.percent,
            total = _this$props.total,
            value = _this$props.value;
        if (!isUndefined_1(percent)) return percent;
        if (!isUndefined_1(total) && !isUndefined_1(value)) return value / total * 100;
      });

      defineProperty(assertThisInitialized(_this), "computeValueText", function (percent) {
        var _this$props2 = _this.props,
            progress = _this$props2.progress,
            total = _this$props2.total,
            value = _this$props2.value;
        if (progress === 'value') return value;
        if (progress === 'ratio') return "".concat(value, "/").concat(total);
        return "".concat(percent, "%");
      });

      defineProperty(assertThisInitialized(_this), "getPercent", function () {
        var _this$props3 = _this.props,
            precision = _this$props3.precision,
            progress = _this$props3.progress,
            total = _this$props3.total,
            value = _this$props3.value;

        var percent = clamp_1(_this.calculatePercent(), 0, 100);

        if (!isUndefined_1(total) && !isUndefined_1(value) && progress === 'value') {
          return value / total * 100;
        }

        if (progress === 'value') return value;
        if (isUndefined_1(precision)) return percent;
        return round_1(percent, precision);
      });

      defineProperty(assertThisInitialized(_this), "isAutoSuccess", function () {
        var _this$props4 = _this.props,
            autoSuccess = _this$props4.autoSuccess,
            percent = _this$props4.percent,
            total = _this$props4.total,
            value = _this$props4.value;
        return autoSuccess && (percent >= 100 || value >= total);
      });

      defineProperty(assertThisInitialized(_this), "renderLabel", function () {
        var _this$props5 = _this.props,
            children = _this$props5.children,
            content = _this$props5.content,
            label = _this$props5.label;
        if (!isNil(children)) return React__default.createElement("div", {
          className: "label"
        }, children);
        if (!isNil(content)) return React__default.createElement("div", {
          className: "label"
        }, content);
        return createHTMLDivision(label, {
          autoGenerateKey: false,
          defaultProps: {
            className: 'label'
          }
        });
      });

      defineProperty(assertThisInitialized(_this), "renderProgress", function (percent) {
        var _this$props6 = _this.props,
            precision = _this$props6.precision,
            progress = _this$props6.progress;
        if (!progress && isUndefined_1(precision)) return;
        return React__default.createElement("div", {
          className: "progress"
        }, _this.computeValueText(percent));
      });

      return _this;
    }

    createClass(Progress, [{
      key: "render",
      value: function render() {
        var _this$props7 = this.props,
            active = _this$props7.active,
            attached = _this$props7.attached,
            className = _this$props7.className,
            color = _this$props7.color,
            disabled = _this$props7.disabled,
            error = _this$props7.error,
            indicating = _this$props7.indicating,
            inverted = _this$props7.inverted,
            size = _this$props7.size,
            success = _this$props7.success,
            warning = _this$props7.warning;
        var classes = classnames('ui', color, size, useKeyOnly(active || indicating, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(indicating, 'indicating'), useKeyOnly(inverted, 'inverted'), useKeyOnly(success || this.isAutoSuccess(), 'success'), useKeyOnly(warning, 'warning'), useValueAndKey(attached, 'attached'), 'progress', className);
        var rest = getUnhandledProps(Progress, this.props);
        var ElementType = getElementType(Progress, this.props);
        var percent = this.getPercent() || 0;
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          "data-percent": Math.floor(percent)
        }), React__default.createElement("div", {
          className: "bar",
          style: {
            width: "".concat(percent, "%")
          }
        }, this.renderProgress(percent)), this.renderLabel());
      }
    }]);

    return Progress;
  }(React.Component);

  defineProperty(Progress, "handledProps", ["active", "as", "attached", "autoSuccess", "children", "className", "color", "content", "disabled", "error", "indicating", "inverted", "label", "percent", "precision", "progress", "size", "success", "total", "value", "warning"]);

  Progress.propTypes =  {};

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$2 = 9007199254740991;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH$2 = 4294967295;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin$5 = Math.min;

  /**
   * Invokes the iteratee `n` times, returning an array of the results of
   * each invocation. The iteratee is invoked with one argument; (index).
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.times(3, String);
   * // => ['0', '1', '2']
   *
   *  _.times(4, _.constant(0));
   * // => [0, 0, 0, 0]
   */
  function times(n, iteratee) {
    n = toInteger_1(n);
    if (n < 1 || n > MAX_SAFE_INTEGER$2) {
      return [];
    }
    var index = MAX_ARRAY_LENGTH$2,
        length = nativeMin$5(n, MAX_ARRAY_LENGTH$2);

    iteratee = _castFunction(iteratee);
    n -= MAX_ARRAY_LENGTH$2;

    var result = _baseTimes(length, iteratee);
    while (++index < n) {
      iteratee(index);
    }
    return result;
  }

  var times_1 = times;

  /**
   * An internal icon sub-component for Rating component
   */

  var RatingIcon =
  /*#__PURE__*/
  function (_Component) {
    inherits(RatingIcon, _Component);

    function RatingIcon() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, RatingIcon);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(RatingIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        invoke_1(_this.props, 'onClick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleKeyUp", function (e) {
        invoke_1(_this.props, 'onKeyUp', e, _this.props);

        switch (keyboardKey_1.getCode(e)) {
          case keyboardKey_1.Enter:
          case keyboardKey_1.Spacebar:
            e.preventDefault();

            invoke_1(_this.props, 'onClick', e, _this.props);

            break;
        }
      });

      defineProperty(assertThisInitialized(_this), "handleMouseEnter", function (e) {
        invoke_1(_this.props, 'onMouseEnter', e, _this.props);
      });

      return _this;
    }

    createClass(RatingIcon, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            className = _this$props.className,
            selected = _this$props.selected;
        var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(selected, 'selected'), 'icon', className);
        var rest = getUnhandledProps(RatingIcon, this.props);
        var ElementType = getElementType(RatingIcon, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick,
          onKeyUp: this.handleKeyUp,
          onMouseEnter: this.handleMouseEnter,
          role: "radio"
        }));
      }
    }]);

    return RatingIcon;
  }(React.Component);

  defineProperty(RatingIcon, "defaultProps", {
    as: 'i'
  });

  defineProperty(RatingIcon, "handledProps", ["active", "as", "className", "index", "onClick", "onKeyUp", "onMouseEnter", "selected"]);
  RatingIcon.propTypes =  {};

  /**
   * A rating indicates user interest in content.
   */

  var Rating =
  /*#__PURE__*/
  function (_Component) {
    inherits(Rating, _Component);

    function Rating() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Rating);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Rating)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      defineProperty(assertThisInitialized(_this), "handleIconClick", function (e, _ref) {
        var index = _ref.index;
        var _this$props = _this.props,
            clearable = _this$props.clearable,
            disabled = _this$props.disabled,
            maxRating = _this$props.maxRating,
            onRate = _this$props.onRate;
        var rating = _this.state.rating;
        if (disabled) return; // default newRating is the clicked icon
        // allow toggling a binary rating
        // allow clearing ratings

        var newRating = index + 1;

        if (clearable === 'auto' && maxRating === 1) {
          newRating = +!rating;
        } else if (clearable === true && newRating === rating) {
          newRating = 0;
        } // set rating


        _this.trySetState({
          rating: newRating,
          isSelecting: false
        });

        if (onRate) onRate(e, objectSpread({}, _this.props, {
          rating: newRating
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleIconMouseEnter", function (e, _ref2) {
        var index = _ref2.index;
        if (_this.props.disabled) return;

        _this.setState({
          selectedIndex: index,
          isSelecting: true
        });
      });

      defineProperty(assertThisInitialized(_this), "handleMouseLeave", function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        invoke_1.apply(void 0, [_this.props, 'onMouseLeave'].concat(args));

        if (_this.props.disabled) return;

        _this.setState({
          selectedIndex: -1,
          isSelecting: false
        });
      });

      return _this;
    }

    createClass(Rating, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            className = _this$props2.className,
            disabled = _this$props2.disabled,
            icon = _this$props2.icon,
            maxRating = _this$props2.maxRating,
            size = _this$props2.size;
        var _this$state = this.state,
            rating = _this$state.rating,
            selectedIndex = _this$state.selectedIndex,
            isSelecting = _this$state.isSelecting;
        var classes = classnames('ui', icon, size, useKeyOnly(disabled, 'disabled'), useKeyOnly(isSelecting && !disabled && selectedIndex >= 0, 'selected'), 'rating', className);
        var rest = getUnhandledProps(Rating, this.props);
        var ElementType = getElementType(Rating, this.props);
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          role: "radiogroup",
          onMouseLeave: this.handleMouseLeave,
          tabIndex: disabled ? 0 : -1
        }), times_1(maxRating, function (i) {
          return React__default.createElement(RatingIcon, {
            tabIndex: disabled ? -1 : 0,
            active: rating >= i + 1,
            "aria-checked": rating === i + 1,
            "aria-posinset": i + 1,
            "aria-setsize": maxRating,
            index: i,
            key: i,
            onClick: _this2.handleIconClick,
            onMouseEnter: _this2.handleIconMouseEnter,
            selected: selectedIndex >= i && isSelecting
          });
        }));
      }
    }]);

    return Rating;
  }(AutoControlledComponent);

  defineProperty(Rating, "autoControlledProps", ['rating']);

  defineProperty(Rating, "defaultProps", {
    clearable: 'auto',
    maxRating: 1
  });

  defineProperty(Rating, "Icon", RatingIcon);

  defineProperty(Rating, "handledProps", ["as", "className", "clearable", "defaultRating", "disabled", "icon", "maxRating", "onRate", "rating", "size"]);
  Rating.propTypes =  {};

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var objectWithoutProperties = _objectWithoutProperties;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_PARTIAL_RIGHT_FLAG$3 = 64;

  /**
   * This method is like `_.partial` except that partially applied arguments
   * are appended to the arguments it receives.
   *
   * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method doesn't set the "length" property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Function
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * function greet(greeting, name) {
   *   return greeting + ' ' + name;
   * }
   *
   * var greetFred = _.partialRight(greet, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   *
   * // Partially applied with placeholders.
   * var sayHelloTo = _.partialRight(greet, 'hello', _);
   * sayHelloTo('fred');
   * // => 'hello fred'
   */
  var partialRight = _baseRest(function(func, partials) {
    var holders = _replaceHolders(partials, _getHolder(partialRight));
    return _createWrap(func, WRAP_PARTIAL_RIGHT_FLAG$3, undefined, partials, holders);
  });

  // Assign default placeholders.
  partialRight.placeholder = {};

  var partialRight_1 = partialRight;

  function SearchCategoryLayout(props) {
    var categoryContent = props.categoryContent,
        resultsContent = props.resultsContent;
    return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: "name"
    }, categoryContent), React__default.createElement("div", {
      className: "results"
    }, resultsContent));
  }

  SearchCategoryLayout.handledProps = ["categoryContent", "resultsContent"];
  SearchCategoryLayout.propTypes =  {};

  function SearchCategory(props) {
    var active = props.active,
        children = props.children,
        className = props.className,
        content = props.content,
        layoutRenderer = props.layoutRenderer,
        renderer = props.renderer;
    var classes = classnames(useKeyOnly(active, 'active'), 'category', className);
    var rest = getUnhandledProps(SearchCategory, props);
    var ElementType = getElementType(SearchCategory, props);
    var categoryContent = renderer(props);
    var resultsContent = isNil(children) ? content : children;
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), layoutRenderer({
      categoryContent: categoryContent,
      resultsContent: resultsContent
    }));
  }

  SearchCategory.handledProps = ["active", "as", "children", "className", "content", "layoutRenderer", "name", "renderer", "results"];
  SearchCategory.defaultProps = {
    layoutRenderer: SearchCategoryLayout,
    renderer: function renderer(_ref) {
      var name = _ref.name;
      return name;
    }
  };
  SearchCategory.propTypes =  {};

  // image. However, optionally wrapping it makes this function a lot more
  // complicated and harder to read. Since always wrapping it doesn't affect
  // the style in any way let's just do that.
  //
  // Note: To avoid requiring a wrapping div, we return an array here so to
  // prevent rendering issues each node needs a unique key.

  var defaultRenderer = function defaultRenderer(_ref) {
    var image = _ref.image,
        price = _ref.price,
        title = _ref.title,
        description = _ref.description;
    return [image && React__default.createElement("div", {
      key: "image",
      className: "image"
    }, createHTMLImage(image, {
      autoGenerateKey: false
    })), React__default.createElement("div", {
      key: "content",
      className: "content"
    }, price && React__default.createElement("div", {
      className: "price"
    }, price), title && React__default.createElement("div", {
      className: "title"
    }, title), description && React__default.createElement("div", {
      className: "description"
    }, description))];
  };

  defaultRenderer.handledProps = [];

  var SearchResult =
  /*#__PURE__*/
  function (_Component) {
    inherits(SearchResult, _Component);

    function SearchResult() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, SearchResult);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(SearchResult)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var onClick = _this.props.onClick;
        if (onClick) onClick(e, _this.props);
      });

      return _this;
    }

    createClass(SearchResult, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            active = _this$props.active,
            className = _this$props.className,
            renderer = _this$props.renderer;
        var classes = classnames(useKeyOnly(active, 'active'), 'result', className);
        var rest = getUnhandledProps(SearchResult, this.props);
        var ElementType = getElementType(SearchResult, this.props); // Note: You technically only need the 'content' wrapper when there's an
        // image. However, optionally wrapping it makes this function a lot more
        // complicated and harder to read. Since always wrapping it doesn't affect
        // the style in any way let's just do that.

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onClick: this.handleClick
        }), renderer(this.props));
      }
    }]);

    return SearchResult;
  }(React.Component);

  defineProperty(SearchResult, "defaultProps", {
    renderer: defaultRenderer
  });

  defineProperty(SearchResult, "handledProps", ["active", "as", "className", "content", "description", "id", "image", "onClick", "price", "renderer", "title"]);
  SearchResult.propTypes =  {};

  function SearchResults(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('results transition', className);
    var rest = getUnhandledProps(SearchResults, props);
    var ElementType = getElementType(SearchResults, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  SearchResults.handledProps = ["as", "children", "className", "content"];
  SearchResults.propTypes =  {};

  /**
   * A search module allows a user to query for results from a selection of data
   */
  var Search =
  /*#__PURE__*/
  function (_Component) {
    inherits(Search, _Component);

    function Search() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Search);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleResultSelect", function (e, result) {
        invoke_1(_this.props, 'onResultSelect', e, objectSpread({}, _this.props, {
          result: result
        }));
      });

      defineProperty(assertThisInitialized(_this), "handleSelectionChange", function (e) {
        var result = _this.getSelectedResult();

        invoke_1(_this.props, 'onSelectionChange', e, objectSpread({}, _this.props, {
          result: result
        }));
      });

      defineProperty(assertThisInitialized(_this), "closeOnEscape", function (e) {
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Escape) return;
        e.preventDefault();

        _this.close();
      });

      defineProperty(assertThisInitialized(_this), "moveSelectionOnKeyDown", function (e) {
        switch (keyboardKey_1.getCode(e)) {
          case keyboardKey_1.ArrowDown:
            e.preventDefault();

            _this.moveSelectionBy(e, 1);

            break;

          case keyboardKey_1.ArrowUp:
            e.preventDefault();

            _this.moveSelectionBy(e, -1);

            break;
        }
      });

      defineProperty(assertThisInitialized(_this), "selectItemOnEnter", function (e) {
        if (keyboardKey_1.getCode(e) !== keyboardKey_1.Enter) return;

        var result = _this.getSelectedResult(); // prevent selecting null if there was no selected item value


        if (!result) return;
        e.preventDefault(); // notify the onResultSelect prop that the user is trying to change value

        _this.setValue(result.title);

        _this.handleResultSelect(e, result);

        _this.close();
      });

      defineProperty(assertThisInitialized(_this), "closeOnDocumentClick", function (e) {
        _this.close();
      });

      defineProperty(assertThisInitialized(_this), "handleMouseDown", function (e) {
        _this.isMouseDown = true;

        invoke_1(_this.props, 'onMouseDown', e, _this.props);

        instance.sub('mouseup', _this.handleDocumentMouseUp);
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentMouseUp", function () {
        _this.isMouseDown = false;
        instance.unsub('mouseup', _this.handleDocumentMouseUp);
      });

      defineProperty(assertThisInitialized(_this), "handleInputClick", function (e) {
        // prevent closeOnDocumentClick()
        e.nativeEvent.stopImmediatePropagation();

        _this.tryOpen();
      });

      defineProperty(assertThisInitialized(_this), "handleItemClick", function (e, _ref) {
        var id = _ref.id;

        var result = _this.getSelectedResult(id); // prevent closeOnDocumentClick()


        e.nativeEvent.stopImmediatePropagation(); // notify the onResultSelect prop that the user is trying to change value

        _this.setValue(result.title);

        _this.handleResultSelect(e, result);

        _this.close();
      });

      defineProperty(assertThisInitialized(_this), "handleItemMouseDown", function (e) {
        // Heads up! We should prevent default to prevent blur events.
        // https://github.com/Semantic-Org/Semantic-UI-React/issues/3298
        e.preventDefault();
      });

      defineProperty(assertThisInitialized(_this), "handleFocus", function (e) {
        invoke_1(_this.props, 'onFocus', e, _this.props);

        _this.setState({
          focus: true
        });
      });

      defineProperty(assertThisInitialized(_this), "handleBlur", function (e) {
        invoke_1(_this.props, 'onBlur', e, _this.props);

        _this.setState({
          focus: false
        });
      });

      defineProperty(assertThisInitialized(_this), "handleSearchChange", function (e) {
        // prevent propagating to this.props.onChange()
        e.stopPropagation();
        var minCharacters = _this.props.minCharacters;
        var open = _this.state.open;
        var newQuery = e.target.value;

        invoke_1(_this.props, 'onSearchChange', e, objectSpread({}, _this.props, {
          value: newQuery
        })); // open search dropdown on search query


        if (newQuery.length < minCharacters) {
          _this.close();
        } else if (!open) {
          _this.tryOpen(newQuery);
        }

        _this.setValue(newQuery);
      });

      defineProperty(assertThisInitialized(_this), "getFlattenedResults", function () {
        var _this$props = _this.props,
            category = _this$props.category,
            results = _this$props.results;
        return !category ? results : reduce_1(results, function (memo, categoryData) {
          return memo.concat(categoryData.results);
        }, []);
      });

      defineProperty(assertThisInitialized(_this), "getSelectedResult", function () {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selectedIndex;

        var results = _this.getFlattenedResults();

        return get_1(results, index);
      });

      defineProperty(assertThisInitialized(_this), "setValue", function (value) {
        var selectFirstResult = _this.props.selectFirstResult;

        _this.trySetState({
          value: value,
          selectedIndex: selectFirstResult ? 0 : -1
        });
      });

      defineProperty(assertThisInitialized(_this), "moveSelectionBy", function (e, offset) {
        var selectedIndex = _this.state.selectedIndex;

        var results = _this.getFlattenedResults();

        var lastIndex = results.length - 1; // next is after last, wrap to beginning
        // next is before first, wrap to end

        var nextIndex = selectedIndex + offset;
        if (nextIndex > lastIndex) nextIndex = 0;else if (nextIndex < 0) nextIndex = lastIndex;

        _this.setState({
          selectedIndex: nextIndex
        });

        _this.scrollSelectedItemIntoView();

        _this.handleSelectionChange(e);
      });

      defineProperty(assertThisInitialized(_this), "scrollSelectedItemIntoView", function () {
        // Do not access document when server side rendering
        if (!isBrowser()) return;
        var menu = document.querySelector('.ui.search.active.visible .results.visible');
        var item = menu.querySelector('.result.active');
        if (!item) return;
        var isOutOfUpperView = item.offsetTop < menu.scrollTop;
        var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

        if (isOutOfUpperView) {
          menu.scrollTop = item.offsetTop;
        } else if (isOutOfLowerView) {
          menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
        }
      });

      defineProperty(assertThisInitialized(_this), "tryOpen", function () {
        var currentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.value;
        var minCharacters = _this.props.minCharacters;
        if (currentValue.length < minCharacters) return;

        _this.open();
      });

      defineProperty(assertThisInitialized(_this), "open", function () {
        _this.trySetState({
          open: true
        });
      });

      defineProperty(assertThisInitialized(_this), "close", function () {
        _this.trySetState({
          open: false
        });
      });

      defineProperty(assertThisInitialized(_this), "renderSearchInput", function (rest) {
        var _this$props2 = _this.props,
            icon = _this$props2.icon,
            input = _this$props2.input;
        var value = _this.state.value;
        return Input.create(input, {
          autoGenerateKey: false,
          defaultProps: objectSpread({}, rest, {
            icon: icon,
            input: {
              className: 'prompt',
              tabIndex: '0',
              autoComplete: 'off'
            },
            onChange: _this.handleSearchChange,
            onClick: _this.handleInputClick,
            value: value
          })
        });
      });

      defineProperty(assertThisInitialized(_this), "renderNoResults", function () {
        var _this$props3 = _this.props,
            noResultsDescription = _this$props3.noResultsDescription,
            noResultsMessage = _this$props3.noResultsMessage;
        return React__default.createElement("div", {
          className: "message empty"
        }, React__default.createElement("div", {
          className: "header"
        }, noResultsMessage), noResultsDescription && React__default.createElement("div", {
          className: "description"
        }, noResultsDescription));
      });

      defineProperty(assertThisInitialized(_this), "renderResult", function (_ref2, index, _array) {
        var childKey = _ref2.childKey,
            result = objectWithoutProperties(_ref2, ["childKey"]);

        var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var resultRenderer = _this.props.resultRenderer;
        var selectedIndex = _this.state.selectedIndex;
        var offsetIndex = index + offset;
        return React__default.createElement(SearchResult, _extends_1({
          key: childKey || result.id || result.title,
          active: selectedIndex === offsetIndex,
          onClick: _this.handleItemClick,
          onMouseDown: _this.handleItemMouseDown,
          renderer: resultRenderer
        }, result, {
          id: offsetIndex // Used to lookup the result on item click

        }));
      });

      defineProperty(assertThisInitialized(_this), "renderResults", function () {
        var results = _this.props.results;
        return map_1(results, _this.renderResult);
      });

      defineProperty(assertThisInitialized(_this), "renderCategories", function () {
        var _this$props4 = _this.props,
            categoryLayoutRenderer = _this$props4.categoryLayoutRenderer,
            categoryRenderer = _this$props4.categoryRenderer,
            categories = _this$props4.results;
        var selectedIndex = _this.state.selectedIndex;
        var count = 0;
        return map_1(categories, function (_ref3) {
          var childKey = _ref3.childKey,
              category = objectWithoutProperties(_ref3, ["childKey"]);

          var categoryProps = objectSpread({
            key: childKey || category.name,
            active: inRange_1(selectedIndex, count, count + category.results.length),
            layoutRenderer: categoryLayoutRenderer,
            renderer: categoryRenderer
          }, category);

          var renderFn = partialRight_1(_this.renderResult, count);

          count += category.results.length;
          return React__default.createElement(SearchCategory, categoryProps, category.results.map(renderFn));
        });
      });

      defineProperty(assertThisInitialized(_this), "renderMenuContent", function () {
        var _this$props5 = _this.props,
            category = _this$props5.category,
            showNoResults = _this$props5.showNoResults,
            results = _this$props5.results;

        if (isEmpty_1(results)) {
          return showNoResults ? _this.renderNoResults() : null;
        }

        return category ? _this.renderCategories() : _this.renderResults();
      });

      defineProperty(assertThisInitialized(_this), "renderResultsMenu", function () {
        var open = _this.state.open;
        var resultsClasses = open ? 'visible' : '';

        var menuContent = _this.renderMenuContent();

        if (!menuContent) return;
        return React__default.createElement(SearchResults, {
          className: resultsClasses
        }, menuContent);
      });

      return _this;
    }

    createClass(Search, [{
      key: "UNSAFE_componentWillMount",
      // eslint-disable-next-line camelcase
      value: function UNSAFE_componentWillMount() {
        var _this$state = this.state,
            open = _this$state.open,
            value = _this$state.value;
        this.setValue(value);
        if (open) this.open();
      } // eslint-disable-next-line camelcase

    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        get$1(getPrototypeOf(Search.prototype), "UNSAFE_componentWillReceiveProps", this).call(this, nextProps);

        if (!shallowequal(nextProps.value, this.props.value)) {
          this.setValue(nextProps.value);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(nextProps, this.props) || !shallowequal(nextState, this.state);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        // eslint-disable-line complexity
        // focused / blurred
        if (!prevState.focus && this.state.focus) {
          if (!this.isMouseDown) {
            this.tryOpen();
          }

          if (this.state.open) {
            instance.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
          }
        } else if (prevState.focus && !this.state.focus) {
          if (!this.isMouseDown) {
            this.close();
          }

          instance.unsub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        } // opened / closed


        if (!prevState.open && this.state.open) {
          this.open();
          instance.sub('click', this.closeOnDocumentClick);
          instance.sub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        } else if (prevState.open && !this.state.open) {
          this.close();
          instance.unsub('click', this.closeOnDocumentClick);
          instance.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        instance.unsub('click', this.closeOnDocumentClick);
        instance.unsub('keydown', [this.closeOnEscape, this.moveSelectionOnKeyDown, this.selectItemOnEnter]);
      } // ----------------------------------------
      // Document Event Handlers
      // ----------------------------------------

    }, {
      key: "render",
      value: function render() {
        var _this$state2 = this.state,
            searchClasses = _this$state2.searchClasses,
            focus = _this$state2.focus,
            open = _this$state2.open;
        var _this$props6 = this.props,
            aligned = _this$props6.aligned,
            category = _this$props6.category,
            className = _this$props6.className,
            fluid = _this$props6.fluid,
            loading = _this$props6.loading,
            size = _this$props6.size; // Classes

        var classes = classnames('ui', open && 'active visible', size, searchClasses, useKeyOnly(category, 'category'), useKeyOnly(focus, 'focus'), useKeyOnly(fluid, 'fluid'), useKeyOnly(loading, 'loading'), useValueAndKey(aligned, 'aligned'), 'search', className);
        var unhandled = getUnhandledProps(Search, this.props);
        var ElementType = getElementType(Search, this.props);

        var _partitionHTMLProps = partitionHTMLProps(unhandled, {
          htmlProps: htmlInputAttrs
        }),
            _partitionHTMLProps2 = slicedToArray(_partitionHTMLProps, 2),
            htmlInputProps = _partitionHTMLProps2[0],
            rest = _partitionHTMLProps2[1];

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onMouseDown: this.handleMouseDown
        }), this.renderSearchInput(htmlInputProps), this.renderResultsMenu());
      }
    }]);

    return Search;
  }(AutoControlledComponent);

  defineProperty(Search, "defaultProps", {
    icon: 'search',
    input: 'text',
    minCharacters: 1,
    noResultsMessage: 'No results found.',
    showNoResults: true
  });

  defineProperty(Search, "autoControlledProps", ['open', 'value']);

  defineProperty(Search, "Category", SearchCategory);

  defineProperty(Search, "Result", SearchResult);

  defineProperty(Search, "Results", SearchResults);

  defineProperty(Search, "handledProps", ["aligned", "as", "category", "categoryLayoutRenderer", "categoryRenderer", "className", "defaultOpen", "defaultValue", "fluid", "icon", "input", "loading", "minCharacters", "noResultsDescription", "noResultsMessage", "onBlur", "onFocus", "onMouseDown", "onResultSelect", "onSearchChange", "onSelectionChange", "open", "resultRenderer", "results", "selectFirstResult", "showNoResults", "size", "value"]);
  Search.propTypes =  {};

  var isActionSupported = function isActionSupported(targetRef, method) {
    return targetRef && !!targetRef.current && !!targetRef.current[method];
  };

  var useEventListener = function useEventListener(options) {
    var capture = options.capture,
        listener = options.listener,
        type = options.type,
        targetRef = options.targetRef;
    var latestListener = React.useRef(listener);
    latestListener.current = listener;
    var eventHandler = React.useCallback(function (event) {
      return latestListener.current(event);
    }, []);
    React.useEffect(function () {
      if (isActionSupported(targetRef, 'addEventListener')) {
        targetRef.current.addEventListener(type, eventHandler, capture);
      }

      return function () {
        if (isActionSupported(targetRef, 'removeEventListener')) {
          targetRef.current.removeEventListener(type, eventHandler, capture);
        }
      };
    }, [capture, targetRef, type]);
  };

  function EventListener(props) {
    useEventListener(props);
    return null;
  }

  EventListener.displayName = 'EventListener'; // TODO: use Babel plugin for this

  EventListener.propTypes =  {};
  EventListener.defaultProps = {
    capture: false
  };

  var documentRef = {
    current: typeof document === 'undefined' ? null : document
  };

  /**
   * A pushable sub-component for Sidebar.
   */

  function SidebarPushable(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames('pushable', className);
    var rest = getUnhandledProps(SidebarPushable, props);
    var ElementType = getElementType(SidebarPushable, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  SidebarPushable.handledProps = ["as", "children", "className", "content"];
  SidebarPushable.propTypes =  {};

  /**
   * A pushable sub-component for Sidebar.
   */

  function SidebarPusher(props) {
    var className = props.className,
        dimmed = props.dimmed,
        children = props.children,
        content = props.content;
    var classes = classnames('pusher', useKeyOnly(dimmed, 'dimmed'), className);
    var rest = getUnhandledProps(SidebarPusher, props);
    var ElementType = getElementType(SidebarPusher, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  SidebarPusher.handledProps = ["as", "children", "className", "content", "dimmed"];
  SidebarPusher.propTypes =  {};

  /**
   * A sidebar hides additional content beside a page.
   */

  var Sidebar =
  /*#__PURE__*/
  function (_Component) {
    inherits(Sidebar, _Component);

    function Sidebar(props) {
      var _this;

      classCallCheck(this, Sidebar);

      _this = possibleConstructorReturn(this, getPrototypeOf(Sidebar).call(this, props));

      defineProperty(assertThisInitialized(_this), "ref", React.createRef());

      defineProperty(assertThisInitialized(_this), "handleAnimationStart", function () {
        var visible = _this.props.visible;
        var callback = visible ? 'onVisible' : 'onHide';
        clearTimeout(_this.animationTimer);
        _this.animationTimer = setTimeout(_this.handleAnimationEnd, Sidebar.animationDuration);

        if (_this.skipNextCallback) {
          _this.skipNextCallback = false;
          return;
        }

        invoke_1(_this.props, callback, null, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleAnimationEnd", function () {
        var visible = _this.props.visible;
        var callback = visible ? 'onShow' : 'onHidden';

        _this.setState({
          animationTick: 0
        });

        invoke_1(_this.props, callback, null, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "handleDocumentClick", function (e) {
        if (!doesNodeContainClick(_this.ref.current, e)) {
          _this.skipNextCallback = true;

          invoke_1(_this.props, 'onHide', e, objectSpread({}, _this.props, {
            visible: false
          }));
        }
      });

      _this.state = {
        animationTick: 0,
        visible: props.visible
      };
      return _this;
    }

    createClass(Sidebar, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.state.animationTick > prevState.animationTick) {
          this.handleAnimationStart();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        clearTimeout(this.animationTimer);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            animation = _this$props.animation,
            className = _this$props.className,
            children = _this$props.children,
            content = _this$props.content,
            direction = _this$props.direction,
            target = _this$props.target,
            visible = _this$props.visible,
            width = _this$props.width;
        var animationTick = this.state.animationTick;
        var classes = classnames('ui', animation, direction, width, useKeyOnly(animationTick > 0, 'animating'), useKeyOnly(visible, 'visible'), 'sidebar', className);
        var rest = getUnhandledProps(Sidebar, this.props);
        var ElementType = getElementType(Sidebar, this.props);
        var targetRef = isRefObject(target) ? target : toRefObject(target);
        return React__default.createElement(Ref, {
          innerRef: this.ref
        }, React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes
        }), isNil(children) ? content : children, visible && React__default.createElement(EventListener, {
          listener: this.handleDocumentClick,
          targetRef: targetRef,
          type: "click"
        })));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        // We use `animationTick` to understand when an animation should be scheduled
        var tickIncrement = !!props.visible === !!state.visible ? 0 : 1;
        return {
          animationTick: state.animationTick + tickIncrement,
          visible: props.visible
        };
      }
    }]);

    return Sidebar;
  }(React.Component);

  defineProperty(Sidebar, "defaultProps", {
    direction: 'left',
    target: documentRef,
    visible: false
  });

  defineProperty(Sidebar, "animationDuration", 500);

  defineProperty(Sidebar, "autoControlledProps", ['visible']);

  defineProperty(Sidebar, "Pushable", SidebarPushable);

  defineProperty(Sidebar, "Pusher", SidebarPusher);

  defineProperty(Sidebar, "handledProps", ["animation", "as", "children", "className", "content", "direction", "onHidden", "onHide", "onShow", "onVisible", "target", "visible", "width"]);

  Sidebar.propTypes =  {};

  /**
   * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
   */

  var Sticky =
  /*#__PURE__*/
  function (_Component) {
    inherits(Sticky, _Component);

    function Sticky() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Sticky);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Sticky)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "state", {
        sticky: false
      });

      defineProperty(assertThisInitialized(_this), "stickyRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "triggerRef", React.createRef());

      defineProperty(assertThisInitialized(_this), "addListeners", function (props) {
        var scrollContext = props.scrollContext;
        var scrollContextNode = isRefObject(scrollContext) ? scrollContext.current : scrollContext;

        if (scrollContextNode) {
          instance.sub('resize', _this.handleUpdate, {
            target: scrollContextNode
          });
          instance.sub('scroll', _this.handleUpdate, {
            target: scrollContextNode
          });
        }
      });

      defineProperty(assertThisInitialized(_this), "removeListeners", function () {
        var scrollContext = _this.props.scrollContext;
        var scrollContextNode = isRefObject(scrollContext) ? scrollContext.current : scrollContext;

        if (scrollContextNode) {
          instance.unsub('resize', _this.handleUpdate, {
            target: scrollContextNode
          });
          instance.unsub('scroll', _this.handleUpdate, {
            target: scrollContextNode
          });
        }
      });

      defineProperty(assertThisInitialized(_this), "update", function (e) {
        var pushing = _this.state.pushing;
        _this.ticking = false;

        _this.assignRects();

        if (pushing) {
          if (_this.didReachStartingPoint()) return _this.stickToContextTop(e);
          if (_this.didTouchScreenBottom()) return _this.stickToScreenBottom(e);
          return _this.stickToContextBottom(e);
        }

        if (_this.isOversized()) {
          if (_this.contextRect.top > 0) return _this.stickToContextTop(e);
          if (_this.contextRect.bottom < window.innerHeight) return _this.stickToContextBottom(e);
        }

        if (_this.didTouchScreenTop()) {
          if (_this.didReachContextBottom()) return _this.stickToContextBottom(e);
          return _this.stickToScreenTop(e);
        }

        return _this.stickToContextTop(e);
      });

      defineProperty(assertThisInitialized(_this), "handleUpdate", function (e) {
        if (!_this.ticking) {
          _this.ticking = true;
          _this.frameId = requestAnimationFrame(function () {
            return _this.update(e);
          });
        }
      });

      defineProperty(assertThisInitialized(_this), "assignRects", function () {
        var context = _this.props.context;
        var contextNode = isRefObject(context) ? context.current : context || document.body;
        _this.triggerRect = _this.triggerRef.current.getBoundingClientRect();
        _this.contextRect = contextNode.getBoundingClientRect();
        _this.stickyRect = _this.stickyRef.current.getBoundingClientRect();
      });

      defineProperty(assertThisInitialized(_this), "didReachContextBottom", function () {
        var offset = _this.props.offset;
        return _this.stickyRect.height + offset >= _this.contextRect.bottom;
      });

      defineProperty(assertThisInitialized(_this), "didReachStartingPoint", function () {
        return _this.stickyRect.top <= _this.triggerRect.top;
      });

      defineProperty(assertThisInitialized(_this), "didTouchScreenTop", function () {
        return _this.triggerRect.top < _this.props.offset;
      });

      defineProperty(assertThisInitialized(_this), "didTouchScreenBottom", function () {
        var bottomOffset = _this.props.bottomOffset;
        return _this.contextRect.bottom + bottomOffset > window.innerHeight;
      });

      defineProperty(assertThisInitialized(_this), "isOversized", function () {
        return _this.stickyRect.height > window.innerHeight;
      });

      defineProperty(assertThisInitialized(_this), "pushing", function (pushing) {
        var possible = _this.props.pushing;
        if (possible) _this.setState({
          pushing: pushing
        });
      });

      defineProperty(assertThisInitialized(_this), "stick", function (e, bound) {
        _this.setState({
          bound: bound,
          sticky: true
        });

        invoke_1(_this.props, 'onStick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "unstick", function (e, bound) {
        _this.setState({
          bound: bound,
          sticky: false
        });

        invoke_1(_this.props, 'onUnstick', e, _this.props);
      });

      defineProperty(assertThisInitialized(_this), "stickToContextBottom", function (e) {
        invoke_1(_this.props, 'onBottom', e, _this.props);

        _this.stick(e, true);

        _this.pushing(true);
      });

      defineProperty(assertThisInitialized(_this), "stickToContextTop", function (e) {
        invoke_1(_this.props, 'onTop', e, _this.props);

        _this.unstick(e, false);

        _this.pushing(false);
      });

      defineProperty(assertThisInitialized(_this), "stickToScreenBottom", function (e) {
        var bottom = _this.props.bottomOffset;

        _this.stick(e, false);

        _this.setState({
          bottom: bottom,
          top: null
        });
      });

      defineProperty(assertThisInitialized(_this), "stickToScreenTop", function (e) {
        var top = _this.props.offset;

        _this.stick(e, false);

        _this.setState({
          top: top,
          bottom: null
        });
      });

      return _this;
    }

    createClass(Sticky, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!isBrowser()) return;
        var active = this.props.active;

        if (active) {
          this.handleUpdate();
          this.addListeners(this.props);
        }
      } // eslint-disable-next-line camelcase

    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var _this$props = this.props,
            current = _this$props.active,
            currentScrollContext = _this$props.scrollContext;
        var next = nextProps.active,
            nextScrollContext = nextProps.scrollContext;

        if (current === next) {
          if (currentScrollContext !== nextScrollContext) {
            this.removeListeners();
            this.addListeners(nextProps);
          }

          return;
        }

        if (next) {
          this.handleUpdate();
          this.addListeners(nextProps);
          return;
        }

        this.removeListeners();
        this.setState({
          sticky: false
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!isBrowser()) return;
        var active = this.props.active;

        if (active) {
          this.removeListeners();
          cancelAnimationFrame(this.frameId);
        }
      } // ----------------------------------------
      // Events
      // ----------------------------------------

    }, {
      key: "computeStyle",
      value: function computeStyle() {
        var styleElement = this.props.styleElement;
        var _this$state = this.state,
            bottom = _this$state.bottom,
            bound = _this$state.bound,
            sticky = _this$state.sticky,
            top = _this$state.top;
        if (!sticky) return styleElement;
        return objectSpread({
          bottom: bound ? 0 : bottom,
          top: bound ? undefined : top,
          width: this.triggerRect.width
        }, styleElement);
      } // Return true when the component reached the bottom of the context

    }, {
      key: "render",
      // ----------------------------------------
      // Render
      // ----------------------------------------
      value: function render() {
        var _this$props2 = this.props,
            children = _this$props2.children,
            className = _this$props2.className;
        var _this$state2 = this.state,
            bottom = _this$state2.bottom,
            bound = _this$state2.bound,
            sticky = _this$state2.sticky;
        var rest = getUnhandledProps(Sticky, this.props);
        var ElementType = getElementType(Sticky, this.props);
        var containerClasses = classnames(sticky && 'ui', sticky && 'stuck-container', sticky && (bound ? 'bound-container' : 'fixed-container'), className);
        var elementClasses = classnames('ui', sticky && (bound ? 'bound bottom' : 'fixed'), sticky && !bound && (bottom === null ? 'top' : 'bottom'), 'sticky');
        var triggerStyles = sticky && this.stickyRect ? {
          height: this.stickyRect.height
        } : {};
        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: containerClasses
        }), React__default.createElement("div", {
          ref: this.triggerRef,
          style: triggerStyles
        }), React__default.createElement("div", {
          className: elementClasses,
          ref: this.stickyRef,
          style: this.computeStyle()
        }, children));
      }
    }]);

    return Sticky;
  }(React.Component);

  defineProperty(Sticky, "defaultProps", {
    active: true,
    bottomOffset: 0,
    offset: 0,
    scrollContext: isBrowser() ? window : null
  });

  defineProperty(Sticky, "handledProps", ["active", "as", "bottomOffset", "children", "className", "context", "offset", "onBottom", "onStick", "onTop", "onUnstick", "pushing", "scrollContext", "styleElement"]);
  Sticky.propTypes =  {};

  /**
   * A tab pane holds the content of a tab.
   */

  function TabPane(props) {
    var active = props.active,
        children = props.children,
        className = props.className,
        content = props.content,
        loading = props.loading;
    var classes = classnames(useKeyOnly(active, 'active'), useKeyOnly(loading, 'loading'), 'tab', className);
    var rest = getUnhandledProps(TabPane, props);
    var ElementType = getElementType(TabPane, props);
    var calculatedDefaultProps = {};

    if (ElementType === Segment) {
      calculatedDefaultProps.attached = 'bottom';
    }

    return React__default.createElement(ElementType, _extends_1({}, calculatedDefaultProps, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  TabPane.handledProps = ["active", "as", "children", "className", "content", "loading"];
  TabPane.defaultProps = {
    as: Segment,
    active: true
  };
  TabPane.propTypes =  {};
  TabPane.create = createShorthandFactory(TabPane, function (content) {
    return {
      content: content
    };
  });

  /**
   * A Tab is a hidden section of content activated by a Menu.
   * @see Menu
   * @see Segment
   */

  var Tab =
  /*#__PURE__*/
  function (_Component) {
    inherits(Tab, _Component);

    function Tab() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Tab);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleItemClick", function (e, _ref) {
        var index = _ref.index;

        invoke_1(_this.props, 'onTabChange', e, objectSpread({}, _this.props, {
          activeIndex: index
        }));

        _this.trySetState({
          activeIndex: index
        });
      });

      return _this;
    }

    createClass(Tab, [{
      key: "getInitialAutoControlledState",
      value: function getInitialAutoControlledState() {
        return {
          activeIndex: 0
        };
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this$props = this.props,
            panes = _this$props.panes,
            renderActiveOnly = _this$props.renderActiveOnly;
        var activeIndex = this.state.activeIndex;
        if (renderActiveOnly) return invoke_1(get_1(panes, "[".concat(activeIndex, "]")), 'render', this.props);
        return map_1(panes, function (_ref2, index) {
          var pane = _ref2.pane;
          return TabPane.create(pane, {
            overrideProps: {
              active: index === activeIndex
            }
          });
        });
      }
    }, {
      key: "renderMenu",
      value: function renderMenu() {
        var _this$props2 = this.props,
            menu = _this$props2.menu,
            panes = _this$props2.panes,
            menuPosition = _this$props2.menuPosition;
        var activeIndex = this.state.activeIndex;

        if (menu.tabular === true && menuPosition === 'right') {
          menu.tabular = 'right';
        }

        return Menu.create(menu, {
          autoGenerateKey: false,
          overrideProps: {
            items: map_1(panes, 'menuItem'),
            onItemClick: this.handleItemClick,
            activeIndex: activeIndex
          }
        });
      }
    }, {
      key: "renderVertical",
      value: function renderVertical(menu) {
        var _this$props3 = this.props,
            grid = _this$props3.grid,
            menuPosition = _this$props3.menuPosition;

        var paneWidth = grid.paneWidth,
            tabWidth = grid.tabWidth,
            gridProps = objectWithoutProperties(grid, ["paneWidth", "tabWidth"]);

        var position = menuPosition || menu.props.tabular === 'right' && 'right' || 'left';
        return React__default.createElement(Grid, gridProps, position === 'left' && GridColumn.create({
          width: tabWidth,
          children: menu
        }, {
          autoGenerateKey: false
        }), GridColumn.create({
          width: paneWidth,
          children: this.renderItems(),
          stretched: true
        }, {
          autoGenerateKey: false
        }), position === 'right' && GridColumn.create({
          width: tabWidth,
          children: menu
        }, {
          autoGenerateKey: false
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var menu = this.renderMenu();
        var rest = getUnhandledProps(Tab, this.props);
        var ElementType = getElementType(Tab, this.props);

        if (menu.props.vertical) {
          return React__default.createElement(ElementType, rest, this.renderVertical(menu));
        }

        return React__default.createElement(ElementType, rest, menu.props.attached !== 'bottom' && menu, this.renderItems(), menu.props.attached === 'bottom' && menu);
      }
    }]);

    return Tab;
  }(AutoControlledComponent);

  defineProperty(Tab, "autoControlledProps", ['activeIndex']);

  defineProperty(Tab, "defaultProps", {
    grid: {
      paneWidth: 12,
      tabWidth: 4
    },
    menu: {
      attached: true,
      tabular: true
    },
    renderActiveOnly: true
  });

  defineProperty(Tab, "Pane", TabPane);

  defineProperty(Tab, "handledProps", ["activeIndex", "as", "defaultActiveIndex", "grid", "menu", "menuPosition", "onTabChange", "panes", "renderActiveOnly"]);

  Tab.propTypes =  {};

  /**
   * An ad displays third-party promotional content.
   */

  function Advertisement(props) {
    var centered = props.centered,
        children = props.children,
        className = props.className,
        content = props.content,
        test = props.test,
        unit = props.unit;
    var classes = classnames('ui', unit, useKeyOnly(centered, 'centered'), useKeyOnly(test, 'test'), 'ad', className);
    var rest = getUnhandledProps(Advertisement, props);
    var ElementType = getElementType(Advertisement, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes,
      "data-text": test
    }), isNil(children) ? content : children);
  }

  Advertisement.handledProps = ["as", "centered", "children", "className", "content", "test", "unit"];
  Advertisement.propTypes =  {};

  /**
   * A card can contain a description with one or more paragraphs.
   */

  function CardDescription(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        textAlign = props.textAlign;
    var classes = classnames(useTextAlignProp(textAlign), 'description', className);
    var rest = getUnhandledProps(CardDescription, props);
    var ElementType = getElementType(CardDescription, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CardDescription.handledProps = ["as", "children", "className", "content", "textAlign"];
  CardDescription.propTypes =  {};

  /**
   * A card can contain a header.
   */

  function CardHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        textAlign = props.textAlign;
    var classes = classnames(useTextAlignProp(textAlign), 'header', className);
    var rest = getUnhandledProps(CardHeader, props);
    var ElementType = getElementType(CardHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CardHeader.handledProps = ["as", "children", "className", "content", "textAlign"];
  CardHeader.propTypes =  {};

  /**
   * A card can contain content metadata.
   */

  function CardMeta(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        textAlign = props.textAlign;
    var classes = classnames(useTextAlignProp(textAlign), 'meta', className);
    var rest = getUnhandledProps(CardMeta, props);
    var ElementType = getElementType(CardMeta, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CardMeta.handledProps = ["as", "children", "className", "content", "textAlign"];
  CardMeta.propTypes =  {};

  /**
   * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
   */

  function CardContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        description = props.description,
        extra = props.extra,
        header = props.header,
        meta = props.meta,
        textAlign = props.textAlign;
    var classes = classnames(useKeyOnly(extra, 'extra'), useTextAlignProp(textAlign), 'content', className);
    var rest = getUnhandledProps(CardContent, props);
    var ElementType = getElementType(CardContent, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), createShorthand(CardHeader, function (val) {
      return {
        content: val
      };
    }, header, {
      autoGenerateKey: false
    }), createShorthand(CardMeta, function (val) {
      return {
        content: val
      };
    }, meta, {
      autoGenerateKey: false
    }), createShorthand(CardDescription, function (val) {
      return {
        content: val
      };
    }, description, {
      autoGenerateKey: false
    }));
  }

  CardContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "textAlign"];
  CardContent.propTypes =  {};

  /**
   * A group of cards.
   */

  function CardGroup(props) {
    var centered = props.centered,
        children = props.children,
        className = props.className,
        content = props.content,
        doubling = props.doubling,
        items = props.items,
        itemsPerRow = props.itemsPerRow,
        stackable = props.stackable,
        textAlign = props.textAlign;
    var classes = classnames('ui', useKeyOnly(centered, 'centered'), useKeyOnly(doubling, 'doubling'), useKeyOnly(stackable, 'stackable'), useTextAlignProp(textAlign), useWidthProp(itemsPerRow), 'cards', className);
    var rest = getUnhandledProps(CardGroup, props);
    var ElementType = getElementType(CardGroup, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    var itemsJSX = map_1(items, function (item) {
      var key = item.key || [item.header, item.description].join('-');
      return React__default.createElement(Card, _extends_1({
        key: key
      }, item));
    });

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), itemsJSX);
  }

  CardGroup.handledProps = ["as", "centered", "children", "className", "content", "doubling", "items", "itemsPerRow", "stackable", "textAlign"];
  CardGroup.propTypes =  {};

  /**
   * A card displays site content in a manner similar to a playing card.
   */

  var Card =
  /*#__PURE__*/
  function (_Component) {
    inherits(Card, _Component);

    function Card() {
      var _getPrototypeOf2;

      var _this;

      classCallCheck(this, Card);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(Card)).call.apply(_getPrototypeOf2, [this].concat(args)));

      defineProperty(assertThisInitialized(_this), "handleClick", function (e) {
        var onClick = _this.props.onClick;
        if (onClick) onClick(e, _this.props);
      });

      return _this;
    }

    createClass(Card, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            centered = _this$props.centered,
            children = _this$props.children,
            className = _this$props.className,
            color = _this$props.color,
            content = _this$props.content,
            description = _this$props.description,
            extra = _this$props.extra,
            fluid = _this$props.fluid,
            header = _this$props.header,
            href = _this$props.href,
            image = _this$props.image,
            link = _this$props.link,
            meta = _this$props.meta,
            onClick = _this$props.onClick,
            raised = _this$props.raised;
        var classes = classnames('ui', color, useKeyOnly(centered, 'centered'), useKeyOnly(fluid, 'fluid'), useKeyOnly(link, 'link'), useKeyOnly(raised, 'raised'), 'card', className);
        var rest = getUnhandledProps(Card, this.props);
        var ElementType = getElementType(Card, this.props, function () {
          if (onClick) return 'a';
        });

        if (!isNil(children)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            href: href,
            onClick: this.handleClick
          }), children);
        }

        if (!isNil(content)) {
          return React__default.createElement(ElementType, _extends_1({}, rest, {
            className: classes,
            href: href,
            onClick: this.handleClick
          }), content);
        }

        return React__default.createElement(ElementType, _extends_1({}, rest, {
          className: classes,
          href: href,
          onClick: this.handleClick
        }), Image.create(image, {
          autoGenerateKey: false,
          defaultProps: {
            ui: false,
            wrapped: true
          }
        }), (description || header || meta) && React__default.createElement(CardContent, {
          description: description,
          header: header,
          meta: meta
        }), extra && React__default.createElement(CardContent, {
          extra: true
        }, extra));
      }
    }]);

    return Card;
  }(React.Component);

  defineProperty(Card, "Content", CardContent);

  defineProperty(Card, "Description", CardDescription);

  defineProperty(Card, "Group", CardGroup);

  defineProperty(Card, "Header", CardHeader);

  defineProperty(Card, "Meta", CardMeta);

  defineProperty(Card, "handledProps", ["as", "centered", "children", "className", "color", "content", "description", "extra", "fluid", "header", "href", "image", "link", "meta", "onClick", "raised"]);
  Card.propTypes =  {};

  /**
   * A comment can contain an action.
   */

  function CommentAction(props) {
    var active = props.active,
        className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames(useKeyOnly(active, 'active'), className);
    var rest = getUnhandledProps(CommentAction, props);
    var ElementType = getElementType(CommentAction, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentAction.handledProps = ["active", "as", "children", "className", "content"];
  CommentAction.defaultProps = {
    as: 'a'
  };
  CommentAction.propTypes =  {};

  /**
   * A comment can contain an list of actions a user may perform related to this comment.
   */

  function CommentActions(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames('actions', className);
    var rest = getUnhandledProps(CommentActions, props);
    var ElementType = getElementType(CommentActions, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentActions.handledProps = ["as", "children", "className", "content"];
  CommentActions.propTypes =  {};

  /**
   * A comment can contain an author.
   */

  function CommentAuthor(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames('author', className);
    var rest = getUnhandledProps(CommentAuthor, props);
    var ElementType = getElementType(CommentAuthor, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentAuthor.handledProps = ["as", "children", "className", "content"];
  CommentAuthor.propTypes =  {};

  /**
   * A comment can contain an image or avatar.
   */

  function CommentAvatar(props) {
    var className = props.className,
        src = props.src;
    var classes = classnames('avatar', className);
    var rest = getUnhandledProps(CommentAvatar, props);

    var _partitionHTMLProps = partitionHTMLProps(rest, {
      htmlProps: htmlImageProps
    }),
        _partitionHTMLProps2 = slicedToArray(_partitionHTMLProps, 2),
        imageProps = _partitionHTMLProps2[0],
        rootProps = _partitionHTMLProps2[1];

    var ElementType = getElementType(CommentAvatar, props);
    return React__default.createElement(ElementType, _extends_1({}, rootProps, {
      className: classes
    }), createHTMLImage(src, {
      autoGenerateKey: false,
      defaultProps: imageProps
    }));
  }

  CommentAvatar.handledProps = ["as", "className", "src"];
  CommentAvatar.propTypes =  {};

  /**
   * A comment can contain content.
   */

  function CommentContent(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames(className, 'content');
    var rest = getUnhandledProps(CommentContent, props);
    var ElementType = getElementType(CommentContent, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentContent.handledProps = ["as", "children", "className", "content"];
  CommentContent.propTypes =  {};

  /**
   * Comments can be grouped.
   */

  function CommentGroup(props) {
    var className = props.className,
        children = props.children,
        collapsed = props.collapsed,
        content = props.content,
        minimal = props.minimal,
        size = props.size,
        threaded = props.threaded;
    var classes = classnames('ui', size, useKeyOnly(collapsed, 'collapsed'), useKeyOnly(minimal, 'minimal'), useKeyOnly(threaded, 'threaded'), 'comments', className);
    var rest = getUnhandledProps(CommentGroup, props);
    var ElementType = getElementType(CommentGroup, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentGroup.handledProps = ["as", "children", "className", "collapsed", "content", "minimal", "size", "threaded"];
  CommentGroup.propTypes =  {};

  /**
   * A comment can contain metadata about the comment, an arbitrary amount of metadata may be defined.
   */

  function CommentMetadata(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames('metadata', className);
    var rest = getUnhandledProps(CommentMetadata, props);
    var ElementType = getElementType(CommentMetadata, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentMetadata.handledProps = ["as", "children", "className", "content"];
  CommentMetadata.propTypes =  {};

  /**
   * A comment can contain text.
   */

  function CommentText(props) {
    var className = props.className,
        children = props.children,
        content = props.content;
    var classes = classnames(className, 'text');
    var rest = getUnhandledProps(CommentText, props);
    var ElementType = getElementType(CommentText, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  CommentText.handledProps = ["as", "children", "className", "content"];
  CommentText.propTypes =  {};

  /**
   * A comment displays user feedback to site content.
   */

  function Comment(props) {
    var className = props.className,
        children = props.children,
        collapsed = props.collapsed,
        content = props.content;
    var classes = classnames(useKeyOnly(collapsed, 'collapsed'), 'comment', className);
    var rest = getUnhandledProps(Comment, props);
    var ElementType = getElementType(Comment, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  Comment.handledProps = ["as", "children", "className", "collapsed", "content"];
  Comment.propTypes =  {};
  Comment.Author = CommentAuthor;
  Comment.Action = CommentAction;
  Comment.Actions = CommentActions;
  Comment.Avatar = CommentAvatar;
  Comment.Content = CommentContent;
  Comment.Group = CommentGroup;
  Comment.Metadata = CommentMetadata;
  Comment.Text = CommentText;

  /**
   * An event or an event summary can contain a date.
   */

  function FeedDate(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('date', className);
    var rest = getUnhandledProps(FeedDate, props);
    var ElementType = getElementType(FeedDate, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  FeedDate.handledProps = ["as", "children", "className", "content"];
  FeedDate.propTypes =  {};

  /**
   * A feed can contain an extra content.
   */

  function FeedExtra(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        images = props.images,
        text = props.text;
    var classes = classnames(useKeyOnly(images, 'images'), useKeyOnly(content || text, 'text'), 'extra', className);
    var rest = getUnhandledProps(FeedExtra, props);
    var ElementType = getElementType(FeedExtra, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    } // TODO need a "collection factory" to handle creating multiple image elements and their keys


    var imageElements = map_1(images, function (image, index) {
      var key = [index, image].join('-');
      return createHTMLImage(image, {
        key: key
      });
    });

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), content, imageElements);
  }

  FeedExtra.handledProps = ["as", "children", "className", "content", "images", "text"];
  FeedExtra.propTypes =  {};

  /**
   * A feed can contain a like element.
   */

  function FeedLike(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        icon = props.icon;
    var classes = classnames('like', className);
    var rest = getUnhandledProps(FeedLike, props);
    var ElementType = getElementType(FeedLike, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), Icon.create(icon, {
      autoGenerateKey: false
    }), content);
  }

  FeedLike.handledProps = ["as", "children", "className", "content", "icon"];
  FeedLike.defaultProps = {
    as: 'a'
  };
  FeedLike.propTypes =  {};

  /**
   * A feed can contain a meta.
   */

  function FeedMeta(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        like = props.like;
    var classes = classnames('meta', className);
    var rest = getUnhandledProps(FeedMeta, props);
    var ElementType = getElementType(FeedMeta, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), createShorthand(FeedLike, function (val) {
      return {
        content: val
      };
    }, like, {
      autoGenerateKey: false
    }), content);
  }

  FeedMeta.handledProps = ["as", "children", "className", "content", "like"];
  FeedMeta.propTypes =  {};

  /**
   * A feed can contain a user element.
   */

  function FeedUser(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('user', className);
    var rest = getUnhandledProps(FeedUser, props);
    var ElementType = getElementType(FeedUser, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  FeedUser.handledProps = ["as", "children", "className", "content"];
  FeedUser.propTypes =  {};
  FeedUser.defaultProps = {
    as: 'a'
  };

  /**
   * A feed can contain a summary.
   */

  function FeedSummary(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        date = props.date,
        user = props.user;
    var classes = classnames('summary', className);
    var rest = getUnhandledProps(FeedSummary, props);
    var ElementType = getElementType(FeedSummary, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), createShorthand(FeedUser, function (val) {
      return {
        content: val
      };
    }, user, {
      autoGenerateKey: false
    }), content && ' ', content, content && ' ', createShorthand(FeedDate, function (val) {
      return {
        content: val
      };
    }, date, {
      autoGenerateKey: false
    }));
  }

  FeedSummary.handledProps = ["as", "children", "className", "content", "date", "user"];
  FeedSummary.propTypes =  {};

  function FeedContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        extraImages = props.extraImages,
        extraText = props.extraText,
        date = props.date,
        meta = props.meta,
        summary = props.summary;
    var classes = classnames('content', className);
    var rest = getUnhandledProps(FeedContent, props);
    var ElementType = getElementType(FeedContent, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), createShorthand(FeedDate, function (val) {
      return {
        content: val
      };
    }, date, {
      autoGenerateKey: false
    }), createShorthand(FeedSummary, function (val) {
      return {
        content: val
      };
    }, summary, {
      autoGenerateKey: false
    }), content, createShorthand(FeedExtra, function (val) {
      return {
        text: true,
        content: val
      };
    }, extraText, {
      autoGenerateKey: false
    }), createShorthand(FeedExtra, function (val) {
      return {
        images: val
      };
    }, extraImages, {
      autoGenerateKey: false
    }), createShorthand(FeedMeta, function (val) {
      return {
        content: val
      };
    }, meta, {
      autoGenerateKey: false
    }));
  }

  FeedContent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "meta", "summary"];
  FeedContent.propTypes =  {};

  /**
   * An event can contain an image or icon label.
   */

  function FeedLabel(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        icon = props.icon,
        image = props.image;
    var classes = classnames('label', className);
    var rest = getUnhandledProps(FeedLabel, props);
    var ElementType = getElementType(FeedLabel, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), content, Icon.create(icon, {
      autoGenerateKey: false
    }), createHTMLImage(image));
  }

  FeedLabel.handledProps = ["as", "children", "className", "content", "icon", "image"];
  FeedLabel.propTypes =  {};

  /**
   * A feed contains an event.
   */

  function FeedEvent(props) {
    var content = props.content,
        children = props.children,
        className = props.className,
        date = props.date,
        extraImages = props.extraImages,
        extraText = props.extraText,
        image = props.image,
        icon = props.icon,
        meta = props.meta,
        summary = props.summary;
    var classes = classnames('event', className);
    var rest = getUnhandledProps(FeedEvent, props);
    var ElementType = getElementType(FeedEvent, props);
    var hasContentProp = content || date || extraImages || extraText || meta || summary;
    var contentProps = {
      content: content,
      date: date,
      extraImages: extraImages,
      extraText: extraText,
      meta: meta,
      summary: summary
    };
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), createShorthand(FeedLabel, function (val) {
      return {
        icon: val
      };
    }, icon, {
      autoGenerateKey: false
    }), createShorthand(FeedLabel, function (val) {
      return {
        image: val
      };
    }, image, {
      autoGenerateKey: false
    }), hasContentProp && React__default.createElement(FeedContent, contentProps), children);
  }

  FeedEvent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "icon", "image", "meta", "summary"];
  FeedEvent.propTypes =  {};

  /**
   * A feed presents user activity chronologically.
   */

  function Feed(props) {
    var children = props.children,
        className = props.className,
        events = props.events,
        size = props.size;
    var classes = classnames('ui', size, 'feed', className);
    var rest = getUnhandledProps(Feed, props);
    var ElementType = getElementType(Feed, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    var eventElements = map_1(events, function (eventProps) {
      var childKey = eventProps.childKey,
          date = eventProps.date,
          meta = eventProps.meta,
          summary = eventProps.summary,
          eventData = objectWithoutProperties(eventProps, ["childKey", "date", "meta", "summary"]);

      var finalKey = childKey || [date, meta, summary].join('-');
      return React__default.createElement(FeedEvent, _extends_1({
        date: date,
        key: finalKey,
        meta: meta,
        summary: summary
      }, eventData));
    });

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), eventElements);
  }

  Feed.handledProps = ["as", "children", "className", "events", "size"];
  Feed.propTypes =  {};
  Feed.Content = FeedContent;
  Feed.Date = FeedDate;
  Feed.Event = FeedEvent;
  Feed.Extra = FeedExtra;
  Feed.Label = FeedLabel;
  Feed.Like = FeedLike;
  Feed.Meta = FeedMeta;
  Feed.Summary = FeedSummary;
  Feed.User = FeedUser;

  /**
   * An item can contain a header.
   */

  function ItemHeader(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('header', className);
    var rest = getUnhandledProps(ItemHeader, props);
    var ElementType = getElementType(ItemHeader, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ItemHeader.handledProps = ["as", "children", "className", "content"];
  ItemHeader.propTypes =  {};
  ItemHeader.create = createShorthandFactory(ItemHeader, function (content) {
    return {
      content: content
    };
  });

  /**
   * An item can contain a description with a single or multiple paragraphs.
   */

  function ItemDescription(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('description', className);
    var rest = getUnhandledProps(ItemDescription, props);
    var ElementType = getElementType(ItemDescription, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ItemDescription.handledProps = ["as", "children", "className", "content"];
  ItemDescription.propTypes =  {};
  ItemDescription.create = createShorthandFactory(ItemDescription, function (content) {
    return {
      content: content
    };
  });

  /**
   * An item can contain extra content meant to be formatted separately from the main content.
   */

  function ItemExtra(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('extra', className);
    var rest = getUnhandledProps(ItemExtra, props);
    var ElementType = getElementType(ItemExtra, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ItemExtra.handledProps = ["as", "children", "className", "content"];
  ItemExtra.propTypes =  {};
  ItemExtra.create = createShorthandFactory(ItemExtra, function (content) {
    return {
      content: content
    };
  });

  /**
   * An item can contain content metadata.
   */

  function ItemMeta(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('meta', className);
    var rest = getUnhandledProps(ItemMeta, props);
    var ElementType = getElementType(ItemMeta, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  ItemMeta.handledProps = ["as", "children", "className", "content"];
  ItemMeta.propTypes =  {};
  ItemMeta.create = createShorthandFactory(ItemMeta, function (content) {
    return {
      content: content
    };
  });

  /**
   * An item can contain content.
   */

  function ItemContent(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        description = props.description,
        extra = props.extra,
        header = props.header,
        meta = props.meta,
        verticalAlign = props.verticalAlign;
    var classes = classnames(useVerticalAlignProp(verticalAlign), 'content', className);
    var rest = getUnhandledProps(ItemContent, props);
    var ElementType = getElementType(ItemContent, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), ItemHeader.create(header, {
      autoGenerateKey: false
    }), ItemMeta.create(meta, {
      autoGenerateKey: false
    }), ItemDescription.create(description, {
      autoGenerateKey: false
    }), ItemExtra.create(extra, {
      autoGenerateKey: false
    }), content);
  }

  ItemContent.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "meta", "verticalAlign"];
  ItemContent.propTypes =  {};

  /**
   * A group of items.
   */

  function ItemGroup(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        divided = props.divided,
        items = props.items,
        link = props.link,
        relaxed = props.relaxed,
        unstackable = props.unstackable;
    var classes = classnames('ui', useKeyOnly(divided, 'divided'), useKeyOnly(link, 'link'), useKeyOnly(unstackable, 'unstackable'), useKeyOrValueAndKey(relaxed, 'relaxed'), 'items', className);
    var rest = getUnhandledProps(ItemGroup, props);
    var ElementType = getElementType(ItemGroup, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    var itemsJSX = map_1(items, function (item) {
      var childKey = item.childKey,
          itemProps = objectWithoutProperties(item, ["childKey"]);

      var finalKey = childKey || [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-');
      return React__default.createElement(Item, _extends_1({}, itemProps, {
        key: finalKey
      }));
    });

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), itemsJSX);
  }

  ItemGroup.handledProps = ["as", "children", "className", "content", "divided", "items", "link", "relaxed", "unstackable"];
  ItemGroup.propTypes =  {};

  /**
   * An item can contain an image.
   */

  function ItemImage(props) {
    var size = props.size;
    var rest = getUnhandledProps(ItemImage, props);
    return React__default.createElement(Image, _extends_1({}, rest, {
      size: size,
      ui: !!size,
      wrapped: true
    }));
  }

  ItemImage.handledProps = ["size"];
  ItemImage.propTypes =  {};
  ItemImage.create = createShorthandFactory(ItemImage, function (src) {
    return {
      src: src
    };
  });

  /**
   * An item view presents large collections of site content for display.
   */

  function Item(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        description = props.description,
        extra = props.extra,
        header = props.header,
        image = props.image,
        meta = props.meta;
    var classes = classnames('item', className);
    var rest = getUnhandledProps(Item, props);
    var ElementType = getElementType(Item, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), ItemImage.create(image, {
      autoGenerateKey: false
    }), React__default.createElement(ItemContent, {
      content: content,
      description: description,
      extra: extra,
      header: header,
      meta: meta
    }));
  }

  Item.handledProps = ["as", "children", "className", "content", "description", "extra", "header", "image", "meta"];
  Item.Content = ItemContent;
  Item.Description = ItemDescription;
  Item.Extra = ItemExtra;
  Item.Group = ItemGroup;
  Item.Header = ItemHeader;
  Item.Image = ItemImage;
  Item.Meta = ItemMeta;
  Item.propTypes =  {};

  /**
   * A group of statistics.
   */

  function StatisticGroup(props) {
    var children = props.children,
        className = props.className,
        color = props.color,
        content = props.content,
        horizontal = props.horizontal,
        inverted = props.inverted,
        items = props.items,
        size = props.size,
        widths = props.widths;
    var classes = classnames('ui', color, size, useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useWidthProp(widths), 'statistics', className);
    var rest = getUnhandledProps(StatisticGroup, props);
    var ElementType = getElementType(StatisticGroup, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), map_1(items, function (item) {
      return Statistic.create(item);
    }));
  }

  StatisticGroup.handledProps = ["as", "children", "className", "color", "content", "horizontal", "inverted", "items", "size", "widths"];
  StatisticGroup.propTypes =  {};

  /**
   * A statistic can contain a label to help provide context for the presented value.
   */

  function StatisticLabel(props) {
    var children = props.children,
        className = props.className,
        content = props.content;
    var classes = classnames('label', className);
    var rest = getUnhandledProps(StatisticLabel, props);
    var ElementType = getElementType(StatisticLabel, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  StatisticLabel.handledProps = ["as", "children", "className", "content"];
  StatisticLabel.propTypes =  {};
  StatisticLabel.create = createShorthandFactory(StatisticLabel, function (content) {
    return {
      content: content
    };
  });

  /**
   * A statistic can contain a numeric, icon, image, or text value.
   */

  function StatisticValue(props) {
    var children = props.children,
        className = props.className,
        content = props.content,
        text = props.text;
    var classes = classnames(useKeyOnly(text, 'text'), 'value', className);
    var rest = getUnhandledProps(StatisticValue, props);
    var ElementType = getElementType(StatisticValue, props);
    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), isNil(children) ? content : children);
  }

  StatisticValue.handledProps = ["as", "children", "className", "content", "text"];
  StatisticValue.propTypes =  {};
  StatisticValue.create = createShorthandFactory(StatisticValue, function (content) {
    return {
      content: content
    };
  });

  /**
   * A statistic emphasizes the current value of an attribute.
   */

  function Statistic(props) {
    var children = props.children,
        className = props.className,
        color = props.color,
        content = props.content,
        floated = props.floated,
        horizontal = props.horizontal,
        inverted = props.inverted,
        label = props.label,
        size = props.size,
        text = props.text,
        value = props.value;
    var classes = classnames('ui', color, size, useValueAndKey(floated, 'floated'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), 'statistic', className);
    var rest = getUnhandledProps(Statistic, props);
    var ElementType = getElementType(Statistic, props);

    if (!isNil(children)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), children);
    }

    if (!isNil(content)) {
      return React__default.createElement(ElementType, _extends_1({}, rest, {
        className: classes
      }), content);
    }

    return React__default.createElement(ElementType, _extends_1({}, rest, {
      className: classes
    }), StatisticValue.create(value, {
      defaultProps: {
        text: text
      },
      autoGenerateKey: false
    }), StatisticLabel.create(label, {
      autoGenerateKey: false
    }));
  }

  Statistic.handledProps = ["as", "children", "className", "color", "content", "floated", "horizontal", "inverted", "label", "size", "text", "value"];
  Statistic.propTypes =  {};
  Statistic.Group = StatisticGroup;
  Statistic.Label = StatisticLabel;
  Statistic.Value = StatisticValue;
  Statistic.create = createShorthandFactory(Statistic, function (content) {
    return {
      content: content
    };
  });

  exports.Accordion = Accordion;
  exports.AccordionAccordion = AccordionAccordion;
  exports.AccordionContent = AccordionContent;
  exports.AccordionPanel = AccordionPanel;
  exports.AccordionTitle = AccordionTitle;
  exports.Advertisement = Advertisement;
  exports.Breadcrumb = Breadcrumb;
  exports.BreadcrumbDivider = BreadcrumbDivider;
  exports.BreadcrumbSection = BreadcrumbSection;
  exports.Button = Button;
  exports.ButtonContent = ButtonContent;
  exports.ButtonGroup = ButtonGroup;
  exports.ButtonOr = ButtonOr;
  exports.Card = Card;
  exports.CardContent = CardContent;
  exports.CardDescription = CardDescription;
  exports.CardGroup = CardGroup;
  exports.CardHeader = CardHeader;
  exports.CardMeta = CardMeta;
  exports.Checkbox = Checkbox;
  exports.Comment = Comment;
  exports.CommentAction = CommentAction;
  exports.CommentActions = CommentActions;
  exports.CommentAuthor = CommentAuthor;
  exports.CommentAvatar = CommentAvatar;
  exports.CommentContent = CommentContent;
  exports.CommentGroup = CommentGroup;
  exports.CommentMetadata = CommentMetadata;
  exports.CommentText = CommentText;
  exports.Confirm = Confirm;
  exports.Container = Container;
  exports.Dimmer = Dimmer;
  exports.DimmerDimmable = DimmerDimmable;
  exports.DimmerInner = DimmerInner;
  exports.Divider = Divider;
  exports.Dropdown = Dropdown;
  exports.DropdownDivider = DropdownDivider;
  exports.DropdownHeader = DropdownHeader;
  exports.DropdownItem = DropdownItem;
  exports.DropdownMenu = DropdownMenu;
  exports.DropdownSearchInput = DropdownSearchInput;
  exports.Embed = Embed;
  exports.Feed = Feed;
  exports.FeedContent = FeedContent;
  exports.FeedDate = FeedDate;
  exports.FeedEvent = FeedEvent;
  exports.FeedExtra = FeedExtra;
  exports.FeedLabel = FeedLabel;
  exports.FeedLike = FeedLike;
  exports.FeedMeta = FeedMeta;
  exports.FeedSummary = FeedSummary;
  exports.FeedUser = FeedUser;
  exports.Flag = Flag;
  exports.Form = Form;
  exports.FormButton = FormButton;
  exports.FormCheckbox = FormCheckbox;
  exports.FormDropdown = FormDropdown;
  exports.FormField = FormField;
  exports.FormGroup = FormGroup;
  exports.FormInput = FormInput;
  exports.FormRadio = FormRadio;
  exports.FormSelect = FormSelect;
  exports.FormTextArea = FormTextArea;
  exports.Grid = Grid;
  exports.GridColumn = GridColumn;
  exports.GridRow = GridRow;
  exports.Header = Header;
  exports.HeaderContent = HeaderContent;
  exports.HeaderSubheader = HeaderSubheader;
  exports.Icon = Icon;
  exports.IconGroup = IconGroup;
  exports.Image = Image;
  exports.ImageGroup = ImageGroup;
  exports.Input = Input;
  exports.Item = Item;
  exports.ItemContent = ItemContent;
  exports.ItemDescription = ItemDescription;
  exports.ItemExtra = ItemExtra;
  exports.ItemGroup = ItemGroup;
  exports.ItemHeader = ItemHeader;
  exports.ItemImage = ItemImage;
  exports.ItemMeta = ItemMeta;
  exports.Label = Label;
  exports.LabelDetail = LabelDetail;
  exports.LabelGroup = LabelGroup;
  exports.List = List;
  exports.ListContent = ListContent;
  exports.ListDescription = ListDescription;
  exports.ListHeader = ListHeader;
  exports.ListIcon = ListIcon;
  exports.ListItem = ListItem;
  exports.ListList = ListList;
  exports.Loader = Loader;
  exports.Menu = Menu;
  exports.MenuHeader = MenuHeader;
  exports.MenuItem = MenuItem;
  exports.MenuMenu = MenuMenu;
  exports.Message = Message;
  exports.MessageContent = MessageContent;
  exports.MessageHeader = MessageHeader;
  exports.MessageItem = MessageItem;
  exports.MessageList = MessageList;
  exports.Modal = Modal;
  exports.ModalActions = ModalActions;
  exports.ModalContent = ModalContent;
  exports.ModalDescription = ModalDescription;
  exports.ModalHeader = ModalHeader;
  exports.MountNode = MountNode;
  exports.Pagination = Pagination;
  exports.PaginationItem = PaginationItem;
  exports.Placeholder = Placeholder;
  exports.PlaceholderHeader = PlaceholderHeader;
  exports.PlaceholderImage = PlaceholderImage;
  exports.PlaceholderLine = PlaceholderLine;
  exports.PlaceholderParagraph = PlaceholderParagraph;
  exports.Popup = Popup;
  exports.PopupContent = PopupContent;
  exports.PopupHeader = PopupHeader;
  exports.Portal = Portal;
  exports.PortalInner = PortalInner;
  exports.Progress = Progress;
  exports.Radio = Radio;
  exports.Rail = Rail;
  exports.Rating = Rating;
  exports.RatingIcon = RatingIcon;
  exports.Ref = Ref;
  exports.Responsive = Responsive;
  exports.Reveal = Reveal;
  exports.RevealContent = RevealContent;
  exports.Search = Search;
  exports.SearchCategory = SearchCategory;
  exports.SearchResult = SearchResult;
  exports.SearchResults = SearchResults;
  exports.Segment = Segment;
  exports.SegmentGroup = SegmentGroup;
  exports.SegmentInline = SegmentInline;
  exports.Select = Select;
  exports.Sidebar = Sidebar;
  exports.SidebarPushable = SidebarPushable;
  exports.SidebarPusher = SidebarPusher;
  exports.Statistic = Statistic;
  exports.StatisticGroup = StatisticGroup;
  exports.StatisticLabel = StatisticLabel;
  exports.StatisticValue = StatisticValue;
  exports.Step = Step;
  exports.StepContent = StepContent;
  exports.StepDescription = StepDescription;
  exports.StepGroup = StepGroup;
  exports.StepTitle = StepTitle;
  exports.Sticky = Sticky;
  exports.Tab = Tab;
  exports.TabPane = TabPane;
  exports.Table = Table;
  exports.TableBody = TableBody;
  exports.TableCell = TableCell;
  exports.TableFooter = TableFooter;
  exports.TableHeader = TableHeader;
  exports.TableHeaderCell = TableHeaderCell;
  exports.TableRow = TableRow;
  exports.TextArea = TextArea;
  exports.Transition = Transition;
  exports.TransitionGroup = TransitionGroup;
  exports.TransitionablePortal = TransitionablePortal;
  exports.Visibility = Visibility;

  return exports;

}({}, React, ReactDOM));
