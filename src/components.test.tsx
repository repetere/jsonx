import * as jsonx from './index';
import * as _jsonxComponents from './components';
import {getCustomComponentsCacheKey, getCustomFunctionComponent, getReactLibrariesAndComponents} from './components';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React, { Component, JSXElementConstructor, ReactComponentElement, ReactElement, ReactInstance } from 'react';
import ReactTestUtils,{isElement} from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMServer from "react-dom/server";
import ReactDOMElements from 'react-dom-factories';
import * as defs from "./types/jsonx/index";

import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { expect as expectCHAI, } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
// import 'mocha-sinon';
// import Enzyme, { mount, } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// chai.use(require('sinon-chai'));
// import 'mocha-sinon';

// import useGlobalHook from 'use-global-hook';
// Enzyme.configure({ adapter: new Adapter() });

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
    //@ts-ignore
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeBindSpy extends React.Component {
  render() {
    //@ts-ignore
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeNonBind extends React.Component {
  render() {
    //@ts-ignore
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

const customComponents:defs.jsonxCustomComponent[] = [
  {
    type: 'function',
    name: 'genFuncDef',
    functionComponent:function(){
      console.log("called generated function")
      return {
        component:'span',
        children:'gen custom def',
      }
    },
    options:{
      name:'genFuncDef'
    }
  },
  {
    type: 'function',
    name: 'genFunc',
    functionBody:'console.log("called generated function")',
    jsonxComponent:{
      component:'span',
      children:'gen custom',
    },
    options:{
      name:'genFun'
    }
  },
  {
    type: 'component',
    name: 'genClass',
    jsonx:{
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
    },
    options:{
      name:'genClass'
    }
  },
  {
    type:'library',
    name:'MyLib',
    jsonx:{
      CompA:{
        name:'CompA',
        type:'function',
        functionBody:'console.log("called generated function")',
        jsonxComponent:{
          component:'div',
          children:'gen lib function comp a',
        },
        options:{
          name:'CompA'
        }
      },
      CompB:{
        name:'CompB',
        type:'function',
        jsonxComponent:{
          component:'div',
          children:'gen lib function comp b',
        },
        options:{
          name:'CompB'
        }
      },
      CompC:{
        type: 'component',
        name: 'CompC',
        jsonxComponent:{
          componentDidMount: {
            body: 'console.log(\'mounted CompC\',this.props)',
            arguments: [],
          },
          render: {
            body: {
              component: 'div',
              children: 'CompC Class Component',
            },
          },
        },
        options:{
          name:'genClass'
        }
      }
    }
  }
];

describe('jsonx components', function () { 
  describe('advancedBinding', () => {
    it('should use advancedBinding based on user agent', () => {
      expectCHAI(_jsonxComponents.advancedBinding).to.be.true;
    });
  });
  describe('componentMap', () => {
    it('should export an object of components', () => {
      expectCHAI(_jsonxComponents.componentMap).to.be.a('object');
    });
    // it('should export an object of components', () => {
    //   global.window = {
    //     __jsonx_custom_elements: {
    //       cusEl: {},
    //     },
    //   };
    //   const comps = _jsonxComponents.componentMap;
    //   console.log({ comps });
    //   expectCHAI(_jsonxComponents.componentMap.cusEl).to.eql(global.window.__jsonx_custom_elements.cusEl);
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
        debug: false,
        returnJSON: true,
        logError:()=>{},
      };
      const customComponents = _jsonxComponents.getBoundedComponents.call(customThis,{ reactComponents, boundedComponents, advancedBinding:true, });
      const customComponentsNotBound = _jsonxComponents.getBoundedComponents.call(customThis,{ reactComponents, boundedComponents, advancedBinding:false, });
      // console.log(customComponents,customComponentsNotBound)

      const JSONXPropCheck = jsonx.getRenderedJSON.call(customThis, sampleCustomElementJSONX);

      expectCHAI(bindSpy.called).to.be.true;
      //@ts-ignore
      expectCHAI(JSONXPropCheck.props.title).to.eql(customThis.props.extraname);
      //@ts-ignore
      expectCHAI(customComponents.length).to.eql(reactComponents.length);
      //@ts-ignore
      expectCHAI(customComponentsNotBound).to.be.ok
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
      expectCHAI(_jsonxComponents.getComponentFromMap({
        jsonx: {
          //@ts-ignore
          component:Welcome,
        }, })).to.be.a('function').and.to.eql(Welcome);
    });
    it('should return the dom element string if a valid DOM elmenet in ReactDOM', () => {
      ['div', 'span', 'p', 'section', ].forEach(el => {
        const jsonxObj = { jsonx: { component: el, }, };
        expectCHAI(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(el);
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
      expectCHAI(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(Welcome);
    });
    it('should return a component library react element', () => {
      const jsonxObj = {
        jsonx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expectCHAI(_jsonxComponents.getComponentFromMap(jsonxObj)).to.eql(Welcome);
    });
    it('should handle errors', () => { 
      const logError = sinon.spy();
      expectCHAI(_jsonxComponents.getComponentFromMap.bind(null)).to.throw();
      try {
        //@ts-ignore
        _jsonxComponents.getComponentFromMap({ debug: true, logError, jsonx:false, });
      } catch (e) {
        expectCHAI(e).to.be.a('error');
        expectCHAI(logError.called).to.be.true;
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
      expectCHAI(_jsonxComponents.getComponentFromLibrary()).to.be.undefined;
    });
    it('should return a function if selecting valid component library', () => {
      const jsonxObj = {
        jsonx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expectCHAI(_jsonxComponents.getComponentFromLibrary(jsonxObj)).to.be.eql(Welcome);
      const jsonxObjDeep = {
        jsonx: {
          component: 'testLib.testGrouping.testComponent',
        },
        componentLibraries,
      };
      expectCHAI(_jsonxComponents.getComponentFromLibrary(jsonxObjDeep)).to.be.eql(componentLibraries.testLib.testGrouping.testComponent);

    });
  });
  describe('componentMap', () => {
    // before(function () {
    //   this.jsdom = mochaJSDOM();
    // });
    // it('should accept components from a window property', function (done) {
    //   window.__jsonx_custom_elements = {
    //     Welcome,
    //     WelcomeNonBind,
    //     WelcomeBindSpy,
    //   };
    //   Object.defineProperty(window, '__jsonx_custom_elements', {
    //     value: {
    //       Welcome,
    //       WelcomeNonBind,
    //       WelcomeBindSpy,
    //     },
    //   });

    //   // delete require.cache[ require.resolve('../../dist/jsonx.cjs') ];
    //   import('./index')
    //     .then(jsonxModule => {
    //       const window_test_jsonx = jsonxModule;
    //       console.log('window.__jsonx_custom_elements', window.__jsonx_custom_elements);

    //       expectCHAI(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('Welcome');
    //       expectCHAI(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeNonBind');
    //       expectCHAI(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeBindSpy');
    //       done();
    //     })
    //     .catch(done);
    // });    
    // after(function () {
    //   this.jsdom();
    // });
  });
  describe('getFunctionFromEval', () => {
    const getFunctionFromEval = _jsonxComponents.getFunctionFromEval;
    it('should return a new function', () => {
      const myFunc = getFunctionFromEval({
        body: 'return 3;',
      });
      expectCHAI(myFunc()).to.eql(3);
    });
    it('should name the function',()=>{
      const myFunc = getFunctionFromEval({
        body: 'return 3;',
        name:'myFunction'
      });
      expectCHAI(myFunc.name).to.eql('myFunction');
    })
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
      //@ts-ignore
      const MyCustomComponent = getReactClassComponent(classBody);
      //@ts-ignore
      const MyCustomComponentClass = getReactClassComponent(classBody, { returnFactory:false, });
      // const MyCustomComponentFactory = getReactClassComponent(classBody);
      // console.log({MyCustomComponentClass});
      expectCHAI(MyCustomComponent).to.be.a('function');
      expectCHAI(MyCustomComponentClass).to.be.a('function');
      expectCHAI(ReactTestUtils.isElement(MyCustomComponent)).to.be.false;
      // expectCHAI(ReactTestUtils.isCompositeComponent(MyCustomComponentClass())).to.be.true;
    });
    it('should allow for functions as object props', () => {
      const classBodyOpts = Object.assign({}, classBody);
      //@ts-ignore
      classBodyOpts.componentDidMount = function () {
        console.log('mounted!');
      };
      //@ts-ignore
      expectCHAI(getReactClassComponent.bind(null, classBodyOpts)).to.not.throw;
    });
    it('should allow for custom class names', () => { 
      //@ts-ignore
      const MyCustomComponentNameClass = getReactClassComponent(classBody, '', { name: 'myClass', });
      expectCHAI(MyCustomComponentNameClass).to.be.a('function');
    });
    it('should throw an error if missing a render function', () => { 
      //@ts-ignore
      expectCHAI(getReactClassComponent.bind()).to.throw;
    });
    it('should throw an error if missing a function is missing a body', () => {
      //@ts-ignore
      expectCHAI(getReactClassComponent.bind({ render: {}, })).to.throw;
    });
    it('should create suspense/lazy components', () => {
      //@ts-ignore
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
          //@ts-ignore
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
      
      expectCHAI(MyCustomLazyComponent).to.be.a('object');
    });
  });
  describe('makeFunctionComponent', () => {
    const makeFunctionComponent = _jsonxComponents.makeFunctionComponent;
    it('should create a React Function Component from a regular function', () => { 
      function functionComponentWithHook(){
        //@ts-ignore
        const [count, setCount] = useState(0);
        //@ts-ignore
        useEffect(()=>{
          console.log('only run once')
        },[])
        const exposeprops = {count,setCount}
        return {
          component:'div',
          passprops:true,
          children:[
            {
              component:'p',
              children: 'This is from functionComponentWithHook '
            },
            {
                component:'p',
                passprops:true,
                children:[
                  {
                    component:'span',
                    children:'You clicked ',
                  },
                  {
                    component:'input',
                    props:{
                      defaultValue:0
                    },
                    thisprops:{
                      value:['count'],
                    },
                  },
                  {
                    component:'span',
                    children:' times'
                  }
                ]
            },
            {
              component:'button',
              __dangerouslyBindEvalProps:{
                //@ts-ignore
                onClick(count,setCount){
                  setCount(count+1)
                },
              },
              children:'Click me'
            }
          ],
        }
      }
      //@ts-ignore
      const MyCustomComponentMadeFunction = makeFunctionComponent(functionComponentWithHook);
      expectCHAI(MyCustomComponentMadeFunction.name).to.eql('functionComponentWithHook');
      expectCHAI(MyCustomComponentMadeFunction).to.be.a('function');
    });
  }),
  describe('getReactFunctionComponent', () => {
    const getReactFunctionComponent = _jsonxComponents.getReactFunctionComponent;
    it('should react a React Function Component', () => { 
      //@ts-ignore
      const MyCustomComponentNameless = getReactFunctionComponent(
        {
          component:'p',
          children:'hello',
        },
        'console.log("lazy function body");',
        { },
      );
      expectCHAI(MyCustomComponentNameless.name).to.eql('Anonymous');
      expectCHAI(MyCustomComponentNameless).to.be.a('function');
    });
    it('should create react a React Function Component', () => { 
      //@ts-ignore
      const MyCustomComponentNameless = getReactFunctionComponent(
        {
          component:'p',
          children:'hello',
        },
        function myFuncBody(){ console.log('some function body') },
        { },
      );
      expectCHAI(MyCustomComponentNameless.name).to.eql('Anonymous');
      expectCHAI(MyCustomComponentNameless).to.be.a('function');
    });
    it('should create a React Function Component with a name', () => {
      //@ts-ignore
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
      expectCHAI(MyCustomComponent.name).to.eql('myComp');
      expectCHAI(MyCustomComponent).to.be.a('function');
    });

    it('should create suspense/lazy components', () => {
      //@ts-ignore
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
          //@ts-ignore
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
      
      expectCHAI(MyCustomLazyComponent).to.be.a('object');
    });
  });
  describe('DynamicComponent', () => {
    const DynamicComponent = _jsonxComponents.DynamicComponent;
    it('should react a React Function Component', () => { 
      // //@ts-ignore
      const MyDynamicComponent = DynamicComponent.call( {disableRenderIndexKey:false},{ name:'MyDynamicComponent', }) as any
      // //@ts-ignore
      const wrapper = render(<MyDynamicComponent id="testingForm" />);
      expectCHAI(wrapper).to.be.ok
      //@ts-ignore
      // const wrapper = mount(<DynamicComponent key={3} 
      //   fetchURL='#'
      //   fetchOptions={{}} 
      //   jsonx={{ component: 'div', children: 'test' }} />);
      // expectCHAI(wrapper.text()).to.contain('...Loading');
      expectCHAI(DynamicComponent).to.be.a('function');
    });
    it('should render a component',()=>{
      const myDynamicFunction = DynamicComponent.call({},{
        jsonx:{
          component:'div',
          children:[
            {
              component:'h1',
              props:{
                id:'fetchedTitle'
              },
              children:'Fetched Data'
            },
            {
              component:'p',
              props:{
                id:'fetchedP'
              },
              resourceprops:{
                children:['DynamicComponentData','result']
              }
            }
          ]
        },
        fetchURL:'#',
        name: 'myDynamicFunction',
        fetchFunction:()=>{
          return new Promise(resolve=>{
            setTimeout(()=>{
              resolve({result:'some mock data'})
            },1000)
          })  
        }
      })
      expectCHAI(myDynamicFunction).to.be.a('function');
      expectCHAI(myDynamicFunction.name).to.eql('bound myDynamicFunction');
      //@ts-ignore
      const m = React.createElement(myDynamicFunction,{},undefined)
      //@ts-ignore
      const r = ReactDOMServer.renderToString(myDynamicFunction,{title:'called prop'},undefined)
      // console.log({r},r)
      // console.log({m},m)
      expectCHAI(m.type).to.eql(myDynamicFunction)
      // console.log('myDynamicFunction',myDynamicFunction,{myDynamicFunction})
    })
  });
  describe('FormComponent', () => {
    const FormComponent = _jsonxComponents.FormComponent;
    it('should react a React Function Component', () => { 
      // //@ts-ignore
      const MyFormComponent = FormComponent.call( {disableRenderIndexKey:false},{ name:'MyFormComponent', }) as any
      // //@ts-ignore
      const wrapper = render(<MyFormComponent id="testingForm" />);
      // //@ts-ignore
      // const someElement = wrapper.container.querySelector('#testingForm');

      // console.log('someElement',someElement)
      // console.log('wrapper.text()',wrapper.text())
      // expectCHAI(wrapper.text()).to.contain('empty');
      expectCHAI(FormComponent).to.be.a('function');
      expectCHAI(wrapper).to.be.ok
    });
    it('should render a component',()=>{
      const myFormComponent = FormComponent.call({},{
        name:'myFormComponent',
      })
      expectCHAI(myFormComponent).to.be.a('function');
      expectCHAI(myFormComponent.name).to.eql('bound myFormComponent');
      // console.log('myFormComponent',myFormComponent,{myFormComponent})
      //@ts-ignore
      const m = React.createElement(myFormComponent,undefined,undefined)
      expectCHAI(m.type).to.eql(myFormComponent)

      // console.log({m},m)
    })
    it('should handle props passed to function',()=>{
      const options = {
        formComponent:{
          component:'form',
          children:'using form component'
        },
        onSubmit:(data:any)=>'submitted: '+JSON.stringify(data),
        hookFormOptions:{
          defaultValues:{ title:'testing form component' }
        }
      }
      //@ts-ignore
      const FormFunctionComponent:React.FunctionComponent = FormComponent.call({},options);
      //@ts-ignore
      const invokedFormFunctionComponent =React.createElement(FormFunctionComponent,{sub_title:'called props'},'');
      expectCHAI(invokedFormFunctionComponent).to.be.ok

      const wrapperOptions  = { 
        ...options,
        formWrapperProps:{title:'added wrapped prop'},
        formWrapperComponent:{component:'div'}
      }
      //@ts-ignore
      const WrappedFormFunctionComponent:React.FunctionComponent = FormComponent.call({},wrapperOptions);
      //@ts-ignore
      const invokedWrappedFormFunctionComponent =React.createElement(WrappedFormFunctionComponent,{sub_title:'called props'},'');
      expectCHAI(invokedWrappedFormFunctionComponent).to.be.ok

    })
  });
  describe('getReactContext', () => {
    const getReactContext = _jsonxComponents.getReactContext;
    it('should return a React Context Object', () => {
      const context = getReactContext({ some: 'c', });
      expectCHAI(ReactTestUtils.isElement(context)).to.be.false;
      expectCHAI(context).to.be.an('object');
      // expectCHAI(context).to.be.an.instanceOf(React.createContext);
    });
  });
  describe('getCustomFunctionComponent',()=>{
    it('should generate function components from custom components',()=>{
      const FuncString = getCustomFunctionComponent.call({},customComponents[0] as defs.jsonxCustomComponent);
      const FuncDef = getCustomFunctionComponent.call({},customComponents[1] as defs.jsonxCustomComponent);
      // console.log('funcString',FuncString)
      // console.log('FuncDef',FuncDef)
      const originalConsoleLog = console.log;
      console.log = jest.fn()
      //@ts-ignore
      const {container:containerFuncString} =render(<FuncString />)
      //@ts-ignore
      const {container:containerFuncDef} =render(<FuncDef />)
      expect(containerFuncString.innerHTML).toMatch('<span>gen custom def</span>')
      expect(containerFuncDef.innerHTML).toMatch('<span>gen custom</span>')
      expect(console.log).toBeCalledWith('called generated function')
      console.log=originalConsoleLog
    })
  });
  describe('getCustomComponentsCacheKey',()=>{
    it('should return a cachekey string from custom components',()=>{
      expect(getCustomComponentsCacheKey(customComponents as defs.jsonxCustomComponent[])).toMatch( 'genFuncDefgenFuncgenClassMyLib');
    })
  });
  describe('getReactLibrariesAndComponents',()=>{
    it('should generate components from customComponents',()=>{
      const { customComponentLibraries, customReactComponents } = getReactLibrariesAndComponents.call({},customComponents);
      expect(typeof customReactComponents.genFuncDef).toBe('function')
      expect(typeof customReactComponents.genFunc).toBe('function')
      expect(typeof customReactComponents.genClass).toBe('function')
      expect(typeof customComponentLibraries.MyLib.CompA).toBe('function')
      expect(typeof customComponentLibraries.MyLib.CompB).toBe('function')
      expect(typeof customComponentLibraries.MyLib.CompC).toBe('function')
    })
  })
});