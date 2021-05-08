import * as jsonx from './index';
import * as _jsonxProps from './props';
import { getComputedProps, } from './props';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect as EXPECTChai, } from 'chai';
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
      EXPECTChai(computedProps.auth).to.eql(resources.authentication);
      EXPECTChai(computedProps.username).to.eql(resources.user.name);
      EXPECTChai(computedProps.key).to.eql(renderIndex);
      EXPECTChai(computedProps.getUsername).to.be.a('string');
      EXPECTChai(computedProps.getUsernameFunction).to.be.a('function');
      EXPECTChai(computedProps.myComponent).to.be.an('object');
      EXPECTChai(computedProps.myComponent).to.haveOwnProperty('$$typeof');
      EXPECTChai(computedProps.myComponent).to.haveOwnProperty('type');
      EXPECTChai(computedProps.myComponent).to.haveOwnProperty('key');
      EXPECTChai(computedProps.myComponent).to.haveOwnProperty('ref');
      EXPECTChai(computedProps.myComponent).to.haveOwnProperty('props');
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
      EXPECTChai(computedProps).to.eql({ 
        key: 1, 
        name: 'firstName' 
      });
      EXPECTChai(computedProps0).to.eql({
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
      EXPECTChai(computedProps).to.eql({ pleaseRemove1: 'ok',key:1, name: 'firstName' });
      EXPECTChai(computedProps0).to.eql({ key:1,  });
    })
    it('should apply a form hook register with "useformregister"',()=>{
      const context = {
        reactHookForm:{
          register:()=>({ref:'FORM REGISTER'})
        }
      }
      const jsonx = {
        component: "input",
        props:{
          name:'firstName',
        },
        useformregister: true,
      }
      const computedProps = getComputedProps.call(context, {
        disableRenderIndexKey:false,
        jsonx,
        renderIndex:1,
      });
      // console.log({computedProps})
      //@ts-ignore
      expect(computedProps.ref).toBe(context.reactHookForm.register().ref);
      //@ts-ignore
      expect(_jsonxProps.useFormRegisterHandler.call(context,{jsonx})).toMatchObject(context.reactHookForm.register());
    });
    it('should handle getComputedProps errors',()=>{
      const mockCallback = jest.fn(()=>{});

      //@ts-ignore
      const props = getComputedProps.call({props:{getState:()=>{throw new Error('testing error')}}},{
        debug:true,
        jsonx:{
          component:'div',
          ignoreReduxProps:false,
          thisprops:{

          }
        },
        resources:new Error('testing error handling'),
        logError:mockCallback
      })
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(props).toBe(null)
    })
  });
  describe('getJSONXProps', () => {
    const getJSONXProps = _jsonxProps.getJSONXProps;
    it('should return with no input',()=>{
      expect(getJSONXProps()).toMatchObject({})
      expect(getJSONXProps({})).toMatchObject({})
    })
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
      EXPECTChai(JSONXCP).to.haveOwnProperty('contextName');
      EXPECTChai(JSONXCP).to.haveOwnProperty('_children');
      EXPECTChai(JSONXCP.contextName).to.eql(functionContext.name);
      EXPECTChai(JSONXCP._children).to.eql(functionContext.content);
      //@ts-ignore
      EXPECTChai(JSONXJSONX.children).to.eql(functionContext.content);
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
      EXPECTChai(JSONXP.auth).to.eql(traverseObject.authentication);
      EXPECTChai(JSONXP.username).to.eql(traverseObject.user.name);
      EXPECTChai(JSONXP2.auth).to.eql(traverseObject.authentication);
      EXPECTChai(JSONXP2.username).to.eql(traverseObject.user.name);
    });
    it('should return resolved dynamic prop with undefined values if reference is invalid', () => {
      const testVals = {
        auth: ['wrong', ],
        username: ['no', 'ref', ],
      };
      const testJSONX = Object.assign({}, sampleJSONX, { asyncprops: testVals, });
      const JSONXP = getJSONXProps({ jsonx: testJSONX, traverseObject, });
      EXPECTChai(JSONXP.auth).to.be.undefined;
      EXPECTChai(JSONXP.username).to.be.undefined;
    });
  });
  describe('getChildrenComponents', () => {
    const getChildrenComponents = _jsonxProps.getChildrenComponents;
    it('should return undefined children if missing __spread prop', () => {
      //@ts-ignore
      EXPECTChai(getChildrenComponents().children).to.be.undefined;
    });
    it('should return error in children if missing __spread prop and if in debug mode', () => {
      //@ts-ignore
      EXPECTChai(getChildrenComponents({ jsonx:{ debug:true ,}, }).children).to.be.a('string');
      EXPECTChai(getChildrenComponents.call({ debug:true ,}).children).to.be.a('string');
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
      EXPECTChai(spreadChilds).to.haveOwnProperty('_children');
      EXPECTChai(spreadChilds._children).to.have.lengthOf(options.allProps.__spread.length);
      // EXPECTChai(getChildrenComponents({ jsonx:{ debug:true ,}, }).children).to.be.a('string');
    });
  });
  describe('boundArgsReducer', () => { 
    const {boundArgsReducer} =_jsonxProps
    it('should return reducer function', () => {
      //@ts-ignore
      EXPECTChai(_jsonxProps.boundArgsReducer.bind()).to.be.a('function');
    });
    it('should return the stateful properties',()=>{
      const thisObject = {
        state:{
          cool:'beans',
          wow:'factor',
          not:undefined
        }
      }
      const reducer = boundArgsReducer.call(thisObject)
      const statefulVal = reducer(['cool'],'cool')
      const statefulVal2 = reducer(['cool'],'cool2')
      const statefulVal3 = reducer([],'cool2')
      const statefulVal4 = reducer([],'cool')
      const statefulVal5 = reducer([undefined],'cool2')
      const statefulVal6 = reducer([undefined],'not')
      expect(statefulVal).toMatchObject([ 'cool', 'beans' ])
      expect(statefulVal2).toMatchObject([ 'cool' ])
      expect(statefulVal3).toMatchObject([])
      expect(statefulVal4).toMatchObject([ 'beans' ])
      expect(statefulVal5).toMatchObject([])
      expect(statefulVal6).toMatchObject([])
    });
    it('should return the props properties',()=>{
      const thisObject = {
        props:{
          cool:'beans',
          wow:'factor',
          not:undefined
        }
      }
      const reducer = boundArgsReducer.call(thisObject)
      const propsVal = reducer(['cool'],'cool')
      const propsVal2 = reducer(['cool'],'cool2')
      const propsVal3 = reducer([],'cool2')
      const propsVal4 = reducer([],'cool')
      const propsVal5 = reducer([undefined],'cool2')
      const propsVal6 = reducer([undefined],'not')
      expect(propsVal).toMatchObject([ 'cool', 'beans' ])
      expect(propsVal2).toMatchObject([ 'cool' ])
      expect(propsVal3).toMatchObject([])
      expect(propsVal4).toMatchObject([ 'beans' ])
      expect(propsVal5).toMatchObject([])
      expect(propsVal6).toMatchObject([])
    });
    it('should return the jsonx properties',()=>{
      const jsonx={
        props:{
          cool:'beans',
          wow:'factor',
          not:undefined
        }
      }
      const reducer = boundArgsReducer.call({},jsonx)
      const jsonxVal = reducer(['cool'],'cool')
      const jsonxVal2 = reducer(['cool'],'cool2')
      const jsonxVal3 = reducer([],'cool2')
      const jsonxVal4 = reducer([],'cool')
      const jsonxVal5 = reducer([undefined],'cool2')
      const jsonxVal6 = reducer([undefined],'not')
      //@ts-ignore
      const jsonxVal7 = reducer([undefined],undefined)
      expect(jsonxVal).toMatchObject([ 'cool', 'beans' ])
      expect(jsonxVal2).toMatchObject([ 'cool' ])
      expect(jsonxVal3).toMatchObject([])
      expect(jsonxVal4).toMatchObject([ 'beans' ])
      expect(jsonxVal5).toMatchObject([])
      expect(jsonxVal6).toMatchObject([])
      expect(jsonxVal7).toMatchObject([])
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
      EXPECTChai(JSONXP.auth).to.be.true;
      EXPECTChai(evalutedComputedFunc).to.eql('bob');
      EXPECTChai(evalutedComputedBoundFunc).to.eql('bounded');
    });
    it('should return all evaluated props using __dangerouslyEvalAllProps',()=>{
      const jsonx = {
        component:"div",
        __dangerouslyEvalAllProps: function(){
          return {title:'div title', foo:'bar'}
        },
        children:'Hello World'
      }
      const evaledProps = getEvalProps.call({},{jsonx})
      expect(evaledProps).toMatchObject( { title: 'div title', foo: 'bar' })
    })
    it('should throw errors using __dangerouslyEvalAllProps',()=>{
      const jsonx = {
        component:"div",
        __dangerouslyEvalAllProps: 'INVALID',
        children:'Hello World'
      }
      const evaledProps = getEvalProps.call({ debug: true },{jsonx})
      const evaledPropsNoDebug = getEvalProps.call({},{jsonx})
      //@ts-ignore
      expect(evaledProps.error).toBeInstanceOf(Error)
      expect(evaledPropsNoDebug).toMatchObject({})
      // expect(evaledProps).toMatchObject( { title: 'div title', foo: 'bar' })
    });
    it('should handle errors with __dangerouslyEvalProps',()=>{
      const jsonx = {
        component:"div",
        __dangerouslyEvalProps:{
          title:'INVALID',
        },
        children:'Hello World'
      }
      const evaledProps = getEvalProps.call({ debug: true },{jsonx})
      const evaledPropsNoDebug = getEvalProps.call({},{jsonx})

      //@ts-ignore
      expect(evaledProps.title).toBeInstanceOf(Error)
      //@ts-ignore
      expect(evaledPropsNoDebug.title).toBe(undefined)

      const evaledPropsExposed = getEvalProps.call({ exposeEval: true },{
        jsonx:{
          component:"div",
          __dangerouslyEvalProps:{
            title:function(jsonx){return true},
          },
        },
        //@ts-ignore
        children:'Hello World'
      })
      //@ts-ignore
      expect(evaledPropsExposed.__eval_title).toBe('function (jsonx) { return true; }')
      // console.log({evaledPropsExposed})
    })
    it('should handle __dangerouslyBindEvalProps',()=>{
      const jsonx = {
        component:"div",
        __dangerouslyBindEvalProps:{
          title:function(a:string){
            return 'text for title: '+a 
          },
        },
        __functionargs:{
          title: ['customTitle']
        },
        children:'Hello World'
      }
      //@ts-ignore
      const evaledProps = getEvalProps.call({ debug: true, state:{ customTitle:'inserted funcArg'} },{jsonx})
      //@ts-ignore
      const calcTitle = evaledProps.title()
      expect(calcTitle).toBe('text for title: inserted funcArg')
    })
    it('should handle errors from __dangerouslyBindEvalProps',()=>{
      const jsonx = {
        component:"div",
        __dangerouslyBindEvalProps:{
          title:'INVALID',
        },
        children:'Hello World'
      }
      //@ts-ignore
      const evaledProps = getEvalProps.call({ debug: true, },{jsonx})
      //@ts-ignore
      expect(evaledProps.title).toBeInstanceOf(Error)
    })
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
      EXPECTChai(windowProps.useWelcome.type).to.eql(Welcome);
      EXPECTChai(windowProps.useWelcome.props.name).to.eql(allProps.__windowComponentProps.name);
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
      EXPECTChai(jsonxObj).is.an('object');
      EXPECTChai(Object.keys(jsonxObj)).to.eql(Object.keys(jsonxTest.__functionProps));
      EXPECTChai(jsonxObj.onclick()).to.eq('clicked');
      EXPECTChai(jsonxObj.printPage()).to.eql('printed');
      EXPECTChai(jsonxObj.nav()).to.eql('pushed');
    });
  });
  describe('getFunctionFromProps', () => {
    const getFunctionFromProps = _jsonxProps.getFunctionFromProps;
    const getFunctionProps = _jsonxProps.getFunctionProps;
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
      EXPECTChai(func).to.be.a('function');
      EXPECTChai(defaultFunc).to.be.a('function');
      // EXPECTChai(func.toString()).to.eq(emptyFunction.toString());
      // EXPECTChai(defaultFunc.toString()).to.eq(emptyFunction.toString());
      EXPECTChai(logError.called).to.be.true;
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
      EXPECTChai(func).to.be.a('function');
      EXPECTChai(func()).to.eq('pushed');
      EXPECTChai(logError.called).to.be.false;
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
      EXPECTChai(func).to.be.a('function');
      EXPECTChai(func()).to.eq('clicked');
      EXPECTChai(logError.called).to.be.false;
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
      EXPECTChai(func).to.be.a('function');
      EXPECTChai(funcDeep).to.be.a('function');
      EXPECTChai(func()).to.eq('printed');
      EXPECTChai(funcDeep()).to.eq('gotItem');
      EXPECTChai(logError.called).to.be.false;
    });
    it('should generate inline functions',()=>{
      const jsonx = {
        component: "button",
        props: {
          name: "test"
        },
        __functionargs: {
          onClick: ["name"]
        },
        __inline: {
          onClick: ` return ("the name of this component from the prop is:" +arguments[0])`
        },
        __functionProps: {
          onClick: "func:inline.onClick"
        }
      };
      const inlineFunction = getFunctionFromProps.call({},{
        propFunc:'func:inline.onClick',
        propBody: ` return ("the name of this component from the prop is:" +arguments[0])`,
        functionProperty:'onClick',
        jsonx,
      })
      const inlineOutput = inlineFunction()
      const fromFunctionProps = getFunctionProps.call({},{
        allProps:{},
        jsonx,
      })
      expect(typeof inlineFunction).toBe('function')
      expect(inlineOutput).toBe('the name of this component from the prop is:test')
      expect(inlineFunction()).toMatch(fromFunctionProps.onClick())
    })
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
      EXPECTChai(JSONXP.myComponent).to.be.an('object');
      EXPECTChai(JSONXP.myComponent).to.haveOwnProperty('$$typeof');
      EXPECTChai(JSONXP.myComponent).to.haveOwnProperty('type');
      EXPECTChai(JSONXP.myComponent).to.haveOwnProperty('key');
      EXPECTChai(JSONXP.myComponent).to.haveOwnProperty('ref');
      EXPECTChai(JSONXP.myComponent).to.haveOwnProperty('props');
    });
    it('should handle errors',()=>{
      const erroredComponent = getComponentProps.call({debug:true, logError:()=>{}},{
        jsonx:{
          component:'div',
          __dangerouslyInsertComponents:{
            children:{
              component:'invalid',
              props:false
            }
          }
        }
      })
      //@ts-ignore
      expect(erroredComponent.children).toMatch("ReferenceError: Invalid React Component (invalid)")
      // console.log({erroredComponent})
    })
  });
  describe('getReactComponents',()=>{
    const getReactComponents = _jsonxProps.getReactComponents;
    it('should create a function component from a function',()=>{
      const jsonxWithFunc = getReactComponents.call({},{
        jsonx:{
          component:'div',
          __dangerouslyInsertFunctionComponents:{
            tick:{
              function:function(){
                console.log('clicked!')
                return {
                  component:'span',
                  children:'from func'
                }
              },
              options:{
                name:'spanFunc'
              }
            }
          },
          children:'click me'
        }
      });
      expect(jsonxWithFunc.tick.name).toBe('spanFunc');
    });
    it('should invoke a function component from a function',()=>{
      const jsonxWithFunc = getReactComponents.call({},{
        jsonx:{
          component:'div',
          __dangerouslyInsertFunctionComponents:{
            children:{
              function:function(){
                // console.log('clicked!')
                return {
                  component:'p',
                  children:'from func'
                }
              },
              options:{
                name:'spanFunc'
              },
              invoke:true,
            }
          },
          children:'click me'
        }
      });
      // console.log('typeof jsonxWithFunc.children',typeof jsonxWithFunc.children)
      // console.log('jsonxWithFunc.children',jsonxWithFunc.children)
      expect(jsonxWithFunc.children.type).toBe('p');
    });
    it('should create a function component from createFunctionComponent args',()=>{
      const jsonxWithFunc = getReactComponents.call({},{
        jsonx:{
          component:'div',
          __dangerouslyInsertFunctionComponents:{
            tick:{
              functionBody:'console.log("clicked!")',
              reactComponent:{
                component:'span',
                children:'from func',
              },
              options:{
                name:'spanFunc'
              }
            }
          },
          children:'click me'
        }
      });
      expect(jsonxWithFunc.tick.name).toBe('spanFunc');
    });
    it('should handle errors create a function component from createFunctionComponent args',()=>{
      const jsonxWithFunc = getReactComponents.call({debug:true},{
        jsonx:{
          component:'div',
          __dangerouslyInsertFunctionComponents:{
            tick:{
              functionBody:'INVALID',
              reactComponent:{
                component:'INVALID COMPONENT',
              },
              options:{
                name:'000INVALID'
              }
            }
          },
          children:'click me'
        }
      });
      expect(jsonxWithFunc.tick).toBeInstanceOf(Error);
      // console.log('jsonxWithFunc',jsonxWithFunc)
    });
    it('should handle errors create a class component from classComponents args',()=>{
      const jsonxWithFunc = getReactComponents.call({debug:true},{
        jsonx:{
          component:'div',
          __dangerouslyInsertClassComponents:{
            tick:{
              reactComponent:{
                component:'INVALID COMPONENT',
              },
              options:{
                name:'000INVALID'
              }
            }
          },
          children:'click me'
        }
      });
      expect(jsonxWithFunc.tick).toBeInstanceOf(Error);
    });
    it('should create a class component from classComponents args',()=>{
      const jsonxWithFunc = getReactComponents.call({debug:true},{
        jsonx:{
          component:'div',
          __dangerouslyInsertClassComponents:{
            tick:{
              reactComponent:{
                render:{
                  body:{

                    component:'span',
                    children:'Class Component'
                  },
                },
              },
              options:{
                name:'spanClass'
              }
            }
          },
          children:'click me'
        }
      });
      expect(typeof jsonxWithFunc.tick).toBe('function');
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
      EXPECTChai(JSONXP.myComponent).to.be.an('string');
      //@ts-ignore
      EXPECTChai(JSONXP.myComponent).to.eql('p');
    });
  });

});