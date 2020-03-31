var Spectre = (function (exports, React) {
	'use strict';

	React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

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

	const _jsxFileName = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/typography/src/Heading.js";
	/**
	 * The Heading component.
	 */
	const Heading = ({ children, ...props }) => {
	  const { tag: Component, contents, label, ...otherProps } = props;
	  return (
	    React.createElement(Component, { ...otherProps, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 11}}
	      , children || contents, " " , label && React.createElement(Label, { contents: label, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 12}} )
	    )
	  )
	};

	Heading.propTypes = {
	  tag: propTypes.string,
	  children: propTypes.any,
	  contents: propTypes.any,
	  label: propTypes.any
	};

	/**
	 * The Label component.
	 */
	const Label = ({ children, ...props }) => {
	  const { contents, className, ...otherProps } = props;
	  return (
	    React.createElement('small', { className: classnames('label', className), ...otherProps, __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 30}}
	      , children || contents
	    )
	  )
	};

	Label.propTypes = {
	  children: propTypes.any,
	  contents: propTypes.any,
	  className: propTypes.any
	};

	/**
	 * The Headings components.
	 */

	const H1 = props => React.createElement(Heading, { ...props, tag: "h1", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 46}} );
	const H2 = props => React.createElement(Heading, { ...props, tag: "h2", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 47}} );
	const H3 = props => React.createElement(Heading, { ...props, tag: "h3", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 48}} );
	const H4 = props => React.createElement(Heading, { ...props, tag: "h4", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 49}} );
	const H5 = props => React.createElement(Heading, { ...props, tag: "h5", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 50}} );
	const H6 = props => React.createElement(Heading, { ...props, tag: "h6", __self: undefined, __source: {fileName: _jsxFileName, lineNumber: 51}} );

	H1.propTypes = H2.propTypes = H3.propTypes = H4.propTypes = H5.propTypes = H6.propTypes = {
	  children: propTypes.any,
	  contents: propTypes.any,
	  label: propTypes.any
	};

	H1.Label = H2.Label = H3.Label = H4.Label = H5.Label = H6.Label = Label;

	var index = /*#__PURE__*/Object.freeze({
		__proto__: null,
		H1: H1,
		H2: H2,
		H3: H3,
		H4: H4,
		H5: H5,
		H6: H6,
		Label: Label
	});

	const _jsxFileName$1 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/table/src/Table.js";
	const Table = ({ children, ...props }) => {
	  const { className, striped, hover, scroll, ...otherProps } = props;

	  const classNames = classnames('table', className, {
	    'table-striped': striped,
	    'table-hover': hover,
	    'table-scroll': scroll
	  });

	  return (
	    React.createElement('table', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 15}}
	      , children
	    )
	  )
	};

	Table.propTypes = {
	  children: propTypes.any,
	  className: propTypes.any,
	  striped: propTypes.bool,
	  hover: propTypes.bool,
	  scroll: propTypes.bool
	};

	const Header = ({ children, ...props }) => React.createElement('thead', { ...props, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 29}}, children);

	Header.propTypes = {
	  children: propTypes.any
	};

	const Body = ({ children, ...props }) => React.createElement('tbody', { ...props, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 35}}, children);

	Body.propTypes = {
	  children: propTypes.any
	};

	const Row = ({ children, ...props }) => {
	  const { className, active, ...otherProps } = props;

	  const classNames = classnames(className, { active: active });

	  return (
	    React.createElement('tr', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 47}}
	      , children
	    )
	  )
	};

	Row.propTypes = {
	  children: propTypes.any,
	  className: propTypes.any,
	  active: propTypes.bool
	};

	const Heading$1 = ({ children, ...props }) => React.createElement('th', { ...props, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 59}}, children);

	Heading$1.propTypes = {
	  children: propTypes.any
	};

	const Cell = ({ children, ...props }) => React.createElement('td', { ...props, __self: undefined, __source: {fileName: _jsxFileName$1, lineNumber: 65}}, children);

	Cell.propTypes = {
	  children: propTypes.any
	};

	Table.Header = Header;
	Table.Body = Body;
	Table.Row = Row;
	Table.Heading = Heading$1;
	Table.Cell = Cell;

	var index$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Table: Table,
		Header: Header,
		Body: Body,
		Row: Row,
		Heading: Heading$1,
		Cell: Cell
	});

	const _jsxFileName$2 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/button/src/Button.js";
	const Button = ({ children, ...props }) => {
	  const {
	    className,

	    // Styles.
	    primary,
	    link,

	    // Colors
	    success,
	    error,

	    // Sizes
	    block,
	    small,
	    large,
	    action,
	    circle,

	    // States
	    active,
	    loading,
	    ...otherProps
	  } = props;

	  const classNames = classnames(
	    'btn',
	    {
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
	    },
	    className
	  );

	  return (
	    React.createElement('button', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$2, lineNumber: 49}}
	      , children
	    )
	  )
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

	const Group = ({ children, ...props }) => {
	  const { block, ...otherProps } = props;
	  const classNames = classnames('btn-group', { 'btn-group-block': block });

	  return (
	    React.createElement('div', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$2, lineNumber: 76}}
	      , children
	    )
	  )
	};

	Group.propTypes = {
	  children: propTypes.any,
	  block: propTypes.bool
	};

	Button.Group = Group;

	var index$2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Button: Button,
		Group: Group
	});

	const _jsxFileName$3 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/Radio.js";
	const Radio = props => {
	  const { className, label, ...otherProps } = props;
	  const classNames = classnames('form-radio', className);

	  return (
	    React.createElement('label', { className: classNames, __self: undefined, __source: {fileName: _jsxFileName$3, lineNumber: 10}}
	      , React.createElement('input', { ...otherProps, type: "radio", __self: undefined, __source: {fileName: _jsxFileName$3, lineNumber: 11}} )
	      , React.createElement('i', { className: "form-icon", __self: undefined, __source: {fileName: _jsxFileName$3, lineNumber: 12}} ), " " , label
	    )
	  )
	};

	Radio.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

	const _jsxFileName$4 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/FormGroup.js";
	const FormGroup = props => {
	  const { children, className, label, id, ...otherProps } = props;
	  const classNames = classnames('form-group', className);

	  return (
	    React.createElement('div', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$4, lineNumber: 10}}
	      , label && (
	        React.createElement('label', { className: "form-label", htmlFor: id, __self: undefined, __source: {fileName: _jsxFileName$4, lineNumber: 12}}
	          , label
	        )
	      )
	      , children
	    )
	  )
	};

	FormGroup.propTypes = {
	  children: propTypes.node.isRequired,
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	const _jsxFileName$5 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/Input.js";
	const Input = props => {
	  const { className, label, id, ...otherProps } = props;
	  const formGroupProps = { label, id };
	  const inputProps = { id, ...otherProps };
	  const classNames = classnames('form-input', className);

	  return (
	    React.createElement(FormGroup, { ...formGroupProps, __self: undefined, __source: {fileName: _jsxFileName$5, lineNumber: 13}}
	      , React.createElement('input', { ...inputProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$5, lineNumber: 14}} )
	    )
	  )
	};

	Input.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	const _jsxFileName$6 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/Select.js";
	const Select = props => {
	  const { children, className, label, id, ...otherProps } = props;
	  const formGroupProps = { label, id };
	  const inputProps = { id, ...otherProps };
	  const classNames = classnames('form-select', className);

	  return (
	    React.createElement(FormGroup, { ...formGroupProps, __self: undefined, __source: {fileName: _jsxFileName$6, lineNumber: 13}}
	      , React.createElement('select', { ...inputProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$6, lineNumber: 14}}
	        , children
	      )
	    )
	  )
	};

	Select.propTypes = {
	  children: propTypes.oneOf([
	    propTypes.node,
	    propTypes.arrayOf(propTypes.node)
	  ]),
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	const _jsxFileName$7 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/Switch.js";
	const Switch = props => {
	  const { className, label, ...otherProps } = props;
	  const classNames = classnames('form-switch', className);

	  return (
	    React.createElement('label', { className: classNames, __self: undefined, __source: {fileName: _jsxFileName$7, lineNumber: 10}}
	      , React.createElement('input', { ...otherProps, type: "checkbox", __self: undefined, __source: {fileName: _jsxFileName$7, lineNumber: 11}} )
	      , React.createElement('i', { className: "form-icon", __self: undefined, __source: {fileName: _jsxFileName$7, lineNumber: 12}} ), " " , label
	    )
	  )
	};

	Switch.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

	const _jsxFileName$8 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/CheckBox.js";
	const CheckBox = props => {
	  const { className, label, ...otherProps } = props;
	  const classNames = classnames('form-checkbox', className);

	  return (
	    React.createElement('label', { className: classNames, __self: undefined, __source: {fileName: _jsxFileName$8, lineNumber: 10}}
	      , React.createElement('input', { ...otherProps, type: "checkbox", __self: undefined, __source: {fileName: _jsxFileName$8, lineNumber: 11}} )
	      , React.createElement('i', { className: "form-icon", __self: undefined, __source: {fileName: _jsxFileName$8, lineNumber: 12}} ), " " , label
	    )
	  )
	};

	CheckBox.propTypes = {
	  className: propTypes.string,
	  label: propTypes.string
	};

	const _jsxFileName$9 = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/form/src/TextArea.js";
	const TextArea = props => {
	  const { children, className, label, id, ...otherProps } = props;
	  const formGroupProps = { label, id };
	  const inputProps = { id, ...otherProps };
	  const classNames = classnames('form-input', className);

	  return (
	    React.createElement(FormGroup, { ...formGroupProps, __self: undefined, __source: {fileName: _jsxFileName$9, lineNumber: 13}}
	      , React.createElement('textarea', { ...inputProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$9, lineNumber: 14}}
	        , children
	      )
	    )
	  )
	};

	TextArea.propTypes = {
	  children: propTypes.string,
	  className: propTypes.string,
	  label: propTypes.string,
	  id: propTypes.string
	};

	var index$3 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Radio: Radio,
		Input: Input,
		Select: Select,
		Switch: Switch,
		CheckBox: CheckBox,
		TextArea: TextArea,
		FormGroup: FormGroup
	});

	const _jsxFileName$a = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/icon/src/Icon.js";
	/**
	 * The Icon component.
	 */
	const Icon = props => {
	  const { className, name, size, ...otherProps } = props;

	  const classNames = classnames(className, 'icon', `icon-${name}`, {
	    'icon-2x': size === '2x',
	    'icon-3x': size === '3x',
	    'icon-4x': size === '4x'
	  });

	  return React.createElement('i', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$a, lineNumber: 17}} )
	};

	Icon.propTypes = {
	  className: propTypes.string,
	  name: propTypes.string,
	  size: propTypes.string
	};

	var index$4 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Icon: Icon
	});

	const _jsxFileName$b = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/label/src/Label.js";
	const Label$1 = ({ children, ...props }) => {
	  const {
	    // Colors.
	    primary,
	    secondary,
	    success,
	    warning,
	    error,
	    // Styles.
	    rounded,
	    // Modifiers.
	    small,
	    // Remaining props to transfer.
	    ...otherProps
	  } = props;

	  const classNames = classnames('label', {
	    'label-primary': primary,
	    'label-secondary': secondary,
	    'label-success': success,
	    'label-warning': warning,
	    'label-error': error,
	    'label-rounded': rounded
	  });

	  const Element = small ? 'small' : 'span';

	  return (
	    React.createElement(Element, { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$b, lineNumber: 33}}
	      , children
	    )
	  )
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
		__proto__: null,
		Label: Label$1
	});

	const _jsxFileName$c = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/media/src/Image.js";
	/**
	 * The Image component.
	 */
	const Image = props => {
	  const { responsive, contain, cover, ...otherProps } = props;

	  // Prepare class names.
	  const classNames = classnames({
	    'img-responsive': responsive,
	    'img-fit-contain': contain,
	    'img-fit-cover': cover
	  });

	  return React.createElement('img', { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$c, lineNumber: 18}} )
	};

	Image.propTypes = {
	  responsive: propTypes.bool,
	  contain: propTypes.bool,
	  cover: propTypes.bool
	};

	const _jsxFileName$d = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/media/src/Video.js";
	/**
	 * The Video Container component.
	 */
	const VideoContainer = ({ children, ...props }) => {
	  const { tag: Element, responsive, ...otherProps } = props;

	  // Prepare class names.
	  const classNames = classnames({
	    'video-responsive': responsive, // 16:9
	    'video-responsive-1-1': responsive === '1:1',
	    'video-responsive-4-3': responsive === '4:3'
	  });

	  return (
	    React.createElement(Element, { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$d, lineNumber: 19}}
	      , children
	    )
	  )
	};

	const Video = props => React.createElement(VideoContainer, { ...props, tag: "video", __self: undefined, __source: {fileName: _jsxFileName$d, lineNumber: 25}} );
	const Container = props => React.createElement(VideoContainer, { ...props, tag: "div", __self: undefined, __source: {fileName: _jsxFileName$d, lineNumber: 26}} );

	VideoContainer.propTypes = Video.propTypes = Container.propTypes = {
	  children: propTypes.node,
	  responsive: propTypes.oneOfType([
	    propTypes.bool,
	    propTypes.oneOf(['1:1', '4:3', '16:9'])
	  ])
	};

	Video.Container = Container;

	const _jsxFileName$e = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/media/src/Figure.js";
	/**
	 * The Figure component.
	 */
	const Figure = ({ children, ...props }) => {
	  const { className, caption, captionAlignment, ...otherProps } = props;

	  // Prepare class names.
	  const figureClassNames = classnames('figure', className);
	  const captionClassNames = classnames('figure-caption', {
	    'text-left': captionAlignment === 'left',
	    'text-center': captionAlignment === 'center',
	    'text-right': captionAlignment === 'right'
	  });

	  return (
	    React.createElement('figure', { ...otherProps, className: figureClassNames, __self: undefined, __source: {fileName: _jsxFileName$e, lineNumber: 20}}
	      , children
	      , caption && (
	        React.createElement('figcaption', { className: captionClassNames, __self: undefined, __source: {fileName: _jsxFileName$e, lineNumber: 23}}, caption)
	      )
	    )
	  )
	};

	Figure.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  caption: propTypes.string,
	  captionAlignment: propTypes.oneOf(['left', 'center', 'right'])
	};

	var index$6 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Image: Image,
		Video: Video,
		Container: Container,
		Figure: Figure
	});

	var grid = createCommonjsModule(function (module, exports) {
	function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React$1=_interopDefault(React),PropTypes=_interopDefault(propTypes),classnames$1=_interopDefault(classnames),_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);}return e},objectWithoutProperties=function(e,r){var s={};for(var o in e)r.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(s[o]=e[o]);return s},Col=function(e){var r,s,o,t,a,n,p=e.children,l=objectWithoutProperties(e,["children"]),c=l.className,i=objectWithoutProperties(l,["className"]),u=(s=(r=i).all,o=r.offset,t=r.hide,a=r.show,n=[],s?n.push("col-"+s):n.push(["xs","sm","md","lg","xl"].reduce(function(e,s){return r[s]?classnames$1(e,"col-"+s+"-"+r[s]):e},"")),o&&n.push("col-"+o+"-auto"),t&&n.push(classnames$1(t.map(function(e){return "hide-"+e}))),a&&n.push(classnames$1(a.map(function(e){return "show-"+e}))),n),m=classnames$1("column",u,c);return React$1.createElement("div",{className:m},p)};Col.propTypes={children:PropTypes.any,className:PropTypes.string,xs:PropTypes.number,sm:PropTypes.number,md:PropTypes.number,lg:PropTypes.number,xl:PropTypes.number,all:PropTypes.number,offset:PropTypes.string,hide:PropTypes.array,show:PropTypes.array};var Row=function(e){var r=e.children,s=objectWithoutProperties(e,["children"]),o=s.className,t=s.gapless,a=s.oneline,n=objectWithoutProperties(s,["className","gapless","oneline"]),p=classnames$1("columns",{"col-gapless":t,"col-oneline":a},o);return React$1.createElement("div",_extends({className:p},n),r)};Row.propTypes={children:PropTypes.any,className:PropTypes.string,gapless:PropTypes.bool,oneline:PropTypes.bool};var Grid=function(e){var r=e.children,s=objectWithoutProperties(e,["children"]),o=s.className,t=objectWithoutProperties(s,["className"]),a=classnames$1("container",o);return React$1.createElement("div",_extends({className:a},t),r)};Grid.propTypes={children:PropTypes.any,className:PropTypes.string},exports.Col=Col,exports.Row=Row,exports.Grid=Grid;

	});

	unwrapExports(grid);
	var grid_1 = grid.Col;
	var grid_2 = grid.Row;
	var grid_3 = grid.Grid;

	var navbar = createCommonjsModule(function (module, exports) {
	function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React$1=_interopDefault(React),PropTypes=_interopDefault(propTypes),classnames$1=_interopDefault(classnames),_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);}return e},objectWithoutProperties=function(e,r){var t={};for(var a in e)r.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},Section=function(e){var r=e.children,t=objectWithoutProperties(e,["children"]),a=t.className,n=t.center,s=objectWithoutProperties(t,["className","center"]),o=classnames$1({"navbar-section":!n,"navbar-center":n},a);return React$1.createElement("section",_extends({className:o},s),r)};Section.propTypes={children:PropTypes.any,className:PropTypes.string,center:PropTypes.bool};var Brand=function(e){var r=e.children,t=objectWithoutProperties(e,["children"]),a=t.className,n=t.href,s=objectWithoutProperties(t,["className","href"]),o=classnames$1("navbar-brand",a);return React$1.createElement("a",_extends({href:n||"#",className:o},s),r)};Brand.propTypes={children:PropTypes.any,className:PropTypes.string,href:PropTypes.string};var Navbar=function(e){var r=e.children,t=objectWithoutProperties(e,["children"]),a=t.className,n=objectWithoutProperties(t,["className"]),s=classnames$1("navbar",a);return React$1.createElement("header",_extends({className:s},n),r)};Navbar.propTypes={children:PropTypes.any,className:PropTypes.string},Navbar.Section=Section,Navbar.Brand=Brand,exports.Navbar=Navbar,exports.Section=Section,exports.Brand=Brand;

	});

	unwrapExports(navbar);
	var navbar_1 = navbar.Navbar;
	var navbar_2 = navbar.Section;
	var navbar_3 = navbar.Brand;

	var index$7 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Grid: grid_3,
		Row: grid_2,
		Col: grid_1,
		Navbar: navbar_1,
		Section: navbar_2,
		Brand: navbar_3
	});

	const _jsxFileName$f = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/grid/src/Col.js";
	const Col = ({ children, ...props }) => {
	  const getColumnClasses = componentProps => {
	    const { all, offset, hide, show } = componentProps;
	    const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
	    const classes = [];
	    const colPrefix = 'col';

	    if (all) {
	      classes.push(`${colPrefix}-${all}`);
	    } else {
	      classes.push(
	        colSizes.reduce((sizes, size) => {
	          if (!componentProps[size]) return sizes
	          return classnames(
	            sizes,
	            `${colPrefix}-${size}-${componentProps[size]}`
	          )
	        }, '')
	      );
	    }

	    if (offset) classes.push(`${colPrefix}-${offset}-auto`);
	    if (hide) classes.push(classnames(hide.map(size => `hide-${size}`)));
	    if (show) classes.push(classnames(show.map(size => `show-${size}`)));

	    return classes
	  };

	  const { className, ...otherProps } = props;
	  const classes = getColumnClasses(otherProps);
	  const classNames = classnames('column', classes, className);

	  return React.createElement('div', { className: classNames, __self: undefined, __source: {fileName: _jsxFileName$f, lineNumber: 37}}, children)
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

	const _jsxFileName$g = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/grid/src/Row.js";
	const Row$1 = ({ children, ...props }) => {
	  const { className, gapless, oneline, ...otherProps } = props;
	  const classNames = classnames(
	    'columns',
	    {
	      'col-gapless': gapless,
	      'col-oneline': oneline
	    },
	    className
	  );

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$g, lineNumber: 17}}
	      , children
	    )
	  )
	};

	Row$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  gapless: propTypes.bool,
	  oneline: propTypes.bool
	};

	const _jsxFileName$h = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/grid/src/Grid.js";
	const Grid = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('container', className);
	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$h, lineNumber: 9}}
	      , children
	    )
	  )
	};

	Grid.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var index$8 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Col: Col,
		Row: Row$1,
		Grid: Grid
	});

	const _jsxFileName$i = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/navbar/src/Section.js";
	const Section = ({ children, ...props }) => {
	  const { className, center, ...otherProps } = props;
	  const classNames = classnames(
	    {
	      'navbar-section': !center,
	      'navbar-center': center
	    },
	    className
	  );

	  return (
	    React.createElement('section', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$i, lineNumber: 16}}
	      , children
	    )
	  )
	};

	Section.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  center: propTypes.bool
	};

	const _jsxFileName$j = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/navbar/src/Brand.js";
	const Brand = ({ children, ...props }) => {
	  const { className, href, ...otherProps } = props;
	  const classNames = classnames('navbar-brand', className);

	  return (
	    React.createElement('a', { href: href || '#', className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$j, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Brand.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  href: propTypes.string
	};

	const _jsxFileName$k = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/navbar/src/Navbar.js";
	const Navbar = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('navbar', className);

	  return (
	    React.createElement('header', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$k, lineNumber: 12}}
	      , children
	    )
	  )
	};

	Navbar.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	Navbar.Section = Section;
	Navbar.Brand = Brand;

	var index$9 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Navbar: Navbar,
		Section: Section,
		Brand: Brand
	});

	const _jsxFileName$l = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/accordion/src/Header.js";
	const Header$1 = ({ children, ...props }) => {
	  const { className, id } = props;
	  const classNames = classnames('accordion-header c-hand', className);

	  return (
	    React.createElement(React.Fragment, {__self: undefined, __source: {fileName: _jsxFileName$l, lineNumber: 10}}
	      , React.createElement('input', { type: "checkbox", id: id, hidden: true, __self: undefined, __source: {fileName: _jsxFileName$l, lineNumber: 11}} )
	      , React.createElement('label', { className: classNames, htmlFor: id, __self: undefined, __source: {fileName: _jsxFileName$l, lineNumber: 12}}
	        , children
	      )
	    )
	  )
	};

	Header$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  id: propTypes.string
	};

	const _jsxFileName$m = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/accordion/src/Body.js";
	const Body$1 = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('accordion-body', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$m, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Body$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$n = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/accordion/src/Accordion.js";
	const Accordion = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('accordion', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$n, lineNumber: 12}}
	      , children
	    )
	  )
	};

	Accordion.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	Accordion.Body = Body$1;
	Accordion.Header = Header$1;

	var index$a = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Accordion: Accordion,
		Header: Header$1,
		Body: Body$1
	});

	const _jsxFileName$o = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/autocomplete/src/Input.js";
	const Input$1 = ({ children, ...props }) => {
	  const { className, focus, ...otherProps } = props;
	  const classNames = classnames(
	    'form-autocomplete-input',
	    {
	      'is-focused': focus
	    },
	    className
	  );

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$o, lineNumber: 16}}
	      , children
	    )
	  )
	};

	Input$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  focus: propTypes.bool
	};

	const _jsxFileName$p = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/autocomplete/src/Menu.js";
	const Menu = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('menu', className);

	  return (
	    React.createElement('ul', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$p, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Menu.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$q = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/autocomplete/src/Autocomplete.js";
	const Autocomplete = ({ children, ...props }) => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('form-autocomplete', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$q, lineNumber: 12}}
	      , children
	    )
	  )
	};

	Autocomplete.Input = Input$1;
	Autocomplete.Menu = Menu;

	Autocomplete.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	var index$b = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Autocomplete: Autocomplete,
		Input: Input$1,
		Menu: Menu
	});

	const _jsxFileName$r = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/avatar/src/Icon.js";
	const Icon$1 = props => {
	  const { className, ...otherProps } = props;
	  const classNames = classnames('avatar-icon', className);

	  return React.createElement('img', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$r, lineNumber: 9}} )
	};

	Icon$1.propTypes = {
	  className: propTypes.string
	};

	const _jsxFileName$s = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/avatar/src/Presence.js";
	const Presence = props => {
	  const { className, online, busy, away, ...otherProps } = props;
	  const classNames = classnames(
	    'avatar-presence',
	    {
	      online: online,
	      busy: busy,
	      away: away
	    },
	    className
	  );

	  return React.createElement('i', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$s, lineNumber: 17}} )
	};

	Presence.propTypes = {
	  className: propTypes.string,
	  online: propTypes.bool,
	  busy: propTypes.bool,
	  away: propTypes.bool
	};

	const _jsxFileName$t = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/avatar/src/Avatar.js";
	const Avatar = ({ children, ...props }) => {
	  const { className, src, initial, icon, xs, sm, lg, xl, ...otherProps } = props;
	  const imageNode = src && React.createElement('img', { src: src, __self: undefined, __source: {fileName: _jsxFileName$t, lineNumber: 9}} );
	  const iconNode = icon && React.createElement(Icon$1, { src: src, __self: undefined, __source: {fileName: _jsxFileName$t, lineNumber: 10}} );
	  const classNames = classnames(
	    'avatar',
	    {
	      'avatar-xl': xl,
	      'avatar-lg': lg,
	      'avatar-sm': sm,
	      'avatar-xs': xs
	    },
	    className
	  );

	  return (
	    React.createElement('figure', { className: classNames, 'data-initial': initial, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$t, lineNumber: 23}}
	      , children
	      , imageNode
	      , iconNode
	    )
	  )
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
		__proto__: null,
		Avatar: Avatar,
		Icon: Icon$1,
		Presence: Presence
	});

	const _jsxFileName$u = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/badge/src/Badge.js";
	const Badge = ({ children, label }) => {
	  function addPropsToChildren(child) {
	    const className = classnames('badge', child.props.className);
	    const props = {
	      className,
	      'data-badge': label && label >= 0 ? label : ''
	    };

	    return React.cloneElement(child, props)
	  }

	  return (
	    React.createElement(React.Fragment, {__self: undefined, __source: {fileName: _jsxFileName$u, lineNumber: 17}}
	      , React.Children.map(children, addPropsToChildren)
	    )
	  )
	};

	Badge.propTypes = {
	  children: propTypes.any,
	  label: propTypes.number
	};

	var index$d = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Badge: Badge
	});

	const _jsxFileName$v = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/bar/src/Bar/Item.js";
	/**
	 * The Item component.
	 */
	const Item = ({ children, ...props }) => {
	  const { className, progress, style, ...otherProps } = props;

	  // Prepare class names.
	  const classNames = classnames('bar-item', className);

	  // Prepare style.
	  const styles = { ...style, width: `${progress}%` };

	  return (
	    React.createElement('div', {
	      ...otherProps,
	      className: classNames,
	      role: "progressbar",
	      style: styles, __self: undefined, __source: {fileName: _jsxFileName$v, lineNumber: 18}}
	    
	      , children
	    )
	  )
	};

	Item.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  progress: propTypes.number,
	  style: propTypes.object
	};

	const _jsxFileName$w = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/bar/src/Bar/Bar.js";
	/**
	 * The Bar component.
	 */
	const Bar = ({ children, ...props }) => {
	  const { className, small, progress } = props;

	  // Prepare class names.
	  const classNames = classnames('bar', className, {
	    'bar-sm': small
	  });

	  return (
	    React.createElement('div', { className: classNames, __self: undefined, __source: {fileName: _jsxFileName$w, lineNumber: 18}}
	      , progress === undefined || children !== undefined ? (
	        children
	      ) : (
	        React.createElement(Item, { progress: progress, __self: undefined, __source: {fileName: _jsxFileName$w, lineNumber: 22}} )
	      )
	    )
	  )
	};

	Bar.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  small: propTypes.bool,
	  progress: propTypes.number
	};

	// Create alias of Item component inside Bar component.
	Bar.Item = Item;

	const _jsxFileName$x = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/bar/src/Slider/Item.js";
	/**
	 * The Item component.
	 */
	const Item$1 = props => {
	  const { className, progress, style, ...otherProps } = props;

	  // Prepare class names.
	  const classNames = classnames('bar-item', className);

	  // Prepare style.
	  const styles = { ...style, width: `${progress}%` };

	  return (
	    React.createElement('div', {
	      ...otherProps,
	      className: classNames,
	      role: "progressbar",
	      style: styles, __self: undefined, __source: {fileName: _jsxFileName$x, lineNumber: 18}}
	    
	      , React.createElement('button', { className: "bar-slider-btn btn" , role: "slider", __self: undefined, __source: {fileName: _jsxFileName$x, lineNumber: 24}} )
	    )
	  )
	};

	Item$1.propTypes = {
	  className: propTypes.string,
	  progress: propTypes.number,
	  style: propTypes.object
	};

	const _jsxFileName$y = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/bar/src/Slider/Slider.js";
	/**
	 * The Slider component.
	 */
	const Slider = ({ children, ...props }) => {
	  const { className, progress, ...otherProps } = props;

	  // Prepare class names.
	  const classNames = classnames('bar-slider', className);

	  return (
	    React.createElement(Bar, { ...otherProps, className: classNames, __self: undefined, __source: {fileName: _jsxFileName$y, lineNumber: 17}}
	      , progress === undefined || children !== undefined ? (
	        children
	      ) : (
	        React.createElement(Item$1, { progress: progress, __self: undefined, __source: {fileName: _jsxFileName$y, lineNumber: 21}} )
	      )
	    )
	  )
	};

	Slider.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string,
	  progress: propTypes.oneOfType(propTypes.string, propTypes.number)
	};

	// Create alias of Item component inside Slider component.
	Slider.Item = Item$1;

	var index$e = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Bar: Bar,
		Slider: Slider
	});

	const _jsxFileName$z = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/@react-spectre/toast/src/Toast.js";
	const Toast = ({
	  className,
	  primary,
	  success,
	  warning,
	  error,
	  children,
	  ...props
	}) => {
	  const base = 'toast';
	  const composeVariantClass = variant => `toast-${variant}`;
	  const classNames = classnames(base, className, {
	    [composeVariantClass('primary')]: primary,
	    [composeVariantClass('success')]: success,
	    [composeVariantClass('warning')]: warning,
	    [composeVariantClass('error')]: error
	  });
	  return (
	    React.createElement('div', { className: classNames, ...props, __self: undefined, __source: {fileName: _jsxFileName$z, lineNumber: 23}}
	      , children
	    )
	  )
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
		__proto__: null,
		Toast: Toast
	});

	const _jsxFileName$A = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Header/Header.js";
	const Header$2 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('card-header', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$A, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Header$2.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	const _jsxFileName$B = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Header/Title.js";
	const Title = props => {
	  const { children, h1, h2, h3, h4, h5, h6, className, ...otherProps } = props;
	  const classNames = classnames(
	    'card-title',
	    {
	      h1: h1,
	      h2: h2,
	      h3: h3,
	      h4: h4,
	      h5: h5,
	      h6: h6
	    },
	    className
	  );

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$B, lineNumber: 21}}
	      , children
	    )
	  )
	};

	Title.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  h1: propTypes.bool,
	  h2: propTypes.bool,
	  h3: propTypes.bool,
	  h4: propTypes.bool,
	  h5: propTypes.bool,
	  h6: propTypes.bool
	};

	const _jsxFileName$C = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Header/SubTitle.js";
	const SubTitle = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('card-subtitle text-gray', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$C, lineNumber: 10}}
	      , children
	    )
	  )
	};

	SubTitle.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$D = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Body.js";
	const Body$2 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('card-body', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$D, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Body$2.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$E = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Image.js";
	const Image$1 = props => {
	  const { src, ...otherProps } = props;
	  const wrapperClassName = classnames('card-image');

	  return (
	    React.createElement('div', { className: wrapperClassName, __self: undefined, __source: {fileName: _jsxFileName$E, lineNumber: 10}}
	      , React.createElement('img', { src: src, className: "img-responsive", ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$E, lineNumber: 11}} )
	    )
	  )
	};

	Image$1.propTypes = {
	  src: propTypes.string
	};

	const _jsxFileName$F = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Footer.js";
	const Footer = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('card-footer', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$F, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Footer.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$G = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/card/src/Card.js";
	const Card = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('card', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$G, lineNumber: 14}}
	      , children
	    )
	  )
	};

	Card.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	Card.Header = Header$2;
	Card.Title = Title;
	Card.SubTitle = SubTitle;
	Card.Body = Body$2;
	Card.Image = Image$1;
	Card.Footer = Footer;

	const _jsxFileName$H = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Header/Header.js";
	const Header$3 = props => {
	  const { children, className, center, right, ...otherProps } = props;
	  const classNames = classnames(
	    'panel-header',
	    { 'text-center': center },
	    { 'text-right': right },
	    className
	  );

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$H, lineNumber: 15}}
	      , children
	    )
	  )
	};

	Header$3.propTypes = {
	  children: propTypes.node,
	  center: propTypes.string,
	  right: propTypes.string,
	  className: propTypes.string
	};

	const _jsxFileName$I = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Header/Title.js";
	const Title$1 = props => {
	  const { children, h1, h2, h3, h4, h5, h6, className, ...otherProps } = props;
	  const classNames = classnames(
	    'panel-title',
	    {
	      h1: h1,
	      h2: h2,
	      h3: h3,
	      h4: h4,
	      h5: h5,
	      h6: h6
	    },
	    className
	  );

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$I, lineNumber: 21}}
	      , children
	    )
	  )
	};

	Title$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string,
	  h1: propTypes.bool,
	  h2: propTypes.bool,
	  h3: propTypes.bool,
	  h4: propTypes.bool,
	  h5: propTypes.bool,
	  h6: propTypes.bool
	};

	const _jsxFileName$J = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Body.js";
	const Body$3 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('panel-body', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$J, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Body$3.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$K = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Footer.js";
	const Footer$1 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('panel-footer', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$K, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Footer$1.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$L = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Nav.js";
	const Nav = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('panel-nav', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$L, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Nav.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const _jsxFileName$M = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/panel/src/Panel.js";
	const Panel = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('panel', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$M, lineNumber: 14}}
	      , children
	    )
	  )
	};

	Panel.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	Panel.Header = Header$3;
	Panel.Title = Title$1;
	Panel.Body = Body$3;
	Panel.Footer = Footer$1;
	Panel.Nav = Nav;

	const _jsxFileName$N = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/step/src/Step.js";
	const Step = ({ children, className, ...props }) => {
	  const classNames = classnames('step', className);
	  return (
	    React.createElement('ul', { className: classNames, ...props, __self: undefined, __source: {fileName: _jsxFileName$N, lineNumber: 8}}
	      , children
	    )
	  )
	};
	Step.propTypes = {
	  children: propTypes.any,
	  className: propTypes.string
	};

	const Item$2 = ({ children, className, active, ...props }) => {
	  const classNames = classnames('step-item', className, {
	    active
	  });
	  return (
	    React.createElement('li', { className: classNames, ...props, __self: undefined, __source: {fileName: _jsxFileName$N, lineNumber: 23}}
	      , children
	    )
	  )
	};
	Item$2.propTypes = {
	  children: propTypes.any,
	  active: propTypes.bool,
	  className: propTypes.string
	};

	Step.Item = Item$2;

	const _jsxFileName$O = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/popover/src/Popover.js";
	const Popover = ({ right, bottom, left, className, children, ...props }) => {
	  const classNames = classnames('popover', className, {
	    'popover-right': right,
	    'popover-left': left,
	    'popover-bottom': bottom
	  });
	  return (
	    React.createElement('div', { className: classNames, ...props, __self: undefined, __source: {fileName: _jsxFileName$O, lineNumber: 12}}
	      , children
	    )
	  )
	};
	Popover.propTypes = {
	  right: propTypes.bool,
	  left: propTypes.bool,
	  bottom: propTypes.bool,
	  className: propTypes.string,
	  children: propTypes.any
	};

	const Container$1 = ({ children, ...props }) => (
	  React.createElement('div', { className: "popover-container", ...props, __self: undefined, __source: {fileName: _jsxFileName$O, lineNumber: 26}}
	    , children
	  )
	);
	Container$1.propTypes = {
	  children: propTypes.any
	};

	Popover.Container = Container$1;

	const _jsxFileName$P = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/Icon.js";
	const Icon$2 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile-icon', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$P, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Icon$2.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	const _jsxFileName$Q = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/Action.js";
	const Action = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile-action', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$Q, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Action.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	const _jsxFileName$R = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/content/Title.js";
	const Title$2 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile-title', className);

	  return (
	    React.createElement('p', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$R, lineNumber: 10}}
	      , children
	    )
	  )
	};

	Title$2.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	const _jsxFileName$S = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/content/SubTitle.js";
	const SubTitle$1 = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile-subtitle', className);

	  return (
	    React.createElement('p', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$S, lineNumber: 10}}
	      , children
	    )
	  )
	};

	SubTitle$1.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	const _jsxFileName$T = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/content/Content.js";
	const Content = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile-content', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$T, lineNumber: 12}}
	      , children
	    )
	  )
	};

	Content.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	Content.Title = Title$2;
	Content.SubTitle = SubTitle$1;

	const _jsxFileName$U = "/Users/yawjosephetse/Developer/github/repetere/jsonx/node_modules/react-spectre/packages/tile/src/Tile.js";
	const Tile = props => {
	  const { children, className, ...otherProps } = props;
	  const classNames = classnames('tile', className);

	  return (
	    React.createElement('div', { className: classNames, ...otherProps, __self: undefined, __source: {fileName: _jsxFileName$U, lineNumber: 13}}
	      , children
	    )
	  )
	};

	Tile.propTypes = {
	  children: propTypes.node,
	  className: propTypes.string
	};

	Tile.Title = Title$2;
	Tile.SubTitle = SubTitle$1;
	Tile.Content = Content;
	Tile.Action = Action;
	Tile.Icon = Icon$2;

	//elements
	const Card$1 = Card;
	const Panel$1 = Panel;
	const Step$1 = Step;
	const Popover$1 = Popover;
	const Tile$1 = Tile;

	exports.Accordion = index$a;
	exports.Autocomplete = index$b;
	exports.Avatar = index$c;
	exports.Badge = index$d;
	exports.Bar = index$e;
	exports.Button = index$2;
	exports.Card = Card$1;
	exports.Form = index$3;
	exports.Grid = index$8;
	exports.Icon = index$4;
	exports.Label = index$5;
	exports.Layout = index$7;
	exports.Media = index$6;
	exports.Navbar = index$9;
	exports.Panel = Panel$1;
	exports.Popover = Popover$1;
	exports.Step = Step$1;
	exports.Table = index$1;
	exports.Tile = Tile$1;
	exports.Toast = index$f;
	exports.Typography = index;

	return exports;

}({}, React));
