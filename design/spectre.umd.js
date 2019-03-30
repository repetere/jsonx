(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.Spectre = {}),global.React));
}(this, (function (exports,React) { 'use strict';

	React = React && React.hasOwnProperty('default') ? React['default'] : React;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

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

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	}());
	});

	/**
	 * The Heading component.
	 */

	var Heading = function Heading(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var Component = props.tag,
	      contents = props.contents,
	      label = props.label,
	      otherProps = objectWithoutProperties(props, ["tag", "contents", "label"]);

	  return React.createElement(Component, otherProps, children || contents, " ", label && React.createElement(Label, {
	    contents: label
	  }));
	};

	Heading.propTypes = {
	  tag: propTypes.string,
	  children: propTypes.any,
	  contents: propTypes.any,
	  label: propTypes.any
	  /**
	   * The Label component.
	   */

	};

	var Label = function Label(_ref2) {
	  var children = _ref2.children,
	      props = objectWithoutProperties(_ref2, ["children"]);

	  var contents = props.contents,
	      className = props.className,
	      otherProps = objectWithoutProperties(props, ["contents", "className"]);

	  return React.createElement("small", _extends_1({
	    className: classnames('label', className)
	  }, otherProps), children || contents);
	};

	Label.propTypes = {
	  children: propTypes.any,
	  contents: propTypes.any,
	  className: propTypes.any
	  /**
	   * The Headings components.
	   */

	};

	var H1 = function H1(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h1"
	  }));
	};

	var H2 = function H2(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h2"
	  }));
	};

	var H3 = function H3(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h3"
	  }));
	};

	var H4 = function H4(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h4"
	  }));
	};

	var H5 = function H5(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h5"
	  }));
	};

	var H6 = function H6(props) {
	  return React.createElement(Heading, _extends_1({}, props, {
	    tag: "h6"
	  }));
	};

	H1.propTypes = H2.propTypes = H3.propTypes = H4.propTypes = H5.propTypes = H6.propTypes = {
	  children: propTypes.any,
	  contents: propTypes.any,
	  label: propTypes.any
	};
	H1.Label = H2.Label = H3.Label = H4.Label = H5.Label = H6.Label = Label;



	var index = /*#__PURE__*/Object.freeze({
		H1: H1,
		H2: H2,
		H3: H3,
		H4: H4,
		H5: H5,
		H6: H6,
		Label: Label
	});

	var Table = function Table(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      striped = props.striped,
	      hover = props.hover,
	      scroll = props.scroll,
	      otherProps = objectWithoutProperties(props, ["className", "striped", "hover", "scroll"]);

	  var classNames = classnames('table', className, {
	    'table-striped': striped,
	    'table-hover': hover,
	    'table-scroll': scroll
	  });
	  return React.createElement("table", _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	Table.propTypes = {
	  children: propTypes.any,
	  className: propTypes.any,
	  striped: propTypes.bool,
	  hover: propTypes.bool,
	  scroll: propTypes.bool
	};

	var Header = function Header(_ref2) {
	  var children = _ref2.children,
	      props = objectWithoutProperties(_ref2, ["children"]);

	  return React.createElement("thead", props, children);
	};

	Header.propTypes = {
	  children: propTypes.any
	};

	var Body = function Body(_ref3) {
	  var children = _ref3.children,
	      props = objectWithoutProperties(_ref3, ["children"]);

	  return React.createElement("tbody", props, children);
	};

	Body.propTypes = {
	  children: propTypes.any
	};

	var Row = function Row(_ref4) {
	  var children = _ref4.children,
	      props = objectWithoutProperties(_ref4, ["children"]);

	  var className = props.className,
	      active = props.active,
	      otherProps = objectWithoutProperties(props, ["className", "active"]);

	  var classNames = classnames(className, {
	    active: active
	  });
	  return React.createElement("tr", _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	Row.propTypes = {
	  children: propTypes.any,
	  className: propTypes.any,
	  active: propTypes.bool
	};

	var Heading$1 = function Heading(_ref5) {
	  var children = _ref5.children,
	      props = objectWithoutProperties(_ref5, ["children"]);

	  return React.createElement("th", props, children);
	};

	Heading$1.propTypes = {
	  children: propTypes.any
	};

	var Cell = function Cell(_ref6) {
	  var children = _ref6.children,
	      props = objectWithoutProperties(_ref6, ["children"]);

	  return React.createElement("td", props, children);
	};

	Cell.propTypes = {
	  children: propTypes.any
	};
	Table.Header = Header;
	Table.Body = Body;
	Table.Row = Row;
	Table.Heading = Heading$1;
	Table.Cell = Cell;



	var index$1 = /*#__PURE__*/Object.freeze({
		Table: Table,
		Header: Header,
		Body: Body,
		Row: Row,
		Heading: Heading$1,
		Cell: Cell
	});

	var Button = function Button(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      primary = props.primary,
	      link = props.link,
	      success = props.success,
	      error = props.error,
	      block = props.block,
	      small = props.small,
	      large = props.large,
	      action = props.action,
	      circle = props.circle,
	      active = props.active,
	      loading = props.loading,
	      otherProps = objectWithoutProperties(props, ["className", "primary", "link", "success", "error", "block", "small", "large", "action", "circle", "active", "loading"]);

	  var classNames = classnames('btn', {
	    'btn-primary': primary,
	    'btn-link': link,
	    'btn-success': success,
	    'btn-error': error,
	    'btn-block': block,
	    'btn-sm': small,
	    'btn-lg': large,
	    'btn-action': action || circle,
	    circle: circle,
	    active: active,
	    loading: loading
	  }, className);
	  return React.createElement("button", _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	Button.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  primary: propTypes.bool,
	  link: propTypes.bool,
	  success: propTypes.bool,
	  error: propTypes.bool,
	  block: propTypes.bool,
	  small: propTypes.bool,
	  large: propTypes.bool,
	  action: propTypes.bool,
	  circle: propTypes.bool,
	  active: propTypes.bool,
	  loading: propTypes.bool
	};

	var Group = function Group(_ref2) {
	  var children = _ref2.children,
	      props = objectWithoutProperties(_ref2, ["children"]);

	  var block = props.block,
	      otherProps = objectWithoutProperties(props, ["block"]);

	  var classNames = classnames('btn-group', {
	    'btn-group-block': block
	  });
	  return React.createElement("div", _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	Group.propTypes = {
	  children: propTypes.any,
	  block: propTypes.bool
	};
	Button.Group = Group;



	var index$2 = /*#__PURE__*/Object.freeze({
		Button: Button,
		Group: Group
	});

	var Radio = function Radio(props) {
	  var className = props.className,
	      label = props.label,
	      otherProps = objectWithoutProperties(props, ["className", "label"]);

	  var classNames = classnames('form-radio', className);
	  return React.createElement("label", {
	    className: classNames
	  }, React.createElement("input", _extends_1({}, otherProps, {
	    type: "radio"
	  })), React.createElement("i", {
	    className: "form-icon"
	  }), " ", label);
	};

	Radio.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

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

	var defineProperty = _defineProperty;

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
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

	var FormGroup = function FormGroup(props) {
	  var children = props.children,
	      className = props.className,
	      label = props.label,
	      id = props.id,
	      otherProps = objectWithoutProperties(props, ["children", "className", "label", "id"]);

	  var classNames = classnames('form-group', className);
	  return React.createElement("div", _extends_1({}, otherProps, {
	    className: classNames
	  }), label && React.createElement("label", {
	    className: "form-label",
	    htmlFor: id
	  }, label), children);
	};

	FormGroup.propTypes = {
	  children: propTypes.node.isRequired,
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	var Input = function Input(props) {
	  var className = props.className,
	      label = props.label,
	      id = props.id,
	      otherProps = objectWithoutProperties(props, ["className", "label", "id"]);

	  var formGroupProps = {
	    label: label,
	    id: id
	  };

	  var inputProps = objectSpread({
	    id: id
	  }, otherProps);

	  var classNames = classnames('form-input', className);
	  return React.createElement(FormGroup, formGroupProps, React.createElement("input", _extends_1({}, inputProps, {
	    className: classNames
	  })));
	};

	Input.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	var Select = function Select(props) {
	  var children = props.children,
	      className = props.className,
	      label = props.label,
	      id = props.id,
	      otherProps = objectWithoutProperties(props, ["children", "className", "label", "id"]);

	  var formGroupProps = {
	    label: label,
	    id: id
	  };

	  var inputProps = objectSpread({
	    id: id
	  }, otherProps);

	  var classNames = classnames('form-select', className);
	  return React.createElement(FormGroup, formGroupProps, React.createElement("select", _extends_1({}, inputProps, {
	    className: classNames
	  }), children));
	};

	Select.propTypes = {
	  children: propTypes.oneOf([propTypes.node, propTypes.arrayOf(propTypes.node)]),
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	var Switch = function Switch(props) {
	  var className = props.className,
	      label = props.label,
	      otherProps = objectWithoutProperties(props, ["className", "label"]);

	  var classNames = classnames('form-switch', className);
	  return React.createElement("label", {
	    className: classNames
	  }, React.createElement("input", _extends_1({}, otherProps, {
	    type: "checkbox"
	  })), React.createElement("i", {
	    className: "form-icon"
	  }), " ", label);
	};

	Switch.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

	var CheckBox = function CheckBox(props) {
	  var className = props.className,
	      label = props.label,
	      otherProps = objectWithoutProperties(props, ["className", "label"]);

	  var classNames = classnames('form-checkbox', className);
	  return React.createElement("label", {
	    className: classNames
	  }, React.createElement("input", _extends_1({}, otherProps, {
	    type: "checkbox"
	  })), React.createElement("i", {
	    className: "form-icon"
	  }), " ", label);
	};

	CheckBox.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

	var TextArea = function TextArea(props) {
	  var children = props.children,
	      className = props.className,
	      label = props.label,
	      id = props.id,
	      otherProps = objectWithoutProperties(props, ["children", "className", "label", "id"]);

	  var formGroupProps = {
	    label: label,
	    id: id
	  };

	  var inputProps = objectSpread({
	    id: id
	  }, otherProps);

	  var classNames = classnames('form-input', className);
	  return React.createElement(FormGroup, formGroupProps, React.createElement("textarea", _extends_1({}, inputProps, {
	    className: classNames
	  }), children));
	};

	TextArea.propTypes = {
	  children: propTypes.string,
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};



	var index$3 = /*#__PURE__*/Object.freeze({
		Radio: Radio,
		Input: Input,
		Select: Select,
		Switch: Switch,
		CheckBox: CheckBox,
		TextArea: TextArea,
		FormGroup: FormGroup
	});

	/**
	 * The Icon component.
	 */

	var Icon = function Icon(props) {
	  var className = props.className,
	      name = props.name,
	      size = props.size,
	      otherProps = objectWithoutProperties(props, ["className", "name", "size"]);

	  var classNames = classnames(className, 'icon', "icon-".concat(name), {
	    'icon-2x': size === '2x',
	    'icon-3x': size === '3x',
	    'icon-4x': size === '4x'
	  });
	  return React.createElement("i", _extends_1({}, otherProps, {
	    className: classNames
	  }));
	};

	Icon.propTypes = {
	  className: propTypes.string,
	  name: propTypes.string,
	  size: propTypes.string
	};



	var index$4 = /*#__PURE__*/Object.freeze({
		Icon: Icon
	});

	var Label$1 = function Label(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var primary = props.primary,
	      secondary = props.secondary,
	      success = props.success,
	      warning = props.warning,
	      error = props.error,
	      rounded = props.rounded,
	      small = props.small,
	      otherProps = objectWithoutProperties(props, ["primary", "secondary", "success", "warning", "error", "rounded", "small"]);

	  var classNames = classnames('label', {
	    'label-primary': primary,
	    'label-secondary': secondary,
	    'label-success': success,
	    'label-warning': warning,
	    'label-error': error,
	    'label-rounded': rounded
	  });
	  var Element = small ? 'small' : 'span';
	  return React.createElement(Element, _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	Label$1.propTypes = {
	  children: propTypes.node,
	  primary: propTypes.bool,
	  secondary: propTypes.bool,
	  success: propTypes.bool,
	  warning: propTypes.bool,
	  error: propTypes.bool,
	  rounded: propTypes.bool,
	  small: propTypes.bool
	};



	var index$5 = /*#__PURE__*/Object.freeze({
		Label: Label$1
	});

	/**
	 * The Image component.
	 */

	var Image = function Image(props) {
	  var responsive = props.responsive,
	      contain = props.contain,
	      cover = props.cover,
	      otherProps = objectWithoutProperties(props, ["responsive", "contain", "cover"]); // Prepare class names.


	  var classNames = classnames({
	    'img-responsive': responsive,
	    'img-fit-contain': contain,
	    'img-fit-cover': cover
	  });
	  return React.createElement("img", _extends_1({}, otherProps, {
	    className: classNames
	  }));
	};

	Image.propTypes = {
	  responsive: propTypes.bool,
	  contain: propTypes.bool,
	  cover: propTypes.bool
	};

	/**
	 * The Video Container component.
	 */

	var VideoContainer = function VideoContainer(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var Element = props.tag,
	      responsive = props.responsive,
	      otherProps = objectWithoutProperties(props, ["tag", "responsive"]); // Prepare class names.


	  var classNames = classnames({
	    'video-responsive': responsive,
	    // 16:9
	    'video-responsive-1-1': responsive === '1:1',
	    'video-responsive-4-3': responsive === '4:3'
	  });
	  return React.createElement(Element, _extends_1({}, otherProps, {
	    className: classNames
	  }), children);
	};

	var Video = function Video(props) {
	  return React.createElement(VideoContainer, _extends_1({}, props, {
	    tag: "video"
	  }));
	};

	var Container = function Container(props) {
	  return React.createElement(VideoContainer, _extends_1({}, props, {
	    tag: "div"
	  }));
	};

	VideoContainer.propTypes = Video.propTypes = Container.propTypes = {
	  children: propTypes.node,
	  responsive: propTypes.oneOfType([propTypes.bool, propTypes.oneOf(['1:1', '4:3', '16:9'])])
	};
	Video.Container = Container;

	/**
	 * The Figure component.
	 */

	var Figure = function Figure(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      caption = props.caption,
	      captionAlignment = props.captionAlignment,
	      otherProps = objectWithoutProperties(props, ["className", "caption", "captionAlignment"]); // Prepare class names.


	  var figureClassNames = classnames('figure', className);
	  var captionClassNames = classnames('figure-caption', {
	    'text-left': captionAlignment === 'left',
	    'text-center': captionAlignment === 'center',
	    'text-right': captionAlignment === 'right'
	  });
	  return React.createElement("figure", _extends_1({}, otherProps, {
	    className: figureClassNames
	  }), children, caption && React.createElement("figcaption", {
	    className: captionClassNames
	  }, caption));
	};

	Figure.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  caption: propTypes.string,
	  captionAlignment: propTypes.oneOf(['left', 'center', 'right'])
	};



	var index$6 = /*#__PURE__*/Object.freeze({
		Image: Image,
		Video: Video,
		Container: Container,
		Figure: Figure
	});

	var _extends = Object.assign || function (e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var s = arguments[r];

	    for (var o in s) {
	      Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
	    }
	  }

	  return e;
	},
	    objectWithoutProperties$1 = function objectWithoutProperties(e, r) {
	  var s = {};

	  for (var o in e) {
	    r.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (s[o] = e[o]);
	  }

	  return s;
	},
	    Col = function Col(e) {
	  var r,
	      s,
	      o,
	      a,
	      t,
	      n,
	      p = e.children,
	      c = objectWithoutProperties$1(e, ["children"]),
	      l = c.className,
	      i = objectWithoutProperties$1(c, ["className"]),
	      m = (s = (r = i).all, o = r.offset, a = r.hide, t = r.show, n = [], s ? n.push("col-" + s) : n.push(["xs", "sm", "md", "lg", "xl"].reduce(function (e, s) {
	    return r[s] ? classnames(e, "col-" + s + "-" + r[s]) : e;
	  }, "")), o && n.push("col-" + o + "-auto"), a && n.push(classnames(a.map(function (e) {
	    return "hide-" + e;
	  }))), t && n.push(classnames(t.map(function (e) {
	    return "show-" + e;
	  }))), n),
	      u = classnames("column", m, l);
	  return React.createElement("div", {
	    className: u
	  }, p);
	};

	Col.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  xs: propTypes.number,
	  sm: propTypes.number,
	  md: propTypes.number,
	  lg: propTypes.number,
	  xl: propTypes.number,
	  all: propTypes.number,
	  offset: propTypes.string,
	  hide: propTypes.array,
	  show: propTypes.array
	};

	var Row$1 = function Row(e) {
	  var r = e.children,
	      s = objectWithoutProperties$1(e, ["children"]),
	      o = s.className,
	      a = s.gapless,
	      t = s.oneline,
	      n = objectWithoutProperties$1(s, ["className", "gapless", "oneline"]),
	      p = classnames("columns", {
	    "col-gapless": a,
	    "col-oneline": t
	  }, o);
	  return React.createElement("div", _extends({
	    className: p
	  }, n), r);
	};

	Row$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  gapless: propTypes.bool,
	  oneline: propTypes.bool
	};

	var Grid = function Grid(e) {
	  var r = e.children,
	      s = objectWithoutProperties$1(e, ["children"]),
	      o = s.className,
	      a = objectWithoutProperties$1(s, ["className"]),
	      t = classnames("container", o);
	  return React.createElement("div", _extends({
	    className: t
	  }, a), r);
	};

	Grid.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var _extends$1 = Object.assign || function (e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var a = arguments[r];

	    for (var t in a) {
	      Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
	    }
	  }

	  return e;
	},
	    objectWithoutProperties$2 = function objectWithoutProperties(e, r) {
	  var a = {};

	  for (var t in e) {
	    r.indexOf(t) >= 0 || Object.prototype.hasOwnProperty.call(e, t) && (a[t] = e[t]);
	  }

	  return a;
	},
	    Section = function Section(e) {
	  var r = e.children,
	      a = objectWithoutProperties$2(e, ["children"]),
	      t = a.className,
	      s = a.center,
	      n = objectWithoutProperties$2(a, ["className", "center"]),
	      o = classnames({
	    "navbar-section": !s,
	    "navbar-center": s
	  }, t);
	  return React.createElement("section", _extends$1({
	    className: o
	  }, n), r);
	};

	Section.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  center: propTypes.bool
	};

	var Brand = function Brand(e) {
	  var r = e.children,
	      a = objectWithoutProperties$2(e, ["children"]),
	      t = a.className,
	      s = a.href,
	      n = objectWithoutProperties$2(a, ["className", "href"]),
	      o = classnames("navbar-brand", t);
	  return React.createElement("a", _extends$1({
	    href: s || "#",
	    className: o
	  }, n), r);
	};

	Brand.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  href: propTypes.string
	};

	var Navbar = function Navbar(e) {
	  var r = e.children,
	      a = objectWithoutProperties$2(e, ["children"]),
	      t = a.className,
	      s = objectWithoutProperties$2(a, ["className"]),
	      n = classnames("navbar", t);
	  return React.createElement("header", _extends$1({
	    className: n
	  }, s), r);
	};

	Navbar.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	}, Navbar.Section = Section, Navbar.Brand = Brand;



	var index$7 = /*#__PURE__*/Object.freeze({
		Grid: Grid,
		Row: Row$1,
		Col: Col,
		Navbar: Navbar,
		Section: Section,
		Brand: Brand
	});

	var Col$1 = function Col(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var getColumnClasses = function getColumnClasses(componentProps) {
	    var all = componentProps.all,
	        offset = componentProps.offset,
	        hide = componentProps.hide,
	        show = componentProps.show;
	    var colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
	    var classes = [];
	    var colPrefix = 'col';

	    if (all) {
	      classes.push("".concat(colPrefix, "-").concat(all));
	    } else {
	      classes.push(colSizes.reduce(function (sizes, size) {
	        if (!componentProps[size]) return sizes;
	        return classnames(sizes, "".concat(colPrefix, "-").concat(size, "-").concat(componentProps[size]));
	      }, ''));
	    }

	    if (offset) classes.push("".concat(colPrefix, "-").concat(offset, "-auto"));
	    if (hide) classes.push(classnames(hide.map(function (size) {
	      return "hide-".concat(size);
	    })));
	    if (show) classes.push(classnames(show.map(function (size) {
	      return "show-".concat(size);
	    })));
	    return classes;
	  };

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classes = getColumnClasses(otherProps);
	  var classNames = classnames('column', classes, className);
	  return React.createElement("div", {
	    className: classNames
	  }, children);
	};

	Col$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  xs: propTypes.number,
	  sm: propTypes.number,
	  md: propTypes.number,
	  lg: propTypes.number,
	  xl: propTypes.number,
	  all: propTypes.number,
	  offset: propTypes.string,
	  hide: propTypes.array,
	  show: propTypes.array
	};

	var Row$2 = function Row(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      gapless = props.gapless,
	      oneline = props.oneline,
	      otherProps = objectWithoutProperties(props, ["className", "gapless", "oneline"]);

	  var classNames = classnames('columns', {
	    'col-gapless': gapless,
	    'col-oneline': oneline
	  }, className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Row$2.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  gapless: propTypes.bool,
	  oneline: propTypes.bool
	};

	var Grid$1 = function Grid(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('container', className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Grid$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};



	var index$8 = /*#__PURE__*/Object.freeze({
		Col: Col$1,
		Row: Row$2,
		Grid: Grid$1
	});

	var Section$1 = function Section(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      center = props.center,
	      otherProps = objectWithoutProperties(props, ["className", "center"]);

	  var classNames = classnames({
	    'navbar-section': !center,
	    'navbar-center': center
	  }, className);
	  return React.createElement("section", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Section$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  center: propTypes.bool
	};

	var Brand$1 = function Brand(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      href = props.href,
	      otherProps = objectWithoutProperties(props, ["className", "href"]);

	  var classNames = classnames('navbar-brand', className);
	  return React.createElement("a", _extends_1({
	    href: href || '#',
	    className: classNames
	  }, otherProps), children);
	};

	Brand$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  href: propTypes.string
	};

	var Navbar$1 = function Navbar(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('navbar', className);
	  return React.createElement("header", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Navbar$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};
	Navbar$1.Section = Section$1;
	Navbar$1.Brand = Brand$1;



	var index$9 = /*#__PURE__*/Object.freeze({
		Navbar: Navbar$1,
		Section: Section$1,
		Brand: Brand$1
	});

	var Header$1 = function Header(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      id = props.id;
	  var classNames = classnames('accordion-header c-hand', className);
	  return React.createElement(React.Fragment, null, React.createElement("input", {
	    type: "checkbox",
	    id: id,
	    hidden: true
	  }), React.createElement("label", {
	    className: classNames,
	    htmlFor: id
	  }, children));
	};

	Header$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  id: propTypes.string
	};

	var Body$1 = function Body(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('accordion-body', className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Body$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var Accordion = function Accordion(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('accordion', className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Accordion.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};
	Accordion.Body = Body$1;
	Accordion.Header = Header$1;



	var index$a = /*#__PURE__*/Object.freeze({
		Accordion: Accordion,
		Header: Header$1,
		Body: Body$1
	});

	var Input$1 = function Input(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      focus = props.focus,
	      otherProps = objectWithoutProperties(props, ["className", "focus"]);

	  var classNames = classnames('form-autocomplete-input', {
	    'is-focused': focus
	  }, className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Input$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  focus: propTypes.bool
	};

	var Menu = function Menu(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('menu', className);
	  return React.createElement("ul", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Menu.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var Autocomplete = function Autocomplete(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('form-autocomplete', className);
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, otherProps), children);
	};

	Autocomplete.Input = Input$1;
	Autocomplete.Menu = Menu;
	Autocomplete.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};



	var index$b = /*#__PURE__*/Object.freeze({
		Autocomplete: Autocomplete,
		Input: Input$1,
		Menu: Menu
	});

	var Icon$1 = function Icon(props) {
	  var className = props.className,
	      otherProps = objectWithoutProperties(props, ["className"]);

	  var classNames = classnames('avatar-icon', className);
	  return React.createElement("img", _extends_1({
	    className: classNames
	  }, otherProps));
	};

	Icon$1.propTypes = {
	  className: propTypes.string
	};

	var Presence = function Presence(props) {
	  var className = props.className,
	      online = props.online,
	      busy = props.busy,
	      away = props.away,
	      otherProps = objectWithoutProperties(props, ["className", "online", "busy", "away"]);

	  var classNames = classnames('avatar-presence', {
	    online: online,
	    busy: busy,
	    away: away
	  }, className);
	  return React.createElement("i", _extends_1({
	    className: classNames
	  }, otherProps));
	};

	Presence.propTypes = {
	  className: propTypes.string,
	  online: propTypes.bool,
	  busy: propTypes.bool,
	  away: propTypes.bool
	};

	var Avatar = function Avatar(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      src = props.src,
	      initial = props.initial,
	      icon = props.icon,
	      xs = props.xs,
	      sm = props.sm,
	      lg = props.lg,
	      xl = props.xl,
	      otherProps = objectWithoutProperties(props, ["className", "src", "initial", "icon", "xs", "sm", "lg", "xl"]);

	  var imageNode = src && React.createElement("img", {
	    src: src
	  });
	  var iconNode = icon && React.createElement(Icon$1, {
	    src: src
	  });
	  var classNames = classnames('avatar', {
	    'avatar-xl': xl,
	    'avatar-lg': lg,
	    'avatar-sm': sm,
	    'avatar-xs': xs
	  }, className);
	  return React.createElement("figure", _extends_1({
	    className: classNames,
	    "data-initial": initial
	  }, otherProps), children, imageNode, iconNode);
	};

	Avatar.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  src: propTypes.string,
	  initial: propTypes.string,
	  icon: propTypes.string,
	  xs: propTypes.bool,
	  sm: propTypes.bool,
	  lg: propTypes.bool,
	  xl: propTypes.bool
	};
	Avatar.Icon = Icon$1;
	Avatar.Presence = Presence;



	var index$c = /*#__PURE__*/Object.freeze({
		Avatar: Avatar,
		Icon: Icon$1,
		Presence: Presence
	});

	var Badge = function Badge(_ref) {
	  var children = _ref.children,
	      label = _ref.label;

	  function addPropsToChildren(child) {
	    var className = classnames('badge', child.props.className);
	    var props = {
	      className: className,
	      'data-badge': label && label >= 0 ? label : ''
	    };
	    return React.cloneElement(child, props);
	  }

	  return React.createElement(React.Fragment, null, React.Children.map(children, addPropsToChildren));
	};

	Badge.propTypes = {
	  children: propTypes.any,
	  label: propTypes.number
	};



	var index$d = /*#__PURE__*/Object.freeze({
		Badge: Badge
	});

	/**
	 * The Item component.
	 */

	var Item = function Item(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      progress = props.progress,
	      style = props.style,
	      otherProps = objectWithoutProperties(props, ["className", "progress", "style"]); // Prepare class names.


	  var classNames = classnames('bar-item', className); // Prepare style.

	  var styles = objectSpread({}, style, {
	    width: "".concat(progress, "%")
	  });

	  return React.createElement("div", _extends_1({}, otherProps, {
	    className: classNames,
	    role: "progressbar",
	    style: styles
	  }), children);
	};

	Item.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  progress: propTypes.number,
	  style: propTypes.object
	};

	/**
	 * The Bar component.
	 */

	var Bar = function Bar(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      small = props.small,
	      progress = props.progress; // Prepare class names.

	  var classNames = classnames('bar', className, {
	    'bar-sm': small
	  });
	  return React.createElement("div", {
	    className: classNames
	  }, progress === undefined || children !== undefined ? children : React.createElement(Item, {
	    progress: progress
	  }));
	};

	Bar.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  small: propTypes.bool,
	  progress: propTypes.number // Create alias of Item component inside Bar component.

	};
	Bar.Item = Item;

	/**
	 * The Item component.
	 */

	var Item$1 = function Item(props) {
	  var className = props.className,
	      progress = props.progress,
	      style = props.style,
	      otherProps = objectWithoutProperties(props, ["className", "progress", "style"]); // Prepare class names.


	  var classNames = classnames('bar-item', className); // Prepare style.

	  var styles = objectSpread({}, style, {
	    width: "".concat(progress, "%")
	  });

	  return React.createElement("div", _extends_1({}, otherProps, {
	    className: classNames,
	    role: "progressbar",
	    style: styles
	  }), React.createElement("button", {
	    className: "bar-slider-btn btn",
	    role: "slider"
	  }));
	};

	Item$1.propTypes = {
	  className: propTypes.string,
	  progress: propTypes.number,
	  style: propTypes.object
	};

	/**
	 * The Slider component.
	 */

	var Slider = function Slider(_ref) {
	  var children = _ref.children,
	      props = objectWithoutProperties(_ref, ["children"]);

	  var className = props.className,
	      progress = props.progress,
	      otherProps = objectWithoutProperties(props, ["className", "progress"]); // Prepare class names.


	  var classNames = classnames('bar-slider', className);
	  return React.createElement(Bar, _extends_1({}, otherProps, {
	    className: classNames
	  }), progress === undefined || children !== undefined ? children : React.createElement(Item$1, {
	    progress: progress
	  }));
	};

	Slider.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  progress: propTypes.oneOfType(propTypes.string, propTypes.number) // Create alias of Item component inside Slider component.

	};
	Slider.Item = Item$1;



	var index$e = /*#__PURE__*/Object.freeze({
		Bar: Bar,
		Slider: Slider
	});

	var Toast = function Toast(_ref) {
	  var _classnames;

	  var className = _ref.className,
	      primary = _ref.primary,
	      success = _ref.success,
	      warning = _ref.warning,
	      error = _ref.error,
	      children = _ref.children,
	      props = objectWithoutProperties(_ref, ["className", "primary", "success", "warning", "error", "children"]);

	  var base = 'toast';

	  var composeVariantClass = function composeVariantClass(variant) {
	    return "toast-".concat(variant);
	  };

	  var classNames = classnames(base, className, (_classnames = {}, defineProperty(_classnames, composeVariantClass('primary'), primary), defineProperty(_classnames, composeVariantClass('success'), success), defineProperty(_classnames, composeVariantClass('warning'), warning), defineProperty(_classnames, composeVariantClass('error'), error), _classnames));
	  return React.createElement("div", _extends_1({
	    className: classNames
	  }, props), children);
	};

	Toast.propTypes = {
	  className: propTypes.string,
	  primary: propTypes.bool,
	  success: propTypes.bool,
	  warning: propTypes.bool,
	  error: propTypes.bool,
	  children: propTypes.any
	};



	var index$f = /*#__PURE__*/Object.freeze({
		Toast: Toast
	});

	exports.Typography = index;
	exports.Table = index$1;
	exports.Button = index$2;
	exports.Form = index$3;
	exports.Icon = index$4;
	exports.Label = index$5;
	exports.Media = index$6;
	exports.Layout = index$7;
	exports.Grid = index$8;
	exports.Navbar = index$9;
	exports.Accordion = index$a;
	exports.Autocomplete = index$b;
	exports.Avatar = index$c;
	exports.Badge = index$d;
	exports.Bar = index$e;
	exports.Toast = index$f;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
