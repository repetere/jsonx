export interface jsonxChildren {
  children?: jsonx[] | string | Date | null;
}

export interface jsonxElementProperties {
  type?: string;
  props?: any;
  asyncprops?: {
    [index: string]: string[];
  };
  resourceprops?: {
    [index: string]: string[];
  };
  windowprops?: {
    [index: string]: string[];
  };
  thisprops?: {
    [index: string]: string[];
  };
  thisstate?: {
    [index: string]: string[];
  };
  thiscontext?: {
    [index: string]: string[];
  };
  comparisonprops?: jsonxComparison[];
  comparisonorprops?: jsonxComparison[];
  __dangerouslyBindEvalProps?: {
    [index: string]: string | callbackFunc;
  };
  __dangerouslyEvalProps?: {
    [index: string]: string | callbackFunc;
  };
  __dangerouslyInsertComponents?: {
    [index: string]: jsonx;
  };
  __functionProps?: {
    [index: string]: any;
  };
  __windowComponentProps?: any;
  __windowComponents?: any;
  passprops?: boolean;
  ___stringifyChildren?: [string, number]|boolean; //TODO: fix passing applied params
  ___toStringChildren?: boolean;
  ___toNumeral?: string;
  ___FromLuxonTimeZone?: string;
  ___ISOtoLuxonString?: string;
  ___JSDatetoLuxonString?: string;
  // __dangerouslyInsertComponents?: {
  //   [index: string]: string | callbackFunc;
  // };
  [index:string]:any
}

export interface jsonx extends jsonxElementProperties, jsonxChildren {
  component?: string;
}

export interface simpleJsonxChildren {
  children?: simpleJsonx[] | string | null;
}

export interface simpleJsonxElementProperties extends simpleJsonxChildren,jsonxElementProperties {

}

export interface simpleJsonx{
  [index: string]: simpleJsonxElementProperties;
}

export type callbackFunc = (...args: any[]) => any;

export type jsonxCompare = {
  left?: any;
  right?: any;
}


export type jsonxComparison = {
  left: any;
  operation: 'eq' | '==' | 'dneq' | '!=' | '!' | 'dnseq' | '!==' | 'seq' | '===' | 'lt' | '<' | 'lte' | '<=' | 'gt' | '>' | 'gte' | '>=' | 'dne' | 'undefined' | 'null' | '!null' | '!undefined' | 'exists';
  right?: any;
};

export interface jsonxResourceProps{
  [index: string]: any;
}

export type jsonxComponent = {
  [index:string]:  | React.FunctionComponent
  | React.PureComponent
  | React.Component
  | React.ReactElement
  | callbackFunc;
}

export interface jsonxLibrary{
  [index: string]: jsonxComponent;
}

export interface jsonxComponents{
  [index: string]: jsonxComponent;
}