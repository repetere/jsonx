import { ReactElementLike } from "prop-types";

export type callbackFunc = (...args: any[]) => any;
export interface jsonxChildren {
  /** Standard Prop: children argument for React.createElement */
  children?: jsonx[] | string | Date | null ;
}
export type createFunctionComponentArgs = {
  reactComponent?: jsonx;
  function?: callbackFunc;
  functionBody?: string;
  invoke?: boolean;
  options?: {
    lazy?: boolean;
    bind?: boolean;
    resources?: any;
    name?: string;
  };
};
export interface jsonxElementProperties {
  /** Standard Prop: Required React.createElement element */
  component?: string;
  /** Standard Prop: Alias for component */
  type?: string;
  /** Standard Prop: props argument for React.createElement  */
  props?: any;
  /** Tranverse Prop: traverse asynchronous properties passed to components when using JSONX programmatically */
  resourceprops?: {
    [index: string]: string[];
  };
  /** Tranverse Prop: Alias for resourceprops */
  asyncprops?: {
    [index: string]: string[];
  };
  /** Tranverse Prop: transverse properties on window */
  windowprops?: {
    [index: string]: string[];
  };
  /** Tranverse Prop: transverse properties on this.props */
  thisprops?: {
    [index: string]: string[];
  };
  /** Tranverse Prop: transverse properties on this.state */
  thisstate?: {
    [index: string]: string[];
  };
  /** Tranverse Prop: transverse properties on this */
  thiscontext?: {
    [index: string]: string[];
  };
  
  /** Evaluation Prop: used to override value of JXM.children */
  _children?: jsonxChildren;
  /** Evaluation Prop: used to set all values of JXM.props */
  __dangerouslyEvalAllProps?: string | callbackFunc;
  /** Evaluation Prop: used to assign function bound to current this as values of JXM.props from strings */
  __dangerouslyBindEvalProps?: {
    [index: string]: string | callbackFunc;
  };
  /** Evaluation Prop: used to assign values of JXM.props from strings */
  __dangerouslyEvalProps?: {
    [index: string]: string | callbackFunc;
  };
  /** Evaluation Prop: used to assign React Elements to prop values of JXM.props from JXM Objects */
  __dangerouslyInsertComponents?: {
    [index: string]: jsonx;
  };
  /** Evaluation Prop: used to assign React Components to prop values of JXM.props from JXM Objects */
  __dangerouslyInsertReactComponents?: {
    [index: string]: string;
  };
  /** Evaluation Prop: used to assign React Components to prop values of JXM.props from JXM Objects */
  __dangerouslyInsertJSONXComponents?: {
    [index: string]: jsonx;
  };
  /** Evaluation Prop: used to create function components as prop values of JXM.props */
  __dangerouslyInsertFunctionComponents?: {
    [index: string]: createFunctionComponentArgs;
  };
  /** Evaluation Prop: used to create class components as prop values of JXM.props */
  __dangerouslyInsertClassComponents?: {
    [index: string]: {
      reactComponent: jsonx,
      options: any;
    };
  };
  /** Evaluation Prop: used to assign React elements as prop values of JXM.props */
  __windowComponents?: any;
  /** Evaluation Prop: used to assign props of React elements as prop values of JXM.props */
  __windowComponentProps?: any;
  /** Evaluation Prop: values to loop over and generate JXM.children by mapping over component in JXM.__spreadComponent */
  __spread?: any[];
  /** Evaluation Prop: JXM object that's mapped with data from __spread array */
  __spreadComponent?: jsonx;
  
  
  
  /** Evaluation Prop(LEGACY): used to assign functions to values of JXM.props from strings */
  __functionProps?: {
    [index: string]: any;
  };
  /** Evaluation Prop(LEGACY): used to bind arguments functions from __functionProps to values of JXM.props from strings */
  __functionargs?: {
    [index: string]: any;
  };
  /** Evaluation Prop(LEGACY): used to define functions for __functionProps to values of JXM.props from strings */
  __inline?: {
    [index: string]: any;
  };

  /** Format Prop: used to convert JXM.children value to strings using JSON.stringify */
  ___stringifyChildren?: [string, number] | boolean; //TODO: fix passing applied params
  /** Format Prop: used to convert JXM.children value to strings using .toString */
  ___toStringChildren?: boolean;
  /** Format Prop: used to format number JXM.children values to strings using Numeral.js formatting */
  ___toNumeral?: string;
  /** Format Prop: used to set timezone for Luxon formatting */
  ___FromLuxonTimeZone?: string;
  /** Format Prop: used to format ISO Date string JXM.children values to strings using Luxon formatting */
  ___ISOtoLuxonString?: string;
  /** Format Prop: used to format date values assigned to JXM.children as strings using Luxon formatting */
  ___JSDatetoLuxonString?: string;


  /** Utility Prop: insert JXM template from external path */
  ___template?: string | any;
  /** Utility Prop: pass down and merge parent props to children JXM objects */
  passprops?: boolean | string[];
  /** Utility Prop: output calculated advanced props to console */
  debug?: Boolean;


  /** Display Prop: conditionally show elements based on props when all comparison values are true */
  comparisonprops?: jsonxComparison[];
  /** Display Prop: flag used to conditionally show elements when any comparison values are true */
  comparisonorprops?: Boolean;
  // __dangerouslyInsertComponents?: {
  //   [index: string]: string | callbackFunc;
  // };

  /** Applied Prop: modify jsonx properties   */
  useformregister?:boolean;
  /** Applied Prop: remove props from component, usually used with passprops */
  useremoveprops?: string[];
  /** Applied Prop: includes only defined props, usually used with passprops */
  useincludeprops?: string[];
  [index: string]: any;
}

export interface jsonx extends jsonxElementProperties, jsonxChildren {
  component?: string;
}

export interface simpleJsonxChildren {
  children?: simpleJsonx[] | string | null;
}

export interface simpleJsonxElementProperties
  extends simpleJsonxChildren,
    jsonxElementProperties {}

export interface simpleJsonx {
  [index: string]: simpleJsonxElementProperties;
}

export type jsonxCompare = {
  left?: any;
  right?: any;
};

export type jsonxComparison = {
  left: any;
  operation:
    | "eq"
    | "=="
    | "dneq"
    | "!="
    | "!"
    | "dnseq"
    | "!=="
    | "seq"
    | "==="
    | "lt"
    | "<"
    | "lte"
    | "<="
    | "gt"
    | ">"
    | "gte"
    | ">="
    | "dne"
    | "undefined"
    | "null"
    | "!null"
    | "!undefined"
    | "exists";
  right?: any;
};

export interface jsonxResourceProps {
  [index: string]: any;
}

export type genericComponent = React.FunctionComponent
| React.PureComponent
| React.Component
| React.ReactElement
| callbackFunc;

export type jsonxComponent = {
  [index: string]: genericComponent;
};

export interface jsonxLibrary {
  [index: string]: genericComponent;
}
export interface jsonxDefinitionLibrary {
  [index: string]: jsonxCustomComponent;
}

export interface jsonxComponentLibraries{
  [index:string]:jsonxLibrary
};

export type jsonxCustomComponent = {
  type: 'component'|'function'|'library';
  name: string;
  jsonx?: jsonxDefinitionLibrary | jsonx;
  jsonxComponent?: jsonx;
  options?: {};
  functionBody?: (string);
  functionComponent?: ((props?:any)=>any);
};

export type jsonxLibrariesAndComponents = {
  customComponentLibraries: jsonxComponentLibraries;
  customReactComponents: jsonxComponent;
}
