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

# Using advanced props

JSONX is created so you can create react elements and components with only JSON. Advanced props allow for your components to interact with dynamic data for example:

- referencing stateful properties dynamically
- formatting the output of props
- inserting templates into your JXM Objects

There are six kinds of Advanced Props:

1.  Traverse Props - used to traverse data passed into elements or other dynamic/stateful data and assign values as props
2.  Evaluation Props - used to create function properties or component properties and assign values as props
3.  Format Props - used to format children props for example converting number formats or formatting dates
4.  Utility Props - used to preform functional tasks like inserting external JXM references (template support), or sharing props across components
5.  Display Props - used to decide whether or not to render elements

## Traverse Props

_(thisprops, thisstate, thiscontext, windowprops, resourceprops/asyncprops)_

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

- thisprops - traverse properties on `this.props`
- thisstate - traverse properties on `this.state`
- thiscontext - traverse properties on `this`
- windowprops - traverse properties on `window`
- resourceprops - traverse asynchronous properties passed to components when using JSONX programmatically
- asyncprops - an alias for `resourceprops`

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

## Evaluation Props

_(\_children, **dangerouslyEvalProps, **dangerouslyBindEvalProps, **dangerouslyEvalAllProps, **dangerouslyInsertComponents, **dangerouslyInsertReactComponents, **dangerouslyInsertJSONXComponents, **dangerouslyInsertFunctionComponents, **dangerouslyInsertClassComponents, **functionProps, **windowComponents , **windowComponentProps, **spreadComponent, \_\_spread)_

Evaluation Props are properties that are computed and resolve values onto the `JXM.props` property. They are helpful because in order to interact with dyanamic data and stateful information, they provide a way to describe declaratively how to assign properties onto the `JXM.props` property.

### \_children

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

### **dangerouslyEvalProps, **dangerouslyBindEvalProps and \_\_dangerouslyEvalAllProps

The evaluation properties `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps` and `__dangerouslyEvalAllProps` are properties used to evaluate strings and set the value the property value on a JXM Object.

`__dangerouslyEvalAllProps` will evaluate a string as a function and assign the returned value of the function to the `props` property of a JXM object.
_Note: If passing the value as a string, remember this value has to be an expression, so either a `(({jsonx})=>{})` or `(function({jsonx}){})`. There is one parameter passed into the function, it's the current value of the JXM Object on the jsonx property_

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

### \_\_functionProps (legacy)

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

## Format Props

_( \_\_\_stringifyChildren, _\_\_toStringChildren, _\_\_toNumeral, \_\_\_FromLuxonTimeZone, _\_\_ISOtoLuxonString )\_

Format Props are properties that are used to convert JXM.children values to strings. Format Props are used because the `children` parameter of `React.createElement` can only be a string or an array of React Elements.

### \_\_\_stringifyChildren

The `___stringifyChildren` format property converts the `JXM.children` property to a string by using `JSON.stringify`.

```typescript
const JXM = {
  component: "div",
  children: { "some-non-string": "data" },
  ___stringifyChildren: true
}; // => { component:'div', children: '{"some-non-string":"data"}' };
```

### \_\_\_toStringChildren

The `___toStringChildren` format property converts the `JXM.children` property to a string by calling `toString()`.

```typescript
const JXM = {
  component: "div",
  children: [1, 2, 3, 4],
  ___toStringChildren: true
}; // => { component:'div', children: '1,2,3,4' };
```

### \_\_\_toNumeral

The `___toNumeral` format property converts the `JXM.children` property to a string by calling `numeral(JXM.children).format(JXM.___toNumeral)`. See numeral formatting options on [numeraljs.com](http://numeraljs.com/).

```typescript
const JXM = {
  component: "div",
  children: 15204.39084,
  ___toNumeral: "0,0.00"
}; // => { component:'div', children: '15,204.39' };
```

### \_\_\_JSDatetoLuxonString

The `___JSDatetoLuxonString` format property converts the `JXM.children` property to a string by calling `Luxon.DateTime.fromJSDate(JXM.children).toFormat(JXM.___JSDatetoLuxonString)`. See luxon formatting options from the [luxon formatting docs](https://moment.github.io/luxon/docs/manual/formatting.html).

```typescript
const JXM = {
  component: "div",
  children: new Date("2020-03-03"),
  ___JSDatetoLuxonString: "LLL d, yyyy"
}; // => { component:'div', children: 'Mar 3, 2020' };
```

### \_\_\_ISOtoLuxonString & \_\_\_FromLuxonTimeZone

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

## Utility Props

\_(_\_\_template, passprops, debug)_

## Display Props

_(comparisonprops, comparisonorprops)_

##### comparisionprops

Comparison props are used to contionally show components if they're truthy. They compare an array of left and right side values, if they are all true, the component is rendered. If `comparisonorprops:true` then only one condition needs to be true in order to render the component

```javascript
//and conditions
jsonx = {
  comparisonprops: [
    {
      left: ["bigNum"],
      operation: "lte",
      right: ["smallNum"]
    },
    {
      left: ["smallNum"],
      operation: "<=",
      right: ["bigNum"]
    }
  ]
};
//or conditions
jsonx = {
  comparisonorprops: true,
  comparisonprops: [
    {
      left: ["truthy"],
      operation: "eq",
      right: ["falsey"]
    },
    {
      left: ["smallNum"],
      operation: "eq",
      right: ["smallNum"]
    }
  ]
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
