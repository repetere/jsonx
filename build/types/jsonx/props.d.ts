import { jsonx } from "./jsonx";
export declare type functionParam = (...params: any[]) => any;
export declare type dynamicFunctionParams = {
    jsonx?: jsonx;
    propName?: string;
    traverseObject?: any;
};
