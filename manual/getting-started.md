<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">
<!-- <script src="https://unpkg.com/highlight.js@9.18.1/lib/highlight.js"> </script> -->

---
### JSONX Manual
 - [Home](https://repetere.github.io/jsonx/)
 - [Getting Started](../getting-started/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---

# Getting Started

JSONX is a React rendering library that lets you define React UI as JSON, then render it as React elements, HTML, JSX text, or browser DOM output.

JSONX gives you a JSON-based rendering layer for React. A JSONX object describes the component, props, children, templates, and resource bindings. The library resolves that structure into React output for browser rendering, server-side HTML rendering, Express views, or generated component flows.

JSONX works by converting JSON objects that follow the JXM spec into the arguments passed into [React.createElement](https://reactjs.org/docs/react-api.html#createelement). The only required property is the component, which is passed as the `type` argument.

```ts
// React Create Element Example
React.createElement(
  type,
  [props],
  [...children]
)

// Basic JXM
const JXM = { component:'div', props: { title:'jsonx', }, children:'hello', };

// JSONX.getReactElement returns a react element 
JSONX.getReactElement(JXM) => React.createElement('div', { title: 'jsonx', }, 'hello');

// eqivalent to JSX 
<div title="jsonx">hello</div> 
```

## Usages

JSONX is useful for:
- UI stored in files, APIs, databases, or configuration.
- Server-rendered React views.
- Dynamic component rendering.
- View management systems that need React views as data.
- Systems where React views need to be generated, serialized, audited, or moved between services.
- Using existing React component libraries from JSON definitions.

JSONX is not:
- A replacement for React.
- A design system.
- A tool for running untrusted UI definitions.
- Just a JSON-to-HTML converter.

For complex hand-authored application screens, JSX may still be the simpler choice. JSONX is a better fit when the view definition needs to be data.

## Example
<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/ka7ghypd/18/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/ka7ghypd/18/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</td>
  </tr>
</table>

## Customizing JSONX

The JSONX library has a couple of customization options. The library can be customized by setting the configuration on the `this` property of JSONX methods. The configuration options are:
```typescript
type JSONXConfiguration = {
  debug: boolean = false; // used to debug component rendering errors, and will send exceptions to the logError function
  logError: (...args: any[]) => any = console.error; // default(console.error) by default will log errors to console.error but you can define any custom error logging function
  returnJSON: boolean = false; // used to return a JSON object instead of React Components
  disableRenderIndexKey: boolean = true; // used to disable auto assign props.key
  boundedComponents: jsonx[]; // array of components to bind "this" to
  componentLibraries: { 
    [index: libraryName as string]: {
      [index: componentName as string]: ReactComponentLike;
    } 
  }; // object of custom react components in component library
  reactComponents: { [index: componentName as string]: ReactComponentLike } // custom react components
}


//e.g

jsonx.getReactElementFromJSONX.call(
  { debug:true, reactComponents:{ReactModal}, componentLibraries:{ ReactBootstrap, Antd, } }, //custom options bound to 'this' 
  {
    component:'ReactBootstrap.Container', children:'hello world'
  });
```
 
## Next: [Using Advanced Props](../using-advanced-props/index.html)

---
### JSONX Manual
 - [Home](https://repetere.github.io/jsonx/)
 - [Getting Started](../getting-started/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
