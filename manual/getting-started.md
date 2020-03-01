<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---

# Getting Started

JSONX is a library that creates React Elements, JSX and HTML from JSON. JSONX works by converting JSON Objects that follow the JXM spec into the arguments passed into [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component (which is passed as the `type` argument)

```ts
/*
 * const JXM = { component:'div', props: { title:'jsonx', }, children:'hello', };
 * JSONX.getReactElement(JXM) 
 * // JXM converted into { type:'div', props:{ title:'jsonx', }, children:'hello', }
 * // JSONX then calls React.createElement('div', { title: 'jsonx', }, 'hello') 
 * // This is functionally equivalent to the JSX <div title="jsonx">hello</div> 
 */

React.createElement(
  type,
  [props],
  [...children]
)
```




---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
