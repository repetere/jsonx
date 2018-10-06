(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.rjx = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
	  if (val === null || val === undefined) {
	    throw new TypeError('Object.assign cannot be called with null or undefined');
	  }

	  return Object(val);
	}

	function shouldUseNative() {
	  try {
	    if (!Object.assign) {
	      return false;
	    } // Detect buggy property enumeration order in older V8 versions.
	    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


	    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

	    test1[5] = 'de';

	    if (Object.getOwnPropertyNames(test1)[0] === '5') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test2 = {};

	    for (var i = 0; i < 10; i++) {
	      test2['_' + String.fromCharCode(i)] = i;
	    }

	    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
	      return test2[n];
	    });

	    if (order2.join('') !== '0123456789') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test3 = {};
	    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
	      test3[letter] = letter;
	    });

	    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
	      return false;
	    }

	    return true;
	  } catch (err) {
	    // We don't expect any of the above to throw, but better to be safe.
	    return false;
	  }
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	  var from;
	  var to = toObject(target);
	  var symbols;

	  for (var s = 1; s < arguments.length; s++) {
	    from = Object(arguments[s]);

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }

	    if (getOwnPropertySymbols) {
	      symbols = getOwnPropertySymbols(from);

	      for (var i = 0; i < symbols.length; i++) {
	        if (propIsEnumerable.call(from, symbols[i])) {
	          to[symbols[i]] = from[symbols[i]];
	        }
	      }
	    }
	  }

	  return to;
	};

	var n = "function" === typeof Symbol && Symbol.for,
	    p = n ? Symbol.for("react.element") : 60103,
	    q = n ? Symbol.for("react.portal") : 60106,
	    r = n ? Symbol.for("react.fragment") : 60107,
	    t = n ? Symbol.for("react.strict_mode") : 60108,
	    u = n ? Symbol.for("react.profiler") : 60114,
	    v = n ? Symbol.for("react.provider") : 60109,
	    w = n ? Symbol.for("react.context") : 60110,
	    x = n ? Symbol.for("react.async_mode") : 60111,
	    y = n ? Symbol.for("react.forward_ref") : 60112;
	var z = "function" === typeof Symbol && Symbol.iterator;

	function A(a, b, d, c, e, g, h, f) {
	  if (!a) {
	    a = void 0;
	    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
	      var k = [d, c, e, g, h, f],
	          l = 0;
	      a = Error(b.replace(/%s/g, function () {
	        return k[l++];
	      }));
	      a.name = "Invariant Violation";
	    }
	    a.framesToPop = 1;
	    throw a;
	  }
	}

	function B(a) {
	  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) d += "&args[]=" + encodeURIComponent(arguments[c + 1]);

	  A(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
	}

	var C = {
	  isMounted: function () {
	    return !1;
	  },
	  enqueueForceUpdate: function () {},
	  enqueueReplaceState: function () {},
	  enqueueSetState: function () {}
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
	  "object" !== typeof a && "function" !== typeof a && null != a ? B("85") : void 0;
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
	objectAssign(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = {
	  current: null,
	  currentDispatcher: null
	},
	    J = Object.prototype.hasOwnProperty,
	    K = {
	  key: !0,
	  ref: !0,
	  __self: !0,
	  __source: !0
	};

	function L(a, b, d) {
	  var c = void 0,
	      e = {},
	      g = null,
	      h = null;
	  if (null != b) for (c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (g = "" + b.key), b) J.call(b, c) && !K.hasOwnProperty(c) && (e[c] = b[c]);
	  var f = arguments.length - 2;
	  if (1 === f) e.children = d;else if (1 < f) {
	    for (var k = Array(f), l = 0; l < f; l++) k[l] = arguments[l + 2];

	    e.children = k;
	  }
	  if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === e[c] && (e[c] = f[c]);
	  return {
	    $$typeof: p,
	    type: a,
	    key: g,
	    ref: h,
	    props: e,
	    _owner: I.current
	  };
	}

	function M(a, b) {
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
	  return "object" === typeof a && null !== a && a.$$typeof === p;
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
	  var e = typeof a;
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
	  } else if (null === a || "object" !== typeof a ? f = null : (f = z && a[z] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), h = 0; !(e = a.next()).done;) e = e.value, f = b + T(e, h++), g += S(e, f, d, c);else "object" === e && (d = "" + a, B("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));
	  return g;
	}

	function U(a, b, d) {
	  return null == a ? 0 : S(a, "", b, d);
	}

	function T(a, b) {
	  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
	}

	function V(a, b) {
	  a.func.call(a.context, b, a.count++);
	}

	function aa(a, b, d) {
	  var c = a.result,
	      e = a.keyPrefix;
	  a = a.func.call(a.context, b, a.count++);
	  Array.isArray(a) ? W(a, c, d, function (a) {
	    return a;
	  }) : null != a && (N(a) && (a = M(a, e + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(O, "$&/") + "/") + d)), c.push(a));
	}

	function W(a, b, d, c, e) {
	  var g = "";
	  null != d && (g = ("" + d).replace(O, "$&/") + "/");
	  b = Q(b, g, c, e);
	  U(a, aa, b);
	  R(b);
	}

	function ba(a, b) {
	  var d = I.currentDispatcher;
	  null === d ? B("277") : void 0;
	  return d.readContext(a, b);
	}

	var X = {
	  Children: {
	    map: function (a, b, d) {
	      if (null == a) return a;
	      var c = [];
	      W(a, c, null, b, d);
	      return c;
	    },
	    forEach: function (a, b, d) {
	      if (null == a) return a;
	      b = Q(null, null, b, d);
	      U(a, V, b);
	      R(b);
	    },
	    count: function (a) {
	      return U(a, function () {
	        return null;
	      }, null);
	    },
	    toArray: function (a) {
	      var b = [];
	      W(a, b, null, function (a) {
	        return a;
	      });
	      return b;
	    },
	    only: function (a) {
	      N(a) ? void 0 : B("143");
	      return a;
	    }
	  },
	  createRef: function () {
	    return {
	      current: null
	    };
	  },
	  Component: E,
	  PureComponent: G,
	  createContext: function (a, b) {
	    void 0 === b && (b = null);
	    a = {
	      $$typeof: w,
	      _calculateChangedBits: b,
	      _currentValue: a,
	      _currentValue2: a,
	      Provider: null,
	      Consumer: null,
	      unstable_read: null
	    };
	    a.Provider = {
	      $$typeof: v,
	      _context: a
	    };
	    a.Consumer = a;
	    a.unstable_read = ba.bind(null, a);
	    return a;
	  },
	  forwardRef: function (a) {
	    return {
	      $$typeof: y,
	      render: a
	    };
	  },
	  Fragment: r,
	  StrictMode: t,
	  unstable_AsyncMode: x,
	  unstable_Profiler: u,
	  createElement: L,
	  cloneElement: function (a, b, d) {
	    null === a || void 0 === a ? B("267", a) : void 0;
	    var c = void 0,
	        e = objectAssign({}, a.props),
	        g = a.key,
	        h = a.ref,
	        f = a._owner;

	    if (null != b) {
	      void 0 !== b.ref && (h = b.ref, f = I.current);
	      void 0 !== b.key && (g = "" + b.key);
	      var k = void 0;
	      a.type && a.type.defaultProps && (k = a.type.defaultProps);

	      for (c in b) J.call(b, c) && !K.hasOwnProperty(c) && (e[c] = void 0 === b[c] && void 0 !== k ? k[c] : b[c]);
	    }

	    c = arguments.length - 2;
	    if (1 === c) e.children = d;else if (1 < c) {
	      k = Array(c);

	      for (var l = 0; l < c; l++) k[l] = arguments[l + 2];

	      e.children = k;
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
	  createFactory: function (a) {
	    var b = L.bind(null, a);
	    b.type = a;
	    return b;
	  },
	  isValidElement: N,
	  version: "16.5.2",
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    ReactCurrentOwner: I,
	    assign: objectAssign
	  }
	},
	    Y = {
	  default: X
	},
	    Z = Y && X || Y;
	var react_production_min = Z.default || Z;

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_production_min;
	}
	});

	var schedule_production_min = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: !0
	});
	var c = null,
	    e = !1,
	    f = !1,
	    g = "object" === typeof performance && "function" === typeof performance.now,
	    l = {
	  timeRemaining: g ? function () {
	    var a = h() - performance.now();
	    return 0 < a ? a : 0;
	  } : function () {
	    var a = h() - Date.now();
	    return 0 < a ? a : 0;
	  },
	  didTimeout: !1
	};

	function m() {
	  if (!e) {
	    var a = c.timesOutAt;
	    f ? n() : f = !0;
	    p(q, a);
	  }
	}

	function r() {
	  var a = c,
	      b = c.next;
	  if (c === b) c = null;else {
	    var d = c.previous;
	    c = d.next = b;
	    b.previous = d;
	  }
	  a.next = a.previous = null;
	  a = a.callback;
	  a(l);
	}

	function q(a) {
	  e = !0;
	  l.didTimeout = a;

	  try {
	    if (a) for (; null !== c;) {
	      var b = exports.unstable_now();

	      if (c.timesOutAt <= b) {
	        do r(); while (null !== c && c.timesOutAt <= b);
	      } else break;
	    } else if (null !== c) {
	      do r(); while (null !== c && 0 < h() - exports.unstable_now());
	    }
	  } finally {
	    e = !1, null !== c ? m(c) : f = !1;
	  }
	}

	var t = Date,
	    u = "function" === typeof setTimeout ? setTimeout : void 0,
	    v = "function" === typeof clearTimeout ? clearTimeout : void 0,
	    w = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0,
	    x = "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0,
	    y,
	    z;

	function A(a) {
	  y = w(function (b) {
	    v(z);
	    a(b);
	  });
	  z = u(function () {
	    x(y);
	    a(exports.unstable_now());
	  }, 100);
	}

	if (g) {
	  var B = performance;

	  exports.unstable_now = function () {
	    return B.now();
	  };
	} else exports.unstable_now = function () {
	  return t.now();
	};

	var p, n, h;

	if ("undefined" === typeof window) {
	  var C = -1;

	  p = function (a) {
	    C = setTimeout(a, 0, !0);
	  };

	  n = function () {
	    clearTimeout(C);
	  };

	  h = function () {
	    return 0;
	  };
	} else if (window._schedMock) {
	  var D = window._schedMock;
	  p = D[0];
	  n = D[1];
	  h = D[2];
	} else {
	  "undefined" !== typeof console && ("function" !== typeof w && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof x && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
	  var E = null,
	      F = !1,
	      G = -1,
	      H = !1,
	      I = !1,
	      J = 0,
	      K = 33,
	      L = 33;

	  h = function () {
	    return J;
	  };

	  var M = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
	  window.addEventListener("message", function (a) {
	    if (a.source === window && a.data === M) {
	      F = !1;
	      var b = exports.unstable_now();
	      a = !1;
	      if (0 >= J - b) if (-1 !== G && G <= b) a = !0;else {
	        H || (H = !0, A(N));
	        return;
	      }
	      G = -1;
	      b = E;
	      E = null;

	      if (null !== b) {
	        I = !0;

	        try {
	          b(a);
	        } finally {
	          I = !1;
	        }
	      }
	    }
	  }, !1);

	  var N = function (a) {
	    H = !1;
	    var b = a - J + L;
	    b < L && K < L ? (8 > b && (b = 8), L = b < K ? K : b) : K = b;
	    J = a + L;
	    F || (F = !0, window.postMessage(M, "*"));
	  };

	  p = function (a, b) {
	    E = a;
	    G = b;
	    I ? window.postMessage(M, "*") : H || (H = !0, A(N));
	  };

	  n = function () {
	    E = null;
	    F = !1;
	    G = -1;
	  };
	}

	exports.unstable_scheduleWork = function (a, b) {
	  var d = exports.unstable_now();
	  b = void 0 !== b && null !== b && null !== b.timeout && void 0 !== b.timeout ? d + b.timeout : d + 5E3;
	  a = {
	    callback: a,
	    timesOutAt: b,
	    next: null,
	    previous: null
	  };
	  if (null === c) c = a.next = a.previous = a, m(c);else {
	    d = null;
	    var k = c;

	    do {
	      if (k.timesOutAt > b) {
	        d = k;
	        break;
	      }

	      k = k.next;
	    } while (k !== c);

	    null === d ? d = c : d === c && (c = a, m(c));
	    b = d.previous;
	    b.next = d.previous = a;
	    a.next = d;
	    a.previous = b;
	  }
	  return a;
	};

	exports.unstable_cancelScheduledWork = function (a) {
	  var b = a.next;

	  if (null !== b) {
	    if (b === a) c = null;else {
	      a === c && (c = b);
	      var d = a.previous;
	      d.next = b;
	      b.previous = d;
	    }
	    a.next = a.previous = null;
	  }
	};
	});

	unwrapExports(schedule_production_min);
	var schedule_production_min_1 = schedule_production_min.unstable_now;
	var schedule_production_min_2 = schedule_production_min.unstable_scheduleWork;
	var schedule_production_min_3 = schedule_production_min.unstable_cancelScheduledWork;

	var schedule = createCommonjsModule(function (module) {

	{
	  module.exports = schedule_production_min;
	}
	});

	function ca(a, b, c, d, e, f, g, h) {
	  if (!a) {
	    a = void 0;
	    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
	      var k = [c, d, e, f, g, h],
	          l = 0;
	      a = Error(b.replace(/%s/g, function () {
	        return k[l++];
	      }));
	      a.name = "Invariant Violation";
	    }
	    a.framesToPop = 1;
	    throw a;
	  }
	}

	function t$1(a) {
	  for (var b = arguments.length - 1, c = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 0; d < b; d++) c += "&args[]=" + encodeURIComponent(arguments[d + 1]);

	  ca(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", c);
	}

	react ? void 0 : t$1("227");

	function da(a, b, c, d, e, f, g, h, k) {
	  var l = Array.prototype.slice.call(arguments, 3);

	  try {
	    b.apply(c, l);
	  } catch (m) {
	    this.onError(m);
	  }
	}

	var ea = !1,
	    fa = null,
	    ha = !1,
	    ia = null,
	    ja = {
	  onError: function (a) {
	    ea = !0;
	    fa = a;
	  }
	};

	function ka(a, b, c, d, e, f, g, h, k) {
	  ea = !1;
	  fa = null;
	  da.apply(ja, arguments);
	}

	function la(a, b, c, d, e, f, g, h, k) {
	  ka.apply(this, arguments);

	  if (ea) {
	    if (ea) {
	      var l = fa;
	      ea = !1;
	      fa = null;
	    } else t$1("198"), l = void 0;

	    ha || (ha = !0, ia = l);
	  }
	}

	var ma = null,
	    na = {};

	function oa() {
	  if (ma) for (var a in na) {
	    var b = na[a],
	        c = ma.indexOf(a);
	    -1 < c ? void 0 : t$1("96", a);

	    if (!pa[c]) {
	      b.extractEvents ? void 0 : t$1("97", a);
	      pa[c] = b;
	      c = b.eventTypes;

	      for (var d in c) {
	        var e = void 0;
	        var f = c[d],
	            g = b,
	            h = d;
	        qa.hasOwnProperty(h) ? t$1("99", h) : void 0;
	        qa[h] = f;
	        var k = f.phasedRegistrationNames;

	        if (k) {
	          for (e in k) k.hasOwnProperty(e) && ra(k[e], g, h);

	          e = !0;
	        } else f.registrationName ? (ra(f.registrationName, g, h), e = !0) : e = !1;

	        e ? void 0 : t$1("98", d, a);
	      }
	    }
	  }
	}

	function ra(a, b, c) {
	  sa[a] ? t$1("100", a) : void 0;
	  sa[a] = b;
	  ta[a] = b.eventTypes[c].dependencies;
	}

	var pa = [],
	    qa = {},
	    sa = {},
	    ta = {},
	    ua = null,
	    va = null,
	    wa = null;

	function xa(a, b, c, d) {
	  b = a.type || "unknown-event";
	  a.currentTarget = wa(d);
	  la(b, c, void 0, a);
	  a.currentTarget = null;
	}

	function ya(a, b) {
	  null == b ? t$1("30") : void 0;
	  if (null == a) return b;

	  if (Array.isArray(a)) {
	    if (Array.isArray(b)) return a.push.apply(a, b), a;
	    a.push(b);
	    return a;
	  }

	  return Array.isArray(b) ? [a].concat(b) : [a, b];
	}

	function za(a, b, c) {
	  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
	}

	var Aa = null;

	function Ba(a, b) {
	  if (a) {
	    var c = a._dispatchListeners,
	        d = a._dispatchInstances;
	    if (Array.isArray(c)) for (var e = 0; e < c.length && !a.isPropagationStopped(); e++) xa(a, b, c[e], d[e]);else c && xa(a, b, c, d);
	    a._dispatchListeners = null;
	    a._dispatchInstances = null;
	    a.isPersistent() || a.constructor.release(a);
	  }
	}

	function Ca(a) {
	  return Ba(a, !0);
	}

	function Da(a) {
	  return Ba(a, !1);
	}

	var Ea = {
	  injectEventPluginOrder: function (a) {
	    ma ? t$1("101") : void 0;
	    ma = Array.prototype.slice.call(a);
	    oa();
	  },
	  injectEventPluginsByName: function (a) {
	    var b = !1,
	        c;

	    for (c in a) if (a.hasOwnProperty(c)) {
	      var d = a[c];
	      na.hasOwnProperty(c) && na[c] === d || (na[c] ? t$1("102", c) : void 0, na[c] = d, b = !0);
	    }

	    b && oa();
	  }
	};

	function Fa(a, b) {
	  var c = a.stateNode;
	  if (!c) return null;
	  var d = ua(c);
	  if (!d) return null;
	  c = d[b];

	  a: switch (b) {
	    case "onClick":
	    case "onClickCapture":
	    case "onDoubleClick":
	    case "onDoubleClickCapture":
	    case "onMouseDown":
	    case "onMouseDownCapture":
	    case "onMouseMove":
	    case "onMouseMoveCapture":
	    case "onMouseUp":
	    case "onMouseUpCapture":
	      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
	      a = !d;
	      break a;

	    default:
	      a = !1;
	  }

	  if (a) return null;
	  c && "function" !== typeof c ? t$1("231", b, typeof c) : void 0;
	  return c;
	}

	function Ga(a, b) {
	  null !== a && (Aa = ya(Aa, a));
	  a = Aa;
	  Aa = null;
	  if (a && (b ? za(a, Ca) : za(a, Da), Aa ? t$1("95") : void 0, ha)) throw b = ia, ha = !1, ia = null, b;
	}

	var Ha = Math.random().toString(36).slice(2),
	    Ia = "__reactInternalInstance$" + Ha,
	    Ja = "__reactEventHandlers$" + Ha;

	function Ka(a) {
	  if (a[Ia]) return a[Ia];

	  for (; !a[Ia];) if (a.parentNode) a = a.parentNode;else return null;

	  a = a[Ia];
	  return 7 === a.tag || 8 === a.tag ? a : null;
	}

	function La(a) {
	  a = a[Ia];
	  return !a || 7 !== a.tag && 8 !== a.tag ? null : a;
	}

	function Ma(a) {
	  if (7 === a.tag || 8 === a.tag) return a.stateNode;
	  t$1("33");
	}

	function Na(a) {
	  return a[Ja] || null;
	}

	function Oa(a) {
	  do a = a.return; while (a && 7 !== a.tag);

	  return a ? a : null;
	}

	function Pa(a, b, c) {
	  if (b = Fa(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = ya(c._dispatchListeners, b), c._dispatchInstances = ya(c._dispatchInstances, a);
	}

	function Qa(a) {
	  if (a && a.dispatchConfig.phasedRegistrationNames) {
	    for (var b = a._targetInst, c = []; b;) c.push(b), b = Oa(b);

	    for (b = c.length; 0 < b--;) Pa(c[b], "captured", a);

	    for (b = 0; b < c.length; b++) Pa(c[b], "bubbled", a);
	  }
	}

	function Ra(a, b, c) {
	  a && c && c.dispatchConfig.registrationName && (b = Fa(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = ya(c._dispatchListeners, b), c._dispatchInstances = ya(c._dispatchInstances, a));
	}

	function Ta(a) {
	  a && a.dispatchConfig.registrationName && Ra(a._targetInst, null, a);
	}

	function Ua(a) {
	  za(a, Qa);
	}

	var Va = !("undefined" === typeof window || !window.document || !window.document.createElement);

	function Wa(a, b) {
	  var c = {};
	  c[a.toLowerCase()] = b.toLowerCase();
	  c["Webkit" + a] = "webkit" + b;
	  c["Moz" + a] = "moz" + b;
	  return c;
	}

	var Ya = {
	  animationend: Wa("Animation", "AnimationEnd"),
	  animationiteration: Wa("Animation", "AnimationIteration"),
	  animationstart: Wa("Animation", "AnimationStart"),
	  transitionend: Wa("Transition", "TransitionEnd")
	},
	    Za = {},
	    $a = {};
	Va && ($a = document.createElement("div").style, "AnimationEvent" in window || (delete Ya.animationend.animation, delete Ya.animationiteration.animation, delete Ya.animationstart.animation), "TransitionEvent" in window || delete Ya.transitionend.transition);

	function ab(a) {
	  if (Za[a]) return Za[a];
	  if (!Ya[a]) return a;
	  var b = Ya[a],
	      c;

	  for (c in b) if (b.hasOwnProperty(c) && c in $a) return Za[a] = b[c];

	  return a;
	}

	var bb = ab("animationend"),
	    cb = ab("animationiteration"),
	    db = ab("animationstart"),
	    eb = ab("transitionend"),
	    fb = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
	    gb = null,
	    hb = null,
	    ib = null;

	function jb() {
	  if (ib) return ib;
	  var a,
	      b = hb,
	      c = b.length,
	      d,
	      e = "value" in gb ? gb.value : gb.textContent,
	      f = e.length;

	  for (a = 0; a < c && b[a] === e[a]; a++);

	  var g = c - a;

	  for (d = 1; d <= g && b[c - d] === e[f - d]; d++);

	  return ib = e.slice(a, 1 < d ? 1 - d : void 0);
	}

	function kb() {
	  return !0;
	}

	function lb() {
	  return !1;
	}

	function z$1(a, b, c, d) {
	  this.dispatchConfig = a;
	  this._targetInst = b;
	  this.nativeEvent = c;
	  a = this.constructor.Interface;

	  for (var e in a) a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);

	  this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? kb : lb;
	  this.isPropagationStopped = lb;
	  return this;
	}

	objectAssign(z$1.prototype, {
	  preventDefault: function () {
	    this.defaultPrevented = !0;
	    var a = this.nativeEvent;
	    a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = kb);
	  },
	  stopPropagation: function () {
	    var a = this.nativeEvent;
	    a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = kb);
	  },
	  persist: function () {
	    this.isPersistent = kb;
	  },
	  isPersistent: lb,
	  destructor: function () {
	    var a = this.constructor.Interface,
	        b;

	    for (b in a) this[b] = null;

	    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
	    this.isPropagationStopped = this.isDefaultPrevented = lb;
	    this._dispatchInstances = this._dispatchListeners = null;
	  }
	});
	z$1.Interface = {
	  type: null,
	  target: null,
	  currentTarget: function () {
	    return null;
	  },
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function (a) {
	    return a.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};

	z$1.extend = function (a) {
	  function b() {}

	  function c() {
	    return d.apply(this, arguments);
	  }

	  var d = this;
	  b.prototype = d.prototype;
	  var e = new b();
	  objectAssign(e, c.prototype);
	  c.prototype = e;
	  c.prototype.constructor = c;
	  c.Interface = objectAssign({}, d.Interface, a);
	  c.extend = d.extend;
	  mb(c);
	  return c;
	};

	mb(z$1);

	function nb(a, b, c, d) {
	  if (this.eventPool.length) {
	    var e = this.eventPool.pop();
	    this.call(e, a, b, c, d);
	    return e;
	  }

	  return new this(a, b, c, d);
	}

	function ob(a) {
	  a instanceof this ? void 0 : t$1("279");
	  a.destructor();
	  10 > this.eventPool.length && this.eventPool.push(a);
	}

	function mb(a) {
	  a.eventPool = [];
	  a.getPooled = nb;
	  a.release = ob;
	}

	var pb = z$1.extend({
	  data: null
	}),
	    qb = z$1.extend({
	  data: null
	}),
	    rb = [9, 13, 27, 32],
	    sb = Va && "CompositionEvent" in window,
	    tb = null;
	Va && "documentMode" in document && (tb = document.documentMode);
	var ub = Va && "TextEvent" in window && !tb,
	    vb = Va && (!sb || tb && 8 < tb && 11 >= tb),
	    wb = String.fromCharCode(32),
	    xb = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: "onBeforeInput",
	      captured: "onBeforeInputCapture"
	    },
	    dependencies: ["compositionend", "keypress", "textInput", "paste"]
	  },
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionEnd",
	      captured: "onCompositionEndCapture"
	    },
	    dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionStart",
	      captured: "onCompositionStartCapture"
	    },
	    dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: "onCompositionUpdate",
	      captured: "onCompositionUpdateCapture"
	    },
	    dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
	  }
	},
	    yb = !1;

	function zb(a, b) {
	  switch (a) {
	    case "keyup":
	      return -1 !== rb.indexOf(b.keyCode);

	    case "keydown":
	      return 229 !== b.keyCode;

	    case "keypress":
	    case "mousedown":
	    case "blur":
	      return !0;

	    default:
	      return !1;
	  }
	}

	function Ab(a) {
	  a = a.detail;
	  return "object" === typeof a && "data" in a ? a.data : null;
	}

	var Bb = !1;

	function Cb(a, b) {
	  switch (a) {
	    case "compositionend":
	      return Ab(b);

	    case "keypress":
	      if (32 !== b.which) return null;
	      yb = !0;
	      return wb;

	    case "textInput":
	      return a = b.data, a === wb && yb ? null : a;

	    default:
	      return null;
	  }
	}

	function Db(a, b) {
	  if (Bb) return "compositionend" === a || !sb && zb(a, b) ? (a = jb(), ib = hb = gb = null, Bb = !1, a) : null;

	  switch (a) {
	    case "paste":
	      return null;

	    case "keypress":
	      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
	        if (b.char && 1 < b.char.length) return b.char;
	        if (b.which) return String.fromCharCode(b.which);
	      }

	      return null;

	    case "compositionend":
	      return vb && "ko" !== b.locale ? null : b.data;

	    default:
	      return null;
	  }
	}

	var Eb = {
	  eventTypes: xb,
	  extractEvents: function (a, b, c, d) {
	    var e = void 0;
	    var f = void 0;
	    if (sb) b: {
	      switch (a) {
	        case "compositionstart":
	          e = xb.compositionStart;
	          break b;

	        case "compositionend":
	          e = xb.compositionEnd;
	          break b;

	        case "compositionupdate":
	          e = xb.compositionUpdate;
	          break b;
	      }

	      e = void 0;
	    } else Bb ? zb(a, c) && (e = xb.compositionEnd) : "keydown" === a && 229 === c.keyCode && (e = xb.compositionStart);
	    e ? (vb && "ko" !== c.locale && (Bb || e !== xb.compositionStart ? e === xb.compositionEnd && Bb && (f = jb()) : (gb = d, hb = "value" in gb ? gb.value : gb.textContent, Bb = !0)), e = pb.getPooled(e, b, c, d), f ? e.data = f : (f = Ab(c), null !== f && (e.data = f)), Ua(e), f = e) : f = null;
	    (a = ub ? Cb(a, c) : Db(a, c)) ? (b = qb.getPooled(xb.beforeInput, b, c, d), b.data = a, Ua(b)) : b = null;
	    return null === f ? b : null === b ? f : [f, b];
	  }
	},
	    Fb = null,
	    Gb = null,
	    Hb = null;

	function Ib(a) {
	  if (a = va(a)) {
	    "function" !== typeof Fb ? t$1("280") : void 0;
	    var b = ua(a.stateNode);
	    Fb(a.stateNode, a.type, b);
	  }
	}

	function Jb(a) {
	  Gb ? Hb ? Hb.push(a) : Hb = [a] : Gb = a;
	}

	function Kb() {
	  if (Gb) {
	    var a = Gb,
	        b = Hb;
	    Hb = Gb = null;
	    Ib(a);
	    if (b) for (a = 0; a < b.length; a++) Ib(b[a]);
	  }
	}

	function Lb(a, b) {
	  return a(b);
	}

	function Mb(a, b, c) {
	  return a(b, c);
	}

	function Nb() {}

	var Ob = !1;

	function Pb(a, b) {
	  if (Ob) return a(b);
	  Ob = !0;

	  try {
	    return Lb(a, b);
	  } finally {
	    if (Ob = !1, null !== Gb || null !== Hb) Nb(), Kb();
	  }
	}

	var Qb = {
	  color: !0,
	  date: !0,
	  datetime: !0,
	  "datetime-local": !0,
	  email: !0,
	  month: !0,
	  number: !0,
	  password: !0,
	  range: !0,
	  search: !0,
	  tel: !0,
	  text: !0,
	  time: !0,
	  url: !0,
	  week: !0
	};

	function Rb(a) {
	  var b = a && a.nodeName && a.nodeName.toLowerCase();
	  return "input" === b ? !!Qb[a.type] : "textarea" === b ? !0 : !1;
	}

	function Sb(a) {
	  a = a.target || a.srcElement || window;
	  a.correspondingUseElement && (a = a.correspondingUseElement);
	  return 3 === a.nodeType ? a.parentNode : a;
	}

	function Tb(a) {
	  if (!Va) return !1;
	  a = "on" + a;
	  var b = a in document;
	  b || (b = document.createElement("div"), b.setAttribute(a, "return;"), b = "function" === typeof b[a]);
	  return b;
	}

	function Ub(a) {
	  var b = a.type;
	  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
	}

	function Vb(a) {
	  var b = Ub(a) ? "checked" : "value",
	      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
	      d = "" + a[b];

	  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
	    var e = c.get,
	        f = c.set;
	    Object.defineProperty(a, b, {
	      configurable: !0,
	      get: function () {
	        return e.call(this);
	      },
	      set: function (a) {
	        d = "" + a;
	        f.call(this, a);
	      }
	    });
	    Object.defineProperty(a, b, {
	      enumerable: c.enumerable
	    });
	    return {
	      getValue: function () {
	        return d;
	      },
	      setValue: function (a) {
	        d = "" + a;
	      },
	      stopTracking: function () {
	        a._valueTracker = null;
	        delete a[b];
	      }
	    };
	  }
	}

	function Wb(a) {
	  a._valueTracker || (a._valueTracker = Vb(a));
	}

	function Xb(a) {
	  if (!a) return !1;
	  var b = a._valueTracker;
	  if (!b) return !0;
	  var c = b.getValue();
	  var d = "";
	  a && (d = Ub(a) ? a.checked ? "true" : "false" : a.value);
	  a = d;
	  return a !== c ? (b.setValue(a), !0) : !1;
	}

	var Yb = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
	    Zb = /^(.*)[\\\/]/,
	    C$1 = "function" === typeof Symbol && Symbol.for,
	    $b = C$1 ? Symbol.for("react.element") : 60103,
	    ac = C$1 ? Symbol.for("react.portal") : 60106,
	    bc = C$1 ? Symbol.for("react.fragment") : 60107,
	    cc = C$1 ? Symbol.for("react.strict_mode") : 60108,
	    dc = C$1 ? Symbol.for("react.profiler") : 60114,
	    ec = C$1 ? Symbol.for("react.provider") : 60109,
	    fc = C$1 ? Symbol.for("react.context") : 60110,
	    gc = C$1 ? Symbol.for("react.async_mode") : 60111,
	    hc = C$1 ? Symbol.for("react.forward_ref") : 60112,
	    ic = C$1 ? Symbol.for("react.placeholder") : 60113,
	    jc = "function" === typeof Symbol && Symbol.iterator;

	function kc(a) {
	  if (null === a || "object" !== typeof a) return null;
	  a = jc && a[jc] || a["@@iterator"];
	  return "function" === typeof a ? a : null;
	}

	function lc(a) {
	  if (null == a) return null;
	  if ("function" === typeof a) return a.displayName || a.name || null;
	  if ("string" === typeof a) return a;

	  switch (a) {
	    case gc:
	      return "AsyncMode";

	    case bc:
	      return "Fragment";

	    case ac:
	      return "Portal";

	    case dc:
	      return "Profiler";

	    case cc:
	      return "StrictMode";

	    case ic:
	      return "Placeholder";
	  }

	  if ("object" === typeof a) {
	    switch (a.$$typeof) {
	      case fc:
	        return "Context.Consumer";

	      case ec:
	        return "Context.Provider";

	      case hc:
	        var b = a.render;
	        b = b.displayName || b.name || "";
	        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
	    }

	    if ("function" === typeof a.then && (a = 1 === a._reactStatus ? a._reactResult : null)) return lc(a);
	  }

	  return null;
	}

	function mc(a) {
	  var b = "";

	  do {
	    a: switch (a.tag) {
	      case 4:
	      case 0:
	      case 1:
	      case 2:
	      case 3:
	      case 7:
	      case 10:
	        var c = a._debugOwner,
	            d = a._debugSource,
	            e = lc(a.type);
	        var f = null;
	        c && (f = lc(c.type));
	        c = e;
	        e = "";
	        d ? e = " (at " + d.fileName.replace(Zb, "") + ":" + d.lineNumber + ")" : f && (e = " (created by " + f + ")");
	        f = "\n    in " + (c || "Unknown") + e;
	        break a;

	      default:
	        f = "";
	    }

	    b += f;
	    a = a.return;
	  } while (a);

	  return b;
	}

	var nc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
	    pc = Object.prototype.hasOwnProperty,
	    qc = {},
	    rc = {};

	function sc(a) {
	  if (pc.call(rc, a)) return !0;
	  if (pc.call(qc, a)) return !1;
	  if (nc.test(a)) return rc[a] = !0;
	  qc[a] = !0;
	  return !1;
	}

	function tc(a, b, c, d) {
	  if (null !== c && 0 === c.type) return !1;

	  switch (typeof b) {
	    case "function":
	    case "symbol":
	      return !0;

	    case "boolean":
	      if (d) return !1;
	      if (null !== c) return !c.acceptsBooleans;
	      a = a.toLowerCase().slice(0, 5);
	      return "data-" !== a && "aria-" !== a;

	    default:
	      return !1;
	  }
	}

	function uc(a, b, c, d) {
	  if (null === b || "undefined" === typeof b || tc(a, b, c, d)) return !0;
	  if (d) return !1;
	  if (null !== c) switch (c.type) {
	    case 3:
	      return !b;

	    case 4:
	      return !1 === b;

	    case 5:
	      return isNaN(b);

	    case 6:
	      return isNaN(b) || 1 > b;
	  }
	  return !1;
	}

	function D$1(a, b, c, d, e) {
	  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
	  this.attributeName = d;
	  this.attributeNamespace = e;
	  this.mustUseProperty = c;
	  this.propertyName = a;
	  this.type = b;
	}

	var E$1 = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
	  E$1[a] = new D$1(a, 0, !1, a, null);
	});
	[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
	  var b = a[0];
	  E$1[b] = new D$1(b, 1, !1, a[1], null);
	});
	["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
	  E$1[a] = new D$1(a, 2, !1, a.toLowerCase(), null);
	});
	["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
	  E$1[a] = new D$1(a, 2, !1, a, null);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
	  E$1[a] = new D$1(a, 3, !1, a.toLowerCase(), null);
	});
	["checked", "multiple", "muted", "selected"].forEach(function (a) {
	  E$1[a] = new D$1(a, 3, !0, a, null);
	});
	["capture", "download"].forEach(function (a) {
	  E$1[a] = new D$1(a, 4, !1, a, null);
	});
	["cols", "rows", "size", "span"].forEach(function (a) {
	  E$1[a] = new D$1(a, 6, !1, a, null);
	});
	["rowSpan", "start"].forEach(function (a) {
	  E$1[a] = new D$1(a, 5, !1, a.toLowerCase(), null);
	});
	var vc = /[\-:]([a-z])/g;

	function wc(a) {
	  return a[1].toUpperCase();
	}

	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
	  var b = a.replace(vc, wc);
	  E$1[b] = new D$1(b, 1, !1, a, null);
	});
	"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
	  var b = a.replace(vc, wc);
	  E$1[b] = new D$1(b, 1, !1, a, "http://www.w3.org/1999/xlink");
	});
	["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
	  var b = a.replace(vc, wc);
	  E$1[b] = new D$1(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
	});
	E$1.tabIndex = new D$1("tabIndex", 1, !1, "tabindex", null);

	function xc(a, b, c, d) {
	  var e = E$1.hasOwnProperty(b) ? E$1[b] : null;
	  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
	  f || (uc(b, c, e, d) && (c = null), d || null === e ? sc(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
	}

	function yc(a) {
	  switch (typeof a) {
	    case "boolean":
	    case "number":
	    case "object":
	    case "string":
	    case "undefined":
	      return a;

	    default:
	      return "";
	  }
	}

	function zc(a, b) {
	  var c = b.checked;
	  return objectAssign({}, b, {
	    defaultChecked: void 0,
	    defaultValue: void 0,
	    value: void 0,
	    checked: null != c ? c : a._wrapperState.initialChecked
	  });
	}

	function Bc(a, b) {
	  var c = null == b.defaultValue ? "" : b.defaultValue,
	      d = null != b.checked ? b.checked : b.defaultChecked;
	  c = yc(null != b.value ? b.value : c);
	  a._wrapperState = {
	    initialChecked: d,
	    initialValue: c,
	    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
	  };
	}

	function Cc(a, b) {
	  b = b.checked;
	  null != b && xc(a, "checked", b, !1);
	}

	function Dc(a, b) {
	  Cc(a, b);
	  var c = yc(b.value),
	      d = b.type;
	  if (null != c) {
	    if ("number" === d) {
	      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
	    } else a.value !== "" + c && (a.value = "" + c);
	  } else if ("submit" === d || "reset" === d) {
	    a.removeAttribute("value");
	    return;
	  }
	  b.hasOwnProperty("value") ? Ec(a, b.type, c) : b.hasOwnProperty("defaultValue") && Ec(a, b.type, yc(b.defaultValue));
	  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
	}

	function Fc(a, b, c) {
	  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
	    var d = b.type;
	    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
	    b = "" + a._wrapperState.initialValue;
	    c || b === a.value || (a.value = b);
	    a.defaultValue = b;
	  }

	  c = a.name;
	  "" !== c && (a.name = "");
	  a.defaultChecked = !a.defaultChecked;
	  a.defaultChecked = !!a._wrapperState.initialChecked;
	  "" !== c && (a.name = c);
	}

	function Ec(a, b, c) {
	  if ("number" !== b || a.ownerDocument.activeElement !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
	}

	var Gc = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: "onChange",
	      captured: "onChangeCapture"
	    },
	    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
	  }
	};

	function Hc(a, b, c) {
	  a = z$1.getPooled(Gc.change, a, b, c);
	  a.type = "change";
	  Jb(c);
	  Ua(a);
	  return a;
	}

	var Ic = null,
	    Jc = null;

	function Kc(a) {
	  Ga(a, !1);
	}

	function Lc(a) {
	  var b = Ma(a);
	  if (Xb(b)) return a;
	}

	function Mc(a, b) {
	  if ("change" === a) return b;
	}

	var Nc = !1;
	Va && (Nc = Tb("input") && (!document.documentMode || 9 < document.documentMode));

	function Oc() {
	  Ic && (Ic.detachEvent("onpropertychange", Pc), Jc = Ic = null);
	}

	function Pc(a) {
	  "value" === a.propertyName && Lc(Jc) && (a = Hc(Jc, a, Sb(a)), Pb(Kc, a));
	}

	function Qc(a, b, c) {
	  "focus" === a ? (Oc(), Ic = b, Jc = c, Ic.attachEvent("onpropertychange", Pc)) : "blur" === a && Oc();
	}

	function Rc(a) {
	  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return Lc(Jc);
	}

	function Sc(a, b) {
	  if ("click" === a) return Lc(b);
	}

	function Tc(a, b) {
	  if ("input" === a || "change" === a) return Lc(b);
	}

	var Uc = {
	  eventTypes: Gc,
	  _isInputEventSupported: Nc,
	  extractEvents: function (a, b, c, d) {
	    var e = b ? Ma(b) : window,
	        f = void 0,
	        g = void 0,
	        h = e.nodeName && e.nodeName.toLowerCase();
	    "select" === h || "input" === h && "file" === e.type ? f = Mc : Rb(e) ? Nc ? f = Tc : (f = Rc, g = Qc) : (h = e.nodeName) && "input" === h.toLowerCase() && ("checkbox" === e.type || "radio" === e.type) && (f = Sc);
	    if (f && (f = f(a, b))) return Hc(f, c, d);
	    g && g(a, e, b);
	    "blur" === a && (a = e._wrapperState) && a.controlled && "number" === e.type && Ec(e, "number", e.value);
	  }
	},
	    Vc = z$1.extend({
	  view: null,
	  detail: null
	}),
	    Wc = {
	  Alt: "altKey",
	  Control: "ctrlKey",
	  Meta: "metaKey",
	  Shift: "shiftKey"
	};

	function Xc(a) {
	  var b = this.nativeEvent;
	  return b.getModifierState ? b.getModifierState(a) : (a = Wc[a]) ? !!b[a] : !1;
	}

	function Yc() {
	  return Xc;
	}

	var Zc = 0,
	    $c = 0,
	    ad = !1,
	    bd = !1,
	    cd = Vc.extend({
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  pageX: null,
	  pageY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: Yc,
	  button: null,
	  buttons: null,
	  relatedTarget: function (a) {
	    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
	  },
	  movementX: function (a) {
	    if ("movementX" in a) return a.movementX;
	    var b = Zc;
	    Zc = a.screenX;
	    return ad ? "mousemove" === a.type ? a.screenX - b : 0 : (ad = !0, 0);
	  },
	  movementY: function (a) {
	    if ("movementY" in a) return a.movementY;
	    var b = $c;
	    $c = a.screenY;
	    return bd ? "mousemove" === a.type ? a.screenY - b : 0 : (bd = !0, 0);
	  }
	}),
	    dd = cd.extend({
	  pointerId: null,
	  width: null,
	  height: null,
	  pressure: null,
	  tangentialPressure: null,
	  tiltX: null,
	  tiltY: null,
	  twist: null,
	  pointerType: null,
	  isPrimary: null
	}),
	    ed = {
	  mouseEnter: {
	    registrationName: "onMouseEnter",
	    dependencies: ["mouseout", "mouseover"]
	  },
	  mouseLeave: {
	    registrationName: "onMouseLeave",
	    dependencies: ["mouseout", "mouseover"]
	  },
	  pointerEnter: {
	    registrationName: "onPointerEnter",
	    dependencies: ["pointerout", "pointerover"]
	  },
	  pointerLeave: {
	    registrationName: "onPointerLeave",
	    dependencies: ["pointerout", "pointerover"]
	  }
	},
	    fd = {
	  eventTypes: ed,
	  extractEvents: function (a, b, c, d) {
	    var e = "mouseover" === a || "pointerover" === a,
	        f = "mouseout" === a || "pointerout" === a;
	    if (e && (c.relatedTarget || c.fromElement) || !f && !e) return null;
	    e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;
	    f ? (f = b, b = (b = c.relatedTarget || c.toElement) ? Ka(b) : null) : f = null;
	    if (f === b) return null;
	    var g = void 0,
	        h = void 0,
	        k = void 0,
	        l = void 0;
	    if ("mouseout" === a || "mouseover" === a) g = cd, h = ed.mouseLeave, k = ed.mouseEnter, l = "mouse";else if ("pointerout" === a || "pointerover" === a) g = dd, h = ed.pointerLeave, k = ed.pointerEnter, l = "pointer";
	    var m = null == f ? e : Ma(f);
	    e = null == b ? e : Ma(b);
	    a = g.getPooled(h, f, c, d);
	    a.type = l + "leave";
	    a.target = m;
	    a.relatedTarget = e;
	    c = g.getPooled(k, b, c, d);
	    c.type = l + "enter";
	    c.target = e;
	    c.relatedTarget = m;
	    d = b;
	    if (f && d) a: {
	      b = f;
	      e = d;
	      l = 0;

	      for (g = b; g; g = Oa(g)) l++;

	      g = 0;

	      for (k = e; k; k = Oa(k)) g++;

	      for (; 0 < l - g;) b = Oa(b), l--;

	      for (; 0 < g - l;) e = Oa(e), g--;

	      for (; l--;) {
	        if (b === e || b === e.alternate) break a;
	        b = Oa(b);
	        e = Oa(e);
	      }

	      b = null;
	    } else b = null;
	    e = b;

	    for (b = []; f && f !== e;) {
	      l = f.alternate;
	      if (null !== l && l === e) break;
	      b.push(f);
	      f = Oa(f);
	    }

	    for (f = []; d && d !== e;) {
	      l = d.alternate;
	      if (null !== l && l === e) break;
	      f.push(d);
	      d = Oa(d);
	    }

	    for (d = 0; d < b.length; d++) Ra(b[d], "bubbled", a);

	    for (d = f.length; 0 < d--;) Ra(f[d], "captured", c);

	    return [a, c];
	  }
	},
	    gd = Object.prototype.hasOwnProperty;

	function hd(a, b) {
	  return a === b ? 0 !== a || 0 !== b || 1 / a === 1 / b : a !== a && b !== b;
	}

	function id(a, b) {
	  if (hd(a, b)) return !0;
	  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
	  var c = Object.keys(a),
	      d = Object.keys(b);
	  if (c.length !== d.length) return !1;

	  for (d = 0; d < c.length; d++) if (!gd.call(b, c[d]) || !hd(a[c[d]], b[c[d]])) return !1;

	  return !0;
	}

	function jd(a) {
	  var b = a;
	  if (a.alternate) for (; b.return;) b = b.return;else {
	    if (0 !== (b.effectTag & 2)) return 1;

	    for (; b.return;) if (b = b.return, 0 !== (b.effectTag & 2)) return 1;
	  }
	  return 5 === b.tag ? 2 : 3;
	}

	function kd(a) {
	  2 !== jd(a) ? t$1("188") : void 0;
	}

	function ld(a) {
	  var b = a.alternate;
	  if (!b) return b = jd(a), 3 === b ? t$1("188") : void 0, 1 === b ? null : a;

	  for (var c = a, d = b;;) {
	    var e = c.return,
	        f = e ? e.alternate : null;
	    if (!e || !f) break;

	    if (e.child === f.child) {
	      for (var g = e.child; g;) {
	        if (g === c) return kd(e), a;
	        if (g === d) return kd(e), b;
	        g = g.sibling;
	      }

	      t$1("188");
	    }

	    if (c.return !== d.return) c = e, d = f;else {
	      g = !1;

	      for (var h = e.child; h;) {
	        if (h === c) {
	          g = !0;
	          c = e;
	          d = f;
	          break;
	        }

	        if (h === d) {
	          g = !0;
	          d = e;
	          c = f;
	          break;
	        }

	        h = h.sibling;
	      }

	      if (!g) {
	        for (h = f.child; h;) {
	          if (h === c) {
	            g = !0;
	            c = f;
	            d = e;
	            break;
	          }

	          if (h === d) {
	            g = !0;
	            d = f;
	            c = e;
	            break;
	          }

	          h = h.sibling;
	        }

	        g ? void 0 : t$1("189");
	      }
	    }
	    c.alternate !== d ? t$1("190") : void 0;
	  }

	  5 !== c.tag ? t$1("188") : void 0;
	  return c.stateNode.current === c ? a : b;
	}

	function md(a) {
	  a = ld(a);
	  if (!a) return null;

	  for (var b = a;;) {
	    if (7 === b.tag || 8 === b.tag) return b;
	    if (b.child) b.child.return = b, b = b.child;else {
	      if (b === a) break;

	      for (; !b.sibling;) {
	        if (!b.return || b.return === a) return null;
	        b = b.return;
	      }

	      b.sibling.return = b.return;
	      b = b.sibling;
	    }
	  }

	  return null;
	}

	var nd = z$1.extend({
	  animationName: null,
	  elapsedTime: null,
	  pseudoElement: null
	}),
	    od = z$1.extend({
	  clipboardData: function (a) {
	    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
	  }
	}),
	    pd = Vc.extend({
	  relatedTarget: null
	});

	function qd(a) {
	  var b = a.keyCode;
	  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
	  10 === a && (a = 13);
	  return 32 <= a || 13 === a ? a : 0;
	}

	var rd = {
	  Esc: "Escape",
	  Spacebar: " ",
	  Left: "ArrowLeft",
	  Up: "ArrowUp",
	  Right: "ArrowRight",
	  Down: "ArrowDown",
	  Del: "Delete",
	  Win: "OS",
	  Menu: "ContextMenu",
	  Apps: "ContextMenu",
	  Scroll: "ScrollLock",
	  MozPrintableKey: "Unidentified"
	},
	    sd = {
	  8: "Backspace",
	  9: "Tab",
	  12: "Clear",
	  13: "Enter",
	  16: "Shift",
	  17: "Control",
	  18: "Alt",
	  19: "Pause",
	  20: "CapsLock",
	  27: "Escape",
	  32: " ",
	  33: "PageUp",
	  34: "PageDown",
	  35: "End",
	  36: "Home",
	  37: "ArrowLeft",
	  38: "ArrowUp",
	  39: "ArrowRight",
	  40: "ArrowDown",
	  45: "Insert",
	  46: "Delete",
	  112: "F1",
	  113: "F2",
	  114: "F3",
	  115: "F4",
	  116: "F5",
	  117: "F6",
	  118: "F7",
	  119: "F8",
	  120: "F9",
	  121: "F10",
	  122: "F11",
	  123: "F12",
	  144: "NumLock",
	  145: "ScrollLock",
	  224: "Meta"
	},
	    td = Vc.extend({
	  key: function (a) {
	    if (a.key) {
	      var b = rd[a.key] || a.key;
	      if ("Unidentified" !== b) return b;
	    }

	    return "keypress" === a.type ? (a = qd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? sd[a.keyCode] || "Unidentified" : "";
	  },
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: Yc,
	  charCode: function (a) {
	    return "keypress" === a.type ? qd(a) : 0;
	  },
	  keyCode: function (a) {
	    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
	  },
	  which: function (a) {
	    return "keypress" === a.type ? qd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
	  }
	}),
	    ud = cd.extend({
	  dataTransfer: null
	}),
	    vd = Vc.extend({
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: Yc
	}),
	    wd = z$1.extend({
	  propertyName: null,
	  elapsedTime: null,
	  pseudoElement: null
	}),
	    xd = cd.extend({
	  deltaX: function (a) {
	    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
	  },
	  deltaY: function (a) {
	    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
	  },
	  deltaZ: null,
	  deltaMode: null
	}),
	    yd = [["abort", "abort"], [bb, "animationEnd"], [cb, "animationIteration"], [db, "animationStart"], ["canplay", "canPlay"], ["canplaythrough", "canPlayThrough"], ["drag", "drag"], ["dragenter", "dragEnter"], ["dragexit", "dragExit"], ["dragleave", "dragLeave"], ["dragover", "dragOver"], ["durationchange", "durationChange"], ["emptied", "emptied"], ["encrypted", "encrypted"], ["ended", "ended"], ["error", "error"], ["gotpointercapture", "gotPointerCapture"], ["load", "load"], ["loadeddata", "loadedData"], ["loadedmetadata", "loadedMetadata"], ["loadstart", "loadStart"], ["lostpointercapture", "lostPointerCapture"], ["mousemove", "mouseMove"], ["mouseout", "mouseOut"], ["mouseover", "mouseOver"], ["playing", "playing"], ["pointermove", "pointerMove"], ["pointerout", "pointerOut"], ["pointerover", "pointerOver"], ["progress", "progress"], ["scroll", "scroll"], ["seeking", "seeking"], ["stalled", "stalled"], ["suspend", "suspend"], ["timeupdate", "timeUpdate"], ["toggle", "toggle"], ["touchmove", "touchMove"], [eb, "transitionEnd"], ["waiting", "waiting"], ["wheel", "wheel"]],
	    zd = {},
	    Ad = {};

	function Bd(a, b) {
	  var c = a[0];
	  a = a[1];
	  var d = "on" + (a[0].toUpperCase() + a.slice(1));
	  b = {
	    phasedRegistrationNames: {
	      bubbled: d,
	      captured: d + "Capture"
	    },
	    dependencies: [c],
	    isInteractive: b
	  };
	  zd[a] = b;
	  Ad[c] = b;
	}

	[["blur", "blur"], ["cancel", "cancel"], ["click", "click"], ["close", "close"], ["contextmenu", "contextMenu"], ["copy", "copy"], ["cut", "cut"], ["auxclick", "auxClick"], ["dblclick", "doubleClick"], ["dragend", "dragEnd"], ["dragstart", "dragStart"], ["drop", "drop"], ["focus", "focus"], ["input", "input"], ["invalid", "invalid"], ["keydown", "keyDown"], ["keypress", "keyPress"], ["keyup", "keyUp"], ["mousedown", "mouseDown"], ["mouseup", "mouseUp"], ["paste", "paste"], ["pause", "pause"], ["play", "play"], ["pointercancel", "pointerCancel"], ["pointerdown", "pointerDown"], ["pointerup", "pointerUp"], ["ratechange", "rateChange"], ["reset", "reset"], ["seeked", "seeked"], ["submit", "submit"], ["touchcancel", "touchCancel"], ["touchend", "touchEnd"], ["touchstart", "touchStart"], ["volumechange", "volumeChange"]].forEach(function (a) {
	  Bd(a, !0);
	});
	yd.forEach(function (a) {
	  Bd(a, !1);
	});
	var Cd = {
	  eventTypes: zd,
	  isInteractiveTopLevelEventType: function (a) {
	    a = Ad[a];
	    return void 0 !== a && !0 === a.isInteractive;
	  },
	  extractEvents: function (a, b, c, d) {
	    var e = Ad[a];
	    if (!e) return null;

	    switch (a) {
	      case "keypress":
	        if (0 === qd(c)) return null;

	      case "keydown":
	      case "keyup":
	        a = td;
	        break;

	      case "blur":
	      case "focus":
	        a = pd;
	        break;

	      case "click":
	        if (2 === c.button) return null;

	      case "auxclick":
	      case "dblclick":
	      case "mousedown":
	      case "mousemove":
	      case "mouseup":
	      case "mouseout":
	      case "mouseover":
	      case "contextmenu":
	        a = cd;
	        break;

	      case "drag":
	      case "dragend":
	      case "dragenter":
	      case "dragexit":
	      case "dragleave":
	      case "dragover":
	      case "dragstart":
	      case "drop":
	        a = ud;
	        break;

	      case "touchcancel":
	      case "touchend":
	      case "touchmove":
	      case "touchstart":
	        a = vd;
	        break;

	      case bb:
	      case cb:
	      case db:
	        a = nd;
	        break;

	      case eb:
	        a = wd;
	        break;

	      case "scroll":
	        a = Vc;
	        break;

	      case "wheel":
	        a = xd;
	        break;

	      case "copy":
	      case "cut":
	      case "paste":
	        a = od;
	        break;

	      case "gotpointercapture":
	      case "lostpointercapture":
	      case "pointercancel":
	      case "pointerdown":
	      case "pointermove":
	      case "pointerout":
	      case "pointerover":
	      case "pointerup":
	        a = dd;
	        break;

	      default:
	        a = z$1;
	    }

	    b = a.getPooled(e, b, c, d);
	    Ua(b);
	    return b;
	  }
	},
	    Dd = Cd.isInteractiveTopLevelEventType,
	    Ed = [];

	function Fd(a) {
	  var b = a.targetInst,
	      c = b;

	  do {
	    if (!c) {
	      a.ancestors.push(c);
	      break;
	    }

	    var d;

	    for (d = c; d.return;) d = d.return;

	    d = 5 !== d.tag ? null : d.stateNode.containerInfo;
	    if (!d) break;
	    a.ancestors.push(c);
	    c = Ka(d);
	  } while (c);

	  for (c = 0; c < a.ancestors.length; c++) {
	    b = a.ancestors[c];
	    var e = Sb(a.nativeEvent);
	    d = a.topLevelType;

	    for (var f = a.nativeEvent, g = null, h = 0; h < pa.length; h++) {
	      var k = pa[h];
	      k && (k = k.extractEvents(d, b, f, e)) && (g = ya(g, k));
	    }

	    Ga(g, !1);
	  }
	}

	var Gd = !0;

	function F$1(a, b) {
	  if (!b) return null;
	  var c = (Dd(a) ? Hd : Id).bind(null, a);
	  b.addEventListener(a, c, !1);
	}

	function Jd(a, b) {
	  if (!b) return null;
	  var c = (Dd(a) ? Hd : Id).bind(null, a);
	  b.addEventListener(a, c, !0);
	}

	function Hd(a, b) {
	  Mb(Id, a, b);
	}

	function Id(a, b) {
	  if (Gd) {
	    var c = Sb(b);
	    c = Ka(c);
	    null === c || "number" !== typeof c.tag || 2 === jd(c) || (c = null);

	    if (Ed.length) {
	      var d = Ed.pop();
	      d.topLevelType = a;
	      d.nativeEvent = b;
	      d.targetInst = c;
	      a = d;
	    } else a = {
	      topLevelType: a,
	      nativeEvent: b,
	      targetInst: c,
	      ancestors: []
	    };

	    try {
	      Pb(Fd, a);
	    } finally {
	      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > Ed.length && Ed.push(a);
	    }
	  }
	}

	var Kd = {},
	    Ld = 0,
	    Md = "_reactListenersID" + ("" + Math.random()).slice(2);

	function Nd(a) {
	  Object.prototype.hasOwnProperty.call(a, Md) || (a[Md] = Ld++, Kd[a[Md]] = {});
	  return Kd[a[Md]];
	}

	function Od(a) {
	  a = a || ("undefined" !== typeof document ? document : void 0);
	  if ("undefined" === typeof a) return null;

	  try {
	    return a.activeElement || a.body;
	  } catch (b) {
	    return a.body;
	  }
	}

	function Qd(a) {
	  for (; a && a.firstChild;) a = a.firstChild;

	  return a;
	}

	function Rd(a, b) {
	  var c = Qd(a);
	  a = 0;

	  for (var d; c;) {
	    if (3 === c.nodeType) {
	      d = a + c.textContent.length;
	      if (a <= b && d >= b) return {
	        node: c,
	        offset: b - a
	      };
	      a = d;
	    }

	    a: {
	      for (; c;) {
	        if (c.nextSibling) {
	          c = c.nextSibling;
	          break a;
	        }

	        c = c.parentNode;
	      }

	      c = void 0;
	    }

	    c = Qd(c);
	  }
	}

	function Sd(a, b) {
	  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Sd(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
	}

	function Td() {
	  for (var a = window, b = Od(); b instanceof a.HTMLIFrameElement;) {
	    try {
	      a = b.contentDocument.defaultView;
	    } catch (c) {
	      break;
	    }

	    b = Od(a.document);
	  }

	  return b;
	}

	function Ud(a) {
	  var b = a && a.nodeName && a.nodeName.toLowerCase();
	  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
	}

	var Vd = Va && "documentMode" in document && 11 >= document.documentMode,
	    Wd = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: "onSelect",
	      captured: "onSelectCapture"
	    },
	    dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
	  }
	},
	    Xd = null,
	    Yd = null,
	    Zd = null,
	    $d = !1;

	function ae(a, b) {
	  var c = b.window === b ? b.document : 9 === b.nodeType ? b : b.ownerDocument;
	  if ($d || null == Xd || Xd !== Od(c)) return null;
	  c = Xd;
	  "selectionStart" in c && Ud(c) ? c = {
	    start: c.selectionStart,
	    end: c.selectionEnd
	  } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
	    anchorNode: c.anchorNode,
	    anchorOffset: c.anchorOffset,
	    focusNode: c.focusNode,
	    focusOffset: c.focusOffset
	  });
	  return Zd && id(Zd, c) ? null : (Zd = c, a = z$1.getPooled(Wd.select, Yd, a, b), a.type = "select", a.target = Xd, Ua(a), a);
	}

	var be = {
	  eventTypes: Wd,
	  extractEvents: function (a, b, c, d) {
	    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
	        f;

	    if (!(f = !e)) {
	      a: {
	        e = Nd(e);
	        f = ta.onSelect;

	        for (var g = 0; g < f.length; g++) {
	          var h = f[g];

	          if (!e.hasOwnProperty(h) || !e[h]) {
	            e = !1;
	            break a;
	          }
	        }

	        e = !0;
	      }

	      f = !e;
	    }

	    if (f) return null;
	    e = b ? Ma(b) : window;

	    switch (a) {
	      case "focus":
	        if (Rb(e) || "true" === e.contentEditable) Xd = e, Yd = b, Zd = null;
	        break;

	      case "blur":
	        Zd = Yd = Xd = null;
	        break;

	      case "mousedown":
	        $d = !0;
	        break;

	      case "contextmenu":
	      case "mouseup":
	      case "dragend":
	        return $d = !1, ae(c, d);

	      case "selectionchange":
	        if (Vd) break;

	      case "keydown":
	      case "keyup":
	        return ae(c, d);
	    }

	    return null;
	  }
	};
	Ea.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
	ua = Na;
	va = La;
	wa = Ma;
	Ea.injectEventPluginsByName({
	  SimpleEventPlugin: Cd,
	  EnterLeaveEventPlugin: fd,
	  ChangeEventPlugin: Uc,
	  SelectEventPlugin: be,
	  BeforeInputEventPlugin: Eb
	});

	function ce(a) {
	  var b = "";
	  react.Children.forEach(a, function (a) {
	    null != a && (b += a);
	  });
	  return b;
	}

	function de(a, b) {
	  a = objectAssign({
	    children: void 0
	  }, b);
	  if (b = ce(b.children)) a.children = b;
	  return a;
	}

	function ee(a, b, c, d) {
	  a = a.options;

	  if (b) {
	    b = {};

	    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;

	    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
	  } else {
	    c = "" + yc(c);
	    b = null;

	    for (e = 0; e < a.length; e++) {
	      if (a[e].value === c) {
	        a[e].selected = !0;
	        d && (a[e].defaultSelected = !0);
	        return;
	      }

	      null !== b || a[e].disabled || (b = a[e]);
	    }

	    null !== b && (b.selected = !0);
	  }
	}

	function fe(a, b) {
	  null != b.dangerouslySetInnerHTML ? t$1("91") : void 0;
	  return objectAssign({}, b, {
	    value: void 0,
	    defaultValue: void 0,
	    children: "" + a._wrapperState.initialValue
	  });
	}

	function ge(a, b) {
	  var c = b.value;
	  null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? t$1("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : t$1("93"), b = b[0]), c = b), null == c && (c = ""));
	  a._wrapperState = {
	    initialValue: yc(c)
	  };
	}

	function he(a, b) {
	  var c = yc(b.value),
	      d = yc(b.defaultValue);
	  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
	  null != d && (a.defaultValue = "" + d);
	}

	function ie(a) {
	  var b = a.textContent;
	  b === a._wrapperState.initialValue && (a.value = b);
	}

	var je = {
	  html: "http://www.w3.org/1999/xhtml",
	  mathml: "http://www.w3.org/1998/Math/MathML",
	  svg: "http://www.w3.org/2000/svg"
	};

	function ke(a) {
	  switch (a) {
	    case "svg":
	      return "http://www.w3.org/2000/svg";

	    case "math":
	      return "http://www.w3.org/1998/Math/MathML";

	    default:
	      return "http://www.w3.org/1999/xhtml";
	  }
	}

	function le(a, b) {
	  return null == a || "http://www.w3.org/1999/xhtml" === a ? ke(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
	}

	var me = void 0,
	    ne = function (a) {
	  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
	    MSApp.execUnsafeLocalFunction(function () {
	      return a(b, c, d, e);
	    });
	  } : a;
	}(function (a, b) {
	  if (a.namespaceURI !== je.svg || "innerHTML" in a) a.innerHTML = b;else {
	    me = me || document.createElement("div");
	    me.innerHTML = "<svg>" + b + "</svg>";

	    for (b = me.firstChild; a.firstChild;) a.removeChild(a.firstChild);

	    for (; b.firstChild;) a.appendChild(b.firstChild);
	  }
	});

	function oe(a, b) {
	  if (b) {
	    var c = a.firstChild;

	    if (c && c === a.lastChild && 3 === c.nodeType) {
	      c.nodeValue = b;
	      return;
	    }
	  }

	  a.textContent = b;
	}

	var pe = {
	  animationIterationCount: !0,
	  borderImageOutset: !0,
	  borderImageSlice: !0,
	  borderImageWidth: !0,
	  boxFlex: !0,
	  boxFlexGroup: !0,
	  boxOrdinalGroup: !0,
	  columnCount: !0,
	  columns: !0,
	  flex: !0,
	  flexGrow: !0,
	  flexPositive: !0,
	  flexShrink: !0,
	  flexNegative: !0,
	  flexOrder: !0,
	  gridArea: !0,
	  gridRow: !0,
	  gridRowEnd: !0,
	  gridRowSpan: !0,
	  gridRowStart: !0,
	  gridColumn: !0,
	  gridColumnEnd: !0,
	  gridColumnSpan: !0,
	  gridColumnStart: !0,
	  fontWeight: !0,
	  lineClamp: !0,
	  lineHeight: !0,
	  opacity: !0,
	  order: !0,
	  orphans: !0,
	  tabSize: !0,
	  widows: !0,
	  zIndex: !0,
	  zoom: !0,
	  fillOpacity: !0,
	  floodOpacity: !0,
	  stopOpacity: !0,
	  strokeDasharray: !0,
	  strokeDashoffset: !0,
	  strokeMiterlimit: !0,
	  strokeOpacity: !0,
	  strokeWidth: !0
	},
	    qe = ["Webkit", "ms", "Moz", "O"];
	Object.keys(pe).forEach(function (a) {
	  qe.forEach(function (b) {
	    b = b + a.charAt(0).toUpperCase() + a.substring(1);
	    pe[b] = pe[a];
	  });
	});

	function re(a, b) {
	  a = a.style;

	  for (var c in b) if (b.hasOwnProperty(c)) {
	    var d = 0 === c.indexOf("--");
	    var e = c;
	    var f = b[c];
	    e = null == f || "boolean" === typeof f || "" === f ? "" : d || "number" !== typeof f || 0 === f || pe.hasOwnProperty(e) && pe[e] ? ("" + f).trim() : f + "px";
	    "float" === c && (c = "cssFloat");
	    d ? a.setProperty(c, e) : a[c] = e;
	  }
	}

	var se = objectAssign({
	  menuitem: !0
	}, {
	  area: !0,
	  base: !0,
	  br: !0,
	  col: !0,
	  embed: !0,
	  hr: !0,
	  img: !0,
	  input: !0,
	  keygen: !0,
	  link: !0,
	  meta: !0,
	  param: !0,
	  source: !0,
	  track: !0,
	  wbr: !0
	});

	function te(a, b) {
	  b && (se[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? t$1("137", a, "") : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? t$1("60") : void 0, "object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML ? void 0 : t$1("61")), null != b.style && "object" !== typeof b.style ? t$1("62", "") : void 0);
	}

	function ue(a, b) {
	  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

	  switch (a) {
	    case "annotation-xml":
	    case "color-profile":
	    case "font-face":
	    case "font-face-src":
	    case "font-face-uri":
	    case "font-face-format":
	    case "font-face-name":
	    case "missing-glyph":
	      return !1;

	    default:
	      return !0;
	  }
	}

	function ve(a, b) {
	  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;
	  var c = Nd(a);
	  b = ta[b];

	  for (var d = 0; d < b.length; d++) {
	    var e = b[d];

	    if (!c.hasOwnProperty(e) || !c[e]) {
	      switch (e) {
	        case "scroll":
	          Jd("scroll", a);
	          break;

	        case "focus":
	        case "blur":
	          Jd("focus", a);
	          Jd("blur", a);
	          c.blur = !0;
	          c.focus = !0;
	          break;

	        case "cancel":
	        case "close":
	          Tb(e) && Jd(e, a);
	          break;

	        case "invalid":
	        case "submit":
	        case "reset":
	          break;

	        default:
	          -1 === fb.indexOf(e) && F$1(e, a);
	      }

	      c[e] = !0;
	    }
	  }
	}

	function we() {}

	var xe = null,
	    ye = null;

	function ze(a, b) {
	  switch (a) {
	    case "button":
	    case "input":
	    case "select":
	    case "textarea":
	      return !!b.autoFocus;
	  }

	  return !1;
	}

	function Ae(a, b) {
	  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
	}

	function Be(a) {
	  for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) a = a.nextSibling;

	  return a;
	}

	function Ce(a) {
	  for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) a = a.nextSibling;

	  return a;
	}
	var De = [],
	    Ee = -1;

	function G$1(a) {
	  0 > Ee || (a.current = De[Ee], De[Ee] = null, Ee--);
	}

	function H$1(a, b) {
	  Ee++;
	  De[Ee] = a.current;
	  a.current = b;
	}

	var Fe = {},
	    I$1 = {
	  current: Fe
	},
	    J$1 = {
	  current: !1
	},
	    Ge = Fe;

	function He(a, b) {
	  var c = a.type.contextTypes;
	  if (!c) return Fe;
	  var d = a.stateNode;
	  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
	  var e = {},
	      f;

	  for (f in c) e[f] = b[f];

	  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
	  return e;
	}

	function K$1(a) {
	  a = a.childContextTypes;
	  return null !== a && void 0 !== a;
	}

	function Ie(a) {
	  G$1(J$1, a);
	  G$1(I$1, a);
	}

	function Je(a) {
	  G$1(J$1, a);
	  G$1(I$1, a);
	}

	function Ke(a, b, c) {
	  I$1.current !== Fe ? t$1("168") : void 0;
	  H$1(I$1, b, a);
	  H$1(J$1, c, a);
	}

	function Le(a, b, c) {
	  var d = a.stateNode;
	  a = b.childContextTypes;
	  if ("function" !== typeof d.getChildContext) return c;
	  d = d.getChildContext();

	  for (var e in d) e in a ? void 0 : t$1("108", lc(b) || "Unknown", e);

	  return objectAssign({}, c, d);
	}

	function Me(a) {
	  var b = a.stateNode;
	  b = b && b.__reactInternalMemoizedMergedChildContext || Fe;
	  Ge = I$1.current;
	  H$1(I$1, b, a);
	  H$1(J$1, J$1.current, a);
	  return !0;
	}

	function Ne(a, b, c) {
	  var d = a.stateNode;
	  d ? void 0 : t$1("169");
	  c ? (b = Le(a, b, Ge), d.__reactInternalMemoizedMergedChildContext = b, G$1(J$1, a), G$1(I$1, a), H$1(I$1, b, a)) : G$1(J$1, a);
	  H$1(J$1, c, a);
	}

	var Oe = null,
	    Pe = null;

	function Qe(a) {
	  return function (b) {
	    try {
	      return a(b);
	    } catch (c) {}
	  };
	}

	function Re(a) {
	  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
	  var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
	  if (b.isDisabled || !b.supportsFiber) return !0;

	  try {
	    var c = b.inject(a);
	    Oe = Qe(function (a) {
	      return b.onCommitFiberRoot(c, a);
	    });
	    Pe = Qe(function (a) {
	      return b.onCommitFiberUnmount(c, a);
	    });
	  } catch (d) {}

	  return !0;
	}

	function Se(a, b, c, d) {
	  this.tag = a;
	  this.key = c;
	  this.sibling = this.child = this.return = this.stateNode = this.type = null;
	  this.index = 0;
	  this.ref = null;
	  this.pendingProps = b;
	  this.firstContextDependency = this.memoizedState = this.updateQueue = this.memoizedProps = null;
	  this.mode = d;
	  this.effectTag = 0;
	  this.lastEffect = this.firstEffect = this.nextEffect = null;
	  this.childExpirationTime = this.expirationTime = 0;
	  this.alternate = null;
	}

	function Te(a) {
	  a = a.prototype;
	  return !(!a || !a.isReactComponent);
	}

	function Ue(a, b, c) {
	  var d = a.alternate;
	  null === d ? (d = new Se(a.tag, b, a.key, a.mode), d.type = a.type, d.stateNode = a.stateNode, d.alternate = a, a.alternate = d) : (d.pendingProps = b, d.effectTag = 0, d.nextEffect = null, d.firstEffect = null, d.lastEffect = null);
	  d.childExpirationTime = a.childExpirationTime;
	  d.expirationTime = b !== a.pendingProps ? c : a.expirationTime;
	  d.child = a.child;
	  d.memoizedProps = a.memoizedProps;
	  d.memoizedState = a.memoizedState;
	  d.updateQueue = a.updateQueue;
	  d.firstContextDependency = a.firstContextDependency;
	  d.sibling = a.sibling;
	  d.index = a.index;
	  d.ref = a.ref;
	  return d;
	}

	function Ve(a, b, c) {
	  var d = a.type,
	      e = a.key;
	  a = a.props;
	  var f = void 0;
	  if ("function" === typeof d) f = Te(d) ? 2 : 4;else if ("string" === typeof d) f = 7;else a: switch (d) {
	    case bc:
	      return We(a.children, b, c, e);

	    case gc:
	      f = 10;
	      b |= 3;
	      break;

	    case cc:
	      f = 10;
	      b |= 2;
	      break;

	    case dc:
	      return d = new Se(15, a, e, b | 4), d.type = dc, d.expirationTime = c, d;

	    case ic:
	      f = 16;
	      break;

	    default:
	      if ("object" === typeof d && null !== d) switch (d.$$typeof) {
	        case ec:
	          f = 12;
	          break a;

	        case fc:
	          f = 11;
	          break a;

	        case hc:
	          f = 13;
	          break a;

	        default:
	          if ("function" === typeof d.then) {
	            f = 4;
	            break a;
	          }

	      }
	      t$1("130", null == d ? d : typeof d, "");
	  }
	  b = new Se(f, a, e, b);
	  b.type = d;
	  b.expirationTime = c;
	  return b;
	}

	function We(a, b, c, d) {
	  a = new Se(9, a, d, b);
	  a.expirationTime = c;
	  return a;
	}

	function Xe(a, b, c) {
	  a = new Se(8, a, null, b);
	  a.expirationTime = c;
	  return a;
	}

	function Ye(a, b, c) {
	  b = new Se(6, null !== a.children ? a.children : [], a.key, b);
	  b.expirationTime = c;
	  b.stateNode = {
	    containerInfo: a.containerInfo,
	    pendingChildren: null,
	    implementation: a.implementation
	  };
	  return b;
	}

	function Ze(a, b) {
	  a.didError = !1;
	  var c = a.earliestPendingTime;
	  0 === c ? a.earliestPendingTime = a.latestPendingTime = b : c > b ? a.earliestPendingTime = b : a.latestPendingTime < b && (a.latestPendingTime = b);
	  $e(b, a);
	}

	function $e(a, b) {
	  var c = b.earliestSuspendedTime,
	      d = b.latestSuspendedTime,
	      e = b.earliestPendingTime,
	      f = b.latestPingedTime;
	  e = 0 !== e ? e : f;
	  0 === e && (0 === a || d > a) && (e = d);
	  a = e;
	  0 !== a && 0 !== c && c < a && (a = c);
	  b.nextExpirationTimeToWorkOn = e;
	  b.expirationTime = a;
	}

	var af = !1;

	function bf(a) {
	  return {
	    baseState: a,
	    firstUpdate: null,
	    lastUpdate: null,
	    firstCapturedUpdate: null,
	    lastCapturedUpdate: null,
	    firstEffect: null,
	    lastEffect: null,
	    firstCapturedEffect: null,
	    lastCapturedEffect: null
	  };
	}

	function cf(a) {
	  return {
	    baseState: a.baseState,
	    firstUpdate: a.firstUpdate,
	    lastUpdate: a.lastUpdate,
	    firstCapturedUpdate: null,
	    lastCapturedUpdate: null,
	    firstEffect: null,
	    lastEffect: null,
	    firstCapturedEffect: null,
	    lastCapturedEffect: null
	  };
	}

	function df(a) {
	  return {
	    expirationTime: a,
	    tag: 0,
	    payload: null,
	    callback: null,
	    next: null,
	    nextEffect: null
	  };
	}

	function ef(a, b) {
	  null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
	}

	function ff(a, b) {
	  var c = a.alternate;

	  if (null === c) {
	    var d = a.updateQueue;
	    var e = null;
	    null === d && (d = a.updateQueue = bf(a.memoizedState));
	  } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = bf(a.memoizedState), e = c.updateQueue = bf(c.memoizedState)) : d = a.updateQueue = cf(e) : null === e && (e = c.updateQueue = cf(d));

	  null === e || d === e ? ef(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (ef(d, b), ef(e, b)) : (ef(d, b), e.lastUpdate = b);
	}

	function gf(a, b) {
	  var c = a.updateQueue;
	  c = null === c ? a.updateQueue = bf(a.memoizedState) : hf(a, c);
	  null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
	}

	function hf(a, b) {
	  var c = a.alternate;
	  null !== c && b === c.updateQueue && (b = a.updateQueue = cf(b));
	  return b;
	}

	function jf(a, b, c, d, e, f) {
	  switch (c.tag) {
	    case 1:
	      return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

	    case 3:
	      a.effectTag = a.effectTag & -1025 | 64;

	    case 0:
	      a = c.payload;
	      e = "function" === typeof a ? a.call(f, d, e) : a;
	      if (null === e || void 0 === e) break;
	      return objectAssign({}, d, e);

	    case 2:
	      af = !0;
	  }

	  return d;
	}

	function kf(a, b, c, d, e) {
	  af = !1;
	  b = hf(a, b);

	  for (var f = b.baseState, g = null, h = 0, k = b.firstUpdate, l = f; null !== k;) {
	    var m = k.expirationTime;

	    if (m > e) {
	      if (null === g && (g = k, f = l), 0 === h || h > m) h = m;
	    } else l = jf(a, b, k, l, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = k : (b.lastEffect.nextEffect = k, b.lastEffect = k));

	    k = k.next;
	  }

	  m = null;

	  for (k = b.firstCapturedUpdate; null !== k;) {
	    var r = k.expirationTime;

	    if (r > e) {
	      if (null === m && (m = k, null === g && (f = l)), 0 === h || h > r) h = r;
	    } else l = jf(a, b, k, l, c, d), null !== k.callback && (a.effectTag |= 32, k.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = k : (b.lastCapturedEffect.nextEffect = k, b.lastCapturedEffect = k));

	    k = k.next;
	  }

	  null === g && (b.lastUpdate = null);
	  null === m ? b.lastCapturedUpdate = null : a.effectTag |= 32;
	  null === g && null === m && (f = l);
	  b.baseState = f;
	  b.firstUpdate = g;
	  b.firstCapturedUpdate = m;
	  a.expirationTime = h;
	  a.memoizedState = l;
	}

	function lf(a, b, c) {
	  null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
	  mf(b.firstEffect, c);
	  b.firstEffect = b.lastEffect = null;
	  mf(b.firstCapturedEffect, c);
	  b.firstCapturedEffect = b.lastCapturedEffect = null;
	}

	function mf(a, b) {
	  for (; null !== a;) {
	    var c = a.callback;

	    if (null !== c) {
	      a.callback = null;
	      var d = b;
	      "function" !== typeof c ? t$1("191", c) : void 0;
	      c.call(d);
	    }

	    a = a.nextEffect;
	  }
	}

	function nf(a, b) {
	  return {
	    value: a,
	    source: b,
	    stack: mc(b)
	  };
	}

	var of = {
	  current: null
	},
	    pf = null,
	    qf = null,
	    rf = null;

	function sf(a, b) {
	  var c = a.type._context;
	  H$1(of, c._currentValue, a);
	  c._currentValue = b;
	}

	function tf(a) {
	  var b = of.current;
	  G$1(of, a);
	  a.type._context._currentValue = b;
	}

	function uf(a) {
	  pf = a;
	  rf = qf = null;
	  a.firstContextDependency = null;
	}

	function vf(a, b) {
	  if (rf !== a && !1 !== b && 0 !== b) {
	    if ("number" !== typeof b || 1073741823 === b) rf = a, b = 1073741823;
	    b = {
	      context: a,
	      observedBits: b,
	      next: null
	    };
	    null === qf ? (null === pf ? t$1("277") : void 0, pf.firstContextDependency = qf = b) : qf = qf.next = b;
	  }

	  return a._currentValue;
	}

	var wf = {},
	    L$1 = {
	  current: wf
	},
	    xf = {
	  current: wf
	},
	    yf = {
	  current: wf
	};

	function zf(a) {
	  a === wf ? t$1("174") : void 0;
	  return a;
	}

	function Af(a, b) {
	  H$1(yf, b, a);
	  H$1(xf, a, a);
	  H$1(L$1, wf, a);
	  var c = b.nodeType;

	  switch (c) {
	    case 9:
	    case 11:
	      b = (b = b.documentElement) ? b.namespaceURI : le(null, "");
	      break;

	    default:
	      c = 8 === c ? b.parentNode : b, b = c.namespaceURI || null, c = c.tagName, b = le(b, c);
	  }

	  G$1(L$1, a);
	  H$1(L$1, b, a);
	}

	function Bf(a) {
	  G$1(L$1, a);
	  G$1(xf, a);
	  G$1(yf, a);
	}

	function Cf(a) {
	  zf(yf.current);
	  var b = zf(L$1.current);
	  var c = le(b, a.type);
	  b !== c && (H$1(xf, a, a), H$1(L$1, c, a));
	}

	function Df(a) {
	  xf.current === a && (G$1(L$1, a), G$1(xf, a));
	}

	var Ef = new react.Component().refs;

	function Ff(a, b, c, d) {
	  b = a.memoizedState;
	  c = c(d, b);
	  c = null === c || void 0 === c ? b : objectAssign({}, b, c);
	  a.memoizedState = c;
	  d = a.updateQueue;
	  null !== d && 0 === a.expirationTime && (d.baseState = c);
	}

	var Jf = {
	  isMounted: function (a) {
	    return (a = a._reactInternalFiber) ? 2 === jd(a) : !1;
	  },
	  enqueueSetState: function (a, b, c) {
	    a = a._reactInternalFiber;
	    var d = Gf();
	    d = Hf(d, a);
	    var e = df(d);
	    e.payload = b;
	    void 0 !== c && null !== c && (e.callback = c);
	    ff(a, e);
	    If(a, d);
	  },
	  enqueueReplaceState: function (a, b, c) {
	    a = a._reactInternalFiber;
	    var d = Gf();
	    d = Hf(d, a);
	    var e = df(d);
	    e.tag = 1;
	    e.payload = b;
	    void 0 !== c && null !== c && (e.callback = c);
	    ff(a, e);
	    If(a, d);
	  },
	  enqueueForceUpdate: function (a, b) {
	    a = a._reactInternalFiber;
	    var c = Gf();
	    c = Hf(c, a);
	    var d = df(c);
	    d.tag = 2;
	    void 0 !== b && null !== b && (d.callback = b);
	    ff(a, d);
	    If(a, c);
	  }
	};

	function Kf(a, b, c, d, e, f, g) {
	  a = a.stateNode;
	  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !id(c, d) || !id(e, f) : !0;
	}

	function Lf(a, b, c, d) {
	  a = b.state;
	  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
	  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
	  b.state !== a && Jf.enqueueReplaceState(b, b.state, null);
	}

	function Mf(a, b, c, d) {
	  var e = a.stateNode,
	      f = K$1(b) ? Ge : I$1.current;
	  e.props = c;
	  e.state = a.memoizedState;
	  e.refs = Ef;
	  e.context = He(a, f);
	  f = a.updateQueue;
	  null !== f && (kf(a, f, c, e, d), e.state = a.memoizedState);
	  f = b.getDerivedStateFromProps;
	  "function" === typeof f && (Ff(a, b, f, c), e.state = a.memoizedState);
	  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Jf.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (kf(a, f, c, e, d), e.state = a.memoizedState));
	  "function" === typeof e.componentDidMount && (a.effectTag |= 4);
	}

	var Nf = Array.isArray;

	function Of(a, b, c) {
	  a = c.ref;

	  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
	    if (c._owner) {
	      c = c._owner;
	      var d = void 0;
	      c && (2 !== c.tag && 3 !== c.tag ? t$1("110") : void 0, d = c.stateNode);
	      d ? void 0 : t$1("147", a);
	      var e = "" + a;
	      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

	      b = function (a) {
	        var b = d.refs;
	        b === Ef && (b = d.refs = {});
	        null === a ? delete b[e] : b[e] = a;
	      };

	      b._stringRef = e;
	      return b;
	    }

	    "string" !== typeof a ? t$1("284") : void 0;
	    c._owner ? void 0 : t$1("254", a);
	  }

	  return a;
	}

	function Pf(a, b) {
	  "textarea" !== a.type && t$1("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
	}

	function Qf(a) {
	  function b(b, c) {
	    if (a) {
	      var d = b.lastEffect;
	      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
	      c.nextEffect = null;
	      c.effectTag = 8;
	    }
	  }

	  function c(c, d) {
	    if (!a) return null;

	    for (; null !== d;) b(c, d), d = d.sibling;

	    return null;
	  }

	  function d(a, b) {
	    for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;

	    return a;
	  }

	  function e(a, b, c) {
	    a = Ue(a, b, c);
	    a.index = 0;
	    a.sibling = null;
	    return a;
	  }

	  function f(b, c, d) {
	    b.index = d;
	    if (!a) return c;
	    d = b.alternate;
	    if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
	    b.effectTag = 2;
	    return c;
	  }

	  function g(b) {
	    a && null === b.alternate && (b.effectTag = 2);
	    return b;
	  }

	  function h(a, b, c, d) {
	    if (null === b || 8 !== b.tag) return b = Xe(c, a.mode, d), b.return = a, b;
	    b = e(b, c, d);
	    b.return = a;
	    return b;
	  }

	  function k(a, b, c, d) {
	    if (null !== b && b.type === c.type) return d = e(b, c.props, d), d.ref = Of(a, b, c), d.return = a, d;
	    d = Ve(c, a.mode, d);
	    d.ref = Of(a, b, c);
	    d.return = a;
	    return d;
	  }

	  function l(a, b, c, d) {
	    if (null === b || 6 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Ye(c, a.mode, d), b.return = a, b;
	    b = e(b, c.children || [], d);
	    b.return = a;
	    return b;
	  }

	  function m(a, b, c, d, f) {
	    if (null === b || 9 !== b.tag) return b = We(c, a.mode, d, f), b.return = a, b;
	    b = e(b, c, d);
	    b.return = a;
	    return b;
	  }

	  function r(a, b, c) {
	    if ("string" === typeof b || "number" === typeof b) return b = Xe("" + b, a.mode, c), b.return = a, b;

	    if ("object" === typeof b && null !== b) {
	      switch (b.$$typeof) {
	        case $b:
	          return c = Ve(b, a.mode, c), c.ref = Of(a, null, b), c.return = a, c;

	        case ac:
	          return b = Ye(b, a.mode, c), b.return = a, b;
	      }

	      if (Nf(b) || kc(b)) return b = We(b, a.mode, c, null), b.return = a, b;
	      Pf(a, b);
	    }

	    return null;
	  }

	  function A(a, b, c, d) {
	    var e = null !== b ? b.key : null;
	    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

	    if ("object" === typeof c && null !== c) {
	      switch (c.$$typeof) {
	        case $b:
	          return c.key === e ? c.type === bc ? m(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

	        case ac:
	          return c.key === e ? l(a, b, c, d) : null;
	      }

	      if (Nf(c) || kc(c)) return null !== e ? null : m(a, b, c, d, null);
	      Pf(a, c);
	    }

	    return null;
	  }

	  function S(a, b, c, d, e) {
	    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

	    if ("object" === typeof d && null !== d) {
	      switch (d.$$typeof) {
	        case $b:
	          return a = a.get(null === d.key ? c : d.key) || null, d.type === bc ? m(b, a, d.props.children, e, d.key) : k(b, a, d, e);

	        case ac:
	          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
	      }

	      if (Nf(d) || kc(d)) return a = a.get(c) || null, m(b, a, d, e, null);
	      Pf(b, d);
	    }

	    return null;
	  }

	  function B(e, g, h, k) {
	    for (var l = null, m = null, p = g, u = g = 0, q = null; null !== p && u < h.length; u++) {
	      p.index > u ? (q = p, p = null) : q = p.sibling;
	      var v = A(e, p, h[u], k);

	      if (null === v) {
	        null === p && (p = q);
	        break;
	      }

	      a && p && null === v.alternate && b(e, p);
	      g = f(v, g, u);
	      null === m ? l = v : m.sibling = v;
	      m = v;
	      p = q;
	    }

	    if (u === h.length) return c(e, p), l;

	    if (null === p) {
	      for (; u < h.length; u++) if (p = r(e, h[u], k)) g = f(p, g, u), null === m ? l = p : m.sibling = p, m = p;

	      return l;
	    }

	    for (p = d(e, p); u < h.length; u++) if (q = S(p, e, u, h[u], k)) a && null !== q.alternate && p.delete(null === q.key ? u : q.key), g = f(q, g, u), null === m ? l = q : m.sibling = q, m = q;

	    a && p.forEach(function (a) {
	      return b(e, a);
	    });
	    return l;
	  }

	  function P(e, g, h, k) {
	    var l = kc(h);
	    "function" !== typeof l ? t$1("150") : void 0;
	    h = l.call(h);
	    null == h ? t$1("151") : void 0;

	    for (var m = l = null, p = g, u = g = 0, q = null, v = h.next(); null !== p && !v.done; u++, v = h.next()) {
	      p.index > u ? (q = p, p = null) : q = p.sibling;
	      var x = A(e, p, v.value, k);

	      if (null === x) {
	        p || (p = q);
	        break;
	      }

	      a && p && null === x.alternate && b(e, p);
	      g = f(x, g, u);
	      null === m ? l = x : m.sibling = x;
	      m = x;
	      p = q;
	    }

	    if (v.done) return c(e, p), l;

	    if (null === p) {
	      for (; !v.done; u++, v = h.next()) v = r(e, v.value, k), null !== v && (g = f(v, g, u), null === m ? l = v : m.sibling = v, m = v);

	      return l;
	    }

	    for (p = d(e, p); !v.done; u++, v = h.next()) v = S(p, e, u, v.value, k), null !== v && (a && null !== v.alternate && p.delete(null === v.key ? u : v.key), g = f(v, g, u), null === m ? l = v : m.sibling = v, m = v);

	    a && p.forEach(function (a) {
	      return b(e, a);
	    });
	    return l;
	  }

	  return function (a, d, f, h) {
	    var k = "object" === typeof f && null !== f && f.type === bc && null === f.key;
	    k && (f = f.props.children);
	    var l = "object" === typeof f && null !== f;
	    if (l) switch (f.$$typeof) {
	      case $b:
	        a: {
	          l = f.key;

	          for (k = d; null !== k;) {
	            if (k.key === l) {
	              if (9 === k.tag ? f.type === bc : k.type === f.type) {
	                c(a, k.sibling);
	                d = e(k, f.type === bc ? f.props.children : f.props, h);
	                d.ref = Of(a, k, f);
	                d.return = a;
	                a = d;
	                break a;
	              } else {
	                c(a, k);
	                break;
	              }
	            } else b(a, k);
	            k = k.sibling;
	          }

	          f.type === bc ? (d = We(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Ve(f, a.mode, h), h.ref = Of(a, d, f), h.return = a, a = h);
	        }

	        return g(a);

	      case ac:
	        a: {
	          for (k = f.key; null !== d;) {
	            if (d.key === k) {
	              if (6 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
	                c(a, d.sibling);
	                d = e(d, f.children || [], h);
	                d.return = a;
	                a = d;
	                break a;
	              } else {
	                c(a, d);
	                break;
	              }
	            } else b(a, d);
	            d = d.sibling;
	          }

	          d = Ye(f, a.mode, h);
	          d.return = a;
	          a = d;
	        }

	        return g(a);
	    }
	    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 8 === d.tag ? (c(a, d.sibling), d = e(d, f, h), d.return = a, a = d) : (c(a, d), d = Xe(f, a.mode, h), d.return = a, a = d), g(a);
	    if (Nf(f)) return B(a, d, f, h);
	    if (kc(f)) return P(a, d, f, h);
	    l && Pf(a, f);
	    if ("undefined" === typeof f && !k) switch (a.tag) {
	      case 2:
	      case 3:
	      case 0:
	        h = a.type, t$1("152", h.displayName || h.name || "Component");
	    }
	    return c(a, d);
	  };
	}

	var Rf = Qf(!0),
	    Sf = Qf(!1),
	    Tf = null,
	    Uf = null,
	    Vf = !1;

	function Wf(a, b) {
	  var c = new Se(7, null, null, 0);
	  c.type = "DELETED";
	  c.stateNode = b;
	  c.return = a;
	  c.effectTag = 8;
	  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
	}

	function Xf(a, b) {
	  switch (a.tag) {
	    case 7:
	      var c = a.type;
	      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
	      return null !== b ? (a.stateNode = b, !0) : !1;

	    case 8:
	      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

	    default:
	      return !1;
	  }
	}

	function Yf(a) {
	  if (Vf) {
	    var b = Uf;

	    if (b) {
	      var c = b;

	      if (!Xf(a, b)) {
	        b = Be(c);

	        if (!b || !Xf(a, b)) {
	          a.effectTag |= 2;
	          Vf = !1;
	          Tf = a;
	          return;
	        }

	        Wf(Tf, c);
	      }

	      Tf = a;
	      Uf = Ce(b);
	    } else a.effectTag |= 2, Vf = !1, Tf = a;
	  }
	}

	function Zf(a) {
	  for (a = a.return; null !== a && 7 !== a.tag && 5 !== a.tag;) a = a.return;

	  Tf = a;
	}

	function $f(a) {
	  if (a !== Tf) return !1;
	  if (!Vf) return Zf(a), Vf = !0, !1;
	  var b = a.type;
	  if (7 !== a.tag || "head" !== b && "body" !== b && !Ae(b, a.memoizedProps)) for (b = Uf; b;) Wf(a, b), b = Be(b);
	  Zf(a);
	  Uf = Tf ? Be(a.stateNode) : null;
	  return !0;
	}

	function ag() {
	  Uf = Tf = null;
	  Vf = !1;
	}

	function bg(a) {
	  switch (a._reactStatus) {
	    case 1:
	      return a._reactResult;

	    case 2:
	      throw a._reactResult;

	    case 0:
	      throw a;

	    default:
	      throw a._reactStatus = 0, a.then(function (b) {
	        if (0 === a._reactStatus) {
	          a._reactStatus = 1;

	          if ("object" === typeof b && null !== b) {
	            var c = b.default;
	            b = void 0 !== c && null !== c ? c : b;
	          }

	          a._reactResult = b;
	        }
	      }, function (b) {
	        0 === a._reactStatus && (a._reactStatus = 2, a._reactResult = b);
	      }), a;
	  }
	}

	var cg = Yb.ReactCurrentOwner;

	function M$1(a, b, c, d) {
	  b.child = null === a ? Sf(b, null, c, d) : Rf(b, a.child, c, d);
	}

	function dg(a, b, c, d, e) {
	  c = c.render;
	  var f = b.ref;
	  if (!J$1.current && b.memoizedProps === d && f === (null !== a ? a.ref : null)) return eg(a, b, e);
	  c = c(d, f);
	  M$1(a, b, c, e);
	  b.memoizedProps = d;
	  return b.child;
	}

	function fg(a, b) {
	  var c = b.ref;
	  if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
	}

	function gg(a, b, c, d, e) {
	  var f = K$1(c) ? Ge : I$1.current;
	  f = He(b, f);
	  uf(b, e);
	  c = c(d, f);
	  b.effectTag |= 1;
	  M$1(a, b, c, e);
	  b.memoizedProps = d;
	  return b.child;
	}

	function hg(a, b, c, d, e) {
	  if (K$1(c)) {
	    var f = !0;
	    Me(b);
	  } else f = !1;

	  uf(b, e);
	  if (null === a) {
	    if (null === b.stateNode) {
	      var g = K$1(c) ? Ge : I$1.current,
	          h = c.contextTypes,
	          k = null !== h && void 0 !== h;
	      h = k ? He(b, g) : Fe;
	      var l = new c(d, h);
	      b.memoizedState = null !== l.state && void 0 !== l.state ? l.state : null;
	      l.updater = Jf;
	      b.stateNode = l;
	      l._reactInternalFiber = b;
	      k && (k = b.stateNode, k.__reactInternalMemoizedUnmaskedChildContext = g, k.__reactInternalMemoizedMaskedChildContext = h);
	      Mf(b, c, d, e);
	      d = !0;
	    } else {
	      g = b.stateNode;
	      h = b.memoizedProps;
	      g.props = h;
	      var m = g.context;
	      k = K$1(c) ? Ge : I$1.current;
	      k = He(b, k);
	      var r = c.getDerivedStateFromProps;
	      (l = "function" === typeof r || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || m !== k) && Lf(b, g, d, k);
	      af = !1;
	      var A = b.memoizedState;
	      m = g.state = A;
	      var S = b.updateQueue;
	      null !== S && (kf(b, S, d, g, e), m = b.memoizedState);
	      h !== d || A !== m || J$1.current || af ? ("function" === typeof r && (Ff(b, c, r, d), m = b.memoizedState), (h = af || Kf(b, c, h, d, A, m, k)) ? (l || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = m), g.props = d, g.state = m, g.context = k, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
	    }
	  } else g = b.stateNode, h = b.memoizedProps, g.props = h, m = g.context, k = K$1(c) ? Ge : I$1.current, k = He(b, k), r = c.getDerivedStateFromProps, (l = "function" === typeof r || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || m !== k) && Lf(b, g, d, k), af = !1, m = b.memoizedState, A = g.state = m, S = b.updateQueue, null !== S && (kf(b, S, d, g, e), A = b.memoizedState), h !== d || m !== A || J$1.current || af ? ("function" === typeof r && (Ff(b, c, r, d), A = b.memoizedState), (r = af || Kf(b, c, h, d, m, A, k)) ? (l || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, A, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, A, k)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && m === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && m === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = A), g.props = d, g.state = A, g.context = k, d = r) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && m === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && m === a.memoizedState || (b.effectTag |= 256), d = !1);
	  return ig(a, b, c, d, f, e);
	}

	function ig(a, b, c, d, e, f) {
	  fg(a, b);
	  var g = 0 !== (b.effectTag & 64);
	  if (!d && !g) return e && Ne(b, c, !1), eg(a, b, f);
	  d = b.stateNode;
	  cg.current = b;
	  var h = g ? null : d.render();
	  b.effectTag |= 1;
	  null !== a && g && (M$1(a, b, null, f), b.child = null);
	  M$1(a, b, h, f);
	  b.memoizedState = d.state;
	  b.memoizedProps = d.props;
	  e && Ne(b, c, !0);
	  return b.child;
	}

	function jg(a) {
	  var b = a.stateNode;
	  b.pendingContext ? Ke(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Ke(a, b.context, !1);
	  Af(a, b.containerInfo);
	}

	function ng(a, b) {
	  if (a && a.defaultProps) {
	    b = objectAssign({}, b);
	    a = a.defaultProps;

	    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
	  }

	  return b;
	}

	function og(a, b, c, d) {
	  null !== a ? t$1("155") : void 0;
	  var e = b.pendingProps;

	  if ("object" === typeof c && null !== c && "function" === typeof c.then) {
	    c = bg(c);
	    var f = c;
	    f = "function" === typeof f ? Te(f) ? 3 : 1 : void 0 !== f && null !== f && f.$$typeof ? 14 : 4;
	    f = b.tag = f;
	    var g = ng(c, e);

	    switch (f) {
	      case 1:
	        return gg(a, b, c, g, d);

	      case 3:
	        return hg(a, b, c, g, d);

	      case 14:
	        return dg(a, b, c, g, d);

	      default:
	        t$1("283", c);
	    }
	  }

	  f = He(b, I$1.current);
	  uf(b, d);
	  f = c(e, f);
	  b.effectTag |= 1;

	  if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) {
	    b.tag = 2;
	    K$1(c) ? (g = !0, Me(b)) : g = !1;
	    b.memoizedState = null !== f.state && void 0 !== f.state ? f.state : null;
	    var h = c.getDerivedStateFromProps;
	    "function" === typeof h && Ff(b, c, h, e);
	    f.updater = Jf;
	    b.stateNode = f;
	    f._reactInternalFiber = b;
	    Mf(b, c, e, d);
	    return ig(a, b, c, !0, g, d);
	  }

	  b.tag = 0;
	  M$1(a, b, f, d);
	  b.memoizedProps = e;
	  return b.child;
	}

	function eg(a, b, c) {
	  null !== a && (b.firstContextDependency = a.firstContextDependency);
	  var d = b.childExpirationTime;
	  if (0 === d || d > c) return null;
	  null !== a && b.child !== a.child ? t$1("153") : void 0;

	  if (null !== b.child) {
	    a = b.child;
	    c = Ue(a, a.pendingProps, a.expirationTime);
	    b.child = c;

	    for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Ue(a, a.pendingProps, a.expirationTime), c.return = b;

	    c.sibling = null;
	  }

	  return b.child;
	}

	function pg(a, b, c) {
	  var d = b.expirationTime;

	  if (!J$1.current && (0 === d || d > c)) {
	    switch (b.tag) {
	      case 5:
	        jg(b);
	        ag();
	        break;

	      case 7:
	        Cf(b);
	        break;

	      case 2:
	        K$1(b.type) && Me(b);
	        break;

	      case 3:
	        K$1(b.type._reactResult) && Me(b);
	        break;

	      case 6:
	        Af(b, b.stateNode.containerInfo);
	        break;

	      case 12:
	        sf(b, b.memoizedProps.value);
	    }

	    return eg(a, b, c);
	  }

	  b.expirationTime = 0;

	  switch (b.tag) {
	    case 4:
	      return og(a, b, b.type, c);

	    case 0:
	      return gg(a, b, b.type, b.pendingProps, c);

	    case 1:
	      var e = b.type._reactResult;
	      d = b.pendingProps;
	      a = gg(a, b, e, ng(e, d), c);
	      b.memoizedProps = d;
	      return a;

	    case 2:
	      return hg(a, b, b.type, b.pendingProps, c);

	    case 3:
	      return e = b.type._reactResult, d = b.pendingProps, a = hg(a, b, e, ng(e, d), c), b.memoizedProps = d, a;

	    case 5:
	      jg(b);
	      d = b.updateQueue;
	      null === d ? t$1("282") : void 0;
	      e = b.memoizedState;
	      e = null !== e ? e.element : null;
	      kf(b, d, b.pendingProps, null, c);
	      d = b.memoizedState.element;
	      if (d === e) ag(), b = eg(a, b, c);else {
	        e = b.stateNode;
	        if (e = (null === a || null === a.child) && e.hydrate) Uf = Ce(b.stateNode.containerInfo), Tf = b, e = Vf = !0;
	        e ? (b.effectTag |= 2, b.child = Sf(b, null, d, c)) : (M$1(a, b, d, c), ag());
	        b = b.child;
	      }
	      return b;

	    case 7:
	      Cf(b);
	      null === a && Yf(b);
	      d = b.type;
	      e = b.pendingProps;
	      var f = null !== a ? a.memoizedProps : null,
	          g = e.children;
	      Ae(d, e) ? g = null : null !== f && Ae(d, f) && (b.effectTag |= 16);
	      fg(a, b);
	      1073741823 !== c && b.mode & 1 && e.hidden ? (b.expirationTime = 1073741823, b.memoizedProps = e, b = null) : (M$1(a, b, g, c), b.memoizedProps = e, b = b.child);
	      return b;

	    case 8:
	      return null === a && Yf(b), b.memoizedProps = b.pendingProps, null;

	    case 16:
	      return null;

	    case 6:
	      return Af(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Rf(b, null, d, c) : M$1(a, b, d, c), b.memoizedProps = d, b.child;

	    case 13:
	      return dg(a, b, b.type, b.pendingProps, c);

	    case 14:
	      return e = b.type._reactResult, d = b.pendingProps, a = dg(a, b, e, ng(e, d), c), b.memoizedProps = d, a;

	    case 9:
	      return d = b.pendingProps, M$1(a, b, d, c), b.memoizedProps = d, b.child;

	    case 10:
	      return d = b.pendingProps.children, M$1(a, b, d, c), b.memoizedProps = d, b.child;

	    case 15:
	      return d = b.pendingProps, M$1(a, b, d.children, c), b.memoizedProps = d, b.child;

	    case 12:
	      a: {
	        d = b.type._context;
	        e = b.pendingProps;
	        g = b.memoizedProps;
	        f = e.value;
	        b.memoizedProps = e;
	        sf(b, f);

	        if (null !== g) {
	          var h = g.value;
	          f = h === f && (0 !== h || 1 / h === 1 / f) || h !== h && f !== f ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

	          if (0 === f) {
	            if (g.children === e.children && !J$1.current) {
	              b = eg(a, b, c);
	              break a;
	            }
	          } else for (g = b.child, null !== g && (g.return = b); null !== g;) {
	            h = g.firstContextDependency;

	            if (null !== h) {
	              do {
	                if (h.context === d && 0 !== (h.observedBits & f)) {
	                  if (2 === g.tag || 3 === g.tag) {
	                    var k = df(c);
	                    k.tag = 2;
	                    ff(g, k);
	                  }

	                  if (0 === g.expirationTime || g.expirationTime > c) g.expirationTime = c;
	                  k = g.alternate;
	                  null !== k && (0 === k.expirationTime || k.expirationTime > c) && (k.expirationTime = c);

	                  for (var l = g.return; null !== l;) {
	                    k = l.alternate;
	                    if (0 === l.childExpirationTime || l.childExpirationTime > c) l.childExpirationTime = c, null !== k && (0 === k.childExpirationTime || k.childExpirationTime > c) && (k.childExpirationTime = c);else if (null !== k && (0 === k.childExpirationTime || k.childExpirationTime > c)) k.childExpirationTime = c;else break;
	                    l = l.return;
	                  }
	                }

	                k = g.child;
	                h = h.next;
	              } while (null !== h);
	            } else k = 12 === g.tag ? g.type === b.type ? null : g.child : g.child;

	            if (null !== k) k.return = g;else for (k = g; null !== k;) {
	              if (k === b) {
	                k = null;
	                break;
	              }

	              g = k.sibling;

	              if (null !== g) {
	                g.return = k.return;
	                k = g;
	                break;
	              }

	              k = k.return;
	            }
	            g = k;
	          }
	        }

	        M$1(a, b, e.children, c);
	        b = b.child;
	      }

	      return b;

	    case 11:
	      return f = b.type, d = b.pendingProps, e = d.children, uf(b, c), f = vf(f, d.unstable_observedBits), e = e(f), b.effectTag |= 1, M$1(a, b, e, c), b.memoizedProps = d, b.child;

	    default:
	      t$1("156");
	  }
	}

	function qg(a) {
	  a.effectTag |= 4;
	}

	var rg = void 0,
	    sg = void 0,
	    tg = void 0;

	rg = function () {};

	sg = function (a, b, c, d, e) {
	  var f = a.memoizedProps;

	  if (f !== d) {
	    var g = b.stateNode;
	    zf(L$1.current);
	    a = null;

	    switch (c) {
	      case "input":
	        f = zc(g, f);
	        d = zc(g, d);
	        a = [];
	        break;

	      case "option":
	        f = de(g, f);
	        d = de(g, d);
	        a = [];
	        break;

	      case "select":
	        f = objectAssign({}, f, {
	          value: void 0
	        });
	        d = objectAssign({}, d, {
	          value: void 0
	        });
	        a = [];
	        break;

	      case "textarea":
	        f = fe(g, f);
	        d = fe(g, d);
	        a = [];
	        break;

	      default:
	        "function" !== typeof f.onClick && "function" === typeof d.onClick && (g.onclick = we);
	    }

	    te(c, d);
	    g = c = void 0;
	    var h = null;

	    for (c in f) if (!d.hasOwnProperty(c) && f.hasOwnProperty(c) && null != f[c]) if ("style" === c) {
	      var k = f[c];

	      for (g in k) k.hasOwnProperty(g) && (h || (h = {}), h[g] = "");
	    } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (sa.hasOwnProperty(c) ? a || (a = []) : (a = a || []).push(c, null));

	    for (c in d) {
	      var l = d[c];
	      k = null != f ? f[c] : void 0;
	      if (d.hasOwnProperty(c) && l !== k && (null != l || null != k)) if ("style" === c) {
	        if (k) {
	          for (g in k) !k.hasOwnProperty(g) || l && l.hasOwnProperty(g) || (h || (h = {}), h[g] = "");

	          for (g in l) l.hasOwnProperty(g) && k[g] !== l[g] && (h || (h = {}), h[g] = l[g]);
	        } else h || (a || (a = []), a.push(c, h)), h = l;
	      } else "dangerouslySetInnerHTML" === c ? (l = l ? l.__html : void 0, k = k ? k.__html : void 0, null != l && k !== l && (a = a || []).push(c, "" + l)) : "children" === c ? k === l || "string" !== typeof l && "number" !== typeof l || (a = a || []).push(c, "" + l) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (sa.hasOwnProperty(c) ? (null != l && ve(e, c), a || k === l || (a = [])) : (a = a || []).push(c, l));
	    }

	    h && (a = a || []).push("style", h);
	    e = a;
	    (b.updateQueue = e) && qg(b);
	  }
	};

	tg = function (a, b, c, d) {
	  c !== d && qg(b);
	};

	function ug(a, b) {
	  var c = b.source,
	      d = b.stack;
	  null === d && null !== c && (d = mc(c));
	  null !== c && lc(c.type);
	  b = b.value;
	  null !== a && 2 === a.tag && lc(a.type);

	  try {
	    console.error(b);
	  } catch (e) {
	    setTimeout(function () {
	      throw e;
	    });
	  }
	}

	function vg(a) {
	  var b = a.ref;
	  if (null !== b) if ("function" === typeof b) try {
	    b(null);
	  } catch (c) {
	    wg(a, c);
	  } else b.current = null;
	}

	function xg(a) {
	  "function" === typeof Pe && Pe(a);

	  switch (a.tag) {
	    case 2:
	    case 3:
	      vg(a);
	      var b = a.stateNode;
	      if ("function" === typeof b.componentWillUnmount) try {
	        b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
	      } catch (c) {
	        wg(a, c);
	      }
	      break;

	    case 7:
	      vg(a);
	      break;

	    case 6:
	      yg(a);
	  }
	}

	function zg(a) {
	  return 7 === a.tag || 5 === a.tag || 6 === a.tag;
	}

	function Ag(a) {
	  a: {
	    for (var b = a.return; null !== b;) {
	      if (zg(b)) {
	        var c = b;
	        break a;
	      }

	      b = b.return;
	    }

	    t$1("160");
	    c = void 0;
	  }

	  var d = b = void 0;

	  switch (c.tag) {
	    case 7:
	      b = c.stateNode;
	      d = !1;
	      break;

	    case 5:
	      b = c.stateNode.containerInfo;
	      d = !0;
	      break;

	    case 6:
	      b = c.stateNode.containerInfo;
	      d = !0;
	      break;

	    default:
	      t$1("161");
	  }

	  c.effectTag & 16 && (oe(b, ""), c.effectTag &= -17);

	  a: b: for (c = a;;) {
	    for (; null === c.sibling;) {
	      if (null === c.return || zg(c.return)) {
	        c = null;
	        break a;
	      }

	      c = c.return;
	    }

	    c.sibling.return = c.return;

	    for (c = c.sibling; 7 !== c.tag && 8 !== c.tag;) {
	      if (c.effectTag & 2) continue b;
	      if (null === c.child || 6 === c.tag) continue b;else c.child.return = c, c = c.child;
	    }

	    if (!(c.effectTag & 2)) {
	      c = c.stateNode;
	      break a;
	    }
	  }

	  for (var e = a;;) {
	    if (7 === e.tag || 8 === e.tag) {
	      if (c) {
	        if (d) {
	          var f = b,
	              g = e.stateNode,
	              h = c;
	          8 === f.nodeType ? f.parentNode.insertBefore(g, h) : f.insertBefore(g, h);
	        } else b.insertBefore(e.stateNode, c);
	      } else d ? (f = b, g = e.stateNode, 8 === f.nodeType ? (h = f.parentNode, h.insertBefore(g, f)) : (h = f, h.appendChild(g)), null === h.onclick && (h.onclick = we)) : b.appendChild(e.stateNode);
	    } else if (6 !== e.tag && null !== e.child) {
	      e.child.return = e;
	      e = e.child;
	      continue;
	    }
	    if (e === a) break;

	    for (; null === e.sibling;) {
	      if (null === e.return || e.return === a) return;
	      e = e.return;
	    }

	    e.sibling.return = e.return;
	    e = e.sibling;
	  }
	}

	function yg(a) {
	  for (var b = a, c = !1, d = void 0, e = void 0;;) {
	    if (!c) {
	      c = b.return;

	      a: for (;;) {
	        null === c ? t$1("160") : void 0;

	        switch (c.tag) {
	          case 7:
	            d = c.stateNode;
	            e = !1;
	            break a;

	          case 5:
	            d = c.stateNode.containerInfo;
	            e = !0;
	            break a;

	          case 6:
	            d = c.stateNode.containerInfo;
	            e = !0;
	            break a;
	        }

	        c = c.return;
	      }

	      c = !0;
	    }

	    if (7 === b.tag || 8 === b.tag) {
	      a: for (var f = b, g = f;;) if (xg(g), null !== g.child && 6 !== g.tag) g.child.return = g, g = g.child;else {
	        if (g === f) break;

	        for (; null === g.sibling;) {
	          if (null === g.return || g.return === f) break a;
	          g = g.return;
	        }

	        g.sibling.return = g.return;
	        g = g.sibling;
	      }

	      e ? (f = d, g = b.stateNode, 8 === f.nodeType ? f.parentNode.removeChild(g) : f.removeChild(g)) : d.removeChild(b.stateNode);
	    } else if (6 === b.tag ? (d = b.stateNode.containerInfo, e = !0) : xg(b), null !== b.child) {
	      b.child.return = b;
	      b = b.child;
	      continue;
	    }

	    if (b === a) break;

	    for (; null === b.sibling;) {
	      if (null === b.return || b.return === a) return;
	      b = b.return;
	      6 === b.tag && (c = !1);
	    }

	    b.sibling.return = b.return;
	    b = b.sibling;
	  }
	}

	function Bg(a, b) {
	  switch (b.tag) {
	    case 2:
	    case 3:
	      break;

	    case 7:
	      var c = b.stateNode;

	      if (null != c) {
	        var d = b.memoizedProps,
	            e = null !== a ? a.memoizedProps : d;
	        a = b.type;
	        var f = b.updateQueue;
	        b.updateQueue = null;

	        if (null !== f) {
	          c[Ja] = d;
	          "input" === a && "radio" === d.type && null != d.name && Cc(c, d);
	          ue(a, e);
	          b = ue(a, d);

	          for (e = 0; e < f.length; e += 2) {
	            var g = f[e],
	                h = f[e + 1];
	            "style" === g ? re(c, h) : "dangerouslySetInnerHTML" === g ? ne(c, h) : "children" === g ? oe(c, h) : xc(c, g, h, b);
	          }

	          switch (a) {
	            case "input":
	              Dc(c, d);
	              break;

	            case "textarea":
	              he(c, d);
	              break;

	            case "select":
	              a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? ee(c, !!d.multiple, f, !1) : a !== !!d.multiple && (null != d.defaultValue ? ee(c, !!d.multiple, d.defaultValue, !0) : ee(c, !!d.multiple, d.multiple ? [] : "", !1));
	          }
	        }
	      }

	      break;

	    case 8:
	      null === b.stateNode ? t$1("162") : void 0;
	      b.stateNode.nodeValue = b.memoizedProps;
	      break;

	    case 5:
	      break;

	    case 15:
	      break;

	    case 16:
	      break;

	    default:
	      t$1("163");
	  }
	}

	function Cg(a, b, c) {
	  c = df(c);
	  c.tag = 3;
	  c.payload = {
	    element: null
	  };
	  var d = b.value;

	  c.callback = function () {
	    Dg(d);
	    ug(a, b);
	  };

	  return c;
	}

	function Eg(a, b, c) {
	  c = df(c);
	  c.tag = 3;
	  var d = a.stateNode;
	  null !== d && "function" === typeof d.componentDidCatch && (c.callback = function () {
	    null === Fg ? Fg = new Set([this]) : Fg.add(this);
	    var c = b.value,
	        d = b.stack;
	    ug(a, b);
	    this.componentDidCatch(c, {
	      componentStack: null !== d ? d : ""
	    });
	  });
	  return c;
	}

	function Gg(a) {
	  switch (a.tag) {
	    case 2:
	      K$1(a.type) && Ie(a);
	      var b = a.effectTag;
	      return b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 3:
	      return K$1(a.type._reactResult) && Ie(a), b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 5:
	      return Bf(a), Je(a), b = a.effectTag, 0 !== (b & 64) ? t$1("285") : void 0, a.effectTag = b & -1025 | 64, a;

	    case 7:
	      return Df(a), null;

	    case 16:
	      return b = a.effectTag, b & 1024 ? (a.effectTag = b & -1025 | 64, a) : null;

	    case 6:
	      return Bf(a), null;

	    case 12:
	      return tf(a), null;

	    default:
	      return null;
	  }
	}

	var Hg = {
	  readContext: vf
	},
	    Ig = Yb.ReactCurrentOwner,
	    Jg = 0,
	    Kg = 0,
	    Lg = !1,
	    N$1 = null,
	    Mg = null,
	    O$1 = 0,
	    Ng = !1,
	    Q$1 = null,
	    Og = !1,
	    Fg = null;

	function Pg() {
	  if (null !== N$1) for (var a = N$1.return; null !== a;) {
	    var b = a;

	    switch (b.tag) {
	      case 2:
	        var c = b.type.childContextTypes;
	        null !== c && void 0 !== c && Ie(b);
	        break;

	      case 3:
	        c = b.type._reactResult.childContextTypes;
	        null !== c && void 0 !== c && Ie(b);
	        break;

	      case 5:
	        Bf(b);
	        Je(b);
	        break;

	      case 7:
	        Df(b);
	        break;

	      case 6:
	        Bf(b);
	        break;

	      case 12:
	        tf(b);
	    }

	    a = a.return;
	  }
	  Mg = null;
	  O$1 = 0;
	  Ng = !1;
	  N$1 = null;
	}

	function Qg(a) {
	  for (;;) {
	    var b = a.alternate,
	        c = a.return,
	        d = a.sibling;

	    if (0 === (a.effectTag & 512)) {
	      var e = b;
	      b = a;
	      var f = b.pendingProps;

	      switch (b.tag) {
	        case 0:
	        case 1:
	          break;

	        case 2:
	          K$1(b.type) && Ie(b);
	          break;

	        case 3:
	          K$1(b.type._reactResult) && Ie(b);
	          break;

	        case 5:
	          Bf(b);
	          Je(b);
	          f = b.stateNode;
	          f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null);
	          if (null === e || null === e.child) $f(b), b.effectTag &= -3;
	          rg(b);
	          break;

	        case 7:
	          Df(b);
	          var g = zf(yf.current),
	              h = b.type;
	          if (null !== e && null != b.stateNode) sg(e, b, h, f, g), e.ref !== b.ref && (b.effectTag |= 128);else if (f) {
	            var k = zf(L$1.current);

	            if ($f(b)) {
	              f = b;
	              e = f.stateNode;
	              var l = f.type,
	                  m = f.memoizedProps,
	                  r = g;
	              e[Ia] = f;
	              e[Ja] = m;
	              h = void 0;
	              g = l;

	              switch (g) {
	                case "iframe":
	                case "object":
	                  F$1("load", e);
	                  break;

	                case "video":
	                case "audio":
	                  for (l = 0; l < fb.length; l++) F$1(fb[l], e);

	                  break;

	                case "source":
	                  F$1("error", e);
	                  break;

	                case "img":
	                case "image":
	                case "link":
	                  F$1("error", e);
	                  F$1("load", e);
	                  break;

	                case "form":
	                  F$1("reset", e);
	                  F$1("submit", e);
	                  break;

	                case "details":
	                  F$1("toggle", e);
	                  break;

	                case "input":
	                  Bc(e, m);
	                  F$1("invalid", e);
	                  ve(r, "onChange");
	                  break;

	                case "select":
	                  e._wrapperState = {
	                    wasMultiple: !!m.multiple
	                  };
	                  F$1("invalid", e);
	                  ve(r, "onChange");
	                  break;

	                case "textarea":
	                  ge(e, m), F$1("invalid", e), ve(r, "onChange");
	              }

	              te(g, m);
	              l = null;

	              for (h in m) m.hasOwnProperty(h) && (k = m[h], "children" === h ? "string" === typeof k ? e.textContent !== k && (l = ["children", k]) : "number" === typeof k && e.textContent !== "" + k && (l = ["children", "" + k]) : sa.hasOwnProperty(h) && null != k && ve(r, h));

	              switch (g) {
	                case "input":
	                  Wb(e);
	                  Fc(e, m, !0);
	                  break;

	                case "textarea":
	                  Wb(e);
	                  ie(e, m);
	                  break;

	                case "select":
	                case "option":
	                  break;

	                default:
	                  "function" === typeof m.onClick && (e.onclick = we);
	              }

	              h = l;
	              f.updateQueue = h;
	              f = null !== h ? !0 : !1;
	              f && qg(b);
	            } else {
	              m = b;
	              e = h;
	              r = f;
	              l = 9 === g.nodeType ? g : g.ownerDocument;
	              k === je.html && (k = ke(e));
	              k === je.html ? "script" === e ? (e = l.createElement("div"), e.innerHTML = "<script>\x3c/script>", l = e.removeChild(e.firstChild)) : "string" === typeof r.is ? l = l.createElement(e, {
	                is: r.is
	              }) : (l = l.createElement(e), "select" === e && r.multiple && (l.multiple = !0)) : l = l.createElementNS(k, e);
	              e = l;
	              e[Ia] = m;
	              e[Ja] = f;

	              a: for (m = e, r = b, l = r.child; null !== l;) {
	                if (7 === l.tag || 8 === l.tag) m.appendChild(l.stateNode);else if (6 !== l.tag && null !== l.child) {
	                  l.child.return = l;
	                  l = l.child;
	                  continue;
	                }
	                if (l === r) break;

	                for (; null === l.sibling;) {
	                  if (null === l.return || l.return === r) break a;
	                  l = l.return;
	                }

	                l.sibling.return = l.return;
	                l = l.sibling;
	              }

	              r = e;
	              l = h;
	              m = f;
	              var A = g,
	                  S = ue(l, m);

	              switch (l) {
	                case "iframe":
	                case "object":
	                  F$1("load", r);
	                  g = m;
	                  break;

	                case "video":
	                case "audio":
	                  for (g = 0; g < fb.length; g++) F$1(fb[g], r);

	                  g = m;
	                  break;

	                case "source":
	                  F$1("error", r);
	                  g = m;
	                  break;

	                case "img":
	                case "image":
	                case "link":
	                  F$1("error", r);
	                  F$1("load", r);
	                  g = m;
	                  break;

	                case "form":
	                  F$1("reset", r);
	                  F$1("submit", r);
	                  g = m;
	                  break;

	                case "details":
	                  F$1("toggle", r);
	                  g = m;
	                  break;

	                case "input":
	                  Bc(r, m);
	                  g = zc(r, m);
	                  F$1("invalid", r);
	                  ve(A, "onChange");
	                  break;

	                case "option":
	                  g = de(r, m);
	                  break;

	                case "select":
	                  r._wrapperState = {
	                    wasMultiple: !!m.multiple
	                  };
	                  g = objectAssign({}, m, {
	                    value: void 0
	                  });
	                  F$1("invalid", r);
	                  ve(A, "onChange");
	                  break;

	                case "textarea":
	                  ge(r, m);
	                  g = fe(r, m);
	                  F$1("invalid", r);
	                  ve(A, "onChange");
	                  break;

	                default:
	                  g = m;
	              }

	              te(l, g);
	              k = void 0;
	              var B = l,
	                  P = r,
	                  v = g;

	              for (k in v) if (v.hasOwnProperty(k)) {
	                var p = v[k];
	                "style" === k ? re(P, p) : "dangerouslySetInnerHTML" === k ? (p = p ? p.__html : void 0, null != p && ne(P, p)) : "children" === k ? "string" === typeof p ? ("textarea" !== B || "" !== p) && oe(P, p) : "number" === typeof p && oe(P, "" + p) : "suppressContentEditableWarning" !== k && "suppressHydrationWarning" !== k && "autoFocus" !== k && (sa.hasOwnProperty(k) ? null != p && ve(A, k) : null != p && xc(P, k, p, S));
	              }

	              switch (l) {
	                case "input":
	                  Wb(r);
	                  Fc(r, m, !1);
	                  break;

	                case "textarea":
	                  Wb(r);
	                  ie(r, m);
	                  break;

	                case "option":
	                  null != m.value && r.setAttribute("value", "" + yc(m.value));
	                  break;

	                case "select":
	                  g = r;
	                  g.multiple = !!m.multiple;
	                  r = m.value;
	                  null != r ? ee(g, !!m.multiple, r, !1) : null != m.defaultValue && ee(g, !!m.multiple, m.defaultValue, !0);
	                  break;

	                default:
	                  "function" === typeof g.onClick && (r.onclick = we);
	              }

	              (f = ze(h, f)) && qg(b);
	              b.stateNode = e;
	            }

	            null !== b.ref && (b.effectTag |= 128);
	          } else null === b.stateNode ? t$1("166") : void 0;
	          break;

	        case 8:
	          e && null != b.stateNode ? tg(e, b, e.memoizedProps, f) : ("string" !== typeof f && (null === b.stateNode ? t$1("166") : void 0), e = zf(yf.current), zf(L$1.current), $f(b) ? (f = b, h = f.stateNode, e = f.memoizedProps, h[Ia] = f, (f = h.nodeValue !== e) && qg(b)) : (h = b, f = (9 === e.nodeType ? e : e.ownerDocument).createTextNode(f), f[Ia] = h, b.stateNode = f));
	          break;

	        case 13:
	        case 14:
	          break;

	        case 16:
	          break;

	        case 9:
	          break;

	        case 10:
	          break;

	        case 15:
	          break;

	        case 6:
	          Bf(b);
	          rg(b);
	          break;

	        case 12:
	          tf(b);
	          break;

	        case 11:
	          break;

	        case 4:
	          t$1("167");

	        default:
	          t$1("156");
	      }

	      b = N$1 = null;
	      f = a;

	      if (1073741823 === O$1 || 1073741823 !== f.childExpirationTime) {
	        h = 0;

	        for (e = f.child; null !== e;) {
	          g = e.expirationTime;
	          m = e.childExpirationTime;
	          if (0 === h || 0 !== g && g < h) h = g;
	          if (0 === h || 0 !== m && m < h) h = m;
	          e = e.sibling;
	        }

	        f.childExpirationTime = h;
	      }

	      if (null !== b) return b;
	      null !== c && 0 === (c.effectTag & 512) && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));
	    } else {
	      a = Gg(a, O$1);
	      if (null !== a) return a.effectTag &= 511, a;
	      null !== c && (c.firstEffect = c.lastEffect = null, c.effectTag |= 512);
	    }

	    if (null !== d) return d;
	    if (null !== c) a = c;else break;
	  }

	  return null;
	}

	function Rg(a) {
	  var b = pg(a.alternate, a, O$1);
	  null === b && (b = Qg(a));
	  Ig.current = null;
	  return b;
	}

	function Sg(a, b, c) {
	  Lg ? t$1("243") : void 0;
	  Lg = !0;
	  Ig.currentDispatcher = Hg;
	  var d = a.nextExpirationTimeToWorkOn;
	  if (d !== O$1 || a !== Mg || null === N$1) Pg(), Mg = a, O$1 = d, N$1 = Ue(Mg.current, null, O$1), a.pendingCommitExpirationTime = 0;
	  var e = !1;

	  do {
	    try {
	      if (b) for (; null !== N$1 && !Tg();) N$1 = Rg(N$1);else for (; null !== N$1;) N$1 = Rg(N$1);
	    } catch (r) {
	      if (null === N$1) e = !0, Dg(r);else {
	        null === N$1 ? t$1("271") : void 0;
	        var f = N$1,
	            g = f.return;
	        if (null === g) e = !0, Dg(r);else {
	          a: {
	            var h = g,
	                k = f,
	                l = r;
	            g = O$1;
	            k.effectTag |= 512;
	            k.firstEffect = k.lastEffect = null;
	            Ng = !0;
	            l = nf(l, k);

	            do {
	              switch (h.tag) {
	                case 5:
	                  h.effectTag |= 1024;
	                  h.expirationTime = g;
	                  g = Cg(h, l, g);
	                  gf(h, g);
	                  break a;

	                case 2:
	                case 3:
	                  k = l;
	                  var m = h.stateNode;

	                  if (0 === (h.effectTag & 64) && null !== m && "function" === typeof m.componentDidCatch && (null === Fg || !Fg.has(m))) {
	                    h.effectTag |= 1024;
	                    h.expirationTime = g;
	                    g = Eg(h, k, g);
	                    gf(h, g);
	                    break a;
	                  }

	              }

	              h = h.return;
	            } while (null !== h);
	          }

	          N$1 = Qg(f);
	          continue;
	        }
	      }
	    }

	    break;
	  } while (1);

	  Lg = !1;
	  rf = qf = pf = Ig.currentDispatcher = null;
	  if (e) Mg = null, a.finishedWork = null;else if (null !== N$1) a.finishedWork = null;else {
	    b = a.current.alternate;
	    null === b ? t$1("281") : void 0;
	    Mg = null;

	    if (Ng) {
	      e = a.latestPendingTime;
	      f = a.latestSuspendedTime;
	      g = a.latestPingedTime;

	      if (0 !== e && e > d || 0 !== f && f > d || 0 !== g && g > d) {
	        a.didError = !1;
	        c = a.latestPingedTime;
	        0 !== c && c <= d && (a.latestPingedTime = 0);
	        c = a.earliestPendingTime;
	        b = a.latestPendingTime;
	        c === d ? a.earliestPendingTime = b === d ? a.latestPendingTime = 0 : b : b === d && (a.latestPendingTime = c);
	        c = a.earliestSuspendedTime;
	        b = a.latestSuspendedTime;
	        0 === c ? a.earliestSuspendedTime = a.latestSuspendedTime = d : c > d ? a.earliestSuspendedTime = d : b < d && (a.latestSuspendedTime = d);
	        $e(d, a);
	        a.expirationTime = a.expirationTime;
	        return;
	      }

	      if (!a.didError && !c) {
	        a.didError = !0;
	        a.nextExpirationTimeToWorkOn = d;
	        d = a.expirationTime = 1;
	        a.expirationTime = d;
	        return;
	      }
	    }

	    a.pendingCommitExpirationTime = d;
	    a.finishedWork = b;
	  }
	}

	function wg(a, b) {
	  var c;

	  a: {
	    Lg && !Og ? t$1("263") : void 0;

	    for (c = a.return; null !== c;) {
	      switch (c.tag) {
	        case 2:
	        case 3:
	          var d = c.stateNode;

	          if ("function" === typeof c.type.getDerivedStateFromCatch || "function" === typeof d.componentDidCatch && (null === Fg || !Fg.has(d))) {
	            a = nf(b, a);
	            a = Eg(c, a, 1);
	            ff(c, a);
	            If(c, 1);
	            c = void 0;
	            break a;
	          }

	          break;

	        case 5:
	          a = nf(b, a);
	          a = Cg(c, a, 1);
	          ff(c, a);
	          If(c, 1);
	          c = void 0;
	          break a;
	      }

	      c = c.return;
	    }

	    5 === a.tag && (c = nf(b, a), c = Cg(a, c, 1), ff(a, c), If(a, 1));
	    c = void 0;
	  }

	  return c;
	}

	function Hf(a, b) {
	  0 !== Kg ? a = Kg : Lg ? a = Og ? 1 : O$1 : b.mode & 1 ? (a = Ug ? 2 + 10 * (((a - 2 + 15) / 10 | 0) + 1) : 2 + 25 * (((a - 2 + 500) / 25 | 0) + 1), null !== Mg && a === O$1 && (a += 1)) : a = 1;
	  Ug && (0 === Vg || a > Vg) && (Vg = a);
	  return a;
	}

	function If(a, b) {
	  a: {
	    if (0 === a.expirationTime || a.expirationTime > b) a.expirationTime = b;
	    var c = a.alternate;
	    null !== c && (0 === c.expirationTime || c.expirationTime > b) && (c.expirationTime = b);
	    var d = a.return;
	    if (null === d && 5 === a.tag) a = a.stateNode;else {
	      for (; null !== d;) {
	        c = d.alternate;
	        if (0 === d.childExpirationTime || d.childExpirationTime > b) d.childExpirationTime = b;
	        null !== c && (0 === c.childExpirationTime || c.childExpirationTime > b) && (c.childExpirationTime = b);

	        if (null === d.return && 5 === d.tag) {
	          a = d.stateNode;
	          break a;
	        }

	        d = d.return;
	      }

	      a = null;
	    }
	  }

	  if (null !== a) {
	    !Lg && 0 !== O$1 && b < O$1 && Pg();
	    Ze(a, b);

	    if (!Lg || Og || Mg !== a) {
	      b = a;
	      a = a.expirationTime;
	      if (null === b.nextScheduledRoot) b.expirationTime = a, null === T$1 ? (U$1 = T$1 = b, b.nextScheduledRoot = b) : (T$1 = T$1.nextScheduledRoot = b, T$1.nextScheduledRoot = U$1);else if (c = b.expirationTime, 0 === c || a < c) b.expirationTime = a;
	      V$1 || (W$1 ? Wg && (Y$1 = b, Z$1 = 1, Xg(b, 1, !0)) : 1 === a ? Yg(1, null) : Zg(b, a));
	    }

	    $g > ah && ($g = 0, t$1("185"));
	  }
	}

	function bh(a, b, c, d, e) {
	  var f = Kg;
	  Kg = 1;

	  try {
	    return a(b, c, d, e);
	  } finally {
	    Kg = f;
	  }
	}

	var U$1 = null,
	    T$1 = null,
	    ch = 0,
	    dh = void 0,
	    V$1 = !1,
	    Y$1 = null,
	    Z$1 = 0,
	    Vg = 0,
	    eh = !1,
	    fh = !1,
	    gh = null,
	    hh = null,
	    W$1 = !1,
	    Wg = !1,
	    Ug = !1,
	    ih = null,
	    jh = schedule.unstable_now(),
	    kh = (jh / 10 | 0) + 2,
	    lh = kh,
	    ah = 50,
	    $g = 0,
	    mh = null,
	    nh = 1;

	function oh() {
	  kh = ((schedule.unstable_now() - jh) / 10 | 0) + 2;
	}

	function Zg(a, b) {
	  if (0 !== ch) {
	    if (b > ch) return;
	    null !== dh && schedule.unstable_cancelScheduledWork(dh);
	  }

	  ch = b;
	  a = schedule.unstable_now() - jh;
	  dh = schedule.unstable_scheduleWork(ph, {
	    timeout: 10 * (b - 2) - a
	  });
	}

	function Gf() {
	  if (V$1) return lh;
	  qh();
	  if (0 === Z$1 || 1073741823 === Z$1) oh(), lh = kh;
	  return lh;
	}

	function qh() {
	  var a = 0,
	      b = null;
	  if (null !== T$1) for (var c = T$1, d = U$1; null !== d;) {
	    var e = d.expirationTime;

	    if (0 === e) {
	      null === c || null === T$1 ? t$1("244") : void 0;

	      if (d === d.nextScheduledRoot) {
	        U$1 = T$1 = d.nextScheduledRoot = null;
	        break;
	      } else if (d === U$1) U$1 = e = d.nextScheduledRoot, T$1.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === T$1) {
	        T$1 = c;
	        T$1.nextScheduledRoot = U$1;
	        d.nextScheduledRoot = null;
	        break;
	      } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;

	      d = c.nextScheduledRoot;
	    } else {
	      if (0 === a || e < a) a = e, b = d;
	      if (d === T$1) break;
	      if (1 === a) break;
	      c = d;
	      d = d.nextScheduledRoot;
	    }
	  }
	  Y$1 = b;
	  Z$1 = a;
	}

	function ph(a) {
	  if (a.didTimeout && null !== U$1) {
	    oh();
	    var b = U$1;

	    do {
	      var c = b.expirationTime;
	      0 !== c && kh >= c && (b.nextExpirationTimeToWorkOn = kh);
	      b = b.nextScheduledRoot;
	    } while (b !== U$1);
	  }

	  Yg(0, a);
	}

	function Yg(a, b) {
	  hh = b;
	  qh();
	  if (null !== hh) for (oh(), lh = kh; null !== Y$1 && 0 !== Z$1 && (0 === a || a >= Z$1) && (!eh || kh >= Z$1);) Xg(Y$1, Z$1, kh >= Z$1), qh(), oh(), lh = kh;else for (; null !== Y$1 && 0 !== Z$1 && (0 === a || a >= Z$1);) Xg(Y$1, Z$1, !0), qh();
	  null !== hh && (ch = 0, dh = null);
	  0 !== Z$1 && Zg(Y$1, Z$1);
	  hh = null;
	  eh = !1;
	  $g = 0;
	  mh = null;
	  if (null !== ih) for (a = ih, ih = null, b = 0; b < a.length; b++) {
	    var c = a[b];

	    try {
	      c._onComplete();
	    } catch (d) {
	      fh || (fh = !0, gh = d);
	    }
	  }
	  if (fh) throw a = gh, gh = null, fh = !1, a;
	}

	function Xg(a, b, c) {
	  V$1 ? t$1("245") : void 0;
	  V$1 = !0;

	  if (null === hh || c) {
	    var d = a.finishedWork;
	    null !== d ? rh(a, d, b) : (a.finishedWork = null, Sg(a, !1, c), d = a.finishedWork, null !== d && rh(a, d, b));
	  } else d = a.finishedWork, null !== d ? rh(a, d, b) : (a.finishedWork = null, Sg(a, !0, c), d = a.finishedWork, null !== d && (Tg() ? a.finishedWork = d : rh(a, d, b)));

	  V$1 = !1;
	}

	function rh(a, b, c) {
	  var d = a.firstBatch;

	  if (null !== d && d._expirationTime <= c && (null === ih ? ih = [d] : ih.push(d), d._defer)) {
	    a.finishedWork = b;
	    a.expirationTime = 0;
	    return;
	  }

	  a.finishedWork = null;
	  a === mh ? $g++ : (mh = a, $g = 0);
	  Og = Lg = !0;
	  a.current === b ? t$1("177") : void 0;
	  c = a.pendingCommitExpirationTime;
	  0 === c ? t$1("261") : void 0;
	  a.pendingCommitExpirationTime = 0;
	  d = b.expirationTime;
	  var e = b.childExpirationTime;
	  d = 0 === d || 0 !== e && e < d ? e : d;
	  a.didError = !1;
	  0 === d ? (a.earliestPendingTime = 0, a.latestPendingTime = 0, a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0) : (e = a.latestPendingTime, 0 !== e && (e < d ? a.earliestPendingTime = a.latestPendingTime = 0 : a.earliestPendingTime < d && (a.earliestPendingTime = a.latestPendingTime)), e = a.earliestSuspendedTime, 0 === e ? Ze(a, d) : d > a.latestSuspendedTime ? (a.earliestSuspendedTime = 0, a.latestSuspendedTime = 0, a.latestPingedTime = 0, Ze(a, d)) : d < e && Ze(a, d));
	  $e(0, a);
	  Ig.current = null;
	  1 < b.effectTag ? null !== b.lastEffect ? (b.lastEffect.nextEffect = b, d = b.firstEffect) : d = b : d = b.firstEffect;
	  xe = Gd;
	  e = Td();

	  if (Ud(e)) {
	    if ("selectionStart" in e) var f = {
	      start: e.selectionStart,
	      end: e.selectionEnd
	    };else a: {
	      f = (f = e.ownerDocument) && f.defaultView || window;
	      var g = f.getSelection && f.getSelection();

	      if (g && 0 !== g.rangeCount) {
	        f = g.anchorNode;
	        var h = g.anchorOffset,
	            k = g.focusNode;
	        g = g.focusOffset;

	        try {
	          f.nodeType, k.nodeType;
	        } catch (Xa) {
	          f = null;
	          break a;
	        }

	        var l = 0,
	            m = -1,
	            r = -1,
	            A = 0,
	            S = 0,
	            B = e,
	            P = null;

	        b: for (;;) {
	          for (var v;;) {
	            B !== f || 0 !== h && 3 !== B.nodeType || (m = l + h);
	            B !== k || 0 !== g && 3 !== B.nodeType || (r = l + g);
	            3 === B.nodeType && (l += B.nodeValue.length);
	            if (null === (v = B.firstChild)) break;
	            P = B;
	            B = v;
	          }

	          for (;;) {
	            if (B === e) break b;
	            P === f && ++A === h && (m = l);
	            P === k && ++S === g && (r = l);
	            if (null !== (v = B.nextSibling)) break;
	            B = P;
	            P = B.parentNode;
	          }

	          B = v;
	        }

	        f = -1 === m || -1 === r ? null : {
	          start: m,
	          end: r
	        };
	      } else f = null;
	    }
	    f = f || {
	      start: 0,
	      end: 0
	    };
	  } else f = null;

	  ye = {
	    focusedElem: e,
	    selectionRange: f
	  };
	  Gd = !1;

	  for (Q$1 = d; null !== Q$1;) {
	    e = !1;
	    f = void 0;

	    try {
	      for (; null !== Q$1;) {
	        if (Q$1.effectTag & 256) {
	          var p = Q$1.alternate;

	          a: switch (h = Q$1, h.tag) {
	            case 2:
	            case 3:
	              if (h.effectTag & 256 && null !== p) {
	                var u = p.memoizedProps,
	                    x = p.memoizedState,
	                    R = h.stateNode;
	                R.props = h.memoizedProps;
	                R.state = h.memoizedState;
	                var yh = R.getSnapshotBeforeUpdate(u, x);
	                R.__reactInternalSnapshotBeforeUpdate = yh;
	              }

	              break a;

	            case 5:
	            case 7:
	            case 8:
	            case 6:
	              break a;

	            default:
	              t$1("163");
	          }
	        }

	        Q$1 = Q$1.nextEffect;
	      }
	    } catch (Xa) {
	      e = !0, f = Xa;
	    }

	    e && (null === Q$1 ? t$1("178") : void 0, wg(Q$1, f), null !== Q$1 && (Q$1 = Q$1.nextEffect));
	  }

	  for (Q$1 = d; null !== Q$1;) {
	    p = !1;
	    u = void 0;

	    try {
	      for (; null !== Q$1;) {
	        var w = Q$1.effectTag;
	        w & 16 && oe(Q$1.stateNode, "");

	        if (w & 128) {
	          var y = Q$1.alternate;

	          if (null !== y) {
	            var q = y.ref;
	            null !== q && ("function" === typeof q ? q(null) : q.current = null);
	          }
	        }

	        switch (w & 14) {
	          case 2:
	            Ag(Q$1);
	            Q$1.effectTag &= -3;
	            break;

	          case 6:
	            Ag(Q$1);
	            Q$1.effectTag &= -3;
	            Bg(Q$1.alternate, Q$1);
	            break;

	          case 4:
	            Bg(Q$1.alternate, Q$1);
	            break;

	          case 8:
	            x = Q$1, yg(x), x.return = null, x.child = null, x.alternate && (x.alternate.child = null, x.alternate.return = null);
	        }

	        Q$1 = Q$1.nextEffect;
	      }
	    } catch (Xa) {
	      p = !0, u = Xa;
	    }

	    p && (null === Q$1 ? t$1("178") : void 0, wg(Q$1, u), null !== Q$1 && (Q$1 = Q$1.nextEffect));
	  }

	  q = ye;
	  y = Td();
	  w = q.focusedElem;
	  u = q.selectionRange;

	  if (y !== w && w && w.ownerDocument && Sd(w.ownerDocument.documentElement, w)) {
	    null !== u && Ud(w) && (y = u.start, q = u.end, void 0 === q && (q = y), "selectionStart" in w ? (w.selectionStart = y, w.selectionEnd = Math.min(q, w.value.length)) : (p = w.ownerDocument || document, y = (p && p.defaultView || window).getSelection(), x = w.textContent.length, q = Math.min(u.start, x), u = void 0 === u.end ? q : Math.min(u.end, x), !y.extend && q > u && (x = u, u = q, q = x), x = Rd(w, q), R = Rd(w, u), x && R && (1 !== y.rangeCount || y.anchorNode !== x.node || y.anchorOffset !== x.offset || y.focusNode !== R.node || y.focusOffset !== R.offset) && (p = p.createRange(), p.setStart(x.node, x.offset), y.removeAllRanges(), q > u ? (y.addRange(p), y.extend(R.node, R.offset)) : (p.setEnd(R.node, R.offset), y.addRange(p)))));
	    y = [];

	    for (q = w; q = q.parentNode;) 1 === q.nodeType && y.push({
	      element: q,
	      left: q.scrollLeft,
	      top: q.scrollTop
	    });

	    "function" === typeof w.focus && w.focus();

	    for (w = 0; w < y.length; w++) q = y[w], q.element.scrollLeft = q.left, q.element.scrollTop = q.top;
	  }

	  ye = null;
	  Gd = !!xe;
	  xe = null;
	  a.current = b;

	  for (Q$1 = d; null !== Q$1;) {
	    d = !1;
	    w = void 0;

	    try {
	      for (y = c; null !== Q$1;) {
	        var Sa = Q$1.effectTag;

	        if (Sa & 36) {
	          var oc = Q$1.alternate;
	          q = Q$1;
	          p = y;

	          switch (q.tag) {
	            case 2:
	            case 3:
	              var X = q.stateNode;
	              if (q.effectTag & 4) if (null === oc) X.props = q.memoizedProps, X.state = q.memoizedState, X.componentDidMount();else {
	                var Ih = oc.memoizedProps,
	                    Jh = oc.memoizedState;
	                X.props = q.memoizedProps;
	                X.state = q.memoizedState;
	                X.componentDidUpdate(Ih, Jh, X.__reactInternalSnapshotBeforeUpdate);
	              }
	              var kg = q.updateQueue;
	              null !== kg && (X.props = q.memoizedProps, X.state = q.memoizedState, lf(q, kg, X, p));
	              break;

	            case 5:
	              var lg = q.updateQueue;

	              if (null !== lg) {
	                u = null;
	                if (null !== q.child) switch (q.child.tag) {
	                  case 7:
	                    u = q.child.stateNode;
	                    break;

	                  case 2:
	                  case 3:
	                    u = q.child.stateNode;
	                }
	                lf(q, lg, u, p);
	              }

	              break;

	            case 7:
	              var Kh = q.stateNode;
	              null === oc && q.effectTag & 4 && ze(q.type, q.memoizedProps) && Kh.focus();
	              break;

	            case 8:
	              break;

	            case 6:
	              break;

	            case 15:
	              break;

	            case 16:
	              break;

	            default:
	              t$1("163");
	          }
	        }

	        if (Sa & 128) {
	          var Ac = Q$1.ref;

	          if (null !== Ac) {
	            var mg = Q$1.stateNode;

	            switch (Q$1.tag) {
	              case 7:
	                var Pd = mg;
	                break;

	              default:
	                Pd = mg;
	            }

	            "function" === typeof Ac ? Ac(Pd) : Ac.current = Pd;
	          }
	        }

	        var Lh = Q$1.nextEffect;
	        Q$1.nextEffect = null;
	        Q$1 = Lh;
	      }
	    } catch (Xa) {
	      d = !0, w = Xa;
	    }

	    d && (null === Q$1 ? t$1("178") : void 0, wg(Q$1, w), null !== Q$1 && (Q$1 = Q$1.nextEffect));
	  }

	  Lg = Og = !1;
	  "function" === typeof Oe && Oe(b.stateNode);
	  Sa = b.expirationTime;
	  b = b.childExpirationTime;
	  b = 0 === Sa || 0 !== b && b < Sa ? b : Sa;
	  0 === b && (Fg = null);
	  a.expirationTime = b;
	  a.finishedWork = null;
	}

	function Tg() {
	  return eh ? !0 : null === hh || hh.timeRemaining() > nh ? !1 : eh = !0;
	}

	function Dg(a) {
	  null === Y$1 ? t$1("246") : void 0;
	  Y$1.expirationTime = 0;
	  fh || (fh = !0, gh = a);
	}

	function sh(a, b) {
	  var c = W$1;
	  W$1 = !0;

	  try {
	    return a(b);
	  } finally {
	    (W$1 = c) || V$1 || Yg(1, null);
	  }
	}

	function th(a, b) {
	  if (W$1 && !Wg) {
	    Wg = !0;

	    try {
	      return a(b);
	    } finally {
	      Wg = !1;
	    }
	  }

	  return a(b);
	}

	function uh(a, b, c) {
	  if (Ug) return a(b, c);
	  W$1 || V$1 || 0 === Vg || (Yg(Vg, null), Vg = 0);
	  var d = Ug,
	      e = W$1;
	  W$1 = Ug = !0;

	  try {
	    return a(b, c);
	  } finally {
	    Ug = d, (W$1 = e) || V$1 || Yg(1, null);
	  }
	}

	function vh(a) {
	  if (!a) return Fe;
	  a = a._reactInternalFiber;

	  a: {
	    2 !== jd(a) || 2 !== a.tag && 3 !== a.tag ? t$1("170") : void 0;
	    var b = a;

	    do {
	      switch (b.tag) {
	        case 5:
	          b = b.stateNode.context;
	          break a;

	        case 2:
	          if (K$1(b.type)) {
	            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
	            break a;
	          }

	          break;

	        case 3:
	          if (K$1(b.type._reactResult)) {
	            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
	            break a;
	          }

	      }

	      b = b.return;
	    } while (null !== b);

	    t$1("171");
	    b = void 0;
	  }

	  if (2 === a.tag) {
	    var c = a.type;
	    if (K$1(c)) return Le(a, c, b);
	  } else if (3 === a.tag && (c = a.type._reactResult, K$1(c))) return Le(a, c, b);

	  return b;
	}

	function wh(a, b, c, d, e) {
	  var f = b.current;
	  c = vh(c);
	  null === b.context ? b.context = c : b.pendingContext = c;
	  b = e;
	  e = df(d);
	  e.payload = {
	    element: a
	  };
	  b = void 0 === b ? null : b;
	  null !== b && (e.callback = b);
	  ff(f, e);
	  If(f, d);
	  return d;
	}

	function xh(a, b, c, d) {
	  var e = b.current,
	      f = Gf();
	  e = Hf(f, e);
	  return wh(a, b, c, e, d);
	}

	function zh(a) {
	  a = a.current;
	  if (!a.child) return null;

	  switch (a.child.tag) {
	    case 7:
	      return a.child.stateNode;

	    default:
	      return a.child.stateNode;
	  }
	}

	function Ah(a, b, c) {
	  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
	  return {
	    $$typeof: ac,
	    key: null == d ? null : "" + d,
	    children: a,
	    containerInfo: b,
	    implementation: c
	  };
	}

	Fb = function (a, b, c) {
	  switch (b) {
	    case "input":
	      Dc(a, c);
	      b = c.name;

	      if ("radio" === c.type && null != b) {
	        for (c = a; c.parentNode;) c = c.parentNode;

	        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

	        for (b = 0; b < c.length; b++) {
	          var d = c[b];

	          if (d !== a && d.form === a.form) {
	            var e = Na(d);
	            e ? void 0 : t$1("90");
	            Xb(d);
	            Dc(d, e);
	          }
	        }
	      }

	      break;

	    case "textarea":
	      he(a, c);
	      break;

	    case "select":
	      b = c.value, null != b && ee(a, !!c.multiple, b, !1);
	  }
	};

	function Bh(a) {
	  var b = 2 + 25 * (((Gf() - 2 + 500) / 25 | 0) + 1);
	  b <= Jg && (b = Jg + 1);
	  this._expirationTime = Jg = b;
	  this._root = a;
	  this._callbacks = this._next = null;
	  this._hasChildren = this._didComplete = !1;
	  this._children = null;
	  this._defer = !0;
	}

	Bh.prototype.render = function (a) {
	  this._defer ? void 0 : t$1("250");
	  this._hasChildren = !0;
	  this._children = a;
	  var b = this._root._internalRoot,
	      c = this._expirationTime,
	      d = new Ch();
	  wh(a, b, null, c, d._onCommit);
	  return d;
	};

	Bh.prototype.then = function (a) {
	  if (this._didComplete) a();else {
	    var b = this._callbacks;
	    null === b && (b = this._callbacks = []);
	    b.push(a);
	  }
	};

	Bh.prototype.commit = function () {
	  var a = this._root._internalRoot,
	      b = a.firstBatch;
	  this._defer && null !== b ? void 0 : t$1("251");

	  if (this._hasChildren) {
	    var c = this._expirationTime;

	    if (b !== this) {
	      this._hasChildren && (c = this._expirationTime = b._expirationTime, this.render(this._children));

	      for (var d = null, e = b; e !== this;) d = e, e = e._next;

	      null === d ? t$1("251") : void 0;
	      d._next = e._next;
	      this._next = b;
	      a.firstBatch = this;
	    }

	    this._defer = !1;
	    b = c;
	    V$1 ? t$1("253") : void 0;
	    Y$1 = a;
	    Z$1 = b;
	    Xg(a, b, !0);
	    Yg(1, null);
	    b = this._next;
	    this._next = null;
	    b = a.firstBatch = b;
	    null !== b && b._hasChildren && b.render(b._children);
	  } else this._next = null, this._defer = !1;
	};

	Bh.prototype._onComplete = function () {
	  if (!this._didComplete) {
	    this._didComplete = !0;
	    var a = this._callbacks;
	    if (null !== a) for (var b = 0; b < a.length; b++) (0, a[b])();
	  }
	};

	function Ch() {
	  this._callbacks = null;
	  this._didCommit = !1;
	  this._onCommit = this._onCommit.bind(this);
	}

	Ch.prototype.then = function (a) {
	  if (this._didCommit) a();else {
	    var b = this._callbacks;
	    null === b && (b = this._callbacks = []);
	    b.push(a);
	  }
	};

	Ch.prototype._onCommit = function () {
	  if (!this._didCommit) {
	    this._didCommit = !0;
	    var a = this._callbacks;
	    if (null !== a) for (var b = 0; b < a.length; b++) {
	      var c = a[b];
	      "function" !== typeof c ? t$1("191", c) : void 0;
	      c();
	    }
	  }
	};

	function Dh(a, b, c) {
	  b = new Se(5, null, null, b ? 3 : 0);
	  a = {
	    current: b,
	    containerInfo: a,
	    pendingChildren: null,
	    earliestPendingTime: 0,
	    latestPendingTime: 0,
	    earliestSuspendedTime: 0,
	    latestSuspendedTime: 0,
	    latestPingedTime: 0,
	    didError: !1,
	    pendingCommitExpirationTime: 0,
	    finishedWork: null,
	    timeoutHandle: -1,
	    context: null,
	    pendingContext: null,
	    hydrate: c,
	    nextExpirationTimeToWorkOn: 0,
	    expirationTime: 0,
	    firstBatch: null,
	    nextScheduledRoot: null
	  };
	  this._internalRoot = b.stateNode = a;
	}

	Dh.prototype.render = function (a, b) {
	  var c = this._internalRoot,
	      d = new Ch();
	  b = void 0 === b ? null : b;
	  null !== b && d.then(b);
	  xh(a, c, null, d._onCommit);
	  return d;
	};

	Dh.prototype.unmount = function (a) {
	  var b = this._internalRoot,
	      c = new Ch();
	  a = void 0 === a ? null : a;
	  null !== a && c.then(a);
	  xh(null, b, null, c._onCommit);
	  return c;
	};

	Dh.prototype.legacy_renderSubtreeIntoContainer = function (a, b, c) {
	  var d = this._internalRoot,
	      e = new Ch();
	  c = void 0 === c ? null : c;
	  null !== c && e.then(c);
	  xh(b, d, a, e._onCommit);
	  return e;
	};

	Dh.prototype.createBatch = function () {
	  var a = new Bh(this),
	      b = a._expirationTime,
	      c = this._internalRoot,
	      d = c.firstBatch;
	  if (null === d) c.firstBatch = a, a._next = null;else {
	    for (c = null; null !== d && d._expirationTime <= b;) c = d, d = d._next;

	    a._next = d;
	    null !== c && (c._next = a);
	  }
	  return a;
	};

	function Eh(a) {
	  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
	}

	Lb = sh;
	Mb = uh;

	Nb = function () {
	  V$1 || 0 === Vg || (Yg(Vg, null), Vg = 0);
	};

	function Fh(a, b) {
	  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
	  if (!b) for (var c; c = a.lastChild;) a.removeChild(c);
	  return new Dh(a, !1, b);
	}

	function Gh(a, b, c, d, e) {
	  Eh(c) ? void 0 : t$1("200");
	  var f = c._reactRootContainer;

	  if (f) {
	    if ("function" === typeof e) {
	      var g = e;

	      e = function () {
	        var a = zh(f._internalRoot);
	        g.call(a);
	      };
	    }

	    null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
	  } else {
	    f = c._reactRootContainer = Fh(c, d);

	    if ("function" === typeof e) {
	      var h = e;

	      e = function () {
	        var a = zh(f._internalRoot);
	        h.call(a);
	      };
	    }

	    th(function () {
	      null != a ? f.legacy_renderSubtreeIntoContainer(a, b, e) : f.render(b, e);
	    });
	  }

	  return zh(f._internalRoot);
	}

	function Hh(a, b) {
	  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
	  Eh(b) ? void 0 : t$1("200");
	  return Ah(a, b, null, c);
	}

	var Mh = {
	  createPortal: Hh,
	  findDOMNode: function (a) {
	    if (null == a) return null;
	    if (1 === a.nodeType) return a;
	    var b = a._reactInternalFiber;
	    void 0 === b && ("function" === typeof a.render ? t$1("188") : t$1("268", Object.keys(a)));
	    a = md(b);
	    a = null === a ? null : a.stateNode;
	    return a;
	  },
	  hydrate: function (a, b, c) {
	    return Gh(null, a, b, !0, c);
	  },
	  render: function (a, b, c) {
	    return Gh(null, a, b, !1, c);
	  },
	  unstable_renderSubtreeIntoContainer: function (a, b, c, d) {
	    null == a || void 0 === a._reactInternalFiber ? t$1("38") : void 0;
	    return Gh(a, b, c, !1, d);
	  },
	  unmountComponentAtNode: function (a) {
	    Eh(a) ? void 0 : t$1("40");
	    return a._reactRootContainer ? (th(function () {
	      Gh(null, null, a, !1, function () {
	        a._reactRootContainer = null;
	      });
	    }), !0) : !1;
	  },
	  unstable_createPortal: function () {
	    return Hh.apply(void 0, arguments);
	  },
	  unstable_batchedUpdates: sh,
	  unstable_interactiveUpdates: uh,
	  flushSync: function (a, b) {
	    V$1 ? t$1("187") : void 0;
	    var c = W$1;
	    W$1 = !0;

	    try {
	      return bh(a, b);
	    } finally {
	      W$1 = c, Yg(1, null);
	    }
	  },
	  unstable_flushControlled: function (a) {
	    var b = W$1;
	    W$1 = !0;

	    try {
	      bh(a);
	    } finally {
	      (W$1 = b) || V$1 || Yg(1, null);
	    }
	  },
	  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
	    Events: [La, Ma, Na, Ea.injectEventPluginsByName, qa, Ua, function (a) {
	      za(a, Ta);
	    }, Jb, Kb, Id, Ga]
	  },
	  unstable_createRoot: function (a, b) {
	    Eh(a) ? void 0 : t$1("278");
	    return new Dh(a, !0, null != b && !0 === b.hydrate);
	  }
	};

	(function (a) {
	  var b = a.findFiberByHostInstance;
	  return Re(objectAssign({}, a, {
	    findHostInstanceByFiber: function (a) {
	      a = md(a);
	      return null === a ? null : a.stateNode;
	    },
	    findFiberByHostInstance: function (a) {
	      return b ? b(a) : null;
	    }
	  }));
	})({
	  findFiberByHostInstance: Ka,
	  bundleType: 0,
	  version: "16.5.2",
	  rendererPackageName: "react-dom"
	});

	var Nh = {
	  default: Mh
	},
	    Oh = Nh && Mh || Nh;
	var reactDom_production_min = Oh.default || Oh;

	var reactDom = createCommonjsModule(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
	    return;
	  }

	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = reactDom_production_min;
	}
	});

	var domain; // This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).

	function EventHandlers() {}

	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	// require('events') === require('events').EventEmitter

	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.usingDomains = false;
	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.

	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function () {
	  this.domain = null;

	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active && !(this instanceof domain.Domain)) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	}; // Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.


	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	}; // These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.


	function emitNone(handler, isFn, self) {
	  if (isFn) handler.call(self);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) listeners[i].call(self);
	  }
	}

	function emitOne(handler, isFn, self, arg1) {
	  if (isFn) handler.call(self, arg1);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
	  }
	}

	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn) handler.call(self, arg1, arg2);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
	  }
	}

	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn) handler.call(self, arg1, arg2, arg3);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn) handler.apply(self, args);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = type === 'error';
	  events = this._events;
	  if (events) doError = doError && events.error == null;else if (!doError) return false;
	  domain = this.domain; // If there is no 'error' event listener then throw.

	  if (doError) {
	    er = arguments[1];

	    if (domain) {
	      if (!er) er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }

	    return false;
	  }

	  handler = events[type];
	  if (!handler) return false;
	  var isFn = typeof handler === 'function';
	  len = arguments.length;

	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;

	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;

	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;

	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower

	    default:
	      args = new Array(len - 1);

	      for (i = 1; i < len; i++) args[i - 1] = arguments[i];

	      emitMany(handler, isFn, this, args);
	  }
	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = target._events;

	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object

	      events = target._events;
	    }

	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    } // Check for listener leak


	    if (!existing.warned) {
	      m = $getMaxListeners(target);

	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}

	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener = function prependListener(type, listener) {
	  return _addListener(this, type, listener, true);
	};

	function _onceWrap(target, type, listener) {
	  var fired = false;

	  function g() {
	    target.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }

	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.prependListener(type, _onceWrap(this, type, listener));
	  return this;
	}; // emits a 'removeListener' event iff the listener was removed


	EventEmitter.prototype.removeListener = function removeListener(type, listener) {
	  var list, events, position, i, originalListener;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = this._events;
	  if (!events) return this;
	  list = events[type];
	  if (!list) return this;

	  if (list === listener || list.listener && list.listener === listener) {
	    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
	      delete events[type];
	      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
	    }
	  } else if (typeof list !== 'function') {
	    position = -1;

	    for (i = list.length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        originalListener = list[i].listener;
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list[0] = undefined;

	      if (--this._eventsCount === 0) {
	        this._events = new EventHandlers();
	        return this;
	      } else {
	        delete events[type];
	      }
	    } else {
	      spliceOne(list, position);
	    }

	    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
	  var listeners, events;
	  events = this._events;
	  if (!events) return this; // not listening for removeListener, no need to emit

	  if (!events.removeListener) {
	    if (arguments.length === 0) {
	      this._events = new EventHandlers();
	      this._eventsCount = 0;
	    } else if (events[type]) {
	      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
	    }

	    return this;
	  } // emit removeListener for all listeners on all events


	  if (arguments.length === 0) {
	    var keys = Object.keys(events);

	    for (var i = 0, key; i < keys.length; ++i) {
	      key = keys[i];
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }

	    this.removeAllListeners('removeListener');
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	    return this;
	  }

	  listeners = events[type];

	  if (typeof listeners === 'function') {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    do {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    } while (listeners[0]);
	  }

	  return this;
	};

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;
	  if (!events) ret = [];else {
	    evlistener = events[type];
	    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
	  }
	  return ret;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;

	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	}; // About 1.5x faster than the two-arg version of Array#splice().


	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];

	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);

	  while (i--) copy[i] = arr[i];

	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);

	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }

	  return ret;
	}

	var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;

	function init() {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray(b64) {
	  if (!inited) {
	    init();
	  }

	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4');
	  } // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice


	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

	  arr = new Arr(len * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

	  l = placeHolders > 0 ? len - 4 : len;
	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = tmp >> 16 & 0xFF;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr;
	}

	function tripletToBase64(num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
	}

	function encodeChunk(uint8, start, end) {
	  var tmp;
	  var output = [];

	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
	    output.push(tripletToBase64(tmp));
	  }

	  return output.join('');
	}

	function fromByteArray(uint8) {
	  if (!inited) {
	    init();
	  }

	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3
	  // go through the array every three bytes, we'll deal with trailing stuff later

	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	  } // pad the end with zeros, but make sure to not forget the extra bytes


	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[tmp << 4 & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    output += lookup[tmp >> 10];
	    output += lookup[tmp >> 4 & 0x3F];
	    output += lookup[tmp << 2 & 0x3F];
	    output += '=';
	  }

	  parts.push(output);
	  return parts.join('');
	}

	function read(buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];
	  i += d;
	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;

	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;

	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }

	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	}
	function write(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);

	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }

	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }

	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;

	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;
	var isArray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */

	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	function createBuffer(that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length');
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }

	    that.length = length;
	  }

	  return that;
	}
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */


	function Buffer(arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length);
	  } // Common case.


	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error('If encoding is specified then the first argument must be a string');
	    }

	    return allocUnsafe(this, arg);
	  }

	  return from(this, arg, encodingOrOffset, length);
	}
	Buffer.poolSize = 8192; // not used by this implementation
	// TODO: Legacy, not needed anymore. Remove in next major version.

	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr;
	};

	function from(that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length);
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset);
	  }

	  return fromObject(that, value);
	}
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/


	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length);
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize(size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number');
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative');
	  }
	}

	function alloc(that, size, fill, encoding) {
	  assertSize(size);

	  if (size <= 0) {
	    return createBuffer(that, size);
	  }

	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
	  }

	  return createBuffer(that, size);
	}
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/


	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding);
	};

	function allocUnsafe(that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }

	  return that;
	}
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */


	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size);
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */


	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size);
	};

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding');
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);
	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }

	  return that;
	}

	function fromArrayBuffer(that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds');
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds');
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }

	  return that;
	}

	function fromObject(that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that;
	    }

	    obj.copy(that, 0, 0, len);
	    return that;
	  }

	  if (obj) {
	    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0);
	      }

	      return fromArrayLike(that, obj);
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data);
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }

	  return length | 0;
	}
	Buffer.isBuffer = isBuffer;

	function internalIsBuffer(b) {
	  return !!(b != null && b._isBuffer);
	}

	Buffer.compare = function compare(a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;
	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;

	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers');
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0);
	  }

	  var i;

	  if (length === undefined) {
	    length = 0;

	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;

	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];

	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers');
	    }

	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }

	  return buffer;
	};

	function byteLength(string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length;
	  }

	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength;
	  }

	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0; // Use a for loop to avoid recursion

	  var loweredCase = false;

	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len;

	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length;

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;

	      case 'hex':
	        return len >>> 1;

	      case 'base64':
	        return base64ToBytes(string).length;

	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	Buffer.byteLength = byteLength;

	function slowToString(encoding, start, end) {
	  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

	  if (start === undefined || start < 0) {
	    start = 0;
	  } // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.


	  if (start > this.length) {
	    return '';
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return '';
	  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return '';
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.


	Buffer.prototype._isBuffer = true;

	function swap(b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16() {
	  var len = this.length;

	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits');
	  }

	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }

	  return this;
	};

	Buffer.prototype.swap32 = function swap32() {
	  var len = this.length;

	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits');
	  }

	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }

	  return this;
	};

	Buffer.prototype.swap64 = function swap64() {
	  var len = this.length;

	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits');
	  }

	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }

	  return this;
	};

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;

	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }

	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer');
	  }

	  if (start === undefined) {
	    start = 0;
	  }

	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }

	  if (thisStart === undefined) {
	    thisStart = 0;
	  }

	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index');
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0;
	  }

	  if (thisStart >= thisEnd) {
	    return -1;
	  }

	  if (start >= end) {
	    return 1;
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;
	  if (this === target) return 0;
	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);
	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break;
	    }
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf


	function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1; // Normalize byteOffset

	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }

	  byteOffset = +byteOffset; // Coerce to Number.

	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : buffer.length - 1;
	  } // Normalize byteOffset: negative offsets start from the end of the buffer


	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

	  if (byteOffset >= buffer.length) {
	    if (dir) return -1;else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;else return -1;
	  } // Normalize val


	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  } // Finally, search either indexOf (if dir is true) or lastIndexOf


	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1;
	    }

	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]

	    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
	      }
	    }

	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
	  }

	  throw new TypeError('val must be string, number or Buffer');
	}

	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();

	    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1;
	      }

	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read$$1(buf, i) {
	    if (indexSize === 1) {
	      return buf[i];
	    } else {
	      return buf.readUInt16BE(i * indexSize);
	    }
	  }

	  var i;

	  if (dir) {
	    var foundIndex = -1;

	    for (i = byteOffset; i < arrLength; i++) {
	      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;

	      for (var j = 0; j < valLength; j++) {
	        if (read$$1(arr, i + j) !== read$$1(val, j)) {
	          found = false;
	          break;
	        }
	      }

	      if (found) return i;
	    }
	  }

	  return -1;
	}

	Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1;
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;

	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);

	    if (length > remaining) {
	      length = remaining;
	    }
	  } // must be an even number of digits


	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }

	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i;
	    buf[offset + i] = parsed;
	  }

	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function latin1Write(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write$$1(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0; // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0; // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;

	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    } // legacy write(string, encoding, offset, length) - remove in v0.13

	  } else {
	    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';
	  var loweredCase = false;

	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf);
	  } else {
	    return fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];
	  var i = start;

	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }

	          break;

	        case 2:
	          secondByte = buf[i + 1];

	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }

	          break;

	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];

	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }

	          break;

	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];

	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }

	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety


	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;

	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  } // Decode in chunks to avoid "call stack size exceeded".


	  var res = '';
	  var i = 0;

	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }

	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }

	  return ret;
	}

	function latin1Slice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }

	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;
	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;
	  var out = '';

	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }

	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';

	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }

	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;
	  var newBuf;

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);

	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf;
	};
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */


	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var val = this[offset];
	  var mul = 1;
	  var i = 0;

	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;

	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;

	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var val = this[offset];
	  var mul = 1;
	  var i = 0;

	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  mul *= 0x80;
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];

	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }

	  mul *= 0x80;
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;

	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;

	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;

	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;

	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;

	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }

	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }

	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;

	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }

	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }

	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;

	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);
	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;

	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }

	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;

	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);
	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;

	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }

	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }

	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }

	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }

	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }

	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	  if (offset < 0) throw new RangeError('Index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }

	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }

	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }

	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

	  if (end > this.length) end = this.length;

	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
	  }

	  return len;
	}; // Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])


	Buffer.prototype.fill = function fill(val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }

	    if (val.length === 1) {
	      var code = val.charCodeAt(0);

	      if (code < 256) {
	        val = code;
	      }
	    }

	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string');
	    }

	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding);
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  } // Invalid ranges are not set to a default, so can range check early.


	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index');
	  }

	  if (end <= start) {
	    return this;
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;
	  if (!val) val = 0;
	  var i;

	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;

	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this;
	}; // HELPER FUNCTIONS
	// ================


	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

	  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }

	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i); // is surrogate component

	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } // valid lead


	        leadSurrogate = codePoint;
	        continue;
	      } // 2 leads in a row


	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      } // valid surrogate pair


	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null; // encode utf8

	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];

	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }

	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];

	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break;
	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }

	  return i;
	}

	function isnan(val) {
	  return val !== val; // eslint-disable-line no-self-compare
	} // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually


	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
	}

	function isFastBuffer(obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
	} // For Node v0.10 support. Remove this eventually.


	function isSlowBuffer(obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
	}

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js
	function defaultSetTimout() {
	  throw new Error('setTimeout has not been defined');
	}

	function defaultClearTimeout() {
	  throw new Error('clearTimeout has not been defined');
	}

	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;

	if (typeof global$1.setTimeout === 'function') {
	  cachedSetTimeout = setTimeout;
	}

	if (typeof global$1.clearTimeout === 'function') {
	  cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	  if (cachedSetTimeout === setTimeout) {
	    //normal enviroments in sane situations
	    return setTimeout(fun, 0);
	  } // if setTimeout wasn't available but was latter defined


	  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	    cachedSetTimeout = setTimeout;
	    return setTimeout(fun, 0);
	  }

	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedSetTimeout(fun, 0);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	      return cachedSetTimeout.call(null, fun, 0);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	      return cachedSetTimeout.call(this, fun, 0);
	    }
	  }
	}

	function runClearTimeout(marker) {
	  if (cachedClearTimeout === clearTimeout) {
	    //normal enviroments in sane situations
	    return clearTimeout(marker);
	  } // if clearTimeout wasn't available but was latter defined


	  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	    cachedClearTimeout = clearTimeout;
	    return clearTimeout(marker);
	  }

	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedClearTimeout(marker);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	      return cachedClearTimeout.call(null, marker);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	      return cachedClearTimeout.call(this, marker);
	    }
	  }
	}

	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	  if (!draining || !currentQueue) {
	    return;
	  }

	  draining = false;

	  if (currentQueue.length) {
	    queue = currentQueue.concat(queue);
	  } else {
	    queueIndex = -1;
	  }

	  if (queue.length) {
	    drainQueue();
	  }
	}

	function drainQueue() {
	  if (draining) {
	    return;
	  }

	  var timeout = runTimeout(cleanUpNextTick);
	  draining = true;
	  var len = queue.length;

	  while (len) {
	    currentQueue = queue;
	    queue = [];

	    while (++queueIndex < len) {
	      if (currentQueue) {
	        currentQueue[queueIndex].run();
	      }
	    }

	    queueIndex = -1;
	    len = queue.length;
	  }

	  currentQueue = null;
	  draining = false;
	  runClearTimeout(timeout);
	}

	function nextTick(fun) {
	  var args = new Array(arguments.length - 1);

	  if (arguments.length > 1) {
	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }
	  }

	  queue.push(new Item(fun, args));

	  if (queue.length === 1 && !draining) {
	    runTimeout(drainQueue);
	  }
	} // v8 likes predictible objects

	function Item(fun, array) {
	  this.fun = fun;
	  this.array = array;
	}

	Item.prototype.run = function () {
	  this.fun.apply(null, this.array);
	};

	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues

	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;
	function binding(name) {
	  throw new Error('process.binding is not supported');
	}
	function cwd() {
	  return '/';
	}
	function chdir(dir) {
	  throw new Error('process.chdir is not supported');
	}
	function umask() {
	  return 0;
	} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

	var performance$1 = global$1.performance || {};

	var performanceNow = performance$1.now || performance$1.mozNow || performance$1.msNow || performance$1.oNow || performance$1.webkitNow || function () {
	  return new Date().getTime();
	}; // generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime


	function hrtime(previousTimestamp) {
	  var clocktime = performanceNow.call(performance$1) * 1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];

	    if (nanoseconds < 0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }

	  return [seconds, nanoseconds];
	}
	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}
	var process = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var inherits;

	if (typeof Object.create === 'function') {
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;

	    var TempCtor = function () {};

	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

	var inherits$1 = inherits;

	var formatRegExp = /%[sdj%]/g;
	function format(f) {
	  if (!isString(f)) {
	    var objects = [];

	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }

	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;

	    switch (x) {
	      case '%s':
	        return String(args[i++]);

	      case '%d':
	        return Number(args[i++]);

	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }

	      default:
	        return x;
	    }
	  });

	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }

	  return str;
	}
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.

	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global$1.process)) {
	    return function () {
	      return deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  var warned = false;

	  function deprecated() {
	    if (!warned) {
	      {
	        console.error(msg);
	      }

	      warned = true;
	    }

	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}
	var debugs = {};
	var debugEnviron;
	function debuglog(set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();

	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;

	      debugs[set] = function () {
	        var msg = format.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }

	  return debugs[set];
	}
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */

	/* legacy: obj, showHidden, depth, colors*/

	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  }; // legacy...

	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];

	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  } // set default options


	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	} // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	}; // Don't use 'blue' not visible on cmd.exe

	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};
	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });
	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
	  value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);

	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }

	    return ret;
	  } // Primitive types cannot have properties


	  var primitive = formatPrimitive(ctx, value);

	  if (primitive) {
	    return primitive;
	  } // Look up the keys of the object.


	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  } // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  } // Some type of object without properties can be shortcutted.


	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }

	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }

	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }

	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}']; // Make Array say that they are Array

	  if (isArray$1(value)) {
	    array = true;
	    braces = ['[', ']'];
	  } // Make functions say that they are functions


	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  } // Make RegExps say that they are RegExps


	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  } // Make dates with properties first say the date


	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  } // Make error with message first say the error


	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);
	  var output;

	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();
	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }

	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];

	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty$1(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }

	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || {
	    value: value[key]
	  };

	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }

	  if (!hasOwnProperty$1(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }

	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }

	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }

	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }

	    name = JSON.stringify('' + key);

	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function (prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	} // NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.


	function isArray$1(ar) {
	  return Array.isArray(ar);
	}
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	function isNull(arg) {
	  return arg === null;
	}
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	function isString(arg) {
	  return typeof arg === 'string';
	}
	function isUndefined(arg) {
	  return arg === void 0;
	}
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	  var keys = Object.keys(add);
	  var i = keys.length;

	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }

	  return origin;
	}

	function hasOwnProperty$1(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}

	BufferList.prototype.push = function (v) {
	  var entry = {
	    data: v,
	    next: null
	  };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};

	BufferList.prototype.unshift = function (v) {
	  var entry = {
	    data: v,
	    next: this.head
	  };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};

	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};

	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};

	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;

	  while (p = p.next) {
	    ret += s + p.data;
	  }

	  return ret;
	};

	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return Buffer.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = Buffer.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;

	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }

	  return ret;
	};

	// Copyright Joyent, Inc. and other Node contributors.

	var isBufferEncoding = Buffer.isEncoding || function (encoding) {
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	    case 'raw':
	      return true;

	    default:
	      return false;
	  }
	};

	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	} // StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.


	function StringDecoder(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);

	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;

	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;

	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;

	    default:
	      this.write = passThroughWrite;
	      return;
	  } // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).


	  this.charBuffer = new Buffer(6); // Number of bytes received for the current incomplete multi-byte character.

	  this.charReceived = 0; // Number of bytes expected for the current incomplete multi-byte character.

	  this.charLength = 0;
	}
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .

	StringDecoder.prototype.write = function (buffer) {
	  var charStr = ''; // if our last write ended with an incomplete multibyte character

	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length; // add the new bytes to the char buffer

	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    } // remove bytes belonging to the current character from the buffer


	    buffer = buffer.slice(available, buffer.length); // get the character that was split

	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding); // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character

	    var charCode = charStr.charCodeAt(charStr.length - 1);

	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }

	    this.charReceived = this.charLength = 0; // if there are no more bytes in this buffer, just emit our char

	    if (buffer.length === 0) {
	      return charStr;
	    }

	    break;
	  } // determine and set charLength / charReceived


	  this.detectIncompleteChar(buffer);
	  var end = buffer.length;

	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end); // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character

	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  } // or just emit the charStr


	  return charStr;
	}; // detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.


	StringDecoder.prototype.detectIncompleteChar = function (buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = buffer.length >= 3 ? 3 : buffer.length; // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.

	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i]; // See http://en.wikipedia.org/wiki/UTF-8#Description
	    // 110XXXXX

	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    } // 1110XXXX


	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    } // 11110XXX


	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }

	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function (buffer) {
	  var res = '';
	  if (buffer && buffer.length) res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

	Readable.ReadableState = ReadableState;
	var debug = debuglog('stream');
	inherits$1(Readable, EventEmitter);

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}

	function listenerCount$1(emitter, type) {
	  return emitter.listeners(type).length;
	}

	function ReadableState(options, stream) {
	  options = options || {}; // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away

	  this.objectMode = !!options.objectMode;
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"

	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm; // cast to ints.

	  this.highWaterMark = ~~this.highWaterMark; // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()

	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.

	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.

	  this.ranOut = false; // the number of writers that are awaiting a drain event in .pipe()s

	  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;

	  if (options.encoding) {
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {
	  if (!(this instanceof Readable)) return new Readable(options);
	  this._readableState = new ReadableState(options, this); // legacy

	  this.readable = true;
	  if (options && typeof options.read === 'function') this._read = options.read;
	  EventEmitter.call(this);
	} // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.

	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;

	    if (encoding !== state.encoding) {
	      chunk = Buffer.from(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	}; // Unshift should *always* be something directly out of read()


	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);

	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');

	      stream.emit('error', _e);
	    } else {
	      var skipAdd;

	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }

	      if (!addToFront) state.reading = false; // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode

	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	          if (state.needReadable) emitReadable(stream);
	        }
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	} // if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.


	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	} // backwards compatibility.


	Readable.prototype.setEncoding = function (enc) {
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	}; // Don't raise the hwm > 8MB


	var MAX_HWM = 0x800000;

	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }

	  return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;

	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  } // If we're asking for more than the current hwm, then raise the hwm.


	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n; // Don't have enough

	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }

	  return state.length;
	} // you can override either this method, or the async _read(n) below.


	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.

	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  } // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	  // if we need a readable event, then we need to do some reading.


	  var doRead = state.needReadable;
	  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  } // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.


	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true; // if the length is currently zero, then we *need* a readable event.

	    if (state.length === 0) state.needReadable = true; // call internal read method

	    this._read(state.highWaterMark);

	    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.

	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;

	  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }

	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.ended) return;

	  if (state.decoder) {
	    var chunk = state.decoder.end();

	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }

	  state.ended = true; // emit 'readable' now to make sure it gets picked up.

	  emitReadable(stream);
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.


	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;

	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.


	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;

	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length) // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }

	  state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.


	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;

	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;

	    default:
	      state.pipes.push(dest);
	      break;
	  }

	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = !pipeOpts || pipeOpts.end !== false;
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);

	  function onunpipe(readable) {
	    debug('onunpipe');

	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  } // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.


	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;

	  function cleanup() {
	    debug('cleanup'); // cleanup event handlers once the pipe is broken

	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	    cleanedUp = true; // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.

	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  } // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.


	  var increasedAwaitDrain = false;
	  src.on('data', ondata);

	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);

	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }

	      src.pause();
	    }
	  } // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.


	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
	  } // Make sure our error handler is attached before userland ones.


	  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }

	  dest.once('close', onclose);

	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }

	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  } // tell the dest that it's being piped to


	  dest.emit('pipe', src); // start the flow if it hasn't been started already.

	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;

	    if (state.awaitDrain === 0 && src.listeners('data').length) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState; // if we're not piping anywhere, then do nothing.

	  if (state.pipesCount === 0) return this; // just one destination.  most common case.

	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes; // got a match.

	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  } // slow case. multiple pipe destinations.


	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }

	    return this;
	  } // try to find the right one.


	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this);
	  return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something


	Readable.prototype.on = function (ev, fn) {
	  var res = EventEmitter.prototype.on.call(this, ev, fn);

	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;

	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;

	      if (!state.reading) {
	        nextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};

	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.


	Readable.prototype.resume = function () {
	  var state = this._readableState;

	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }

	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);

	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }

	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);

	  while (state.flowing && stream.read() !== null) {}
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.


	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');

	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	    var ret = self.push(chunk);

	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  }); // proxy all the other methods.
	  // important when wrapping filters and duplexes.

	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  } // proxy certain important events.


	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  }); // when we try to consume some more bytes, simply unpause the
	  // underlying stream.

	  self._read = function (n) {
	    debug('wrapped _read', n);

	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	}; // exposed for testing purposes only.


	Readable._fromList = fromList; // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.

	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	  return ret;
	} // Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function fromListPartial(n, list, hasStrings) {
	  var ret;

	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }

	  return ret;
	} // Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;

	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;

	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }

	      break;
	    }

	    ++c;
	  }

	  list.length -= c;
	  return ret;
	} // Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;

	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;

	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }

	      break;
	    }

	    ++c;
	  }

	  list.length -= c;
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState; // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.

	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }

	  return -1;
	}

	// A bit simpler than readable streams.
	Writable.WritableState = WritableState;
	inherits$1(Writable, EventEmitter);

	function nop() {}

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	function WritableState(options, stream) {
	  Object.defineProperty(this, 'buffer', {
	    get: deprecate(function () {
	      return this.getBuffer();
	    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	  });
	  options = options || {}; // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.

	  this.objectMode = !!options.objectMode;
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()

	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm; // cast to ints.

	  this.highWaterMark = ~~this.highWaterMark;
	  this.needDrain = false; // at the start of calling end()

	  this.ending = false; // when end() has been called, and returned

	  this.ended = false; // when 'finish' is emitted

	  this.finished = false; // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.

	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.

	  this.length = 0; // a flag to see when we're in the middle of a write.

	  this.writing = false; // when true all writes will be buffered until .uncork() call

	  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.

	  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  }; // the callback that the user supplies to write(chunk,encoding,cb)


	  this.writecb = null; // the amount that is being written when _write is called.

	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted

	  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams

	  this.prefinished = false; // True if the error was already emitted and should not be thrown again

	  this.errorEmitted = false; // count buffered requests

	  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two

	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function writableStateGetBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];

	  while (current) {
	    out.push(current);
	    current = current.next;
	  }

	  return out;
	};
	function Writable(options) {
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);
	  this._writableState = new WritableState(options, this); // legacy.

	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  EventEmitter.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.

	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end'); // TODO: defer error events consistently everywhere, not just the cb

	  stream.emit('error', er);
	  nextTick(cb, er);
	} // If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.


	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false; // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.

	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }

	  if (er) {
	    stream.emit('error', er);
	    nextTick(cb, er);
	    valid = false;
	  }

	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;
	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }

	  return chunk;
	} // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.


	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);

	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }

	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) nextTick(cb, er);else cb(er);
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	      nextTick(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.


	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	} // if there's something in the buffer waiting, then process it


	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;

	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite

	    state.pendingcb++;
	    state.lastBufferedRequest = null;

	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next; // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.

	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  } // ignore unnecessary end() calls.


	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);

	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }

	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);

	  if (cb) {
	    if (state.finished) nextTick(cb);else stream.once('finish', cb);
	  }

	  state.ended = true;
	  stream.writable = false;
	} // It seems a linked list but it is not
	// there will be only 2 of these for each stream


	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;

	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }

	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}

	inherits$1(Duplex, Readable);
	var keys = Object.keys(Writable.prototype);

	for (var v$1 = 0; v$1 < keys.length; v$1++) {
	  var method = keys[v$1];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  if (options && options.readable === false) this.readable = false;
	  if (options && options.writable === false) this.writable = false;
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	  this.once('end', onend);
	} // the no-half-open enforcer

	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return; // no more data can be written.
	  // But allow more writes to happen in this tick.

	  nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	// a transform stream is a readable/writable stream where you do
	inherits$1(Transform, Duplex);

	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;
	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));
	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data !== null && data !== undefined) stream.push(data);
	  cb(er);
	  var rs = stream._readableState;
	  rs.reading = false;

	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	  Duplex.call(this, options);
	  this._transformState = new TransformState(this); // when the writable side finishes, then flush out anything remaining.

	  var stream = this; // start out asking for a readable event once data is transformed.

	  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.

	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	}; // This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.


	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('Not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;

	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	}; // Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.


	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;

	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er); // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided

	  var ws = stream._writableState;
	  var ts = stream._transformState;
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	  return stream.push(null);
	}

	inherits$1(PassThrough, Transform);
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

	inherits$1(Stream, EventEmitter);
	Stream.Readable = Readable;
	Stream.Writable = Writable;
	Stream.Duplex = Duplex;
	Stream.Transform = Transform;
	Stream.PassThrough = PassThrough; // Backwards-compat with node 0.4.x

	Stream.Stream = Stream;
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EventEmitter.call(this);
	}

	Stream.prototype.pipe = function (dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain); // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.

	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;

	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	    dest.end();
	  }

	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	    if (typeof dest.destroy === 'function') dest.destroy();
	  } // don't leave dangling pipes when there are errors.


	  function onerror(er) {
	    cleanup();

	    if (EventEmitter.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror); // remove all the event listeners that were added.

	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);
	  dest.on('close', cleanup);
	  dest.emit('pipe', source); // Allow for unix-like usage: A.pipe(B).pipe(C)

	  return dest;
	};

	var stream = /*#__PURE__*/Object.freeze({
		default: Stream,
		Readable: Readable,
		Writable: Writable,
		Duplex: Duplex,
		Transform: Transform,
		PassThrough: PassThrough,
		Stream: Stream
	});

	var aa$1 = ( stream && Stream ) || stream;

	function ba$1(a, b, d, c, g, f, k, l) {
	  if (!a) {
	    a = void 0;
	    if (void 0 === b) a = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
	      var D = [d, c, g, f, k, l],
	          z = 0;
	      a = Error(b.replace(/%s/g, function () {
	        return D[z++];
	      }));
	      a.name = "Invariant Violation";
	    }
	    a.framesToPop = 1;
	    throw a;
	  }
	}

	function t$2(a) {
	  for (var b = arguments.length - 1, d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 0; c < b; c++) d += "&args[]=" + encodeURIComponent(arguments[c + 1]);

	  ba$1(!1, "Minified React error #" + a + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", d);
	}

	var x$1 = "function" === typeof Symbol && Symbol.for,
	    y$1 = x$1 ? Symbol.for("react.portal") : 60106,
	    A$1 = x$1 ? Symbol.for("react.fragment") : 60107,
	    B$1 = x$1 ? Symbol.for("react.strict_mode") : 60108,
	    C$2 = x$1 ? Symbol.for("react.profiler") : 60114,
	    E$2 = x$1 ? Symbol.for("react.provider") : 60109,
	    F$2 = x$1 ? Symbol.for("react.context") : 60110,
	    G$2 = x$1 ? Symbol.for("react.async_mode") : 60111,
	    H$2 = x$1 ? Symbol.for("react.forward_ref") : 60112,
	    ca$1 = x$1 ? Symbol.for("react.placeholder") : 60113;

	function I$2(a) {
	  if (null == a) return null;
	  if ("function" === typeof a) return a.displayName || a.name || null;
	  if ("string" === typeof a) return a;

	  switch (a) {
	    case G$2:
	      return "AsyncMode";

	    case A$1:
	      return "Fragment";

	    case y$1:
	      return "Portal";

	    case C$2:
	      return "Profiler";

	    case B$1:
	      return "StrictMode";

	    case ca$1:
	      return "Placeholder";
	  }

	  if ("object" === typeof a) {
	    switch (a.$$typeof) {
	      case F$2:
	        return "Context.Consumer";

	      case E$2:
	        return "Context.Provider";

	      case H$2:
	        var b = a.render;
	        b = b.displayName || b.name || "";
	        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
	    }

	    if ("function" === typeof a.then && (a = 1 === a._reactStatus ? a._reactResult : null)) return I$2(a);
	  }

	  return null;
	}

	var da$1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
	    J$2 = Object.prototype.hasOwnProperty,
	    K$2 = {},
	    L$2 = {};

	function M$2(a) {
	  if (J$2.call(L$2, a)) return !0;
	  if (J$2.call(K$2, a)) return !1;
	  if (da$1.test(a)) return L$2[a] = !0;
	  K$2[a] = !0;
	  return !1;
	}

	function ea$1(a, b, d, c) {
	  if (null !== d && 0 === d.type) return !1;

	  switch (typeof b) {
	    case "function":
	    case "symbol":
	      return !0;

	    case "boolean":
	      if (c) return !1;
	      if (null !== d) return !d.acceptsBooleans;
	      a = a.toLowerCase().slice(0, 5);
	      return "data-" !== a && "aria-" !== a;

	    default:
	      return !1;
	  }
	}

	function fa$1(a, b, d, c) {
	  if (null === b || "undefined" === typeof b || ea$1(a, b, d, c)) return !0;
	  if (c) return !1;
	  if (null !== d) switch (d.type) {
	    case 3:
	      return !b;

	    case 4:
	      return !1 === b;

	    case 5:
	      return isNaN(b);

	    case 6:
	      return isNaN(b) || 1 > b;
	  }
	  return !1;
	}

	function N$2(a, b, d, c, g) {
	  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
	  this.attributeName = c;
	  this.attributeNamespace = g;
	  this.mustUseProperty = d;
	  this.propertyName = a;
	  this.type = b;
	}

	var O$2 = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
	  O$2[a] = new N$2(a, 0, !1, a, null);
	});
	[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
	  var b = a[0];
	  O$2[b] = new N$2(b, 1, !1, a[1], null);
	});
	["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
	  O$2[a] = new N$2(a, 2, !1, a.toLowerCase(), null);
	});
	["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
	  O$2[a] = new N$2(a, 2, !1, a, null);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
	  O$2[a] = new N$2(a, 3, !1, a.toLowerCase(), null);
	});
	["checked", "multiple", "muted", "selected"].forEach(function (a) {
	  O$2[a] = new N$2(a, 3, !0, a, null);
	});
	["capture", "download"].forEach(function (a) {
	  O$2[a] = new N$2(a, 4, !1, a, null);
	});
	["cols", "rows", "size", "span"].forEach(function (a) {
	  O$2[a] = new N$2(a, 6, !1, a, null);
	});
	["rowSpan", "start"].forEach(function (a) {
	  O$2[a] = new N$2(a, 5, !1, a.toLowerCase(), null);
	});
	var P$1 = /[\-:]([a-z])/g;

	function Q$2(a) {
	  return a[1].toUpperCase();
	}

	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
	  var b = a.replace(P$1, Q$2);
	  O$2[b] = new N$2(b, 1, !1, a, null);
	});
	"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
	  var b = a.replace(P$1, Q$2);
	  O$2[b] = new N$2(b, 1, !1, a, "http://www.w3.org/1999/xlink");
	});
	["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
	  var b = a.replace(P$1, Q$2);
	  O$2[b] = new N$2(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace");
	});
	O$2.tabIndex = new N$2("tabIndex", 1, !1, "tabindex", null);
	var ha$1 = /["'&<>]/;

	function R$1(a) {
	  if ("boolean" === typeof a || "number" === typeof a) return "" + a;
	  a = "" + a;
	  var b = ha$1.exec(a);

	  if (b) {
	    var d = "",
	        c,
	        g = 0;

	    for (c = b.index; c < a.length; c++) {
	      switch (a.charCodeAt(c)) {
	        case 34:
	          b = "&quot;";
	          break;

	        case 38:
	          b = "&amp;";
	          break;

	        case 39:
	          b = "&#x27;";
	          break;

	        case 60:
	          b = "&lt;";
	          break;

	        case 62:
	          b = "&gt;";
	          break;

	        default:
	          continue;
	      }

	      g !== c && (d += a.substring(g, c));
	      g = c + 1;
	      d += b;
	    }

	    a = g !== c ? d + a.substring(g, c) : d;
	  }

	  return a;
	}

	var S$1 = {
	  html: "http://www.w3.org/1999/xhtml",
	  mathml: "http://www.w3.org/1998/Math/MathML",
	  svg: "http://www.w3.org/2000/svg"
	};

	function T$2(a) {
	  switch (a) {
	    case "svg":
	      return "http://www.w3.org/2000/svg";

	    case "math":
	      return "http://www.w3.org/1998/Math/MathML";

	    default:
	      return "http://www.w3.org/1999/xhtml";
	  }
	}

	var U$2 = {
	  area: !0,
	  base: !0,
	  br: !0,
	  col: !0,
	  embed: !0,
	  hr: !0,
	  img: !0,
	  input: !0,
	  keygen: !0,
	  link: !0,
	  meta: !0,
	  param: !0,
	  source: !0,
	  track: !0,
	  wbr: !0
	},
	    ia$1 = objectAssign({
	  menuitem: !0
	}, U$2),
	    V$2 = {
	  animationIterationCount: !0,
	  borderImageOutset: !0,
	  borderImageSlice: !0,
	  borderImageWidth: !0,
	  boxFlex: !0,
	  boxFlexGroup: !0,
	  boxOrdinalGroup: !0,
	  columnCount: !0,
	  columns: !0,
	  flex: !0,
	  flexGrow: !0,
	  flexPositive: !0,
	  flexShrink: !0,
	  flexNegative: !0,
	  flexOrder: !0,
	  gridArea: !0,
	  gridRow: !0,
	  gridRowEnd: !0,
	  gridRowSpan: !0,
	  gridRowStart: !0,
	  gridColumn: !0,
	  gridColumnEnd: !0,
	  gridColumnSpan: !0,
	  gridColumnStart: !0,
	  fontWeight: !0,
	  lineClamp: !0,
	  lineHeight: !0,
	  opacity: !0,
	  order: !0,
	  orphans: !0,
	  tabSize: !0,
	  widows: !0,
	  zIndex: !0,
	  zoom: !0,
	  fillOpacity: !0,
	  floodOpacity: !0,
	  stopOpacity: !0,
	  strokeDasharray: !0,
	  strokeDashoffset: !0,
	  strokeMiterlimit: !0,
	  strokeOpacity: !0,
	  strokeWidth: !0
	},
	    ja$1 = ["Webkit", "ms", "Moz", "O"];
	Object.keys(V$2).forEach(function (a) {
	  ja$1.forEach(function (b) {
	    b = b + a.charAt(0).toUpperCase() + a.substring(1);
	    V$2[b] = V$2[a];
	  });
	});
	var ka$1 = /([A-Z])/g,
	    la$1 = /^ms-/,
	    W$2 = react.Children.toArray,
	    ma$1 = {
	  listing: !0,
	  pre: !0,
	  textarea: !0
	},
	    na$1 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
	    X$1 = {},
	    Y$2 = {};

	function oa$1(a) {
	  if (void 0 === a || null === a) return a;
	  var b = "";
	  react.Children.forEach(a, function (a) {
	    null != a && (b += a);
	  });
	  return b;
	}

	var pa$1 = {};

	function qa$1(a, b) {
	  if (a = a.contextTypes) {
	    var d = {},
	        c;

	    for (c in a) d[c] = b[c];

	    b = d;
	  } else b = pa$1;

	  return b;
	}

	var ra$1 = Object.prototype.hasOwnProperty,
	    sa$1 = {
	  children: null,
	  dangerouslySetInnerHTML: null,
	  suppressContentEditableWarning: null,
	  suppressHydrationWarning: null
	};

	function ta$1(a, b) {
	  void 0 === a && t$2("152", I$2(b) || "Component");
	}

	function ua$1(a, b) {
	  function d(c, g) {
	    var d = qa$1(g, b),
	        f = [],
	        k = !1,
	        h = {
	      isMounted: function () {
	        return !1;
	      },
	      enqueueForceUpdate: function () {
	        if (null === f) return null;
	      },
	      enqueueReplaceState: function (a, b) {
	        k = !0;
	        f = [b];
	      },
	      enqueueSetState: function (a, b) {
	        if (null === f) return null;
	        f.push(b);
	      }
	    },
	        e = void 0;

	    if (g.prototype && g.prototype.isReactComponent) {
	      if (e = new g(c.props, d, h), "function" === typeof g.getDerivedStateFromProps) {
	        var v = g.getDerivedStateFromProps.call(null, c.props, e.state);
	        null != v && (e.state = objectAssign({}, e.state, v));
	      }
	    } else if (e = g(c.props, d, h), null == e || null == e.render) {
	      a = e;
	      ta$1(a, g);
	      return;
	    }

	    e.props = c.props;
	    e.context = d;
	    e.updater = h;
	    h = e.state;
	    void 0 === h && (e.state = h = null);
	    if ("function" === typeof e.UNSAFE_componentWillMount || "function" === typeof e.componentWillMount) if ("function" === typeof e.componentWillMount && "function" !== typeof g.getDerivedStateFromProps && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && "function" !== typeof g.getDerivedStateFromProps && e.UNSAFE_componentWillMount(), f.length) {
	      h = f;
	      var r = k;
	      f = null;
	      k = !1;
	      if (r && 1 === h.length) e.state = h[0];else {
	        v = r ? h[0] : e.state;
	        var m = !0;

	        for (r = r ? 1 : 0; r < h.length; r++) {
	          var n = h[r];
	          n = "function" === typeof n ? n.call(e, v, c.props, d) : n;
	          null != n && (m ? (m = !1, v = objectAssign({}, v, n)) : objectAssign(v, n));
	        }

	        e.state = v;
	      }
	    } else f = null;
	    a = e.render();
	    ta$1(a, g);
	    c = void 0;

	    if ("function" === typeof e.getChildContext && (d = g.childContextTypes, "object" === typeof d)) {
	      c = e.getChildContext();

	      for (var w in c) w in d ? void 0 : t$2("108", I$2(g) || "Unknown", w);
	    }

	    c && (b = objectAssign({}, b, c));
	  }

	  for (; react.isValidElement(a);) {
	    var c = a,
	        g = c.type;
	    if ("function" !== typeof g) break;
	    d(c, g);
	  }

	  return {
	    child: a,
	    context: b
	  };
	}

	var Z$2 = function () {
	  function a(b, d) {
	    if (!(this instanceof a)) throw new TypeError("Cannot call a class as a function");
	    react.isValidElement(b) ? b.type !== A$1 ? b = [b] : (b = b.props.children, b = react.isValidElement(b) ? [b] : W$2(b)) : b = W$2(b);
	    this.stack = [{
	      type: null,
	      domNamespace: S$1.html,
	      children: b,
	      childIndex: 0,
	      context: pa$1,
	      footer: ""
	    }];
	    this.exhausted = !1;
	    this.currentSelectValue = null;
	    this.previousWasTextNode = !1;
	    this.makeStaticMarkup = d;
	    this.contextIndex = -1;
	    this.contextStack = [];
	    this.contextValueStack = [];
	  }

	  a.prototype.pushProvider = function (a) {
	    var b = ++this.contextIndex,
	        c = a.type._context,
	        g = c._currentValue;
	    this.contextStack[b] = c;
	    this.contextValueStack[b] = g;
	    c._currentValue = a.props.value;
	  };

	  a.prototype.popProvider = function () {
	    var a = this.contextIndex,
	        d = this.contextStack[a],
	        c = this.contextValueStack[a];
	    this.contextStack[a] = null;
	    this.contextValueStack[a] = null;
	    this.contextIndex--;
	    d._currentValue = c;
	  };

	  a.prototype.read = function (a) {
	    if (this.exhausted) return null;

	    for (var b = ""; b.length < a;) {
	      if (0 === this.stack.length) {
	        this.exhausted = !0;
	        break;
	      }

	      var c = this.stack[this.stack.length - 1];

	      if (c.childIndex >= c.children.length) {
	        var g = c.footer;
	        b += g;
	        "" !== g && (this.previousWasTextNode = !1);
	        this.stack.pop();
	        "select" === c.type ? this.currentSelectValue = null : null != c.type && null != c.type.type && c.type.type.$$typeof === E$2 && this.popProvider(c.type);
	      } else g = c.children[c.childIndex++], b += this.render(g, c.context, c.domNamespace);
	    }

	    return b;
	  };

	  a.prototype.render = function (a, d, c) {
	    if ("string" === typeof a || "number" === typeof a) {
	      c = "" + a;
	      if ("" === c) return "";
	      if (this.makeStaticMarkup) return R$1(c);
	      if (this.previousWasTextNode) return "\x3c!-- --\x3e" + R$1(c);
	      this.previousWasTextNode = !0;
	      return R$1(c);
	    }

	    d = ua$1(a, d);
	    a = d.child;
	    d = d.context;
	    if (null === a || !1 === a) return "";

	    if (!react.isValidElement(a)) {
	      if (null != a && null != a.$$typeof) {
	        var b = a.$$typeof;
	        b === y$1 ? t$2("257") : void 0;
	        t$2("258", b.toString());
	      }

	      a = W$2(a);
	      this.stack.push({
	        type: null,
	        domNamespace: c,
	        children: a,
	        childIndex: 0,
	        context: d,
	        footer: ""
	      });
	      return "";
	    }

	    b = a.type;
	    if ("string" === typeof b) return this.renderDOM(a, d, c);

	    switch (b) {
	      case B$1:
	      case G$2:
	      case C$2:
	      case A$1:
	        return a = W$2(a.props.children), this.stack.push({
	          type: null,
	          domNamespace: c,
	          children: a,
	          childIndex: 0,
	          context: d,
	          footer: ""
	        }), "";
	    }

	    if ("object" === typeof b && null !== b) switch (b.$$typeof) {
	      case H$2:
	        return a = W$2(b.render(a.props, a.ref)), this.stack.push({
	          type: null,
	          domNamespace: c,
	          children: a,
	          childIndex: 0,
	          context: d,
	          footer: ""
	        }), "";

	      case E$2:
	        return b = W$2(a.props.children), c = {
	          type: a,
	          domNamespace: c,
	          children: b,
	          childIndex: 0,
	          context: d,
	          footer: ""
	        }, this.pushProvider(a), this.stack.push(c), "";

	      case F$2:
	        return b = W$2(a.props.children(a.type._currentValue)), this.stack.push({
	          type: a,
	          domNamespace: c,
	          children: b,
	          childIndex: 0,
	          context: d,
	          footer: ""
	        }), "";
	    }
	    t$2("130", null == b ? b : typeof b, "");
	  };

	  a.prototype.renderDOM = function (a, d, c) {
	    var b = a.type.toLowerCase();
	    X$1.hasOwnProperty(b) || (na$1.test(b) ? void 0 : t$2("65", b), X$1[b] = !0);
	    var f = a.props;
	    if ("input" === b) f = objectAssign({
	      type: void 0
	    }, f, {
	      defaultChecked: void 0,
	      defaultValue: void 0,
	      value: null != f.value ? f.value : f.defaultValue,
	      checked: null != f.checked ? f.checked : f.defaultChecked
	    });else if ("textarea" === b) {
	      var k = f.value;

	      if (null == k) {
	        k = f.defaultValue;
	        var l = f.children;
	        null != l && (null != k ? t$2("92") : void 0, Array.isArray(l) && (1 >= l.length ? void 0 : t$2("93"), l = l[0]), k = "" + l);
	        null == k && (k = "");
	      }

	      f = objectAssign({}, f, {
	        value: void 0,
	        children: "" + k
	      });
	    } else if ("select" === b) this.currentSelectValue = null != f.value ? f.value : f.defaultValue, f = objectAssign({}, f, {
	      value: void 0
	    });else if ("option" === b) {
	      l = this.currentSelectValue;
	      var D = oa$1(f.children);

	      if (null != l) {
	        var z = null != f.value ? f.value + "" : D;
	        k = !1;
	        if (Array.isArray(l)) for (var h = 0; h < l.length; h++) {
	          if ("" + l[h] === z) {
	            k = !0;
	            break;
	          }
	        } else k = "" + l === z;
	        f = objectAssign({
	          selected: void 0,
	          children: void 0
	        }, f, {
	          selected: k,
	          children: D
	        });
	      }
	    }
	    if (k = f) ia$1[b] && (null != k.children || null != k.dangerouslySetInnerHTML ? t$2("137", b, "") : void 0), null != k.dangerouslySetInnerHTML && (null != k.children ? t$2("60") : void 0, "object" === typeof k.dangerouslySetInnerHTML && "__html" in k.dangerouslySetInnerHTML ? void 0 : t$2("61")), null != k.style && "object" !== typeof k.style ? t$2("62", "") : void 0;
	    k = f;
	    l = this.makeStaticMarkup;
	    D = 1 === this.stack.length;
	    z = "<" + a.type;

	    for (u in k) if (ra$1.call(k, u)) {
	      var e = k[u];

	      if (null != e) {
	        if ("style" === u) {
	          h = void 0;
	          var v = "",
	              r = "";

	          for (h in e) if (e.hasOwnProperty(h)) {
	            var m = 0 === h.indexOf("--"),
	                n = e[h];

	            if (null != n) {
	              var w = h;
	              if (Y$2.hasOwnProperty(w)) w = Y$2[w];else {
	                var za = w.replace(ka$1, "-$1").toLowerCase().replace(la$1, "-ms-");
	                w = Y$2[w] = za;
	              }
	              v += r + w + ":";
	              r = h;
	              m = null == n || "boolean" === typeof n || "" === n ? "" : m || "number" !== typeof n || 0 === n || V$2.hasOwnProperty(r) && V$2[r] ? ("" + n).trim() : n + "px";
	              v += m;
	              r = ";";
	            }
	          }

	          e = v || null;
	        }

	        h = null;

	        b: if (m = b, n = k, -1 === m.indexOf("-")) m = "string" === typeof n.is;else switch (m) {
	          case "annotation-xml":
	          case "color-profile":
	          case "font-face":
	          case "font-face-src":
	          case "font-face-uri":
	          case "font-face-format":
	          case "font-face-name":
	          case "missing-glyph":
	            m = !1;
	            break b;

	          default:
	            m = !0;
	        }

	        if (m) sa$1.hasOwnProperty(u) || (h = u, h = M$2(h) && null != e ? h + "=" + ('"' + R$1(e) + '"') : "");else {
	          m = u;
	          h = e;
	          e = O$2.hasOwnProperty(m) ? O$2[m] : null;
	          if (n = "style" !== m) n = null !== e ? 0 === e.type : !(2 < m.length) || "o" !== m[0] && "O" !== m[0] || "n" !== m[1] && "N" !== m[1] ? !1 : !0;
	          n || fa$1(m, h, e, !1) ? h = "" : null !== e ? (m = e.attributeName, e = e.type, h = 3 === e || 4 === e && !0 === h ? m + '=""' : m + "=" + ('"' + R$1(h) + '"')) : h = M$2(m) ? m + "=" + ('"' + R$1(h) + '"') : "";
	        }
	        h && (z += " " + h);
	      }
	    }

	    l || D && (z += ' data-reactroot=""');
	    var u = z;
	    k = "";
	    U$2.hasOwnProperty(b) ? u += "/>" : (u += ">", k = "</" + a.type + ">");

	    a: {
	      l = f.dangerouslySetInnerHTML;

	      if (null != l) {
	        if (null != l.__html) {
	          l = l.__html;
	          break a;
	        }
	      } else if (l = f.children, "string" === typeof l || "number" === typeof l) {
	        l = R$1(l);
	        break a;
	      }

	      l = null;
	    }

	    null != l ? (f = [], ma$1[b] && "\n" === l.charAt(0) && (u += "\n"), u += l) : f = W$2(f.children);
	    a = a.type;
	    c = null == c || "http://www.w3.org/1999/xhtml" === c ? T$2(a) : "http://www.w3.org/2000/svg" === c && "foreignObject" === a ? "http://www.w3.org/1999/xhtml" : c;
	    this.stack.push({
	      domNamespace: c,
	      type: b,
	      children: f,
	      childIndex: 0,
	      context: d,
	      footer: k
	    });
	    this.previousWasTextNode = !1;
	    return u;
	  };

	  return a;
	}();

	function va$1(a, b) {
	  if ("function" !== typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
	  a.prototype = Object.create(b && b.prototype, {
	    constructor: {
	      value: a,
	      enumerable: !1,
	      writable: !0,
	      configurable: !0
	    }
	  });
	  b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
	}

	var wa$1 = function (a) {
	  function b(d, c) {
	    if (!(this instanceof b)) throw new TypeError("Cannot call a class as a function");
	    var g = a.call(this, {});
	    if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    g = !g || "object" !== typeof g && "function" !== typeof g ? this : g;
	    g.partialRenderer = new Z$2(d, c);
	    return g;
	  }

	  va$1(b, a);

	  b.prototype._read = function (a) {
	    try {
	      this.push(this.partialRenderer.read(a));
	    } catch (c) {
	      this.emit("error", c);
	    }
	  };

	  return b;
	}(aa$1.Readable),
	    xa$1 = {
	  renderToString: function (a) {
	    return new Z$2(a, !1).read(Infinity);
	  },
	  renderToStaticMarkup: function (a) {
	    return new Z$2(a, !0).read(Infinity);
	  },
	  renderToNodeStream: function (a) {
	    return new wa$1(a, !1);
	  },
	  renderToStaticNodeStream: function (a) {
	    return new wa$1(a, !0);
	  },
	  version: "16.5.2"
	},
	    ya$1 = {
	  default: xa$1
	},
	    Aa$1 = ya$1 && xa$1 || ya$1;

	var reactDomServer_node_production_min = Aa$1.default || Aa$1;

	var server_node = createCommonjsModule(function (module) {

	{
	  module.exports = reactDomServer_node_production_min;
	}
	});

	var server = server_node;

	var reactDomFactories = createCommonjsModule(function (module, exports) {
	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (f) {
	  {
	    module.exports = f(react);
	    /* global define */
	  }
	})(function (React) {
	  /**
	   * Create a factory that creates HTML tag elements.
	   */
	  function createDOMFactory(type) {
	    var factory = React.createElement.bind(null, type); // Expose the type on the factory and the prototype so that it can be
	    // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	    // This should not be named `constructor` since this may not be the function
	    // that created the element, and it may not even be a constructor.

	    factory.type = type;
	    return factory;
	  }
	  /**
	   * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	   */

	  var ReactDOMFactories = {
	    a: createDOMFactory('a'),
	    abbr: createDOMFactory('abbr'),
	    address: createDOMFactory('address'),
	    area: createDOMFactory('area'),
	    article: createDOMFactory('article'),
	    aside: createDOMFactory('aside'),
	    audio: createDOMFactory('audio'),
	    b: createDOMFactory('b'),
	    base: createDOMFactory('base'),
	    bdi: createDOMFactory('bdi'),
	    bdo: createDOMFactory('bdo'),
	    big: createDOMFactory('big'),
	    blockquote: createDOMFactory('blockquote'),
	    body: createDOMFactory('body'),
	    br: createDOMFactory('br'),
	    button: createDOMFactory('button'),
	    canvas: createDOMFactory('canvas'),
	    caption: createDOMFactory('caption'),
	    cite: createDOMFactory('cite'),
	    code: createDOMFactory('code'),
	    col: createDOMFactory('col'),
	    colgroup: createDOMFactory('colgroup'),
	    data: createDOMFactory('data'),
	    datalist: createDOMFactory('datalist'),
	    dd: createDOMFactory('dd'),
	    del: createDOMFactory('del'),
	    details: createDOMFactory('details'),
	    dfn: createDOMFactory('dfn'),
	    dialog: createDOMFactory('dialog'),
	    div: createDOMFactory('div'),
	    dl: createDOMFactory('dl'),
	    dt: createDOMFactory('dt'),
	    em: createDOMFactory('em'),
	    embed: createDOMFactory('embed'),
	    fieldset: createDOMFactory('fieldset'),
	    figcaption: createDOMFactory('figcaption'),
	    figure: createDOMFactory('figure'),
	    footer: createDOMFactory('footer'),
	    form: createDOMFactory('form'),
	    h1: createDOMFactory('h1'),
	    h2: createDOMFactory('h2'),
	    h3: createDOMFactory('h3'),
	    h4: createDOMFactory('h4'),
	    h5: createDOMFactory('h5'),
	    h6: createDOMFactory('h6'),
	    head: createDOMFactory('head'),
	    header: createDOMFactory('header'),
	    hgroup: createDOMFactory('hgroup'),
	    hr: createDOMFactory('hr'),
	    html: createDOMFactory('html'),
	    i: createDOMFactory('i'),
	    iframe: createDOMFactory('iframe'),
	    img: createDOMFactory('img'),
	    input: createDOMFactory('input'),
	    ins: createDOMFactory('ins'),
	    kbd: createDOMFactory('kbd'),
	    keygen: createDOMFactory('keygen'),
	    label: createDOMFactory('label'),
	    legend: createDOMFactory('legend'),
	    li: createDOMFactory('li'),
	    link: createDOMFactory('link'),
	    main: createDOMFactory('main'),
	    map: createDOMFactory('map'),
	    mark: createDOMFactory('mark'),
	    menu: createDOMFactory('menu'),
	    menuitem: createDOMFactory('menuitem'),
	    meta: createDOMFactory('meta'),
	    meter: createDOMFactory('meter'),
	    nav: createDOMFactory('nav'),
	    noscript: createDOMFactory('noscript'),
	    object: createDOMFactory('object'),
	    ol: createDOMFactory('ol'),
	    optgroup: createDOMFactory('optgroup'),
	    option: createDOMFactory('option'),
	    output: createDOMFactory('output'),
	    p: createDOMFactory('p'),
	    param: createDOMFactory('param'),
	    picture: createDOMFactory('picture'),
	    pre: createDOMFactory('pre'),
	    progress: createDOMFactory('progress'),
	    q: createDOMFactory('q'),
	    rp: createDOMFactory('rp'),
	    rt: createDOMFactory('rt'),
	    ruby: createDOMFactory('ruby'),
	    s: createDOMFactory('s'),
	    samp: createDOMFactory('samp'),
	    script: createDOMFactory('script'),
	    section: createDOMFactory('section'),
	    select: createDOMFactory('select'),
	    small: createDOMFactory('small'),
	    source: createDOMFactory('source'),
	    span: createDOMFactory('span'),
	    strong: createDOMFactory('strong'),
	    style: createDOMFactory('style'),
	    sub: createDOMFactory('sub'),
	    summary: createDOMFactory('summary'),
	    sup: createDOMFactory('sup'),
	    table: createDOMFactory('table'),
	    tbody: createDOMFactory('tbody'),
	    td: createDOMFactory('td'),
	    textarea: createDOMFactory('textarea'),
	    tfoot: createDOMFactory('tfoot'),
	    th: createDOMFactory('th'),
	    thead: createDOMFactory('thead'),
	    time: createDOMFactory('time'),
	    title: createDOMFactory('title'),
	    tr: createDOMFactory('tr'),
	    track: createDOMFactory('track'),
	    u: createDOMFactory('u'),
	    ul: createDOMFactory('ul'),
	    var: createDOMFactory('var'),
	    video: createDOMFactory('video'),
	    wbr: createDOMFactory('wbr'),
	    // SVG
	    circle: createDOMFactory('circle'),
	    clipPath: createDOMFactory('clipPath'),
	    defs: createDOMFactory('defs'),
	    ellipse: createDOMFactory('ellipse'),
	    g: createDOMFactory('g'),
	    image: createDOMFactory('image'),
	    line: createDOMFactory('line'),
	    linearGradient: createDOMFactory('linearGradient'),
	    mask: createDOMFactory('mask'),
	    path: createDOMFactory('path'),
	    pattern: createDOMFactory('pattern'),
	    polygon: createDOMFactory('polygon'),
	    polyline: createDOMFactory('polyline'),
	    radialGradient: createDOMFactory('radialGradient'),
	    rect: createDOMFactory('rect'),
	    stop: createDOMFactory('stop'),
	    svg: createDOMFactory('svg'),
	    text: createDOMFactory('text'),
	    tspan: createDOMFactory('tspan')
	  }; // due to wrapper and conditionals at the top, this will either become
	  // `module.exports ReactDOMFactories` if that is available,
	  // otherwise it will be defined via `define(['react'], ReactDOMFactories)`
	  // if that is available,
	  // otherwise it will be defined as global variable.

	  return ReactDOMFactories;
	});
	});

	var uaParser = createCommonjsModule(function (module, exports) {
	/*!
	 * UAParser.js v0.7.18
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 or MIT
	 */
	(function (window, undefined) {
	  // Constants
	  /////////////

	  var LIBVERSION = '0.7.18',
	      EMPTY = '',
	      UNKNOWN = '?',
	      FUNC_TYPE = 'function',
	      UNDEF_TYPE = 'undefined',
	      OBJ_TYPE = 'object',
	      STR_TYPE = 'string',
	      MAJOR = 'major',
	      // deprecated
	  MODEL = 'model',
	      NAME = 'name',
	      TYPE = 'type',
	      VENDOR = 'vendor',
	      VERSION = 'version',
	      ARCHITECTURE = 'architecture',
	      CONSOLE = 'console',
	      MOBILE = 'mobile',
	      TABLET = 'tablet',
	      SMARTTV = 'smarttv',
	      WEARABLE = 'wearable',
	      EMBEDDED = 'embedded'; ///////////
	  // Helper
	  //////////

	  var util = {
	    extend: function (regexes, extensions) {
	      var margedRegexes = {};

	      for (var i in regexes) {
	        if (extensions[i] && extensions[i].length % 2 === 0) {
	          margedRegexes[i] = extensions[i].concat(regexes[i]);
	        } else {
	          margedRegexes[i] = regexes[i];
	        }
	      }

	      return margedRegexes;
	    },
	    has: function (str1, str2) {
	      if (typeof str1 === "string") {
	        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	      } else {
	        return false;
	      }
	    },
	    lowerize: function (str) {
	      return str.toLowerCase();
	    },
	    major: function (version) {
	      return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, '').split(".")[0] : undefined;
	    },
	    trim: function (str) {
	      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	    }
	  }; ///////////////
	  // Map helper
	  //////////////

	  var mapper = {
	    rgx: function (ua, arrays) {
	      //var result = {},
	      var i = 0,
	          j,
	          k,
	          p,
	          q,
	          matches,
	          match; //, args = arguments;

	      /*// construct object barebones
	      for (p = 0; p < args[1].length; p++) {
	          q = args[1][p];
	          result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
	      }*/
	      // loop through all regexes maps

	      while (i < arrays.length && !matches) {
	        var regex = arrays[i],
	            // even sequence (0,2,4,..)
	        props = arrays[i + 1]; // odd sequence (1,3,5,..)

	        j = k = 0; // try matching uastring with regexes

	        while (j < regex.length && !matches) {
	          matches = regex[j++].exec(ua);

	          if (!!matches) {
	            for (p = 0; p < props.length; p++) {
	              match = matches[++k];
	              q = props[p]; // check if given property is actually array

	              if (typeof q === OBJ_TYPE && q.length > 0) {
	                if (q.length == 2) {
	                  if (typeof q[1] == FUNC_TYPE) {
	                    // assign modified match
	                    this[q[0]] = q[1].call(this, match);
	                  } else {
	                    // assign given value, ignore regex match
	                    this[q[0]] = q[1];
	                  }
	                } else if (q.length == 3) {
	                  // check whether function or regex
	                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                    // call function (usually string mapper)
	                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                  } else {
	                    // sanitize match using given regex
	                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                  }
	                } else if (q.length == 4) {
	                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                }
	              } else {
	                this[q] = match ? match : undefined;
	              }
	            }
	          }
	        }

	        i += 2;
	      } // console.log(this);
	      //return this;

	    },
	    str: function (str, map) {
	      for (var i in map) {
	        // check if array
	        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	          for (var j = 0; j < map[i].length; j++) {
	            if (util.has(map[i][j], str)) {
	              return i === UNKNOWN ? undefined : i;
	            }
	          }
	        } else if (util.has(map[i], str)) {
	          return i === UNKNOWN ? undefined : i;
	        }
	      }

	      return str;
	    }
	  }; ///////////////
	  // String map
	  //////////////

	  var maps = {
	    browser: {
	      oldsafari: {
	        version: {
	          '1.0': '/8',
	          '1.2': '/1',
	          '1.3': '/3',
	          '2.0': '/412',
	          '2.0.2': '/416',
	          '2.0.3': '/417',
	          '2.0.4': '/419',
	          '?': '/'
	        }
	      }
	    },
	    device: {
	      amazon: {
	        model: {
	          'Fire Phone': ['SD', 'KF']
	        }
	      },
	      sprint: {
	        model: {
	          'Evo Shift 4G': '7373KT'
	        },
	        vendor: {
	          'HTC': 'APA',
	          'Sprint': 'Sprint'
	        }
	      }
	    },
	    os: {
	      windows: {
	        version: {
	          'ME': '4.90',
	          'NT 3.11': 'NT3.51',
	          'NT 4.0': 'NT4.0',
	          '2000': 'NT 5.0',
	          'XP': ['NT 5.1', 'NT 5.2'],
	          'Vista': 'NT 6.0',
	          '7': 'NT 6.1',
	          '8': 'NT 6.2',
	          '8.1': 'NT 6.3',
	          '10': ['NT 6.4', 'NT 10.0'],
	          'RT': 'ARM'
	        }
	      }
	    }
	  }; //////////////
	  // Regex map
	  /////////////

	  var regexes = {
	    browser: [[// Presto based
	    /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
	    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
	    /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
	    /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
	    ], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
	    ], [[NAME, 'Opera Mini'], VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
	    ], [[NAME, 'Opera'], VERSION], [// Mixed
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, // Lunascape/Maxthon/Netfront/Jasmine/Blazer
	    // Trident based
	    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser/Baidu
	    /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer
	    // Webkit/KHTML based
	    /(rekonq)\/([\w\.]*)/i, // Rekonq
	    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
	    ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
	    ], [[NAME, 'IE'], VERSION], [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i // Microsoft Edge
	    ], [[NAME, 'Edge'], VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
	    ], [[NAME, 'Yandex'], VERSION], [/(puffin)\/([\w\.]+)/i // Puffin
	    ], [[NAME, 'Puffin'], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
	    ], [[NAME, 'UCBrowser'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	    ], [[NAME, /_/g, ' '], VERSION], [/(micromessenger)\/([\w\.]+)/i // WeChat
	    ], [[NAME, 'WeChat'], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
	    ], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
	    ], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
	    ], [NAME, VERSION], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
	    ], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
	    ], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
	    ], [NAME], [/(LBBROWSER)/i // LieBao Browser
	    ], [NAME], [/xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
	    ], [VERSION, [NAME, 'MIUI Browser']], [/;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
	    ], [VERSION, [NAME, 'Facebook']], [/headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
	    ], [VERSION, [NAME, 'Chrome Headless']], [/\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
	    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [// Oculus / Samsung Browser
	    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
	    ], [VERSION, [NAME, 'Android Browser']], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
	    ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
	    ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	    ], [[NAME, 'Chrome'], VERSION], [/(coast)\/([\w\.]+)/i // Opera Coast
	    ], [[NAME, 'Opera Coast'], VERSION], [/fxios\/([\w\.-]+)/i // Firefox for iOS
	    ], [VERSION, [NAME, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
	    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
	    ], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
	    ], [[NAME, 'GSA'], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	    ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
	    /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [// Gecko based
	    /(navigator|netscape)\/([\w\.-]+)/i // Netscape
	    ], [[NAME, 'Netscape'], VERSION], [/(swiftfox)/i, // Swiftfox
	    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla
	    // Other
	    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	    /(links)\s\(([\w\.]+)/i, // Links
	    /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
	    /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
	    /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
	    ], [NAME, VERSION]
	    /* /////////////////////
	    // Media players BEGIN
	    ////////////////////////
	     , [
	     /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	    /(coremedia) v((\d+)[\w\._]+)/i
	    ], [NAME, VERSION], [
	     /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	    ], [NAME, VERSION], [
	     /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	    ], [NAME, VERSION], [
	     /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                        // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                        // NSPlayer/PSP-InternetRadioPlayer/Videos
	    /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	    /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	    /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	    ], [NAME, VERSION], [
	    /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	    ], [NAME, VERSION], [
	     /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	    ], [[NAME, 'Flip Player'], VERSION], [
	     /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                        // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	    ], [NAME], [
	     /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                        // Gstreamer
	    ], [NAME, VERSION], [
	     /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	    /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                        // Java/urllib/requests/wget/cURL
	    /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	    ], [NAME, VERSION], [
	     /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	    ], [[NAME, /_/g, ' '], VERSION], [
	     /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                        // MPlayer SVN
	    ], [NAME, VERSION], [
	     /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	    ], [NAME, VERSION], [
	     /(mplayer)/i,                                                       // MPlayer (no other info)
	    /(yourmuze)/i,                                                      // YourMuze
	    /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	    ], [NAME], [
	     /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	    ], [NAME, VERSION], [
	     /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	    ], [NAME, VERSION], [
	     /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	    ], [NAME, VERSION], [
	     /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	    /(winamp)\s((\d+)[\w\.-]+)/i,
	    /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	    ], [NAME, VERSION], [
	     /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                        // inlight radio
	    ], [NAME], [
	     /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                        // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                        // SoundTap/Totem/Stagefright/Streamium
	    ], [NAME, VERSION], [
	     /(smp)((\d+)[\d\.]+)/i                                              // SMP
	    ], [NAME, VERSION], [
	     /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	    /(vlc)\/((\d+)[\w\.-]+)/i,
	    /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	    /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	    /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	    ], [NAME, VERSION], [
	     /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	    /(windows-media-player)\/((\d+)[\w\.-]+)/i
	    ], [[NAME, /-/g, ' '], VERSION], [
	     /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                        // Windows Media Server
	    ], [VERSION, [NAME, 'Windows']], [
	     /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	    ], [NAME, VERSION], [
	     /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	    /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	    ], [[NAME, 'rad.io'], VERSION]
	     //////////////////////
	    // Media players END
	    ////////////////////*/
	    ],
	    cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
	    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	    ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
	    ], [[ARCHITECTURE, 'ia32']], [// PocketPC mistakenly identified as PowerPC
	    /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
	    ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
	    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	    ], [[ARCHITECTURE, util.lowerize]]],
	    device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
	    ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
	    ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
	    /(hp).+(touchpad)/i, // HP TouchPad
	    /(hp).+(tablet)/i, // HP Tablet
	    /(kindle)\/([\w\.]+)/i, // Kindle
	    /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
	    /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
	    ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
	    ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
	    ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
	    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	    /(hp)\s([\w\s]+\w)/i, // HP iPAQ
	    /(asus)-?(\w+)/i // Asus
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
	    ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [// Asus Tablets
	    /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
	    /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
	    /(nintendo)\s([wids3u]+)/i // Nintendo
	    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
	    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i // Playstation
	    ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
	    ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
	    /(zte)-(\w*)/i, // ZTE
	    /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
	    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
	    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i // Huawei
	    ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
	    ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	    ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [// Motorola
	    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
	    ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
	    ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
	    /smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/sie-(\w*)/i // Siemens
	    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
	    /(nokia)[\s_-]?([\w-]*)/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
	    ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
	    ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
	    ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
	    ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
	    /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
	    ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
	    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
	    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i // Google Chromecast
	    ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [/android.+;\s(glass)\s\d/i // Google Glass
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+;\s(pixel c)\s/i // Google Pixel C
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [/android.+;\s(pixel xl|pixel)\s/i // Google Pixel
	    ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [/android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
	    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
	    /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, // Xiaomi Mi
	    /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
	    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
	    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i // Meizu Tablet
	    ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [/android.+a000(1)\s+build/i, // OnePlus
	    /android.+oneplus\s(a\d{4})\s+build/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
	    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
	    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
	    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
	    ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
	    ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
	    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
	    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
	    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
	    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
	    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
	    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [// Voice Xtreme Phones
	    /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
	    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
	    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
	    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
	    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
	    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
	    ], [VENDOR, MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
	    /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
	    ], [[TYPE, util.lowerize], VENDOR, MODEL], [/(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
	    ], [MODEL, [VENDOR, 'Generic']]
	    /*//////////////////////////
	        // TODO: move to string map
	        ////////////////////////////
	         /(C6603)/i                                                          // Sony Xperia Z C6603
	        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	        /(C6903)/i                                                          // Sony Xperia Z 1
	        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	         /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	         /(T3C)/i                                                            // Advan Vandroid T3C
	        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
	         /(V972M)/i                                                          // ZTE V972M
	        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	         /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	         /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
	         /////////////
	        // END TODO
	        ///////////*/
	    ],
	    engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
	    ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
	    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
	    /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
	    ], [NAME, VERSION], [/rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
	    ], [VERSION, NAME]],
	    os: [[// Windows based
	    /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
	    ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
	    /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
	    /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [// Mobile/Embedded OS
	    /\((bb)(10);/i // BlackBerry 10
	    ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
	    /(tizen)[\/\s]([\w\.]+)/i, // Tizen
	    /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	    /linux;.+(sailfish);/i // Sailfish OS
	    ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
	    ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
	    ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
	    ], [[NAME, 'Firefox OS'], VERSION], [// Console
	    /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation
	    // GNU/Linux based
	    /(mint)[\/\s\(]?(\w*)/i, // Mint
	    /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
	    /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	    /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
	    /(gnu)\s?([\w\.]*)/i // GNU
	    ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
	    ], [[NAME, 'Chromium OS'], VERSION], [// Solaris
	    /(sunos)\s?([\w\.\d]*)/i // Solaris
	    ], [[NAME, 'Solaris'], VERSION], [// BSD based
	    /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	    ], [NAME, VERSION], [/(haiku)\s(\w+)/i // Haiku
	    ], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
	    ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
	    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [// Other
	    /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
	    /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
	    /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	    /(unix)\s?([\w\.]*)/i // UNIX
	    ], [NAME, VERSION]]
	  }; /////////////////
	  // Constructor
	  ////////////////

	  /*
	  var Browser = function (name, version) {
	      this[NAME] = name;
	      this[VERSION] = version;
	  };
	  var CPU = function (arch) {
	      this[ARCHITECTURE] = arch;
	  };
	  var Device = function (vendor, model, type) {
	      this[VENDOR] = vendor;
	      this[MODEL] = model;
	      this[TYPE] = type;
	  };
	  var Engine = Browser;
	  var OS = Browser;
	  */

	  var UAParser = function (uastring, extensions) {
	    if (typeof uastring === 'object') {
	      extensions = uastring;
	      uastring = undefined;
	    }

	    if (!(this instanceof UAParser)) {
	      return new UAParser(uastring, extensions).getResult();
	    }

	    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes; //var browser = new Browser();
	    //var cpu = new CPU();
	    //var device = new Device();
	    //var engine = new Engine();
	    //var os = new OS();

	    this.getBrowser = function () {
	      var browser = {
	        name: undefined,
	        version: undefined
	      };
	      mapper.rgx.call(browser, ua, rgxmap.browser);
	      browser.major = util.major(browser.version); // deprecated

	      return browser;
	    };

	    this.getCPU = function () {
	      var cpu = {
	        architecture: undefined
	      };
	      mapper.rgx.call(cpu, ua, rgxmap.cpu);
	      return cpu;
	    };

	    this.getDevice = function () {
	      var device = {
	        vendor: undefined,
	        model: undefined,
	        type: undefined
	      };
	      mapper.rgx.call(device, ua, rgxmap.device);
	      return device;
	    };

	    this.getEngine = function () {
	      var engine = {
	        name: undefined,
	        version: undefined
	      };
	      mapper.rgx.call(engine, ua, rgxmap.engine);
	      return engine;
	    };

	    this.getOS = function () {
	      var os = {
	        name: undefined,
	        version: undefined
	      };
	      mapper.rgx.call(os, ua, rgxmap.os);
	      return os;
	    };

	    this.getResult = function () {
	      return {
	        ua: this.getUA(),
	        browser: this.getBrowser(),
	        engine: this.getEngine(),
	        os: this.getOS(),
	        device: this.getDevice(),
	        cpu: this.getCPU()
	      };
	    };

	    this.getUA = function () {
	      return ua;
	    };

	    this.setUA = function (uastring) {
	      ua = uastring; //browser = new Browser();
	      //cpu = new CPU();
	      //device = new Device();
	      //engine = new Engine();
	      //os = new OS();

	      return this;
	    };

	    return this;
	  };

	  UAParser.VERSION = LIBVERSION;
	  UAParser.BROWSER = {
	    NAME: NAME,
	    MAJOR: MAJOR,
	    // deprecated
	    VERSION: VERSION
	  };
	  UAParser.CPU = {
	    ARCHITECTURE: ARCHITECTURE
	  };
	  UAParser.DEVICE = {
	    MODEL: MODEL,
	    VENDOR: VENDOR,
	    TYPE: TYPE,
	    CONSOLE: CONSOLE,
	    MOBILE: MOBILE,
	    SMARTTV: SMARTTV,
	    TABLET: TABLET,
	    WEARABLE: WEARABLE,
	    EMBEDDED: EMBEDDED
	  };
	  UAParser.ENGINE = {
	    NAME: NAME,
	    VERSION: VERSION
	  };
	  UAParser.OS = {
	    NAME: NAME,
	    VERSION: VERSION
	  }; //UAParser.Utils = util;
	  ///////////
	  // Export
	  //////////
	  // check js environment

	  {
	    // nodejs env
	    if (module.exports) {
	      exports = module.exports = UAParser;
	    } // TODO: test!!!!!!!!

	    /*
	    if (require && require.main === module && process) {
	        // cli
	        var jsonize = function (arr) {
	            var res = [];
	            for (var i in arr) {
	                res.push(new UAParser(arr[i]).getResult());
	            }
	            process.stdout.write(JSON.stringify(res, null, 2) + '\n');
	        };
	        if (process.stdin.isTTY) {
	            // via args
	            jsonize(process.argv.slice(2));
	        } else {
	            // via pipe
	            var str = '';
	            process.stdin.on('readable', function() {
	                var read = process.stdin.read();
	                if (read !== null) {
	                    str += read;
	                }
	            });
	            process.stdin.on('end', function () {
	                jsonize(str.replace(/\n$/, '').split('\n'));
	            });
	        }
	    }
	    */


	    exports.UAParser = UAParser;
	  } // jQuery/Zepto specific (optional)
	  // Note:
	  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	  //   and we should catch that.


	  var $ = window && (window.jQuery || window.Zepto);

	  if (typeof $ !== UNDEF_TYPE) {
	    var parser = new UAParser();
	    $.ua = parser.getResult();

	    $.ua.get = function () {
	      return parser.getUA();
	    };

	    $.ua.set = function (uastring) {
	      parser.setUA(uastring);
	      var result = parser.getResult();

	      for (var prop in result) {
	        $.ua[prop] = result[prop];
	      }
	    };
	  }
	})(typeof window === 'object' ? window : commonjsGlobal);
	});
	var uaParser_1 = uaParser.UAParser;

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

	function displayComponent(options = {}) {
	  const {
	    rjx = {},
	    props
	  } = options;
	  const propsToCompare = rjx.comparisonprops;
	  const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map(comp => {
	    const compares = {};

	    if (Array.isArray(comp.left)) {
	      compares.left = comp.left;
	    }

	    if (Array.isArray(comp.right)) {
	      compares.right = comp.right;
	    }

	    const propcompares = traverse(compares, props || rjx.props);
	    const opscompares = Object.assign({}, comp, propcompares); // console.debug({ opscompares, compares, renderedCompProps });

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
	      default:
	        //'exists'
	        return opscompares.left !== undefined && opscompares.left !== null;
	    } // }
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

	function getAdvancedBinding() {
	  if (typeof window === 'undefined') {
	    var window = this && this.window ? this.window : global$1.window || {};
	    if (!window.navigator) return false;
	  }

	  try {
	    if (window && window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
	      // console.log('window.navigator.userAgent',window.navigator.userAgent)
	      if (window.navigator.userAgent.indexOf('Trident') !== -1) {
	        return false;
	      }

	      const uastring = window.navigator.userAgent;
	      const parser = new uaParser();
	      parser.setUA(uastring);
	      const parseUserAgent = parser.getResult(); // console.log({ parseUserAgent, });

	      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView') && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
	        return false;
	      }

	      if (parseUserAgent.browser.name === 'Android Browser') {
	        return false;
	      }
	    }
	  } catch (e) {
	    console.error(e); // console.warn('could not detect browser support', e);

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

	function traverse(paths = {}, data = {}) {
	  let keys = Object.keys(paths);
	  if (!keys.length) return paths;
	  return keys.reduce((result, key) => {
	    if (typeof paths[key] === 'string') result[key] = data[paths[key]];else if (Array.isArray(paths[key])) {
	      let _path = Object.assign([], paths[key]);

	      let value = data;

	      while (_path.length && value && typeof value === 'object') {
	        let prop = _path.shift();

	        value = value[prop];
	      }

	      result[key] = _path.length ? undefined : value;
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

	function validateRJX(rjx = {}, returnAllErrors = false) {
	  const dynamicPropsNames = ['asyncprops', 'resourceprops', 'windowprops', 'thisprops'];
	  const evalPropNames = ['__dangerouslyEvalProps', '__dangerouslyBindEvalProps'];
	  const validKeys = ['component', 'props', 'children', '__dangerouslyInsertComponents', '__functionProps', '__windowComponents', '__windowComponentProps', 'comparisonprops', 'comparisonorprops', 'passprops'].concat(dynamicPropsNames, evalPropNames);
	  let errors = [];

	  if (!rjx.component) {
	    errors.push(SyntaxError('[0001] Missing React Component'));
	  }

	  if (rjx.props) {
	    if (typeof rjx.props !== 'object' || Array.isArray(rjx.props)) {
	      errors.push(TypeError('[0002] ' + rjx.component + ': props must be an Object / valid React props'));
	    }

	    if (rjx.props.children && (typeof rjx.props.children !== 'string' || !Array.isArray(rjx.props.children))) {
	      errors.push(TypeError('[0003] ' + rjx.component + ': props.children must be an array of RJX JSON objects or a string'));
	    }

	    if (rjx.props._children && (typeof rjx.props._children !== 'string' || !Array.isArray(rjx.props._children))) {
	      errors.push(TypeError('[0004] ' + rjx.component + ': props._children must be an array of RJX JSON objects or a string'));
	    }
	  }

	  if (rjx.children) {
	    if (typeof rjx.children !== 'string' && !Array.isArray(rjx.children)) {
	      errors.push(TypeError('[0005] ' + rjx.component + ': children must be an array of RJX JSON objects or a string'));
	    }

	    if (Array.isArray(rjx.children)) {
	      const childrenErrors = rjx.children.filter(c => typeof c === 'object').map(c => validateRJX(c, returnAllErrors));
	      errors = errors.concat(...childrenErrors);
	    }
	  }

	  dynamicPropsNames.forEach(dynamicprop => {
	    const rjxDynamicProps = rjx[dynamicprop];

	    if (rjxDynamicProps) {
	      // if (dynamicprop === 'thisprops') {
	      //   console.log({ dynamicprop, rjxDynamicProps });
	      // }
	      if (typeof rjxDynamicProps !== 'object') {
	        errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
	      }

	      Object.keys(rjxDynamicProps).forEach(resolvedDynamicProp => {
	        if (!Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
	          errors.push(TypeError(`[0007] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
	        }

	        if (Array.isArray(rjxDynamicProps[resolvedDynamicProp])) {
	          const allStringArray = rjxDynamicProps[resolvedDynamicProp].filter(propArrayItem => typeof propArrayItem === 'string');

	          if (allStringArray.length !== rjxDynamicProps[resolvedDynamicProp].length) {
	            errors.push(TypeError(`[0008] rjx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
	          }
	        }
	      });
	    }
	  });
	  const evalProps = rjx.__dangerouslyEvalProps;
	  const boundEvalProps = rjx.__dangerouslyBindEvalProps;

	  if (evalProps || boundEvalProps) {
	    if (evalProps && typeof evalProps !== 'object' || boundEvalProps && typeof boundEvalProps !== 'object') {
	      errors.push(TypeError('[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript'));
	    }

	    evalPropNames.filter(evalProp => rjx[evalProp]).forEach(eProps => {
	      const evProp = rjx[eProps];
	      const scopedEval = eval;
	      Object.keys(evProp).forEach(propToEval => {
	        if (typeof evProp[propToEval] !== 'string') {
	          errors.push(TypeError(`[0010] rjx.${eProps}.${evProp} must be a string`));
	        }

	        try {
	          // console.log({ eProps });
	          if (eProps === '__dangerouslyBindEvalProps') {
	            const funcToBind = scopedEval(`(${evProp[propToEval]})`);
	            funcToBind.call({
	              bounded: true
	            });
	          } else {
	            scopedEval(evProp[propToEval]);
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
	        validateRJX(rjx.__dangerouslyInsertComponents[insertedComponents]);
	      } catch (e) {
	        errors.push(TypeError(`[0011] rjx.__dangerouslyInsertComponents.${insertedComponents} must be a valid RJX JSON Object: ${e.toString()}`));
	      }
	    });
	  }

	  if (rjx.__functionProps) {
	    if (typeof rjx.__functionProps !== 'object') {
	      errors.push(TypeError('[0012] rjx.__functionProps  must be an object'));
	    } else {
	      Object.keys(rjx.__functionProps).forEach(fProp => {
	        if (rjx.__functionProps[fProp] && (typeof rjx.__functionProps[fProp] !== 'string' || rjx.__functionProps[fProp].indexOf('func:') === -1)) {
	          errors.push(ReferenceError(`[0013] rjx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
	        }
	      });
	    }
	  }

	  if (rjx.__windowComponentProps && (typeof rjx.__windowComponentProps !== 'object' || Array.isArray(rjx.__windowComponentProps))) {
	    errors.push(TypeError('[0013] rjx.__windowComponentProps  must be an object'));
	  }

	  if (rjx.__windowComponents) {
	    if (typeof rjx.__windowComponents !== 'object') {
	      errors.push(TypeError('[0014] rjx.__windowComponents must be an object'));
	    }

	    Object.keys(rjx.__windowComponents).forEach(cProp => {
	      if (typeof rjx.__windowComponents[cProp] !== 'string' || rjx.__windowComponents[cProp].indexOf('func:') === -1) {
	        errors.push(ReferenceError(`[0015] rjx.__windowComponents.${cProp} must reference a window element on window.__rjx_custom_elements (i.e. func:window.__rjx_custom_elements.bootstrapModal)`));
	      }
	    });
	  }

	  if (typeof rjx.comparisonorprops !== 'undefined' && typeof rjx.comparisonorprops !== 'boolean') {
	    errors.push(TypeError('[0016] rjx.comparisonorprops  must be boolean'));
	  }

	  if (rjx.comparisonprops) {
	    if (!Array.isArray(rjx.comparisonprops)) {
	      errors.push(TypeError('[0017] rjx.comparisonprops  must be an array or comparisons'));
	    } else {
	      rjx.comparisonprops.forEach(c => {
	        if (typeof c !== 'object') {
	          errors.push(TypeError('[0018] rjx.comparisonprops  must be an array or comparisons objects'));
	        } else if (typeof c.left === 'undefined') {
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
	    throw errors[0];
	  }

	  return invalidKeys.length ? `Warning: Invalid Keys [${invalidKeys.join()}]` : true;
	}
	/**
	 * validates simple RJX Syntax {[component]:{props,children}}
	 * @param {Object} simpleRJX - Any valid simple RJX Syntax
	 * @return {Boolean} returns true if simpleRJX is valid
	 */

	function validSimpleRJXSyntax(simpleRJX = {}) {
	  if (Object.keys(simpleRJX).length !== 1 && !simpleRJX.component) {
	    return false;
	  } else {
	    const componentName = Object.keys(simpleRJX)[0];
	    return Object.keys(simpleRJX).length === 1 && !simpleRJX[componentName].component && typeof simpleRJX[componentName] === 'object' ? true : false;
	  }
	}
	/**
	 * Transforms SimpleRJX to Valid RJX JSON {[component]:{props,children}} => {component,props,children}
	 * @param {Object} simpleRJX JSON Object 
	 * @return {Object} - returns a valid RJX JSON Object from a simple RJX JSON Object
	 */

	function simpleRJXSyntax(simpleRJX = {}) {
	  const component = Object.keys(simpleRJX)[0];

	  try {
	    return Object.assign({}, {
	      component
	    }, simpleRJX[component], {
	      children: simpleRJX[component].children && Array.isArray(simpleRJX[component].children) ? simpleRJX[component].children.map(simpleRJXSyntax) : simpleRJX[component].children
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

	function getSimplifiedRJX(rjx = {}) {
	  try {
	    if (!rjx.component) return rjx; //already simple

	    const componentName = rjx.component;
	    rjx.children = Array.isArray(rjx.children) ? rjx.children.filter(child => child) //remove empty children
	    .map(getSimplifiedRJX) : rjx.children;
	    delete rjx.component;
	    return {
	      [componentName]: rjx
	    };
	  } catch (e) {
	    throw e;
	  }
	}

	var rjxUtils = /*#__PURE__*/Object.freeze({
		displayComponent: displayComponent,
		getAdvancedBinding: getAdvancedBinding,
		traverse: traverse,
		validateRJX: validateRJX,
		validSimpleRJXSyntax: validSimpleRJXSyntax,
		simpleRJXSyntax: simpleRJXSyntax,
		getSimplifiedRJX: getSimplifiedRJX
	});

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyObject = {};

	var emptyObject_1 = emptyObject;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;

	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame

	    throw error;
	  }
	}

	var invariant_1 = invariant;

	var MIXINS_KEY = 'mixins'; // Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.

	function identity(fn) {
	  return fn;
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */
	  var injectedMixins = [];
	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */

	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',
	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',
	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',
	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };
	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */

	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };
	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */

	  var RESERVED_SPEC_KEYS = {
	    displayName: function (Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function (Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function (Constructor, childContextTypes) {

	      Constructor.childContextTypes = objectAssign({}, Constructor.childContextTypes, childContextTypes);
	    },
	    contextTypes: function (Constructor, contextTypes) {

	      Constructor.contextTypes = objectAssign({}, Constructor.contextTypes, contextTypes);
	    },

	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function (Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function (Constructor, propTypes) {

	      Constructor.propTypes = objectAssign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function (Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function () {}
	  };

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null; // Disallow overriding of base class methods unless explicitly allowed.

	    if (ReactClassMixin.hasOwnProperty(name)) {
	      invariant_1(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
	    } // Disallow defining methods more than once unless explicitly allowed.


	    if (isAlreadyDefined) {
	      invariant_1(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
	    }
	  }
	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */


	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {

	      return;
	    }

	    invariant_1(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');

	    invariant_1(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs; // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.

	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name]; // These cases should already be caught by validateMethodOverride.

	            invariant_1(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name); // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.


	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }

	    for (var name in statics) {
	      var property = statics[name];

	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;

	      invariant_1(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

	      var isAlreadyDefined = name in Constructor;

	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name) ? ReactClassStaticInterface[name] : null;

	        invariant_1(specPolicy === 'DEFINE_MANY_MERGED', 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);

	        Constructor[name] = createMergedResultFunction(Constructor[name], property);
	        return;
	      }

	      Constructor[name] = property;
	    }
	  }
	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */


	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    invariant_1(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        invariant_1(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);

	        one[key] = two[key];
	      }
	    }

	    return one;
	  }
	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */


	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);

	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }

	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }
	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */


	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }
	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */


	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);

	    return boundMethod;
	  }
	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */


	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;

	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function () {
	      this.__isMounted = true;
	    }
	  };
	  var IsMountedPostMixin = {
	    componentWillUnmount: function () {
	      this.__isMounted = false;
	    }
	  };
	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */

	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function (newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function () {

	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function () {};

	  objectAssign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */


	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {


	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject_1;
	      this.updater = updater || ReactNoopUpdateQueue;
	      this.state = null; // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;

	      invariant_1(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin); // Initialize the defaultProps property after all mixins have been merged.

	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    invariant_1(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');


	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	var factory_1 = factory;

	if (typeof react === 'undefined') {
	  throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
	} // Hack to grab NoopUpdateQueue from isomorphic React


	var ReactNoopUpdateQueue = new react.Component().updater;
	var createReactClass = factory_1(react.Component, react.isValidElement, ReactNoopUpdateQueue);

	//   var window = window || global.window || {};
	// }

	let advancedBinding = getAdvancedBinding();
	/**
	 * object of all react components available for RJX
	 */

	let componentMap = Object.assign({}, reactDomFactories, typeof window === 'object' ? window.__rjx_custom_elements : {});
	/**
	 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list 
	 * @param {Object} options - options for getBoundedComponents 
	 * @param {Object} options.reactComponents - all react components available for RJX
	 * @param {string[]} boundedComponents - list of components to bind RJX this context (usually helpful for navigation and redux-router)
	 * @returns {Object} reactComponents object of all react components available for RJX
	 */

	function getBoundedComponents(options = {}) {
	  const {
	    reactComponents,
	    boundedComponents = []
	  } = options;

	  if (advancedBinding || options.advancedBinding) {
	    return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
	      result[componentName] = reactComponents[componentName].bind(this);
	      return result;
	    }, {})); // reactComponents.ResponsiveLink = ResponsiveLink.bind(this);
	  } else return reactComponents;
	}
	/**
	 * returns a react component from a component library
	 * @param {Object} options - options for getComponentFromLibrary
	 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
	 * @param {Object} [options.rjx={}] - any valid RJX JSON
	 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
	 */

	function getComponentFromLibrary(options = {}) {
	  const {
	    componentLibraries = {},
	    rjx = {}
	  } = options;
	  const libComponent = Object.keys(componentLibraries).map(libraryName => {
	    const cleanLibraryName = rjx.component.replace(`${libraryName}.`, '');
	    const libraryNameArray = cleanLibraryName.split('.');

	    if (libraryNameArray.length === 2 && componentLibraries[libraryName] && componentLibraries[libraryName][libraryNameArray[0]] && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== 'undefined') {
	      return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
	    } else if (typeof componentLibraries[libraryName][cleanLibraryName] !== 'undefined') {
	      return componentLibraries[libraryName][cleanLibraryName];
	    }
	  }).filter(val => val)[0];
	  return libComponent;
	}
	/**
	 * returns a react element from rjx.component
	 * @example
	 * // returns react elements
	 * getComponentFromMap({rjx:{component:'div'}})=>div
	 * getComponentFromMap({rjx:{component:'MyModal'},reactComponents:{MyModal:MyModal extends React.Component}})=>MyModal
	 * getComponentFromMap({rjx:{component:'reactBootstap.nav'},componentLibraries:{reactBootstrap,}})=>reactBootstap.nav
	 * @param {Object} options - options for getComponentFromMap
	 * @param {object} [options.rjx={}] - any valid RJX JSON object
	 * @param {Object} [options.reactComponents={}] - react components to render
	 * @param {Object} [options.componentLibraries={}] - react components to render from another component library like bootstrap or bulma
	 * @param {function} [options.logError=console.error] - error logging function
	 * @param {boolean} [options.debug=false] - use debug messages
	 * @returns {string|function|class} valid react element
	 */

	function getComponentFromMap(options = {}) {
	  // eslint-disable-next-line
	  const {
	    rjx = {},
	    reactComponents = {},
	    componentLibraries = {},
	    logError = console.error,
	    debug
	  } = options;

	  try {
	    if (typeof rjx.component !== 'string' && typeof rjx.component === 'function') {
	      return rjx.component;
	    } else if (reactDomFactories[rjx.component]) {
	      return rjx.component;
	    } else if (reactComponents[rjx.component]) {
	      return reactComponents[rjx.component];
	    } else if (typeof rjx.component === 'string' && rjx.component.indexOf('.') > 0 && getComponentFromLibrary({
	      rjx,
	      componentLibraries
	    })) {
	      return getComponentFromLibrary({
	        rjx,
	        componentLibraries
	      });
	    } else {
	      throw new ReferenceError(`Invalid React Component (${rjx.component})`);
	    }
	  } catch (e) {
	    if (debug) logError(e, e.stack ? e.stack : 'no stack');
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

	function getFunctionFromEval(options = {}) {
	  const {
	    body = '',
	    args = []
	  } = options;
	  args.push(body);
	  return Function.prototype.constructor.apply({}, args);
	}
	/**
	 * Returns a new React Component
	 * @param {Boolean} [options.returnFactory=true] - returns a React component if true otherwise returns Component Class 
	 * @param {Object} [options.resources={}] - asyncprops for component
	 * @param {Object} [reactComponent={}] - an object of functions used for create-react-class
	 * @param {Object} reactComponent.render.body - Valid RJX JSON
	 * @param {String} reactComponent.getDefaultProps.body - return an object for the default props
	 * @param {String} reactComponent.getInitialState.body - return an object for the default state
	 * @returns {Function} 
	 * @see {@link https://reactjs.org/docs/react-without-es6.html} 
	 */

	function getReactComponent(reactComponent = {}, options = {}) {
	  const {
	    returnFactory = true,
	    resources = {}
	  } = options;
	  const rjc = Object.assign({
	    getDefaultProps: {
	      body: 'return {};'
	    },
	    getInitialState: {
	      body: 'return {};'
	    }
	  }, reactComponent);
	  const rjcKeys = Object.keys(rjc);

	  if (rjcKeys.includes('render') === false) {
	    throw new ReferenceError('React components require a render method');
	  }

	  const classOptions = rjcKeys.reduce((result, val) => {
	    const args = rjc[val].arguments;
	    const body = rjc[val].body;

	    if (!body) {
	      console.warn({
	        rjc
	      });
	      throw new SyntaxError(`Function(${val}) requires a function body`);
	    }

	    if (args && !Array.isArray(args) && args.length && args.length && args.filter(arg => typeof arg === 'string').length) {
	      throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
	    }

	    result[val] = val === 'render' ? () => getRenderedJSON.call(this, body, resources) : getFunctionFromEval({
	      body,
	      args
	    });
	    return result;
	  }, {});
	  const reactComponentClass = createReactClass(classOptions);
	  return returnFactory ? react.createFactory(reactComponentClass) : reactComponentClass;
	}
	/**
	 * if (recharts[rjx.component.replace('recharts.', '')]) {
	      return recharts[rjx.component.replace('recharts.', '')];
	    }
	 */

	var rjxComponents = /*#__PURE__*/Object.freeze({
		advancedBinding: advancedBinding,
		componentMap: componentMap,
		getBoundedComponents: getBoundedComponents,
		getComponentFromLibrary: getComponentFromLibrary,
		getComponentFromMap: getComponentFromMap,
		getFunctionFromEval: getFunctionFromEval,
		getReactComponent: getReactComponent
	});

	//   var window = window || {};
	// }

	/**
	 * It uses traverse on a traverseObject to returns a resolved object on propName. So if you're making an ajax call and want to pass properties into a component, you can assign them using asyncprops and reference object properties by an array of property paths
	 * @param {Object} [traverseObject={}] - the object that contains values of propName
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @param {Object} [options.propName='asyncprops'] - Property on RJX to resolve values onto, i.e (asyncprops,thisprops,windowprops) 
	 * @returns {Object} resolved object
	 * @example
	 const traverseObject = {
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
	const testRJX = {
	  component: 'div',
	  props: {
	    id: 'generatedRJX',
	    className:'rjx',
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
	const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
	// => {
	//   auth: 'OAuth2',
	//   username: 'rjx'
	// }

	//finally resolves:
	const testRJX = {
	  component: 'div',
	  props: {
	    id: 'generatedRJX',
	    className:'rjx',
	    auth: 'OAuth2',
	    username: 'rjx',
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

	function getRJXProps(options = {}) {
	  // eslint-disable-next-line
	  let {
	    rjx = {},
	    propName = 'asyncprops',
	    traverseObject = {}
	  } = options; // return (rjx.asyncprops && typeof rjx.asyncprops === 'object')
	  // ? utilities.traverse(rjx.asyncprops, resources)
	  // : {};

	  return rjx[propName] && typeof rjx[propName] === 'object' ? traverse(rjx[propName], traverseObject) : {};
	}
	/**
	 * Used to evalute javascript and set those variables as props. getEvalProps evaluates __dangerouslyEvalProps and __dangerouslyBindEvalProps properties with eval, this is used when component properties are functions, __dangerouslyBindEvalProps is used when those functions require that this is bound to the function. For __dangerouslyBindEvalProps it must resolve an expression, so functions should be wrapped in (). I.e. (function f(x){ return this.minimum+x;})
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @returns {Object} returns resolved object with evaluated javascript
	 * @example
	 const testVals = {
	    auth: 'true',
	    username: '(user={})=>user.name',
	  };
	  const testRJX = Object.assign({}, sampleRJX, {
	    __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
	      email: '(function getUser(user={}){ return this.testBound(); })',
	    },
	  });
	  const RJXP = getEvalProps.call({ testBound: () => 'bounded', }, { rjx: testRJX, });
	  const evalutedComputedFunc = RJXP.username({ name: 'bob', });
	  const evalutedComputedBoundFunc = RJXP.email({ email:'test@email.domain', });
	  // expect(RJXP.auth).to.be.true;
	  // expect(evalutedComputedFunc).to.eql('bob');
	  // expect(evalutedComputedBoundFunc).to.eql('bounded');
	 */

	function getEvalProps(options = {}) {
	  const {
	    rjx
	  } = options;
	  const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval

	  const evProps = Object.keys(rjx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
	    // eslint-disable-next-line
	    eprops[epropName] = scopedEval(rjx.__dangerouslyEvalProps[epropName]);
	    return eprops;
	  }, {});
	  const evBindProps = Object.keys(rjx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
	    // eslint-disable-next-line
	    eprops[epropName] = scopedEval(rjx.__dangerouslyBindEvalProps[epropName]).bind(this);
	    return eprops;
	  }, {});
	  return Object.assign({}, evProps, evBindProps);
	}
	/**
	 * Resolves rjx.__dangerouslyInsertComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @param {Object} [options.resources={}] - object to use for resourceprops(asyncprops), usually a result of an asynchronous call
	 * @returns {Object} resolved object of React Components
	 */

	function getComponentProps(options = {}) {
	  const {
	    rjx,
	    resources
	  } = options;
	  return Object.keys(rjx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
	    // eslint-disable-next-line
	    cprops[cpropName] = getRenderedJSON.call(this, rjx.__dangerouslyInsertComponents[cpropName], resources);
	    return cprops;
	  }, {});
	}
	/**
	 * Resolves rjx.__dangerouslyInsertReactComponents into an object that turns each value into a React components. This is typically used in a library like Recharts where you pass custom components for chart ticks or plot points. 
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	//  * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
	 * @returns {Object} resolved object of React Components
	 */

	function getReactComponentProps(options = {}) {
	  const {
	    rjx
	  } = options;
	  return Object.keys(rjx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
	    // eslint-disable-next-line
	    cprops[cpropName] = getComponentFromMap({
	      rjx: {
	        component: rjx.__dangerouslyInsertReactComponents[cpropName]
	      },
	      reactComponents: this.reactComponents,
	      componentLibraries: this.componentLibraries
	    });
	    return cprops;
	  }, {});
	}
	/**
	 * Takes a function string and returns a function on either this.props or window. The function can only be 2 levels deep
	 * @param {Object} options 
	 * @param {String} [options.propFunc='func:'] - function string, like func:window.LocalStorage.getItem or this.props.onClick 
	 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents);
	 * @returns {Function} returns a function from this.props or window functions
	 * @example
	 * getFunctionFromProps({ propFunc='func:this.props.onClick', }) // => this.props.onClick
	 */

	function getFunctionFromProps(options) {
	  const {
	    propFunc = 'func:'
	  } = options; // eslint-disable-next-line

	  const {
	    logError = console.error,
	    debug
	  } = this;
	  const window = this.window || global$1.window || {};

	  try {
	    const functionNameString = propFunc.split(':')[1] || '';
	    const functionNameArray = functionNameString.split('.');
	    const functionName = functionNameArray.length ? functionNameArray[functionNameArray.length - 1] : '';

	    if (propFunc.indexOf('func:window') !== -1) {
	      if (functionNameArray.length === 3) {
	        try {
	          return window[functionNameArray[1]][functionName].bind(this);
	        } catch (e) {
	          if (debug) {
	            logError(e);
	          }

	          return window[functionNameArray[1]][functionName];
	        }
	      } else {
	        try {
	          return window[functionName].bind(this);
	        } catch (e) {
	          if (debug) {
	            logError(e);
	          }

	          return window[functionName];
	        }
	      }
	    } else if (functionNameArray.length === 4) {
	      return this.props[functionNameArray[2]][functionName];
	    } else if (functionNameArray.length === 3) {
	      return this.props[functionName].bind(this);
	    } else {
	      return function () {};
	    }
	  } catch (e) {
	    if (debug) {
	      logError(e);
	    }

	    return function () {};
	  }
	}
	/**
	 * Returns a resolved object from function strings that has functions pulled from rjx.__functionProps
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
	 * @returns {Object} resolved object of functions from function strings
	 */

	function getFunctionProps(options = {}) {
	  const {
	    allProps = {},
	    rjx = {}
	  } = options;
	  const getFunction = getFunctionFromProps.bind(this);
	  const funcProps = rjx.__functionProps; //Allowing for window functions

	  Object.keys(funcProps).forEach(key => {
	    if (typeof funcProps[key] === 'string' && funcProps[key].indexOf('func:') !== -1) {
	      allProps[key] = getFunction({
	        propFunc: funcProps[key]
	      });
	    }
	  });
	  return allProps;
	}
	/**
	 * Returns a resolved object that has React Components pulled from window.__rjx_custom_elements
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, rjx.props, asyncprops, windowprops, evalProps, insertedComponents);
	 * @returns {Object} resolved object of with React Components from a window property window.__rjx_custom_elements
	 */

	function getWindowComponents(options = {}) {
	  const {
	    allProps,
	    rjx
	  } = options;
	  const windowComponents = rjx.__windowComponents;
	  const window = this.window || global$1.window || {};
	  const windowFuncPrefix = 'func:window.__rjx_custom_elements'; // if (rjx.hasWindowComponent && window.__rjx_custom_elements) {

	  Object.keys(windowComponents).forEach(key => {
	    const windowKEY = typeof windowComponents[key] === 'string' ? windowComponents[key].replace(`${windowFuncPrefix}.`, '') : '';

	    if (typeof windowComponents[key] === 'string' && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window.__rjx_custom_elements[windowKEY] === 'function') {
	      const windowComponentElement = window.__rjx_custom_elements[windowKEY];
	      const windowComponentProps = allProps['__windowComponentProps'] ? allProps['__windowComponentProps'] : this.props;
	      allProps[key] = react.createElement(windowComponentElement, windowComponentProps, null);
	    }
	  });
	  return allProps;
	}
	/**
	 * Returns computed properties for React Components and any property that's prefixed with __ is a computedProperty
	 * @param {Object} options 
	 * @param {Object} options.rjx - Valid RJX JSON 
	 * @param {Object} [options.resources={}] - object to use for asyncprops, usually a result of an asynchronous call
	 * @param {Number} options.renderIndex - number used for React key prop
	 * @param {function} [options.logError=console.error] - error logging function
	 * @param {Object} [options.componentLibraries] - react components to render with RJX
	 * @param {Boolean} [options.useReduxState=true] - use redux props in this.props
	 * @param {Boolean} [options.ignoreReduxPropsInComponentLibraries=true] - ignore redux props in this.props for component libraries, this is helpful incase these properties collide with component library element properties
	 * @param {boolean} [options.debug=false] - use debug messages
	 * @example
	const testRJX = { component: 'div',
	  props: { id: 'generatedRJX', className: 'rjx' },
	  children: [ [Object] ],
	  asyncprops: { auth: [Array], username: [Array] },
	  __dangerouslyEvalProps: { getUsername: '(user={})=>user.name' },
	  __dangerouslyInsertComponents: { myComponent: [Object] } 
	const resources = {
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
	const renderIndex = 1;
	getComputedProps.call({}, {
	        rjx: testRJX,
	        resources,
	        renderIndex,
	      });
	computedProps = { key: 1,
	     id: 'generatedRJX',
	     className: 'rjx',
	     auth: 'OAuth2',
	     username: 'rjx',
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

	function getComputedProps(options = {}) {
	  // eslint-disable-next-line
	  const {
	    rjx = {},
	    resources = {},
	    renderIndex,
	    logError = console.error,
	    useReduxState = true,
	    ignoreReduxPropsInComponentLibraries = true,
	    componentLibraries,
	    debug
	  } = options;

	  try {
	    const componentThisProp = rjx.thisprops ? Object.assign({
	      __rjx: {
	        _component: rjx,
	        _resources: resources
	      }
	    }, this.props, rjx.props, useReduxState && !rjx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && !componentLibraries[rjx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : undefined;
	    const windowTraverse = typeof window !== 'undefined' ? window : {};
	    const asyncprops = getRJXProps({
	      rjx,
	      propName: 'asyncprops',
	      traverseObject: resources
	    });
	    const resourceprops = getRJXProps({
	      rjx,
	      propName: 'resourceprops',
	      traverseObject: resources
	    });
	    const windowprops = getRJXProps({
	      rjx,
	      propName: 'windowprops',
	      traverseObject: windowTraverse
	    });
	    const thisprops = getRJXProps({
	      rjx,
	      propName: 'thisprops',
	      traverseObject: componentThisProp
	    }); //allowing javascript injections

	    const evalProps = rjx.__dangerouslyEvalProps || rjx.__dangerouslyBindEvalProps ? getEvalProps.call(this, {
	      rjx
	    }) : {};
	    const insertedComponents = rjx.__dangerouslyInsertComponents ? getComponentProps.call(this, {
	      rjx,
	      resources,
	      debug
	    }) : {};
	    const insertedReactComponents = rjx.__dangerouslyInsertReactComponents ? getReactComponentProps.call(this, {
	      rjx,
	      debug
	    }) : {};
	    const allProps = Object.assign({}, {
	      key: renderIndex
	    }, thisprops, rjx.props, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents);
	    const computedProps = Object.assign({}, allProps, rjx.__functionProps ? getFunctionProps.call(this, {
	      allProps,
	      rjx
	    }) : {}, rjx.__windowComponents ? getWindowComponents.call(this, {
	      allProps,
	      rjx
	    }) : {});
	    return computedProps;
	  } catch (e) {
	    debug && logError(e, e.stack ? e.stack : 'no stack');
	    return null;
	  }
	}

	var rjxProps = /*#__PURE__*/Object.freeze({
		getRJXProps: getRJXProps,
		getEvalProps: getEvalProps,
		getComponentProps: getComponentProps,
		getReactComponentProps: getReactComponentProps,
		getFunctionFromProps: getFunctionFromProps,
		getFunctionProps: getFunctionProps,
		getWindowComponents: getWindowComponents,
		getComputedProps: getComputedProps
	});

	/**
	 * returns a valid rjx.children property
	 * @param {Object} options
	 * @param {Object} [options.rjx ={}]- Valid RJX JSON 
	 * @param {Object} [options.props=options.rjx.children] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
	 * @returns {Object[]|String} returns a valid rjx.children property that's either an array of RJX objects or a string 
	 * @example 
	 * const sampleRJX = {
	  component: 'div',
	  props: {
	    id: 'generatedRJX',
	    className:'rjx',
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
	const RJXChildren = getChildrenProperty({ rjx: sampleRJX, }); //=> [ [rjx Object],[rjx Object]]
	const RJXChildrenPTag = getChildrenProperty({ rjx: sampleRJX.children[ 0 ], }); //=>hello world
	 */

	function getChildrenProperty(options = {}) {
	  const {
	    rjx = {}
	  } = options;
	  const props = options.props || rjx.props || {};

	  if (props._children
	  /* && !rjx.children */
	  ) {
	      if (Array.isArray(props._children) || typeof props._children !== 'undefined') {
	        return props._children;
	      } else {
	        return rjx.children;
	      }
	    } else if (typeof rjx.children === 'undefined') {
	    if (props && props.children && (typeof props.children !== 'undefined' || Array.isArray(props.children))) {
	      return props.children;
	    } else {
	      return null;
	    }
	  } else {
	    return rjx.children;
	  }
	}
	/**
	 * Used to pass properties down to child components if passprops is set to true
	 * @param {Object} options
	 * @param {Object} [options.rjx ={}] - Valid RJX JSON 
	 * @param {Object} [options.childrjx ={}] - Valid RJX JSON 
	 * @param {Number} options.renderIndex - React key property 
	 * @param {Object} [options.props=options.rjx.props] - Props to pull children  Object.assign(rjx.props,rjx.asyncprops,rjx.thisprops,rjx.windowprops) 
	 * @returns {Object|String} returns a valid  Valid RJX Child object or a string 
	 */

	function getChildrenProps(options = {}) {
	  const {
	    rjx = {},
	    childrjx,
	    renderIndex
	  } = options;
	  const props = options.props || rjx.props || {};
	  return rjx.passprops && typeof childrjx === 'object' ? Object.assign({}, childrjx, {
	    props: Object.assign({}, props, childrjx.thisprops && childrjx.thisprops.style || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
	    childrjx.asyncprops && childrjx.asyncprops.style || childrjx.windowprops && childrjx.windowprops.style ? {} : {
	      style: {}
	    }, childrjx.props, {
	      key: renderIndex + Math.random()
	    })
	  }) : childrjx;
	}
	/**
	 * returns React Child Elements via RJX
	 * @param {*} options 
	 * @property {object} this - options for getRenderedJSON
	 * @property {Object} [this.componentLibraries] - react components to render with RJX
	 * @property {boolean} [this.debug=false] - use debug messages
	 * @property {function} [this.logError=console.error] - error logging function
	 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
	 */

	function getRJXChildren(options = {}) {
	  // eslint-disable-next-line
	  const {
	    rjx,
	    resources,
	    renderIndex,
	    logError = console.error
	  } = options;
	  const props = options.props || rjx.props || {};

	  try {
	    rjx.children = getChildrenProperty({
	      rjx,
	      props
	    });
	    return rjx.children && Array.isArray(rjx.children) && typeof rjx.children !== 'string' ? rjx.children.map(childrjx => getRenderedJSON.call(this, getChildrenProps({
	      rjx,
	      childrjx,
	      props,
	      renderIndex
	    }), resources)) : rjx.children;
	  } catch (e) {
	    logError(e, e.stack ? e.stack : 'no stack');
	    return null;
	  }
	}

	var rjxChildren = /*#__PURE__*/Object.freeze({
		getChildrenProperty: getChildrenProperty,
		getChildrenProps: getChildrenProps,
		getRJXChildren: getRJXChildren
	});

	// import React, { createElement, } from 'react';
	const createElement = react.createElement;
	const {
	  componentMap: componentMap$1,
	  getComponentFromMap: getComponentFromMap$1,
	  getBoundedComponents: getBoundedComponents$1
	} = rjxComponents;
	const {
	  getComputedProps: getComputedProps$1
	} = rjxProps;
	const {
	  getRJXChildren: getRJXChildren$1
	} = rjxChildren;
	const {
	  displayComponent: displayComponent$1
	} = rjxUtils;
	exports.renderIndex = 0;
	/**
	 * Use RJX without any configuration to render RJX JSON to HTML and insert RJX into querySelector using ReactDOM.render
	 * @example
	 * // Uses react to create <!DOCTYPE html><body><div id="myApp"><div class="rjx-generated"><p style="color:red;">hello world</p></div></div></body>
	 * rjx.rjxRender({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, querySelector:'#myApp', });
	 * @param {object} config - options used to inject html via ReactDOM.render
	 * @param {object} config.rjx - any valid RJX JSON object
	 * @param {object} config.resources - any additional resource used for asynchronous properties
	 * @param {string} config.querySelector - selector for document.querySelector
	 * @property {object} this - options for getRenderedJSON
	 */

	function rjxRender(config = {}) {
	  const {
	    rjx,
	    resources,
	    querySelector,
	    options,
	    DOM
	  } = config;
	  reactDom.render(getRenderedJSON.call(this || {}, rjx, resources, options), DOM || document.querySelector(querySelector));
	}
	/**
	 * Use ReactDOMServer.renderToString to render html from RJX
	 * @example
	 * // Uses react to create <div class="rjx-generated"><p style="color:red;">hello world</p></div>
	 * rjx.rjxHTMLString({ rjx: { component: 'div', props:{className:'rjx-generated',children:[{ component:'p',props:{style:{color:'red'}}, children:'hello world' }]}}, });
	 * @param {object} config - options used to inject html via ReactDOM.render
	 * @param {object} config.rjx - any valid RJX JSON object
	 * @param {object} config.resources - any additional resource used for asynchronous properties
	 * @property {object} this - options for getRenderedJSON
	 * @returns {string} React genereated html via RJX JSON
	 */

	function rjxHTMLString(config = {}) {
	  const {
	    rjx,
	    resources
	  } = config;
	  return server.renderToString(getRenderedJSON.call(this || {}, rjx, resources));
	}
	/**
	 * Use React.createElement and RJX JSON to create React elements
	 * @example
	 * // Uses react to create the equivalent JSX <myComponent style={{color:blue}}>hello world</myComponent>
	 * rjx.getRenderedJSON({component:'myCompnent',props:{style:{color:'blue'}},children:'hello world'})
	 * @param {object} rjx - any valid RJX JSON object
	 * @param {object} resources - any additional resource used for asynchronous properties
	 * @property {object} this - options for getRenderedJSON
	 * @property {Object} [this.componentLibraries] - react components to render with RJX
	 * @property {boolean} [this.debug=false] - use debug messages
	 * @property {function} [this.logError=console.error] - error logging function
	 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
	 * @returns {function} React element via React.createElement
	 */

	function getRenderedJSON(rjx = {}, resources = {}) {
	  // eslint-disable-next-line
	  const {
	    componentLibraries = {},
	    debug = false,
	    logError = console.error,
	    boundedComponents = []
	  } = this || {}; // const componentLibraries = this.componentLibraries;

	  if (rjx.type) rjx.component = rjx.type;
	  if (validSimpleRJXSyntax(rjx)) rjx = simpleRJXSyntax(rjx);
	  if (!rjx.component) return createElement('span', {}, debug ? 'Error: Missing Component Object' : '');

	  try {
	    const components = Object.assign({}, componentMap$1, this.reactComponents);
	    const reactComponents = boundedComponents.length ? getBoundedComponents$1.call(this, {
	      boundedComponents,
	      reactComponents: components
	    }) : components;
	    exports.renderIndex++;
	    const element = getComponentFromMap$1({
	      rjx,
	      reactComponents,
	      componentLibraries,
	      debug,
	      logError
	    });
	    const props = getComputedProps$1.call(this, {
	      rjx,
	      resources,
	      renderIndex: exports.renderIndex,
	      componentLibraries,
	      debug,
	      logError
	    });
	    const displayElement = rjx.comparisonprops ? displayComponent$1.call(this, {
	      rjx,
	      props,
	      renderIndex: exports.renderIndex,
	      componentLibraries,
	      debug
	    }) : true;

	    if (displayElement) {
	      const children = getRJXChildren$1.call(this, {
	        rjx,
	        props,
	        resources,
	        renderIndex: exports.renderIndex
	      });
	      return createElement(element, props, children);
	    } else {
	      return null;
	    }
	  } catch (e) {
	    if (debug) {
	      logError({
	        rjx,
	        resources
	      }, 'this', this);
	      logError(e, e.stack ? e.stack : 'no stack');
	    }

	    throw e;
	  }
	}
	/**
	 * Use RJX for express view rendering
	 * @param {string} filePath - path to rjx express view 
	 * @param {object} options - property used for express view {locals}
	 * @param {object} options.__boundConfig - property used to bind this object for RJX, can be used to add custom components
	 * @param {string} [options.__DOCTYPE="<!DOCTYPE html>"] - html doctype string
	 * @param {*} callback 
	 */

	function __express(filePath, options, callback) {
	  try {
	    const resources = Object.assign({}, options);
	    delete resources.__boundConfig;
	    delete resources.__DOCTYPE;
	    delete resources.__rjx;

	    const rjxModule = options.__rjx || require(filePath);

	    const rjxRenderedString = rjxHTMLString.call(options.__boundConfig || {}, {
	      rjx: rjxModule,
	      resources
	    });
	    callback(null, `${options.__DOCTYPE || '<!DOCTYPE html>'}
${rjxRenderedString}`);
	  } catch (e) {
	    callback(e);
	  }
	}
	const _rjxChildren = rjxChildren;
	const _rjxComponents = rjxComponents;
	const _rjxProps = rjxProps;
	const _rjxUtils = rjxUtils;

	exports.rjxRender = rjxRender;
	exports.rjxHTMLString = rjxHTMLString;
	exports.getRenderedJSON = getRenderedJSON;
	exports.__express = __express;
	exports._rjxChildren = _rjxChildren;
	exports._rjxComponents = _rjxComponents;
	exports._rjxProps = _rjxProps;
	exports._rjxUtils = _rjxUtils;
	exports.default = getRenderedJSON;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
