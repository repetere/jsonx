"use strict";
exports.__esModule = true;
var main_1 = require("./main");
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
exports.getChildrenProperty = getChildrenProperty;
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
                    style: {}
                }, childjsonx.props, { key: renderIndex + Math.random() })
        })
        : childjsonx;
}
exports.getChildrenProps = getChildrenProps;
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
        jsonx.children = getChildrenProperty({ jsonx: jsonx, props: props_1 });
        props_1._children = undefined;
        delete props_1._children;
        return (jsonx.children && Array.isArray(jsonx.children) && typeof jsonx.children !== 'string')
            ? jsonx.children.map(function (childjsonx) { return main_1.getReactElementFromJSONX.call(_this, getChildrenProps({ jsonx: jsonx, childjsonx: childjsonx, props: props_1, renderIndex: renderIndex }), resources); })
            : jsonx.children;
    }
    catch (e) {
        logError(e);
        return null;
    }
}
exports.getJSONXChildren = getJSONXChildren;
