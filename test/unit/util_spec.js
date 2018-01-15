const rjx = require('../../dist/rjx.cjs');
const mochaJSDOM = require('jsdom-global');
const chai = require('chai');
const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMElements = require('react-dom-factories');
const expect = require('chai').expect;
const jsdom = require('jsdom');
const { JSDOM, } = jsdom;
chai.use(require('sinon-chai'));
require('mocha-sinon');

const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className:'rjx',
  },
  children: 'some div',
};

const sampleCustomElementRJX = {
  component: 'div',
  props: {
    id: 'customRJX',
    className:'rjx',
  },
  thisprops: {
    title: ['extraname', ],
  },
  children: [
    {
      component: 'p',
      children:'some text',
    },
    {
      component: 'Welcome',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
    {
      component: 'WelcomeBindSpy',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
    {
      component: 'WelcomeNonBind',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
  ],
};

class DemoComponent extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

describe('rjx utils', function () { 
  /*
  describe('getBoundedComponents', () => {
    it('should bind this to reactComponents', () => {
      const bindSpy = sinon.spy();
      WelcomeBindSpy.bind = bindSpy;
      const reactComponents = {
        Welcome,
        WelcomeNonBind,
        WelcomeBindSpy,
      };
      const boundedComponents = ['Welcome', 'WelcomeBindSpy', ];
      const customComponents = rjx._rjxComponents.getBoundedComponents({ reactComponents, boundedComponents, advancedBinding:true, });
      const customThis = {
        props: {
          name:'customElementTest',
          extraname: 'customElementTestName',
          elementProperties: {
            title: 'AddedWithThis',
          },
        },
        boundedComponents,
        reactComponents,
      };
      const RJXPropCheck = rjx.getRenderedJSON.call(customThis, sampleCustomElementRJX);

      expect(bindSpy.called).to.be.true;
      expect(RJXPropCheck.props.title).to.eql(customThis.props.extraname);
      expect(customComponents.length).to.eql(reactComponents.length);
    });
  });
  describe('getComponentFromMap', () => {
    const reactBootstrap = {
      Welcome,
      WelcomeNonBind,
    };
    const componentLibraries = {
      reactBootstrap,
    };
    it('should return a function if rjx.component is not a string', () => {
      expect(rjx._rjxComponents.getComponentFromMap({
        rjx: {
          component:Welcome,
        }, })).to.be.a('function').and.to.eql(Welcome);
    });
    it('should return the dom element string if a valid DOM elmenet in ReactDOM', () => {
      [ 'div', 'span', 'p', 'section', ].forEach(el => {
        const rjxObj = { rjx: { component: el, }, };
        expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(el);
      });
    });
    it('should return a custom element', () => {
      const rjxObj = {
        rjx: {
          component: 'Welcome',
        },
        reactComponents: {
          Welcome,
        },
      };
      expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should return a component library react element', () => {
      const rjxObj = {
        rjx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should handle errors', () => { 
      const logError = sinon.spy();
      expect(rjx._rjxComponents.getComponentFromMap.bind(null)).to.throw();
      try {
        rjx._rjxComponents.getComponentFromMap({ debug: true, logError, });
      } catch (e) {
        expect(e).to.be.a('error');
        expect(logError.called).to.be.true;
      }
    });
  });

  */
  describe('traverse', () => {
    const testObj = {
      user: {
        name: 'rjx',
        description: 'react withouth javascript',
      },
      stats: {
        logins: 102,
        comments: 3,
      },
      authentication: 'OAuth2',
    };
    const traverse = rjx._rjxUtils.traverse;
    it('should return properties from an object from the array of paths', () => {
      const testVals = { auth: ['authentication',], username: ['user', 'name',], };
      expect( traverse(testVals, testObj)).to.eql({ auth:testObj.authentication, username:testObj.user.name,  });
    });
    it('should return the entire object if no paths provided', () => {
      const testVals = { wholeObj: [], };
      expect( traverse(testVals, testObj)).to.eql({ wholeObj:testObj,  });
    });
    it('should return undefined if paths are invalid', () => {
      const testVals = { emptyObj: ['invalid','path'], };
      expect( traverse(testVals, testObj)).to.eql({ emptyObj:undefined, });
    });
    it('should throw an error if paths are not an array of strings or numeric indexes', () => {
      const testVals = { emptyObj: ()=>undefined, };
      expect(traverse.bind(null, testVals, testObj)).to.throw(Error);
    });
  });
  describe('validateRJX', () => {
    const validateRJX = rjx._rjxUtils.validateRJX;
    it('should return true if RJX is valid',  ()=> {
      expect(validateRJX(sampleRJX)).to.be.true;
    });
    it('should return string and warn of invalid RJX props', () => {
      const invalidKeys = { incorrect: true, extra: true, };
      const invalidKeyRJX = Object.assign({}, sampleRJX, invalidKeys);
      const validationTest = validateRJX(invalidKeyRJX);
      expect(validationTest).to.be.a('string').and.to.be.ok;
      expect(validationTest).to.eql(`Warning: Invalid Keys [${Object.keys(invalidKeys).join()}]`);
    });
    it('should throw a syntax error if RJX is missing a component', () => {
      const validationTest = validateRJX.bind({});
      expect(validationTest).to.throw('Missing React Component');
      expect(validationTest).to.throw(SyntaxError);
    });
    it('should throw multiple errors if returnAllErrors is true', () => {
      const validationTest = validateRJX( {
        props: [],
      }, true);
      expect(validationTest).to.be.an('array');
      expect(validationTest[ 0 ]).to.be.an('error');
    });
    it('should throw a type error if RJX props is not an object, props.children or props._children', () => {
      const badPropTest1 = validateRJX.bind(null, { component:'div', props:{ children:{}, }, });
      expect(validateRJX.bind(null, { component:'div', props:'bad', })).to.throw(TypeError);
      expect(validateRJX.bind(null, { component:'div', props:[], })).to.throw(TypeError);
      expect(badPropTest1).to.throw(TypeError);
      expect(validateRJX.bind(null, { component: 'div', props: { _children: {}, }, })).to.throw(TypeError);
    });
    it('should throw a type error if RJX children is not an array or RJX docs or a string', () => {
      expect(validateRJX.bind(null, { component:'div', children:{}, })).to.throw(TypeError);
    });
    it('should validate child objects', () => {
      const rjxObj = {
        component: 'div',
        children: [
          {
            props:'this is missing a component',
          },
          {
            component: 'p',
            children: {},
            asyncprops:'',
          },
        ],
      };
      const childrenErrors = validateRJX(rjxObj, true);
      expect(childrenErrors).to.be.an('array');
      expect(childrenErrors[ 0 ]).to.be.an('error');
    });
    it('should validate dynamic props[asyncprops,thisprops,windowprops]', () => {
      const rjxObj = {
        component: 'myComponent',
        asyncprops: '[]',
        thisprops: {
          notStrings: [undefined, {},],
        },
        windowprops: {
          title:['navigator', 'userAgent',],
        },
      };
      const dynamicerrors = validateRJX(rjxObj, true);
      expect(dynamicerrors).to.be.an('array');
      expect(dynamicerrors.length).to.eql(4);
      expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate eval props[__dangerouslyEvalProps,__dangerouslyBindEvalProps]', () => {
      const rjxObj = {
        component: 'myComponent',
        __dangerouslyEvalProps: 'badobj',
      };
      const rjxObj2 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS:'()=>true',
          testJS1:'3',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2).to.be.true;
      // console.log({ evalError3 });
      // expect(dynamicerrors).to.be.an('array');
      // expect(dynamicerrors.length).to.eql(4);
      // expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyEvalProps javascript', () => {
      const rjxObj3 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS: '(=>true',
        },
      };
      const evalError3 = validateRJX(rjxObj3, true);
      expect(evalError3[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyBindEvalProps as a function that can be bound javascript', () => {
      const rjxObj4 = {
        component: 'myComponent',
        __dangerouslyBindEvalProps: {
          testJS1: '{}',
        },
      };
      const evalError4 = validateRJX(rjxObj4, true);
      expect(evalError4[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyInsertComponents are valid RJX objects', () => {
      const rjxObj = {
        component: 'myComponent',
        __dangerouslyInsertComponents: {
          testComponent: {
            component_missing: 'nodiv',
            props: {},
          },
        },
      };
      const evalError = validateRJX(rjxObj, true);
      expect(evalError[ 0 ]).to.be.an('error');
    });
    it('should validate __functionProps are valid function strings', () => {
      const rjxObj = {
        component: 'myComponent',
        __functionProps: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const rjxObj2 = {
        component: 'myComponent',
        __functionProps: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        __functionProps: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate windowCompProps is an object', () => {
      const rjxObj = {
        component: 'myComponent',
        windowCompProps: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        windowCompProps: {
          goodProps:'ok',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate __windowComponents are valid function strings', () => {
      const rjxObj = {
        component: 'myComponent',
        __windowComponents: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const rjxObj2 = {
        component: 'myComponent',
        __windowComponents: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        __windowComponents: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
  });
  
});