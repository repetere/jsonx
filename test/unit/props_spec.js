import * as _rjxProps from '../../src/props';
import { getComputedProps, } from '../../src/props';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect, } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
import 'mocha-sinon';

const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className:'rjx',
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
      children:'hello world',
    },
  ],
};

const traverseObject = {
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

describe('rjx props', function () { 
  describe('getComputedProps', () => { 
    it('should return resolved computed props', () => {
      const dynamicprops = {
        auth: ['authentication', ],
        username: ['user', 'name', ],
      };
      const evalProps = {
        getUsername: '()=>\'rjx\'',
      };
      const bindEvalProps = {
        getUsernameFunction: '(function () { return "rjx"; })',
      };
      const compProps = {
        myComponent: {
          component: 'p',
          children:'hello world',
        },
      };
      const renderIndex = 1;
      const resources = traverseObject;
      const testRJX = Object.assign({}, sampleRJX, {
        asyncprops: dynamicprops,
        __dangerouslyEvalProps: evalProps,
        __dangerouslyBindEvalProps: bindEvalProps,
        __dangerouslyInsertComponents: compProps,
      });
      const computedProps = getComputedProps.call({}, {
        rjx: testRJX,
        resources,
        renderIndex,
      });
      expect(computedProps.auth).to.eql(resources.authentication);
      expect(computedProps.username).to.eql(resources.user.name);
      expect(computedProps.key).to.eql(renderIndex);
      expect(computedProps.getUsername).to.be.a('string');
      expect(computedProps.getUsernameFunction).to.be.a('function');
      expect(computedProps.myComponent).to.be.an('object');
      expect(computedProps.myComponent).to.haveOwnProperty('$$typeof');
      expect(computedProps.myComponent).to.haveOwnProperty('type');
      expect(computedProps.myComponent).to.haveOwnProperty('key');
      expect(computedProps.myComponent).to.haveOwnProperty('ref');
      expect(computedProps.myComponent).to.haveOwnProperty('props');
    });
  });
  describe('getRJXProps', () => {
    const getRJXProps = _rjxProps.getRJXProps;
    it('should return resolved dynamic prop', () => {
      const testVals = {
        auth: ['authentication', ],
        username: ['user', 'name', ],
      };
      const testRJX = Object.assign({}, sampleRJX, { asyncprops: testVals, });
      const testRJX2 = Object.assign({}, sampleRJX, { thisprops: testVals, });
      const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
      const RJXP2 = getRJXProps({ rjx: testRJX2, traverseObject, propName:'thisprops', });
      expect(RJXP.auth).to.eql(traverseObject.authentication);
      expect(RJXP.username).to.eql(traverseObject.user.name);
      expect(RJXP2.auth).to.eql(traverseObject.authentication);
      expect(RJXP2.username).to.eql(traverseObject.user.name);
    });
    it('should return resolved dynamic prop with undefined values if reference is invalid', () => {
      const testVals = {
        auth: ['wrong', ],
        username: ['no', 'ref', ],
      };
      const testRJX = Object.assign({}, sampleRJX, { asyncprops: testVals, });
      const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
      expect(RJXP.auth).to.be.undefined;
      expect(RJXP.username).to.be.undefined;
    });
  });
  describe('getChildrenComponents', () => {
    const getChildrenComponents = _rjxProps.getChildrenComponents;
    it('should return undefined children if missing __spread prop', () => {
      expect(getChildrenComponents().children).to.be.undefined;
    });
    it('should return error in children if missing __spread prop and if in debug mode', () => {
      expect(getChildrenComponents({ rjx:{ debug:true ,}, }).children).to.be.a('string');
      expect(getChildrenComponents.call({ debug:true ,}).children).to.be.a('string');
    });
    it('should spread data as a component on __spread prop', () => {
      const options = {
        allProps: {
          __spread: [ 1, 2, 3, 4, 5, ],
        },
        rjx: {
          __spreadComponent: {
            component: 'div',
          },
        },
      };
      const spreadChilds = getChildrenComponents(options);
      expect(spreadChilds).to.haveOwnProperty('_children');
      expect(spreadChilds._children).to.have.lengthOf(options.allProps.__spread.length);
      // expect(getChildrenComponents({ rjx:{ debug:true ,}, }).children).to.be.a('string');
    });
  });
  describe('boundArgsReducer', () => { 
    it('should return reducer function', () => {
      expect(_rjxProps.boundArgsReducer.bind()).to.be.a('function');
    });
  });
  describe('getEvalProps', () => {
    const getEvalProps = _rjxProps.getEvalProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        auth: 'true',
        username: '()=>(user={})=>user.name',
      };
      const testRJX = Object.assign({}, sampleRJX, {
        __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
          email: '(function getUser(user={}){ return this.testBound(); })',
        },
      });
      // console.log({ testRJX });
      const RJXP = getEvalProps.call({ testBound: () => 'bounded', }, { rjx: testRJX, });
      const evalutedComputedFunc = RJXP.username({ name: 'bob', });
      const evalutedComputedBoundFunc = RJXP.email({ email:'test@email.domain', });
      expect(RJXP.auth).to.be.true;
      expect(evalutedComputedFunc).to.eql('bob');
      expect(evalutedComputedBoundFunc).to.eql('bounded');
    });
  });
  describe('getWindowComponents', () => {
    const getWindowComponents = _rjxProps.getWindowComponents;
    before(function () {
      this.jsdom = mochaJSDOM();
    });
    it('should return react element from rjx.__windowComponents', function () {
      class Welcome extends React.Component {
        render() {
          return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
        }
      }
      const __windowComponents = {
        myWelcome: 'Welcome',
      };
      const allProps = {
        __windowComponents,
        __windowComponentProps: {
          name: 'from window',
          title: 'pull it',
        },
      };
      const testRJX = {
        component: 'div',
        children: 'hello world',
        __windowComponents: {
          useWelcome:'func:window.__rjx_custom_elements.Welcome',
        },
      };
      const thisProp = {
        window: {
          __rjx_custom_elements: {
            Welcome,
          },
        },
      };
      const windowProps = getWindowComponents.call(thisProp, {
        allProps,
        rjx: testRJX,
      });
      expect(windowProps.useWelcome.type).to.eql(Welcome);
      expect(windowProps.useWelcome.props.name).to.eql(allProps.__windowComponentProps.name);
    });    
    after(function () {
      this.jsdom();
    });
  });
  describe('getFunctionProps', () => {
    const getFunctionProps = _rjxProps.getFunctionProps;
    it('should resolve functions from rjx.__functionProps from function strings', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
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
      const rxjTest = {
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
      const rxjObj = getFunctionProps.call(thisProp, {
        rjx: rxjTest,
      });
      expect(rxjObj).is.an('object');
      expect(Object.keys(rxjObj)).to.eql(Object.keys(rxjTest.__functionProps));
      expect(rxjObj.onclick()).to.eq('clicked');
      expect(rxjObj.printPage()).to.eql('printed');
      expect(rxjObj.nav()).to.eql('pushed');
    });
  });
  describe('getFunctionFromProps', () => {
    const getFunctionFromProps = _rjxProps.getFunctionFromProps;
    it('should return an empty function by default', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
        debug:true,
      };
      const func = getFunctionFromProps.call(thisProp, {
        propFunc: () => { },
      });
      const defaultFunc = getFunctionFromProps.call(thisProp, {});
      // const emptyFunction = function () {};
      expect(func).to.be.a('function');
      expect(defaultFunc).to.be.a('function');
      // expect(func.toString()).to.eq(emptyFunction.toString());
      // expect(defaultFunc.toString()).to.eq(emptyFunction.toString());
      expect(logError.called).to.be.true;
    });
    it('should return a library function like this.props.reduxRouter.push', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
        debug: true,
        props: {
          reduxRouter: {
            push:()=>'pushed',
            pop:()=>'poped',
          },
        },
      };
      const func = getFunctionFromProps.call(thisProp, {
        propFunc: 'func:this.props.reduxRouter.push',
      });
      expect(func).to.be.a('function');
      expect(func()).to.eq('pushed');
      expect(logError.called).to.be.false;
    });
    it('should return a function on this.props like this.props.onClick', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
        debug: true,
        props: {
          onClick:()=>'clicked',
        },
      };
      const func = getFunctionFromProps.call(thisProp, {
        propFunc: 'func:this.props.onClick',
      });
      expect(func).to.be.a('function');
      expect(func()).to.eq('clicked');
      expect(logError.called).to.be.false;
    });
    it('should return a window function like window.print or window.localStorage.getItem', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
        debug: true,
        window: {
          print: () => 'printed',
          localStorage: {
            getItem:()=>'gotItem',
          },
        },
      };
      const func = getFunctionFromProps.call(thisProp, {
        propFunc: 'func:window.print',
      });
      const funcDeep = getFunctionFromProps.call(thisProp, {
        propFunc: 'func:window.localStorage.getItem',
      });
      expect(func).to.be.a('function');
      expect(funcDeep).to.be.a('function');
      expect(func()).to.eq('printed');
      expect(funcDeep()).to.eq('gotItem');
      expect(logError.called).to.be.false;
    });
  });
  describe('getComponentProps', () => {
    const getComponentProps = _rjxProps.getComponentProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        myComponent: {
          component: 'p',
          children:'hello world',
        },
      };
      const testRJX = Object.assign({}, sampleRJX, { __dangerouslyInsertComponents: testVals,  });
      const RJXP = getComponentProps.call({ }, { rjx: testRJX, });
      expect(RJXP.myComponent).to.be.an('object');
      expect(RJXP.myComponent).to.haveOwnProperty('$$typeof');
      expect(RJXP.myComponent).to.haveOwnProperty('type');
      expect(RJXP.myComponent).to.haveOwnProperty('key');
      expect(RJXP.myComponent).to.haveOwnProperty('ref');
      expect(RJXP.myComponent).to.haveOwnProperty('props');
    });
  });
  describe('getReactComponentProps', () => {
    const getReactComponentProps = _rjxProps.getReactComponentProps;
    it('should return react component props dangerously using eval', () => {
      const testVals = {
        myComponent: 'p',
      };
      const testRJX = Object.assign({}, sampleRJX, { __dangerouslyInsertReactComponents: testVals,  });
      const RJXP = getReactComponentProps.call({}, { rjx: testRJX, });
      expect(RJXP.myComponent).to.be.an('string');
      expect(RJXP.myComponent).to.eql('p');
    });
  });

});