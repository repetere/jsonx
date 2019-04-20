import * as rjx from '../../src/main';
import * as _rjxComponents from '../../src/components';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
import 'mocha-sinon';

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
    title: ['extraname',],
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
        title: ['elementProperties', 'title',],
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
        title: ['elementProperties', 'title',],
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
        title: ['elementProperties', 'title',],
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

describe('rjx components', function () { 
  describe('componentMap', () => {
    it('should export an object of components', () => {
      expect(_rjxComponents.componentMap).to.be.a('object');
    });
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
      const boundedComponents = ['Welcome', 'WelcomeBindSpy',];
      const customComponents = _rjxComponents.getBoundedComponents({ reactComponents, boundedComponents, advancedBinding:true, });
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
      expect(_rjxComponents.getComponentFromMap({
        rjx: {
          component:Welcome,
        }, })).to.be.a('function').and.to.eql(Welcome);
    });
    it('should return the dom element string if a valid DOM elmenet in ReactDOM', () => {
      ['div', 'span', 'p', 'section',].forEach(el => {
        const rjxObj = { rjx: { component: el, }, };
        expect(_rjxComponents.getComponentFromMap(rjxObj)).to.eql(el);
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
      expect(_rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should return a component library react element', () => {
      const rjxObj = {
        rjx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(_rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should handle errors', () => { 
      const logError = sinon.spy();
      expect(_rjxComponents.getComponentFromMap.bind(null)).to.throw();
      try {
        _rjxComponents.getComponentFromMap({ debug: true, logError, });
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
    };
    it('should return undefined if not valid', () => {
      expect(_rjxComponents.getComponentFromLibrary()).to.be.undefined;
    });
    it('should return a function if selecting valid component library', () => {
      const rjxObj = {
        rjx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(_rjxComponents.getComponentFromLibrary(rjxObj)).to.be.eql(Welcome);
    });
  });
  describe('componentMap', () => {
    before(function () {
      this.jsdom = mochaJSDOM();
    });
    it('should accept components from a window property', function () {
      global.window.__rjx_custom_elements = {
        Welcome,
        WelcomeNonBind,
        WelcomeBindSpy,
      };
      delete require.cache[ require.resolve('../../dist/rjx.cjs') ];
      const window_test_rjx = require('../../dist/rjx.cjs');

      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('Welcome');
      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('WelcomeNonBind');
      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('WelcomeBindSpy');
    });    
    after(function () {
      this.jsdom();
    });
  });
  describe('getFunctionFromEval', () => {
    const getFunctionFromEval = _rjxComponents.getFunctionFromEval;
    it('should return a new function', () => {
      const myFunc = getFunctionFromEval({
        body: 'return 3;',
      });
      expect(myFunc()).to.eql(3);
    });
  });
  describe('getReactClassComponent', () => {
    const getReactClassComponent = _rjxComponents.getReactClassComponent;
    it('should create a React Component', () => {
      const MyCustomComponent = getReactClassComponent({
        componentDidMount:{
          body:'console.log(\'mounted\',this.props)',
          arguments:[],
        },
        render:{
          body:{
            component:'p',
            children:[
              {
                component:'span',
                children: 'My Custom React Component Status: ',
              },
              {
                component:'span',
                thisprops:{
                  children:['status',],
                },
              },
            ],
          },
        },
      });
      expect(MyCustomComponent).to.be.a('function');
      expect(ReactTestUtils.isElement(MyCustomComponent)).to.be.false;
      // expect(ReactTestUtils.isCompositeComponent(MyCustomComponent)).to.be.true;
    });
  });
  describe('getReactFunctionComponent', () => {
    const getReactFunctionComponent = _rjxComponents.getReactFunctionComponent;
    it('should create a React Function Component', () => {
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
                children:['status',],
              },
            },
          ],
        },
        'console.log("lazy function body");',
        { name:'myComp', },
      );
      expect(MyCustomComponent).to.be.a('function');
    });
  });
  describe('getReactContext', () => {
    const getReactContext = _rjxComponents.getReactContext;
    it('should return a React Context Object', () => {
      const context = getReactContext({ some: 'c' });
      expect(ReactTestUtils.isElement(context)).to.be.false;
      // expect(context).to.be.an.instanceOf(React.createContext);
    });
  });
});