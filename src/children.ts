import numeral from "numeral";
import * as luxon from "luxon";
import fs from "fs";
import path from "path";
import { getReactElementFromJSONX } from "./index";
import { ReactComponentLike, ReactElementLike } from "prop-types";

import * as defs from "./types/jsonx/index";
const scopedEval = eval;
export const templateCache = new Map();

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
export function getChildrenProperty(
  options: { jsonx?: defs.jsonx; props?: any } = {}
) {
  const { jsonx = {} } = options;

  const props = options.props || jsonx.props || {};
  if (typeof props._children !== "undefined" /* && !jsonx.children */) {
    if (
      Array.isArray(props._children) ||
      typeof props._children === "string" ||
      typeof props._children === "number"
    ) {
      return props._children;
    } else {
      return jsonx.children;
    }
  } else if (typeof jsonx.children === "undefined") {
    if (
      props &&
      props.children &&
      (typeof props.children !== "undefined" || Array.isArray(props.children))
    ) {
      return props.children;
    } else {
      return null;
    }
  } else {
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
export function getChildrenProps(
  this: defs.Context,
  options: {
    jsonx?: defs.jsonx;
    renderIndex?: number;
    childjsonx?: defs.jsonx;
    props?: any;
  } = {}
) {
  const { jsonx = {}, childjsonx, renderIndex } = options;
  const props = options.props || jsonx.props || {};

  return jsonx.passprops && childjsonx && typeof childjsonx === "object"
    ? Object.assign({}, childjsonx, {
        props: Object.assign(
          {},
          props,
          (childjsonx.thisprops && childjsonx.thisprops.style) || // this is to make sure when you bind props, if you've defined props in a dynamic property, to not use bind props to  remove passing down styles
            (childjsonx.asyncprops && childjsonx.asyncprops.style) ||
            (childjsonx.windowprops && childjsonx.windowprops.style)
            ? {}
            : {
                style: {}
              },
          childjsonx.props,
          //@ts-ignore
          typeof this !== "undefined" ||(this && this.disableRenderIndexKey)
            ? {}
            : {  key: typeof renderIndex !== "undefined"
                ? renderIndex + Math.random()
                : Math.random()
            }
        )
      })
    : childjsonx;
}

export function fetchJSONSync(path: string, options?: any ) {
  try {
    const config: any = {
      method: "GET",
      headers: [],
      ...options
    };
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
    } else return request.responseText;
  } catch (e) {
    throw e;
  }
}

export function getChildrenTemplate(template: string | any) {
  const cachedTemplate = templateCache.get(template);
  if (cachedTemplate) {
    return cachedTemplate;
  }
  else if (
    typeof window !== "undefined" &&
    typeof window.XMLHttpRequest === "function" &&
    !fs.readFileSync
  ) {
    const jsFile = fetchJSONSync(template);
    const jsonxModule = scopedEval(`(${jsFile})`);
    templateCache.set(template, jsonxModule);
    return jsonxModule;
  } else if (typeof template === "string") {
    const jsFile = fs.readFileSync(path.resolve(template)).toString();
    const jsonxModule = scopedEval(`(${jsFile})`);
    // console.log({jsonxModule})
    templateCache.set(template, jsonxModule);
    // console.log({ templateCache });
    return jsonxModule;
  }
  return null;
}

export function clearTemplateCache(): void {
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

export function getJSONXChildren(
  this: defs.Context,
  options: defs.Config = { jsonx: {} }
): string | null | undefined | Array<ReactElementLike>| Array<defs.JSONReactElement> {
  // eslint-disable-next-line
  const { jsonx, resources, renderIndex, logError = console.error } = options;
  try {
    const context = this || {};
    const props = options && options.props
      ? options.props
      : jsonx && jsonx.props
        ? jsonx.props
        : {};
    if(!jsonx) return null 
    jsonx.children = getChildrenProperty({ jsonx, props });
    props._children = undefined;
    delete props._children;
    if (jsonx.___template)
      jsonx.children = [getChildrenTemplate(jsonx.___template)];
    else if (typeof jsonx.children === 'undefined' || jsonx.children === null) return undefined;
    else if (jsonx.children && jsonx.___stringifyChildren)
      jsonx.children = JSON.stringify.apply(null, [jsonx.children, null, 2]);
    //TODO: fix passing applied params
    else if (jsonx.children && jsonx.___toStringChildren)
      jsonx.children = jsonx.children.toString();
    else if (jsonx.children && jsonx.___toNumeral)
      jsonx.children = numeral(jsonx.children).format(jsonx.___toNumeral);
    else if (jsonx.children && jsonx.___JSDatetoLuxonString)
      jsonx.children = luxon.DateTime.fromJSDate(
        jsonx.children as Date
      ).toFormat(jsonx.___JSDatetoLuxonString);
    else if (jsonx.children && jsonx.___ISOtoLuxonString)
      jsonx.children = luxon.DateTime.fromISO(jsonx.children as string, {
        zone: jsonx.___FromLuxonTimeZone
      }).toFormat(jsonx.___ISOtoLuxonString);
      
    if (typeof jsonx.children === 'string') return jsonx.children;
    const children = jsonx.children && Array.isArray(jsonx.children)
      ? jsonx.children
        .map(childjsonx =>
          getReactElementFromJSONX.call(
            context,
            getChildrenProps.call(this,{ jsonx, childjsonx, props, renderIndex }),
              resources
            )
          )
          .filter(child => child !== null)
      : jsonx.children;
    
    return children as ReactElementLike[]|defs.JSONReactElement[]|null|string|undefined;
  } catch (e) {
    this && this.debug && logError(e, e.stack ? e.stack : "no stack");
    return null;
  }
}
