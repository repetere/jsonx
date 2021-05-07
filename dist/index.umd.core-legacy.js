(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((typeof global!=="undefined" ? global : window).jsonx = {}, (typeof global!=="undefined" ? global : window).React, (typeof global!=="undefined" ? global : window).ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () {
							return e[k];
						}
					});
				}
			});
		}
		n['default'] = e;
		return Object.freeze(n);
	}

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
	var React__namespace = /*#__PURE__*/_interopNamespace(React);
	var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
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
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
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
				if (hasOwnProperty$2.call(from, key)) {
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

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;

	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function() {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active ) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
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

	  if (!handler)
	    return false;

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
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
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
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
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

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
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
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

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

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
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

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount$1.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount$1;
	function listenerCount$1(type) {
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
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	var global$2 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
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
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

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

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray$1 = Array.isArray || function (arr) {
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
	Buffer.TYPED_ARRAY_SUPPORT = (typeof global$2!=="undefined" ? global$2 : window).TYPED_ARRAY_SUPPORT !== undefined
	  ? (typeof global$2!=="undefined" ? global$2 : window).TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
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

	  return that
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

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
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
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
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

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
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
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
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
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray$1(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
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
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
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
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
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
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
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

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
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

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
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

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
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

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
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

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
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
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
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
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
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
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
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
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
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
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
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
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
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
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof (typeof global$2!=="undefined" ? global$2 : window).setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof (typeof global$2!=="undefined" ? global$2 : window).clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
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
	    while(len) {
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
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance$1 = (typeof global$2!=="undefined" ? global$2 : window).performance || {};
	performance$1.now        ||
	  performance$1.mozNow     ||
	  performance$1.msNow      ||
	  performance$1.oNow       ||
	  performance$1.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	var inherits;
	if (typeof Object.create === 'function'){
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
	  if (!isString$2(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
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
	    if (isNull(x) || !isObject$1(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	}

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined$2((typeof global$2!=="undefined" ? global$2 : window).process)) {
	    return function() {
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
	  if (isUndefined$2(debugEnviron))
	    debugEnviron = '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;
	      debugs[set] = function() {
	        var msg = format.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
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
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean$1(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined$2(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined$2(ctx.depth)) ctx.depth = 2;
	  if (isUndefined$2(ctx.colors)) ctx.colors = false;
	  if (isUndefined$2(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
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
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction$1(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString$2(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction$1(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate$1(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction$1(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate$1(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
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
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined$2(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString$2(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber$1(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean$1(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty$1(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
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
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined$2(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}

	function isBoolean$1(arg) {
	  return typeof arg === 'boolean';
	}

	function isNull(arg) {
	  return arg === null;
	}

	function isNumber$1(arg) {
	  return typeof arg === 'number';
	}

	function isString$2(arg) {
	  return typeof arg === 'string';
	}

	function isUndefined$2(arg) {
	  return arg === void 0;
	}

	function isRegExp(re) {
	  return isObject$1(re) && objectToString(re) === '[object RegExp]';
	}

	function isObject$1(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isDate$1(d) {
	  return isObject$1(d) && objectToString(d) === '[object Date]';
	}

	function isError(e) {
	  return isObject$1(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}

	function isFunction$1(arg) {
	  return typeof arg === 'function';
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject$1(add)) return origin;

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
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};

	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
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
	  }return ret;
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
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     };


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
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
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	}

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

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
	    if (!emitter._events || !emitter._events[event])
	      emitter.on(event, fn);
	    else if (Array.isArray(emitter._events[event]))
	      emitter._events[event].unshift(fn);
	    else
	      emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	function listenerCount (emitter, type) {
	  return emitter.listeners(type).length;
	}
	function ReadableState(options, stream) {

	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
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

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options && typeof options.read === 'function') this._read = options.read;

	  EventEmitter.call(this);
	}

	// Manually shove something into the read() buffer.
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
	};

	// Unshift should *always* be something directly out of read()
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

	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
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
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
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
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;

	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
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
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
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
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
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
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
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
	}

	// at this point, the user has presumably seen the 'readable' event,
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
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
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

	  var doEnd = (!pipeOpts || pipeOpts.end !== false);

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
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
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
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
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
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
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
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
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
	        emitReadable(this);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
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
	}

	// wrap an old-style stream as the async data source.
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
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
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
	}

	// Extracts only enough buffered data to satisfy the amount requested.
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
	}

	// Copies a specified amount of characters from the list of buffered data
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
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
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
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
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
	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
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

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  EventEmitter.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  nextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
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
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);

	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
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
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
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

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
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
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
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

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
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
	}

	// It seems a linked list but it is not
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
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
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
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
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

	  this._transformState = new TransformState(this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
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
	};

	// This is the part where you do stuff!
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
	};

	// Doesn't matter what the args are here.
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
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
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
	Stream.PassThrough = PassThrough;

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;

	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EventEmitter.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
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

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
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
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EventEmitter.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
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

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

	var stream = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': Stream,
		Readable: Readable,
		Writable: Writable,
		Duplex: Duplex,
		Transform: Transform,
		PassThrough: PassThrough,
		Stream: Stream
	});

	var require$$2 = /*@__PURE__*/getAugmentedNamespace(stream);

	/** @license React v17.0.2
	 * react-dom-server.node.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var reactDomServer_node_development = createCommonjsModule(function (module, exports) {

	{
	  (function() {

	var React = React__default['default'];
	var _assign = objectAssign;
	var stream = require$$2;

	// TODO: this is special because it gets imported during build.
	var ReactVersion = '17.0.2';

	// Do not require this module directly! Use normal `invariant` calls with
	// template literal strings. The messages will be replaced with error codes
	// during build.
	function formatProdErrorMessage(code) {
	  var url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;

	  for (var i = 1; i < arguments.length; i++) {
	    url += '&args[]=' + encodeURIComponent(arguments[i]);
	  }

	  return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional ' + 'helpful warnings.';
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	// by calls to these methods by a Babel plugin.
	//
	// In PROD (or in packages without access to React internals),
	// they are left as they are instead.

	function warn(format) {
	  {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    printWarning('warn', format, args);
	  }
	}
	function error(format) {
	  {
	    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    printWarning('error', format, args);
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    }

	    var argsWithFormat = args.map(function (item) {
	      return '' + item;
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}
	var REACT_PORTAL_TYPE = 0xeaca;
	var REACT_FRAGMENT_TYPE = 0xeacb;
	var REACT_STRICT_MODE_TYPE = 0xeacc;
	var REACT_PROFILER_TYPE = 0xead2;
	var REACT_PROVIDER_TYPE = 0xeacd;
	var REACT_CONTEXT_TYPE = 0xeace;
	var REACT_FORWARD_REF_TYPE = 0xead0;
	var REACT_SUSPENSE_TYPE = 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = 0xead8;
	var REACT_MEMO_TYPE = 0xead3;
	var REACT_LAZY_TYPE = 0xead4;
	var REACT_BLOCK_TYPE = 0xead9;
	var REACT_FUNDAMENTAL_TYPE = 0xead5;
	var REACT_SCOPE_TYPE = 0xead7;
	var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
	var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

	if (typeof Symbol === 'function' && Symbol.for) {
	  var symbolFor = Symbol.for;
	  symbolFor('react.element');
	  REACT_PORTAL_TYPE = symbolFor('react.portal');
	  REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
	  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
	  REACT_PROFILER_TYPE = symbolFor('react.profiler');
	  REACT_PROVIDER_TYPE = symbolFor('react.provider');
	  REACT_CONTEXT_TYPE = symbolFor('react.context');
	  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
	  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
	  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
	  REACT_MEMO_TYPE = symbolFor('react.memo');
	  REACT_LAZY_TYPE = symbolFor('react.lazy');
	  REACT_BLOCK_TYPE = symbolFor('react.block');
	  symbolFor('react.server.block');
	  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
	  REACT_SCOPE_TYPE = symbolFor('react.scope');
	  symbolFor('react.opaque.id');
	  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
	  symbolFor('react.offscreen');
	  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var functionName = innerType.displayName || innerType.name || '';
	  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
	}

	function getContextName(type) {
	  return type.displayName || 'Context';
	}

	function getComponentName(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        return getComponentName(type.type);

	      case REACT_BLOCK_TYPE:
	        return getComponentName(type._render);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentName(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }
	    }
	  }

	  return null;
	}

	// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

	var enableSuspenseServerRenderer = false;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: _assign({}, props, {
	          value: prevLog
	        }),
	        info: _assign({}, props, {
	          value: prevInfo
	        }),
	        warn: _assign({}, props, {
	          value: prevWarn
	        }),
	        error: _assign({}, props, {
	          value: prevError
	        }),
	        group: _assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: _assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: _assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if (!fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_BLOCK_TYPE:
	        return describeFunctionComponentFrame(type._render);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(Object.prototype.hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var didWarnAboutInvalidateContextType;

	{
	  didWarnAboutInvalidateContextType = new Set();
	}

	var emptyObject = {};

	{
	  Object.freeze(emptyObject);
	}

	function maskContext(type, context) {
	  var contextTypes = type.contextTypes;

	  if (!contextTypes) {
	    return emptyObject;
	  }

	  var maskedContext = {};

	  for (var contextName in contextTypes) {
	    maskedContext[contextName] = context[contextName];
	  }

	  return maskedContext;
	}

	function checkContextTypes(typeSpecs, values, location) {
	  {
	    checkPropTypes(typeSpecs, values, location, 'Component');
	  }
	}

	function validateContextBounds(context, threadID) {
	  // If we don't have enough slots in this context to store this threadID,
	  // fill it in without leaving any holes to ensure that the VM optimizes
	  // this as non-holey index properties.
	  // (Note: If `react` package is < 16.6, _threadCount is undefined.)
	  for (var i = context._threadCount | 0; i <= threadID; i++) {
	    // We assume that this is the same as the defaultValue which might not be
	    // true if we're rendering inside a secondary renderer but they are
	    // secondary because these use cases are very rare.
	    context[i] = context._currentValue2;
	    context._threadCount = i + 1;
	  }
	}
	function processContext(type, context, threadID, isClass) {
	  if (isClass) {
	    var contextType = type.contextType;

	    {
	      if ('contextType' in type) {
	        var isValid = // Allow null for conditional declaration
	        contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

	        if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
	          didWarnAboutInvalidateContextType.add(type);
	          var addendum = '';

	          if (contextType === undefined) {
	            addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
	          } else if (typeof contextType !== 'object') {
	            addendum = ' However, it is set to a ' + typeof contextType + '.';
	          } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
	            addendum = ' Did you accidentally pass the Context.Provider instead?';
	          } else if (contextType._context !== undefined) {
	            // <Context.Consumer>
	            addendum = ' Did you accidentally pass the Context.Consumer instead?';
	          } else {
	            addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
	          }

	          error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentName(type) || 'Component', addendum);
	        }
	      }
	    }

	    if (typeof contextType === 'object' && contextType !== null) {
	      validateContextBounds(contextType, threadID);
	      return contextType[threadID];
	    }

	    {
	      var maskedContext = maskContext(type, context);

	      {
	        if (type.contextTypes) {
	          checkContextTypes(type.contextTypes, maskedContext, 'context');
	        }
	      }

	      return maskedContext;
	    }
	  } else {
	    {
	      var _maskedContext = maskContext(type, context);

	      {
	        if (type.contextTypes) {
	          checkContextTypes(type.contextTypes, _maskedContext, 'context');
	        }
	      }

	      return _maskedContext;
	    }
	  }
	}

	var nextAvailableThreadIDs = new Uint16Array(16);

	for (var i = 0; i < 15; i++) {
	  nextAvailableThreadIDs[i] = i + 1;
	}

	nextAvailableThreadIDs[15] = 0;

	function growThreadCountAndReturnNextAvailable() {
	  var oldArray = nextAvailableThreadIDs;
	  var oldSize = oldArray.length;
	  var newSize = oldSize * 2;

	  if (!(newSize <= 0x10000)) {
	    {
	      throw Error( "Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic." );
	    }
	  }

	  var newArray = new Uint16Array(newSize);
	  newArray.set(oldArray);
	  nextAvailableThreadIDs = newArray;
	  nextAvailableThreadIDs[0] = oldSize + 1;

	  for (var _i = oldSize; _i < newSize - 1; _i++) {
	    nextAvailableThreadIDs[_i] = _i + 1;
	  }

	  nextAvailableThreadIDs[newSize - 1] = 0;
	  return oldSize;
	}

	function allocThreadID() {
	  var nextID = nextAvailableThreadIDs[0];

	  if (nextID === 0) {
	    return growThreadCountAndReturnNextAvailable();
	  }

	  nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
	  return nextID;
	}
	function freeThreadID(id) {
	  nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
	  nextAvailableThreadIDs[0] = id;
	}

	// A reserved attribute.
	// It is handled by React separately and shouldn't be written to the DOM.
	var RESERVED = 0; // A simple string attribute.
	// Attributes that aren't in the filter are presumed to have this type.

	var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
	// "enumerated" attributes with "true" and "false" as possible values.
	// When true, it should be set to a "true" string.
	// When false, it should be set to a "false" string.

	var BOOLEANISH_STRING = 2; // A real boolean attribute.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.

	var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.
	// For any other value, should be present with that value.

	var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
	// When falsy, it should be removed.

	var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
	// When falsy, it should be removed.

	var POSITIVE_NUMERIC = 6;

	/* eslint-disable max-len */
	var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
	/* eslint-enable max-len */

	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
	var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
	  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
	    return true;
	  }

	  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
	    return false;
	  }

	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }

	  illegalAttributeNameCache[attributeName] = true;

	  {
	    error('Invalid attribute name: `%s`', attributeName);
	  }

	  return false;
	}
	function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
	  if (propertyInfo !== null) {
	    return propertyInfo.type === RESERVED;
	  }

	  if (isCustomComponentTag) {
	    return false;
	  }

	  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
	    return true;
	  }

	  return false;
	}
	function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
	  if (propertyInfo !== null && propertyInfo.type === RESERVED) {
	    return false;
	  }

	  switch (typeof value) {
	    case 'function': // $FlowIssue symbol is perfectly valid here

	    case 'symbol':
	      // eslint-disable-line
	      return true;

	    case 'boolean':
	      {
	        if (isCustomComponentTag) {
	          return false;
	        }

	        if (propertyInfo !== null) {
	          return !propertyInfo.acceptsBooleans;
	        } else {
	          var prefix = name.toLowerCase().slice(0, 5);
	          return prefix !== 'data-' && prefix !== 'aria-';
	        }
	      }

	    default:
	      return false;
	  }
	}
	function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
	  if (value === null || typeof value === 'undefined') {
	    return true;
	  }

	  if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
	    return true;
	  }

	  if (isCustomComponentTag) {
	    return false;
	  }

	  if (propertyInfo !== null) {

	    switch (propertyInfo.type) {
	      case BOOLEAN:
	        return !value;

	      case OVERLOADED_BOOLEAN:
	        return value === false;

	      case NUMERIC:
	        return isNaN(value);

	      case POSITIVE_NUMERIC:
	        return isNaN(value) || value < 1;
	    }
	  }

	  return false;
	}
	function getPropertyInfo(name) {
	  return properties.hasOwnProperty(name) ? properties[name] : null;
	}

	function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
	  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
	  this.attributeName = attributeName;
	  this.attributeNamespace = attributeNamespace;
	  this.mustUseProperty = mustUseProperty;
	  this.propertyName = name;
	  this.type = type;
	  this.sanitizeURL = sanitizeURL;
	  this.removeEmptyString = removeEmptyString;
	} // When adding attributes to this list, be sure to also add them to
	// the `possibleStandardNames` module to ensure casing and incorrect
	// name warnings.


	var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

	var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
	// elements (not just inputs). Now that ReactDOMInput assigns to the
	// defaultValue property -- do we need this?
	'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];
	reservedProps.forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // A few React string attributes have a different name.
	// This is a mapping from React prop names to the attribute names.

	[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
	  var name = _ref[0],
	      attributeName = _ref[1];
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" HTML attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).

	['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" SVG attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).
	// Since these are SVG attributes, their attribute names are case-sensitive.

	['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML boolean attributes.

	['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
	// on the client side because the browsers are inconsistent. Instead we call focus().
	'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
	'itemScope'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are the few React props that we set as DOM properties
	// rather than attributes. These are all booleans.

	['checked', // Note: `option.selected` is not updated if `select.multiple` is
	// disabled with `removeAttribute`. We have special logic for handling this.
	'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that are "overloaded booleans": they behave like
	// booleans, but can also accept a string value.

	['capture', 'download' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be positive numbers.

	['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be numbers.

	['rowSpan', 'start'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	});
	var CAMELIZE = /[\-\:]([a-z])/g;

	var capitalize = function (token) {
	  return token[1].toUpperCase();
	}; // This is a list of all SVG attributes that need special casing, namespacing,
	// or boolean value assignment. Regular attributes that just accept strings
	// and have the same names are omitted, just like in the HTML attribute filter.
	// Some of these attributes can be hard to find. This list was created by
	// scraping the MDN documentation.


	['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xlink namespace.

	['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xml namespace.

	['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
	  false);
	}); // These attribute exists both in HTML and SVG.
	// The attribute name is case-sensitive in SVG so we can't just use
	// the React name like we do for attributes that exist only in HTML.

	['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These attributes accept URLs. These must not allow javascript: URLS.
	// These will also need to accept Trusted Types object in the future.

	var xlinkHref = 'xlinkHref';
	properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
	'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
	false);
	['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  true, // sanitizeURL
	  true);
	});

	// and any newline or tab are filtered out as if they're not part of the URL.
	// https://url.spec.whatwg.org/#url-parsing
	// Tab or newline are defined as \r\n\t:
	// https://infra.spec.whatwg.org/#ascii-tab-or-newline
	// A C0 control is a code point in the range \u0000 NULL to \u001F
	// INFORMATION SEPARATOR ONE, inclusive:
	// https://infra.spec.whatwg.org/#c0-control-or-space

	/* eslint-disable max-len */

	var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
	var didWarn = false;

	function sanitizeURL(url) {
	  {
	    if (!didWarn && isJavaScriptProtocol.test(url)) {
	      didWarn = true;

	      error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
	    }
	  }
	}

	// code copied and modified from escape-html

	/**
	 * Module variables.
	 * @private
	 */
	var matchHtmlRegExp = /["'&<>]/;
	/**
	 * Escapes special characters and HTML entities in a given html string.
	 *
	 * @param  {string} string HTML string to escape for later insertion
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;

	      case 38:
	        // &
	        escape = '&amp;';
	        break;

	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

	        break;

	      case 60:
	        // <
	        escape = '&lt;';
	        break;

	      case 62:
	        // >
	        escape = '&gt;';
	        break;

	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	} // end code copied and modified from escape-html

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */


	function escapeTextForBrowser(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }

	  return escapeHtml(text);
	}

	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */

	function quoteAttributeValueForBrowser(value) {
	  return '"' + escapeTextForBrowser(value) + '"';
	}

	function createMarkupForRoot() {
	  return ROOT_ATTRIBUTE_NAME + '=""';
	}
	/**
	 * Creates markup for a property.
	 *
	 * @param {string} name
	 * @param {*} value
	 * @return {?string} Markup string, or null if the property was invalid.
	 */

	function createMarkupForProperty(name, value) {
	  var propertyInfo = getPropertyInfo(name);

	  if (name !== 'style' && shouldIgnoreAttribute(name, propertyInfo, false)) {
	    return '';
	  }

	  if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
	    return '';
	  }

	  if (propertyInfo !== null) {
	    var attributeName = propertyInfo.attributeName;
	    var type = propertyInfo.type;

	    if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
	      return attributeName + '=""';
	    } else {
	      if (propertyInfo.sanitizeURL) {
	        value = '' + value;
	        sanitizeURL(value);
	      }

	      return attributeName + '=' + quoteAttributeValueForBrowser(value);
	    }
	  } else if (isAttributeNameSafe(name)) {
	    return name + '=' + quoteAttributeValueForBrowser(value);
	  }

	  return '';
	}
	/**
	 * Creates markup for a custom property.
	 *
	 * @param {string} name
	 * @param {*} value
	 * @return {string} Markup string, or empty string if the property was invalid.
	 */

	function createMarkupForCustomAttribute(name, value) {
	  if (!isAttributeNameSafe(name) || value == null) {
	    return '';
	  }

	  return name + '=' + quoteAttributeValueForBrowser(value);
	}

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
	  ;
	}

	var objectIs = typeof Object.is === 'function' ? Object.is : is;

	var currentlyRenderingComponent = null;
	var firstWorkInProgressHook = null;
	var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

	var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

	var didScheduleRenderPhaseUpdate = false; // Lazily created map of render-phase updates

	var renderPhaseUpdates = null; // Counter to prevent infinite loops.

	var numberOfReRenders = 0;
	var RE_RENDER_LIMIT = 25;
	var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

	var currentHookNameInDev;

	function resolveCurrentlyRenderingComponent() {
	  if (!(currentlyRenderingComponent !== null)) {
	    {
	      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem." );
	    }
	  }

	  {
	    if (isInHookUserCodeInDev) {
	      error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://reactjs.org/link/rules-of-hooks');
	    }
	  }

	  return currentlyRenderingComponent;
	}

	function areHookInputsEqual(nextDeps, prevDeps) {
	  if (prevDeps === null) {
	    {
	      error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
	    }

	    return false;
	  }

	  {
	    // Don't bother comparing lengths in prod because these arrays should be
	    // passed inline.
	    if (nextDeps.length !== prevDeps.length) {
	      error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
	    }
	  }

	  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
	    if (objectIs(nextDeps[i], prevDeps[i])) {
	      continue;
	    }

	    return false;
	  }

	  return true;
	}

	function createHook() {
	  if (numberOfReRenders > 0) {
	    {
	      {
	        throw Error( "Rendered more hooks than during the previous render" );
	      }
	    }
	  }

	  return {
	    memoizedState: null,
	    queue: null,
	    next: null
	  };
	}

	function createWorkInProgressHook() {
	  if (workInProgressHook === null) {
	    // This is the first hook in the list
	    if (firstWorkInProgressHook === null) {
	      isReRender = false;
	      firstWorkInProgressHook = workInProgressHook = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = firstWorkInProgressHook;
	    }
	  } else {
	    if (workInProgressHook.next === null) {
	      isReRender = false; // Append to the end of the list

	      workInProgressHook = workInProgressHook.next = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = workInProgressHook.next;
	    }
	  }

	  return workInProgressHook;
	}

	function prepareToUseHooks(componentIdentity) {
	  currentlyRenderingComponent = componentIdentity;

	  {
	    isInHookUserCodeInDev = false;
	  } // The following should have already been reset
	  // didScheduleRenderPhaseUpdate = false;
	  // firstWorkInProgressHook = null;
	  // numberOfReRenders = 0;
	  // renderPhaseUpdates = null;
	  // workInProgressHook = null;

	}
	function finishHooks(Component, props, children, refOrContext) {
	  // This must be called after every function component to prevent hooks from
	  // being used in classes.
	  while (didScheduleRenderPhaseUpdate) {
	    // Updates were scheduled during the render phase. They are stored in
	    // the `renderPhaseUpdates` map. Call the component again, reusing the
	    // work-in-progress hooks and applying the additional updates on top. Keep
	    // restarting until no more updates are scheduled.
	    didScheduleRenderPhaseUpdate = false;
	    numberOfReRenders += 1; // Start over from the beginning of the list

	    workInProgressHook = null;
	    children = Component(props, refOrContext);
	  }

	  resetHooksState();
	  return children;
	} // Reset the internal hooks state if an error occurs while rendering a component

	function resetHooksState() {
	  {
	    isInHookUserCodeInDev = false;
	  }

	  currentlyRenderingComponent = null;
	  didScheduleRenderPhaseUpdate = false;
	  firstWorkInProgressHook = null;
	  numberOfReRenders = 0;
	  renderPhaseUpdates = null;
	  workInProgressHook = null;
	}

	function readContext(context, observedBits) {
	  var threadID = currentPartialRenderer.threadID;
	  validateContextBounds(context, threadID);

	  {
	    if (isInHookUserCodeInDev) {
	      error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
	    }
	  }

	  return context[threadID];
	}

	function useContext(context, observedBits) {
	  {
	    currentHookNameInDev = 'useContext';
	  }

	  resolveCurrentlyRenderingComponent();
	  var threadID = currentPartialRenderer.threadID;
	  validateContextBounds(context, threadID);
	  return context[threadID];
	}

	function basicStateReducer(state, action) {
	  // $FlowFixMe: Flow doesn't like mixed types
	  return typeof action === 'function' ? action(state) : action;
	}

	function useState(initialState) {
	  {
	    currentHookNameInDev = 'useState';
	  }

	  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
	  initialState);
	}
	function useReducer(reducer, initialArg, init) {
	  {
	    if (reducer !== basicStateReducer) {
	      currentHookNameInDev = 'useReducer';
	    }
	  }

	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();

	  if (isReRender) {
	    // This is a re-render. Apply the new render phase updates to the previous
	    // current hook.
	    var queue = workInProgressHook.queue;
	    var dispatch = queue.dispatch;

	    if (renderPhaseUpdates !== null) {
	      // Render phase updates are stored in a map of queue -> linked list
	      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	      if (firstRenderPhaseUpdate !== undefined) {
	        renderPhaseUpdates.delete(queue);
	        var newState = workInProgressHook.memoizedState;
	        var update = firstRenderPhaseUpdate;

	        do {
	          // Process this render phase update. We don't have to check the
	          // priority because it will always be the same as the current
	          // render's.
	          var action = update.action;

	          {
	            isInHookUserCodeInDev = true;
	          }

	          newState = reducer(newState, action);

	          {
	            isInHookUserCodeInDev = false;
	          }

	          update = update.next;
	        } while (update !== null);

	        workInProgressHook.memoizedState = newState;
	        return [newState, dispatch];
	      }
	    }

	    return [workInProgressHook.memoizedState, dispatch];
	  } else {
	    {
	      isInHookUserCodeInDev = true;
	    }

	    var initialState;

	    if (reducer === basicStateReducer) {
	      // Special case for `useState`.
	      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
	    } else {
	      initialState = init !== undefined ? init(initialArg) : initialArg;
	    }

	    {
	      isInHookUserCodeInDev = false;
	    }

	    workInProgressHook.memoizedState = initialState;

	    var _queue = workInProgressHook.queue = {
	      last: null,
	      dispatch: null
	    };

	    var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

	    return [workInProgressHook.memoizedState, _dispatch];
	  }
	}

	function useMemo(nextCreate, deps) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var nextDeps = deps === undefined ? null : deps;

	  if (workInProgressHook !== null) {
	    var prevState = workInProgressHook.memoizedState;

	    if (prevState !== null) {
	      if (nextDeps !== null) {
	        var prevDeps = prevState[1];

	        if (areHookInputsEqual(nextDeps, prevDeps)) {
	          return prevState[0];
	        }
	      }
	    }
	  }

	  {
	    isInHookUserCodeInDev = true;
	  }

	  var nextValue = nextCreate();

	  {
	    isInHookUserCodeInDev = false;
	  }

	  workInProgressHook.memoizedState = [nextValue, nextDeps];
	  return nextValue;
	}

	function useRef(initialValue) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var previousRef = workInProgressHook.memoizedState;

	  if (previousRef === null) {
	    var ref = {
	      current: initialValue
	    };

	    {
	      Object.seal(ref);
	    }

	    workInProgressHook.memoizedState = ref;
	    return ref;
	  } else {
	    return previousRef;
	  }
	}

	function useLayoutEffect(create, inputs) {
	  {
	    currentHookNameInDev = 'useLayoutEffect';

	    error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://reactjs.org/link/uselayouteffect-ssr for common fixes.');
	  }
	}

	function dispatchAction(componentIdentity, queue, action) {
	  if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
	    {
	      throw Error( "Too many re-renders. React limits the number of renders to prevent an infinite loop." );
	    }
	  }

	  if (componentIdentity === currentlyRenderingComponent) {
	    // This is a render phase update. Stash it in a lazily-created map of
	    // queue -> linked list of updates. After this render pass, we'll restart
	    // and apply the stashed updates on top of the work-in-progress hook.
	    didScheduleRenderPhaseUpdate = true;
	    var update = {
	      action: action,
	      next: null
	    };

	    if (renderPhaseUpdates === null) {
	      renderPhaseUpdates = new Map();
	    }

	    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	    if (firstRenderPhaseUpdate === undefined) {
	      renderPhaseUpdates.set(queue, update);
	    } else {
	      // Append the update to the end of the list.
	      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

	      while (lastRenderPhaseUpdate.next !== null) {
	        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
	      }

	      lastRenderPhaseUpdate.next = update;
	    }
	  }
	}

	function useCallback(callback, deps) {
	  return useMemo(function () {
	    return callback;
	  }, deps);
	} // TODO Decide on how to implement this hook for server rendering.
	// If a mutation occurs during render, consider triggering a Suspense boundary
	// and falling back to client rendering.

	function useMutableSource(source, getSnapshot, subscribe) {
	  resolveCurrentlyRenderingComponent();
	  return getSnapshot(source._source);
	}

	function useDeferredValue(value) {
	  resolveCurrentlyRenderingComponent();
	  return value;
	}

	function useTransition() {
	  resolveCurrentlyRenderingComponent();

	  var startTransition = function (callback) {
	    callback();
	  };

	  return [startTransition, false];
	}

	function useOpaqueIdentifier() {
	  return (currentPartialRenderer.identifierPrefix || '') + 'R:' + (currentPartialRenderer.uniqueID++).toString(36);
	}

	function noop() {}

	var currentPartialRenderer = null;
	function setCurrentPartialRenderer(renderer) {
	  currentPartialRenderer = renderer;
	}
	var Dispatcher = {
	  readContext: readContext,
	  useContext: useContext,
	  useMemo: useMemo,
	  useReducer: useReducer,
	  useRef: useRef,
	  useState: useState,
	  useLayoutEffect: useLayoutEffect,
	  useCallback: useCallback,
	  // useImperativeHandle is not run in the server environment
	  useImperativeHandle: noop,
	  // Effects are not run in the server environment.
	  useEffect: noop,
	  // Debugging effect
	  useDebugValue: noop,
	  useDeferredValue: useDeferredValue,
	  useTransition: useTransition,
	  useOpaqueIdentifier: useOpaqueIdentifier,
	  // Subscriptions are not setup in a server environment.
	  useMutableSource: useMutableSource
	};

	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
	var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
	var Namespaces = {
	  html: HTML_NAMESPACE,
	  mathml: MATH_NAMESPACE,
	  svg: SVG_NAMESPACE
	}; // Assumes there is no parent namespace.

	function getIntrinsicNamespace(type) {
	  switch (type) {
	    case 'svg':
	      return SVG_NAMESPACE;

	    case 'math':
	      return MATH_NAMESPACE;

	    default:
	      return HTML_NAMESPACE;
	  }
	}
	function getChildNamespace(parentNamespace, type) {
	  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
	    // No (or default) parent namespace: potential entry point.
	    return getIntrinsicNamespace(type);
	  }

	  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
	    // We're leaving SVG.
	    return HTML_NAMESPACE;
	  } // By default, pass namespace below.


	  return parentNamespace;
	}

	var hasReadOnlyValue = {
	  button: true,
	  checkbox: true,
	  image: true,
	  hidden: true,
	  radio: true,
	  reset: true,
	  submit: true
	};
	function checkControlledValueProps(tagName, props) {
	  {
	    if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
	      error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }

	    if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
	      error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }
	  }
	}

	// For HTML, certain tags should omit their close tag. We keep a list for
	// those special-case tags.
	var omittedCloseTags = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true // NOTE: menuitem's close tag should be omitted, but that causes problems.

	};

	// `omittedCloseTags` except that `menuitem` should still have its closing tag.

	var voidElementTags = _assign({
	  menuitem: true
	}, omittedCloseTags);

	var HTML = '__html';

	function assertValidProps(tag, props) {
	  if (!props) {
	    return;
	  } // Note the use of `==` which checks for null or undefined.


	  if (voidElementTags[tag]) {
	    if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
	      {
	        throw Error( tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`." );
	      }
	    }
	  }

	  if (props.dangerouslySetInnerHTML != null) {
	    if (!(props.children == null)) {
	      {
	        throw Error( "Can only set one of `children` or `props.dangerouslySetInnerHTML`." );
	      }
	    }

	    if (!(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML)) {
	      {
	        throw Error( "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information." );
	      }
	    }
	  }

	  {
	    if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
	      error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
	    }
	  }

	  if (!(props.style == null || typeof props.style === 'object')) {
	    {
	      throw Error( "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX." );
	    }
	  }
	}

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  columns: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridArea: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */

	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */


	var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */

	function dangerousStyleValue(name, value, isCustomProperty) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901
	  var isEmpty = value == null || typeof value === 'boolean' || value === '';

	  if (isEmpty) {
	    return '';
	  }

	  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
	    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
	  }

	  return ('' + value).trim();
	}

	var uppercasePattern = /([A-Z])/g;
	var msPattern = /^ms-/;
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 */

	function hyphenateStyleName(name) {
	  return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
	}

	function isCustomComponent(tagName, props) {
	  if (tagName.indexOf('-') === -1) {
	    return typeof props.is === 'string';
	  }

	  switch (tagName) {
	    // These are reserved SVG and MathML elements.
	    // We don't mind this list too much because we expect it to never grow.
	    // The alternative is to track the namespace in a few places which is convoluted.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      return false;

	    default:
	      return true;
	  }
	}

	var warnValidStyle = function () {};

	{
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
	  var msPattern$1 = /^-ms-/;
	  var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

	  var badStyleValueWithSemicolonPattern = /;\s*$/;
	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;
	  var warnedForInfinityValue = false;

	  var camelize = function (string) {
	    return string.replace(hyphenPattern, function (_, character) {
	      return character.toUpperCase();
	    });
	  };

	  var warnHyphenatedStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
	    // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	    // is converted to lowercase `ms`.
	    camelize(name.replace(msPattern$1, 'ms-')));
	  };

	  var warnBadVendoredStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
	  };

	  var warnStyleValueWithSemicolon = function (name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;

	    error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
	  };

	  var warnStyleValueIsNaN = function (name, value) {
	    if (warnedForNaNValue) {
	      return;
	    }

	    warnedForNaNValue = true;

	    error('`NaN` is an invalid value for the `%s` css style property.', name);
	  };

	  var warnStyleValueIsInfinity = function (name, value) {
	    if (warnedForInfinityValue) {
	      return;
	    }

	    warnedForInfinityValue = true;

	    error('`Infinity` is an invalid value for the `%s` css style property.', name);
	  };

	  warnValidStyle = function (name, value) {
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }

	    if (typeof value === 'number') {
	      if (isNaN(value)) {
	        warnStyleValueIsNaN(name, value);
	      } else if (!isFinite(value)) {
	        warnStyleValueIsInfinity(name, value);
	      }
	    }
	  };
	}

	var warnValidStyle$1 = warnValidStyle;

	var ariaProperties = {
	  'aria-current': 0,
	  // state
	  'aria-details': 0,
	  'aria-disabled': 0,
	  // state
	  'aria-hidden': 0,
	  // state
	  'aria-invalid': 0,
	  // state
	  'aria-keyshortcuts': 0,
	  'aria-label': 0,
	  'aria-roledescription': 0,
	  // Widget Attributes
	  'aria-autocomplete': 0,
	  'aria-checked': 0,
	  'aria-expanded': 0,
	  'aria-haspopup': 0,
	  'aria-level': 0,
	  'aria-modal': 0,
	  'aria-multiline': 0,
	  'aria-multiselectable': 0,
	  'aria-orientation': 0,
	  'aria-placeholder': 0,
	  'aria-pressed': 0,
	  'aria-readonly': 0,
	  'aria-required': 0,
	  'aria-selected': 0,
	  'aria-sort': 0,
	  'aria-valuemax': 0,
	  'aria-valuemin': 0,
	  'aria-valuenow': 0,
	  'aria-valuetext': 0,
	  // Live Region Attributes
	  'aria-atomic': 0,
	  'aria-busy': 0,
	  'aria-live': 0,
	  'aria-relevant': 0,
	  // Drag-and-Drop Attributes
	  'aria-dropeffect': 0,
	  'aria-grabbed': 0,
	  // Relationship Attributes
	  'aria-activedescendant': 0,
	  'aria-colcount': 0,
	  'aria-colindex': 0,
	  'aria-colspan': 0,
	  'aria-controls': 0,
	  'aria-describedby': 0,
	  'aria-errormessage': 0,
	  'aria-flowto': 0,
	  'aria-labelledby': 0,
	  'aria-owns': 0,
	  'aria-posinset': 0,
	  'aria-rowcount': 0,
	  'aria-rowindex': 0,
	  'aria-rowspan': 0,
	  'aria-setsize': 0
	};

	var warnedProperties = {};
	var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	function validateProperty(tagName, name) {
	  {
	    if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
	      return true;
	    }

	    if (rARIACamel.test(name)) {
	      var ariaName = 'aria-' + name.slice(4).toLowerCase();
	      var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (correctName == null) {
	        error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);

	        warnedProperties[name] = true;
	        return true;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== correctName) {
	        error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }

	    if (rARIA.test(name)) {
	      var lowerCasedName = name.toLowerCase();
	      var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (standardName == null) {
	        warnedProperties[name] = true;
	        return false;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== standardName) {
	        error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }
	  }

	  return true;
	}

	function warnInvalidARIAProps(type, props) {
	  {
	    var invalidProps = [];

	    for (var key in props) {
	      var isValid = validateProperty(type, key);

	      if (!isValid) {
	        invalidProps.push(key);
	      }
	    }

	    var unknownPropString = invalidProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (invalidProps.length === 1) {
	      error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    } else if (invalidProps.length > 1) {
	      error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    }
	  }
	}

	function validateProperties(type, props) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnInvalidARIAProps(type, props);
	}

	var didWarnValueNull = false;
	function validateProperties$1(type, props) {
	  {
	    if (type !== 'input' && type !== 'textarea' && type !== 'select') {
	      return;
	    }

	    if (props != null && props.value === null && !didWarnValueNull) {
	      didWarnValueNull = true;

	      if (type === 'select' && props.multiple) {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
	      } else {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
	      }
	    }
	  }
	}

	// When adding attributes to the HTML or SVG allowed attribute list, be sure to
	// also add them to this module to ensure casing and incorrect name
	// warnings.
	var possibleStandardNames = {
	  // HTML
	  accept: 'accept',
	  acceptcharset: 'acceptCharset',
	  'accept-charset': 'acceptCharset',
	  accesskey: 'accessKey',
	  action: 'action',
	  allowfullscreen: 'allowFullScreen',
	  alt: 'alt',
	  as: 'as',
	  async: 'async',
	  autocapitalize: 'autoCapitalize',
	  autocomplete: 'autoComplete',
	  autocorrect: 'autoCorrect',
	  autofocus: 'autoFocus',
	  autoplay: 'autoPlay',
	  autosave: 'autoSave',
	  capture: 'capture',
	  cellpadding: 'cellPadding',
	  cellspacing: 'cellSpacing',
	  challenge: 'challenge',
	  charset: 'charSet',
	  checked: 'checked',
	  children: 'children',
	  cite: 'cite',
	  class: 'className',
	  classid: 'classID',
	  classname: 'className',
	  cols: 'cols',
	  colspan: 'colSpan',
	  content: 'content',
	  contenteditable: 'contentEditable',
	  contextmenu: 'contextMenu',
	  controls: 'controls',
	  controlslist: 'controlsList',
	  coords: 'coords',
	  crossorigin: 'crossOrigin',
	  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
	  data: 'data',
	  datetime: 'dateTime',
	  default: 'default',
	  defaultchecked: 'defaultChecked',
	  defaultvalue: 'defaultValue',
	  defer: 'defer',
	  dir: 'dir',
	  disabled: 'disabled',
	  disablepictureinpicture: 'disablePictureInPicture',
	  disableremoteplayback: 'disableRemotePlayback',
	  download: 'download',
	  draggable: 'draggable',
	  enctype: 'encType',
	  enterkeyhint: 'enterKeyHint',
	  for: 'htmlFor',
	  form: 'form',
	  formmethod: 'formMethod',
	  formaction: 'formAction',
	  formenctype: 'formEncType',
	  formnovalidate: 'formNoValidate',
	  formtarget: 'formTarget',
	  frameborder: 'frameBorder',
	  headers: 'headers',
	  height: 'height',
	  hidden: 'hidden',
	  high: 'high',
	  href: 'href',
	  hreflang: 'hrefLang',
	  htmlfor: 'htmlFor',
	  httpequiv: 'httpEquiv',
	  'http-equiv': 'httpEquiv',
	  icon: 'icon',
	  id: 'id',
	  innerhtml: 'innerHTML',
	  inputmode: 'inputMode',
	  integrity: 'integrity',
	  is: 'is',
	  itemid: 'itemID',
	  itemprop: 'itemProp',
	  itemref: 'itemRef',
	  itemscope: 'itemScope',
	  itemtype: 'itemType',
	  keyparams: 'keyParams',
	  keytype: 'keyType',
	  kind: 'kind',
	  label: 'label',
	  lang: 'lang',
	  list: 'list',
	  loop: 'loop',
	  low: 'low',
	  manifest: 'manifest',
	  marginwidth: 'marginWidth',
	  marginheight: 'marginHeight',
	  max: 'max',
	  maxlength: 'maxLength',
	  media: 'media',
	  mediagroup: 'mediaGroup',
	  method: 'method',
	  min: 'min',
	  minlength: 'minLength',
	  multiple: 'multiple',
	  muted: 'muted',
	  name: 'name',
	  nomodule: 'noModule',
	  nonce: 'nonce',
	  novalidate: 'noValidate',
	  open: 'open',
	  optimum: 'optimum',
	  pattern: 'pattern',
	  placeholder: 'placeholder',
	  playsinline: 'playsInline',
	  poster: 'poster',
	  preload: 'preload',
	  profile: 'profile',
	  radiogroup: 'radioGroup',
	  readonly: 'readOnly',
	  referrerpolicy: 'referrerPolicy',
	  rel: 'rel',
	  required: 'required',
	  reversed: 'reversed',
	  role: 'role',
	  rows: 'rows',
	  rowspan: 'rowSpan',
	  sandbox: 'sandbox',
	  scope: 'scope',
	  scoped: 'scoped',
	  scrolling: 'scrolling',
	  seamless: 'seamless',
	  selected: 'selected',
	  shape: 'shape',
	  size: 'size',
	  sizes: 'sizes',
	  span: 'span',
	  spellcheck: 'spellCheck',
	  src: 'src',
	  srcdoc: 'srcDoc',
	  srclang: 'srcLang',
	  srcset: 'srcSet',
	  start: 'start',
	  step: 'step',
	  style: 'style',
	  summary: 'summary',
	  tabindex: 'tabIndex',
	  target: 'target',
	  title: 'title',
	  type: 'type',
	  usemap: 'useMap',
	  value: 'value',
	  width: 'width',
	  wmode: 'wmode',
	  wrap: 'wrap',
	  // SVG
	  about: 'about',
	  accentheight: 'accentHeight',
	  'accent-height': 'accentHeight',
	  accumulate: 'accumulate',
	  additive: 'additive',
	  alignmentbaseline: 'alignmentBaseline',
	  'alignment-baseline': 'alignmentBaseline',
	  allowreorder: 'allowReorder',
	  alphabetic: 'alphabetic',
	  amplitude: 'amplitude',
	  arabicform: 'arabicForm',
	  'arabic-form': 'arabicForm',
	  ascent: 'ascent',
	  attributename: 'attributeName',
	  attributetype: 'attributeType',
	  autoreverse: 'autoReverse',
	  azimuth: 'azimuth',
	  basefrequency: 'baseFrequency',
	  baselineshift: 'baselineShift',
	  'baseline-shift': 'baselineShift',
	  baseprofile: 'baseProfile',
	  bbox: 'bbox',
	  begin: 'begin',
	  bias: 'bias',
	  by: 'by',
	  calcmode: 'calcMode',
	  capheight: 'capHeight',
	  'cap-height': 'capHeight',
	  clip: 'clip',
	  clippath: 'clipPath',
	  'clip-path': 'clipPath',
	  clippathunits: 'clipPathUnits',
	  cliprule: 'clipRule',
	  'clip-rule': 'clipRule',
	  color: 'color',
	  colorinterpolation: 'colorInterpolation',
	  'color-interpolation': 'colorInterpolation',
	  colorinterpolationfilters: 'colorInterpolationFilters',
	  'color-interpolation-filters': 'colorInterpolationFilters',
	  colorprofile: 'colorProfile',
	  'color-profile': 'colorProfile',
	  colorrendering: 'colorRendering',
	  'color-rendering': 'colorRendering',
	  contentscripttype: 'contentScriptType',
	  contentstyletype: 'contentStyleType',
	  cursor: 'cursor',
	  cx: 'cx',
	  cy: 'cy',
	  d: 'd',
	  datatype: 'datatype',
	  decelerate: 'decelerate',
	  descent: 'descent',
	  diffuseconstant: 'diffuseConstant',
	  direction: 'direction',
	  display: 'display',
	  divisor: 'divisor',
	  dominantbaseline: 'dominantBaseline',
	  'dominant-baseline': 'dominantBaseline',
	  dur: 'dur',
	  dx: 'dx',
	  dy: 'dy',
	  edgemode: 'edgeMode',
	  elevation: 'elevation',
	  enablebackground: 'enableBackground',
	  'enable-background': 'enableBackground',
	  end: 'end',
	  exponent: 'exponent',
	  externalresourcesrequired: 'externalResourcesRequired',
	  fill: 'fill',
	  fillopacity: 'fillOpacity',
	  'fill-opacity': 'fillOpacity',
	  fillrule: 'fillRule',
	  'fill-rule': 'fillRule',
	  filter: 'filter',
	  filterres: 'filterRes',
	  filterunits: 'filterUnits',
	  floodopacity: 'floodOpacity',
	  'flood-opacity': 'floodOpacity',
	  floodcolor: 'floodColor',
	  'flood-color': 'floodColor',
	  focusable: 'focusable',
	  fontfamily: 'fontFamily',
	  'font-family': 'fontFamily',
	  fontsize: 'fontSize',
	  'font-size': 'fontSize',
	  fontsizeadjust: 'fontSizeAdjust',
	  'font-size-adjust': 'fontSizeAdjust',
	  fontstretch: 'fontStretch',
	  'font-stretch': 'fontStretch',
	  fontstyle: 'fontStyle',
	  'font-style': 'fontStyle',
	  fontvariant: 'fontVariant',
	  'font-variant': 'fontVariant',
	  fontweight: 'fontWeight',
	  'font-weight': 'fontWeight',
	  format: 'format',
	  from: 'from',
	  fx: 'fx',
	  fy: 'fy',
	  g1: 'g1',
	  g2: 'g2',
	  glyphname: 'glyphName',
	  'glyph-name': 'glyphName',
	  glyphorientationhorizontal: 'glyphOrientationHorizontal',
	  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
	  glyphorientationvertical: 'glyphOrientationVertical',
	  'glyph-orientation-vertical': 'glyphOrientationVertical',
	  glyphref: 'glyphRef',
	  gradienttransform: 'gradientTransform',
	  gradientunits: 'gradientUnits',
	  hanging: 'hanging',
	  horizadvx: 'horizAdvX',
	  'horiz-adv-x': 'horizAdvX',
	  horizoriginx: 'horizOriginX',
	  'horiz-origin-x': 'horizOriginX',
	  ideographic: 'ideographic',
	  imagerendering: 'imageRendering',
	  'image-rendering': 'imageRendering',
	  in2: 'in2',
	  in: 'in',
	  inlist: 'inlist',
	  intercept: 'intercept',
	  k1: 'k1',
	  k2: 'k2',
	  k3: 'k3',
	  k4: 'k4',
	  k: 'k',
	  kernelmatrix: 'kernelMatrix',
	  kernelunitlength: 'kernelUnitLength',
	  kerning: 'kerning',
	  keypoints: 'keyPoints',
	  keysplines: 'keySplines',
	  keytimes: 'keyTimes',
	  lengthadjust: 'lengthAdjust',
	  letterspacing: 'letterSpacing',
	  'letter-spacing': 'letterSpacing',
	  lightingcolor: 'lightingColor',
	  'lighting-color': 'lightingColor',
	  limitingconeangle: 'limitingConeAngle',
	  local: 'local',
	  markerend: 'markerEnd',
	  'marker-end': 'markerEnd',
	  markerheight: 'markerHeight',
	  markermid: 'markerMid',
	  'marker-mid': 'markerMid',
	  markerstart: 'markerStart',
	  'marker-start': 'markerStart',
	  markerunits: 'markerUnits',
	  markerwidth: 'markerWidth',
	  mask: 'mask',
	  maskcontentunits: 'maskContentUnits',
	  maskunits: 'maskUnits',
	  mathematical: 'mathematical',
	  mode: 'mode',
	  numoctaves: 'numOctaves',
	  offset: 'offset',
	  opacity: 'opacity',
	  operator: 'operator',
	  order: 'order',
	  orient: 'orient',
	  orientation: 'orientation',
	  origin: 'origin',
	  overflow: 'overflow',
	  overlineposition: 'overlinePosition',
	  'overline-position': 'overlinePosition',
	  overlinethickness: 'overlineThickness',
	  'overline-thickness': 'overlineThickness',
	  paintorder: 'paintOrder',
	  'paint-order': 'paintOrder',
	  panose1: 'panose1',
	  'panose-1': 'panose1',
	  pathlength: 'pathLength',
	  patterncontentunits: 'patternContentUnits',
	  patterntransform: 'patternTransform',
	  patternunits: 'patternUnits',
	  pointerevents: 'pointerEvents',
	  'pointer-events': 'pointerEvents',
	  points: 'points',
	  pointsatx: 'pointsAtX',
	  pointsaty: 'pointsAtY',
	  pointsatz: 'pointsAtZ',
	  prefix: 'prefix',
	  preservealpha: 'preserveAlpha',
	  preserveaspectratio: 'preserveAspectRatio',
	  primitiveunits: 'primitiveUnits',
	  property: 'property',
	  r: 'r',
	  radius: 'radius',
	  refx: 'refX',
	  refy: 'refY',
	  renderingintent: 'renderingIntent',
	  'rendering-intent': 'renderingIntent',
	  repeatcount: 'repeatCount',
	  repeatdur: 'repeatDur',
	  requiredextensions: 'requiredExtensions',
	  requiredfeatures: 'requiredFeatures',
	  resource: 'resource',
	  restart: 'restart',
	  result: 'result',
	  results: 'results',
	  rotate: 'rotate',
	  rx: 'rx',
	  ry: 'ry',
	  scale: 'scale',
	  security: 'security',
	  seed: 'seed',
	  shaperendering: 'shapeRendering',
	  'shape-rendering': 'shapeRendering',
	  slope: 'slope',
	  spacing: 'spacing',
	  specularconstant: 'specularConstant',
	  specularexponent: 'specularExponent',
	  speed: 'speed',
	  spreadmethod: 'spreadMethod',
	  startoffset: 'startOffset',
	  stddeviation: 'stdDeviation',
	  stemh: 'stemh',
	  stemv: 'stemv',
	  stitchtiles: 'stitchTiles',
	  stopcolor: 'stopColor',
	  'stop-color': 'stopColor',
	  stopopacity: 'stopOpacity',
	  'stop-opacity': 'stopOpacity',
	  strikethroughposition: 'strikethroughPosition',
	  'strikethrough-position': 'strikethroughPosition',
	  strikethroughthickness: 'strikethroughThickness',
	  'strikethrough-thickness': 'strikethroughThickness',
	  string: 'string',
	  stroke: 'stroke',
	  strokedasharray: 'strokeDasharray',
	  'stroke-dasharray': 'strokeDasharray',
	  strokedashoffset: 'strokeDashoffset',
	  'stroke-dashoffset': 'strokeDashoffset',
	  strokelinecap: 'strokeLinecap',
	  'stroke-linecap': 'strokeLinecap',
	  strokelinejoin: 'strokeLinejoin',
	  'stroke-linejoin': 'strokeLinejoin',
	  strokemiterlimit: 'strokeMiterlimit',
	  'stroke-miterlimit': 'strokeMiterlimit',
	  strokewidth: 'strokeWidth',
	  'stroke-width': 'strokeWidth',
	  strokeopacity: 'strokeOpacity',
	  'stroke-opacity': 'strokeOpacity',
	  suppresscontenteditablewarning: 'suppressContentEditableWarning',
	  suppresshydrationwarning: 'suppressHydrationWarning',
	  surfacescale: 'surfaceScale',
	  systemlanguage: 'systemLanguage',
	  tablevalues: 'tableValues',
	  targetx: 'targetX',
	  targety: 'targetY',
	  textanchor: 'textAnchor',
	  'text-anchor': 'textAnchor',
	  textdecoration: 'textDecoration',
	  'text-decoration': 'textDecoration',
	  textlength: 'textLength',
	  textrendering: 'textRendering',
	  'text-rendering': 'textRendering',
	  to: 'to',
	  transform: 'transform',
	  typeof: 'typeof',
	  u1: 'u1',
	  u2: 'u2',
	  underlineposition: 'underlinePosition',
	  'underline-position': 'underlinePosition',
	  underlinethickness: 'underlineThickness',
	  'underline-thickness': 'underlineThickness',
	  unicode: 'unicode',
	  unicodebidi: 'unicodeBidi',
	  'unicode-bidi': 'unicodeBidi',
	  unicoderange: 'unicodeRange',
	  'unicode-range': 'unicodeRange',
	  unitsperem: 'unitsPerEm',
	  'units-per-em': 'unitsPerEm',
	  unselectable: 'unselectable',
	  valphabetic: 'vAlphabetic',
	  'v-alphabetic': 'vAlphabetic',
	  values: 'values',
	  vectoreffect: 'vectorEffect',
	  'vector-effect': 'vectorEffect',
	  version: 'version',
	  vertadvy: 'vertAdvY',
	  'vert-adv-y': 'vertAdvY',
	  vertoriginx: 'vertOriginX',
	  'vert-origin-x': 'vertOriginX',
	  vertoriginy: 'vertOriginY',
	  'vert-origin-y': 'vertOriginY',
	  vhanging: 'vHanging',
	  'v-hanging': 'vHanging',
	  videographic: 'vIdeographic',
	  'v-ideographic': 'vIdeographic',
	  viewbox: 'viewBox',
	  viewtarget: 'viewTarget',
	  visibility: 'visibility',
	  vmathematical: 'vMathematical',
	  'v-mathematical': 'vMathematical',
	  vocab: 'vocab',
	  widths: 'widths',
	  wordspacing: 'wordSpacing',
	  'word-spacing': 'wordSpacing',
	  writingmode: 'writingMode',
	  'writing-mode': 'writingMode',
	  x1: 'x1',
	  x2: 'x2',
	  x: 'x',
	  xchannelselector: 'xChannelSelector',
	  xheight: 'xHeight',
	  'x-height': 'xHeight',
	  xlinkactuate: 'xlinkActuate',
	  'xlink:actuate': 'xlinkActuate',
	  xlinkarcrole: 'xlinkArcrole',
	  'xlink:arcrole': 'xlinkArcrole',
	  xlinkhref: 'xlinkHref',
	  'xlink:href': 'xlinkHref',
	  xlinkrole: 'xlinkRole',
	  'xlink:role': 'xlinkRole',
	  xlinkshow: 'xlinkShow',
	  'xlink:show': 'xlinkShow',
	  xlinktitle: 'xlinkTitle',
	  'xlink:title': 'xlinkTitle',
	  xlinktype: 'xlinkType',
	  'xlink:type': 'xlinkType',
	  xmlbase: 'xmlBase',
	  'xml:base': 'xmlBase',
	  xmllang: 'xmlLang',
	  'xml:lang': 'xmlLang',
	  xmlns: 'xmlns',
	  'xml:space': 'xmlSpace',
	  xmlnsxlink: 'xmlnsXlink',
	  'xmlns:xlink': 'xmlnsXlink',
	  xmlspace: 'xmlSpace',
	  y1: 'y1',
	  y2: 'y2',
	  y: 'y',
	  ychannelselector: 'yChannelSelector',
	  z: 'z',
	  zoomandpan: 'zoomAndPan'
	};

	var validateProperty$1 = function () {};

	{
	  var warnedProperties$1 = {};
	  var _hasOwnProperty = Object.prototype.hasOwnProperty;
	  var EVENT_NAME_REGEX = /^on./;
	  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
	  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

	  validateProperty$1 = function (tagName, name, value, eventRegistry) {
	    if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
	      return true;
	    }

	    var lowerCasedName = name.toLowerCase();

	    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
	      error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');

	      warnedProperties$1[name] = true;
	      return true;
	    } // We can't rely on the event system being injected on the server.


	    if (eventRegistry != null) {
	      var registrationNameDependencies = eventRegistry.registrationNameDependencies,
	          possibleRegistrationNames = eventRegistry.possibleRegistrationNames;

	      if (registrationNameDependencies.hasOwnProperty(name)) {
	        return true;
	      }

	      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

	      if (registrationName != null) {
	        error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);

	        warnedProperties$1[name] = true;
	        return true;
	      }

	      if (EVENT_NAME_REGEX.test(name)) {
	        error('Unknown event handler property `%s`. It will be ignored.', name);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (EVENT_NAME_REGEX.test(name)) {
	      // If no event plugins have been injected, we are in a server environment.
	      // So we can't tell if the event name is correct for sure, but we can filter
	      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
	      if (INVALID_EVENT_NAME_REGEX.test(name)) {
	        error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Let the ARIA attribute hook validate ARIA attributes


	    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
	      return true;
	    }

	    if (lowerCasedName === 'innerhtml') {
	      error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'aria') {
	      error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
	      error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'number' && isNaN(value)) {
	      error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    var propertyInfo = getPropertyInfo(name);
	    var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

	    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
	      var standardName = possibleStandardNames[lowerCasedName];

	      if (standardName !== name) {
	        error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (!isReserved && name !== lowerCasedName) {
	      // Unknown attributes should have lowercase casing since that's how they
	      // will be cased anyway with server rendering.
	      error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      if (value) {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
	      } else {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Now that we've validated casing, do not validate
	    // data types for reserved props


	    if (isReserved) {
	      return true;
	    } // Warn when a known attribute is a bad type


	    if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      warnedProperties$1[name] = true;
	      return false;
	    } // Warn when passing the strings 'false' or 'true' into a boolean prop


	    if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
	      error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    return true;
	  };
	}

	var warnUnknownProperties = function (type, props, eventRegistry) {
	  {
	    var unknownProps = [];

	    for (var key in props) {
	      var isValid = validateProperty$1(type, key, props[key], eventRegistry);

	      if (!isValid) {
	        unknownProps.push(key);
	      }
	    }

	    var unknownPropString = unknownProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (unknownProps.length === 1) {
	      error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    } else if (unknownProps.length > 1) {
	      error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    }
	  }
	};

	function validateProperties$2(type, props, eventRegistry) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnUnknownProperties(type, props, eventRegistry);
	}

	var toArray = React.Children.toArray; // This is only used in DEV.
	// Each entry is `this.stack` from a currently executing renderer instance.
	// (There may be more than one because ReactDOMServer is reentrant).
	// Each stack is an array of frames which may contain nested stacks of elements.

	var currentDebugStacks = [];
	var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
	var ReactDebugCurrentFrame$1;
	var prevGetCurrentStackImpl = null;

	var getCurrentServerStackImpl = function () {
	  return '';
	};

	var describeStackFrame = function (element) {
	  return '';
	};

	var validatePropertiesInDevelopment = function (type, props) {};

	var pushCurrentDebugStack = function (stack) {};

	var pushElementToDebugStack = function (element) {};

	var popCurrentDebugStack = function () {};

	var hasWarnedAboutUsingContextAsConsumer = false;

	{
	  ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	  validatePropertiesInDevelopment = function (type, props) {
	    validateProperties(type, props);
	    validateProperties$1(type, props);
	    validateProperties$2(type, props, null);
	  };

	  describeStackFrame = function (element) {
	    return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
	  };

	  pushCurrentDebugStack = function (stack) {
	    currentDebugStacks.push(stack);

	    if (currentDebugStacks.length === 1) {
	      // We are entering a server renderer.
	      // Remember the previous (e.g. client) global stack implementation.
	      prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
	      ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl;
	    }
	  };

	  pushElementToDebugStack = function (element) {
	    // For the innermost executing ReactDOMServer call,
	    var stack = currentDebugStacks[currentDebugStacks.length - 1]; // Take the innermost executing frame (e.g. <Foo>),

	    var frame = stack[stack.length - 1]; // and record that it has one more element associated with it.

	    frame.debugElementStack.push(element); // We only need this because we tail-optimize single-element
	    // children and directly handle them in an inner loop instead of
	    // creating separate frames for them.
	  };

	  popCurrentDebugStack = function () {
	    currentDebugStacks.pop();

	    if (currentDebugStacks.length === 0) {
	      // We are exiting the server renderer.
	      // Restore the previous (e.g. client) global stack implementation.
	      ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
	      prevGetCurrentStackImpl = null;
	    }
	  };

	  getCurrentServerStackImpl = function () {
	    if (currentDebugStacks.length === 0) {
	      // Nothing is currently rendering.
	      return '';
	    } // ReactDOMServer is reentrant so there may be multiple calls at the same time.
	    // Take the frames from the innermost call which is the last in the array.


	    var frames = currentDebugStacks[currentDebugStacks.length - 1];
	    var stack = ''; // Go through every frame in the stack from the innermost one.

	    for (var i = frames.length - 1; i >= 0; i--) {
	      var frame = frames[i]; // Every frame might have more than one debug element stack entry associated with it.
	      // This is because single-child nesting doesn't create materialized frames.
	      // Instead it would push them through `pushElementToDebugStack()`.

	      var debugElementStack = frame.debugElementStack;

	      for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
	        stack += describeStackFrame(debugElementStack[ii]);
	      }
	    }

	    return stack;
	  };
	}

	var didWarnDefaultInputValue = false;
	var didWarnDefaultChecked = false;
	var didWarnDefaultSelectValue = false;
	var didWarnDefaultTextareaValue = false;
	var didWarnInvalidOptionChildren = false;
	var didWarnAboutNoopUpdateForComponent = {};
	var didWarnAboutBadClass = {};
	var didWarnAboutModulePatternComponent = {};
	var didWarnAboutDeprecatedWillMount = {};
	var didWarnAboutUndefinedDerivedState = {};
	var didWarnAboutUninitializedState = {};
	var valuePropNames = ['value', 'defaultValue'];
	var newlineEatingTags = {
	  listing: true,
	  pre: true,
	  textarea: true
	}; // We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name

	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

	var validatedTagCache = {};

	function validateDangerousTag(tag) {
	  if (!validatedTagCache.hasOwnProperty(tag)) {
	    if (!VALID_TAG_REGEX.test(tag)) {
	      {
	        throw Error( "Invalid tag: " + tag );
	      }
	    }

	    validatedTagCache[tag] = true;
	  }
	}

	var styleNameCache = {};

	var processStyleName = function (styleName) {
	  if (styleNameCache.hasOwnProperty(styleName)) {
	    return styleNameCache[styleName];
	  }

	  var result = hyphenateStyleName(styleName);
	  styleNameCache[styleName] = result;
	  return result;
	};

	function createMarkupForStyles(styles) {
	  var serialized = '';
	  var delimiter = '';

	  for (var styleName in styles) {
	    if (!styles.hasOwnProperty(styleName)) {
	      continue;
	    }

	    var isCustomProperty = styleName.indexOf('--') === 0;
	    var styleValue = styles[styleName];

	    {
	      if (!isCustomProperty) {
	        warnValidStyle$1(styleName, styleValue);
	      }
	    }

	    if (styleValue != null) {
	      serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ':';
	      serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
	      delimiter = ';';
	    }
	  }

	  return serialized || null;
	}

	function warnNoop(publicInstance, callerName) {
	  {
	    var _constructor = publicInstance.constructor;
	    var componentName = _constructor && getComponentName(_constructor) || 'ReactClass';
	    var warningKey = componentName + '.' + callerName;

	    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
	      return;
	    }

	    error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);

	    didWarnAboutNoopUpdateForComponent[warningKey] = true;
	  }
	}

	function shouldConstruct$1(Component) {
	  return Component.prototype && Component.prototype.isReactComponent;
	}

	function getNonChildrenInnerMarkup(props) {
	  var innerHTML = props.dangerouslySetInnerHTML;

	  if (innerHTML != null) {
	    if (innerHTML.__html != null) {
	      return innerHTML.__html;
	    }
	  } else {
	    var content = props.children;

	    if (typeof content === 'string' || typeof content === 'number') {
	      return escapeTextForBrowser(content);
	    }
	  }

	  return null;
	}

	function flattenTopLevelChildren(children) {
	  if (!React.isValidElement(children)) {
	    return toArray(children);
	  }

	  var element = children;

	  if (element.type !== REACT_FRAGMENT_TYPE) {
	    return [element];
	  }

	  var fragmentChildren = element.props.children;

	  if (!React.isValidElement(fragmentChildren)) {
	    return toArray(fragmentChildren);
	  }

	  var fragmentChildElement = fragmentChildren;
	  return [fragmentChildElement];
	}

	function flattenOptionChildren(children) {
	  if (children === undefined || children === null) {
	    return children;
	  }

	  var content = ''; // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.

	  React.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }

	    content += child;

	    {
	      if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
	        didWarnInvalidOptionChildren = true;

	        error('Only strings and numbers are supported as <option> children.');
	      }
	    }
	  });
	  return content;
	}

	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
	var STYLE = 'style';
	var RESERVED_PROPS = {
	  children: null,
	  dangerouslySetInnerHTML: null,
	  suppressContentEditableWarning: null,
	  suppressHydrationWarning: null
	};

	function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
	  var ret = '<' + tagVerbatim;
	  var isCustomComponent$1 = isCustomComponent(tagLowercase, props);

	  for (var propKey in props) {
	    if (!hasOwnProperty$2.call(props, propKey)) {
	      continue;
	    }

	    var propValue = props[propKey];

	    if (propValue == null) {
	      continue;
	    }

	    if (propKey === STYLE) {
	      propValue = createMarkupForStyles(propValue);
	    }

	    var markup = null;

	    if (isCustomComponent$1) {
	      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	        markup = createMarkupForCustomAttribute(propKey, propValue);
	      }
	    } else {
	      markup = createMarkupForProperty(propKey, propValue);
	    }

	    if (markup) {
	      ret += ' ' + markup;
	    }
	  } // For static pages, no need to put React ID and checksum. Saves lots of
	  // bytes.


	  if (makeStaticMarkup) {
	    return ret;
	  }

	  if (isRootElement) {
	    ret += ' ' + createMarkupForRoot();
	  }

	  return ret;
	}

	function validateRenderResult(child, type) {
	  if (child === undefined) {
	    {
	      {
	        throw Error( (getComponentName(type) || 'Component') + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null." );
	      }
	    }
	  }
	}

	function resolve(child, context, threadID) {
	  while (React.isValidElement(child)) {
	    // Safe because we just checked it's an element.
	    var element = child;
	    var Component = element.type;

	    {
	      pushElementToDebugStack(element);
	    }

	    if (typeof Component !== 'function') {
	      break;
	    }

	    processChild(element, Component);
	  } // Extra closure so queue and replace can be captured properly


	  function processChild(element, Component) {
	    var isClass = shouldConstruct$1(Component);
	    var publicContext = processContext(Component, context, threadID, isClass);
	    var queue = [];
	    var replace = false;
	    var updater = {
	      isMounted: function (publicInstance) {
	        return false;
	      },
	      enqueueForceUpdate: function (publicInstance) {
	        if (queue === null) {
	          warnNoop(publicInstance, 'forceUpdate');
	          return null;
	        }
	      },
	      enqueueReplaceState: function (publicInstance, completeState) {
	        replace = true;
	        queue = [completeState];
	      },
	      enqueueSetState: function (publicInstance, currentPartialState) {
	        if (queue === null) {
	          warnNoop(publicInstance, 'setState');
	          return null;
	        }

	        queue.push(currentPartialState);
	      }
	    };
	    var inst;

	    if (isClass) {
	      inst = new Component(element.props, publicContext, updater);

	      if (typeof Component.getDerivedStateFromProps === 'function') {
	        {
	          if (inst.state === null || inst.state === undefined) {
	            var componentName = getComponentName(Component) || 'Unknown';

	            if (!didWarnAboutUninitializedState[componentName]) {
	              error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, inst.state === null ? 'null' : 'undefined', componentName);

	              didWarnAboutUninitializedState[componentName] = true;
	            }
	          }
	        }

	        var partialState = Component.getDerivedStateFromProps.call(null, element.props, inst.state);

	        {
	          if (partialState === undefined) {
	            var _componentName = getComponentName(Component) || 'Unknown';

	            if (!didWarnAboutUndefinedDerivedState[_componentName]) {
	              error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', _componentName);

	              didWarnAboutUndefinedDerivedState[_componentName] = true;
	            }
	          }
	        }

	        if (partialState != null) {
	          inst.state = _assign({}, inst.state, partialState);
	        }
	      }
	    } else {
	      {
	        if (Component.prototype && typeof Component.prototype.render === 'function') {
	          var _componentName2 = getComponentName(Component) || 'Unknown';

	          if (!didWarnAboutBadClass[_componentName2]) {
	            error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', _componentName2, _componentName2);

	            didWarnAboutBadClass[_componentName2] = true;
	          }
	        }
	      }

	      var componentIdentity = {};
	      prepareToUseHooks(componentIdentity);
	      inst = Component(element.props, publicContext, updater);
	      inst = finishHooks(Component, element.props, inst, publicContext);

	      {
	        // Support for module components is deprecated and is removed behind a flag.
	        // Whether or not it would crash later, we want to show a good message in DEV first.
	        if (inst != null && inst.render != null) {
	          var _componentName3 = getComponentName(Component) || 'Unknown';

	          if (!didWarnAboutModulePatternComponent[_componentName3]) {
	            error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName3, _componentName3, _componentName3);

	            didWarnAboutModulePatternComponent[_componentName3] = true;
	          }
	        }
	      } // If the flag is on, everything is assumed to be a function component.
	      // Otherwise, we also do the unfortunate dynamic checks.


	      if ( inst == null || inst.render == null) {
	        child = inst;
	        validateRenderResult(child, Component);
	        return;
	      }
	    }

	    inst.props = element.props;
	    inst.context = publicContext;
	    inst.updater = updater;
	    var initialState = inst.state;

	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }

	    if (typeof inst.UNSAFE_componentWillMount === 'function' || typeof inst.componentWillMount === 'function') {
	      if (typeof inst.componentWillMount === 'function') {
	        {
	          if ( inst.componentWillMount.__suppressDeprecationWarning !== true) {
	            var _componentName4 = getComponentName(Component) || 'Unknown';

	            if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
	              warn( // keep this warning in sync with ReactStrictModeWarning.js
	              'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', _componentName4);

	              didWarnAboutDeprecatedWillMount[_componentName4] = true;
	            }
	          }
	        } // In order to support react-lifecycles-compat polyfilled components,
	        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.


	        if (typeof Component.getDerivedStateFromProps !== 'function') {
	          inst.componentWillMount();
	        }
	      }

	      if (typeof inst.UNSAFE_componentWillMount === 'function' && typeof Component.getDerivedStateFromProps !== 'function') {
	        // In order to support react-lifecycles-compat polyfilled components,
	        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.
	        inst.UNSAFE_componentWillMount();
	      }

	      if (queue.length) {
	        var oldQueue = queue;
	        var oldReplace = replace;
	        queue = null;
	        replace = false;

	        if (oldReplace && oldQueue.length === 1) {
	          inst.state = oldQueue[0];
	        } else {
	          var nextState = oldReplace ? oldQueue[0] : inst.state;
	          var dontMutate = true;

	          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
	            var partial = oldQueue[i];

	            var _partialState = typeof partial === 'function' ? partial.call(inst, nextState, element.props, publicContext) : partial;

	            if (_partialState != null) {
	              if (dontMutate) {
	                dontMutate = false;
	                nextState = _assign({}, nextState, _partialState);
	              } else {
	                _assign(nextState, _partialState);
	              }
	            }
	          }

	          inst.state = nextState;
	        }
	      } else {
	        queue = null;
	      }
	    }

	    child = inst.render();

	    {
	      if (child === undefined && inst.render._isMockFunction) {
	        // This is probably bad practice. Consider warning here and
	        // deprecating this convenience.
	        child = null;
	      }
	    }

	    validateRenderResult(child, Component);
	    var childContext;

	    {
	      if (typeof inst.getChildContext === 'function') {
	        var _childContextTypes = Component.childContextTypes;

	        if (typeof _childContextTypes === 'object') {
	          childContext = inst.getChildContext();

	          for (var contextKey in childContext) {
	            if (!(contextKey in _childContextTypes)) {
	              {
	                throw Error( (getComponentName(Component) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes." );
	              }
	            }
	          }
	        } else {
	          {
	            error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(Component) || 'Unknown');
	          }
	        }
	      }

	      if (childContext) {
	        context = _assign({}, context, childContext);
	      }
	    }
	  }

	  return {
	    child: child,
	    context: context
	  };
	}

	var ReactDOMServerRenderer = /*#__PURE__*/function () {
	  // TODO: type this more strictly:
	  // DEV-only
	  function ReactDOMServerRenderer(children, makeStaticMarkup, options) {
	    var flatChildren = flattenTopLevelChildren(children);
	    var topFrame = {
	      type: null,
	      // Assume all trees start in the HTML namespace (not totally true, but
	      // this is what we did historically)
	      domNamespace: Namespaces.html,
	      children: flatChildren,
	      childIndex: 0,
	      context: emptyObject,
	      footer: ''
	    };

	    {
	      topFrame.debugElementStack = [];
	    }

	    this.threadID = allocThreadID();
	    this.stack = [topFrame];
	    this.exhausted = false;
	    this.currentSelectValue = null;
	    this.previousWasTextNode = false;
	    this.makeStaticMarkup = makeStaticMarkup;
	    this.suspenseDepth = 0; // Context (new API)

	    this.contextIndex = -1;
	    this.contextStack = [];
	    this.contextValueStack = []; // useOpaqueIdentifier ID

	    this.uniqueID = 0;
	    this.identifierPrefix = options && options.identifierPrefix || '';

	    {
	      this.contextProviderStack = [];
	    }
	  }

	  var _proto = ReactDOMServerRenderer.prototype;

	  _proto.destroy = function destroy() {
	    if (!this.exhausted) {
	      this.exhausted = true;
	      this.clearProviders();
	      freeThreadID(this.threadID);
	    }
	  }
	  /**
	   * Note: We use just two stacks regardless of how many context providers you have.
	   * Providers are always popped in the reverse order to how they were pushed
	   * so we always know on the way down which provider you'll encounter next on the way up.
	   * On the way down, we push the current provider, and its context value *before*
	   * we mutated it, onto the stacks. Therefore, on the way up, we always know which
	   * provider needs to be "restored" to which value.
	   * https://github.com/facebook/react/pull/12985#issuecomment-396301248
	   */
	  ;

	  _proto.pushProvider = function pushProvider(provider) {
	    var index = ++this.contextIndex;
	    var context = provider.type._context;
	    var threadID = this.threadID;
	    validateContextBounds(context, threadID);
	    var previousValue = context[threadID]; // Remember which value to restore this context to on our way up.

	    this.contextStack[index] = context;
	    this.contextValueStack[index] = previousValue;

	    {
	      // Only used for push/pop mismatch warnings.
	      this.contextProviderStack[index] = provider;
	    } // Mutate the current value.


	    context[threadID] = provider.props.value;
	  };

	  _proto.popProvider = function popProvider(provider) {
	    var index = this.contextIndex;

	    {
	      if (index < 0 || provider !== this.contextProviderStack[index]) {
	        error('Unexpected pop.');
	      }
	    }

	    var context = this.contextStack[index];
	    var previousValue = this.contextValueStack[index]; // "Hide" these null assignments from Flow by using `any`
	    // because conceptually they are deletions--as long as we
	    // promise to never access values beyond `this.contextIndex`.

	    this.contextStack[index] = null;
	    this.contextValueStack[index] = null;

	    {
	      this.contextProviderStack[index] = null;
	    }

	    this.contextIndex--; // Restore to the previous value we stored as we were walking down.
	    // We've already verified that this context has been expanded to accommodate
	    // this thread id, so we don't need to do it again.

	    context[this.threadID] = previousValue;
	  };

	  _proto.clearProviders = function clearProviders() {
	    // Restore any remaining providers on the stack to previous values
	    for (var index = this.contextIndex; index >= 0; index--) {
	      var context = this.contextStack[index];
	      var previousValue = this.contextValueStack[index];
	      context[this.threadID] = previousValue;
	    }
	  };

	  _proto.read = function read(bytes) {
	    if (this.exhausted) {
	      return null;
	    }

	    var prevPartialRenderer = currentPartialRenderer;
	    setCurrentPartialRenderer(this);
	    var prevDispatcher = ReactCurrentDispatcher$1.current;
	    ReactCurrentDispatcher$1.current = Dispatcher;

	    try {
	      // Markup generated within <Suspense> ends up buffered until we know
	      // nothing in that boundary suspended
	      var out = [''];
	      var suspended = false;

	      while (out[0].length < bytes) {
	        if (this.stack.length === 0) {
	          this.exhausted = true;
	          freeThreadID(this.threadID);
	          break;
	        }

	        var frame = this.stack[this.stack.length - 1];

	        if (suspended || frame.childIndex >= frame.children.length) {
	          var footer = frame.footer;

	          if (footer !== '') {
	            this.previousWasTextNode = false;
	          }

	          this.stack.pop();

	          if (frame.type === 'select') {
	            this.currentSelectValue = null;
	          } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
	            var provider = frame.type;
	            this.popProvider(provider);
	          } else if (frame.type === REACT_SUSPENSE_TYPE) {
	            this.suspenseDepth--;
	            var buffered = out.pop();

	            if (suspended) {
	              suspended = false; // If rendering was suspended at this boundary, render the fallbackFrame

	              var fallbackFrame = frame.fallbackFrame;

	              if (!fallbackFrame) {
	                {
	                  throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
	                }
	              }

	              this.stack.push(fallbackFrame);
	              out[this.suspenseDepth] += '<!--$!-->'; // Skip flushing output since we're switching to the fallback

	              continue;
	            } else {
	              out[this.suspenseDepth] += buffered;
	            }
	          } // Flush output


	          out[this.suspenseDepth] += footer;
	          continue;
	        }

	        var child = frame.children[frame.childIndex++];
	        var outBuffer = '';

	        if (true) {
	          pushCurrentDebugStack(this.stack); // We're starting work on this frame, so reset its inner stack.

	          frame.debugElementStack.length = 0;
	        }

	        try {
	          outBuffer += this.render(child, frame.context, frame.domNamespace);
	        } catch (err) {
	          if (err != null && typeof err.then === 'function') {
	            if (enableSuspenseServerRenderer) ; else {
	              if (!false) {
	                {
	                  throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
	                }
	              }
	            }
	          } else {
	            throw err;
	          }
	        } finally {
	          if (true) {
	            popCurrentDebugStack();
	          }
	        }

	        if (out.length <= this.suspenseDepth) {
	          out.push('');
	        }

	        out[this.suspenseDepth] += outBuffer;
	      }

	      return out[0];
	    } finally {
	      ReactCurrentDispatcher$1.current = prevDispatcher;
	      setCurrentPartialRenderer(prevPartialRenderer);
	      resetHooksState();
	    }
	  };

	  _proto.render = function render(child, context, parentNamespace) {
	    if (typeof child === 'string' || typeof child === 'number') {
	      var text = '' + child;

	      if (text === '') {
	        return '';
	      }

	      if (this.makeStaticMarkup) {
	        return escapeTextForBrowser(text);
	      }

	      if (this.previousWasTextNode) {
	        return '<!-- -->' + escapeTextForBrowser(text);
	      }

	      this.previousWasTextNode = true;
	      return escapeTextForBrowser(text);
	    } else {
	      var nextChild;

	      var _resolve = resolve(child, context, this.threadID);

	      nextChild = _resolve.child;
	      context = _resolve.context;

	      if (nextChild === null || nextChild === false) {
	        return '';
	      } else if (!React.isValidElement(nextChild)) {
	        if (nextChild != null && nextChild.$$typeof != null) {
	          // Catch unexpected special types early.
	          var $$typeof = nextChild.$$typeof;

	          if (!($$typeof !== REACT_PORTAL_TYPE)) {
	            {
	              throw Error( "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render." );
	            }
	          } // Catch-all to prevent an infinite loop if React.Children.toArray() supports some new type.


	          {
	            {
	              throw Error( "Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue." );
	            }
	          }
	        }

	        var nextChildren = toArray(nextChild);
	        var frame = {
	          type: null,
	          domNamespace: parentNamespace,
	          children: nextChildren,
	          childIndex: 0,
	          context: context,
	          footer: ''
	        };

	        {
	          frame.debugElementStack = [];
	        }

	        this.stack.push(frame);
	        return '';
	      } // Safe because we just checked it's an element.


	      var nextElement = nextChild;
	      var elementType = nextElement.type;

	      if (typeof elementType === 'string') {
	        return this.renderDOM(nextElement, context, parentNamespace);
	      }

	      switch (elementType) {
	        // TODO: LegacyHidden acts the same as a fragment. This only works
	        // because we currently assume that every instance of LegacyHidden is
	        // accompanied by a host component wrapper. In the hidden mode, the host
	        // component is given a `hidden` attribute, which ensures that the
	        // initial HTML is not visible. To support the use of LegacyHidden as a
	        // true fragment, without an extra DOM node, we would have to hide the
	        // initial HTML in some other way.
	        case REACT_LEGACY_HIDDEN_TYPE:
	        case REACT_DEBUG_TRACING_MODE_TYPE:
	        case REACT_STRICT_MODE_TYPE:
	        case REACT_PROFILER_TYPE:
	        case REACT_SUSPENSE_LIST_TYPE:
	        case REACT_FRAGMENT_TYPE:
	          {
	            var _nextChildren = toArray(nextChild.props.children);

	            var _frame = {
	              type: null,
	              domNamespace: parentNamespace,
	              children: _nextChildren,
	              childIndex: 0,
	              context: context,
	              footer: ''
	            };

	            {
	              _frame.debugElementStack = [];
	            }

	            this.stack.push(_frame);
	            return '';
	          }

	        case REACT_SUSPENSE_TYPE:
	          {
	            {
	              {
	                {
	                  throw Error( "ReactDOMServer does not yet support Suspense." );
	                }
	              }
	            }
	          }
	        // eslint-disable-next-line-no-fallthrough

	        case REACT_SCOPE_TYPE:
	          {

	            {
	              {
	                throw Error( "ReactDOMServer does not yet support scope components." );
	              }
	            }
	          }
	      }

	      if (typeof elementType === 'object' && elementType !== null) {
	        switch (elementType.$$typeof) {
	          case REACT_FORWARD_REF_TYPE:
	            {
	              var element = nextChild;

	              var _nextChildren5;

	              var componentIdentity = {};
	              prepareToUseHooks(componentIdentity);
	              _nextChildren5 = elementType.render(element.props, element.ref);
	              _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref);
	              _nextChildren5 = toArray(_nextChildren5);
	              var _frame5 = {
	                type: null,
	                domNamespace: parentNamespace,
	                children: _nextChildren5,
	                childIndex: 0,
	                context: context,
	                footer: ''
	              };

	              {
	                _frame5.debugElementStack = [];
	              }

	              this.stack.push(_frame5);
	              return '';
	            }

	          case REACT_MEMO_TYPE:
	            {
	              var _element = nextChild;
	              var _nextChildren6 = [React.createElement(elementType.type, _assign({
	                ref: _element.ref
	              }, _element.props))];
	              var _frame6 = {
	                type: null,
	                domNamespace: parentNamespace,
	                children: _nextChildren6,
	                childIndex: 0,
	                context: context,
	                footer: ''
	              };

	              {
	                _frame6.debugElementStack = [];
	              }

	              this.stack.push(_frame6);
	              return '';
	            }

	          case REACT_PROVIDER_TYPE:
	            {
	              var provider = nextChild;
	              var nextProps = provider.props;

	              var _nextChildren7 = toArray(nextProps.children);

	              var _frame7 = {
	                type: provider,
	                domNamespace: parentNamespace,
	                children: _nextChildren7,
	                childIndex: 0,
	                context: context,
	                footer: ''
	              };

	              {
	                _frame7.debugElementStack = [];
	              }

	              this.pushProvider(provider);
	              this.stack.push(_frame7);
	              return '';
	            }

	          case REACT_CONTEXT_TYPE:
	            {
	              var reactContext = nextChild.type; // The logic below for Context differs depending on PROD or DEV mode. In
	              // DEV mode, we create a separate object for Context.Consumer that acts
	              // like a proxy to Context. This proxy object adds unnecessary code in PROD
	              // so we use the old behaviour (Context.Consumer references Context) to
	              // reduce size and overhead. The separate object references context via
	              // a property called "_context", which also gives us the ability to check
	              // in DEV mode if this property exists or not and warn if it does not.

	              {
	                if (reactContext._context === undefined) {
	                  // This may be because it's a Context (rather than a Consumer).
	                  // Or it may be because it's older React where they're the same thing.
	                  // We only want to warn if we're sure it's a new React.
	                  if (reactContext !== reactContext.Consumer) {
	                    if (!hasWarnedAboutUsingContextAsConsumer) {
	                      hasWarnedAboutUsingContextAsConsumer = true;

	                      error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
	                    }
	                  }
	                } else {
	                  reactContext = reactContext._context;
	                }
	              }

	              var _nextProps = nextChild.props;
	              var threadID = this.threadID;
	              validateContextBounds(reactContext, threadID);
	              var nextValue = reactContext[threadID];

	              var _nextChildren8 = toArray(_nextProps.children(nextValue));

	              var _frame8 = {
	                type: nextChild,
	                domNamespace: parentNamespace,
	                children: _nextChildren8,
	                childIndex: 0,
	                context: context,
	                footer: ''
	              };

	              {
	                _frame8.debugElementStack = [];
	              }

	              this.stack.push(_frame8);
	              return '';
	            }
	          // eslint-disable-next-line-no-fallthrough

	          case REACT_FUNDAMENTAL_TYPE:
	            {

	              {
	                {
	                  throw Error( "ReactDOMServer does not yet support the fundamental API." );
	                }
	              }
	            }
	          // eslint-disable-next-line-no-fallthrough

	          case REACT_LAZY_TYPE:
	            {
	              var _element2 = nextChild;
	              var lazyComponent = nextChild.type; // Attempt to initialize lazy component regardless of whether the
	              // suspense server-side renderer is enabled so synchronously
	              // resolved constructors are supported.

	              var payload = lazyComponent._payload;
	              var init = lazyComponent._init;
	              var result = init(payload);
	              var _nextChildren10 = [React.createElement(result, _assign({
	                ref: _element2.ref
	              }, _element2.props))];
	              var _frame10 = {
	                type: null,
	                domNamespace: parentNamespace,
	                children: _nextChildren10,
	                childIndex: 0,
	                context: context,
	                footer: ''
	              };

	              {
	                _frame10.debugElementStack = [];
	              }

	              this.stack.push(_frame10);
	              return '';
	            }
	        }
	      }

	      var info = '';

	      {
	        var owner = nextElement._owner;

	        if (elementType === undefined || typeof elementType === 'object' && elementType !== null && Object.keys(elementType).length === 0) {
	          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
	        }

	        var ownerName = owner ? getComponentName(owner) : null;

	        if (ownerName) {
	          info += '\n\nCheck the render method of `' + ownerName + '`.';
	        }
	      }

	      {
	        {
	          throw Error( "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info );
	        }
	      }
	    }
	  };

	  _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
	    var tag = element.type.toLowerCase();
	    var namespace = parentNamespace;

	    if (parentNamespace === Namespaces.html) {
	      namespace = getIntrinsicNamespace(tag);
	    }

	    {
	      if (namespace === Namespaces.html) {
	        // Should this check be gated by parent namespace? Not sure we want to
	        // allow <SVG> or <mATH>.
	        if (tag !== element.type) {
	          error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', element.type);
	        }
	      }
	    }

	    validateDangerousTag(tag);
	    var props = element.props;

	    if (tag === 'input') {
	      {
	        checkControlledValueProps('input', props);

	        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
	          error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	          didWarnDefaultChecked = true;
	        }

	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
	          error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	          didWarnDefaultInputValue = true;
	        }
	      }

	      props = _assign({
	        type: undefined
	      }, props, {
	        defaultChecked: undefined,
	        defaultValue: undefined,
	        value: props.value != null ? props.value : props.defaultValue,
	        checked: props.checked != null ? props.checked : props.defaultChecked
	      });
	    } else if (tag === 'textarea') {
	      {
	        checkControlledValueProps('textarea', props);

	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
	          error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	          didWarnDefaultTextareaValue = true;
	        }
	      }

	      var initialValue = props.value;

	      if (initialValue == null) {
	        var defaultValue = props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.

	        var textareaChildren = props.children;

	        if (textareaChildren != null) {
	          {
	            error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
	          }

	          if (!(defaultValue == null)) {
	            {
	              throw Error( "If you supply `defaultValue` on a <textarea>, do not pass children." );
	            }
	          }

	          if (Array.isArray(textareaChildren)) {
	            if (!(textareaChildren.length <= 1)) {
	              {
	                throw Error( "<textarea> can only have at most one child." );
	              }
	            }

	            textareaChildren = textareaChildren[0];
	          }

	          defaultValue = '' + textareaChildren;
	        }

	        if (defaultValue == null) {
	          defaultValue = '';
	        }

	        initialValue = defaultValue;
	      }

	      props = _assign({}, props, {
	        value: undefined,
	        children: '' + initialValue
	      });
	    } else if (tag === 'select') {
	      {
	        checkControlledValueProps('select', props);

	        for (var i = 0; i < valuePropNames.length; i++) {
	          var propName = valuePropNames[i];

	          if (props[propName] == null) {
	            continue;
	          }

	          var isArray = Array.isArray(props[propName]);

	          if (props.multiple && !isArray) {
	            error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
	          } else if (!props.multiple && isArray) {
	            error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
	          }
	        }

	        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
	          error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	          didWarnDefaultSelectValue = true;
	        }
	      }

	      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
	      props = _assign({}, props, {
	        value: undefined
	      });
	    } else if (tag === 'option') {
	      var selected = null;
	      var selectValue = this.currentSelectValue;
	      var optionChildren = flattenOptionChildren(props.children);

	      if (selectValue != null) {
	        var value;

	        if (props.value != null) {
	          value = props.value + '';
	        } else {
	          value = optionChildren;
	        }

	        selected = false;

	        if (Array.isArray(selectValue)) {
	          // multiple
	          for (var j = 0; j < selectValue.length; j++) {
	            if ('' + selectValue[j] === value) {
	              selected = true;
	              break;
	            }
	          }
	        } else {
	          selected = '' + selectValue === value;
	        }

	        props = _assign({
	          selected: undefined,
	          children: undefined
	        }, props, {
	          selected: selected,
	          children: optionChildren
	        });
	      }
	    }

	    {
	      validatePropertiesInDevelopment(tag, props);
	    }

	    assertValidProps(tag, props);
	    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
	    var footer = '';

	    if (omittedCloseTags.hasOwnProperty(tag)) {
	      out += '/>';
	    } else {
	      out += '>';
	      footer = '</' + element.type + '>';
	    }

	    var children;
	    var innerMarkup = getNonChildrenInnerMarkup(props);

	    if (innerMarkup != null) {
	      children = [];

	      if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === '\n') {
	        // text/html ignores the first character in these tags if it's a newline
	        // Prefer to break application/xml over text/html (for now) by adding
	        // a newline specifically to get eaten by the parser. (Alternately for
	        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	        // \r is normalized out by HTMLTextAreaElement#value.)
	        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	        // See: Parsing of "textarea" "listing" and "pre" elements
	        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	        out += '\n';
	      }

	      out += innerMarkup;
	    } else {
	      children = toArray(props.children);
	    }

	    var frame = {
	      domNamespace: getChildNamespace(parentNamespace, element.type),
	      type: tag,
	      children: children,
	      childIndex: 0,
	      context: context,
	      footer: footer
	    };

	    {
	      frame.debugElementStack = [];
	    }

	    this.stack.push(frame);
	    this.previousWasTextNode = false;
	    return out;
	  };

	  return ReactDOMServerRenderer;
	}();

	/**
	 * Render a ReactElement to its initial HTML. This should only be used on the
	 * server.
	 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
	 */

	function renderToString(element, options) {
	  var renderer = new ReactDOMServerRenderer(element, false, options);

	  try {
	    var markup = renderer.read(Infinity);
	    return markup;
	  } finally {
	    renderer.destroy();
	  }
	}
	/**
	 * Similar to renderToString, except this doesn't create extra DOM attributes
	 * such as data-react-id that React uses internally.
	 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
	 */

	function renderToStaticMarkup(element, options) {
	  var renderer = new ReactDOMServerRenderer(element, true, options);

	  try {
	    var markup = renderer.read(Infinity);
	    return markup;
	  } finally {
	    renderer.destroy();
	  }
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var ReactMarkupReadableStream = /*#__PURE__*/function (_Readable) {
	  _inheritsLoose(ReactMarkupReadableStream, _Readable);

	  function ReactMarkupReadableStream(element, makeStaticMarkup, options) {
	    var _this;

	    // Calls the stream.Readable(options) constructor. Consider exposing built-in
	    // features like highWaterMark in the future.
	    _this = _Readable.call(this, {}) || this;
	    _this.partialRenderer = new ReactDOMServerRenderer(element, makeStaticMarkup, options);
	    return _this;
	  }

	  var _proto = ReactMarkupReadableStream.prototype;

	  _proto._destroy = function _destroy(err, callback) {
	    this.partialRenderer.destroy();
	    callback(err);
	  };

	  _proto._read = function _read(size) {
	    try {
	      this.push(this.partialRenderer.read(size));
	    } catch (err) {
	      this.destroy(err);
	    }
	  };

	  return ReactMarkupReadableStream;
	}(stream.Readable);
	/**
	 * Render a ReactElement to its initial HTML. This should only be used on the
	 * server.
	 * See https://reactjs.org/docs/react-dom-server.html#rendertonodestream
	 */


	function renderToNodeStream(element, options) {
	  return new ReactMarkupReadableStream(element, false, options);
	}
	/**
	 * Similar to renderToNodeStream, except this doesn't create extra DOM attributes
	 * such as data-react-id that React uses internally.
	 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticnodestream
	 */

	function renderToStaticNodeStream(element, options) {
	  return new ReactMarkupReadableStream(element, true, options);
	}

	exports.renderToNodeStream = renderToNodeStream;
	exports.renderToStaticMarkup = renderToStaticMarkup;
	exports.renderToStaticNodeStream = renderToStaticNodeStream;
	exports.renderToString = renderToString;
	exports.version = ReactVersion;
	  })();
	}
	});

	var server_node = createCommonjsModule(function (module) {

	{
	  module.exports = reactDomServer_node_development;
	}
	});

	var server = server_node;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function Cache () {
	  var _cache = Object.create(null);
	  var _hitCount = 0;
	  var _missCount = 0;
	  var _size = 0;
	  var _debug = false;

	  this.put = function(key, value, time, timeoutCallback) {
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
	      record.timeout = setTimeout(function() {
	        _del(key);
	        if (timeoutCallback) {
	          timeoutCallback(key, value);
	        }
	      }.bind(this), time);
	    }

	    _cache[key] = record;

	    return value;
	  };

	  this.del = function(key) {
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

	  function _del(key){
	    _size--;
	    delete _cache[key];
	  }

	  this.clear = function() {
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

	  this.get = function(key) {
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

	  this.size = function() {
	    return _size;
	  };

	  this.memsize = function() {
	    var size = 0,
	      key;
	    for (key in _cache) {
	      size++;
	    }
	    return size;
	  };

	  this.debug = function(bool) {
	    _debug = bool;
	  };

	  this.hits = function() {
	    return _hitCount;
	  };

	  this.misses = function() {
	    return _missCount;
	  };

	  this.keys = function() {
	    return Object.keys(_cache);
	  };

	  this.exportJson = function() {
	    var plainJsCache = {};

	    // Discard the `timeout` property.
	    // Note: JSON doesn't support `NaN`, so convert it to `'NaN'`.
	    for (var key in _cache) {
	      var record = _cache[key];
	      plainJsCache[key] = {
	        value: record.value,
	        expire: record.expire || 'NaN',
	      };
	    }

	    return JSON.stringify(plainJsCache);
	  };

	  this.importJson = function(jsonToImport, options) {
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

	        var record = cacheToImport[key];

	        // record.expire could be `'NaN'` if no expiry was set.
	        // Try to subtract from it; a string minus a number is `NaN`, which is perfectly fine here.
	        var remainingTime = record.expire - currTime;

	        if (remainingTime <= 0) {
	          // Delete any record that might exist with the same key, since this key is expired.
	          this.del(key);
	          continue;
	        }

	        // Remaining time must now be either positive or `NaN`,
	        // but `put` will throw an error if we try to give it `NaN`.
	        remainingTime = remainingTime > 0 ? remainingTime : undefined;

	        this.put(key, record.value, remainingTime);
	      }
	    }

	    return this.size();
	  };
	}

	var memoryCache = new Cache();
	var Cache_1 = Cache;
	memoryCache.Cache = Cache_1;

	var isCheckBoxInput = (element) => element.type === 'checkbox';

	var isNullOrUndefined = (value) => value == null;

	const isObjectType = (value) => typeof value === 'object';
	var isObject = (value) => !isNullOrUndefined(value) &&
	    !Array.isArray(value) &&
	    isObjectType(value) &&
	    !(value instanceof Date);

	var getControllerValue = (event) => isObject(event) && event.target
	    ? isCheckBoxInput(event.target)
	        ? event.target.checked
	        : event.target.value
	    : event;

	var getNodeParentName = (name) => name.substring(0, name.search(/.\d/)) || name;

	var isNameInFieldArray = (names, name) => [...names].some((current) => getNodeParentName(name) === current);

	var compact = (value) => value.filter(Boolean);

	var isUndefined$1 = (val) => val === undefined;

	var get = (obj = {}, path, defaultValue) => {
	    const result = compact(path.split(/[,[\].]+?/)).reduce((result, key) => (isNullOrUndefined(result) ? result : result[key]), obj);
	    return isUndefined$1(result) || result === obj
	        ? isUndefined$1(obj[path])
	            ? defaultValue
	            : obj[path]
	        : result;
	};

	const EVENTS = {
	    BLUR: 'blur',
	    CHANGE: 'change',
	};
	const VALIDATION_MODE = {
	    onBlur: 'onBlur',
	    onChange: 'onChange',
	    onSubmit: 'onSubmit',
	    onTouched: 'onTouched',
	    all: 'all',
	};
	const SELECT = 'select';
	const UNDEFINED = 'undefined';
	const INPUT_VALIDATION_RULES = {
	    max: 'max',
	    min: 'min',
	    maxLength: 'maxLength',
	    minLength: 'minLength',
	    pattern: 'pattern',
	    required: 'required',
	    validate: 'validate',
	};

	var omit = (source, key) => {
	    const copy = Object.assign({}, source);
	    delete copy[key];
	    return copy;
	};

	const FormContext = React__namespace.createContext(null);
	FormContext.displayName = 'RHFContext';
	const useFormContext = () => React__namespace.useContext(FormContext);

	var getProxyFormState = (isProxyEnabled, formState, readFormStateRef, localReadFormStateRef, isRoot = true) => isProxyEnabled
	    ? new Proxy(formState, {
	        get: (obj, prop) => {
	            if (prop in obj) {
	                if (readFormStateRef.current[prop] !== VALIDATION_MODE.all) {
	                    readFormStateRef.current[prop] = isRoot
	                        ? VALIDATION_MODE.all
	                        : true;
	                }
	                localReadFormStateRef &&
	                    (localReadFormStateRef.current[prop] = true);
	                return obj[prop];
	            }
	            return undefined;
	        },
	    })
	    : formState;

	var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;

	var shouldRenderFormState = (formState, readFormStateRef, isRoot) => isEmptyObject(formState) ||
	    Object.keys(formState).length >= Object.keys(readFormStateRef).length ||
	    Object.keys(formState).find((key) => readFormStateRef[key] ===
	        (isRoot ? VALIDATION_MODE.all : true));

	var isWeb = typeof window !== UNDEFINED &&
	    typeof window.HTMLElement !== UNDEFINED &&
	    typeof document !== UNDEFINED;

	const isProxyEnabled = isWeb ? 'Proxy' in window : typeof Proxy !== UNDEFINED;

	function useFormState(props) {
	    const methods = useFormContext();
	    const { formStateRef, formStateSubjectRef, readFormStateRef } = (props && props.control) || methods.control;
	    const [formState, updateFormState] = React__namespace.useState(formStateRef.current);
	    const readFormState = React__namespace.useRef({
	        isDirty: false,
	        dirtyFields: false,
	        touchedFields: false,
	        isValidating: false,
	        isValid: false,
	        errors: false,
	    });
	    React__namespace.useEffect(() => {
	        const formStateSubscription = formStateSubjectRef.current.subscribe({
	            next: (formState) => {
	                shouldRenderFormState(formState, readFormState.current) &&
	                    updateFormState(Object.assign(Object.assign({}, formStateRef.current), formState));
	            },
	        });
	        return () => formStateSubscription.unsubscribe();
	    }, []);
	    return getProxyFormState(isProxyEnabled, formState, readFormStateRef, readFormState, false);
	}

	function useController({ name, rules, defaultValue, control, shouldUnregister, }) {
	    const methods = useFormContext();
	    const { defaultValuesRef, register, fieldsRef, unregister, fieldArrayNamesRef, controllerSubjectRef, shouldUnmountUnregister, } = control || methods.control;
	    const { onChange, onBlur, ref } = register(name, rules);
	    const [value, setInputStateValue] = React__namespace.useState(isUndefined$1(get(fieldsRef.current, name)._f.value) ||
	        isNameInFieldArray(fieldArrayNamesRef.current, name)
	        ? isUndefined$1(defaultValue)
	            ? get(defaultValuesRef.current, name)
	            : defaultValue
	        : get(fieldsRef.current, name)._f.value);
	    const formState = useFormState({
	        control: control || methods.control,
	    });
	    get(fieldsRef.current, name)._f.value = value;
	    React__namespace.useEffect(() => {
	        const controllerSubscription = controllerSubjectRef.current.subscribe({
	            next: (data) => (!data.name || name === data.name) &&
	                setInputStateValue(get(data.values, name)),
	        });
	        ref({
	            target: value,
	        });
	        return () => {
	            controllerSubscription.unsubscribe();
	            (shouldUnmountUnregister || shouldUnregister) && unregister(name);
	        };
	    }, [name]);
	    return {
	        field: {
	            onChange: (event) => {
	                const value = getControllerValue(event);
	                setInputStateValue(value);
	                onChange({
	                    target: {
	                        value,
	                        name: name,
	                    },
	                    type: EVENTS.CHANGE,
	                });
	            },
	            onBlur: () => {
	                onBlur({
	                    target: {
	                        name: name,
	                    },
	                    type: EVENTS.BLUR,
	                });
	            },
	            name,
	            value,
	            ref: (elm) => elm && ref(elm),
	        },
	        formState,
	        fieldState: Object.defineProperties({}, {
	            invalid: {
	                get() {
	                    return !!get(formState.errors, name);
	                },
	            },
	            isDirty: {
	                get() {
	                    return !!get(formState.dirtyFields, name);
	                },
	            },
	            isTouched: {
	                get() {
	                    return !!get(formState.touchedFields, name);
	                },
	            },
	            error: {
	                get() {
	                    return get(formState.errors, name);
	                },
	            },
	        }),
	    };
	}

	const Controller = (props) => props.render(useController(props));

	var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria
	    ? Object.assign(Object.assign({}, errors[name]), { types: Object.assign(Object.assign({}, (errors[name] && errors[name].types ? errors[name].types : {})), { [type]: message || true }) }) : {};

	var isKey = (value) => /^\w*$/.test(value);

	var stringToPath = (input) => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/));

	function set(object, path, value) {
	    let index = -1;
	    const tempPath = isKey(path) ? [path] : stringToPath(path);
	    const length = tempPath.length;
	    const lastIndex = length - 1;
	    while (++index < length) {
	        const key = tempPath[index];
	        let newValue = value;
	        if (index !== lastIndex) {
	            const objValue = object[key];
	            newValue =
	                isObject(objValue) || Array.isArray(objValue)
	                    ? objValue
	                    : !isNaN(+tempPath[index + 1])
	                        ? []
	                        : {};
	        }
	        object[key] = newValue;
	        object = object[key];
	    }
	    return object;
	}

	const focusFieldBy = (fields, callback, fieldsNames) => {
	    for (const key of fieldsNames || Object.keys(fields)) {
	        const field = get(fields, key);
	        if (field) {
	            const _f = field._f;
	            const current = omit(field, '_f');
	            if (_f && callback(_f.name)) {
	                if (_f.ref.focus && isUndefined$1(_f.ref.focus())) {
	                    break;
	                }
	                else if (_f.refs) {
	                    _f.refs[0].focus();
	                    break;
	                }
	            }
	            else if (isObject(current)) {
	                focusFieldBy(current, callback);
	            }
	        }
	    }
	};

	const getFieldsValues = (fieldsRef, defaultValuesRef, output = {}) => {
	    for (const name in fieldsRef.current) {
	        const field = fieldsRef.current[name];
	        if (field) {
	            const _f = field._f;
	            const current = omit(field, '_f');
	            set(output, name, _f
	                ? _f.ref.disabled || (_f.refs && _f.refs.every((ref) => ref.disabled))
	                    ? undefined
	                    : _f.value
	                : Array.isArray(field)
	                    ? []
	                    : {});
	            if (current) {
	                getFieldsValues({
	                    current,
	                }, defaultValuesRef, output[name]);
	            }
	        }
	    }
	    return Object.assign(Object.assign({}, defaultValuesRef), output);
	};

	var generateId = () => {
	    const d = typeof performance === UNDEFINED ? Date.now() : performance.now() * 1000;
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	        const r = (Math.random() * 16 + d) % 16 | 0;
	        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
	    });
	};

	var mapIds = (values = [], keyName) => values.map((value) => (Object.assign({ [keyName]: (value && value[keyName]) || generateId() }, value)));

	var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);

	function deepEqual(object1, object2, isErrorObject) {
	    if (isPrimitive(object1) ||
	        isPrimitive(object2) ||
	        object1 instanceof Date ||
	        object2 instanceof Date) {
	        return object1 === object2;
	    }
	    if (!React__namespace.isValidElement(object1)) {
	        const keys1 = Object.keys(object1);
	        const keys2 = Object.keys(object2);
	        if (keys1.length !== keys2.length) {
	            return false;
	        }
	        for (const key of keys1) {
	            const val1 = object1[key];
	            if (!(isErrorObject && key === 'ref')) {
	                const val2 = object2[key];
	                if ((isObject(val1) || Array.isArray(val1)) &&
	                    (isObject(val2) || Array.isArray(val2))
	                    ? !deepEqual(val1, val2, isErrorObject)
	                    : val1 !== val2) {
	                    return false;
	                }
	            }
	        }
	    }
	    return true;
	}

	function deepMerge(target, source) {
	    if (isPrimitive(target) || isPrimitive(source)) {
	        return source;
	    }
	    for (const key in source) {
	        const targetValue = target[key];
	        const sourceValue = source[key];
	        try {
	            target[key] =
	                (isObject(targetValue) && isObject(sourceValue)) ||
	                    (Array.isArray(targetValue) && Array.isArray(sourceValue))
	                    ? deepMerge(targetValue, sourceValue)
	                    : sourceValue;
	        }
	        catch (_a) { }
	    }
	    return target;
	}

	function setDirtyFields(values, defaultValues, dirtyFields, parentNode, parentName) {
	    let index = -1;
	    while (++index < values.length) {
	        for (const key in values[index]) {
	            if (Array.isArray(values[index][key])) {
	                !dirtyFields[index] && (dirtyFields[index] = {});
	                dirtyFields[index][key] = [];
	                setDirtyFields(values[index][key], get(defaultValues[index] || {}, key, []), dirtyFields[index][key], dirtyFields[index], key);
	            }
	            else {
	                deepEqual(get(defaultValues[index] || {}, key), values[index][key])
	                    ? set(dirtyFields[index] || {}, key)
	                    : (dirtyFields[index] = Object.assign(Object.assign({}, dirtyFields[index]), { [key]: true }));
	            }
	        }
	        parentNode &&
	            !dirtyFields.length &&
	            delete parentNode[parentName];
	    }
	    return dirtyFields;
	}
	var setFieldArrayDirtyFields = (values, defaultValues, dirtyFields) => deepMerge(setDirtyFields(values, defaultValues, dirtyFields.slice(0, values.length)), setDirtyFields(defaultValues, values, dirtyFields.slice(0, values.length)));

	function append(data, value) {
	    return [...data, ...(Array.isArray(value) ? value : [value])];
	}

	var fillEmptyArray = (value) => Array.isArray(value) ? Array(value.length).fill(undefined) : undefined;

	function insert(data, index, value) {
	    return [
	        ...data.slice(0, index),
	        ...(Array.isArray(value) ? value : [value]),
	        ...data.slice(index),
	    ];
	}

	var moveArrayAt = (data, from, to) => {
	    if (Array.isArray(data)) {
	        if (isUndefined$1(data[to])) {
	            data[to] = undefined;
	        }
	        data.splice(to, 0, data.splice(from, 1)[0]);
	        return data;
	    }
	    return [];
	};

	function prepend(data, value) {
	    return [...(Array.isArray(value) ? value : [value]), ...data];
	}

	function removeAtIndexes(data, indexes) {
	    let i = 0;
	    const temp = [...data];
	    for (const index of indexes) {
	        temp.splice(index - i, 1);
	        i++;
	    }
	    return compact(temp).length ? temp : [];
	}
	var removeArrayAt = (data, index) => isUndefined$1(index)
	    ? []
	    : removeAtIndexes(data, (Array.isArray(index) ? index : [index]).sort((a, b) => a - b));

	var swapArrayAt = (data, indexA, indexB) => {
	    data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
	};

	var isBoolean = (value) => typeof value === 'boolean';

	function baseGet(object, updatePath) {
	    const length = updatePath.slice(0, -1).length;
	    let index = 0;
	    while (index < length) {
	        object = isUndefined$1(object) ? index++ : object[updatePath[index++]];
	    }
	    return object;
	}
	function unset(object, path) {
	    const updatePath = isKey(path) ? [path] : stringToPath(path);
	    const childObject = updatePath.length == 1 ? object : baseGet(object, updatePath);
	    const key = updatePath[updatePath.length - 1];
	    let previousObjRef;
	    if (childObject) {
	        delete childObject[key];
	    }
	    for (let k = 0; k < updatePath.slice(0, -1).length; k++) {
	        let index = -1;
	        let objectRef;
	        const currentPaths = updatePath.slice(0, -(k + 1));
	        const currentPathsLength = currentPaths.length - 1;
	        if (k > 0) {
	            previousObjRef = object;
	        }
	        while (++index < currentPaths.length) {
	            const item = currentPaths[index];
	            objectRef = objectRef ? objectRef[item] : object[item];
	            if (currentPathsLength === index &&
	                ((isObject(objectRef) && isEmptyObject(objectRef)) ||
	                    (Array.isArray(objectRef) &&
	                        !objectRef.filter((data) => (isObject(data) && !isEmptyObject(data)) || isBoolean(data)).length))) {
	                previousObjRef ? delete previousObjRef[item] : delete object[item];
	            }
	            previousObjRef = objectRef;
	        }
	    }
	    return object;
	}

	const useFieldArray = ({ control, name, keyName = 'id', shouldUnregister, }) => {
	    const methods = useFormContext();
	    const focusNameRef = React__namespace.useRef('');
	    const { isWatchAllRef, watchFieldsRef, getIsDirty, watchSubjectRef, fieldArraySubjectRef, fieldArrayNamesRef, fieldsRef, defaultValuesRef, formStateRef, formStateSubjectRef, readFormStateRef, validFieldsRef, fieldsWithValidationRef, fieldArrayDefaultValuesRef, unregister, shouldUnmountUnregister, } = control || methods.control;
	    const [fields, setFields] = React__namespace.useState(mapIds(get(fieldArrayDefaultValuesRef.current, getNodeParentName(name))
	        ? get(fieldArrayDefaultValuesRef.current, name, [])
	        : get(defaultValuesRef.current, name, []), keyName));
	    set(fieldArrayDefaultValuesRef.current, name, [...fields]);
	    fieldArrayNamesRef.current.add(name);
	    const omitKey = (fields) => fields.map((field) => omit((field || {}), keyName));
	    const getCurrentFieldsValues = () => {
	        const values = get(getFieldsValues(fieldsRef, defaultValuesRef.current), name, []);
	        return mapIds(get(fieldArrayDefaultValuesRef.current, name, []).map((item, index) => (Object.assign(Object.assign({}, item), values[index]))), keyName);
	    };
	    const getFocusDetail = (index, options) => options
	        ? !isUndefined$1(options.focusIndex)
	            ? `${name}.${options.focusIndex}`
	            : options.focusName
	                ? options.focusName
	                : !options.shouldFocus
	                    ? ''
	                    : `${name}.${index}`
	        : `${name}.${index}`;
	    const resetFields = (index) => (Array.isArray(index) ? index : [index]).forEach((currentIndex) => set(fieldsRef.current, `${name}${isUndefined$1(currentIndex) ? '' : `.${currentIndex}`}`, isUndefined$1(currentIndex) ? [] : undefined));
	    const setFieldsAndNotify = (fieldsValues = []) => setFields(mapIds(fieldsValues, keyName));
	    const cleanup = (ref) => !compact(get(ref, name, [])).length && unset(ref, name);
	    const updateDirtyFieldsWithDefaultValues = (updatedFieldArrayValues) => updatedFieldArrayValues &&
	        set(formStateRef.current.dirtyFields, name, setFieldArrayDirtyFields(omitKey(updatedFieldArrayValues), get(defaultValuesRef.current, name, []), get(formStateRef.current.dirtyFields, name, [])));
	    const batchStateUpdate = (method, args, updatedFieldArrayValues = [], shouldSet = true) => {
	        if (get(fieldsRef.current, name)) {
	            const output = method(get(fieldsRef.current, name), args.argA, args.argB);
	            shouldSet && set(fieldsRef.current, name, output);
	        }
	        if (Array.isArray(get(formStateRef.current.errors, name))) {
	            const output = method(get(formStateRef.current.errors, name), args.argA, args.argB);
	            shouldSet && set(formStateRef.current.errors, name, output);
	            cleanup(formStateRef.current.errors);
	        }
	        if (readFormStateRef.current.touchedFields &&
	            get(formStateRef.current.touchedFields, name)) {
	            const output = method(get(formStateRef.current.touchedFields, name), args.argA, args.argB);
	            shouldSet && set(formStateRef.current.touchedFields, name, output);
	            cleanup(formStateRef.current.touchedFields);
	        }
	        if (readFormStateRef.current.dirtyFields ||
	            readFormStateRef.current.isDirty) {
	            set(formStateRef.current.dirtyFields, name, setFieldArrayDirtyFields(omitKey(updatedFieldArrayValues), get(defaultValuesRef.current, name, []), get(formStateRef.current.dirtyFields, name, [])));
	            updateDirtyFieldsWithDefaultValues(updatedFieldArrayValues);
	            cleanup(formStateRef.current.dirtyFields);
	        }
	        if (readFormStateRef.current.isValid) {
	            set(validFieldsRef.current, name, method(get(validFieldsRef.current, name, []), args.argA));
	            cleanup(validFieldsRef.current);
	            set(fieldsWithValidationRef.current, name, method(get(fieldsWithValidationRef.current, name, []), args.argA));
	            cleanup(fieldsWithValidationRef.current);
	        }
	        formStateSubjectRef.current.next({
	            isDirty: getIsDirty(name, omitKey(updatedFieldArrayValues)),
	            errors: formStateRef.current.errors,
	            isValid: formStateRef.current.isValid,
	        });
	    };
	    const registerFieldArray = (values, index = 0, parentName = '') => values.forEach((appendValueItem, valueIndex) => !isPrimitive(appendValueItem) &&
	        Object.entries(appendValueItem).forEach(([key, value]) => {
	            const inputName = `${parentName || name}.${parentName ? valueIndex : index + valueIndex}.${key}`;
	            Array.isArray(value)
	                ? registerFieldArray(value, valueIndex, inputName)
	                : set(fieldsRef.current, inputName, {
	                    _f: {
	                        ref: {
	                            name: inputName,
	                        },
	                        name: inputName,
	                        value,
	                    },
	                });
	        }));
	    const append$1 = (value, options) => {
	        const appendValue = Array.isArray(value) ? value : [value];
	        const updatedFieldArrayValues = append(getCurrentFieldsValues(), appendValue);
	        const currentIndex = updatedFieldArrayValues.length - appendValue.length;
	        setFieldsAndNotify(updatedFieldArrayValues);
	        batchStateUpdate(append, {
	            argA: fillEmptyArray(value),
	        }, updatedFieldArrayValues, false);
	        registerFieldArray(appendValue, currentIndex);
	        focusNameRef.current = getFocusDetail(currentIndex, options);
	    };
	    const prepend$1 = (value, options) => {
	        const prependValue = Array.isArray(value) ? value : [value];
	        const updatedFieldArrayValues = prepend(getCurrentFieldsValues(), prependValue);
	        setFieldsAndNotify(updatedFieldArrayValues);
	        batchStateUpdate(prepend, {
	            argA: fillEmptyArray(value),
	        }, updatedFieldArrayValues);
	        registerFieldArray(prependValue);
	        focusNameRef.current = getFocusDetail(0, options);
	    };
	    const remove = (index) => {
	        const updatedFieldArrayValues = removeArrayAt(getCurrentFieldsValues(), index);
	        resetFields(index);
	        setFieldsAndNotify(updatedFieldArrayValues);
	        batchStateUpdate(removeArrayAt, {
	            argA: index,
	        }, updatedFieldArrayValues);
	    };
	    const insert$1 = (index, value, options) => {
	        const insertValue = Array.isArray(value) ? value : [value];
	        const updatedFieldArrayValues = insert(getCurrentFieldsValues(), index, insertValue);
	        setFieldsAndNotify(updatedFieldArrayValues);
	        batchStateUpdate(insert, {
	            argA: index,
	            argB: fillEmptyArray(value),
	        }, updatedFieldArrayValues);
	        registerFieldArray(insertValue, index);
	        focusNameRef.current = getFocusDetail(index, options);
	    };
	    const swap = (indexA, indexB) => {
	        const fieldValues = getCurrentFieldsValues();
	        swapArrayAt(fieldValues, indexA, indexB);
	        batchStateUpdate(swapArrayAt, {
	            argA: indexA,
	            argB: indexB,
	        }, fieldValues, false);
	        setFieldsAndNotify(fieldValues);
	    };
	    const move = (from, to) => {
	        const fieldValues = getCurrentFieldsValues();
	        moveArrayAt(fieldValues, from, to);
	        setFieldsAndNotify(fieldValues);
	        batchStateUpdate(moveArrayAt, {
	            argA: from,
	            argB: to,
	        }, fieldValues, false);
	    };
	    React__namespace.useEffect(() => {
	        if (isWatchAllRef.current) {
	            formStateSubjectRef.current.next({});
	        }
	        else {
	            for (const watchField of watchFieldsRef.current) {
	                if (name.startsWith(watchField)) {
	                    formStateSubjectRef.current.next({});
	                    break;
	                }
	            }
	        }
	        watchSubjectRef.current.next({
	            name,
	            value: get(getFieldsValues(fieldsRef, defaultValuesRef.current), name, []),
	        });
	        focusNameRef.current &&
	            focusFieldBy(fieldsRef.current, (key) => key.startsWith(focusNameRef.current));
	        focusNameRef.current = '';
	        fieldArraySubjectRef.current.next({
	            name,
	            fields: omitKey([...fields]),
	        });
	    }, [fields, name]);
	    React__namespace.useEffect(() => {
	        const fieldArraySubscription = fieldArraySubjectRef.current.subscribe({
	            next({ name: inputFieldArrayName, fields, isReset }) {
	                if (isReset) {
	                    unset(fieldsRef.current, inputFieldArrayName || name);
	                    inputFieldArrayName
	                        ? set(fieldArrayDefaultValuesRef.current, inputFieldArrayName, fields)
	                        : (fieldArrayDefaultValuesRef.current = fields);
	                    setFieldsAndNotify(get(fieldArrayDefaultValuesRef.current, name));
	                }
	            },
	        });
	        !get(fieldsRef.current, name) && set(fieldsRef.current, name, []);
	        return () => {
	            fieldArraySubscription.unsubscribe();
	            (shouldUnmountUnregister || shouldUnregister) && unregister(name);
	        };
	    }, []);
	    return {
	        swap: React__namespace.useCallback(swap, [name]),
	        move: React__namespace.useCallback(move, [name]),
	        prepend: React__namespace.useCallback(prepend$1, [name]),
	        append: React__namespace.useCallback(append$1, [name]),
	        remove: React__namespace.useCallback(remove, [name]),
	        insert: React__namespace.useCallback(insert$1, [name]),
	        fields: fields,
	    };
	};

	function getFields(fieldsNames, fieldsRefs) {
	    const currentFields = {};
	    for (const name of fieldsNames) {
	        const field = get(fieldsRefs, name);
	        if (field) {
	            !isKey(name)
	                ? set(currentFields, name, field._f)
	                : (currentFields[name] = field._f);
	        }
	    }
	    return currentFields;
	}

	var isFileInput = (element) => element.type === 'file';

	var isMultipleSelect = (element) => element.type === `${SELECT}-multiple`;

	var isRadioInput = (element) => element.type === 'radio';

	const defaultResult = {
	    value: false,
	    isValid: false,
	};
	const validResult = { value: true, isValid: true };
	var getCheckboxValue = (options) => {
	    if (Array.isArray(options)) {
	        if (options.length > 1) {
	            const values = options
	                .filter((option) => option && option.checked && !option.disabled)
	                .map((option) => option.value);
	            return { value: values, isValid: !!values.length };
	        }
	        return options[0].checked && !options[0].disabled
	            ? // @ts-expect-error expected to work in the browser
	                options[0].attributes && !isUndefined$1(options[0].attributes.value)
	                    ? isUndefined$1(options[0].value) || options[0].value === ''
	                        ? validResult
	                        : { value: options[0].value, isValid: true }
	                    : validResult
	            : defaultResult;
	    }
	    return defaultResult;
	};

	var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => valueAsNumber
	    ? value === ''
	        ? NaN
	        : +value
	    : valueAsDate
	        ? new Date(value)
	        : setValueAs
	            ? setValueAs(value)
	            : value;

	var getMultipleSelectValue = (options) => [...options]
	    .filter(({ selected }) => selected)
	    .map(({ value }) => value);

	const defaultReturn = {
	    isValid: false,
	    value: null,
	};
	var getRadioValue = (options) => Array.isArray(options)
	    ? options.reduce((previous, option) => option && option.checked && !option.disabled
	        ? {
	            isValid: true,
	            value: option.value,
	        }
	        : previous, defaultReturn)
	    : defaultReturn;

	function getFieldValue(field) {
	    if (field && field._f) {
	        const ref = field._f.ref;
	        if (ref.disabled) {
	            return;
	        }
	        if (isFileInput(ref)) {
	            return ref.files;
	        }
	        if (isRadioInput(ref)) {
	            return getRadioValue(field._f.refs).value;
	        }
	        if (isMultipleSelect(ref)) {
	            return getMultipleSelectValue(ref.options);
	        }
	        if (isCheckBoxInput(ref)) {
	            return getCheckboxValue(field._f.refs).value;
	        }
	        return getFieldValueAs(isUndefined$1(ref.value) ? field._f.ref.value : ref.value, field._f);
	    }
	}

	var hasValidation = (options) => options &&
	    (options.required ||
	        options.min ||
	        options.max ||
	        options.maxLength ||
	        options.minLength ||
	        options.pattern ||
	        options.validate);

	var skipValidation = ({ isOnBlur, isOnChange, isOnTouch, isTouched, isReValidateOnBlur, isReValidateOnChange, isBlurEvent, isSubmitted, isOnAll, }) => {
	    if (isOnAll) {
	        return false;
	    }
	    else if (!isSubmitted && isOnTouch) {
	        return !(isTouched || isBlurEvent);
	    }
	    else if (isSubmitted ? isReValidateOnBlur : isOnBlur) {
	        return !isBlurEvent;
	    }
	    else if (isSubmitted ? isReValidateOnChange : isOnChange) {
	        return isBlurEvent;
	    }
	    return true;
	};

	var isFunction = (value) => typeof value === 'function';

	var isString$1 = (value) => typeof value === 'string';

	var isMessage = (value) => isString$1(value) || React__namespace.isValidElement(value);

	var isRegex = (value) => value instanceof RegExp;

	function getValidateError(result, ref, type = 'validate') {
	    if (isMessage(result) || (isBoolean(result) && !result)) {
	        return {
	            type,
	            message: isMessage(result) ? result : '',
	            ref,
	        };
	    }
	}

	var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData)
	    ? validationData
	    : {
	        value: validationData,
	        message: '',
	    };

	var validateField = async ({ _f: { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, value: inputValue, valueAsNumber, }, }, validateAllFieldCriteria) => {
	    const error = {};
	    const isRadio = isRadioInput(ref);
	    const isCheckBox = isCheckBoxInput(ref);
	    const isRadioOrCheckbox = isRadio || isCheckBox;
	    const isEmpty = ((valueAsNumber || isFileInput(ref)) && !ref.value) ||
	        inputValue === '' ||
	        (Array.isArray(inputValue) && !inputValue.length);
	    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
	    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
	        const message = exceedMax ? maxLengthMessage : minLengthMessage;
	        error[name] = Object.assign({ type: exceedMax ? maxType : minType, message,
	            ref }, appendErrorsCurry(exceedMax ? maxType : minType, message));
	    };
	    if (required &&
	        ((!isRadio && !isCheckBox && (isEmpty || isNullOrUndefined(inputValue))) ||
	            (isBoolean(inputValue) && !inputValue) ||
	            (isCheckBox && !getCheckboxValue(refs).isValid) ||
	            (isRadio && !getRadioValue(refs).isValid))) {
	        const { value, message } = isMessage(required)
	            ? { value: !!required, message: required }
	            : getValueAndMessage(required);
	        if (value) {
	            error[name] = Object.assign({ type: INPUT_VALIDATION_RULES.required, message, ref: isRadioOrCheckbox ? (refs || [])[0] || {} : ref }, appendErrorsCurry(INPUT_VALIDATION_RULES.required, message));
	            if (!validateAllFieldCriteria) {
	                return error;
	            }
	        }
	    }
	    if ((!isNullOrUndefined(min) || !isNullOrUndefined(max)) &&
	        inputValue !== '') {
	        let exceedMax;
	        let exceedMin;
	        const maxOutput = getValueAndMessage(max);
	        const minOutput = getValueAndMessage(min);
	        if (!isNaN(inputValue)) {
	            const valueNumber = ref.valueAsNumber || parseFloat(inputValue);
	            if (!isNullOrUndefined(maxOutput.value)) {
	                exceedMax = valueNumber > maxOutput.value;
	            }
	            if (!isNullOrUndefined(minOutput.value)) {
	                exceedMin = valueNumber < minOutput.value;
	            }
	        }
	        else {
	            const valueDate = ref.valueAsDate || new Date(inputValue);
	            if (isString$1(maxOutput.value)) {
	                exceedMax = valueDate > new Date(maxOutput.value);
	            }
	            if (isString$1(minOutput.value)) {
	                exceedMin = valueDate < new Date(minOutput.value);
	            }
	        }
	        if (exceedMax || exceedMin) {
	            getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
	            if (!validateAllFieldCriteria) {
	                return error;
	            }
	        }
	    }
	    if (isString$1(inputValue) && !isEmpty && (maxLength || minLength)) {
	        const maxLengthOutput = getValueAndMessage(maxLength);
	        const minLengthOutput = getValueAndMessage(minLength);
	        const exceedMax = !isNullOrUndefined(maxLengthOutput.value) &&
	            inputValue.length > maxLengthOutput.value;
	        const exceedMin = !isNullOrUndefined(minLengthOutput.value) &&
	            inputValue.length < minLengthOutput.value;
	        if (exceedMax || exceedMin) {
	            getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
	            if (!validateAllFieldCriteria) {
	                return error;
	            }
	        }
	    }
	    if (isString$1(inputValue) && pattern && !isEmpty) {
	        const { value: patternValue, message } = getValueAndMessage(pattern);
	        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
	            error[name] = Object.assign({ type: INPUT_VALIDATION_RULES.pattern, message,
	                ref }, appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message));
	            if (!validateAllFieldCriteria) {
	                return error;
	            }
	        }
	    }
	    if (validate) {
	        const validateRef = isRadioOrCheckbox && refs ? refs[0] : ref;
	        if (isFunction(validate)) {
	            const result = await validate(inputValue);
	            const validateError = getValidateError(result, validateRef);
	            if (validateError) {
	                error[name] = Object.assign(Object.assign({}, validateError), appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message));
	                if (!validateAllFieldCriteria) {
	                    return error;
	                }
	            }
	        }
	        else if (isObject(validate)) {
	            let validationResult = {};
	            for (const [key, validateFunction] of Object.entries(validate)) {
	                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
	                    break;
	                }
	                const validateResult = await validateFunction(inputValue);
	                const validateError = getValidateError(validateResult, validateRef, key);
	                if (validateError) {
	                    validationResult = Object.assign(Object.assign({}, validateError), appendErrorsCurry(key, validateError.message));
	                    if (validateAllFieldCriteria) {
	                        error[name] = validationResult;
	                    }
	                }
	            }
	            if (!isEmptyObject(validationResult)) {
	                error[name] = Object.assign({ ref: validateRef }, validationResult);
	                if (!validateAllFieldCriteria) {
	                    return error;
	                }
	            }
	        }
	    }
	    return error;
	};

	var getValidationModes = (mode) => ({
	    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
	    isOnBlur: mode === VALIDATION_MODE.onBlur,
	    isOnChange: mode === VALIDATION_MODE.onChange,
	    isOnAll: mode === VALIDATION_MODE.all,
	    isOnTouch: mode === VALIDATION_MODE.onTouched,
	});

	var isHTMLElement = (value) => value instanceof HTMLElement;

	var isRadioOrCheckboxFunction = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);

	class Subscription {
	    constructor() {
	        this.tearDowns = [];
	    }
	    add(tearDown) {
	        this.tearDowns.push(tearDown);
	    }
	    unsubscribe() {
	        for (const teardown of this.tearDowns) {
	            teardown();
	        }
	        this.tearDowns = [];
	    }
	}
	class Subscriber {
	    constructor(observer, subscription) {
	        this.observer = observer;
	        this.closed = false;
	        subscription.add(() => (this.closed = true));
	    }
	    next(value) {
	        if (!this.closed) {
	            this.observer.next(value);
	        }
	    }
	}
	class Subject {
	    constructor() {
	        this.observers = [];
	    }
	    next(value) {
	        for (const observer of this.observers) {
	            observer.next(value);
	        }
	    }
	    subscribe(observer) {
	        const subscription = new Subscription();
	        const subscriber = new Subscriber(observer, subscription);
	        this.observers.push(subscriber);
	        return subscription;
	    }
	    unsubscribe() {
	        this.observers = [];
	    }
	}

	const isWindowUndefined = typeof window === UNDEFINED;
	function useForm({ mode = VALIDATION_MODE.onSubmit, reValidateMode = VALIDATION_MODE.onChange, resolver, context, defaultValues = {}, shouldFocusError = true, shouldUnregister, criteriaMode, } = {}) {
	    const fieldsRef = React__namespace.useRef({});
	    const fieldsNamesRef = React__namespace.useRef(new Set());
	    const formStateSubjectRef = React__namespace.useRef(new Subject());
	    const unregisterFieldsNamesRef = React__namespace.useRef(new Set());
	    const watchSubjectRef = React__namespace.useRef(new Subject());
	    const controllerSubjectRef = React__namespace.useRef(new Subject());
	    const fieldArraySubjectRef = React__namespace.useRef(new Subject());
	    const fieldArrayDefaultValuesRef = React__namespace.useRef({});
	    const watchFieldsRef = React__namespace.useRef(new Set());
	    const isMountedRef = React__namespace.useRef(false);
	    const fieldsWithValidationRef = React__namespace.useRef({});
	    const validFieldsRef = React__namespace.useRef({});
	    const defaultValuesRef = React__namespace.useRef(defaultValues);
	    const isWatchAllRef = React__namespace.useRef(false);
	    const contextRef = React__namespace.useRef(context);
	    const resolverRef = React__namespace.useRef(resolver);
	    const fieldArrayNamesRef = React__namespace.useRef(new Set());
	    const validationMode = getValidationModes(mode);
	    const isValidateAllFieldCriteria = criteriaMode === VALIDATION_MODE.all;
	    const [formState, setFormState] = React__namespace.useState({
	        isDirty: false,
	        isValidating: false,
	        dirtyFields: {},
	        isSubmitted: false,
	        submitCount: 0,
	        touchedFields: {},
	        isSubmitting: false,
	        isSubmitSuccessful: false,
	        isValid: !validationMode.isOnSubmit,
	        errors: {},
	    });
	    const readFormStateRef = React__namespace.useRef({
	        isDirty: !isProxyEnabled,
	        dirtyFields: !isProxyEnabled,
	        touchedFields: !isProxyEnabled,
	        isValidating: !isProxyEnabled,
	        isValid: !isProxyEnabled,
	        errors: !isProxyEnabled,
	    });
	    const formStateRef = React__namespace.useRef(formState);
	    contextRef.current = context;
	    resolverRef.current = resolver;
	    const getIsValid = () => (formStateRef.current.isValid =
	        deepEqual(validFieldsRef.current, fieldsWithValidationRef.current) &&
	            isEmptyObject(formStateRef.current.errors));
	    const shouldRenderBaseOnError = React__namespace.useCallback((name, error, shouldRender = false, state = {}, isValid, isWatched) => {
	        const previousError = get(formStateRef.current.errors, name);
	        let shouldReRender = shouldRender ||
	            !deepEqual(previousError, error, true) ||
	            (readFormStateRef.current.isValid &&
	                isUndefined$1(error) &&
	                get(fieldsWithValidationRef.current, name) &&
	                !get(validFieldsRef.current, name));
	        if (error) {
	            unset(validFieldsRef.current, name);
	            shouldReRender =
	                shouldReRender ||
	                    !previousError ||
	                    !deepEqual(previousError, error, true);
	            set(formStateRef.current.errors, name, error);
	        }
	        else {
	            if (get(fieldsWithValidationRef.current, name) || resolverRef.current) {
	                set(validFieldsRef.current, name, true);
	                shouldReRender = shouldReRender || previousError;
	            }
	            unset(formStateRef.current.errors, name);
	        }
	        if ((shouldReRender && !isNullOrUndefined(shouldRender)) ||
	            !isEmptyObject(state) ||
	            isWatched) {
	            const updatedFormState = Object.assign(Object.assign({}, state), { isValid: resolverRef.current ? !!isValid : getIsValid(), errors: formStateRef.current.errors });
	            formStateRef.current = Object.assign(Object.assign({}, formStateRef.current), updatedFormState);
	            formStateSubjectRef.current.next(isWatched ? {} : updatedFormState);
	        }
	        formStateSubjectRef.current.next({
	            isValidating: false,
	        });
	    }, []);
	    const setFieldValue = React__namespace.useCallback((name, rawValue, options = {}, shouldRender, shouldRegister) => {
	        shouldRegister && register(name);
	        const _f = get(fieldsRef.current, name, {})._f;
	        if (_f) {
	            const value = isWeb && isHTMLElement(_f.ref) && isNullOrUndefined(rawValue)
	                ? ''
	                : rawValue;
	            _f.value = rawValue;
	            if (isRadioInput(_f.ref)) {
	                (_f.refs || []).forEach((radioRef) => (radioRef.checked = radioRef.value === value));
	            }
	            else if (isFileInput(_f.ref) && !isString$1(value)) {
	                _f.ref.files = value;
	            }
	            else if (isMultipleSelect(_f.ref)) {
	                [..._f.ref.options].forEach((selectRef) => (selectRef.selected = value.includes(selectRef.value)));
	            }
	            else if (isCheckBoxInput(_f.ref) && _f.refs) {
	                _f.refs.length > 1
	                    ? _f.refs.forEach((checkboxRef) => (checkboxRef.checked = Array.isArray(value)
	                        ? !!value.find((data) => data === checkboxRef.value)
	                        : value === checkboxRef.value))
	                    : (_f.refs[0].checked = !!value);
	            }
	            else {
	                _f.ref.value = value;
	            }
	            if (shouldRender) {
	                const values = getFieldsValues(fieldsRef);
	                set(values, name, rawValue);
	                controllerSubjectRef.current.next({
	                    values: Object.assign(Object.assign({}, defaultValuesRef.current), values),
	                    name,
	                });
	            }
	            options.shouldDirty && updateAndGetDirtyState(name, value);
	            options.shouldValidate && trigger(name);
	        }
	    }, []);
	    const getIsDirty = React__namespace.useCallback((name, data) => {
	        const formValues = getFieldsValues(fieldsRef);
	        name && data && set(formValues, name, data);
	        return !deepEqual(formValues, defaultValuesRef.current);
	    }, []);
	    const updateAndGetDirtyState = React__namespace.useCallback((name, inputValue, shouldRender = true) => {
	        if (readFormStateRef.current.isDirty ||
	            readFormStateRef.current.dirtyFields) {
	            const isFieldDirty = !deepEqual(get(defaultValuesRef.current, name), inputValue);
	            const isDirtyFieldExist = get(formStateRef.current.dirtyFields, name);
	            const previousIsDirty = formStateRef.current.isDirty;
	            isFieldDirty
	                ? set(formStateRef.current.dirtyFields, name, true)
	                : unset(formStateRef.current.dirtyFields, name);
	            formStateRef.current.isDirty = getIsDirty();
	            const state = {
	                isDirty: formStateRef.current.isDirty,
	                dirtyFields: formStateRef.current.dirtyFields,
	            };
	            const isChanged = (readFormStateRef.current.isDirty &&
	                previousIsDirty !== state.isDirty) ||
	                (readFormStateRef.current.dirtyFields &&
	                    isDirtyFieldExist !== get(formStateRef.current.dirtyFields, name));
	            isChanged && shouldRender && formStateSubjectRef.current.next(state);
	            return isChanged ? state : {};
	        }
	        return {};
	    }, []);
	    const executeValidation = React__namespace.useCallback(async (name, skipReRender) => {
	        const error = (await validateField(get(fieldsRef.current, name), isValidateAllFieldCriteria))[name];
	        shouldRenderBaseOnError(name, error, skipReRender);
	        return isUndefined$1(error);
	    }, [isValidateAllFieldCriteria]);
	    const executeSchemaOrResolverValidation = React__namespace.useCallback(async (names, currentNames = []) => {
	        const { errors } = await resolverRef.current(getFieldsValues(fieldsRef, shouldUnregister ? {} : defaultValuesRef.current), contextRef.current, {
	            criteriaMode,
	            names: currentNames,
	            fields: getFields(fieldsNamesRef.current, fieldsRef.current),
	        });
	        for (const name of names) {
	            const error = get(errors, name);
	            error
	                ? set(formStateRef.current.errors, name, error)
	                : unset(formStateRef.current.errors, name);
	        }
	        return errors;
	    }, [criteriaMode]);
	    const validateForm = async (fieldsRef) => {
	        for (const name in fieldsRef) {
	            const field = fieldsRef[name];
	            if (field) {
	                const _f = field._f;
	                const current = omit(field, '_f');
	                if (_f) {
	                    const fieldError = await validateField(field, isValidateAllFieldCriteria);
	                    if (fieldError[_f.name]) {
	                        set(formStateRef.current.errors, _f.name, fieldError[_f.name]);
	                        unset(validFieldsRef.current, _f.name);
	                    }
	                    else if (get(fieldsWithValidationRef.current, _f.name)) {
	                        set(validFieldsRef.current, _f.name, true);
	                        unset(formStateRef.current.errors, _f.name);
	                    }
	                }
	                current && (await validateForm(current));
	            }
	        }
	    };
	    const trigger = React__namespace.useCallback(async (name) => {
	        const fields = isUndefined$1(name)
	            ? Object.keys(fieldsRef.current)
	            : Array.isArray(name)
	                ? name
	                : [name];
	        let isValid;
	        formStateSubjectRef.current.next({
	            isValidating: true,
	        });
	        if (resolverRef.current) {
	            isValid = isEmptyObject(await executeSchemaOrResolverValidation(fields, isUndefined$1(name)
	                ? undefined
	                : fields));
	        }
	        else {
	            isValid = !!(isUndefined$1(name)
	                ? await validateForm(fieldsRef.current)
	                : (await Promise.all(fields
	                    .filter((fieldName) => get(fieldsRef.current, fieldName))
	                    .map(async (fieldName) => await executeValidation(fieldName, null)))).every(Boolean));
	        }
	        formStateSubjectRef.current.next({
	            errors: formStateRef.current.errors,
	            isValidating: false,
	            isValid: resolverRef.current ? isValid : getIsValid(),
	        });
	        return isValid;
	    }, [executeSchemaOrResolverValidation, executeValidation]);
	    const setInternalValues = React__namespace.useCallback((name, value, options) => Object.entries(value).forEach(([inputKey, inputValue]) => {
	        const fieldName = `${name}.${inputKey}`;
	        const field = get(fieldsRef.current, fieldName);
	        field && !field._f
	            ? setInternalValues(fieldName, inputValue, options)
	            : setFieldValue(fieldName, inputValue, options, true, !field);
	    }), [trigger]);
	    const isFieldWatched = (name) => isWatchAllRef.current ||
	        watchFieldsRef.current.has(name) ||
	        watchFieldsRef.current.has((name.match(/\w+/) || [])[0]);
	    const updateValidAndValue = (name, options, ref, isWithinRefCallback) => {
	        const field = get(fieldsRef.current, name);
	        const defaultValue = isUndefined$1(field._f.value)
	            ? get(defaultValuesRef.current, name)
	            : field._f.value;
	        if (field && !isUndefined$1(defaultValue)) {
	            if (ref && ref.defaultChecked) {
	                field._f.value = getFieldValue(field);
	            }
	            else if (!isNameInFieldArray(fieldArrayNamesRef.current, name)) {
	                setFieldValue(name, defaultValue);
	            }
	            else {
	                field._f.value = defaultValue;
	            }
	        }
	        if ((!isUndefined$1(defaultValue) || isWithinRefCallback) &&
	            hasValidation(options) &&
	            !validationMode.isOnSubmit &&
	            field &&
	            readFormStateRef.current.isValid) {
	            validateField(field, isValidateAllFieldCriteria).then((error) => {
	                isEmptyObject(error)
	                    ? set(validFieldsRef.current, name, true)
	                    : unset(validFieldsRef.current, name);
	                formStateRef.current.isValid !== getIsValid() &&
	                    setFormState(Object.assign(Object.assign({}, formStateRef.current), { isValid: getIsValid() }));
	            });
	        }
	        return defaultValue;
	    };
	    const setValue = (name, value, options = {}) => {
	        const field = get(fieldsRef.current, name);
	        const isFieldArray = fieldArrayNamesRef.current.has(name);
	        if (isFieldArray) {
	            fieldArraySubjectRef.current.next({
	                fields: value,
	                name,
	                isReset: true,
	            });
	            if ((readFormStateRef.current.isDirty ||
	                readFormStateRef.current.dirtyFields) &&
	                options.shouldDirty) {
	                set(formStateRef.current.dirtyFields, name, setFieldArrayDirtyFields(value, get(defaultValuesRef.current, name, []), get(formStateRef.current.dirtyFields, name, [])));
	                formStateSubjectRef.current.next({
	                    dirtyFields: formStateRef.current.dirtyFields,
	                    isDirty: getIsDirty(name, value),
	                });
	            }
	            !value.length &&
	                set(fieldsRef.current, name, []) &&
	                set(fieldArrayDefaultValuesRef.current, name, []);
	        }
	        (field && !field._f) || isFieldArray
	            ? setInternalValues(name, value, isFieldArray ? {} : options)
	            : setFieldValue(name, value, options, true, !field);
	        isFieldWatched(name) && formStateSubjectRef.current.next({});
	        watchSubjectRef.current.next({ name, value });
	    };
	    const handleChange = React__namespace.useCallback(async ({ type, target, target: { value, type: inputType } }) => {
	        let name = target.name;
	        let error;
	        let isValid;
	        const field = get(fieldsRef.current, name);
	        if (field) {
	            let inputValue = inputType ? getFieldValue(field) : undefined;
	            inputValue = isUndefined$1(inputValue) ? value : inputValue;
	            const isBlurEvent = type === EVENTS.BLUR;
	            const { isOnBlur: isReValidateOnBlur, isOnChange: isReValidateOnChange, } = getValidationModes(reValidateMode);
	            const shouldSkipValidation = (!hasValidation(field._f) &&
	                !resolverRef.current &&
	                !get(formStateRef.current.errors, name)) ||
	                skipValidation(Object.assign({ isBlurEvent, isTouched: !!get(formStateRef.current.touchedFields, name), isSubmitted: formStateRef.current.isSubmitted, isReValidateOnBlur,
	                    isReValidateOnChange }, validationMode));
	            const isWatched = !isBlurEvent && isFieldWatched(name);
	            if (!isUndefined$1(inputValue)) {
	                field._f.value = inputValue;
	            }
	            const state = updateAndGetDirtyState(name, field._f.value, false);
	            if (isBlurEvent && !get(formStateRef.current.touchedFields, name)) {
	                set(formStateRef.current.touchedFields, name, true);
	                readFormStateRef.current.touchedFields &&
	                    (state.touchedFields = formStateRef.current.touchedFields);
	            }
	            let shouldRender = !isEmptyObject(state) || isWatched;
	            if (shouldSkipValidation) {
	                !isBlurEvent &&
	                    watchSubjectRef.current.next({
	                        name,
	                        type,
	                        value: inputValue,
	                    });
	                return (shouldRender &&
	                    formStateSubjectRef.current.next(isWatched ? {} : state));
	            }
	            formStateSubjectRef.current.next({
	                isValidating: true,
	            });
	            if (resolverRef.current) {
	                const { errors } = await resolverRef.current(getFieldsValues(fieldsRef, shouldUnregister ? {} : defaultValuesRef.current), contextRef.current, {
	                    criteriaMode,
	                    fields: getFields([name], fieldsRef.current),
	                    names: [name],
	                });
	                const previousFormIsValid = formStateRef.current.isValid;
	                error = get(errors, name);
	                if (isCheckBoxInput(target) && !error) {
	                    const parentNodeName = getNodeParentName(name);
	                    const currentError = get(errors, parentNodeName, {});
	                    currentError.type && currentError.message && (error = currentError);
	                    if (currentError ||
	                        get(formStateRef.current.errors, parentNodeName)) {
	                        name = parentNodeName;
	                    }
	                }
	                isValid = isEmptyObject(errors);
	                previousFormIsValid !== isValid && (shouldRender = true);
	            }
	            else {
	                error = (await validateField(field, isValidateAllFieldCriteria))[name];
	            }
	            !isBlurEvent &&
	                watchSubjectRef.current.next({
	                    name,
	                    type,
	                    value: inputValue,
	                });
	            shouldRenderBaseOnError(name, error, shouldRender, state, isValid, isWatched);
	        }
	    }, []);
	    const getValues = (fieldNames) => {
	        const values = isMountedRef.current
	            ? getFieldsValues(fieldsRef, shouldUnregister ? {} : defaultValuesRef.current)
	            : defaultValuesRef.current;
	        return isUndefined$1(fieldNames)
	            ? values
	            : isString$1(fieldNames)
	                ? get(values, fieldNames)
	                : fieldNames.map((name) => get(values, name));
	    };
	    const updateIsValid = React__namespace.useCallback(async (values = {}) => {
	        const previousIsValid = formStateRef.current.isValid;
	        if (resolver) {
	            const { errors } = await resolverRef.current(Object.assign(Object.assign({}, getFieldsValues(fieldsRef, shouldUnregister ? {} : defaultValuesRef.current)), values), contextRef.current, {
	                criteriaMode,
	                fields: getFields(fieldsNamesRef.current, fieldsRef.current),
	            });
	            formStateRef.current.isValid = isEmptyObject(errors);
	        }
	        else {
	            getIsValid();
	        }
	        previousIsValid !== formStateRef.current.isValid &&
	            formStateSubjectRef.current.next({
	                isValid: formStateRef.current.isValid,
	            });
	    }, [criteriaMode]);
	    const clearErrors = (name) => {
	        name &&
	            (Array.isArray(name) ? name : [name]).forEach((inputName) => unset(formStateRef.current.errors, inputName));
	        formStateSubjectRef.current.next({
	            errors: name ? formStateRef.current.errors : {},
	        });
	    };
	    const setError = (name, error, options) => {
	        const ref = ((get(fieldsRef.current, name) || { _f: {} })._f || {}).ref;
	        set(formStateRef.current.errors, name, Object.assign(Object.assign({}, error), { ref }));
	        formStateSubjectRef.current.next({
	            errors: formStateRef.current.errors,
	            isValid: false,
	        });
	        options && options.shouldFocus && ref && ref.focus && ref.focus();
	    };
	    const watchInternal = React__namespace.useCallback((fieldNames, defaultValue, isGlobal) => {
	        const isArrayNames = Array.isArray(fieldNames);
	        const fieldValues = isMountedRef.current
	            ? getFieldsValues(fieldsRef, defaultValuesRef.current)
	            : isUndefined$1(defaultValue)
	                ? defaultValuesRef.current
	                : isArrayNames
	                    ? defaultValue || {}
	                    : { [fieldNames]: defaultValue };
	        if (isUndefined$1(fieldNames)) {
	            isGlobal && (isWatchAllRef.current = true);
	            return fieldValues;
	        }
	        const result = [];
	        for (const fieldName of isArrayNames ? fieldNames : [fieldNames]) {
	            isGlobal && watchFieldsRef.current.add(fieldName);
	            result.push(get(fieldValues, fieldName));
	        }
	        return isArrayNames ? result : result[0];
	    }, []);
	    const watch = (fieldName, defaultValue) => isFunction(fieldName)
	        ? watchSubjectRef.current.subscribe({
	            next: (info) => fieldName(watchInternal(undefined, defaultValue), info),
	        })
	        : watchInternal(fieldName, defaultValue, true);
	    const unregisterInternal = (name, options = {}, notify) => {
	        for (const inputName of name
	            ? Array.isArray(name)
	                ? name
	                : [name]
	            : Object.keys(fieldsNamesRef.current)) {
	            fieldsNamesRef.current.delete(inputName);
	            fieldArrayNamesRef.current.delete(inputName);
	            if (get(fieldsRef.current, inputName)) {
	                if (!options.keepIsValid) {
	                    unset(fieldsWithValidationRef.current, inputName);
	                    unset(validFieldsRef.current, inputName);
	                }
	                !options.keepError && unset(formStateRef.current.errors, inputName);
	                !options.keepValue && unset(fieldsRef.current, inputName);
	                !options.keepDirty &&
	                    unset(formStateRef.current.dirtyFields, inputName);
	                !options.keepTouched &&
	                    unset(formStateRef.current.touchedFields, inputName);
	                (!shouldUnregister || notify) &&
	                    !options.keepDefaultValue &&
	                    unset(defaultValuesRef.current, inputName);
	                notify &&
	                    watchSubjectRef.current.next({
	                        name: inputName,
	                    });
	            }
	        }
	        if (notify) {
	            formStateSubjectRef.current.next(Object.assign(Object.assign(Object.assign({}, formStateRef.current), (!options.keepDirty ? {} : { isDirty: getIsDirty() })), (resolverRef.current ? {} : { isValid: getIsValid() })));
	            !options.keepIsValid && updateIsValid();
	        }
	    };
	    const unregister = (name, options = {}) => unregisterInternal(name, options, true);
	    const registerFieldRef = (name, ref, options) => {
	        register(name, options);
	        let field = get(fieldsRef.current, name);
	        const isRadioOrCheckbox = isRadioOrCheckboxFunction(ref);
	        if (ref === field._f.ref ||
	            (isWeb && isHTMLElement(field._f.ref) && !isHTMLElement(ref)) ||
	            (isRadioOrCheckbox &&
	                Array.isArray(field._f.refs) &&
	                compact(field._f.refs).find((option) => option === ref))) {
	            return;
	        }
	        field = {
	            _f: isRadioOrCheckbox
	                ? Object.assign(Object.assign({}, field._f), { refs: [
	                        ...compact(field._f.refs || []).filter((ref) => isHTMLElement(ref) && document.contains(ref)),
	                        ref,
	                    ], ref: { type: ref.type, name } }) : Object.assign(Object.assign({}, field._f), { ref }),
	        };
	        set(fieldsRef.current, name, field);
	        const defaultValue = updateValidAndValue(name, options, ref, true);
	        if (isRadioOrCheckbox && Array.isArray(defaultValue)
	            ? !deepEqual(get(fieldsRef.current, name)._f.value, defaultValue)
	            : isUndefined$1(get(fieldsRef.current, name)._f.value)) {
	            get(fieldsRef.current, name)._f.value = getFieldValue(get(fieldsRef.current, name));
	        }
	    };
	    const register = React__namespace.useCallback((name, options) => {
	        const isInitialRegister = !get(fieldsRef.current, name);
	        set(fieldsRef.current, name, {
	            _f: Object.assign(Object.assign(Object.assign({}, (isInitialRegister
	                ? { ref: { name } }
	                : Object.assign({ ref: (get(fieldsRef.current, name)._f || {}).ref }, get(fieldsRef.current, name)._f))), { name }), options),
	        });
	        hasValidation(options) &&
	            set(fieldsWithValidationRef.current, name, true);
	        fieldsNamesRef.current.add(name);
	        isInitialRegister && updateValidAndValue(name, options);
	        return isWindowUndefined
	            ? { name: name }
	            : {
	                name,
	                onChange: handleChange,
	                onBlur: handleChange,
	                ref: (ref) => {
	                    ref
	                        ? registerFieldRef(name, ref, options)
	                        : (shouldUnregister || (options && options.shouldUnregister)) &&
	                            isWeb &&
	                            unregisterFieldsNamesRef.current.add(name);
	                },
	            };
	    }, [defaultValuesRef.current]);
	    const handleSubmit = React__namespace.useCallback((onValid, onInvalid) => async (e) => {
	        if (e) {
	            e.preventDefault && e.preventDefault();
	            e.persist && e.persist();
	        }
	        let fieldValues = Object.assign(Object.assign({}, (shouldUnregister ? {} : defaultValuesRef.current)), getFieldsValues(fieldsRef));
	        formStateSubjectRef.current.next({
	            isSubmitting: true,
	        });
	        try {
	            if (resolverRef.current) {
	                const { errors, values } = await resolverRef.current(fieldValues, contextRef.current, {
	                    criteriaMode,
	                    fields: getFields(fieldsNamesRef.current, fieldsRef.current),
	                });
	                formStateRef.current.errors = errors;
	                fieldValues = values;
	            }
	            else {
	                await validateForm(fieldsRef.current);
	            }
	            if (isEmptyObject(formStateRef.current.errors) &&
	                Object.keys(formStateRef.current.errors).every((name) => get(fieldValues, name))) {
	                formStateSubjectRef.current.next({
	                    errors: {},
	                    isSubmitting: true,
	                });
	                await onValid(fieldValues, e);
	            }
	            else {
	                onInvalid && (await onInvalid(formStateRef.current.errors, e));
	                shouldFocusError &&
	                    focusFieldBy(fieldsRef.current, (key) => get(formStateRef.current.errors, key), fieldsNamesRef.current);
	            }
	        }
	        finally {
	            formStateRef.current.isSubmitted = true;
	            formStateSubjectRef.current.next({
	                isSubmitted: true,
	                isSubmitting: false,
	                isSubmitSuccessful: isEmptyObject(formStateRef.current.errors),
	                submitCount: formStateRef.current.submitCount + 1,
	                errors: formStateRef.current.errors,
	            });
	        }
	    }, [shouldFocusError, isValidateAllFieldCriteria, criteriaMode]);
	    const resetFromState = React__namespace.useCallback(({ keepErrors, keepDirty, keepIsSubmitted, keepTouched, keepDefaultValues, keepIsValid, keepSubmitCount, }, values) => {
	        if (!keepIsValid) {
	            validFieldsRef.current = {};
	            fieldsWithValidationRef.current = {};
	        }
	        watchFieldsRef.current = new Set();
	        isWatchAllRef.current = false;
	        formStateSubjectRef.current.next({
	            submitCount: keepSubmitCount ? formStateRef.current.submitCount : 0,
	            isDirty: keepDirty
	                ? formStateRef.current.isDirty
	                : keepDefaultValues
	                    ? deepEqual(values, defaultValuesRef.current)
	                    : false,
	            isSubmitted: keepIsSubmitted ? formStateRef.current.isSubmitted : false,
	            isValid: keepIsValid
	                ? formStateRef.current.isValid
	                : !!updateIsValid(values),
	            dirtyFields: keepDirty ? formStateRef.current.dirtyFields : {},
	            touchedFields: keepTouched ? formStateRef.current.touchedFields : {},
	            errors: keepErrors ? formStateRef.current.errors : {},
	            isSubmitting: false,
	            isSubmitSuccessful: false,
	        });
	    }, []);
	    const reset = (values, keepStateOptions = {}) => {
	        const updatedValues = values || defaultValuesRef.current;
	        if (isWeb && !keepStateOptions.keepValues) {
	            for (const name of fieldsNamesRef.current) {
	                const field = get(fieldsRef.current, name);
	                if (field && field._f) {
	                    const inputRef = Array.isArray(field._f.refs)
	                        ? field._f.refs[0]
	                        : field._f.ref;
	                    if (isHTMLElement(inputRef)) {
	                        try {
	                            inputRef.closest('form').reset();
	                            break;
	                        }
	                        catch (_a) { }
	                    }
	                }
	            }
	        }
	        !keepStateOptions.keepDefaultValues &&
	            (defaultValuesRef.current = Object.assign({}, updatedValues));
	        if (!keepStateOptions.keepValues) {
	            fieldsRef.current = {};
	            controllerSubjectRef.current.next({
	                values: Object.assign({}, updatedValues),
	            });
	            watchSubjectRef.current.next({
	                value: Object.assign({}, updatedValues),
	            });
	            fieldArraySubjectRef.current.next({
	                fields: Object.assign({}, updatedValues),
	                isReset: true,
	            });
	        }
	        resetFromState(keepStateOptions, values);
	        isMountedRef.current = false;
	    };
	    const setFocus = (name) => get(fieldsRef.current, name)._f.ref.focus();
	    React__namespace.useEffect(() => {
	        const formStateSubscription = formStateSubjectRef.current.subscribe({
	            next(formState = {}) {
	                if (shouldRenderFormState(formState, readFormStateRef.current, true)) {
	                    formStateRef.current = Object.assign(Object.assign({}, formStateRef.current), formState);
	                    setFormState(formStateRef.current);
	                }
	            },
	        });
	        const useFieldArraySubscription = fieldArraySubjectRef.current.subscribe({
	            next(state) {
	                if (state.fields && state.name && readFormStateRef.current.isValid) {
	                    const values = getFieldsValues(fieldsRef);
	                    set(values, state.name, state.fields);
	                    updateIsValid(values);
	                }
	            },
	        });
	        resolverRef.current && readFormStateRef.current.isValid && updateIsValid();
	        return () => {
	            watchSubjectRef.current.unsubscribe();
	            formStateSubscription.unsubscribe();
	            useFieldArraySubscription.unsubscribe();
	        };
	    }, []);
	    React__namespace.useEffect(() => {
	        const isLiveInDom = (ref) => !isHTMLElement(ref) || !document.contains(ref);
	        isMountedRef.current = true;
	        unregisterFieldsNamesRef.current.forEach((name) => {
	            const field = get(fieldsRef.current, name);
	            field &&
	                (field._f.refs
	                    ? field._f.refs.every(isLiveInDom)
	                    : isLiveInDom(field._f.ref)) &&
	                unregisterInternal(name);
	        });
	        unregisterFieldsNamesRef.current = new Set();
	    });
	    return {
	        control: React__namespace.useMemo(() => ({
	            register,
	            isWatchAllRef,
	            watchFieldsRef,
	            getIsDirty,
	            formStateSubjectRef,
	            fieldArraySubjectRef,
	            controllerSubjectRef,
	            watchSubjectRef,
	            watchInternal,
	            fieldsRef,
	            validFieldsRef,
	            fieldsWithValidationRef,
	            fieldArrayNamesRef,
	            readFormStateRef,
	            formStateRef,
	            defaultValuesRef,
	            fieldArrayDefaultValuesRef,
	            unregister: unregisterInternal,
	            shouldUnmountUnregister: shouldUnregister,
	        }), []),
	        formState: getProxyFormState(isProxyEnabled, formState, readFormStateRef),
	        trigger,
	        register,
	        handleSubmit,
	        watch: React__namespace.useCallback(watch, []),
	        setValue: React__namespace.useCallback(setValue, [setInternalValues]),
	        getValues: React__namespace.useCallback(getValues, []),
	        reset: React__namespace.useCallback(reset, []),
	        clearErrors: React__namespace.useCallback(clearErrors, []),
	        unregister: React__namespace.useCallback(unregister, []),
	        setError: React__namespace.useCallback(setError, []),
	        setFocus: React__namespace.useCallback(setFocus, []),
	    };
	}

	function useWatch(props) {
	    const { control, name, defaultValue } = props || {};
	    const methods = useFormContext();
	    const nameRef = React__namespace.useRef(name);
	    nameRef.current = name;
	    const { watchInternal, watchSubjectRef } = control || methods.control;
	    const [value, updateValue] = React__namespace.useState(isUndefined$1(defaultValue)
	        ? watchInternal(name)
	        : defaultValue);
	    React__namespace.useEffect(() => {
	        watchInternal(name);
	        const watchSubscription = watchSubjectRef.current.subscribe({
	            next: ({ name: inputName, value }) => (!nameRef.current ||
	                !inputName ||
	                (Array.isArray(nameRef.current)
	                    ? nameRef.current
	                    : [nameRef.current]).some((fieldName) => inputName &&
	                    fieldName &&
	                    (fieldName.startsWith(inputName) ||
	                        inputName.startsWith(fieldName)))) &&
	                updateValue(isString$1(inputName) &&
	                    nameRef.current === inputName &&
	                    !isUndefined$1(value)
	                    ? value
	                    : watchInternal(nameRef.current, defaultValue)),
	        });
	        return () => watchSubscription.unsubscribe();
	    }, []);
	    return value;
	}

	var s$1=function(s){var t=s.as,a=s.errors,m=s.name,o=s.message,i=s.render,l=function(e,r){if(null==e)return {};var n,s,t={},a=Object.keys(e);for(s=0;s<a.length;s++)r.indexOf(n=a[s])>=0||(t[n]=e[n]);return t}(s,["as","errors","name","message","render"]),f=useFormContext(),c=get(a||f.formState.errors,m);if(!c)return null;var g=c.message,u=c.types,d=Object.assign({},l,{children:g||o});return React__namespace.isValidElement(t)?React__namespace.cloneElement(t,d):i?i({message:g||o,messages:u}):React__namespace.createElement(t||React__namespace.Fragment,d)};

	var reactDomFactories = createCommonjsModule(function (module, exports) {

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function(f) {
	  {
	    module.exports = f(React__default['default']);
	    /* global define */
	  }
	})(function(React) {
	  /**
	   * Create a factory that creates HTML tag elements.
	   */
	  function createDOMFactory(type) {
	    var factory = React.createElement.bind(null, type);
	    // Expose the type on the factory and the prototype so that it can be
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
	    tspan: createDOMFactory('tspan'),
	  };

	  // due to wrapper and conditionals at the top, this will either become
	  // `module.exports ReactDOMFactories` if that is available,
	  // otherwise it will be defined via `define(['react'], ReactDOMFactories)`
	  // if that is available,
	  // otherwise it will be defined as global variable.
	  return ReactDOMFactories;
	});
	});

	/*!@license
	 * UAParser.js v0.7.28
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
	 * Licensed under MIT License
	 */

	var uaParser = createCommonjsModule(function (module, exports) {
	(function (window, undefined$1) {

	    //////////////
	    // Constants
	    /////////////


	    var LIBVERSION  = '0.7.28',
	        EMPTY       = '',
	        UNKNOWN     = '?',
	        FUNC_TYPE   = 'function',
	        UNDEF_TYPE  = 'undefined',
	        OBJ_TYPE    = 'object',
	        STR_TYPE    = 'string',
	        MAJOR       = 'major', // deprecated
	        MODEL       = 'model',
	        NAME        = 'name',
	        TYPE        = 'type',
	        VENDOR      = 'vendor',
	        VERSION     = 'version',
	        ARCHITECTURE= 'architecture',
	        CONSOLE     = 'console',
	        MOBILE      = 'mobile',
	        TABLET      = 'tablet',
	        SMARTTV     = 'smarttv',
	        WEARABLE    = 'wearable',
	        EMBEDDED    = 'embedded',
	        UA_MAX_LENGTH = 255;


	    ///////////
	    // Helper
	    //////////


	    var util = {
	        extend : function (regexes, extensions) {
	            var mergedRegexes = {};
	            for (var i in regexes) {
	                if (extensions[i] && extensions[i].length % 2 === 0) {
	                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
	                } else {
	                    mergedRegexes[i] = regexes[i];
	                }
	            }
	            return mergedRegexes;
	        },
	        has : function (str1, str2) {
	            return typeof str1 === STR_TYPE ? str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1 : false;
	        },
	        lowerize : function (str) {
	            return str.toLowerCase();
	        },
	        major : function (version) {
	            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined$1;
	        },
	        trim : function (str, len) {
	            str = str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	            return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
	        }
	    };


	    ///////////////
	    // Map helper
	    //////////////


	    var mapper = {

	        rgx : function (ua, arrays) {

	            var i = 0, j, k, p, q, matches, match;

	            // loop through all regexes maps
	            while (i < arrays.length && !matches) {

	                var regex = arrays[i],       // even sequence (0,2,4,..)
	                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
	                j = k = 0;

	                // try matching uastring with regexes
	                while (j < regex.length && !matches) {

	                    matches = regex[j++].exec(ua);

	                    if (!!matches) {
	                        for (p = 0; p < props.length; p++) {
	                            match = matches[++k];
	                            q = props[p];
	                            // check if given property is actually array
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
	                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
	                                    } else {
	                                        // sanitize match using given regex
	                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
	                                    }
	                                } else if (q.length == 4) {
	                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
	                                }
	                            } else {
	                                this[q] = match ? match : undefined$1;
	                            }
	                        }
	                    }
	                }
	                i += 2;
	            }
	        },

	        str : function (str, map) {

	            for (var i in map) {
	                // check if array
	                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (util.has(map[i][j], str)) {
	                            return (i === UNKNOWN) ? undefined$1 : i;
	                        }
	                    }
	                } else if (util.has(map[i], str)) {
	                    return (i === UNKNOWN) ? undefined$1 : i;
	                }
	            }
	            return str;
	        }
	    };


	    ///////////////
	    // String map
	    //////////////


	    var maps = {

	        browser : {
	            // Safari < 3.0
	            oldSafari : {
	                version : {
	                    '1.0'   : '/8',
	                    '1.2'   : '/1',
	                    '1.3'   : '/3',
	                    '2.0'   : '/412',
	                    '2.0.2' : '/416',
	                    '2.0.3' : '/417',
	                    '2.0.4' : '/419',
	                    '?'     : '/'
	                }
	            },
	            oldEdge : {
	                version : {
	                    '0.1'   : '12.',
	                    '21'    : '13.',
	                    '31'    : '14.',
	                    '39'    : '15.',
	                    '41'    : '16.',
	                    '42'    : '17.',
	                    '44'    : '18.'
	                }
	            }
	        },

	        os : {
	            windows : {
	                version : {
	                    'ME'        : '4.90',
	                    'NT 3.11'   : 'NT3.51',
	                    'NT 4.0'    : 'NT4.0',
	                    '2000'      : 'NT 5.0',
	                    'XP'        : ['NT 5.1', 'NT 5.2'],
	                    'Vista'     : 'NT 6.0',
	                    '7'         : 'NT 6.1',
	                    '8'         : 'NT 6.2',
	                    '8.1'       : 'NT 6.3',
	                    '10'        : ['NT 6.4', 'NT 10.0'],
	                    'RT'        : 'ARM'
	                }
	            }
	        }
	    };


	    //////////////
	    // Regex map
	    /////////////


	    var regexes = {

	        browser : [[

	            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
	            ], [VERSION, [NAME, 'Chrome']], [
	            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
	            ], [VERSION, [NAME, 'Edge']], [
	            // breaking change (reserved for next major release):
	            ///edge\/([\w\.]+)/i                                                  // Old Edge (Trident)
	            //], [[VERSION, mapper.str, maps.browser.oldEdge.version], [NAME, 'Edge']], [

	            // Presto based
	            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
	            /(opera\s[mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,                // Opera Mobi/Tablet
	            /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i,                         // Opera
	            ], [NAME, VERSION], [
	            /opios[\/\s]+([\w\.]+)/i                                            // Opera mini on iphone >= 8.0
	            ], [VERSION, [NAME, 'Opera Mini']], [
	            /\sopr\/([\w\.]+)/i                                                 // Opera Webkit
	            ], [VERSION, [NAME, 'Opera']], [

	            // Mixed
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,     // Lunascape/Maxthon/Netfront/Jasmine/Blazer
	            // Trident based
	            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,             // Avant/IEMobile/SlimBrowser
	            /(ba?idubrowser)[\/\s]?([\w\.]+)/i,                                 // Baidu Browser
	            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

	            // Webkit/KHTML based
	            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
	                                                                                // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
	            /(rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.]+)/i,         // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
	            /(weibo)__([\d\.]+)/i                                               // Weibo
	            ], [NAME, VERSION], [
	            /(?:[\s\/]uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i           // UCBrowser
	            ], [VERSION, [NAME, 'UCBrowser']], [
	            /(?:windowswechat)?\sqbcore\/([\w\.]+)\b.*(?:windowswechat)?/i      // WeChat Desktop for Windows Built-in Browser
	            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
	            /micromessenger\/([\w\.]+)/i                                        // WeChat
	            ], [VERSION, [NAME, 'WeChat']], [
	            /konqueror\/([\w\.]+)/i                                             // Konqueror
	            ], [VERSION, [NAME, 'Konqueror']], [
	            /trident.+rv[:\s]([\w\.]{1,9})\b.+like\sgecko/i                     // IE11
	            ], [VERSION, [NAME, 'IE']], [
	            /yabrowser\/([\w\.]+)/i                                             // Yandex
	            ], [VERSION, [NAME, 'Yandex']], [
	            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
	            ], [[NAME, /(.+)/, '$1 Secure Browser'], VERSION], [
	            /focus\/([\w\.]+)/i                                                 // Firefox Focus
	            ], [VERSION, [NAME, 'Firefox Focus']], [
	            /opt\/([\w\.]+)/i                                                   // Opera Touch
	            ], [VERSION, [NAME, 'Opera Touch']], [
	            /coc_coc_browser\/([\w\.]+)/i                                       // Coc Coc Browser
	            ], [VERSION, [NAME, 'Coc Coc']], [
	            /dolfin\/([\w\.]+)/i                                                // Dolphin
	            ], [VERSION, [NAME, 'Dolphin']], [
	            /coast\/([\w\.]+)/i                                                 // Opera Coast
	            ], [VERSION, [NAME, 'Opera Coast']],
	            [/xiaomi\/miuibrowser\/([\w\.]+)/i                                  // MIUI Browser
	            ], [VERSION, [NAME, 'MIUI Browser']], [
	            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
	            ], [VERSION, [NAME, 'Firefox']], [
	            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
	            ], [[NAME, '360 Browser']], [
	            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
	            ], [[NAME, /(.+)/, '$1 Browser'], VERSION], [                       // Oculus/Samsung/Sailfish Browser
	            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
	            ], [[NAME, /_/g, ' '], VERSION], [
	            /\s(electron)\/([\w\.]+)\ssafari/i,                                 // Electron-based App
	            /(tesla)(?:\sqtcarbrowser|\/(20[12]\d\.[\w\.-]+))/i,                // Tesla
	            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i           // QQBrowser/Baidu App/2345 Browser
	            ], [NAME, VERSION], [
	            /(MetaSr)[\/\s]?([\w\.]+)/i,                                        // SouGouBrowser
	            /(LBBROWSER)/i                                                      // LieBao Browser
	            ], [NAME], [

	            // WebView
	            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android with version
	            ], [VERSION, [NAME, 'Facebook']], [
	            /FBAN\/FBIOS|FB_IAB\/FB4A/i                                         // Facebook App for iOS & Android without version
	            ], [[NAME, 'Facebook']], [
	            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
	            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
	            /(chromium|instagram)[\/\s]([\w\.-]+)/i                             // Chromium/Instagram
	            ], [NAME, VERSION], [
	            /\bgsa\/([\w\.]+)\s.*safari\//i                                     // Google Search Appliance on iOS
	            ], [VERSION, [NAME, 'GSA']], [

	            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
	            ], [VERSION, [NAME, 'Chrome Headless']], [

	            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
	            ], [[NAME, 'Chrome WebView'], VERSION], [

	            /droid.+\sversion\/([\w\.]+)\b.+(?:mobile\ssafari|safari)/i         // Android Browser
	            ], [VERSION, [NAME, 'Android Browser']], [

	            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia
	            ], [NAME, VERSION], [

	            /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i                      // Mobile Safari
	            ], [VERSION, [NAME, 'Mobile Safari']], [
	            /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i                   // Safari & Safari Mobile
	            ], [VERSION, NAME], [
	            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
	            ], [NAME, [VERSION, mapper.str, maps.browser.oldSafari.version]], [

	            /(webkit|khtml)\/([\w\.]+)/i
	            ], [NAME, VERSION], [

	            // Gecko based
	            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
	            ], [[NAME, 'Netscape'], VERSION], [
	            /ile\svr;\srv:([\w\.]+)\).+firefox/i                                // Firefox Reality
	            ], [VERSION, [NAME, 'Firefox Reality']], [
	            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
	            /(swiftfox)/i,                                                      // Swiftfox
	            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
	                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	            /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,                       // Other Firefox-based
	            /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,                        // Mozilla

	            // Other
	            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
	                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	            /(links)\s\(([\w\.]+)/i,                                            // Links
	            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
	            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
	            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
	            ], [NAME, VERSION]
	        ],

	        cpu : [[

	            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
	            ], [[ARCHITECTURE, 'amd64']], [

	            /(ia32(?=;))/i                                                      // IA32 (quicktime)
	            ], [[ARCHITECTURE, util.lowerize]], [

	            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
	            ], [[ARCHITECTURE, 'ia32']], [

	            /\b(aarch64|armv?8e?l?)\b/i                                         // ARM64
	            ], [[ARCHITECTURE, 'arm64']], [

	            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
	            ], [[ARCHITECTURE, 'armhf']], [

	            // PocketPC mistakenly identified as PowerPC
	            /windows\s(ce|mobile);\sppc;/i
	            ], [[ARCHITECTURE, 'arm']], [

	            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
	            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

	            /(sun4\w)[;\)]/i                                                    // SPARC
	            ], [[ARCHITECTURE, 'sparc']], [

	            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
	                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	            ], [[ARCHITECTURE, util.lowerize]]
	        ],

	        device : [[

	            //////////////////////////
	            // MOBILES & TABLETS
	            // Ordered by popularity
	            /////////////////////////

	            // Samsung
	            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus\s10)/i
	            ], [MODEL, [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy\snexus)/i,
	            /\ssamsung[\s-]([\w-]+)/i,
	            /sec-(sgh\w+)/i
	            ], [MODEL, [VENDOR, 'Samsung'], [TYPE, MOBILE]], [

	            // Apple
	            /\((ip(?:hone|od)[\s\w]*);/i                                        // iPod/iPhone
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [
	            /\((ipad);[\w\s\),;-]+apple/i,                                      // iPad
	            /applecoremedia\/[\w\.]+\s\((ipad)/i,
	            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

	            // Huawei
	            /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i,
	            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [
	            /d\/huawei([\w\s-]+)[;\)]/i,
	            /\b(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
	            /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
	            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

	            // Xiaomi
	            /\b(poco[\s\w]+)(?:\sbuild|\))/i,                                   // Xiaomi POCO
	            /\b;\s(\w+)\sbuild\/hm\1/i,                                         // Xiaomi Hongmi 'numeric' models
	            /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,                       // Xiaomi Hongmi
	            /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?:\sbuild|\))/i,              // Xiaomi Redmi
	            /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i  // Xiaomi Mi
	            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
	            /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?:\sbuild|\))/i                  // Mi Pad tablets
	            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [

	            // OPPO
	            /;\s(\w+)\sbuild.+\soppo/i,
	            /\s(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
	            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

	            // Vivo
	            /\svivo\s(\w+)(?:\sbuild|\))/i,
	            /\s(v[12]\d{3}\w?[at])(?:\sbuild|;)/i
	            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

	            // Realme
	            /\s(rmx[12]\d{3})(?:\sbuild|;)/i
	            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

	            // Motorola
	            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)\b[\w\s]+build\//i,
	            /\smot(?:orola)?[\s-](\w*)/i,
	            /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?=\sbuild|\)))/i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
	            /\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

	            // LG
	            /((?=lg)?[vl]k\-?\d{3})\sbuild|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
	            /(lm-?f100[nv]?|nexus\s[45])/i,
	            /lg[e;\s\/-]+((?!browser|netcast)\w+)/i,
	            /\blg(\-?[\d\w]+)\sbuild/i
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

	            // Lenovo
	            /(ideatab[\w\-\s]+)/i,
	            /lenovo\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i        // Lenovo tablets
	            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

	            // Nokia
	            /(?:maemo|nokia).*(n900|lumia\s\d+)/i,
	            /nokia[\s_-]?([\w\.-]*)/i
	            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

	            // Google
	            /droid.+;\s(pixel\sc)[\s)]/i                                        // Google Pixel C
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [
	            /droid.+;\s(pixel[\s\daxl]{0,6})(?:\sbuild|\))/i                    // Google Pixel
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

	            // Sony
	            /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	            /sony\stablet\s[ps]\sbuild\//i,
	            /(?:sony)?sgp\w+(?:\sbuild\/|\))/i
	            ], [[MODEL, 'Xperia Tablet'], [VENDOR, 'Sony'], [TYPE, TABLET]], [

	            // OnePlus
	            /\s(kb2005|in20[12]5|be20[12][59])\b/i,
	            /\ba000(1)\sbuild/i,                                                // OnePlus
	            /\boneplus\s(a\d{4})[\s)]/i
	            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

	            // Amazon
	            /(alexa)webm/i,
	            /(kf[a-z]{2}wi)(\sbuild\/|\))/i,                                    // Kindle Fire without Silk
	            /(kf[a-z]+)(\sbuild\/|\)).+silk\//i                                 // Kindle Fire HD
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
	            /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i                    // Fire Phone
	            ], [[MODEL, 'Fire Phone'], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

	            // BlackBerry
	            /\((playbook);[\w\s\),;-]+(rim)/i                                   // BlackBerry PlayBook
	            ], [MODEL, VENDOR, [TYPE, TABLET]], [
	            /((?:bb[a-f]|st[hv])100-\d)/i,
	            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
	            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [

	            // Asus
	            /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus\s7|padfone|p00[cj])/i
	            ], [MODEL, [VENDOR, 'ASUS'], [TYPE, TABLET]], [
	            /\s(z[es]6[027][01][km][ls]|zenfone\s\d\w?)\b/i
	            ], [MODEL, [VENDOR, 'ASUS'], [TYPE, MOBILE]], [

	            // HTC
	            /(nexus\s9)/i                                                       // HTC Nexus 9
	            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
	            /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,                    // HTC

	            // ZTE
	            /(zte)-(\w*)/i,
	            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
	            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

	            // Acer
	            /droid[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i
	            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

	            // Meizu
	            /droid.+;\s(m[1-5]\snote)\sbuild/i,
	            /\bmz-([\w-]{2,})/i
	            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

	            // MIXED
	            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
	                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
	            /(asus)-?(\w+)/i,                                                   // Asus
	            /(microsoft);\s(lumia[\s\w]+)/i,                                    // Microsoft Lumia
	            /(lenovo)[_\s-]?([\w-]+)/i,                                         // Lenovo
	            /linux;.+(jolla);/i,                                                // Jolla
	            /droid.+;\s(oppo)\s?([\w\s]+)\sbuild/i                              // OPPO
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /(archos)\s(gamepad2?)/i,                                           // Archos
	            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
	            /(dell)\s(strea[kpr\s\d]*[\dko])/i,                                 // Dell Streak
	            /[;\/]\s?(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbuild/i,                   // Le Pan Tablets
	            /[;\/]\s?(trinity)[\-\s]*(t\d{3})\sbuild/i,                         // Trinity Tablets
	            /\b(gigaset)[\s\-]+(q\w{1,9})\sbuild/i,                             // Gigaset Tablets
	            /\b(vodafone)\s([\w\s]+)(?:\)|\sbuild)/i                            // Vodafone
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /\s(surface\sduo)\s/i                                               // Surface Duo
	            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, TABLET]], [
	            /droid\s[\d\.]+;\s(fp\du?)\sbuild/i
	            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
	            /\s(u304aa)\sbuild/i                                                // AT&T
	            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
	            /sie-(\w*)/i                                                        // Siemens
	            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
	            /[;\/]\s?(rct\w+)\sbuild/i                                          // RCA Tablets
	            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
	            /[;\/\s](venue[\d\s]{2,7})\sbuild/i                                 // Dell Venue Tablets
	            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
	            /[;\/]\s?(q(?:mv|ta)\w+)\sbuild/i                                   // Verizon Tablet
	            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
	            /[;\/]\s(?:barnes[&\s]+noble\s|bn[rt])([\w\s\+]*)\sbuild/i          // Barnes & Noble Tablet
	            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
	            /[;\/]\s(tm\d{3}\w+)\sbuild/i
	            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
	            /;\s(k88)\sbuild/i                                                  // ZTE K Series Tablet
	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
	            /;\s(nx\d{3}j)\sbuild/i                                             // ZTE Nubia
	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	            /[;\/]\s?(gen\d{3})\sbuild.*49h/i                                   // Swiss GEN Mobile
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
	            /[;\/]\s?(zur\d{3})\sbuild/i                                        // Swiss ZUR Tablet
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
	            /[;\/]\s?((zeki)?tb.*\b)\sbuild/i                                   // Zeki Tablets
	            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
	            /[;\/]\s([yr]\d{2})\sbuild/i,
	            /[;\/]\s(dragon[\-\s]+touch\s|dt)(\w{5})\sbuild/i                   // Dragon Touch Tablet
	            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
	            /[;\/]\s?(ns-?\w{0,9})\sbuild/i                                     // Insignia Tablets
	            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
	            /[;\/]\s?((nxa|Next)-?\w{0,9})\sbuild/i                             // NextBook Tablets
	            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
	            /[;\/]\s?(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05]))\sbuild/i
	            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones
	            /[;\/]\s?(lvtel\-)?(v1[12])\sbuild/i                                // LvTel Phones
	            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
	            /;\s(ph-1)\s/i
	            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1
	            /[;\/]\s?(v(100md|700na|7011|917g).*\b)\sbuild/i                    // Envizen Tablets
	            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
	            /[;\/]\s?(trio[\s\w\-\.]+)\sbuild/i                                 // MachSpeed Tablets
	            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
	            /[;\/]\s?tu_(1491)\sbuild/i                                         // Rotor Tablets
	            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
	            /(shield[\w\s]+)\sbuild/i                                           // Nvidia Shield Tablets
	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
	            /(sprint)\s(\w+)/i                                                  // Sprint Phones
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
	            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [
	            /droid\s[\d\.]+;\s(cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i     // Zebra
	            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, TABLET]], [
	            /droid\s[\d\.]+;\s(ec30|ps20|tc[2-8]\d[kx])\)/i
	            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, MOBILE]], [

	            ///////////////////
	            // CONSOLES
	            ///////////////////

	            /\s(ouya)\s/i,                                                      // Ouya
	            /(nintendo)\s([wids3utch]+)/i                                       // Nintendo
	            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
	            /droid.+;\s(shield)\sbuild/i                                        // Nvidia
	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
	            /(playstation\s[345portablevi]+)/i                                  // Playstation
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [
	            /[\s\(;](xbox(?:\sone)?(?!;\sxbox))[\s\);]/i                        // Microsoft Xbox
	            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [

	            ///////////////////
	            // SMARTTVS
	            ///////////////////

	            /smart-tv.+(samsung)/i                                              // Samsung
	            ], [VENDOR, [TYPE, SMARTTV]], [
	            /hbbtv.+maple;(\d+)/i
	            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [
	            /(?:linux;\snetcast.+smarttv|lg\snetcast\.tv-201\d)/i,              // LG SmartTV
	            ], [[VENDOR, 'LG'], [TYPE, SMARTTV]], [
	            /(apple)\s?tv/i                                                     // Apple TV
	            ], [VENDOR, [MODEL, 'Apple TV'], [TYPE, SMARTTV]], [
	            /crkey/i                                                            // Google Chromecast
	            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [
	            /droid.+aft([\w])(\sbuild\/|\))/i                                   // Fire TV
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [
	            /\(dtv[\);].+(aquos)/i                                              // Sharp
	            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
	            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
	            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [
	            /[\s\/\(](android\s|smart[-\s]?|opera\s)tv[;\)\s]/i                 // SmartTV from Unidentified Vendors
	            ], [[TYPE, SMARTTV]], [

	            ///////////////////
	            // WEARABLES
	            ///////////////////

	            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
	            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
	            /droid.+;\s(glass)\s\d/i                                            // Google Glass
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [
	            /droid\s[\d\.]+;\s(wt63?0{2,3})\)/i
	            ], [MODEL, [VENDOR, 'Zebra'], [TYPE, WEARABLE]], [

	            ///////////////////
	            // EMBEDDED
	            ///////////////////

	            /(tesla)(?:\sqtcarbrowser|\/20[12]\d\.[\w\.-]+)/i                   // Tesla
	            ], [VENDOR, [TYPE, EMBEDDED]], [

	            ////////////////////
	            // MIXED (GENERIC)
	            ///////////////////

	            /droid .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i    // Android Phones from Unidentified Vendors
	            ], [MODEL, [TYPE, MOBILE]], [
	            /droid .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i  // Android Tablets from Unidentified Vendors
	            ], [MODEL, [TYPE, TABLET]], [
	            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
	            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
	            ], [[TYPE, util.lowerize]], [
	            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
	            ], [MODEL, [VENDOR, 'Generic']], [
	            /(phone)/i
	            ], [[TYPE, MOBILE]]
	        ],

	        engine : [[

	            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
	            ], [VERSION, [NAME, 'EdgeHTML']], [

	            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
	            ], [VERSION, [NAME, 'Blink']], [

	            /(presto)\/([\w\.]+)/i,                                             // Presto
	            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
	            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
	            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
	            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
	            ], [NAME, VERSION], [

	            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
	            ], [VERSION, NAME]
	        ],

	        os : [[

	            // Windows
	            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
	            ], [NAME, VERSION], [
	            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
	            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
	            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)(?!.+xbox)/i
	            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
	            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
	            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	            // iOS/macOS
	            /ip[honead]{2,4}\b(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,          // iOS
	            /cfnetwork\/.+darwin/i
	            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
	            /(mac\sos\sx)\s?([\w\s\.]*)/i,
	            /(macintosh|mac(?=_powerpc)\s)(?!.+haiku)/i                         // Mac OS
	            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	            // Mobile OSes                                                      // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
	            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
	            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
	            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
	            /\((series40);/i                                                    // Series 40
	            ], [NAME, VERSION], [
	            /\(bb(10);/i                                                        // BlackBerry 10
	            ], [VERSION, [NAME, 'BlackBerry']], [
	            /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i       // Symbian
	            ], [VERSION, [NAME, 'Symbian']], [
	            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
	            ], [[NAME, 'Firefox OS']], [
	            /web0s;.+rt(tv)/i,
	            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
	            ], [VERSION, [NAME, 'webOS']], [

	            // Google Chromecast
	            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
	            ], [VERSION, [NAME, 'Chromecast']], [
	            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
	            ], [[NAME, 'Chromium OS'], VERSION],[

	            // Console
	            /(nintendo|playstation)\s([wids345portablevuch]+)/i,                // Nintendo/Playstation
	            /(xbox);\s+xbox\s([^\);]+)/i,                                       // Microsoft Xbox (360, One, X, S, Series X, Series S)

	            // GNU/Linux based
	            /(mint)[\/\s\(\)]?(\w*)/i,                                          // Mint
	            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
	            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?=\slinux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?:\sgnu\/linux)?(?:\slinux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
	                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
	            /(gnu)\s?([\w\.]*)/i,                                               // GNU

	            // BSD based
	            /\s([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,  // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	            /(haiku)\s(\w+)/i                                                   // Haiku
	            ], [NAME, VERSION], [

	            // Other
	            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
	            ], [[NAME, 'Solaris'], VERSION], [
	            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
	            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
	            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,  // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
	            /(unix)\s?([\w\.]*)/i                                               // UNIX
	            ], [NAME, VERSION]
	        ]
	    };


	    /////////////////
	    // Constructor
	    ////////////////
	    var UAParser = function (ua, extensions) {

	        if (typeof ua === 'object') {
	            extensions = ua;
	            ua = undefined$1;
	        }

	        if (!(this instanceof UAParser)) {
	            return new UAParser(ua, extensions).getResult();
	        }

	        var _ua = ua || ((typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
	        var _rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

	        this.getBrowser = function () {
	            var _browser = { name: undefined$1, version: undefined$1 };
	            mapper.rgx.call(_browser, _ua, _rgxmap.browser);
	            _browser.major = util.major(_browser.version); // deprecated
	            return _browser;
	        };
	        this.getCPU = function () {
	            var _cpu = { architecture: undefined$1 };
	            mapper.rgx.call(_cpu, _ua, _rgxmap.cpu);
	            return _cpu;
	        };
	        this.getDevice = function () {
	            var _device = { vendor: undefined$1, model: undefined$1, type: undefined$1 };
	            mapper.rgx.call(_device, _ua, _rgxmap.device);
	            return _device;
	        };
	        this.getEngine = function () {
	            var _engine = { name: undefined$1, version: undefined$1 };
	            mapper.rgx.call(_engine, _ua, _rgxmap.engine);
	            return _engine;
	        };
	        this.getOS = function () {
	            var _os = { name: undefined$1, version: undefined$1 };
	            mapper.rgx.call(_os, _ua, _rgxmap.os);
	            return _os;
	        };
	        this.getResult = function () {
	            return {
	                ua      : this.getUA(),
	                browser : this.getBrowser(),
	                engine  : this.getEngine(),
	                os      : this.getOS(),
	                device  : this.getDevice(),
	                cpu     : this.getCPU()
	            };
	        };
	        this.getUA = function () {
	            return _ua;
	        };
	        this.setUA = function (ua) {
	            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? util.trim(ua, UA_MAX_LENGTH) : ua;
	            return this;
	        };
	        this.setUA(_ua);
	        return this;
	    };

	    UAParser.VERSION = LIBVERSION;
	    UAParser.BROWSER = {
	        NAME    : NAME,
	        MAJOR   : MAJOR, // deprecated
	        VERSION : VERSION
	    };
	    UAParser.CPU = {
	        ARCHITECTURE : ARCHITECTURE
	    };
	    UAParser.DEVICE = {
	        MODEL   : MODEL,
	        VENDOR  : VENDOR,
	        TYPE    : TYPE,
	        CONSOLE : CONSOLE,
	        MOBILE  : MOBILE,
	        SMARTTV : SMARTTV,
	        TABLET  : TABLET,
	        WEARABLE: WEARABLE,
	        EMBEDDED: EMBEDDED
	    };
	    UAParser.ENGINE = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };
	    UAParser.OS = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };

	    ///////////
	    // Export
	    //////////


	    // check js environment
	    {
	        // nodejs env
	        if (module.exports) {
	            exports = module.exports = UAParser;
	        }
	        exports.UAParser = UAParser;
	    }

	    // jQuery/Zepto specific (optional)
	    // Note:
	    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	    //   and we should catch that.
	    var $ = typeof window !== 'undefined' && (window.jQuery || window.Zepto);
	    if ($ && !$.ua) {
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

	var global$1 = typeof global$1 !== "undefined"
	    ? global$1
	    : typeof globalThis !== "undefined"
	        ? globalThis
	        : {};
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
	function displayComponent$1(options = {}) {
	    const { jsonx = {}, props } = options;
	    const propsToCompare = jsonx.comparisonprops;
	    const comparisons = Array.isArray(propsToCompare)
	        ? propsToCompare.map(comp => {
	            const compares = {};
	            if (Array.isArray(comp.left)) {
	                compares.left = comp.left;
	            }
	            if (Array.isArray(comp.right)) {
	                compares.right = comp.right;
	            }
	            const propcompares = traverse(compares, props || jsonx.props);
	            const opscompares = Object.assign({}, comp, propcompares);
	            // console.debug({ opscompares, compares, renderedCompProps });
	            switch (opscompares.operation) {
	                case "eq":
	                case "==":
	                    // return opscompares.left == opscompares.right;
	                    // eslint-disable-next-line
	                    return opscompares.left == opscompares.right;
	                case "dneq":
	                case "!=":
	                case "!":
	                    // return opscompares.left != opscompares.right;
	                    return opscompares.left !== opscompares.right;
	                case "dnseq":
	                case "!==":
	                    return opscompares.left !== opscompares.right;
	                case "seq":
	                case "===":
	                    return opscompares.left === opscompares.right;
	                case "lt":
	                case "<":
	                    return opscompares.left < opscompares.right;
	                case "lte":
	                case "<=":
	                    return opscompares.left <= opscompares.right;
	                case "gt":
	                case ">":
	                    return opscompares.left > opscompares.right;
	                case "gte":
	                case ">=":
	                    return opscompares.left >= opscompares.right;
	                case "dne":
	                case "undefined":
	                case "null":
	                    return opscompares.left === undefined || opscompares.left === null;
	                case "!null":
	                case "!undefined":
	                case "exists":
	                default:
	                    //'exists'
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
	        })
	        : [];
	    const validProps = comparisons.filter(comp => comp === true);
	    if (!jsonx.comparisonprops) {
	        return true;
	    }
	    else if (jsonx.comparisonorprops && validProps.length < 1) {
	        return false;
	    }
	    else if (validProps.length !== comparisons.length &&
	        !jsonx.comparisonorprops) {
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
	    var window = window;
	    if (typeof window === "undefined") {
	        if (this && this.window) {
	            window = this.window;
	        }
	        else if (typeof global$1 !== "undefined" && (typeof global$1!=="undefined" ? global$1 : window).window) {
	            window = (typeof global$1!=="undefined" ? global$1 : window).window;
	        }
	        else if (typeof globalThis !== "undefined" && globalThis.window) {
	            window = globalThis.window;
	        }
	        if (!window || !window.navigator)
	            return false;
	    }
	    try {
	        if (window &&
	            window.navigator &&
	            window.navigator.userAgent &&
	            typeof window.navigator.userAgent === "string") {
	            // console.log('window.navigator.userAgent',window.navigator.userAgent)
	            if (window.navigator.userAgent.indexOf("Trident") !== -1) {
	                return false;
	            }
	            const uastring = window.navigator.userAgent;
	            //@ts-ignore
	            const parser = new uaParser();
	            parser.setUA(uastring);
	            const parseUserAgent = parser.getResult();
	            // console.log({ parseUserAgent, });
	            if ((parseUserAgent.browser.name === "Chrome" ||
	                parseUserAgent.browser.name === "Chrome WebView") &&
	                parseUserAgent.os.name === "Android" &&
	                parseInt(parseUserAgent.browser.version, 10) < 50) {
	                return false;
	            }
	            if (parseUserAgent.browser.name === "Android Browser") {
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
	function traverse(paths = {}, data = {}) {
	    let keys = Object.keys(paths);
	    if (!keys.length)
	        return paths;
	    return keys.reduce((result, key) => {
	        //@ts-ignore
	        if (typeof paths[key] === "string")
	            result[key] = data[paths[key]];
	        else if (Array.isArray(paths[key])) {
	            let _path = Object.assign([], paths[key]);
	            let value = data;
	            while (_path.length && value && typeof value === "object") {
	                let prop = _path.shift();
	                //@ts-ignore
	                value = value[prop];
	            }
	            result[key] = _path.length ? undefined : value;
	        }
	        else
	            throw new TypeError("dynamic property paths must be a string or an array of strings or numeric indexes");
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
	function validateJSONX(jsonx = {}, returnAllErrors = false) {
	    const dynamicPropsNames = [
	        "asyncprops",
	        "resourceprops",
	        "windowprops",
	        "thisprops",
	        "thisstate",
	        "thiscontext"
	    ];
	    const evalPropNames = [
	        "__dangerouslyEvalProps",
	        "__dangerouslyBindEvalProps"
	    ];
	    const validKeys = [
	        "component",
	        "props",
	        "test",
	        "children",
	        "__spreadComponent",
	        "__inline",
	        "__functionargs",
	        "__dangerouslyInsertComponents",
	        "__dangerouslyInsertComponentProps",
	        "__dangerouslyInsertJSONXComponents",
	        "__functionProps",
	        "__functionparams",
	        "__windowComponents",
	        "__windowComponentProps",
	        "comparisonprops",
	        "comparisonorprops",
	        "passprops",
	        "removeprops",
	        "includeprops",
	        "exposeprops",
	        "useformregister",
	        "debug",
	        "___stringifyChildren",
	        "___toStringChildren",
	        "___toNumeral",
	        "___FromLuxonTimeZone",
	        "___ISOtoLuxonString",
	        "___JSDatetoLuxonString",
	        "___template"
	    ].concat(dynamicPropsNames, evalPropNames);
	    let errors = [];
	    if (!jsonx.component) {
	        errors.push(SyntaxError("[0001] Missing React Component"));
	    }
	    if (jsonx.props) {
	        if (typeof jsonx.props !== "object" || Array.isArray(jsonx.props)) {
	            errors.push(TypeError("[0002] " +
	                jsonx.component +
	                ": props must be an Object / valid React props"));
	        }
	        if (jsonx.props.children &&
	            (typeof jsonx.props.children !== "string" ||
	                !Array.isArray(jsonx.props.children))) {
	            errors.push(TypeError("[0003] " +
	                jsonx.component +
	                ": props.children must be an array of JSONX JSON objects or a string"));
	        }
	        if (jsonx.props._children &&
	            (typeof jsonx.props._children !== "string" ||
	                !Array.isArray(jsonx.props._children))) {
	            errors.push(TypeError("[0004] " +
	                jsonx.component +
	                ": props._children must be an array of JSONX JSON objects or a string"));
	        }
	    }
	    if (jsonx.children) {
	        if (typeof jsonx.children !== "string" && !Array.isArray(jsonx.children)) {
	            errors.push(TypeError("[0005] " +
	                jsonx.component +
	                ": children must be an array of JSONX JSON objects or a string"));
	        }
	        if (Array.isArray(jsonx.children)) {
	            const childrenErrors = jsonx.children
	                .filter(c => typeof c === "object")
	                .map(c => validateJSONX(c, returnAllErrors));
	            errors = errors.concat(...childrenErrors);
	        }
	    }
	    dynamicPropsNames.forEach(dynamicprop => {
	        const jsonxDynamicProps = jsonx[dynamicprop];
	        if (jsonxDynamicProps) {
	            // if (dynamicprop === 'thisprops') {
	            //   console.log({ dynamicprop, jsonxDynamicProps });
	            // }
	            if (typeof jsonxDynamicProps !== "object") {
	                errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
	            }
	            Object.keys(jsonxDynamicProps).forEach(resolvedDynamicProp => {
	                if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
	                    errors.push(TypeError(`[0007] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
	                }
	                if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
	                    const allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter((propArrayItem) => typeof propArrayItem === "string");
	                    if (allStringArray.length !==
	                        jsonxDynamicProps[resolvedDynamicProp].length) {
	                        errors.push(TypeError(`[0008] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
	                    }
	                }
	            });
	        }
	    });
	    const evalProps = jsonx.__dangerouslyEvalProps;
	    const boundEvalProps = jsonx.__dangerouslyBindEvalProps;
	    if (evalProps || boundEvalProps) {
	        if ((evalProps && typeof evalProps !== "object") ||
	            (boundEvalProps && typeof boundEvalProps !== "object")) {
	            errors.push(TypeError("[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript"));
	        }
	        evalPropNames
	            .filter(evalProp => jsonx[evalProp])
	            .forEach(eProps => {
	            const evProp = jsonx[eProps];
	            const scopedEval = eval;
	            Object.keys(evProp).forEach(propToEval => {
	                if (typeof evProp[propToEval] !== "string") {
	                    errors.push(TypeError(`[0010] jsonx.${eProps}.${evProp} must be a string`));
	                }
	                try {
	                    // console.log({ eProps });
	                    if (eProps === "__dangerouslyBindEvalProps") {
	                        const funcToBind = scopedEval(`(${evProp[propToEval]})`);
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
	        Object.keys(jsonx.__dangerouslyInsertComponents).forEach(insertedComponents => {
	            try {
	                if (jsonx.__dangerouslyInsertComponents)
	                    validateJSONX(jsonx.__dangerouslyInsertComponents[insertedComponents]);
	            }
	            catch (e) {
	                errors.push(TypeError(`[0011] jsonx.__dangerouslyInsertComponents.${insertedComponents} must be a valid JSONX JSON Object: ${e.toString()}`));
	            }
	        });
	    }
	    if (jsonx.__functionProps) {
	        if (typeof jsonx.__functionProps !== "object") {
	            errors.push(TypeError("[0012] jsonx.__functionProps  must be an object"));
	        }
	        else {
	            Object.keys(jsonx.__functionProps).forEach(fProp => {
	                if (jsonx.__functionProps &&
	                    jsonx.__functionProps[fProp] &&
	                    (typeof jsonx.__functionProps[fProp] !== "string" ||
	                        jsonx.__functionProps[fProp].indexOf("func:") === -1)) {
	                    errors.push(ReferenceError(`[0013] jsonx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
	                }
	            });
	        }
	    }
	    if (jsonx.__windowComponentProps &&
	        (typeof jsonx.__windowComponentProps !== "object" ||
	            Array.isArray(jsonx.__windowComponentProps))) {
	        errors.push(TypeError("[0013] jsonx.__windowComponentProps  must be an object"));
	    }
	    if (jsonx.__windowComponents) {
	        if (typeof jsonx.__windowComponents !== "object") {
	            errors.push(TypeError("[0014] jsonx.__windowComponents must be an object"));
	        }
	        Object.keys(jsonx.__windowComponents).forEach(cProp => {
	            if (typeof jsonx.__windowComponents[cProp] !== "string" ||
	                jsonx.__windowComponents[cProp].indexOf("func:") === -1) {
	                errors.push(ReferenceError(`[0015] jsonx.__windowComponents.${cProp} must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)`));
	            }
	        });
	    }
	    if (typeof jsonx.comparisonorprops !== "undefined" &&
	        typeof jsonx.comparisonorprops !== "boolean") {
	        errors.push(TypeError("[0016] jsonx.comparisonorprops  must be boolean"));
	    }
	    if (jsonx.comparisonprops) {
	        if (!Array.isArray(jsonx.comparisonprops)) {
	            errors.push(TypeError("[0017] jsonx.comparisonprops  must be an array or comparisons"));
	        }
	        else {
	            jsonx.comparisonprops.forEach(c => {
	                if (typeof c !== "object") {
	                    errors.push(TypeError("[0018] jsonx.comparisonprops  must be an array or comparisons objects"));
	                }
	                else if (typeof c.left === "undefined") {
	                    errors.push(TypeError("[0019] jsonx.comparisonprops  must be have a left comparison value"));
	                }
	            });
	        }
	    }
	    if (typeof jsonx.passprops !== "undefined" &&
	        typeof jsonx.passprops !== "boolean") {
	        errors.push(TypeError("[0020] jsonx.passprops  must be boolean"));
	    }
	    const invalidKeys = Object.keys(jsonx).filter(key => validKeys.indexOf(key) === -1);
	    if (errors.length) {
	        if (returnAllErrors)
	            return errors;
	        throw errors[0];
	    }
	    return invalidKeys.length
	        ? `Warning: Invalid Keys [${invalidKeys.join()}]`
	        : true;
	}
	/**
	 * validates simple JSONX Syntax {[component]:{props,children}}
	 * @param {Object} simpleJSONX - Any valid simple JSONX Syntax
	 * @return {Boolean} returns true if simpleJSONX is valid
	 */
	function validSimpleJSONXSyntax$1(simpleJSONX = {}) {
	    if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
	        return false;
	    }
	    else {
	        const componentName = Object.keys(simpleJSONX)[0];
	        return Object.keys(simpleJSONX).length === 1 &&
	            !simpleJSONX[componentName].component &&
	            (typeof simpleJSONX[componentName] === "object"
	                ||
	                    typeof simpleJSONX[componentName] === "string")
	            ? true
	            : false;
	    }
	}
	/**
	 * Transforms SimpleJSONX to Valid JSONX JSON {[component]:{props,children}} => {component,props,children}
	 * @param {Object} simpleJSONX JSON Object
	 * @return {Object} - returns a valid JSONX JSON Object from a simple JSONX JSON Object
	 */
	function simpleJSONXSyntax$1(simpleJSONX = {}) {
	    if (simpleJSONX.component)
	        return simpleJSONX;
	    const component = Object.keys(simpleJSONX)[0];
	    try {
	        const children = typeof simpleJSONX[component] === 'string' || Array.isArray(simpleJSONX[component])
	            ? simpleJSONX[component]
	            : simpleJSONX[component] && simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children)
	                ? simpleJSONX[component].children.map(simpleJSONXSyntax$1)
	                : simpleJSONX[component].children;
	        const jsonxprops = typeof simpleJSONX[component] === 'object'
	            ? simpleJSONX[component]
	            : undefined;
	        const jsonx = Object.assign(Object.assign({ component }, jsonxprops), { children });
	        return jsonx;
	        // return Object.assign(
	        //   {},
	        //   {
	        //     component
	        //   },
	        //   simpleJSONX[component],
	        //   {
	        //     children:
	        //       simpleJSONX[component] &&
	        //       simpleJSONX[component].children &&
	        //       Array.isArray(simpleJSONX[component].children)
	        //         ? (simpleJSONX[component].children as defs.simpleJsonx[]).map(
	        //             simpleJSONXSyntax
	        //           )
	        //         : simpleJSONX[component].children
	        //   }
	        // );
	    }
	    catch (e) {
	        throw SyntaxError("Invalid Simple JSONX Syntax");
	    }
	}
	/**
	 * Transforms Valid JSONX JSON to SimpleJSONX  {component,props,children} => {[component]:{props,children}}
	 * @param {Object} jsonx Valid JSONX JSON object
	 * @return {Object} - returns a simple JSONX JSON Object from a valid JSONX JSON Object
	 */
	function getSimplifiedJSONX(jsonx = {}) {
	    try {
	        if (!jsonx.component)
	            return jsonx; //already simple
	        const componentName = jsonx.component;
	        jsonx.children = Array.isArray(jsonx.children)
	            ? jsonx.children
	                .filter(child => child) //remove empty children
	                .map(getSimplifiedJSONX)
	            : jsonx.children;
	        delete jsonx.component;
	        return {
	            [componentName]: jsonx
	        };
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
	function fetchJSON(path = "", options = {}) {
	    return __awaiter(this, void 0, void 0, function* () {
	        try {
	            const response = yield fetch(path, options);
	            return yield response.json();
	        }
	        catch (e) {
	            throw e;
	        }
	    });
	}
	// export function Deprecated(): MethodDecorator {
	//   return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
	//       const original = descriptor.value;
	//       descriptor.value = (...args: any) => {
	//           console.warn(`Warning: ${String(key)} is deprecated`);
	//           original(...args);
	//       }
	//       return descriptor;
	//   }
	// }

	var jsonxUtils = /*#__PURE__*/Object.freeze({
		__proto__: null,
		displayComponent: displayComponent$1,
		getAdvancedBinding: getAdvancedBinding,
		traverse: traverse,
		validateJSONX: validateJSONX,
		validSimpleJSONXSyntax: validSimpleJSONXSyntax$1,
		simpleJSONXSyntax: simpleJSONXSyntax$1,
		getSimplifiedJSONX: getSimplifiedJSONX,
		fetchJSON: fetchJSON
	});

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */



	// -- Inlined from fbjs --

	var emptyObject = {};

	{
	  Object.freeze(emptyObject);
	}

	var validateFormat = function validateFormat(format) {};

	{
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function _invariant(condition, format, a, b, c, d, e, f) {
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

	var warning = function(){};

	{
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	// /-- Inlined from fbjs --

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	{
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
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
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = objectAssign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = objectAssign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = objectAssign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
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
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
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
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isAlreadyDefined = name in Constructor;
	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
	          ? ReactClassStaticInterface[name]
	          : null;

	        _invariant(
	          specPolicy === 'DEFINE_MANY_MERGED',
	          'ReactClass: You are attempting to define ' +
	            '`%s` on your component more than once. This conflict may be ' +
	            'due to a mixin.',
	          name
	        );

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
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
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
	    {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
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
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
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
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  objectAssign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

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
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
	        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
	          'Did you mean UNSAFE_componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */




	if (typeof React__default['default'] === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React__default['default'].Component().updater;

	var createReactClass = factory_1(
	  React__default['default'].Component,
	  React__default['default'].isValidElement,
	  ReactNoopUpdateQueue
	);

	const cache = new Cache_1();
	const ReactHookForm$1 = { ErrorMessage: s$1, Controller };
	const generatedCustomComponents = new Map();
	// if (typeof window === 'undefined') {
	//   var window = window || (typeof global!=="undefined" ? global : window).window || {};
	// }
	//@ts-ignore
	let advancedBinding = getAdvancedBinding();
	// require;
	/**
	 * object of all react components available for JSONX
	 
	 */
	//@ts-ignore
	let componentMap$1 = Object.assign({ Fragment: React.Fragment, Suspense: React.Suspense }, reactDomFactories, window && typeof window === "object" ? window.__jsonx_custom_elements : {});
	/**
	 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
	 
	 * @param {Object} options - options for getBoundedComponents
	 * @param {Object} options.reactComponents - all react components available for JSONX
	 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
	 * @returns {Object} reactComponents object of all react components available for JSONX
	 */
	function getBoundedComponents$1(options = {}) {
	    const { reactComponents, boundedComponents = [] } = options;
	    if ((typeof options.advancedBinding === 'boolean' && options.advancedBinding) || (typeof options.advancedBinding === 'undefined' &&
	        advancedBinding)) {
	        return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
	            result[componentName] = reactComponents[componentName].bind(this);
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
	function getComponentFromLibrary(options = { jsonx: {} }) {
	    const { componentLibraries = {}, jsonx = {} } = options;
	    const libComponent = Object.keys(componentLibraries)
	        .map(libraryName => {
	        //@ts-ignore
	        const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, "");
	        const libraryNameArray = cleanLibraryName.split(".");
	        if (libraryNameArray.length === 2 &&
	            componentLibraries[libraryName] &&
	            componentLibraries[libraryName][libraryNameArray[0]] &&
	            typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== "undefined") {
	            return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
	        }
	        else if (typeof componentLibraries[libraryName][cleanLibraryName] !== "undefined") {
	            return componentLibraries[libraryName][cleanLibraryName];
	        }
	    })
	        .filter(val => val)[0];
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
	function getComponentFromMap$1(options = {}) {
	    //ReactElementLike | ReactComponentLike | ReactElement | ReactComponentLike
	    // eslint-disable-next-line
	    const { jsonx = {}, reactComponents = {}, componentLibraries = {}, logError = console.error, debug } = options;
	    try {
	        if (typeof jsonx.component !== "string" &&
	            typeof jsonx.component === "function") {
	            return jsonx.component;
	            //@ts-ignore
	        }
	        else if (jsonx.component && reactDomFactories[jsonx.component]) {
	            return jsonx.component;
	            //@ts-ignore
	        }
	        else if (reactComponents[jsonx.component]) {
	            //@ts-ignore
	            return reactComponents[jsonx.component];
	        }
	        else if (typeof jsonx.component === "string" &&
	            jsonx.component.indexOf(".") > 0 &&
	            getComponentFromLibrary({ jsonx, componentLibraries })) {
	            return getComponentFromLibrary({ jsonx, componentLibraries });
	        }
	        else {
	            throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
	        }
	    }
	    catch (e) {
	        if (debug)
	            logError(e, e.stack ? e.stack : "no stack");
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
	    if (typeof options === "function")
	        return options;
	    const { body = "", args = [], name } = options;
	    const argus = [].concat(args);
	    argus.push(body);
	    const evalFunction = Function.prototype.constructor.apply({ name }, argus);
	    if (name) {
	        Object.defineProperty(evalFunction, "name", { value: name });
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
	function getReactClassComponent(reactComponent = {}, options = {}) {
	    // const util = require('util');
	    // console.log(util.inspect({ reactComponent },{depth:20}));
	    // console.log('reactComponent',reactComponent)
	    if (options.lazy) {
	        //@ts-ignore
	        return React.lazy(() => options
	            .lazy(reactComponent, Object.assign({}, options, { lazy: false }))
	            .then((lazyComponent) => {
	            return {
	                //@ts-ignore
	                default: getReactClassComponent(...lazyComponent)
	            };
	        }));
	    }
	    const context = this || {};
	    const { returnFactory = true, resources = {}, use_getState = true, bindContext = true, disableRenderIndexKey = true } = options;
	    const rjc = Object.assign({ 
	        //mounting
	        getDefaultProps: {
	            body: "return {};"
	        }, 
	        // (unsupported) getDerivedStateFromProps: undefined, // {body:'return null;', args:['props','state',]}
	        getInitialState: {
	            body: "return {};"
	        }, componentDidMount: undefined, UNSAFE_componentWillMount: undefined, 
	        //updating
	        // (unsupported) getDerivedStateFromProps 
	        shouldComponentUpdate: undefined, getSnapshotBeforeUpdate: undefined, componentDidUpdate: undefined, UNSAFE_componentWillUpdate: undefined, UNSAFE_componentWillReceiveProps: undefined, 
	        //unmounting
	        componentWillUnmount: undefined }, reactComponent);
	    const rjcKeys = Object.keys(rjc);
	    if (rjcKeys.includes("render") === false) {
	        throw new ReferenceError("React components require a render method");
	    }
	    const classOptions = rjcKeys.reduce((result, val) => {
	        if (!rjc[val])
	            return result;
	        if (typeof rjc[val] === "function")
	            rjc[val] = { body: rjc[val] };
	        const args = rjc[val].arguments;
	        const body = rjc[val].body;
	        if (!body) {
	            console.warn({ rjc });
	            throw new SyntaxError(`Function(${val}) requires a function body`);
	        }
	        if (args &&
	            !Array.isArray(args) &&
	            args.length &&
	            args.length &&
	            args.filter((arg) => typeof arg === "string").length) {
	            throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
	        }
	        if (val === "render") {
	            result[val] = function () {
	                //@ts-ignore
	                if (options.passprops && this && this.props)
	                    body.props = Object.assign({}, body.props, this.props);
	                //@ts-ignore
	                if (options.passstate && this.state)
	                    body.props = Object.assign({}, body.props, this.state);
	                return getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : { props: {} }, { disableRenderIndexKey }, {
	                    props: use_getState && this && this.props
	                        ? //@ts-ignore
	                            Object.assign({}, this.props, {
	                                getState: () => this.state
	                            })
	                        : //@ts-ignore
	                            this.props
	                }), body, resources);
	            };
	        }
	        else {
	            //@ts-ignore
	            result[val] =
	                typeof body === "function"
	                    ? body
	                    : getFunctionFromEval({
	                        body,
	                        args
	                    });
	        }
	        return result;
	    }, {});
	    const reactComponentClass = createReactClass(classOptions);
	    if (options.name) {
	        Object.defineProperty(reactComponentClass, "name", {
	            value: options.name
	        });
	    }
	    const reactClass = returnFactory
	        ? React__default['default'].createFactory(reactComponentClass)
	        : reactComponentClass;
	    return reactClass;
	}
	/**
	 * A helper component that allows you to create forms with [react-hook-form](https://react-hook-form.com/) without needed to add external form libraries
	 * @param this
	 * @param props
	 */
	function FormComponent$1(props = {}) {
	    function FormComponentFunction(componentProps) {
	        const { hookFormOptions = {}, 
	        // formComponent = { component: "div", children: "empty form" },
	        onSubmit, formWrapperComponent, formKey, formWrapperProps, } = props;
	        const formComponent = Object.assign({ component: "div", children: "empty form" }, props.formComponent);
	        formComponent.props = Object.assign(Object.assign({}, formComponent.props), componentProps);
	        // const { register, unregister, errors, watch, handleSubmit, reset, setError, clearError, setValue, getValues, triggerValidation, control, formState, } = useForm(hookFormOptions);
	        const reactHookForm = useForm(hookFormOptions);
	        const context = Object.assign(Object.assign({}, this || {}), { reactHookForm, });
	        if (!context.componentLibraries || !context.componentLibraries.ReactHookForm) {
	            context.componentLibraries = Object.assign(Object.assign({}, context.componentLibraries), {
	                ReactHookForm: {
	                    Controller, ErrorMessage: s$1,
	                }
	            });
	        }
	        const formWrapperJXM = formWrapperComponent || {
	            component: 'form',
	            props: Object.assign({ onSubmit: onSubmit ? reactHookForm.handleSubmit(onSubmit) : undefined, key: formKey ? `formWrapperJXM-${formKey}` : undefined }, formWrapperProps)
	        };
	        formWrapperJXM.children = Array.isArray(formComponent) ? formComponent : [formComponent];
	        const renderJSONX = React.useMemo(() => getReactElementFromJSONX.bind(context), [
	            context
	        ]);
	        return renderJSONX(formWrapperJXM) || null;
	    }
	    if (props.name) {
	        Object.defineProperty(FormComponentFunction, "name", {
	            value: props.name
	        });
	    }
	    return FormComponentFunction.bind(this);
	}
	/**
	 * A helper component that allows you to create components that load data and render asynchronously.
	 * @param this
	 * @param props
	 */
	function DynamicComponent$1(props = {}) {
	    function DynamicComponentFunction(componentProps) {
	        //@ts-ignore
	        const { useCache = true, cacheTimeout = 60 * 60 * 5, loadingJSONX = { component: "div", children: "...Loading" }, 
	        //@ts-ignore
	        loadingErrorJSONX = {
	            component: "div",
	            children: [
	                { component: "span", children: "Error: " },
	                {
	                    component: "span",
	                    resourceprops: { _children: ["error", "message"] }
	                }
	            ]
	        }, cacheTimeoutFunction = () => { }, transformFunction = (data) => data, fetchURL, fetchOptions, fetchFunction } = props;
	        const jsonx = Object.assign({}, props.jsonx);
	        jsonx.props = Object.assign(Object.assign({}, jsonx.props), componentProps);
	        const context = this || {};
	        const [state, setState] = React.useState({
	            hasLoaded: false,
	            hasError: false,
	            resources: {},
	            error: undefined
	        });
	        const transformer = React.useMemo(() => getFunctionFromEval(transformFunction), [
	            transformFunction
	        ]);
	        const timeoutFunction = React.useMemo(() => getFunctionFromEval(cacheTimeoutFunction), [cacheTimeoutFunction]);
	        const renderJSONX = React.useMemo(() => getReactElementFromJSONX.bind(context), [
	            context
	        ]);
	        const loadingComponent = React.useMemo(() => renderJSONX(loadingJSONX), [
	            loadingJSONX
	        ]);
	        const loadingError = React.useMemo(() => renderJSONX(loadingErrorJSONX, { error: state.error }), [loadingErrorJSONX, state.error]);
	        React.useEffect(() => {
	            function getData() {
	                return __awaiter(this, void 0, void 0, function* () {
	                    try {
	                        //@ts-ignore
	                        let transformedData;
	                        if (useCache && cache.get(fetchURL)) {
	                            transformedData = cache.get(fetchURL);
	                        }
	                        else {
	                            let fetchedData;
	                            if (fetchFunction) {
	                                fetchedData = yield fetchFunction(fetchURL, fetchOptions);
	                            }
	                            else
	                                fetchedData = yield fetchJSON(fetchURL, fetchOptions);
	                            transformedData = yield transformer(fetchedData);
	                            if (useCache)
	                                cache.put(fetchURL, transformedData, cacheTimeout, timeoutFunction);
	                        }
	                        //@ts-ignore
	                        setState(prevState => Object.assign({}, prevState, {
	                            hasLoaded: true,
	                            hasError: false,
	                            resources: { DynamicComponentData: transformedData }
	                        }));
	                    }
	                    catch (e) {
	                        if (context.debug)
	                            console.warn(e);
	                        //@ts-ignore
	                        setState({ hasError: true, error: e });
	                    }
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
	    if (props.name) {
	        Object.defineProperty(DynamicComponentFunction, "name", {
	            value: props.name
	        });
	    }
	    return DynamicComponentFunction.bind(this);
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
	function getReactFunctionComponent(reactComponent = {}, functionBody = "", options = {}) {
	    if (options.lazy) {
	        //@ts-ignore
	        return React.lazy(() => options
	            .lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false }))
	            .then((lazyComponent) => {
	            return {
	                //@ts-ignore
	                default: getReactFunctionComponent(...lazyComponent)
	            };
	        }));
	    }
	    if (typeof options === "undefined" || typeof options.bind === "undefined")
	        options.bind = true;
	    const { resources = {}, args = [] } = options;
	    //@ts-ignore
	    const props = Object.assign({}, reactComponent.props);
	    const functionArgs = [
	        React__default['default'],
	        React.useState,
	        React.useEffect,
	        React.useContext,
	        React.useReducer,
	        React.useCallback,
	        React.useMemo,
	        React.useRef,
	        React.useImperativeHandle,
	        React.useLayoutEffect,
	        React.useDebugValue,
	        getReactElementFromJSONX,
	        reactComponent,
	        resources,
	        props,
	        useForm,
	        useController,
	        useFieldArray,
	        useWatch,
	    ];
	    //@ts-ignore
	    if (typeof functionBody === "function")
	        functionBody = functionBody.toString();
	    const functionComponent = Function("React", "useState", "useEffect", "useContext", "useReducer", "useCallback", "useMemo", "useRef", "useImperativeHandle", "useLayoutEffect", "useDebugValue", "getReactElementFromJSONX", "reactComponent", "resources", "props", "useForm", "useController", "useFieldArray", "useWatch", `
    'use strict';
    const self = this || {};

    return function ${options.name || "Anonymous"}(props){
      ${functionBody}
      if(typeof exposeprops==='undefined' || exposeprops){
        reactComponent.props = Object.assign({},props,typeof exposeprops==='undefined'?{}:exposeprops);
        if(typeof exposeprops!=='undefined') reactComponent.__functionargs = Object.keys(exposeprops);
      } else{
        reactComponent.props =  props;
      }
      if(!props?.children) {
      //  delete props.children;
      }
      const context = ${options.bind ? "Object.assign(self,this||{})" : "this"};
      return getReactElementFromJSONX.call(context, reactComponent);
    }
  `);
	    if (options.name) {
	        Object.defineProperty(functionComponent, "name", {
	            value: options.name
	        });
	    }
	    return options.bind
	        ? functionComponent.call(this, ...functionArgs)
	        : functionComponent(...functionArgs);
	}
	/**
	 * Returns the string of a function, the difference between calling .toString() on a function definition is, the toString method will return the entire function definition (with paramaters and the name, etc)
	 * @param {Function} - The function you want the body string for
	 * @returns {String}
	 * @example
	function myFunc(){
	  const a = 1;
	  const b = 3;
	  return a + b;
	}
	getFunctionBody(myFunc) => `
	  const a = 1;
	  const b = 3;
	  return a + b;
	`
	 */
	function getFunctionBody(func) {
	    const functionString = func.toString();
	    if (functionString.includes('return') === false)
	        throw new EvalError('JSONX Function Components can not use implicit returns');
	    return functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
	}
	/**
	 * A helpful function that lets you write a regular JavaScript function and passes the appropriate arguments to getReactFunctionComponent
	 * @param {Function} func - function definition to turn into React Component Function
	 * @property {object} this - options for getReactElementFromJSONX
	 * @returns {Function} - React Component Function
	 */
	function makeFunctionComponent(func, options) {
	    const scopedEval = eval;
	    const fullFunctionBody = getFunctionBody(func);
	    const [functionBody,] = fullFunctionBody.split('return');
	    let reactComponentString = fullFunctionBody.replace(functionBody, '').trim();
	    const reactComponent = scopedEval(`(()=>{${reactComponentString}})()`);
	    const functionOptions = Object.assign({ name: func.name }, options);
	    return getReactFunctionComponent.call(this, reactComponent, functionBody, functionOptions);
	}
	/**
	 *
	 */
	function getReactContext(options = {}) {
	    return React.createContext(options.value);
	}
	function getCustomFunctionComponent(customComponent) {
	    const { options, functionBody, functionComponent, jsonxComponent, } = customComponent;
	    if (functionComponent) {
	        return makeFunctionComponent.call(this, functionComponent, options);
	    }
	    else {
	        return getReactFunctionComponent.call(this, jsonxComponent, functionBody, options);
	    }
	}
	function getCustomComponentsCacheKey(customComponents) {
	    return customComponents.map(({ name }) => name).join('');
	}
	/**
	 *
	 * @param this
	 * @param customComponents
	 * @returns
	 * @example
	 const customComponents = [
	   {
	      type: 'library',
	      name: 'someLib',
	      jsonx?: {
	        Header: {
	          type:'function',
	          jsonxComponent: {p:'sample'},
	          functionBody:'console.log(44)',
	        },
	        Footer: {
	          type:'function',
	          jsonxComponent: {p:'sample'},
	          functionBody:'console.log(44)',
	        }
	      }
	   },
	   {
	      type: 'component'|'function'|'library';
	      name: string;
	      jsonx?: jsonxDefinitionLibrary | jsonx;
	      jsonxComponent?: jsonx;
	      options?: {};
	      functionBody?: (string);
	      functionComponent?: ((props?:any)=>any);
	   },
	  ]
	 */
	function getReactLibrariesAndComponents$1(customComponents) {
	    const customComponentsCacheKey = getCustomComponentsCacheKey(customComponents);
	    if (generatedCustomComponents.has(customComponentsCacheKey))
	        return generatedCustomComponents.get(customComponentsCacheKey);
	    const customComponentLibraries = {};
	    const customReactComponents = {};
	    if (customComponents && customComponents.length) {
	        customComponents.forEach(customComponent => {
	            const { type, name, jsonx, options, functionBody, functionComponent, jsonxComponent, } = customComponent;
	            if (type === "library") {
	                if (jsonxComponent || functionComponent) {
	                    customComponentLibraries[name] = Object
	                        .keys(jsonx)
	                        .reduce((result, prop) => {
	                        const libraryComponent = jsonx[prop];
	                        const { type, name, jsonxComponent, options, functionBody } = libraryComponent;
	                        if (type === "component") {
	                            result[name] = getReactClassComponent.call(this, jsonxComponent, options);
	                        }
	                        else {
	                            result[name] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent, });
	                        }
	                        return result;
	                    }, {});
	                }
	                else
	                    customComponentLibraries[name] = window[name];
	            }
	            else if (type === "component") {
	                if (jsonx) {
	                    customReactComponents[name] = getReactClassComponent.call(this, jsonx, options);
	                }
	                else
	                    customReactComponents[name] = window[name];
	            }
	            else if (type === "function") {
	                if (jsonx) {
	                    customReactComponents[name] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent: jsonx, });
	                }
	                else
	                    customReactComponents[name] = window[name];
	            }
	        });
	    }
	    generatedCustomComponents.set(customComponentsCacheKey, {
	        customComponentLibraries,
	        customReactComponents
	    });
	    return {
	        customComponentLibraries,
	        customReactComponents
	    };
	}

	var jsonxComponents = /*#__PURE__*/Object.freeze({
		__proto__: null,
		ReactHookForm: ReactHookForm$1,
		generatedCustomComponents: generatedCustomComponents,
		advancedBinding: advancedBinding,
		componentMap: componentMap$1,
		getBoundedComponents: getBoundedComponents$1,
		getComponentFromLibrary: getComponentFromLibrary,
		getComponentFromMap: getComponentFromMap$1,
		getFunctionFromEval: getFunctionFromEval,
		getReactClassComponent: getReactClassComponent,
		FormComponent: FormComponent$1,
		DynamicComponent: DynamicComponent$1,
		getReactFunctionComponent: getReactFunctionComponent,
		getFunctionBody: getFunctionBody,
		makeFunctionComponent: makeFunctionComponent,
		getReactContext: getReactContext,
		getCustomFunctionComponent: getCustomFunctionComponent,
		getCustomComponentsCacheKey: getCustomComponentsCacheKey,
		getReactLibrariesAndComponents: getReactLibrariesAndComponents$1
	});

	//https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
	const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
	const ARGUMENT_NAMES = /([^\s,]+)/g;
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
	    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
	    var result = fnStr
	        .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
	        .match(ARGUMENT_NAMES);
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
	function getJSONXProps(options = {}) {
	    // eslint-disable-next-line
	    let { jsonx = {}, propName = "asyncprops", traverseObject = {} } = options;
	    // return (jsonx.asyncprops && typeof jsonx.asyncprops === 'object')
	    // ? utilities.traverse(jsonx.asyncprops, resources)
	    // : {};
	    return jsonx[propName] && typeof jsonx[propName] === "object"
	        ? traverse(jsonx[propName], traverseObject)
	        : {};
	}
	/**
	 * returns children jsonx components defined on __spreadComponent spread over an array on props.__spread
	 * @param {*} options
	 */
	function getChildrenComponents(options = {}) {
	    const { allProps = {}, jsonx = {} } = options;
	    // const asyncprops = getJSONXProps({ jsonx, propName: 'spreadprops', traverseObject: allProps, });
	    if (Array.isArray(allProps.__spread) === false) {
	        if ((this && this.debug) || jsonx.debug) {
	            return {
	                children: new Error("Using __spreadComponent requires an array prop '__spread'").toString()
	            };
	        }
	        else {
	            return { children: undefined };
	        }
	    }
	    else {
	        return {
	            _children: allProps.__spread.map((__item, __idx) => {
	                const clonedChild = Object.assign({}, jsonx.__spreadComponent);
	                const clonedChildProps = Object.assign({}, clonedChild.props);
	                clonedChildProps.__item = __item;
	                clonedChildProps.__idx = __idx;
	                clonedChild.props = clonedChildProps;
	                return clonedChild;
	            })
	        };
	    }
	}
	/**
	 * registers an input to a reactHookForm register function
	 * @param {*} options
	 * @returns {object} - returns name, ref, onBlur, onChange
	 */
	function useFormRegisterHandler(options = {}) {
	    var _a, _b;
	    return this.reactHookForm.register((_b = (_a = options === null || options === void 0 ? void 0 : options.jsonx) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.name);
	}
	/**
	 * returns a reducer function that returns values ot bind to an eval function. This function is used when values need to be passed from a hook function to a prop that is a function
	 * @param {object} this
	 * @param {object} jsonx
	 * @returns {function}
	 */
	function boundArgsReducer(jsonx = {}) {
	    return (args, arg) => {
	        let val;
	        if (this && this.state && typeof this.state[arg] !== "undefined")
	            val = this.state[arg];
	        else if (this && this.props && typeof this.props[arg] !== "undefined")
	            val = this.props[arg];
	        else if (jsonx.props && typeof jsonx.props[arg] !== "undefined")
	            val = jsonx.props[arg];
	        if (typeof val !== "undefined")
	            args.push(val);
	        return args.filter((a) => typeof a !== "undefined");
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
	function getEvalProps(options = { jsonx: {} }) {
	    const { jsonx } = options;
	    const scopedEval = eval; //https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
	    let evAllProps = {};
	    if (jsonx.__dangerouslyEvalAllProps) {
	        let evVal;
	        try {
	            // eslint-disable-next-line
	            evVal =
	                typeof evVal === "function"
	                    ? jsonx.__dangerouslyEvalAllProps
	                    : scopedEval(jsonx.__dangerouslyEvalAllProps);
	        }
	        catch (e) {
	            if (this.debug || jsonx.debug)
	                evVal = function () { return { error: e }; };
	        }
	        evAllProps = typeof evVal === "function"
	            ? evVal.call(this, { jsonx })
	            : evVal;
	    }
	    const evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
	        let evVal;
	        let evValString;
	        try {
	            // eslint-disable-next-line
	            //@ts-ignore
	            evVal = scopedEval(jsonx.__dangerouslyEvalProps[epropName]);
	            evValString = evVal.toString();
	        }
	        catch (e) {
	            if (this.debug || jsonx.debug)
	                evVal = e;
	        }
	        //@ts-ignore
	        eprops[epropName] =
	            typeof evVal === "function" ? evVal.call(this, { jsonx }) : evVal;
	        //@ts-ignore
	        if (this.exposeEval)
	            eprops[`__eval_${epropName}`] = evValString;
	        return eprops;
	    }, {});
	    const evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
	        let evVal;
	        let evValString;
	        try {
	            let args;
	            //@ts-ignore
	            const functionBody = jsonx.__dangerouslyBindEvalProps[epropName];
	            // InlineFunction = Function.prototype.constructor.apply({}, args);
	            let functionDefinition;
	            if (typeof functionBody === "function") {
	                functionDefinition = functionBody;
	            }
	            else if (jsonx.__dangerouslyBindEvalProps) {
	                functionDefinition = scopedEval(jsonx.__dangerouslyBindEvalProps[epropName]);
	                evValString = functionDefinition.toString();
	            } // eslint-disable-next-line
	            if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
	                args = [this].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(this, jsonx), []));
	            }
	            else if (jsonx.__functionparams === false) {
	                args = [this];
	            }
	            else {
	                const functionDefArgs = getParamNames(functionDefinition);
	                args = [this].concat(functionDefArgs.reduce(boundArgsReducer.call(this, jsonx), []));
	            }
	            // eslint-disable-next-line
	            evVal = functionDefinition.bind(...args);
	        }
	        catch (e) {
	            if (this.debug || jsonx.debug)
	                evVal = e;
	        }
	        // eslint-disable-next-line
	        //@ts-ignore
	        eprops[epropName] = evVal;
	        //@ts-ignore
	        if (this.exposeEval)
	            eprops[`__eval_${epropName}`] = evValString;
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
	function getComponentProps(options = { jsonx: {} }) {
	    const { jsonx, resources } = options;
	    //@ts-ignore
	    return Object.keys(jsonx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
	        let componentVal;
	        try {
	            // eslint-disable-next-line
	            if (jsonx.__dangerouslyInsertComponents) {
	                componentVal = getRenderedJSON.call(this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
	            }
	        }
	        catch (e) {
	            if (this.debug || jsonx.debug)
	                componentVal = e;
	        }
	        cprops[cpropName] = componentVal;
	        return cprops;
	    }, {});
	}
	/**
	 * Used to create components from jsonx as props
	 * @param this
	 * @param options
	 */
	function getReactComponents(options) {
	    const { jsonx, resources } = options;
	    const functionComponents = !jsonx.__dangerouslyInsertFunctionComponents
	        ? {}
	        : Object.keys(jsonx.__dangerouslyInsertFunctionComponents).reduce((cprops, cpropName) => {
	            let componentVal;
	            try {
	                const args = jsonx.__dangerouslyInsertFunctionComponents && jsonx.__dangerouslyInsertFunctionComponents[cpropName];
	                if (args) {
	                    args.options = Object.assign({}, args.options, { resources });
	                    if (args.function) {
	                        const newComponent = makeFunctionComponent.call(this, args.function, args.options);
	                        componentVal = (args === null || args === void 0 ? void 0 : args.invoke)
	                            ? newComponent(jsonx.props)
	                            : newComponent;
	                    }
	                    else {
	                        const newComponent = getReactFunctionComponent.call(this, args.reactComponent, args.functionBody, args.options);
	                        componentVal = (args === null || args === void 0 ? void 0 : args.invoke)
	                            ? newComponent(jsonx.props)
	                            : newComponent;
	                    }
	                }
	            }
	            catch (e) {
	                if (this.debug || jsonx.debug)
	                    componentVal = e;
	            }
	            cprops[cpropName] =
	                cpropName === "_children" ? [componentVal] : componentVal;
	            return cprops;
	        }, {});
	    const classComponents = !jsonx.__dangerouslyInsertClassComponents
	        ? {}
	        : Object.keys(jsonx.__dangerouslyInsertClassComponents).reduce((cprops, cpropName) => {
	            let componentVal;
	            try {
	                const args = jsonx.__dangerouslyInsertClassComponents && jsonx.__dangerouslyInsertClassComponents[cpropName];
	                if (args) {
	                    args.options = Object.assign({}, args.options, { resources });
	                    // eslint-disable-next-line
	                    componentVal = getReactClassComponent.call(this, args.reactComponent, args.options);
	                }
	            }
	            catch (e) {
	                if (this.debug || jsonx.debug)
	                    componentVal = e;
	            }
	            cprops[cpropName] =
	                cpropName === "_children" ? [componentVal] : componentVal;
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
	function getReactComponentProps(options = { jsonx: {} }) {
	    const { jsonx } = options;
	    const customComponents = this && this.reactComponents ? this.reactComponents : {};
	    const customLibraries = this && this.componentLibraries ? this.componentLibraries : {};
	    if (jsonx.__dangerouslyInsertJSONXComponents &&
	        Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) {
	        return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce((cprops, cpropName) => {
	            let componentVal;
	            try {
	                componentVal = getComponentFromMap$1({
	                    jsonx: jsonx.__dangerouslyInsertJSONXComponents && jsonx.__dangerouslyInsertJSONXComponents[cpropName],
	                    reactComponents: customComponents,
	                    componentLibraries: customLibraries
	                });
	            }
	            catch (e) {
	                if (this.debug || jsonx.debug)
	                    componentVal = e;
	            }
	            // eslint-disable-next-line
	            cprops[cpropName] = componentVal;
	            return cprops;
	        }, {});
	    }
	    else if (jsonx.__dangerouslyInsertReactComponents && Object.keys(jsonx.__dangerouslyInsertReactComponents).length) {
	        return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
	            let componentVal;
	            try {
	                componentVal = getComponentFromMap$1({
	                    jsonx: {
	                        component: jsonx.__dangerouslyInsertReactComponents && jsonx.__dangerouslyInsertReactComponents[cpropName],
	                        props: jsonx.__dangerouslyInsertComponentProps
	                            ? jsonx.__dangerouslyInsertComponentProps[cpropName]
	                            : {}
	                    },
	                    reactComponents: customComponents,
	                    componentLibraries: customLibraries
	                });
	            }
	            catch (e) {
	                if (this.debug || jsonx.debug)
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
	 * @deprecated
	 */
	function getFunctionFromProps(options = { jsonx: {}, propBody: "" }) {
	    const { propFunc = "func:", propBody, jsonx, functionProperty = "" } = options;
	    // eslint-disable-next-line
	    const { logError = console.error, debug } = this;
	    let windowObject = {};
	    if (this.window)
	        windowObject = this.window;
	    //@ts-ignore
	    else if (typeof global !== "undefined" && (typeof global!=="undefined" ? global : window).window)
	        windowObject = (typeof global!=="undefined" ? global : window).window;
	    try {
	        const functionNameString = propFunc.split(":")[1] || "";
	        const functionNameArray = functionNameString.split(".");
	        const functionName = functionNameArray.length
	            ? functionNameArray[functionNameArray.length - 1]
	            : "";
	        if (propFunc.includes("func:inline")) {
	            // eslint-disable-next-line
	            let InlineFunction;
	            if (jsonx.__functionargs) {
	                const args = [].concat(jsonx.__functionargs[functionProperty]);
	                args.push(propBody);
	                InlineFunction = Function.prototype.constructor.apply({}, args);
	            }
	            else {
	                InlineFunction = Function("param1", "param2", '"use strict";' + propBody);
	            }
	            const [propFuncName, funcName] = propFunc.split(".");
	            Object.defineProperty(InlineFunction, "name", {
	                value: funcName
	            });
	            if (jsonx.__functionargs) {
	                const boundArgs = [this].concat(jsonx.__functionargs[functionProperty].map((arg) => jsonx.props[arg]));
	                return InlineFunction.bind(...boundArgs);
	            }
	            else {
	                return InlineFunction.bind(this);
	            }
	        }
	        else if (propFunc.indexOf("func:window") !== -1) {
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
	            return this.props
	                ? this.props[functionNameArray[2]][functionName]
	                : jsonx.props[functionNameArray[2]][functionName];
	        }
	        else if (functionNameArray.length === 3) {
	            return this.props
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
	function getFunctionProps(options = { jsonx: {} }) {
	    const { allProps = {}, jsonx = {} } = options;
	    const getFunction = getFunctionFromProps.bind(this);
	    const funcProps = jsonx.__functionProps;
	    //Allowing for window functions
	    if (funcProps) {
	        Object.keys(funcProps).forEach(key => {
	            if (typeof funcProps[key] === "string" &&
	                funcProps[key].indexOf("func:") !== -1) {
	                allProps[key] = getFunction({
	                    propFunc: funcProps[key],
	                    propBody: jsonx.__inline ? jsonx.__inline[key] : "",
	                    jsonx,
	                    functionProperty: key
	                });
	            }
	        });
	    }
	    return allProps;
	}
	/**
	 * Returns a resolved object that has React Components pulled from window.__jsonx_custom_elements
	 * @param {Object} options
	 * @param {Object} options.jsonx - Valid JSONX JSON
	 * @param {Object} [options.allProps={}] - merged computed props, Object.assign({ key: renderIndex, }, thisprops, jsonx.props, asyncprops, windowprops, evalProps, insertedComponents);
	 * @returns {Object} resolved object of with React Components from a window property window.__jsonx_custom_elements
	 */
	function getWindowComponents(options = { jsonx: {} }) {
	    const { allProps, jsonx } = options;
	    const windowComponents = jsonx.__windowComponents;
	    //@ts-ignore
	    const window = this.window || (typeof global!=="undefined" ? global : window).window || {};
	    const windowFuncPrefix = "func:window.__jsonx_custom_elements";
	    // if (jsonx.hasWindowComponent && window.__jsonx_custom_elements) {
	    Object.keys(windowComponents).forEach(key => {
	        const windowKEY = typeof windowComponents[key] === "string"
	            ? windowComponents[key].replace(`${windowFuncPrefix}.`, "")
	            : "";
	        if (typeof windowComponents[key] === "string" &&
	            windowComponents[key].indexOf(windowFuncPrefix) !== -1 &&
	            typeof window.__jsonx_custom_elements[windowKEY] === "function") {
	            const windowComponentElement = window.__jsonx_custom_elements[windowKEY];
	            const windowComponentProps = allProps["__windowComponentProps"]
	                ? allProps["__windowComponentProps"]
	                : this.props;
	            allProps[key] = React__default['default'].createElement(windowComponentElement, windowComponentProps, null);
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
	function getComputedProps$1(options = {}) {
	    // eslint-disable-next-line
	    const { jsonx = {}, resources = {}, renderIndex, logError = console.error, useReduxState = true, ignoreReduxPropsInComponentLibraries = true, disableRenderIndexKey = true, debug, componentLibraries = {} } = options;
	    try {
	        const componentThisProp = jsonx.thisprops
	            ? Object.assign({
	                __jsonx: {
	                    _component: jsonx,
	                    _resources: resources
	                }
	            }, this.props, jsonx.props, 
	            //@ts-ignore
	            useReduxState &&
	                !jsonx.ignoreReduxProps &&
	                ignoreReduxPropsInComponentLibraries &&
	                jsonx.component &&
	                !componentLibraries[jsonx.component]
	                ? this.props && this.props.getState
	                    ? this.props.getState()
	                    : {}
	                : {})
	            : undefined;
	        const windowTraverse = typeof window !== "undefined" ? window : {};
	        const asyncprops = jsonx.asyncprops
	            ? getJSONXProps({
	                jsonx,
	                propName: "asyncprops",
	                traverseObject: resources
	            })
	            : {};
	        const resourceprops = jsonx.resourceprops
	            ? getJSONXProps({
	                jsonx,
	                propName: "resourceprops",
	                traverseObject: resources
	            })
	            : {};
	        const windowprops = jsonx.windowprops
	            ? getJSONXProps({
	                jsonx,
	                propName: "windowprops",
	                traverseObject: windowTraverse
	            })
	            : {};
	        const thisprops = jsonx.thisprops
	            ? getJSONXProps({
	                jsonx,
	                propName: "thisprops",
	                traverseObject: componentThisProp
	            })
	            : {};
	        const thisstate = jsonx.thisstate
	            ? getJSONXProps({
	                jsonx,
	                propName: "thisstate",
	                traverseObject: this.state
	            })
	            : {};
	        let thiscontext = jsonx.thiscontext
	            ? getJSONXProps({
	                jsonx,
	                propName: "thiscontext",
	                traverseObject: this || {}
	            })
	            : {};
	        if (jsonx.useformregister) {
	            const evalJSONX = Object.assign(Object.assign({}, jsonx), { __dangerouslyEvalAllProps: useFormRegisterHandler });
	            const contextProps = getEvalProps.call(this, {
	                jsonx: evalJSONX
	            });
	            thiscontext = Object.assign(Object.assign({}, thiscontext), contextProps);
	        }
	        //allowing javascript injections
	        const evalProps = jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps
	            ? getEvalProps.call(this, { jsonx })
	            : {};
	        const insertedComponents = jsonx.__dangerouslyInsertComponents
	            ? getComponentProps.call(this, { jsonx, resources, debug })
	            : {};
	        const insertedReactComponents = jsonx.__dangerouslyInsertReactComponents ||
	            jsonx.__dangerouslyInsertJSONXComponents
	            ? getReactComponentProps.call(this, { jsonx, debug })
	            : {};
	        const insertedComputedComponents = jsonx.__dangerouslyInsertFunctionComponents ||
	            jsonx.__dangerouslyInsertClassComponents
	            ? getReactComponents.call(this, { jsonx, debug })
	            : {};
	        const evalAllProps = jsonx.__dangerouslyEvalAllProps
	            ? getEvalProps.call(this, { jsonx })
	            : {};
	        const allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey
	            ? {}
	            : { key: renderIndex }, jsonx.props, thisprops, thisstate, thiscontext, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents, insertedComputedComponents);
	        const computedProps = Object.assign({}, allProps, jsonx.__functionProps
	            ? getFunctionProps.call(this, { allProps, jsonx })
	            : {}, jsonx.__windowComponents
	            ? getWindowComponents.call(this, { allProps, jsonx })
	            : {}, jsonx.__spreadComponent
	            ? getChildrenComponents.call(this, { allProps, jsonx })
	            : {}, evalAllProps);
	        if (jsonx.useremoveprops && Array.isArray(jsonx.useremoveprops)) {
	            for (const prop of jsonx.useremoveprops) {
	                computedProps[prop] = undefined;
	                delete computedProps[prop];
	            }
	        }
	        if (jsonx.debug)
	            console.debug({ jsonx, computedProps });
	        return (jsonx.useincludeprops && Array.isArray(jsonx.useincludeprops))
	            ? jsonx.useincludeprops.concat(['key'], Object.keys(thisprops), Object.keys(thisstate), Object.keys(thiscontext), Object.keys(resourceprops), Object.keys(asyncprops), Object.keys(windowprops), Object.keys(evalProps), Object.keys(insertedComponents), Object.keys(insertedReactComponents), Object.keys(insertedComputedComponents)).reduce((includedProps, prop) => {
	                includedProps[prop] = computedProps[prop];
	                return includedProps;
	            }, {})
	            : computedProps;
	    }
	    catch (e) {
	        debug && logError(e, e.stack ? e.stack : "no stack");
	        return null;
	    }
	}

	var jsonxProps = /*#__PURE__*/Object.freeze({
		__proto__: null,
		STRIP_COMMENTS: STRIP_COMMENTS,
		ARGUMENT_NAMES: ARGUMENT_NAMES,
		getParamNames: getParamNames,
		getJSONXProps: getJSONXProps,
		getChildrenComponents: getChildrenComponents,
		useFormRegisterHandler: useFormRegisterHandler,
		boundArgsReducer: boundArgsReducer,
		getEvalProps: getEvalProps,
		getComponentProps: getComponentProps,
		getReactComponents: getReactComponents,
		getReactComponentProps: getReactComponentProps,
		getFunctionFromProps: getFunctionFromProps,
		getFunctionProps: getFunctionProps,
		getWindowComponents: getWindowComponents,
		getComputedProps: getComputedProps$1
	});

	/*! @preserve
	 * numeral.js
	 * version : 2.0.6
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	var numeral = createCommonjsModule(function (module) {
	(function (global, factory) {
	    if (module.exports) {
	        module.exports = factory();
	    } else {
	        (typeof global!=="undefined" ? global : window).numeral = factory();
	    }
	}(commonjsGlobal, function () {
	    /************************************
	        Variables
	    ************************************/

	    var numeral,
	        _,
	        VERSION = '2.0.6',
	        formats = {},
	        locales = {},
	        defaults = {
	            currentLocale: 'en',
	            zeroFormat: null,
	            nullFormat: null,
	            defaultFormat: '0,0',
	            scalePercentBy100: true
	        },
	        options = {
	            currentLocale: defaults.currentLocale,
	            zeroFormat: defaults.zeroFormat,
	            nullFormat: defaults.nullFormat,
	            defaultFormat: defaults.defaultFormat,
	            scalePercentBy100: defaults.scalePercentBy100
	        };


	    /************************************
	        Constructors
	    ************************************/

	    // Numeral prototype object
	    function Numeral(input, number) {
	        this._input = input;

	        this._value = number;
	    }

	    numeral = function(input) {
	        var value,
	            kind,
	            unformatFunction,
	            regexp;

	        if (numeral.isNumeral(input)) {
	            value = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            value = 0;
	        } else if (input === null || _.isNaN(input)) {
	            value = null;
	        } else if (typeof input === 'string') {
	            if (options.zeroFormat && input === options.zeroFormat) {
	                value = 0;
	            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
	                value = null;
	            } else {
	                for (kind in formats) {
	                    regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

	                    if (regexp && input.match(regexp)) {
	                        unformatFunction = formats[kind].unformat;

	                        break;
	                    }
	                }

	                unformatFunction = unformatFunction || numeral._.stringToNumber;

	                value = unformatFunction(input);
	            }
	        } else {
	            value = Number(input)|| null;
	        }

	        return new Numeral(input, value);
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function(obj) {
	        return obj instanceof Numeral;
	    };

	    // helper functions
	    numeral._ = _ = {
	        // formats numbers separators, decimals places, signs, abbreviations
	        numberToFormat: function(value, format, roundingFunction) {
	            var locale = locales[numeral.options.currentLocale],
	                negP = false,
	                optDec = false,
	                leadingCount = 0,
	                abbr = '',
	                trillion = 1000000000000,
	                billion = 1000000000,
	                million = 1000000,
	                thousand = 1000,
	                decimal = '',
	                neg = false,
	                abbrForce, // force abbreviation
	                abs,
	                int,
	                precision,
	                signed,
	                thousands,
	                output;

	            // make sure we never format a null value
	            value = value || 0;

	            abs = Math.abs(value);

	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (numeral._.includes(format, '(')) {
	                negP = true;
	                format = format.replace(/[\(|\)]/g, '');
	            } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
	                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
	                format = format.replace(/[\+|\-]/g, '');
	            }

	            // see if abbreviation is wanted
	            if (numeral._.includes(format, 'a')) {
	                abbrForce = format.match(/a(k|m|b|t)?/);

	                abbrForce = abbrForce ? abbrForce[1] : false;

	                // check for space before abbreviation
	                if (numeral._.includes(format, ' a')) {
	                    abbr = ' ';
	                }

	                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

	                if (abs >= trillion && !abbrForce || abbrForce === 't') {
	                    // trillion
	                    abbr += locale.abbreviations.trillion;
	                    value = value / trillion;
	                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
	                    // billion
	                    abbr += locale.abbreviations.billion;
	                    value = value / billion;
	                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
	                    // million
	                    abbr += locale.abbreviations.million;
	                    value = value / million;
	                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
	                    // thousand
	                    abbr += locale.abbreviations.thousand;
	                    value = value / thousand;
	                }
	            }

	            // check for optional decimals
	            if (numeral._.includes(format, '[.]')) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            // break number and format
	            int = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');
	            leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

	            if (precision) {
	                if (numeral._.includes(precision, '[')) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
	                }

	                int = decimal.split('.')[0];

	                if (numeral._.includes(decimal, '.')) {
	                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
	                } else {
	                    decimal = '';
	                }

	                if (optDec && Number(decimal.slice(1)) === 0) {
	                    decimal = '';
	                }
	            } else {
	                int = numeral._.toFixed(value, 0, roundingFunction);
	            }

	            // check abbreviation again after rounding
	            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
	                int = String(Number(int) / 1000);

	                switch (abbr) {
	                    case locale.abbreviations.thousand:
	                        abbr = locale.abbreviations.million;
	                        break;
	                    case locale.abbreviations.million:
	                        abbr = locale.abbreviations.billion;
	                        break;
	                    case locale.abbreviations.billion:
	                        abbr = locale.abbreviations.trillion;
	                        break;
	                }
	            }


	            // format number
	            if (numeral._.includes(int, '-')) {
	                int = int.slice(1);
	                neg = true;
	            }

	            if (int.length < leadingCount) {
	                for (var i = leadingCount - int.length; i > 0; i--) {
	                    int = '0' + int;
	                }
	            }

	            if (thousands > -1) {
	                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                int = '';
	            }

	            output = int + decimal + (abbr ? abbr : '');

	            if (negP) {
	                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
	            } else {
	                if (signed >= 0) {
	                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
	                } else if (neg) {
	                    output = '-' + output;
	                }
	            }

	            return output;
	        },
	        // unformats numbers separators, decimals places, signs, abbreviations
	        stringToNumber: function(string) {
	            var locale = locales[options.currentLocale],
	                stringOriginal = string,
	                abbreviations = {
	                    thousand: 3,
	                    million: 6,
	                    billion: 9,
	                    trillion: 12
	                },
	                abbreviation,
	                value,
	                regexp;

	            if (options.zeroFormat && string === options.zeroFormat) {
	                value = 0;
	            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
	                value = null;
	            } else {
	                value = 1;

	                if (locale.delimiters.decimal !== '.') {
	                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
	                }

	                for (abbreviation in abbreviations) {
	                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

	                    if (stringOriginal.match(regexp)) {
	                        value *= Math.pow(10, abbreviations[abbreviation]);
	                        break;
	                    }
	                }

	                // check for negative number
	                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

	                // remove non numbers
	                string = string.replace(/[^0-9\.]+/g, '');

	                value *= Number(string);
	            }

	            return value;
	        },
	        isNaN: function(value) {
	            return typeof value === 'number' && isNaN(value);
	        },
	        includes: function(string, search) {
	            return string.indexOf(search) !== -1;
	        },
	        insert: function(string, subString, start) {
	            return string.slice(0, start) + subString + string.slice(start);
	        },
	        reduce: function(array, callback /*, initialValue*/) {
	            if (this === null) {
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }

	            if (typeof callback !== 'function') {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var t = Object(array),
	                len = t.length >>> 0,
	                k = 0,
	                value;

	            if (arguments.length === 3) {
	                value = arguments[2];
	            } else {
	                while (k < len && !(k in t)) {
	                    k++;
	                }

	                if (k >= len) {
	                    throw new TypeError('Reduce of empty array with no initial value');
	                }

	                value = t[k++];
	            }
	            for (; k < len; k++) {
	                if (k in t) {
	                    value = callback(value, t[k], k, t);
	                }
	            }
	            return value;
	        },
	        /**
	         * Computes the multiplier necessary to make x >= 1,
	         * effectively eliminating miscalculations caused by
	         * finite precision.
	         */
	        multiplier: function (x) {
	            var parts = x.toString().split('.');

	            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
	        },
	        /**
	         * Given a variable number of arguments, returns the maximum
	         * multiplier that must be used to normalize an operation involving
	         * all of them.
	         */
	        correctionFactor: function () {
	            var args = Array.prototype.slice.call(arguments);

	            return args.reduce(function(accum, next) {
	                var mn = _.multiplier(next);
	                return accum > mn ? accum : mn;
	            }, 1);
	        },
	        /**
	         * Implementation of toFixed() that treats floats more like decimals
	         *
	         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	         * problems for accounting- and finance-related software.
	         */
	        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
	            var splitValue = value.toString().split('.'),
	                minDecimals = maxDecimals - (optionals || 0),
	                boundedPrecision,
	                optionalsRegExp,
	                power,
	                output;

	            // Use the smallest precision value possible to avoid errors from floating point representation
	            if (splitValue.length === 2) {
	              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
	            } else {
	              boundedPrecision = minDecimals;
	            }

	            power = Math.pow(10, boundedPrecision);

	            // Multiply up by precision, round accurately, then divide and use native toFixed():
	            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

	            if (optionals > maxDecimals - boundedPrecision) {
	                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
	                output = output.replace(optionalsRegExp, '');
	            }

	            return output;
	        }
	    };

	    // avaliable options
	    numeral.options = options;

	    // avaliable formats
	    numeral.formats = formats;

	    // avaliable formats
	    numeral.locales = locales;

	    // This function sets the current locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    numeral.locale = function(key) {
	        if (key) {
	            options.currentLocale = key.toLowerCase();
	        }

	        return options.currentLocale;
	    };

	    // This function provides access to the loaded locale data.  If
	    // no arguments are passed in, it will simply return the current
	    // global locale object.
	    numeral.localeData = function(key) {
	        if (!key) {
	            return locales[options.currentLocale];
	        }

	        key = key.toLowerCase();

	        if (!locales[key]) {
	            throw new Error('Unknown locale : ' + key);
	        }

	        return locales[key];
	    };

	    numeral.reset = function() {
	        for (var property in defaults) {
	            options[property] = defaults[property];
	        }
	    };

	    numeral.zeroFormat = function(format) {
	        options.zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.nullFormat = function (format) {
	        options.nullFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function(format) {
	        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    numeral.register = function(type, name, format) {
	        name = name.toLowerCase();

	        if (this[type + 's'][name]) {
	            throw new TypeError(name + ' ' + type + ' already registered.');
	        }

	        this[type + 's'][name] = format;

	        return format;
	    };


	    numeral.validate = function(val, culture) {
	        var _decimalSep,
	            _thousandSep,
	            _currSymbol,
	            _valArray,
	            _abbrObj,
	            _thousandRegEx,
	            localeData,
	            temp;

	        //coerce val to string
	        if (typeof val !== 'string') {
	            val += '';

	            if (console.warn) {
	                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
	            }
	        }

	        //trim whitespaces from either sides
	        val = val.trim();

	        //if val is just digits return true
	        if (!!val.match(/^\d+$/)) {
	            return true;
	        }

	        //if val is empty return false
	        if (val === '') {
	            return false;
	        }

	        //get the decimal and thousands separator from numeral.localeData
	        try {
	            //check if the culture is understood by numeral. if not, default it to current locale
	            localeData = numeral.localeData(culture);
	        } catch (e) {
	            localeData = numeral.localeData(numeral.locale());
	        }

	        //setup the delimiters and currency symbol based on culture/locale
	        _currSymbol = localeData.currency.symbol;
	        _abbrObj = localeData.abbreviations;
	        _decimalSep = localeData.delimiters.decimal;
	        if (localeData.delimiters.thousands === '.') {
	            _thousandSep = '\\.';
	        } else {
	            _thousandSep = localeData.delimiters.thousands;
	        }

	        // validating currency symbol
	        temp = val.match(/^[^\d]+/);
	        if (temp !== null) {
	            val = val.substr(1);
	            if (temp[0] !== _currSymbol) {
	                return false;
	            }
	        }

	        //validating abbreviation symbol
	        temp = val.match(/[^\d]+$/);
	        if (temp !== null) {
	            val = val.slice(0, -1);
	            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
	                return false;
	            }
	        }

	        _thousandRegEx = new RegExp(_thousandSep + '{2}');

	        if (!val.match(/[^\d.,]/g)) {
	            _valArray = val.split(_decimalSep);
	            if (_valArray.length > 2) {
	                return false;
	            } else {
	                if (_valArray.length < 2) {
	                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
	                } else {
	                    if (_valArray[0].length === 1) {
	                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
	                    } else {
	                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
	                    }
	                }
	            }
	        }

	        return false;
	    };


	    /************************************
	        Numeral Prototype
	    ************************************/

	    numeral.fn = Numeral.prototype = {
	        clone: function() {
	            return numeral(this);
	        },
	        format: function(inputString, roundingFunction) {
	            var value = this._value,
	                format = inputString || options.defaultFormat,
	                kind,
	                output,
	                formatFunction;

	            // make sure we have a roundingFunction
	            roundingFunction = roundingFunction || Math.round;

	            // format based on value
	            if (value === 0 && options.zeroFormat !== null) {
	                output = options.zeroFormat;
	            } else if (value === null && options.nullFormat !== null) {
	                output = options.nullFormat;
	            } else {
	                for (kind in formats) {
	                    if (format.match(formats[kind].regexps.format)) {
	                        formatFunction = formats[kind].format;

	                        break;
	                    }
	                }

	                formatFunction = formatFunction || numeral._.numberToFormat;

	                output = formatFunction(value, format, roundingFunction);
	            }

	            return output;
	        },
	        value: function() {
	            return this._value;
	        },
	        input: function() {
	            return this._input;
	        },
	        set: function(value) {
	            this._value = Number(value);

	            return this;
	        },
	        add: function(value) {
	            var corrFactor = _.correctionFactor.call(null, this._value, value);

	            function cback(accum, curr, currI, O) {
	                return accum + Math.round(corrFactor * curr);
	            }

	            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

	            return this;
	        },
	        subtract: function(value) {
	            var corrFactor = _.correctionFactor.call(null, this._value, value);

	            function cback(accum, curr, currI, O) {
	                return accum - Math.round(corrFactor * curr);
	            }

	            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

	            return this;
	        },
	        multiply: function(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = _.correctionFactor(accum, curr);
	                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
	            }

	            this._value = _.reduce([this._value, value], cback, 1);

	            return this;
	        },
	        divide: function(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = _.correctionFactor(accum, curr);
	                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
	            }

	            this._value = _.reduce([this._value, value], cback);

	            return this;
	        },
	        difference: function(value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }
	    };

	    /************************************
	        Default Locale && Format
	    ************************************/

	    numeral.register('locale', 'en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function(number) {
	            var b = number % 10;
	            return (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    

	(function() {
	        numeral.register('format', 'bps', {
	            regexps: {
	                format: /(BPS)/,
	                unformat: /(BPS)/
	            },
	            format: function(value, format, roundingFunction) {
	                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
	                    output;

	                value = value * 10000;

	                // check for space before BPS
	                format = format.replace(/\s?BPS/, '');

	                output = numeral._.numberToFormat(value, format, roundingFunction);

	                if (numeral._.includes(output, ')')) {
	                    output = output.split('');

	                    output.splice(-1, 0, space + 'BPS');

	                    output = output.join('');
	                } else {
	                    output = output + space + 'BPS';
	                }

	                return output;
	            },
	            unformat: function(string) {
	                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
	            }
	        });
	})();


	(function() {
	        var decimal = {
	            base: 1000,
	            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	        },
	        binary = {
	            base: 1024,
	            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
	        };

	    var allSuffixes =  decimal.suffixes.concat(binary.suffixes.filter(function (item) {
	            return decimal.suffixes.indexOf(item) < 0;
	        }));
	        var unformatRegex = allSuffixes.join('|');
	        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
	        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

	    numeral.register('format', 'bytes', {
	        regexps: {
	            format: /([0\s]i?b)/,
	            unformat: new RegExp(unformatRegex)
	        },
	        format: function(value, format, roundingFunction) {
	            var output,
	                bytes = numeral._.includes(format, 'ib') ? binary : decimal,
	                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
	                power,
	                min,
	                max;

	            // check for space before
	            format = format.replace(/\s?i?b/, '');

	            for (power = 0; power <= bytes.suffixes.length; power++) {
	                min = Math.pow(bytes.base, power);
	                max = Math.pow(bytes.base, power + 1);

	                if (value === null || value === 0 || value >= min && value < max) {
	                    suffix += bytes.suffixes[power];

	                    if (min > 0) {
	                        value = value / min;
	                    }

	                    break;
	                }
	            }

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            return output + suffix;
	        },
	        unformat: function(string) {
	            var value = numeral._.stringToNumber(string),
	                power,
	                bytesMultiplier;

	            if (value) {
	                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
	                    if (numeral._.includes(string, decimal.suffixes[power])) {
	                        bytesMultiplier = Math.pow(decimal.base, power);

	                        break;
	                    }

	                    if (numeral._.includes(string, binary.suffixes[power])) {
	                        bytesMultiplier = Math.pow(binary.base, power);

	                        break;
	                    }
	                }

	                value *= (bytesMultiplier || 1);
	            }

	            return value;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'currency', {
	        regexps: {
	            format: /(\$)/
	        },
	        format: function(value, format, roundingFunction) {
	            var locale = numeral.locales[numeral.options.currentLocale],
	                symbols = {
	                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
	                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
	                },
	                output,
	                symbol,
	                i;

	            // strip format of spaces and $
	            format = format.replace(/\s?\$\s?/, '');

	            // format the number
	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            // update the before and after based on value
	            if (value >= 0) {
	                symbols.before = symbols.before.replace(/[\-\(]/, '');
	                symbols.after = symbols.after.replace(/[\-\)]/, '');
	            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
	                symbols.before = '-' + symbols.before;
	            }

	            // loop through each before symbol
	            for (i = 0; i < symbols.before.length; i++) {
	                symbol = symbols.before[i];

	                switch (symbol) {
	                    case '$':
	                        output = numeral._.insert(output, locale.currency.symbol, i);
	                        break;
	                    case ' ':
	                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
	                        break;
	                }
	            }

	            // loop through each after symbol
	            for (i = symbols.after.length - 1; i >= 0; i--) {
	                symbol = symbols.after[i];

	                switch (symbol) {
	                    case '$':
	                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
	                        break;
	                    case ' ':
	                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
	                        break;
	                }
	            }


	            return output;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'exponential', {
	        regexps: {
	            format: /(e\+|e-)/,
	            unformat: /(e\+|e-)/
	        },
	        format: function(value, format, roundingFunction) {
	            var output,
	                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
	                parts = exponential.split('e');

	            format = format.replace(/e[\+|\-]{1}0/, '');

	            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

	            return output + 'e' + parts[1];
	        },
	        unformat: function(string) {
	            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
	                value = Number(parts[0]),
	                power = Number(parts[1]);

	            power = numeral._.includes(string, 'e-') ? power *= -1 : power;

	            function cback(accum, curr, currI, O) {
	                var corrFactor = numeral._.correctionFactor(accum, curr),
	                    num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
	                return num;
	            }

	            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'ordinal', {
	        regexps: {
	            format: /(o)/
	        },
	        format: function(value, format, roundingFunction) {
	            var locale = numeral.locales[numeral.options.currentLocale],
	                output,
	                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

	            // check for space before
	            format = format.replace(/\s?o/, '');

	            ordinal += locale.ordinal(value);

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            return output + ordinal;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'percentage', {
	        regexps: {
	            format: /(%)/,
	            unformat: /(%)/
	        },
	        format: function(value, format, roundingFunction) {
	            var space = numeral._.includes(format, ' %') ? ' ' : '',
	                output;

	            if (numeral.options.scalePercentBy100) {
	                value = value * 100;
	            }

	            // check for space before %
	            format = format.replace(/\s?\%/, '');

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            if (numeral._.includes(output, ')')) {
	                output = output.split('');

	                output.splice(-1, 0, space + '%');

	                output = output.join('');
	            } else {
	                output = output + space + '%';
	            }

	            return output;
	        },
	        unformat: function(string) {
	            var number = numeral._.stringToNumber(string);
	            if (numeral.options.scalePercentBy100) {
	                return number * 0.01;
	            }
	            return number;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'time', {
	        regexps: {
	            format: /(:)/,
	            unformat: /(:)/
	        },
	        format: function(value, format, roundingFunction) {
	            var hours = Math.floor(value / 60 / 60),
	                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
	                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

	            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	        },
	        unformat: function(string) {
	            var timeArray = string.split(':'),
	                seconds = 0;

	            // turn hours and minutes into seconds and add them all up
	            if (timeArray.length === 3) {
	                // hours
	                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	                // minutes
	                seconds = seconds + (Number(timeArray[1]) * 60);
	                // seconds
	                seconds = seconds + Number(timeArray[2]);
	            } else if (timeArray.length === 2) {
	                // minutes
	                seconds = seconds + (Number(timeArray[0]) * 60);
	                // seconds
	                seconds = seconds + Number(timeArray[1]);
	            }
	            return Number(seconds);
	        }
	    });
	})();

	return numeral;
	}));
	});

	// these aren't really private, but nor are they really useful to document

	/**
	 * @private
	 */
	class LuxonError extends Error {}

	/**
	 * @private
	 */
	class InvalidDateTimeError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid DateTime: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidIntervalError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Interval: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidDurationError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Duration: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class ConflictingSpecificationError extends LuxonError {}

	/**
	 * @private
	 */
	class InvalidUnitError extends LuxonError {
	  constructor(unit) {
	    super(`Invalid unit ${unit}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidArgumentError extends LuxonError {}

	/**
	 * @private
	 */
	class ZoneIsAbstractError extends LuxonError {
	  constructor() {
	    super("Zone is an abstract class");
	  }
	}

	/**
	 * @private
	 */

	const n = "numeric",
	  s = "short",
	  l = "long";

	const DATE_SHORT = {
	  year: n,
	  month: n,
	  day: n
	};

	const DATE_MED = {
	  year: n,
	  month: s,
	  day: n
	};

	const DATE_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s
	};

	const DATE_FULL = {
	  year: n,
	  month: l,
	  day: n
	};

	const DATE_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l
	};

	const TIME_SIMPLE = {
	  hour: n,
	  minute: n
	};

	const TIME_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n
	};

	const TIME_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};

	const TIME_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};

	const TIME_24_SIMPLE = {
	  hour: n,
	  minute: n,
	  hour12: false
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
	 */
	const TIME_24_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
	 */
	const TIME_24_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false,
	  timeZoneName: s
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
	 */
	const TIME_24_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false,
	  timeZoneName: l
	};

	/**
	 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	 */
	const DATETIME_SHORT = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n
	};

	/**
	 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	 */
	const DATETIME_SHORT_WITH_SECONDS = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};

	const DATETIME_MED = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n
	};

	const DATETIME_MED_WITH_SECONDS = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};

	const DATETIME_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s,
	  hour: n,
	  minute: n
	};

	const DATETIME_FULL = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  timeZoneName: s
	};

	const DATETIME_FULL_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};

	const DATETIME_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  timeZoneName: l
	};

	const DATETIME_HUGE_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};

	/*
	  This is just a junk drawer, containing anything used across multiple classes.
	  Because Luxon is small(ish), this should stay small and we won't worry about splitting
	  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
	*/

	/**
	 * @private
	 */

	// TYPES

	function isUndefined(o) {
	  return typeof o === "undefined";
	}

	function isNumber(o) {
	  return typeof o === "number";
	}

	function isInteger(o) {
	  return typeof o === "number" && o % 1 === 0;
	}

	function isString(o) {
	  return typeof o === "string";
	}

	function isDate(o) {
	  return Object.prototype.toString.call(o) === "[object Date]";
	}

	// CAPABILITIES

	function hasIntl() {
	  try {
	    return typeof Intl !== "undefined" && Intl.DateTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}

	function hasFormatToParts() {
	  return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
	}

	function hasRelative() {
	  try {
	    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}

	// OBJECTS AND ARRAYS

	function maybeArray(thing) {
	  return Array.isArray(thing) ? thing : [thing];
	}

	function bestBy(arr, by, compare) {
	  if (arr.length === 0) {
	    return undefined;
	  }
	  return arr.reduce((best, next) => {
	    const pair = [by(next), next];
	    if (!best) {
	      return pair;
	    } else if (compare(best[0], pair[0]) === best[0]) {
	      return best;
	    } else {
	      return pair;
	    }
	  }, null)[1];
	}

	function pick(obj, keys) {
	  return keys.reduce((a, k) => {
	    a[k] = obj[k];
	    return a;
	  }, {});
	}

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	// NUMBERS AND STRINGS

	function integerBetween(thing, bottom, top) {
	  return isInteger(thing) && thing >= bottom && thing <= top;
	}

	// x % n but takes the sign of n instead of x
	function floorMod(x, n) {
	  return x - n * Math.floor(x / n);
	}

	function padStart(input, n = 2) {
	  const minus = input < 0 ? "-" : "";
	  const target = minus ? input * -1 : input;
	  let result;

	  if (target.toString().length < n) {
	    result = ("0".repeat(n) + target).slice(-n);
	  } else {
	    result = target.toString();
	  }

	  return `${minus}${result}`;
	}

	function parseInteger(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseInt(string, 10);
	  }
	}

	function parseMillis(fraction) {
	  // Return undefined (instead of 0) in these cases, where fraction is not set
	  if (isUndefined(fraction) || fraction === null || fraction === "") {
	    return undefined;
	  } else {
	    const f = parseFloat("0." + fraction) * 1000;
	    return Math.floor(f);
	  }
	}

	function roundTo(number, digits, towardZero = false) {
	  const factor = 10 ** digits,
	    rounder = towardZero ? Math.trunc : Math.round;
	  return rounder(number * factor) / factor;
	}

	// DATE BASICS

	function isLeapYear(year) {
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	function daysInYear(year) {
	  return isLeapYear(year) ? 366 : 365;
	}

	function daysInMonth(year, month) {
	  const modMonth = floorMod(month - 1, 12) + 1,
	    modYear = year + (month - modMonth) / 12;

	  if (modMonth === 2) {
	    return isLeapYear(modYear) ? 29 : 28;
	  } else {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
	  }
	}

	// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
	function objToLocalTS(obj) {
	  let d = Date.UTC(
	    obj.year,
	    obj.month - 1,
	    obj.day,
	    obj.hour,
	    obj.minute,
	    obj.second,
	    obj.millisecond
	  );

	  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
	  if (obj.year < 100 && obj.year >= 0) {
	    d = new Date(d);
	    d.setUTCFullYear(d.getUTCFullYear() - 1900);
	  }
	  return +d;
	}

	function weeksInWeekYear(weekYear) {
	  const p1 =
	      (weekYear +
	        Math.floor(weekYear / 4) -
	        Math.floor(weekYear / 100) +
	        Math.floor(weekYear / 400)) %
	      7,
	    last = weekYear - 1,
	    p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
	  return p1 === 4 || p2 === 3 ? 53 : 52;
	}

	function untruncateYear(year) {
	  if (year > 99) {
	    return year;
	  } else return year > 60 ? 1900 + year : 2000 + year;
	}

	// PARSING

	function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
	  const date = new Date(ts),
	    intlOpts = {
	      hour12: false,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit"
	    };

	  if (timeZone) {
	    intlOpts.timeZone = timeZone;
	  }

	  const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts),
	    intl = hasIntl();

	  if (intl && hasFormatToParts()) {
	    const parsed = new Intl.DateTimeFormat(locale, modified)
	      .formatToParts(date)
	      .find(m => m.type.toLowerCase() === "timezonename");
	    return parsed ? parsed.value : null;
	  } else if (intl) {
	    // this probably doesn't work for all locales
	    const without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
	      included = new Intl.DateTimeFormat(locale, modified).format(date),
	      diffed = included.substring(without.length),
	      trimmed = diffed.replace(/^[, \u200e]+/, "");
	    return trimmed;
	  } else {
	    return null;
	  }
	}

	// signedOffset('-5', '30') -> -330
	function signedOffset(offHourStr, offMinuteStr) {
	  let offHour = parseInt(offHourStr, 10);

	  // don't || this because we want to preserve -0
	  if (Number.isNaN(offHour)) {
	    offHour = 0;
	  }

	  const offMin = parseInt(offMinuteStr, 10) || 0,
	    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
	  return offHour * 60 + offMinSigned;
	}

	// COERCION

	function asNumber(value) {
	  const numericValue = Number(value);
	  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
	    throw new InvalidArgumentError(`Invalid unit value ${value}`);
	  return numericValue;
	}

	function normalizeObject(obj, normalizer, nonUnitKeys) {
	  const normalized = {};
	  for (const u in obj) {
	    if (hasOwnProperty(obj, u)) {
	      if (nonUnitKeys.indexOf(u) >= 0) continue;
	      const v = obj[u];
	      if (v === undefined || v === null) continue;
	      normalized[normalizer(u)] = asNumber(v);
	    }
	  }
	  return normalized;
	}

	function formatOffset(offset, format) {
	  const hours = Math.trunc(Math.abs(offset / 60)),
	    minutes = Math.trunc(Math.abs(offset % 60)),
	    sign = offset >= 0 ? "+" : "-";

	  switch (format) {
	    case "short":
	      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
	    case "narrow":
	      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
	    case "techie":
	      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
	    default:
	      throw new RangeError(`Value format ${format} is out of range for property format`);
	  }
	}

	function timeObject(obj) {
	  return pick(obj, ["hour", "minute", "second", "millisecond"]);
	}

	const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;

	function stringify(obj) {
	  return JSON.stringify(obj, Object.keys(obj).sort());
	}

	/**
	 * @private
	 */

	const monthsLong = [
	  "January",
	  "February",
	  "March",
	  "April",
	  "May",
	  "June",
	  "July",
	  "August",
	  "September",
	  "October",
	  "November",
	  "December"
	];

	const monthsShort = [
	  "Jan",
	  "Feb",
	  "Mar",
	  "Apr",
	  "May",
	  "Jun",
	  "Jul",
	  "Aug",
	  "Sep",
	  "Oct",
	  "Nov",
	  "Dec"
	];

	const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

	function months(length) {
	  switch (length) {
	    case "narrow":
	      return monthsNarrow;
	    case "short":
	      return monthsShort;
	    case "long":
	      return monthsLong;
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	    case "2-digit":
	      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    default:
	      return null;
	  }
	}

	const weekdaysLong = [
	  "Monday",
	  "Tuesday",
	  "Wednesday",
	  "Thursday",
	  "Friday",
	  "Saturday",
	  "Sunday"
	];

	const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

	function weekdays(length) {
	  switch (length) {
	    case "narrow":
	      return weekdaysNarrow;
	    case "short":
	      return weekdaysShort;
	    case "long":
	      return weekdaysLong;
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7"];
	    default:
	      return null;
	  }
	}

	const meridiems = ["AM", "PM"];

	const erasLong = ["Before Christ", "Anno Domini"];

	const erasShort = ["BC", "AD"];

	const erasNarrow = ["B", "A"];

	function eras(length) {
	  switch (length) {
	    case "narrow":
	      return erasNarrow;
	    case "short":
	      return erasShort;
	    case "long":
	      return erasLong;
	    default:
	      return null;
	  }
	}

	function meridiemForDateTime(dt) {
	  return meridiems[dt.hour < 12 ? 0 : 1];
	}

	function weekdayForDateTime(dt, length) {
	  return weekdays(length)[dt.weekday - 1];
	}

	function monthForDateTime(dt, length) {
	  return months(length)[dt.month - 1];
	}

	function eraForDateTime(dt, length) {
	  return eras(length)[dt.year < 0 ? 0 : 1];
	}

	function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
	  const units = {
	    years: ["year", "yr."],
	    quarters: ["quarter", "qtr."],
	    months: ["month", "mo."],
	    weeks: ["week", "wk."],
	    days: ["day", "day", "days"],
	    hours: ["hour", "hr."],
	    minutes: ["minute", "min."],
	    seconds: ["second", "sec."]
	  };

	  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

	  if (numeric === "auto" && lastable) {
	    const isDay = unit === "days";
	    switch (count) {
	      case 1:
	        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
	      case -1:
	        return isDay ? "yesterday" : `last ${units[unit][0]}`;
	      case 0:
	        return isDay ? "today" : `this ${units[unit][0]}`;
	    }
	  }

	  const isInPast = Object.is(count, -0) || count < 0,
	    fmtValue = Math.abs(count),
	    singular = fmtValue === 1,
	    lilUnits = units[unit],
	    fmtUnit = narrow
	      ? singular
	        ? lilUnits[1]
	        : lilUnits[2] || lilUnits[1]
	      : singular
	        ? units[unit][0]
	        : unit;
	  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
	}

	function formatString(knownFormat) {
	  // these all have the offsets removed because we don't have access to them
	  // without all the intl stuff this is backfilling
	  const filtered = pick(knownFormat, [
	      "weekday",
	      "era",
	      "year",
	      "month",
	      "day",
	      "hour",
	      "minute",
	      "second",
	      "timeZoneName",
	      "hour12"
	    ]),
	    key = stringify(filtered),
	    dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";
	  switch (key) {
	    case stringify(DATE_SHORT):
	      return "M/d/yyyy";
	    case stringify(DATE_MED):
	      return "LLL d, yyyy";
	    case stringify(DATE_MED_WITH_WEEKDAY):
	      return "EEE, LLL d, yyyy";
	    case stringify(DATE_FULL):
	      return "LLLL d, yyyy";
	    case stringify(DATE_HUGE):
	      return "EEEE, LLLL d, yyyy";
	    case stringify(TIME_SIMPLE):
	      return "h:mm a";
	    case stringify(TIME_WITH_SECONDS):
	      return "h:mm:ss a";
	    case stringify(TIME_WITH_SHORT_OFFSET):
	      return "h:mm a";
	    case stringify(TIME_WITH_LONG_OFFSET):
	      return "h:mm a";
	    case stringify(TIME_24_SIMPLE):
	      return "HH:mm";
	    case stringify(TIME_24_WITH_SECONDS):
	      return "HH:mm:ss";
	    case stringify(TIME_24_WITH_SHORT_OFFSET):
	      return "HH:mm";
	    case stringify(TIME_24_WITH_LONG_OFFSET):
	      return "HH:mm";
	    case stringify(DATETIME_SHORT):
	      return "M/d/yyyy, h:mm a";
	    case stringify(DATETIME_MED):
	      return "LLL d, yyyy, h:mm a";
	    case stringify(DATETIME_FULL):
	      return "LLLL d, yyyy, h:mm a";
	    case stringify(DATETIME_HUGE):
	      return dateTimeHuge;
	    case stringify(DATETIME_SHORT_WITH_SECONDS):
	      return "M/d/yyyy, h:mm:ss a";
	    case stringify(DATETIME_MED_WITH_SECONDS):
	      return "LLL d, yyyy, h:mm:ss a";
	    case stringify(DATETIME_MED_WITH_WEEKDAY):
	      return "EEE, d LLL yyyy, h:mm a";
	    case stringify(DATETIME_FULL_WITH_SECONDS):
	      return "LLLL d, yyyy, h:mm:ss a";
	    case stringify(DATETIME_HUGE_WITH_SECONDS):
	      return "EEEE, LLLL d, yyyy, h:mm:ss a";
	    default:
	      return dateTimeHuge;
	  }
	}

	function stringifyTokens(splits, tokenToString) {
	  let s = "";
	  for (const token of splits) {
	    if (token.literal) {
	      s += token.val;
	    } else {
	      s += tokenToString(token.val);
	    }
	  }
	  return s;
	}

	const macroTokenToFormatOpts = {
	  D: DATE_SHORT,
	  DD: DATE_MED,
	  DDD: DATE_FULL,
	  DDDD: DATE_HUGE,
	  t: TIME_SIMPLE,
	  tt: TIME_WITH_SECONDS,
	  ttt: TIME_WITH_SHORT_OFFSET,
	  tttt: TIME_WITH_LONG_OFFSET,
	  T: TIME_24_SIMPLE,
	  TT: TIME_24_WITH_SECONDS,
	  TTT: TIME_24_WITH_SHORT_OFFSET,
	  TTTT: TIME_24_WITH_LONG_OFFSET,
	  f: DATETIME_SHORT,
	  ff: DATETIME_MED,
	  fff: DATETIME_FULL,
	  ffff: DATETIME_HUGE,
	  F: DATETIME_SHORT_WITH_SECONDS,
	  FF: DATETIME_MED_WITH_SECONDS,
	  FFF: DATETIME_FULL_WITH_SECONDS,
	  FFFF: DATETIME_HUGE_WITH_SECONDS
	};

	/**
	 * @private
	 */

	class Formatter {
	  static create(locale, opts = {}) {
	    return new Formatter(locale, opts);
	  }

	  static parseFormat(fmt) {
	    let current = null,
	      currentFull = "",
	      bracketed = false;
	    const splits = [];
	    for (let i = 0; i < fmt.length; i++) {
	      const c = fmt.charAt(i);
	      if (c === "'") {
	        if (currentFull.length > 0) {
	          splits.push({ literal: bracketed, val: currentFull });
	        }
	        current = null;
	        currentFull = "";
	        bracketed = !bracketed;
	      } else if (bracketed) {
	        currentFull += c;
	      } else if (c === current) {
	        currentFull += c;
	      } else {
	        if (currentFull.length > 0) {
	          splits.push({ literal: false, val: currentFull });
	        }
	        currentFull = c;
	        current = c;
	      }
	    }

	    if (currentFull.length > 0) {
	      splits.push({ literal: bracketed, val: currentFull });
	    }

	    return splits;
	  }

	  static macroTokenToFormatOpts(token) {
	    return macroTokenToFormatOpts[token];
	  }

	  constructor(locale, formatOpts) {
	    this.opts = formatOpts;
	    this.loc = locale;
	    this.systemLoc = null;
	  }

	  formatWithSystemDefault(dt, opts) {
	    if (this.systemLoc === null) {
	      this.systemLoc = this.loc.redefaultToSystem();
	    }
	    const df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.format();
	  }

	  formatDateTime(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.format();
	  }

	  formatDateTimeParts(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.formatToParts();
	  }

	  resolvedOptions(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.resolvedOptions();
	  }

	  num(n, p = 0) {
	    // we get some perf out of doing this here, annoyingly
	    if (this.opts.forceSimple) {
	      return padStart(n, p);
	    }

	    const opts = Object.assign({}, this.opts);

	    if (p > 0) {
	      opts.padTo = p;
	    }

	    return this.loc.numberFormatter(opts).format(n);
	  }

	  formatDateTimeFromString(dt, fmt) {
	    const knownEnglish = this.loc.listingMode() === "en",
	      useDateTimeFormatter =
	        this.loc.outputCalendar && this.loc.outputCalendar !== "gregory" && hasFormatToParts(),
	      string = (opts, extract) => this.loc.extract(dt, opts, extract),
	      formatOffset = opts => {
	        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
	          return "Z";
	        }

	        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
	      },
	      meridiem = () =>
	        knownEnglish
	          ? meridiemForDateTime(dt)
	          : string({ hour: "numeric", hour12: true }, "dayperiod"),
	      month = (length, standalone) =>
	        knownEnglish
	          ? monthForDateTime(dt, length)
	          : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
	      weekday = (length, standalone) =>
	        knownEnglish
	          ? weekdayForDateTime(dt, length)
	          : string(
	              standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
	              "weekday"
	            ),
	      maybeMacro = token => {
	        const formatOpts = Formatter.macroTokenToFormatOpts(token);
	        if (formatOpts) {
	          return this.formatWithSystemDefault(dt, formatOpts);
	        } else {
	          return token;
	        }
	      },
	      era = length =>
	        knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"),
	      tokenToString = token => {
	        // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
	        switch (token) {
	          // ms
	          case "S":
	            return this.num(dt.millisecond);
	          case "u":
	          // falls through
	          case "SSS":
	            return this.num(dt.millisecond, 3);
	          // seconds
	          case "s":
	            return this.num(dt.second);
	          case "ss":
	            return this.num(dt.second, 2);
	          // minutes
	          case "m":
	            return this.num(dt.minute);
	          case "mm":
	            return this.num(dt.minute, 2);
	          // hours
	          case "h":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
	          case "hh":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
	          case "H":
	            return this.num(dt.hour);
	          case "HH":
	            return this.num(dt.hour, 2);
	          // offset
	          case "Z":
	            // like +6
	            return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
	          case "ZZ":
	            // like +06:00
	            return formatOffset({ format: "short", allowZ: this.opts.allowZ });
	          case "ZZZ":
	            // like +0600
	            return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
	          case "ZZZZ":
	            // like EST
	            return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
	          case "ZZZZZ":
	            // like Eastern Standard Time
	            return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
	          // zone
	          case "z":
	            // like America/New_York
	            return dt.zoneName;
	          // meridiems
	          case "a":
	            return meridiem();
	          // dates
	          case "d":
	            return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
	          case "dd":
	            return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
	          // weekdays - standalone
	          case "c":
	            // like 1
	            return this.num(dt.weekday);
	          case "ccc":
	            // like 'Tues'
	            return weekday("short", true);
	          case "cccc":
	            // like 'Tuesday'
	            return weekday("long", true);
	          case "ccccc":
	            // like 'T'
	            return weekday("narrow", true);
	          // weekdays - format
	          case "E":
	            // like 1
	            return this.num(dt.weekday);
	          case "EEE":
	            // like 'Tues'
	            return weekday("short", false);
	          case "EEEE":
	            // like 'Tuesday'
	            return weekday("long", false);
	          case "EEEEE":
	            // like 'T'
	            return weekday("narrow", false);
	          // months - standalone
	          case "L":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric", day: "numeric" }, "month")
	              : this.num(dt.month);
	          case "LL":
	            // like 01, doesn't seem to work
	            return useDateTimeFormatter
	              ? string({ month: "2-digit", day: "numeric" }, "month")
	              : this.num(dt.month, 2);
	          case "LLL":
	            // like Jan
	            return month("short", true);
	          case "LLLL":
	            // like January
	            return month("long", true);
	          case "LLLLL":
	            // like J
	            return month("narrow", true);
	          // months - format
	          case "M":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric" }, "month")
	              : this.num(dt.month);
	          case "MM":
	            // like 01
	            return useDateTimeFormatter
	              ? string({ month: "2-digit" }, "month")
	              : this.num(dt.month, 2);
	          case "MMM":
	            // like Jan
	            return month("short", false);
	          case "MMMM":
	            // like January
	            return month("long", false);
	          case "MMMMM":
	            // like J
	            return month("narrow", false);
	          // years
	          case "y":
	            // like 2014
	            return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
	          case "yy":
	            // like 14
	            return useDateTimeFormatter
	              ? string({ year: "2-digit" }, "year")
	              : this.num(dt.year.toString().slice(-2), 2);
	          case "yyyy":
	            // like 0012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 4);
	          case "yyyyyy":
	            // like 000012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 6);
	          // eras
	          case "G":
	            // like AD
	            return era("short");
	          case "GG":
	            // like Anno Domini
	            return era("long");
	          case "GGGGG":
	            return era("narrow");
	          case "kk":
	            return this.num(dt.weekYear.toString().slice(-2), 2);
	          case "kkkk":
	            return this.num(dt.weekYear, 4);
	          case "W":
	            return this.num(dt.weekNumber);
	          case "WW":
	            return this.num(dt.weekNumber, 2);
	          case "o":
	            return this.num(dt.ordinal);
	          case "ooo":
	            return this.num(dt.ordinal, 3);
	          case "q":
	            // like 1
	            return this.num(dt.quarter);
	          case "qq":
	            // like 01
	            return this.num(dt.quarter, 2);
	          case "X":
	            return this.num(Math.floor(dt.ts / 1000));
	          case "x":
	            return this.num(dt.ts);
	          default:
	            return maybeMacro(token);
	        }
	      };

	    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
	  }

	  formatDurationFromString(dur, fmt) {
	    const tokenToField = token => {
	        switch (token[0]) {
	          case "S":
	            return "millisecond";
	          case "s":
	            return "second";
	          case "m":
	            return "minute";
	          case "h":
	            return "hour";
	          case "d":
	            return "day";
	          case "M":
	            return "month";
	          case "y":
	            return "year";
	          default:
	            return null;
	        }
	      },
	      tokenToString = lildur => token => {
	        const mapped = tokenToField(token);
	        if (mapped) {
	          return this.num(lildur.get(mapped), token.length);
	        } else {
	          return token;
	        }
	      },
	      tokens = Formatter.parseFormat(fmt),
	      realTokens = tokens.reduce(
	        (found, { literal, val }) => (literal ? found : found.concat(val)),
	        []
	      ),
	      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
	    return stringifyTokens(tokens, tokenToString(collapsed));
	  }
	}

	class Invalid {
	  constructor(reason, explanation) {
	    this.reason = reason;
	    this.explanation = explanation;
	  }

	  toMessage() {
	    if (this.explanation) {
	      return `${this.reason}: ${this.explanation}`;
	    } else {
	      return this.reason;
	    }
	  }
	}

	/* eslint no-unused-vars: "off" */

	/**
	 * @interface
	 */
	class Zone {
	  /**
	   * The type of zone
	   * @abstract
	   * @type {string}
	   */
	  get type() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * The name of this zone.
	   * @abstract
	   * @type {string}
	   */
	  get name() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year.
	   * @abstract
	   * @type {boolean}
	   */
	  get universal() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's common name (such as EST) at the specified timestamp
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the name
	   * @param {Object} opts - Options to affect the format
	   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
	   * @param {string} opts.locale - What locale to return the offset name in.
	   * @return {string}
	   */
	  offsetName(ts, opts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's value as a string
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to compute the offset
	   * @return {number}
	   */
	  offset(ts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is equal to another zone
	   * @abstract
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is valid.
	   * @abstract
	   * @type {boolean}
	   */
	  get isValid() {
	    throw new ZoneIsAbstractError();
	  }
	}

	let singleton$1 = null;

	/**
	 * Represents the local zone for this JavaScript environment.
	 * @implements {Zone}
	 */
	class LocalZone extends Zone {
	  /**
	   * Get a singleton instance of the local zone
	   * @return {LocalZone}
	   */
	  static get instance() {
	    if (singleton$1 === null) {
	      singleton$1 = new LocalZone();
	    }
	    return singleton$1;
	  }

	  /** @override **/
	  get type() {
	    return "local";
	  }

	  /** @override **/
	  get name() {
	    if (hasIntl()) {
	      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	    } else return "local";
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    return -new Date(ts).getTimezoneOffset();
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "local";
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	const matchingRegex = RegExp(`^${ianaRegex.source}$`);

	let dtfCache = {};
	function makeDTF(zone) {
	  if (!dtfCache[zone]) {
	    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
	      hour12: false,
	      timeZone: zone,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit",
	      second: "2-digit"
	    });
	  }
	  return dtfCache[zone];
	}

	const typeToPos = {
	  year: 0,
	  month: 1,
	  day: 2,
	  hour: 3,
	  minute: 4,
	  second: 5
	};

	function hackyOffset(dtf, date) {
	  const formatted = dtf.format(date).replace(/\u200E/g, ""),
	    parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
	    [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
	  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
	}

	function partsOffset(dtf, date) {
	  const formatted = dtf.formatToParts(date),
	    filled = [];
	  for (let i = 0; i < formatted.length; i++) {
	    const { type, value } = formatted[i],
	      pos = typeToPos[type];

	    if (!isUndefined(pos)) {
	      filled[pos] = parseInt(value, 10);
	    }
	  }
	  return filled;
	}

	let ianaZoneCache = {};
	/**
	 * A zone identified by an IANA identifier, like America/New_York
	 * @implements {Zone}
	 */
	class IANAZone extends Zone {
	  /**
	   * @param {string} name - Zone name
	   * @return {IANAZone}
	   */
	  static create(name) {
	    if (!ianaZoneCache[name]) {
	      ianaZoneCache[name] = new IANAZone(name);
	    }
	    return ianaZoneCache[name];
	  }

	  /**
	   * Reset local caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCache() {
	    ianaZoneCache = {};
	    dtfCache = {};
	  }

	  /**
	   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
	   * @param {string} s - The string to check validity on
	   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
	   * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
	   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidSpecifier(s) {
	    return !!(s && s.match(matchingRegex));
	  }

	  /**
	   * Returns whether the provided string identifies a real zone
	   * @param {string} zone - The string to check
	   * @example IANAZone.isValidZone("America/New_York") //=> true
	   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
	   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidZone(zone) {
	    try {
	      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  // Etc/GMT+8 -> -480
	  /** @ignore */
	  static parseGMTOffset(specifier) {
	    if (specifier) {
	      const match = specifier.match(/^Etc\/GMT([+-]\d{1,2})$/i);
	      if (match) {
	        return -60 * parseInt(match[1]);
	      }
	    }
	    return null;
	  }

	  constructor(name) {
	    super();
	    /** @private **/
	    this.zoneName = name;
	    /** @private **/
	    this.valid = IANAZone.isValidZone(name);
	  }

	  /** @override **/
	  get type() {
	    return "iana";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale, this.name);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    const date = new Date(ts),
	      dtf = makeDTF(this.name),
	      [year, month, day, hour, minute, second] = dtf.formatToParts
	        ? partsOffset(dtf, date)
	        : hackyOffset(dtf, date),
	      // work around https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
	      adjustedHour = hour === 24 ? 0 : hour;

	    const asUTC = objToLocalTS({
	      year,
	      month,
	      day,
	      hour: adjustedHour,
	      minute,
	      second,
	      millisecond: 0
	    });

	    let asTS = +date;
	    const over = asTS % 1000;
	    asTS -= over >= 0 ? over : 1000 + over;
	    return (asUTC - asTS) / (60 * 1000);
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "iana" && otherZone.name === this.name;
	  }

	  /** @override **/
	  get isValid() {
	    return this.valid;
	  }
	}

	let singleton = null;

	/**
	 * A zone with a fixed offset (meaning no DST)
	 * @implements {Zone}
	 */
	class FixedOffsetZone extends Zone {
	  /**
	   * Get a singleton instance of UTC
	   * @return {FixedOffsetZone}
	   */
	  static get utcInstance() {
	    if (singleton === null) {
	      singleton = new FixedOffsetZone(0);
	    }
	    return singleton;
	  }

	  /**
	   * Get an instance with a specified offset
	   * @param {number} offset - The offset in minutes
	   * @return {FixedOffsetZone}
	   */
	  static instance(offset) {
	    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
	  }

	  /**
	   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
	   * @param {string} s - The offset string to parse
	   * @example FixedOffsetZone.parseSpecifier("UTC+6")
	   * @example FixedOffsetZone.parseSpecifier("UTC+06")
	   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
	   * @return {FixedOffsetZone}
	   */
	  static parseSpecifier(s) {
	    if (s) {
	      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
	      if (r) {
	        return new FixedOffsetZone(signedOffset(r[1], r[2]));
	      }
	    }
	    return null;
	  }

	  constructor(offset) {
	    super();
	    /** @private **/
	    this.fixed = offset;
	  }

	  /** @override **/
	  get type() {
	    return "fixed";
	  }

	  /** @override **/
	  get name() {
	    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
	  }

	  /** @override **/
	  offsetName() {
	    return this.name;
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.fixed, format);
	  }

	  /** @override **/
	  get universal() {
	    return true;
	  }

	  /** @override **/
	  offset() {
	    return this.fixed;
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	/**
	 * A zone that failed to parse. You should never need to instantiate this.
	 * @implements {Zone}
	 */
	class InvalidZone extends Zone {
	  constructor(zoneName) {
	    super();
	    /**  @private */
	    this.zoneName = zoneName;
	  }

	  /** @override **/
	  get type() {
	    return "invalid";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName() {
	    return null;
	  }

	  /** @override **/
	  formatOffset() {
	    return "";
	  }

	  /** @override **/
	  offset() {
	    return NaN;
	  }

	  /** @override **/
	  equals() {
	    return false;
	  }

	  /** @override **/
	  get isValid() {
	    return false;
	  }
	}

	/**
	 * @private
	 */

	function normalizeZone(input, defaultZone) {
	  let offset;
	  if (isUndefined(input) || input === null) {
	    return defaultZone;
	  } else if (input instanceof Zone) {
	    return input;
	  } else if (isString(input)) {
	    const lowered = input.toLowerCase();
	    if (lowered === "local") return defaultZone;
	    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
	    else if ((offset = IANAZone.parseGMTOffset(input)) != null) {
	      // handle Etc/GMT-4, which V8 chokes on
	      return FixedOffsetZone.instance(offset);
	    } else if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);
	    else return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
	  } else if (isNumber(input)) {
	    return FixedOffsetZone.instance(input);
	  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
	    // This is dumb, but the instanceof check above doesn't seem to really work
	    // so we're duck checking it
	    return input;
	  } else {
	    return new InvalidZone(input);
	  }
	}

	let now = () => Date.now(),
	  defaultZone = null, // not setting this directly to LocalZone.instance bc loading order issues
	  defaultLocale = null,
	  defaultNumberingSystem = null,
	  defaultOutputCalendar = null,
	  throwOnInvalid = false;

	/**
	 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
	 */
	class Settings {
	  /**
	   * Get the callback for returning the current timestamp.
	   * @type {function}
	   */
	  static get now() {
	    return now;
	  }

	  /**
	   * Set the callback for returning the current timestamp.
	   * The function should return a number, which will be interpreted as an Epoch millisecond count
	   * @type {function}
	   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
	   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
	   */
	  static set now(n) {
	    now = n;
	  }

	  /**
	   * Get the default time zone to create DateTimes in.
	   * @type {string}
	   */
	  static get defaultZoneName() {
	    return Settings.defaultZone.name;
	  }

	  /**
	   * Set the default time zone to create DateTimes in. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultZoneName(z) {
	    if (!z) {
	      defaultZone = null;
	    } else {
	      defaultZone = normalizeZone(z);
	    }
	  }

	  /**
	   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
	   * @type {Zone}
	   */
	  static get defaultZone() {
	    return defaultZone || LocalZone.instance;
	  }

	  /**
	   * Get the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultLocale() {
	    return defaultLocale;
	  }

	  /**
	   * Set the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultLocale(locale) {
	    defaultLocale = locale;
	  }

	  /**
	   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultNumberingSystem() {
	    return defaultNumberingSystem;
	  }

	  /**
	   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultNumberingSystem(numberingSystem) {
	    defaultNumberingSystem = numberingSystem;
	  }

	  /**
	   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultOutputCalendar() {
	    return defaultOutputCalendar;
	  }

	  /**
	   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultOutputCalendar(outputCalendar) {
	    defaultOutputCalendar = outputCalendar;
	  }

	  /**
	   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static get throwOnInvalid() {
	    return throwOnInvalid;
	  }

	  /**
	   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static set throwOnInvalid(t) {
	    throwOnInvalid = t;
	  }

	  /**
	   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCaches() {
	    Locale.resetCache();
	    IANAZone.resetCache();
	  }
	}

	let intlDTCache = {};
	function getCachedDTF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlDTCache[key];
	  if (!dtf) {
	    dtf = new Intl.DateTimeFormat(locString, opts);
	    intlDTCache[key] = dtf;
	  }
	  return dtf;
	}

	let intlNumCache = {};
	function getCachedINF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let inf = intlNumCache[key];
	  if (!inf) {
	    inf = new Intl.NumberFormat(locString, opts);
	    intlNumCache[key] = inf;
	  }
	  return inf;
	}

	let intlRelCache = {};
	function getCachedRTF(locString, opts = {}) {
	  const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
	  const key = JSON.stringify([locString, cacheKeyOpts]);
	  let inf = intlRelCache[key];
	  if (!inf) {
	    inf = new Intl.RelativeTimeFormat(locString, opts);
	    intlRelCache[key] = inf;
	  }
	  return inf;
	}

	let sysLocaleCache = null;
	function systemLocale() {
	  if (sysLocaleCache) {
	    return sysLocaleCache;
	  } else if (hasIntl()) {
	    const computedSys = new Intl.DateTimeFormat().resolvedOptions().locale;
	    // node sometimes defaults to "und". Override that because that is dumb
	    sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
	    return sysLocaleCache;
	  } else {
	    sysLocaleCache = "en-US";
	    return sysLocaleCache;
	  }
	}

	function parseLocaleString(localeStr) {
	  // I really want to avoid writing a BCP 47 parser
	  // see, e.g. https://github.com/wooorm/bcp-47
	  // Instead, we'll do this:

	  // a) if the string has no -u extensions, just leave it alone
	  // b) if it does, use Intl to resolve everything
	  // c) if Intl fails, try again without the -u

	  const uIndex = localeStr.indexOf("-u-");
	  if (uIndex === -1) {
	    return [localeStr];
	  } else {
	    let options;
	    const smaller = localeStr.substring(0, uIndex);
	    try {
	      options = getCachedDTF(localeStr).resolvedOptions();
	    } catch (e) {
	      options = getCachedDTF(smaller).resolvedOptions();
	    }

	    const { numberingSystem, calendar } = options;
	    // return the smaller one so that we can append the calendar and numbering overrides to it
	    return [smaller, numberingSystem, calendar];
	  }
	}

	function intlConfigString(localeStr, numberingSystem, outputCalendar) {
	  if (hasIntl()) {
	    if (outputCalendar || numberingSystem) {
	      localeStr += "-u";

	      if (outputCalendar) {
	        localeStr += `-ca-${outputCalendar}`;
	      }

	      if (numberingSystem) {
	        localeStr += `-nu-${numberingSystem}`;
	      }
	      return localeStr;
	    } else {
	      return localeStr;
	    }
	  } else {
	    return [];
	  }
	}

	function mapMonths(f) {
	  const ms = [];
	  for (let i = 1; i <= 12; i++) {
	    const dt = DateTime.utc(2016, i, 1);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function mapWeekdays(f) {
	  const ms = [];
	  for (let i = 1; i <= 7; i++) {
	    const dt = DateTime.utc(2016, 11, 13 + i);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function listStuff(loc, length, defaultOK, englishFn, intlFn) {
	  const mode = loc.listingMode(defaultOK);

	  if (mode === "error") {
	    return null;
	  } else if (mode === "en") {
	    return englishFn(length);
	  } else {
	    return intlFn(length);
	  }
	}

	function supportsFastNumbers(loc) {
	  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
	    return false;
	  } else {
	    return (
	      loc.numberingSystem === "latn" ||
	      !loc.locale ||
	      loc.locale.startsWith("en") ||
	      (hasIntl() && new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn")
	    );
	  }
	}

	/**
	 * @private
	 */

	class PolyNumberFormatter {
	  constructor(intl, forceSimple, opts) {
	    this.padTo = opts.padTo || 0;
	    this.floor = opts.floor || false;

	    if (!forceSimple && hasIntl()) {
	      const intlOpts = { useGrouping: false };
	      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
	      this.inf = getCachedINF(intl, intlOpts);
	    }
	  }

	  format(i) {
	    if (this.inf) {
	      const fixed = this.floor ? Math.floor(i) : i;
	      return this.inf.format(fixed);
	    } else {
	      // to match the browser's numberformatter defaults
	      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
	      return padStart(fixed, this.padTo);
	    }
	  }
	}

	/**
	 * @private
	 */

	class PolyDateFormatter {
	  constructor(dt, intl, opts) {
	    this.opts = opts;
	    this.hasIntl = hasIntl();

	    let z;
	    if (dt.zone.universal && this.hasIntl) {
	      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
	      // That is why fixed-offset TZ is set to that unless it is:
	      // 1. Outside of the supported range Etc/GMT-14 to Etc/GMT+12.
	      // 2. Not a whole hour, e.g. UTC+4:30.
	      const gmtOffset = -1 * (dt.offset / 60);
	      if (gmtOffset >= -14 && gmtOffset <= 12 && gmtOffset % 1 === 0) {
	        z = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
	        this.dt = dt;
	      } else {
	        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
	        // So we have to make do. Two cases:
	        // 1. The format options tell us to show the zone. We can't do that, so the best
	        // we can do is format the date in UTC.
	        // 2. The format options don't tell us to show the zone. Then we can adjust them
	        // the time and tell the formatter to show it to us in UTC, so that the time is right
	        // and the bad zone doesn't show up.
	        z = "UTC";
	        if (opts.timeZoneName) {
	          this.dt = dt;
	        } else {
	          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
	        }
	      }
	    } else if (dt.zone.type === "local") {
	      this.dt = dt;
	    } else {
	      this.dt = dt;
	      z = dt.zone.name;
	    }

	    if (this.hasIntl) {
	      const intlOpts = Object.assign({}, this.opts);
	      if (z) {
	        intlOpts.timeZone = z;
	      }
	      this.dtf = getCachedDTF(intl, intlOpts);
	    }
	  }

	  format() {
	    if (this.hasIntl) {
	      return this.dtf.format(this.dt.toJSDate());
	    } else {
	      const tokenFormat = formatString(this.opts),
	        loc = Locale.create("en-US");
	      return Formatter.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
	    }
	  }

	  formatToParts() {
	    if (this.hasIntl && hasFormatToParts()) {
	      return this.dtf.formatToParts(this.dt.toJSDate());
	    } else {
	      // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
	      // and IMO it's too weird to have an uncanny valley like that
	      return [];
	    }
	  }

	  resolvedOptions() {
	    if (this.hasIntl) {
	      return this.dtf.resolvedOptions();
	    } else {
	      return {
	        locale: "en-US",
	        numberingSystem: "latn",
	        outputCalendar: "gregory"
	      };
	    }
	  }
	}

	/**
	 * @private
	 */
	class PolyRelFormatter {
	  constructor(intl, isEnglish, opts) {
	    this.opts = Object.assign({ style: "long" }, opts);
	    if (!isEnglish && hasRelative()) {
	      this.rtf = getCachedRTF(intl, opts);
	    }
	  }

	  format(count, unit) {
	    if (this.rtf) {
	      return this.rtf.format(count, unit);
	    } else {
	      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
	    }
	  }

	  formatToParts(count, unit) {
	    if (this.rtf) {
	      return this.rtf.formatToParts(count, unit);
	    } else {
	      return [];
	    }
	  }
	}

	/**
	 * @private
	 */

	class Locale {
	  static fromOpts(opts) {
	    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
	  }

	  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
	    const specifiedLocale = locale || Settings.defaultLocale,
	      // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
	      localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale()),
	      numberingSystemR = numberingSystem || Settings.defaultNumberingSystem,
	      outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
	    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
	  }

	  static resetCache() {
	    sysLocaleCache = null;
	    intlDTCache = {};
	    intlNumCache = {};
	    intlRelCache = {};
	  }

	  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
	    return Locale.create(locale, numberingSystem, outputCalendar);
	  }

	  constructor(locale, numbering, outputCalendar, specifiedLocale) {
	    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

	    this.locale = parsedLocale;
	    this.numberingSystem = numbering || parsedNumberingSystem || null;
	    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
	    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

	    this.weekdaysCache = { format: {}, standalone: {} };
	    this.monthsCache = { format: {}, standalone: {} };
	    this.meridiemCache = null;
	    this.eraCache = {};

	    this.specifiedLocale = specifiedLocale;
	    this.fastNumbersCached = null;
	  }

	  get fastNumbers() {
	    if (this.fastNumbersCached == null) {
	      this.fastNumbersCached = supportsFastNumbers(this);
	    }

	    return this.fastNumbersCached;
	  }

	  listingMode(defaultOK = true) {
	    const intl = hasIntl(),
	      hasFTP = intl && hasFormatToParts(),
	      isActuallyEn = this.isEnglish(),
	      hasNoWeirdness =
	        (this.numberingSystem === null || this.numberingSystem === "latn") &&
	        (this.outputCalendar === null || this.outputCalendar === "gregory");

	    if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
	      return "error";
	    } else if (!hasFTP || (isActuallyEn && hasNoWeirdness)) {
	      return "en";
	    } else {
	      return "intl";
	    }
	  }

	  clone(alts) {
	    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
	      return this;
	    } else {
	      return Locale.create(
	        alts.locale || this.specifiedLocale,
	        alts.numberingSystem || this.numberingSystem,
	        alts.outputCalendar || this.outputCalendar,
	        alts.defaultToEN || false
	      );
	    }
	  }

	  redefaultToEN(alts = {}) {
	    return this.clone(Object.assign({}, alts, { defaultToEN: true }));
	  }

	  redefaultToSystem(alts = {}) {
	    return this.clone(Object.assign({}, alts, { defaultToEN: false }));
	  }

	  months(length, format = false, defaultOK = true) {
	    return listStuff(this, length, defaultOK, months, () => {
	      const intl = format ? { month: length, day: "numeric" } : { month: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.monthsCache[formatStr][length]) {
	        this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, "month"));
	      }
	      return this.monthsCache[formatStr][length];
	    });
	  }

	  weekdays(length, format = false, defaultOK = true) {
	    return listStuff(this, length, defaultOK, weekdays, () => {
	      const intl = format
	          ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
	          : { weekday: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.weekdaysCache[formatStr][length]) {
	        this.weekdaysCache[formatStr][length] = mapWeekdays(dt =>
	          this.extract(dt, intl, "weekday")
	        );
	      }
	      return this.weekdaysCache[formatStr][length];
	    });
	  }

	  meridiems(defaultOK = true) {
	    return listStuff(
	      this,
	      undefined,
	      defaultOK,
	      () => meridiems,
	      () => {
	        // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
	        // for AM and PM. This is probably wrong, but it's makes parsing way easier.
	        if (!this.meridiemCache) {
	          const intl = { hour: "numeric", hour12: true };
	          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
	            dt => this.extract(dt, intl, "dayperiod")
	          );
	        }

	        return this.meridiemCache;
	      }
	    );
	  }

	  eras(length, defaultOK = true) {
	    return listStuff(this, length, defaultOK, eras, () => {
	      const intl = { era: length };

	      // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
	      // to definitely enumerate them.
	      if (!this.eraCache[length]) {
	        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(dt =>
	          this.extract(dt, intl, "era")
	        );
	      }

	      return this.eraCache[length];
	    });
	  }

	  extract(dt, intlOpts, field) {
	    const df = this.dtFormatter(dt, intlOpts),
	      results = df.formatToParts(),
	      matching = results.find(m => m.type.toLowerCase() === field);
	    return matching ? matching.value : null;
	  }

	  numberFormatter(opts = {}) {
	    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
	    // (in contrast, the rest of the condition is used heavily)
	    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
	  }

	  dtFormatter(dt, intlOpts = {}) {
	    return new PolyDateFormatter(dt, this.intl, intlOpts);
	  }

	  relFormatter(opts = {}) {
	    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
	  }

	  isEnglish() {
	    return (
	      this.locale === "en" ||
	      this.locale.toLowerCase() === "en-us" ||
	      (hasIntl() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us"))
	    );
	  }

	  equals(other) {
	    return (
	      this.locale === other.locale &&
	      this.numberingSystem === other.numberingSystem &&
	      this.outputCalendar === other.outputCalendar
	    );
	  }
	}

	/*
	 * This file handles parsing for well-specified formats. Here's how it works:
	 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
	 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
	 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
	 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
	 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
	 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
	 */

	function combineRegexes(...regexes) {
	  const full = regexes.reduce((f, r) => f + r.source, "");
	  return RegExp(`^${full}$`);
	}

	function combineExtractors(...extractors) {
	  return m =>
	    extractors
	      .reduce(
	        ([mergedVals, mergedZone, cursor], ex) => {
	          const [val, zone, next] = ex(m, cursor);
	          return [Object.assign(mergedVals, val), mergedZone || zone, next];
	        },
	        [{}, null, 1]
	      )
	      .slice(0, 2);
	}

	function parse(s, ...patterns) {
	  if (s == null) {
	    return [null, null];
	  }

	  for (const [regex, extractor] of patterns) {
	    const m = regex.exec(s);
	    if (m) {
	      return extractor(m);
	    }
	  }
	  return [null, null];
	}

	function simpleParse(...keys) {
	  return (match, cursor) => {
	    const ret = {};
	    let i;

	    for (i = 0; i < keys.length; i++) {
	      ret[keys[i]] = parseInteger(match[cursor + i]);
	    }
	    return [ret, null, cursor + i];
	  };
	}

	// ISO and SQL parsing
	const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
	  isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
	  isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`),
	  isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`),
	  isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
	  isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
	  isoOrdinalRegex = /(\d{4})-?(\d{3})/,
	  extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
	  extractISOOrdinalData = simpleParse("year", "ordinal"),
	  sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, // dumbed-down version of the ISO one
	  sqlTimeRegex = RegExp(
	    `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
	  ),
	  sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

	function int(match, pos, fallback) {
	  const m = match[pos];
	  return isUndefined(m) ? fallback : parseInteger(m);
	}

	function extractISOYmd(match, cursor) {
	  const item = {
	    year: int(match, cursor),
	    month: int(match, cursor + 1, 1),
	    day: int(match, cursor + 2, 1)
	  };

	  return [item, null, cursor + 3];
	}

	function extractISOTime(match, cursor) {
	  const item = {
	    hours: int(match, cursor, 0),
	    minutes: int(match, cursor + 1, 0),
	    seconds: int(match, cursor + 2, 0),
	    milliseconds: parseMillis(match[cursor + 3])
	  };

	  return [item, null, cursor + 4];
	}

	function extractISOOffset(match, cursor) {
	  const local = !match[cursor] && !match[cursor + 1],
	    fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
	    zone = local ? null : FixedOffsetZone.instance(fullOffset);
	  return [{}, zone, cursor + 3];
	}

	function extractIANAZone(match, cursor) {
	  const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
	  return [{}, zone, cursor + 1];
	}

	// ISO time parsing

	const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);

	// ISO duration parsing

	const isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

	function extractISODuration(match) {
	  const [
	    s,
	    yearStr,
	    monthStr,
	    weekStr,
	    dayStr,
	    hourStr,
	    minuteStr,
	    secondStr,
	    millisecondsStr
	  ] = match;

	  const hasNegativePrefix = s[0] === "-";

	  const maybeNegate = num => (num && hasNegativePrefix ? -num : num);

	  return [
	    {
	      years: maybeNegate(parseInteger(yearStr)),
	      months: maybeNegate(parseInteger(monthStr)),
	      weeks: maybeNegate(parseInteger(weekStr)),
	      days: maybeNegate(parseInteger(dayStr)),
	      hours: maybeNegate(parseInteger(hourStr)),
	      minutes: maybeNegate(parseInteger(minuteStr)),
	      seconds: maybeNegate(parseInteger(secondStr)),
	      milliseconds: maybeNegate(parseMillis(millisecondsStr))
	    }
	  ];
	}

	// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
	// and not just that we're in -240 *right now*. But since I don't think these are used that often
	// I'm just going to ignore that
	const obsOffsets = {
	  GMT: 0,
	  EDT: -4 * 60,
	  EST: -5 * 60,
	  CDT: -5 * 60,
	  CST: -6 * 60,
	  MDT: -6 * 60,
	  MST: -7 * 60,
	  PDT: -7 * 60,
	  PST: -8 * 60
	};

	function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	  const result = {
	    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
	    month: monthsShort.indexOf(monthStr) + 1,
	    day: parseInteger(dayStr),
	    hour: parseInteger(hourStr),
	    minute: parseInteger(minuteStr)
	  };

	  if (secondStr) result.second = parseInteger(secondStr);
	  if (weekdayStr) {
	    result.weekday =
	      weekdayStr.length > 3
	        ? weekdaysLong.indexOf(weekdayStr) + 1
	        : weekdaysShort.indexOf(weekdayStr) + 1;
	  }

	  return result;
	}

	// RFC 2822/5322
	const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

	function extractRFC2822(match) {
	  const [
	      ,
	      weekdayStr,
	      dayStr,
	      monthStr,
	      yearStr,
	      hourStr,
	      minuteStr,
	      secondStr,
	      obsOffset,
	      milOffset,
	      offHourStr,
	      offMinuteStr
	    ] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

	  let offset;
	  if (obsOffset) {
	    offset = obsOffsets[obsOffset];
	  } else if (milOffset) {
	    offset = 0;
	  } else {
	    offset = signedOffset(offHourStr, offMinuteStr);
	  }

	  return [result, new FixedOffsetZone(offset)];
	}

	function preprocessRFC2822(s) {
	  // Remove comments and folding whitespace and replace multiple-spaces with a single space
	  return s
	    .replace(/\([^)]*\)|[\n\t]/g, " ")
	    .replace(/(\s\s+)/g, " ")
	    .trim();
	}

	// http date

	const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
	  rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
	  ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

	function extractRFC1123Or850(match) {
	  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	function extractASCII(match) {
	  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
	const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
	const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
	const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

	const extractISOYmdTimeAndOffset = combineExtractors(
	  extractISOYmd,
	  extractISOTime,
	  extractISOOffset
	);
	const extractISOWeekTimeAndOffset = combineExtractors(
	  extractISOWeekData,
	  extractISOTime,
	  extractISOOffset
	);
	const extractISOOrdinalDataAndTime = combineExtractors(extractISOOrdinalData, extractISOTime);
	const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);

	/**
	 * @private
	 */

	function parseISODate(s) {
	  return parse(
	    s,
	    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
	    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
	    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDataAndTime],
	    [isoTimeCombinedRegex, extractISOTimeAndOffset]
	  );
	}

	function parseRFC2822Date(s) {
	  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
	}

	function parseHTTPDate(s) {
	  return parse(
	    s,
	    [rfc1123, extractRFC1123Or850],
	    [rfc850, extractRFC1123Or850],
	    [ascii, extractASCII]
	  );
	}

	function parseISODuration(s) {
	  return parse(s, [isoDuration, extractISODuration]);
	}

	const extractISOTimeOnly = combineExtractors(extractISOTime);

	function parseISOTimeOnly(s) {
	  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
	}

	const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
	const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

	const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(
	  extractISOYmd,
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);
	const extractISOTimeOffsetAndIANAZone = combineExtractors(
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);

	function parseSQL(s) {
	  return parse(
	    s,
	    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone],
	    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
	  );
	}

	const INVALID$2 = "Invalid Duration";

	// unit conversion constants
	const lowOrderMatrix = {
	    weeks: {
	      days: 7,
	      hours: 7 * 24,
	      minutes: 7 * 24 * 60,
	      seconds: 7 * 24 * 60 * 60,
	      milliseconds: 7 * 24 * 60 * 60 * 1000
	    },
	    days: {
	      hours: 24,
	      minutes: 24 * 60,
	      seconds: 24 * 60 * 60,
	      milliseconds: 24 * 60 * 60 * 1000
	    },
	    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
	    minutes: { seconds: 60, milliseconds: 60 * 1000 },
	    seconds: { milliseconds: 1000 }
	  },
	  casualMatrix = Object.assign(
	    {
	      years: {
	        quarters: 4,
	        months: 12,
	        weeks: 52,
	        days: 365,
	        hours: 365 * 24,
	        minutes: 365 * 24 * 60,
	        seconds: 365 * 24 * 60 * 60,
	        milliseconds: 365 * 24 * 60 * 60 * 1000
	      },
	      quarters: {
	        months: 3,
	        weeks: 13,
	        days: 91,
	        hours: 91 * 24,
	        minutes: 91 * 24 * 60,
	        seconds: 91 * 24 * 60 * 60,
	        milliseconds: 91 * 24 * 60 * 60 * 1000
	      },
	      months: {
	        weeks: 4,
	        days: 30,
	        hours: 30 * 24,
	        minutes: 30 * 24 * 60,
	        seconds: 30 * 24 * 60 * 60,
	        milliseconds: 30 * 24 * 60 * 60 * 1000
	      }
	    },
	    lowOrderMatrix
	  ),
	  daysInYearAccurate = 146097.0 / 400,
	  daysInMonthAccurate = 146097.0 / 4800,
	  accurateMatrix = Object.assign(
	    {
	      years: {
	        quarters: 4,
	        months: 12,
	        weeks: daysInYearAccurate / 7,
	        days: daysInYearAccurate,
	        hours: daysInYearAccurate * 24,
	        minutes: daysInYearAccurate * 24 * 60,
	        seconds: daysInYearAccurate * 24 * 60 * 60,
	        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
	      },
	      quarters: {
	        months: 3,
	        weeks: daysInYearAccurate / 28,
	        days: daysInYearAccurate / 4,
	        hours: (daysInYearAccurate * 24) / 4,
	        minutes: (daysInYearAccurate * 24 * 60) / 4,
	        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
	        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4
	      },
	      months: {
	        weeks: daysInMonthAccurate / 7,
	        days: daysInMonthAccurate,
	        hours: daysInMonthAccurate * 24,
	        minutes: daysInMonthAccurate * 24 * 60,
	        seconds: daysInMonthAccurate * 24 * 60 * 60,
	        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
	      }
	    },
	    lowOrderMatrix
	  );

	// units ordered by size
	const orderedUnits$1 = [
	  "years",
	  "quarters",
	  "months",
	  "weeks",
	  "days",
	  "hours",
	  "minutes",
	  "seconds",
	  "milliseconds"
	];

	const reverseUnits = orderedUnits$1.slice(0).reverse();

	// clone really means "create another instance just like this one, but with these changes"
	function clone$1(dur, alts, clear = false) {
	  // deep merge for vals
	  const conf = {
	    values: clear ? alts.values : Object.assign({}, dur.values, alts.values || {}),
	    loc: dur.loc.clone(alts.loc),
	    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
	  };
	  return new Duration(conf);
	}

	function antiTrunc(n) {
	  return n < 0 ? Math.floor(n) : Math.ceil(n);
	}

	// NB: mutates parameters
	function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
	  const conv = matrix[toUnit][fromUnit],
	    raw = fromMap[fromUnit] / conv,
	    sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
	    // ok, so this is wild, but see the matrix in the tests
	    added =
	      !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
	  toMap[toUnit] += added;
	  fromMap[fromUnit] -= added * conv;
	}

	// NB: mutates parameters
	function normalizeValues(matrix, vals) {
	  reverseUnits.reduce((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        convert(matrix, vals, previous, vals, current);
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);
	}

	/**
	 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
	 *
	 * Here is a brief overview of commonly used methods and getters in Duration:
	 *
	 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
	 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
	 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
	 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
	 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
	 *
	 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
	 */
	class Duration {
	  /**
	   * @private
	   */
	  constructor(config) {
	    const accurate = config.conversionAccuracy === "longterm" || false;
	    /**
	     * @access private
	     */
	    this.values = config.values;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.conversionAccuracy = accurate ? "longterm" : "casual";
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.matrix = accurate ? accurateMatrix : casualMatrix;
	    /**
	     * @access private
	     */
	    this.isLuxonDuration = true;
	  }

	  /**
	   * Create Duration from a number of milliseconds.
	   * @param {number} count of milliseconds
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromMillis(count, opts) {
	    return Duration.fromObject(Object.assign({ milliseconds: count }, opts));
	  }

	  /**
	   * Create a Duration from a JavaScript object with keys like 'years' and 'hours.
	   * If this object is empty then a zero milliseconds duration is returned.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.years
	   * @param {number} obj.quarters
	   * @param {number} obj.months
	   * @param {number} obj.weeks
	   * @param {number} obj.days
	   * @param {number} obj.hours
	   * @param {number} obj.minutes
	   * @param {number} obj.seconds
	   * @param {number} obj.milliseconds
	   * @param {string} [obj.locale='en-US'] - the locale to use
	   * @param {string} obj.numberingSystem - the numbering system to use
	   * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromObject(obj) {
	    if (obj == null || typeof obj !== "object") {
	      throw new InvalidArgumentError(
	        `Duration.fromObject: argument expected to be an object, got ${
          obj === null ? "null" : typeof obj
        }`
	      );
	    }
	    return new Duration({
	      values: normalizeObject(obj, Duration.normalizeUnit, [
	        "locale",
	        "numberingSystem",
	        "conversionAccuracy",
	        "zone" // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
	      ]),
	      loc: Locale.fromObject(obj),
	      conversionAccuracy: obj.conversionAccuracy
	    });
	  }

	  /**
	   * Create a Duration from an ISO 8601 duration string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
	   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
	   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
	   * @return {Duration}
	   */
	  static fromISO(text, opts) {
	    const [parsed] = parseISODuration(text);
	    if (parsed) {
	      const obj = Object.assign(parsed, opts);
	      return Duration.fromObject(obj);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create a Duration from an ISO 8601 time string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
	   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
	   * @return {Duration}
	   */
	  static fromISOTime(text, opts) {
	    const [parsed] = parseISOTimeOnly(text);
	    if (parsed) {
	      const obj = Object.assign(parsed, opts);
	      return Duration.fromObject(obj);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create an invalid Duration.
	   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Duration}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDurationError(invalid);
	    } else {
	      return new Duration({ invalid });
	    }
	  }

	  /**
	   * @private
	   */
	  static normalizeUnit(unit) {
	    const normalized = {
	      year: "years",
	      years: "years",
	      quarter: "quarters",
	      quarters: "quarters",
	      month: "months",
	      months: "months",
	      week: "weeks",
	      weeks: "weeks",
	      day: "days",
	      days: "days",
	      hour: "hours",
	      hours: "hours",
	      minute: "minutes",
	      minutes: "minutes",
	      second: "seconds",
	      seconds: "seconds",
	      millisecond: "milliseconds",
	      milliseconds: "milliseconds"
	    }[unit ? unit.toLowerCase() : unit];

	    if (!normalized) throw new InvalidUnitError(unit);

	    return normalized;
	  }

	  /**
	   * Check if an object is a Duration. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDuration(o) {
	    return (o && o.isLuxonDuration) || false;
	  }

	  /**
	   * Get  the locale of a Duration, such 'en-GB'
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
	   * * `S` for milliseconds
	   * * `s` for seconds
	   * * `m` for minutes
	   * * `h` for hours
	   * * `d` for days
	   * * `M` for months
	   * * `y` for years
	   * Notes:
	   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
	   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - options
	   * @param {boolean} [opts.floor=true] - floor numerical values
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
	    const fmtOpts = Object.assign({}, opts, {
	      floor: opts.round !== false && opts.floor !== false
	    });
	    return this.isValid
	      ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
	      : INVALID$2;
	  }

	  /**
	   * Returns a JavaScript object with this Duration's values.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};

	    const base = Object.assign({}, this.values);

	    if (opts.includeConfig) {
	      base.conversionAccuracy = this.conversionAccuracy;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
	   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
	   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
	   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
	   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
	   * @return {string}
	   */
	  toISO() {
	    // we could use the formatter, but this is an easier way to get the minimum string
	    if (!this.isValid) return null;

	    let s = "P";
	    if (this.years !== 0) s += this.years + "Y";
	    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
	    if (this.weeks !== 0) s += this.weeks + "W";
	    if (this.days !== 0) s += this.days + "D";
	    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
	      s += "T";
	    if (this.hours !== 0) s += this.hours + "H";
	    if (this.minutes !== 0) s += this.minutes + "M";
	    if (this.seconds !== 0 || this.milliseconds !== 0)
	      // this will handle "floating point madness" by removing extra decimal places
	      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
	      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
	    if (s === "P") s += "T0S";
	    return s;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
	   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
	   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
	   * @return {string}
	   */
	  toISOTime(opts = {}) {
	    if (!this.isValid) return null;

	    const millis = this.toMillis();
	    if (millis < 0 || millis >= 86400000) return null;

	    opts = Object.assign(
	      {
	        suppressMilliseconds: false,
	        suppressSeconds: false,
	        includePrefix: false,
	        format: "extended"
	      },
	      opts
	    );

	    const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");

	    let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";

	    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
	      fmt += opts.format === "basic" ? "ss" : ":ss";
	      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
	        fmt += ".SSS";
	      }
	    }

	    let str = value.toFormat(fmt);

	    if (opts.includePrefix) {
	      str = "T" + str;
	    }

	    return str;
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
	   * @return {string}
	   */
	  toString() {
	    return this.toISO();
	  }

	  /**
	   * Returns an milliseconds value of this Duration.
	   * @return {number}
	   */
	  toMillis() {
	    return this.as("milliseconds");
	  }

	  /**
	   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;

	    const dur = friendlyDuration(duration),
	      result = {};

	    for (const k of orderedUnits$1) {
	      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
	        result[k] = dur.get(k) + this.get(k);
	      }
	    }

	    return clone$1(this, { values: result }, true);
	  }

	  /**
	   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;

	    const dur = friendlyDuration(duration);
	    return this.plus(dur.negate());
	  }

	  /**
	   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
	   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit(x => x * 2) //=> { hours: 2, minutes: 60 }
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
	   * @return {Duration}
	   */
	  mapUnits(fn) {
	    if (!this.isValid) return this;
	    const result = {};
	    for (const k of Object.keys(this.values)) {
	      result[k] = asNumber(fn(this.values[k], k));
	    }
	    return clone$1(this, { values: result }, true);
	  }

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example Duration.fromObject({years: 2, days: 3}).years //=> 2
	   * @example Duration.fromObject({years: 2, days: 3}).months //=> 0
	   * @example Duration.fromObject({years: 2, days: 3}).days //=> 3
	   * @return {number}
	   */
	  get(unit) {
	    return this[Duration.normalizeUnit(unit)];
	  }

	  /**
	   * "Set" the values of specified units. Return a newly-constructed Duration.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dur.set({ years: 2017 })
	   * @example dur.set({ hours: 8, minutes: 30 })
	   * @return {Duration}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const mixed = Object.assign(this.values, normalizeObject(values, Duration.normalizeUnit, []));
	    return clone$1(this, { values: mixed });
	  }

	  /**
	   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
	   * @example dur.reconfigure({ locale: 'en-GB' })
	   * @return {Duration}
	   */
	  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem }),
	      opts = { loc };

	    if (conversionAccuracy) {
	      opts.conversionAccuracy = conversionAccuracy;
	    }

	    return clone$1(this, opts);
	  }

	  /**
	   * Return the length of the duration in the specified unit.
	   * @param {string} unit - a unit such as 'minutes' or 'days'
	   * @example Duration.fromObject({years: 1}).as('days') //=> 365
	   * @example Duration.fromObject({years: 1}).as('months') //=> 12
	   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
	   * @return {number}
	   */
	  as(unit) {
	    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
	  }

	  /**
	   * Reduce this Duration to its canonical representation in its current units.
	   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
	   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
	   * @return {Duration}
	   */
	  normalize() {
	    if (!this.isValid) return this;
	    const vals = this.toObject();
	    normalizeValues(this.matrix, vals);
	    return clone$1(this, { values: vals }, true);
	  }

	  /**
	   * Convert this Duration into its representation in a different set of units.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
	   * @return {Duration}
	   */
	  shiftTo(...units) {
	    if (!this.isValid) return this;

	    if (units.length === 0) {
	      return this;
	    }

	    units = units.map(u => Duration.normalizeUnit(u));

	    const built = {},
	      accumulated = {},
	      vals = this.toObject();
	    let lastUnit;

	    for (const k of orderedUnits$1) {
	      if (units.indexOf(k) >= 0) {
	        lastUnit = k;

	        let own = 0;

	        // anything we haven't boiled down yet should get boiled to this unit
	        for (const ak in accumulated) {
	          own += this.matrix[ak][k] * accumulated[ak];
	          accumulated[ak] = 0;
	        }

	        // plus anything that's already in this unit
	        if (isNumber(vals[k])) {
	          own += vals[k];
	        }

	        const i = Math.trunc(own);
	        built[k] = i;
	        accumulated[k] = own - i; // we'd like to absorb these fractions in another unit

	        // plus anything further down the chain that should be rolled up in to this
	        for (const down in vals) {
	          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
	            convert(this.matrix, vals, down, built, k);
	          }
	        }
	        // otherwise, keep it in the wings to boil it later
	      } else if (isNumber(vals[k])) {
	        accumulated[k] = vals[k];
	      }
	    }

	    // anything leftover becomes the decimal for the last unit
	    // lastUnit must be defined since units is not empty
	    for (const key in accumulated) {
	      if (accumulated[key] !== 0) {
	        built[lastUnit] +=
	          key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
	      }
	    }

	    return clone$1(this, { values: built }, true).normalize();
	  }

	  /**
	   * Return the negative of this Duration.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
	   * @return {Duration}
	   */
	  negate() {
	    if (!this.isValid) return this;
	    const negated = {};
	    for (const k of Object.keys(this.values)) {
	      negated[k] = -this.values[k];
	    }
	    return clone$1(this, { values: negated }, true);
	  }

	  /**
	   * Get the years.
	   * @type {number}
	   */
	  get years() {
	    return this.isValid ? this.values.years || 0 : NaN;
	  }

	  /**
	   * Get the quarters.
	   * @type {number}
	   */
	  get quarters() {
	    return this.isValid ? this.values.quarters || 0 : NaN;
	  }

	  /**
	   * Get the months.
	   * @type {number}
	   */
	  get months() {
	    return this.isValid ? this.values.months || 0 : NaN;
	  }

	  /**
	   * Get the weeks
	   * @type {number}
	   */
	  get weeks() {
	    return this.isValid ? this.values.weeks || 0 : NaN;
	  }

	  /**
	   * Get the days.
	   * @type {number}
	   */
	  get days() {
	    return this.isValid ? this.values.days || 0 : NaN;
	  }

	  /**
	   * Get the hours.
	   * @type {number}
	   */
	  get hours() {
	    return this.isValid ? this.values.hours || 0 : NaN;
	  }

	  /**
	   * Get the minutes.
	   * @type {number}
	   */
	  get minutes() {
	    return this.isValid ? this.values.minutes || 0 : NaN;
	  }

	  /**
	   * Get the seconds.
	   * @return {number}
	   */
	  get seconds() {
	    return this.isValid ? this.values.seconds || 0 : NaN;
	  }

	  /**
	   * Get the milliseconds.
	   * @return {number}
	   */
	  get milliseconds() {
	    return this.isValid ? this.values.milliseconds || 0 : NaN;
	  }

	  /**
	   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
	   * on invalid DateTimes or Intervals.
	   * @return {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this Duration became invalid, or null if the Duration is valid
	   * @return {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Equality check
	   * Two Durations are equal iff they have the same units and the same values for each unit.
	   * @param {Duration} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    if (!this.loc.equals(other.loc)) {
	      return false;
	    }

	    function eq(v1, v2) {
	      // Consider 0 and undefined as equal
	      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
	      return v1 === v2;
	    }

	    for (const u of orderedUnits$1) {
	      if (!eq(this.values[u], other.values[u])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDuration(durationish) {
	  if (isNumber(durationish)) {
	    return Duration.fromMillis(durationish);
	  } else if (Duration.isDuration(durationish)) {
	    return durationish;
	  } else if (typeof durationish === "object") {
	    return Duration.fromObject(durationish);
	  } else {
	    throw new InvalidArgumentError(
	      `Unknown duration argument ${durationish} of type ${typeof durationish}`
	    );
	  }
	}

	const INVALID$1 = "Invalid Interval";

	// checks if the start is equal to or before the end
	function validateStartEnd(start, end) {
	  if (!start || !start.isValid) {
	    return Interval.invalid("missing or invalid start");
	  } else if (!end || !end.isValid) {
	    return Interval.invalid("missing or invalid end");
	  } else if (end < start) {
	    return Interval.invalid(
	      "end before start",
	      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
	    );
	  } else {
	    return null;
	  }
	}

	/**
	 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
	 *
	 * Here is a brief overview of the most commonly used methods and getters in Interval:
	 *
	 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
	 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
	 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
	 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
	 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}.
	 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
	 */
	class Interval {
	  /**
	   * @private
	   */
	  constructor(config) {
	    /**
	     * @access private
	     */
	    this.s = config.start;
	    /**
	     * @access private
	     */
	    this.e = config.end;
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.isLuxonInterval = true;
	  }

	  /**
	   * Create an invalid Interval.
	   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Interval}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidIntervalError(invalid);
	    } else {
	      return new Interval({ invalid });
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
	   * @param {DateTime|Date|Object} start
	   * @param {DateTime|Date|Object} end
	   * @return {Interval}
	   */
	  static fromDateTimes(start, end) {
	    const builtStart = friendlyDateTime(start),
	      builtEnd = friendlyDateTime(end);

	    const validateError = validateStartEnd(builtStart, builtEnd);

	    if (validateError == null) {
	      return new Interval({
	        start: builtStart,
	        end: builtEnd
	      });
	    } else {
	      return validateError;
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and a Duration to extend to.
	   * @param {DateTime|Date|Object} start
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static after(start, duration) {
	    const dur = friendlyDuration(duration),
	      dt = friendlyDateTime(start);
	    return Interval.fromDateTimes(dt, dt.plus(dur));
	  }

	  /**
	   * Create an Interval from an end DateTime and a Duration to extend backwards to.
	   * @param {DateTime|Date|Object} end
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static before(end, duration) {
	    const dur = friendlyDuration(duration),
	      dt = friendlyDateTime(end);
	    return Interval.fromDateTimes(dt.minus(dur), dt);
	  }

	  /**
	   * Create an Interval from an ISO 8601 string.
	   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
	   * @param {string} text - the ISO string to parse
	   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {Interval}
	   */
	  static fromISO(text, opts) {
	    const [s, e] = (text || "").split("/", 2);
	    if (s && e) {
	      let start, startIsValid;
	      try {
	        start = DateTime.fromISO(s, opts);
	        startIsValid = start.isValid;
	      } catch (e) {
	        startIsValid = false;
	      }

	      let end, endIsValid;
	      try {
	        end = DateTime.fromISO(e, opts);
	        endIsValid = end.isValid;
	      } catch (e) {
	        endIsValid = false;
	      }

	      if (startIsValid && endIsValid) {
	        return Interval.fromDateTimes(start, end);
	      }

	      if (startIsValid) {
	        const dur = Duration.fromISO(e, opts);
	        if (dur.isValid) {
	          return Interval.after(start, dur);
	        }
	      } else if (endIsValid) {
	        const dur = Duration.fromISO(s, opts);
	        if (dur.isValid) {
	          return Interval.before(end, dur);
	        }
	      }
	    }
	    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	  }

	  /**
	   * Check if an object is an Interval. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isInterval(o) {
	    return (o && o.isLuxonInterval) || false;
	  }

	  /**
	   * Returns the start of the Interval
	   * @type {DateTime}
	   */
	  get start() {
	    return this.isValid ? this.s : null;
	  }

	  /**
	   * Returns the end of the Interval
	   * @type {DateTime}
	   */
	  get end() {
	    return this.isValid ? this.e : null;
	  }

	  /**
	   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalidReason === null;
	  }

	  /**
	   * Returns an error code if this Interval is invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Returns the length of the Interval in the specified unit.
	   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
	   * @return {number}
	   */
	  length(unit = "milliseconds") {
	    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
	  }

	  /**
	   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
	   * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
	   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
	   * @param {string} [unit='milliseconds'] - the unit of time to count.
	   * @return {number}
	   */
	  count(unit = "milliseconds") {
	    if (!this.isValid) return NaN;
	    const start = this.start.startOf(unit),
	      end = this.end.startOf(unit);
	    return Math.floor(end.diff(start, unit).get(unit)) + 1;
	  }

	  /**
	   * Returns whether this Interval's start and end are both in the same unit of time
	   * @param {string} unit - the unit of time to check sameness on
	   * @return {boolean}
	   */
	  hasSame(unit) {
	    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
	  }

	  /**
	   * Return whether this Interval has the same start and end DateTimes.
	   * @return {boolean}
	   */
	  isEmpty() {
	    return this.s.valueOf() === this.e.valueOf();
	  }

	  /**
	   * Return whether this Interval's start is after the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isAfter(dateTime) {
	    if (!this.isValid) return false;
	    return this.s > dateTime;
	  }

	  /**
	   * Return whether this Interval's end is before the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isBefore(dateTime) {
	    if (!this.isValid) return false;
	    return this.e <= dateTime;
	  }

	  /**
	   * Return whether this Interval contains the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  contains(dateTime) {
	    if (!this.isValid) return false;
	    return this.s <= dateTime && this.e > dateTime;
	  }

	  /**
	   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
	   * @param {Object} values - the values to set
	   * @param {DateTime} values.start - the starting DateTime
	   * @param {DateTime} values.end - the ending DateTime
	   * @return {Interval}
	   */
	  set({ start, end } = {}) {
	    if (!this.isValid) return this;
	    return Interval.fromDateTimes(start || this.s, end || this.e);
	  }

	  /**
	   * Split this Interval at each of the specified DateTimes
	   * @param {...[DateTime]} dateTimes - the unit of time to count.
	   * @return {[Interval]}
	   */
	  splitAt(...dateTimes) {
	    if (!this.isValid) return [];
	    const sorted = dateTimes
	        .map(friendlyDateTime)
	        .filter(d => this.contains(d))
	        .sort(),
	      results = [];
	    let { s } = this,
	      i = 0;

	    while (s < this.e) {
	      const added = sorted[i] || this.e,
	        next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      i += 1;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into smaller Intervals, each of the specified length.
	   * Left over time is grouped into a smaller interval
	   * @param {Duration|Object|number} duration - The length of each resulting interval.
	   * @return {[Interval]}
	   */
	  splitBy(duration) {
	    const dur = friendlyDuration(duration);

	    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
	      return [];
	    }

	    let { s } = this,
	      added,
	      next;

	    const results = [];
	    while (s < this.e) {
	      added = s.plus(dur);
	      next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into the specified number of smaller intervals.
	   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
	   * @return {[Interval]}
	   */
	  divideEqually(numberOfParts) {
	    if (!this.isValid) return [];
	    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
	  }

	  /**
	   * Return whether this Interval overlaps with the specified Interval
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  overlaps(other) {
	    return this.e > other.s && this.s < other.e;
	  }

	  /**
	   * Return whether this Interval's end is adjacent to the specified Interval's start.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsStart(other) {
	    if (!this.isValid) return false;
	    return +this.e === +other.s;
	  }

	  /**
	   * Return whether this Interval's start is adjacent to the specified Interval's end.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsEnd(other) {
	    if (!this.isValid) return false;
	    return +other.e === +this.s;
	  }

	  /**
	   * Return whether this Interval engulfs the start and end of the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  engulfs(other) {
	    if (!this.isValid) return false;
	    return this.s <= other.s && this.e >= other.e;
	  }

	  /**
	   * Return whether this Interval has the same start and end as the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    return this.s.equals(other.s) && this.e.equals(other.e);
	  }

	  /**
	   * Return an Interval representing the intersection of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
	   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  intersection(other) {
	    if (!this.isValid) return this;
	    const s = this.s > other.s ? this.s : other.s,
	      e = this.e < other.e ? this.e : other.e;

	    if (s > e) {
	      return null;
	    } else {
	      return Interval.fromDateTimes(s, e);
	    }
	  }

	  /**
	   * Return an Interval representing the union of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  union(other) {
	    if (!this.isValid) return this;
	    const s = this.s < other.s ? this.s : other.s,
	      e = this.e > other.e ? this.e : other.e;
	    return Interval.fromDateTimes(s, e);
	  }

	  /**
	   * Merge an array of Intervals into a equivalent minimal set of Intervals.
	   * Combines overlapping and adjacent Intervals.
	   * @param {[Interval]} intervals
	   * @return {[Interval]}
	   */
	  static merge(intervals) {
	    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(
	      ([sofar, current], item) => {
	        if (!current) {
	          return [sofar, item];
	        } else if (current.overlaps(item) || current.abutsStart(item)) {
	          return [sofar, current.union(item)];
	        } else {
	          return [sofar.concat([current]), item];
	        }
	      },
	      [[], null]
	    );
	    if (final) {
	      found.push(final);
	    }
	    return found;
	  }

	  /**
	   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
	   * @param {[Interval]} intervals
	   * @return {[Interval]}
	   */
	  static xor(intervals) {
	    let start = null,
	      currentCount = 0;
	    const results = [],
	      ends = intervals.map(i => [{ time: i.s, type: "s" }, { time: i.e, type: "e" }]),
	      flattened = Array.prototype.concat(...ends),
	      arr = flattened.sort((a, b) => a.time - b.time);

	    for (const i of arr) {
	      currentCount += i.type === "s" ? 1 : -1;

	      if (currentCount === 1) {
	        start = i.time;
	      } else {
	        if (start && +start !== +i.time) {
	          results.push(Interval.fromDateTimes(start, i.time));
	        }

	        start = null;
	      }
	    }

	    return Interval.merge(results);
	  }

	  /**
	   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
	   * @param {...Interval} intervals
	   * @return {[Interval]}
	   */
	  difference(...intervals) {
	    return Interval.xor([this].concat(intervals))
	      .map(i => this.intersection(i))
	      .filter(i => i && !i.isEmpty());
	  }

	  /**
	   * Returns a string representation of this Interval appropriate for debugging.
	   * @return {string}
	   */
	  toString() {
	    if (!this.isValid) return INVALID$1;
	    return `[${this.s.toISO()} – ${this.e.toISO()})`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Interval.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime.toISO}
	   * @return {string}
	   */
	  toISO(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of date of this Interval.
	   * The time components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {string}
	   */
	  toISODate() {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISODate()}/${this.e.toISODate()}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of time of this Interval.
	   * The date components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime.toISO}
	   * @return {string}
	   */
	  toISOTime(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this Interval formatted according to the specified format string.
	   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
	   * @param {Object} opts - options
	   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
	   * @return {string}
	   */
	  toFormat(dateFormat, { separator = " – " } = {}) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
	  }

	  /**
	   * Return a Duration representing the time spanned by this interval.
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
	   * @return {Duration}
	   */
	  toDuration(unit, opts) {
	    if (!this.isValid) {
	      return Duration.invalid(this.invalidReason);
	    }
	    return this.e.diff(this.s, unit, opts);
	  }

	  /**
	   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
	   * @param {function} mapFn
	   * @return {Interval}
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
	   */
	  mapEndpoints(mapFn) {
	    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
	  }
	}

	/**
	 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
	 */
	class Info {
	  /**
	   * Return whether the specified zone contains a DST.
	   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
	   * @return {boolean}
	   */
	  static hasDST(zone = Settings.defaultZone) {
	    const proto = DateTime.now()
	      .setZone(zone)
	      .set({ month: 12 });

	    return !zone.universal && proto.offset !== proto.set({ month: 6 }).offset;
	  }

	  /**
	   * Return whether the specified zone is a valid IANA specifier.
	   * @param {string} zone - Zone to check
	   * @return {boolean}
	   */
	  static isValidIANAZone(zone) {
	    return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
	  }

	  /**
	   * Converts the input into a {@link Zone} instance.
	   *
	   * * If `input` is already a Zone instance, it is returned unchanged.
	   * * If `input` is a string containing a valid time zone name, a Zone instance
	   *   with that name is returned.
	   * * If `input` is a string that doesn't refer to a known time zone, a Zone
	   *   instance with {@link Zone.isValid} == false is returned.
	   * * If `input is a number, a Zone instance with the specified fixed offset
	   *   in minutes is returned.
	   * * If `input` is `null` or `undefined`, the default zone is returned.
	   * @param {string|Zone|number} [input] - the value to be converted
	   * @return {Zone}
	   */
	  static normalizeZone(input) {
	    return normalizeZone(input, Settings.defaultZone);
	  }

	  /**
	   * Return an array of standalone month names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @example Info.months()[0] //=> 'January'
	   * @example Info.months('short')[0] //=> 'Jan'
	   * @example Info.months('numeric')[0] //=> '1'
	   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
	   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
	   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
	   * @return {[string]}
	   */
	  static months(
	    length = "long",
	    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
	  ) {
	    return Locale.create(locale, numberingSystem, outputCalendar).months(length);
	  }

	  /**
	   * Return an array of format month names.
	   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
	   * changes the string.
	   * See {@link months}
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @return {[string]}
	   */
	  static monthsFormat(
	    length = "long",
	    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
	  ) {
	    return Locale.create(locale, numberingSystem, outputCalendar).months(length, true);
	  }

	  /**
	   * Return an array of standalone week names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @example Info.weekdays()[0] //=> 'Monday'
	   * @example Info.weekdays('short')[0] //=> 'Mon'
	   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
	   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
	   * @return {[string]}
	   */
	  static weekdays(length = "long", { locale = null, numberingSystem = null } = {}) {
	    return Locale.create(locale, numberingSystem, null).weekdays(length);
	  }

	  /**
	   * Return an array of format week names.
	   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
	   * changes the string.
	   * See {@link weekdays}
	   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale=null] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @return {[string]}
	   */
	  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null } = {}) {
	    return Locale.create(locale, numberingSystem, null).weekdays(length, true);
	  }

	  /**
	   * Return an array of meridiems.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
	   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
	   * @return {[string]}
	   */
	  static meridiems({ locale = null } = {}) {
	    return Locale.create(locale).meridiems();
	  }

	  /**
	   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
	   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.eras() //=> [ 'BC', 'AD' ]
	   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
	   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
	   * @return {[string]}
	   */
	  static eras(length = "short", { locale = null } = {}) {
	    return Locale.create(locale, null, "gregory").eras(length);
	  }

	  /**
	   * Return the set of available features in this environment.
	   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
	   * Keys:
	   * * `zones`: whether this environment supports IANA timezones
	   * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
	   * * `intl`: whether this environment supports general internationalization
	   * * `relative`: whether this environment supports relative time formatting
	   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
	   * @return {Object}
	   */
	  static features() {
	    let intl = false,
	      intlTokens = false,
	      zones = false,
	      relative = false;

	    if (hasIntl()) {
	      intl = true;
	      intlTokens = hasFormatToParts();
	      relative = hasRelative();

	      try {
	        zones =
	          new Intl.DateTimeFormat("en", { timeZone: "America/New_York" }).resolvedOptions()
	            .timeZone === "America/New_York";
	      } catch (e) {
	        zones = false;
	      }
	    }

	    return { intl, intlTokens, zones, relative };
	  }
	}

	function dayDiff(earlier, later) {
	  const utcDayStart = dt =>
	      dt
	        .toUTC(0, { keepLocalTime: true })
	        .startOf("day")
	        .valueOf(),
	    ms = utcDayStart(later) - utcDayStart(earlier);
	  return Math.floor(Duration.fromMillis(ms).as("days"));
	}

	function highOrderDiffs(cursor, later, units) {
	  const differs = [
	    ["years", (a, b) => b.year - a.year],
	    ["quarters", (a, b) => b.quarter - a.quarter],
	    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
	    [
	      "weeks",
	      (a, b) => {
	        const days = dayDiff(a, b);
	        return (days - (days % 7)) / 7;
	      }
	    ],
	    ["days", dayDiff]
	  ];

	  const results = {};
	  let lowestOrder, highWater;

	  for (const [unit, differ] of differs) {
	    if (units.indexOf(unit) >= 0) {
	      lowestOrder = unit;

	      let delta = differ(cursor, later);
	      highWater = cursor.plus({ [unit]: delta });

	      if (highWater > later) {
	        cursor = cursor.plus({ [unit]: delta - 1 });
	        delta -= 1;
	      } else {
	        cursor = highWater;
	      }

	      results[unit] = delta;
	    }
	  }

	  return [cursor, results, highWater, lowestOrder];
	}

	function diff(earlier, later, units, opts) {
	  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

	  const remainingMillis = later - cursor;

	  const lowerOrderUnits = units.filter(
	    u => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
	  );

	  if (lowerOrderUnits.length === 0) {
	    if (highWater < later) {
	      highWater = cursor.plus({ [lowestOrder]: 1 });
	    }

	    if (highWater !== cursor) {
	      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
	    }
	  }

	  const duration = Duration.fromObject(Object.assign(results, opts));

	  if (lowerOrderUnits.length > 0) {
	    return Duration.fromMillis(remainingMillis, opts)
	      .shiftTo(...lowerOrderUnits)
	      .plus(duration);
	  } else {
	    return duration;
	  }
	}

	const numberingSystems = {
	  arab: "[\u0660-\u0669]",
	  arabext: "[\u06F0-\u06F9]",
	  bali: "[\u1B50-\u1B59]",
	  beng: "[\u09E6-\u09EF]",
	  deva: "[\u0966-\u096F]",
	  fullwide: "[\uFF10-\uFF19]",
	  gujr: "[\u0AE6-\u0AEF]",
	  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
	  khmr: "[\u17E0-\u17E9]",
	  knda: "[\u0CE6-\u0CEF]",
	  laoo: "[\u0ED0-\u0ED9]",
	  limb: "[\u1946-\u194F]",
	  mlym: "[\u0D66-\u0D6F]",
	  mong: "[\u1810-\u1819]",
	  mymr: "[\u1040-\u1049]",
	  orya: "[\u0B66-\u0B6F]",
	  tamldec: "[\u0BE6-\u0BEF]",
	  telu: "[\u0C66-\u0C6F]",
	  thai: "[\u0E50-\u0E59]",
	  tibt: "[\u0F20-\u0F29]",
	  latn: "\\d"
	};

	const numberingSystemsUTF16 = {
	  arab: [1632, 1641],
	  arabext: [1776, 1785],
	  bali: [6992, 7001],
	  beng: [2534, 2543],
	  deva: [2406, 2415],
	  fullwide: [65296, 65303],
	  gujr: [2790, 2799],
	  khmr: [6112, 6121],
	  knda: [3302, 3311],
	  laoo: [3792, 3801],
	  limb: [6470, 6479],
	  mlym: [3430, 3439],
	  mong: [6160, 6169],
	  mymr: [4160, 4169],
	  orya: [2918, 2927],
	  tamldec: [3046, 3055],
	  telu: [3174, 3183],
	  thai: [3664, 3673],
	  tibt: [3872, 3881]
	};

	// eslint-disable-next-line
	const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

	function parseDigits(str) {
	  let value = parseInt(str, 10);
	  if (isNaN(value)) {
	    value = "";
	    for (let i = 0; i < str.length; i++) {
	      const code = str.charCodeAt(i);

	      if (str[i].search(numberingSystems.hanidec) !== -1) {
	        value += hanidecChars.indexOf(str[i]);
	      } else {
	        for (const key in numberingSystemsUTF16) {
	          const [min, max] = numberingSystemsUTF16[key];
	          if (code >= min && code <= max) {
	            value += code - min;
	          }
	        }
	      }
	    }
	    return parseInt(value, 10);
	  } else {
	    return value;
	  }
	}

	function digitRegex({ numberingSystem }, append = "") {
	  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
	}

	const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

	function intUnit(regex, post = i => i) {
	  return { regex, deser: ([s]) => post(parseDigits(s)) };
	}

	const NBSP = String.fromCharCode(160);
	const spaceOrNBSP = `( |${NBSP})`;
	const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

	function fixListRegex(s) {
	  // make dots optional and also make them literal
	  // make space and non breakable space characters interchangeable
	  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
	}

	function stripInsensitivities(s) {
	  return s
	    .replace(/\./g, "") // ignore dots that were made optional
	    .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
	    .toLowerCase();
	}

	function oneOf(strings, startIndex) {
	  if (strings === null) {
	    return null;
	  } else {
	    return {
	      regex: RegExp(strings.map(fixListRegex).join("|")),
	      deser: ([s]) =>
	        strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex
	    };
	  }
	}

	function offset(regex, groups) {
	  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
	}

	function simple(regex) {
	  return { regex, deser: ([s]) => s };
	}

	function escapeToken(value) {
	  // eslint-disable-next-line no-useless-escape
	  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	}

	function unitForToken(token, loc) {
	  const one = digitRegex(loc),
	    two = digitRegex(loc, "{2}"),
	    three = digitRegex(loc, "{3}"),
	    four = digitRegex(loc, "{4}"),
	    six = digitRegex(loc, "{6}"),
	    oneOrTwo = digitRegex(loc, "{1,2}"),
	    oneToThree = digitRegex(loc, "{1,3}"),
	    oneToSix = digitRegex(loc, "{1,6}"),
	    oneToNine = digitRegex(loc, "{1,9}"),
	    twoToFour = digitRegex(loc, "{2,4}"),
	    fourToSix = digitRegex(loc, "{4,6}"),
	    literal = t => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
	    unitate = t => {
	      if (token.literal) {
	        return literal(t);
	      }
	      switch (t.val) {
	        // era
	        case "G":
	          return oneOf(loc.eras("short", false), 0);
	        case "GG":
	          return oneOf(loc.eras("long", false), 0);
	        // years
	        case "y":
	          return intUnit(oneToSix);
	        case "yy":
	          return intUnit(twoToFour, untruncateYear);
	        case "yyyy":
	          return intUnit(four);
	        case "yyyyy":
	          return intUnit(fourToSix);
	        case "yyyyyy":
	          return intUnit(six);
	        // months
	        case "M":
	          return intUnit(oneOrTwo);
	        case "MM":
	          return intUnit(two);
	        case "MMM":
	          return oneOf(loc.months("short", true, false), 1);
	        case "MMMM":
	          return oneOf(loc.months("long", true, false), 1);
	        case "L":
	          return intUnit(oneOrTwo);
	        case "LL":
	          return intUnit(two);
	        case "LLL":
	          return oneOf(loc.months("short", false, false), 1);
	        case "LLLL":
	          return oneOf(loc.months("long", false, false), 1);
	        // dates
	        case "d":
	          return intUnit(oneOrTwo);
	        case "dd":
	          return intUnit(two);
	        // ordinals
	        case "o":
	          return intUnit(oneToThree);
	        case "ooo":
	          return intUnit(three);
	        // time
	        case "HH":
	          return intUnit(two);
	        case "H":
	          return intUnit(oneOrTwo);
	        case "hh":
	          return intUnit(two);
	        case "h":
	          return intUnit(oneOrTwo);
	        case "mm":
	          return intUnit(two);
	        case "m":
	          return intUnit(oneOrTwo);
	        case "q":
	          return intUnit(oneOrTwo);
	        case "qq":
	          return intUnit(two);
	        case "s":
	          return intUnit(oneOrTwo);
	        case "ss":
	          return intUnit(two);
	        case "S":
	          return intUnit(oneToThree);
	        case "SSS":
	          return intUnit(three);
	        case "u":
	          return simple(oneToNine);
	        // meridiem
	        case "a":
	          return oneOf(loc.meridiems(), 0);
	        // weekYear (k)
	        case "kkkk":
	          return intUnit(four);
	        case "kk":
	          return intUnit(twoToFour, untruncateYear);
	        // weekNumber (W)
	        case "W":
	          return intUnit(oneOrTwo);
	        case "WW":
	          return intUnit(two);
	        // weekdays
	        case "E":
	        case "c":
	          return intUnit(one);
	        case "EEE":
	          return oneOf(loc.weekdays("short", false, false), 1);
	        case "EEEE":
	          return oneOf(loc.weekdays("long", false, false), 1);
	        case "ccc":
	          return oneOf(loc.weekdays("short", true, false), 1);
	        case "cccc":
	          return oneOf(loc.weekdays("long", true, false), 1);
	        // offset/zone
	        case "Z":
	        case "ZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
	        case "ZZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
	        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
	        // because we don't have any way to figure out what they are
	        case "z":
	          return simple(/[a-z_+-/]{1,256}?/i);
	        default:
	          return literal(t);
	      }
	    };

	  const unit = unitate(token) || {
	    invalidReason: MISSING_FTP
	  };

	  unit.token = token;

	  return unit;
	}

	const partTypeStyleToTokenVal = {
	  year: {
	    "2-digit": "yy",
	    numeric: "yyyyy"
	  },
	  month: {
	    numeric: "M",
	    "2-digit": "MM",
	    short: "MMM",
	    long: "MMMM"
	  },
	  day: {
	    numeric: "d",
	    "2-digit": "dd"
	  },
	  weekday: {
	    short: "EEE",
	    long: "EEEE"
	  },
	  dayperiod: "a",
	  dayPeriod: "a",
	  hour: {
	    numeric: "h",
	    "2-digit": "hh"
	  },
	  minute: {
	    numeric: "m",
	    "2-digit": "mm"
	  },
	  second: {
	    numeric: "s",
	    "2-digit": "ss"
	  }
	};

	function tokenForPart(part, locale, formatOpts) {
	  const { type, value } = part;

	  if (type === "literal") {
	    return {
	      literal: true,
	      val: value
	    };
	  }

	  const style = formatOpts[type];

	  let val = partTypeStyleToTokenVal[type];
	  if (typeof val === "object") {
	    val = val[style];
	  }

	  if (val) {
	    return {
	      literal: false,
	      val
	    };
	  }

	  return undefined;
	}

	function buildRegex(units) {
	  const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
	  return [`^${re}$`, units];
	}

	function match(input, regex, handlers) {
	  const matches = input.match(regex);

	  if (matches) {
	    const all = {};
	    let matchIndex = 1;
	    for (const i in handlers) {
	      if (hasOwnProperty(handlers, i)) {
	        const h = handlers[i],
	          groups = h.groups ? h.groups + 1 : 1;
	        if (!h.literal && h.token) {
	          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
	        }
	        matchIndex += groups;
	      }
	    }
	    return [matches, all];
	  } else {
	    return [matches, {}];
	  }
	}

	function dateTimeFromMatches(matches) {
	  const toField = token => {
	    switch (token) {
	      case "S":
	        return "millisecond";
	      case "s":
	        return "second";
	      case "m":
	        return "minute";
	      case "h":
	      case "H":
	        return "hour";
	      case "d":
	        return "day";
	      case "o":
	        return "ordinal";
	      case "L":
	      case "M":
	        return "month";
	      case "y":
	        return "year";
	      case "E":
	      case "c":
	        return "weekday";
	      case "W":
	        return "weekNumber";
	      case "k":
	        return "weekYear";
	      case "q":
	        return "quarter";
	      default:
	        return null;
	    }
	  };

	  let zone;
	  if (!isUndefined(matches.Z)) {
	    zone = new FixedOffsetZone(matches.Z);
	  } else if (!isUndefined(matches.z)) {
	    zone = IANAZone.create(matches.z);
	  } else {
	    zone = null;
	  }

	  if (!isUndefined(matches.q)) {
	    matches.M = (matches.q - 1) * 3 + 1;
	  }

	  if (!isUndefined(matches.h)) {
	    if (matches.h < 12 && matches.a === 1) {
	      matches.h += 12;
	    } else if (matches.h === 12 && matches.a === 0) {
	      matches.h = 0;
	    }
	  }

	  if (matches.G === 0 && matches.y) {
	    matches.y = -matches.y;
	  }

	  if (!isUndefined(matches.u)) {
	    matches.S = parseMillis(matches.u);
	  }

	  const vals = Object.keys(matches).reduce((r, k) => {
	    const f = toField(k);
	    if (f) {
	      r[f] = matches[k];
	    }

	    return r;
	  }, {});

	  return [vals, zone];
	}

	let dummyDateTimeCache = null;

	function getDummyDateTime() {
	  if (!dummyDateTimeCache) {
	    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
	  }

	  return dummyDateTimeCache;
	}

	function maybeExpandMacroToken(token, locale) {
	  if (token.literal) {
	    return token;
	  }

	  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);

	  if (!formatOpts) {
	    return token;
	  }

	  const formatter = Formatter.create(locale, formatOpts);
	  const parts = formatter.formatDateTimeParts(getDummyDateTime());

	  const tokens = parts.map(p => tokenForPart(p, locale, formatOpts));

	  if (tokens.includes(undefined)) {
	    return token;
	  }

	  return tokens;
	}

	function expandMacroTokens(tokens, locale) {
	  return Array.prototype.concat(...tokens.map(t => maybeExpandMacroToken(t, locale)));
	}

	/**
	 * @private
	 */

	function explainFromTokens(locale, input, format) {
	  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
	    units = tokens.map(t => unitForToken(t, locale)),
	    disqualifyingUnit = units.find(t => t.invalidReason);

	  if (disqualifyingUnit) {
	    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
	  } else {
	    const [regexString, handlers] = buildRegex(units),
	      regex = RegExp(regexString, "i"),
	      [rawMatches, matches] = match(input, regex, handlers),
	      [result, zone] = matches ? dateTimeFromMatches(matches) : [null, null];
	    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
	      throw new ConflictingSpecificationError(
	        "Can't include meridiem when specifying 24-hour format"
	      );
	    }
	    return { input, tokens, regex, rawMatches, matches, result, zone };
	  }
	}

	function parseFromTokens(locale, input, format) {
	  const { result, zone, invalidReason } = explainFromTokens(locale, input, format);
	  return [result, zone, invalidReason];
	}

	const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

	function unitOutOfRange(unit, value) {
	  return new Invalid(
	    "unit out of range",
	    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
	  );
	}

	function dayOfWeek(year, month, day) {
	  const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
	  return js === 0 ? 7 : js;
	}

	function computeOrdinal(year, month, day) {
	  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
	}

	function uncomputeOrdinal(year, ordinal) {
	  const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
	    month0 = table.findIndex(i => i < ordinal),
	    day = ordinal - table[month0];
	  return { month: month0 + 1, day };
	}

	/**
	 * @private
	 */

	function gregorianToWeek(gregObj) {
	  const { year, month, day } = gregObj,
	    ordinal = computeOrdinal(year, month, day),
	    weekday = dayOfWeek(year, month, day);

	  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
	    weekYear;

	  if (weekNumber < 1) {
	    weekYear = year - 1;
	    weekNumber = weeksInWeekYear(weekYear);
	  } else if (weekNumber > weeksInWeekYear(year)) {
	    weekYear = year + 1;
	    weekNumber = 1;
	  } else {
	    weekYear = year;
	  }

	  return Object.assign({ weekYear, weekNumber, weekday }, timeObject(gregObj));
	}

	function weekToGregorian(weekData) {
	  const { weekYear, weekNumber, weekday } = weekData,
	    weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
	    yearInDays = daysInYear(weekYear);

	  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
	    year;

	  if (ordinal < 1) {
	    year = weekYear - 1;
	    ordinal += daysInYear(year);
	  } else if (ordinal > yearInDays) {
	    year = weekYear + 1;
	    ordinal -= daysInYear(weekYear);
	  } else {
	    year = weekYear;
	  }

	  const { month, day } = uncomputeOrdinal(year, ordinal);

	  return Object.assign({ year, month, day }, timeObject(weekData));
	}

	function gregorianToOrdinal(gregData) {
	  const { year, month, day } = gregData,
	    ordinal = computeOrdinal(year, month, day);

	  return Object.assign({ year, ordinal }, timeObject(gregData));
	}

	function ordinalToGregorian(ordinalData) {
	  const { year, ordinal } = ordinalData,
	    { month, day } = uncomputeOrdinal(year, ordinal);

	  return Object.assign({ year, month, day }, timeObject(ordinalData));
	}

	function hasInvalidWeekData(obj) {
	  const validYear = isInteger(obj.weekYear),
	    validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
	    validWeekday = integerBetween(obj.weekday, 1, 7);

	  if (!validYear) {
	    return unitOutOfRange("weekYear", obj.weekYear);
	  } else if (!validWeek) {
	    return unitOutOfRange("week", obj.week);
	  } else if (!validWeekday) {
	    return unitOutOfRange("weekday", obj.weekday);
	  } else return false;
	}

	function hasInvalidOrdinalData(obj) {
	  const validYear = isInteger(obj.year),
	    validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validOrdinal) {
	    return unitOutOfRange("ordinal", obj.ordinal);
	  } else return false;
	}

	function hasInvalidGregorianData(obj) {
	  const validYear = isInteger(obj.year),
	    validMonth = integerBetween(obj.month, 1, 12),
	    validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validMonth) {
	    return unitOutOfRange("month", obj.month);
	  } else if (!validDay) {
	    return unitOutOfRange("day", obj.day);
	  } else return false;
	}

	function hasInvalidTimeData(obj) {
	  const { hour, minute, second, millisecond } = obj;
	  const validHour =
	      integerBetween(hour, 0, 23) ||
	      (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
	    validMinute = integerBetween(minute, 0, 59),
	    validSecond = integerBetween(second, 0, 59),
	    validMillisecond = integerBetween(millisecond, 0, 999);

	  if (!validHour) {
	    return unitOutOfRange("hour", hour);
	  } else if (!validMinute) {
	    return unitOutOfRange("minute", minute);
	  } else if (!validSecond) {
	    return unitOutOfRange("second", second);
	  } else if (!validMillisecond) {
	    return unitOutOfRange("millisecond", millisecond);
	  } else return false;
	}

	const INVALID = "Invalid DateTime";
	const MAX_DATE = 8.64e15;

	function unsupportedZone(zone) {
	  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
	}

	// we cache week data on the DT object and this intermediates the cache
	function possiblyCachedWeekData(dt) {
	  if (dt.weekData === null) {
	    dt.weekData = gregorianToWeek(dt.c);
	  }
	  return dt.weekData;
	}

	// clone really means, "make a new object with these modifications". all "setters" really use this
	// to create a new object while only changing some of the properties
	function clone(inst, alts) {
	  const current = {
	    ts: inst.ts,
	    zone: inst.zone,
	    c: inst.c,
	    o: inst.o,
	    loc: inst.loc,
	    invalid: inst.invalid
	  };
	  return new DateTime(Object.assign({}, current, alts, { old: current }));
	}

	// find the right offset a given local time. The o input is our guess, which determines which
	// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
	function fixOffset(localTS, o, tz) {
	  // Our UTC time is just a guess because our offset is just a guess
	  let utcGuess = localTS - o * 60 * 1000;

	  // Test whether the zone matches the offset for this ts
	  const o2 = tz.offset(utcGuess);

	  // If so, offset didn't change and we're done
	  if (o === o2) {
	    return [utcGuess, o];
	  }

	  // If not, change the ts by the difference in the offset
	  utcGuess -= (o2 - o) * 60 * 1000;

	  // If that gives us the local time we want, we're done
	  const o3 = tz.offset(utcGuess);
	  if (o2 === o3) {
	    return [utcGuess, o2];
	  }

	  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
	  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
	}

	// convert an epoch timestamp into a calendar object with the given offset
	function tsToObj(ts, offset) {
	  ts += offset * 60 * 1000;

	  const d = new Date(ts);

	  return {
	    year: d.getUTCFullYear(),
	    month: d.getUTCMonth() + 1,
	    day: d.getUTCDate(),
	    hour: d.getUTCHours(),
	    minute: d.getUTCMinutes(),
	    second: d.getUTCSeconds(),
	    millisecond: d.getUTCMilliseconds()
	  };
	}

	// convert a calendar object to a epoch timestamp
	function objToTS(obj, offset, zone) {
	  return fixOffset(objToLocalTS(obj), offset, zone);
	}

	// create a new DT instance by adding a duration, adjusting for DSTs
	function adjustTime(inst, dur) {
	  const oPre = inst.o,
	    year = inst.c.year + Math.trunc(dur.years),
	    month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
	    c = Object.assign({}, inst.c, {
	      year,
	      month,
	      day:
	        Math.min(inst.c.day, daysInMonth(year, month)) +
	        Math.trunc(dur.days) +
	        Math.trunc(dur.weeks) * 7
	    }),
	    millisToAdd = Duration.fromObject({
	      years: dur.years - Math.trunc(dur.years),
	      quarters: dur.quarters - Math.trunc(dur.quarters),
	      months: dur.months - Math.trunc(dur.months),
	      weeks: dur.weeks - Math.trunc(dur.weeks),
	      days: dur.days - Math.trunc(dur.days),
	      hours: dur.hours,
	      minutes: dur.minutes,
	      seconds: dur.seconds,
	      milliseconds: dur.milliseconds
	    }).as("milliseconds"),
	    localTS = objToLocalTS(c);

	  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

	  if (millisToAdd !== 0) {
	    ts += millisToAdd;
	    // that could have changed the offset by going over a DST, but we want to keep the ts the same
	    o = inst.zone.offset(ts);
	  }

	  return { ts, o };
	}

	// helper useful in turning the results of parsing into real dates
	// by handling the zone options
	function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
	  const { setZone, zone } = opts;
	  if (parsed && Object.keys(parsed).length !== 0) {
	    const interpretationZone = parsedZone || zone,
	      inst = DateTime.fromObject(
	        Object.assign(parsed, opts, {
	          zone: interpretationZone,
	          // setZone is a valid option in the calling methods, but not in fromObject
	          setZone: undefined
	        })
	      );
	    return setZone ? inst : inst.setZone(zone);
	  } else {
	    return DateTime.invalid(
	      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
	    );
	  }
	}

	// if you want to output a technical format (e.g. RFC 2822), this helper
	// helps handle the details
	function toTechFormat(dt, format, allowZ = true) {
	  return dt.isValid
	    ? Formatter.create(Locale.create("en-US"), {
	        allowZ,
	        forceSimple: true
	      }).formatDateTimeFromString(dt, format)
	    : null;
	}

	// technical time formats (e.g. the time part of ISO 8601), take some options
	// and this commonizes their handling
	function toTechTimeFormat(
	  dt,
	  {
	    suppressSeconds = false,
	    suppressMilliseconds = false,
	    includeOffset,
	    includePrefix = false,
	    includeZone = false,
	    spaceZone = false,
	    format = "extended"
	  }
	) {
	  let fmt = format === "basic" ? "HHmm" : "HH:mm";

	  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
	    fmt += format === "basic" ? "ss" : ":ss";
	    if (!suppressMilliseconds || dt.millisecond !== 0) {
	      fmt += ".SSS";
	    }
	  }

	  if ((includeZone || includeOffset) && spaceZone) {
	    fmt += " ";
	  }

	  if (includeZone) {
	    fmt += "z";
	  } else if (includeOffset) {
	    fmt += format === "basic" ? "ZZZ" : "ZZ";
	  }

	  let str = toTechFormat(dt, fmt);

	  if (includePrefix) {
	    str = "T" + str;
	  }

	  return str;
	}

	// defaults for unspecified units in the supported calendars
	const defaultUnitValues = {
	    month: 1,
	    day: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultWeekUnitValues = {
	    weekNumber: 1,
	    weekday: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultOrdinalUnitValues = {
	    ordinal: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  };

	// Units in the supported calendars, sorted by bigness
	const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
	  orderedWeekUnits = [
	    "weekYear",
	    "weekNumber",
	    "weekday",
	    "hour",
	    "minute",
	    "second",
	    "millisecond"
	  ],
	  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

	// standardize case and plurality in units
	function normalizeUnit(unit) {
	  const normalized = {
	    year: "year",
	    years: "year",
	    month: "month",
	    months: "month",
	    day: "day",
	    days: "day",
	    hour: "hour",
	    hours: "hour",
	    minute: "minute",
	    minutes: "minute",
	    quarter: "quarter",
	    quarters: "quarter",
	    second: "second",
	    seconds: "second",
	    millisecond: "millisecond",
	    milliseconds: "millisecond",
	    weekday: "weekday",
	    weekdays: "weekday",
	    weeknumber: "weekNumber",
	    weeksnumber: "weekNumber",
	    weeknumbers: "weekNumber",
	    weekyear: "weekYear",
	    weekyears: "weekYear",
	    ordinal: "ordinal"
	  }[unit.toLowerCase()];

	  if (!normalized) throw new InvalidUnitError(unit);

	  return normalized;
	}

	// this is a dumbed down version of fromObject() that runs about 60% faster
	// but doesn't do any validation, makes a bunch of assumptions about what units
	// are present, and so on.
	function quickDT(obj, zone) {
	  // assume we have the higher-order units
	  for (const u of orderedUnits) {
	    if (isUndefined(obj[u])) {
	      obj[u] = defaultUnitValues[u];
	    }
	  }

	  const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
	  if (invalid) {
	    return DateTime.invalid(invalid);
	  }

	  const tsNow = Settings.now(),
	    offsetProvis = zone.offset(tsNow),
	    [ts, o] = objToTS(obj, offsetProvis, zone);

	  return new DateTime({
	    ts,
	    zone,
	    o
	  });
	}

	function diffRelative(start, end, opts) {
	  const round = isUndefined(opts.round) ? true : opts.round,
	    format = (c, unit) => {
	      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
	      const formatter = end.loc.clone(opts).relFormatter(opts);
	      return formatter.format(c, unit);
	    },
	    differ = unit => {
	      if (opts.calendary) {
	        if (!end.hasSame(start, unit)) {
	          return end
	            .startOf(unit)
	            .diff(start.startOf(unit), unit)
	            .get(unit);
	        } else return 0;
	      } else {
	        return end.diff(start, unit).get(unit);
	      }
	    };

	  if (opts.unit) {
	    return format(differ(opts.unit), opts.unit);
	  }

	  for (const unit of opts.units) {
	    const count = differ(unit);
	    if (Math.abs(count) >= 1) {
	      return format(count, unit);
	    }
	  }
	  return format(0, opts.units[opts.units.length - 1]);
	}

	/**
	 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
	 *
	 * A DateTime comprises of:
	 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
	 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
	 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
	 *
	 * Here is a brief overview of the most commonly used functionality it provides:
	 *
	 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
	 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
	 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
	 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
	 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
	 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
	 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
	 *
	 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
	 */
	class DateTime {
	  /**
	   * @access private
	   */
	  constructor(config) {
	    const zone = config.zone || Settings.defaultZone;

	    let invalid =
	      config.invalid ||
	      (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
	      (!zone.isValid ? unsupportedZone(zone) : null);
	    /**
	     * @access private
	     */
	    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;

	    let c = null,
	      o = null;
	    if (!invalid) {
	      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

	      if (unchanged) {
	        [c, o] = [config.old.c, config.old.o];
	      } else {
	        const ot = zone.offset(this.ts);
	        c = tsToObj(this.ts, ot);
	        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
	        c = invalid ? null : c;
	        o = invalid ? null : ot;
	      }
	    }

	    /**
	     * @access private
	     */
	    this._zone = zone;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.invalid = invalid;
	    /**
	     * @access private
	     */
	    this.weekData = null;
	    /**
	     * @access private
	     */
	    this.c = c;
	    /**
	     * @access private
	     */
	    this.o = o;
	    /**
	     * @access private
	     */
	    this.isLuxonDateTime = true;
	  }

	  // CONSTRUCT

	  /**
	   * Create a DateTime for the current instant, in the system's time zone.
	   *
	   * Use Settings to override these default values if needed.
	   * @example DateTime.now().toISO() //~> now in the ISO format
	   * @return {DateTime}
	   */
	  static now() {
	    return new DateTime({});
	  }

	  /**
	   * Create a local DateTime
	   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month, 1-indexed
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.local()                            //~> now
	   * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
	   * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
	   * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
	   * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
	   * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765
	   * @return {DateTime}
	   */
	  static local(year, month, day, hour, minute, second, millisecond) {
	    if (isUndefined(year)) {
	      return new DateTime({});
	    } else {
	      return quickDT(
	        {
	          year,
	          month,
	          day,
	          hour,
	          minute,
	          second,
	          millisecond
	        },
	        Settings.defaultZone
	      );
	    }
	  }

	  /**
	   * Create a DateTime in UTC
	   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.utc()                            //~> now
	   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
	   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765Z
	   * @return {DateTime}
	   */
	  static utc(year, month, day, hour, minute, second, millisecond) {
	    if (isUndefined(year)) {
	      return new DateTime({
	        ts: Settings.now(),
	        zone: FixedOffsetZone.utcInstance
	      });
	    } else {
	      return quickDT(
	        {
	          year,
	          month,
	          day,
	          hour,
	          minute,
	          second,
	          millisecond
	        },
	        FixedOffsetZone.utcInstance
	      );
	    }
	  }

	  /**
	   * Create a DateTime from a JavaScript Date object. Uses the default zone.
	   * @param {Date} date - a JavaScript Date object
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @return {DateTime}
	   */
	  static fromJSDate(date, options = {}) {
	    const ts = isDate(date) ? date.valueOf() : NaN;
	    if (Number.isNaN(ts)) {
	      return DateTime.invalid("invalid input");
	    }

	    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    return new DateTime({
	      ts: ts,
	      zone: zoneToUse,
	      loc: Locale.fromObject(options)
	    });
	  }

	  /**
	   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromMillis(milliseconds, options = {}) {
	    if (!isNumber(milliseconds)) {
	      throw new InvalidArgumentError(
	        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
	      );
	    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
	      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
	      return DateTime.invalid("Timestamp out of range");
	    } else {
	      return new DateTime({
	        ts: milliseconds,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} seconds - a number of seconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromSeconds(seconds, options = {}) {
	    if (!isNumber(seconds)) {
	      throw new InvalidArgumentError("fromSeconds requires a numerical input");
	    } else {
	      return new DateTime({
	        ts: seconds * 1000,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.year - a year, such as 1987
	   * @param {number} obj.month - a month, 1-12
	   * @param {number} obj.day - a day of the month, 1-31, depending on the month
	   * @param {number} obj.ordinal - day of the year, 1-365 or 366
	   * @param {number} obj.weekYear - an ISO week year
	   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
	   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
	   * @param {number} obj.hour - hour of the day, 0-23
	   * @param {number} obj.minute - minute of the hour, 0-59
	   * @param {number} obj.second - second of the minute, 0-59
	   * @param {number} obj.millisecond - millisecond of the second, 0-999
	   * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
	   * @param {string} [obj.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
	   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
	   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
	   * @return {DateTime}
	   */
	  static fromObject(obj) {
	    const zoneToUse = normalizeZone(obj.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    const tsNow = Settings.now(),
	      offsetProvis = zoneToUse.offset(tsNow),
	      normalized = normalizeObject(obj, normalizeUnit, [
	        "zone",
	        "locale",
	        "outputCalendar",
	        "numberingSystem"
	      ]),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber,
	      loc = Locale.fromObject(obj);

	    // cases:
	    // just a weekday -> this week's instance of that weekday, no worries
	    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
	    // (gregorian month or day) + ordinal -> error
	    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError(
	        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
	      );
	    }

	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }

	    const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

	    // configure ourselves to deal with gregorian dates or week stuff
	    let units,
	      defaultValues,
	      objNow = tsToObj(tsNow, offsetProvis);
	    if (useWeekData) {
	      units = orderedWeekUnits;
	      defaultValues = defaultWeekUnitValues;
	      objNow = gregorianToWeek(objNow);
	    } else if (containsOrdinal) {
	      units = orderedOrdinalUnits;
	      defaultValues = defaultOrdinalUnitValues;
	      objNow = gregorianToOrdinal(objNow);
	    } else {
	      units = orderedUnits;
	      defaultValues = defaultUnitValues;
	    }

	    // set default values for missing stuff
	    let foundFirst = false;
	    for (const u of units) {
	      const v = normalized[u];
	      if (!isUndefined(v)) {
	        foundFirst = true;
	      } else if (foundFirst) {
	        normalized[u] = defaultValues[u];
	      } else {
	        normalized[u] = objNow[u];
	      }
	    }

	    // make sure the values we have are in range
	    const higherOrderInvalid = useWeekData
	        ? hasInvalidWeekData(normalized)
	        : containsOrdinal
	          ? hasInvalidOrdinalData(normalized)
	          : hasInvalidGregorianData(normalized),
	      invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }

	    // compute the actual time
	    const gregorian = useWeekData
	        ? weekToGregorian(normalized)
	        : containsOrdinal
	          ? ordinalToGregorian(normalized)
	          : normalized,
	      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
	      inst = new DateTime({
	        ts: tsFinal,
	        zone: zoneToUse,
	        o: offsetFinal,
	        loc
	      });

	    // gregorian data + weekday serves only to validate
	    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
	      return DateTime.invalid(
	        "mismatched weekday",
	        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
	      );
	    }

	    return inst;
	  }

	  /**
	   * Create a DateTime from an ISO 8601 string
	   * @param {string} text - the ISO string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
	   * @example DateTime.fromISO('2016-W05-4')
	   * @return {DateTime}
	   */
	  static fromISO(text, opts = {}) {
	    const [vals, parsedZone] = parseISODate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
	  }

	  /**
	   * Create a DateTime from an RFC 2822 string
	   * @param {string} text - the RFC 2822 string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
	   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
	   * @return {DateTime}
	   */
	  static fromRFC2822(text, opts = {}) {
	    const [vals, parsedZone] = parseRFC2822Date(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
	  }

	  /**
	   * Create a DateTime from an HTTP header date
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @param {string} text - the HTTP header date
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
	   * @return {DateTime}
	   */
	  static fromHTTP(text, opts = {}) {
	    const [vals, parsedZone] = parseHTTPDate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
	  }

	  /**
	   * Create a DateTime from an input string and format string.
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromFormat(text, fmt, opts = {}) {
	    if (isUndefined(text) || isUndefined(fmt)) {
	      throw new InvalidArgumentError("fromFormat requires an input string and a format");
	    }

	    const { locale = null, numberingSystem = null } = opts,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      }),
	      [vals, parsedZone, invalid] = parseFromTokens(localeToUse, text, fmt);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    } else {
	      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text);
	    }
	  }

	  /**
	   * @deprecated use fromFormat instead
	   */
	  static fromString(text, fmt, opts = {}) {
	    return DateTime.fromFormat(text, fmt, opts);
	  }

	  /**
	   * Create a DateTime from a SQL date, time, or datetime
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale
	   * @param {string} text - the string to parse
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @example DateTime.fromSQL('2017-05-15')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
	   * @example DateTime.fromSQL('09:12:34.342')
	   * @return {DateTime}
	   */
	  static fromSQL(text, opts = {}) {
	    const [vals, parsedZone] = parseSQL(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
	  }

	  /**
	   * Create an invalid DateTime.
	   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {DateTime}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDateTimeError(invalid);
	    } else {
	      return new DateTime({ invalid });
	    }
	  }

	  /**
	   * Check if an object is a DateTime. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDateTime(o) {
	    return (o && o.isLuxonDateTime) || false;
	  }

	  // INFO

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
	   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
	   * @return {number}
	   */
	  get(unit) {
	    return this[unit];
	  }

	  /**
	   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
	   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
	   * * The DateTime was created by an operation on another invalid date
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get outputCalendar() {
	    return this.isValid ? this.loc.outputCalendar : null;
	  }

	  /**
	   * Get the time zone associated with this DateTime.
	   * @type {Zone}
	   */
	  get zone() {
	    return this._zone;
	  }

	  /**
	   * Get the name of the time zone.
	   * @type {string}
	   */
	  get zoneName() {
	    return this.isValid ? this.zone.name : null;
	  }

	  /**
	   * Get the year
	   * @example DateTime.local(2017, 5, 25).year //=> 2017
	   * @type {number}
	   */
	  get year() {
	    return this.isValid ? this.c.year : NaN;
	  }

	  /**
	   * Get the quarter
	   * @example DateTime.local(2017, 5, 25).quarter //=> 2
	   * @type {number}
	   */
	  get quarter() {
	    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	  }

	  /**
	   * Get the month (1-12).
	   * @example DateTime.local(2017, 5, 25).month //=> 5
	   * @type {number}
	   */
	  get month() {
	    return this.isValid ? this.c.month : NaN;
	  }

	  /**
	   * Get the day of the month (1-30ish).
	   * @example DateTime.local(2017, 5, 25).day //=> 25
	   * @type {number}
	   */
	  get day() {
	    return this.isValid ? this.c.day : NaN;
	  }

	  /**
	   * Get the hour of the day (0-23).
	   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
	   * @type {number}
	   */
	  get hour() {
	    return this.isValid ? this.c.hour : NaN;
	  }

	  /**
	   * Get the minute of the hour (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
	   * @type {number}
	   */
	  get minute() {
	    return this.isValid ? this.c.minute : NaN;
	  }

	  /**
	   * Get the second of the minute (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
	   * @type {number}
	   */
	  get second() {
	    return this.isValid ? this.c.second : NaN;
	  }

	  /**
	   * Get the millisecond of the second (0-999).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
	   * @type {number}
	   */
	  get millisecond() {
	    return this.isValid ? this.c.millisecond : NaN;
	  }

	  /**
	   * Get the week year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekYear //=> 2015
	   * @type {number}
	   */
	  get weekYear() {
	    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
	  }

	  /**
	   * Get the week number of the week year (1-52ish).
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
	   * @type {number}
	   */
	  get weekNumber() {
	    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
	  }

	  /**
	   * Get the day of the week.
	   * 1 is Monday and 7 is Sunday
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekday //=> 4
	   * @type {number}
	   */
	  get weekday() {
	    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
	  }

	  /**
	   * Get the ordinal (meaning the day of the year)
	   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
	   * @type {number|DateTime}
	   */
	  get ordinal() {
	    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
	  }

	  /**
	   * Get the human readable short month name, such as 'Oct'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
	   * @type {string}
	   */
	  get monthShort() {
	    return this.isValid ? Info.months("short", { locale: this.locale })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable long month name, such as 'October'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthLong //=> October
	   * @type {string}
	   */
	  get monthLong() {
	    return this.isValid ? Info.months("long", { locale: this.locale })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable short weekday, such as 'Mon'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
	   * @type {string}
	   */
	  get weekdayShort() {
	    return this.isValid ? Info.weekdays("short", { locale: this.locale })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the human readable long weekday, such as 'Monday'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
	   * @type {string}
	   */
	  get weekdayLong() {
	    return this.isValid ? Info.weekdays("long", { locale: this.locale })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the UTC offset of this DateTime in minutes
	   * @example DateTime.now().offset //=> -240
	   * @example DateTime.utc().offset //=> 0
	   * @type {number}
	   */
	  get offset() {
	    return this.isValid ? +this.o : NaN;
	  }

	  /**
	   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameShort() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "short",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameLong() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "long",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get whether this zone's offset ever changes, as in a DST.
	   * @type {boolean}
	   */
	  get isOffsetFixed() {
	    return this.isValid ? this.zone.universal : null;
	  }

	  /**
	   * Get whether the DateTime is in a DST.
	   * @type {boolean}
	   */
	  get isInDST() {
	    if (this.isOffsetFixed) {
	      return false;
	    } else {
	      return (
	        this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset
	      );
	    }
	  }

	  /**
	   * Returns true if this DateTime is in a leap year, false otherwise
	   * @example DateTime.local(2016).isInLeapYear //=> true
	   * @example DateTime.local(2013).isInLeapYear //=> false
	   * @type {boolean}
	   */
	  get isInLeapYear() {
	    return isLeapYear(this.year);
	  }

	  /**
	   * Returns the number of days in this DateTime's month
	   * @example DateTime.local(2016, 2).daysInMonth //=> 29
	   * @example DateTime.local(2016, 3).daysInMonth //=> 31
	   * @type {number}
	   */
	  get daysInMonth() {
	    return daysInMonth(this.year, this.month);
	  }

	  /**
	   * Returns the number of days in this DateTime's year
	   * @example DateTime.local(2016).daysInYear //=> 366
	   * @example DateTime.local(2013).daysInYear //=> 365
	   * @type {number}
	   */
	  get daysInYear() {
	    return this.isValid ? daysInYear(this.year) : NaN;
	  }

	  /**
	   * Returns the number of weeks in this DateTime's year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2004).weeksInWeekYear //=> 53
	   * @example DateTime.local(2013).weeksInWeekYear //=> 52
	   * @type {number}
	   */
	  get weeksInWeekYear() {
	    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
	  }

	  /**
	   * Returns the resolved Intl options for this DateTime.
	   * This is useful in understanding the behavior of formatting methods
	   * @param {Object} opts - the same options as toLocaleString
	   * @return {Object}
	   */
	  resolvedLocaleOpts(opts = {}) {
	    const { locale, numberingSystem, calendar } = Formatter.create(
	      this.loc.clone(opts),
	      opts
	    ).resolvedOptions(this);
	    return { locale, numberingSystem, outputCalendar: calendar };
	  }

	  // TRANSFORM

	  /**
	   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to {@link setZone}('utc')
	   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
	   * @param {Object} [opts={}] - options to pass to `setZone()`
	   * @return {DateTime}
	   */
	  toUTC(offset = 0, opts = {}) {
	    return this.setZone(FixedOffsetZone.instance(offset), opts);
	  }

	  /**
	   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to `setZone('local')`
	   * @return {DateTime}
	   */
	  toLocal() {
	    return this.setZone(Settings.defaultZone);
	  }

	  /**
	   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
	   *
	   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
	   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
	   * @return {DateTime}
	   */
	  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
	    zone = normalizeZone(zone, Settings.defaultZone);
	    if (zone.equals(this.zone)) {
	      return this;
	    } else if (!zone.isValid) {
	      return DateTime.invalid(unsupportedZone(zone));
	    } else {
	      let newTS = this.ts;
	      if (keepLocalTime || keepCalendarTime) {
	        const offsetGuess = zone.offset(this.ts);
	        const asObj = this.toObject();
	        [newTS] = objToTS(asObj, offsetGuess, zone);
	      }
	      return clone(this, { ts: newTS, zone });
	    }
	  }

	  /**
	   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
	   * @param {Object} properties - the properties to set
	   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
	   * @return {DateTime}
	   */
	  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
	    return clone(this, { loc });
	  }

	  /**
	   * "Set" the locale. Returns a newly-constructed DateTime.
	   * Just a convenient alias for reconfigure({ locale })
	   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
	   * @return {DateTime}
	   */
	  setLocale(locale) {
	    return this.reconfigure({ locale });
	  }

	  /**
	   * "Set" the values of specified units. Returns a newly-constructed DateTime.
	   * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dt.set({ year: 2017 })
	   * @example dt.set({ hour: 8, minute: 30 })
	   * @example dt.set({ weekday: 5 })
	   * @example dt.set({ year: 2005, ordinal: 234 })
	   * @return {DateTime}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const normalized = normalizeObject(values, normalizeUnit, []),
	      settingWeekStuff =
	        !isUndefined(normalized.weekYear) ||
	        !isUndefined(normalized.weekNumber) ||
	        !isUndefined(normalized.weekday);

	    let mixed;
	    if (settingWeekStuff) {
	      mixed = weekToGregorian(Object.assign(gregorianToWeek(this.c), normalized));
	    } else if (!isUndefined(normalized.ordinal)) {
	      mixed = ordinalToGregorian(Object.assign(gregorianToOrdinal(this.c), normalized));
	    } else {
	      mixed = Object.assign(this.toObject(), normalized);

	      // if we didn't set the day but we ended up on an overflow date,
	      // use the last day of the right month
	      if (isUndefined(normalized.day)) {
	        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
	      }
	    }

	    const [ts, o] = objToTS(mixed, this.o, this.zone);
	    return clone(this, { ts, o });
	  }

	  /**
	   * Add a period of time to this DateTime and return the resulting DateTime
	   *
	   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @example DateTime.now().plus(123) //~> in 123 milliseconds
	   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
	   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
	   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
	   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
	   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
	   * @return {DateTime}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;
	    const dur = friendlyDuration(duration);
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * Subtract a period of time to this DateTime and return the resulting DateTime
	   * See {@link plus}
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   @return {DateTime}
	  */
	  minus(duration) {
	    if (!this.isValid) return this;
	    const dur = friendlyDuration(duration).negate();
	    return clone(this, adjustTime(this, dur));
	  }

	  /**
	   * "Set" this DateTime to the beginning of a unit of time.
	   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
	   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
	   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
	   * @return {DateTime}
	   */
	  startOf(unit) {
	    if (!this.isValid) return this;
	    const o = {},
	      normalizedUnit = Duration.normalizeUnit(unit);
	    switch (normalizedUnit) {
	      case "years":
	        o.month = 1;
	      // falls through
	      case "quarters":
	      case "months":
	        o.day = 1;
	      // falls through
	      case "weeks":
	      case "days":
	        o.hour = 0;
	      // falls through
	      case "hours":
	        o.minute = 0;
	      // falls through
	      case "minutes":
	        o.second = 0;
	      // falls through
	      case "seconds":
	        o.millisecond = 0;
	        break;
	      // no default, invalid units throw in normalizeUnit()
	    }

	    if (normalizedUnit === "weeks") {
	      o.weekday = 1;
	    }

	    if (normalizedUnit === "quarters") {
	      const q = Math.ceil(this.month / 3);
	      o.month = (q - 1) * 3 + 1;
	    }

	    return this.set(o);
	  }

	  /**
	   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
	   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
	   * @return {DateTime}
	   */
	  endOf(unit) {
	    return this.isValid
	      ? this.plus({ [unit]: 1 })
	          .startOf(unit)
	          .minus(1)
	      : this;
	  }

	  // OUTPUT

	  /**
	   * Returns a string representation of this DateTime formatted according to the specified format string.
	   * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @see https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
	   * @param {string} fmt - the format string
	   * @param {Object} opts - opts to override the configuration options
	   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
	   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
	   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
	      : INVALID;
	  }

	  /**
	   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
	   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
	   * of the DateTime in the assigned locale.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param opts {Object} - Intl.DateTimeFormat constructor options and configuration options
	   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
	   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
	   * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
	   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
	   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
	   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
	   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
	   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
	   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false }); //=> '11:32'
	   * @return {string}
	   */
	  toLocaleString(opts = DATE_SHORT) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), opts).formatDateTime(this)
	      : INVALID;
	  }

	  /**
	   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
	   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
	   * @example DateTime.now().toLocaleParts(); //=> [
	   *                                   //=>   { type: 'day', value: '25' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'month', value: '05' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'year', value: '1982' }
	   *                                   //=> ]
	   */
	  toLocaleParts(opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
	      : [];
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
	   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
	   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
	   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
	   * @return {string}
	   */
	  toISO(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return `${this.toISODate(opts)}T${this.toISOTime(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's date component
	   * @param {Object} opts - options
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
	   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
	   * @return {string}
	   */
	  toISODate({ format = "extended" } = {}) {
	    let fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";
	    if (this.year > 9999) {
	      fmt = "+" + fmt;
	    }

	    return toTechFormat(this, fmt);
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's week date
	   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
	   * @return {string}
	   */
	  toISOWeekDate() {
	    return toTechFormat(this, "kkkk-'W'WW-c");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's time component
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
	   * @return {string}
	   */
	  toISOTime({
	    suppressMilliseconds = false,
	    suppressSeconds = false,
	    includeOffset = true,
	    includePrefix = false,
	    format = "extended"
	  } = {}) {
	    return toTechTimeFormat(this, {
	      suppressSeconds,
	      suppressMilliseconds,
	      includeOffset,
	      includePrefix,
	      format
	    });
	  }

	  /**
	   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
	   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
	   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
	   * @return {string}
	   */
	  toRFC2822() {
	    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
	   * Specifically, the string conforms to RFC 1123.
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
	   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
	   * @return {string}
	   */
	  toHTTP() {
	    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Date
	   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
	   * @return {string}
	   */
	  toSQLDate() {
	    return toTechFormat(this, "yyyy-MM-dd");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Time
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
	   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
	   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
	   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
	   * @return {string}
	   */
	  toSQLTime({ includeOffset = true, includeZone = false } = {}) {
	    return toTechTimeFormat(this, {
	      includeOffset,
	      includeZone,
	      spaceZone: true
	    });
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
	   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
	   * @return {string}
	   */
	  toSQL(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for debugging
	   * @return {string}
	   */
	  toString() {
	    return this.isValid ? this.toISO() : INVALID;
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime. Alias of {@link toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime.
	   * @return {number}
	   */
	  toMillis() {
	    return this.isValid ? this.ts : NaN;
	  }

	  /**
	   * Returns the epoch seconds of this DateTime.
	   * @return {number}
	   */
	  toSeconds() {
	    return this.isValid ? this.ts / 1000 : NaN;
	  }

	  /**
	   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns a BSON serializable equivalent to this DateTime.
	   * @return {Date}
	   */
	  toBSON() {
	    return this.toJSDate();
	  }

	  /**
	   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};

	    const base = Object.assign({}, this.c);

	    if (opts.includeConfig) {
	      base.outputCalendar = this.outputCalendar;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns a JavaScript Date equivalent to this DateTime.
	   * @return {Date}
	   */
	  toJSDate() {
	    return new Date(this.isValid ? this.ts : NaN);
	  }

	  // COMPARE

	  /**
	   * Return the difference between two DateTimes as a Duration.
	   * @param {DateTime} otherDateTime - the DateTime to compare this one to
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example
	   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
	   *     i2 = DateTime.fromISO('1983-10-14T10:30');
	   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
	   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
	   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
	   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
	   * @return {Duration}
	   */
	  diff(otherDateTime, unit = "milliseconds", opts = {}) {
	    if (!this.isValid || !otherDateTime.isValid) {
	      return Duration.invalid(
	        this.invalid || otherDateTime.invalid,
	        "created by diffing an invalid DateTime"
	      );
	    }

	    const durOpts = Object.assign(
	      { locale: this.locale, numberingSystem: this.numberingSystem },
	      opts
	    );

	    const units = maybeArray(unit).map(Duration.normalizeUnit),
	      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
	      earlier = otherIsLater ? this : otherDateTime,
	      later = otherIsLater ? otherDateTime : this,
	      diffed = diff(earlier, later, units, durOpts);

	    return otherIsLater ? diffed.negate() : diffed;
	  }

	  /**
	   * Return the difference between this DateTime and right now.
	   * See {@link diff}
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  diffNow(unit = "milliseconds", opts = {}) {
	    return this.diff(DateTime.now(), unit, opts);
	  }

	  /**
	   * Return an Interval spanning between this DateTime and another DateTime
	   * @param {DateTime} otherDateTime - the other end point of the Interval
	   * @return {Interval}
	   */
	  until(otherDateTime) {
	    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
	  }

	  /**
	   * Return whether this DateTime is in the same unit of time as another DateTime.
	   * Higher-order units must also be identical for this function to return `true`.
	   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link setZone} to convert one of the dates if needed.
	   * @param {DateTime} otherDateTime - the other DateTime
	   * @param {string} unit - the unit of time to check sameness on
	   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
	   * @return {boolean}
	   */
	  hasSame(otherDateTime, unit) {
	    if (!this.isValid) return false;

	    const inputMs = otherDateTime.valueOf();
	    const otherZoneDateTime = this.setZone(otherDateTime.zone, { keepLocalTime: true });
	    return otherZoneDateTime.startOf(unit) <= inputMs && inputMs <= otherZoneDateTime.endOf(unit);
	  }

	  /**
	   * Equality check
	   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
	   * To compare just the millisecond values, use `+dt1 === +dt2`.
	   * @param {DateTime} other - the other DateTime
	   * @return {boolean}
	   */
	  equals(other) {
	    return (
	      this.isValid &&
	      other.isValid &&
	      this.valueOf() === other.valueOf() &&
	      this.zone.equals(other.zone) &&
	      this.loc.equals(other.loc)
	    );
	  }

	  /**
	   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
	   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
	   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
	   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
	   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
	   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
	   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
	   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
	   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
	   */
	  toRelative(options = {}) {
	    if (!this.isValid) return null;
	    const base = options.base || DateTime.fromObject({ zone: this.zone }),
	      padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
	    return diffRelative(
	      base,
	      this.plus(padding),
	      Object.assign(options, {
	        numeric: "always",
	        units: ["years", "months", "days", "hours", "minutes", "seconds"]
	      })
	    );
	  }

	  /**
	   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
	   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
	   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
	   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
	   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
	   */
	  toRelativeCalendar(options = {}) {
	    if (!this.isValid) return null;

	    return diffRelative(
	      options.base || DateTime.fromObject({ zone: this.zone }),
	      this,
	      Object.assign(options, {
	        numeric: "auto",
	        units: ["years", "months", "days"],
	        calendary: true
	      })
	    );
	  }

	  /**
	   * Return the min of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
	   * @return {DateTime} the min DateTime, or undefined if called with no argument
	   */
	  static min(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("min requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.min);
	  }

	  /**
	   * Return the max of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
	   * @return {DateTime} the max DateTime, or undefined if called with no argument
	   */
	  static max(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("max requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.max);
	  }

	  // MISC

	  /**
	   * Explain how a string would be parsed by fromFormat()
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see description)
	   * @param {Object} options - options taken by fromFormat()
	   * @return {Object}
	   */
	  static fromFormatExplain(text, fmt, options = {}) {
	    const { locale = null, numberingSystem = null } = options,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      });
	    return explainFromTokens(localeToUse, text, fmt);
	  }

	  /**
	   * @deprecated use fromFormatExplain instead
	   */
	  static fromStringExplain(text, fmt, options = {}) {
	    return DateTime.fromFormatExplain(text, fmt, options);
	  }

	  // FORMAT PRESETS

	  /**
	   * {@link toLocaleString} format like 10/14/1983
	   * @type {Object}
	   */
	  static get DATE_SHORT() {
	    return DATE_SHORT;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED() {
	    return DATE_MED;
	  }

	  /**
	   * {@link toLocaleString} format like 'Fri, Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED_WITH_WEEKDAY() {
	    return DATE_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_FULL() {
	    return DATE_FULL;
	  }

	  /**
	   * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_HUGE() {
	    return DATE_HUGE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_SIMPLE() {
	    return TIME_SIMPLE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SECONDS() {
	    return TIME_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SHORT_OFFSET() {
	    return TIME_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_LONG_OFFSET() {
	    return TIME_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_SIMPLE() {
	    return TIME_24_SIMPLE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SECONDS() {
	    return TIME_24_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SHORT_OFFSET() {
	    return TIME_24_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_LONG_OFFSET() {
	    return TIME_24_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT() {
	    return DATETIME_SHORT;
	  }

	  /**
	   * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT_WITH_SECONDS() {
	    return DATETIME_SHORT_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED() {
	    return DATETIME_MED;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_SECONDS() {
	    return DATETIME_MED_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_WEEKDAY() {
	    return DATETIME_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL() {
	    return DATETIME_FULL;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL_WITH_SECONDS() {
	    return DATETIME_FULL_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE() {
	    return DATETIME_HUGE;
	  }

	  /**
	   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE_WITH_SECONDS() {
	    return DATETIME_HUGE_WITH_SECONDS;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDateTime(dateTimeish) {
	  if (DateTime.isDateTime(dateTimeish)) {
	    return dateTimeish;
	  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
	    return DateTime.fromJSDate(dateTimeish);
	  } else if (dateTimeish && typeof dateTimeish === "object") {
	    return DateTime.fromObject(dateTimeish);
	  } else {
	    throw new InvalidArgumentError(
	      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
	    );
	  }
	}

	const VERSION = "1.26.0";

	var luxon = /*#__PURE__*/Object.freeze({
		__proto__: null,
		VERSION: VERSION,
		DateTime: DateTime,
		Duration: Duration,
		Interval: Interval,
		Info: Info,
		Zone: Zone,
		FixedOffsetZone: FixedOffsetZone,
		IANAZone: IANAZone,
		InvalidZone: InvalidZone,
		LocalZone: LocalZone,
		Settings: Settings
	});

	var fs = {};

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : '/';

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	}
	// path.normalize(path)
	// posix version
	function normalize(path) {
	  var isPathAbsolute = isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isPathAbsolute).join('/');

	  if (!path && !isPathAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isPathAbsolute ? '/' : '') + path;
	}
	// posix version
	function isAbsolute(path) {
	  return path.charAt(0) === '/';
	}

	// posix version
	function join() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	}


	// path.relative(from, to)
	// posix version
	function relative(from, to) {
	  from = resolve(from).substr(1);
	  to = resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	}

	var sep = '/';
	var delimiter = ':';

	function dirname(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	}

	function basename(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	}


	function extname(path) {
	  return splitPath(path)[3];
	}
	var path = {
	  extname: extname,
	  basename: basename,
	  dirname: dirname,
	  sep: sep,
	  delimiter: delimiter,
	  relative: relative,
	  join: join,
	  isAbsolute: isAbsolute,
	  normalize: normalize,
	  resolve: resolve
	};
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ?
	    function (str, start, len) { return str.substr(start, len) } :
	    function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	const scopedEval$1 = eval;
	const templateCache = new Map();
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
	function getChildrenProperty(options = {}) {
	    const { jsonx = {} } = options;
	    const props = options.props || jsonx.props || {};
	    if (typeof props._children !== "undefined" /* && !jsonx.children */) {
	        if (Array.isArray(props._children) ||
	            typeof props._children === "string" ||
	            typeof props._children === "number") {
	            return props._children;
	        }
	        else {
	            return jsonx.children;
	        }
	    }
	    else if (typeof jsonx.children === "undefined") {
	        if (props &&
	            props.children &&
	            (typeof props.children !== "undefined" || Array.isArray(props.children))) {
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
	function getChildrenProps(options = {}) {
	    const { jsonx = {}, childjsonx, renderIndex } = options;
	    const props = options.props || jsonx.props || {};
	    if (jsonx.passprops && childjsonx && typeof childjsonx === "object") {
	        const passedChildJsonx = Object.assign({}, childjsonx, {
	            props: Object.assign({}, Array.isArray(jsonx.passprops)
	                ? jsonx.passprops.reduce((passedProps, prop) => {
	                    passedProps[prop] = props[prop];
	                    return passedProps;
	                }, {})
	                : props, (childjsonx.thisprops && childjsonx.thisprops.style) || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
	                (childjsonx.asyncprops && childjsonx.asyncprops.style) ||
	                (childjsonx.windowprops && childjsonx.windowprops.style)
	                ? {}
	                : {
	                // style: {}
	                }, childjsonx.props, 
	            //@ts-ignore
	            typeof this !== "undefined" || (this && this.disableRenderIndexKey)
	                ? {}
	                : { key: typeof renderIndex !== "undefined"
	                        ? renderIndex + Math.random()
	                        : Math.random()
	                })
	        });
	        return passedChildJsonx;
	    }
	    else
	        return childjsonx;
	}
	function fetchJSONSync(path, options) {
	    try {
	        const config = Object.assign({ method: "GET", headers: [] }, options);
	        const request = new XMLHttpRequest();
	        request.open(config && config.method || "GET", path, false); // `false` makes the request synchronous
	        if (config.headers) {
	            Object.keys(config.headers).forEach(header => {
	                request.setRequestHeader(header, config.headers[header]);
	            });
	        }
	        request.send(config.body ? JSON.stringify(config.body) : undefined);
	        if (request.status !== 200) {
	            throw new Error(request.responseText);
	        }
	        else
	            return request.responseText;
	    }
	    catch (e) {
	        throw e;
	    }
	}
	function getChildrenTemplate(template, type) {
	    const cachedTemplate = templateCache.get(template);
	    if (cachedTemplate) {
	        return cachedTemplate;
	    }
	    else if (typeof window !== "undefined" &&
	        typeof window.XMLHttpRequest === "function" &&
	        (!fs.readFileSync || type === 'fetch')) {
	        const jsFile = fetchJSONSync(template);
	        const jsonxModule = scopedEval$1(`(${jsFile})`);
	        templateCache.set(template, jsonxModule);
	        return jsonxModule;
	    }
	    else if (typeof template === "string" || type === 'file') {
	        const jsFile = fs.readFileSync(path.resolve(template)).toString();
	        const jsonxModule = scopedEval$1(`(${jsFile})`);
	        templateCache.set(template, jsonxModule);
	        return jsonxModule;
	    }
	    return null;
	}
	function clearTemplateCache() {
	    templateCache.clear();
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
	function getJSONXChildren$1(options = { jsonx: {} }) {
	    // eslint-disable-next-line
	    const { jsonx, resources, renderIndex, logError = console.error } = options;
	    try {
	        const context = this || {};
	        const props = options && options.props
	            ? options.props
	            : jsonx && jsonx.props
	                ? jsonx.props
	                : {};
	        if (!jsonx)
	            return null;
	        jsonx.children = getChildrenProperty({ jsonx, props });
	        props._children = undefined;
	        delete props._children;
	        if (jsonx.___template)
	            jsonx.children = [getChildrenTemplate(jsonx.___template)];
	        else if (typeof jsonx.children === 'undefined' || jsonx.children === null)
	            return undefined;
	        else if (jsonx.children && jsonx.___stringifyChildren && Array.isArray(jsonx.___stringifyChildren)) {
	            const args = [jsonx.children, ...jsonx.___stringifyChildren];
	            jsonx.children = JSON.stringify.apply(null, args);
	        }
	        else if (jsonx.children && jsonx.___stringifyChildren)
	            jsonx.children = JSON.stringify.apply(null, [jsonx.children, null, 2]);
	        //TODO: fix passing applied params
	        else if (jsonx.children && jsonx.___toStringChildren)
	            jsonx.children = jsonx.children.toString();
	        else if (jsonx.children && jsonx.___toNumeral)
	            jsonx.children = numeral(jsonx.children).format(jsonx.___toNumeral);
	        else if (jsonx.children && jsonx.___JSDatetoLuxonString)
	            jsonx.children = DateTime.fromJSDate(jsonx.children).toFormat(jsonx.___JSDatetoLuxonString);
	        else if (jsonx.children && jsonx.___ISOtoLuxonString)
	            jsonx.children = DateTime.fromISO(jsonx.children, {
	                zone: jsonx.___FromLuxonTimeZone
	            }).toFormat(jsonx.___ISOtoLuxonString);
	        if (typeof jsonx.children === 'string')
	            return jsonx.children;
	        const children = jsonx.children && Array.isArray(jsonx.children)
	            ? jsonx.children
	                .map(childjsonx => getReactElementFromJSONX.call(context, getChildrenProps.call(this, { jsonx, childjsonx, props, renderIndex }), resources))
	                .filter(child => child !== null)
	            : jsonx.children;
	        return children;
	    }
	    catch (e) {
	        this && this.debug && logError(e, e.stack ? e.stack : "no stack");
	        return null;
	    }
	}

	var jsonxChildren = /*#__PURE__*/Object.freeze({
		__proto__: null,
		templateCache: templateCache,
		getChildrenProperty: getChildrenProperty,
		getChildrenProps: getChildrenProps,
		fetchJSONSync: fetchJSONSync,
		getChildrenTemplate: getChildrenTemplate,
		clearTemplateCache: clearTemplateCache,
		getJSONXChildren: getJSONXChildren$1
	});

	const scopedEval = eval;
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
	        let jsonxModule = options === null || options === void 0 ? void 0 : options.__jsonx;
	        let isJSON = false;
	        if (filePath) {
	            isJSON = (path.extname(filePath) === ".json");
	            const jsFile = fs.readFileSync(filePath).toString();
	            jsonxModule = (isJSON)
	                ? scopedEval(`(${jsFile})`)
	                : scopedEval(jsFile);
	        }
	        const resources = Object.assign({}, options);
	        delete resources.__boundConfig;
	        delete resources.__DOCTYPE;
	        delete resources.__jsonx;
	        const context = Object.assign({ disableRenderIndexKey: false }, options === null || options === void 0 ? void 0 : options.__boundConfig);
	        // if (isJSON) context.useJSON = true;
	        const jsonxRenderedString = outputHTML.call(context, {
	            jsonx: jsonxModule,
	            resources
	        });
	        const template = `${(options === null || options === void 0 ? void 0 : options.__DOCTYPE) || "<!DOCTYPE html>"}
${jsonxRenderedString}`;
	        if (typeof callback === "function")
	            callback(null, template);
	        else
	            return template;
	    }
	    catch (e) {
	        if (typeof callback === "function")
	            callback(e);
	        else
	            throw e;
	    }
	}

	// import React, { createElement, } from 'react';
	const createElement = React__default['default'].createElement;
	const { componentMap, getComponentFromMap, getBoundedComponents, DynamicComponent, FormComponent, ReactHookForm, getReactLibrariesAndComponents, } = jsonxComponents;
	const { getComputedProps } = jsonxProps;
	const { getJSONXChildren } = jsonxChildren;
	const { displayComponent, validSimpleJSONXSyntax, simpleJSONXSyntax } = jsonxUtils;
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
	function jsonxRender(config = { jsonx: { component: "" }, querySelector: "" }) {
	    const { jsonx, resources, querySelector, DOM, portal } = config;
	    const Render = portal ? ReactDOM__default['default'].createPortal : ReactDOM__default['default'].render;
	    const RenderDOM = DOM || document.querySelector(querySelector);
	    const JSONXReactElement = getReactElementFromJSONX.call(this || {}, jsonx, resources);
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
	function outputHTML(config = { jsonx: { component: "" } }) {
	    const { jsonx, resources, type, props, children } = config;
	    return this && this.useJSON
	        ? server.renderToString(getReactElementFromJSON.call(this || {}, { type: (type || jsonx.type || jsonx.component || 'Fragment'), props: props || jsonx.props, children: children || jsonx.children }))
	        : server.renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
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
	function getReactElementFromJSONX(jsonx, resources = {}) {
	    // eslint-disable-next-line
	    const { customComponents, debug = false, returnJSON = false, logError = console.error, boundedComponents = [], disableRenderIndexKey = true } = this || {};
	    let { componentLibraries = {}, } = this || {};
	    componentLibraries.ReactHookForm = ReactHookForm;
	    if (!jsonx)
	        return null;
	    if (jsonx.type)
	        jsonx.component = jsonx.type;
	    if (!jsonx.component && validSimpleJSONXSyntax(jsonx)) {
	        jsonx = simpleJSONXSyntax(jsonx);
	    }
	    if (!jsonx || !jsonx.component)
	        return createElement("span", {}, debug ? "Error: Missing Component Object" : "");
	    try {
	        let components = Object.assign({ DynamicComponent: DynamicComponent.bind(this) }, { FormComponent: FormComponent.bind(this) }, componentMap, this === null || this === void 0 ? void 0 : this.reactComponents);
	        let reactComponents = boundedComponents.length
	            ? getBoundedComponents.call(this, {
	                boundedComponents,
	                reactComponents: components
	            })
	            : components;
	        if (customComponents && Array.isArray(customComponents) && customComponents.length) {
	            const cxt = Object.assign(Object.assign({}, this), { componentLibraries, reactComponents: components });
	            const { customComponentLibraries, customReactComponents } = getReactLibrariesAndComponents.call(cxt, customComponents);
	            componentLibraries = Object.assign(Object.assign({}, componentLibraries), customComponentLibraries);
	            reactComponents = Object.assign(Object.assign({}, reactComponents), customReactComponents);
	        }
	        if (disableRenderIndexKey === false)
	            exports.renderIndex++;
	        const element = getComponentFromMap({
	            jsonx,
	            reactComponents,
	            componentLibraries,
	            debug,
	            logError
	        });
	        const props = getComputedProps.call(this, {
	            jsonx,
	            resources,
	            renderIndex: exports.renderIndex,
	            componentLibraries,
	            debug,
	            logError,
	            disableRenderIndexKey
	        });
	        const displayElement = jsonx.comparisonprops
	            ? displayComponent.call(this, {
	                jsonx,
	                props,
	                renderIndex: exports.renderIndex,
	                componentLibraries,
	                debug
	            })
	            : true;
	        if (displayElement) {
	            const children = getJSONXChildren.call(this, {
	                jsonx,
	                props,
	                resources,
	                renderIndex: exports.renderIndex
	            });
	            //@ts -ignore
	            if (returnJSON)
	                return { type: element, props, children };
	            else if (jsonx.test)
	                return JSON.stringify({ element, props, children }, null, 2);
	            //TODO: Fix
	            else
	                return createElement(element, props, children);
	        }
	        else {
	            return null;
	        }
	    }
	    catch (e) {
	        if (debug) {
	            logError({ jsonx, resources }, "getReactElementFromJSONX this", this);
	            logError(e, e.stack ? e.stack : "no stack");
	        }
	        throw e;
	    }
	}
	const getRenderedJSON = getReactElementFromJSONX;
	const getReactElement = getReactElementFromJSONX;
	/** converts a json object {type,props,children} into a react element
	 * @example
	 * jsonx.getReactElementFromJSON({type:'div',props:{title:'some title attribute'},children:'inner html text'})
	 * @param {Object|String} options.type - 'div' or react component
	 * @param {Object} options.props - props for react element
	 * @param {String|[Object]} options.children - children elements
	 * @returns {function} React element via React.createElement
	 */
	function getReactElementFromJSON({ type, props, children }) {
	    return createElement(type, props, children && Array.isArray(children)
	        ? children.map(getReactElementFromJSON)
	        : children);
	}
	/** converts a jsonx json object into a react function component
	 * @example
	 * jsonx.compile({jsonx:{component:'div',props:{title:'some title attribute'},children:'inner html text'}}) //=>React Function Component
	 * @param {Object} jsonx - valid JSONX JSON
	 * @param {Object} resources - props for react element
	 * @returns {function} React element via React.createElement
	 */
	function compile(jsonx, resources = {}) {
	    const context = Object.assign({}, this, { returnJSON: true });
	    const json = getReactElementFromJSONX.call(context, jsonx, resources);
	    const func = function compiledJSONX(props) {
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
	function outputJSX(jsonx, resources = {}) {
	    const context = Object.assign({}, this, { returnJSON: true });
	    const json = getReactElementFromJSONX.call(context, jsonx, resources);
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
	function outputJSON(jsonx, resources = {}) {
	    //@ts-ignore
	    const context = Object.assign({}, this, { returnJSON: true });
	    return getReactElementFromJSONX.call(context, jsonx, resources);
	}
	const jsonxHTMLString = outputHTML;
	/**
	 * converts JSONX JSON IR to JSX
	 * @example
	 * jsonx.jsonToJSX({ type: 'div', props: { key: 5, title: 'test' }, children: 'hello' }) // => '<div key={5} title="test">hello</div>'
	 * @param {Object} json - {type,props,children}
	 * @returns {String} jsx string
	 */
	function jsonToJSX(json) {
	    const propsString = json.props
	        ? Object.keys(json.props)
	            .filter(prop => prop.includes("__eval_") === false)
	            .reduce((propString, prop) => {
	            propString += ` ${prop.toString()}=${typeof json.props[prop] === "string"
                ? `"${json.props[prop].toString()}"`
                : `{${(json.props[`__eval_${prop}`] || json.props[prop]).toString()}}`}`;
	            return propString;
	        }, "")
	        : "";
	    return Array.isArray(json.children)
	        ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX).join('\r\n')}
</${json.type}>`
	        : `<${json.type}${propsString}>${json.children}</${json.type}>`;
	}
	/**
	 * Exposes react module used in JSONX
	 * @returns {Object} React
	 */
	function __getReact() {
	    return React__default['default'];
	}
	/**
	 * Exposes react dom module used in JSONX
	 * @returns {Object} ReactDOM
	 */
	function __getReactDOM() {
	    return ReactDOM__default['default'];
	}
	const _jsonxChildren = jsonxChildren;
	const _jsonxComponents = jsonxComponents;
	const _jsonxProps = jsonxProps;
	const _jsonxUtils = jsonxUtils;
	const _jsonxHelpers = { numeral, luxon };

	exports.__express = __express;
	exports.__getReact = __getReact;
	exports.__getReactDOM = __getReactDOM;
	exports._jsonxChildren = _jsonxChildren;
	exports._jsonxComponents = _jsonxComponents;
	exports._jsonxHelpers = _jsonxHelpers;
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

	Object.defineProperty(exports, '__esModule', { value: true });

})));
