import React from "react";
import { ReactElementLike } from "prop-types";
import * as defs from "./types/jsonx/index";
import { ReactComponentLike } from "prop-types";
declare global {
    interface window {
        [index: string]: any;
    }
    interface Window {
        [index: string]: any;
    }
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}
export declare const ReactHookForm: {
    ErrorMessage: <TFieldErrors extends import("react-hook-form").DeepMap<Record<string, any>, import("react-hook-form").FieldError>, TAs extends "symbol" | "object" | "body" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noindex" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "slot" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "template" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "text" | "textPath" | "tspan" | "use" | "view" | React.FunctionComponent<any> | React.ComponentClass<any, any> | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined = undefined>({ as, errors, name, message, render, ...rest }: import("react-hook-form").Assign<{
        as?: TAs | undefined;
        errors?: TFieldErrors | undefined;
        name: import("react-hook-form").FieldName<import("@hookform/error-message").FieldValuesFromFieldErrors<TFieldErrors>>;
        message?: string | undefined;
        render?: ((data: {
            message: string;
            messages?: import("react-hook-form").MultipleFieldErrors | undefined;
        }) => React.ReactNode) | undefined;
    }, TAs extends undefined ? {} : TAs extends React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> ? Record<string, any> : TAs extends React.ComponentType<infer P> ? P : TAs extends "symbol" | "object" | "body" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noindex" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "slot" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "template" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "text" | "textPath" | "tspan" | "use" | "view" ? JSX.IntrinsicElements[TAs] : never>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    Controller: <TAs_1 extends "input" | "select" | "textarea" | React.FunctionComponent<any> | React.ComponentClass<any, any> | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>, TFieldValues extends Record<string, any> = Record<string, any>>(props: import("react-hook-form").Assign<({
        as: TAs_1;
        render?: undefined;
    } & import("react-hook-form").UseControllerOptions<Record<string, any>>) | ({
        as?: undefined;
        render: (field: import("react-hook-form").ControllerRenderProps<TFieldValues>, state: import("react-hook-form").InputState) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
    } & import("react-hook-form").UseControllerOptions<Record<string, any>>), TAs_1 extends undefined ? {} : TAs_1 extends React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> ? Record<string, any> : TAs_1 extends React.ComponentType<infer P_1> ? P_1 : TAs_1 extends "symbol" | "object" | "body" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "keygen" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "menu" | "menuitem" | "meta" | "meter" | "nav" | "noindex" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "slot" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "template" | "tbody" | "td" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "webview" | "svg" | "animate" | "animateMotion" | "animateTransform" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feDropShadow" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "mpath" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "switch" | "text" | "textPath" | "tspan" | "use" | "view" ? JSX.IntrinsicElements[TAs_1] : never>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
};
/**
 
 */
export declare let advancedBinding: boolean;
/**
 * object of all react components available for JSONX
 
 */
export declare let componentMap: any;
/**
 * getBoundedComponents returns reactComponents with certain elements that have this bounded to select components in the boundedComponents list
 
 * @param {Object} options - options for getBoundedComponents
 * @param {Object} options.reactComponents - all react components available for JSONX
 * @param {string[]} boundedComponents - list of components to bind JSONX this context (usually helpful for navigation and redux-router)
 * @returns {Object} reactComponents object of all react components available for JSONX
 */
export declare function getBoundedComponents(this: defs.Context, options?: {
    advancedBinding?: boolean;
    reactComponents?: defs.jsonx["jsonxComponents"];
    boundedComponents?: string[];
}): any;
/**
 * returns a react component from a component library
 
 * @param {Object} options - options for getComponentFromLibrary
 * @param {Object} [options.componentLibraries={}] - react component library like bootstrap
 * @param {Object} [options.jsonx={}] - any valid JSONX JSON
 * @returns {function|undefined} react component from react library like bootstrap, material design or bulma
 */
export declare function getComponentFromLibrary(options?: {
    jsonx: defs.jsonx;
    componentLibraries?: defs.jsonx["jsonxLibrary"];
}): any;
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
export declare function getComponentFromMap(options?: {
    jsonx?: defs.jsonx;
    reactComponents?: defs.jsonx["jsonxComponents"];
    componentLibraries?: defs.jsonx["jsonxLibrary"];
    logError?: any;
    debug?: boolean;
}): any;
/**
 * Returns a new function from an options object
 
 * @param {Object} options
 * @param {String} [options.body=''] - Function string body
 * @param {String[]} [options.args=[]] - Function arguments
 * @returns {Function}
 */
export declare function getFunctionFromEval(options?: any): any;
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
export declare function getReactClassComponent(this: defs.Context, reactComponent?: {}, options?: any): ReactComponentLike;
/**
 * A helper component that allows you to create forms with [react-hook-form](https://react-hook-form.com/) without needed to add external form libraries
 * @param this
 * @param props
 */
export declare function FormComponent(this: defs.Context, props?: defs.formComponentProps): (componentProps: any) => string | defs.JSONReactElement | ReactElementLike | null | undefined;
/**
 * A helper component that allows you to create components that load data and render asynchronously.
 * @param this
 * @param props
 */
export declare function DynamicComponent(this: defs.Context, props?: defs.dynamicComponentProps): (componentProps: any) => string | defs.JSONReactElement | ReactElementLike | null | undefined;
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
export declare function getReactFunctionComponent(this: defs.Context, reactComponent?: {}, functionBody?: string | defs.functionParam, options?: any): any;
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
export declare function getFunctionBody(func: () => any): string;
/**
 * A helpful function that lets you write a regular JavaScript function and passes the appropriate arguments to getReactFunctionComponent
 * @param {Function} func - function definition to turn into React Component Function
 * @property {object} this - options for getReactElementFromJSONX
 * @returns {Function} - React Component Function
 */
export declare function makeFunctionComponent(this: defs.Context, func: () => any, options: any): any;
/**
 *
 */
export declare function getReactContext(options?: any): React.Context<any>;
