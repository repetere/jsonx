import { ReactElementLike } from "prop-types";
import * as defs from "./types/jsonx/index";
export declare const templateCache: Map<any, any>;
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
export declare function getChildrenProperty(options?: {
    jsonx?: defs.jsonx;
    props?: any;
}): any;
/**
 * Used to pass properties down to child components if passprops is set to true
 * @param {Object} options
 * @param {Object} [options.jsonx ={}] - Valid JSONX JSON
 * @param {Object} [options.childjsonx ={}] - Valid JSONX JSON
 * @param {Number} options.renderIndex - React key property
 * @param {Object} [options.props=options.jsonx.props] - Props to pull children  Object.assign(jsonx.props,jsonx.asyncprops,jsonx.thisprops,jsonx.windowprops)
 * @returns {Object|String} returns a valid  Valid JSONX Child object or a string
 */
export declare function getChildrenProps(this: defs.Context, options?: {
    jsonx?: defs.jsonx;
    renderIndex?: number;
    childjsonx?: defs.jsonx;
    props?: any;
}): defs.jsonx | undefined;
export declare function fetchJSONSync(path: string, options?: any): string;
export declare function getChildrenTemplate(template: string | any, type?: 'fetch' | 'file'): any;
export declare function clearTemplateCache(): void;
/**
 * returns React Child Elements via JSONX
 * @param {*} options
 * @property {object} this - options for getReactElementFromJSONX
 * @property {Object} [this.componentLibraries] - react components to render with JSONX
 * @property {boolean} [this.debug=false] - use debug messages
 * @property {function} [this.logError=console.error] - error logging function
 * @property {string[]} [this.boundedComponents=[]] - list of components that require a bound this context (usefult for redux router)
 */
export declare function getJSONXChildren(this: defs.Context, options?: defs.Config): string | null | undefined | Array<ReactElementLike> | Array<defs.JSONReactElement>;
