import React from "react";
import { ReactElementLike } from "prop-types";
import * as defs from "./types/jsonx/index";
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
    ErrorMessage: <TFieldErrors extends {
        [x: string]: any;
    }, TAs extends React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | keyof JSX.IntrinsicElements | undefined = undefined>({ as, errors, name, message, render, ...rest }: import("@hookform/error-message").Props<TFieldErrors, TAs>) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
    Controller: <TFieldValues extends import("react-hook-form").FieldValues = import("react-hook-form").FieldValues, TName extends import("react-hook-form").Path<TFieldValues> = import("react-hook-form").Path<TFieldValues>>(props: import("react-hook-form").ControllerProps<TFieldValues, TName>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};
export declare const generatedCustomComponents: Map<string, defs.jsonx["jsonxComponents"] | Map<string, defs.jsonx["jsonxComponents"]>>;
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
export declare function getReactClassComponent(this: defs.Context, reactComponent?: {}, options?: any): unknown;
/**
 * A helper component that allows you to create forms with [react-hook-form](https://react-hook-form.com/) without needed to add external form libraries
 * @param this
 * @param props
 */
export declare function FormComponent(this: defs.Context, props?: defs.formComponentProps): (componentProps: any) => string | defs.JSONReactElement | ReactElementLike | null;
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
/**
 * generates react function components from a json definition
 * @property {object} this
 * @param customComponent
 * @returns {function} returns react functional component
 */
export declare function getCustomFunctionComponent(this: defs.Context, customComponent: Partial<defs.jsonxCustomComponent>): defs.genericComponent;
/**
 * returns a cache key of custom components names
 * @param customComponents
 * @returns {string} cachekey
 */
export declare function getCustomComponentsCacheKey(customComponents: defs.jsonxCustomComponent[]): string;
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
export declare function getReactLibrariesAndComponents(this: defs.Context, customComponents: defs.jsonxCustomComponent[]): defs.jsonxLibrariesAndComponents;
