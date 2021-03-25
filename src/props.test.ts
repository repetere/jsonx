import * as jsonx from './index';
import * as _jsonxProps from './props';
import { getComputedProps, } from './props';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect, } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
// import 'mocha-sinon';

const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className:'jsonx',
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
    name: 'jsonx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};

describe('jsonx props', function () { 
  describe('getComputedProps', () => { 
    it('should return resolved computed props', () => {
      const dynamicprops = {
        auth: ['authentication', ],
        username: ['user', 'name', ],
      };
      const evalProps = {
        getUsername: '()=>\'jsonx\'',
      };
      const bindEvalProps = {
        getUsernameFunction: '(function () { return "jsonx"; })',
      };
      const compProps = {
        myComponent: {
          component: 'p',
          children:'hello world',
        },
      };
      const renderIndex = 1;
      const resources = traverseObject;
      const testJSONX = Object.assign({}, sampleJSONX, {
        asyncprops: dynamicprops,
        __dangerouslyEvalProps: evalProps,
        __dangerouslyBindEvalProps: bindEvalProps,
        __dangerouslyInsertComponents: compProps,
      });
      const computedProps = getComputedProps.call({}, {
        disableRenderIndexKey:false,
        jsonx: testJSONX,
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
    it('should remove props with "useremoveprops"',()=>{
      const jsonx = {
        component: "input",
        props:{
          name:'firstName',
          pleaseRemove1:'ok',
          pleaseRemove2:'ok',
        },
      }
      const remove2 = {
        ...jsonx,
        useremoveprops: ['pleaseRemove1', 'pleaseRemove2'],
      }
      const remove0 = {
        ...jsonx,
        useremoveprops: [],
      }
      const computedProps = getComputedProps.call({}, {
        disableRenderIndexKey:false,
        jsonx:remove2,
        renderIndex:1,
      });
      const computedProps0 = getComputedProps.call({}, {
        disableRenderIndexKey:false,
        jsonx:remove0,
        renderIndex:1,
      });
      expect(computedProps).to.eql({ 
        key: 1, 
        name: 'firstName' 
      });
      expect(computedProps0).to.eql({
        key: 1,
        name: 'firstName',
        pleaseRemove1: 'ok',
        pleaseRemove2: 'ok'
      });
    })
    it('should only include props with "useincludeprops"',()=>{
      const jsonx = {
        component: "input",
        props:{
          name:'firstName',
          pleaseRemove1:'ok',
          pleaseRemove2:'keep2',
        },
      }
      const remove1 = {
        ...jsonx,
        useincludeprops: ['pleaseRemove1', 'name'],
      }
      const removeAll = {
        ...jsonx,
        useincludeprops: [],
      }
      const computedProps = getComputedProps.call({}, {
        disableRenderIndexKey:false,
        jsonx:remove1,
        renderIndex:1,
      });
      const computedProps0 = getComputedProps.call({}, {
        disableRenderIndexKey:false,
        jsonx:removeAll,
        renderIndex:1,
      });
      expect(computedProps).to.eql({ pleaseRemove1: 'ok',key:1, name: 'firstName' });
      expect(computedProps0).to.eql({ key:1,  });
    })
    it('should apply a form hook register with "useformregister"',()=>{
      const context = {
        reactHookForm:{
          register:'FORM REGISTER'
        }
      }
      const computedProps = getComputedProps.call(context, {
        disableRenderIndexKey:false,
        jsonx: {
          component: "input",
          props:{
            name:'firstName',
          },
          useformregister: true,
        },
        renderIndex:1,
      });
      expect(computedProps.ref).to.eql(context.reactHookForm.register);
    })
  });
  describe('getJSONXProps', () => {
    const getJSONXProps = _jsonxProps.getJSONXProps;
    it('should return context props', () => { 
      const functionContext = {
        name: 'custom context',
        content:'this should be the children content',
        returnJSON: true,
      };
      const testVals = {
        contextName: ['name'],
        _children: ['content']
      };
      const contextJSONX = {
        component: 'div',
        props: {
          title: 'context jsonx',
        },
        thiscontext:testVals,
      };
      const JSONXCP = getJSONXProps({ jsonx: contextJSONX, traverseObject: functionContext, propName: 'thiscontext', });
      const JSONXJSONX = jsonx.getReactElementFromJSONX.call(functionContext, contextJSONX);
      expect(JSONXCP).to.haveOwnProperty('contextName');
      expect(JSONXCP).to.haveOwnProperty('_children');
      expect(JSONXCP.contextName).to.eql(functionContext.name);
      expect(JSONXCP._children).to.eql(functionContext.content);
      //@ts-ignore
      expect(JSONXJSONX.children).to.eql(functionContext.content);
      // const JSONXCP = getJSONXProps.call(functionContext, contextJSONX, { thiscontext: testVals, });
      // console.log({ JSONXCP,JSONXJSONX });
    });
    it('should return resolved dynamic prop', () => {
      const testVals = {
        auth: ['authentication', ],
        username: ['user', 'name', ],
      };
      const testJSONX = Object.assign({}, sampleJSONX, { asyncprops: testVals, });
      const testJSONX2 = Object.assign({}, sampleJSONX, { thisprops: testVals, });
      const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
      const JSONXP2 = getJSONXProps({ jsonx: testJSONX2, traverseObject, propName:'thisprops', });
      expect(JSONXP.auth).to.eql(traverseObject.authentication);
      expect(JSONXP.username).to.eql(traverseObject.user.name);
      expect(JSONXP2.auth).to.eql(traverseObject.authentication);
      expect(JSONXP2.username).to.eql(traverseObject.user.name);
    });
    it('should return resolved dynamic prop with undefined values if reference is invalid', () => {
      const testVals = {
        auth: ['wrong', ],
        username: ['no', 'ref', ],
      };
      const testJSONX = Object.assign({}, sampleJSONX, { asyncprops: testVals, });
      const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
      expect(JSONXP.auth).to.be.undefined;
      expect(JSONXP.username).to.be.undefined;
    });
  });
  describe('getChildrenComponents', () => {
    const getChildrenComponents = _jsonxProps.getChildrenComponents;
    it('should return undefined children if missing __spread prop', () => {
      //@ts-ignore
      expect(getChildrenComponents().children).to.be.undefined;
    });
    it('should return error in children if missing __spread prop and if in debug mode', () => {
      //@ts-ignore
      expect(getChildrenComponents({ jsonx:{ debug:true ,}, }).children).to.be.a('string');
      expect(getChildrenComponents.call({ debug:true ,}).children).to.be.a('string');
    });
    it('should spread data as a component on __spread prop', () => {
      const options = {
        allProps: {
          __spread: [ 1, 2, 3, 4, 5, ],
        },
        jsonx: {
          __spreadComponent: {
            component: 'div',
          },
        },
      };
      //@ts-ignore
      const spreadChilds = getChildrenComponents(options);
      expect(spreadChilds).to.haveOwnProperty('_children');
      expect(spreadChilds._children).to.have.lengthOf(options.allProps.__spread.length);
      // expect(getChildrenComponents({ jsonx:{ debug:true ,}, }).children).to.be.a('string');
    });
  });
  describe('boundArgsReducer', () => { 
    it('should return reducer function', () => {
      //@ts-ignore
      expect(_jsonxProps.boundArgsReducer.bind()).to.be.a('function');
    });
  });
  describe('getEvalProps', () => {
    const getEvalProps = _jsonxProps.getEvalProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        auth: 'true',
        username: '()=>(user={})=>user.name',
      };
      const testJSONX = Object.assign({}, sampleJSONX, {
        __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
          email: '(function getUser(user={}){ return this.testBound(); })',
        },
      });
      // console.log({ testJSONX });
      //@ts-ignore
      const JSONXP = getEvalProps.call({ testBound: () => 'bounded', }, { jsonx: testJSONX, });
      //@ts-ignore
      const evalutedComputedFunc = JSONXP.username({ name: 'bob', });
      //@ts-ignore
      const evalutedComputedBoundFunc = JSONXP.email({ email:'test@email.domain', });
      //@ts-ignore
      expect(JSONXP.auth).to.be.true;
      expect(evalutedComputedFunc).to.eql('bob');
      expect(evalutedComputedBoundFunc).to.eql('bounded');
    });
  });
  describe('getWindowComponents', () => {
    const getWindowComponents = _jsonxProps.getWindowComponents;
    // beforeAll(function () {
    //   // this.jsdom = mochaJSDOM();
    //   // console.log('this.jsdom', this.jsdom,{mochaJSDOM});
    //   console.log({window});
    // });
    it('should return react element from jsonx.__windowComponents', function () {
      class Welcome extends React.Component {
        render() {
          //@ts-ignore
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
      const testJSONX = {
        component: 'div',
        children: 'hello world',
        __windowComponents: {
          useWelcome:'func:window.__jsonx_custom_elements.Welcome',
        },
      };
      const thisProp = {
        window: {
          __jsonx_custom_elements: {
            Welcome,
          },
        },
      };
      const windowProps = getWindowComponents.call(thisProp, {
        allProps,
        jsonx: testJSONX,
      });
      expect(windowProps.useWelcome.type).to.eql(Welcome);
      expect(windowProps.useWelcome.props.name).to.eql(allProps.__windowComponentProps.name);
    });    
    // afterAll(function () {
    //   // this.jsdom();
    // });
  });
  describe('getFunctionProps', () => {
    const getFunctionProps = _jsonxProps.getFunctionProps;
    it('should resolve functions from jsonx.__functionProps from function strings', () => {
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
    });
  });
  describe('getFunctionFromProps', () => {
    const getFunctionFromProps = _jsonxProps.getFunctionFromProps;
    it('should return an empty function by default', () => {
      const logError = sinon.spy();
      const thisProp = {
        logError,
        debug:true,
      };
      //@ts-ignore
      const func = getFunctionFromProps.call(thisProp, {
        //@ts-ignore
        propFunc: () => { },
      });
      //@ts-ignore
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
      //@ts-ignore
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
      //@ts-ignore
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
      //@ts-ignore
      const func = getFunctionFromProps.call(thisProp, {
        //@ts-ignore
        propFunc: 'func:window.print',
      });
      //@ts-ignore
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
    const getComponentProps = _jsonxProps.getComponentProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        myComponent: {
          component: 'p',
          children:'hello world',
        },
      };
      const testJSONX = Object.assign({}, sampleJSONX, { __dangerouslyInsertComponents: testVals,  });
      const JSONXP = getComponentProps.call({ }, { jsonx: testJSONX, });
      expect(JSONXP.myComponent).to.be.an('object');
      expect(JSONXP.myComponent).to.haveOwnProperty('$$typeof');
      expect(JSONXP.myComponent).to.haveOwnProperty('type');
      expect(JSONXP.myComponent).to.haveOwnProperty('key');
      expect(JSONXP.myComponent).to.haveOwnProperty('ref');
      expect(JSONXP.myComponent).to.haveOwnProperty('props');
    });
  });
  describe('getReactComponentProps', () => {
    const getReactComponentProps = _jsonxProps.getReactComponentProps;
    it('should return react component props dangerously using eval', () => {
      const testVals = {
        myComponent: 'p',
      };
      const testJSONX = Object.assign({}, sampleJSONX, { __dangerouslyInsertReactComponents: testVals,  });
      const JSONXP = getReactComponentProps.call({}, { jsonx: testJSONX, });
      //@ts-ignore
      expect(JSONXP.myComponent).to.be.an('string');
      //@ts-ignore
      expect(JSONXP.myComponent).to.eql('p');
    });
  });

});