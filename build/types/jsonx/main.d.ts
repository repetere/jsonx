import { jsonx } from "./jsonx";
export declare type JSONReactElement = {
    type: string;
    props?: any;
    children?: null | string | JSONReactElement[] | any;
};
export interface Context {
    componentLibraries?: jsonx["jsonxLibrary"];
    reactComponents?: jsonx["jsonxComponents"];
    customComponents?: jsonx['jsonxCustomComponent'][];
    debug?: boolean;
    returnJSON?: boolean;
    logError?: any;
    state?: any;
    props?: any;
    window?: any;
    boundedComponents?: string[];
    disableRenderIndexKey?: boolean;
    exposeEval?: boolean;
    name?: string;
    reactHookForm?: any;
}
export interface JSONContext extends Context {
    returnJSON: true;
}
export declare type Config = {
    jsonx: jsonx;
    resources?: any;
    debug?: boolean;
    renderIndex?: number;
    props?: any;
    logError?: (...params: any[]) => any;
};
export declare type RenderConfig = Config & {
    querySelector: string;
    options?: any;
    DOM?: HTMLElement;
    portal?: boolean;
};
export declare type OutputHTMLContext = {
    useJSON?: boolean;
} & Context;
export declare type OutputHTMLConfig = {
    type?: string;
    props?: any;
    children?: null | string | JSONReactElement[];
} & Config;
