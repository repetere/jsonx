import * as jsonx from '../../src/main';
import * as _jsonxComponents from '../../src/components';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect, } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
import 'mocha-sinon';

const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
  },
  children: 'some div',
};

const sampleCustomElementJSONX = {
  component: 'div',
  props: {
    id: 'customJSONX',
    className:'jsonx',
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

class Welcome extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeBindSpy extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeNonBind extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

describe('jsonx components', function () { 
  describe('advancedBinding', () => {
    it('should use advancedBinding based on user agent', () => {
      expect(_jsonxComponents.advancedBinding).to.be.false;
    });
  });
  describe('componentMap', () => {
    it('should export an object of components', () => {
      expect(_jsonxComponents.componentMap).to.be.a('object');
    });
    // it('should export an object of components', () => {
    //   global.window = {
    //     __jsonx_custom_elements: {
    //       cusEl: {},
    //     },
    //   };
    //   const comps = _jsonxComponents.componentMap;
    //   console.log({ comps });
    //   expect(_jsonxComponents.componentMap.cusEl).to.eql(global.window.__jsonx_custom_elements.cusEl);
    // });
  });
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
      const customComponents = _jsonxComponents.getBoundedComponents({ reactComponents, boundedComponents, advancedBinding:true, });
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
        // debug: false,
        // logError:()=>null,
      };
      const JSONXPropCheck = jsonx.getRenderedJSON.call(customThis, sampleCustomElementJSONX);

      expect(bindSpy.called).to.be.true;
      expect(JSONXPropCheck.props.title).to.eql(customThis.props.extraname);
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
    it('should return a function if jsonx.component is not a string', () => {
      expect(_jsonxComponents.getComponentFromMap({
        jsonx: {
          component:Welcome,
        }, })).to.be.a('function').and.to.eql(Welcome);
    });
    it('should return the dom element string if a valid DOM elmenet in ReactDOM', () => {
      ['div', 'span', 'p', 'section', ].forEach(el => {
        const jsonxObj = { jsonx: { component: el, }, };
        expect(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(el);
      });
    });
    it('should return a custom element', () => {
      const jsonxObj = {
        jsonx: {
          component: 'Welcome',
        },
        reactComponents: {
          Welcome,
        },
      };
      expect(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(Welcome);
    });
    it('should return a component library react element', () => {
      const jsonxObj = {
        jsonx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(Welcome);
    });
    it('should handle errors', () => { 
      const logError = sinon.spy();
      expect(_jsonxComponents.getComponentFromMap.bind(null)).to.throw();
      try {
        _jsonxComponents.getComponentFromMap({ debug: true, logError, jsonx:false, });
      } catch (e) {
        expect(e).to.be.a('error');
        expect(logError.called).to.be.true;
      }
    });
  });
  describe('getComponentFromLibrary', () => {
    const reactBootstrap = {
      Welcome,
      WelcomeNonBind,
    };
    const componentLibraries = {
      reactBootstrap,
      testLib: {
        testGrouping: {
          testComponent: {},
        },
      },
    };
    it('should return undefined if not valid', () => {
      expect(_jsonxComponents.getComponentFromLibrary()).to.be.undefined;
    });
    it('should return a function if selecting valid component library', () => {
      const jsonxObj = {
        jsonx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(_jsonxComponents.getComponentFromLibrary(jsonxObj)).to.be.eql(Welcome);
      const jsonxObjDeep = {
        jsonx: {
          component: 'testLib.testGrouping.testComponent',
        },
        componentLibraries,
      };
      expect(_jsonxComponents.getComponentFromLibrary(jsonxObjDeep)).to.be.eql(componentLibraries.testLib.testGrouping.testComponent);

    });
  });
  describe('componentMap', () => {
    before(function () {
      this.jsdom = mochaJSDOM();
    });
    it('should accept components from a window property', function () {
      global.window.__jsonx_custom_elements = {
        Welcome,
        WelcomeNonBind,
        WelcomeBindSpy,
      };
      delete require.cache[ require.resolve('../../dist/jsonx.cjs') ];
      const window_test_jsonx = require('../../dist/jsonx.cjs');

      expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('Welcome');
      expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeNonBind');
      expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeBindSpy');
    });    
    after(function () {
      this.jsdom();
    });
  });
  describe('getFunctionFromEval', () => {
    const getFunctionFromEval = _jsonxComponents.getFunctionFromEval;
    it('should return a new function', () => {
      const myFunc = getFunctionFromEval({
        body: 'return 3;',
      });
      expect(myFunc()).to.eql(3);
    });
  });
  describe('getReactClassComponent', () => {
    const getReactClassComponent = _jsonxComponents.getReactClassComponent;
    const classBody = {
      componentDidMount: {
        body: 'console.log(\'mounted\',this.props)',
        arguments: [],
      },
      render: {
        body: {
          component: 'p',
          children: [
            {
              component: 'span',
              children: 'My Custom React Component Status: ',
            },
            {
              component: 'span',
              thisprops: {
                children: ['status',],
              },
            },
          ],
        },
      },
    };
    it('should create a React Component', () => {
      const MyCustomComponent = getReactClassComponent(classBody);
      const MyCustomComponentClass = getReactClassComponent(classBody, { returnFactory:false, });
      // const MyCustomComponentFactory = getReactClassComponent(classBody);
      // console.log({MyCustomComponentClass});
      expect(MyCustomComponent).to.be.a('function');
      expect(MyCustomComponentClass).to.be.a('function');
      expect(ReactTestUtils.isElement(MyCustomComponent)).to.be.false;
      // expect(ReactTestUtils.isCompositeComponent(MyCustomComponentClass())).to.be.true;
    });
    it('should allow for functions as object props', () => {
      const classBodyOpts = Object.assign({}, classBody);
      classBodyOpts.componentDidMount = function () {
        console.log('mounted!');
      };
      expect(getReactClassComponent.bind(null, classBodyOpts)).to.not.throw;
    });
    it('should allow for custom class names', () => { 
      const MyCustomComponentNameClass = getReactClassComponent(classBody, '', { name: 'myClass', });
      expect(MyCustomComponentNameClass).to.be.a('function');
    });
    it('should throw an error if missing a render function', () => { 
      expect(getReactClassComponent.bind()).to.throw;
    });
    it('should throw an error if missing a function is missing a body', () => { 
      expect(getReactClassComponent.bind({ render: {}, })).to.throw;
    });
    it('should create suspense/lazy components', () => {
      const MyCustomLazyComponent = getReactClassComponent(
        {
          component: 'p',
          children: [
            {
              component: 'span',
              children: 'My Custom React Component Status: ',
            },
            {
              component: 'span',
              thisprops: {
                children: ['status',],
              },
            },
          ],
        },
        {
          name: 'myComp',
          lazy: (comp, options) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  comp, Object.assign(options, { lazy: false, }),]);
              }, 3000);
            });
          },
        },
      );
      
      expect(MyCustomLazyComponent).to.be.a('object');
    });
  });
  describe('getReactFunctionComponent', () => {
    const getReactFunctionComponent = _jsonxComponents.getReactFunctionComponent;
    it('should react a React Function Component', () => { 
      const MyCustomComponentNameless = getReactFunctionComponent(
        {
          component:'p',
          children:'hello',
        },
        'console.log("lazy function body");',
        { },
      );
      expect(MyCustomComponentNameless.name).to.eql('Anonymous');
      expect(MyCustomComponentNameless).to.be.a('function');
    });
    it('should create a React Function Component with a name', () => {
      const MyCustomComponent = getReactFunctionComponent(
        {
          component:'p',
          children:[
            {
              component:'span',
              children: 'My Custom React Component Status: ',
            },
            {
              component:'span',
              thisprops:{
                children:['status', ],
              },
            },
          ],
        },
        'console.log("lazy function body");',
        { name:'myComp', },
      );
      expect(MyCustomComponent.name).to.eql('myComp');
      expect(MyCustomComponent).to.be.a('function');
    });
    it('should create suspense/lazy components', () => {
      const MyCustomLazyComponent = getReactFunctionComponent(
        {
          component: 'p',
          children: [
            {
              component: 'span',
              children: 'My Custom React Component Status: ',
            },
            {
              component: 'span',
              thisprops: {
                children: ['status',],
              },
            },
          ],
        },
        'console.log("lazy function body");',
        {
          name: 'myComp',
          lazy: (comp, options) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  comp, Object.assign(options, { lazy: false, }),]);
              }, 3000);
            });
          },
        },
      );
      
      expect(MyCustomLazyComponent).to.be.a('object');
    });
  });
  describe('getReactContext', () => {
    const getReactContext = _jsonxComponents.getReactContext;
    it('should return a React Context Object', () => {
      const context = getReactContext({ some: 'c', });
      expect(ReactTestUtils.isElement(context)).to.be.false;
      // expect(context).to.be.an.instanceOf(React.createContext);
    });
  });
});