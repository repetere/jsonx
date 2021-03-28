import * as jsonx from './index';
import * as _jsonxComponents from './components';
import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMServer from "react-dom/server";
import ReactDOMElements from 'react-dom-factories';

import { expect, } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
// import 'mocha-sinon';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// chai.use(require('sinon-chai'));
// import 'mocha-sinon';

// import useGlobalHook from 'use-global-hook';
Enzyme.configure({ adapter: new Adapter() });

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

describe('jsonx components', function () { 
  describe('advancedBinding', () => {
    it('should use advancedBinding based on user agent', () => {
      expect(_jsonxComponents.advancedBinding).to.be.true;
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

      expect(bindSpy.called).to.be.true;
      //@ts-ignore
      expect(JSONXPropCheck.props.title).to.eql(customThis.props.extraname);
      //@ts-ignore
      expect(customComponents.length).to.eql(reactComponents.length);
      //@ts-ignore
      expect(customComponentsNotBound).to.be.ok
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
          //@ts-ignore
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
        //@ts-ignore
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

    //       expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('Welcome');
    //       expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeNonBind');
    //       expect(window_test_jsonx._jsonxComponents.componentMap).to.haveOwnProperty('WelcomeBindSpy');
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
      expect(myFunc()).to.eql(3);
    });
    it('should name the function',()=>{
      const myFunc = getFunctionFromEval({
        body: 'return 3;',
        name:'myFunction'
      });
      expect(myFunc.name).to.eql('myFunction');
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
      expect(MyCustomComponent).to.be.a('function');
      expect(MyCustomComponentClass).to.be.a('function');
      expect(ReactTestUtils.isElement(MyCustomComponent)).to.be.false;
      // expect(ReactTestUtils.isCompositeComponent(MyCustomComponentClass())).to.be.true;
    });
    it('should allow for functions as object props', () => {
      const classBodyOpts = Object.assign({}, classBody);
      //@ts-ignore
      classBodyOpts.componentDidMount = function () {
        console.log('mounted!');
      };
      //@ts-ignore
      expect(getReactClassComponent.bind(null, classBodyOpts)).to.not.throw;
    });
    it('should allow for custom class names', () => { 
      //@ts-ignore
      const MyCustomComponentNameClass = getReactClassComponent(classBody, '', { name: 'myClass', });
      expect(MyCustomComponentNameClass).to.be.a('function');
    });
    it('should throw an error if missing a render function', () => { 
      //@ts-ignore
      expect(getReactClassComponent.bind()).to.throw;
    });
    it('should throw an error if missing a function is missing a body', () => {
      //@ts-ignore
      expect(getReactClassComponent.bind({ render: {}, })).to.throw;
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
      
      expect(MyCustomLazyComponent).to.be.a('object');
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
      expect(MyCustomComponentMadeFunction.name).to.eql('functionComponentWithHook');
      expect(MyCustomComponentMadeFunction).to.be.a('function');
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
      expect(MyCustomComponentNameless.name).to.eql('Anonymous');
      expect(MyCustomComponentNameless).to.be.a('function');
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
      expect(MyCustomComponentNameless.name).to.eql('Anonymous');
      expect(MyCustomComponentNameless).to.be.a('function');
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
      expect(MyCustomComponent.name).to.eql('myComp');
      expect(MyCustomComponent).to.be.a('function');
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
      
      expect(MyCustomLazyComponent).to.be.a('object');
    });
  });
  describe('DynamicComponent', () => {
    const DynamicComponent = _jsonxComponents.DynamicComponent;
    it('should react a React Function Component', () => { 
      //@ts-ignore
      // const wrapper = mount(<DynamicComponent key={3} 
      //   fetchURL='#'
      //   fetchOptions={{}} 
      //   jsonx={{ component: 'div', children: 'test' }} />);
      // expect(wrapper.text()).to.contain('...Loading');
      expect(DynamicComponent).to.be.a('function');
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
      expect(myDynamicFunction).to.be.a('function');
      expect(myDynamicFunction.name).to.eql('bound myDynamicFunction');
      //@ts-ignore
      const m = React.createElement(myDynamicFunction,{},undefined)
      //@ts-ignore
      const r = ReactDOMServer.renderToString(myDynamicFunction,{title:'called prop'},undefined)
      // console.log({r},r)
      // console.log({m},m)
      expect(m.type).to.eql(myDynamicFunction)
      // console.log('myDynamicFunction',myDynamicFunction,{myDynamicFunction})
    })
  });
  describe('FormComponent', () => {
    const FormComponent = _jsonxComponents.FormComponent;
    it('should react a React Function Component', () => { 
      // //@ts-ignore
      // const wrapper = mount(<FormComponent />);
      // // console.log('wrapper.text()',wrapper.text())
      // expect(wrapper.text()).to.contain('empty');
      expect(FormComponent).to.be.a('function');
    });
    it('should render a component',()=>{
      const myFormComponent = FormComponent.call({},{
        name:'myFormComponent',
      })
      expect(myFormComponent).to.be.a('function');
      expect(myFormComponent.name).to.eql('bound myFormComponent');
      // console.log('myFormComponent',myFormComponent,{myFormComponent})
      //@ts-ignore
      const m = React.createElement(myFormComponent,undefined,undefined)
      expect(m.type).to.eql(myFormComponent)

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
      expect(invokedFormFunctionComponent).to.be.ok

      const wrapperOptions  = { 
        ...options,
        formWrapperProps:{title:'added wrapped prop'},
        formWrapperComponent:{component:'div'}
      }
      //@ts-ignore
      const WrappedFormFunctionComponent:React.FunctionComponent = FormComponent.call({},wrapperOptions);
      //@ts-ignore
      const invokedWrappedFormFunctionComponent =React.createElement(WrappedFormFunctionComponent,{sub_title:'called props'},'');
      expect(invokedWrappedFormFunctionComponent).to.be.ok

    })
  });
  describe('getReactContext', () => {
    const getReactContext = _jsonxComponents.getReactContext;
    it('should return a React Context Object', () => {
      const context = getReactContext({ some: 'c', });
      expect(ReactTestUtils.isElement(context)).to.be.false;
      expect(context).to.be.an('object');
      // expect(context).to.be.an.instanceOf(React.createContext);
    });
  });
});