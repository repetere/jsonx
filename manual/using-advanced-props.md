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

# Using advanced props

JSONX is created so you can create react elements and components with only JSON. Advanced props allow for your components to interact with dynamic data for example:

- referencing stateful properties dynamically
- formatting the output of props
- inserting templates into your JXM Objects

There are five kinds of Advanced Props (Traverse, Evaluation, Format, Display and Utility props):

-  [1. Traverse Props](#traverse-props) - used to traverse data passed into elements or other dynamic/stateful data and assign values as props
    - [1.1 resourceprops/asyncprops](#traverse-asyncprops) - assign dynamic data to props
    - [1.2 windowprops](#traverse-windowprops) - assign window variables to props
    - [1.3 thisstate](#traverse-thisstate) - assign stateful data to props
    - [1.4 thiscontext](#traverse-thiscontext) - assign data bound to `this` to props
    - [1.5 thisprops](#traverse-thisprops) - re-assign prop values
-  [2. Evaluation Props](#evaluation-props) - used to create function properties or component properties and assign values as props
    - [2.1 \_\_dangerouslyEvalProps](#evaluation-dangerouslyevalprops) - evaluate strings as props
    - [2.2 \_\_dangerouslyBindEvalProps](#evaluation-dangerouslybindevalprops) - evaluate strings to generate props that are functions bound to `this`
    - [2.3 \_\_dangerouslyEvalAllProps](#evaluation-dangerouslyevalallprops) - evaluate all props from a string
    - [2.4 \_\_dangerouslyInsertFunctionComponents](#evaluation-dangerouslyinsertfunctioncomponents) - use JSONX to generate a function component as a prop
    - [2.5 \_\_dangerouslyInsertClassComponents](#evaluation-dangerouslyinsertclasscomponents) - use JSONX to generate a class component as a prop
    - [2.6 \_\_dangerouslyInsertComponents](#evaluation-dangerouslyinsertcomponents) - assign React Elements to props using JSONX
    - [2.7 \_\_dangerouslyInsertReactComponents](#evaluation-dangerouslyinsertreactcomponents) - assign React Elements to props
    - [2.8 \_\_dangerouslyInsertJSONXComponents](#evaluation-dangerouslyinsertjsonxcomponents) - assign React Elements to props
    - [2.9 \_children](#evaluation-children) - dynamically override the `children` prop
    - [2.10 \_\_functionProps (legacy)](#evaluation-functionprops) - the old way to assign functions to props
    - [2.11 \_\_windowComponents ](#evaluation-windowcomponents ) - assign window components to props
    - [2.12 \_\_windowComponentProps](#evaluation-windowcomponentprops) - assign props of window components assign to props
    - [2.13 \_\_spreadComponent](#evaluation-spreadcomponent) - component mapped over `__spread` data
    - [2.14 \_\_spread](#evaluation-spread) - data used to generate props from an array (e.g. if you have a list)
-  [3. Format Props](#format-props) - used to format children props for example converting number formats or formatting dates
    - [3.1 \_\_\_stringifyChildren](#format-stringifychildren) - convert `children` prop to string using JSON.stringify
    - [3.2 \_\_\_toStringChildren](#format-tostringchildren) - convert `children` prop to string using .toString()
    - [3.3 \_\_\_toNumeral](#format-tonumeral) - format number values as strings assigned to `children` prop using Numeral JS
    - [3.4 \_\_\_JSDatetoLuxonString](#format-jsdatetoluxonstring) - format date values as strings assigned to `children` prop using Luxon
    - [3.5 \_\_\_ISOtoLuxonString](#format-isotoluxonstring) - format iso date values as strings assigned to `children` prop using Luxon
    - [3.6 \_\_\_FromLuxonTimeZone](#format-fromluxontimezone) - format date values as strings assigned to `children` prop using Luxon
-  [4. Utility Props](#utility-props) - used to preform functional tasks like inserting external JXM references (template support), or sharing props across components
    - [4.1 \_\_template](#utility-template) - insert jxm objects from external files
    - [4.2 passprops](#utility-passprops) - pass props from parent to children elements
    - [4.3 debug](#utility-debug) - output computed advanced props and debugging information to the console
-  [5. Display Props](#display-props) - used to decide whether or not to render elements
    - [5.1 comparisonprops](#display-comparisonprops) - conditionally render elements based on prop values
    - [5.2 comparisonorprops](#display-comparisonorprops) - conditionally render elements flag to use 'or' logic instead of 'and' logic


## <a name="traverse-props">1. Traverse Props </a>

_([resourceprops/asyncprops](#traverse-asyncprops), [windowprops](#traverse-windowprops), [thisprops](#traverse-thisprops), [thisstate](#traverse-thisstate), [thiscontext](#traverse-thiscontext))_

Traversed Props are used to assign props values from different objects. For example if you wanted to set the alt text of an image tag from the url of the window, because JXM objects are JSON it's impossible to get the dynamic value `window.location.href` and assign it to the alt prop.

```JavaScript
//assume window.location.href = http://example.com

const JXM = {
  component:'img',
  props:{
    src:'path/to/some/image',
    alt: // ??? http://example.com
  }
};
```

This is where traverse props are useful, for accessing `window.location.href` you want to traverse the `window` property and assign the `href` property from `window.location` to the `JXM.props.alt` property.

Traversing the `window` object is possibly by using the `windowprops` traverse prop. The other traverse props are:

- <a name="traverse-resourceprops">resourceprops</a> - traverse asynchronous properties passed to components when using JSONX programmatically
- <a name="traverse-asyncprops">asyncprops</a> - an alias for `resourceprops`
- <a name="traverse-windowprops">windowprops</a> - traverse properties on `window`
- <a name="traverse-thisprops">thisprops</a> - traverse properties on `this.props`
- <a name="traverse-thisstate">thisstate</a> - traverse properties on `this.state`
- <a name="traverse-thiscontext">thiscontext</a> - traverse properties on `this`

To properly reference `window.location.href` the following JXM Object would work

```JavaScript
const JXM = {
 component:'img',
 props:{
   src:'path/to/some/image',
 },
 windowprops:{
   alt:['location','href']
 }
}
```

Traverse props assign properties to `JXM.props` object by defining what property you want to set on `JXM.props` as the traverse prop name and passing an array to the property value you want. So for a window's location (`window.location.href`) the property value is accessed by an array to the href `['location','href']` where you omit the transverse object from the array path.

Some sample use cases are:

- Resourceprops transverse an object that is manually passed (usually as a result of an asynchronous fetch all - hence the name asyncprops).
- Thisprops transverses anything bound to `this.props`, a good example would be if you're storing and passing a user object on `this.props.username`, pulling the username would be where you would use thisprops.
- Thisstate transverses anything bound to `this.state`, for example if you're updating the state of a component based on user input from a text field `this.state.value`, pulling the value would be where you would use thisstate.
- Thiscontext transverses anything bound to `this`, a good example is if you're using JSONX programatically and you want to bind functionality to the render methods.
- And like the previous example windowprops transverse anything on the global window object, like the current page location `window.location.href`.

```javascript
// programmatic example
import * as jsonx from "jsonx";

async function main() {
  const response = await fetch("/path/to/userdata");
  const asyncUserData = await response.json();
  /*
  asyncUserData = {
    user: {
      name: 'jsonx',
      description: 'react without javascript',
    },
    stats: {
      logins: 102,
      comments: 3,
    },
    authentication: 'OAuth2',
  };
  */
  const JXM = {
    component: "div",
    props: {
      id: "generatedJSONX",
      className: "jsonx"
    },
    resourceprops: {
      auth: ["authentication"],
      username: ["user", "name"]
    },
    children: [
      {
        component: "p",
        props: {
          style: {
            color: "red",
            fontWeight: "bold"
          }
        },
        asyncprops: {
          title: ["user", "description"]
        },
        children: "hello world"
      }
    ]
  };

  //render something silly
  jsonx.jsonxRender(JXM, asyncUserData);
  /*
  Renders this JXM Object:
  JXM = {
    component: 'div',
    props: {
      id: 'generatedJSONX',
      className:'jsonx',
      auth: 'OAuth2',
      username: 'jsonx',
    },
    children: [
      {
        component: 'p',
        props: {
          style: {
            color: 'red',
            fontWeight:'bold',
          },
          title:'react without javascript',
        },
        children:'hello world',
      },
    ],
  };
  */
}

main();
```

### Example Traverse Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/pz845dk9/4/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/pz845dk9/4/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="evaluation-props">2. Evaluation Props </a>

_([\_\_dangerouslyEvalProps](#evaluation-dangerouslyevalprops), [\_\_dangerouslyBindEvalProps](#evaluation-dangerouslybindevalprops), [\_\_dangerouslyEvalAllProps](#evaluation-dangerouslyevalallprops), [\_\_dangerouslyInsertFunctionComponents](#evaluation-dangerouslyinsertfunctioncomponents), [\_\_dangerouslyInsertClassComponents](#evaluation-dangerouslyinsertclasscomponents), [\_\_dangerouslyInsertComponents](#evaluation-dangerouslyinsertcomponents), [\_\_dangerouslyInsertReactComponents](#evaluation-dangerouslyinsertreactcomponents), [\_\_dangerouslyInsertJSONXComponents](#evaluation-dangerouslyinsertjsonxcomponents), [\_children](#evaluation-children), [\_\_functionProps (legacy)](#evaluation-functionprops), [\_\_windowComponents ](#evaluation-windowcomponents), [\_\_windowComponentProps](#evaluation-windowcomponentprops), [\_\_spreadComponent](#evaluation-spreadcomponent), [\_\_spread](#evaluation-spread))_

Evaluation Props are properties that are computed and resolve values onto the `JXM.props` property. They are helpful because in order to interact with dyanamic data and stateful information, they provide a way to describe declaratively how to assign properties onto the `JXM.props` property.

### <a name="evaluation-children">\_children</a>

The `_children` evaluation property is used to override the value of `JXM.children` and is usually only used when you want to dynamically set the value of the `children` property from an advanced property.

```javascript
//current URL: http://example.com
const JXMWindowLocation = {
  component: "p",
  windowprops: {
    _children: ["location", "href"]
  }
};
// computes: { component:'p', children:'http://example.com', }
```

### <a name="evaluation-dangerouslyevalprops">\_\_dangerouslyEvalProps</a>, <a name="evaluation-dangerouslybindevalprops">\_\_dangerouslyBindEvalProps</a> ,and <a name="evaluation-dangerouslyevalallprops">\_\_dangerouslyEvalAllProps</a>

The evaluation properties `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps` and `__dangerouslyEvalAllProps` are properties used to evaluate strings and set the value the property value on a JXM Object.

`__dangerouslyEvalAllProps` will evaluate a string as a function and assign the returned value of the function to the `props` property of a JXM object.
_Note: If passing the value as a string, remember this value has to be an expression, so either a `(({jsonx})=>({}))` or `(function({jsonx}){})`. There is one parameter passed into the function, it's the current value of the JXM Object on the jsonx property_

`__dangerouslyEvalProps` is used to evaluate the string value and assign it to the JXM.props value, the string must be a valid javascript expression _(Tip, if evaluting an object remember to wrap it ({some:'obj', }) )_. If `__dangerouslyEvalProps` is a function, it will assign the value of the function called with one parameter `{jsonx}`.

`__dangerouslyBindEvalProps` is used to assign functions to JXM object props values. This is usually for _onClick_ and _onChange_ functions. Each property of `__dangerouslyBindEvalProps` has to be a function, because it's attempts to assign the value as a function with `this` bound to it.

The reason why these functions exist are because there are instances where JSONX is delivered via JSON and JavaScript functions are not valid JSON values. This is typically used sparingly when JXM is sent server side. In practice there are many ways to pass functions as values (especially if they are bound to JSONX, then you can always reference functions by access properties off of `this` by using `thiscontext`).

### Example Evaluation Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/n704z65x/7/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/n704z65x/7/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

### <a name="evaluation-spreadcomponent">\_\_spreadComponent</a> and <a name="evaluation-spread">\_\_spread</a>

The `__spreadComponent` advanced prop is a component that maps over the `JXM.__spread` prop. Typically `__spreadComponent` props are used to list data from an array. Each element of the `JXM.__spread` array is passed into the child `__spreadComponent` as `JXM.__item` . `JXM.__spread` is usually set using a traverse prop to assign the property property.

```typescript
const JXM = {
  component: 'ul',
  props:{
    __spread: [
      {
        name:'bob smith',
        email:'bob.smith@email.com'
      },
      {
        name:'jane doe',
        email:'jane.doe@email.com'
      },
      {
        name:'billy bob',
        email:'billy.bob@email.com'
      },
    ],
  },
  __spreadComponent:{
    component:'li',
    thisprops:{
      _children:['__item','name']
    }
  },
}; 
/* => { 
  component:'ul', children: [
    {
      component:'li', children:'bob smith',
    },
    {
      component:'li', children:'jane doe',
    },
    {
      component:'li', children:'billy bob',
    }
  ] 
};*/
```

### Example Evaluation Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/e5au6td1/2/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/e5au6td1/2/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

### <a name="evaluation-dangerouslyinsertfunctioncomponents">\_\_dangerouslyInsertFunctionComponents</a>, <a name="evaluation-dangerouslyinsertclasscomponents">\_\_dangerouslyInsertClassComponents</a>, <a name="evaluation-dangerouslyinsertcomponents">\_\_dangerouslyInsertComponents</a>, <a name="evaluation-dangerouslyinsertreactcomponents">\_\_dangerouslyInsertReactComponents</a>, <a name="evaluation-dangerouslyinsertjsonxcomponents">\_\_dangerouslyInsertJSONXComponents</a>, <a name="evaluation-windowcomponents">\_\_windowComponents</a>, <a name="evaluation-windowcomponentprops">\_\_windowComponentProps</a>,

The component evaluation props all assign React Elements to props. This pattern is very common in charting libraries when you need to customize labels. Typically you would assign a custom component to a prop and the component you are using would insert the customized component appropriately.

The most common pattern is a function component as a prop. Using function components or class components as props requires understanding how to create components with JSONX. Read [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html) for more information.

### Example Evaluation Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/yawetse/soec2z5w/13/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/yawetse/soec2z5w/13/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>


### <a name="evaluation-functionprops">\_\_functionProps</a> (legacy)

The evaluation prop `__functionProps` is another way to assign a function value to a property in `JXM.props`. There are two ways of using `__functionProps`, one way for predefined functions and another way for dynamic functions. Using `__functionProps` may be deprecated in the future.

#### predefined functions (legacy)

`__functionProps` can assign values from functions that exist on `this.props` (e.g. using something like react-router and accessing this.props.reduxRouter.push) or functions that exist on the `window` object (like window.console.log).

Properties are assigned by using the value of the function by access the propery as a string, prefixed with "func:". Function props merge onto jsonx.props after evaluating each functon string.

```javascript
const JXM = {
  component: "button",
  props: {
    name: "test"
  },
  __functionProps: {
    onclick: "func:this.props.onClick", // if there's already a defined onClick Function
    printPage: "func:window.print",
    nav: "func:this.props.reduxRouter.push"
  }
};
```

#### inline functions (legacy)

`__functionProps` can also generate functions from a string in a much less elegant way than using `__dangerouslyEvalProps` or `__dangerouslyBindEvalProps`. It's very cumbersome but you define the string of the function body `JXM.__inline[name-of-func]` and reference the function on `__functionProps` by prefixing the function with `func:inline` (e.g. `JXM.__functionProps[func:inline[name-of-function]]`). You can also use the `__functionargs` advanced props to bind `JXM.prop` properties to parameters of the inline function.

```javascript
const JXM = {
  component: "button",
  props: {
    name: "test"
  },
  __functionargs: {
    onClick: ["name"]
  },
  __inline: {
    onClick: ` window.alert("the name of this component from the prop is:" +arguments[0])`
  },
  __functionProps: {
    onClick: "func:inline.onClick"
  }
};
```

### Example Evaluation Props \_\_functionProps

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/34ngdzyh/3/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/34ngdzyh/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="format-props">3. Format Props </a>

_([___stringifyChildren](#format-stringifychildren), [___toStringChildren](#format-tostringchildren), [___toNumeral](#format-tonumeral), [____JSDatetoLuxonString](#format-jsdatetoluxonstring), [___ISOtoLuxonString](#format-isotoluxonstring), [___FromLuxonTimeZone](#format-fromluxontimezone))_

Format Props are properties that are used to convert JXM.children values to strings. Format Props are used because the `children` parameter of `React.createElement` can only be a string or an array of React Elements.

### <a name="format-stringifychildren">\_\_\_stringifyChildren</a>

The `___stringifyChildren` format property converts the `JXM.children` property to a string by using `JSON.stringify`.

```typescript
const JXM = {
  component: "div",
  children: { "some-non-string": "data" },
  ___stringifyChildren: true
}; // => { component:'div', children: '{"some-non-string":"data"}' };
```

### <a name="format-tostringchildren">\_\_\_toStringChildren</a>

The `___toStringChildren` format property converts the `JXM.children` property to a string by calling `toString()`.

```typescript
const JXM = {
  component: "div",
  children: [1, 2, 3, 4],
  ___toStringChildren: true
}; // => { component:'div', children: '1,2,3,4' };
```

### <a name="format-tonumeral">\_\_\_toNumeral</a>

The `___toNumeral` format property converts the `JXM.children` property to a string by calling `numeral(JXM.children).format(JXM.___toNumeral)`. See numeral formatting options on [numeraljs.com](http://numeraljs.com/).

```typescript
const JXM = {
  component: "div",
  children: 15204.39084,
  ___toNumeral: "0,0.00"
}; // => { component:'div', children: '15,204.39' };
```

### <a name="format-jsdatetoluxonstring">\_\_\_JSDatetoLuxonString</a>

The `___JSDatetoLuxonString` format property converts the `JXM.children` property to a string by calling `Luxon.DateTime.fromJSDate(JXM.children).toFormat(JXM.___JSDatetoLuxonString)`. See luxon formatting options from the [luxon formatting docs](https://moment.github.io/luxon/docs/manual/formatting.html).

```typescript
const JXM = {
  component: "div",
  children: new Date("2020-03-03"),
  ___JSDatetoLuxonString: "LLL d, yyyy"
}; // => { component:'div', children: 'Mar 3, 2020' };
```

### <a name="format-isotoluxonstring">\_\_\_ISOtoLuxonString</a> & <a name="format-fromluxontimezone">\_\_\_FromLuxonTimeZone</a>

The `___ISOtoLuxonString` format property converts the `JXM.children` property to a string by calling `Luxon.DateTime.fromISO(JXM.children).toFormat(JXM.___ISOtoLuxonString)`. You can set the timezone of the ISO string by using the `___FromLuxonTimeZone` format Prop. See luxon formatting options from the [luxon formatting docs](https://moment.github.io/luxon/docs/manual/formatting.html).

```typescript
const JXM_NY = {
  component: "div",
  children: "2020-03-03T14:30:00.000Z",
  ___ISOtoLuxonString: "ff",
  ___FromLuxonTimeZone: "America/New_York"
}; // => { component:'div', children: 'Mar 3, 2020, 9:30 AM' };

const JXM_LA = {
  component: "div",
  children: "2020-03-03T14:30:00.000Z",
  ___ISOtoLuxonString: "ff",
  ___FromLuxonTimeZone: "America/Los_Angeles"
}; // => { component:'div', children: 'Mar 3, 2020, 6:30 AM' };
```

### Example Format Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/5ypaotu6/3/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/5ypaotu6/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="utility-props">4. Utility Props</a>

_([__template](#utility-template), [passprops](#utility-passprops), [debug](#utility-debug))_

Utility props generally do not mutate `JXM.props` but are used augment the expected behaviour of JSONX.

### <a name="utility-debug">debug</a>
The debug flag outputs the value of the `JXM` object where `JXM.debug === true` and the value of all of the computed advanced props as well.

```typescript
const JXM = {
    component: 'div',
    children: 'Debug JXM Data',
    __dangerouslyEvalAllProps:`(
      ()=>({ style:{ color:"blue" } })
    )`,
    debug:true,
};

//outputs to console:
/* { 
  jsonx: {
    component: "div",
    children: "Debug JXM Data",
    __dangerouslyEvalAllProps: "(()=>({ style:{ color:"blue" } }))"
    debug: true
  },
  {
    computedProps: {
      style: {color: "blue"}
    }
  }
}*/
```

### <a name="utility-passprops">passprops</a>
The passprops flag passess the props from the parent `JXM` object to each `JXM.children` JXM Object except for the `JXM.props.style` property.

```typescript
const JXM = {
  component: 'div',
  props:{
    type:'radio',
    style:{
      background:'red'
    }
  },
  passprops:true,
  children:[
    {
      component:'input',
    }
  ]
};

/* computes:
const JXM = {
  component: 'div',
  props:{
    type:'radio',
    style:{
      background:'red'
    }
  },
  passprops:true,
  children:[
    {
      component:'input',
      props:{
        type:'radio',
      },
    }
  ]
};
*/
```

### <a name="utility-template">___template</a>
The `___template` advanced prop (should really only be used server side but works in the browser too) will load JXM objects from an external file (or URL client side - note in the browser this is a synchronous request).

```typescript

const JXM = {
  component:'div',
  ___template:'path/to/some/jxm/json/file'
}
// path/to/some/jxm/json/file = { component: "section", children: "from external template"}
/* computes: 
{
  component:'div',
  children:[{ component: "section", children: "from external template"}]
}
*/

```

### Example Utility Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/gbeatwp2/3/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/gbeatwp2/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

---

## <a name="display-props">5. Display Props</a>

_([comparisonprops](#display-comparisonprops), [comparisonorprops](#display-comparisonorprops))_

Display Props are properties that are used to determine if a React Element rendered from a JXM Object should be rendered. Display props enable conditional logic based of the value of props to determine if an element should be shown.

### [comparisonprops](#display-comparisonprops) and [comparisonorprops](#display-comparisonorprops)

The display prop `comparisionprops` is used to contionally show elements if all of the comparisions are truthy. `comparisonprops` works by comparing an array of left and right side values, if they are all true, the component is rendered. If `JXM.comparisonorprops` is set to true then only one condition needs to be true in order to render the component.

The comparison values can either be literal values or the value can be a reference to any `JXM.props` value. References to values in `JXM.props` are accessed in the same way you would use traverse props, where the prop being traversed is `JXM.props`.

```javascript
//and conditions
jsonx = {
  component: "div",
  children: "evals to false, so it will not render",
  comparisonprops: [
    {
      left: ["bigNum"],
      operation: "lte",
      right: ["smallNum"]
    }, // false (10000 <= 100)
    {
      left: ["smallNum"],
      operation: "<=",
      right: ["bigNum"]
    } // true (100 <= 10000)
  ] // false and true === false, so it won't render
};
//or conditions
jsonx = {
  component: "div",
  children: "evals to true, so this will render",
  comparisonorprops: true,
  comparisonprops: [
    {
      left: ["truthy"],
      operation: "eq",
      right: ["falsey"]
    }, // = false
    {
      left: ["smallNum"],
      operation: "eq",
      right: ["smallNum"]
    } // true
  ] // false or true === true, so render element
};

// All comparison operations
switch (opscompares.operation) {
  case "eq":
  case "==":
    return opscompares.left == opscompares.right;
  case "dneq":
  case "!=":
  case "!":
    return opscompares.left !== opscompares.right;
  case "dnseq":
  case "!==":
    return opscompares.left !== opscompares.right;
  case "seq":
  case "===":
    return opscompares.left === opscompares.right;
  case "lt":
  case "<":
    return opscompares.left < opscompares.right;
  case "lte":
  case "<=":
    return opscompares.left <= opscompares.right;
  case "gt":
  case ">":
    return opscompares.left > opscompares.right;
  case "gte":
  case ">=":
    return opscompares.left >= opscompares.right;
  case "dne":
  case "undefined":
  case "null":
    return opscompares.left === undefined || opscompares.left === null;
  case "!null":
  case "!undefined":
  case "exists":
  default:
    //'exists'
    return opscompares.left !== undefined && opscompares.left !== null;
}
```

### Example Display Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/jn7L54x1/4/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/jn7L54x1/4/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

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
