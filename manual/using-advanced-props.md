# Using Advanced Props

Advanced props let JSONX definitions read dynamic data, format output, render conditionally, and generate component props. Use them when a static JSONX object is not enough.

- Reference stateful properties dynamically.
- Format children before rendering.
- Insert JSONX templates.
- Create function or component props when the input is trusted.

There are six groups of advanced props:

-  [1. Traverse Props](#traverse-props) - used to traverse data passed into elements or other dynamic/stateful data and assign values as props
    - [1.1 resourceprops/asyncprops](#traverse-asyncprops) - assign dynamic data to props
    - [1.2 windowprops](#traverse-windowprops) - assign window variables to props
    - [1.3 thisstate](#traverse-thisstate) - assign stateful data to props
    - [1.4 thiscontext](#traverse-thiscontext) - assign data bound to `this` to props
    - [1.5 thisprops](#traverse-thisprops) - re-assign prop values
-  [2. Evaluation Props](#evaluation-props) - used to create function properties or component properties and assign values as props. Treat these as trusted-input features.
    - [2.1 \_\_dangerouslyEvalProps](#evaluation-dangerouslyevalprops) - evaluate strings as props
    - [2.2 \_\_dangerouslyBindEvalProps](#evaluation-dangerouslybindevalprops) - evaluate strings to generate props that are functions bound to `this`
    - [2.3 \_\_dangerouslyEvalAllProps](#evaluation-dangerouslyevalallprops) - evaluate all props from a string
    - [2.4 \_\_dangerouslyInsertFunctionComponents](#evaluation-dangerouslyinsertfunctioncomponents) - use JSONX to generate a function component as a prop
    - [2.5 \_\_dangerouslyInsertClassComponents](#evaluation-dangerouslyinsertclasscomponents) - use JSONX to generate a class component as a prop
    - [2.6 \_\_dangerouslyInsertComponents](#evaluation-dangerouslyinsertcomponents) - assign React elements to props using JSONX
    - [2.7 \_\_dangerouslyInsertReactComponents](#evaluation-dangerouslyinsertreactcomponents) - assign React elements to props
    - [2.8 \_\_dangerouslyInsertJSONXComponents](#evaluation-dangerouslyinsertjsonxcomponents) - assign React elements to props
    - [2.9 \_children](#evaluation-children) - dynamically override the `children` prop
    - [2.10 \_\_functionProps (legacy)](#evaluation-functionprops) - the old way to assign functions to props
    - [2.11 \_\_windowComponents ](#evaluation-windowcomponents ) - assign window components to props
    - [2.12 \_\_windowComponentProps](#evaluation-windowcomponentprops) - assign props from window components
    - [2.13 \_\_spreadComponent](#evaluation-spreadcomponent) - component mapped over `__spread` data
    - [2.14 \_\_spread](#evaluation-spread) - data used to generate props from an array (e.g. if you have a list)
-  [3. Format Props](#format-props) - used to format children props, for example, converting number formats or formatting dates
    - [3.1 \_\_\_stringifyChildren](#format-stringifychildren) - convert `children` prop to string using JSON.stringify
    - [3.2 \_\_\_toStringChildren](#format-tostringchildren) - convert `children` prop to string using .toString()
    - [3.3 \_\_\_toNumeral](#format-tonumeral) - format number values as strings assigned to `children` prop using Numeral JS
    - [3.4 \_\_\_JSDatetoLuxonString](#format-jsdatetoluxonstring) - format date values as strings assigned to `children` prop using Luxon
    - [3.5 \_\_\_ISOtoLuxonString](#format-isotoluxonstring) - format iso date values as strings assigned to `children` prop using Luxon
    - [3.6 \_\_\_FromLuxonTimeZone](#format-fromluxontimezone) - format date values as strings assigned to `children` prop using Luxon
-  [4. Utility Props](#utility-props) - used to perform functional tasks like inserting external JXM references (template support), or sharing props across components
    - [4.1 \_\_template](#utility-template) - insert jxm objects from external files
    - [4.2 passprops](#utility-passprops) - pass props from parent to children elements
    - [4.3 debug](#utility-debug) - output computed advanced props and debugging information to the console
    - [4.4 test](#utility-test) - output computed advanced props and debugging information as a string
-  [5. Display Props](#display-props) - used to decide whether or not to render elements
    - [5.1 comparisonprops](#display-comparisonprops) - conditionally render elements based on prop values
    - [5.2 comparisonorprops](#display-comparisonorprops) - conditionally render elements flag to use 'or' logic instead of 'and' logic
-  [6. Applied Props](#applied-props) - used to modify other JSONX properties
    - [6.1 useformregister](#applied-useformregister) - insert React Hook Form registration on a JSONX component
    - [6.2 useremoveprops](#applied-useremoveprops) - remove props from component, usually used with passprops
    - [6.3 useincludeprops](#applied-useincludeprops) - include only defined props, usually used with passprops

Do not run untrusted JSONX definitions with evaluation props enabled.

## <a name="traverse-props">1. Traverse Props </a>

_([resourceprops/asyncprops](#traverse-asyncprops), [windowprops](#traverse-windowprops), [thisprops](#traverse-thisprops), [thisstate](#traverse-thisstate), [thiscontext](#traverse-thiscontext))_

Traverse props assign prop values from other objects. For example, you might want an image `alt` prop to use the current browser URL. Because JXM objects are derived from JSON, `window.location.href` cannot be read directly inside the static `props` object.

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

This is where traverse props are useful. The path reads `window.location.href` and assigns that value to `JXM.props.alt`.

Traversing the `window` object is possible by using the `window props` traverse prop. The other traverse props are:

- <a name="traverse-resourceprops">resourceprops</a> - traverse asynchronous properties passed to components when using JSONX programmatically
- <a name="traverse-asyncprops">asyncprops</a> - an alias for `resourceprops`
- <a name="traverse-windowprops">windowprops</a> - traverse properties on `window`
- <a name="traverse-thisprops">thisprops</a> - traverse properties on `this.props`
- <a name="traverse-thisstate">thisstate</a> - traverse properties on `this.state`
- <a name="traverse-thiscontext">thiscontext</a> - traverse properties on `this`

To reference `window.location.href`, use this JXM object:

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

Traverse props assign values to `JXM.props`. The traverse prop key is the prop you want to set. The value is the path to read from the source object. For `window.location.href`, the path is `["location", "href"]`; the source object itself is not included in the path.

Some sample use cases are:

- `resourceprops` traverses the resources object passed to JSONX methods. `asyncprops` is an alias.
- `thisprops` traverses `this.props`.
- `thisstate` traverses `this.state`.
- `thiscontext` traverses the current `this` context.
- `windowprops` traverses the global `window` object.

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
  Renders this JXM object:
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

Evaluation props compute values and merge them onto `JXM.props`. They are useful when JSONX needs to describe how dynamic data, state, or functions become props. Use these only with trusted JSONX input.

### <a name="evaluation-children">\_children</a>

The `_children` evaluation property overrides `JXM.children`. Use it when an advanced prop should provide the rendered children.

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

### <a name="evaluation-dangerouslyevalprops">\_\_dangerouslyEvalProps</a>, <a name="evaluation-dangerouslybindevalprops">\_\_dangerouslyBindEvalProps</a>, and <a name="evaluation-dangerouslyevalallprops">\_\_dangerouslyEvalAllProps</a>

The evaluation properties `__dangerouslyEvalProps`, `__dangerouslyBindEvalProps`, and `__dangerouslyEvalAllProps` evaluate strings or functions and assign the result to a JXM object.

`__dangerouslyEvalAllProps` evaluates a string as a function and assigns the return value to `props`.
_Note: When the value is a string, it must be an expression such as `(({ jsonx }) => ({}))` or `(function({ jsonx }) { return {}; })`. JSONX passes the current JXM object through the `jsonx` property._

`__dangerouslyEvalProps` evaluates each string value and assigns the result to `JXM.props`. The string must be a valid JavaScript expression. If you evaluate an object literal, wrap it in parentheses: `({ some: "obj" })`. If `__dangerouslyEvalProps` is a function, JSONX calls it with `{ jsonx }`.

`__dangerouslyBindEvalProps` assigns functions to JXM prop values. This is usually for _onClick_ and _onChange_ handlers. Each value must resolve to a function because JSONX binds the function to the current `this` context.

These props exist for cases where JSONX is delivered as JSON and JavaScript functions cannot be included directly. Use them sparingly. In many cases, it is better to register functions in code and reference them through `thiscontext` or another traverse prop.

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

`__spreadComponent` maps one JSONX component over the data in `JXM.__spread`. Each item in the `JXM.__spread` array is passed into the child component as `JXM.__item`. `JXM.__spread` is usually assigned with a traverse prop.

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

### <a name="evaluation-dangerouslyinsertfunctioncomponents">\_\_dangerouslyInsertFunctionComponents</a>, <a name="evaluation-dangerouslyinsertclasscomponents">\_\_dangerouslyInsertClassComponents</a>, <a name="evaluation-dangerouslyinsertcomponents">\_\_dangerouslyInsertComponents</a>, <a name="evaluation-dangerouslyinsertreactcomponents">\_\_dangerouslyInsertReactComponents</a>, <a name="evaluation-dangerouslyinsertjsonxcomponents">\_\_dangerouslyInsertJSONXComponents</a>, <a name="evaluation-windowcomponents">\_\_windowComponents</a>, and <a name="evaluation-windowcomponentprops">\_\_windowComponentProps</a>

Component evaluation props assign React elements or components to props. This pattern is common in charting libraries, where a chart accepts a custom label, tick, or tooltip component as a prop.

The most common pattern is a function component passed as a prop. Passing function or class components through JSONX requires the generated component helpers. Read [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/) for more information.

### Example Evaluation Props

<table style="border:0; width:100%">
  <tr>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/soec2z5w/13/embedded/js,html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
    <td style="padding:0"><iframe width="100%" height="300" src="https://jsfiddle.net/yawetse/soec2z5w/13/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </td>
  </tr>
</table>

### <a name="evaluation-functionprops">\_\_functionProps</a> (legacy)

The evaluation prop `__functionProps` is a legacy way to assign functions to `JXM.props`. Prefer the newer evaluation props for new work.

#### predefined functions (legacy)

`__functionProps` can assign functions that exist on `this.props`, such as `this.props.reduxRouter.push`, or functions that exist on `window`, such as `window.console.log`.

Properties are assigned by reading a function path from a string prefixed with `func:`. Function props merge onto `jsonx.props` after each function string resolves.

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

`__functionProps` can also generate functions from strings. This legacy approach is more cumbersome than `__dangerouslyEvalProps` or `__dangerouslyBindEvalProps`. Define the function body at `JXM.__inline[name]`, then reference it from `__functionProps` with `func:inline.name`. Use `__functionargs` to bind `JXM.props` values to inline function arguments.

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

_([___stringifyChildren](#format-stringifychildren), [___toStringChildren](#format-tostringchildren), [___toNumeral](#format-tonumeral), [___JSDatetoLuxonString](#format-jsdatetoluxonstring), [___ISOtoLuxonString](#format-isotoluxonstring), [___FromLuxonTimeZone](#format-fromluxontimezone))_

Format props convert `JXM.children` values to strings. They are useful when raw values need display formatting before React receives them as children.

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

The `___ISOtoLuxonString` format property converts the `JXM.children` property to a string by calling `Luxon.DateTime.fromISO(JXM.children).toFormat(JXM.___ISOtoLuxonString)`. Set the time zone with the `___FromLuxonTimeZone` format prop. See Luxon formatting options in the [Luxon formatting docs](https://moment.github.io/luxon/docs/manual/formatting.html).

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

_([__template](#utility-template), [passprops](#utility-passprops), [debug](#utility-debug), [test](#utility-test))_

Utility props support rendering behavior without directly becoming regular React props.

### <a name="utility-debug">debug</a>
The `debug` flag logs the `JXM` object and computed advanced props when `JXM.debug === true`.

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
### <a name="utility-test">test</a>
The `test` flag outputs the calculated render data as a string when `JXM.test === true`.

```typescript
const JXM = {
    component: 'div',
    children: 'Test JXM Data',
    test:true,
};

//outputs as a string component:
/* {
  element: "div",
  children: "Debug JXM Data",
  test: true
}*/
```

### <a name="utility-passprops">passprops</a>
The `passprops` flag passes props from the parent `JXM` object to each child JXM object except `JXM.props.style`.

```typescript
const JXM = {
  component: 'div',
  props:{
    type:'radio',
    size:'large',
    extraOne:'ok',
    title:'my radio',
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
    size:'large',
    extraOne:'ok',
    title:'my radio',
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
        size:'large',
        extraOne:'ok',
        title:'my radio',
      },
    }
  ]
};
*/
```

You can pass only selected props by listing the prop names.
```javascript
const JXM = {
  component: 'div',
  props:{
    type:'radio',
    size:'large',
    title:'my radio',
    style:{
      background:'red'
    }
  },
  passprops:['type','title'],
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
    size:'large',
    extraOne:'ok',
    title:'my radio',
    style:{
      background:'red'
    }
  },
  passprops:['type','title'],
  children:[
    {
      component:'input',
      props:{
        type:'radio',
        title:'my radio',
      },
    }
  ]
};
*/
```

### <a name="utility-template">___template</a>
The `___template` advanced prop loads JXM objects from an external file. It is mainly useful on the server. It can also load a URL in the browser, but that browser request is synchronous.

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

Display props determine whether a React element rendered from a JXM object should be shown. They add conditional rendering based on prop values.

### [comparisonprops](#display-comparisonprops) and [comparisonorprops](#display-comparisonorprops)

The display prop `comparisonprops` conditionally renders elements when comparisons pass. By default, every comparison must be true. If `JXM.comparisonorprops` is true, only one comparison needs to be true.

Comparison values can be literal values or references to `JXM.props` values. References use the same path-array format as traverse props, with `JXM.props` as the source object.

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
## <a name="applied-props">6. Applied Props</a>

_([useformregister](#applied-useformregister), [useremoveprops](#applied-useremoveprops), [useincludeprops](#applied-useincludeprops))_

Applied props are helper properties that modify other JSONX properties.

### [useformregister](#applied-useformregister)

The applied prop `useformregister` passes a React Hook Form register function to a component. It avoids manually wiring the form reference.

```javascript
jsonx = {
  component: "input",
  props:{
    name:'firstName',
  },
  useformregister: true,
};

// is equivalent to
jsonx = {
  component: "input",
  props:{
    name:'firstName',
  },
  thiscontext:{
    ref: ['reactHookForm', 'register']
  },
};
```
### [useremoveprops](#applied-useremoveprops)

The applied prop `useremoveprops` removes a list of props from the JXM object. It is usually used with `passprops` when child components should not receive every parent prop.

```javascript
jsonx = {
  component: "input",
  props:{
    name:'firstName',
    removeThis:true,
    extraProp:'remove me',
  },
  useremoveprops: ['removeThis','extraProp'],
};

// is equivalent to
jsonx = {
  component: "input",
  props:{
    name:'firstName',
  },
};
```

### [useincludeprops](#applied-useincludeprops)

The applied prop `useincludeprops` removes all props from the JXM object except the listed props. It is usually used with `passprops` when a child component should receive only a small prop set.

```javascript
jsonx = {
  component: "input",
  props:{
    name:'firstName',
    removeThis:true,
    extraProp:'remove me',
    keepMe:'just this prop',
  },
  useincludeprops: ['keepMe'],
};

// is equivalent to
jsonx = {
  component: "input",
  props:{
    keepMe:'just this prop',
  },
};
```
---

## Next: [External And Custom Components](../using-external-and-custom-components/)
