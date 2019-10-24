import { jsonx } from "./jsonx";
// import React from 'react';

export type JSONReactElement = {
    type: string;
    props?: any;
    children?: null | string | JSONReactElement[];
};

export type Context = {
    componentLibraries?: jsonx.jsonxLibrary;
    reactComponents?: jsonx.jsonxComponents;
    debug?: boolean;
    returnJSON?: boolean;
    logError?: any;
    boundedComponents?: string[];
    disableRenderIndexKey?: boolean;
    name?: string;
};

export type Config = {
  jsonx: jsonx;
  resources?: any;
};

export type RenderConfig = Config & {
  querySelector: string;
  options?: any;
  DOM?: HTMLElement;
  portal?: boolean;
};

export type OutputHTMLContext = {
  useJSON: boolean;
} & Context;

export type OutputHTMLConfig = {
  type?: string;
  props?: any;
  children?: null | string | JSONReactElement[];
} & Config;

