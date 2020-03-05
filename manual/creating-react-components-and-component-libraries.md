<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---


# Creating new components

"With great power comes great responsibility". Just because you can create new Class and Function components with JSONX it doesn't mean you should. Typically, components should be bundled as UMDs and imported as Custom/External components to optimize performance.

-  [1. Class Components](#class-component) - Use `jsonx._jsonxComponents.getReactClassComponent` and JXM to create React Class Components with JSON
-  [2. Function Components](#function-component) - Use `jsonx._jsonxComponents.getReactFunctionComponent` and JXM to create React Function Components with JSON. Because JSONX can uses React under the hood, all React features are available (e.g. Hooks, Lazy and Suspense). 
-  [3. Dynamic Components](#dynamic-component) - Use `jsonx._jsonxComponents.DynamicComponent` is a special component that renders components after fetching data.

## <a name="class-component">1. Class Components </a>

JSONX exposes the `jsonx._jsonxComponents.getReactClassComponent` function that can you can use to create React Class Components. `getReactClassComponent` uses `createReactClass` underneath the hood. You can read more about using `createReactClass` in the React docs section about ["React Without ES6"](https://reactjs.org/docs/react-without-es6.html).

```typescript
export function getReactClassComponent(
  reactComponent = {},
  options = {},
): ReactComponentLike
```

`getReactClassComponent` takes two arguments `reactComponent` which contains the arguments passed to `createReactClass` and an `options` argument.

The only required function in the `reactComponent` parameter object is a render function, the body of the function has to be valid JXM JSON. Each property in the object has two properties a `body` property whose value is the function body and an `arguments` property which defines the parameters for the function.

```javascript
const reactComponent = {
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
};
const options = {
  name:'MyCustomComponent',
};
const MyCustomComponent = jsonx._jsonxComponents.getReactClassComponent(reactComponent,options);
const JXM = {
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
  jsonx: JXM, 
  querySelector:'#main', });
```

Console output after mounting
```javascript
[Log] mounted (4)
"this.props"
{status: "Amazing", children: {}, someProp: 1, someOtherProp: 2}
"this.state"
{status: "not-loaded", name: "jsonx test", customNumber: 1}
```


### Example Class Components

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/ck3oye01/7/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/ck3oye01/7/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="function-component">2. Function Components </a>


JSONX exposes the `jsonx._jsonxComponents.getReactFunctionComponent` function that can you can use to create React Function Components. 

```typescript
export function getReactFunctionComponent(
  reactComponent: JXM_JSON,
  functionBody: string,
  options = {},
): ReactComponentLike
```

`getReactFunctionComponent` takes three arguments:
  1. `reactComponent` which contains the JXM JSON for rendering the Function Component.
  2. `functionBody` which is a string for the Function component (if you are using hooks or want to expose props from inside of your components, assign the props you want to make available to an `exposeprops` variable)
  3. `options` used to customize `getReactFunctionComponent`.


```typescript
const hookFunctionComponent = jsonx._jsonxComponents.getReactFunctionComponent(
  //reactComponent
  {
    component:'div',
    passprops:true,
    children:[
      {
        component:'button',
        __dangerouslyBindEvalProps:{
          onClick:function(clicks,set_click){
            set_click(clicks+1);
          },
        },
        thisprops:{
          clicks:['clicks'],
          set_click:['set_click']
        },
        children:'Click Me',
      },
      {
        component:'span',
        children:' Clicks: '
      },
      {
        component:'span',
        thisprops:{
          _children:['clicks'],
        }
      }
    ]
  },
  //functionBody
  `
  const [clicks, set_click] = useState(0);
  const exposeprops = {clicks,set_click};
  `,
  //options
  {
    name:'hookFunctionComponent',
  });
```

### Example Function Components

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/a4pmLyd1/4/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/a4pmLyd1/4/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="dynamic-component">3. Dynamic Components </a>


JSONX has a helper component called `DynamicComponent`. Using `DynamicComponent` allows you to create components that load data and render asynchronously. 

The typical use case is if you have some kind of dashboard or components that are independently loading data, Dynamic Components are a convenient way to handle dynamic components without Suspense and Lazy Components (they use hooks under the hood). 

Once the data is fetched, the `jsonx` object passed is rendered and the resolved data is available as  `resourceprops.DynamicComponentData`.

```typescript
const JXM = {
  component: 'DynamicComponent',
  props: {
    useCache: boolean;
    cacheTimeout: number;//milliseconds
    loadingJSONX: jsonx;
    loadingErrorJSONX: jsonx;
    cacheTimeoutFunction: () => void,
    jsonx: jsonx;
    transformFunction: (data: any) => any,
    fetchURL: string;
    fetchOptions: any;
    fetchFunction: (fetchURL: string, fetchOptions: any)=>Promise,
  }
};
```

```typescript
const dynamicComponent = jsonx.getReactElementFromJSONX({
  {
    component:'DynamicComponent',
    props:{
      fetchURL:'/path/to/some/data'
      jsonx:{
        component:'p',
        children:'loaded data',
      }
    }
  },
});
```

### Example Dynamic Components

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/cjm1yshz/3/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/cjm1yshz/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## [JSONX & JXM Spec](../spec/index.html)

### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
