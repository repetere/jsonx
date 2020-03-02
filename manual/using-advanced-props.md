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
 1. Traverse Props - used to traverse data passed into elements or other dynamic/stateful data and assign values as props
 2. Evaluation Props - used to create function properties or component properties and assign values as props
 3. Format Props - used to format children props for example converting number formats or formatting dates
 4. Utility Props - used to preform functional tasks like inserting external JXM references (template support), or sharing props across components 
 5. Display Props - used to decide whether or not to render elements

## Traverse Props (thisprops, thisstate, thiscontext, windowprops, resourceprops/asyncprops)

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
    alt:['location','href]
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
import * as jsonx from 'jsonx';

async function main(){

  const response = await fetch('/path/to/userdata');
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
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
  },
  resourceprops:{
    auth: [ 'authentication', ],
    username: [ 'user', 'name', ],
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
      },
      asyncprops:{
        title: ['user','description']
      },
      children:'hello world',
    },
  ],
};

  //render something silly
  jsonx.jsonxRender(JXM,asyncUserData);
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

## Evaluation Props (_children, __dangerouslyEvalProps, __dangerouslyBindEvalProps, __dangerouslyInsertComponents, __dangerouslyInsertReactComponents, __dangerouslyInsertJSONXComponents, __dangerouslyInsertFunctionComponents, __dangerouslyInsertClassComponents, __dangerouslyEvalAllProps, __functionProps, __windowComponents , __windowComponentProps, __spreadComponent)

##### __dangerouslyEvalProps / __dangerouslyBindEvalProps

The only difference between `__dangerouslyEvalProps` and `__dangerouslyBindEvalProps` is each  `__dangerouslyBindEvalProps` has to be a function, because it's returned as the bound instance of the function with `this`.

```javascript
 const testVals = {
    auth: 'true',
    username: '()=>(user={})=>user.name',
  };
  const testJSONX = Object.assign({}, sampleJSONX, {
    __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
      email: '(function getUser(user={}){ return this.testBound(); })',
    },
  });
  const JSONXP = getEvalProps.call({ testBound: () => 'bounded', }, { jsonx: testJSONX, });
  const evalutedComputedFunc = JSONXP.username({ name: 'bob', });
  const evalutedComputedBoundFunc = JSONXP.email({ email:'test@email.domain', });
  // expect(JSONXP.auth).to.be.true;
  // expect(evalutedComputedFunc).to.eql('bob');
  // expect(evalutedComputedBoundFunc).to.eql('bounded');
```

##### __functionProps

Function props merge onto jsonx.props after evaluating each functon string.

```javascript
const thisProp = {
  debug: true,
  window: {
    print: () => 'printed',
    localStorage: {
      getItem:()=>'gotItem',
    },
  },
  props: {
    onClick:()=>'clicked',
    reduxRouter: {
      push:()=>'pushed',
      pop:()=>'poped',
    },
  },
};
const jsonxTest = {
  component:'div',
  props: {
    name:'test',
  },
  __functionProps: {
    onclick:'func:this.props.onClick',
    printPage: 'func:window.print',
    nav:'func:this.props.reduxRouter.push',
  },
};
const jsonxObj = getFunctionProps.call(thisProp, {
  jsonx: jsonxTest,
});
expect(jsonxObj).is.an('object');
expect(Object.keys(jsonxObj)).to.eql(Object.keys(jsonxTest.__functionProps));
expect(jsonxObj.onclick()).to.eq('clicked');
expect(jsonxObj.printPage()).to.eql('printed');
expect(jsonxObj.nav()).to.eql('pushed');
```

##### comparisionprops

Comparison props are used to contionally show components if they're truthy. They compare an array of left and right side values, if they are all true, the component is rendered. If `comparisonorprops:true` then only one condition needs to be true in order to render the component

```javascript
//and conditions
jsonx={
  comparisonprops: [{
    left: ['bigNum',],
    operation:'lte',
    right:['smallNum',],
  },{
    left: ['smallNum',],
    operation:'<=',
    right:['bigNum',],
  }],
}
//or conditions
jsonx={
  comparisonorprops:true,
  comparisonprops: [{
    left: ['truthy',],
    operation:'eq',
    right:['falsey',],
  },{
    left: ['smallNum',],
    operation:'eq',
    right:['smallNum',],
  }],
}

// All comparison operations
switch (opscompares.operation) {
  case 'eq':
  case '==':
    return opscompares.left == opscompares.right;
  case 'dneq':
  case '!=':
  case '!':
    return opscompares.left !== opscompares.right;
  case 'dnseq':
  case '!==':
    return opscompares.left !== opscompares.right;
  case 'seq':
  case '===':
    return opscompares.left === opscompares.right;
  case 'lt':
  case '<':
    return opscompares.left < opscompares.right;
  case 'lte':
  case '<=':
    return opscompares.left <= opscompares.right;
  case 'gt':
  case '>':
    return opscompares.left > opscompares.right;
  case 'gte':
  case '>=':
    return opscompares.left >= opscompares.right;
  case 'dne':
  case 'undefined':
  case 'null':
    return opscompares.left === undefined || opscompares.left === null; 
  case '!null':
  case '!undefined':
  case 'exists':
  default://'exists'
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