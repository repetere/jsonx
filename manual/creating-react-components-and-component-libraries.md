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


# Tutorial Getting Started

Some other sample page


### Advanced - Custom React Components & Lifecycle Functions

You can also create react components with lifecycle functions using `getReactClassComponent`.

The only required function is a render function, the body of the function has to be valid jsonx.

```javascript
const MyCustomComponent = jsonx._jsonxComponents.getReactClassComponent({
    //
    // Initialization function
    //
    getInitialState:{
      body:'return { status:"not-loaded", name:"jsonx test", customNumber:1, }',
      arguments:[],
    },
    getDefaultProps:{
      body:'return { someProp:1, someOtherProp:2, status:"original status" }',
      arguments:[],
    },
    componentDidMount:{
      body:`console.log('mounted', 'this.props',this.props, 'this.state',this.state)`,
      arguments:[],
    },
    componentWillUnmount:{
      body:`console.log('unmounted',this.props)`,
      arguments:[],
    },
    //
    // State change functions
    //
    shouldComponentUpdate:{
      body:'console.log("should update component",{nextProps,nextState}); return true;',
      arguments:['nextProps', 'nextState']
    },
    componentWillUpdate:{
      body:'console.log("will update component",{nextProps,nextState}); return true;',
      arguments:['nextProps', 'nextState']
    },
    componentDidUpdate:{
      body:'console.log("did update component",{prevProps,prevState}); return true;',
      arguments:['prevProps', 'prevState']
    },
    //
    // Prop change functions
    //
    componentWillReceiveProps: {
      body:'console.log("will recieve props",{nextProps}); return true;',
      arguments:['nextProps']
    },
    //
    // RENDER IS THE ONLY ***REQUIRED*** FUNCTION
    //
    render:{
      body:{
        component:'p',
        props:{
          status:'from inline prop'
        },
        passprops:true,
        children:[
          {
            component:'span',
            children: 'My Custom React Component Status: ',
          },
          {
            component:'span',
            thisprops:{
              children:['status']
            }
          }
        ]
      },
    }
  });
const sampleJSONX = {
  component:'MyCustomComponent',
  props:{
    status:'Amazing',
  }
};
const boundConfig = {
  debug:true, 
  reactComponents:{
    MyCustomComponent,
  }
};
jsonx.jsonxRender.call(boundConfig, {
  jsonx: sampleJSONX, 
  querySelector:'#root', });
```

Console output after mounting
```javascript
[Log] mounted (4)
"this.props"
{status: "Amazing", children: {}, someProp: 1, someOtherProp: 2}
"this.state"
{status: "not-loaded", name: "jsonx test", customNumber: 1}
```

Checkout the `dist/example.html` for example usage.
![https://raw.githubusercontent.com/repetere/jsonx/master/docs/dist-example-html.png](https://raw.githubusercontent.com/repetere/jsonx/master/docs/dist-example-html.png)

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
