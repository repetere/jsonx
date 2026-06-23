import { jsonx } from "./jsonx";
export type functionParam = (...params: any[]) => any;
export type dynamicFunctionParams = {
    jsonx?: jsonx;
    propName?: string;
    traverseObject?: any;
};
export type dynamicComponentProps = {
    propName?: string;
    traverseObject?: any;
    useCache?: boolean;
    cacheTimeout?: number;
    loadingJSONX?: jsonx;
    loadingErrorJSONX?: jsonx;
    cacheTimeoutFunction?: functionParam;
    jsonx?: jsonx;
    name?: string;
    transformFunction?: functionParam;
    fetchURL?: string;
    fetchOptions?: any;
    fetchFunction?: functionParam;
};
export type formComponentProps = {
    name?: string;
    hookFormOptions?: any;
    onSubmit?: functionParam;
    formComponent?: jsonx;
    formWrapperComponent?: jsonx;
    formWrapperProps?: any;
    formKey?: any;
};
