# Creating React Components And Component Libraries

JSONX can generate function, class, dynamic, and form components from JSONX definitions. Use this when component definitions need to be data. For most application code, bundling components normally and registering them through `reactComponents` or `componentLibraries` is simpler and faster.

-  [1. Function Components](#function-component) - Use `jsonx._jsonxComponents.getReactFunctionComponent` and JXM to create React function components with JSON.
-  [2. Class Components](#class-component) - Use `jsonx._jsonxComponents.getReactClassComponent` and JXM to create React class components with JSON.
-  [3. Dynamic Components](#dynamic-component) - Use `jsonx._jsonxComponents.DynamicComponent` to fetch data and render a JSONX component after the data resolves.
-  [4. Form Components](#form-component) - Use `jsonx._jsonxComponents.FormComponent` to create forms with React Hook Form.

## <a name="function-component">1. Function Components </a>

There are two ways to create function components: `jsonx._jsonxComponents.getReactFunctionComponent` and `jsonx._jsonxComponents.makeFunctionComponent`. `makeFunctionComponent` is a shortcut for passing a regular JavaScript function. JSONX reads that function and converts it into the arguments used by `getReactFunctionComponent`.

```TypeScript
function myComponent(){
  const [count,setCount] = useState() // you can use any React hook inside your function
  const exposeprops = {count,setCount}; // define what props should be available to the rendered component
  return {// return JSONX JSON
    component:'div',
    passprops:true, //set to true so you can pass 'count' and 'setCount' to child elements
    children: [
      { component:'span', children:'Clicked Count' },
      {
        component:'input',
        props:{ defaultValue:0 },
        thisprops:{ value:['count'], },
      },
      {
        component:'button',
        __dangerouslyBindEvalProps:{
          onClick(count,setCount){
            setCount(count+1);
          },
        },
        children:'Click me'
      }
    ]
  }
}

jsonx._jsonxComponents.makeFunctionComponent(myComponent) // returns a React function component
```

JSONX exposes `jsonx._jsonxComponents.getReactFunctionComponent` for creating React function components.

```typescript
export function getReactFunctionComponent(
  reactComponent: JXM_JSON,
  functionBody: string,
  options = {},
): ReactComponentLike
```

`getReactFunctionComponent` takes three arguments:
  1. `reactComponent`, which contains the JXM JSON for rendering the function component.
  2. `functionBody`, which is a string body for the function component. If you use hooks or need to expose values from inside the component, assign those values to an `exposeprops` variable.
  3. `options`, which customize `getReactFunctionComponent`.

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

<div class="jsonx-simulator" data-example="function-component"></div>

---
## <a name="class-component">2. Class Components </a>

JSONX exposes `jsonx._jsonxComponents.getReactClassComponent` for creating React class components. `getReactClassComponent` uses `createReactClass`.

```typescript
export function getReactClassComponent(
  reactComponent = {},
  options = {},
): ReactComponentLike
```

`getReactClassComponent` takes two arguments: `reactComponent`, which contains the arguments passed to `createReactClass`, and `options`.

The only required function in the `reactComponent` object is `render`. The render body must be valid JXM JSON. Other lifecycle or helper methods use a `body` value for the function body and an `arguments` array for the function parameters.

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
    body:'console.log("will receive props",{nextProps}); return true;',
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

<div class="jsonx-simulator" data-example="class-component"></div>

---

## <a name="dynamic-component">3. Dynamic Components </a>

JSONX has a helper component called `DynamicComponent`. Use it when a JSONX component needs to fetch data before rendering.

The common use case is a dashboard or page where sections load data independently. `DynamicComponent` handles this without requiring Suspense or lazy loading.

Create a dynamic component with `jsonx._jsonxComponents.DynamicComponent.call`, then register the returned component through `reactComponents`. After the data is fetched, JSONX renders the `jsonx` object passed in the options. The resolved data is available as `resourceprops.DynamicComponentData`.

```typescript
type DynamicOptions = {
  useCache?: boolean;
  cacheTimeout?: number; // milliseconds
  loadingJSONX?: jsonx;
  loadingErrorJSONX?: jsonx;
  cacheTimeoutFunction?: () => void;
  jsonx: jsonx;
  transformFunction?: (data: any) => any;
  fetchURL: string;
  fetchOptions?: any;
  fetchFunction?: (fetchURL: string, fetchOptions?: any) => Promise<any>;
};
```

```typescript
const LoadedStatus = jsonx._jsonxComponents.DynamicComponent.call({}, {
  name: "LoadedStatus",
  fetchURL: "/path/to/some/data",
  jsonx: {
    component: "p",
    resourceprops: {
      _children: ["DynamicComponentData", "result"],
    },
  },
});

jsonx.jsonxRender.call(
  { reactComponents: { LoadedStatus } },
  {
    jsonx: { component: "LoadedStatus" },
    querySelector: "#main",
  },
);
```

### Example Dynamic Components

<div class="jsonx-simulator" data-example="dynamic-component"></div>
---

## <a name="form-component">4. Form Components </a>

JSONX has a helper component called `FormComponent`. `FormComponent` creates forms with [React Hook Form](https://react-hook-form.com/) without requiring another form wrapper.

Form components work by creating a function component that uses the `useForm` hook. You can customize `useForm` with schema validation through Yup or other supported `useForm` options.

Create a form component with `jsonx._jsonxComponents.FormComponent.call`, then register the returned component through `reactComponents`. Pass the form fields through the `formComponent` JXM property. By default, `FormComponent` wraps the fields with `form onSubmit={handleSubmit(props.onSubmit)}`. Replace that wrapper with `formWrapperComponent` when you need custom form markup.

`FormComponent` adds a `ReactHookForm` component library with `Controller` and `ErrorMessage`. Methods returned from the `useForm` hook are bound to `this.reactHookForm`. Use that context when JSONX needs access to registration, errors, or other React Hook Form behavior.

```typescript
type FormOptions = {
  hookFormOptions?: Record<string, unknown>; // settings for react-hook-form's useForm hook
  formComponent: jsonx;
  onSubmit?: (formdata: any) => any;
  formWrapperComponent?: jsonx;
};
```

```typescript
const EmailForm = jsonx._jsonxComponents.FormComponent.call({}, {
  name: "EmailForm",
  onSubmit: (data) => {
    console.log({ submitData: data });
  },
  formComponent: {
    component: "input",
    props: { type: "text", name: "username", placeholder: "username" },
    useformregister: true,
  },
});

const formComponent = jsonx.getReactElement.call(
  { reactComponents: { EmailForm } },
  { component: "EmailForm" },
);
```

### Example Form Components

<div class="jsonx-simulator" data-example="form-component"></div>

---

## [JSONX And JXM Spec](../spec/)
