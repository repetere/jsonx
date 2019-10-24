export interface jsonx {
  component: string;
  type?: string;
  props?: any;
  children?: jsonx[] | string | null;
  thisprops?: {
    [index: string]: string[];
  };
  comparisonprops?: any;
  __dangerouslyBindEvalProps?: {
    [index: string]: string | function;
  };
}

export interface jsonxResourceProps{
  [index: string]: any;
}

export type jsonxComponent = {
  [index:string]:  | React.FunctionComponent
  | React.PureComponent
  | React.Component
  | React.ReactElement
  | function;
}

export interface jsonxLibrary{
  [index: string]: jsonxComponent;
}

export interface jsonxComponents{
  [index: string]: jsonxComponent;
}