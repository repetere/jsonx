(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./test/mock/_mock_react-_classnames.js')) :
	typeof define === 'function' && define.amd ? define(['exports', './test/mock/_mock_react-_classnames.js'], factory) :
	(factory((global.Spectre = {}),global.classnames));
}(this, (function (exports,classnames) { 'use strict';

	classnames = classnames && classnames.hasOwnProperty('default') ? classnames['default'] : classnames;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	/** @license React v16.8.6
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var k = require("object-assign"),
	    n = "function" === typeof Symbol && Symbol.for,
	    p = n ? Symbol.for("react.element") : 60103,
	    q = n ? Symbol.for("react.portal") : 60106,
	    r = n ? Symbol.for("react.fragment") : 60107,
	    t = n ? Symbol.for("react.strict_mode") : 60108,
	    u = n ? Symbol.for("react.profiler") : 60114,
	    v = n ? Symbol.for("react.provider") : 60109,
	    w = n ? Symbol.for("react.context") : 60110,
	    x = n ? Symbol.for("react.concurrent_mode") : 60111,
	    y = n ? Symbol.for("react.forward_ref") : 60112,
	    z = n ? Symbol.for("react.suspense") : 60113,
	    aa = n ? Symbol.for("react.memo") : 60115,
	    ba = n ? Symbol.for("react.lazy") : 60116,
	    A = "function" === typeof Symbol && Symbol.iterator;

	function ca(a, b, d, c, e, g, h, f) {
	  if (!a) {
	    a = void 0;
	    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
	      var l = [d, c, e, g, h, f],
	          m = 0;
	      a = Error(b.replace(/%s/g, function () {
	        return l[m++];
	      }));
	      a.name = "Invariant Violation";
	    }
	    a.framesToPop = 1;
	    throw a;
	  }
	}

	function B(a) {
	  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) {
	    d += "&args[]=" + encodeURIComponent(arguments[c + 1]);
	  }

	  ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
	}

	var C = {
	  isMounted: function isMounted() {
	    return !1;
	  },
	  enqueueForceUpdate: function enqueueForceUpdate() {},
	  enqueueReplaceState: function enqueueReplaceState() {},
	  enqueueSetState: function enqueueSetState() {}
	},
	    D = {};

	function E(a, b, d) {
	  this.props = a;
	  this.context = b;
	  this.refs = D;
	  this.updater = d || C;
	}

	E.prototype.isReactComponent = {};

	E.prototype.setState = function (a, b) {
	  "object" !== _typeof_1(a) && "function" !== typeof a && null != a ? B("85") : void 0;
	  this.updater.enqueueSetState(this, a, b, "setState");
	};

	E.prototype.forceUpdate = function (a) {
	  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};

	function F() {}

	F.prototype = E.prototype;

	function G(a, b, d) {
	  this.props = a;
	  this.context = b;
	  this.refs = D;
	  this.updater = d || C;
	}

	var H = G.prototype = new F();
	H.constructor = G;
	k(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = {
	  current: null
	},
	    J = {
	  current: null
	},
	    K = Object.prototype.hasOwnProperty,
	    L = {
	  key: !0,
	  ref: !0,
	  __self: !0,
	  __source: !0
	};

	function M(a, b, d) {
	  var c = void 0,
	      e = {},
	      g = null,
	      h = null;
	  if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
	    K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = b[c]);
	  }
	  var f = arguments.length - 2;
	  if (1 === f) e.children = d;else if (1 < f) {
	    for (var l = Array(f), m = 0; m < f; m++) {
	      l[m] = arguments[m + 2];
	    }

	    e.children = l;
	  }
	  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
	    void 0 === e[c] && (e[c] = f[c]);
	  }
	  return {
	    $$typeof: p,
	    type: a,
	    key: g,
	    ref: h,
	    props: e,
	    _owner: J.current
	  };
	}

	function da(a, b) {
	  return {
	    $$typeof: p,
	    type: a.type,
	    key: b,
	    ref: a.ref,
	    props: a.props,
	    _owner: a._owner
	  };
	}

	function N(a) {
	  return "object" === _typeof_1(a) && null !== a && a.$$typeof === p;
	}

	function escape(a) {
	  var b = {
	    "=": "=0",
	    ":": "=2"
	  };
	  return "$" + ("" + a).replace(/[=:]/g, function (a) {
	    return b[a];
	  });
	}

	var O = /\/+/g,
	    P = [];

	function Q(a, b, d, c) {
	  if (P.length) {
	    var e = P.pop();
	    e.result = a;
	    e.keyPrefix = b;
	    e.func = d;
	    e.context = c;
	    e.count = 0;
	    return e;
	  }

	  return {
	    result: a,
	    keyPrefix: b,
	    func: d,
	    context: c,
	    count: 0
	  };
	}

	function R(a) {
	  a.result = null;
	  a.keyPrefix = null;
	  a.func = null;
	  a.context = null;
	  a.count = 0;
	  10 > P.length && P.push(a);
	}

	function S(a, b, d, c) {
	  var e = _typeof_1(a);

	  if ("undefined" === e || "boolean" === e) a = null;
	  var g = !1;
	  if (null === a) g = !0;else switch (e) {
	    case "string":
	    case "number":
	      g = !0;
	      break;

	    case "object":
	      switch (a.$$typeof) {
	        case p:
	        case q:
	          g = !0;
	      }

	  }
	  if (g) return d(c, a, "" === b ? "." + T(a, 0) : b), 1;
	  g = 0;
	  b = "" === b ? "." : b + ":";
	  if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
	    e = a[h];
	    var f = b + T(e, h);
	    g += S(e, f, d, c);
	  } else if (null === a || "object" !== _typeof_1(a) ? f = null : (f = A && a[A] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(e = a.next()).done;) {
	    e = e.value, f = b + T(e, h++), g += S(e, f, d, c);
	  } else "object" === e && (d = "" + a, B("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));
	  return g;
	}

	function U(a, b, d) {
	  return null == a ? 0 : S(a, "", b, d);
	}

	function T(a, b) {
	  return "object" === _typeof_1(a) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
	}

	function ea(a, b) {
	  a.func.call(a.context, b, a.count++);
	}

	function fa(a, b, d) {
	  var c = a.result,
	      e = a.keyPrefix;
	  a = a.func.call(a.context, b, a.count++);
	  Array.isArray(a) ? V(a, c, d, function (a) {
	    return a;
	  }) : null != a && (N(a) && (a = da(a, e + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + d)), c.push(a));
	}

	function V(a, b, d, c, e) {
	  var g = "";
	  null != d && (g = ("" + d).replace(O, "$&/") + "/");
	  b = Q(b, g, c, e);
	  U(a, fa, b);
	  R(b);
	}

	function W() {
	  var a = I.current;
	  null === a ? B("321") : void 0;
	  return a;
	}

	var X = {
	  Children: {
	    map: function map(a, b, d) {
	      if (null == a) return a;
	      var c = [];
	      V(a, c, null, b, d);
	      return c;
	    },
	    forEach: function forEach(a, b, d) {
	      if (null == a) return a;
	      b = Q(null, null, b, d);
	      U(a, ea, b);
	      R(b);
	    },
	    count: function count(a) {
	      return U(a, function () {
	        return null;
	      }, null);
	    },
	    toArray: function toArray(a) {
	      var b = [];
	      V(a, b, null, function (a) {
	        return a;
	      });
	      return b;
	    },
	    only: function only(a) {
	      N(a) ? void 0 : B("143");
	      return a;
	    }
	  },
	  createRef: function createRef() {
	    return {
	      current: null
	    };
	  },
	  Component: E,
	  PureComponent: G,
	  createContext: function createContext(a, b) {
	    void 0 === b && (b = null);
	    a = {
	      $$typeof: w,
	      _calculateChangedBits: b,
	      _currentValue: a,
	      _currentValue2: a,
	      _threadCount: 0,
	      Provider: null,
	      Consumer: null
	    };
	    a.Provider = {
	      $$typeof: v,
	      _context: a
	    };
	    return a.Consumer = a;
	  },
	  forwardRef: function forwardRef(a) {
	    return {
	      $$typeof: y,
	      render: a
	    };
	  },
	  lazy: function lazy(a) {
	    return {
	      $$typeof: ba,
	      _ctor: a,
	      _status: -1,
	      _result: null
	    };
	  },
	  memo: function memo(a, b) {
	    return {
	      $$typeof: aa,
	      type: a,
	      compare: void 0 === b ? null : b
	    };
	  },
	  useCallback: function useCallback(a, b) {
	    return W().useCallback(a, b);
	  },
	  useContext: function useContext(a, b) {
	    return W().useContext(a, b);
	  },
	  useEffect: function useEffect(a, b) {
	    return W().useEffect(a, b);
	  },
	  useImperativeHandle: function useImperativeHandle(a, b, d) {
	    return W().useImperativeHandle(a, b, d);
	  },
	  useDebugValue: function useDebugValue() {},
	  useLayoutEffect: function useLayoutEffect(a, b) {
	    return W().useLayoutEffect(a, b);
	  },
	  useMemo: function useMemo(a, b) {
	    return W().useMemo(a, b);
	  },
	  useReducer: function useReducer(a, b, d) {
	    return W().useReducer(a, b, d);
	  },
	  useRef: function useRef(a) {
	    return W().useRef(a);
	  },
	  useState: function useState(a) {
	    return W().useState(a);
	  },
	  Fragment: r,
	  StrictMode: t,
	  Suspense: z,
	  createElement: M,
	  cloneElement: function cloneElement(a, b, d) {
	    null === a || void 0 === a ? B("267", a) : void 0;
	    var c = void 0,
	        e = k({}, a.props),
	        g = a.key,
	        h = a.ref,
	        f = a._owner;

	    if (null != b) {
	      void 0 !== b.ref && (h = b.ref, f = J.current);
	      void 0 !== b.key && (g = "" + b.key);
	      var l = void 0;
	      a.type && a.type.defaultProps && (l = a.type.defaultProps);

	      for (c in b) {
	        K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
	      }
	    }

	    c = arguments.length - 2;
	    if (1 === c) e.children = d;else if (1 < c) {
	      l = Array(c);

	      for (var m = 0; m < c; m++) {
	        l[m] = arguments[m + 2];
	      }

	      e.children = l;
	    }
	    return {
	      $$typeof: p,
	      type: a.type,
	      key: g,
	      ref: h,
	      props: e,
	      _owner: f
	    };
	  },
	  createFactory: function createFactory(a) {
	    var b = M.bind(null, a);
	    b.type = a;
	    return b;
	  },
	  isValidElement: N,
	  version: "16.8.6",
	  unstable_ConcurrentMode: x,
	  unstable_Profiler: u,
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    ReactCurrentDispatcher: I,
	    ReactCurrentOwner: J,
	    assign: k
	  }
	},
	    Y = {
	  default: X
	},
	    Z = Y && X || Y;
	module.exports = Z.default || Z;

	var react_production_min = /*#__PURE__*/Object.freeze({

	});

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_production_min;
	}
	});

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

	var factoryWithThrowingShims = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret_1) {
	      // It is still safe when called from React.
	      return;
	    }

	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
	  }
	  shim.isRequired = shim;

	  function getShim() {
	    return shim;
	  }
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

	var Header = function Header(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      id = props.id;
	  var classNames = classnames('accordion-header c-hand', className);
	  return react.createElement(react.Fragment, null, react.createElement("input", {
	    type: "checkbox",
	    id: id,
	    hidden: true
	  }), react.createElement("label", {
	    className: classNames,
	    htmlFor: id
	  }, children));
	};

	Header.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  id: propTypes.string
	};

	var Body = function Body(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('accordion-body', className);
	  return react.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Body.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var Accordion = function Accordion(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('accordion', className);
	  return react.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Accordion.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};
	Accordion.Body = Body;
	Accordion.Header = Header;



	var index = /*#__PURE__*/Object.freeze({
		Accordion: Accordion,
		Header: Header,
		Body: Body
	});

	// export

	exports.Accordian = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
