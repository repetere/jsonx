"use strict";
exports.__esModule = true;
// import React, { createElement, } from 'react';
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var server_1 = require("react-dom/server");
var use_global_hook_1 = require("use-global-hook");
var jsonxComponents = require("./components");
var jsonxProps = require("./props");
var jsonxChildren = require("./children");
var jsonxUtils = require("./utils");
var createElement = react_1["default"].createElement;
var componentMap = jsonxComponents.componentMap, getComponentFromMap = jsonxComponents.getComponentFromMap, getBoundedComponents = jsonxComponents.getBoundedComponents, DynamicComponent = jsonxComponents.DynamicComponent;
var getComputedProps = jsonxProps.getComputedProps;
var getJSONXChildren = jsonxChildren.getJSONXChildren;
var displayComponent = jsonxUtils.displayComponent;
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
    var Render = portal ? react_dom_1["default"].createPortal : react_dom_1["default"].render;
    var RenderDOM = DOM || document.querySelector(querySelector);
    var JSONXReactElement = getReactElementFromJSONX.call(this || {}, jsonx, resources);
    if (!JSONXReactElement)
        throw ReferenceError("Invalid React Element");
    else if (!RenderDOM)
        throw ReferenceError("Invalid Render DOM Element");
    Render(JSONXReactElement, RenderDOM);
}
exports.jsonxRender = jsonxRender;
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
        ? server_1["default"].renderToString(getReactElementFromJSON.call(this || {}, { type: type, props: props, children: children }))
        : server_1["default"].renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
}
exports.outputHTML = outputHTML;
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
    if (jsonxUtils.validSimpleJSONXSyntax(jsonx))
        jsonx = jsonxUtils.simpleJSONXSyntax(jsonx);
    if (!jsonx.component)
        return createElement("span", {}, debug ? "Error: Missing Component Object" : "");
    try {
        var components = Object.assign({ DynamicComponent: DynamicComponent.bind(this) }, componentMap, this.reactComponents);
        var reactComponents = boundedComponents.length
            ? getBoundedComponents.call(this, {
                boundedComponents: boundedComponents,
                reactComponents: components
            })
            : components;
        exports.renderIndex++;
        var element = getComponentFromMap({
            jsonx: jsonx,
            reactComponents: reactComponents,
            componentLibraries: componentLibraries,
            debug: debug,
            logError: logError
        });
        var props = getComputedProps.call(this, {
            jsonx: jsonx,
            resources: resources,
            renderIndex: exports.renderIndex,
            componentLibraries: componentLibraries,
            debug: debug,
            logError: logError,
            disableRenderIndexKey: disableRenderIndexKey
        });
        var displayElement = jsonx.comparisonprops
            ? displayComponent.call(this, {
                jsonx: jsonx,
                props: props,
                renderIndex: exports.renderIndex,
                componentLibraries: componentLibraries,
                debug: debug
            })
            : true;
        if (displayElement) {
            var children = getJSONXChildren.call(this, {
                jsonx: jsonx,
                props: props,
                resources: resources,
                renderIndex: exports.renderIndex
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
exports.getReactElementFromJSONX = getReactElementFromJSONX;
exports.getRenderedJSON = getReactElementFromJSONX;
exports.getReactElement = getReactElementFromJSONX;
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
exports.getReactElementFromJSON = getReactElementFromJSON;
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
exports.compile = compile;
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
exports.outputJSX = outputJSX;
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
exports.outputJSON = outputJSON;
exports.jsonxHTMLString = outputHTML;
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
exports.jsonToJSX = jsonToJSX;
/**
 * Exposes react module used in JSONX
 * @returns {Object} React
 */
function __getReact() {
    return react_1["default"];
}
exports.__getReact = __getReact;
/**
 * Exposes react dom module used in JSONX
 * @returns {Object} ReactDOM
 */
function __getReactDOM() {
    return react_dom_1["default"];
}
exports.__getReactDOM = __getReactDOM;
/**
 * Exposes global hook used in JSONX
 * @returns {Object} useGlobalHook
 */
function __getUseGlobalHook() {
    return use_global_hook_1["default"];
}
exports.__getUseGlobalHook = __getUseGlobalHook;
exports._jsonxChildren = jsonxChildren;
exports._jsonxComponents = jsonxComponents;
exports._jsonxProps = jsonxProps;
exports._jsonxUtils = jsonxUtils;
var express_1 = require("./express");
exports.__express = express_1.__express;
exports.renderFile = express_1.__express;
exports["default"] = getReactElementFromJSONX;
