"use strict";
var jsonx = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // globals:react
  var require_react = __commonJS({
    "globals:react"(exports, module) {
      module.exports = React;
    }
  });

  // globals:react-dom
  var require_react_dom = __commonJS({
    "globals:react-dom"(exports, module) {
      module.exports = ReactDOM;
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (false) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js
  var require_react_dom_server_legacy_browser_development = __commonJS({
    "node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React6 = require_react();
          var ReactVersion = "18.2.0";
          var ReactSharedInternals = React6.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function scheduleWork(callback) {
            callback();
          }
          function beginWriting(destination) {
          }
          function writeChunk(destination, chunk) {
            writeChunkAndReturn(destination, chunk);
          }
          function writeChunkAndReturn(destination, chunk) {
            return destination.push(chunk);
          }
          function completeWriting(destination) {
          }
          function close(destination) {
            destination.push(null);
          }
          function stringToChunk(content) {
            return content;
          }
          function stringToPrecomputedChunk(content) {
            return content;
          }
          function closeWithError(destination, error2) {
            destination.destroy(error2);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e2) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkAttributeStringCoercion(value, attributeName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkCSSPropertyStringCoercion(value, propName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkHtmlStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED = 0;
          var STRING = 1;
          var BOOLEANISH_STRING = 2;
          var BOOLEAN = 3;
          var OVERLOADED_BOOLEAN = 4;
          var NUMERIC = 5;
          var POSITIVE_NUMERIC = 6;
          var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
          var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
          var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
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
              error("Invalid attribute name: `%s`", attributeName);
            }
            return false;
          }
          function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null && propertyInfo.type === RESERVED) {
              return false;
            }
            switch (typeof value) {
              case "function":
              case "symbol":
                return true;
              case "boolean": {
                if (isCustomComponentTag) {
                  return false;
                }
                if (propertyInfo !== null) {
                  return !propertyInfo.acceptsBooleans;
                } else {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  return prefix2 !== "data-" && prefix2 !== "aria-";
                }
              }
              default:
                return false;
            }
          }
          function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
          }
          function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
            this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
            this.attributeName = attributeName;
            this.attributeNamespace = attributeNamespace;
            this.mustUseProperty = mustUseProperty;
            this.propertyName = name;
            this.type = type;
            this.sanitizeURL = sanitizeURL2;
            this.removeEmptyString = removeEmptyString;
          }
          var properties = {};
          var reservedProps = [
            "children",
            "dangerouslySetInnerHTML",
            "defaultValue",
            "defaultChecked",
            "innerHTML",
            "suppressContentEditableWarning",
            "suppressHydrationWarning",
            "style"
          ];
          reservedProps.forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
          });
          [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
          });
          ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
          });
          [
            "allowFullScreen",
            "async",
            "autoFocus",
            "autoPlay",
            "controls",
            "default",
            "defer",
            "disabled",
            "disablePictureInPicture",
            "disableRemotePlayback",
            "formNoValidate",
            "hidden",
            "loop",
            "noModule",
            "noValidate",
            "open",
            "playsInline",
            "readOnly",
            "required",
            "reversed",
            "scoped",
            "seamless",
            "itemScope"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
          });
          [
            "checked",
            "multiple",
            "muted",
            "selected"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
          });
          [
            "capture",
            "download"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
          });
          [
            "cols",
            "rows",
            "size",
            "span"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
          });
          ["rowSpan", "start"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
          });
          var CAMELIZE = /[\-\:]([a-z])/g;
          var capitalize = function(token) {
            return token[1].toUpperCase();
          };
          [
            "accent-height",
            "alignment-baseline",
            "arabic-form",
            "baseline-shift",
            "cap-height",
            "clip-path",
            "clip-rule",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "dominant-baseline",
            "enable-background",
            "fill-opacity",
            "fill-rule",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "glyph-name",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "horiz-adv-x",
            "horiz-origin-x",
            "image-rendering",
            "letter-spacing",
            "lighting-color",
            "marker-end",
            "marker-mid",
            "marker-start",
            "overline-position",
            "overline-thickness",
            "paint-order",
            "panose-1",
            "pointer-events",
            "rendering-intent",
            "shape-rendering",
            "stop-color",
            "stop-opacity",
            "strikethrough-position",
            "strikethrough-thickness",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "underline-position",
            "underline-thickness",
            "unicode-bidi",
            "unicode-range",
            "units-per-em",
            "v-alphabetic",
            "v-hanging",
            "v-ideographic",
            "v-mathematical",
            "vector-effect",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "word-spacing",
            "writing-mode",
            "xmlns:xlink",
            "x-height"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          [
            "xlink:actuate",
            "xlink:arcrole",
            "xlink:role",
            "xlink:show",
            "xlink:title",
            "xlink:type"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
          });
          [
            "xml:base",
            "xml:lang",
            "xml:space"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
          });
          ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
          });
          var xlinkHref = "xlinkHref";
          properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
          ["src", "href", "action", "formAction"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
          });
          var isUnitlessNumber = {
            animationIterationCount: true,
            aspectRatio: true,
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
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix2, key) {
            return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ["Webkit", "ms", "Moz", "O"];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix2) {
              isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
            });
          });
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
                error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
              }
              if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
                error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
              }
            }
          }
          function isCustomComponent(tagName, props) {
            if (tagName.indexOf("-") === -1) {
              return typeof props.is === "string";
            }
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return false;
              default:
                return true;
            }
          }
          var ariaProperties = {
            "aria-current": 0,
            "aria-description": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
          };
          var warnedProperties = {};
          var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          function validateProperty(tagName, name) {
            {
              if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
                return true;
              }
              if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase();
                var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (correctName == null) {
                  error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                  warnedProperties[name] = true;
                  return true;
                }
                if (name !== correctName) {
                  error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
              if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase();
                var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (standardName == null) {
                  warnedProperties[name] = true;
                  return false;
                }
                if (name !== standardName) {
                  error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
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
              var unknownPropString = invalidProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (invalidProps.length === 1) {
                error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              } else if (invalidProps.length > 1) {
                error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
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
              if (type !== "input" && type !== "textarea" && type !== "select") {
                return;
              }
              if (props != null && props.value === null && !didWarnValueNull) {
                didWarnValueNull = true;
                if (type === "select" && props.multiple) {
                  error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
                } else {
                  error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
                }
              }
            }
          }
          var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            disablepictureinpicture: "disablePictureInPicture",
            disableremoteplayback: "disableRemotePlayback",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            enterkeyhint: "enterKeyHint",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            imagesizes: "imageSizes",
            imagesrcset: "imageSrcSet",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
          };
          var validateProperty$1 = function() {
          };
          {
            var warnedProperties$1 = {};
            var EVENT_NAME_REGEX = /^on./;
            var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
            var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
            var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
            validateProperty$1 = function(tagName, name, value, eventRegistry) {
              if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
                return true;
              }
              var lowerCasedName = name.toLowerCase();
              if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
                error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (eventRegistry != null) {
                var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
                if (registrationNameDependencies.hasOwnProperty(name)) {
                  return true;
                }
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (registrationName != null) {
                  error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                  warnedProperties$1[name] = true;
                  return true;
                }
                if (EVENT_NAME_REGEX.test(name)) {
                  error("Unknown event handler property `%s`. It will be ignored.", name);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (EVENT_NAME_REGEX.test(name)) {
                if (INVALID_EVENT_NAME_REGEX.test(name)) {
                  error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
                return true;
              }
              if (lowerCasedName === "innerhtml") {
                error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "aria") {
                error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
                error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "number" && isNaN(value)) {
                error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
                warnedProperties$1[name] = true;
                return true;
              }
              var propertyInfo = getPropertyInfo(name);
              var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
              if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) {
                  error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (!isReserved && name !== lowerCasedName) {
                error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                if (value) {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
                } else {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (isReserved) {
                return true;
              }
              if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                warnedProperties$1[name] = true;
                return false;
              }
              if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
                error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
                warnedProperties$1[name] = true;
                return true;
              }
              return true;
            };
          }
          var warnUnknownProperties = function(type, props, eventRegistry) {
            {
              var unknownProps = [];
              for (var key in props) {
                var isValid = validateProperty$1(type, key, props[key], eventRegistry);
                if (!isValid) {
                  unknownProps.push(key);
                }
              }
              var unknownPropString = unknownProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (unknownProps.length === 1) {
                error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              } else if (unknownProps.length > 1) {
                error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              }
            }
          };
          function validateProperties$2(type, props, eventRegistry) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnUnknownProperties(type, props, eventRegistry);
          }
          var warnValidStyle = function() {
          };
          {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var msPattern = /^-ms-/;
            var hyphenPattern = /-(.)/g;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnedForNaNValue = false;
            var warnedForInfinityValue = false;
            var camelize = function(string) {
              return string.replace(hyphenPattern, function(_, character) {
                return character.toUpperCase();
              });
            };
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern, "ms-")));
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
            };
            var warnStyleValueIsNaN = function(name, value) {
              if (warnedForNaNValue) {
                return;
              }
              warnedForNaNValue = true;
              error("`NaN` is an invalid value for the `%s` css style property.", name);
            };
            var warnStyleValueIsInfinity = function(name, value) {
              if (warnedForInfinityValue) {
                return;
              }
              warnedForInfinityValue = true;
              error("`Infinity` is an invalid value for the `%s` css style property.", name);
            };
            warnValidStyle = function(name, value) {
              if (name.indexOf("-") > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
              if (typeof value === "number") {
                if (isNaN(value)) {
                  warnStyleValueIsNaN(name, value);
                } else if (!isFinite(value)) {
                  warnStyleValueIsInfinity(name, value);
                }
              }
            };
          }
          var warnValidStyle$1 = warnValidStyle;
          var matchHtmlRegExp = /["'&<>]/;
          function escapeHtml(string) {
            {
              checkHtmlStringCoercion(string);
            }
            var str = "" + string;
            var match = matchHtmlRegExp.exec(str);
            if (!match) {
              return str;
            }
            var escape;
            var html = "";
            var index;
            var lastIndex = 0;
            for (index = match.index; index < str.length; index++) {
              switch (str.charCodeAt(index)) {
                case 34:
                  escape = "&quot;";
                  break;
                case 38:
                  escape = "&amp;";
                  break;
                case 39:
                  escape = "&#x27;";
                  break;
                case 60:
                  escape = "&lt;";
                  break;
                case 62:
                  escape = "&gt;";
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
          }
          function escapeTextForBrowser(text) {
            if (typeof text === "boolean" || typeof text === "number") {
              return "" + text;
            }
            return escapeHtml(text);
          }
          var uppercasePattern = /([A-Z])/g;
          var msPattern$1 = /^ms-/;
          function hyphenateStyleName(name) {
            return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
          }
          var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
          var didWarn = false;
          function sanitizeURL(url) {
            {
              if (!didWarn && isJavaScriptProtocol.test(url)) {
                didWarn = true;
                error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          var startInlineScript = stringToPrecomputedChunk("<script>");
          var endInlineScript = stringToPrecomputedChunk("<\/script>");
          var startScriptSrc = stringToPrecomputedChunk('<script src="');
          var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
          var endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>');
          function escapeBootstrapScriptContent(scriptText) {
            {
              checkHtmlStringCoercion(scriptText);
            }
            return ("" + scriptText).replace(scriptRegex, scriptReplacer);
          }
          var scriptRegex = /(<\/|<)(s)(cript)/gi;
          var scriptReplacer = function(match, prefix2, s2, suffix) {
            return "" + prefix2 + (s2 === "s" ? "\\u0073" : "\\u0053") + suffix;
          };
          function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
            var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
            var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
            var bootstrapChunks = [];
            if (bootstrapScriptContent !== void 0) {
              bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
            }
            if (bootstrapScripts !== void 0) {
              for (var i = 0; i < bootstrapScripts.length; i++) {
                bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
              }
            }
            if (bootstrapModules !== void 0) {
              for (var _i = 0; _i < bootstrapModules.length; _i++) {
                bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
              }
            }
            return {
              bootstrapChunks,
              startInlineScript: inlineScriptWithNonce,
              placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
              segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
              boundaryPrefix: idPrefix + "B:",
              idPrefix,
              nextSuspenseID: 0,
              sentCompleteSegmentFunction: false,
              sentCompleteBoundaryFunction: false,
              sentClientRenderFunction: false
            };
          }
          var ROOT_HTML_MODE = 0;
          var HTML_MODE = 1;
          var SVG_MODE = 2;
          var MATHML_MODE = 3;
          var HTML_TABLE_MODE = 4;
          var HTML_TABLE_BODY_MODE = 5;
          var HTML_TABLE_ROW_MODE = 6;
          var HTML_COLGROUP_MODE = 7;
          function createFormatContext(insertionMode, selectedValue) {
            return {
              insertionMode,
              selectedValue
            };
          }
          function getChildFormatContext(parentContext, type, props) {
            switch (type) {
              case "select":
                return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
              case "svg":
                return createFormatContext(SVG_MODE, null);
              case "math":
                return createFormatContext(MATHML_MODE, null);
              case "foreignObject":
                return createFormatContext(HTML_MODE, null);
              case "table":
                return createFormatContext(HTML_TABLE_MODE, null);
              case "thead":
              case "tbody":
              case "tfoot":
                return createFormatContext(HTML_TABLE_BODY_MODE, null);
              case "colgroup":
                return createFormatContext(HTML_COLGROUP_MODE, null);
              case "tr":
                return createFormatContext(HTML_TABLE_ROW_MODE, null);
            }
            if (parentContext.insertionMode >= HTML_TABLE_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            if (parentContext.insertionMode === ROOT_HTML_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            return parentContext;
          }
          var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
          function assignSuspenseBoundaryID(responseState) {
            var generatedID = responseState.nextSuspenseID++;
            return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
          }
          function makeId(responseState, treeId, localId) {
            var idPrefix = responseState.idPrefix;
            var id = ":" + idPrefix + "R" + treeId;
            if (localId > 0) {
              id += "H" + localId.toString(32);
            }
            return id + ":";
          }
          function encodeHTMLTextNode(text) {
            return escapeTextForBrowser(text);
          }
          var textSeparator = stringToPrecomputedChunk("<!-- -->");
          function pushTextInstance(target, text, responseState, textEmbedded) {
            if (text === "") {
              return textEmbedded;
            }
            if (textEmbedded) {
              target.push(textSeparator);
            }
            target.push(stringToChunk(encodeHTMLTextNode(text)));
            return true;
          }
          function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
            if (lastPushedText && textEmbedded) {
              target.push(textSeparator);
            }
          }
          var styleNameCache = /* @__PURE__ */ new Map();
          function processStyleName(styleName) {
            var chunk = styleNameCache.get(styleName);
            if (chunk !== void 0) {
              return chunk;
            }
            var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
            styleNameCache.set(styleName, result);
            return result;
          }
          var styleAttributeStart = stringToPrecomputedChunk(' style="');
          var styleAssign = stringToPrecomputedChunk(":");
          var styleSeparator = stringToPrecomputedChunk(";");
          function pushStyle(target, responseState, style) {
            if (typeof style !== "object") {
              throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
            var isFirst = true;
            for (var styleName in style) {
              if (!hasOwnProperty.call(style, styleName)) {
                continue;
              }
              var styleValue = style[styleName];
              if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
                continue;
              }
              var nameChunk = void 0;
              var valueChunk = void 0;
              var isCustomProperty = styleName.indexOf("--") === 0;
              if (isCustomProperty) {
                nameChunk = stringToChunk(escapeTextForBrowser(styleName));
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              } else {
                {
                  warnValidStyle$1(styleName, styleValue);
                }
                nameChunk = processStyleName(styleName);
                if (typeof styleValue === "number") {
                  if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
                    valueChunk = stringToChunk(styleValue + "px");
                  } else {
                    valueChunk = stringToChunk("" + styleValue);
                  }
                } else {
                  {
                    checkCSSPropertyStringCoercion(styleValue, styleName);
                  }
                  valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                }
              }
              if (isFirst) {
                isFirst = false;
                target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
              } else {
                target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
              }
            }
            if (!isFirst) {
              target.push(attributeEnd);
            }
          }
          var attributeSeparator = stringToPrecomputedChunk(" ");
          var attributeAssign = stringToPrecomputedChunk('="');
          var attributeEnd = stringToPrecomputedChunk('"');
          var attributeEmptyString = stringToPrecomputedChunk('=""');
          function pushAttribute(target, responseState, name, value) {
            switch (name) {
              case "style": {
                pushStyle(target, responseState, value);
                return;
              }
              case "defaultValue":
              case "defaultChecked":
              case "innerHTML":
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                return;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return;
            }
            var propertyInfo = getPropertyInfo(name);
            if (propertyInfo !== null) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  if (!propertyInfo.acceptsBooleans) {
                    return;
                  }
                }
              }
              var attributeName = propertyInfo.attributeName;
              var attributeNameChunk = stringToChunk(attributeName);
              switch (propertyInfo.type) {
                case BOOLEAN:
                  if (value) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  }
                  return;
                case OVERLOADED_BOOLEAN:
                  if (value === true) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  } else if (value === false)
                    ;
                  else {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  return;
                case NUMERIC:
                  if (!isNaN(value)) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                case POSITIVE_NUMERIC:
                  if (!isNaN(value) && value >= 1) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                default:
                  if (propertyInfo.sanitizeURL) {
                    {
                      checkAttributeStringCoercion(value, attributeName);
                    }
                    value = "" + value;
                    sanitizeURL(value);
                  }
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
              }
            } else if (isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  if (prefix2 !== "data-" && prefix2 !== "aria-") {
                    return;
                  }
                }
              }
              target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          }
          var endOfStartTag = stringToPrecomputedChunk(">");
          var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
          function pushInnerHTML(target, innerHTML, children) {
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html = innerHTML.__html;
              if (html !== null && html !== void 0) {
                {
                  checkHtmlStringCoercion(html);
                }
                target.push(stringToChunk("" + html));
              }
            }
          }
          var didWarnDefaultInputValue = false;
          var didWarnDefaultChecked = false;
          var didWarnDefaultSelectValue = false;
          var didWarnDefaultTextareaValue = false;
          var didWarnInvalidOptionChildren = false;
          var didWarnInvalidOptionInnerHTML = false;
          var didWarnSelectedSetOnOption = false;
          function checkSelectProp(props, propName) {
            {
              var value = props[propName];
              if (value != null) {
                var array = isArray(value);
                if (props.multiple && !array) {
                  error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                } else if (!props.multiple && array) {
                  error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
            }
          }
          function pushStartSelect(target, props, responseState) {
            {
              checkControlledValueProps("select", props);
              checkSelectProp(props, "value");
              checkSelectProp(props, "defaultValue");
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultSelectValue = true;
              }
            }
            target.push(startChunkForTag("select"));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function flattenOptionChildren(children) {
            var content = "";
            React6.Children.forEach(children, function(child) {
              if (child == null) {
                return;
              }
              content += child;
              {
                if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                  didWarnInvalidOptionChildren = true;
                  error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
              }
            });
            return content;
          }
          var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
          function pushStartOption(target, props, responseState, formatContext) {
            var selectedValue = formatContext.selectedValue;
            target.push(startChunkForTag("option"));
            var children = null;
            var value = null;
            var selected = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "selected":
                    selected = propValue;
                    {
                      if (!didWarnSelectedSetOnOption) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        didWarnSelectedSetOnOption = true;
                      }
                    }
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "value":
                    value = propValue;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (selectedValue != null) {
              var stringValue;
              if (value !== null) {
                {
                  checkAttributeStringCoercion(value, "value");
                }
                stringValue = "" + value;
              } else {
                {
                  if (innerHTML !== null) {
                    if (!didWarnInvalidOptionInnerHTML) {
                      didWarnInvalidOptionInnerHTML = true;
                      error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                    }
                  }
                }
                stringValue = flattenOptionChildren(children);
              }
              if (isArray(selectedValue)) {
                for (var i = 0; i < selectedValue.length; i++) {
                  {
                    checkAttributeStringCoercion(selectedValue[i], "value");
                  }
                  var v = "" + selectedValue[i];
                  if (v === stringValue) {
                    target.push(selectedMarkerAttribute);
                    break;
                  }
                }
              } else {
                {
                  checkAttributeStringCoercion(selectedValue, "select.value");
                }
                if ("" + selectedValue === stringValue) {
                  target.push(selectedMarkerAttribute);
                }
              }
            } else if (selected) {
              target.push(selectedMarkerAttribute);
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function pushInput(target, props, responseState) {
            {
              checkControlledValueProps("input", props);
              if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultChecked = true;
              }
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultInputValue = true;
              }
            }
            target.push(startChunkForTag("input"));
            var value = null;
            var defaultValue = null;
            var checked = null;
            var defaultChecked = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  case "defaultChecked":
                    defaultChecked = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "checked":
                    checked = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (checked !== null) {
              pushAttribute(target, responseState, "checked", checked);
            } else if (defaultChecked !== null) {
              pushAttribute(target, responseState, "checked", defaultChecked);
            }
            if (value !== null) {
              pushAttribute(target, responseState, "value", value);
            } else if (defaultValue !== null) {
              pushAttribute(target, responseState, "value", defaultValue);
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartTextArea(target, props, responseState) {
            {
              checkControlledValueProps("textarea", props);
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultTextareaValue = true;
              }
            }
            target.push(startChunkForTag("textarea"));
            var value = null;
            var defaultValue = null;
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (value === null && defaultValue !== null) {
              value = defaultValue;
            }
            target.push(endOfStartTag);
            if (children != null) {
              {
                error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
              }
              if (value != null) {
                throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
              }
              if (isArray(children)) {
                if (children.length > 1) {
                  throw new Error("<textarea> can only have at most one child.");
                }
                {
                  checkHtmlStringCoercion(children[0]);
                }
                value = "" + children[0];
              }
              {
                checkHtmlStringCoercion(children);
              }
              value = "" + children;
            }
            if (typeof value === "string" && value[0] === "\n") {
              target.push(leadingNewline);
            }
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              target.push(stringToChunk(encodeHTMLTextNode("" + value)));
            }
            return null;
          }
          function pushSelfClosing(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartMenuItem(target, props, responseState) {
            target.push(startChunkForTag("menuitem"));
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            return null;
          }
          function pushStartTitle(target, props, responseState) {
            target.push(startChunkForTag("title"));
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            {
              var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
              if (Array.isArray(children) && children.length > 1) {
                error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              } else if (child != null && child.$$typeof != null) {
                error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              } else if (child != null && typeof child !== "string" && typeof child !== "number") {
                error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              }
            }
            return children;
          }
          function pushStartGenericElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            if (typeof children === "string") {
              target.push(stringToChunk(encodeHTMLTextNode(children)));
              return null;
            }
            return children;
          }
          function pushStartCustomElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "style":
                    pushStyle(target, responseState, propValue);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                    break;
                  default:
                    if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                      target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                    }
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          var leadingNewline = stringToPrecomputedChunk("\n");
          function pushStartPreformattedElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html = innerHTML.__html;
              if (html !== null && html !== void 0) {
                if (typeof html === "string" && html.length > 0 && html[0] === "\n") {
                  target.push(leadingNewline, stringToChunk(html));
                } else {
                  {
                    checkHtmlStringCoercion(html);
                  }
                  target.push(stringToChunk("" + html));
                }
              }
            }
            if (typeof children === "string" && children[0] === "\n") {
              target.push(leadingNewline);
            }
            return children;
          }
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = /* @__PURE__ */ new Map();
          function startChunkForTag(tag) {
            var tagStartChunk = validatedTagCache.get(tag);
            if (tagStartChunk === void 0) {
              if (!VALID_TAG_REGEX.test(tag)) {
                throw new Error("Invalid tag: " + tag);
              }
              tagStartChunk = stringToPrecomputedChunk("<" + tag);
              validatedTagCache.set(tag, tagStartChunk);
            }
            return tagStartChunk;
          }
          var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
          function pushStartInstance(target, type, props, responseState, formatContext) {
            {
              validateProperties(type, props);
              validateProperties$1(type, props);
              validateProperties$2(type, props, null);
              if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
              }
              if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
                if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
                }
              }
            }
            switch (type) {
              case "select":
                return pushStartSelect(target, props, responseState);
              case "option":
                return pushStartOption(target, props, responseState, formatContext);
              case "textarea":
                return pushStartTextArea(target, props, responseState);
              case "input":
                return pushInput(target, props, responseState);
              case "menuitem":
                return pushStartMenuItem(target, props, responseState);
              case "title":
                return pushStartTitle(target, props, responseState);
              case "listing":
              case "pre": {
                return pushStartPreformattedElement(target, props, type, responseState);
              }
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                return pushSelfClosing(target, props, type, responseState);
              }
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph": {
                return pushStartGenericElement(target, props, type, responseState);
              }
              case "html": {
                if (formatContext.insertionMode === ROOT_HTML_MODE) {
                  target.push(DOCTYPE);
                }
                return pushStartGenericElement(target, props, type, responseState);
              }
              default: {
                if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                  return pushStartGenericElement(target, props, type, responseState);
                } else {
                  return pushStartCustomElement(target, props, type, responseState);
                }
              }
            }
          }
          var endTag1 = stringToPrecomputedChunk("</");
          var endTag2 = stringToPrecomputedChunk(">");
          function pushEndInstance(target, type, props) {
            switch (type) {
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                break;
              }
              default: {
                target.push(endTag1, stringToChunk(type), endTag2);
              }
            }
          }
          function writeCompletedRoot(destination, responseState) {
            var bootstrapChunks = responseState.bootstrapChunks;
            var i = 0;
            for (; i < bootstrapChunks.length - 1; i++) {
              writeChunk(destination, bootstrapChunks[i]);
            }
            if (i < bootstrapChunks.length) {
              return writeChunkAndReturn(destination, bootstrapChunks[i]);
            }
            return true;
          }
          var placeholder1 = stringToPrecomputedChunk('<template id="');
          var placeholder2 = stringToPrecomputedChunk('"></template>');
          function writePlaceholder(destination, responseState, id) {
            writeChunk(destination, placeholder1);
            writeChunk(destination, responseState.placeholderPrefix);
            var formattedID = stringToChunk(id.toString(16));
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, placeholder2);
          }
          var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
          var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
          var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
          var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
          var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
          var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
          var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
          var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
          var clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="');
          var clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="');
          var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
          function writeStartCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
          }
          function writeStartPendingSuspenseBoundary(destination, responseState, id) {
            writeChunk(destination, startPendingSuspenseBoundary1);
            if (id === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, id);
            return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
          }
          function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
            var result;
            result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
            writeChunk(destination, clientRenderedSuspenseBoundaryError1);
            if (errorDigest) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1A);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
            {
              if (errorMesssage) {
                writeChunk(destination, clientRenderedSuspenseBoundaryError1B);
                writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage)));
                writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
              }
              if (errorComponentStack) {
                writeChunk(destination, clientRenderedSuspenseBoundaryError1C);
                writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack)));
                writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
              }
            }
            result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
            return result;
          }
          function writeEndCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndPendingSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
          var startSegmentHTML2 = stringToPrecomputedChunk('">');
          var endSegmentHTML = stringToPrecomputedChunk("</div>");
          var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
          var startSegmentSVG2 = stringToPrecomputedChunk('">');
          var endSegmentSVG = stringToPrecomputedChunk("</svg>");
          var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
          var startSegmentMathML2 = stringToPrecomputedChunk('">');
          var endSegmentMathML = stringToPrecomputedChunk("</math>");
          var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
          var startSegmentTable2 = stringToPrecomputedChunk('">');
          var endSegmentTable = stringToPrecomputedChunk("</table>");
          var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
          var startSegmentTableBody2 = stringToPrecomputedChunk('">');
          var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
          var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
          var startSegmentTableRow2 = stringToPrecomputedChunk('">');
          var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
          var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
          var startSegmentColGroup2 = stringToPrecomputedChunk('">');
          var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
          function writeStartSegment(destination, responseState, formatContext, id) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                writeChunk(destination, startSegmentHTML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentHTML2);
              }
              case SVG_MODE: {
                writeChunk(destination, startSegmentSVG);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentSVG2);
              }
              case MATHML_MODE: {
                writeChunk(destination, startSegmentMathML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentMathML2);
              }
              case HTML_TABLE_MODE: {
                writeChunk(destination, startSegmentTable);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTable2);
              }
              case HTML_TABLE_BODY_MODE: {
                writeChunk(destination, startSegmentTableBody);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableBody2);
              }
              case HTML_TABLE_ROW_MODE: {
                writeChunk(destination, startSegmentTableRow);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableRow2);
              }
              case HTML_COLGROUP_MODE: {
                writeChunk(destination, startSegmentColGroup);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentColGroup2);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          function writeEndSegment(destination, formatContext) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                return writeChunkAndReturn(destination, endSegmentHTML);
              }
              case SVG_MODE: {
                return writeChunkAndReturn(destination, endSegmentSVG);
              }
              case MATHML_MODE: {
                return writeChunkAndReturn(destination, endSegmentMathML);
              }
              case HTML_TABLE_MODE: {
                return writeChunkAndReturn(destination, endSegmentTable);
              }
              case HTML_TABLE_BODY_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableBody);
              }
              case HTML_TABLE_ROW_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableRow);
              }
              case HTML_COLGROUP_MODE: {
                return writeChunkAndReturn(destination, endSegmentColGroup);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
          var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
          var clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}';
          var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
          var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
          var completeSegmentScript2 = stringToPrecomputedChunk('","');
          var completeSegmentScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteSegmentFunction) {
              responseState.sentCompleteSegmentFunction = true;
              writeChunk(destination, completeSegmentScript1Full);
            } else {
              writeChunk(destination, completeSegmentScript1Partial);
            }
            writeChunk(destination, responseState.segmentPrefix);
            var formattedID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, formattedID);
            writeChunk(destination, completeSegmentScript2);
            writeChunk(destination, responseState.placeholderPrefix);
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, completeSegmentScript3);
          }
          var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
          var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
          var completeBoundaryScript2 = stringToPrecomputedChunk('","');
          var completeBoundaryScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteBoundaryFunction) {
              responseState.sentCompleteBoundaryFunction = true;
              writeChunk(destination, completeBoundaryScript1Full);
            } else {
              writeChunk(destination, completeBoundaryScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            var formattedContentID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, boundaryID);
            writeChunk(destination, completeBoundaryScript2);
            writeChunk(destination, responseState.segmentPrefix);
            writeChunk(destination, formattedContentID);
            return writeChunkAndReturn(destination, completeBoundaryScript3);
          }
          var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
          var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
          var clientRenderScript1A = stringToPrecomputedChunk('"');
          var clientRenderScript2 = stringToPrecomputedChunk(")<\/script>");
          var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
          function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentClientRenderFunction) {
              responseState.sentClientRenderFunction = true;
              writeChunk(destination, clientRenderScript1Full);
            } else {
              writeChunk(destination, clientRenderScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, boundaryID);
            writeChunk(destination, clientRenderScript1A);
            if (errorDigest || errorMessage || errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")));
            }
            if (errorMessage || errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")));
            }
            if (errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)));
            }
            return writeChunkAndReturn(destination, clientRenderScript2);
          }
          var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
          function escapeJSStringsForInstructionScripts(input) {
            var escaped = JSON.stringify(input);
            return escaped.replace(regexForJSStringsInScripts, function(match) {
              switch (match) {
                case "<":
                  return "\\u003c";
                case "\u2028":
                  return "\\u2028";
                case "\u2029":
                  return "\\u2029";
                default: {
                  throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
                }
              }
            });
          }
          function createResponseState$1(generateStaticMarkup, identifierPrefix) {
            var responseState = createResponseState(identifierPrefix, void 0);
            return {
              bootstrapChunks: responseState.bootstrapChunks,
              startInlineScript: responseState.startInlineScript,
              placeholderPrefix: responseState.placeholderPrefix,
              segmentPrefix: responseState.segmentPrefix,
              boundaryPrefix: responseState.boundaryPrefix,
              idPrefix: responseState.idPrefix,
              nextSuspenseID: responseState.nextSuspenseID,
              sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
              sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
              sentClientRenderFunction: responseState.sentClientRenderFunction,
              generateStaticMarkup
            };
          }
          function createRootFormatContext() {
            return {
              insertionMode: HTML_MODE,
              selectedValue: null
            };
          }
          function pushTextInstance$1(target, text, responseState, textEmbedded) {
            if (responseState.generateStaticMarkup) {
              target.push(stringToChunk(escapeTextForBrowser(text)));
              return false;
            } else {
              return pushTextInstance(target, text, responseState, textEmbedded);
            }
          }
          function pushSegmentFinale$1(target, responseState, lastPushedText, textEmbedded) {
            if (responseState.generateStaticMarkup) {
              return;
            } else {
              return pushSegmentFinale(target, responseState, lastPushedText, textEmbedded);
            }
          }
          function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeStartCompletedSuspenseBoundary(destination);
          }
          function writeStartClientRenderedSuspenseBoundary$1(destination, responseState, errorDigest, errorMessage, errorComponentStack) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMessage, errorComponentStack);
          }
          function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeEndCompletedSuspenseBoundary(destination);
          }
          function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
            if (responseState.generateStaticMarkup) {
              return true;
            }
            return writeEndClientRenderedSuspenseBoundary(destination);
          }
          var assign = Object.assign;
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_SCOPE_TYPE = Symbol.for("react.scope");
          var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
          var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
          var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
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
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s2 = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s2 >= 1 && c >= 0 && sampleLines[s2] !== controlLines[c]) {
                  c--;
                }
                for (; s2 >= 1 && c >= 0; s2--, c--) {
                  if (sampleLines[s2] !== controlLines[c]) {
                    if (s2 !== 1 || c !== 1) {
                      do {
                        s2--;
                        c--;
                        if (c < 0 || sampleLines[s2] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s2 >= 1 && c >= 0);
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
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeClassComponentFrame(ctor, source, ownerFn) {
            {
              return describeNativeComponentFrame(ctor, true);
            }
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
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
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
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var warnedAboutMissingGetChildContext;
          {
            warnedAboutMissingGetChildContext = {};
          }
          var emptyContextObject = {};
          {
            Object.freeze(emptyContextObject);
          }
          function getMaskedContext(type, unmaskedContext) {
            {
              var contextTypes = type.contextTypes;
              if (!contextTypes) {
                return emptyContextObject;
              }
              var context = {};
              for (var key in contextTypes) {
                context[key] = unmaskedContext[key];
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(contextTypes, context, "context", name);
              }
              return context;
            }
          }
          function processChildContext(instance, type, parentContext, childContextTypes) {
            {
              if (typeof instance.getChildContext !== "function") {
                {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!warnedAboutMissingGetChildContext[componentName]) {
                    warnedAboutMissingGetChildContext[componentName] = true;
                    error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                  }
                }
                return parentContext;
              }
              var childContext = instance.getChildContext();
              for (var contextKey in childContext) {
                if (!(contextKey in childContextTypes)) {
                  throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(childContextTypes, childContext, "child context", name);
              }
              return assign({}, parentContext, childContext);
            }
          }
          var rendererSigil;
          {
            rendererSigil = {};
          }
          var rootContextSnapshot = null;
          var currentActiveSnapshot = null;
          function popNode(prev) {
            {
              prev.context._currentValue2 = prev.parentValue;
            }
          }
          function pushNode(next) {
            {
              next.context._currentValue2 = next.value;
            }
          }
          function popToNearestCommonAncestor(prev, next) {
            if (prev === next)
              ;
            else {
              popNode(prev);
              var parentPrev = prev.parent;
              var parentNext = next.parent;
              if (parentPrev === null) {
                if (parentNext !== null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
              } else {
                if (parentNext === null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
                popToNearestCommonAncestor(parentPrev, parentNext);
              }
              pushNode(next);
            }
          }
          function popAllPrevious(prev) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev !== null) {
              popAllPrevious(parentPrev);
            }
          }
          function pushAllNext(next) {
            var parentNext = next.parent;
            if (parentNext !== null) {
              pushAllNext(parentNext);
            }
            pushNode(next);
          }
          function popPreviousToCommonLevel(prev, next) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (parentPrev.depth === next.depth) {
              popToNearestCommonAncestor(parentPrev, next);
            } else {
              popPreviousToCommonLevel(parentPrev, next);
            }
          }
          function popNextToCommonLevel(prev, next) {
            var parentNext = next.parent;
            if (parentNext === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (prev.depth === parentNext.depth) {
              popToNearestCommonAncestor(prev, parentNext);
            } else {
              popNextToCommonLevel(prev, parentNext);
            }
            pushNode(next);
          }
          function switchContext(newSnapshot) {
            var prev = currentActiveSnapshot;
            var next = newSnapshot;
            if (prev !== next) {
              if (prev === null) {
                pushAllNext(next);
              } else if (next === null) {
                popAllPrevious(prev);
              } else if (prev.depth === next.depth) {
                popToNearestCommonAncestor(prev, next);
              } else if (prev.depth > next.depth) {
                popPreviousToCommonLevel(prev, next);
              } else {
                popNextToCommonLevel(prev, next);
              }
              currentActiveSnapshot = next;
            }
          }
          function pushProvider(context, nextValue) {
            var prevValue;
            {
              prevValue = context._currentValue2;
              context._currentValue2 = nextValue;
              {
                if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer2 = rendererSigil;
              }
            }
            var prevNode = currentActiveSnapshot;
            var newNode = {
              parent: prevNode,
              depth: prevNode === null ? 0 : prevNode.depth + 1,
              context,
              parentValue: prevValue,
              value: nextValue
            };
            currentActiveSnapshot = newNode;
            return newNode;
          }
          function popProvider(context) {
            var prevSnapshot = currentActiveSnapshot;
            if (prevSnapshot === null) {
              throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            }
            {
              if (prevSnapshot.context !== context) {
                error("The parent context is not the expected context. This is probably a bug in React.");
              }
            }
            {
              var _value = prevSnapshot.parentValue;
              if (_value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
                prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue;
              } else {
                prevSnapshot.context._currentValue2 = _value;
              }
              {
                if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer2 = rendererSigil;
              }
            }
            return currentActiveSnapshot = prevSnapshot.parent;
          }
          function getActiveContext() {
            return currentActiveSnapshot;
          }
          function readContext(context) {
            var value = context._currentValue2;
            return value;
          }
          function get2(key) {
            return key._reactInternals;
          }
          function set2(key, value) {
            key._reactInternals = value;
          }
          var didWarnAboutNoopUpdateForComponent = {};
          var didWarnAboutDeprecatedWillMount = {};
          var didWarnAboutUninitializedState;
          var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
          var didWarnAboutLegacyLifecyclesAndDerivedState;
          var didWarnAboutUndefinedDerivedState;
          var warnOnUndefinedDerivedState;
          var warnOnInvalidCallback;
          var didWarnAboutDirectlyAssigningPropsToState;
          var didWarnAboutContextTypeAndContextTypes;
          var didWarnAboutInvalidateContextType;
          {
            didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
            didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
            didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
            var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
            warnOnInvalidCallback = function(callback, callerName) {
              if (callback === null || typeof callback === "function") {
                return;
              }
              var key = callerName + "_" + callback;
              if (!didWarnOnInvalidCallback.has(key)) {
                didWarnOnInvalidCallback.add(key);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
              }
            };
            warnOnUndefinedDerivedState = function(type, partialState) {
              if (partialState === void 0) {
                var componentName = getComponentNameFromType(type) || "Component";
                if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                  didWarnAboutUndefinedDerivedState.add(componentName);
                  error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
                }
              }
            };
          }
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                return;
              }
              error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
              didWarnAboutNoopUpdateForComponent[warningKey] = true;
            }
          }
          var classComponentUpdater = {
            isMounted: function(inst) {
              return false;
            },
            enqueueSetState: function(inst, payload, callback) {
              var internals = get2(inst);
              if (internals.queue === null) {
                warnNoop(inst, "setState");
              } else {
                internals.queue.push(payload);
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            },
            enqueueReplaceState: function(inst, payload, callback) {
              var internals = get2(inst);
              internals.replace = true;
              internals.queue = [payload];
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            },
            enqueueForceUpdate: function(inst, callback) {
              var internals = get2(inst);
              if (internals.queue === null) {
                warnNoop(inst, "forceUpdate");
              } else {
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            }
          };
          function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            {
              warnOnUndefinedDerivedState(ctor, partialState);
            }
            var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
            return newState;
          }
          function constructClassInstance(ctor, props, maskedLegacyContext) {
            var context = emptyContextObject;
            var contextType = ctor.contextType;
            {
              if ("contextType" in ctor) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                  didWarnAboutInvalidateContextType.add(ctor);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              context = readContext(contextType);
            } else {
              context = maskedLegacyContext;
            }
            var instance = new ctor(props, context);
            {
              if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutUninitializedState.has(componentName)) {
                  didWarnAboutUninitializedState.add(componentName);
                  error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                }
              }
              if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                var foundWillMountName = null;
                var foundWillReceivePropsName = null;
                var foundWillUpdateName = null;
                if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  foundWillMountName = "componentWillMount";
                } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                  foundWillMountName = "UNSAFE_componentWillMount";
                }
                if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                  foundWillReceivePropsName = "componentWillReceiveProps";
                } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                  foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                }
                if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                  foundWillUpdateName = "componentWillUpdate";
                } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  foundWillUpdateName = "UNSAFE_componentWillUpdate";
                }
                if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                  var _componentName = getComponentNameFromType(ctor) || "Component";
                  var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                  if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                    didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                  }
                }
              }
            }
            return instance;
          }
          function checkClassInstance(instance, ctor, newProps) {
            {
              var name = getComponentNameFromType(ctor) || "Component";
              var renderPresent = instance.render;
              if (!renderPresent) {
                if (ctor.prototype && typeof ctor.prototype.render === "function") {
                  error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                } else {
                  error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                }
              }
              if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
              }
              if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
              }
              if (instance.propTypes) {
                error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
              }
              if (instance.contextType) {
                error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
              }
              {
                if (instance.contextTypes) {
                  error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                }
                if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                  didWarnAboutContextTypeAndContextTypes.add(ctor);
                  error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                }
              }
              if (typeof instance.componentShouldUpdate === "function") {
                error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
              }
              if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
              }
              if (typeof instance.componentDidUnmount === "function") {
                error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
              }
              if (typeof instance.componentDidReceiveProps === "function") {
                error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
              }
              if (typeof instance.componentWillRecieveProps === "function") {
                error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
              }
              if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
              }
              var hasMutatedProps = instance.props !== newProps;
              if (instance.props !== void 0 && hasMutatedProps) {
                error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
              }
              if (instance.defaultProps) {
                error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
              }
              if (typeof instance.getDerivedStateFromProps === "function") {
                error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof instance.getDerivedStateFromError === "function") {
                error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
              }
              var _state = instance.state;
              if (_state && (typeof _state !== "object" || isArray(_state))) {
                error("%s.state: must be set to an object or null", name);
              }
              if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
              }
            }
          }
          function callComponentWillMount(type, instance) {
            var oldState = instance.state;
            if (typeof instance.componentWillMount === "function") {
              {
                if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!didWarnAboutDeprecatedWillMount[componentName]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", componentName);
                    didWarnAboutDeprecatedWillMount[componentName] = true;
                  }
                }
              }
              instance.componentWillMount();
            }
            if (typeof instance.UNSAFE_componentWillMount === "function") {
              instance.UNSAFE_componentWillMount();
            }
            if (oldState !== instance.state) {
              {
                error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
            if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
              var oldQueue = internalInstance.queue;
              var oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && oldQueue.length === 1) {
                inst.state = oldQueue[0];
              } else {
                var nextState = oldReplace ? oldQueue[0] : inst.state;
                var dontMutate = true;
                for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i];
                  var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                  if (partialState != null) {
                    if (dontMutate) {
                      dontMutate = false;
                      nextState = assign({}, nextState, partialState);
                    } else {
                      assign(nextState, partialState);
                    }
                  }
                }
                inst.state = nextState;
              }
            } else {
              internalInstance.queue = null;
            }
          }
          function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
            {
              checkClassInstance(instance, ctor, newProps);
            }
            var initialState = instance.state !== void 0 ? instance.state : null;
            instance.updater = classComponentUpdater;
            instance.props = newProps;
            instance.state = initialState;
            var internalInstance = {
              queue: [],
              replace: false
            };
            set2(instance, internalInstance);
            var contextType = ctor.contextType;
            if (typeof contextType === "object" && contextType !== null) {
              instance.context = readContext(contextType);
            } else {
              instance.context = maskedLegacyContext;
            }
            {
              if (instance.state === newProps) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                  didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                  error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                }
              }
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
            }
            if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              callComponentWillMount(ctor, instance);
              processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
            }
          }
          var emptyTreeContext = {
            id: 1,
            overflow: ""
          };
          function getTreeId(context) {
            var overflow = context.overflow;
            var idWithLeadingBit = context.id;
            var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
            return id.toString(32) + overflow;
          }
          function pushTreeContext(baseContext, totalChildren, index) {
            var baseIdWithLeadingBit = baseContext.id;
            var baseOverflow = baseContext.overflow;
            var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
            var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
            var slot = index + 1;
            var length = getBitLength(totalChildren) + baseLength;
            if (length > 30) {
              var numberOfOverflowBits = baseLength - baseLength % 5;
              var newOverflowBits = (1 << numberOfOverflowBits) - 1;
              var newOverflow = (baseId & newOverflowBits).toString(32);
              var restOfBaseId = baseId >> numberOfOverflowBits;
              var restOfBaseLength = baseLength - numberOfOverflowBits;
              var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
              var restOfNewBits = slot << restOfBaseLength;
              var id = restOfNewBits | restOfBaseId;
              var overflow = newOverflow + baseOverflow;
              return {
                id: 1 << restOfLength | id,
                overflow
              };
            } else {
              var newBits = slot << baseLength;
              var _id = newBits | baseId;
              var _overflow = baseOverflow;
              return {
                id: 1 << length | _id,
                overflow: _overflow
              };
            }
          }
          function getBitLength(number) {
            return 32 - clz32(number);
          }
          function getLeadingBit(id) {
            return 1 << getBitLength(id) - 1;
          }
          var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
          var log = Math.log;
          var LN2 = Math.LN2;
          function clz32Fallback(x) {
            var asUint = x >>> 0;
            if (asUint === 0) {
              return 32;
            }
            return 31 - (log(asUint) / LN2 | 0) | 0;
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var currentlyRenderingComponent = null;
          var currentlyRenderingTask = null;
          var firstWorkInProgressHook = null;
          var workInProgressHook = null;
          var isReRender = false;
          var didScheduleRenderPhaseUpdate = false;
          var localIdCounter = 0;
          var renderPhaseUpdates = null;
          var numberOfReRenders = 0;
          var RE_RENDER_LIMIT = 25;
          var isInHookUserCodeInDev = false;
          var currentHookNameInDev;
          function resolveCurrentlyRenderingComponent() {
            if (currentlyRenderingComponent === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
            {
              if (isInHookUserCodeInDev) {
                error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
              }
            }
            return currentlyRenderingComponent;
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
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
              throw new Error("Rendered more hooks than during the previous render");
            }
            return {
              memoizedState: null,
              queue: null,
              next: null
            };
          }
          function createWorkInProgressHook() {
            if (workInProgressHook === null) {
              if (firstWorkInProgressHook === null) {
                isReRender = false;
                firstWorkInProgressHook = workInProgressHook = createHook();
              } else {
                isReRender = true;
                workInProgressHook = firstWorkInProgressHook;
              }
            } else {
              if (workInProgressHook.next === null) {
                isReRender = false;
                workInProgressHook = workInProgressHook.next = createHook();
              } else {
                isReRender = true;
                workInProgressHook = workInProgressHook.next;
              }
            }
            return workInProgressHook;
          }
          function prepareToUseHooks(task, componentIdentity) {
            currentlyRenderingComponent = componentIdentity;
            currentlyRenderingTask = task;
            {
              isInHookUserCodeInDev = false;
            }
            localIdCounter = 0;
          }
          function finishHooks(Component, props, children, refOrContext) {
            while (didScheduleRenderPhaseUpdate) {
              didScheduleRenderPhaseUpdate = false;
              localIdCounter = 0;
              numberOfReRenders += 1;
              workInProgressHook = null;
              children = Component(props, refOrContext);
            }
            resetHooksState();
            return children;
          }
          function checkDidRenderIdHook() {
            var didRenderIdHook = localIdCounter !== 0;
            return didRenderIdHook;
          }
          function resetHooksState() {
            {
              isInHookUserCodeInDev = false;
            }
            currentlyRenderingComponent = null;
            currentlyRenderingTask = null;
            didScheduleRenderPhaseUpdate = false;
            firstWorkInProgressHook = null;
            numberOfReRenders = 0;
            renderPhaseUpdates = null;
            workInProgressHook = null;
          }
          function readContext$1(context) {
            {
              if (isInHookUserCodeInDev) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            return readContext(context);
          }
          function useContext2(context) {
            {
              currentHookNameInDev = "useContext";
            }
            resolveCurrentlyRenderingComponent();
            return readContext(context);
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function useState2(initialState) {
            {
              currentHookNameInDev = "useState";
            }
            return useReducer2(basicStateReducer, initialState);
          }
          function useReducer2(reducer, initialArg, init) {
            {
              if (reducer !== basicStateReducer) {
                currentHookNameInDev = "useReducer";
              }
            }
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            if (isReRender) {
              var queue = workInProgressHook.queue;
              var dispatch = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
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
                initialState = typeof initialArg === "function" ? initialArg() : initialArg;
              } else {
                initialState = init !== void 0 ? init(initialArg) : initialArg;
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
          function useMemo2(nextCreate, deps) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
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
          function useRef2(initialValue) {
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
          function useLayoutEffect2(create, inputs) {
            {
              currentHookNameInDev = "useLayoutEffect";
              error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
            }
          }
          function dispatchAction(componentIdentity, queue, action) {
            if (numberOfReRenders >= RE_RENDER_LIMIT) {
              throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
            if (componentIdentity === currentlyRenderingComponent) {
              didScheduleRenderPhaseUpdate = true;
              var update = {
                action,
                next: null
              };
              if (renderPhaseUpdates === null) {
                renderPhaseUpdates = /* @__PURE__ */ new Map();
              }
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate === void 0) {
                renderPhaseUpdates.set(queue, update);
              } else {
                var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                while (lastRenderPhaseUpdate.next !== null) {
                  lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                }
                lastRenderPhaseUpdate.next = update;
              }
            }
          }
          function useCallback2(callback, deps) {
            return useMemo2(function() {
              return callback;
            }, deps);
          }
          function useMutableSource(source, getSnapshot, subscribe) {
            resolveCurrentlyRenderingComponent();
            return getSnapshot(source._source);
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            if (getServerSnapshot === void 0) {
              throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
            }
            return getServerSnapshot();
          }
          function useDeferredValue(value) {
            resolveCurrentlyRenderingComponent();
            return value;
          }
          function unsupportedStartTransition() {
            throw new Error("startTransition cannot be called during server rendering.");
          }
          function useTransition() {
            resolveCurrentlyRenderingComponent();
            return [false, unsupportedStartTransition];
          }
          function useId() {
            var task = currentlyRenderingTask;
            var treeId = getTreeId(task.treeContext);
            var responseState = currentResponseState;
            if (responseState === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
            }
            var localId = localIdCounter++;
            return makeId(responseState, treeId, localId);
          }
          function noop() {
          }
          var Dispatcher = {
            readContext: readContext$1,
            useContext: useContext2,
            useMemo: useMemo2,
            useReducer: useReducer2,
            useRef: useRef2,
            useState: useState2,
            useInsertionEffect: noop,
            useLayoutEffect: useLayoutEffect2,
            useCallback: useCallback2,
            useImperativeHandle: noop,
            useEffect: noop,
            useDebugValue: noop,
            useDeferredValue,
            useTransition,
            useId,
            useMutableSource,
            useSyncExternalStore
          };
          var currentResponseState = null;
          function setCurrentResponseState(responseState) {
            currentResponseState = responseState;
          }
          function getStackByComponentStackNode(componentStack) {
            try {
              var info = "";
              var node = componentStack;
              do {
                switch (node.tag) {
                  case 0:
                    info += describeBuiltInComponentFrame(node.type, null, null);
                    break;
                  case 1:
                    info += describeFunctionComponentFrame(node.type, null, null);
                    break;
                  case 2:
                    info += describeClassComponentFrame(node.type, null, null);
                    break;
                }
                node = node.parent;
              } while (node);
              return info;
            } catch (x) {
              return "\nError generating stack: " + x.message + "\n" + x.stack;
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          var PENDING = 0;
          var COMPLETED = 1;
          var FLUSHED = 2;
          var ABORTED = 3;
          var ERRORED = 4;
          var OPEN = 0;
          var CLOSING = 1;
          var CLOSED = 2;
          var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
          function defaultErrorHandler(error2) {
            console["error"](error2);
            return null;
          }
          function noop$1() {
          }
          function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError) {
            var pingedTasks = [];
            var abortSet = /* @__PURE__ */ new Set();
            var request = {
              destination: null,
              responseState,
              progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
              status: OPEN,
              fatalError: null,
              nextSegmentId: 0,
              allPendingTasks: 0,
              pendingRootTasks: 0,
              completedRootSegment: null,
              abortableTasks: abortSet,
              pingedTasks,
              clientRenderedBoundaries: [],
              completedBoundaries: [],
              partialBoundaries: [],
              onError: onError2 === void 0 ? defaultErrorHandler : onError2,
              onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
              onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
              onShellError: onShellError === void 0 ? noop$1 : onShellError,
              onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
            };
            var rootSegment = createPendingSegment(request, 0, null, rootFormatContext, false, false);
            rootSegment.parentFlushed = true;
            var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
            pingedTasks.push(rootTask);
            return request;
          }
          function pingTask(request, task) {
            var pingedTasks = request.pingedTasks;
            pingedTasks.push(task);
            if (pingedTasks.length === 1) {
              scheduleWork(function() {
                return performWork(request);
              });
            }
          }
          function createSuspenseBoundary(request, fallbackAbortableTasks) {
            return {
              id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks,
              errorDigest: null
            };
          }
          function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
            request.allPendingTasks++;
            if (blockedBoundary === null) {
              request.pendingRootTasks++;
            } else {
              blockedBoundary.pendingTasks++;
            }
            var task = {
              node,
              ping: function() {
                return pingTask(request, task);
              },
              blockedBoundary,
              blockedSegment,
              abortSet,
              legacyContext,
              context,
              treeContext
            };
            {
              task.componentStack = null;
            }
            abortSet.add(task);
            return task;
          }
          function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
            return {
              status: PENDING,
              id: -1,
              index,
              parentFlushed: false,
              chunks: [],
              children: [],
              formatContext,
              boundary,
              lastPushedText,
              textEmbedded
            };
          }
          var currentTaskInDEV = null;
          function getCurrentStackInDEV() {
            {
              if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
                return "";
              }
              return getStackByComponentStackNode(currentTaskInDEV.componentStack);
            }
          }
          function pushBuiltInComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 0,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushFunctionComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 1,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushClassComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 2,
                parent: task.componentStack,
                type
              };
            }
          }
          function popComponentStackInDEV(task) {
            {
              if (task.componentStack === null) {
                error("Unexpectedly popped too many stack frames. This is a bug in React.");
              } else {
                task.componentStack = task.componentStack.parent;
              }
            }
          }
          var lastBoundaryErrorComponentStackDev = null;
          function captureBoundaryErrorDetailsDev(boundary, error2) {
            {
              var errorMessage;
              if (typeof error2 === "string") {
                errorMessage = error2;
              } else if (error2 && typeof error2.message === "string") {
                errorMessage = error2.message;
              } else {
                errorMessage = String(error2);
              }
              var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
              lastBoundaryErrorComponentStackDev = null;
              boundary.errorMessage = errorMessage;
              boundary.errorComponentStack = errorComponentStack;
            }
          }
          function logRecoverableError(request, error2) {
            var errorDigest = request.onError(error2);
            if (errorDigest != null && typeof errorDigest !== "string") {
              throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
            }
            return errorDigest;
          }
          function fatalError(request, error2) {
            var onShellError = request.onShellError;
            onShellError(error2);
            var onFatalError = request.onFatalError;
            onFatalError(error2);
            if (request.destination !== null) {
              request.status = CLOSED;
              closeWithError(request.destination, error2);
            } else {
              request.status = CLOSING;
              request.fatalError = error2;
            }
          }
          function renderSuspenseBoundary(request, task, props) {
            pushBuiltInComponentStackInDEV(task, "Suspense");
            var parentBoundary = task.blockedBoundary;
            var parentSegment = task.blockedSegment;
            var fallback = props.fallback;
            var content = props.children;
            var fallbackAbortSet = /* @__PURE__ */ new Set();
            var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
            var insertionIndex = parentSegment.chunks.length;
            var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext, false, false);
            parentSegment.children.push(boundarySegment);
            parentSegment.lastPushedText = false;
            var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext, false, false);
            contentRootSegment.parentFlushed = true;
            task.blockedBoundary = newBoundary;
            task.blockedSegment = contentRootSegment;
            try {
              renderNode(request, task, content);
              pushSegmentFinale$1(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
              contentRootSegment.status = COMPLETED;
              queueCompletedSegment(newBoundary, contentRootSegment);
              if (newBoundary.pendingTasks === 0) {
                popComponentStackInDEV(task);
                return;
              }
            } catch (error2) {
              contentRootSegment.status = ERRORED;
              newBoundary.forceClientRender = true;
              newBoundary.errorDigest = logRecoverableError(request, error2);
              {
                captureBoundaryErrorDetailsDev(newBoundary, error2);
              }
            } finally {
              task.blockedBoundary = parentBoundary;
              task.blockedSegment = parentSegment;
            }
            var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
            {
              suspendedFallbackTask.componentStack = task.componentStack;
            }
            request.pingedTasks.push(suspendedFallbackTask);
            popComponentStackInDEV(task);
          }
          function renderHostElement(request, task, type, props) {
            pushBuiltInComponentStackInDEV(task, type);
            var segment = task.blockedSegment;
            var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
            segment.lastPushedText = false;
            var prevContext = segment.formatContext;
            segment.formatContext = getChildFormatContext(prevContext, type, props);
            renderNode(request, task, children);
            segment.formatContext = prevContext;
            pushEndInstance(segment.chunks, type);
            segment.lastPushedText = false;
            popComponentStackInDEV(task);
          }
          function shouldConstruct$1(Component) {
            return Component.prototype && Component.prototype.isReactComponent;
          }
          function renderWithHooks(request, task, Component, props, secondArg) {
            var componentIdentity = {};
            prepareToUseHooks(task, componentIdentity);
            var result = Component(props, secondArg);
            return finishHooks(Component, props, result, secondArg);
          }
          function finishClassComponent(request, task, instance, Component, props) {
            var nextChildren = instance.render();
            {
              if (instance.props !== props) {
                if (!didWarnAboutReassigningProps) {
                  error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
                }
                didWarnAboutReassigningProps = true;
              }
            }
            {
              var childContextTypes = Component.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                var previousContext = task.legacyContext;
                var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
                task.legacyContext = mergedContext;
                renderNodeDestructive(request, task, nextChildren);
                task.legacyContext = previousContext;
                return;
              }
            }
            renderNodeDestructive(request, task, nextChildren);
          }
          function renderClassComponent(request, task, Component, props) {
            pushClassComponentStackInDEV(task, Component);
            var maskedContext = getMaskedContext(Component, task.legacyContext);
            var instance = constructClassInstance(Component, props, maskedContext);
            mountClassInstance(instance, Component, props, maskedContext);
            finishClassComponent(request, task, instance, Component, props);
            popComponentStackInDEV(task);
          }
          var didWarnAboutBadClass = {};
          var didWarnAboutModulePatternComponent = {};
          var didWarnAboutContextTypeOnFunctionComponent = {};
          var didWarnAboutGetDerivedStateOnFunctionComponent = {};
          var didWarnAboutReassigningProps = false;
          var didWarnAboutGenerators = false;
          var didWarnAboutMaps = false;
          var hasWarnedAboutUsingContextAsConsumer = false;
          function renderIndeterminateComponent(request, task, Component, props) {
            var legacyContext;
            {
              legacyContext = getMaskedContext(Component, task.legacyContext);
            }
            pushFunctionComponentStackInDEV(task, Component);
            {
              if (Component.prototype && typeof Component.prototype.render === "function") {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutBadClass[componentName]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                  didWarnAboutBadClass[componentName] = true;
                }
              }
            }
            var value = renderWithHooks(request, task, Component, props, legacyContext);
            var hasId = checkDidRenderIdHook();
            {
              if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                var _componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                  didWarnAboutModulePatternComponent[_componentName] = true;
                }
              }
            }
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              {
                var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName2]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                  didWarnAboutModulePatternComponent[_componentName2] = true;
                }
              }
              mountClassInstance(value, Component, props, legacyContext);
              finishClassComponent(request, task, value, Component, props);
            } else {
              {
                validateFunctionComponentInDev(Component);
              }
              if (hasId) {
                var prevTreeContext = task.treeContext;
                var totalChildren = 1;
                var index = 0;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
                try {
                  renderNodeDestructive(request, task, value);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              } else {
                renderNodeDestructive(request, task, value);
              }
            }
            popComponentStackInDEV(task);
          }
          function validateFunctionComponentInDev(Component) {
            {
              if (Component) {
                if (Component.childContextTypes) {
                  error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                }
              }
              if (typeof Component.getDerivedStateFromProps === "function") {
                var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                  error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                  didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                }
              }
              if (typeof Component.contextType === "object" && Component.contextType !== null) {
                var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                  error("%s: Function components do not support contextType.", _componentName4);
                  didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                }
              }
            }
          }
          function resolveDefaultProps(Component, baseProps) {
            if (Component && Component.defaultProps) {
              var props = assign({}, baseProps);
              var defaultProps = Component.defaultProps;
              for (var propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
              return props;
            }
            return baseProps;
          }
          function renderForwardRef(request, task, type, props, ref) {
            pushFunctionComponentStackInDEV(task, type.render);
            var children = renderWithHooks(request, task, type.render, props, ref);
            var hasId = checkDidRenderIdHook();
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
              try {
                renderNodeDestructive(request, task, children);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, children);
            }
            popComponentStackInDEV(task);
          }
          function renderMemo(request, task, type, props, ref) {
            var innerType = type.type;
            var resolvedProps = resolveDefaultProps(innerType, props);
            renderElement(request, task, innerType, resolvedProps, ref);
          }
          function renderContextConsumer(request, task, context, props) {
            {
              if (context._context === void 0) {
                if (context !== context.Consumer) {
                  if (!hasWarnedAboutUsingContextAsConsumer) {
                    hasWarnedAboutUsingContextAsConsumer = true;
                    error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                }
              } else {
                context = context._context;
              }
            }
            var render = props.children;
            {
              if (typeof render !== "function") {
                error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
              }
            }
            var newValue = readContext(context);
            var newChildren = render(newValue);
            renderNodeDestructive(request, task, newChildren);
          }
          function renderContextProvider(request, task, type, props) {
            var context = type._context;
            var value = props.value;
            var children = props.children;
            var prevSnapshot;
            {
              prevSnapshot = task.context;
            }
            task.context = pushProvider(context, value);
            renderNodeDestructive(request, task, children);
            task.context = popProvider(context);
            {
              if (prevSnapshot !== task.context) {
                error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
              }
            }
          }
          function renderLazyComponent(request, task, lazyComponent, props, ref) {
            pushBuiltInComponentStackInDEV(task, "Lazy");
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
            var Component = init(payload);
            var resolvedProps = resolveDefaultProps(Component, props);
            renderElement(request, task, Component, resolvedProps, ref);
            popComponentStackInDEV(task);
          }
          function renderElement(request, task, type, props, ref) {
            if (typeof type === "function") {
              if (shouldConstruct$1(type)) {
                renderClassComponent(request, task, type, props);
                return;
              } else {
                renderIndeterminateComponent(request, task, type, props);
                return;
              }
            }
            if (typeof type === "string") {
              renderHostElement(request, task, type, props);
              return;
            }
            switch (type) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_FRAGMENT_TYPE: {
                renderNodeDestructive(request, task, props.children);
                return;
              }
              case REACT_SUSPENSE_LIST_TYPE: {
                pushBuiltInComponentStackInDEV(task, "SuspenseList");
                renderNodeDestructive(request, task, props.children);
                popComponentStackInDEV(task);
                return;
              }
              case REACT_SCOPE_TYPE: {
                throw new Error("ReactDOMServer does not yet support scope components.");
              }
              case REACT_SUSPENSE_TYPE: {
                {
                  renderSuspenseBoundary(request, task, props);
                }
                return;
              }
            }
            if (typeof type === "object" && type !== null) {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  renderForwardRef(request, task, type, props, ref);
                  return;
                }
                case REACT_MEMO_TYPE: {
                  renderMemo(request, task, type, props, ref);
                  return;
                }
                case REACT_PROVIDER_TYPE: {
                  renderContextProvider(request, task, type, props);
                  return;
                }
                case REACT_CONTEXT_TYPE: {
                  renderContextConsumer(request, task, type, props);
                  return;
                }
                case REACT_LAZY_TYPE: {
                  renderLazyComponent(request, task, type, props);
                  return;
                }
              }
            }
            var info = "";
            {
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
          }
          function validateIterable(iterable, iteratorFn) {
            {
              if (typeof Symbol === "function" && iterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (iterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
          }
          function renderNodeDestructive(request, task, node) {
            {
              try {
                return renderNodeDestructiveImpl(request, task, node);
              } catch (x) {
                if (typeof x === "object" && x !== null && typeof x.then === "function")
                  ;
                else {
                  lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV();
                }
                throw x;
              }
            }
          }
          function renderNodeDestructiveImpl(request, task, node) {
            task.node = node;
            if (typeof node === "object" && node !== null) {
              switch (node.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var element = node;
                  var type = element.type;
                  var props = element.props;
                  var ref = element.ref;
                  renderElement(request, task, type, props, ref);
                  return;
                }
                case REACT_PORTAL_TYPE:
                  throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case REACT_LAZY_TYPE: {
                  var lazyNode = node;
                  var payload = lazyNode._payload;
                  var init = lazyNode._init;
                  var resolvedNode;
                  {
                    try {
                      resolvedNode = init(payload);
                    } catch (x) {
                      if (typeof x === "object" && x !== null && typeof x.then === "function") {
                        pushBuiltInComponentStackInDEV(task, "Lazy");
                      }
                      throw x;
                    }
                  }
                  renderNodeDestructive(request, task, resolvedNode);
                  return;
                }
              }
              if (isArray(node)) {
                renderChildrenArray(request, task, node);
                return;
              }
              var iteratorFn = getIteratorFn(node);
              if (iteratorFn) {
                {
                  validateIterable(node, iteratorFn);
                }
                var iterator = iteratorFn.call(node);
                if (iterator) {
                  var step = iterator.next();
                  if (!step.done) {
                    var children = [];
                    do {
                      children.push(step.value);
                      step = iterator.next();
                    } while (!step.done);
                    renderChildrenArray(request, task, children);
                    return;
                  }
                  return;
                }
              }
              var childString = Object.prototype.toString.call(node);
              throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
            }
            if (typeof node === "string") {
              var segment = task.blockedSegment;
              segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
              return;
            }
            if (typeof node === "number") {
              var _segment = task.blockedSegment;
              _segment.lastPushedText = pushTextInstance$1(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
              return;
            }
            {
              if (typeof node === "function") {
                error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
              }
            }
          }
          function renderChildrenArray(request, task, children) {
            var totalChildren = children.length;
            for (var i = 0; i < totalChildren; i++) {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
              try {
                renderNode(request, task, children[i]);
              } finally {
                task.treeContext = prevTreeContext;
              }
            }
          }
          function spawnNewSuspendedTask(request, task, x) {
            var segment = task.blockedSegment;
            var insertionIndex = segment.chunks.length;
            var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext, segment.lastPushedText, true);
            segment.children.push(newSegment);
            segment.lastPushedText = false;
            var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
            {
              if (task.componentStack !== null) {
                newTask.componentStack = task.componentStack.parent;
              }
            }
            var ping = newTask.ping;
            x.then(ping, ping);
          }
          function renderNode(request, task, node) {
            var previousFormatContext = task.blockedSegment.formatContext;
            var previousLegacyContext = task.legacyContext;
            var previousContext = task.context;
            var previousComponentStack = null;
            {
              previousComponentStack = task.componentStack;
            }
            try {
              return renderNodeDestructive(request, task, node);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                spawnNewSuspendedTask(request, task, x);
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                return;
              } else {
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                throw x;
              }
            }
          }
          function erroredTask(request, boundary, segment, error2) {
            var errorDigest = logRecoverableError(request, error2);
            if (boundary === null) {
              fatalError(request, error2);
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                boundary.errorDigest = errorDigest;
                {
                  captureBoundaryErrorDetailsDev(boundary, error2);
                }
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function abortTaskSoft(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            finishedTask(request, boundary, segment);
          }
          function abortTask(task, request, reason) {
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            if (boundary === null) {
              request.allPendingTasks--;
              if (request.status !== CLOSED) {
                request.status = CLOSED;
                if (request.destination !== null) {
                  close(request.destination);
                }
              }
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
                boundary.errorDigest = request.onError(_error);
                {
                  var errorPrefix = "The server did not finish this Suspense boundary: ";
                  if (_error && typeof _error.message === "string") {
                    _error = errorPrefix + _error.message;
                  } else {
                    _error = errorPrefix + String(_error);
                  }
                  var previousTaskInDev = currentTaskInDEV;
                  currentTaskInDEV = task;
                  try {
                    captureBoundaryErrorDetailsDev(boundary, _error);
                  } finally {
                    currentTaskInDEV = previousTaskInDev;
                  }
                }
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
              boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
                return abortTask(fallbackTask, request, reason);
              });
              boundary.fallbackAbortableTasks.clear();
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }
          }
          function queueCompletedSegment(boundary, segment) {
            if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
              var childSegment = segment.children[0];
              childSegment.id = segment.id;
              childSegment.parentFlushed = true;
              if (childSegment.status === COMPLETED) {
                queueCompletedSegment(boundary, childSegment);
              }
            } else {
              var completedSegments = boundary.completedSegments;
              completedSegments.push(segment);
            }
          }
          function finishedTask(request, boundary, segment) {
            if (boundary === null) {
              if (segment.parentFlushed) {
                if (request.completedRootSegment !== null) {
                  throw new Error("There can only be one root segment. This is a bug in React.");
                }
                request.completedRootSegment = segment;
              }
              request.pendingRootTasks--;
              if (request.pendingRootTasks === 0) {
                request.onShellError = noop$1;
                var onShellReady = request.onShellReady;
                onShellReady();
              }
            } else {
              boundary.pendingTasks--;
              if (boundary.forceClientRender)
                ;
              else if (boundary.pendingTasks === 0) {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                  }
                }
                if (boundary.parentFlushed) {
                  request.completedBoundaries.push(boundary);
                }
                boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
                boundary.fallbackAbortableTasks.clear();
              } else {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                    var completedSegments = boundary.completedSegments;
                    if (completedSegments.length === 1) {
                      if (boundary.parentFlushed) {
                        request.partialBoundaries.push(boundary);
                      }
                    }
                  }
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function retryTask(request, task) {
            var segment = task.blockedSegment;
            if (segment.status !== PENDING) {
              return;
            }
            switchContext(task.context);
            var prevTaskInDEV = null;
            {
              prevTaskInDEV = currentTaskInDEV;
              currentTaskInDEV = task;
            }
            try {
              renderNodeDestructive(request, task, task.node);
              pushSegmentFinale$1(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded);
              task.abortSet.delete(task);
              segment.status = COMPLETED;
              finishedTask(request, task.blockedBoundary, segment);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                var ping = task.ping;
                x.then(ping, ping);
              } else {
                task.abortSet.delete(task);
                segment.status = ERRORED;
                erroredTask(request, task.blockedBoundary, segment, x);
              }
            } finally {
              {
                currentTaskInDEV = prevTaskInDEV;
              }
            }
          }
          function performWork(request) {
            if (request.status === CLOSED) {
              return;
            }
            var prevContext = getActiveContext();
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            var prevGetCurrentStackImpl;
            {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
            }
            var prevResponseState = currentResponseState;
            setCurrentResponseState(request.responseState);
            try {
              var pingedTasks = request.pingedTasks;
              var i;
              for (i = 0; i < pingedTasks.length; i++) {
                var task = pingedTasks[i];
                retryTask(request, task);
              }
              pingedTasks.splice(0, i);
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            } finally {
              setCurrentResponseState(prevResponseState);
              ReactCurrentDispatcher$1.current = prevDispatcher;
              {
                ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              }
              if (prevDispatcher === Dispatcher) {
                switchContext(prevContext);
              }
            }
          }
          function flushSubtree(request, destination, segment) {
            segment.parentFlushed = true;
            switch (segment.status) {
              case PENDING: {
                var segmentID = segment.id = request.nextSegmentId++;
                segment.lastPushedText = false;
                segment.textEmbedded = false;
                return writePlaceholder(destination, request.responseState, segmentID);
              }
              case COMPLETED: {
                segment.status = FLUSHED;
                var r = true;
                var chunks = segment.chunks;
                var chunkIdx = 0;
                var children = segment.children;
                for (var childIdx = 0; childIdx < children.length; childIdx++) {
                  var nextChild = children[childIdx];
                  for (; chunkIdx < nextChild.index; chunkIdx++) {
                    writeChunk(destination, chunks[chunkIdx]);
                  }
                  r = flushSegment(request, destination, nextChild);
                }
                for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                if (chunkIdx < chunks.length) {
                  r = writeChunkAndReturn(destination, chunks[chunkIdx]);
                }
                return r;
              }
              default: {
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
              }
            }
          }
          function flushSegment(request, destination, segment) {
            var boundary = segment.boundary;
            if (boundary === null) {
              return flushSubtree(request, destination, segment);
            }
            boundary.parentFlushed = true;
            if (boundary.forceClientRender) {
              writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
              flushSubtree(request, destination, segment);
              return writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
            } else if (boundary.pendingTasks > 0) {
              boundary.rootSegmentID = request.nextSegmentId++;
              if (boundary.completedSegments.length > 0) {
                request.partialBoundaries.push(boundary);
              }
              var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
              writeStartPendingSuspenseBoundary(destination, request.responseState, id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else if (boundary.byteSize > request.progressiveChunkSize) {
              boundary.rootSegmentID = request.nextSegmentId++;
              request.completedBoundaries.push(boundary);
              writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else {
              writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
              var completedSegments = boundary.completedSegments;
              if (completedSegments.length !== 1) {
                throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
              }
              var contentSegment = completedSegments[0];
              flushSegment(request, destination, contentSegment);
              return writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
            }
          }
          function flushClientRenderedBoundary(request, destination, boundary) {
            return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
          }
          function flushSegmentContainer(request, destination, segment) {
            writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
            flushSegment(request, destination, segment);
            return writeEndSegment(destination, segment.formatContext);
          }
          function flushCompletedBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              flushPartiallyCompletedSegment(request, destination, boundary, segment);
            }
            completedSegments.length = 0;
            return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
          }
          function flushPartialBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
                i++;
                completedSegments.splice(0, i);
                return false;
              }
            }
            completedSegments.splice(0, i);
            return true;
          }
          function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
            if (segment.status === FLUSHED) {
              return true;
            }
            var segmentID = segment.id;
            if (segmentID === -1) {
              var rootSegmentID = segment.id = boundary.rootSegmentID;
              if (rootSegmentID === -1) {
                throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
              }
              return flushSegmentContainer(request, destination, segment);
            } else {
              flushSegmentContainer(request, destination, segment);
              return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
            }
          }
          function flushCompletedQueues(request, destination) {
            try {
              var completedRootSegment = request.completedRootSegment;
              if (completedRootSegment !== null && request.pendingRootTasks === 0) {
                flushSegment(request, destination, completedRootSegment);
                request.completedRootSegment = null;
                writeCompletedRoot(destination, request.responseState);
              }
              var clientRenderedBoundaries = request.clientRenderedBoundaries;
              var i;
              for (i = 0; i < clientRenderedBoundaries.length; i++) {
                var boundary = clientRenderedBoundaries[i];
                if (!flushClientRenderedBoundary(request, destination, boundary)) {
                  request.destination = null;
                  i++;
                  clientRenderedBoundaries.splice(0, i);
                  return;
                }
              }
              clientRenderedBoundaries.splice(0, i);
              var completedBoundaries = request.completedBoundaries;
              for (i = 0; i < completedBoundaries.length; i++) {
                var _boundary = completedBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary)) {
                  request.destination = null;
                  i++;
                  completedBoundaries.splice(0, i);
                  return;
                }
              }
              completedBoundaries.splice(0, i);
              completeWriting(destination);
              beginWriting(destination);
              var partialBoundaries = request.partialBoundaries;
              for (i = 0; i < partialBoundaries.length; i++) {
                var _boundary2 = partialBoundaries[i];
                if (!flushPartialBoundary(request, destination, _boundary2)) {
                  request.destination = null;
                  i++;
                  partialBoundaries.splice(0, i);
                  return;
                }
              }
              partialBoundaries.splice(0, i);
              var largeBoundaries = request.completedBoundaries;
              for (i = 0; i < largeBoundaries.length; i++) {
                var _boundary3 = largeBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary3)) {
                  request.destination = null;
                  i++;
                  largeBoundaries.splice(0, i);
                  return;
                }
              }
              largeBoundaries.splice(0, i);
            } finally {
              if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
                {
                  if (request.abortableTasks.size !== 0) {
                    error("There was still abortable task at the root when we closed. This is a bug in React.");
                  }
                }
                close(destination);
              }
            }
          }
          function startWork(request) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
          function startFlowing(request, destination) {
            if (request.status === CLOSING) {
              request.status = CLOSED;
              closeWithError(destination, request.fatalError);
              return;
            }
            if (request.status === CLOSED) {
              return;
            }
            if (request.destination !== null) {
              return;
            }
            request.destination = destination;
            try {
              flushCompletedQueues(request, destination);
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function abort(request, reason) {
            try {
              var abortableTasks = request.abortableTasks;
              abortableTasks.forEach(function(task) {
                return abortTask(task, request, reason);
              });
              abortableTasks.clear();
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function onError() {
          }
          function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
            var didFatal = false;
            var fatalError2 = null;
            var result = "";
            var destination = {
              push: function(chunk) {
                if (chunk !== null) {
                  result += chunk;
                }
                return true;
              },
              destroy: function(error2) {
                didFatal = true;
                fatalError2 = error2;
              }
            };
            var readyToStream = false;
            function onShellReady() {
              readyToStream = true;
            }
            var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : void 0), createRootFormatContext(), Infinity, onError, void 0, onShellReady, void 0, void 0);
            startWork(request);
            abort(request, abortReason);
            startFlowing(request, destination);
            if (didFatal) {
              throw fatalError2;
            }
            if (!readyToStream) {
              throw new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
            }
            return result;
          }
          function renderToString(children, options) {
            return renderToStringImpl(children, options, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
          }
          function renderToStaticMarkup(children, options) {
            return renderToStringImpl(children, options, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
          }
          function renderToNodeStream() {
            throw new Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
          }
          function renderToStaticNodeStream() {
            throw new Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
          }
          exports.renderToNodeStream = renderToNodeStream;
          exports.renderToStaticMarkup = renderToStaticMarkup;
          exports.renderToStaticNodeStream = renderToStaticNodeStream;
          exports.renderToString = renderToString;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom-server.browser.development.js
  var require_react_dom_server_browser_development = __commonJS({
    "node_modules/react-dom/cjs/react-dom-server.browser.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React6 = require_react();
          var ReactVersion = "18.2.0";
          var ReactSharedInternals = React6.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function scheduleWork(callback) {
            callback();
          }
          var VIEW_SIZE = 512;
          var currentView = null;
          var writtenBytes = 0;
          function beginWriting(destination) {
            currentView = new Uint8Array(VIEW_SIZE);
            writtenBytes = 0;
          }
          function writeChunk(destination, chunk) {
            if (chunk.length === 0) {
              return;
            }
            if (chunk.length > VIEW_SIZE) {
              if (writtenBytes > 0) {
                destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
                currentView = new Uint8Array(VIEW_SIZE);
                writtenBytes = 0;
              }
              destination.enqueue(chunk);
              return;
            }
            var bytesToWrite = chunk;
            var allowableBytes = currentView.length - writtenBytes;
            if (allowableBytes < bytesToWrite.length) {
              if (allowableBytes === 0) {
                destination.enqueue(currentView);
              } else {
                currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes);
                destination.enqueue(currentView);
                bytesToWrite = bytesToWrite.subarray(allowableBytes);
              }
              currentView = new Uint8Array(VIEW_SIZE);
              writtenBytes = 0;
            }
            currentView.set(bytesToWrite, writtenBytes);
            writtenBytes += bytesToWrite.length;
          }
          function writeChunkAndReturn(destination, chunk) {
            writeChunk(destination, chunk);
            return true;
          }
          function completeWriting(destination) {
            if (currentView && writtenBytes > 0) {
              destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
              currentView = null;
              writtenBytes = 0;
            }
          }
          function close(destination) {
            destination.close();
          }
          var textEncoder = new TextEncoder();
          function stringToChunk(content) {
            return textEncoder.encode(content);
          }
          function stringToPrecomputedChunk(content) {
            return textEncoder.encode(content);
          }
          function closeWithError(destination, error2) {
            if (typeof destination.error === "function") {
              destination.error(error2);
            } else {
              destination.close();
            }
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e2) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkAttributeStringCoercion(value, attributeName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", attributeName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkCSSPropertyStringCoercion(value, propName) {
            {
              if (willCoercionThrow(value)) {
                error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", propName, typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function checkHtmlStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED = 0;
          var STRING = 1;
          var BOOLEANISH_STRING = 2;
          var BOOLEAN = 3;
          var OVERLOADED_BOOLEAN = 4;
          var NUMERIC = 5;
          var POSITIVE_NUMERIC = 6;
          var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
          var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
          var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
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
              error("Invalid attribute name: `%s`", attributeName);
            }
            return false;
          }
          function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null && propertyInfo.type === RESERVED) {
              return false;
            }
            switch (typeof value) {
              case "function":
              case "symbol":
                return true;
              case "boolean": {
                if (isCustomComponentTag) {
                  return false;
                }
                if (propertyInfo !== null) {
                  return !propertyInfo.acceptsBooleans;
                } else {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  return prefix2 !== "data-" && prefix2 !== "aria-";
                }
              }
              default:
                return false;
            }
          }
          function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
          }
          function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
            this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
            this.attributeName = attributeName;
            this.attributeNamespace = attributeNamespace;
            this.mustUseProperty = mustUseProperty;
            this.propertyName = name;
            this.type = type;
            this.sanitizeURL = sanitizeURL2;
            this.removeEmptyString = removeEmptyString;
          }
          var properties = {};
          var reservedProps = [
            "children",
            "dangerouslySetInnerHTML",
            "defaultValue",
            "defaultChecked",
            "innerHTML",
            "suppressContentEditableWarning",
            "suppressHydrationWarning",
            "style"
          ];
          reservedProps.forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
          });
          [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
          });
          ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
          });
          [
            "allowFullScreen",
            "async",
            "autoFocus",
            "autoPlay",
            "controls",
            "default",
            "defer",
            "disabled",
            "disablePictureInPicture",
            "disableRemotePlayback",
            "formNoValidate",
            "hidden",
            "loop",
            "noModule",
            "noValidate",
            "open",
            "playsInline",
            "readOnly",
            "required",
            "reversed",
            "scoped",
            "seamless",
            "itemScope"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
          });
          [
            "checked",
            "multiple",
            "muted",
            "selected"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
          });
          [
            "capture",
            "download"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
          });
          [
            "cols",
            "rows",
            "size",
            "span"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
          });
          ["rowSpan", "start"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
          });
          var CAMELIZE = /[\-\:]([a-z])/g;
          var capitalize = function(token) {
            return token[1].toUpperCase();
          };
          [
            "accent-height",
            "alignment-baseline",
            "arabic-form",
            "baseline-shift",
            "cap-height",
            "clip-path",
            "clip-rule",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "dominant-baseline",
            "enable-background",
            "fill-opacity",
            "fill-rule",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "glyph-name",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "horiz-adv-x",
            "horiz-origin-x",
            "image-rendering",
            "letter-spacing",
            "lighting-color",
            "marker-end",
            "marker-mid",
            "marker-start",
            "overline-position",
            "overline-thickness",
            "paint-order",
            "panose-1",
            "pointer-events",
            "rendering-intent",
            "shape-rendering",
            "stop-color",
            "stop-opacity",
            "strikethrough-position",
            "strikethrough-thickness",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "underline-position",
            "underline-thickness",
            "unicode-bidi",
            "unicode-range",
            "units-per-em",
            "v-alphabetic",
            "v-hanging",
            "v-ideographic",
            "v-mathematical",
            "vector-effect",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "word-spacing",
            "writing-mode",
            "xmlns:xlink",
            "x-height"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          [
            "xlink:actuate",
            "xlink:arcrole",
            "xlink:role",
            "xlink:show",
            "xlink:title",
            "xlink:type"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
          });
          [
            "xml:base",
            "xml:lang",
            "xml:space"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
          });
          ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
          });
          var xlinkHref = "xlinkHref";
          properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
          ["src", "href", "action", "formAction"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
          });
          var isUnitlessNumber = {
            animationIterationCount: true,
            aspectRatio: true,
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
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix2, key) {
            return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ["Webkit", "ms", "Moz", "O"];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix2) {
              isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
            });
          });
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
                error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
              }
              if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
                error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
              }
            }
          }
          function isCustomComponent(tagName, props) {
            if (tagName.indexOf("-") === -1) {
              return typeof props.is === "string";
            }
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return false;
              default:
                return true;
            }
          }
          var ariaProperties = {
            "aria-current": 0,
            "aria-description": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
          };
          var warnedProperties = {};
          var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          function validateProperty(tagName, name) {
            {
              if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
                return true;
              }
              if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase();
                var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (correctName == null) {
                  error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                  warnedProperties[name] = true;
                  return true;
                }
                if (name !== correctName) {
                  error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
              if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase();
                var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (standardName == null) {
                  warnedProperties[name] = true;
                  return false;
                }
                if (name !== standardName) {
                  error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
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
              var unknownPropString = invalidProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (invalidProps.length === 1) {
                error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              } else if (invalidProps.length > 1) {
                error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
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
              if (type !== "input" && type !== "textarea" && type !== "select") {
                return;
              }
              if (props != null && props.value === null && !didWarnValueNull) {
                didWarnValueNull = true;
                if (type === "select" && props.multiple) {
                  error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
                } else {
                  error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
                }
              }
            }
          }
          var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            disablepictureinpicture: "disablePictureInPicture",
            disableremoteplayback: "disableRemotePlayback",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            enterkeyhint: "enterKeyHint",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            imagesizes: "imageSizes",
            imagesrcset: "imageSrcSet",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
          };
          var validateProperty$1 = function() {
          };
          {
            var warnedProperties$1 = {};
            var EVENT_NAME_REGEX = /^on./;
            var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
            var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
            var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
            validateProperty$1 = function(tagName, name, value, eventRegistry) {
              if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
                return true;
              }
              var lowerCasedName = name.toLowerCase();
              if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
                error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (eventRegistry != null) {
                var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
                if (registrationNameDependencies.hasOwnProperty(name)) {
                  return true;
                }
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (registrationName != null) {
                  error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                  warnedProperties$1[name] = true;
                  return true;
                }
                if (EVENT_NAME_REGEX.test(name)) {
                  error("Unknown event handler property `%s`. It will be ignored.", name);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (EVENT_NAME_REGEX.test(name)) {
                if (INVALID_EVENT_NAME_REGEX.test(name)) {
                  error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
                return true;
              }
              if (lowerCasedName === "innerhtml") {
                error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "aria") {
                error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
                error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "number" && isNaN(value)) {
                error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
                warnedProperties$1[name] = true;
                return true;
              }
              var propertyInfo = getPropertyInfo(name);
              var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
              if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) {
                  error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (!isReserved && name !== lowerCasedName) {
                error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                if (value) {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
                } else {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (isReserved) {
                return true;
              }
              if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                warnedProperties$1[name] = true;
                return false;
              }
              if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
                error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
                warnedProperties$1[name] = true;
                return true;
              }
              return true;
            };
          }
          var warnUnknownProperties = function(type, props, eventRegistry) {
            {
              var unknownProps = [];
              for (var key in props) {
                var isValid = validateProperty$1(type, key, props[key], eventRegistry);
                if (!isValid) {
                  unknownProps.push(key);
                }
              }
              var unknownPropString = unknownProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (unknownProps.length === 1) {
                error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              } else if (unknownProps.length > 1) {
                error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              }
            }
          };
          function validateProperties$2(type, props, eventRegistry) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnUnknownProperties(type, props, eventRegistry);
          }
          var warnValidStyle = function() {
          };
          {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var msPattern = /^-ms-/;
            var hyphenPattern = /-(.)/g;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnedForNaNValue = false;
            var warnedForInfinityValue = false;
            var camelize = function(string) {
              return string.replace(hyphenPattern, function(_, character) {
                return character.toUpperCase();
              });
            };
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern, "ms-")));
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
            };
            var warnStyleValueIsNaN = function(name, value) {
              if (warnedForNaNValue) {
                return;
              }
              warnedForNaNValue = true;
              error("`NaN` is an invalid value for the `%s` css style property.", name);
            };
            var warnStyleValueIsInfinity = function(name, value) {
              if (warnedForInfinityValue) {
                return;
              }
              warnedForInfinityValue = true;
              error("`Infinity` is an invalid value for the `%s` css style property.", name);
            };
            warnValidStyle = function(name, value) {
              if (name.indexOf("-") > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
              if (typeof value === "number") {
                if (isNaN(value)) {
                  warnStyleValueIsNaN(name, value);
                } else if (!isFinite(value)) {
                  warnStyleValueIsInfinity(name, value);
                }
              }
            };
          }
          var warnValidStyle$1 = warnValidStyle;
          var matchHtmlRegExp = /["'&<>]/;
          function escapeHtml(string) {
            {
              checkHtmlStringCoercion(string);
            }
            var str = "" + string;
            var match = matchHtmlRegExp.exec(str);
            if (!match) {
              return str;
            }
            var escape;
            var html = "";
            var index;
            var lastIndex = 0;
            for (index = match.index; index < str.length; index++) {
              switch (str.charCodeAt(index)) {
                case 34:
                  escape = "&quot;";
                  break;
                case 38:
                  escape = "&amp;";
                  break;
                case 39:
                  escape = "&#x27;";
                  break;
                case 60:
                  escape = "&lt;";
                  break;
                case 62:
                  escape = "&gt;";
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
          }
          function escapeTextForBrowser(text) {
            if (typeof text === "boolean" || typeof text === "number") {
              return "" + text;
            }
            return escapeHtml(text);
          }
          var uppercasePattern = /([A-Z])/g;
          var msPattern$1 = /^ms-/;
          function hyphenateStyleName(name) {
            return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-");
          }
          var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
          var didWarn = false;
          function sanitizeURL(url) {
            {
              if (!didWarn && isJavaScriptProtocol.test(url)) {
                didWarn = true;
                error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          var startInlineScript = stringToPrecomputedChunk("<script>");
          var endInlineScript = stringToPrecomputedChunk("<\/script>");
          var startScriptSrc = stringToPrecomputedChunk('<script src="');
          var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
          var endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>');
          function escapeBootstrapScriptContent(scriptText) {
            {
              checkHtmlStringCoercion(scriptText);
            }
            return ("" + scriptText).replace(scriptRegex, scriptReplacer);
          }
          var scriptRegex = /(<\/|<)(s)(cript)/gi;
          var scriptReplacer = function(match, prefix2, s2, suffix) {
            return "" + prefix2 + (s2 === "s" ? "\\u0073" : "\\u0053") + suffix;
          };
          function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
            var idPrefix = identifierPrefix === void 0 ? "" : identifierPrefix;
            var inlineScriptWithNonce = nonce === void 0 ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
            var bootstrapChunks = [];
            if (bootstrapScriptContent !== void 0) {
              bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeBootstrapScriptContent(bootstrapScriptContent)), endInlineScript);
            }
            if (bootstrapScripts !== void 0) {
              for (var i = 0; i < bootstrapScripts.length; i++) {
                bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
              }
            }
            if (bootstrapModules !== void 0) {
              for (var _i = 0; _i < bootstrapModules.length; _i++) {
                bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
              }
            }
            return {
              bootstrapChunks,
              startInlineScript: inlineScriptWithNonce,
              placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
              segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
              boundaryPrefix: idPrefix + "B:",
              idPrefix,
              nextSuspenseID: 0,
              sentCompleteSegmentFunction: false,
              sentCompleteBoundaryFunction: false,
              sentClientRenderFunction: false
            };
          }
          var ROOT_HTML_MODE = 0;
          var HTML_MODE = 1;
          var SVG_MODE = 2;
          var MATHML_MODE = 3;
          var HTML_TABLE_MODE = 4;
          var HTML_TABLE_BODY_MODE = 5;
          var HTML_TABLE_ROW_MODE = 6;
          var HTML_COLGROUP_MODE = 7;
          function createFormatContext(insertionMode, selectedValue) {
            return {
              insertionMode,
              selectedValue
            };
          }
          function createRootFormatContext(namespaceURI) {
            var insertionMode = namespaceURI === "http://www.w3.org/2000/svg" ? SVG_MODE : namespaceURI === "http://www.w3.org/1998/Math/MathML" ? MATHML_MODE : ROOT_HTML_MODE;
            return createFormatContext(insertionMode, null);
          }
          function getChildFormatContext(parentContext, type, props) {
            switch (type) {
              case "select":
                return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);
              case "svg":
                return createFormatContext(SVG_MODE, null);
              case "math":
                return createFormatContext(MATHML_MODE, null);
              case "foreignObject":
                return createFormatContext(HTML_MODE, null);
              case "table":
                return createFormatContext(HTML_TABLE_MODE, null);
              case "thead":
              case "tbody":
              case "tfoot":
                return createFormatContext(HTML_TABLE_BODY_MODE, null);
              case "colgroup":
                return createFormatContext(HTML_COLGROUP_MODE, null);
              case "tr":
                return createFormatContext(HTML_TABLE_ROW_MODE, null);
            }
            if (parentContext.insertionMode >= HTML_TABLE_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            if (parentContext.insertionMode === ROOT_HTML_MODE) {
              return createFormatContext(HTML_MODE, null);
            }
            return parentContext;
          }
          var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
          function assignSuspenseBoundaryID(responseState) {
            var generatedID = responseState.nextSuspenseID++;
            return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
          }
          function makeId(responseState, treeId, localId) {
            var idPrefix = responseState.idPrefix;
            var id = ":" + idPrefix + "R" + treeId;
            if (localId > 0) {
              id += "H" + localId.toString(32);
            }
            return id + ":";
          }
          function encodeHTMLTextNode(text) {
            return escapeTextForBrowser(text);
          }
          var textSeparator = stringToPrecomputedChunk("<!-- -->");
          function pushTextInstance(target, text, responseState, textEmbedded) {
            if (text === "") {
              return textEmbedded;
            }
            if (textEmbedded) {
              target.push(textSeparator);
            }
            target.push(stringToChunk(encodeHTMLTextNode(text)));
            return true;
          }
          function pushSegmentFinale(target, responseState, lastPushedText, textEmbedded) {
            if (lastPushedText && textEmbedded) {
              target.push(textSeparator);
            }
          }
          var styleNameCache = /* @__PURE__ */ new Map();
          function processStyleName(styleName) {
            var chunk = styleNameCache.get(styleName);
            if (chunk !== void 0) {
              return chunk;
            }
            var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
            styleNameCache.set(styleName, result);
            return result;
          }
          var styleAttributeStart = stringToPrecomputedChunk(' style="');
          var styleAssign = stringToPrecomputedChunk(":");
          var styleSeparator = stringToPrecomputedChunk(";");
          function pushStyle(target, responseState, style) {
            if (typeof style !== "object") {
              throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
            }
            var isFirst = true;
            for (var styleName in style) {
              if (!hasOwnProperty.call(style, styleName)) {
                continue;
              }
              var styleValue = style[styleName];
              if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
                continue;
              }
              var nameChunk = void 0;
              var valueChunk = void 0;
              var isCustomProperty = styleName.indexOf("--") === 0;
              if (isCustomProperty) {
                nameChunk = stringToChunk(escapeTextForBrowser(styleName));
                {
                  checkCSSPropertyStringCoercion(styleValue, styleName);
                }
                valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
              } else {
                {
                  warnValidStyle$1(styleName, styleValue);
                }
                nameChunk = processStyleName(styleName);
                if (typeof styleValue === "number") {
                  if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
                    valueChunk = stringToChunk(styleValue + "px");
                  } else {
                    valueChunk = stringToChunk("" + styleValue);
                  }
                } else {
                  {
                    checkCSSPropertyStringCoercion(styleValue, styleName);
                  }
                  valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                }
              }
              if (isFirst) {
                isFirst = false;
                target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
              } else {
                target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
              }
            }
            if (!isFirst) {
              target.push(attributeEnd);
            }
          }
          var attributeSeparator = stringToPrecomputedChunk(" ");
          var attributeAssign = stringToPrecomputedChunk('="');
          var attributeEnd = stringToPrecomputedChunk('"');
          var attributeEmptyString = stringToPrecomputedChunk('=""');
          function pushAttribute(target, responseState, name, value) {
            switch (name) {
              case "style": {
                pushStyle(target, responseState, value);
                return;
              }
              case "defaultValue":
              case "defaultChecked":
              case "innerHTML":
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                return;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return;
            }
            var propertyInfo = getPropertyInfo(name);
            if (propertyInfo !== null) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  if (!propertyInfo.acceptsBooleans) {
                    return;
                  }
                }
              }
              var attributeName = propertyInfo.attributeName;
              var attributeNameChunk = stringToChunk(attributeName);
              switch (propertyInfo.type) {
                case BOOLEAN:
                  if (value) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  }
                  return;
                case OVERLOADED_BOOLEAN:
                  if (value === true) {
                    target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
                  } else if (value === false)
                    ;
                  else {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  return;
                case NUMERIC:
                  if (!isNaN(value)) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                case POSITIVE_NUMERIC:
                  if (!isNaN(value) && value >= 1) {
                    target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
                  }
                  break;
                default:
                  if (propertyInfo.sanitizeURL) {
                    {
                      checkAttributeStringCoercion(value, attributeName);
                    }
                    value = "" + value;
                    sanitizeURL(value);
                  }
                  target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
              }
            } else if (isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean": {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  if (prefix2 !== "data-" && prefix2 !== "aria-") {
                    return;
                  }
                }
              }
              target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
            }
          }
          var endOfStartTag = stringToPrecomputedChunk(">");
          var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
          function pushInnerHTML(target, innerHTML, children) {
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html = innerHTML.__html;
              if (html !== null && html !== void 0) {
                {
                  checkHtmlStringCoercion(html);
                }
                target.push(stringToChunk("" + html));
              }
            }
          }
          var didWarnDefaultInputValue = false;
          var didWarnDefaultChecked = false;
          var didWarnDefaultSelectValue = false;
          var didWarnDefaultTextareaValue = false;
          var didWarnInvalidOptionChildren = false;
          var didWarnInvalidOptionInnerHTML = false;
          var didWarnSelectedSetOnOption = false;
          function checkSelectProp(props, propName) {
            {
              var value = props[propName];
              if (value != null) {
                var array = isArray(value);
                if (props.multiple && !array) {
                  error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                } else if (!props.multiple && array) {
                  error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
            }
          }
          function pushStartSelect(target, props, responseState) {
            {
              checkControlledValueProps("select", props);
              checkSelectProp(props, "value");
              checkSelectProp(props, "defaultValue");
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultSelectValue = true;
              }
            }
            target.push(startChunkForTag("select"));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function flattenOptionChildren(children) {
            var content = "";
            React6.Children.forEach(children, function(child) {
              if (child == null) {
                return;
              }
              content += child;
              {
                if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                  didWarnInvalidOptionChildren = true;
                  error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.");
                }
              }
            });
            return content;
          }
          var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
          function pushStartOption(target, props, responseState, formatContext) {
            var selectedValue = formatContext.selectedValue;
            target.push(startChunkForTag("option"));
            var children = null;
            var value = null;
            var selected = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "selected":
                    selected = propValue;
                    {
                      if (!didWarnSelectedSetOnOption) {
                        error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.");
                        didWarnSelectedSetOnOption = true;
                      }
                    }
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "value":
                    value = propValue;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (selectedValue != null) {
              var stringValue;
              if (value !== null) {
                {
                  checkAttributeStringCoercion(value, "value");
                }
                stringValue = "" + value;
              } else {
                {
                  if (innerHTML !== null) {
                    if (!didWarnInvalidOptionInnerHTML) {
                      didWarnInvalidOptionInnerHTML = true;
                      error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.");
                    }
                  }
                }
                stringValue = flattenOptionChildren(children);
              }
              if (isArray(selectedValue)) {
                for (var i = 0; i < selectedValue.length; i++) {
                  {
                    checkAttributeStringCoercion(selectedValue[i], "value");
                  }
                  var v = "" + selectedValue[i];
                  if (v === stringValue) {
                    target.push(selectedMarkerAttribute);
                    break;
                  }
                }
              } else {
                {
                  checkAttributeStringCoercion(selectedValue, "select.value");
                }
                if ("" + selectedValue === stringValue) {
                  target.push(selectedMarkerAttribute);
                }
              }
            } else if (selected) {
              target.push(selectedMarkerAttribute);
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          function pushInput(target, props, responseState) {
            {
              checkControlledValueProps("input", props);
              if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultChecked = true;
              }
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                didWarnDefaultInputValue = true;
              }
            }
            target.push(startChunkForTag("input"));
            var value = null;
            var defaultValue = null;
            var checked = null;
            var defaultChecked = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  case "defaultChecked":
                    defaultChecked = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "checked":
                    checked = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (checked !== null) {
              pushAttribute(target, responseState, "checked", checked);
            } else if (defaultChecked !== null) {
              pushAttribute(target, responseState, "checked", defaultChecked);
            }
            if (value !== null) {
              pushAttribute(target, responseState, "value", value);
            } else if (defaultValue !== null) {
              pushAttribute(target, responseState, "value", defaultValue);
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartTextArea(target, props, responseState) {
            {
              checkControlledValueProps("textarea", props);
              if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                didWarnDefaultTextareaValue = true;
              }
            }
            target.push(startChunkForTag("textarea"));
            var value = null;
            var defaultValue = null;
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "value":
                    value = propValue;
                    break;
                  case "defaultValue":
                    defaultValue = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            if (value === null && defaultValue !== null) {
              value = defaultValue;
            }
            target.push(endOfStartTag);
            if (children != null) {
              {
                error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
              }
              if (value != null) {
                throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
              }
              if (isArray(children)) {
                if (children.length > 1) {
                  throw new Error("<textarea> can only have at most one child.");
                }
                {
                  checkHtmlStringCoercion(children[0]);
                }
                value = "" + children[0];
              }
              {
                checkHtmlStringCoercion(children);
              }
              value = "" + children;
            }
            if (typeof value === "string" && value[0] === "\n") {
              target.push(leadingNewline);
            }
            if (value !== null) {
              {
                checkAttributeStringCoercion(value, "value");
              }
              target.push(stringToChunk(encodeHTMLTextNode("" + value)));
            }
            return null;
          }
          function pushSelfClosing(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error(tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTagSelfClosing);
            return null;
          }
          function pushStartMenuItem(target, props, responseState) {
            target.push(startChunkForTag("menuitem"));
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw new Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            return null;
          }
          function pushStartTitle(target, props, responseState) {
            target.push(startChunkForTag("title"));
            var children = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw new Error("`dangerouslySetInnerHTML` does not make sense on <title>.");
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            {
              var child = Array.isArray(children) && children.length < 2 ? children[0] || null : children;
              if (Array.isArray(children) && children.length > 1) {
                error("A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              } else if (child != null && child.$$typeof != null) {
                error("A title element received a React element for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              } else if (child != null && typeof child !== "string" && typeof child !== "number") {
                error("A title element received a value that was not a string or number for children. In the browser title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering");
              }
            }
            return children;
          }
          function pushStartGenericElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            if (typeof children === "string") {
              target.push(stringToChunk(encodeHTMLTextNode(children)));
              return null;
            }
            return children;
          }
          function pushStartCustomElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "style":
                    pushStyle(target, responseState, propValue);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                    break;
                  default:
                    if (isAttributeNameSafe(propKey) && typeof propValue !== "function" && typeof propValue !== "symbol") {
                      target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
                    }
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            pushInnerHTML(target, innerHTML, children);
            return children;
          }
          var leadingNewline = stringToPrecomputedChunk("\n");
          function pushStartPreformattedElement(target, props, tag, responseState) {
            target.push(startChunkForTag(tag));
            var children = null;
            var innerHTML = null;
            for (var propKey in props) {
              if (hasOwnProperty.call(props, propKey)) {
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  default:
                    pushAttribute(target, responseState, propKey, propValue);
                    break;
                }
              }
            }
            target.push(endOfStartTag);
            if (innerHTML != null) {
              if (children != null) {
                throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
              }
              if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
              }
              var html = innerHTML.__html;
              if (html !== null && html !== void 0) {
                if (typeof html === "string" && html.length > 0 && html[0] === "\n") {
                  target.push(leadingNewline, stringToChunk(html));
                } else {
                  {
                    checkHtmlStringCoercion(html);
                  }
                  target.push(stringToChunk("" + html));
                }
              }
            }
            if (typeof children === "string" && children[0] === "\n") {
              target.push(leadingNewline);
            }
            return children;
          }
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = /* @__PURE__ */ new Map();
          function startChunkForTag(tag) {
            var tagStartChunk = validatedTagCache.get(tag);
            if (tagStartChunk === void 0) {
              if (!VALID_TAG_REGEX.test(tag)) {
                throw new Error("Invalid tag: " + tag);
              }
              tagStartChunk = stringToPrecomputedChunk("<" + tag);
              validatedTagCache.set(tag, tagStartChunk);
            }
            return tagStartChunk;
          }
          var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
          function pushStartInstance(target, type, props, responseState, formatContext) {
            {
              validateProperties(type, props);
              validateProperties$1(type, props);
              validateProperties$2(type, props, null);
              if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
              }
              if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
                if (type.indexOf("-") === -1 && typeof props.is !== "string" && type.toLowerCase() !== type) {
                  error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type);
                }
              }
            }
            switch (type) {
              case "select":
                return pushStartSelect(target, props, responseState);
              case "option":
                return pushStartOption(target, props, responseState, formatContext);
              case "textarea":
                return pushStartTextArea(target, props, responseState);
              case "input":
                return pushInput(target, props, responseState);
              case "menuitem":
                return pushStartMenuItem(target, props, responseState);
              case "title":
                return pushStartTitle(target, props, responseState);
              case "listing":
              case "pre": {
                return pushStartPreformattedElement(target, props, type, responseState);
              }
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                return pushSelfClosing(target, props, type, responseState);
              }
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph": {
                return pushStartGenericElement(target, props, type, responseState);
              }
              case "html": {
                if (formatContext.insertionMode === ROOT_HTML_MODE) {
                  target.push(DOCTYPE);
                }
                return pushStartGenericElement(target, props, type, responseState);
              }
              default: {
                if (type.indexOf("-") === -1 && typeof props.is !== "string") {
                  return pushStartGenericElement(target, props, type, responseState);
                } else {
                  return pushStartCustomElement(target, props, type, responseState);
                }
              }
            }
          }
          var endTag1 = stringToPrecomputedChunk("</");
          var endTag2 = stringToPrecomputedChunk(">");
          function pushEndInstance(target, type, props) {
            switch (type) {
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr": {
                break;
              }
              default: {
                target.push(endTag1, stringToChunk(type), endTag2);
              }
            }
          }
          function writeCompletedRoot(destination, responseState) {
            var bootstrapChunks = responseState.bootstrapChunks;
            var i = 0;
            for (; i < bootstrapChunks.length - 1; i++) {
              writeChunk(destination, bootstrapChunks[i]);
            }
            if (i < bootstrapChunks.length) {
              return writeChunkAndReturn(destination, bootstrapChunks[i]);
            }
            return true;
          }
          var placeholder1 = stringToPrecomputedChunk('<template id="');
          var placeholder2 = stringToPrecomputedChunk('"></template>');
          function writePlaceholder(destination, responseState, id) {
            writeChunk(destination, placeholder1);
            writeChunk(destination, responseState.placeholderPrefix);
            var formattedID = stringToChunk(id.toString(16));
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, placeholder2);
          }
          var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
          var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
          var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
          var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
          var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
          var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
          var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
          var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
          var clientRenderedSuspenseBoundaryError1B = stringToPrecomputedChunk(' data-msg="');
          var clientRenderedSuspenseBoundaryError1C = stringToPrecomputedChunk(' data-stck="');
          var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
          function writeStartCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
          }
          function writeStartPendingSuspenseBoundary(destination, responseState, id) {
            writeChunk(destination, startPendingSuspenseBoundary1);
            if (id === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, id);
            return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
          }
          function writeStartClientRenderedSuspenseBoundary(destination, responseState, errorDigest, errorMesssage, errorComponentStack) {
            var result;
            result = writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
            writeChunk(destination, clientRenderedSuspenseBoundaryError1);
            if (errorDigest) {
              writeChunk(destination, clientRenderedSuspenseBoundaryError1A);
              writeChunk(destination, stringToChunk(escapeTextForBrowser(errorDigest)));
              writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
            }
            {
              if (errorMesssage) {
                writeChunk(destination, clientRenderedSuspenseBoundaryError1B);
                writeChunk(destination, stringToChunk(escapeTextForBrowser(errorMesssage)));
                writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
              }
              if (errorComponentStack) {
                writeChunk(destination, clientRenderedSuspenseBoundaryError1C);
                writeChunk(destination, stringToChunk(escapeTextForBrowser(errorComponentStack)));
                writeChunk(destination, clientRenderedSuspenseBoundaryErrorAttrInterstitial);
              }
            }
            result = writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
            return result;
          }
          function writeEndCompletedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndPendingSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
            return writeChunkAndReturn(destination, endSuspenseBoundary);
          }
          var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
          var startSegmentHTML2 = stringToPrecomputedChunk('">');
          var endSegmentHTML = stringToPrecomputedChunk("</div>");
          var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
          var startSegmentSVG2 = stringToPrecomputedChunk('">');
          var endSegmentSVG = stringToPrecomputedChunk("</svg>");
          var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
          var startSegmentMathML2 = stringToPrecomputedChunk('">');
          var endSegmentMathML = stringToPrecomputedChunk("</math>");
          var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
          var startSegmentTable2 = stringToPrecomputedChunk('">');
          var endSegmentTable = stringToPrecomputedChunk("</table>");
          var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
          var startSegmentTableBody2 = stringToPrecomputedChunk('">');
          var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
          var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
          var startSegmentTableRow2 = stringToPrecomputedChunk('">');
          var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
          var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
          var startSegmentColGroup2 = stringToPrecomputedChunk('">');
          var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
          function writeStartSegment(destination, responseState, formatContext, id) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                writeChunk(destination, startSegmentHTML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentHTML2);
              }
              case SVG_MODE: {
                writeChunk(destination, startSegmentSVG);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentSVG2);
              }
              case MATHML_MODE: {
                writeChunk(destination, startSegmentMathML);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentMathML2);
              }
              case HTML_TABLE_MODE: {
                writeChunk(destination, startSegmentTable);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTable2);
              }
              case HTML_TABLE_BODY_MODE: {
                writeChunk(destination, startSegmentTableBody);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableBody2);
              }
              case HTML_TABLE_ROW_MODE: {
                writeChunk(destination, startSegmentTableRow);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentTableRow2);
              }
              case HTML_COLGROUP_MODE: {
                writeChunk(destination, startSegmentColGroup);
                writeChunk(destination, responseState.segmentPrefix);
                writeChunk(destination, stringToChunk(id.toString(16)));
                return writeChunkAndReturn(destination, startSegmentColGroup2);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          function writeEndSegment(destination, formatContext) {
            switch (formatContext.insertionMode) {
              case ROOT_HTML_MODE:
              case HTML_MODE: {
                return writeChunkAndReturn(destination, endSegmentHTML);
              }
              case SVG_MODE: {
                return writeChunkAndReturn(destination, endSegmentSVG);
              }
              case MATHML_MODE: {
                return writeChunkAndReturn(destination, endSegmentMathML);
              }
              case HTML_TABLE_MODE: {
                return writeChunkAndReturn(destination, endSegmentTable);
              }
              case HTML_TABLE_BODY_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableBody);
              }
              case HTML_TABLE_ROW_MODE: {
                return writeChunkAndReturn(destination, endSegmentTableRow);
              }
              case HTML_COLGROUP_MODE: {
                return writeChunkAndReturn(destination, endSegmentColGroup);
              }
              default: {
                throw new Error("Unknown insertion mode. This is a bug in React.");
              }
            }
          }
          var completeSegmentFunction = "function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}";
          var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
          var clientRenderFunction = 'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())}';
          var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
          var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
          var completeSegmentScript2 = stringToPrecomputedChunk('","');
          var completeSegmentScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteSegmentFunction) {
              responseState.sentCompleteSegmentFunction = true;
              writeChunk(destination, completeSegmentScript1Full);
            } else {
              writeChunk(destination, completeSegmentScript1Partial);
            }
            writeChunk(destination, responseState.segmentPrefix);
            var formattedID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, formattedID);
            writeChunk(destination, completeSegmentScript2);
            writeChunk(destination, responseState.placeholderPrefix);
            writeChunk(destination, formattedID);
            return writeChunkAndReturn(destination, completeSegmentScript3);
          }
          var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
          var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
          var completeBoundaryScript2 = stringToPrecomputedChunk('","');
          var completeBoundaryScript3 = stringToPrecomputedChunk('")<\/script>');
          function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentCompleteBoundaryFunction) {
              responseState.sentCompleteBoundaryFunction = true;
              writeChunk(destination, completeBoundaryScript1Full);
            } else {
              writeChunk(destination, completeBoundaryScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            var formattedContentID = stringToChunk(contentSegmentID.toString(16));
            writeChunk(destination, boundaryID);
            writeChunk(destination, completeBoundaryScript2);
            writeChunk(destination, responseState.segmentPrefix);
            writeChunk(destination, formattedContentID);
            return writeChunkAndReturn(destination, completeBoundaryScript3);
          }
          var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
          var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
          var clientRenderScript1A = stringToPrecomputedChunk('"');
          var clientRenderScript2 = stringToPrecomputedChunk(")<\/script>");
          var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
          function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID, errorDigest, errorMessage, errorComponentStack) {
            writeChunk(destination, responseState.startInlineScript);
            if (!responseState.sentClientRenderFunction) {
              responseState.sentClientRenderFunction = true;
              writeChunk(destination, clientRenderScript1Full);
            } else {
              writeChunk(destination, clientRenderScript1Partial);
            }
            if (boundaryID === null) {
              throw new Error("An ID must have been assigned before we can complete the boundary.");
            }
            writeChunk(destination, boundaryID);
            writeChunk(destination, clientRenderScript1A);
            if (errorDigest || errorMessage || errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorDigest || "")));
            }
            if (errorMessage || errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorMessage || "")));
            }
            if (errorComponentStack) {
              writeChunk(destination, clientRenderErrorScriptArgInterstitial);
              writeChunk(destination, stringToChunk(escapeJSStringsForInstructionScripts(errorComponentStack)));
            }
            return writeChunkAndReturn(destination, clientRenderScript2);
          }
          var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
          function escapeJSStringsForInstructionScripts(input) {
            var escaped = JSON.stringify(input);
            return escaped.replace(regexForJSStringsInScripts, function(match) {
              switch (match) {
                case "<":
                  return "\\u003c";
                case "\u2028":
                  return "\\u2028";
                case "\u2029":
                  return "\\u2029";
                default: {
                  throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
                }
              }
            });
          }
          var assign = Object.assign;
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_SCOPE_TYPE = Symbol.for("react.scope");
          var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
          var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
          var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for("react.default_value");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
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
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s2 = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s2 >= 1 && c >= 0 && sampleLines[s2] !== controlLines[c]) {
                  c--;
                }
                for (; s2 >= 1 && c >= 0; s2--, c--) {
                  if (sampleLines[s2] !== controlLines[c]) {
                    if (s2 !== 1 || c !== 1) {
                      do {
                        s2--;
                        c--;
                        if (c < 0 || sampleLines[s2] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s2 >= 1 && c >= 0);
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
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeClassComponentFrame(ctor, source, ownerFn) {
            {
              return describeNativeComponentFrame(ctor, true);
            }
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
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
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
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var warnedAboutMissingGetChildContext;
          {
            warnedAboutMissingGetChildContext = {};
          }
          var emptyContextObject = {};
          {
            Object.freeze(emptyContextObject);
          }
          function getMaskedContext(type, unmaskedContext) {
            {
              var contextTypes = type.contextTypes;
              if (!contextTypes) {
                return emptyContextObject;
              }
              var context = {};
              for (var key in contextTypes) {
                context[key] = unmaskedContext[key];
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(contextTypes, context, "context", name);
              }
              return context;
            }
          }
          function processChildContext(instance, type, parentContext, childContextTypes) {
            {
              if (typeof instance.getChildContext !== "function") {
                {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!warnedAboutMissingGetChildContext[componentName]) {
                    warnedAboutMissingGetChildContext[componentName] = true;
                    error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                  }
                }
                return parentContext;
              }
              var childContext = instance.getChildContext();
              for (var contextKey in childContext) {
                if (!(contextKey in childContextTypes)) {
                  throw new Error((getComponentNameFromType(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
              {
                var name = getComponentNameFromType(type) || "Unknown";
                checkPropTypes(childContextTypes, childContext, "child context", name);
              }
              return assign({}, parentContext, childContext);
            }
          }
          var rendererSigil;
          {
            rendererSigil = {};
          }
          var rootContextSnapshot = null;
          var currentActiveSnapshot = null;
          function popNode(prev) {
            {
              prev.context._currentValue = prev.parentValue;
            }
          }
          function pushNode(next) {
            {
              next.context._currentValue = next.value;
            }
          }
          function popToNearestCommonAncestor(prev, next) {
            if (prev === next)
              ;
            else {
              popNode(prev);
              var parentPrev = prev.parent;
              var parentNext = next.parent;
              if (parentPrev === null) {
                if (parentNext !== null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
              } else {
                if (parentNext === null) {
                  throw new Error("The stacks must reach the root at the same time. This is a bug in React.");
                }
                popToNearestCommonAncestor(parentPrev, parentNext);
              }
              pushNode(next);
            }
          }
          function popAllPrevious(prev) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev !== null) {
              popAllPrevious(parentPrev);
            }
          }
          function pushAllNext(next) {
            var parentNext = next.parent;
            if (parentNext !== null) {
              pushAllNext(parentNext);
            }
            pushNode(next);
          }
          function popPreviousToCommonLevel(prev, next) {
            popNode(prev);
            var parentPrev = prev.parent;
            if (parentPrev === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (parentPrev.depth === next.depth) {
              popToNearestCommonAncestor(parentPrev, next);
            } else {
              popPreviousToCommonLevel(parentPrev, next);
            }
          }
          function popNextToCommonLevel(prev, next) {
            var parentNext = next.parent;
            if (parentNext === null) {
              throw new Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
            }
            if (prev.depth === parentNext.depth) {
              popToNearestCommonAncestor(prev, parentNext);
            } else {
              popNextToCommonLevel(prev, parentNext);
            }
            pushNode(next);
          }
          function switchContext(newSnapshot) {
            var prev = currentActiveSnapshot;
            var next = newSnapshot;
            if (prev !== next) {
              if (prev === null) {
                pushAllNext(next);
              } else if (next === null) {
                popAllPrevious(prev);
              } else if (prev.depth === next.depth) {
                popToNearestCommonAncestor(prev, next);
              } else if (prev.depth > next.depth) {
                popPreviousToCommonLevel(prev, next);
              } else {
                popNextToCommonLevel(prev, next);
              }
              currentActiveSnapshot = next;
            }
          }
          function pushProvider(context, nextValue) {
            var prevValue;
            {
              prevValue = context._currentValue;
              context._currentValue = nextValue;
              {
                if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer = rendererSigil;
              }
            }
            var prevNode = currentActiveSnapshot;
            var newNode = {
              parent: prevNode,
              depth: prevNode === null ? 0 : prevNode.depth + 1,
              context,
              parentValue: prevValue,
              value: nextValue
            };
            currentActiveSnapshot = newNode;
            return newNode;
          }
          function popProvider(context) {
            var prevSnapshot = currentActiveSnapshot;
            if (prevSnapshot === null) {
              throw new Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            }
            {
              if (prevSnapshot.context !== context) {
                error("The parent context is not the expected context. This is probably a bug in React.");
              }
            }
            {
              var value = prevSnapshot.parentValue;
              if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
                prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue;
              } else {
                prevSnapshot.context._currentValue = value;
              }
              {
                if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                  error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
                }
                context._currentRenderer = rendererSigil;
              }
            }
            return currentActiveSnapshot = prevSnapshot.parent;
          }
          function getActiveContext() {
            return currentActiveSnapshot;
          }
          function readContext(context) {
            var value = context._currentValue;
            return value;
          }
          function get2(key) {
            return key._reactInternals;
          }
          function set2(key, value) {
            key._reactInternals = value;
          }
          var didWarnAboutNoopUpdateForComponent = {};
          var didWarnAboutDeprecatedWillMount = {};
          var didWarnAboutUninitializedState;
          var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
          var didWarnAboutLegacyLifecyclesAndDerivedState;
          var didWarnAboutUndefinedDerivedState;
          var warnOnUndefinedDerivedState;
          var warnOnInvalidCallback;
          var didWarnAboutDirectlyAssigningPropsToState;
          var didWarnAboutContextTypeAndContextTypes;
          var didWarnAboutInvalidateContextType;
          {
            didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
            didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
            didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
            didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
            didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
            var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
            warnOnInvalidCallback = function(callback, callerName) {
              if (callback === null || typeof callback === "function") {
                return;
              }
              var key = callerName + "_" + callback;
              if (!didWarnOnInvalidCallback.has(key)) {
                didWarnOnInvalidCallback.add(key);
                error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
              }
            };
            warnOnUndefinedDerivedState = function(type, partialState) {
              if (partialState === void 0) {
                var componentName = getComponentNameFromType(type) || "Component";
                if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                  didWarnAboutUndefinedDerivedState.add(componentName);
                  error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
                }
              }
            };
          }
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && getComponentNameFromType(_constructor) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                return;
              }
              error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
              didWarnAboutNoopUpdateForComponent[warningKey] = true;
            }
          }
          var classComponentUpdater = {
            isMounted: function(inst) {
              return false;
            },
            enqueueSetState: function(inst, payload, callback) {
              var internals = get2(inst);
              if (internals.queue === null) {
                warnNoop(inst, "setState");
              } else {
                internals.queue.push(payload);
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            },
            enqueueReplaceState: function(inst, payload, callback) {
              var internals = get2(inst);
              internals.replace = true;
              internals.queue = [payload];
              {
                if (callback !== void 0 && callback !== null) {
                  warnOnInvalidCallback(callback, "setState");
                }
              }
            },
            enqueueForceUpdate: function(inst, callback) {
              var internals = get2(inst);
              if (internals.queue === null) {
                warnNoop(inst, "forceUpdate");
              } else {
                {
                  if (callback !== void 0 && callback !== null) {
                    warnOnInvalidCallback(callback, "setState");
                  }
                }
              }
            }
          };
          function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            {
              warnOnUndefinedDerivedState(ctor, partialState);
            }
            var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
            return newState;
          }
          function constructClassInstance(ctor, props, maskedLegacyContext) {
            var context = emptyContextObject;
            var contextType = ctor.contextType;
            {
              if ("contextType" in ctor) {
                var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                  didWarnAboutInvalidateContextType.add(ctor);
                  var addendum = "";
                  if (contextType === void 0) {
                    addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                  } else if (typeof contextType !== "object") {
                    addendum = " However, it is set to a " + typeof contextType + ".";
                  } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                    addendum = " Did you accidentally pass the Context.Provider instead?";
                  } else if (contextType._context !== void 0) {
                    addendum = " Did you accidentally pass the Context.Consumer instead?";
                  } else {
                    addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                  }
                  error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentNameFromType(ctor) || "Component", addendum);
                }
              }
            }
            if (typeof contextType === "object" && contextType !== null) {
              context = readContext(contextType);
            } else {
              context = maskedLegacyContext;
            }
            var instance = new ctor(props, context);
            {
              if (typeof ctor.getDerivedStateFromProps === "function" && (instance.state === null || instance.state === void 0)) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutUninitializedState.has(componentName)) {
                  didWarnAboutUninitializedState.add(componentName);
                  error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
                }
              }
              if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
                var foundWillMountName = null;
                var foundWillReceivePropsName = null;
                var foundWillUpdateName = null;
                if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  foundWillMountName = "componentWillMount";
                } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                  foundWillMountName = "UNSAFE_componentWillMount";
                }
                if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                  foundWillReceivePropsName = "componentWillReceiveProps";
                } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                  foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
                }
                if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                  foundWillUpdateName = "componentWillUpdate";
                } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                  foundWillUpdateName = "UNSAFE_componentWillUpdate";
                }
                if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                  var _componentName = getComponentNameFromType(ctor) || "Component";
                  var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                  if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                    didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                    error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                  }
                }
              }
            }
            return instance;
          }
          function checkClassInstance(instance, ctor, newProps) {
            {
              var name = getComponentNameFromType(ctor) || "Component";
              var renderPresent = instance.render;
              if (!renderPresent) {
                if (ctor.prototype && typeof ctor.prototype.render === "function") {
                  error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                } else {
                  error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                }
              }
              if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
              }
              if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
              }
              if (instance.propTypes) {
                error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
              }
              if (instance.contextType) {
                error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
              }
              {
                if (instance.contextTypes) {
                  error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                }
                if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                  didWarnAboutContextTypeAndContextTypes.add(ctor);
                  error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                }
              }
              if (typeof instance.componentShouldUpdate === "function") {
                error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
              }
              if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
              }
              if (typeof instance.componentDidUnmount === "function") {
                error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
              }
              if (typeof instance.componentDidReceiveProps === "function") {
                error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
              }
              if (typeof instance.componentWillRecieveProps === "function") {
                error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
              }
              if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
              }
              var hasMutatedProps = instance.props !== newProps;
              if (instance.props !== void 0 && hasMutatedProps) {
                error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
              }
              if (instance.defaultProps) {
                error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
              }
              if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
              }
              if (typeof instance.getDerivedStateFromProps === "function") {
                error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof instance.getDerivedStateFromError === "function") {
                error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
              }
              if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
              }
              var _state = instance.state;
              if (_state && (typeof _state !== "object" || isArray(_state))) {
                error("%s.state: must be set to an object or null", name);
              }
              if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
              }
            }
          }
          function callComponentWillMount(type, instance) {
            var oldState = instance.state;
            if (typeof instance.componentWillMount === "function") {
              {
                if (instance.componentWillMount.__suppressDeprecationWarning !== true) {
                  var componentName = getComponentNameFromType(type) || "Unknown";
                  if (!didWarnAboutDeprecatedWillMount[componentName]) {
                    warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", componentName);
                    didWarnAboutDeprecatedWillMount[componentName] = true;
                  }
                }
              }
              instance.componentWillMount();
            }
            if (typeof instance.UNSAFE_componentWillMount === "function") {
              instance.UNSAFE_componentWillMount();
            }
            if (oldState !== instance.state) {
              {
                error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentNameFromType(type) || "Component");
              }
              classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
          }
          function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
            if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
              var oldQueue = internalInstance.queue;
              var oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && oldQueue.length === 1) {
                inst.state = oldQueue[0];
              } else {
                var nextState = oldReplace ? oldQueue[0] : inst.state;
                var dontMutate = true;
                for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i];
                  var partialState = typeof partial === "function" ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;
                  if (partialState != null) {
                    if (dontMutate) {
                      dontMutate = false;
                      nextState = assign({}, nextState, partialState);
                    } else {
                      assign(nextState, partialState);
                    }
                  }
                }
                inst.state = nextState;
              }
            } else {
              internalInstance.queue = null;
            }
          }
          function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
            {
              checkClassInstance(instance, ctor, newProps);
            }
            var initialState = instance.state !== void 0 ? instance.state : null;
            instance.updater = classComponentUpdater;
            instance.props = newProps;
            instance.state = initialState;
            var internalInstance = {
              queue: [],
              replace: false
            };
            set2(instance, internalInstance);
            var contextType = ctor.contextType;
            if (typeof contextType === "object" && contextType !== null) {
              instance.context = readContext(contextType);
            } else {
              instance.context = maskedLegacyContext;
            }
            {
              if (instance.state === newProps) {
                var componentName = getComponentNameFromType(ctor) || "Component";
                if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                  didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                  error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
                }
              }
            }
            var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
            }
            if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              callComponentWillMount(ctor, instance);
              processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
            }
          }
          var emptyTreeContext = {
            id: 1,
            overflow: ""
          };
          function getTreeId(context) {
            var overflow = context.overflow;
            var idWithLeadingBit = context.id;
            var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
            return id.toString(32) + overflow;
          }
          function pushTreeContext(baseContext, totalChildren, index) {
            var baseIdWithLeadingBit = baseContext.id;
            var baseOverflow = baseContext.overflow;
            var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
            var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
            var slot = index + 1;
            var length = getBitLength(totalChildren) + baseLength;
            if (length > 30) {
              var numberOfOverflowBits = baseLength - baseLength % 5;
              var newOverflowBits = (1 << numberOfOverflowBits) - 1;
              var newOverflow = (baseId & newOverflowBits).toString(32);
              var restOfBaseId = baseId >> numberOfOverflowBits;
              var restOfBaseLength = baseLength - numberOfOverflowBits;
              var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
              var restOfNewBits = slot << restOfBaseLength;
              var id = restOfNewBits | restOfBaseId;
              var overflow = newOverflow + baseOverflow;
              return {
                id: 1 << restOfLength | id,
                overflow
              };
            } else {
              var newBits = slot << baseLength;
              var _id = newBits | baseId;
              var _overflow = baseOverflow;
              return {
                id: 1 << length | _id,
                overflow: _overflow
              };
            }
          }
          function getBitLength(number) {
            return 32 - clz32(number);
          }
          function getLeadingBit(id) {
            return 1 << getBitLength(id) - 1;
          }
          var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
          var log = Math.log;
          var LN2 = Math.LN2;
          function clz32Fallback(x) {
            var asUint = x >>> 0;
            if (asUint === 0) {
              return 32;
            }
            return 31 - (log(asUint) / LN2 | 0) | 0;
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var currentlyRenderingComponent = null;
          var currentlyRenderingTask = null;
          var firstWorkInProgressHook = null;
          var workInProgressHook = null;
          var isReRender = false;
          var didScheduleRenderPhaseUpdate = false;
          var localIdCounter = 0;
          var renderPhaseUpdates = null;
          var numberOfReRenders = 0;
          var RE_RENDER_LIMIT = 25;
          var isInHookUserCodeInDev = false;
          var currentHookNameInDev;
          function resolveCurrentlyRenderingComponent() {
            if (currentlyRenderingComponent === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
            {
              if (isInHookUserCodeInDev) {
                error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
              }
            }
            return currentlyRenderingComponent;
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
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
              throw new Error("Rendered more hooks than during the previous render");
            }
            return {
              memoizedState: null,
              queue: null,
              next: null
            };
          }
          function createWorkInProgressHook() {
            if (workInProgressHook === null) {
              if (firstWorkInProgressHook === null) {
                isReRender = false;
                firstWorkInProgressHook = workInProgressHook = createHook();
              } else {
                isReRender = true;
                workInProgressHook = firstWorkInProgressHook;
              }
            } else {
              if (workInProgressHook.next === null) {
                isReRender = false;
                workInProgressHook = workInProgressHook.next = createHook();
              } else {
                isReRender = true;
                workInProgressHook = workInProgressHook.next;
              }
            }
            return workInProgressHook;
          }
          function prepareToUseHooks(task, componentIdentity) {
            currentlyRenderingComponent = componentIdentity;
            currentlyRenderingTask = task;
            {
              isInHookUserCodeInDev = false;
            }
            localIdCounter = 0;
          }
          function finishHooks(Component, props, children, refOrContext) {
            while (didScheduleRenderPhaseUpdate) {
              didScheduleRenderPhaseUpdate = false;
              localIdCounter = 0;
              numberOfReRenders += 1;
              workInProgressHook = null;
              children = Component(props, refOrContext);
            }
            resetHooksState();
            return children;
          }
          function checkDidRenderIdHook() {
            var didRenderIdHook = localIdCounter !== 0;
            return didRenderIdHook;
          }
          function resetHooksState() {
            {
              isInHookUserCodeInDev = false;
            }
            currentlyRenderingComponent = null;
            currentlyRenderingTask = null;
            didScheduleRenderPhaseUpdate = false;
            firstWorkInProgressHook = null;
            numberOfReRenders = 0;
            renderPhaseUpdates = null;
            workInProgressHook = null;
          }
          function readContext$1(context) {
            {
              if (isInHookUserCodeInDev) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            return readContext(context);
          }
          function useContext2(context) {
            {
              currentHookNameInDev = "useContext";
            }
            resolveCurrentlyRenderingComponent();
            return readContext(context);
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function useState2(initialState) {
            {
              currentHookNameInDev = "useState";
            }
            return useReducer2(basicStateReducer, initialState);
          }
          function useReducer2(reducer, initialArg, init) {
            {
              if (reducer !== basicStateReducer) {
                currentHookNameInDev = "useReducer";
              }
            }
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            if (isReRender) {
              var queue = workInProgressHook.queue;
              var dispatch = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
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
                initialState = typeof initialArg === "function" ? initialArg() : initialArg;
              } else {
                initialState = init !== void 0 ? init(initialArg) : initialArg;
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
          function useMemo2(nextCreate, deps) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
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
          function useRef2(initialValue) {
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
          function useLayoutEffect2(create, inputs) {
            {
              currentHookNameInDev = "useLayoutEffect";
              error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
            }
          }
          function dispatchAction(componentIdentity, queue, action) {
            if (numberOfReRenders >= RE_RENDER_LIMIT) {
              throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
            }
            if (componentIdentity === currentlyRenderingComponent) {
              didScheduleRenderPhaseUpdate = true;
              var update = {
                action,
                next: null
              };
              if (renderPhaseUpdates === null) {
                renderPhaseUpdates = /* @__PURE__ */ new Map();
              }
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate === void 0) {
                renderPhaseUpdates.set(queue, update);
              } else {
                var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                while (lastRenderPhaseUpdate.next !== null) {
                  lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                }
                lastRenderPhaseUpdate.next = update;
              }
            }
          }
          function useCallback2(callback, deps) {
            return useMemo2(function() {
              return callback;
            }, deps);
          }
          function useMutableSource(source, getSnapshot, subscribe) {
            resolveCurrentlyRenderingComponent();
            return getSnapshot(source._source);
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            if (getServerSnapshot === void 0) {
              throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
            }
            return getServerSnapshot();
          }
          function useDeferredValue(value) {
            resolveCurrentlyRenderingComponent();
            return value;
          }
          function unsupportedStartTransition() {
            throw new Error("startTransition cannot be called during server rendering.");
          }
          function useTransition() {
            resolveCurrentlyRenderingComponent();
            return [false, unsupportedStartTransition];
          }
          function useId() {
            var task = currentlyRenderingTask;
            var treeId = getTreeId(task.treeContext);
            var responseState = currentResponseState;
            if (responseState === null) {
              throw new Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
            }
            var localId = localIdCounter++;
            return makeId(responseState, treeId, localId);
          }
          function noop() {
          }
          var Dispatcher = {
            readContext: readContext$1,
            useContext: useContext2,
            useMemo: useMemo2,
            useReducer: useReducer2,
            useRef: useRef2,
            useState: useState2,
            useInsertionEffect: noop,
            useLayoutEffect: useLayoutEffect2,
            useCallback: useCallback2,
            useImperativeHandle: noop,
            useEffect: noop,
            useDebugValue: noop,
            useDeferredValue,
            useTransition,
            useId,
            useMutableSource,
            useSyncExternalStore
          };
          var currentResponseState = null;
          function setCurrentResponseState(responseState) {
            currentResponseState = responseState;
          }
          function getStackByComponentStackNode(componentStack) {
            try {
              var info = "";
              var node = componentStack;
              do {
                switch (node.tag) {
                  case 0:
                    info += describeBuiltInComponentFrame(node.type, null, null);
                    break;
                  case 1:
                    info += describeFunctionComponentFrame(node.type, null, null);
                    break;
                  case 2:
                    info += describeClassComponentFrame(node.type, null, null);
                    break;
                }
                node = node.parent;
              } while (node);
              return info;
            } catch (x) {
              return "\nError generating stack: " + x.message + "\n" + x.stack;
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          var PENDING = 0;
          var COMPLETED = 1;
          var FLUSHED = 2;
          var ABORTED = 3;
          var ERRORED = 4;
          var OPEN = 0;
          var CLOSING = 1;
          var CLOSED = 2;
          var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;
          function defaultErrorHandler(error2) {
            console["error"](error2);
            return null;
          }
          function noop$1() {
          }
          function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
            var pingedTasks = [];
            var abortSet = /* @__PURE__ */ new Set();
            var request = {
              destination: null,
              responseState,
              progressiveChunkSize: progressiveChunkSize === void 0 ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
              status: OPEN,
              fatalError: null,
              nextSegmentId: 0,
              allPendingTasks: 0,
              pendingRootTasks: 0,
              completedRootSegment: null,
              abortableTasks: abortSet,
              pingedTasks,
              clientRenderedBoundaries: [],
              completedBoundaries: [],
              partialBoundaries: [],
              onError: onError === void 0 ? defaultErrorHandler : onError,
              onAllReady: onAllReady === void 0 ? noop$1 : onAllReady,
              onShellReady: onShellReady === void 0 ? noop$1 : onShellReady,
              onShellError: onShellError === void 0 ? noop$1 : onShellError,
              onFatalError: onFatalError === void 0 ? noop$1 : onFatalError
            };
            var rootSegment = createPendingSegment(request, 0, null, rootFormatContext, false, false);
            rootSegment.parentFlushed = true;
            var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
            pingedTasks.push(rootTask);
            return request;
          }
          function pingTask(request, task) {
            var pingedTasks = request.pingedTasks;
            pingedTasks.push(task);
            if (pingedTasks.length === 1) {
              scheduleWork(function() {
                return performWork(request);
              });
            }
          }
          function createSuspenseBoundary(request, fallbackAbortableTasks) {
            return {
              id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
              rootSegmentID: -1,
              parentFlushed: false,
              pendingTasks: 0,
              forceClientRender: false,
              completedSegments: [],
              byteSize: 0,
              fallbackAbortableTasks,
              errorDigest: null
            };
          }
          function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
            request.allPendingTasks++;
            if (blockedBoundary === null) {
              request.pendingRootTasks++;
            } else {
              blockedBoundary.pendingTasks++;
            }
            var task = {
              node,
              ping: function() {
                return pingTask(request, task);
              },
              blockedBoundary,
              blockedSegment,
              abortSet,
              legacyContext,
              context,
              treeContext
            };
            {
              task.componentStack = null;
            }
            abortSet.add(task);
            return task;
          }
          function createPendingSegment(request, index, boundary, formatContext, lastPushedText, textEmbedded) {
            return {
              status: PENDING,
              id: -1,
              index,
              parentFlushed: false,
              chunks: [],
              children: [],
              formatContext,
              boundary,
              lastPushedText,
              textEmbedded
            };
          }
          var currentTaskInDEV = null;
          function getCurrentStackInDEV() {
            {
              if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
                return "";
              }
              return getStackByComponentStackNode(currentTaskInDEV.componentStack);
            }
          }
          function pushBuiltInComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 0,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushFunctionComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 1,
                parent: task.componentStack,
                type
              };
            }
          }
          function pushClassComponentStackInDEV(task, type) {
            {
              task.componentStack = {
                tag: 2,
                parent: task.componentStack,
                type
              };
            }
          }
          function popComponentStackInDEV(task) {
            {
              if (task.componentStack === null) {
                error("Unexpectedly popped too many stack frames. This is a bug in React.");
              } else {
                task.componentStack = task.componentStack.parent;
              }
            }
          }
          var lastBoundaryErrorComponentStackDev = null;
          function captureBoundaryErrorDetailsDev(boundary, error2) {
            {
              var errorMessage;
              if (typeof error2 === "string") {
                errorMessage = error2;
              } else if (error2 && typeof error2.message === "string") {
                errorMessage = error2.message;
              } else {
                errorMessage = String(error2);
              }
              var errorComponentStack = lastBoundaryErrorComponentStackDev || getCurrentStackInDEV();
              lastBoundaryErrorComponentStackDev = null;
              boundary.errorMessage = errorMessage;
              boundary.errorComponentStack = errorComponentStack;
            }
          }
          function logRecoverableError(request, error2) {
            var errorDigest = request.onError(error2);
            if (errorDigest != null && typeof errorDigest !== "string") {
              throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
            }
            return errorDigest;
          }
          function fatalError(request, error2) {
            var onShellError = request.onShellError;
            onShellError(error2);
            var onFatalError = request.onFatalError;
            onFatalError(error2);
            if (request.destination !== null) {
              request.status = CLOSED;
              closeWithError(request.destination, error2);
            } else {
              request.status = CLOSING;
              request.fatalError = error2;
            }
          }
          function renderSuspenseBoundary(request, task, props) {
            pushBuiltInComponentStackInDEV(task, "Suspense");
            var parentBoundary = task.blockedBoundary;
            var parentSegment = task.blockedSegment;
            var fallback = props.fallback;
            var content = props.children;
            var fallbackAbortSet = /* @__PURE__ */ new Set();
            var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
            var insertionIndex = parentSegment.chunks.length;
            var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext, false, false);
            parentSegment.children.push(boundarySegment);
            parentSegment.lastPushedText = false;
            var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext, false, false);
            contentRootSegment.parentFlushed = true;
            task.blockedBoundary = newBoundary;
            task.blockedSegment = contentRootSegment;
            try {
              renderNode(request, task, content);
              pushSegmentFinale(contentRootSegment.chunks, request.responseState, contentRootSegment.lastPushedText, contentRootSegment.textEmbedded);
              contentRootSegment.status = COMPLETED;
              queueCompletedSegment(newBoundary, contentRootSegment);
              if (newBoundary.pendingTasks === 0) {
                popComponentStackInDEV(task);
                return;
              }
            } catch (error2) {
              contentRootSegment.status = ERRORED;
              newBoundary.forceClientRender = true;
              newBoundary.errorDigest = logRecoverableError(request, error2);
              {
                captureBoundaryErrorDetailsDev(newBoundary, error2);
              }
            } finally {
              task.blockedBoundary = parentBoundary;
              task.blockedSegment = parentSegment;
            }
            var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);
            {
              suspendedFallbackTask.componentStack = task.componentStack;
            }
            request.pingedTasks.push(suspendedFallbackTask);
            popComponentStackInDEV(task);
          }
          function renderHostElement(request, task, type, props) {
            pushBuiltInComponentStackInDEV(task, type);
            var segment = task.blockedSegment;
            var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
            segment.lastPushedText = false;
            var prevContext = segment.formatContext;
            segment.formatContext = getChildFormatContext(prevContext, type, props);
            renderNode(request, task, children);
            segment.formatContext = prevContext;
            pushEndInstance(segment.chunks, type);
            segment.lastPushedText = false;
            popComponentStackInDEV(task);
          }
          function shouldConstruct$1(Component) {
            return Component.prototype && Component.prototype.isReactComponent;
          }
          function renderWithHooks(request, task, Component, props, secondArg) {
            var componentIdentity = {};
            prepareToUseHooks(task, componentIdentity);
            var result = Component(props, secondArg);
            return finishHooks(Component, props, result, secondArg);
          }
          function finishClassComponent(request, task, instance, Component, props) {
            var nextChildren = instance.render();
            {
              if (instance.props !== props) {
                if (!didWarnAboutReassigningProps) {
                  error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentNameFromType(Component) || "a component");
                }
                didWarnAboutReassigningProps = true;
              }
            }
            {
              var childContextTypes = Component.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                var previousContext = task.legacyContext;
                var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
                task.legacyContext = mergedContext;
                renderNodeDestructive(request, task, nextChildren);
                task.legacyContext = previousContext;
                return;
              }
            }
            renderNodeDestructive(request, task, nextChildren);
          }
          function renderClassComponent(request, task, Component, props) {
            pushClassComponentStackInDEV(task, Component);
            var maskedContext = getMaskedContext(Component, task.legacyContext);
            var instance = constructClassInstance(Component, props, maskedContext);
            mountClassInstance(instance, Component, props, maskedContext);
            finishClassComponent(request, task, instance, Component, props);
            popComponentStackInDEV(task);
          }
          var didWarnAboutBadClass = {};
          var didWarnAboutModulePatternComponent = {};
          var didWarnAboutContextTypeOnFunctionComponent = {};
          var didWarnAboutGetDerivedStateOnFunctionComponent = {};
          var didWarnAboutReassigningProps = false;
          var didWarnAboutGenerators = false;
          var didWarnAboutMaps = false;
          var hasWarnedAboutUsingContextAsConsumer = false;
          function renderIndeterminateComponent(request, task, Component, props) {
            var legacyContext;
            {
              legacyContext = getMaskedContext(Component, task.legacyContext);
            }
            pushFunctionComponentStackInDEV(task, Component);
            {
              if (Component.prototype && typeof Component.prototype.render === "function") {
                var componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutBadClass[componentName]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                  didWarnAboutBadClass[componentName] = true;
                }
              }
            }
            var value = renderWithHooks(request, task, Component, props, legacyContext);
            var hasId = checkDidRenderIdHook();
            {
              if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
                var _componentName = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                  didWarnAboutModulePatternComponent[_componentName] = true;
                }
              }
            }
            if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
              {
                var _componentName2 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutModulePatternComponent[_componentName2]) {
                  error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName2, _componentName2, _componentName2);
                  didWarnAboutModulePatternComponent[_componentName2] = true;
                }
              }
              mountClassInstance(value, Component, props, legacyContext);
              finishClassComponent(request, task, value, Component, props);
            } else {
              {
                validateFunctionComponentInDev(Component);
              }
              if (hasId) {
                var prevTreeContext = task.treeContext;
                var totalChildren = 1;
                var index = 0;
                task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
                try {
                  renderNodeDestructive(request, task, value);
                } finally {
                  task.treeContext = prevTreeContext;
                }
              } else {
                renderNodeDestructive(request, task, value);
              }
            }
            popComponentStackInDEV(task);
          }
          function validateFunctionComponentInDev(Component) {
            {
              if (Component) {
                if (Component.childContextTypes) {
                  error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
                }
              }
              if (typeof Component.getDerivedStateFromProps === "function") {
                var _componentName3 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
                  error("%s: Function components do not support getDerivedStateFromProps.", _componentName3);
                  didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
                }
              }
              if (typeof Component.contextType === "object" && Component.contextType !== null) {
                var _componentName4 = getComponentNameFromType(Component) || "Unknown";
                if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
                  error("%s: Function components do not support contextType.", _componentName4);
                  didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
                }
              }
            }
          }
          function resolveDefaultProps(Component, baseProps) {
            if (Component && Component.defaultProps) {
              var props = assign({}, baseProps);
              var defaultProps = Component.defaultProps;
              for (var propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
              return props;
            }
            return baseProps;
          }
          function renderForwardRef(request, task, type, props, ref) {
            pushFunctionComponentStackInDEV(task, type.render);
            var children = renderWithHooks(request, task, type.render, props, ref);
            var hasId = checkDidRenderIdHook();
            if (hasId) {
              var prevTreeContext = task.treeContext;
              var totalChildren = 1;
              var index = 0;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);
              try {
                renderNodeDestructive(request, task, children);
              } finally {
                task.treeContext = prevTreeContext;
              }
            } else {
              renderNodeDestructive(request, task, children);
            }
            popComponentStackInDEV(task);
          }
          function renderMemo(request, task, type, props, ref) {
            var innerType = type.type;
            var resolvedProps = resolveDefaultProps(innerType, props);
            renderElement(request, task, innerType, resolvedProps, ref);
          }
          function renderContextConsumer(request, task, context, props) {
            {
              if (context._context === void 0) {
                if (context !== context.Consumer) {
                  if (!hasWarnedAboutUsingContextAsConsumer) {
                    hasWarnedAboutUsingContextAsConsumer = true;
                    error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                }
              } else {
                context = context._context;
              }
            }
            var render = props.children;
            {
              if (typeof render !== "function") {
                error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
              }
            }
            var newValue = readContext(context);
            var newChildren = render(newValue);
            renderNodeDestructive(request, task, newChildren);
          }
          function renderContextProvider(request, task, type, props) {
            var context = type._context;
            var value = props.value;
            var children = props.children;
            var prevSnapshot;
            {
              prevSnapshot = task.context;
            }
            task.context = pushProvider(context, value);
            renderNodeDestructive(request, task, children);
            task.context = popProvider(context);
            {
              if (prevSnapshot !== task.context) {
                error("Popping the context provider did not return back to the original snapshot. This is a bug in React.");
              }
            }
          }
          function renderLazyComponent(request, task, lazyComponent, props, ref) {
            pushBuiltInComponentStackInDEV(task, "Lazy");
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
            var Component = init(payload);
            var resolvedProps = resolveDefaultProps(Component, props);
            renderElement(request, task, Component, resolvedProps, ref);
            popComponentStackInDEV(task);
          }
          function renderElement(request, task, type, props, ref) {
            if (typeof type === "function") {
              if (shouldConstruct$1(type)) {
                renderClassComponent(request, task, type, props);
                return;
              } else {
                renderIndeterminateComponent(request, task, type, props);
                return;
              }
            }
            if (typeof type === "string") {
              renderHostElement(request, task, type, props);
              return;
            }
            switch (type) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_FRAGMENT_TYPE: {
                renderNodeDestructive(request, task, props.children);
                return;
              }
              case REACT_SUSPENSE_LIST_TYPE: {
                pushBuiltInComponentStackInDEV(task, "SuspenseList");
                renderNodeDestructive(request, task, props.children);
                popComponentStackInDEV(task);
                return;
              }
              case REACT_SCOPE_TYPE: {
                throw new Error("ReactDOMServer does not yet support scope components.");
              }
              case REACT_SUSPENSE_TYPE: {
                {
                  renderSuspenseBoundary(request, task, props);
                }
                return;
              }
            }
            if (typeof type === "object" && type !== null) {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  renderForwardRef(request, task, type, props, ref);
                  return;
                }
                case REACT_MEMO_TYPE: {
                  renderMemo(request, task, type, props, ref);
                  return;
                }
                case REACT_PROVIDER_TYPE: {
                  renderContextProvider(request, task, type, props);
                  return;
                }
                case REACT_CONTEXT_TYPE: {
                  renderContextConsumer(request, task, type, props);
                  return;
                }
                case REACT_LAZY_TYPE: {
                  renderLazyComponent(request, task, type, props);
                  return;
                }
              }
            }
            var info = "";
            {
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (type == null ? type : typeof type) + "." + info));
          }
          function validateIterable(iterable, iteratorFn) {
            {
              if (typeof Symbol === "function" && iterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (iterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
            }
          }
          function renderNodeDestructive(request, task, node) {
            {
              try {
                return renderNodeDestructiveImpl(request, task, node);
              } catch (x) {
                if (typeof x === "object" && x !== null && typeof x.then === "function")
                  ;
                else {
                  lastBoundaryErrorComponentStackDev = lastBoundaryErrorComponentStackDev !== null ? lastBoundaryErrorComponentStackDev : getCurrentStackInDEV();
                }
                throw x;
              }
            }
          }
          function renderNodeDestructiveImpl(request, task, node) {
            task.node = node;
            if (typeof node === "object" && node !== null) {
              switch (node.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var element = node;
                  var type = element.type;
                  var props = element.props;
                  var ref = element.ref;
                  renderElement(request, task, type, props, ref);
                  return;
                }
                case REACT_PORTAL_TYPE:
                  throw new Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                case REACT_LAZY_TYPE: {
                  var lazyNode = node;
                  var payload = lazyNode._payload;
                  var init = lazyNode._init;
                  var resolvedNode;
                  {
                    try {
                      resolvedNode = init(payload);
                    } catch (x) {
                      if (typeof x === "object" && x !== null && typeof x.then === "function") {
                        pushBuiltInComponentStackInDEV(task, "Lazy");
                      }
                      throw x;
                    }
                  }
                  renderNodeDestructive(request, task, resolvedNode);
                  return;
                }
              }
              if (isArray(node)) {
                renderChildrenArray(request, task, node);
                return;
              }
              var iteratorFn = getIteratorFn(node);
              if (iteratorFn) {
                {
                  validateIterable(node, iteratorFn);
                }
                var iterator = iteratorFn.call(node);
                if (iterator) {
                  var step = iterator.next();
                  if (!step.done) {
                    var children = [];
                    do {
                      children.push(step.value);
                      step = iterator.next();
                    } while (!step.done);
                    renderChildrenArray(request, task, children);
                    return;
                  }
                  return;
                }
              }
              var childString = Object.prototype.toString.call(node);
              throw new Error("Objects are not valid as a React child (found: " + (childString === "[object Object]" ? "object with keys {" + Object.keys(node).join(", ") + "}" : childString) + "). If you meant to render a collection of children, use an array instead.");
            }
            if (typeof node === "string") {
              var segment = task.blockedSegment;
              segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, node, request.responseState, segment.lastPushedText);
              return;
            }
            if (typeof node === "number") {
              var _segment = task.blockedSegment;
              _segment.lastPushedText = pushTextInstance(task.blockedSegment.chunks, "" + node, request.responseState, _segment.lastPushedText);
              return;
            }
            {
              if (typeof node === "function") {
                error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
              }
            }
          }
          function renderChildrenArray(request, task, children) {
            var totalChildren = children.length;
            for (var i = 0; i < totalChildren; i++) {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);
              try {
                renderNode(request, task, children[i]);
              } finally {
                task.treeContext = prevTreeContext;
              }
            }
          }
          function spawnNewSuspendedTask(request, task, x) {
            var segment = task.blockedSegment;
            var insertionIndex = segment.chunks.length;
            var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext, segment.lastPushedText, true);
            segment.children.push(newSegment);
            segment.lastPushedText = false;
            var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);
            {
              if (task.componentStack !== null) {
                newTask.componentStack = task.componentStack.parent;
              }
            }
            var ping = newTask.ping;
            x.then(ping, ping);
          }
          function renderNode(request, task, node) {
            var previousFormatContext = task.blockedSegment.formatContext;
            var previousLegacyContext = task.legacyContext;
            var previousContext = task.context;
            var previousComponentStack = null;
            {
              previousComponentStack = task.componentStack;
            }
            try {
              return renderNodeDestructive(request, task, node);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                spawnNewSuspendedTask(request, task, x);
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                return;
              } else {
                task.blockedSegment.formatContext = previousFormatContext;
                task.legacyContext = previousLegacyContext;
                task.context = previousContext;
                switchContext(previousContext);
                {
                  task.componentStack = previousComponentStack;
                }
                throw x;
              }
            }
          }
          function erroredTask(request, boundary, segment, error2) {
            var errorDigest = logRecoverableError(request, error2);
            if (boundary === null) {
              fatalError(request, error2);
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                boundary.errorDigest = errorDigest;
                {
                  captureBoundaryErrorDetailsDev(boundary, error2);
                }
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function abortTaskSoft(task) {
            var request = this;
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            finishedTask(request, boundary, segment);
          }
          function abortTask(task, request, reason) {
            var boundary = task.blockedBoundary;
            var segment = task.blockedSegment;
            segment.status = ABORTED;
            if (boundary === null) {
              request.allPendingTasks--;
              if (request.status !== CLOSED) {
                request.status = CLOSED;
                if (request.destination !== null) {
                  close(request.destination);
                }
              }
            } else {
              boundary.pendingTasks--;
              if (!boundary.forceClientRender) {
                boundary.forceClientRender = true;
                var _error = reason === void 0 ? new Error("The render was aborted by the server without a reason.") : reason;
                boundary.errorDigest = request.onError(_error);
                {
                  var errorPrefix = "The server did not finish this Suspense boundary: ";
                  if (_error && typeof _error.message === "string") {
                    _error = errorPrefix + _error.message;
                  } else {
                    _error = errorPrefix + String(_error);
                  }
                  var previousTaskInDev = currentTaskInDEV;
                  currentTaskInDEV = task;
                  try {
                    captureBoundaryErrorDetailsDev(boundary, _error);
                  } finally {
                    currentTaskInDEV = previousTaskInDev;
                  }
                }
                if (boundary.parentFlushed) {
                  request.clientRenderedBoundaries.push(boundary);
                }
              }
              boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
                return abortTask(fallbackTask, request, reason);
              });
              boundary.fallbackAbortableTasks.clear();
              request.allPendingTasks--;
              if (request.allPendingTasks === 0) {
                var onAllReady = request.onAllReady;
                onAllReady();
              }
            }
          }
          function queueCompletedSegment(boundary, segment) {
            if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
              var childSegment = segment.children[0];
              childSegment.id = segment.id;
              childSegment.parentFlushed = true;
              if (childSegment.status === COMPLETED) {
                queueCompletedSegment(boundary, childSegment);
              }
            } else {
              var completedSegments = boundary.completedSegments;
              completedSegments.push(segment);
            }
          }
          function finishedTask(request, boundary, segment) {
            if (boundary === null) {
              if (segment.parentFlushed) {
                if (request.completedRootSegment !== null) {
                  throw new Error("There can only be one root segment. This is a bug in React.");
                }
                request.completedRootSegment = segment;
              }
              request.pendingRootTasks--;
              if (request.pendingRootTasks === 0) {
                request.onShellError = noop$1;
                var onShellReady = request.onShellReady;
                onShellReady();
              }
            } else {
              boundary.pendingTasks--;
              if (boundary.forceClientRender)
                ;
              else if (boundary.pendingTasks === 0) {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                  }
                }
                if (boundary.parentFlushed) {
                  request.completedBoundaries.push(boundary);
                }
                boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
                boundary.fallbackAbortableTasks.clear();
              } else {
                if (segment.parentFlushed) {
                  if (segment.status === COMPLETED) {
                    queueCompletedSegment(boundary, segment);
                    var completedSegments = boundary.completedSegments;
                    if (completedSegments.length === 1) {
                      if (boundary.parentFlushed) {
                        request.partialBoundaries.push(boundary);
                      }
                    }
                  }
                }
              }
            }
            request.allPendingTasks--;
            if (request.allPendingTasks === 0) {
              var onAllReady = request.onAllReady;
              onAllReady();
            }
          }
          function retryTask(request, task) {
            var segment = task.blockedSegment;
            if (segment.status !== PENDING) {
              return;
            }
            switchContext(task.context);
            var prevTaskInDEV = null;
            {
              prevTaskInDEV = currentTaskInDEV;
              currentTaskInDEV = task;
            }
            try {
              renderNodeDestructive(request, task, task.node);
              pushSegmentFinale(segment.chunks, request.responseState, segment.lastPushedText, segment.textEmbedded);
              task.abortSet.delete(task);
              segment.status = COMPLETED;
              finishedTask(request, task.blockedBoundary, segment);
            } catch (x) {
              resetHooksState();
              if (typeof x === "object" && x !== null && typeof x.then === "function") {
                var ping = task.ping;
                x.then(ping, ping);
              } else {
                task.abortSet.delete(task);
                segment.status = ERRORED;
                erroredTask(request, task.blockedBoundary, segment, x);
              }
            } finally {
              {
                currentTaskInDEV = prevTaskInDEV;
              }
            }
          }
          function performWork(request) {
            if (request.status === CLOSED) {
              return;
            }
            var prevContext = getActiveContext();
            var prevDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = Dispatcher;
            var prevGetCurrentStackImpl;
            {
              prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
              ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
            }
            var prevResponseState = currentResponseState;
            setCurrentResponseState(request.responseState);
            try {
              var pingedTasks = request.pingedTasks;
              var i;
              for (i = 0; i < pingedTasks.length; i++) {
                var task = pingedTasks[i];
                retryTask(request, task);
              }
              pingedTasks.splice(0, i);
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            } finally {
              setCurrentResponseState(prevResponseState);
              ReactCurrentDispatcher$1.current = prevDispatcher;
              {
                ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
              }
              if (prevDispatcher === Dispatcher) {
                switchContext(prevContext);
              }
            }
          }
          function flushSubtree(request, destination, segment) {
            segment.parentFlushed = true;
            switch (segment.status) {
              case PENDING: {
                var segmentID = segment.id = request.nextSegmentId++;
                segment.lastPushedText = false;
                segment.textEmbedded = false;
                return writePlaceholder(destination, request.responseState, segmentID);
              }
              case COMPLETED: {
                segment.status = FLUSHED;
                var r = true;
                var chunks = segment.chunks;
                var chunkIdx = 0;
                var children = segment.children;
                for (var childIdx = 0; childIdx < children.length; childIdx++) {
                  var nextChild = children[childIdx];
                  for (; chunkIdx < nextChild.index; chunkIdx++) {
                    writeChunk(destination, chunks[chunkIdx]);
                  }
                  r = flushSegment(request, destination, nextChild);
                }
                for (; chunkIdx < chunks.length - 1; chunkIdx++) {
                  writeChunk(destination, chunks[chunkIdx]);
                }
                if (chunkIdx < chunks.length) {
                  r = writeChunkAndReturn(destination, chunks[chunkIdx]);
                }
                return r;
              }
              default: {
                throw new Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
              }
            }
          }
          function flushSegment(request, destination, segment) {
            var boundary = segment.boundary;
            if (boundary === null) {
              return flushSubtree(request, destination, segment);
            }
            boundary.parentFlushed = true;
            if (boundary.forceClientRender) {
              writeStartClientRenderedSuspenseBoundary(destination, request.responseState, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
              flushSubtree(request, destination, segment);
              return writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
            } else if (boundary.pendingTasks > 0) {
              boundary.rootSegmentID = request.nextSegmentId++;
              if (boundary.completedSegments.length > 0) {
                request.partialBoundaries.push(boundary);
              }
              var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
              writeStartPendingSuspenseBoundary(destination, request.responseState, id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else if (boundary.byteSize > request.progressiveChunkSize) {
              boundary.rootSegmentID = request.nextSegmentId++;
              request.completedBoundaries.push(boundary);
              writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id);
              flushSubtree(request, destination, segment);
              return writeEndPendingSuspenseBoundary(destination, request.responseState);
            } else {
              writeStartCompletedSuspenseBoundary(destination, request.responseState);
              var completedSegments = boundary.completedSegments;
              if (completedSegments.length !== 1) {
                throw new Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
              }
              var contentSegment = completedSegments[0];
              flushSegment(request, destination, contentSegment);
              return writeEndCompletedSuspenseBoundary(destination, request.responseState);
            }
          }
          function flushClientRenderedBoundary(request, destination, boundary) {
            return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id, boundary.errorDigest, boundary.errorMessage, boundary.errorComponentStack);
          }
          function flushSegmentContainer(request, destination, segment) {
            writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
            flushSegment(request, destination, segment);
            return writeEndSegment(destination, segment.formatContext);
          }
          function flushCompletedBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              flushPartiallyCompletedSegment(request, destination, boundary, segment);
            }
            completedSegments.length = 0;
            return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
          }
          function flushPartialBoundary(request, destination, boundary) {
            var completedSegments = boundary.completedSegments;
            var i = 0;
            for (; i < completedSegments.length; i++) {
              var segment = completedSegments[i];
              if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
                i++;
                completedSegments.splice(0, i);
                return false;
              }
            }
            completedSegments.splice(0, i);
            return true;
          }
          function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
            if (segment.status === FLUSHED) {
              return true;
            }
            var segmentID = segment.id;
            if (segmentID === -1) {
              var rootSegmentID = segment.id = boundary.rootSegmentID;
              if (rootSegmentID === -1) {
                throw new Error("A root segment ID must have been assigned by now. This is a bug in React.");
              }
              return flushSegmentContainer(request, destination, segment);
            } else {
              flushSegmentContainer(request, destination, segment);
              return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
            }
          }
          function flushCompletedQueues(request, destination) {
            beginWriting();
            try {
              var completedRootSegment = request.completedRootSegment;
              if (completedRootSegment !== null && request.pendingRootTasks === 0) {
                flushSegment(request, destination, completedRootSegment);
                request.completedRootSegment = null;
                writeCompletedRoot(destination, request.responseState);
              }
              var clientRenderedBoundaries = request.clientRenderedBoundaries;
              var i;
              for (i = 0; i < clientRenderedBoundaries.length; i++) {
                var boundary = clientRenderedBoundaries[i];
                if (!flushClientRenderedBoundary(request, destination, boundary)) {
                  request.destination = null;
                  i++;
                  clientRenderedBoundaries.splice(0, i);
                  return;
                }
              }
              clientRenderedBoundaries.splice(0, i);
              var completedBoundaries = request.completedBoundaries;
              for (i = 0; i < completedBoundaries.length; i++) {
                var _boundary = completedBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary)) {
                  request.destination = null;
                  i++;
                  completedBoundaries.splice(0, i);
                  return;
                }
              }
              completedBoundaries.splice(0, i);
              completeWriting(destination);
              beginWriting(destination);
              var partialBoundaries = request.partialBoundaries;
              for (i = 0; i < partialBoundaries.length; i++) {
                var _boundary2 = partialBoundaries[i];
                if (!flushPartialBoundary(request, destination, _boundary2)) {
                  request.destination = null;
                  i++;
                  partialBoundaries.splice(0, i);
                  return;
                }
              }
              partialBoundaries.splice(0, i);
              var largeBoundaries = request.completedBoundaries;
              for (i = 0; i < largeBoundaries.length; i++) {
                var _boundary3 = largeBoundaries[i];
                if (!flushCompletedBoundary(request, destination, _boundary3)) {
                  request.destination = null;
                  i++;
                  largeBoundaries.splice(0, i);
                  return;
                }
              }
              largeBoundaries.splice(0, i);
            } finally {
              completeWriting(destination);
              if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0) {
                {
                  if (request.abortableTasks.size !== 0) {
                    error("There was still abortable task at the root when we closed. This is a bug in React.");
                  }
                }
                close(destination);
              }
            }
          }
          function startWork(request) {
            scheduleWork(function() {
              return performWork(request);
            });
          }
          function startFlowing(request, destination) {
            if (request.status === CLOSING) {
              request.status = CLOSED;
              closeWithError(destination, request.fatalError);
              return;
            }
            if (request.status === CLOSED) {
              return;
            }
            if (request.destination !== null) {
              return;
            }
            request.destination = destination;
            try {
              flushCompletedQueues(request, destination);
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function abort(request, reason) {
            try {
              var abortableTasks = request.abortableTasks;
              abortableTasks.forEach(function(task) {
                return abortTask(task, request, reason);
              });
              abortableTasks.clear();
              if (request.destination !== null) {
                flushCompletedQueues(request, request.destination);
              }
            } catch (error2) {
              logRecoverableError(request, error2);
              fatalError(request, error2);
            }
          }
          function renderToReadableStream(children, options) {
            return new Promise(function(resolve, reject) {
              var onFatalError;
              var onAllReady;
              var allReady = new Promise(function(res, rej) {
                onAllReady = res;
                onFatalError = rej;
              });
              function onShellReady() {
                var stream = new ReadableStream({
                  type: "bytes",
                  pull: function(controller) {
                    startFlowing(request, controller);
                  },
                  cancel: function(reason) {
                    abort(request);
                  }
                }, {
                  highWaterMark: 0
                });
                stream.allReady = allReady;
                resolve(stream);
              }
              function onShellError(error2) {
                allReady.catch(function() {
                });
                reject(error2);
              }
              var request = createRequest(children, createResponseState(options ? options.identifierPrefix : void 0, options ? options.nonce : void 0, options ? options.bootstrapScriptContent : void 0, options ? options.bootstrapScripts : void 0, options ? options.bootstrapModules : void 0), createRootFormatContext(options ? options.namespaceURI : void 0), options ? options.progressiveChunkSize : void 0, options ? options.onError : void 0, onAllReady, onShellReady, onShellError, onFatalError);
              if (options && options.signal) {
                var signal = options.signal;
                var listener = function() {
                  abort(request, signal.reason);
                  signal.removeEventListener("abort", listener);
                };
                signal.addEventListener("abort", listener);
              }
              startWork(request);
            });
          }
          exports.renderToReadableStream = renderToReadableStream;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // node_modules/react-dom/server.browser.js
  var require_server_browser = __commonJS({
    "node_modules/react-dom/server.browser.js"(exports) {
      "use strict";
      var l;
      var s2;
      if (false) {
        l = null;
        s2 = null;
      } else {
        l = require_react_dom_server_legacy_browser_development();
        s2 = require_react_dom_server_browser_development();
      }
      exports.version = l.version;
      exports.renderToString = l.renderToString;
      exports.renderToStaticMarkup = l.renderToStaticMarkup;
      exports.renderToNodeStream = l.renderToNodeStream;
      exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
      exports.renderToReadableStream = s2.renderToReadableStream;
    }
  });

  // node_modules/memory-cache/index.js
  var require_memory_cache = __commonJS({
    "node_modules/memory-cache/index.js"(exports, module) {
      "use strict";
      function Cache2() {
        var _cache = /* @__PURE__ */ Object.create(null);
        var _hitCount = 0;
        var _missCount = 0;
        var _size = 0;
        var _debug = false;
        this.put = function(key, value, time, timeoutCallback) {
          if (_debug) {
            console.log("caching: %s = %j (@%s)", key, value, time);
          }
          if (typeof time !== "undefined" && (typeof time !== "number" || isNaN(time) || time <= 0)) {
            throw new Error("Cache timeout must be a positive number");
          } else if (typeof timeoutCallback !== "undefined" && typeof timeoutCallback !== "function") {
            throw new Error("Cache timeout callback must be a function");
          }
          var oldRecord = _cache[key];
          if (oldRecord) {
            clearTimeout(oldRecord.timeout);
          } else {
            _size++;
          }
          var record = {
            value,
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
        function _del(key) {
          _size--;
          delete _cache[key];
        }
        this.clear = function() {
          for (var key in _cache) {
            clearTimeout(_cache[key].timeout);
          }
          _size = 0;
          _cache = /* @__PURE__ */ Object.create(null);
          if (_debug) {
            _hitCount = 0;
            _missCount = 0;
          }
        };
        this.get = function(key) {
          var data = _cache[key];
          if (typeof data != "undefined") {
            if (isNaN(data.expire) || data.expire >= Date.now()) {
              if (_debug)
                _hitCount++;
              return data.value;
            } else {
              if (_debug)
                _missCount++;
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
          var size = 0, key;
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
          for (var key in _cache) {
            var record = _cache[key];
            plainJsCache[key] = {
              value: record.value,
              expire: record.expire || "NaN"
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
                    console.log("Skipping duplicate imported key '%s'", key);
                  }
                  continue;
                }
              }
              var record = cacheToImport[key];
              var remainingTime = record.expire - currTime;
              if (remainingTime <= 0) {
                this.del(key);
                continue;
              }
              remainingTime = remainingTime > 0 ? remainingTime : void 0;
              this.put(key, record.value, remainingTime);
            }
          }
          return this.size();
        };
      }
      module.exports = new Cache2();
      module.exports.Cache = Cache2;
    }
  });

  // node_modules/react-dom-factories/index.js
  var require_react_dom_factories = __commonJS({
    "node_modules/react-dom-factories/index.js"(exports, module) {
      "use strict";
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f(require_react());
        } else if (typeof define === "function" && define.amd) {
          define(["react"], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          if (typeof g.React === "undefined") {
            throw Error("React module should be required before ReactDOMFactories");
          }
          g.ReactDOMFactories = f(g.React);
        }
      })(function(React6) {
        function createDOMFactory(type) {
          var factory = React6.createElement.bind(null, type);
          factory.type = type;
          return factory;
        }
        ;
        var ReactDOMFactories = {
          a: createDOMFactory("a"),
          abbr: createDOMFactory("abbr"),
          address: createDOMFactory("address"),
          area: createDOMFactory("area"),
          article: createDOMFactory("article"),
          aside: createDOMFactory("aside"),
          audio: createDOMFactory("audio"),
          b: createDOMFactory("b"),
          base: createDOMFactory("base"),
          bdi: createDOMFactory("bdi"),
          bdo: createDOMFactory("bdo"),
          big: createDOMFactory("big"),
          blockquote: createDOMFactory("blockquote"),
          body: createDOMFactory("body"),
          br: createDOMFactory("br"),
          button: createDOMFactory("button"),
          canvas: createDOMFactory("canvas"),
          caption: createDOMFactory("caption"),
          cite: createDOMFactory("cite"),
          code: createDOMFactory("code"),
          col: createDOMFactory("col"),
          colgroup: createDOMFactory("colgroup"),
          data: createDOMFactory("data"),
          datalist: createDOMFactory("datalist"),
          dd: createDOMFactory("dd"),
          del: createDOMFactory("del"),
          details: createDOMFactory("details"),
          dfn: createDOMFactory("dfn"),
          dialog: createDOMFactory("dialog"),
          div: createDOMFactory("div"),
          dl: createDOMFactory("dl"),
          dt: createDOMFactory("dt"),
          em: createDOMFactory("em"),
          embed: createDOMFactory("embed"),
          fieldset: createDOMFactory("fieldset"),
          figcaption: createDOMFactory("figcaption"),
          figure: createDOMFactory("figure"),
          footer: createDOMFactory("footer"),
          form: createDOMFactory("form"),
          h1: createDOMFactory("h1"),
          h2: createDOMFactory("h2"),
          h3: createDOMFactory("h3"),
          h4: createDOMFactory("h4"),
          h5: createDOMFactory("h5"),
          h6: createDOMFactory("h6"),
          head: createDOMFactory("head"),
          header: createDOMFactory("header"),
          hgroup: createDOMFactory("hgroup"),
          hr: createDOMFactory("hr"),
          html: createDOMFactory("html"),
          i: createDOMFactory("i"),
          iframe: createDOMFactory("iframe"),
          img: createDOMFactory("img"),
          input: createDOMFactory("input"),
          ins: createDOMFactory("ins"),
          kbd: createDOMFactory("kbd"),
          keygen: createDOMFactory("keygen"),
          label: createDOMFactory("label"),
          legend: createDOMFactory("legend"),
          li: createDOMFactory("li"),
          link: createDOMFactory("link"),
          main: createDOMFactory("main"),
          map: createDOMFactory("map"),
          mark: createDOMFactory("mark"),
          menu: createDOMFactory("menu"),
          menuitem: createDOMFactory("menuitem"),
          meta: createDOMFactory("meta"),
          meter: createDOMFactory("meter"),
          nav: createDOMFactory("nav"),
          noscript: createDOMFactory("noscript"),
          object: createDOMFactory("object"),
          ol: createDOMFactory("ol"),
          optgroup: createDOMFactory("optgroup"),
          option: createDOMFactory("option"),
          output: createDOMFactory("output"),
          p: createDOMFactory("p"),
          param: createDOMFactory("param"),
          picture: createDOMFactory("picture"),
          pre: createDOMFactory("pre"),
          progress: createDOMFactory("progress"),
          q: createDOMFactory("q"),
          rp: createDOMFactory("rp"),
          rt: createDOMFactory("rt"),
          ruby: createDOMFactory("ruby"),
          s: createDOMFactory("s"),
          samp: createDOMFactory("samp"),
          script: createDOMFactory("script"),
          section: createDOMFactory("section"),
          select: createDOMFactory("select"),
          small: createDOMFactory("small"),
          source: createDOMFactory("source"),
          span: createDOMFactory("span"),
          strong: createDOMFactory("strong"),
          style: createDOMFactory("style"),
          sub: createDOMFactory("sub"),
          summary: createDOMFactory("summary"),
          sup: createDOMFactory("sup"),
          table: createDOMFactory("table"),
          tbody: createDOMFactory("tbody"),
          td: createDOMFactory("td"),
          textarea: createDOMFactory("textarea"),
          tfoot: createDOMFactory("tfoot"),
          th: createDOMFactory("th"),
          thead: createDOMFactory("thead"),
          time: createDOMFactory("time"),
          title: createDOMFactory("title"),
          tr: createDOMFactory("tr"),
          track: createDOMFactory("track"),
          u: createDOMFactory("u"),
          ul: createDOMFactory("ul"),
          var: createDOMFactory("var"),
          video: createDOMFactory("video"),
          wbr: createDOMFactory("wbr"),
          circle: createDOMFactory("circle"),
          clipPath: createDOMFactory("clipPath"),
          defs: createDOMFactory("defs"),
          ellipse: createDOMFactory("ellipse"),
          g: createDOMFactory("g"),
          image: createDOMFactory("image"),
          line: createDOMFactory("line"),
          linearGradient: createDOMFactory("linearGradient"),
          mask: createDOMFactory("mask"),
          path: createDOMFactory("path"),
          pattern: createDOMFactory("pattern"),
          polygon: createDOMFactory("polygon"),
          polyline: createDOMFactory("polyline"),
          radialGradient: createDOMFactory("radialGradient"),
          rect: createDOMFactory("rect"),
          stop: createDOMFactory("stop"),
          svg: createDOMFactory("svg"),
          text: createDOMFactory("text"),
          tspan: createDOMFactory("tspan")
        };
        return ReactDOMFactories;
      });
    }
  });

  // node_modules/ua-parser-js/src/ua-parser.js
  var require_ua_parser = __commonJS({
    "node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
      (function(window2, undefined2) {
        "use strict";
        var LIBVERSION = "1.0.2", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 255;
        var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook";
        var extend = function(regexes2, extensions) {
          var mergedRegexes = {};
          for (var i in regexes2) {
            if (extensions[i] && extensions[i].length % 2 === 0) {
              mergedRegexes[i] = extensions[i].concat(regexes2[i]);
            } else {
              mergedRegexes[i] = regexes2[i];
            }
          }
          return mergedRegexes;
        }, enumerize = function(arr) {
          var enums = {};
          for (var i = 0; i < arr.length; i++) {
            enums[arr[i].toUpperCase()] = arr[i];
          }
          return enums;
        }, has = function(str1, str2) {
          return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        }, lowerize = function(str) {
          return str.toLowerCase();
        }, majorize = function(version) {
          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
        }, trim = function(str, len) {
          if (typeof str === STR_TYPE) {
            str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
          }
        };
        var rgxMapper = function(ua, arrays) {
          var i = 0, j, k, p, q, matches, match;
          while (i < arrays.length && !matches) {
            var regex = arrays[i], props = arrays[i + 1];
            j = k = 0;
            while (j < regex.length && !matches) {
              matches = regex[j++].exec(ua);
              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k];
                  q = props[p];
                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length === 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        this[q[0]] = q[1];
                      }
                    } else if (q.length === 3) {
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                      } else {
                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                      }
                    } else if (q.length === 4) {
                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                    }
                  } else {
                    this[q] = match ? match : undefined2;
                  }
                }
              }
            }
            i += 2;
          }
        }, strMapper = function(str, map) {
          for (var i in map) {
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
              for (var j = 0; j < map[i].length; j++) {
                if (has(map[i][j], str)) {
                  return i === UNKNOWN ? undefined2 : i;
                }
              }
            } else if (has(map[i], str)) {
              return i === UNKNOWN ? undefined2 : i;
            }
          }
          return str;
        };
        var oldSafariMap = {
          "1.0": "/8",
          "1.2": "/1",
          "1.3": "/3",
          "2.0": "/412",
          "2.0.2": "/416",
          "2.0.3": "/417",
          "2.0.4": "/419",
          "?": "/"
        }, windowsVersionMap = {
          "ME": "4.90",
          "NT 3.11": "NT3.51",
          "NT 4.0": "NT4.0",
          "2000": "NT 5.0",
          "XP": ["NT 5.1", "NT 5.2"],
          "Vista": "NT 6.0",
          "7": "NT 6.1",
          "8": "NT 6.2",
          "8.1": "NT 6.3",
          "10": ["NT 6.4", "NT 10.0"],
          "RT": "ARM"
        };
        var regexes = {
          browser: [
            [
              /\b(?:crmo|crios)\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Chrome"]],
            [
              /edg(?:e|ios|a)?\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Edge"]],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              /opios[\/ ]+([\w\.]+)/i
            ],
            [VERSION, [NAME, OPERA + " Mini"]],
            [
              /\bopr\/([\w\.]+)/i
            ],
            [VERSION, [NAME, OPERA]],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
              /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
              /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
              /(weibo)__([\d\.]+)/i
            ],
            [NAME, VERSION],
            [
              /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            ],
            [VERSION, [NAME, "UC" + BROWSER]],
            [
              /\bqbcore\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "WeChat(Win) Desktop"]],
            [
              /micromessenger\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "WeChat"]],
            [
              /konqueror\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Konqueror"]],
            [
              /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            ],
            [VERSION, [NAME, "IE"]],
            [
              /yabrowser\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Yandex"]],
            [
              /(avast|avg)\/([\w\.]+)/i
            ],
            [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
            [
              /\bfocus\/([\w\.]+)/i
            ],
            [VERSION, [NAME, FIREFOX + " Focus"]],
            [
              /\bopt\/([\w\.]+)/i
            ],
            [VERSION, [NAME, OPERA + " Touch"]],
            [
              /coc_coc\w+\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Coc Coc"]],
            [
              /dolfin\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "Dolphin"]],
            [
              /coast\/([\w\.]+)/i
            ],
            [VERSION, [NAME, OPERA + " Coast"]],
            [
              /miuibrowser\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "MIUI " + BROWSER]],
            [
              /fxios\/([-\w\.]+)/i
            ],
            [VERSION, [NAME, FIREFOX]],
            [
              /\bqihu|(qi?ho?o?|360)browser/i
            ],
            [[NAME, "360 " + BROWSER]],
            [
              /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
            ],
            [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
            [
              /(comodo_dragon)\/([\w\.]+)/i
            ],
            [[NAME, /_/g, " "], VERSION],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              /(metasr)[\/ ]?([\w\.]+)/i,
              /(lbbrowser)/i
            ],
            [NAME],
            [
              /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            ],
            [[NAME, FACEBOOK], VERSION],
            [
              /safari (line)\/([\w\.]+)/i,
              /\b(line)\/([\w\.]+)\/iab/i,
              /(chromium|instagram)[\/ ]([-\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              /\bgsa\/([\w\.]+) .*safari\//i
            ],
            [VERSION, [NAME, "GSA"]],
            [
              /headlesschrome(?:\/([\w\.]+)| )/i
            ],
            [VERSION, [NAME, CHROME + " Headless"]],
            [
              / wv\).+(chrome)\/([\w\.]+)/i
            ],
            [[NAME, CHROME + " WebView"], VERSION],
            [
              /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            ],
            [VERSION, [NAME, "Android " + BROWSER]],
            [
              /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              /version\/([\w\.]+) .*mobile\/\w+ (safari)/i
            ],
            [VERSION, [NAME, "Mobile Safari"]],
            [
              /version\/([\w\.]+) .*(mobile ?safari|safari)/i
            ],
            [VERSION, NAME],
            [
              /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            ],
            [NAME, [VERSION, strMapper, oldSafariMap]],
            [
              /(webkit|khtml)\/([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              /(navigator|netscape\d?)\/([-\w\.]+)/i
            ],
            [[NAME, "Netscape"], VERSION],
            [
              /mobile vr; rv:([\w\.]+)\).+firefox/i
            ],
            [VERSION, [NAME, FIREFOX + " Reality"]],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              /(firefox)\/([\w\.]+)/i,
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              /(links) \(([\w\.]+)/i
            ],
            [NAME, VERSION]
          ],
          cpu: [
            [
              /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
            ],
            [[ARCHITECTURE, "amd64"]],
            [
              /(ia32(?=;))/i
            ],
            [[ARCHITECTURE, lowerize]],
            [
              /((?:i[346]|x)86)[;\)]/i
            ],
            [[ARCHITECTURE, "ia32"]],
            [
              /\b(aarch64|arm(v?8e?l?|_?64))\b/i
            ],
            [[ARCHITECTURE, "arm64"]],
            [
              /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
            ],
            [[ARCHITECTURE, "armhf"]],
            [
              /windows (ce|mobile); ppc;/i
            ],
            [[ARCHITECTURE, "arm"]],
            [
              /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
            ],
            [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
            [
              /(sun4\w)[;\)]/i
            ],
            [[ARCHITECTURE, "sparc"]],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            ],
            [[ARCHITECTURE, lowerize]]
          ],
          device: [
            [
              /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
            [
              /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
              /samsung[- ]([-\w]+)/i,
              /sec-(sgh\w+)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
            [
              /\((ip(?:hone|od)[\w ]*);/i
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
            [
              /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
            [
              /(?:huawei|honor)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
            [
              /\b(poco[\w ]+)(?: bui|\))/i,
              /\b; (\w+) build\/hm\1/i,
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
            [
              /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
            [
              /vivo (\w+)(?: bui|\))/i,
              /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
            [
              /\b(rmx[12]\d{3})(?: bui|;|\))/i
            ],
            [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
            [
              /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
            [
              /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, TABLET]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
              /\blg-?([\d\w]+) bui/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
            [
              /(ideatab[-\w ]+)/i,
              /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ],
            [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
            [
              /(?:maemo|nokia).*(n900|lumia \d+)/i,
              /nokia[-_ ]?([-\w\.]*)/i
            ],
            [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
            [
              /(pixel c)\b/i
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
            [
              /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
            [
              /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
            [
              /sony tablet [ps]/i,
              /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
            [
              / (kb2005|in20[12]5|be20[12][59])\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
            [
              /(alexa)webm/i,
              /(kf[a-z]{2}wi)( bui|\))/i,
              /(kf[a-z]+)( bui|\)).+silk\//i
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
            [
              /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            ],
            [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
            [
              /(playbook);[-\w\),; ]+(rim)/i
            ],
            [MODEL, VENDOR, [TYPE, TABLET]],
            [
              /\b((?:bb[a-f]|st[hv])100-\d)/i,
              /\(bb10; (\w+)/i
            ],
            [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
            [
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
            [
              / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
            [
              /(nexus 9)/i
            ],
            [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i
            ],
            [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
            [
              /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
            [
              /droid.+; (m[1-5] note) bui/i,
              /\bmz-([-\w]{2,})/i
            ],
            [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
            [
              /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [MODEL, [VENDOR, "Sharp"], [TYPE, MOBILE]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
              /(hp) ([\w ]+\w)/i,
              /(asus)-?(\w+)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w]+)/i,
              /(jolla)/i,
              /(oppo) ?([\w ]+) bui/i
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(surface duo)/i
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
            [
              /droid [\d\.]+; (fp\du?)(?: b|\))/i
            ],
            [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
            [
              /(u304aa)/i
            ],
            [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
            [
              /\bsie-(\w*)/i
            ],
            [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
            [
              /\b(rct\w+) b/i
            ],
            [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
            [
              /\b(venue[\d ]{2,7}) b/i
            ],
            [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
            [
              /\b(q(?:mv|ta)\w+) b/i
            ],
            [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
            [
              /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            ],
            [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
            [
              /\b(tm\d{3}\w+) b/i
            ],
            [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
            [
              /\b(k88) b/i
            ],
            [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
            [
              /\b(nx\d{3}j) b/i
            ],
            [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
            [
              /\b(gen\d{3}) b.+49h/i
            ],
            [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
            [
              /\b(zur\d{3}) b/i
            ],
            [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
            [
              /\b((zeki)?tb.*\b) b/i
            ],
            [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
            [
              /\b([yr]\d{2}) b/i,
              /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            ],
            [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
            [
              /\b(ns-?\w{0,9}) b/i
            ],
            [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
            [
              /\b((nxa|next)-?\w{0,9}) b/i
            ],
            [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
            [
              /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            ],
            [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
            [
              /\b(lvtel\-)?(v1[12]) b/i
            ],
            [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
            [
              /\b(ph-1) /i
            ],
            [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
            [
              /\b(v(100md|700na|7011|917g).*\b) b/i
            ],
            [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
            [
              /\b(trio[-\w\. ]+) b/i
            ],
            [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
            [
              /\btu_(1491) b/i
            ],
            [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
            [
              /(shield[\w ]+) b/i
            ],
            [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
            [
              /(sprint) (\w+)/i
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kin\.[onetw]{3})/i
            ],
            [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
            [
              /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
            [
              /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
            [
              /(ouya)/i,
              /(nintendo) ([wids3utch]+)/i
            ],
            [VENDOR, MODEL, [TYPE, CONSOLE]],
            [
              /droid.+; (shield) bui/i
            ],
            [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
            [
              /(playstation [345portablevi]+)/i
            ],
            [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
            [
              /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
            [
              /smart-tv.+(samsung)/i
            ],
            [VENDOR, [TYPE, SMARTTV]],
            [
              /hbbtv.+maple;(\d+)/i
            ],
            [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
            [
              /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            ],
            [[VENDOR, LG], [TYPE, SMARTTV]],
            [
              /(apple) ?tv/i
            ],
            [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
            [
              /crkey/i
            ],
            [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /droid.+aft(\w)( bui|\))/i
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
            [
              /\(dtv[\);].+(aquos)/i
            ],
            [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i
            ],
            [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
            [
              /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            ],
            [[TYPE, SMARTTV]],
            [
              /((pebble))app/i
            ],
            [VENDOR, MODEL, [TYPE, WEARABLE]],
            [
              /droid.+; (glass) \d/i
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
            [
              /droid.+; (wt63?0{2,3})\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
            [
              /(quest( 2)?)/i
            ],
            [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
            [
              /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            ],
            [VENDOR, [TYPE, EMBEDDED]],
            [
              /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
            ],
            [MODEL, [TYPE, MOBILE]],
            [
              /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            ],
            [MODEL, [TYPE, TABLET]],
            [
              /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            ],
            [[TYPE, TABLET]],
            [
              /(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i
            ],
            [[TYPE, MOBILE]],
            [
              /(android[-\w\. ]{0,9});.+buil/i
            ],
            [MODEL, [VENDOR, "Generic"]]
          ],
          engine: [
            [
              /windows.+ edge\/([\w\.]+)/i
            ],
            [VERSION, [NAME, EDGE + "HTML"]],
            [
              /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            ],
            [VERSION, [NAME, "Blink"]],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i
            ],
            [NAME, VERSION],
            [
              /rv\:([\w\.]{1,9})\b.+(gecko)/i
            ],
            [VERSION, NAME]
          ],
          os: [
            [
              /microsoft (windows) (vista|xp)/i
            ],
            [NAME, VERSION],
            [
              /(windows) nt 6\.2; (arm)/i,
              /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
              /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
            ],
            [NAME, [VERSION, strMapper, windowsVersionMap]],
            [
              /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ],
            [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]],
            [
              /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
              /cfnetwork\/.+darwin/i
            ],
            [[VERSION, /_/g, "."], [NAME, "iOS"]],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            ],
            [[NAME, "Mac OS"], [VERSION, /_/g, "."]],
            [
              /droid ([\w\.]+)\b.+(android[- ]x86)/i
            ],
            [VERSION, NAME],
            [
              /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
              /(blackberry)\w*\/([\w\.]*)/i,
              /(tizen|kaios)[\/ ]([\w\.]+)/i,
              /\((series40);/i
            ],
            [NAME, VERSION],
            [
              /\(bb(10);/i
            ],
            [VERSION, [NAME, BLACKBERRY]],
            [
              /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
            ],
            [VERSION, [NAME, "Symbian"]],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            ],
            [VERSION, [NAME, FIREFOX + " OS"]],
            [
              /web0s;.+rt(tv)/i,
              /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            ],
            [VERSION, [NAME, "webOS"]],
            [
              /crkey\/([\d\.]+)/i
            ],
            [VERSION, [NAME, CHROME + "cast"]],
            [
              /(cros) [\w]+ ([\w\.]+\w)/i
            ],
            [[NAME, "Chromium OS"], VERSION],
            [
              /(nintendo|playstation) ([wids345portablevuch]+)/i,
              /(xbox); +xbox ([^\);]+)/i,
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              /(mint)[\/\(\) ]?(\w*)/i,
              /(mageia|vectorlinux)[; ]/i,
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              /(hurd|linux) ?([\w\.]*)/i,
              /(gnu) ?([\w\.]*)/i,
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              /(haiku) (\w+)/i
            ],
            [NAME, VERSION],
            [
              /(sunos) ?([\w\.\d]*)/i
            ],
            [[NAME, "Solaris"], VERSION],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
              /(unix) ?([\w\.]*)/i
            ],
            [NAME, VERSION]
          ]
        };
        var UAParser2 = function(ua, extensions) {
          if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined2;
          }
          if (!(this instanceof UAParser2)) {
            return new UAParser2(ua, extensions).getResult();
          }
          var _ua = ua || (typeof window2 !== UNDEF_TYPE && window2.navigator && window2.navigator.userAgent ? window2.navigator.userAgent : EMPTY);
          var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
          this.getBrowser = function() {
            var _browser = {};
            _browser[NAME] = undefined2;
            _browser[VERSION] = undefined2;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser.major = majorize(_browser.version);
            return _browser;
          };
          this.getCPU = function() {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined2;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
          };
          this.getDevice = function() {
            var _device = {};
            _device[VENDOR] = undefined2;
            _device[MODEL] = undefined2;
            _device[TYPE] = undefined2;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            return _device;
          };
          this.getEngine = function() {
            var _engine = {};
            _engine[NAME] = undefined2;
            _engine[VERSION] = undefined2;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
          };
          this.getOS = function() {
            var _os = {};
            _os[NAME] = undefined2;
            _os[VERSION] = undefined2;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            return _os;
          };
          this.getResult = function() {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU()
            };
          };
          this.getUA = function() {
            return _ua;
          };
          this.setUA = function(ua2) {
            _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
            return this;
          };
          this.setUA(_ua);
          return this;
        };
        UAParser2.VERSION = LIBVERSION;
        UAParser2.BROWSER = enumerize([NAME, VERSION, MAJOR]);
        UAParser2.CPU = enumerize([ARCHITECTURE]);
        UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
        UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION]);
        if (typeof exports !== UNDEF_TYPE) {
          if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser2;
          }
          exports.UAParser = UAParser2;
        } else {
          if (typeof define === FUNC_TYPE && define.amd) {
            define(function() {
              return UAParser2;
            });
          } else if (typeof window2 !== UNDEF_TYPE) {
            window2.UAParser = UAParser2;
          }
        }
        var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
        if ($ && !$.ua) {
          var parser = new UAParser2();
          $.ua = parser.getResult();
          $.ua.get = function() {
            return parser.getUA();
          };
          $.ua.set = function(ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
              $.ua[prop] = result[prop];
            }
          };
        }
      })(typeof window === "object" ? window : exports);
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s2 = 1; s2 < arguments.length; s2++) {
          from = Object(arguments[s2]);
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
    }
  });

  // node_modules/create-react-class/factory.js
  var require_factory = __commonJS({
    "node_modules/create-react-class/factory.js"(exports, module) {
      "use strict";
      var _assign = require_object_assign();
      var emptyObject = {};
      if (true) {
        Object.freeze(emptyObject);
      }
      var validateFormat = function validateFormat2(format) {
      };
      if (true) {
        validateFormat = function validateFormat2(format) {
          if (format === void 0) {
            throw new Error("invariant requires an error message argument");
          }
        };
      }
      function _invariant(condition, format, a, b, c, d, e2, f) {
        validateFormat(format);
        if (!condition) {
          var error;
          if (format === void 0) {
            error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
          } else {
            var args = [a, b, c, d, e2, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function() {
              return args[argIndex++];
            }));
            error.name = "Invariant Violation";
          }
          error.framesToPop = 1;
          throw error;
        }
      }
      var warning = function() {
      };
      if (true) {
        printWarning = function printWarning2(format) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var argIndex = 0;
          var message = "Warning: " + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          if (typeof console !== "undefined") {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {
          }
        };
        warning = function warning2(condition, format) {
          if (format === void 0) {
            throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
          }
          if (format.indexOf("Failed Composite propType: ") === 0) {
            return;
          }
          if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }
            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var printWarning;
      var MIXINS_KEY = "mixins";
      function identity(fn) {
        return fn;
      }
      var ReactPropTypeLocationNames;
      if (true) {
        ReactPropTypeLocationNames = {
          prop: "prop",
          context: "context",
          childContext: "child context"
        };
      } else {
        ReactPropTypeLocationNames = {};
      }
      function factory(ReactComponent, isValidElement2, ReactNoopUpdateQueue) {
        var injectedMixins = [];
        var ReactClassInterface = {
          mixins: "DEFINE_MANY",
          statics: "DEFINE_MANY",
          propTypes: "DEFINE_MANY",
          contextTypes: "DEFINE_MANY",
          childContextTypes: "DEFINE_MANY",
          getDefaultProps: "DEFINE_MANY_MERGED",
          getInitialState: "DEFINE_MANY_MERGED",
          getChildContext: "DEFINE_MANY_MERGED",
          render: "DEFINE_ONCE",
          componentWillMount: "DEFINE_MANY",
          componentDidMount: "DEFINE_MANY",
          componentWillReceiveProps: "DEFINE_MANY",
          shouldComponentUpdate: "DEFINE_ONCE",
          componentWillUpdate: "DEFINE_MANY",
          componentDidUpdate: "DEFINE_MANY",
          componentWillUnmount: "DEFINE_MANY",
          UNSAFE_componentWillMount: "DEFINE_MANY",
          UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
          UNSAFE_componentWillUpdate: "DEFINE_MANY",
          updateComponent: "OVERRIDE_BASE"
        };
        var ReactClassStaticInterface = {
          getDerivedStateFromProps: "DEFINE_MANY_MERGED"
        };
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
            if (true) {
              validateTypeDef(Constructor, childContextTypes, "childContext");
            }
            Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
          },
          contextTypes: function(Constructor, contextTypes) {
            if (true) {
              validateTypeDef(Constructor, contextTypes, "context");
            }
            Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
          },
          getDefaultProps: function(Constructor, getDefaultProps) {
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
            } else {
              Constructor.getDefaultProps = getDefaultProps;
            }
          },
          propTypes: function(Constructor, propTypes) {
            if (true) {
              validateTypeDef(Constructor, propTypes, "prop");
            }
            Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
          },
          statics: function(Constructor, statics) {
            mixStaticSpecIntoComponent(Constructor, statics);
          },
          autobind: function() {
          }
        };
        function validateTypeDef(Constructor, typeDef, location) {
          for (var propName in typeDef) {
            if (typeDef.hasOwnProperty(propName)) {
              if (true) {
                warning(typeof typeDef[propName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.", Constructor.displayName || "ReactClass", ReactPropTypeLocationNames[location], propName);
              }
            }
          }
        }
        function validateMethodOverride(isAlreadyDefined, name) {
          var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
          if (ReactClassMixin.hasOwnProperty(name)) {
            _invariant(specPolicy === "OVERRIDE_BASE", "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", name);
          }
          if (isAlreadyDefined) {
            _invariant(specPolicy === "DEFINE_MANY" || specPolicy === "DEFINE_MANY_MERGED", "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", name);
          }
        }
        function mixSpecIntoComponent(Constructor, spec) {
          if (!spec) {
            if (true) {
              var typeofSpec = typeof spec;
              var isMixinValid = typeofSpec === "object" && spec !== null;
              if (true) {
                warning(isMixinValid, "%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.", Constructor.displayName || "ReactClass", spec === null ? null : typeofSpec);
              }
            }
            return;
          }
          _invariant(typeof spec !== "function", "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object.");
          _invariant(!isValidElement2(spec), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
          var proto = Constructor.prototype;
          var autoBindPairs = proto.__reactAutoBindPairs;
          if (spec.hasOwnProperty(MIXINS_KEY)) {
            RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
          }
          for (var name in spec) {
            if (!spec.hasOwnProperty(name)) {
              continue;
            }
            if (name === MIXINS_KEY) {
              continue;
            }
            var property = spec[name];
            var isAlreadyDefined = proto.hasOwnProperty(name);
            validateMethodOverride(isAlreadyDefined, name);
            if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
              RESERVED_SPEC_KEYS[name](Constructor, property);
            } else {
              var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
              var isFunction2 = typeof property === "function";
              var shouldAutoBind = isFunction2 && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
              if (shouldAutoBind) {
                autoBindPairs.push(name, property);
                proto[name] = property;
              } else {
                if (isAlreadyDefined) {
                  var specPolicy = ReactClassInterface[name];
                  _invariant(isReactClassMethod && (specPolicy === "DEFINE_MANY_MERGED" || specPolicy === "DEFINE_MANY"), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", specPolicy, name);
                  if (specPolicy === "DEFINE_MANY_MERGED") {
                    proto[name] = createMergedResultFunction(proto[name], property);
                  } else if (specPolicy === "DEFINE_MANY") {
                    proto[name] = createChainedFunction(proto[name], property);
                  }
                } else {
                  proto[name] = property;
                  if (true) {
                    if (typeof property === "function" && spec.displayName) {
                      proto[name].displayName = spec.displayName + "_" + name;
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
            _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name);
            var isAlreadyDefined = name in Constructor;
            if (isAlreadyDefined) {
              var specPolicy = ReactClassStaticInterface.hasOwnProperty(name) ? ReactClassStaticInterface[name] : null;
              _invariant(specPolicy === "DEFINE_MANY_MERGED", "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", name);
              Constructor[name] = createMergedResultFunction(Constructor[name], property);
              return;
            }
            Constructor[name] = property;
          }
        }
        function mergeIntoWithNoDuplicateKeys(one, two) {
          _invariant(one && two && typeof one === "object" && typeof two === "object", "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");
          for (var key in two) {
            if (two.hasOwnProperty(key)) {
              _invariant(one[key] === void 0, "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", key);
              one[key] = two[key];
            }
          }
          return one;
        }
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
        function createChainedFunction(one, two) {
          return function chainedFunction() {
            one.apply(this, arguments);
            two.apply(this, arguments);
          };
        }
        function bindAutoBindMethod(component, method) {
          var boundMethod = method.bind(component);
          if (true) {
            boundMethod.__reactBoundContext = component;
            boundMethod.__reactBoundMethod = method;
            boundMethod.__reactBoundArguments = null;
            var componentName = component.constructor.displayName;
            var _bind = boundMethod.bind;
            boundMethod.bind = function(newThis) {
              for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              if (newThis !== component && newThis !== null) {
                if (true) {
                  warning(false, "bind(): React component methods may only be bound to the component instance. See %s", componentName);
                }
              } else if (!args.length) {
                if (true) {
                  warning(false, "bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s", componentName);
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
        var ReactClassMixin = {
          replaceState: function(newState, callback) {
            this.updater.enqueueReplaceState(this, newState, callback);
          },
          isMounted: function() {
            if (true) {
              warning(this.__didWarnIsMounted, "%s: isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.", this.constructor && this.constructor.displayName || this.name || "Component");
              this.__didWarnIsMounted = true;
            }
            return !!this.__isMounted;
          }
        };
        var ReactClassComponent = function() {
        };
        _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
        function createClass(spec) {
          var Constructor = identity(function(props, context, updater) {
            if (true) {
              warning(this instanceof Constructor, "Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory");
            }
            if (this.__reactAutoBindPairs.length) {
              bindAutoBindMethods(this);
            }
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
            this.state = null;
            var initialState = this.getInitialState ? this.getInitialState() : null;
            if (true) {
              if (initialState === void 0 && this.getInitialState._isMockFunction) {
                initialState = null;
              }
            }
            _invariant(typeof initialState === "object" && !Array.isArray(initialState), "%s.getInitialState(): must return an object or null", Constructor.displayName || "ReactCompositeComponent");
            this.state = initialState;
          });
          Constructor.prototype = new ReactClassComponent();
          Constructor.prototype.constructor = Constructor;
          Constructor.prototype.__reactAutoBindPairs = [];
          injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
          mixSpecIntoComponent(Constructor, IsMountedPreMixin);
          mixSpecIntoComponent(Constructor, spec);
          mixSpecIntoComponent(Constructor, IsMountedPostMixin);
          if (Constructor.getDefaultProps) {
            Constructor.defaultProps = Constructor.getDefaultProps();
          }
          if (true) {
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps.isReactClassApproved = {};
            }
            if (Constructor.prototype.getInitialState) {
              Constructor.prototype.getInitialState.isReactClassApproved = {};
            }
          }
          _invariant(Constructor.prototype.render, "createClass(...): Class specification must implement a `render` method.");
          if (true) {
            warning(!Constructor.prototype.componentShouldUpdate, "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", spec.displayName || "A component");
            warning(!Constructor.prototype.componentWillRecieveProps, "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", spec.displayName || "A component");
            warning(!Constructor.prototype.UNSAFE_componentWillRecieveProps, "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", spec.displayName || "A component");
          }
          for (var methodName in ReactClassInterface) {
            if (!Constructor.prototype[methodName]) {
              Constructor.prototype[methodName] = null;
            }
          }
          return Constructor;
        }
        return createClass;
      }
      module.exports = factory;
    }
  });

  // node_modules/create-react-class/index.js
  var require_create_react_class = __commonJS({
    "node_modules/create-react-class/index.js"(exports, module) {
      "use strict";
      var React6 = require_react();
      var factory = require_factory();
      if (typeof React6 === "undefined") {
        throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
      }
      var ReactNoopUpdateQueue = new React6.Component().updater;
      module.exports = factory(React6.Component, React6.isValidElement, ReactNoopUpdateQueue);
    }
  });

  // node_modules/numeral/numeral.js
  var require_numeral = __commonJS({
    "node_modules/numeral/numeral.js"(exports, module) {
      (function(global3, factory) {
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof module === "object" && module.exports) {
          module.exports = factory();
        } else {
          global3.numeral = factory();
        }
      })(exports, function() {
        var numeral3, _, VERSION = "2.0.6", formats = {}, locales = {}, defaults = {
          currentLocale: "en",
          zeroFormat: null,
          nullFormat: null,
          defaultFormat: "0,0",
          scalePercentBy100: true
        }, options = {
          currentLocale: defaults.currentLocale,
          zeroFormat: defaults.zeroFormat,
          nullFormat: defaults.nullFormat,
          defaultFormat: defaults.defaultFormat,
          scalePercentBy100: defaults.scalePercentBy100
        };
        function Numeral(input, number) {
          this._input = input;
          this._value = number;
        }
        numeral3 = function(input) {
          var value, kind, unformatFunction, regexp;
          if (numeral3.isNumeral(input)) {
            value = input.value();
          } else if (input === 0 || typeof input === "undefined") {
            value = 0;
          } else if (input === null || _.isNaN(input)) {
            value = null;
          } else if (typeof input === "string") {
            if (options.zeroFormat && input === options.zeroFormat) {
              value = 0;
            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, "").length) {
              value = null;
            } else {
              for (kind in formats) {
                regexp = typeof formats[kind].regexps.unformat === "function" ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;
                if (regexp && input.match(regexp)) {
                  unformatFunction = formats[kind].unformat;
                  break;
                }
              }
              unformatFunction = unformatFunction || numeral3._.stringToNumber;
              value = unformatFunction(input);
            }
          } else {
            value = Number(input) || null;
          }
          return new Numeral(input, value);
        };
        numeral3.version = VERSION;
        numeral3.isNumeral = function(obj) {
          return obj instanceof Numeral;
        };
        numeral3._ = _ = {
          numberToFormat: function(value, format, roundingFunction) {
            var locale = locales[numeral3.options.currentLocale], negP = false, optDec = false, leadingCount = 0, abbr = "", trillion = 1e12, billion = 1e9, million = 1e6, thousand = 1e3, decimal = "", neg = false, abbrForce, abs, min, max, power, int, precision, signed, thousands, output;
            value = value || 0;
            abs = Math.abs(value);
            if (numeral3._.includes(format, "(")) {
              negP = true;
              format = format.replace(/[\(|\)]/g, "");
            } else if (numeral3._.includes(format, "+") || numeral3._.includes(format, "-")) {
              signed = numeral3._.includes(format, "+") ? format.indexOf("+") : value < 0 ? format.indexOf("-") : -1;
              format = format.replace(/[\+|\-]/g, "");
            }
            if (numeral3._.includes(format, "a")) {
              abbrForce = format.match(/a(k|m|b|t)?/);
              abbrForce = abbrForce ? abbrForce[1] : false;
              if (numeral3._.includes(format, " a")) {
                abbr = " ";
              }
              format = format.replace(new RegExp(abbr + "a[kmbt]?"), "");
              if (abs >= trillion && !abbrForce || abbrForce === "t") {
                abbr += locale.abbreviations.trillion;
                value = value / trillion;
              } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === "b") {
                abbr += locale.abbreviations.billion;
                value = value / billion;
              } else if (abs < billion && abs >= million && !abbrForce || abbrForce === "m") {
                abbr += locale.abbreviations.million;
                value = value / million;
              } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === "k") {
                abbr += locale.abbreviations.thousand;
                value = value / thousand;
              }
            }
            if (numeral3._.includes(format, "[.]")) {
              optDec = true;
              format = format.replace("[.]", ".");
            }
            int = value.toString().split(".")[0];
            precision = format.split(".")[1];
            thousands = format.indexOf(",");
            leadingCount = (format.split(".")[0].split(",")[0].match(/0/g) || []).length;
            if (precision) {
              if (numeral3._.includes(precision, "[")) {
                precision = precision.replace("]", "");
                precision = precision.split("[");
                decimal = numeral3._.toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
              } else {
                decimal = numeral3._.toFixed(value, precision.length, roundingFunction);
              }
              int = decimal.split(".")[0];
              if (numeral3._.includes(decimal, ".")) {
                decimal = locale.delimiters.decimal + decimal.split(".")[1];
              } else {
                decimal = "";
              }
              if (optDec && Number(decimal.slice(1)) === 0) {
                decimal = "";
              }
            } else {
              int = numeral3._.toFixed(value, 0, roundingFunction);
            }
            if (abbr && !abbrForce && Number(int) >= 1e3 && abbr !== locale.abbreviations.trillion) {
              int = String(Number(int) / 1e3);
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
            if (numeral3._.includes(int, "-")) {
              int = int.slice(1);
              neg = true;
            }
            if (int.length < leadingCount) {
              for (var i = leadingCount - int.length; i > 0; i--) {
                int = "0" + int;
              }
            }
            if (thousands > -1) {
              int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + locale.delimiters.thousands);
            }
            if (format.indexOf(".") === 0) {
              int = "";
            }
            output = int + decimal + (abbr ? abbr : "");
            if (negP) {
              output = (negP && neg ? "(" : "") + output + (negP && neg ? ")" : "");
            } else {
              if (signed >= 0) {
                output = signed === 0 ? (neg ? "-" : "+") + output : output + (neg ? "-" : "+");
              } else if (neg) {
                output = "-" + output;
              }
            }
            return output;
          },
          stringToNumber: function(string) {
            var locale = locales[options.currentLocale], stringOriginal = string, abbreviations = {
              thousand: 3,
              million: 6,
              billion: 9,
              trillion: 12
            }, abbreviation, value, i, regexp;
            if (options.zeroFormat && string === options.zeroFormat) {
              value = 0;
            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, "").length) {
              value = null;
            } else {
              value = 1;
              if (locale.delimiters.decimal !== ".") {
                string = string.replace(/\./g, "").replace(locale.delimiters.decimal, ".");
              }
              for (abbreviation in abbreviations) {
                regexp = new RegExp("[^a-zA-Z]" + locale.abbreviations[abbreviation] + "(?:\\)|(\\" + locale.currency.symbol + ")?(?:\\))?)?$");
                if (stringOriginal.match(regexp)) {
                  value *= Math.pow(10, abbreviations[abbreviation]);
                  break;
                }
              }
              value *= (string.split("-").length + Math.min(string.split("(").length - 1, string.split(")").length - 1)) % 2 ? 1 : -1;
              string = string.replace(/[^0-9\.]+/g, "");
              value *= Number(string);
            }
            return value;
          },
          isNaN: function(value) {
            return typeof value === "number" && isNaN(value);
          },
          includes: function(string, search) {
            return string.indexOf(search) !== -1;
          },
          insert: function(string, subString, start) {
            return string.slice(0, start) + subString + string.slice(start);
          },
          reduce: function(array, callback) {
            if (this === null) {
              throw new TypeError("Array.prototype.reduce called on null or undefined");
            }
            if (typeof callback !== "function") {
              throw new TypeError(callback + " is not a function");
            }
            var t = Object(array), len = t.length >>> 0, k = 0, value;
            if (arguments.length === 3) {
              value = arguments[2];
            } else {
              while (k < len && !(k in t)) {
                k++;
              }
              if (k >= len) {
                throw new TypeError("Reduce of empty array with no initial value");
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
          multiplier: function(x) {
            var parts = x.toString().split(".");
            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
          },
          correctionFactor: function() {
            var args = Array.prototype.slice.call(arguments);
            return args.reduce(function(accum, next) {
              var mn = _.multiplier(next);
              return accum > mn ? accum : mn;
            }, 1);
          },
          toFixed: function(value, maxDecimals, roundingFunction, optionals) {
            var splitValue = value.toString().split("."), minDecimals = maxDecimals - (optionals || 0), boundedPrecision, optionalsRegExp, power, output;
            if (splitValue.length === 2) {
              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
            } else {
              boundedPrecision = minDecimals;
            }
            power = Math.pow(10, boundedPrecision);
            output = (roundingFunction(value + "e+" + boundedPrecision) / power).toFixed(boundedPrecision);
            if (optionals > maxDecimals - boundedPrecision) {
              optionalsRegExp = new RegExp("\\.?0{1," + (optionals - (maxDecimals - boundedPrecision)) + "}$");
              output = output.replace(optionalsRegExp, "");
            }
            return output;
          }
        };
        numeral3.options = options;
        numeral3.formats = formats;
        numeral3.locales = locales;
        numeral3.locale = function(key) {
          if (key) {
            options.currentLocale = key.toLowerCase();
          }
          return options.currentLocale;
        };
        numeral3.localeData = function(key) {
          if (!key) {
            return locales[options.currentLocale];
          }
          key = key.toLowerCase();
          if (!locales[key]) {
            throw new Error("Unknown locale : " + key);
          }
          return locales[key];
        };
        numeral3.reset = function() {
          for (var property in defaults) {
            options[property] = defaults[property];
          }
        };
        numeral3.zeroFormat = function(format) {
          options.zeroFormat = typeof format === "string" ? format : null;
        };
        numeral3.nullFormat = function(format) {
          options.nullFormat = typeof format === "string" ? format : null;
        };
        numeral3.defaultFormat = function(format) {
          options.defaultFormat = typeof format === "string" ? format : "0.0";
        };
        numeral3.register = function(type, name, format) {
          name = name.toLowerCase();
          if (this[type + "s"][name]) {
            throw new TypeError(name + " " + type + " already registered.");
          }
          this[type + "s"][name] = format;
          return format;
        };
        numeral3.validate = function(val, culture) {
          var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, localeData, temp;
          if (typeof val !== "string") {
            val += "";
            if (console.warn) {
              console.warn("Numeral.js: Value is not string. It has been co-erced to: ", val);
            }
          }
          val = val.trim();
          if (!!val.match(/^\d+$/)) {
            return true;
          }
          if (val === "") {
            return false;
          }
          try {
            localeData = numeral3.localeData(culture);
          } catch (e2) {
            localeData = numeral3.localeData(numeral3.locale());
          }
          _currSymbol = localeData.currency.symbol;
          _abbrObj = localeData.abbreviations;
          _decimalSep = localeData.delimiters.decimal;
          if (localeData.delimiters.thousands === ".") {
            _thousandSep = "\\.";
          } else {
            _thousandSep = localeData.delimiters.thousands;
          }
          temp = val.match(/^[^\d]+/);
          if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
              return false;
            }
          }
          temp = val.match(/[^\d]+$/);
          if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
              return false;
            }
          }
          _thousandRegEx = new RegExp(_thousandSep + "{2}");
          if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
              return false;
            } else {
              if (_valArray.length < 2) {
                return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
              } else {
                if (_valArray[0].length === 1) {
                  return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
                } else {
                  return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
                }
              }
            }
          }
          return false;
        };
        numeral3.fn = Numeral.prototype = {
          clone: function() {
            return numeral3(this);
          },
          format: function(inputString, roundingFunction) {
            var value = this._value, format = inputString || options.defaultFormat, kind, output, formatFunction;
            roundingFunction = roundingFunction || Math.round;
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
              formatFunction = formatFunction || numeral3._.numberToFormat;
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
            return Math.abs(numeral3(this._value).subtract(value).value());
          }
        };
        numeral3.register("locale", "en", {
          delimiters: {
            thousands: ",",
            decimal: "."
          },
          abbreviations: {
            thousand: "k",
            million: "m",
            billion: "b",
            trillion: "t"
          },
          ordinal: function(number) {
            var b = number % 10;
            return ~~(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
          },
          currency: {
            symbol: "$"
          }
        });
        (function() {
          numeral3.register("format", "bps", {
            regexps: {
              format: /(BPS)/,
              unformat: /(BPS)/
            },
            format: function(value, format, roundingFunction) {
              var space = numeral3._.includes(format, " BPS") ? " " : "", output;
              value = value * 1e4;
              format = format.replace(/\s?BPS/, "");
              output = numeral3._.numberToFormat(value, format, roundingFunction);
              if (numeral3._.includes(output, ")")) {
                output = output.split("");
                output.splice(-1, 0, space + "BPS");
                output = output.join("");
              } else {
                output = output + space + "BPS";
              }
              return output;
            },
            unformat: function(string) {
              return +(numeral3._.stringToNumber(string) * 1e-4).toFixed(15);
            }
          });
        })();
        (function() {
          var decimal = {
            base: 1e3,
            suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
          }, binary = {
            base: 1024,
            suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
          };
          var allSuffixes = decimal.suffixes.concat(binary.suffixes.filter(function(item) {
            return decimal.suffixes.indexOf(item) < 0;
          }));
          var unformatRegex = allSuffixes.join("|");
          unformatRegex = "(" + unformatRegex.replace("B", "B(?!PS)") + ")";
          numeral3.register("format", "bytes", {
            regexps: {
              format: /([0\s]i?b)/,
              unformat: new RegExp(unformatRegex)
            },
            format: function(value, format, roundingFunction) {
              var output, bytes = numeral3._.includes(format, "ib") ? binary : decimal, suffix = numeral3._.includes(format, " b") || numeral3._.includes(format, " ib") ? " " : "", power, min, max;
              format = format.replace(/\s?i?b/, "");
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
              output = numeral3._.numberToFormat(value, format, roundingFunction);
              return output + suffix;
            },
            unformat: function(string) {
              var value = numeral3._.stringToNumber(string), power, bytesMultiplier;
              if (value) {
                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                  if (numeral3._.includes(string, decimal.suffixes[power])) {
                    bytesMultiplier = Math.pow(decimal.base, power);
                    break;
                  }
                  if (numeral3._.includes(string, binary.suffixes[power])) {
                    bytesMultiplier = Math.pow(binary.base, power);
                    break;
                  }
                }
                value *= bytesMultiplier || 1;
              }
              return value;
            }
          });
        })();
        (function() {
          numeral3.register("format", "currency", {
            regexps: {
              format: /(\$)/
            },
            format: function(value, format, roundingFunction) {
              var locale = numeral3.locales[numeral3.options.currentLocale], symbols = {
                before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
              }, output, symbol, i;
              format = format.replace(/\s?\$\s?/, "");
              output = numeral3._.numberToFormat(value, format, roundingFunction);
              if (value >= 0) {
                symbols.before = symbols.before.replace(/[\-\(]/, "");
                symbols.after = symbols.after.replace(/[\-\)]/, "");
              } else if (value < 0 && (!numeral3._.includes(symbols.before, "-") && !numeral3._.includes(symbols.before, "("))) {
                symbols.before = "-" + symbols.before;
              }
              for (i = 0; i < symbols.before.length; i++) {
                symbol = symbols.before[i];
                switch (symbol) {
                  case "$":
                    output = numeral3._.insert(output, locale.currency.symbol, i);
                    break;
                  case " ":
                    output = numeral3._.insert(output, " ", i + locale.currency.symbol.length - 1);
                    break;
                }
              }
              for (i = symbols.after.length - 1; i >= 0; i--) {
                symbol = symbols.after[i];
                switch (symbol) {
                  case "$":
                    output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral3._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                    break;
                  case " ":
                    output = i === symbols.after.length - 1 ? output + " " : numeral3._.insert(output, " ", -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                    break;
                }
              }
              return output;
            }
          });
        })();
        (function() {
          numeral3.register("format", "exponential", {
            regexps: {
              format: /(e\+|e-)/,
              unformat: /(e\+|e-)/
            },
            format: function(value, format, roundingFunction) {
              var output, exponential = typeof value === "number" && !numeral3._.isNaN(value) ? value.toExponential() : "0e+0", parts = exponential.split("e");
              format = format.replace(/e[\+|\-]{1}0/, "");
              output = numeral3._.numberToFormat(Number(parts[0]), format, roundingFunction);
              return output + "e" + parts[1];
            },
            unformat: function(string) {
              var parts = numeral3._.includes(string, "e+") ? string.split("e+") : string.split("e-"), value = Number(parts[0]), power = Number(parts[1]);
              power = numeral3._.includes(string, "e-") ? power *= -1 : power;
              function cback(accum, curr, currI, O) {
                var corrFactor = numeral3._.correctionFactor(accum, curr), num = accum * corrFactor * (curr * corrFactor) / (corrFactor * corrFactor);
                return num;
              }
              return numeral3._.reduce([value, Math.pow(10, power)], cback, 1);
            }
          });
        })();
        (function() {
          numeral3.register("format", "ordinal", {
            regexps: {
              format: /(o)/
            },
            format: function(value, format, roundingFunction) {
              var locale = numeral3.locales[numeral3.options.currentLocale], output, ordinal = numeral3._.includes(format, " o") ? " " : "";
              format = format.replace(/\s?o/, "");
              ordinal += locale.ordinal(value);
              output = numeral3._.numberToFormat(value, format, roundingFunction);
              return output + ordinal;
            }
          });
        })();
        (function() {
          numeral3.register("format", "percentage", {
            regexps: {
              format: /(%)/,
              unformat: /(%)/
            },
            format: function(value, format, roundingFunction) {
              var space = numeral3._.includes(format, " %") ? " " : "", output;
              if (numeral3.options.scalePercentBy100) {
                value = value * 100;
              }
              format = format.replace(/\s?\%/, "");
              output = numeral3._.numberToFormat(value, format, roundingFunction);
              if (numeral3._.includes(output, ")")) {
                output = output.split("");
                output.splice(-1, 0, space + "%");
                output = output.join("");
              } else {
                output = output + space + "%";
              }
              return output;
            },
            unformat: function(string) {
              var number = numeral3._.stringToNumber(string);
              if (numeral3.options.scalePercentBy100) {
                return number * 0.01;
              }
              return number;
            }
          });
        })();
        (function() {
          numeral3.register("format", "time", {
            regexps: {
              format: /(:)/,
              unformat: /(:)/
            },
            format: function(value, format, roundingFunction) {
              var hours = Math.floor(value / 60 / 60), minutes = Math.floor((value - hours * 60 * 60) / 60), seconds = Math.round(value - hours * 60 * 60 - minutes * 60);
              return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            },
            unformat: function(string) {
              var timeArray = string.split(":"), seconds = 0;
              if (timeArray.length === 3) {
                seconds = seconds + Number(timeArray[0]) * 60 * 60;
                seconds = seconds + Number(timeArray[1]) * 60;
                seconds = seconds + Number(timeArray[2]);
              } else if (timeArray.length === 2) {
                seconds = seconds + Number(timeArray[0]) * 60;
                seconds = seconds + Number(timeArray[1]);
              }
              return Number(seconds);
            }
          });
        })();
        return numeral3;
      });
    }
  });

  // node_modules/luxon/build/cjs-browser/luxon.js
  var require_luxon = __commonJS({
    "node_modules/luxon/build/cjs-browser/luxon.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _extends() {
        _extends = Object.assign || function(target) {
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
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e2) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2))
            return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2))
              return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null)
          return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          target[key] = source[key];
        }
        return target;
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n2 = Object.prototype.toString.call(o).slice(8, -1);
        if (n2 === "Object" && o.constructor)
          n2 = o.constructor.name;
        if (n2 === "Map" || n2 === "Set")
          return Array.from(o);
        if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (it)
          return (it = it.call(o)).next.bind(it);
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var LuxonError = /* @__PURE__ */ function(_Error) {
        _inheritsLoose(LuxonError2, _Error);
        function LuxonError2() {
          return _Error.apply(this, arguments) || this;
        }
        return LuxonError2;
      }(/* @__PURE__ */ _wrapNativeSuper(Error));
      var InvalidDateTimeError = /* @__PURE__ */ function(_LuxonError) {
        _inheritsLoose(InvalidDateTimeError2, _LuxonError);
        function InvalidDateTimeError2(reason) {
          return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
        }
        return InvalidDateTimeError2;
      }(LuxonError);
      var InvalidIntervalError = /* @__PURE__ */ function(_LuxonError2) {
        _inheritsLoose(InvalidIntervalError2, _LuxonError2);
        function InvalidIntervalError2(reason) {
          return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
        }
        return InvalidIntervalError2;
      }(LuxonError);
      var InvalidDurationError = /* @__PURE__ */ function(_LuxonError3) {
        _inheritsLoose(InvalidDurationError2, _LuxonError3);
        function InvalidDurationError2(reason) {
          return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
        }
        return InvalidDurationError2;
      }(LuxonError);
      var ConflictingSpecificationError = /* @__PURE__ */ function(_LuxonError4) {
        _inheritsLoose(ConflictingSpecificationError2, _LuxonError4);
        function ConflictingSpecificationError2() {
          return _LuxonError4.apply(this, arguments) || this;
        }
        return ConflictingSpecificationError2;
      }(LuxonError);
      var InvalidUnitError = /* @__PURE__ */ function(_LuxonError5) {
        _inheritsLoose(InvalidUnitError2, _LuxonError5);
        function InvalidUnitError2(unit) {
          return _LuxonError5.call(this, "Invalid unit " + unit) || this;
        }
        return InvalidUnitError2;
      }(LuxonError);
      var InvalidArgumentError = /* @__PURE__ */ function(_LuxonError6) {
        _inheritsLoose(InvalidArgumentError2, _LuxonError6);
        function InvalidArgumentError2() {
          return _LuxonError6.apply(this, arguments) || this;
        }
        return InvalidArgumentError2;
      }(LuxonError);
      var ZoneIsAbstractError = /* @__PURE__ */ function(_LuxonError7) {
        _inheritsLoose(ZoneIsAbstractError2, _LuxonError7);
        function ZoneIsAbstractError2() {
          return _LuxonError7.call(this, "Zone is an abstract class") || this;
        }
        return ZoneIsAbstractError2;
      }(LuxonError);
      var n = "numeric";
      var s2 = "short";
      var l = "long";
      var DATE_SHORT = {
        year: n,
        month: n,
        day: n
      };
      var DATE_MED = {
        year: n,
        month: s2,
        day: n
      };
      var DATE_MED_WITH_WEEKDAY = {
        year: n,
        month: s2,
        day: n,
        weekday: s2
      };
      var DATE_FULL = {
        year: n,
        month: l,
        day: n
      };
      var DATE_HUGE = {
        year: n,
        month: l,
        day: n,
        weekday: l
      };
      var TIME_SIMPLE = {
        hour: n,
        minute: n
      };
      var TIME_WITH_SECONDS = {
        hour: n,
        minute: n,
        second: n
      };
      var TIME_WITH_SHORT_OFFSET = {
        hour: n,
        minute: n,
        second: n,
        timeZoneName: s2
      };
      var TIME_WITH_LONG_OFFSET = {
        hour: n,
        minute: n,
        second: n,
        timeZoneName: l
      };
      var TIME_24_SIMPLE = {
        hour: n,
        minute: n,
        hourCycle: "h23"
      };
      var TIME_24_WITH_SECONDS = {
        hour: n,
        minute: n,
        second: n,
        hourCycle: "h23"
      };
      var TIME_24_WITH_SHORT_OFFSET = {
        hour: n,
        minute: n,
        second: n,
        hourCycle: "h23",
        timeZoneName: s2
      };
      var TIME_24_WITH_LONG_OFFSET = {
        hour: n,
        minute: n,
        second: n,
        hourCycle: "h23",
        timeZoneName: l
      };
      var DATETIME_SHORT = {
        year: n,
        month: n,
        day: n,
        hour: n,
        minute: n
      };
      var DATETIME_SHORT_WITH_SECONDS = {
        year: n,
        month: n,
        day: n,
        hour: n,
        minute: n,
        second: n
      };
      var DATETIME_MED = {
        year: n,
        month: s2,
        day: n,
        hour: n,
        minute: n
      };
      var DATETIME_MED_WITH_SECONDS = {
        year: n,
        month: s2,
        day: n,
        hour: n,
        minute: n,
        second: n
      };
      var DATETIME_MED_WITH_WEEKDAY = {
        year: n,
        month: s2,
        day: n,
        weekday: s2,
        hour: n,
        minute: n
      };
      var DATETIME_FULL = {
        year: n,
        month: l,
        day: n,
        hour: n,
        minute: n,
        timeZoneName: s2
      };
      var DATETIME_FULL_WITH_SECONDS = {
        year: n,
        month: l,
        day: n,
        hour: n,
        minute: n,
        second: n,
        timeZoneName: s2
      };
      var DATETIME_HUGE = {
        year: n,
        month: l,
        day: n,
        weekday: l,
        hour: n,
        minute: n,
        timeZoneName: l
      };
      var DATETIME_HUGE_WITH_SECONDS = {
        year: n,
        month: l,
        day: n,
        weekday: l,
        hour: n,
        minute: n,
        second: n,
        timeZoneName: l
      };
      function isUndefined2(o) {
        return typeof o === "undefined";
      }
      function isNumber(o) {
        return typeof o === "number";
      }
      function isInteger(o) {
        return typeof o === "number" && o % 1 === 0;
      }
      function isString2(o) {
        return typeof o === "string";
      }
      function isDate(o) {
        return Object.prototype.toString.call(o) === "[object Date]";
      }
      function hasRelative() {
        try {
          return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
        } catch (e2) {
          return false;
        }
      }
      function maybeArray(thing) {
        return Array.isArray(thing) ? thing : [thing];
      }
      function bestBy(arr, by, compare) {
        if (arr.length === 0) {
          return void 0;
        }
        return arr.reduce(function(best, next) {
          var pair = [by(next), next];
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
        return keys.reduce(function(a, k) {
          a[k] = obj[k];
          return a;
        }, {});
      }
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      function integerBetween(thing, bottom, top) {
        return isInteger(thing) && thing >= bottom && thing <= top;
      }
      function floorMod(x, n2) {
        return x - n2 * Math.floor(x / n2);
      }
      function padStart(input, n2) {
        if (n2 === void 0) {
          n2 = 2;
        }
        var isNeg = input < 0;
        var padded;
        if (isNeg) {
          padded = "-" + ("" + -input).padStart(n2, "0");
        } else {
          padded = ("" + input).padStart(n2, "0");
        }
        return padded;
      }
      function parseInteger(string) {
        if (isUndefined2(string) || string === null || string === "") {
          return void 0;
        } else {
          return parseInt(string, 10);
        }
      }
      function parseFloating(string) {
        if (isUndefined2(string) || string === null || string === "") {
          return void 0;
        } else {
          return parseFloat(string);
        }
      }
      function parseMillis(fraction) {
        if (isUndefined2(fraction) || fraction === null || fraction === "") {
          return void 0;
        } else {
          var f = parseFloat("0." + fraction) * 1e3;
          return Math.floor(f);
        }
      }
      function roundTo(number, digits, towardZero) {
        if (towardZero === void 0) {
          towardZero = false;
        }
        var factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
        return rounder(number * factor) / factor;
      }
      function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      }
      function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
      }
      function daysInMonth(year, month) {
        var modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
        if (modMonth === 2) {
          return isLeapYear(modYear) ? 29 : 28;
        } else {
          return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
        }
      }
      function objToLocalTS(obj) {
        var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
        if (obj.year < 100 && obj.year >= 0) {
          d = new Date(d);
          d.setUTCFullYear(d.getUTCFullYear() - 1900);
        }
        return +d;
      }
      function weeksInWeekYear(weekYear) {
        var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
        return p1 === 4 || p2 === 3 ? 53 : 52;
      }
      function untruncateYear(year) {
        if (year > 99) {
          return year;
        } else
          return year > 60 ? 1900 + year : 2e3 + year;
      }
      function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
        if (timeZone === void 0) {
          timeZone = null;
        }
        var date = new Date(ts), intlOpts = {
          hourCycle: "h23",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        };
        if (timeZone) {
          intlOpts.timeZone = timeZone;
        }
        var modified = _extends({
          timeZoneName: offsetFormat
        }, intlOpts);
        var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function(m) {
          return m.type.toLowerCase() === "timezonename";
        });
        return parsed ? parsed.value : null;
      }
      function signedOffset(offHourStr, offMinuteStr) {
        var offHour = parseInt(offHourStr, 10);
        if (Number.isNaN(offHour)) {
          offHour = 0;
        }
        var offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
        return offHour * 60 + offMinSigned;
      }
      function asNumber(value) {
        var numericValue = Number(value);
        if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
          throw new InvalidArgumentError("Invalid unit value " + value);
        return numericValue;
      }
      function normalizeObject(obj, normalizer) {
        var normalized = {};
        for (var u in obj) {
          if (hasOwnProperty(obj, u)) {
            var v = obj[u];
            if (v === void 0 || v === null)
              continue;
            normalized[normalizer(u)] = asNumber(v);
          }
        }
        return normalized;
      }
      function formatOffset(offset2, format) {
        var hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
        switch (format) {
          case "short":
            return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);
          case "narrow":
            return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");
          case "techie":
            return "" + sign + padStart(hours, 2) + padStart(minutes, 2);
          default:
            throw new RangeError("Value format " + format + " is out of range for property format");
        }
      }
      function timeObject(obj) {
        return pick(obj, ["hour", "minute", "second", "millisecond"]);
      }
      var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
      var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
      function months(length) {
        switch (length) {
          case "narrow":
            return [].concat(monthsNarrow);
          case "short":
            return [].concat(monthsShort);
          case "long":
            return [].concat(monthsLong);
          case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
          case "2-digit":
            return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
          default:
            return null;
        }
      }
      var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
      function weekdays(length) {
        switch (length) {
          case "narrow":
            return [].concat(weekdaysNarrow);
          case "short":
            return [].concat(weekdaysShort);
          case "long":
            return [].concat(weekdaysLong);
          case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7"];
          default:
            return null;
        }
      }
      var meridiems = ["AM", "PM"];
      var erasLong = ["Before Christ", "Anno Domini"];
      var erasShort = ["BC", "AD"];
      var erasNarrow = ["B", "A"];
      function eras(length) {
        switch (length) {
          case "narrow":
            return [].concat(erasNarrow);
          case "short":
            return [].concat(erasShort);
          case "long":
            return [].concat(erasLong);
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
      function formatRelativeTime(unit, count, numeric, narrow) {
        if (numeric === void 0) {
          numeric = "always";
        }
        if (narrow === void 0) {
          narrow = false;
        }
        var units = {
          years: ["year", "yr."],
          quarters: ["quarter", "qtr."],
          months: ["month", "mo."],
          weeks: ["week", "wk."],
          days: ["day", "day", "days"],
          hours: ["hour", "hr."],
          minutes: ["minute", "min."],
          seconds: ["second", "sec."]
        };
        var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
        if (numeric === "auto" && lastable) {
          var isDay = unit === "days";
          switch (count) {
            case 1:
              return isDay ? "tomorrow" : "next " + units[unit][0];
            case -1:
              return isDay ? "yesterday" : "last " + units[unit][0];
            case 0:
              return isDay ? "today" : "this " + units[unit][0];
          }
        }
        var isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
        return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
      }
      function stringifyTokens(splits, tokenToString) {
        var s3 = "";
        for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done; ) {
          var token = _step.value;
          if (token.literal) {
            s3 += token.val;
          } else {
            s3 += tokenToString(token.val);
          }
        }
        return s3;
      }
      var _macroTokenToFormatOpts = {
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
      var Formatter = /* @__PURE__ */ function() {
        Formatter2.create = function create(locale, opts) {
          if (opts === void 0) {
            opts = {};
          }
          return new Formatter2(locale, opts);
        };
        Formatter2.parseFormat = function parseFormat(fmt) {
          var current = null, currentFull = "", bracketed = false;
          var splits = [];
          for (var i = 0; i < fmt.length; i++) {
            var c = fmt.charAt(i);
            if (c === "'") {
              if (currentFull.length > 0) {
                splits.push({
                  literal: bracketed,
                  val: currentFull
                });
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
                splits.push({
                  literal: false,
                  val: currentFull
                });
              }
              currentFull = c;
              current = c;
            }
          }
          if (currentFull.length > 0) {
            splits.push({
              literal: bracketed,
              val: currentFull
            });
          }
          return splits;
        };
        Formatter2.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
          return _macroTokenToFormatOpts[token];
        };
        function Formatter2(locale, formatOpts) {
          this.opts = formatOpts;
          this.loc = locale;
          this.systemLoc = null;
        }
        var _proto = Formatter2.prototype;
        _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
          if (this.systemLoc === null) {
            this.systemLoc = this.loc.redefaultToSystem();
          }
          var df = this.systemLoc.dtFormatter(dt, _extends({}, this.opts, opts));
          return df.format();
        };
        _proto.formatDateTime = function formatDateTime(dt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
          return df.format();
        };
        _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
          return df.formatToParts();
        };
        _proto.resolvedOptions = function resolvedOptions(dt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
          return df.resolvedOptions();
        };
        _proto.num = function num(n2, p) {
          if (p === void 0) {
            p = 0;
          }
          if (this.opts.forceSimple) {
            return padStart(n2, p);
          }
          var opts = _extends({}, this.opts);
          if (p > 0) {
            opts.padTo = p;
          }
          return this.loc.numberFormatter(opts).format(n2);
        };
        _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
          var _this = this;
          var knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = function string2(opts, extract) {
            return _this.loc.extract(dt, opts, extract);
          }, formatOffset2 = function formatOffset3(opts) {
            if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
              return "Z";
            }
            return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
          }, meridiem = function meridiem2() {
            return knownEnglish ? meridiemForDateTime(dt) : string({
              hour: "numeric",
              hourCycle: "h12"
            }, "dayperiod");
          }, month = function month2(length, standalone) {
            return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
              month: length
            } : {
              month: length,
              day: "numeric"
            }, "month");
          }, weekday = function weekday2(length, standalone) {
            return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
              weekday: length
            } : {
              weekday: length,
              month: "long",
              day: "numeric"
            }, "weekday");
          }, maybeMacro = function maybeMacro2(token) {
            var formatOpts = Formatter2.macroTokenToFormatOpts(token);
            if (formatOpts) {
              return _this.formatWithSystemDefault(dt, formatOpts);
            } else {
              return token;
            }
          }, era = function era2(length) {
            return knownEnglish ? eraForDateTime(dt, length) : string({
              era: length
            }, "era");
          }, tokenToString = function tokenToString2(token) {
            switch (token) {
              case "S":
                return _this.num(dt.millisecond);
              case "u":
              case "SSS":
                return _this.num(dt.millisecond, 3);
              case "s":
                return _this.num(dt.second);
              case "ss":
                return _this.num(dt.second, 2);
              case "uu":
                return _this.num(Math.floor(dt.millisecond / 10), 2);
              case "uuu":
                return _this.num(Math.floor(dt.millisecond / 100));
              case "m":
                return _this.num(dt.minute);
              case "mm":
                return _this.num(dt.minute, 2);
              case "h":
                return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
              case "hh":
                return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
              case "H":
                return _this.num(dt.hour);
              case "HH":
                return _this.num(dt.hour, 2);
              case "Z":
                return formatOffset2({
                  format: "narrow",
                  allowZ: _this.opts.allowZ
                });
              case "ZZ":
                return formatOffset2({
                  format: "short",
                  allowZ: _this.opts.allowZ
                });
              case "ZZZ":
                return formatOffset2({
                  format: "techie",
                  allowZ: _this.opts.allowZ
                });
              case "ZZZZ":
                return dt.zone.offsetName(dt.ts, {
                  format: "short",
                  locale: _this.loc.locale
                });
              case "ZZZZZ":
                return dt.zone.offsetName(dt.ts, {
                  format: "long",
                  locale: _this.loc.locale
                });
              case "z":
                return dt.zoneName;
              case "a":
                return meridiem();
              case "d":
                return useDateTimeFormatter ? string({
                  day: "numeric"
                }, "day") : _this.num(dt.day);
              case "dd":
                return useDateTimeFormatter ? string({
                  day: "2-digit"
                }, "day") : _this.num(dt.day, 2);
              case "c":
                return _this.num(dt.weekday);
              case "ccc":
                return weekday("short", true);
              case "cccc":
                return weekday("long", true);
              case "ccccc":
                return weekday("narrow", true);
              case "E":
                return _this.num(dt.weekday);
              case "EEE":
                return weekday("short", false);
              case "EEEE":
                return weekday("long", false);
              case "EEEEE":
                return weekday("narrow", false);
              case "L":
                return useDateTimeFormatter ? string({
                  month: "numeric",
                  day: "numeric"
                }, "month") : _this.num(dt.month);
              case "LL":
                return useDateTimeFormatter ? string({
                  month: "2-digit",
                  day: "numeric"
                }, "month") : _this.num(dt.month, 2);
              case "LLL":
                return month("short", true);
              case "LLLL":
                return month("long", true);
              case "LLLLL":
                return month("narrow", true);
              case "M":
                return useDateTimeFormatter ? string({
                  month: "numeric"
                }, "month") : _this.num(dt.month);
              case "MM":
                return useDateTimeFormatter ? string({
                  month: "2-digit"
                }, "month") : _this.num(dt.month, 2);
              case "MMM":
                return month("short", false);
              case "MMMM":
                return month("long", false);
              case "MMMMM":
                return month("narrow", false);
              case "y":
                return useDateTimeFormatter ? string({
                  year: "numeric"
                }, "year") : _this.num(dt.year);
              case "yy":
                return useDateTimeFormatter ? string({
                  year: "2-digit"
                }, "year") : _this.num(dt.year.toString().slice(-2), 2);
              case "yyyy":
                return useDateTimeFormatter ? string({
                  year: "numeric"
                }, "year") : _this.num(dt.year, 4);
              case "yyyyyy":
                return useDateTimeFormatter ? string({
                  year: "numeric"
                }, "year") : _this.num(dt.year, 6);
              case "G":
                return era("short");
              case "GG":
                return era("long");
              case "GGGGG":
                return era("narrow");
              case "kk":
                return _this.num(dt.weekYear.toString().slice(-2), 2);
              case "kkkk":
                return _this.num(dt.weekYear, 4);
              case "W":
                return _this.num(dt.weekNumber);
              case "WW":
                return _this.num(dt.weekNumber, 2);
              case "o":
                return _this.num(dt.ordinal);
              case "ooo":
                return _this.num(dt.ordinal, 3);
              case "q":
                return _this.num(dt.quarter);
              case "qq":
                return _this.num(dt.quarter, 2);
              case "X":
                return _this.num(Math.floor(dt.ts / 1e3));
              case "x":
                return _this.num(dt.ts);
              default:
                return maybeMacro(token);
            }
          };
          return stringifyTokens(Formatter2.parseFormat(fmt), tokenToString);
        };
        _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
          var _this2 = this;
          var tokenToField = function tokenToField2(token) {
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
              case "w":
                return "week";
              case "M":
                return "month";
              case "y":
                return "year";
              default:
                return null;
            }
          }, tokenToString = function tokenToString2(lildur) {
            return function(token) {
              var mapped = tokenToField(token);
              if (mapped) {
                return _this2.num(lildur.get(mapped), token.length);
              } else {
                return token;
              }
            };
          }, tokens = Formatter2.parseFormat(fmt), realTokens = tokens.reduce(function(found, _ref) {
            var literal = _ref.literal, val = _ref.val;
            return literal ? found : found.concat(val);
          }, []), collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function(t) {
            return t;
          }));
          return stringifyTokens(tokens, tokenToString(collapsed));
        };
        return Formatter2;
      }();
      var Invalid = /* @__PURE__ */ function() {
        function Invalid2(reason, explanation) {
          this.reason = reason;
          this.explanation = explanation;
        }
        var _proto = Invalid2.prototype;
        _proto.toMessage = function toMessage() {
          if (this.explanation) {
            return this.reason + ": " + this.explanation;
          } else {
            return this.reason;
          }
        };
        return Invalid2;
      }();
      var Zone = /* @__PURE__ */ function() {
        function Zone2() {
        }
        var _proto = Zone2.prototype;
        _proto.offsetName = function offsetName(ts, opts) {
          throw new ZoneIsAbstractError();
        };
        _proto.formatOffset = function formatOffset2(ts, format) {
          throw new ZoneIsAbstractError();
        };
        _proto.offset = function offset2(ts) {
          throw new ZoneIsAbstractError();
        };
        _proto.equals = function equals(otherZone) {
          throw new ZoneIsAbstractError();
        };
        _createClass(Zone2, [{
          key: "type",
          get: function get2() {
            throw new ZoneIsAbstractError();
          }
        }, {
          key: "name",
          get: function get2() {
            throw new ZoneIsAbstractError();
          }
        }, {
          key: "ianaName",
          get: function get2() {
            return this.name;
          }
        }, {
          key: "isUniversal",
          get: function get2() {
            throw new ZoneIsAbstractError();
          }
        }, {
          key: "isValid",
          get: function get2() {
            throw new ZoneIsAbstractError();
          }
        }]);
        return Zone2;
      }();
      var singleton$1 = null;
      var SystemZone = /* @__PURE__ */ function(_Zone) {
        _inheritsLoose(SystemZone2, _Zone);
        function SystemZone2() {
          return _Zone.apply(this, arguments) || this;
        }
        var _proto = SystemZone2.prototype;
        _proto.offsetName = function offsetName(ts, _ref) {
          var format = _ref.format, locale = _ref.locale;
          return parseZoneInfo(ts, format, locale);
        };
        _proto.formatOffset = function formatOffset$1(ts, format) {
          return formatOffset(this.offset(ts), format);
        };
        _proto.offset = function offset2(ts) {
          return -new Date(ts).getTimezoneOffset();
        };
        _proto.equals = function equals(otherZone) {
          return otherZone.type === "system";
        };
        _createClass(SystemZone2, [{
          key: "type",
          get: function get2() {
            return "system";
          }
        }, {
          key: "name",
          get: function get2() {
            return new Intl.DateTimeFormat().resolvedOptions().timeZone;
          }
        }, {
          key: "isUniversal",
          get: function get2() {
            return false;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return true;
          }
        }], [{
          key: "instance",
          get: function get2() {
            if (singleton$1 === null) {
              singleton$1 = new SystemZone2();
            }
            return singleton$1;
          }
        }]);
        return SystemZone2;
      }(Zone);
      var dtfCache = {};
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
            second: "2-digit",
            era: "short"
          });
        }
        return dtfCache[zone];
      }
      var typeToPos = {
        year: 0,
        month: 1,
        day: 2,
        era: 3,
        hour: 4,
        minute: 5,
        second: 6
      };
      function hackyOffset(dtf, date) {
        var formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), fMonth = parsed[1], fDay = parsed[2], fYear = parsed[3], fadOrBc = parsed[4], fHour = parsed[5], fMinute = parsed[6], fSecond = parsed[7];
        return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
      }
      function partsOffset(dtf, date) {
        var formatted = dtf.formatToParts(date);
        var filled = [];
        for (var i = 0; i < formatted.length; i++) {
          var _formatted$i = formatted[i], type = _formatted$i.type, value = _formatted$i.value;
          var pos = typeToPos[type];
          if (type === "era") {
            filled[pos] = value;
          } else if (!isUndefined2(pos)) {
            filled[pos] = parseInt(value, 10);
          }
        }
        return filled;
      }
      var ianaZoneCache = {};
      var IANAZone = /* @__PURE__ */ function(_Zone) {
        _inheritsLoose(IANAZone2, _Zone);
        IANAZone2.create = function create(name) {
          if (!ianaZoneCache[name]) {
            ianaZoneCache[name] = new IANAZone2(name);
          }
          return ianaZoneCache[name];
        };
        IANAZone2.resetCache = function resetCache() {
          ianaZoneCache = {};
          dtfCache = {};
        };
        IANAZone2.isValidSpecifier = function isValidSpecifier(s3) {
          return this.isValidZone(s3);
        };
        IANAZone2.isValidZone = function isValidZone(zone) {
          if (!zone) {
            return false;
          }
          try {
            new Intl.DateTimeFormat("en-US", {
              timeZone: zone
            }).format();
            return true;
          } catch (e2) {
            return false;
          }
        };
        function IANAZone2(name) {
          var _this;
          _this = _Zone.call(this) || this;
          _this.zoneName = name;
          _this.valid = IANAZone2.isValidZone(name);
          return _this;
        }
        var _proto = IANAZone2.prototype;
        _proto.offsetName = function offsetName(ts, _ref) {
          var format = _ref.format, locale = _ref.locale;
          return parseZoneInfo(ts, format, locale, this.name);
        };
        _proto.formatOffset = function formatOffset$1(ts, format) {
          return formatOffset(this.offset(ts), format);
        };
        _proto.offset = function offset2(ts) {
          var date = new Date(ts);
          if (isNaN(date))
            return NaN;
          var dtf = makeDTF(this.name);
          var _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date), year = _ref2[0], month = _ref2[1], day = _ref2[2], adOrBc = _ref2[3], hour = _ref2[4], minute = _ref2[5], second = _ref2[6];
          if (adOrBc === "BC") {
            year = -Math.abs(year) + 1;
          }
          var adjustedHour = hour === 24 ? 0 : hour;
          var asUTC = objToLocalTS({
            year,
            month,
            day,
            hour: adjustedHour,
            minute,
            second,
            millisecond: 0
          });
          var asTS = +date;
          var over = asTS % 1e3;
          asTS -= over >= 0 ? over : 1e3 + over;
          return (asUTC - asTS) / (60 * 1e3);
        };
        _proto.equals = function equals(otherZone) {
          return otherZone.type === "iana" && otherZone.name === this.name;
        };
        _createClass(IANAZone2, [{
          key: "type",
          get: function get2() {
            return "iana";
          }
        }, {
          key: "name",
          get: function get2() {
            return this.zoneName;
          }
        }, {
          key: "isUniversal",
          get: function get2() {
            return false;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return this.valid;
          }
        }]);
        return IANAZone2;
      }(Zone);
      var singleton = null;
      var FixedOffsetZone = /* @__PURE__ */ function(_Zone) {
        _inheritsLoose(FixedOffsetZone2, _Zone);
        FixedOffsetZone2.instance = function instance(offset2) {
          return offset2 === 0 ? FixedOffsetZone2.utcInstance : new FixedOffsetZone2(offset2);
        };
        FixedOffsetZone2.parseSpecifier = function parseSpecifier(s3) {
          if (s3) {
            var r = s3.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (r) {
              return new FixedOffsetZone2(signedOffset(r[1], r[2]));
            }
          }
          return null;
        };
        function FixedOffsetZone2(offset2) {
          var _this;
          _this = _Zone.call(this) || this;
          _this.fixed = offset2;
          return _this;
        }
        var _proto = FixedOffsetZone2.prototype;
        _proto.offsetName = function offsetName() {
          return this.name;
        };
        _proto.formatOffset = function formatOffset$1(ts, format) {
          return formatOffset(this.fixed, format);
        };
        _proto.offset = function offset2() {
          return this.fixed;
        };
        _proto.equals = function equals(otherZone) {
          return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
        };
        _createClass(FixedOffsetZone2, [{
          key: "type",
          get: function get2() {
            return "fixed";
          }
        }, {
          key: "name",
          get: function get2() {
            return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
          }
        }, {
          key: "ianaName",
          get: function get2() {
            if (this.fixed === 0) {
              return "Etc/UTC";
            } else {
              return "Etc/GMT" + formatOffset(-this.fixed, "narrow");
            }
          }
        }, {
          key: "isUniversal",
          get: function get2() {
            return true;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return true;
          }
        }], [{
          key: "utcInstance",
          get: function get2() {
            if (singleton === null) {
              singleton = new FixedOffsetZone2(0);
            }
            return singleton;
          }
        }]);
        return FixedOffsetZone2;
      }(Zone);
      var InvalidZone = /* @__PURE__ */ function(_Zone) {
        _inheritsLoose(InvalidZone2, _Zone);
        function InvalidZone2(zoneName) {
          var _this;
          _this = _Zone.call(this) || this;
          _this.zoneName = zoneName;
          return _this;
        }
        var _proto = InvalidZone2.prototype;
        _proto.offsetName = function offsetName() {
          return null;
        };
        _proto.formatOffset = function formatOffset2() {
          return "";
        };
        _proto.offset = function offset2() {
          return NaN;
        };
        _proto.equals = function equals() {
          return false;
        };
        _createClass(InvalidZone2, [{
          key: "type",
          get: function get2() {
            return "invalid";
          }
        }, {
          key: "name",
          get: function get2() {
            return this.zoneName;
          }
        }, {
          key: "isUniversal",
          get: function get2() {
            return false;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return false;
          }
        }]);
        return InvalidZone2;
      }(Zone);
      function normalizeZone(input, defaultZone2) {
        if (isUndefined2(input) || input === null) {
          return defaultZone2;
        } else if (input instanceof Zone) {
          return input;
        } else if (isString2(input)) {
          var lowered = input.toLowerCase();
          if (lowered === "local" || lowered === "system")
            return defaultZone2;
          else if (lowered === "utc" || lowered === "gmt")
            return FixedOffsetZone.utcInstance;
          else
            return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
        } else if (isNumber(input)) {
          return FixedOffsetZone.instance(input);
        } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
          return input;
        } else {
          return new InvalidZone(input);
        }
      }
      var now = function now2() {
        return Date.now();
      };
      var defaultZone = "system";
      var defaultLocale = null;
      var defaultNumberingSystem = null;
      var defaultOutputCalendar = null;
      var throwOnInvalid;
      var Settings = /* @__PURE__ */ function() {
        function Settings2() {
        }
        Settings2.resetCaches = function resetCaches() {
          Locale.resetCache();
          IANAZone.resetCache();
        };
        _createClass(Settings2, null, [{
          key: "now",
          get: function get2() {
            return now;
          },
          set: function set2(n2) {
            now = n2;
          }
        }, {
          key: "defaultZone",
          get: function get2() {
            return normalizeZone(defaultZone, SystemZone.instance);
          },
          set: function set2(zone) {
            defaultZone = zone;
          }
        }, {
          key: "defaultLocale",
          get: function get2() {
            return defaultLocale;
          },
          set: function set2(locale) {
            defaultLocale = locale;
          }
        }, {
          key: "defaultNumberingSystem",
          get: function get2() {
            return defaultNumberingSystem;
          },
          set: function set2(numberingSystem) {
            defaultNumberingSystem = numberingSystem;
          }
        }, {
          key: "defaultOutputCalendar",
          get: function get2() {
            return defaultOutputCalendar;
          },
          set: function set2(outputCalendar) {
            defaultOutputCalendar = outputCalendar;
          }
        }, {
          key: "throwOnInvalid",
          get: function get2() {
            return throwOnInvalid;
          },
          set: function set2(t) {
            throwOnInvalid = t;
          }
        }]);
        return Settings2;
      }();
      var _excluded = ["base"];
      var _excluded2 = ["padTo", "floor"];
      var intlLFCache = {};
      function getCachedLF(locString, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var key = JSON.stringify([locString, opts]);
        var dtf = intlLFCache[key];
        if (!dtf) {
          dtf = new Intl.ListFormat(locString, opts);
          intlLFCache[key] = dtf;
        }
        return dtf;
      }
      var intlDTCache = {};
      function getCachedDTF(locString, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var key = JSON.stringify([locString, opts]);
        var dtf = intlDTCache[key];
        if (!dtf) {
          dtf = new Intl.DateTimeFormat(locString, opts);
          intlDTCache[key] = dtf;
        }
        return dtf;
      }
      var intlNumCache = {};
      function getCachedINF(locString, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var key = JSON.stringify([locString, opts]);
        var inf = intlNumCache[key];
        if (!inf) {
          inf = new Intl.NumberFormat(locString, opts);
          intlNumCache[key] = inf;
        }
        return inf;
      }
      var intlRelCache = {};
      function getCachedRTF(locString, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var _opts = opts;
        _opts.base;
        var cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, _excluded);
        var key = JSON.stringify([locString, cacheKeyOpts]);
        var inf = intlRelCache[key];
        if (!inf) {
          inf = new Intl.RelativeTimeFormat(locString, opts);
          intlRelCache[key] = inf;
        }
        return inf;
      }
      var sysLocaleCache = null;
      function systemLocale() {
        if (sysLocaleCache) {
          return sysLocaleCache;
        } else {
          sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
          return sysLocaleCache;
        }
      }
      function parseLocaleString(localeStr) {
        var uIndex = localeStr.indexOf("-u-");
        if (uIndex === -1) {
          return [localeStr];
        } else {
          var options;
          var smaller = localeStr.substring(0, uIndex);
          try {
            options = getCachedDTF(localeStr).resolvedOptions();
          } catch (e2) {
            options = getCachedDTF(smaller).resolvedOptions();
          }
          var _options = options, numberingSystem = _options.numberingSystem, calendar = _options.calendar;
          return [smaller, numberingSystem, calendar];
        }
      }
      function intlConfigString(localeStr, numberingSystem, outputCalendar) {
        if (outputCalendar || numberingSystem) {
          localeStr += "-u";
          if (outputCalendar) {
            localeStr += "-ca-" + outputCalendar;
          }
          if (numberingSystem) {
            localeStr += "-nu-" + numberingSystem;
          }
          return localeStr;
        } else {
          return localeStr;
        }
      }
      function mapMonths(f) {
        var ms = [];
        for (var i = 1; i <= 12; i++) {
          var dt = DateTime2.utc(2016, i, 1);
          ms.push(f(dt));
        }
        return ms;
      }
      function mapWeekdays(f) {
        var ms = [];
        for (var i = 1; i <= 7; i++) {
          var dt = DateTime2.utc(2016, 11, 13 + i);
          ms.push(f(dt));
        }
        return ms;
      }
      function listStuff(loc, length, defaultOK, englishFn, intlFn) {
        var mode = loc.listingMode(defaultOK);
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
          return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
        }
      }
      var PolyNumberFormatter = /* @__PURE__ */ function() {
        function PolyNumberFormatter2(intl, forceSimple, opts) {
          this.padTo = opts.padTo || 0;
          this.floor = opts.floor || false;
          opts.padTo;
          opts.floor;
          var otherOpts = _objectWithoutPropertiesLoose(opts, _excluded2);
          if (!forceSimple || Object.keys(otherOpts).length > 0) {
            var intlOpts = _extends({
              useGrouping: false
            }, opts);
            if (opts.padTo > 0)
              intlOpts.minimumIntegerDigits = opts.padTo;
            this.inf = getCachedINF(intl, intlOpts);
          }
        }
        var _proto = PolyNumberFormatter2.prototype;
        _proto.format = function format(i) {
          if (this.inf) {
            var fixed = this.floor ? Math.floor(i) : i;
            return this.inf.format(fixed);
          } else {
            var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
            return padStart(_fixed, this.padTo);
          }
        };
        return PolyNumberFormatter2;
      }();
      var PolyDateFormatter = /* @__PURE__ */ function() {
        function PolyDateFormatter2(dt, intl, opts) {
          this.opts = opts;
          var z;
          if (dt.zone.isUniversal) {
            var gmtOffset = -1 * (dt.offset / 60);
            var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;
            if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
              z = offsetZ;
              this.dt = dt;
            } else {
              z = "UTC";
              if (opts.timeZoneName) {
                this.dt = dt;
              } else {
                this.dt = dt.offset === 0 ? dt : DateTime2.fromMillis(dt.ts + dt.offset * 60 * 1e3);
              }
            }
          } else if (dt.zone.type === "system") {
            this.dt = dt;
          } else {
            this.dt = dt;
            z = dt.zone.name;
          }
          var intlOpts = _extends({}, this.opts);
          if (z) {
            intlOpts.timeZone = z;
          }
          this.dtf = getCachedDTF(intl, intlOpts);
        }
        var _proto2 = PolyDateFormatter2.prototype;
        _proto2.format = function format() {
          return this.dtf.format(this.dt.toJSDate());
        };
        _proto2.formatToParts = function formatToParts() {
          return this.dtf.formatToParts(this.dt.toJSDate());
        };
        _proto2.resolvedOptions = function resolvedOptions() {
          return this.dtf.resolvedOptions();
        };
        return PolyDateFormatter2;
      }();
      var PolyRelFormatter = /* @__PURE__ */ function() {
        function PolyRelFormatter2(intl, isEnglish, opts) {
          this.opts = _extends({
            style: "long"
          }, opts);
          if (!isEnglish && hasRelative()) {
            this.rtf = getCachedRTF(intl, opts);
          }
        }
        var _proto3 = PolyRelFormatter2.prototype;
        _proto3.format = function format(count, unit) {
          if (this.rtf) {
            return this.rtf.format(count, unit);
          } else {
            return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
          }
        };
        _proto3.formatToParts = function formatToParts(count, unit) {
          if (this.rtf) {
            return this.rtf.formatToParts(count, unit);
          } else {
            return [];
          }
        };
        return PolyRelFormatter2;
      }();
      var Locale = /* @__PURE__ */ function() {
        Locale2.fromOpts = function fromOpts(opts) {
          return Locale2.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
        };
        Locale2.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
          if (defaultToEN === void 0) {
            defaultToEN = false;
          }
          var specifiedLocale = locale || Settings.defaultLocale;
          var localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
          var numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
          var outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
          return new Locale2(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
        };
        Locale2.resetCache = function resetCache() {
          sysLocaleCache = null;
          intlDTCache = {};
          intlNumCache = {};
          intlRelCache = {};
        };
        Locale2.fromObject = function fromObject(_temp) {
          var _ref = _temp === void 0 ? {} : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, outputCalendar = _ref.outputCalendar;
          return Locale2.create(locale, numberingSystem, outputCalendar);
        };
        function Locale2(locale, numbering, outputCalendar, specifiedLocale) {
          var _parseLocaleString = parseLocaleString(locale), parsedLocale = _parseLocaleString[0], parsedNumberingSystem = _parseLocaleString[1], parsedOutputCalendar = _parseLocaleString[2];
          this.locale = parsedLocale;
          this.numberingSystem = numbering || parsedNumberingSystem || null;
          this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
          this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
          this.weekdaysCache = {
            format: {},
            standalone: {}
          };
          this.monthsCache = {
            format: {},
            standalone: {}
          };
          this.meridiemCache = null;
          this.eraCache = {};
          this.specifiedLocale = specifiedLocale;
          this.fastNumbersCached = null;
        }
        var _proto4 = Locale2.prototype;
        _proto4.listingMode = function listingMode() {
          var isActuallyEn = this.isEnglish();
          var hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
          return isActuallyEn && hasNoWeirdness ? "en" : "intl";
        };
        _proto4.clone = function clone2(alts) {
          if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
            return this;
          } else {
            return Locale2.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
          }
        };
        _proto4.redefaultToEN = function redefaultToEN(alts) {
          if (alts === void 0) {
            alts = {};
          }
          return this.clone(_extends({}, alts, {
            defaultToEN: true
          }));
        };
        _proto4.redefaultToSystem = function redefaultToSystem(alts) {
          if (alts === void 0) {
            alts = {};
          }
          return this.clone(_extends({}, alts, {
            defaultToEN: false
          }));
        };
        _proto4.months = function months$1(length, format, defaultOK) {
          var _this = this;
          if (format === void 0) {
            format = false;
          }
          if (defaultOK === void 0) {
            defaultOK = true;
          }
          return listStuff(this, length, defaultOK, months, function() {
            var intl = format ? {
              month: length,
              day: "numeric"
            } : {
              month: length
            }, formatStr = format ? "format" : "standalone";
            if (!_this.monthsCache[formatStr][length]) {
              _this.monthsCache[formatStr][length] = mapMonths(function(dt) {
                return _this.extract(dt, intl, "month");
              });
            }
            return _this.monthsCache[formatStr][length];
          });
        };
        _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
          var _this2 = this;
          if (format === void 0) {
            format = false;
          }
          if (defaultOK === void 0) {
            defaultOK = true;
          }
          return listStuff(this, length, defaultOK, weekdays, function() {
            var intl = format ? {
              weekday: length,
              year: "numeric",
              month: "long",
              day: "numeric"
            } : {
              weekday: length
            }, formatStr = format ? "format" : "standalone";
            if (!_this2.weekdaysCache[formatStr][length]) {
              _this2.weekdaysCache[formatStr][length] = mapWeekdays(function(dt) {
                return _this2.extract(dt, intl, "weekday");
              });
            }
            return _this2.weekdaysCache[formatStr][length];
          });
        };
        _proto4.meridiems = function meridiems$1(defaultOK) {
          var _this3 = this;
          if (defaultOK === void 0) {
            defaultOK = true;
          }
          return listStuff(this, void 0, defaultOK, function() {
            return meridiems;
          }, function() {
            if (!_this3.meridiemCache) {
              var intl = {
                hour: "numeric",
                hourCycle: "h12"
              };
              _this3.meridiemCache = [DateTime2.utc(2016, 11, 13, 9), DateTime2.utc(2016, 11, 13, 19)].map(function(dt) {
                return _this3.extract(dt, intl, "dayperiod");
              });
            }
            return _this3.meridiemCache;
          });
        };
        _proto4.eras = function eras$1(length, defaultOK) {
          var _this4 = this;
          if (defaultOK === void 0) {
            defaultOK = true;
          }
          return listStuff(this, length, defaultOK, eras, function() {
            var intl = {
              era: length
            };
            if (!_this4.eraCache[length]) {
              _this4.eraCache[length] = [DateTime2.utc(-40, 1, 1), DateTime2.utc(2017, 1, 1)].map(function(dt) {
                return _this4.extract(dt, intl, "era");
              });
            }
            return _this4.eraCache[length];
          });
        };
        _proto4.extract = function extract(dt, intlOpts, field) {
          var df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find(function(m) {
            return m.type.toLowerCase() === field;
          });
          return matching ? matching.value : null;
        };
        _proto4.numberFormatter = function numberFormatter(opts) {
          if (opts === void 0) {
            opts = {};
          }
          return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
        };
        _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
          if (intlOpts === void 0) {
            intlOpts = {};
          }
          return new PolyDateFormatter(dt, this.intl, intlOpts);
        };
        _proto4.relFormatter = function relFormatter(opts) {
          if (opts === void 0) {
            opts = {};
          }
          return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
        };
        _proto4.listFormatter = function listFormatter(opts) {
          if (opts === void 0) {
            opts = {};
          }
          return getCachedLF(this.intl, opts);
        };
        _proto4.isEnglish = function isEnglish() {
          return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
        };
        _proto4.equals = function equals(other) {
          return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
        };
        _createClass(Locale2, [{
          key: "fastNumbers",
          get: function get2() {
            if (this.fastNumbersCached == null) {
              this.fastNumbersCached = supportsFastNumbers(this);
            }
            return this.fastNumbersCached;
          }
        }]);
        return Locale2;
      }();
      function combineRegexes() {
        for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
          regexes[_key] = arguments[_key];
        }
        var full = regexes.reduce(function(f, r) {
          return f + r.source;
        }, "");
        return RegExp("^" + full + "$");
      }
      function combineExtractors() {
        for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          extractors[_key2] = arguments[_key2];
        }
        return function(m) {
          return extractors.reduce(function(_ref, ex) {
            var mergedVals = _ref[0], mergedZone = _ref[1], cursor = _ref[2];
            var _ex = ex(m, cursor), val = _ex[0], zone = _ex[1], next = _ex[2];
            return [_extends({}, mergedVals, val), zone || mergedZone, next];
          }, [{}, null, 1]).slice(0, 2);
        };
      }
      function parse(s3) {
        if (s3 == null) {
          return [null, null];
        }
        for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          patterns[_key3 - 1] = arguments[_key3];
        }
        for (var _i = 0, _patterns = patterns; _i < _patterns.length; _i++) {
          var _patterns$_i = _patterns[_i], regex = _patterns$_i[0], extractor = _patterns$_i[1];
          var m = regex.exec(s3);
          if (m) {
            return extractor(m);
          }
        }
        return [null, null];
      }
      function simpleParse() {
        for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          keys[_key4] = arguments[_key4];
        }
        return function(match2, cursor) {
          var ret = {};
          var i;
          for (i = 0; i < keys.length; i++) {
            ret[keys[i]] = parseInteger(match2[cursor + i]);
          }
          return [ret, null, cursor + i];
        };
      }
      var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
      var isoExtendedZone = "(?:" + offsetRegex.source + "?(?:\\[(" + ianaRegex.source + ")\\])?)?";
      var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
      var isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + isoExtendedZone);
      var isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?");
      var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
      var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
      var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
      var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
      var extractISOOrdinalData = simpleParse("year", "ordinal");
      var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
      var sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?");
      var sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");
      function int(match2, pos, fallback) {
        var m = match2[pos];
        return isUndefined2(m) ? fallback : parseInteger(m);
      }
      function extractISOYmd(match2, cursor) {
        var item = {
          year: int(match2, cursor),
          month: int(match2, cursor + 1, 1),
          day: int(match2, cursor + 2, 1)
        };
        return [item, null, cursor + 3];
      }
      function extractISOTime(match2, cursor) {
        var item = {
          hours: int(match2, cursor, 0),
          minutes: int(match2, cursor + 1, 0),
          seconds: int(match2, cursor + 2, 0),
          milliseconds: parseMillis(match2[cursor + 3])
        };
        return [item, null, cursor + 4];
      }
      function extractISOOffset(match2, cursor) {
        var local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
        return [{}, zone, cursor + 3];
      }
      function extractIANAZone(match2, cursor) {
        var zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
        return [{}, zone, cursor + 1];
      }
      var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$");
      var isoDuration = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
      function extractISODuration(match2) {
        var s3 = match2[0], yearStr = match2[1], monthStr = match2[2], weekStr = match2[3], dayStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], millisecondsStr = match2[8];
        var hasNegativePrefix = s3[0] === "-";
        var negativeSeconds = secondStr && secondStr[0] === "-";
        var maybeNegate = function maybeNegate2(num, force) {
          if (force === void 0) {
            force = false;
          }
          return num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
        };
        return [{
          years: maybeNegate(parseFloating(yearStr)),
          months: maybeNegate(parseFloating(monthStr)),
          weeks: maybeNegate(parseFloating(weekStr)),
          days: maybeNegate(parseFloating(dayStr)),
          hours: maybeNegate(parseFloating(hourStr)),
          minutes: maybeNegate(parseFloating(minuteStr)),
          seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
          milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
        }];
      }
      var obsOffsets = {
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
        var result = {
          year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
          month: monthsShort.indexOf(monthStr) + 1,
          day: parseInteger(dayStr),
          hour: parseInteger(hourStr),
          minute: parseInteger(minuteStr)
        };
        if (secondStr)
          result.second = parseInteger(secondStr);
        if (weekdayStr) {
          result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
        }
        return result;
      }
      var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
      function extractRFC2822(match2) {
        var weekdayStr = match2[1], dayStr = match2[2], monthStr = match2[3], yearStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], obsOffset = match2[8], milOffset = match2[9], offHourStr = match2[10], offMinuteStr = match2[11], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
        var offset2;
        if (obsOffset) {
          offset2 = obsOffsets[obsOffset];
        } else if (milOffset) {
          offset2 = 0;
        } else {
          offset2 = signedOffset(offHourStr, offMinuteStr);
        }
        return [result, new FixedOffsetZone(offset2)];
      }
      function preprocessRFC2822(s3) {
        return s3.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
      }
      var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
      var rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
      var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
      function extractRFC1123Or850(match2) {
        var weekdayStr = match2[1], dayStr = match2[2], monthStr = match2[3], yearStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
        return [result, FixedOffsetZone.utcInstance];
      }
      function extractASCII(match2) {
        var weekdayStr = match2[1], monthStr = match2[2], dayStr = match2[3], hourStr = match2[4], minuteStr = match2[5], secondStr = match2[6], yearStr = match2[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
        return [result, FixedOffsetZone.utcInstance];
      }
      var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
      var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
      var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
      var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
      var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
      var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
      var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
      var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
      function parseISODate(s3) {
        return parse(s3, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
      }
      function parseRFC2822Date(s3) {
        return parse(preprocessRFC2822(s3), [rfc2822, extractRFC2822]);
      }
      function parseHTTPDate(s3) {
        return parse(s3, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
      }
      function parseISODuration(s3) {
        return parse(s3, [isoDuration, extractISODuration]);
      }
      var extractISOTimeOnly = combineExtractors(extractISOTime);
      function parseISOTimeOnly(s3) {
        return parse(s3, [isoTimeOnly, extractISOTimeOnly]);
      }
      var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
      var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
      var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
      function parseSQL(s3) {
        return parse(s3, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
      }
      var INVALID$2 = "Invalid Duration";
      var lowOrderMatrix = {
        weeks: {
          days: 7,
          hours: 7 * 24,
          minutes: 7 * 24 * 60,
          seconds: 7 * 24 * 60 * 60,
          milliseconds: 7 * 24 * 60 * 60 * 1e3
        },
        days: {
          hours: 24,
          minutes: 24 * 60,
          seconds: 24 * 60 * 60,
          milliseconds: 24 * 60 * 60 * 1e3
        },
        hours: {
          minutes: 60,
          seconds: 60 * 60,
          milliseconds: 60 * 60 * 1e3
        },
        minutes: {
          seconds: 60,
          milliseconds: 60 * 1e3
        },
        seconds: {
          milliseconds: 1e3
        }
      };
      var casualMatrix = _extends({
        years: {
          quarters: 4,
          months: 12,
          weeks: 52,
          days: 365,
          hours: 365 * 24,
          minutes: 365 * 24 * 60,
          seconds: 365 * 24 * 60 * 60,
          milliseconds: 365 * 24 * 60 * 60 * 1e3
        },
        quarters: {
          months: 3,
          weeks: 13,
          days: 91,
          hours: 91 * 24,
          minutes: 91 * 24 * 60,
          seconds: 91 * 24 * 60 * 60,
          milliseconds: 91 * 24 * 60 * 60 * 1e3
        },
        months: {
          weeks: 4,
          days: 30,
          hours: 30 * 24,
          minutes: 30 * 24 * 60,
          seconds: 30 * 24 * 60 * 60,
          milliseconds: 30 * 24 * 60 * 60 * 1e3
        }
      }, lowOrderMatrix);
      var daysInYearAccurate = 146097 / 400;
      var daysInMonthAccurate = 146097 / 4800;
      var accurateMatrix = _extends({
        years: {
          quarters: 4,
          months: 12,
          weeks: daysInYearAccurate / 7,
          days: daysInYearAccurate,
          hours: daysInYearAccurate * 24,
          minutes: daysInYearAccurate * 24 * 60,
          seconds: daysInYearAccurate * 24 * 60 * 60,
          milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
        },
        quarters: {
          months: 3,
          weeks: daysInYearAccurate / 28,
          days: daysInYearAccurate / 4,
          hours: daysInYearAccurate * 24 / 4,
          minutes: daysInYearAccurate * 24 * 60 / 4,
          seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
          milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
        },
        months: {
          weeks: daysInMonthAccurate / 7,
          days: daysInMonthAccurate,
          hours: daysInMonthAccurate * 24,
          minutes: daysInMonthAccurate * 24 * 60,
          seconds: daysInMonthAccurate * 24 * 60 * 60,
          milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
        }
      }, lowOrderMatrix);
      var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
      var reverseUnits = orderedUnits$1.slice(0).reverse();
      function clone$1(dur, alts, clear) {
        if (clear === void 0) {
          clear = false;
        }
        var conf = {
          values: clear ? alts.values : _extends({}, dur.values, alts.values || {}),
          loc: dur.loc.clone(alts.loc),
          conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
        };
        return new Duration(conf);
      }
      function antiTrunc(n2) {
        return n2 < 0 ? Math.floor(n2) : Math.ceil(n2);
      }
      function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
        var conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
        toMap[toUnit] += added;
        fromMap[fromUnit] -= added * conv;
      }
      function normalizeValues(matrix, vals) {
        reverseUnits.reduce(function(previous, current) {
          if (!isUndefined2(vals[current])) {
            if (previous) {
              convert(matrix, vals, previous, vals, current);
            }
            return current;
          } else {
            return previous;
          }
        }, null);
      }
      var Duration = /* @__PURE__ */ function() {
        function Duration2(config) {
          var accurate = config.conversionAccuracy === "longterm" || false;
          this.values = config.values;
          this.loc = config.loc || Locale.create();
          this.conversionAccuracy = accurate ? "longterm" : "casual";
          this.invalid = config.invalid || null;
          this.matrix = accurate ? accurateMatrix : casualMatrix;
          this.isLuxonDuration = true;
        }
        Duration2.fromMillis = function fromMillis(count, opts) {
          return Duration2.fromObject({
            milliseconds: count
          }, opts);
        };
        Duration2.fromObject = function fromObject(obj, opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (obj == null || typeof obj !== "object") {
            throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
          }
          return new Duration2({
            values: normalizeObject(obj, Duration2.normalizeUnit),
            loc: Locale.fromObject(opts),
            conversionAccuracy: opts.conversionAccuracy
          });
        };
        Duration2.fromDurationLike = function fromDurationLike(durationLike) {
          if (isNumber(durationLike)) {
            return Duration2.fromMillis(durationLike);
          } else if (Duration2.isDuration(durationLike)) {
            return durationLike;
          } else if (typeof durationLike === "object") {
            return Duration2.fromObject(durationLike);
          } else {
            throw new InvalidArgumentError("Unknown duration argument " + durationLike + " of type " + typeof durationLike);
          }
        };
        Duration2.fromISO = function fromISO(text, opts) {
          var _parseISODuration = parseISODuration(text), parsed = _parseISODuration[0];
          if (parsed) {
            return Duration2.fromObject(parsed, opts);
          } else {
            return Duration2.invalid("unparsable", 'the input "' + text + `" can't be parsed as ISO 8601`);
          }
        };
        Duration2.fromISOTime = function fromISOTime(text, opts) {
          var _parseISOTimeOnly = parseISOTimeOnly(text), parsed = _parseISOTimeOnly[0];
          if (parsed) {
            return Duration2.fromObject(parsed, opts);
          } else {
            return Duration2.invalid("unparsable", 'the input "' + text + `" can't be parsed as ISO 8601`);
          }
        };
        Duration2.invalid = function invalid(reason, explanation) {
          if (explanation === void 0) {
            explanation = null;
          }
          if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
          }
          var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
          if (Settings.throwOnInvalid) {
            throw new InvalidDurationError(invalid2);
          } else {
            return new Duration2({
              invalid: invalid2
            });
          }
        };
        Duration2.normalizeUnit = function normalizeUnit2(unit) {
          var normalized = {
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
          if (!normalized)
            throw new InvalidUnitError(unit);
          return normalized;
        };
        Duration2.isDuration = function isDuration(o) {
          return o && o.isLuxonDuration || false;
        };
        var _proto = Duration2.prototype;
        _proto.toFormat = function toFormat(fmt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var fmtOpts = _extends({}, opts, {
            floor: opts.round !== false && opts.floor !== false
          });
          return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
        };
        _proto.toHuman = function toHuman(opts) {
          var _this = this;
          if (opts === void 0) {
            opts = {};
          }
          var l2 = orderedUnits$1.map(function(unit) {
            var val = _this.values[unit];
            if (isUndefined2(val)) {
              return null;
            }
            return _this.loc.numberFormatter(_extends({
              style: "unit",
              unitDisplay: "long"
            }, opts, {
              unit: unit.slice(0, -1)
            })).format(val);
          }).filter(function(n2) {
            return n2;
          });
          return this.loc.listFormatter(_extends({
            type: "conjunction",
            style: opts.listStyle || "narrow"
          }, opts)).format(l2);
        };
        _proto.toObject = function toObject() {
          if (!this.isValid)
            return {};
          return _extends({}, this.values);
        };
        _proto.toISO = function toISO() {
          if (!this.isValid)
            return null;
          var s3 = "P";
          if (this.years !== 0)
            s3 += this.years + "Y";
          if (this.months !== 0 || this.quarters !== 0)
            s3 += this.months + this.quarters * 3 + "M";
          if (this.weeks !== 0)
            s3 += this.weeks + "W";
          if (this.days !== 0)
            s3 += this.days + "D";
          if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
            s3 += "T";
          if (this.hours !== 0)
            s3 += this.hours + "H";
          if (this.minutes !== 0)
            s3 += this.minutes + "M";
          if (this.seconds !== 0 || this.milliseconds !== 0)
            s3 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
          if (s3 === "P")
            s3 += "T0S";
          return s3;
        };
        _proto.toISOTime = function toISOTime(opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (!this.isValid)
            return null;
          var millis = this.toMillis();
          if (millis < 0 || millis >= 864e5)
            return null;
          opts = _extends({
            suppressMilliseconds: false,
            suppressSeconds: false,
            includePrefix: false,
            format: "extended"
          }, opts);
          var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
          var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
          if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
            fmt += opts.format === "basic" ? "ss" : ":ss";
            if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
              fmt += ".SSS";
            }
          }
          var str = value.toFormat(fmt);
          if (opts.includePrefix) {
            str = "T" + str;
          }
          return str;
        };
        _proto.toJSON = function toJSON() {
          return this.toISO();
        };
        _proto.toString = function toString() {
          return this.toISO();
        };
        _proto.toMillis = function toMillis() {
          return this.as("milliseconds");
        };
        _proto.valueOf = function valueOf() {
          return this.toMillis();
        };
        _proto.plus = function plus(duration) {
          if (!this.isValid)
            return this;
          var dur = Duration2.fromDurationLike(duration), result = {};
          for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done; ) {
            var k = _step.value;
            if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
              result[k] = dur.get(k) + this.get(k);
            }
          }
          return clone$1(this, {
            values: result
          }, true);
        };
        _proto.minus = function minus(duration) {
          if (!this.isValid)
            return this;
          var dur = Duration2.fromDurationLike(duration);
          return this.plus(dur.negate());
        };
        _proto.mapUnits = function mapUnits(fn) {
          if (!this.isValid)
            return this;
          var result = {};
          for (var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++) {
            var k = _Object$keys[_i];
            result[k] = asNumber(fn(this.values[k], k));
          }
          return clone$1(this, {
            values: result
          }, true);
        };
        _proto.get = function get2(unit) {
          return this[Duration2.normalizeUnit(unit)];
        };
        _proto.set = function set2(values) {
          if (!this.isValid)
            return this;
          var mixed = _extends({}, this.values, normalizeObject(values, Duration2.normalizeUnit));
          return clone$1(this, {
            values: mixed
          });
        };
        _proto.reconfigure = function reconfigure(_temp) {
          var _ref = _temp === void 0 ? {} : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, conversionAccuracy = _ref.conversionAccuracy;
          var loc = this.loc.clone({
            locale,
            numberingSystem
          }), opts = {
            loc
          };
          if (conversionAccuracy) {
            opts.conversionAccuracy = conversionAccuracy;
          }
          return clone$1(this, opts);
        };
        _proto.as = function as(unit) {
          return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
        };
        _proto.normalize = function normalize() {
          if (!this.isValid)
            return this;
          var vals = this.toObject();
          normalizeValues(this.matrix, vals);
          return clone$1(this, {
            values: vals
          }, true);
        };
        _proto.shiftTo = function shiftTo() {
          for (var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++) {
            units[_key] = arguments[_key];
          }
          if (!this.isValid)
            return this;
          if (units.length === 0) {
            return this;
          }
          units = units.map(function(u) {
            return Duration2.normalizeUnit(u);
          });
          var built = {}, accumulated = {}, vals = this.toObject();
          var lastUnit;
          for (var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits$1), _step2; !(_step2 = _iterator2()).done; ) {
            var k = _step2.value;
            if (units.indexOf(k) >= 0) {
              lastUnit = k;
              var own = 0;
              for (var ak in accumulated) {
                own += this.matrix[ak][k] * accumulated[ak];
                accumulated[ak] = 0;
              }
              if (isNumber(vals[k])) {
                own += vals[k];
              }
              var i = Math.trunc(own);
              built[k] = i;
              accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
              for (var down in vals) {
                if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
                  convert(this.matrix, vals, down, built, k);
                }
              }
            } else if (isNumber(vals[k])) {
              accumulated[k] = vals[k];
            }
          }
          for (var key in accumulated) {
            if (accumulated[key] !== 0) {
              built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
            }
          }
          return clone$1(this, {
            values: built
          }, true).normalize();
        };
        _proto.negate = function negate() {
          if (!this.isValid)
            return this;
          var negated = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
          }
          return clone$1(this, {
            values: negated
          }, true);
        };
        _proto.equals = function equals(other) {
          if (!this.isValid || !other.isValid) {
            return false;
          }
          if (!this.loc.equals(other.loc)) {
            return false;
          }
          function eq(v1, v2) {
            if (v1 === void 0 || v1 === 0)
              return v2 === void 0 || v2 === 0;
            return v1 === v2;
          }
          for (var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits$1), _step3; !(_step3 = _iterator3()).done; ) {
            var u = _step3.value;
            if (!eq(this.values[u], other.values[u])) {
              return false;
            }
          }
          return true;
        };
        _createClass(Duration2, [{
          key: "locale",
          get: function get2() {
            return this.isValid ? this.loc.locale : null;
          }
        }, {
          key: "numberingSystem",
          get: function get2() {
            return this.isValid ? this.loc.numberingSystem : null;
          }
        }, {
          key: "years",
          get: function get2() {
            return this.isValid ? this.values.years || 0 : NaN;
          }
        }, {
          key: "quarters",
          get: function get2() {
            return this.isValid ? this.values.quarters || 0 : NaN;
          }
        }, {
          key: "months",
          get: function get2() {
            return this.isValid ? this.values.months || 0 : NaN;
          }
        }, {
          key: "weeks",
          get: function get2() {
            return this.isValid ? this.values.weeks || 0 : NaN;
          }
        }, {
          key: "days",
          get: function get2() {
            return this.isValid ? this.values.days || 0 : NaN;
          }
        }, {
          key: "hours",
          get: function get2() {
            return this.isValid ? this.values.hours || 0 : NaN;
          }
        }, {
          key: "minutes",
          get: function get2() {
            return this.isValid ? this.values.minutes || 0 : NaN;
          }
        }, {
          key: "seconds",
          get: function get2() {
            return this.isValid ? this.values.seconds || 0 : NaN;
          }
        }, {
          key: "milliseconds",
          get: function get2() {
            return this.isValid ? this.values.milliseconds || 0 : NaN;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return this.invalid === null;
          }
        }, {
          key: "invalidReason",
          get: function get2() {
            return this.invalid ? this.invalid.reason : null;
          }
        }, {
          key: "invalidExplanation",
          get: function get2() {
            return this.invalid ? this.invalid.explanation : null;
          }
        }]);
        return Duration2;
      }();
      var INVALID$1 = "Invalid Interval";
      function validateStartEnd(start, end) {
        if (!start || !start.isValid) {
          return Interval.invalid("missing or invalid start");
        } else if (!end || !end.isValid) {
          return Interval.invalid("missing or invalid end");
        } else if (end < start) {
          return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
        } else {
          return null;
        }
      }
      var Interval = /* @__PURE__ */ function() {
        function Interval2(config) {
          this.s = config.start;
          this.e = config.end;
          this.invalid = config.invalid || null;
          this.isLuxonInterval = true;
        }
        Interval2.invalid = function invalid(reason, explanation) {
          if (explanation === void 0) {
            explanation = null;
          }
          if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
          }
          var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
          if (Settings.throwOnInvalid) {
            throw new InvalidIntervalError(invalid2);
          } else {
            return new Interval2({
              invalid: invalid2
            });
          }
        };
        Interval2.fromDateTimes = function fromDateTimes(start, end) {
          var builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
          var validateError = validateStartEnd(builtStart, builtEnd);
          if (validateError == null) {
            return new Interval2({
              start: builtStart,
              end: builtEnd
            });
          } else {
            return validateError;
          }
        };
        Interval2.after = function after(start, duration) {
          var dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
          return Interval2.fromDateTimes(dt, dt.plus(dur));
        };
        Interval2.before = function before(end, duration) {
          var dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
          return Interval2.fromDateTimes(dt.minus(dur), dt);
        };
        Interval2.fromISO = function fromISO(text, opts) {
          var _split = (text || "").split("/", 2), s3 = _split[0], e2 = _split[1];
          if (s3 && e2) {
            var start, startIsValid;
            try {
              start = DateTime2.fromISO(s3, opts);
              startIsValid = start.isValid;
            } catch (e3) {
              startIsValid = false;
            }
            var end, endIsValid;
            try {
              end = DateTime2.fromISO(e2, opts);
              endIsValid = end.isValid;
            } catch (e3) {
              endIsValid = false;
            }
            if (startIsValid && endIsValid) {
              return Interval2.fromDateTimes(start, end);
            }
            if (startIsValid) {
              var dur = Duration.fromISO(e2, opts);
              if (dur.isValid) {
                return Interval2.after(start, dur);
              }
            } else if (endIsValid) {
              var _dur = Duration.fromISO(s3, opts);
              if (_dur.isValid) {
                return Interval2.before(end, _dur);
              }
            }
          }
          return Interval2.invalid("unparsable", 'the input "' + text + `" can't be parsed as ISO 8601`);
        };
        Interval2.isInterval = function isInterval(o) {
          return o && o.isLuxonInterval || false;
        };
        var _proto = Interval2.prototype;
        _proto.length = function length(unit) {
          if (unit === void 0) {
            unit = "milliseconds";
          }
          return this.isValid ? this.toDuration.apply(this, [unit]).get(unit) : NaN;
        };
        _proto.count = function count(unit) {
          if (unit === void 0) {
            unit = "milliseconds";
          }
          if (!this.isValid)
            return NaN;
          var start = this.start.startOf(unit), end = this.end.startOf(unit);
          return Math.floor(end.diff(start, unit).get(unit)) + 1;
        };
        _proto.hasSame = function hasSame(unit) {
          return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
        };
        _proto.isEmpty = function isEmpty() {
          return this.s.valueOf() === this.e.valueOf();
        };
        _proto.isAfter = function isAfter(dateTime) {
          if (!this.isValid)
            return false;
          return this.s > dateTime;
        };
        _proto.isBefore = function isBefore(dateTime) {
          if (!this.isValid)
            return false;
          return this.e <= dateTime;
        };
        _proto.contains = function contains(dateTime) {
          if (!this.isValid)
            return false;
          return this.s <= dateTime && this.e > dateTime;
        };
        _proto.set = function set2(_temp) {
          var _ref = _temp === void 0 ? {} : _temp, start = _ref.start, end = _ref.end;
          if (!this.isValid)
            return this;
          return Interval2.fromDateTimes(start || this.s, end || this.e);
        };
        _proto.splitAt = function splitAt() {
          var _this = this;
          if (!this.isValid)
            return [];
          for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
            dateTimes[_key] = arguments[_key];
          }
          var sorted = dateTimes.map(friendlyDateTime).filter(function(d) {
            return _this.contains(d);
          }).sort(), results = [];
          var s3 = this.s, i = 0;
          while (s3 < this.e) {
            var added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
            results.push(Interval2.fromDateTimes(s3, next));
            s3 = next;
            i += 1;
          }
          return results;
        };
        _proto.splitBy = function splitBy(duration) {
          var dur = Duration.fromDurationLike(duration);
          if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
            return [];
          }
          var s3 = this.s, idx = 1, next;
          var results = [];
          while (s3 < this.e) {
            var added = this.start.plus(dur.mapUnits(function(x) {
              return x * idx;
            }));
            next = +added > +this.e ? this.e : added;
            results.push(Interval2.fromDateTimes(s3, next));
            s3 = next;
            idx += 1;
          }
          return results;
        };
        _proto.divideEqually = function divideEqually(numberOfParts) {
          if (!this.isValid)
            return [];
          return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
        };
        _proto.overlaps = function overlaps(other) {
          return this.e > other.s && this.s < other.e;
        };
        _proto.abutsStart = function abutsStart(other) {
          if (!this.isValid)
            return false;
          return +this.e === +other.s;
        };
        _proto.abutsEnd = function abutsEnd(other) {
          if (!this.isValid)
            return false;
          return +other.e === +this.s;
        };
        _proto.engulfs = function engulfs(other) {
          if (!this.isValid)
            return false;
          return this.s <= other.s && this.e >= other.e;
        };
        _proto.equals = function equals(other) {
          if (!this.isValid || !other.isValid) {
            return false;
          }
          return this.s.equals(other.s) && this.e.equals(other.e);
        };
        _proto.intersection = function intersection(other) {
          if (!this.isValid)
            return this;
          var s3 = this.s > other.s ? this.s : other.s, e2 = this.e < other.e ? this.e : other.e;
          if (s3 >= e2) {
            return null;
          } else {
            return Interval2.fromDateTimes(s3, e2);
          }
        };
        _proto.union = function union(other) {
          if (!this.isValid)
            return this;
          var s3 = this.s < other.s ? this.s : other.s, e2 = this.e > other.e ? this.e : other.e;
          return Interval2.fromDateTimes(s3, e2);
        };
        Interval2.merge = function merge(intervals) {
          var _intervals$sort$reduc = intervals.sort(function(a, b) {
            return a.s - b.s;
          }).reduce(function(_ref2, item) {
            var sofar = _ref2[0], current = _ref2[1];
            if (!current) {
              return [sofar, item];
            } else if (current.overlaps(item) || current.abutsStart(item)) {
              return [sofar, current.union(item)];
            } else {
              return [sofar.concat([current]), item];
            }
          }, [[], null]), found = _intervals$sort$reduc[0], final = _intervals$sort$reduc[1];
          if (final) {
            found.push(final);
          }
          return found;
        };
        Interval2.xor = function xor(intervals) {
          var _Array$prototype;
          var start = null, currentCount = 0;
          var results = [], ends = intervals.map(function(i2) {
            return [{
              time: i2.s,
              type: "s"
            }, {
              time: i2.e,
              type: "e"
            }];
          }), flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends), arr = flattened.sort(function(a, b) {
            return a.time - b.time;
          });
          for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done; ) {
            var i = _step.value;
            currentCount += i.type === "s" ? 1 : -1;
            if (currentCount === 1) {
              start = i.time;
            } else {
              if (start && +start !== +i.time) {
                results.push(Interval2.fromDateTimes(start, i.time));
              }
              start = null;
            }
          }
          return Interval2.merge(results);
        };
        _proto.difference = function difference() {
          var _this2 = this;
          for (var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            intervals[_key2] = arguments[_key2];
          }
          return Interval2.xor([this].concat(intervals)).map(function(i) {
            return _this2.intersection(i);
          }).filter(function(i) {
            return i && !i.isEmpty();
          });
        };
        _proto.toString = function toString() {
          if (!this.isValid)
            return INVALID$1;
          return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
        };
        _proto.toISO = function toISO(opts) {
          if (!this.isValid)
            return INVALID$1;
          return this.s.toISO(opts) + "/" + this.e.toISO(opts);
        };
        _proto.toISODate = function toISODate() {
          if (!this.isValid)
            return INVALID$1;
          return this.s.toISODate() + "/" + this.e.toISODate();
        };
        _proto.toISOTime = function toISOTime(opts) {
          if (!this.isValid)
            return INVALID$1;
          return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
        };
        _proto.toFormat = function toFormat(dateFormat, _temp2) {
          var _ref3 = _temp2 === void 0 ? {} : _temp2, _ref3$separator = _ref3.separator, separator = _ref3$separator === void 0 ? " \u2013 " : _ref3$separator;
          if (!this.isValid)
            return INVALID$1;
          return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
        };
        _proto.toDuration = function toDuration(unit, opts) {
          if (!this.isValid) {
            return Duration.invalid(this.invalidReason);
          }
          return this.e.diff(this.s, unit, opts);
        };
        _proto.mapEndpoints = function mapEndpoints(mapFn) {
          return Interval2.fromDateTimes(mapFn(this.s), mapFn(this.e));
        };
        _createClass(Interval2, [{
          key: "start",
          get: function get2() {
            return this.isValid ? this.s : null;
          }
        }, {
          key: "end",
          get: function get2() {
            return this.isValid ? this.e : null;
          }
        }, {
          key: "isValid",
          get: function get2() {
            return this.invalidReason === null;
          }
        }, {
          key: "invalidReason",
          get: function get2() {
            return this.invalid ? this.invalid.reason : null;
          }
        }, {
          key: "invalidExplanation",
          get: function get2() {
            return this.invalid ? this.invalid.explanation : null;
          }
        }]);
        return Interval2;
      }();
      var Info = /* @__PURE__ */ function() {
        function Info2() {
        }
        Info2.hasDST = function hasDST(zone) {
          if (zone === void 0) {
            zone = Settings.defaultZone;
          }
          var proto = DateTime2.now().setZone(zone).set({
            month: 12
          });
          return !zone.isUniversal && proto.offset !== proto.set({
            month: 6
          }).offset;
        };
        Info2.isValidIANAZone = function isValidIANAZone(zone) {
          return IANAZone.isValidZone(zone);
        };
        Info2.normalizeZone = function normalizeZone$1(input) {
          return normalizeZone(input, Settings.defaultZone);
        };
        Info2.months = function months2(length, _temp) {
          if (length === void 0) {
            length = "long";
          }
          var _ref = _temp === void 0 ? {} : _temp, _ref$locale = _ref.locale, locale = _ref$locale === void 0 ? null : _ref$locale, _ref$numberingSystem = _ref.numberingSystem, numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem, _ref$locObj = _ref.locObj, locObj = _ref$locObj === void 0 ? null : _ref$locObj, _ref$outputCalendar = _ref.outputCalendar, outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;
          return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
        };
        Info2.monthsFormat = function monthsFormat(length, _temp2) {
          if (length === void 0) {
            length = "long";
          }
          var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$locale = _ref2.locale, locale = _ref2$locale === void 0 ? null : _ref2$locale, _ref2$numberingSystem = _ref2.numberingSystem, numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem, _ref2$locObj = _ref2.locObj, locObj = _ref2$locObj === void 0 ? null : _ref2$locObj, _ref2$outputCalendar = _ref2.outputCalendar, outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;
          return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
        };
        Info2.weekdays = function weekdays2(length, _temp3) {
          if (length === void 0) {
            length = "long";
          }
          var _ref3 = _temp3 === void 0 ? {} : _temp3, _ref3$locale = _ref3.locale, locale = _ref3$locale === void 0 ? null : _ref3$locale, _ref3$numberingSystem = _ref3.numberingSystem, numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem, _ref3$locObj = _ref3.locObj, locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;
          return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
        };
        Info2.weekdaysFormat = function weekdaysFormat(length, _temp4) {
          if (length === void 0) {
            length = "long";
          }
          var _ref4 = _temp4 === void 0 ? {} : _temp4, _ref4$locale = _ref4.locale, locale = _ref4$locale === void 0 ? null : _ref4$locale, _ref4$numberingSystem = _ref4.numberingSystem, numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem, _ref4$locObj = _ref4.locObj, locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;
          return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
        };
        Info2.meridiems = function meridiems2(_temp5) {
          var _ref5 = _temp5 === void 0 ? {} : _temp5, _ref5$locale = _ref5.locale, locale = _ref5$locale === void 0 ? null : _ref5$locale;
          return Locale.create(locale).meridiems();
        };
        Info2.eras = function eras2(length, _temp6) {
          if (length === void 0) {
            length = "short";
          }
          var _ref6 = _temp6 === void 0 ? {} : _temp6, _ref6$locale = _ref6.locale, locale = _ref6$locale === void 0 ? null : _ref6$locale;
          return Locale.create(locale, null, "gregory").eras(length);
        };
        Info2.features = function features() {
          return {
            relative: hasRelative()
          };
        };
        return Info2;
      }();
      function dayDiff(earlier, later) {
        var utcDayStart = function utcDayStart2(dt) {
          return dt.toUTC(0, {
            keepLocalTime: true
          }).startOf("day").valueOf();
        }, ms = utcDayStart(later) - utcDayStart(earlier);
        return Math.floor(Duration.fromMillis(ms).as("days"));
      }
      function highOrderDiffs(cursor, later, units) {
        var differs = [["years", function(a, b) {
          return b.year - a.year;
        }], ["quarters", function(a, b) {
          return b.quarter - a.quarter;
        }], ["months", function(a, b) {
          return b.month - a.month + (b.year - a.year) * 12;
        }], ["weeks", function(a, b) {
          var days = dayDiff(a, b);
          return (days - days % 7) / 7;
        }], ["days", dayDiff]];
        var results = {};
        var lowestOrder, highWater;
        for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
          var _differs$_i = _differs[_i], unit = _differs$_i[0], differ = _differs$_i[1];
          if (units.indexOf(unit) >= 0) {
            var _cursor$plus;
            lowestOrder = unit;
            var delta = differ(cursor, later);
            highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));
            if (highWater > later) {
              var _cursor$plus2;
              cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
              delta -= 1;
            } else {
              cursor = highWater;
            }
            results[unit] = delta;
          }
        }
        return [cursor, results, highWater, lowestOrder];
      }
      function _diff(earlier, later, units, opts) {
        var _highOrderDiffs = highOrderDiffs(earlier, later, units), cursor = _highOrderDiffs[0], results = _highOrderDiffs[1], highWater = _highOrderDiffs[2], lowestOrder = _highOrderDiffs[3];
        var remainingMillis = later - cursor;
        var lowerOrderUnits = units.filter(function(u) {
          return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
        });
        if (lowerOrderUnits.length === 0) {
          if (highWater < later) {
            var _cursor$plus3;
            highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
          }
          if (highWater !== cursor) {
            results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
          }
        }
        var duration = Duration.fromObject(results, opts);
        if (lowerOrderUnits.length > 0) {
          var _Duration$fromMillis;
          return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
        } else {
          return duration;
        }
      }
      var numberingSystems = {
        arab: "[\u0660-\u0669]",
        arabext: "[\u06F0-\u06F9]",
        bali: "[\u1B50-\u1B59]",
        beng: "[\u09E6-\u09EF]",
        deva: "[\u0966-\u096F]",
        fullwide: "[\uFF10-\uFF19]",
        gujr: "[\u0AE6-\u0AEF]",
        hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
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
      var numberingSystemsUTF16 = {
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
      var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
      function parseDigits(str) {
        var value = parseInt(str, 10);
        if (isNaN(value)) {
          value = "";
          for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            if (str[i].search(numberingSystems.hanidec) !== -1) {
              value += hanidecChars.indexOf(str[i]);
            } else {
              for (var key in numberingSystemsUTF16) {
                var _numberingSystemsUTF = numberingSystemsUTF16[key], min = _numberingSystemsUTF[0], max = _numberingSystemsUTF[1];
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
      function digitRegex(_ref, append2) {
        var numberingSystem = _ref.numberingSystem;
        if (append2 === void 0) {
          append2 = "";
        }
        return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append2);
      }
      var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
      function intUnit(regex, post) {
        if (post === void 0) {
          post = function post2(i) {
            return i;
          };
        }
        return {
          regex,
          deser: function deser(_ref) {
            var s3 = _ref[0];
            return post(parseDigits(s3));
          }
        };
      }
      var NBSP = String.fromCharCode(160);
      var spaceOrNBSP = "[ " + NBSP + "]";
      var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
      function fixListRegex(s3) {
        return s3.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
      }
      function stripInsensitivities(s3) {
        return s3.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
      }
      function oneOf(strings, startIndex) {
        if (strings === null) {
          return null;
        } else {
          return {
            regex: RegExp(strings.map(fixListRegex).join("|")),
            deser: function deser(_ref2) {
              var s3 = _ref2[0];
              return strings.findIndex(function(i) {
                return stripInsensitivities(s3) === stripInsensitivities(i);
              }) + startIndex;
            }
          };
        }
      }
      function offset(regex, groups) {
        return {
          regex,
          deser: function deser(_ref3) {
            var h = _ref3[1], m = _ref3[2];
            return signedOffset(h, m);
          },
          groups
        };
      }
      function simple(regex) {
        return {
          regex,
          deser: function deser(_ref4) {
            var s3 = _ref4[0];
            return s3;
          }
        };
      }
      function escapeToken(value) {
        return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }
      function unitForToken(token, loc) {
        var one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = function literal2(t) {
          return {
            regex: RegExp(escapeToken(t.val)),
            deser: function deser(_ref5) {
              var s3 = _ref5[0];
              return s3;
            },
            literal: true
          };
        }, unitate = function unitate2(t) {
          if (token.literal) {
            return literal(t);
          }
          switch (t.val) {
            case "G":
              return oneOf(loc.eras("short", false), 0);
            case "GG":
              return oneOf(loc.eras("long", false), 0);
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
            case "d":
              return intUnit(oneOrTwo);
            case "dd":
              return intUnit(two);
            case "o":
              return intUnit(oneToThree);
            case "ooo":
              return intUnit(three);
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
            case "uu":
              return simple(oneOrTwo);
            case "uuu":
              return intUnit(one);
            case "a":
              return oneOf(loc.meridiems(), 0);
            case "kkkk":
              return intUnit(four);
            case "kk":
              return intUnit(twoToFour, untruncateYear);
            case "W":
              return intUnit(oneOrTwo);
            case "WW":
              return intUnit(two);
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
            case "Z":
            case "ZZ":
              return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);
            case "ZZZ":
              return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
            case "z":
              return simple(/[a-z_+-/]{1,256}?/i);
            default:
              return literal(t);
          }
        };
        var unit = unitate(token) || {
          invalidReason: MISSING_FTP
        };
        unit.token = token;
        return unit;
      }
      var partTypeStyleToTokenVal = {
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
        var type = part.type, value = part.value;
        if (type === "literal") {
          return {
            literal: true,
            val: value
          };
        }
        var style = formatOpts[type];
        var val = partTypeStyleToTokenVal[type];
        if (typeof val === "object") {
          val = val[style];
        }
        if (val) {
          return {
            literal: false,
            val
          };
        }
        return void 0;
      }
      function buildRegex(units) {
        var re = units.map(function(u) {
          return u.regex;
        }).reduce(function(f, r) {
          return f + "(" + r.source + ")";
        }, "");
        return ["^" + re + "$", units];
      }
      function match(input, regex, handlers) {
        var matches = input.match(regex);
        if (matches) {
          var all = {};
          var matchIndex = 1;
          for (var i in handlers) {
            if (hasOwnProperty(handlers, i)) {
              var h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
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
        var toField = function toField2(token) {
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
        var zone = null;
        var specificOffset;
        if (!isUndefined2(matches.z)) {
          zone = IANAZone.create(matches.z);
        }
        if (!isUndefined2(matches.Z)) {
          if (!zone) {
            zone = new FixedOffsetZone(matches.Z);
          }
          specificOffset = matches.Z;
        }
        if (!isUndefined2(matches.q)) {
          matches.M = (matches.q - 1) * 3 + 1;
        }
        if (!isUndefined2(matches.h)) {
          if (matches.h < 12 && matches.a === 1) {
            matches.h += 12;
          } else if (matches.h === 12 && matches.a === 0) {
            matches.h = 0;
          }
        }
        if (matches.G === 0 && matches.y) {
          matches.y = -matches.y;
        }
        if (!isUndefined2(matches.u)) {
          matches.S = parseMillis(matches.u);
        }
        var vals = Object.keys(matches).reduce(function(r, k) {
          var f = toField(k);
          if (f) {
            r[f] = matches[k];
          }
          return r;
        }, {});
        return [vals, zone, specificOffset];
      }
      var dummyDateTimeCache = null;
      function getDummyDateTime() {
        if (!dummyDateTimeCache) {
          dummyDateTimeCache = DateTime2.fromMillis(1555555555555);
        }
        return dummyDateTimeCache;
      }
      function maybeExpandMacroToken(token, locale) {
        if (token.literal) {
          return token;
        }
        var formatOpts = Formatter.macroTokenToFormatOpts(token.val);
        if (!formatOpts) {
          return token;
        }
        var formatter = Formatter.create(locale, formatOpts);
        var parts = formatter.formatDateTimeParts(getDummyDateTime());
        var tokens = parts.map(function(p) {
          return tokenForPart(p, locale, formatOpts);
        });
        if (tokens.includes(void 0)) {
          return token;
        }
        return tokens;
      }
      function expandMacroTokens(tokens, locale) {
        var _Array$prototype;
        return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function(t) {
          return maybeExpandMacroToken(t, locale);
        }));
      }
      function explainFromTokens(locale, input, format) {
        var tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map(function(t) {
          return unitForToken(t, locale);
        }), disqualifyingUnit = units.find(function(t) {
          return t.invalidReason;
        });
        if (disqualifyingUnit) {
          return {
            input,
            tokens,
            invalidReason: disqualifyingUnit.invalidReason
          };
        } else {
          var _buildRegex = buildRegex(units), regexString = _buildRegex[0], handlers = _buildRegex[1], regex = RegExp(regexString, "i"), _match = match(input, regex, handlers), rawMatches = _match[0], matches = _match[1], _ref6 = matches ? dateTimeFromMatches(matches) : [null, null, void 0], result = _ref6[0], zone = _ref6[1], specificOffset = _ref6[2];
          if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
            throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
          }
          return {
            input,
            tokens,
            regex,
            rawMatches,
            matches,
            result,
            zone,
            specificOffset
          };
        }
      }
      function parseFromTokens(locale, input, format) {
        var _explainFromTokens = explainFromTokens(locale, input, format), result = _explainFromTokens.result, zone = _explainFromTokens.zone, specificOffset = _explainFromTokens.specificOffset, invalidReason = _explainFromTokens.invalidReason;
        return [result, zone, specificOffset, invalidReason];
      }
      var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
      function unitOutOfRange(unit, value) {
        return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
      }
      function dayOfWeek(year, month, day) {
        var d = new Date(Date.UTC(year, month - 1, day));
        if (year < 100 && year >= 0) {
          d.setUTCFullYear(d.getUTCFullYear() - 1900);
        }
        var js = d.getUTCDay();
        return js === 0 ? 7 : js;
      }
      function computeOrdinal(year, month, day) {
        return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
      }
      function uncomputeOrdinal(year, ordinal) {
        var table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex(function(i) {
          return i < ordinal;
        }), day = ordinal - table[month0];
        return {
          month: month0 + 1,
          day
        };
      }
      function gregorianToWeek(gregObj) {
        var year = gregObj.year, month = gregObj.month, day = gregObj.day, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
        var weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
        if (weekNumber < 1) {
          weekYear = year - 1;
          weekNumber = weeksInWeekYear(weekYear);
        } else if (weekNumber > weeksInWeekYear(year)) {
          weekYear = year + 1;
          weekNumber = 1;
        } else {
          weekYear = year;
        }
        return _extends({
          weekYear,
          weekNumber,
          weekday
        }, timeObject(gregObj));
      }
      function weekToGregorian(weekData) {
        var weekYear = weekData.weekYear, weekNumber = weekData.weekNumber, weekday = weekData.weekday, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
        var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
        if (ordinal < 1) {
          year = weekYear - 1;
          ordinal += daysInYear(year);
        } else if (ordinal > yearInDays) {
          year = weekYear + 1;
          ordinal -= daysInYear(weekYear);
        } else {
          year = weekYear;
        }
        var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal.month, day = _uncomputeOrdinal.day;
        return _extends({
          year,
          month,
          day
        }, timeObject(weekData));
      }
      function gregorianToOrdinal(gregData) {
        var year = gregData.year, month = gregData.month, day = gregData.day;
        var ordinal = computeOrdinal(year, month, day);
        return _extends({
          year,
          ordinal
        }, timeObject(gregData));
      }
      function ordinalToGregorian(ordinalData) {
        var year = ordinalData.year, ordinal = ordinalData.ordinal;
        var _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal2.month, day = _uncomputeOrdinal2.day;
        return _extends({
          year,
          month,
          day
        }, timeObject(ordinalData));
      }
      function hasInvalidWeekData(obj) {
        var validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
        if (!validYear) {
          return unitOutOfRange("weekYear", obj.weekYear);
        } else if (!validWeek) {
          return unitOutOfRange("week", obj.week);
        } else if (!validWeekday) {
          return unitOutOfRange("weekday", obj.weekday);
        } else
          return false;
      }
      function hasInvalidOrdinalData(obj) {
        var validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
        if (!validYear) {
          return unitOutOfRange("year", obj.year);
        } else if (!validOrdinal) {
          return unitOutOfRange("ordinal", obj.ordinal);
        } else
          return false;
      }
      function hasInvalidGregorianData(obj) {
        var validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
        if (!validYear) {
          return unitOutOfRange("year", obj.year);
        } else if (!validMonth) {
          return unitOutOfRange("month", obj.month);
        } else if (!validDay) {
          return unitOutOfRange("day", obj.day);
        } else
          return false;
      }
      function hasInvalidTimeData(obj) {
        var hour = obj.hour, minute = obj.minute, second = obj.second, millisecond = obj.millisecond;
        var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
        if (!validHour) {
          return unitOutOfRange("hour", hour);
        } else if (!validMinute) {
          return unitOutOfRange("minute", minute);
        } else if (!validSecond) {
          return unitOutOfRange("second", second);
        } else if (!validMillisecond) {
          return unitOutOfRange("millisecond", millisecond);
        } else
          return false;
      }
      var INVALID = "Invalid DateTime";
      var MAX_DATE = 864e13;
      function unsupportedZone(zone) {
        return new Invalid("unsupported zone", 'the zone "' + zone.name + '" is not supported');
      }
      function possiblyCachedWeekData(dt) {
        if (dt.weekData === null) {
          dt.weekData = gregorianToWeek(dt.c);
        }
        return dt.weekData;
      }
      function clone(inst, alts) {
        var current = {
          ts: inst.ts,
          zone: inst.zone,
          c: inst.c,
          o: inst.o,
          loc: inst.loc,
          invalid: inst.invalid
        };
        return new DateTime2(_extends({}, current, alts, {
          old: current
        }));
      }
      function fixOffset(localTS, o, tz) {
        var utcGuess = localTS - o * 60 * 1e3;
        var o2 = tz.offset(utcGuess);
        if (o === o2) {
          return [utcGuess, o];
        }
        utcGuess -= (o2 - o) * 60 * 1e3;
        var o3 = tz.offset(utcGuess);
        if (o2 === o3) {
          return [utcGuess, o2];
        }
        return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
      }
      function tsToObj(ts, offset2) {
        ts += offset2 * 60 * 1e3;
        var d = new Date(ts);
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
      function objToTS(obj, offset2, zone) {
        return fixOffset(objToLocalTS(obj), offset2, zone);
      }
      function adjustTime(inst, dur) {
        var oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = _extends({}, inst.c, {
          year,
          month,
          day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
        }), millisToAdd = Duration.fromObject({
          years: dur.years - Math.trunc(dur.years),
          quarters: dur.quarters - Math.trunc(dur.quarters),
          months: dur.months - Math.trunc(dur.months),
          weeks: dur.weeks - Math.trunc(dur.weeks),
          days: dur.days - Math.trunc(dur.days),
          hours: dur.hours,
          minutes: dur.minutes,
          seconds: dur.seconds,
          milliseconds: dur.milliseconds
        }).as("milliseconds"), localTS = objToLocalTS(c);
        var _fixOffset = fixOffset(localTS, oPre, inst.zone), ts = _fixOffset[0], o = _fixOffset[1];
        if (millisToAdd !== 0) {
          ts += millisToAdd;
          o = inst.zone.offset(ts);
        }
        return {
          ts,
          o
        };
      }
      function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
        var setZone = opts.setZone, zone = opts.zone;
        if (parsed && Object.keys(parsed).length !== 0) {
          var interpretationZone = parsedZone || zone, inst = DateTime2.fromObject(parsed, _extends({}, opts, {
            zone: interpretationZone,
            specificOffset
          }));
          return setZone ? inst : inst.setZone(zone);
        } else {
          return DateTime2.invalid(new Invalid("unparsable", 'the input "' + text + `" can't be parsed as ` + format));
        }
      }
      function toTechFormat(dt, format, allowZ) {
        if (allowZ === void 0) {
          allowZ = true;
        }
        return dt.isValid ? Formatter.create(Locale.create("en-US"), {
          allowZ,
          forceSimple: true
        }).formatDateTimeFromString(dt, format) : null;
      }
      function _toISODate(o, extended) {
        var longFormat = o.c.year > 9999 || o.c.year < 0;
        var c = "";
        if (longFormat && o.c.year >= 0)
          c += "+";
        c += padStart(o.c.year, longFormat ? 6 : 4);
        if (extended) {
          c += "-";
          c += padStart(o.c.month);
          c += "-";
          c += padStart(o.c.day);
        } else {
          c += padStart(o.c.month);
          c += padStart(o.c.day);
        }
        return c;
      }
      function _toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
        var c = padStart(o.c.hour);
        if (extended) {
          c += ":";
          c += padStart(o.c.minute);
          if (o.c.second !== 0 || !suppressSeconds) {
            c += ":";
          }
        } else {
          c += padStart(o.c.minute);
        }
        if (o.c.second !== 0 || !suppressSeconds) {
          c += padStart(o.c.second);
          if (o.c.millisecond !== 0 || !suppressMilliseconds) {
            c += ".";
            c += padStart(o.c.millisecond, 3);
          }
        }
        if (includeOffset) {
          if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
            c += "Z";
          } else if (o.o < 0) {
            c += "-";
            c += padStart(Math.trunc(-o.o / 60));
            c += ":";
            c += padStart(Math.trunc(-o.o % 60));
          } else {
            c += "+";
            c += padStart(Math.trunc(o.o / 60));
            c += ":";
            c += padStart(Math.trunc(o.o % 60));
          }
        }
        if (extendedZone) {
          c += "[" + o.zone.ianaName + "]";
        }
        return c;
      }
      var defaultUnitValues = {
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      };
      var defaultWeekUnitValues = {
        weekNumber: 1,
        weekday: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      };
      var defaultOrdinalUnitValues = {
        ordinal: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      };
      var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
      var orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"];
      var orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
      function normalizeUnit(unit) {
        var normalized = {
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
        if (!normalized)
          throw new InvalidUnitError(unit);
        return normalized;
      }
      function quickDT(obj, opts) {
        var zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
        var ts, o;
        if (!isUndefined2(obj.year)) {
          for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done; ) {
            var u = _step.value;
            if (isUndefined2(obj[u])) {
              obj[u] = defaultUnitValues[u];
            }
          }
          var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
          if (invalid) {
            return DateTime2.invalid(invalid);
          }
          var offsetProvis = zone.offset(tsNow);
          var _objToTS = objToTS(obj, offsetProvis, zone);
          ts = _objToTS[0];
          o = _objToTS[1];
        } else {
          ts = tsNow;
        }
        return new DateTime2({
          ts,
          zone,
          loc,
          o
        });
      }
      function diffRelative(start, end, opts) {
        var round = isUndefined2(opts.round) ? true : opts.round, format = function format2(c, unit2) {
          c = roundTo(c, round || opts.calendary ? 0 : 2, true);
          var formatter = end.loc.clone(opts).relFormatter(opts);
          return formatter.format(c, unit2);
        }, differ = function differ2(unit2) {
          if (opts.calendary) {
            if (!end.hasSame(start, unit2)) {
              return end.startOf(unit2).diff(start.startOf(unit2), unit2).get(unit2);
            } else
              return 0;
          } else {
            return end.diff(start, unit2).get(unit2);
          }
        };
        if (opts.unit) {
          return format(differ(opts.unit), opts.unit);
        }
        for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done; ) {
          var unit = _step2.value;
          var count = differ(unit);
          if (Math.abs(count) >= 1) {
            return format(count, unit);
          }
        }
        return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
      }
      function lastOpts(argList) {
        var opts = {}, args;
        if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
          opts = argList[argList.length - 1];
          args = Array.from(argList).slice(0, argList.length - 1);
        } else {
          args = Array.from(argList);
        }
        return [opts, args];
      }
      var DateTime2 = /* @__PURE__ */ function() {
        function DateTime3(config) {
          var zone = config.zone || Settings.defaultZone;
          var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
          this.ts = isUndefined2(config.ts) ? Settings.now() : config.ts;
          var c = null, o = null;
          if (!invalid) {
            var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
            if (unchanged) {
              var _ref = [config.old.c, config.old.o];
              c = _ref[0];
              o = _ref[1];
            } else {
              var ot = zone.offset(this.ts);
              c = tsToObj(this.ts, ot);
              invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
              c = invalid ? null : c;
              o = invalid ? null : ot;
            }
          }
          this._zone = zone;
          this.loc = config.loc || Locale.create();
          this.invalid = invalid;
          this.weekData = null;
          this.c = c;
          this.o = o;
          this.isLuxonDateTime = true;
        }
        DateTime3.now = function now2() {
          return new DateTime3({});
        };
        DateTime3.local = function local() {
          var _lastOpts = lastOpts(arguments), opts = _lastOpts[0], args = _lastOpts[1], year = args[0], month = args[1], day = args[2], hour = args[3], minute = args[4], second = args[5], millisecond = args[6];
          return quickDT({
            year,
            month,
            day,
            hour,
            minute,
            second,
            millisecond
          }, opts);
        };
        DateTime3.utc = function utc() {
          var _lastOpts2 = lastOpts(arguments), opts = _lastOpts2[0], args = _lastOpts2[1], year = args[0], month = args[1], day = args[2], hour = args[3], minute = args[4], second = args[5], millisecond = args[6];
          opts.zone = FixedOffsetZone.utcInstance;
          return quickDT({
            year,
            month,
            day,
            hour,
            minute,
            second,
            millisecond
          }, opts);
        };
        DateTime3.fromJSDate = function fromJSDate(date, options) {
          if (options === void 0) {
            options = {};
          }
          var ts = isDate(date) ? date.valueOf() : NaN;
          if (Number.isNaN(ts)) {
            return DateTime3.invalid("invalid input");
          }
          var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
          if (!zoneToUse.isValid) {
            return DateTime3.invalid(unsupportedZone(zoneToUse));
          }
          return new DateTime3({
            ts,
            zone: zoneToUse,
            loc: Locale.fromObject(options)
          });
        };
        DateTime3.fromMillis = function fromMillis(milliseconds, options) {
          if (options === void 0) {
            options = {};
          }
          if (!isNumber(milliseconds)) {
            throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
          } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
            return DateTime3.invalid("Timestamp out of range");
          } else {
            return new DateTime3({
              ts: milliseconds,
              zone: normalizeZone(options.zone, Settings.defaultZone),
              loc: Locale.fromObject(options)
            });
          }
        };
        DateTime3.fromSeconds = function fromSeconds(seconds, options) {
          if (options === void 0) {
            options = {};
          }
          if (!isNumber(seconds)) {
            throw new InvalidArgumentError("fromSeconds requires a numerical input");
          } else {
            return new DateTime3({
              ts: seconds * 1e3,
              zone: normalizeZone(options.zone, Settings.defaultZone),
              loc: Locale.fromObject(options)
            });
          }
        };
        DateTime3.fromObject = function fromObject(obj, opts) {
          if (opts === void 0) {
            opts = {};
          }
          obj = obj || {};
          var zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
          if (!zoneToUse.isValid) {
            return DateTime3.invalid(unsupportedZone(zoneToUse));
          }
          var tsNow = Settings.now(), offsetProvis = !isUndefined2(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined2(normalized.ordinal), containsGregorYear = !isUndefined2(normalized.year), containsGregorMD = !isUndefined2(normalized.month) || !isUndefined2(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
          if ((containsGregor || containsOrdinal) && definiteWeekDef) {
            throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
          }
          if (containsGregorMD && containsOrdinal) {
            throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
          }
          var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
          var units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
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
          var foundFirst = false;
          for (var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done; ) {
            var u = _step3.value;
            var v = normalized[u];
            if (!isUndefined2(v)) {
              foundFirst = true;
            } else if (foundFirst) {
              normalized[u] = defaultValues[u];
            } else {
              normalized[u] = objNow[u];
            }
          }
          var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
          if (invalid) {
            return DateTime3.invalid(invalid);
          }
          var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse), tsFinal = _objToTS2[0], offsetFinal = _objToTS2[1], inst = new DateTime3({
            ts: tsFinal,
            zone: zoneToUse,
            o: offsetFinal,
            loc
          });
          if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
            return DateTime3.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
          }
          return inst;
        };
        DateTime3.fromISO = function fromISO(text, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _parseISODate = parseISODate(text), vals = _parseISODate[0], parsedZone = _parseISODate[1];
          return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
        };
        DateTime3.fromRFC2822 = function fromRFC2822(text, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _parseRFC2822Date = parseRFC2822Date(text), vals = _parseRFC2822Date[0], parsedZone = _parseRFC2822Date[1];
          return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
        };
        DateTime3.fromHTTP = function fromHTTP(text, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _parseHTTPDate = parseHTTPDate(text), vals = _parseHTTPDate[0], parsedZone = _parseHTTPDate[1];
          return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
        };
        DateTime3.fromFormat = function fromFormat(text, fmt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (isUndefined2(text) || isUndefined2(fmt)) {
            throw new InvalidArgumentError("fromFormat requires an input string and a format");
          }
          var _opts = opts, _opts$locale = _opts.locale, locale = _opts$locale === void 0 ? null : _opts$locale, _opts$numberingSystem = _opts.numberingSystem, numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true
          }), _parseFromTokens = parseFromTokens(localeToUse, text, fmt), vals = _parseFromTokens[0], parsedZone = _parseFromTokens[1], specificOffset = _parseFromTokens[2], invalid = _parseFromTokens[3];
          if (invalid) {
            return DateTime3.invalid(invalid);
          } else {
            return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text, specificOffset);
          }
        };
        DateTime3.fromString = function fromString(text, fmt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          return DateTime3.fromFormat(text, fmt, opts);
        };
        DateTime3.fromSQL = function fromSQL(text, opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _parseSQL = parseSQL(text), vals = _parseSQL[0], parsedZone = _parseSQL[1];
          return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
        };
        DateTime3.invalid = function invalid(reason, explanation) {
          if (explanation === void 0) {
            explanation = null;
          }
          if (!reason) {
            throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
          }
          var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
          if (Settings.throwOnInvalid) {
            throw new InvalidDateTimeError(invalid2);
          } else {
            return new DateTime3({
              invalid: invalid2
            });
          }
        };
        DateTime3.isDateTime = function isDateTime(o) {
          return o && o.isLuxonDateTime || false;
        };
        var _proto = DateTime3.prototype;
        _proto.get = function get2(unit) {
          return this[unit];
        };
        _proto.resolvedLocaleOptions = function resolvedLocaleOptions(opts) {
          if (opts === void 0) {
            opts = {};
          }
          var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this), locale = _Formatter$create$res.locale, numberingSystem = _Formatter$create$res.numberingSystem, calendar = _Formatter$create$res.calendar;
          return {
            locale,
            numberingSystem,
            outputCalendar: calendar
          };
        };
        _proto.toUTC = function toUTC(offset2, opts) {
          if (offset2 === void 0) {
            offset2 = 0;
          }
          if (opts === void 0) {
            opts = {};
          }
          return this.setZone(FixedOffsetZone.instance(offset2), opts);
        };
        _proto.toLocal = function toLocal() {
          return this.setZone(Settings.defaultZone);
        };
        _proto.setZone = function setZone(zone, _temp) {
          var _ref2 = _temp === void 0 ? {} : _temp, _ref2$keepLocalTime = _ref2.keepLocalTime, keepLocalTime = _ref2$keepLocalTime === void 0 ? false : _ref2$keepLocalTime, _ref2$keepCalendarTim = _ref2.keepCalendarTime, keepCalendarTime = _ref2$keepCalendarTim === void 0 ? false : _ref2$keepCalendarTim;
          zone = normalizeZone(zone, Settings.defaultZone);
          if (zone.equals(this.zone)) {
            return this;
          } else if (!zone.isValid) {
            return DateTime3.invalid(unsupportedZone(zone));
          } else {
            var newTS = this.ts;
            if (keepLocalTime || keepCalendarTime) {
              var offsetGuess = zone.offset(this.ts);
              var asObj = this.toObject();
              var _objToTS3 = objToTS(asObj, offsetGuess, zone);
              newTS = _objToTS3[0];
            }
            return clone(this, {
              ts: newTS,
              zone
            });
          }
        };
        _proto.reconfigure = function reconfigure(_temp2) {
          var _ref3 = _temp2 === void 0 ? {} : _temp2, locale = _ref3.locale, numberingSystem = _ref3.numberingSystem, outputCalendar = _ref3.outputCalendar;
          var loc = this.loc.clone({
            locale,
            numberingSystem,
            outputCalendar
          });
          return clone(this, {
            loc
          });
        };
        _proto.setLocale = function setLocale(locale) {
          return this.reconfigure({
            locale
          });
        };
        _proto.set = function set2(values) {
          if (!this.isValid)
            return this;
          var normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined2(normalized.weekYear) || !isUndefined2(normalized.weekNumber) || !isUndefined2(normalized.weekday), containsOrdinal = !isUndefined2(normalized.ordinal), containsGregorYear = !isUndefined2(normalized.year), containsGregorMD = !isUndefined2(normalized.month) || !isUndefined2(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
          if ((containsGregor || containsOrdinal) && definiteWeekDef) {
            throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
          }
          if (containsGregorMD && containsOrdinal) {
            throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
          }
          var mixed;
          if (settingWeekStuff) {
            mixed = weekToGregorian(_extends({}, gregorianToWeek(this.c), normalized));
          } else if (!isUndefined2(normalized.ordinal)) {
            mixed = ordinalToGregorian(_extends({}, gregorianToOrdinal(this.c), normalized));
          } else {
            mixed = _extends({}, this.toObject(), normalized);
            if (isUndefined2(normalized.day)) {
              mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
            }
          }
          var _objToTS4 = objToTS(mixed, this.o, this.zone), ts = _objToTS4[0], o = _objToTS4[1];
          return clone(this, {
            ts,
            o
          });
        };
        _proto.plus = function plus(duration) {
          if (!this.isValid)
            return this;
          var dur = Duration.fromDurationLike(duration);
          return clone(this, adjustTime(this, dur));
        };
        _proto.minus = function minus(duration) {
          if (!this.isValid)
            return this;
          var dur = Duration.fromDurationLike(duration).negate();
          return clone(this, adjustTime(this, dur));
        };
        _proto.startOf = function startOf(unit) {
          if (!this.isValid)
            return this;
          var o = {}, normalizedUnit = Duration.normalizeUnit(unit);
          switch (normalizedUnit) {
            case "years":
              o.month = 1;
            case "quarters":
            case "months":
              o.day = 1;
            case "weeks":
            case "days":
              o.hour = 0;
            case "hours":
              o.minute = 0;
            case "minutes":
              o.second = 0;
            case "seconds":
              o.millisecond = 0;
              break;
          }
          if (normalizedUnit === "weeks") {
            o.weekday = 1;
          }
          if (normalizedUnit === "quarters") {
            var q = Math.ceil(this.month / 3);
            o.month = (q - 1) * 3 + 1;
          }
          return this.set(o);
        };
        _proto.endOf = function endOf(unit) {
          var _this$plus;
          return this.isValid ? this.plus((_this$plus = {}, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
        };
        _proto.toFormat = function toFormat(fmt, opts) {
          if (opts === void 0) {
            opts = {};
          }
          return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
        };
        _proto.toLocaleString = function toLocaleString(formatOpts, opts) {
          if (formatOpts === void 0) {
            formatOpts = DATE_SHORT;
          }
          if (opts === void 0) {
            opts = {};
          }
          return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
        };
        _proto.toLocaleParts = function toLocaleParts(opts) {
          if (opts === void 0) {
            opts = {};
          }
          return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
        };
        _proto.toISO = function toISO(_temp3) {
          var _ref4 = _temp3 === void 0 ? {} : _temp3, _ref4$format = _ref4.format, format = _ref4$format === void 0 ? "extended" : _ref4$format, _ref4$suppressSeconds = _ref4.suppressSeconds, suppressSeconds = _ref4$suppressSeconds === void 0 ? false : _ref4$suppressSeconds, _ref4$suppressMillise = _ref4.suppressMilliseconds, suppressMilliseconds = _ref4$suppressMillise === void 0 ? false : _ref4$suppressMillise, _ref4$includeOffset = _ref4.includeOffset, includeOffset = _ref4$includeOffset === void 0 ? true : _ref4$includeOffset, _ref4$extendedZone = _ref4.extendedZone, extendedZone = _ref4$extendedZone === void 0 ? false : _ref4$extendedZone;
          if (!this.isValid) {
            return null;
          }
          var ext = format === "extended";
          var c = _toISODate(this, ext);
          c += "T";
          c += _toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
          return c;
        };
        _proto.toISODate = function toISODate(_temp4) {
          var _ref5 = _temp4 === void 0 ? {} : _temp4, _ref5$format = _ref5.format, format = _ref5$format === void 0 ? "extended" : _ref5$format;
          if (!this.isValid) {
            return null;
          }
          return _toISODate(this, format === "extended");
        };
        _proto.toISOWeekDate = function toISOWeekDate() {
          return toTechFormat(this, "kkkk-'W'WW-c");
        };
        _proto.toISOTime = function toISOTime(_temp5) {
          var _ref6 = _temp5 === void 0 ? {} : _temp5, _ref6$suppressMillise = _ref6.suppressMilliseconds, suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise, _ref6$suppressSeconds = _ref6.suppressSeconds, suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds, _ref6$includeOffset = _ref6.includeOffset, includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset, _ref6$includePrefix = _ref6.includePrefix, includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix, _ref6$extendedZone = _ref6.extendedZone, extendedZone = _ref6$extendedZone === void 0 ? false : _ref6$extendedZone, _ref6$format = _ref6.format, format = _ref6$format === void 0 ? "extended" : _ref6$format;
          if (!this.isValid) {
            return null;
          }
          var c = includePrefix ? "T" : "";
          return c + _toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
        };
        _proto.toRFC2822 = function toRFC2822() {
          return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
        };
        _proto.toHTTP = function toHTTP() {
          return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
        };
        _proto.toSQLDate = function toSQLDate() {
          if (!this.isValid) {
            return null;
          }
          return _toISODate(this, true);
        };
        _proto.toSQLTime = function toSQLTime(_temp6) {
          var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$includeOffset = _ref7.includeOffset, includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset, _ref7$includeZone = _ref7.includeZone, includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone, _ref7$includeOffsetSp = _ref7.includeOffsetSpace, includeOffsetSpace = _ref7$includeOffsetSp === void 0 ? true : _ref7$includeOffsetSp;
          var fmt = "HH:mm:ss.SSS";
          if (includeZone || includeOffset) {
            if (includeOffsetSpace) {
              fmt += " ";
            }
            if (includeZone) {
              fmt += "z";
            } else if (includeOffset) {
              fmt += "ZZ";
            }
          }
          return toTechFormat(this, fmt, true);
        };
        _proto.toSQL = function toSQL(opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (!this.isValid) {
            return null;
          }
          return this.toSQLDate() + " " + this.toSQLTime(opts);
        };
        _proto.toString = function toString() {
          return this.isValid ? this.toISO() : INVALID;
        };
        _proto.valueOf = function valueOf() {
          return this.toMillis();
        };
        _proto.toMillis = function toMillis() {
          return this.isValid ? this.ts : NaN;
        };
        _proto.toSeconds = function toSeconds() {
          return this.isValid ? this.ts / 1e3 : NaN;
        };
        _proto.toUnixInteger = function toUnixInteger() {
          return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
        };
        _proto.toJSON = function toJSON() {
          return this.toISO();
        };
        _proto.toBSON = function toBSON() {
          return this.toJSDate();
        };
        _proto.toObject = function toObject(opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (!this.isValid)
            return {};
          var base = _extends({}, this.c);
          if (opts.includeConfig) {
            base.outputCalendar = this.outputCalendar;
            base.numberingSystem = this.loc.numberingSystem;
            base.locale = this.loc.locale;
          }
          return base;
        };
        _proto.toJSDate = function toJSDate() {
          return new Date(this.isValid ? this.ts : NaN);
        };
        _proto.diff = function diff(otherDateTime, unit, opts) {
          if (unit === void 0) {
            unit = "milliseconds";
          }
          if (opts === void 0) {
            opts = {};
          }
          if (!this.isValid || !otherDateTime.isValid) {
            return Duration.invalid("created by diffing an invalid DateTime");
          }
          var durOpts = _extends({
            locale: this.locale,
            numberingSystem: this.numberingSystem
          }, opts);
          var units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = _diff(earlier, later, units, durOpts);
          return otherIsLater ? diffed.negate() : diffed;
        };
        _proto.diffNow = function diffNow(unit, opts) {
          if (unit === void 0) {
            unit = "milliseconds";
          }
          if (opts === void 0) {
            opts = {};
          }
          return this.diff(DateTime3.now(), unit, opts);
        };
        _proto.until = function until(otherDateTime) {
          return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
        };
        _proto.hasSame = function hasSame(otherDateTime, unit) {
          if (!this.isValid)
            return false;
          var inputMs = otherDateTime.valueOf();
          var adjustedToZone = this.setZone(otherDateTime.zone, {
            keepLocalTime: true
          });
          return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
        };
        _proto.equals = function equals(other) {
          return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
        };
        _proto.toRelative = function toRelative(options) {
          if (options === void 0) {
            options = {};
          }
          if (!this.isValid)
            return null;
          var base = options.base || DateTime3.fromObject({}, {
            zone: this.zone
          }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
          var units = ["years", "months", "days", "hours", "minutes", "seconds"];
          var unit = options.unit;
          if (Array.isArray(options.unit)) {
            units = options.unit;
            unit = void 0;
          }
          return diffRelative(base, this.plus(padding), _extends({}, options, {
            numeric: "always",
            units,
            unit
          }));
        };
        _proto.toRelativeCalendar = function toRelativeCalendar(options) {
          if (options === void 0) {
            options = {};
          }
          if (!this.isValid)
            return null;
          return diffRelative(options.base || DateTime3.fromObject({}, {
            zone: this.zone
          }), this, _extends({}, options, {
            numeric: "auto",
            units: ["years", "months", "days"],
            calendary: true
          }));
        };
        DateTime3.min = function min() {
          for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
            dateTimes[_key] = arguments[_key];
          }
          if (!dateTimes.every(DateTime3.isDateTime)) {
            throw new InvalidArgumentError("min requires all arguments be DateTimes");
          }
          return bestBy(dateTimes, function(i) {
            return i.valueOf();
          }, Math.min);
        };
        DateTime3.max = function max() {
          for (var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            dateTimes[_key2] = arguments[_key2];
          }
          if (!dateTimes.every(DateTime3.isDateTime)) {
            throw new InvalidArgumentError("max requires all arguments be DateTimes");
          }
          return bestBy(dateTimes, function(i) {
            return i.valueOf();
          }, Math.max);
        };
        DateTime3.fromFormatExplain = function fromFormatExplain(text, fmt, options) {
          if (options === void 0) {
            options = {};
          }
          var _options = options, _options$locale = _options.locale, locale = _options$locale === void 0 ? null : _options$locale, _options$numberingSys = _options.numberingSystem, numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys, localeToUse = Locale.fromOpts({
            locale,
            numberingSystem,
            defaultToEN: true
          });
          return explainFromTokens(localeToUse, text, fmt);
        };
        DateTime3.fromStringExplain = function fromStringExplain(text, fmt, options) {
          if (options === void 0) {
            options = {};
          }
          return DateTime3.fromFormatExplain(text, fmt, options);
        };
        _createClass(DateTime3, [{
          key: "isValid",
          get: function get2() {
            return this.invalid === null;
          }
        }, {
          key: "invalidReason",
          get: function get2() {
            return this.invalid ? this.invalid.reason : null;
          }
        }, {
          key: "invalidExplanation",
          get: function get2() {
            return this.invalid ? this.invalid.explanation : null;
          }
        }, {
          key: "locale",
          get: function get2() {
            return this.isValid ? this.loc.locale : null;
          }
        }, {
          key: "numberingSystem",
          get: function get2() {
            return this.isValid ? this.loc.numberingSystem : null;
          }
        }, {
          key: "outputCalendar",
          get: function get2() {
            return this.isValid ? this.loc.outputCalendar : null;
          }
        }, {
          key: "zone",
          get: function get2() {
            return this._zone;
          }
        }, {
          key: "zoneName",
          get: function get2() {
            return this.isValid ? this.zone.name : null;
          }
        }, {
          key: "year",
          get: function get2() {
            return this.isValid ? this.c.year : NaN;
          }
        }, {
          key: "quarter",
          get: function get2() {
            return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
          }
        }, {
          key: "month",
          get: function get2() {
            return this.isValid ? this.c.month : NaN;
          }
        }, {
          key: "day",
          get: function get2() {
            return this.isValid ? this.c.day : NaN;
          }
        }, {
          key: "hour",
          get: function get2() {
            return this.isValid ? this.c.hour : NaN;
          }
        }, {
          key: "minute",
          get: function get2() {
            return this.isValid ? this.c.minute : NaN;
          }
        }, {
          key: "second",
          get: function get2() {
            return this.isValid ? this.c.second : NaN;
          }
        }, {
          key: "millisecond",
          get: function get2() {
            return this.isValid ? this.c.millisecond : NaN;
          }
        }, {
          key: "weekYear",
          get: function get2() {
            return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
          }
        }, {
          key: "weekNumber",
          get: function get2() {
            return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
          }
        }, {
          key: "weekday",
          get: function get2() {
            return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
          }
        }, {
          key: "ordinal",
          get: function get2() {
            return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
          }
        }, {
          key: "monthShort",
          get: function get2() {
            return this.isValid ? Info.months("short", {
              locObj: this.loc
            })[this.month - 1] : null;
          }
        }, {
          key: "monthLong",
          get: function get2() {
            return this.isValid ? Info.months("long", {
              locObj: this.loc
            })[this.month - 1] : null;
          }
        }, {
          key: "weekdayShort",
          get: function get2() {
            return this.isValid ? Info.weekdays("short", {
              locObj: this.loc
            })[this.weekday - 1] : null;
          }
        }, {
          key: "weekdayLong",
          get: function get2() {
            return this.isValid ? Info.weekdays("long", {
              locObj: this.loc
            })[this.weekday - 1] : null;
          }
        }, {
          key: "offset",
          get: function get2() {
            return this.isValid ? +this.o : NaN;
          }
        }, {
          key: "offsetNameShort",
          get: function get2() {
            if (this.isValid) {
              return this.zone.offsetName(this.ts, {
                format: "short",
                locale: this.locale
              });
            } else {
              return null;
            }
          }
        }, {
          key: "offsetNameLong",
          get: function get2() {
            if (this.isValid) {
              return this.zone.offsetName(this.ts, {
                format: "long",
                locale: this.locale
              });
            } else {
              return null;
            }
          }
        }, {
          key: "isOffsetFixed",
          get: function get2() {
            return this.isValid ? this.zone.isUniversal : null;
          }
        }, {
          key: "isInDST",
          get: function get2() {
            if (this.isOffsetFixed) {
              return false;
            } else {
              return this.offset > this.set({
                month: 1,
                day: 1
              }).offset || this.offset > this.set({
                month: 5
              }).offset;
            }
          }
        }, {
          key: "isInLeapYear",
          get: function get2() {
            return isLeapYear(this.year);
          }
        }, {
          key: "daysInMonth",
          get: function get2() {
            return daysInMonth(this.year, this.month);
          }
        }, {
          key: "daysInYear",
          get: function get2() {
            return this.isValid ? daysInYear(this.year) : NaN;
          }
        }, {
          key: "weeksInWeekYear",
          get: function get2() {
            return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
          }
        }], [{
          key: "DATE_SHORT",
          get: function get2() {
            return DATE_SHORT;
          }
        }, {
          key: "DATE_MED",
          get: function get2() {
            return DATE_MED;
          }
        }, {
          key: "DATE_MED_WITH_WEEKDAY",
          get: function get2() {
            return DATE_MED_WITH_WEEKDAY;
          }
        }, {
          key: "DATE_FULL",
          get: function get2() {
            return DATE_FULL;
          }
        }, {
          key: "DATE_HUGE",
          get: function get2() {
            return DATE_HUGE;
          }
        }, {
          key: "TIME_SIMPLE",
          get: function get2() {
            return TIME_SIMPLE;
          }
        }, {
          key: "TIME_WITH_SECONDS",
          get: function get2() {
            return TIME_WITH_SECONDS;
          }
        }, {
          key: "TIME_WITH_SHORT_OFFSET",
          get: function get2() {
            return TIME_WITH_SHORT_OFFSET;
          }
        }, {
          key: "TIME_WITH_LONG_OFFSET",
          get: function get2() {
            return TIME_WITH_LONG_OFFSET;
          }
        }, {
          key: "TIME_24_SIMPLE",
          get: function get2() {
            return TIME_24_SIMPLE;
          }
        }, {
          key: "TIME_24_WITH_SECONDS",
          get: function get2() {
            return TIME_24_WITH_SECONDS;
          }
        }, {
          key: "TIME_24_WITH_SHORT_OFFSET",
          get: function get2() {
            return TIME_24_WITH_SHORT_OFFSET;
          }
        }, {
          key: "TIME_24_WITH_LONG_OFFSET",
          get: function get2() {
            return TIME_24_WITH_LONG_OFFSET;
          }
        }, {
          key: "DATETIME_SHORT",
          get: function get2() {
            return DATETIME_SHORT;
          }
        }, {
          key: "DATETIME_SHORT_WITH_SECONDS",
          get: function get2() {
            return DATETIME_SHORT_WITH_SECONDS;
          }
        }, {
          key: "DATETIME_MED",
          get: function get2() {
            return DATETIME_MED;
          }
        }, {
          key: "DATETIME_MED_WITH_SECONDS",
          get: function get2() {
            return DATETIME_MED_WITH_SECONDS;
          }
        }, {
          key: "DATETIME_MED_WITH_WEEKDAY",
          get: function get2() {
            return DATETIME_MED_WITH_WEEKDAY;
          }
        }, {
          key: "DATETIME_FULL",
          get: function get2() {
            return DATETIME_FULL;
          }
        }, {
          key: "DATETIME_FULL_WITH_SECONDS",
          get: function get2() {
            return DATETIME_FULL_WITH_SECONDS;
          }
        }, {
          key: "DATETIME_HUGE",
          get: function get2() {
            return DATETIME_HUGE;
          }
        }, {
          key: "DATETIME_HUGE_WITH_SECONDS",
          get: function get2() {
            return DATETIME_HUGE_WITH_SECONDS;
          }
        }]);
        return DateTime3;
      }();
      function friendlyDateTime(dateTimeish) {
        if (DateTime2.isDateTime(dateTimeish)) {
          return dateTimeish;
        } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
          return DateTime2.fromJSDate(dateTimeish);
        } else if (dateTimeish && typeof dateTimeish === "object") {
          return DateTime2.fromObject(dateTimeish);
        } else {
          throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
        }
      }
      var VERSION = "2.4.0";
      exports.DateTime = DateTime2;
      exports.Duration = Duration;
      exports.FixedOffsetZone = FixedOffsetZone;
      exports.IANAZone = IANAZone;
      exports.Info = Info;
      exports.Interval = Interval;
      exports.InvalidZone = InvalidZone;
      exports.Settings = Settings;
      exports.SystemZone = SystemZone;
      exports.VERSION = VERSION;
      exports.Zone = Zone;
    }
  });

  // node_modules/esbuild-node-builtins/lib/noop.js
  var require_noop = __commonJS({
    "node_modules/esbuild-node-builtins/lib/noop.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/path-browserify/index.js
  var require_path_browserify = __commonJS({
    "node_modules/path-browserify/index.js"(exports, module) {
      "use strict";
      function assertPath(path3) {
        if (typeof path3 !== "string") {
          throw new TypeError("Path must be a string. Received " + JSON.stringify(path3));
        }
      }
      function normalizeStringPosix(path3, allowAboveRoot) {
        var res = "";
        var lastSegmentLength = 0;
        var lastSlash = -1;
        var dots = 0;
        var code;
        for (var i = 0; i <= path3.length; ++i) {
          if (i < path3.length)
            code = path3.charCodeAt(i);
          else if (code === 47)
            break;
          else
            code = 47;
          if (code === 47) {
            if (lastSlash === i - 1 || dots === 1) {
            } else if (lastSlash !== i - 1 && dots === 2) {
              if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                if (res.length > 2) {
                  var lastSlashIndex = res.lastIndexOf("/");
                  if (lastSlashIndex !== res.length - 1) {
                    if (lastSlashIndex === -1) {
                      res = "";
                      lastSegmentLength = 0;
                    } else {
                      res = res.slice(0, lastSlashIndex);
                      lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                    }
                    lastSlash = i;
                    dots = 0;
                    continue;
                  }
                } else if (res.length === 2 || res.length === 1) {
                  res = "";
                  lastSegmentLength = 0;
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              }
              if (allowAboveRoot) {
                if (res.length > 0)
                  res += "/..";
                else
                  res = "..";
                lastSegmentLength = 2;
              }
            } else {
              if (res.length > 0)
                res += "/" + path3.slice(lastSlash + 1, i);
              else
                res = path3.slice(lastSlash + 1, i);
              lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
          } else if (code === 46 && dots !== -1) {
            ++dots;
          } else {
            dots = -1;
          }
        }
        return res;
      }
      function _format(sep, pathObject) {
        var dir = pathObject.dir || pathObject.root;
        var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir) {
          return base;
        }
        if (dir === pathObject.root) {
          return dir + base;
        }
        return dir + sep + base;
      }
      var posix = {
        resolve: function resolve() {
          var resolvedPath = "";
          var resolvedAbsolute = false;
          var cwd;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path3;
            if (i >= 0)
              path3 = arguments[i];
            else {
              if (cwd === void 0)
                cwd = process.cwd();
              path3 = cwd;
            }
            assertPath(path3);
            if (path3.length === 0) {
              continue;
            }
            resolvedPath = path3 + "/" + resolvedPath;
            resolvedAbsolute = path3.charCodeAt(0) === 47;
          }
          resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
          if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
              return "/" + resolvedPath;
            else
              return "/";
          } else if (resolvedPath.length > 0) {
            return resolvedPath;
          } else {
            return ".";
          }
        },
        normalize: function normalize(path3) {
          assertPath(path3);
          if (path3.length === 0)
            return ".";
          var isAbsolute = path3.charCodeAt(0) === 47;
          var trailingSeparator = path3.charCodeAt(path3.length - 1) === 47;
          path3 = normalizeStringPosix(path3, !isAbsolute);
          if (path3.length === 0 && !isAbsolute)
            path3 = ".";
          if (path3.length > 0 && trailingSeparator)
            path3 += "/";
          if (isAbsolute)
            return "/" + path3;
          return path3;
        },
        isAbsolute: function isAbsolute(path3) {
          assertPath(path3);
          return path3.length > 0 && path3.charCodeAt(0) === 47;
        },
        join: function join() {
          if (arguments.length === 0)
            return ".";
          var joined;
          for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            assertPath(arg);
            if (arg.length > 0) {
              if (joined === void 0)
                joined = arg;
              else
                joined += "/" + arg;
            }
          }
          if (joined === void 0)
            return ".";
          return posix.normalize(joined);
        },
        relative: function relative(from, to) {
          assertPath(from);
          assertPath(to);
          if (from === to)
            return "";
          from = posix.resolve(from);
          to = posix.resolve(to);
          if (from === to)
            return "";
          var fromStart = 1;
          for (; fromStart < from.length; ++fromStart) {
            if (from.charCodeAt(fromStart) !== 47)
              break;
          }
          var fromEnd = from.length;
          var fromLen = fromEnd - fromStart;
          var toStart = 1;
          for (; toStart < to.length; ++toStart) {
            if (to.charCodeAt(toStart) !== 47)
              break;
          }
          var toEnd = to.length;
          var toLen = toEnd - toStart;
          var length = fromLen < toLen ? fromLen : toLen;
          var lastCommonSep = -1;
          var i = 0;
          for (; i <= length; ++i) {
            if (i === length) {
              if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                  return to.slice(toStart + i + 1);
                } else if (i === 0) {
                  return to.slice(toStart + i);
                }
              } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                  lastCommonSep = i;
                } else if (i === 0) {
                  lastCommonSep = 0;
                }
              }
              break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
              break;
            else if (fromCode === 47)
              lastCommonSep = i;
          }
          var out = "";
          for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === 47) {
              if (out.length === 0)
                out += "..";
              else
                out += "/..";
            }
          }
          if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
          else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47)
              ++toStart;
            return to.slice(toStart);
          }
        },
        _makeLong: function _makeLong(path3) {
          return path3;
        },
        dirname: function dirname(path3) {
          assertPath(path3);
          if (path3.length === 0)
            return ".";
          var code = path3.charCodeAt(0);
          var hasRoot = code === 47;
          var end = -1;
          var matchedSlash = true;
          for (var i = path3.length - 1; i >= 1; --i) {
            code = path3.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1)
            return hasRoot ? "/" : ".";
          if (hasRoot && end === 1)
            return "//";
          return path3.slice(0, end);
        },
        basename: function basename(path3, ext) {
          if (ext !== void 0 && typeof ext !== "string")
            throw new TypeError('"ext" argument must be a string');
          assertPath(path3);
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          if (ext !== void 0 && ext.length > 0 && ext.length <= path3.length) {
            if (ext.length === path3.length && ext === path3)
              return "";
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for (i = path3.length - 1; i >= 0; --i) {
              var code = path3.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else {
                if (firstNonSlashEnd === -1) {
                  matchedSlash = false;
                  firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                  if (code === ext.charCodeAt(extIdx)) {
                    if (--extIdx === -1) {
                      end = i;
                    }
                  } else {
                    extIdx = -1;
                    end = firstNonSlashEnd;
                  }
                }
              }
            }
            if (start === end)
              end = firstNonSlashEnd;
            else if (end === -1)
              end = path3.length;
            return path3.slice(start, end);
          } else {
            for (i = path3.length - 1; i >= 0; --i) {
              if (path3.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1)
              return "";
            return path3.slice(start, end);
          }
        },
        extname: function extname(path3) {
          assertPath(path3);
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var preDotState = 0;
          for (var i = path3.length - 1; i >= 0; --i) {
            var code = path3.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path3.slice(startDot, end);
        },
        format: function format(pathObject) {
          if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
          }
          return _format("/", pathObject);
        },
        parse: function parse(path3) {
          assertPath(path3);
          var ret = { root: "", dir: "", base: "", ext: "", name: "" };
          if (path3.length === 0)
            return ret;
          var code = path3.charCodeAt(0);
          var isAbsolute = code === 47;
          var start;
          if (isAbsolute) {
            ret.root = "/";
            start = 1;
          } else {
            start = 0;
          }
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var i = path3.length - 1;
          var preDotState = 0;
          for (; i >= start; --i) {
            code = path3.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
              if (startPart === 0 && isAbsolute)
                ret.base = ret.name = path3.slice(1, end);
              else
                ret.base = ret.name = path3.slice(startPart, end);
            }
          } else {
            if (startPart === 0 && isAbsolute) {
              ret.name = path3.slice(1, startDot);
              ret.base = path3.slice(1, end);
            } else {
              ret.name = path3.slice(startPart, startDot);
              ret.base = path3.slice(startPart, end);
            }
            ret.ext = path3.slice(startDot, end);
          }
          if (startPart > 0)
            ret.dir = path3.slice(0, startPart - 1);
          else if (isAbsolute)
            ret.dir = "/";
          return ret;
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null
      };
      posix.posix = posix;
      module.exports = posix;
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    __express: () => __express,
    __getReact: () => __getReact,
    __getReactDOM: () => __getReactDOM,
    _jsonxChildren: () => _jsonxChildren,
    _jsonxComponents: () => _jsonxComponents,
    _jsonxHelpers: () => _jsonxHelpers,
    _jsonxProps: () => _jsonxProps,
    _jsonxUtils: () => _jsonxUtils,
    compile: () => compile,
    default: () => src_default,
    getReactElement: () => getReactElement,
    getReactElementFromJSON: () => getReactElementFromJSON,
    getReactElementFromJSONX: () => getReactElementFromJSONX,
    getRenderedJSON: () => getRenderedJSON,
    jsonToJSX: () => jsonToJSX,
    jsonxHTMLString: () => jsonxHTMLString,
    jsonxRender: () => jsonxRender,
    outputHTML: () => outputHTML,
    outputJSON: () => outputJSON,
    outputJSX: () => outputJSX,
    renderFile: () => __express,
    renderIndex: () => renderIndex
  });
  var import_react4 = __toESM(require_react(), 1);
  var import_react_dom = __toESM(require_react_dom(), 1);
  var import_client = __toESM(require_client(), 1);
  var import_server = __toESM(require_server_browser(), 1);

  // src/components.ts
  var components_exports = {};
  __export(components_exports, {
    DynamicComponent: () => DynamicComponent,
    FormComponent: () => FormComponent,
    ReactHookForm: () => ReactHookForm,
    advancedBinding: () => advancedBinding,
    componentMap: () => componentMap,
    generatedCustomComponents: () => generatedCustomComponents,
    getBoundedComponents: () => getBoundedComponents,
    getComponentFromLibrary: () => getComponentFromLibrary,
    getComponentFromMap: () => getComponentFromMap,
    getCustomComponentsCacheKey: () => getCustomComponentsCacheKey,
    getCustomFunctionComponent: () => getCustomFunctionComponent,
    getFunctionBody: () => getFunctionBody,
    getFunctionFromEval: () => getFunctionFromEval,
    getReactClassComponent: () => getReactClassComponent,
    getReactContext: () => getReactContext,
    getReactFunctionComponent: () => getReactFunctionComponent,
    getReactLibrariesAndComponents: () => getReactLibrariesAndComponents,
    makeFunctionComponent: () => makeFunctionComponent
  });
  var import_react2 = __toESM(require_react(), 1);
  var memoryCache = __toESM(require_memory_cache(), 1);

  // node_modules/react-hook-form/dist/index.esm.mjs
  var import_react = __toESM(require_react(), 1);
  var isCheckBoxInput = (element) => element.type === "checkbox";
  var isDateObject = (value) => value instanceof Date;
  var isNullOrUndefined = (value) => value == null;
  var isObjectType = (value) => typeof value === "object";
  var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
  var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
  var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
  var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
  var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
  var isUndefined = (val) => val === void 0;
  var get = (obj, path3, defaultValue) => {
    if (!path3 || !isObject(obj)) {
      return defaultValue;
    }
    const result = compact(path3.split(/[,[\].]+?/)).reduce((result2, key) => isNullOrUndefined(result2) ? result2 : result2[key], obj);
    return isUndefined(result) || result === obj ? isUndefined(obj[path3]) ? defaultValue : obj[path3] : result;
  };
  var EVENTS = {
    BLUR: "blur",
    FOCUS_OUT: "focusout",
    CHANGE: "change"
  };
  var VALIDATION_MODE = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all"
  };
  var INPUT_VALIDATION_RULES = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate"
  };
  var HookFormContext = import_react.default.createContext(null);
  var useFormContext = () => import_react.default.useContext(HookFormContext);
  var getProxyFormState = (formState, _proxyFormState, localProxyFormState, isRoot = true) => {
    const result = {};
    for (const key in formState) {
      Object.defineProperty(result, key, {
        get: () => {
          const _key = key;
          if (_proxyFormState[_key] !== VALIDATION_MODE.all) {
            _proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
          }
          localProxyFormState && (localProxyFormState[_key] = true);
          return formState[_key];
        }
      });
    }
    return result;
  };
  var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
  var shouldRenderFormState = (formStateData, _proxyFormState, isRoot) => {
    const { name, ...formState } = formStateData;
    return isEmptyObject(formState) || Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
  };
  var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
  var shouldSubscribeByName = (name, signalName, exact) => exact && signalName ? name === signalName : !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (currentName.startsWith(signalName) || signalName.startsWith(currentName)));
  function useSubscribe(props) {
    const _props = import_react.default.useRef(props);
    _props.current = props;
    import_react.default.useEffect(() => {
      const tearDown = (subscription2) => {
        if (subscription2) {
          subscription2.unsubscribe();
        }
      };
      const subscription = !props.disabled && _props.current.subject.subscribe({
        next: _props.current.callback
      });
      return () => tearDown(subscription);
    }, [props.disabled]);
  }
  function useFormState(props) {
    const methods = useFormContext();
    const { control = methods.control, disabled, name, exact } = props || {};
    const [formState, updateFormState] = import_react.default.useState(control._formState);
    const _localProxyFormState = import_react.default.useRef({
      isDirty: false,
      dirtyFields: false,
      touchedFields: false,
      isValidating: false,
      isValid: false,
      errors: false
    });
    const _name = import_react.default.useRef(name);
    const _mounted = import_react.default.useRef(true);
    _name.current = name;
    const callback = import_react.default.useCallback((value) => _mounted.current && shouldSubscribeByName(_name.current, value.name, exact) && shouldRenderFormState(value, _localProxyFormState.current) && updateFormState({
      ...control._formState,
      ...value
    }), [control, exact]);
    useSubscribe({
      disabled,
      callback,
      subject: control._subjects.state
    });
    import_react.default.useEffect(() => {
      _mounted.current = true;
      return () => {
        _mounted.current = false;
      };
    }, []);
    return getProxyFormState(formState, control._proxyFormState, _localProxyFormState.current, false);
  }
  var isString = (value) => typeof value === "string";
  var generateWatchOutput = (names, _names, formValues, isGlobal) => {
    const isArray = Array.isArray(names);
    if (isString(names)) {
      isGlobal && _names.watch.add(names);
      return get(formValues, names);
    }
    if (isArray) {
      return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
    }
    isGlobal && (_names.watchAll = true);
    return formValues;
  };
  var isFunction = (value) => typeof value === "function";
  var objectHasFunction = (data) => {
    for (const key in data) {
      if (isFunction(data[key])) {
        return true;
      }
    }
    return false;
  };
  function useWatch(props) {
    const methods = useFormContext();
    const { control = methods.control, name, defaultValue, disabled, exact } = props || {};
    const _name = import_react.default.useRef(name);
    _name.current = name;
    const callback = import_react.default.useCallback((formState) => {
      if (shouldSubscribeByName(_name.current, formState.name, exact)) {
        const fieldValues = generateWatchOutput(_name.current, control._names, formState.values || control._formValues);
        updateValue(isUndefined(_name.current) || isObject(fieldValues) && !objectHasFunction(fieldValues) ? { ...fieldValues } : Array.isArray(fieldValues) ? [...fieldValues] : isUndefined(fieldValues) ? defaultValue : fieldValues);
      }
    }, [control, exact, defaultValue]);
    useSubscribe({
      disabled,
      subject: control._subjects.watch,
      callback
    });
    const [value, updateValue] = import_react.default.useState(isUndefined(defaultValue) ? control._getWatch(name) : defaultValue);
    import_react.default.useEffect(() => {
      control._removeUnmounted();
    });
    return value;
  }
  function useController(props) {
    const methods = useFormContext();
    const { name, control = methods.control, shouldUnregister } = props;
    const isArrayField = isNameInFieldArray(control._names.array, name);
    const value = useWatch({
      control,
      name,
      defaultValue: get(control._formValues, name, get(control._defaultValues, name, props.defaultValue)),
      exact: true
    });
    const formState = useFormState({
      control,
      name
    });
    const _registerProps = import_react.default.useRef(control.register(name, {
      ...props.rules,
      value
    }));
    import_react.default.useEffect(() => {
      const updateMounted = (name2, value2) => {
        const field = get(control._fields, name2);
        if (field) {
          field._f.mount = value2;
        }
      };
      updateMounted(name, true);
      return () => {
        const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
        (isArrayField ? _shouldUnregisterField && !control._stateFlags.action : _shouldUnregisterField) ? control.unregister(name) : updateMounted(name, false);
      };
    }, [name, control, isArrayField, shouldUnregister]);
    return {
      field: {
        name,
        value,
        onChange: import_react.default.useCallback((event) => {
          _registerProps.current.onChange({
            target: {
              value: getEventValue(event),
              name
            },
            type: EVENTS.CHANGE
          });
        }, [name]),
        onBlur: import_react.default.useCallback(() => {
          _registerProps.current.onBlur({
            target: {
              value: get(control._formValues, name),
              name
            },
            type: EVENTS.BLUR
          });
        }, [name, control]),
        ref: import_react.default.useCallback((elm) => {
          const field = get(control._fields, name);
          if (elm && field && elm.focus) {
            field._f.ref = {
              focus: () => elm.focus(),
              setCustomValidity: (message) => elm.setCustomValidity(message),
              reportValidity: () => elm.reportValidity()
            };
          }
        }, [name, control._fields])
      },
      formState,
      fieldState: Object.defineProperties({}, {
        invalid: {
          get: () => !!get(formState.errors, name)
        },
        isDirty: {
          get: () => !!get(formState.dirtyFields, name)
        },
        isTouched: {
          get: () => !!get(formState.touchedFields, name)
        },
        error: {
          get: () => get(formState.errors, name)
        }
      })
    };
  }
  var Controller = (props) => props.render(useController(props));
  var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
    ...errors[name],
    types: {
      ...errors[name] && errors[name].types ? errors[name].types : {},
      [type]: message || true
    }
  } : {};
  var isKey = (value) => /^\w*$/.test(value);
  var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
  function set(object, path3, value) {
    let index = -1;
    const tempPath = isKey(path3) ? [path3] : stringToPath(path3);
    const length = tempPath.length;
    const lastIndex = length - 1;
    while (++index < length) {
      const key = tempPath[index];
      let newValue = value;
      if (index !== lastIndex) {
        const objValue = object[key];
        newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
      }
      object[key] = newValue;
      object = object[key];
    }
    return object;
  }
  var focusFieldBy = (fields, callback, fieldsNames) => {
    for (const key of fieldsNames || Object.keys(fields)) {
      const field = get(fields, key);
      if (field) {
        const { _f, ...currentField } = field;
        if (_f && callback(_f.name)) {
          if (_f.ref.focus && isUndefined(_f.ref.focus())) {
            break;
          } else if (_f.refs) {
            _f.refs[0].focus();
            break;
          }
        } else if (isObject(currentField)) {
          focusFieldBy(currentField, callback);
        }
      }
    }
  };
  var generateId = () => {
    const d = typeof performance === "undefined" ? Date.now() : performance.now() * 1e3;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16 + d) % 16 | 0;
      return (c == "x" ? r : r & 3 | 8).toString(16);
    });
  };
  var getFocusFieldName = (name, index, options = {}) => options.shouldFocus || isUndefined(options.shouldFocus) ? options.focusName || `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.` : "";
  var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some((watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
  function append(data, value) {
    return [...data, ...convertToArrayPayload(value)];
  }
  var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
  function cloneObject(data) {
    let copy;
    const isArray = Array.isArray(data);
    if (data instanceof Date) {
      copy = new Date(data);
    } else if (data instanceof Set) {
      copy = new Set(data);
    } else if (!(isWeb && (data instanceof Blob || data instanceof FileList)) && (isArray || isObject(data))) {
      copy = isArray ? [] : {};
      for (const key in data) {
        if (isFunction(data[key])) {
          copy = data;
          break;
        }
        copy[key] = cloneObject(data[key]);
      }
    } else {
      return data;
    }
    return copy;
  }
  var fillEmptyArray = (value) => Array.isArray(value) ? value.map(() => void 0) : void 0;
  function insert(data, index, value) {
    return [
      ...data.slice(0, index),
      ...convertToArrayPayload(value),
      ...data.slice(index)
    ];
  }
  var moveArrayAt = (data, from, to) => {
    if (!Array.isArray(data)) {
      return [];
    }
    if (isUndefined(data[to])) {
      data[to] = void 0;
    }
    data.splice(to, 0, data.splice(from, 1)[0]);
    return data;
  };
  function prepend(data, value) {
    return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
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
  var removeArrayAt = (data, index) => isUndefined(index) ? [] : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));
  var swapArrayAt = (data, indexA, indexB) => {
    data[indexA] = [data[indexB], data[indexB] = data[indexA]][0];
  };
  function baseGet(object, updatePath) {
    const length = updatePath.slice(0, -1).length;
    let index = 0;
    while (index < length) {
      object = isUndefined(object) ? index++ : object[updatePath[index++]];
    }
    return object;
  }
  function unset(object, path3) {
    const updatePath = isKey(path3) ? [path3] : stringToPath(path3);
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
        if (currentPathsLength === index && (isObject(objectRef) && isEmptyObject(objectRef) || Array.isArray(objectRef) && !objectRef.filter((data) => !isUndefined(data)).length)) {
          previousObjRef ? delete previousObjRef[item] : delete object[item];
        }
        previousObjRef = objectRef;
      }
    }
    return object;
  }
  var updateAt = (fieldValues, index, value) => {
    fieldValues[index] = value;
    return fieldValues;
  };
  function useFieldArray(props) {
    const methods = useFormContext();
    const { control = methods.control, name, keyName = "id", shouldUnregister } = props;
    const [fields, setFields] = import_react.default.useState(control._getFieldArray(name));
    const ids = import_react.default.useRef(control._getFieldArray(name).map(generateId));
    const _fieldIds = import_react.default.useRef(fields);
    const _name = import_react.default.useRef(name);
    const _actioned = import_react.default.useRef(false);
    _name.current = name;
    _fieldIds.current = fields;
    control._names.array.add(name);
    const callback = import_react.default.useCallback(({ values, name: fieldArrayName }) => {
      if (fieldArrayName === _name.current || !fieldArrayName) {
        const fieldValues = get(values, _name.current, []);
        setFields(fieldValues);
        ids.current = fieldValues.map(generateId);
      }
    }, []);
    useSubscribe({
      callback,
      subject: control._subjects.array
    });
    const updateValues = import_react.default.useCallback((updatedFieldArrayValues) => {
      _actioned.current = true;
      control._updateFieldArray(name, updatedFieldArrayValues);
    }, [control, name]);
    const append$1 = (value, options) => {
      const appendValue = convertToArrayPayload(cloneObject(value));
      const updatedFieldArrayValues = append(control._getFieldArray(name), appendValue);
      control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
      ids.current = append(ids.current, appendValue.map(generateId));
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, append, {
        argA: fillEmptyArray(value)
      });
    };
    const prepend$1 = (value, options) => {
      const prependValue = convertToArrayPayload(cloneObject(value));
      const updatedFieldArrayValues = prepend(control._getFieldArray(name), prependValue);
      control._names.focus = getFocusFieldName(name, 0, options);
      ids.current = prepend(ids.current, prependValue.map(generateId));
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, prepend, {
        argA: fillEmptyArray(value)
      });
    };
    const remove = (index) => {
      const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
      ids.current = removeArrayAt(ids.current, index);
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
        argA: index
      });
    };
    const insert$1 = (index, value, options) => {
      const insertValue = convertToArrayPayload(cloneObject(value));
      const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
      control._names.focus = getFocusFieldName(name, index, options);
      ids.current = insert(ids.current, index, insertValue.map(generateId));
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, insert, {
        argA: index,
        argB: fillEmptyArray(value)
      });
    };
    const swap = (indexA, indexB) => {
      const updatedFieldArrayValues = control._getFieldArray(name);
      swapArrayAt(updatedFieldArrayValues, indexA, indexB);
      swapArrayAt(ids.current, indexA, indexB);
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
        argA: indexA,
        argB: indexB
      }, false);
    };
    const move = (from, to) => {
      const updatedFieldArrayValues = control._getFieldArray(name);
      moveArrayAt(updatedFieldArrayValues, from, to);
      moveArrayAt(ids.current, from, to);
      updateValues(updatedFieldArrayValues);
      setFields(updatedFieldArrayValues);
      control._updateFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
        argA: from,
        argB: to
      }, false);
    };
    const update = (index, value) => {
      const updateValue = cloneObject(value);
      const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
      ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
      updateValues(updatedFieldArrayValues);
      setFields([...updatedFieldArrayValues]);
      control._updateFieldArray(name, updatedFieldArrayValues, updateAt, {
        argA: index,
        argB: updateValue
      }, true, false);
    };
    const replace = (value) => {
      const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
      ids.current = updatedFieldArrayValues.map(generateId);
      updateValues([...updatedFieldArrayValues]);
      setFields([...updatedFieldArrayValues]);
      control._updateFieldArray(name, [...updatedFieldArrayValues], (data) => data, {}, true, false);
    };
    import_react.default.useEffect(() => {
      control._stateFlags.action = false;
      isWatched(name, control._names) && control._subjects.state.next({});
      if (_actioned.current) {
        control._executeSchema([name]).then((result) => {
          const error = get(result.errors, name);
          const existingError = get(control._formState.errors, name);
          if (existingError ? !error && existingError.type : error && error.type) {
            error ? set(control._formState.errors, name, error) : unset(control._formState.errors, name);
            control._subjects.state.next({
              errors: control._formState.errors
            });
          }
        });
      }
      control._subjects.watch.next({
        name,
        values: control._formValues
      });
      control._names.focus && focusFieldBy(control._fields, (key) => key.startsWith(control._names.focus));
      control._names.focus = "";
      control._proxyFormState.isValid && control._updateValid();
    }, [fields, name, control]);
    import_react.default.useEffect(() => {
      !get(control._formValues, name) && control._updateFieldArray(name);
      return () => {
        (control._options.shouldUnregister || shouldUnregister) && control.unregister(name);
      };
    }, [name, control, keyName, shouldUnregister]);
    return {
      swap: import_react.default.useCallback(swap, [updateValues, name, control]),
      move: import_react.default.useCallback(move, [updateValues, name, control]),
      prepend: import_react.default.useCallback(prepend$1, [updateValues, name, control]),
      append: import_react.default.useCallback(append$1, [updateValues, name, control]),
      remove: import_react.default.useCallback(remove, [updateValues, name, control]),
      insert: import_react.default.useCallback(insert$1, [updateValues, name, control]),
      update: import_react.default.useCallback(update, [updateValues, name, control]),
      replace: import_react.default.useCallback(replace, [updateValues, name, control]),
      fields: import_react.default.useMemo(() => fields.map((field, index) => ({
        ...field,
        [keyName]: ids.current[index] || generateId()
      })), [fields, keyName])
    };
  }
  function createSubject() {
    let _observers = [];
    const next = (value) => {
      for (const observer of _observers) {
        observer.next(value);
      }
    };
    const subscribe = (observer) => {
      _observers.push(observer);
      return {
        unsubscribe: () => {
          _observers = _observers.filter((o) => o !== observer);
        }
      };
    };
    const unsubscribe = () => {
      _observers = [];
    };
    return {
      get observers() {
        return _observers;
      },
      next,
      subscribe,
      unsubscribe
    };
  }
  var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
  function deepEqual(object1, object2) {
    if (isPrimitive(object1) || isPrimitive(object2)) {
      return object1 === object2;
    }
    if (isDateObject(object1) && isDateObject(object2)) {
      return object1.getTime() === object2.getTime();
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      if (!keys2.includes(key)) {
        return false;
      }
      if (key !== "ref") {
        const val2 = object2[key];
        if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual(val1, val2) : val1 !== val2) {
          return false;
        }
      }
    }
    return true;
  }
  var getValidationModes = (mode) => ({
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange,
    isOnAll: mode === VALIDATION_MODE.all,
    isOnTouch: mode === VALIDATION_MODE.onTouched
  });
  var isBoolean = (value) => typeof value === "boolean";
  var isFileInput = (element) => element.type === "file";
  var isHTMLElement = (value) => {
    const owner = value ? value.ownerDocument : 0;
    const ElementClass = owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement;
    return value instanceof ElementClass;
  };
  var isMultipleSelect = (element) => element.type === `select-multiple`;
  var isRadioInput = (element) => element.type === "radio";
  var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
  var live = (ref) => isHTMLElement(ref) && ref.isConnected;
  function markFieldsDirty(data, fields = {}) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
      for (const key in data) {
        if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
          fields[key] = Array.isArray(data[key]) ? [] : {};
          markFieldsDirty(data[key], fields[key]);
        } else if (!isNullOrUndefined(data[key])) {
          fields[key] = true;
        }
      }
    }
    return fields;
  }
  function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
      for (const key in data) {
        if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
          if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
            dirtyFieldsFromValues[key] = Array.isArray(data[key]) ? markFieldsDirty(data[key], []) : { ...markFieldsDirty(data[key]) };
          } else {
            getDirtyFieldsFromDefaultValues(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
          }
        } else {
          dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
        }
      }
    }
    return dirtyFieldsFromValues;
  }
  var getDirtyFields = (defaultValues, formValues) => getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));
  var defaultResult = {
    value: false,
    isValid: false
  };
  var validResult = { value: true, isValid: true };
  var getCheckboxValue = (options) => {
    if (Array.isArray(options)) {
      if (options.length > 1) {
        const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
        return { value: values, isValid: !!values.length };
      }
      return options[0].checked && !options[0].disabled ? options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult : defaultResult;
    }
    return defaultResult;
  };
  var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" || isNullOrUndefined(value) ? NaN : +value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
  var defaultReturn = {
    isValid: false,
    value: null
  };
  var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
    isValid: true,
    value: option.value
  } : previous, defaultReturn) : defaultReturn;
  function getFieldValue(_f) {
    const ref = _f.ref;
    if (_f.refs ? _f.refs.every((ref2) => ref2.disabled) : ref.disabled) {
      return;
    }
    if (isFileInput(ref)) {
      return ref.files;
    }
    if (isRadioInput(ref)) {
      return getRadioValue(_f.refs).value;
    }
    if (isMultipleSelect(ref)) {
      return [...ref.selectedOptions].map(({ value }) => value);
    }
    if (isCheckBoxInput(ref)) {
      return getCheckboxValue(_f.refs).value;
    }
    return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
  }
  var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
    const fields = {};
    for (const name of fieldsNames) {
      const field = get(_fields, name);
      field && set(fields, name, field._f);
    }
    return {
      criteriaMode,
      names: [...fieldsNames],
      fields,
      shouldUseNativeValidation
    };
  };
  var isRegex = (value) => value instanceof RegExp;
  var getRuleValue = (rule) => isUndefined(rule) ? void 0 : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
  var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
  function schemaErrorLookup(errors, _fields, name) {
    const error = get(errors, name);
    if (error || isKey(name)) {
      return {
        error,
        name
      };
    }
    const names = name.split(".");
    while (names.length) {
      const fieldName = names.join(".");
      const field = get(_fields, fieldName);
      const foundError = get(errors, fieldName);
      if (field && !Array.isArray(field) && name !== fieldName) {
        return { name };
      }
      if (foundError && foundError.type) {
        return {
          name: fieldName,
          error: foundError
        };
      }
      names.pop();
    }
    return {
      name
    };
  }
  var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
    if (mode.isOnAll) {
      return false;
    } else if (!isSubmitted && mode.isOnTouch) {
      return !(isTouched || isBlurEvent);
    } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
      return !isBlurEvent;
    } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
      return isBlurEvent;
    }
    return true;
  };
  var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
  var isMessage = (value) => isString(value) || import_react.default.isValidElement(value);
  function getValidateError(result, ref, type = "validate") {
    if (isMessage(result) || Array.isArray(result) && result.every(isMessage) || isBoolean(result) && !result) {
      return {
        type,
        message: isMessage(result) ? result : "",
        ref
      };
    }
  }
  var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
    value: validationData,
    message: ""
  };
  var validateField = async (field, inputValue, validateAllFieldCriteria, shouldUseNativeValidation) => {
    const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount, disabled } = field._f;
    if (!mount || disabled) {
      return {};
    }
    const inputRef = refs ? refs[0] : ref;
    const setCustomValidity = (message) => {
      if (shouldUseNativeValidation && inputRef.reportValidity) {
        inputRef.setCustomValidity(isBoolean(message) ? "" : message || " ");
        inputRef.reportValidity();
      }
    };
    const error = {};
    const isRadio = isRadioInput(ref);
    const isCheckBox = isCheckBoxInput(ref);
    const isRadioOrCheckbox2 = isRadio || isCheckBox;
    const isEmpty = (valueAsNumber || isFileInput(ref)) && !ref.value || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
      const message = exceedMax ? maxLengthMessage : minLengthMessage;
      error[name] = {
        type: exceedMax ? maxType : minType,
        message,
        ref,
        ...appendErrorsCurry(exceedMax ? maxType : minType, message)
      };
    };
    if (required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
      const { value, message } = isMessage(required) ? { value: !!required, message: required } : getValueAndMessage(required);
      if (value) {
        error[name] = {
          type: INPUT_VALIDATION_RULES.required,
          message,
          ref: inputRef,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(message);
          return error;
        }
      }
    }
    if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
      let exceedMax;
      let exceedMin;
      const maxOutput = getValueAndMessage(max);
      const minOutput = getValueAndMessage(min);
      if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
        const valueNumber = ref.valueAsNumber || +inputValue;
        if (!isNullOrUndefined(maxOutput.value)) {
          exceedMax = valueNumber > maxOutput.value;
        }
        if (!isNullOrUndefined(minOutput.value)) {
          exceedMin = valueNumber < minOutput.value;
        }
      } else {
        const valueDate = ref.valueAsDate || new Date(inputValue);
        if (isString(maxOutput.value)) {
          exceedMax = valueDate > new Date(maxOutput.value);
        }
        if (isString(minOutput.value)) {
          exceedMin = valueDate < new Date(minOutput.value);
        }
      }
      if (exceedMax || exceedMin) {
        getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
        if (!validateAllFieldCriteria) {
          setCustomValidity(error[name].message);
          return error;
        }
      }
    }
    if ((maxLength || minLength) && !isEmpty && isString(inputValue)) {
      const maxLengthOutput = getValueAndMessage(maxLength);
      const minLengthOutput = getValueAndMessage(minLength);
      const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > maxLengthOutput.value;
      const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < minLengthOutput.value;
      if (exceedMax || exceedMin) {
        getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
        if (!validateAllFieldCriteria) {
          setCustomValidity(error[name].message);
          return error;
        }
      }
    }
    if (pattern && !isEmpty && isString(inputValue)) {
      const { value: patternValue, message } = getValueAndMessage(pattern);
      if (isRegex(patternValue) && !inputValue.match(patternValue)) {
        error[name] = {
          type: INPUT_VALIDATION_RULES.pattern,
          message,
          ref,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(message);
          return error;
        }
      }
    }
    if (validate) {
      if (isFunction(validate)) {
        const result = await validate(inputValue);
        const validateError = getValidateError(result, inputRef);
        if (validateError) {
          error[name] = {
            ...validateError,
            ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
          };
          if (!validateAllFieldCriteria) {
            setCustomValidity(validateError.message);
            return error;
          }
        }
      } else if (isObject(validate)) {
        let validationResult = {};
        for (const key in validate) {
          if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
            break;
          }
          const validateError = getValidateError(await validate[key](inputValue), inputRef, key);
          if (validateError) {
            validationResult = {
              ...validateError,
              ...appendErrorsCurry(key, validateError.message)
            };
            setCustomValidity(validateError.message);
            if (validateAllFieldCriteria) {
              error[name] = validationResult;
            }
          }
        }
        if (!isEmptyObject(validationResult)) {
          error[name] = {
            ref: inputRef,
            ...validationResult
          };
          if (!validateAllFieldCriteria) {
            return error;
          }
        }
      }
    }
    setCustomValidity(true);
    return error;
  };
  var defaultOptions = {
    mode: VALIDATION_MODE.onSubmit,
    reValidateMode: VALIDATION_MODE.onChange,
    shouldFocusError: true
  };
  function createFormControl(props = {}) {
    let _options = {
      ...defaultOptions,
      ...props
    };
    let _formState = {
      isDirty: false,
      isValidating: false,
      dirtyFields: {},
      isSubmitted: false,
      submitCount: 0,
      touchedFields: {},
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
      errors: {}
    };
    let _fields = {};
    let _defaultValues = cloneObject(_options.defaultValues) || {};
    let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
    let _stateFlags = {
      action: false,
      mount: false,
      watch: false
    };
    let _names = {
      mount: /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set()
    };
    let delayErrorCallback;
    let timer = 0;
    let validateFields = {};
    const _proxyFormState = {
      isDirty: false,
      dirtyFields: false,
      touchedFields: false,
      isValidating: false,
      isValid: false,
      errors: false
    };
    const _subjects = {
      watch: createSubject(),
      array: createSubject(),
      state: createSubject()
    };
    const validationModeBeforeSubmit = getValidationModes(_options.mode);
    const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
    const debounce = (callback) => (wait) => {
      clearTimeout(timer);
      timer = window.setTimeout(callback, wait);
    };
    const _updateValid = async (shouldSkipRender) => {
      let isValid = false;
      if (_proxyFormState.isValid) {
        isValid = _options.resolver ? isEmptyObject((await _executeSchema()).errors) : await executeBuildInValidation(_fields, true);
        if (!shouldSkipRender && isValid !== _formState.isValid) {
          _formState.isValid = isValid;
          _subjects.state.next({
            isValid
          });
        }
      }
      return isValid;
    };
    const _updateFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
      if (args && method) {
        _stateFlags.action = true;
        if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
          const fieldValues = method(get(_fields, name), args.argA, args.argB);
          shouldSetValues && set(_fields, name, fieldValues);
        }
        if (_proxyFormState.errors && shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
          const errors = method(get(_formState.errors, name), args.argA, args.argB);
          shouldSetValues && set(_formState.errors, name, errors);
          unsetEmptyArray(_formState.errors, name);
        }
        if (_proxyFormState.touchedFields && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
          const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
          shouldSetValues && set(_formState.touchedFields, name, touchedFields);
        }
        if (_proxyFormState.dirtyFields) {
          _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
        }
        _subjects.state.next({
          isDirty: _getDirty(name, values),
          dirtyFields: _formState.dirtyFields,
          errors: _formState.errors,
          isValid: _formState.isValid
        });
      } else {
        set(_formValues, name, values);
      }
    };
    const updateErrors = (name, error) => {
      set(_formState.errors, name, error);
      _subjects.state.next({
        errors: _formState.errors
      });
    };
    const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
      const field = get(_fields, name);
      if (field) {
        const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
        isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
        _stateFlags.mount && _updateValid();
      }
    };
    const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
      let isFieldDirty = false;
      const output = {
        name
      };
      const isPreviousFieldTouched = get(_formState.touchedFields, name);
      if (_proxyFormState.isDirty) {
        const isPreviousFormDirty = _formState.isDirty;
        _formState.isDirty = output.isDirty = _getDirty();
        isFieldDirty = isPreviousFormDirty !== output.isDirty;
      }
      if (_proxyFormState.dirtyFields && (!isBlurEvent || shouldDirty)) {
        const isPreviousFieldDirty = get(_formState.dirtyFields, name);
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        output.dirtyFields = _formState.dirtyFields;
        isFieldDirty = isFieldDirty || isPreviousFieldDirty !== get(_formState.dirtyFields, name);
      }
      if (isBlurEvent && !isPreviousFieldTouched) {
        set(_formState.touchedFields, name, isBlurEvent);
        output.touchedFields = _formState.touchedFields;
        isFieldDirty = isFieldDirty || _proxyFormState.touchedFields && isPreviousFieldTouched !== isBlurEvent;
      }
      isFieldDirty && shouldRender && _subjects.state.next(output);
      return isFieldDirty ? output : {};
    };
    const shouldRenderByError = async (name, isValid, error, fieldState) => {
      const previousFieldError = get(_formState.errors, name);
      const shouldUpdateValid = _proxyFormState.isValid && _formState.isValid !== isValid;
      if (props.delayError && error) {
        delayErrorCallback = debounce(() => updateErrors(name, error));
        delayErrorCallback(props.delayError);
      } else {
        clearTimeout(timer);
        delayErrorCallback = null;
        error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
      if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
        const updatedFormState = {
          ...fieldState,
          ...shouldUpdateValid ? { isValid } : {},
          errors: _formState.errors,
          name
        };
        _formState = {
          ..._formState,
          ...updatedFormState
        };
        _subjects.state.next(updatedFormState);
      }
      validateFields[name]--;
      if (_proxyFormState.isValidating && !Object.values(validateFields).some((v) => v)) {
        _subjects.state.next({
          isValidating: false
        });
        validateFields = {};
      }
    };
    const _executeSchema = async (name) => _options.resolver ? await _options.resolver({ ..._formValues }, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation)) : {};
    const executeSchemaAndUpdateState = async (names) => {
      const { errors } = await _executeSchema();
      if (names) {
        for (const name of names) {
          const error = get(errors, name);
          error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
        }
      } else {
        _formState.errors = errors;
      }
      return errors;
    };
    const executeBuildInValidation = async (fields, shouldOnlyCheckValid, context = {
      valid: true
    }) => {
      for (const name in fields) {
        const field = fields[name];
        if (field) {
          const { _f: fieldReference, ...fieldValue } = field;
          if (fieldReference) {
            const fieldError = await validateField(field, get(_formValues, fieldReference.name), shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation);
            if (fieldError[fieldReference.name]) {
              context.valid = false;
              if (shouldOnlyCheckValid) {
                break;
              }
            }
            if (!shouldOnlyCheckValid) {
              fieldError[fieldReference.name] ? set(_formState.errors, fieldReference.name, fieldError[fieldReference.name]) : unset(_formState.errors, fieldReference.name);
            }
          }
          fieldValue && await executeBuildInValidation(fieldValue, shouldOnlyCheckValid, context);
        }
      }
      return context.valid;
    };
    const _removeUnmounted = () => {
      for (const name of _names.unMount) {
        const field = get(_fields, name);
        field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
      }
      _names.unMount = /* @__PURE__ */ new Set();
    };
    const _getDirty = (name, data) => (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
    const _getWatch = (names, defaultValue, isGlobal) => {
      const fieldValues = {
        ..._stateFlags.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
      };
      return generateWatchOutput(names, _names, fieldValues, isGlobal);
    };
    const _getFieldArray = (name) => compact(get(_stateFlags.mount ? _formValues : _defaultValues, name, props.shouldUnregister ? get(_defaultValues, name, []) : []));
    const setFieldValue = (name, value, options = {}) => {
      const field = get(_fields, name);
      let fieldValue = value;
      if (field) {
        const fieldReference = field._f;
        if (fieldReference) {
          !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
          fieldValue = isWeb && isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
          if (isMultipleSelect(fieldReference.ref)) {
            [...fieldReference.ref.options].forEach((selectRef) => selectRef.selected = fieldValue.includes(selectRef.value));
          } else if (fieldReference.refs) {
            if (isCheckBoxInput(fieldReference.ref)) {
              fieldReference.refs.length > 1 ? fieldReference.refs.forEach((checkboxRef) => !checkboxRef.disabled && (checkboxRef.checked = Array.isArray(fieldValue) ? !!fieldValue.find((data) => data === checkboxRef.value) : fieldValue === checkboxRef.value)) : fieldReference.refs[0] && (fieldReference.refs[0].checked = !!fieldValue);
            } else {
              fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
            }
          } else if (isFileInput(fieldReference.ref)) {
            fieldReference.ref.value = "";
          } else {
            fieldReference.ref.value = fieldValue;
            if (!fieldReference.ref.type) {
              _subjects.watch.next({
                name
              });
            }
          }
        }
      }
      (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
      options.shouldValidate && trigger(name);
    };
    const setValues = (name, value, options) => {
      for (const fieldKey in value) {
        const fieldValue = value[fieldKey];
        const fieldName = `${name}.${fieldKey}`;
        const field = get(_fields, fieldName);
        (_names.array.has(name) || !isPrimitive(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setValues(fieldName, fieldValue, options) : setFieldValue(fieldName, fieldValue, options);
      }
    };
    const setValue = (name, value, options = {}) => {
      const field = get(_fields, name);
      const isFieldArray = _names.array.has(name);
      const cloneValue = cloneObject(value);
      set(_formValues, name, cloneValue);
      if (isFieldArray) {
        _subjects.array.next({
          name,
          values: _formValues
        });
        if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields) && options.shouldDirty) {
          _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
          _subjects.state.next({
            name,
            dirtyFields: _formState.dirtyFields,
            isDirty: _getDirty(name, cloneValue)
          });
        }
      } else {
        field && !field._f && !isNullOrUndefined(cloneValue) ? setValues(name, cloneValue, options) : setFieldValue(name, cloneValue, options);
      }
      isWatched(name, _names) && _subjects.state.next({});
      _subjects.watch.next({
        name
      });
    };
    const onChange = async (event) => {
      const target = event.target;
      let name = target.name;
      const field = get(_fields, name);
      if (field) {
        let error;
        let isValid;
        const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
        const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
        const shouldSkipValidation = !hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
        const watched = isWatched(name, _names, isBlurEvent);
        set(_formValues, name, fieldValue);
        if (isBlurEvent) {
          field._f.onBlur && field._f.onBlur(event);
          delayErrorCallback && delayErrorCallback(0);
        } else if (field._f.onChange) {
          field._f.onChange(event);
        }
        const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent, false);
        const shouldRender = !isEmptyObject(fieldState) || watched;
        !isBlurEvent && _subjects.watch.next({
          name,
          type: event.type
        });
        if (shouldSkipValidation) {
          return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
        }
        !isBlurEvent && watched && _subjects.state.next({});
        validateFields[name] = validateFields[name] ? 1 : 1;
        _subjects.state.next({
          isValidating: true
        });
        if (_options.resolver) {
          const { errors } = await _executeSchema([name]);
          const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
          const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
          error = errorLookupResult.error;
          name = errorLookupResult.name;
          isValid = isEmptyObject(errors);
        } else {
          error = (await validateField(field, get(_formValues, name), shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
          isValid = await _updateValid(true);
        }
        field._f.deps && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    };
    const trigger = async (name, options = {}) => {
      let isValid;
      let validationResult;
      const fieldNames = convertToArrayPayload(name);
      _subjects.state.next({
        isValidating: true
      });
      if (_options.resolver) {
        const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
        isValid = isEmptyObject(errors);
        validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid;
      } else if (name) {
        validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
          const field = get(_fields, fieldName);
          return await executeBuildInValidation(field && field._f ? { [fieldName]: field } : field);
        }))).every(Boolean);
        !(!validationResult && !_formState.isValid) && _updateValid();
      } else {
        validationResult = isValid = await executeBuildInValidation(_fields);
      }
      _subjects.state.next({
        ...!isString(name) || _proxyFormState.isValid && isValid !== _formState.isValid ? {} : { name },
        ..._options.resolver ? { isValid } : {},
        errors: _formState.errors,
        isValidating: false
      });
      options.shouldFocus && !validationResult && focusFieldBy(_fields, (key) => get(_formState.errors, key), name ? fieldNames : _names.mount);
      return validationResult;
    };
    const getValues = (fieldNames) => {
      const values = {
        ..._defaultValues,
        ..._stateFlags.mount ? _formValues : {}
      };
      return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
    };
    const getFieldState = (name, formState) => ({
      invalid: !!get((formState || _formState).errors, name),
      isDirty: !!get((formState || _formState).dirtyFields, name),
      isTouched: !!get((formState || _formState).touchedFields, name),
      error: get((formState || _formState).errors, name)
    });
    const clearErrors = (name) => {
      name ? convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName)) : _formState.errors = {};
      _subjects.state.next({
        errors: _formState.errors
      });
    };
    const setError = (name, error, options) => {
      const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
      set(_formState.errors, name, {
        ...error,
        ref
      });
      _subjects.state.next({
        name,
        errors: _formState.errors,
        isValid: false
      });
      options && options.shouldFocus && ref && ref.focus && ref.focus();
    };
    const watch = (name, defaultValue) => isFunction(name) ? _subjects.watch.subscribe({
      next: (info) => name(_getWatch(void 0, defaultValue), info)
    }) : _getWatch(name, defaultValue, true);
    const unregister = (name, options = {}) => {
      for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
        _names.mount.delete(fieldName);
        _names.array.delete(fieldName);
        if (get(_fields, fieldName)) {
          if (!options.keepValue) {
            unset(_fields, fieldName);
            unset(_formValues, fieldName);
          }
          !options.keepError && unset(_formState.errors, fieldName);
          !options.keepDirty && unset(_formState.dirtyFields, fieldName);
          !options.keepTouched && unset(_formState.touchedFields, fieldName);
          !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
        }
      }
      _subjects.watch.next({});
      _subjects.state.next({
        ..._formState,
        ...!options.keepDirty ? {} : { isDirty: _getDirty() }
      });
      !options.keepIsValid && _updateValid();
    };
    const register = (name, options = {}) => {
      let field = get(_fields, name);
      const disabledIsDefined = isBoolean(options.disabled);
      set(_fields, name, {
        _f: {
          ...field && field._f ? field._f : { ref: { name } },
          name,
          mount: true,
          ...options
        }
      });
      _names.mount.add(name);
      field ? disabledIsDefined && set(_formValues, name, options.disabled ? void 0 : get(_formValues, name, getFieldValue(field._f))) : updateValidAndValue(name, true, options.value);
      return {
        ...disabledIsDefined ? { disabled: options.disabled } : {},
        ..._options.shouldUseNativeValidation ? {
          required: !!options.required,
          min: getRuleValue(options.min),
          max: getRuleValue(options.max),
          minLength: getRuleValue(options.minLength),
          maxLength: getRuleValue(options.maxLength),
          pattern: getRuleValue(options.pattern)
        } : {},
        name,
        onChange,
        onBlur: onChange,
        ref: (ref) => {
          if (ref) {
            register(name, options);
            field = get(_fields, name);
            const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
            const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
            const refs = field._f.refs || [];
            if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
              return;
            }
            set(_fields, name, {
              _f: {
                ...field._f,
                ...radioOrCheckbox ? {
                  refs: [
                    ...refs.filter(live),
                    fieldRef,
                    ...!!Array.isArray(get(_defaultValues, name)) ? [{}] : []
                  ],
                  ref: { type: fieldRef.type, name }
                } : { ref: fieldRef }
              }
            });
            updateValidAndValue(name, false, void 0, fieldRef);
          } else {
            field = get(_fields, name, {});
            if (field._f) {
              field._f.mount = false;
            }
            (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _stateFlags.action) && _names.unMount.add(name);
          }
        }
      };
    };
    const handleSubmit = (onValid, onInvalid) => async (e2) => {
      if (e2) {
        e2.preventDefault && e2.preventDefault();
        e2.persist && e2.persist();
      }
      let hasNoPromiseError = true;
      let fieldValues = cloneObject(_formValues);
      _subjects.state.next({
        isSubmitting: true
      });
      try {
        if (_options.resolver) {
          const { errors, values } = await _executeSchema();
          _formState.errors = errors;
          fieldValues = values;
        } else {
          await executeBuildInValidation(_fields);
        }
        if (isEmptyObject(_formState.errors)) {
          _subjects.state.next({
            errors: {},
            isSubmitting: true
          });
          await onValid(fieldValues, e2);
        } else {
          if (onInvalid) {
            await onInvalid({ ..._formState.errors }, e2);
          }
          _options.shouldFocusError && focusFieldBy(_fields, (key) => get(_formState.errors, key), _names.mount);
        }
      } catch (err) {
        hasNoPromiseError = false;
        throw err;
      } finally {
        _formState.isSubmitted = true;
        _subjects.state.next({
          isSubmitted: true,
          isSubmitting: false,
          isSubmitSuccessful: isEmptyObject(_formState.errors) && hasNoPromiseError,
          submitCount: _formState.submitCount + 1,
          errors: _formState.errors
        });
      }
    };
    const resetField = (name, options = {}) => {
      if (get(_fields, name)) {
        if (isUndefined(options.defaultValue)) {
          setValue(name, get(_defaultValues, name));
        } else {
          setValue(name, options.defaultValue);
          set(_defaultValues, name, options.defaultValue);
        }
        if (!options.keepTouched) {
          unset(_formState.touchedFields, name);
        }
        if (!options.keepDirty) {
          unset(_formState.dirtyFields, name);
          _formState.isDirty = options.defaultValue ? _getDirty(name, get(_defaultValues, name)) : _getDirty();
        }
        if (!options.keepError) {
          unset(_formState.errors, name);
          _proxyFormState.isValid && _updateValid();
        }
        _subjects.state.next({ ..._formState });
      }
    };
    const reset = (formValues, keepStateOptions = {}) => {
      const updatedValues = formValues || _defaultValues;
      const cloneUpdatedValues = cloneObject(updatedValues);
      const values = formValues && !isEmptyObject(formValues) ? cloneUpdatedValues : _defaultValues;
      if (!keepStateOptions.keepDefaultValues) {
        _defaultValues = updatedValues;
      }
      if (!keepStateOptions.keepValues) {
        if (keepStateOptions.keepDirtyValues) {
          for (const fieldName of _names.mount) {
            get(_formState.dirtyFields, fieldName) ? set(values, fieldName, get(_formValues, fieldName)) : setValue(fieldName, get(values, fieldName));
          }
        } else {
          if (isWeb && isUndefined(formValues)) {
            for (const name of _names.mount) {
              const field = get(_fields, name);
              if (field && field._f) {
                const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
                try {
                  isHTMLElement(fieldReference) && fieldReference.closest("form").reset();
                  break;
                } catch (_a) {
                }
              }
            }
          }
          _fields = {};
        }
        _formValues = props.shouldUnregister ? keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {} : cloneUpdatedValues;
        _subjects.array.next({
          values
        });
        _subjects.watch.next({
          values
        });
      }
      _names = {
        mount: /* @__PURE__ */ new Set(),
        unMount: /* @__PURE__ */ new Set(),
        array: /* @__PURE__ */ new Set(),
        watch: /* @__PURE__ */ new Set(),
        watchAll: false,
        focus: ""
      };
      _stateFlags.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid;
      _stateFlags.watch = !!props.shouldUnregister;
      _subjects.state.next({
        submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
        isDirty: keepStateOptions.keepDirty || keepStateOptions.keepDirtyValues ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
        isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
        dirtyFields: keepStateOptions.keepDirty || keepStateOptions.keepDirtyValues ? _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : {},
        touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
        errors: keepStateOptions.keepErrors ? _formState.errors : {},
        isSubmitting: false,
        isSubmitSuccessful: false
      });
    };
    const setFocus = (name, options = {}) => {
      const field = get(_fields, name)._f;
      const fieldRef = field.refs ? field.refs[0] : field.ref;
      options.shouldSelect ? fieldRef.select() : fieldRef.focus();
    };
    return {
      control: {
        register,
        unregister,
        getFieldState,
        _executeSchema,
        _getWatch,
        _getDirty,
        _updateValid,
        _removeUnmounted,
        _updateFieldArray,
        _getFieldArray,
        _subjects,
        _proxyFormState,
        get _fields() {
          return _fields;
        },
        get _formValues() {
          return _formValues;
        },
        get _stateFlags() {
          return _stateFlags;
        },
        set _stateFlags(value) {
          _stateFlags = value;
        },
        get _defaultValues() {
          return _defaultValues;
        },
        get _names() {
          return _names;
        },
        set _names(value) {
          _names = value;
        },
        get _formState() {
          return _formState;
        },
        set _formState(value) {
          _formState = value;
        },
        get _options() {
          return _options;
        },
        set _options(value) {
          _options = {
            ..._options,
            ...value
          };
        }
      },
      trigger,
      register,
      handleSubmit,
      watch,
      setValue,
      getValues,
      reset,
      resetField,
      clearErrors,
      unregister,
      setError,
      setFocus,
      getFieldState
    };
  }
  function useForm(props = {}) {
    const _formControl = import_react.default.useRef();
    const [formState, updateFormState] = import_react.default.useState({
      isDirty: false,
      isValidating: false,
      dirtyFields: {},
      isSubmitted: false,
      submitCount: 0,
      touchedFields: {},
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
      errors: {}
    });
    if (_formControl.current) {
      _formControl.current.control._options = props;
    } else {
      _formControl.current = {
        ...createFormControl(props),
        formState
      };
    }
    const control = _formControl.current.control;
    const callback = import_react.default.useCallback((value) => {
      if (shouldRenderFormState(value, control._proxyFormState, true)) {
        control._formState = {
          ...control._formState,
          ...value
        };
        updateFormState({ ...control._formState });
      }
    }, [control]);
    useSubscribe({
      subject: control._subjects.state,
      callback
    });
    import_react.default.useEffect(() => {
      if (!control._stateFlags.mount) {
        control._proxyFormState.isValid && control._updateValid();
        control._stateFlags.mount = true;
      }
      if (control._stateFlags.watch) {
        control._stateFlags.watch = false;
        control._subjects.state.next({});
      }
      control._removeUnmounted();
    });
    _formControl.current.formState = getProxyFormState(formState, control._proxyFormState);
    return _formControl.current;
  }

  // node_modules/@hookform/error-message/dist/index.esm.js
  var e = __toESM(require_react());
  var s = function(s2) {
    var t = s2.as, a = s2.errors, m = s2.name, o = s2.message, i = s2.render, l = function(e2, r) {
      if (e2 == null)
        return {};
      var n, s3, t2 = {}, a2 = Object.keys(e2);
      for (s3 = 0; s3 < a2.length; s3++)
        r.indexOf(n = a2[s3]) >= 0 || (t2[n] = e2[n]);
      return t2;
    }(s2, ["as", "errors", "name", "message", "render"]), f = useFormContext(), c = get(a || f.formState.errors, m);
    if (!c)
      return null;
    var g = c.message, u = c.types, d = Object.assign({}, l, { children: g || o });
    return e.isValidElement(t) ? e.cloneElement(t, d) : i ? i({ message: g || o, messages: u }) : e.createElement(t || e.Fragment, d);
  };

  // src/components.ts
  var import_react_dom_factories = __toESM(require_react_dom_factories(), 1);

  // src/utils.ts
  var utils_exports = {};
  __export(utils_exports, {
    displayComponent: () => displayComponent,
    fetchJSON: () => fetchJSON,
    getAdvancedBinding: () => getAdvancedBinding,
    getSimplifiedJSONX: () => getSimplifiedJSONX,
    simpleJSONXSyntax: () => simpleJSONXSyntax,
    traverse: () => traverse,
    validSimpleJSONXSyntax: () => validSimpleJSONXSyntax,
    validateJSONX: () => validateJSONX
  });
  var import_ua_parser_js = __toESM(require_ua_parser(), 1);
  var global2 = typeof global2 !== "undefined" ? global2 : typeof globalThis !== "undefined" ? globalThis : {};
  function displayComponent(options = {}) {
    const { jsonx = {}, props } = options;
    const propsToCompare = jsonx.comparisonprops;
    const comparisons = Array.isArray(propsToCompare) ? propsToCompare.map((comp) => {
      const compares = {};
      if (Array.isArray(comp.left)) {
        compares.left = comp.left;
      }
      if (Array.isArray(comp.right)) {
        compares.right = comp.right;
      }
      const propcompares = traverse(compares, props || jsonx.props);
      const opscompares = Object.assign({}, comp, propcompares);
      switch (opscompares.operation) {
        case "eq":
        case "==":
          return opscompares.left == opscompares.right;
        case "dneq":
        case "!=":
        case "!":
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
          return opscompares.left === void 0 || opscompares.left === null;
        case "!null":
        case "!undefined":
        case "exists":
        default:
          return opscompares.left !== void 0 && opscompares.left !== null;
      }
    }) : [];
    const validProps = comparisons.filter((comp) => comp === true);
    if (!jsonx.comparisonprops) {
      return true;
    } else if (jsonx.comparisonorprops && validProps.length < 1) {
      return false;
    } else if (validProps.length !== comparisons.length && !jsonx.comparisonorprops) {
      return false;
    } else {
      return true;
    }
  }
  function getAdvancedBinding() {
    var window2 = window2;
    if (typeof window2 === "undefined") {
      if (this && this.window) {
        window2 = this.window;
      } else if (typeof global2 !== "undefined" && global2.window) {
        window2 = global2.window;
      } else if (typeof globalThis !== "undefined" && globalThis.window) {
        window2 = globalThis.window;
      }
      if (!window2 || !window2.navigator)
        return false;
    }
    try {
      if (window2 && window2.navigator && window2.navigator.userAgent && typeof window2.navigator.userAgent === "string") {
        if (window2.navigator.userAgent.indexOf("Trident") !== -1) {
          return false;
        }
        const uastring = window2.navigator.userAgent;
        const parser = new import_ua_parser_js.default();
        parser.setUA(uastring);
        const parseUserAgent = parser.getResult();
        if ((parseUserAgent.browser.name === "Chrome" || parseUserAgent.browser.name === "Chrome WebView") && parseUserAgent.os.name === "Android" && parseInt(parseUserAgent.browser.version, 10) < 50) {
          return false;
        }
        if (parseUserAgent.browser.name === "Android Browser") {
          return false;
        }
      }
    } catch (e2) {
      e2;
      console.error(e2);
      return false;
    }
    return true;
  }
  function traverse(paths = {}, data = {}) {
    let keys = Object.keys(paths);
    if (!keys.length)
      return paths;
    return keys.reduce((result, key) => {
      if (typeof paths[key] === "string")
        result[key] = data[paths[key]];
      else if (Array.isArray(paths[key])) {
        let _path = Object.assign([], paths[key]);
        let value = data;
        while (_path.length && value && typeof value === "object") {
          let prop = _path.shift();
          value = value[prop];
        }
        result[key] = _path.length ? void 0 : value;
      } else
        throw new TypeError("dynamic property paths must be a string or an array of strings or numeric indexes");
      return result;
    }, {});
  }
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
        errors.push(TypeError("[0002] " + jsonx.component + ": props must be an Object / valid React props"));
      }
      if (jsonx.props.children && (typeof jsonx.props.children !== "string" || !Array.isArray(jsonx.props.children))) {
        errors.push(TypeError("[0003] " + jsonx.component + ": props.children must be an array of JSONX JSON objects or a string"));
      }
      if (jsonx.props._children && (typeof jsonx.props._children !== "string" || !Array.isArray(jsonx.props._children))) {
        errors.push(TypeError("[0004] " + jsonx.component + ": props._children must be an array of JSONX JSON objects or a string"));
      }
    }
    if (jsonx.children) {
      if (typeof jsonx.children !== "string" && !Array.isArray(jsonx.children)) {
        errors.push(TypeError("[0005] " + jsonx.component + ": children must be an array of JSONX JSON objects or a string"));
      }
      if (Array.isArray(jsonx.children)) {
        const childrenErrors = jsonx.children.filter((c) => typeof c === "object").map((c) => validateJSONX(c, returnAllErrors));
        errors = errors.concat(...childrenErrors);
      }
    }
    dynamicPropsNames.forEach((dynamicprop) => {
      const jsonxDynamicProps = jsonx[dynamicprop];
      if (jsonxDynamicProps) {
        if (typeof jsonxDynamicProps !== "object") {
          errors.push(TypeError(`[0006] ${dynamicprop} must be an object`));
        }
        Object.keys(jsonxDynamicProps).forEach((resolvedDynamicProp) => {
          if (!Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
            errors.push(TypeError(`[0007] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
          }
          if (Array.isArray(jsonxDynamicProps[resolvedDynamicProp])) {
            const allStringArray = jsonxDynamicProps[resolvedDynamicProp].filter((propArrayItem) => typeof propArrayItem === "string");
            if (allStringArray.length !== jsonxDynamicProps[resolvedDynamicProp].length) {
              errors.push(TypeError(`[0008] jsonx.${dynamicprop}.${resolvedDynamicProp} must be an array of strings`));
            }
          }
        });
      }
    });
    const evalProps = jsonx.__dangerouslyEvalProps;
    const boundEvalProps = jsonx.__dangerouslyBindEvalProps;
    if (evalProps || boundEvalProps) {
      if (evalProps && typeof evalProps !== "object" || boundEvalProps && typeof boundEvalProps !== "object") {
        errors.push(TypeError("[0009] __dangerouslyEvalProps must be an object of strings to convert to valid javascript"));
      }
      evalPropNames.filter((evalProp) => jsonx[evalProp]).forEach((eProps) => {
        const evProp = jsonx[eProps];
        const scopedEval3 = eval;
        Object.keys(evProp).forEach((propToEval) => {
          if (typeof evProp[propToEval] !== "string") {
            errors.push(TypeError(`[0010] jsonx.${eProps}.${evProp} must be a string`));
          }
          try {
            if (eProps === "__dangerouslyBindEvalProps") {
              const funcToBind = scopedEval3(`(${evProp[propToEval]})`);
              funcToBind.call({ bounded: true });
            } else {
              scopedEval3(evProp[propToEval]);
            }
          } catch (e2) {
            errors.push(e2);
          }
        });
      });
    }
    if (jsonx.__dangerouslyInsertComponents) {
      Object.keys(jsonx.__dangerouslyInsertComponents).forEach((insertedComponents) => {
        try {
          if (jsonx.__dangerouslyInsertComponents)
            validateJSONX(jsonx.__dangerouslyInsertComponents[insertedComponents]);
        } catch (e2) {
          errors.push(TypeError(`[0011] jsonx.__dangerouslyInsertComponents.${insertedComponents} must be a valid JSONX JSON Object: ${e2 == null ? void 0 : e2.toString()}`));
        }
      });
    }
    if (jsonx.__functionProps) {
      if (typeof jsonx.__functionProps !== "object") {
        errors.push(TypeError("[0012] jsonx.__functionProps  must be an object"));
      } else {
        Object.keys(jsonx.__functionProps).forEach((fProp) => {
          if (jsonx.__functionProps && jsonx.__functionProps[fProp] && (typeof jsonx.__functionProps[fProp] !== "string" || jsonx.__functionProps[fProp].indexOf("func:") === -1)) {
            errors.push(ReferenceError(`[0013] jsonx.__functionProps.${fProp} must reference a function (i.e. func:this.props.logoutUser())`));
          }
        });
      }
    }
    if (jsonx.__windowComponentProps && (typeof jsonx.__windowComponentProps !== "object" || Array.isArray(jsonx.__windowComponentProps))) {
      errors.push(TypeError("[0013] jsonx.__windowComponentProps  must be an object"));
    }
    if (jsonx.__windowComponents) {
      if (typeof jsonx.__windowComponents !== "object") {
        errors.push(TypeError("[0014] jsonx.__windowComponents must be an object"));
      }
      Object.keys(jsonx.__windowComponents).forEach((cProp) => {
        if (typeof jsonx.__windowComponents[cProp] !== "string" || jsonx.__windowComponents[cProp].indexOf("func:") === -1) {
          errors.push(ReferenceError(`[0015] jsonx.__windowComponents.${cProp} must reference a window element on window.__jsonx_custom_elements (i.e. func:window.__jsonx_custom_elements.bootstrapModal)`));
        }
      });
    }
    if (typeof jsonx.comparisonorprops !== "undefined" && typeof jsonx.comparisonorprops !== "boolean") {
      errors.push(TypeError("[0016] jsonx.comparisonorprops  must be boolean"));
    }
    if (jsonx.comparisonprops) {
      if (!Array.isArray(jsonx.comparisonprops)) {
        errors.push(TypeError("[0017] jsonx.comparisonprops  must be an array or comparisons"));
      } else {
        jsonx.comparisonprops.forEach((c) => {
          if (typeof c !== "object") {
            errors.push(TypeError("[0018] jsonx.comparisonprops  must be an array or comparisons objects"));
          } else if (typeof c.left === "undefined") {
            errors.push(TypeError("[0019] jsonx.comparisonprops  must be have a left comparison value"));
          }
        });
      }
    }
    if (typeof jsonx.passprops !== "undefined" && typeof jsonx.passprops !== "boolean") {
      errors.push(TypeError("[0020] jsonx.passprops  must be boolean"));
    }
    const invalidKeys = Object.keys(jsonx).filter((key) => validKeys.indexOf(key) === -1);
    if (errors.length) {
      if (returnAllErrors)
        return errors;
      throw errors[0];
    }
    return invalidKeys.length ? `Warning: Invalid Keys [${invalidKeys.join()}]` : true;
  }
  function validSimpleJSONXSyntax(simpleJSONX = {}) {
    if (Object.keys(simpleJSONX).length !== 1 && !simpleJSONX.component) {
      return false;
    } else {
      const componentName = Object.keys(simpleJSONX)[0];
      return Object.keys(simpleJSONX).length === 1 && !simpleJSONX[componentName].component && (typeof simpleJSONX[componentName] === "object" || typeof simpleJSONX[componentName] === "string") ? true : false;
    }
  }
  function simpleJSONXSyntax(simpleJSONX = {}) {
    if (simpleJSONX.component)
      return simpleJSONX;
    const component = Object.keys(simpleJSONX)[0];
    try {
      const children = typeof simpleJSONX[component] === "string" || Array.isArray(simpleJSONX[component]) ? simpleJSONX[component] : simpleJSONX[component] && simpleJSONX[component].children && Array.isArray(simpleJSONX[component].children) ? simpleJSONX[component].children.map(simpleJSONXSyntax) : simpleJSONX[component].children;
      const jsonxprops = typeof simpleJSONX[component] === "object" ? simpleJSONX[component] : void 0;
      const jsonx = { component, ...jsonxprops, children };
      return jsonx;
    } catch (e2) {
      throw SyntaxError("Invalid Simple JSONX Syntax");
    }
  }
  function getSimplifiedJSONX(jsonx = {}) {
    try {
      if (!jsonx.component)
        return jsonx;
      const componentName = jsonx.component;
      jsonx.children = Array.isArray(jsonx.children) ? jsonx.children.filter((child) => child).map(getSimplifiedJSONX) : jsonx.children;
      delete jsonx.component;
      return {
        [componentName]: jsonx
      };
    } catch (e2) {
      throw e2;
    }
  }
  async function fetchJSON(path3 = "", options = {}) {
    try {
      const response = await fetch(path3, options);
      return await response.json();
    } catch (e2) {
      throw e2;
    }
  }

  // src/components.ts
  var import_create_react_class = __toESM(require_create_react_class(), 1);
  var cache = new memoryCache.Cache();
  var ReactHookForm = { ErrorMessage: s, Controller };
  var generatedCustomComponents = /* @__PURE__ */ new Map();
  var advancedBinding = getAdvancedBinding();
  var componentMap = Object.assign({ Fragment: import_react2.Fragment, Suspense: import_react2.Suspense }, import_react_dom_factories.default, typeof window === "object" && window ? window.__jsonx_custom_elements : {});
  function getBoundedComponents(options = {}) {
    const { reactComponents, boundedComponents = [] } = options;
    if (typeof options.advancedBinding === "boolean" && options.advancedBinding || typeof options.advancedBinding === "undefined" && advancedBinding) {
      return Object.assign({}, reactComponents, boundedComponents.reduce((result, componentName) => {
        result[componentName] = reactComponents[componentName].bind(this);
        return result;
      }, {}));
    } else
      return reactComponents;
  }
  function getComponentFromLibrary(options = { jsonx: {} }) {
    const { componentLibraries = {}, jsonx = {} } = options;
    const libComponent = Object.keys(componentLibraries).map((libraryName) => {
      const cleanLibraryName = jsonx.component.replace(`${libraryName}.`, "");
      const libraryNameArray = cleanLibraryName.split(".");
      if (libraryNameArray.length === 2 && componentLibraries[libraryName] && componentLibraries[libraryName][libraryNameArray[0]] && typeof componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]] !== "undefined") {
        return componentLibraries[libraryName][libraryNameArray[0]][libraryNameArray[1]];
      } else if (typeof componentLibraries[libraryName][cleanLibraryName] !== "undefined") {
        return componentLibraries[libraryName][cleanLibraryName];
      }
    }).filter((val) => val)[0];
    return libComponent;
  }
  function getComponentFromMap(options = {}) {
    const {
      jsonx = {},
      reactComponents = {},
      componentLibraries = {},
      logError = console.error,
      debug
    } = options;
    try {
      if (typeof jsonx.component !== "string" && typeof jsonx.component === "function") {
        return jsonx.component;
      } else if (jsonx.component && import_react_dom_factories.default[jsonx.component]) {
        return jsonx.component;
      } else if (reactComponents[jsonx.component]) {
        return reactComponents[jsonx.component];
      } else if (typeof jsonx.component === "string" && jsonx.component.indexOf(".") > 0 && getComponentFromLibrary({ jsonx, componentLibraries })) {
        return getComponentFromLibrary({ jsonx, componentLibraries });
      } else {
        throw new ReferenceError(`Invalid React Component (${jsonx.component})`);
      }
    } catch (e2) {
      if (debug)
        logError(e2, e2.stack ? e2.stack : "no stack");
      throw e2;
    }
  }
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
  function getReactClassComponent(reactComponent = {}, options = {}) {
    if (options.lazy) {
      return (0, import_react2.lazy)(() => options.lazy(reactComponent, Object.assign({}, options, { lazy: false })).then((lazyComponent) => {
        return {
          default: getReactClassComponent(...lazyComponent)
        };
      }));
    }
    const context = this || {};
    const {
      returnFactory = true,
      resources = {},
      use_getState = true,
      bindContext = true,
      disableRenderIndexKey = true
    } = options;
    const rjc = {
      getDefaultProps: {
        body: "return {};"
      },
      getInitialState: {
        body: "return {};"
      },
      componentDidMount: void 0,
      UNSAFE_componentWillMount: void 0,
      shouldComponentUpdate: void 0,
      getSnapshotBeforeUpdate: void 0,
      componentDidUpdate: void 0,
      UNSAFE_componentWillUpdate: void 0,
      UNSAFE_componentWillReceiveProps: void 0,
      componentWillUnmount: void 0,
      ...reactComponent
    };
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
      if (args && !Array.isArray(args) && args.length && args.length && args.filter((arg) => typeof arg === "string").length) {
        throw new TypeError(`Function(${val}) arguments must be an array or variable names`);
      }
      if (val === "render") {
        result[val] = function() {
          if (options.passprops && this && this.props)
            body.props = Object.assign({}, body.props, this.props);
          if (options.passstate && this.state)
            body.props = Object.assign({}, body.props, this.state);
          return getReactElementFromJSONX.call(Object.assign({}, context, bindContext ? this : { props: {} }, { disableRenderIndexKey }, {
            props: use_getState && this && this.props ? Object.assign({}, this.props, {
              getState: () => this.state
            }) : this.props
          }), body, resources);
        };
      } else {
        result[val] = typeof body === "function" ? body : getFunctionFromEval({
          body,
          args
        });
      }
      return result;
    }, {});
    const reactComponentClass = (0, import_create_react_class.default)(classOptions);
    if (options.name) {
      Object.defineProperty(reactComponentClass, "name", {
        value: options.name
      });
    }
    const reactClass = returnFactory ? import_react2.default.createFactory(reactComponentClass) : reactComponentClass;
    return reactClass;
  }
  function FormComponent(props = {}) {
    function FormComponentFunction(componentProps) {
      const {
        hookFormOptions = {},
        onSubmit,
        formWrapperComponent,
        formKey,
        formWrapperProps
      } = props;
      const formComponent = {
        component: "div",
        children: "empty form",
        ...props.formComponent
      };
      formComponent.props = { ...formComponent.props, ...componentProps };
      const reactHookForm = useForm(hookFormOptions);
      const context = {
        ...this || {},
        ...{ reactHookForm }
      };
      if (!context.componentLibraries || !context.componentLibraries.ReactHookForm) {
        context.componentLibraries = {
          ...context.componentLibraries,
          ...{
            ReactHookForm: {
              Controller,
              ErrorMessage: s
            }
          }
        };
      }
      const formWrapperJXM = formWrapperComponent || {
        component: "form",
        props: {
          onSubmit: onSubmit ? reactHookForm.handleSubmit(onSubmit) : void 0,
          key: formKey ? `formWrapperJXM-${formKey}` : void 0,
          ...formWrapperProps
        }
      };
      formWrapperJXM.children = Array.isArray(formComponent) ? formComponent : [formComponent];
      const renderJSONX = (0, import_react2.useMemo)(() => getReactElementFromJSONX.bind(context), [
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
  function DynamicComponent(props = {}) {
    function DynamicComponentFunction(componentProps) {
      const {
        useCache = true,
        cacheTimeout = 60 * 60 * 5,
        loadingJSONX = { component: "div", children: "...Loading" },
        loadingErrorJSONX = {
          component: "div",
          children: [
            { component: "span", children: "Error: " },
            {
              component: "span",
              resourceprops: { _children: ["error", "message"] }
            }
          ]
        },
        cacheTimeoutFunction = () => {
        },
        transformFunction = (data) => data,
        fetchURL,
        fetchOptions,
        fetchFunction
      } = props;
      const jsonx = {
        ...props.jsonx
      };
      jsonx.props = { ...jsonx.props, ...componentProps };
      const context = this || {};
      const [state, setState] = (0, import_react2.useState)({
        hasLoaded: false,
        hasError: false,
        resources: {},
        error: void 0
      });
      const transformer = (0, import_react2.useMemo)(() => getFunctionFromEval(transformFunction), [
        transformFunction
      ]);
      const timeoutFunction = (0, import_react2.useMemo)(() => getFunctionFromEval(cacheTimeoutFunction), [cacheTimeoutFunction]);
      const renderJSONX = (0, import_react2.useMemo)(() => getReactElementFromJSONX.bind(context), [
        context
      ]);
      const loadingComponent = (0, import_react2.useMemo)(() => renderJSONX(loadingJSONX), [
        loadingJSONX
      ]);
      const loadingError = (0, import_react2.useMemo)(() => renderJSONX(loadingErrorJSONX, { error: state.error }), [loadingErrorJSONX, state.error]);
      (0, import_react2.useEffect)(() => {
        async function getData() {
          try {
            let transformedData;
            if (useCache && cache.get(fetchURL)) {
              transformedData = cache.get(fetchURL);
            } else {
              let fetchedData;
              if (fetchFunction) {
                fetchedData = await fetchFunction(fetchURL, fetchOptions);
              } else
                fetchedData = await fetchJSON(fetchURL, fetchOptions);
              transformedData = await transformer(fetchedData);
              if (useCache)
                cache.put(fetchURL, transformedData, cacheTimeout, timeoutFunction);
            }
            setState((prevState) => Object.assign({}, prevState, {
              hasLoaded: true,
              hasError: false,
              resources: { DynamicComponentData: transformedData }
            }));
          } catch (e2) {
            if (context.debug)
              console.warn(e2);
            setState({ hasError: true, error: e2 });
          }
        }
        if (fetchURL)
          getData();
      }, [fetchURL, fetchOptions]);
      if (!fetchURL)
        return null;
      else if (state.hasError) {
        return loadingError;
      } else if (state.hasLoaded === false) {
        return loadingComponent;
      } else
        return renderJSONX(jsonx, state.resources);
    }
    if (props.name) {
      Object.defineProperty(DynamicComponentFunction, "name", {
        value: props.name
      });
    }
    return DynamicComponentFunction.bind(this);
  }
  function getReactFunctionComponent(reactComponent = {}, functionBody = "", options = {}) {
    if (options.lazy) {
      return (0, import_react2.lazy)(() => options.lazy(reactComponent, functionBody, Object.assign({}, options, { lazy: false })).then((lazyComponent) => {
        return {
          default: getReactFunctionComponent(...lazyComponent)
        };
      }));
    }
    if (typeof options === "undefined" || typeof options.bind === "undefined")
      options.bind = true;
    const { resources = {}, args = [] } = options;
    const props = Object.assign({}, reactComponent.props);
    const functionArgs = [
      import_react2.default,
      import_react2.useState,
      import_react2.useEffect,
      import_react2.useContext,
      import_react2.useReducer,
      import_react2.useCallback,
      import_react2.useMemo,
      import_react2.useRef,
      import_react2.useImperativeHandle,
      import_react2.useLayoutEffect,
      import_react2.useDebugValue,
      getReactElementFromJSONX,
      reactComponent,
      resources,
      props,
      useForm,
      useController,
      useFieldArray,
      useWatch
    ];
    if (typeof functionBody === "function")
      functionBody = functionBody.toString();
    const functionComponent = Function("React", "useState", "useEffect", "useContext", "useReducer", "useCallback", "useMemo", "useRef", "useImperativeHandle", "useLayoutEffect", "useDebugValue", "getReactElementFromJSONX", "reactComponent", "resources", "props", "useForm", "useController", "useFieldArray", "useWatch", `
    'use strict';
    const self = this || {};

    return function ${options.name || "Anonymous"}(props){
      try {
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

      } catch(e){
        if(self.debug) return e.toString()
        else throw e
      }
    }
  `);
    if (options.name) {
      Object.defineProperty(functionComponent, "name", {
        value: options.name
      });
    }
    return options.bind ? functionComponent.call(this, ...functionArgs) : functionComponent(...functionArgs);
  }
  function getFunctionBody(func) {
    const functionString = func.toString();
    if (functionString.includes("return") === false)
      throw new EvalError("JSONX Function Components can not use implicit returns");
    return functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
  }
  function makeFunctionComponent(func, options) {
    const scopedEval3 = eval;
    const fullFunctionBody = getFunctionBody(func);
    const [functionBody] = fullFunctionBody.split("return");
    let reactComponentString = fullFunctionBody.replace(functionBody, "").trim();
    const reactComponent = scopedEval3(`(()=>{${reactComponentString}})()`);
    const functionOptions = { name: func.name, ...options };
    return getReactFunctionComponent.call(this, reactComponent, functionBody, functionOptions);
  }
  function getReactContext(options = {}) {
    return (0, import_react2.createContext)(options.value);
  }
  function getCustomFunctionComponent(customComponent) {
    const { options, functionBody, functionComponent, jsonxComponent } = customComponent;
    if (functionComponent) {
      return makeFunctionComponent.call(this, functionComponent, options);
    } else {
      return getReactFunctionComponent.call(this, jsonxComponent, functionBody, options);
    }
  }
  function getCustomComponentsCacheKey(customComponents) {
    return customComponents.map(({ name }) => name).join("");
  }
  function getReactLibrariesAndComponents(customComponents) {
    const customComponentsCacheKey = getCustomComponentsCacheKey(customComponents);
    if (generatedCustomComponents.has(customComponentsCacheKey))
      return generatedCustomComponents.get(customComponentsCacheKey);
    const cxt = {
      componentLibraries: {},
      reactComponents: {},
      ...this
    };
    const customComponentLibraries = {};
    const customReactComponents = {};
    if (customComponents && customComponents.length) {
      customComponents.forEach((customComponent) => {
        const { type, name, jsonx, options, functionBody, functionComponent, jsonxComponent } = customComponent;
        if (type === "library") {
          if (jsonx) {
            customComponentLibraries[name] = Object.keys(jsonx).reduce((result, prop) => {
              const libraryComponent = jsonx[prop];
              const {
                type: type2,
                name: name2,
                jsonxComponent: jsonxComponent2,
                options: options2,
                functionBody: functionBody2
              } = libraryComponent;
              if (type2 === "component") {
                result[name2] = getReactClassComponent.call(this, jsonxComponent2, options2);
              } else {
                result[name2] = getCustomFunctionComponent.call(this, { options: options2, functionBody: functionBody2, functionComponent, jsonxComponent: jsonxComponent2 });
              }
              return result;
            }, {});
          } else
            customComponentLibraries[name] = window[name];
          cxt.componentLibraries[name] = customComponentLibraries[name];
        } else if (type === "component") {
          if (jsonx) {
            customReactComponents[name] = getReactClassComponent.call(this, jsonx, options);
          } else
            customReactComponents[name] = window[name];
          cxt.reactComponents[name] = customReactComponents[name];
        } else if (type === "function") {
          if (functionComponent || functionBody) {
            customReactComponents[name] = getCustomFunctionComponent.call(this, { options, functionBody, functionComponent, jsonxComponent: jsonx });
          } else
            customReactComponents[name] = window[name];
          cxt.reactComponents[name] = customReactComponents[name];
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

  // src/props.ts
  var props_exports = {};
  __export(props_exports, {
    ARGUMENT_NAMES: () => ARGUMENT_NAMES,
    STRIP_COMMENTS: () => STRIP_COMMENTS,
    boundArgsReducer: () => boundArgsReducer,
    getChildrenComponents: () => getChildrenComponents,
    getComponentProps: () => getComponentProps,
    getComputedProps: () => getComputedProps,
    getEvalProps: () => getEvalProps,
    getFunctionFromProps: () => getFunctionFromProps,
    getFunctionProps: () => getFunctionProps,
    getJSONXProps: () => getJSONXProps,
    getParamNames: () => getParamNames,
    getReactComponentProps: () => getReactComponentProps,
    getReactComponents: () => getReactComponents,
    getWindowComponents: () => getWindowComponents,
    useFormRegisterHandler: () => useFormRegisterHandler
  });
  var import_react3 = __toESM(require_react(), 1);
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  var ARGUMENT_NAMES = /([^\s,]+)/g;
  function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
    var result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
    if (result === null) {
      result = [];
    }
    return result;
  }
  function getJSONXProps(options = {}) {
    let { jsonx = {}, propName = "asyncprops", traverseObject = {} } = options;
    return jsonx[propName] && typeof jsonx[propName] === "object" ? traverse(jsonx[propName], traverseObject) : {};
  }
  function getChildrenComponents(options = {}) {
    const { allProps = {}, jsonx = {} } = options;
    if (Array.isArray(allProps.__spread) === false) {
      if (this && this.debug || jsonx.debug) {
        return {
          children: new Error("Using __spreadComponent requires an array prop '__spread'").toString()
        };
      } else {
        return { children: void 0 };
      }
    } else {
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
  function useFormRegisterHandler(options = {}) {
    var _a, _b;
    return this.reactHookForm.register((_b = (_a = options == null ? void 0 : options.jsonx) == null ? void 0 : _a.props) == null ? void 0 : _b.name);
  }
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
  function getEvalProps(options = { jsonx: {} }) {
    const { jsonx } = options;
    const scopedEval3 = eval;
    let evAllProps = {};
    if (jsonx.__dangerouslyEvalAllProps) {
      let evVal;
      try {
        evVal = typeof evVal === "function" ? jsonx.__dangerouslyEvalAllProps : scopedEval3(jsonx.__dangerouslyEvalAllProps);
      } catch (e2) {
        if (this.debug || jsonx.debug)
          evVal = function() {
            return { error: e2 };
          };
      }
      evAllProps = typeof evVal === "function" ? evVal.call(this, { jsonx }) : evVal;
    }
    const evProps = Object.keys(jsonx.__dangerouslyEvalProps || {}).reduce((eprops, epropName) => {
      let evVal;
      let evValString;
      try {
        evVal = scopedEval3(jsonx.__dangerouslyEvalProps[epropName]);
        evValString = evVal.toString();
      } catch (e2) {
        if (this.debug || jsonx.debug)
          evVal = e2;
      }
      eprops[epropName] = typeof evVal === "function" ? evVal.call(this, { jsonx }) : evVal;
      if (this.exposeEval)
        eprops[`__eval_${epropName}`] = evValString;
      return eprops;
    }, {});
    const evBindProps = Object.keys(jsonx.__dangerouslyBindEvalProps || {}).reduce((eprops, epropName) => {
      let evVal;
      let evValString;
      try {
        let args;
        const functionBody = jsonx.__dangerouslyBindEvalProps[epropName];
        let functionDefinition;
        if (typeof functionBody === "function") {
          functionDefinition = functionBody;
        } else if (jsonx.__dangerouslyBindEvalProps) {
          functionDefinition = scopedEval3(jsonx.__dangerouslyBindEvalProps[epropName]);
          evValString = functionDefinition.toString();
        }
        if (jsonx.__functionargs && jsonx.__functionargs[epropName]) {
          args = [this].concat(jsonx.__functionargs[epropName].reduce(boundArgsReducer.call(this, jsonx), []));
        } else if (jsonx.__functionparams === false) {
          args = [this];
        } else {
          const functionDefArgs = getParamNames(functionDefinition);
          args = [this].concat(functionDefArgs.reduce(boundArgsReducer.call(this, jsonx), []));
        }
        evVal = functionDefinition.bind(...args);
      } catch (e2) {
        if (this.debug || jsonx.debug)
          evVal = e2;
      }
      eprops[epropName] = evVal;
      if (this.exposeEval)
        eprops[`__eval_${epropName}`] = evValString;
      return eprops;
    }, {});
    return Object.assign({}, evProps, evBindProps, evAllProps);
  }
  function getComponentProps(options = { jsonx: {} }) {
    const { jsonx, resources } = options;
    return Object.keys(jsonx.__dangerouslyInsertComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        if (jsonx.__dangerouslyInsertComponents) {
          componentVal = getRenderedJSON.call(this, jsonx.__dangerouslyInsertComponents[cpropName], resources);
        }
      } catch (e2) {
        if (this.debug || jsonx.debug)
          componentVal = e2;
      }
      cprops[cpropName] = componentVal;
      return cprops;
    }, {});
  }
  function getReactComponents(options) {
    const { jsonx, resources } = options;
    const functionComponents = !jsonx.__dangerouslyInsertFunctionComponents ? {} : Object.keys(jsonx.__dangerouslyInsertFunctionComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        const args = jsonx.__dangerouslyInsertFunctionComponents && jsonx.__dangerouslyInsertFunctionComponents[cpropName];
        if (args) {
          args.options = Object.assign({}, args.options, { resources });
          if (args.function) {
            const newComponent = makeFunctionComponent.call(this, args.function, args.options);
            componentVal = (args == null ? void 0 : args.invoke) ? newComponent(jsonx.props) : newComponent;
          } else {
            const newComponent = getReactFunctionComponent.call(this, args.reactComponent, args.functionBody, args.options);
            componentVal = (args == null ? void 0 : args.invoke) ? newComponent(jsonx.props) : newComponent;
          }
        }
      } catch (e2) {
        if (this.debug || jsonx.debug)
          componentVal = e2;
      }
      cprops[cpropName] = cpropName === "_children" ? [componentVal] : componentVal;
      return cprops;
    }, {});
    const classComponents = !jsonx.__dangerouslyInsertClassComponents ? {} : Object.keys(jsonx.__dangerouslyInsertClassComponents).reduce((cprops, cpropName) => {
      let componentVal;
      try {
        const args = jsonx.__dangerouslyInsertClassComponents && jsonx.__dangerouslyInsertClassComponents[cpropName];
        if (args) {
          args.options = Object.assign({}, args.options, { resources });
          componentVal = getReactClassComponent.call(this, args.reactComponent, args.options);
        }
      } catch (e2) {
        if (this.debug || jsonx.debug)
          componentVal = e2;
      }
      cprops[cpropName] = cpropName === "_children" ? [componentVal] : componentVal;
      return cprops;
    }, {});
    return Object.assign({}, functionComponents, classComponents);
  }
  function getReactComponentProps(options = { jsonx: {} }) {
    const { jsonx } = options;
    const customComponents = this && this.reactComponents ? this.reactComponents : {};
    const customLibraries = this && this.componentLibraries ? this.componentLibraries : {};
    if (jsonx.__dangerouslyInsertJSONXComponents && Object.keys(jsonx.__dangerouslyInsertJSONXComponents).length) {
      return Object.keys(jsonx.__dangerouslyInsertJSONXComponents).reduce((cprops, cpropName) => {
        let componentVal;
        try {
          componentVal = getComponentFromMap({
            jsonx: jsonx.__dangerouslyInsertJSONXComponents && jsonx.__dangerouslyInsertJSONXComponents[cpropName],
            reactComponents: customComponents,
            componentLibraries: customLibraries
          });
        } catch (e2) {
          if (this.debug || jsonx.debug)
            componentVal = e2;
        }
        cprops[cpropName] = componentVal;
        return cprops;
      }, {});
    } else if (jsonx.__dangerouslyInsertReactComponents && Object.keys(jsonx.__dangerouslyInsertReactComponents).length) {
      return Object.keys(jsonx.__dangerouslyInsertReactComponents).reduce((cprops, cpropName) => {
        let componentVal;
        try {
          componentVal = getComponentFromMap({
            jsonx: {
              component: jsonx.__dangerouslyInsertReactComponents && jsonx.__dangerouslyInsertReactComponents[cpropName],
              props: jsonx.__dangerouslyInsertComponentProps ? jsonx.__dangerouslyInsertComponentProps[cpropName] : {}
            },
            reactComponents: customComponents,
            componentLibraries: customLibraries
          });
        } catch (e2) {
          if (this.debug || jsonx.debug)
            componentVal = e2;
        }
        cprops[cpropName] = componentVal;
        return cprops;
      }, {});
    }
  }
  function getFunctionFromProps(options = { jsonx: {}, propBody: "" }) {
    const {
      propFunc = "func:",
      propBody,
      jsonx,
      functionProperty = ""
    } = options;
    const { logError = console.error, debug } = this;
    let windowObject = {};
    if (this.window)
      windowObject = this.window;
    else if (typeof global !== "undefined" && global.window)
      windowObject = global.window;
    try {
      const functionNameString = propFunc.split(":")[1] || "";
      const functionNameArray = functionNameString.split(".");
      const functionName = functionNameArray.length ? functionNameArray[functionNameArray.length - 1] : "";
      if (propFunc.includes("func:inline")) {
        let InlineFunction;
        if (jsonx.__functionargs) {
          const args = [].concat(jsonx.__functionargs[functionProperty]);
          args.push(propBody);
          InlineFunction = Function.prototype.constructor.apply({}, args);
        } else {
          InlineFunction = Function("param1", "param2", '"use strict";' + propBody);
        }
        const [propFuncName, funcName] = propFunc.split(".");
        Object.defineProperty(InlineFunction, "name", {
          value: funcName
        });
        if (jsonx.__functionargs) {
          const boundArgs = [this].concat(jsonx.__functionargs[functionProperty].map((arg) => jsonx.props[arg]));
          return InlineFunction.bind(...boundArgs);
        } else {
          return InlineFunction.bind(this);
        }
      } else if (propFunc.indexOf("func:window") !== -1) {
        if (functionNameArray.length === 3) {
          try {
            return windowObject[functionNameArray[1]][functionName].bind(this);
          } catch (e2) {
            if (debug) {
              logError(e2);
            }
            return windowObject[functionNameArray[1]][functionName];
          }
        } else {
          try {
            return windowObject[functionName].bind(this);
          } catch (e2) {
            if (debug) {
              logError(e2);
            }
            return windowObject[functionName];
          }
        }
      } else if (functionNameArray.length === 4) {
        return this.props ? this.props[functionNameArray[2]][functionName] : jsonx.props[functionNameArray[2]][functionName];
      } else if (functionNameArray.length === 3) {
        return this.props ? this.props[functionName].bind(this) : jsonx.props[functionName].bind(this);
      } else {
        return function() {
        };
      }
    } catch (e2) {
      if (this.debug) {
        logError(e2);
        if (jsonx && jsonx.debug)
          return e2;
      }
      return function() {
      };
    }
  }
  function getFunctionProps(options = { jsonx: {} }) {
    const { allProps = {}, jsonx = {} } = options;
    const getFunction = getFunctionFromProps.bind(this);
    const funcProps = jsonx.__functionProps;
    if (funcProps) {
      Object.keys(funcProps).forEach((key) => {
        if (typeof funcProps[key] === "string" && funcProps[key].indexOf("func:") !== -1) {
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
  function getWindowComponents(options = { jsonx: {} }) {
    const { allProps, jsonx } = options;
    const windowComponents = jsonx.__windowComponents;
    const window2 = this.window || global.window || {};
    const windowFuncPrefix = "func:window.__jsonx_custom_elements";
    Object.keys(windowComponents).forEach((key) => {
      const windowKEY = typeof windowComponents[key] === "string" ? windowComponents[key].replace(`${windowFuncPrefix}.`, "") : "";
      if (typeof windowComponents[key] === "string" && windowComponents[key].indexOf(windowFuncPrefix) !== -1 && typeof window2.__jsonx_custom_elements[windowKEY] === "function") {
        const windowComponentElement = window2.__jsonx_custom_elements[windowKEY];
        const windowComponentProps = allProps["__windowComponentProps"] ? allProps["__windowComponentProps"] : this.props;
        allProps[key] = import_react3.default.createElement(windowComponentElement, windowComponentProps, null);
      }
    });
    return allProps;
  }
  function getComputedProps(options = {}) {
    const {
      jsonx = {},
      resources = {},
      renderIndex: renderIndex2,
      logError = console.error,
      useReduxState = true,
      ignoreReduxPropsInComponentLibraries = true,
      disableRenderIndexKey = true,
      debug,
      componentLibraries = {}
    } = options;
    try {
      const componentThisProp = jsonx.thisprops ? Object.assign({
        __jsonx: {
          _component: jsonx,
          _resources: resources
        }
      }, this.props, jsonx.props, useReduxState && !jsonx.ignoreReduxProps && ignoreReduxPropsInComponentLibraries && jsonx.component && !componentLibraries[jsonx.component] ? this.props && this.props.getState ? this.props.getState() : {} : {}) : void 0;
      const windowTraverse = typeof window !== "undefined" ? window : {};
      const asyncprops = jsonx.asyncprops ? getJSONXProps({
        jsonx,
        propName: "asyncprops",
        traverseObject: resources
      }) : {};
      const resourceprops = jsonx.resourceprops ? getJSONXProps({
        jsonx,
        propName: "resourceprops",
        traverseObject: resources
      }) : {};
      const windowprops = jsonx.windowprops ? getJSONXProps({
        jsonx,
        propName: "windowprops",
        traverseObject: windowTraverse
      }) : {};
      const thisprops = jsonx.thisprops ? getJSONXProps({
        jsonx,
        propName: "thisprops",
        traverseObject: componentThisProp
      }) : {};
      const thisstate = jsonx.thisstate ? getJSONXProps({
        jsonx,
        propName: "thisstate",
        traverseObject: this.state
      }) : {};
      let thiscontext = jsonx.thiscontext ? getJSONXProps({
        jsonx,
        propName: "thiscontext",
        traverseObject: this || {}
      }) : {};
      if (jsonx.useformregister) {
        const evalJSONX = {
          ...jsonx,
          __dangerouslyEvalAllProps: useFormRegisterHandler
        };
        const contextProps = getEvalProps.call(this, {
          jsonx: evalJSONX
        });
        thiscontext = {
          ...thiscontext,
          ...contextProps
        };
      }
      const evalProps = jsonx.__dangerouslyEvalProps || jsonx.__dangerouslyBindEvalProps ? getEvalProps.call(this, { jsonx }) : {};
      const insertedComponents = jsonx.__dangerouslyInsertComponents ? getComponentProps.call(this, { jsonx, resources, debug }) : {};
      const insertedReactComponents = jsonx.__dangerouslyInsertReactComponents || jsonx.__dangerouslyInsertJSONXComponents ? getReactComponentProps.call(this, { jsonx, debug }) : {};
      const insertedComputedComponents = jsonx.__dangerouslyInsertFunctionComponents || jsonx.__dangerouslyInsertClassComponents ? getReactComponents.call(this, { jsonx, debug }) : {};
      const evalAllProps = jsonx.__dangerouslyEvalAllProps ? getEvalProps.call(this, { jsonx }) : {};
      const allProps = Object.assign({}, this.disableRenderIndexKey || disableRenderIndexKey ? {} : { key: renderIndex2 }, jsonx.props, thisprops, thisstate, thiscontext, resourceprops, asyncprops, windowprops, evalProps, insertedComponents, insertedReactComponents, insertedComputedComponents);
      const computedProps = Object.assign({}, allProps, jsonx.__functionProps ? getFunctionProps.call(this, { allProps, jsonx }) : {}, jsonx.__windowComponents ? getWindowComponents.call(this, { allProps, jsonx }) : {}, jsonx.__spreadComponent ? getChildrenComponents.call(this, { allProps, jsonx }) : {}, evalAllProps);
      if (jsonx.useremoveprops && Array.isArray(jsonx.useremoveprops)) {
        for (const prop of jsonx.useremoveprops) {
          computedProps[prop] = void 0;
          delete computedProps[prop];
        }
      }
      if (jsonx.debug)
        console.debug({ jsonx, computedProps });
      return jsonx.useincludeprops && Array.isArray(jsonx.useincludeprops) ? jsonx.useincludeprops.concat(["key"], Object.keys(thisprops), Object.keys(thisstate), Object.keys(thiscontext), Object.keys(resourceprops), Object.keys(asyncprops), Object.keys(windowprops), Object.keys(evalProps), Object.keys(insertedComponents), Object.keys(insertedReactComponents), Object.keys(insertedComputedComponents)).reduce((includedProps, prop) => {
        includedProps[prop] = computedProps[prop];
        return includedProps;
      }, {}) : computedProps;
    } catch (e2) {
      debug && logError(e2, e2.stack ? e2.stack : "no stack");
      return null;
    }
  }

  // src/children.ts
  var children_exports = {};
  __export(children_exports, {
    clearTemplateCache: () => clearTemplateCache,
    fetchJSONSync: () => fetchJSONSync,
    getChildrenProperty: () => getChildrenProperty,
    getChildrenProps: () => getChildrenProps,
    getChildrenTemplate: () => getChildrenTemplate,
    getJSONXChildren: () => getJSONXChildren,
    templateCache: () => templateCache
  });
  var import_numeral = __toESM(require_numeral(), 1);
  var luxon = __toESM(require_luxon(), 1);
  var import_fs = __toESM(require_noop(), 1);
  var import_path = __toESM(require_path_browserify(), 1);
  var scopedEval = eval;
  var templateCache = /* @__PURE__ */ new Map();
  function getChildrenProperty(options = {}) {
    const { jsonx = {} } = options;
    const props = options.props || jsonx.props || {};
    if (typeof props._children !== "undefined") {
      if (Array.isArray(props._children) || typeof props._children === "string" || typeof props._children === "number") {
        return props._children;
      } else {
        return jsonx.children;
      }
    } else if (typeof jsonx.children === "undefined") {
      if (props && props.children && (typeof props.children !== "undefined" || Array.isArray(props.children))) {
        return props.children;
      } else {
        return null;
      }
    } else {
      return jsonx.children;
    }
  }
  function getChildrenProps(options = {}) {
    const { jsonx = {}, childjsonx, renderIndex: renderIndex2 } = options;
    const props = options.props || jsonx.props || {};
    if (jsonx.passprops && childjsonx && typeof childjsonx === "object") {
      const passedChildJsonx = Object.assign({}, childjsonx, {
        props: Object.assign({}, Array.isArray(jsonx.passprops) ? jsonx.passprops.reduce((passedProps, prop) => {
          passedProps[prop] = props[prop];
          return passedProps;
        }, {}) : props, childjsonx.thisprops && childjsonx.thisprops.style || childjsonx.asyncprops && childjsonx.asyncprops.style || childjsonx.windowprops && childjsonx.windowprops.style ? {} : {}, childjsonx.props, typeof this !== "undefined" || this && this.disableRenderIndexKey ? {} : {
          key: typeof renderIndex2 !== "undefined" ? renderIndex2 + Math.random() : Math.random()
        })
      });
      return passedChildJsonx;
    } else
      return childjsonx;
  }
  function fetchJSONSync(path3, options) {
    try {
      const config = {
        method: "GET",
        headers: [],
        ...options
      };
      const request = new XMLHttpRequest();
      request.open(config && config.method || "GET", path3, false);
      if (config.headers) {
        Object.keys(config.headers).forEach((header) => {
          request.setRequestHeader(header, config.headers[header]);
        });
      }
      request.send(config.body ? JSON.stringify(config.body) : void 0);
      if (request.status !== 200) {
        throw new Error(request.responseText);
      } else
        return request.responseText;
    } catch (e2) {
      throw e2;
    }
  }
  function getChildrenTemplate(template, type) {
    const cachedTemplate = templateCache.get(template);
    if (cachedTemplate) {
      return cachedTemplate;
    } else if (typeof window !== "undefined" && typeof window.XMLHttpRequest === "function" && (!import_fs.default.readFileSync || type === "fetch")) {
      const jsFile = fetchJSONSync(template);
      const jsonxModule = scopedEval(`(${jsFile})`);
      templateCache.set(template, jsonxModule);
      return jsonxModule;
    } else if (typeof template === "string" || type === "file") {
      const jsFile = import_fs.default.readFileSync(import_path.default.resolve(template)).toString();
      const jsonxModule = scopedEval(`(${jsFile})`);
      templateCache.set(template, jsonxModule);
      return jsonxModule;
    }
    return null;
  }
  function clearTemplateCache() {
    templateCache.clear();
  }
  function getJSONXChildren(options = { jsonx: {} }) {
    const { jsonx, resources, renderIndex: renderIndex2, logError = console.error } = options;
    try {
      const context = this || {};
      const props = options && options.props ? options.props : jsonx && jsonx.props ? jsonx.props : {};
      if (!jsonx)
        return null;
      jsonx.children = getChildrenProperty({ jsonx, props });
      props._children = void 0;
      delete props._children;
      if (jsonx.___template)
        jsonx.children = [getChildrenTemplate(jsonx.___template)];
      else if (typeof jsonx.children === "undefined" || jsonx.children === null)
        return void 0;
      else if (jsonx.children && jsonx.___stringifyChildren && Array.isArray(jsonx.___stringifyChildren)) {
        const args = [jsonx.children, ...jsonx.___stringifyChildren];
        jsonx.children = JSON.stringify.apply(null, args);
      } else if (jsonx.children && jsonx.___stringifyChildren)
        jsonx.children = JSON.stringify.apply(null, [jsonx.children, null, 2]);
      else if (jsonx.children && jsonx.___toStringChildren)
        jsonx.children = jsonx.children.toString();
      else if (jsonx.children && jsonx.___toNumeral)
        jsonx.children = (0, import_numeral.default)(jsonx.children).format(jsonx.___toNumeral);
      else if (jsonx.children && jsonx.___JSDatetoLuxonString)
        jsonx.children = luxon.DateTime.fromJSDate(jsonx.children).toFormat(jsonx.___JSDatetoLuxonString);
      else if (jsonx.children && jsonx.___ISOtoLuxonString)
        jsonx.children = luxon.DateTime.fromISO(jsonx.children, {
          zone: jsonx.___FromLuxonTimeZone
        }).toFormat(jsonx.___ISOtoLuxonString);
      if (typeof jsonx.children === "string")
        return jsonx.children;
      const children = jsonx.children && Array.isArray(jsonx.children) ? jsonx.children.map((childjsonx) => getReactElementFromJSONX.call(context, getChildrenProps.call(this, { jsonx, childjsonx, props, renderIndex: renderIndex2 }), resources)).filter((child) => child !== null) : jsonx.children;
      return children;
    } catch (e2) {
      this && this.debug && logError(e2, e2.stack ? e2.stack : "no stack");
      return null;
    }
  }

  // src/index.ts
  var import_numeral2 = __toESM(require_numeral(), 1);
  var luxon2 = __toESM(require_luxon(), 1);

  // src/express.ts
  var import_path2 = __toESM(require_path_browserify(), 1);
  var import_fs2 = __toESM(require_noop(), 1);
  var scopedEval2 = eval;
  function __express(filePath, options, callback) {
    try {
      let jsonxModule = options == null ? void 0 : options.__jsonx;
      let isJSON = false;
      if (filePath) {
        isJSON = [".json", ".jsonx"].includes(import_path2.default.extname(filePath));
        const jsFile = import_fs2.default.readFileSync(filePath).toString();
        jsonxModule = isJSON ? scopedEval2(`(${jsFile})`) : scopedEval2(jsFile);
      }
      const resources = Object.assign({}, options);
      delete resources.__boundConfig;
      delete resources.__DOCTYPE;
      delete resources.__jsonx;
      const context = Object.assign({ disableRenderIndexKey: false }, options == null ? void 0 : options.__boundConfig);
      const jsonxRenderedString = outputHTML.call(context, {
        jsonx: jsonxModule,
        resources
      });
      const template = `${(options == null ? void 0 : options.__DOCTYPE) || "<!DOCTYPE html>"}
${jsonxRenderedString}`;
      if (typeof callback === "function")
        callback(null, template);
      else
        return template;
    } catch (e2) {
      if (typeof callback === "function")
        callback(e2);
      else
        throw e2;
    }
  }

  // src/index.ts
  var createElement2 = import_react4.default.createElement;
  var {
    componentMap: componentMap2,
    getComponentFromMap: getComponentFromMap2,
    getBoundedComponents: getBoundedComponents2,
    DynamicComponent: DynamicComponent2,
    FormComponent: FormComponent2,
    ReactHookForm: ReactHookForm2,
    getReactLibrariesAndComponents: getReactLibrariesAndComponents2
  } = components_exports;
  var { getComputedProps: getComputedProps2 } = props_exports;
  var { getJSONXChildren: getJSONXChildren2 } = children_exports;
  var { displayComponent: displayComponent2, validSimpleJSONXSyntax: validSimpleJSONXSyntax2, simpleJSONXSyntax: simpleJSONXSyntax2 } = utils_exports;
  var renderIndex = 0;
  function jsonxRender(config = { jsonx: { component: "" }, querySelector: "" }) {
    const { jsonx, resources, querySelector, DOM, portal } = config;
    const RenderDOM = DOM || document.querySelector(querySelector);
    const JSONXReactElement = getReactElementFromJSONX.call(this || {}, jsonx, resources);
    if (!JSONXReactElement)
      throw ReferenceError("Invalid React Element");
    else if (!RenderDOM)
      throw ReferenceError("Invalid Render DOM Element");
    if (portal)
      import_react_dom.default.createPortal(JSONXReactElement, RenderDOM);
    else {
      const root = (0, import_client.createRoot)(RenderDOM);
      root.render(JSONXReactElement);
    }
  }
  function outputHTML(config = { jsonx: { component: "" } }) {
    const { jsonx, resources, type, props, children } = config;
    return this && this.useJSON ? import_server.default.renderToString(getReactElementFromJSON.call(this || {}, { type: type || jsonx.type || jsonx.component || "Fragment", props: props || jsonx.props, children: children || jsonx.children })) : import_server.default.renderToString(getReactElementFromJSONX.call(this || {}, jsonx, resources));
  }
  function getReactElementFromJSONX(jsonx, resources = {}) {
    const {
      customComponents,
      debug = false,
      returnJSON = false,
      logError = console.error,
      boundedComponents = [],
      disableRenderIndexKey = true
    } = this || {};
    let {
      componentLibraries = {}
    } = this || {};
    componentLibraries.ReactHookForm = ReactHookForm2;
    if (!jsonx)
      return null;
    if (jsonx.type)
      jsonx.component = jsonx.type;
    if (!jsonx.component && validSimpleJSONXSyntax2(jsonx)) {
      jsonx = simpleJSONXSyntax2(jsonx);
    }
    if (!jsonx || !jsonx.component)
      return createElement2("span", {}, debug ? "Error: Missing Component Object" : "");
    try {
      let components = Object.assign({ DynamicComponent: DynamicComponent2.bind(this) }, { FormComponent: FormComponent2.bind(this) }, componentMap2, this == null ? void 0 : this.reactComponents);
      let reactComponents = boundedComponents.length ? getBoundedComponents2.call(this, {
        boundedComponents,
        reactComponents: components
      }) : components;
      if (customComponents && Array.isArray(customComponents) && customComponents.length) {
        const cxt = { ...this, componentLibraries, reactComponents: components };
        const {
          customComponentLibraries,
          customReactComponents
        } = getReactLibrariesAndComponents2.call(cxt, customComponents);
        componentLibraries = { ...componentLibraries, ...customComponentLibraries };
        reactComponents = { ...reactComponents, ...customReactComponents };
      }
      if (disableRenderIndexKey === false)
        renderIndex++;
      const element = getComponentFromMap2.call(this, {
        jsonx,
        reactComponents,
        componentLibraries,
        debug,
        logError
      });
      const props = getComputedProps2.call(this, {
        jsonx,
        resources,
        renderIndex,
        componentLibraries,
        debug,
        logError,
        disableRenderIndexKey
      });
      const displayElement = jsonx.comparisonprops ? displayComponent2.call(this, {
        jsonx,
        props,
        renderIndex,
        componentLibraries,
        debug
      }) : true;
      if (displayElement) {
        const children = getJSONXChildren2.call(this, {
          jsonx,
          props,
          resources,
          renderIndex
        });
        if (returnJSON)
          return { type: element, props, children };
        else if (jsonx.test)
          return JSON.stringify({ element, props, children }, null, 2);
        else
          return createElement2(element, props, children);
      } else {
        return null;
      }
    } catch (e2) {
      if (debug) {
        logError({ jsonx, resources }, "getReactElementFromJSONX this", this);
        logError(e2, e2.stack ? e2.stack : "no stack");
        return e2.toString();
      }
      throw e2;
    }
  }
  var getRenderedJSON = getReactElementFromJSONX;
  var getReactElement = getReactElementFromJSONX;
  function getReactElementFromJSON({
    type,
    props,
    children
  }) {
    return createElement2(type, props, children && Array.isArray(children) ? children.map(getReactElementFromJSON) : children);
  }
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
  function outputJSX(jsonx, resources = {}) {
    const context = Object.assign({}, this, { returnJSON: true });
    const json = getReactElementFromJSONX.call(context, jsonx, resources);
    return jsonToJSX(json);
  }
  function outputJSON(jsonx, resources = {}) {
    const context = Object.assign({}, this, { returnJSON: true });
    return getReactElementFromJSONX.call(context, jsonx, resources);
  }
  var jsonxHTMLString = outputHTML;
  function jsonToJSX(json) {
    const propsString = json.props ? Object.keys(json.props).filter((prop) => prop.includes("__eval_") === false).reduce((propString, prop) => {
      propString += ` ${prop.toString()}=${typeof json.props[prop] === "string" ? `"${json.props[prop].toString()}"` : `{${(json.props[`__eval_${prop}`] || json.props[prop]).toString()}}`}`;
      return propString;
    }, "") : "";
    return Array.isArray(json.children) ? `<${json.type} ${propsString}>
  ${json.children.map(jsonToJSX).join("\r\n")}
</${json.type}>` : `<${json.type}${propsString}>${json.children}</${json.type}>`;
  }
  function __getReact() {
    return import_react4.default;
  }
  function __getReactDOM() {
    return import_react_dom.default;
  }
  var _jsonxChildren = children_exports;
  var _jsonxComponents = components_exports;
  var _jsonxProps = props_exports;
  var _jsonxUtils = utils_exports;
  var _jsonxHelpers = { numeral: import_numeral2.default, luxon: luxon2 };
  var src_default = getReactElementFromJSONX;
  return __toCommonJS(src_exports);
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
/**
 * @license React
 * react-dom-server-legacy.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=index.web.core.js.map
