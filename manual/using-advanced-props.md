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

#### Advanced - Special properties

##### resourceprops (asyncprops) / thisprops / thisstate / thiscontext / windowprops

The only different between resourceprops (asyncprops), thisprops and windowprops are the source of the transverse Object.

Resourceprops transverse an object that is manually passed (usually as a result of an asynchronous fetch all - hence the name asyncpropc).

Thisprops transverses anything bound to `this.props`, a good example would be if you're storing and passing a user object on `this.props.user`, pulling the username would be where you would use thisprops.

Thisstate transverses anything bound to `this.state`, for example if you're updating the state of a component based on user input from a text field `this.state.value`, pulling the value would be where you would use thisstate.

Thiscontext transverses anything bound to `this`, a good example is if you're using JSONX programatically and you want to bind functionality to the render methods.

Windowprops transverse anything on the global window object, like the current page location `window.location.href`.

Dynamic props are transversed by passing an array to the property value you want, so for a window's location (`window.location.href`) the property value is accessed by an array to the href `['location','href']` where you omit the transverse object from the array path.

```javascript
const traverseObject = {
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
const testJSONX = {
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
const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
// => {
//   auth: 'OAuth2',
//   username: 'jsonx'
// }

//finally resolves:
const testJSONX = {
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
```

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