import * as jsonx from './index';
// import mochaJSDOM from 'jsdom-global';
import path from 'path';
import chai from 'chai';
import sinon from 'sinon';
import React, { ReactElement } from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect as expectCHAI, } from 'chai';
import { JSDOM, } from 'jsdom';
// chai.use(require('sinon-chai'));
// import 'mocha-sinon';

// import useGlobalHook from 'use-global-hook';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as defs from "./types/jsonx/index";


const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    key:5
  },
  children: [
    {
      component: 'p',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        key:3
      },
      children:'hello world',
    },
  ],
};
const simpleJSONX = {
  div: {
    props: {
      id: 'generatedJSONX',
      className: 'jsonx',
      key:0,
    },
    children: [
      {
        p: {
          props: {
            style: {
              color: 'red',
              fontWeight:'bold',
            },
            key:1,
          },
          children:'hello world',
        },
      },
    ],
  },
};
const sampleJSONXJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true }, sampleJSONX);
const simpleJSONXJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true }, simpleJSONX);

const simpleDiv = {
  component: 'div',
  props: { title: 'test', },
  children: 'hello',
};
const complexDiv = {
  component: 'div',
  props: { title: 'test', },
  children: [
    {
      button: {
        props: {
          //@ts-ignore
          onClick: function (e) {
            console.log({ e, });
          },
        },
        children:'log event',
      },
    },
    {
      component: 'button',
      __dangerouslyBindEvalProps: {
        onClick:`(function(e){
          console.log({ e });
        })`,
      },
      children:'log even two',
    },
  ],
};
const simpleDivJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true, }, simpleDiv);
const complexDivJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true, exposeEval:true, }, complexDiv);


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
    jsonx:{
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

describe('jsonx', function () { 
  describe('helper functions', () => {
    // it('should return useGlobalHook', () => {
    //   const ugh = jsonx.__getUseGlobalHook();
    //   console.log({ ugh });
    //   expectCHAI(jsonx.__getUseGlobalHook()).to.be.a('function');
    // });
    it('should return React', () => {
      expectCHAI(jsonx.__getReact()).to.eql(React);
    });
    it('should return ReactDOM', () => {
      expectCHAI(jsonx.__getReactDOM()).to.eql(ReactDOM);
    });
  });
  it('should generate complex components',()=>{
      const jsonxWithFunc = {
        component:'div',
        __dangerouslyInsertFunctionComponents:{
          _children:{
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
      };
      //@ts-ignore
      const ReactiveJSON = jsonx.getReactElementFromJSONX(jsonxWithFunc);

      // console.log({jsonxWithFunc,ReactiveJSON})
  });
  describe('getReactElementFromJSONX', () => {
    it('should render custom elements',()=>{
      const originalConsoleError = console.error;
      const originalConsoleLog = console.log;
      console.error=jest.fn();
      console.log=jest.fn();
      // const JsonxEl = jsonx.getReactElementFromJSONX
      const JsonxEl = jsonx.outputHTML
        .call(
          {
            customComponents,
            // debug: true,
            disableRenderIndexKey: false,
            useJSON: false,
          },
          {
            jsonx:{
              // test:true,
              component:'div',
              children:[
                { component:'p', children:'hello world'},
                { component: 'genFuncDef',  },
                { component: 'genFunc',  },
                { component: 'genClass',  },
                { component: 'MyLib.CompA',  },
              ],
            },
          });
      // console.log('JsonxEl',JsonxEl)
      expect(JsonxEl).toMatch('<div><p>hello world</p><span>gen custom def</span><span>gen custom</span><p><span>My Custom React Component Status: </span><span></span></p><div>gen lib function comp a</div></div>')
      //@ts-ignore
      // const {container}=render(<JsonxEl/>);
      // console.log('container.innerHTML',container.innerHTML)
      console.error = originalConsoleError
      console.log = originalConsoleLog
    });
    it('should debug invalid componets',()=>{
      const originalConsoleError = console.error;
      console.error=jest.fn();
      expect(jsonx.getReactElementFromJSONX.call({debug:true},{component:'wrong'})).toBe("ReferenceError: Invalid React Component (wrong)");
      console.error = originalConsoleError
    })
    it('should return an instance of a react element', () => {
      //@ts-ignore
      const ReactiveJSON = jsonx.getReactElementFromJSONX(sampleJSONX);
      //@ts-ignore
      const ReactiveSimpleJSON = jsonx.getReactElementFromJSONX(simpleJSONX);
      expectCHAI(ReactTestUtils.isElement(ReactiveJSON));
      expectCHAI(ReactTestUtils.isElement(ReactiveSimpleJSON));
      expectCHAI(ReactiveJSON).to.be.an('object');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('$$typeof');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('type');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('key');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('ref');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('props');
    });
    it('should handle errors with empty components', () => {
      //@ts-ignore
      const emptySpanComponent = jsonx.getReactElementFromJSONX({});
      const emptySpanComponentDebugged = jsonx.getReactElementFromJSONX.call({ debug: true, }, {}, {});
      expectCHAI(emptySpanComponent).to.be.an('object');
      expectCHAI(emptySpanComponentDebugged).to.be.an('object');
      //@ts-ignore
      expectCHAI(emptySpanComponentDebugged.props.children).to.eql('Error: Missing Component Object');
    });
    it('should throw an error with invalid components', () => {
      const loggerSpy = sinon.spy();
      expectCHAI(jsonx.getReactElementFromJSONX.bind({}, { component: 'somethingInvalid', })).to.throw('Invalid React Component (somethingInvalid)');
      try {
        jsonx.getReactElementFromJSONX.call({ debug: true, logError: loggerSpy, }, { component: 'somethingInvalid', }, {});
      } catch (e) {
        expectCHAI(loggerSpy.called).to.be.true;
        expectCHAI(e).to.be.an('error');
      }
    });
    it('should return testing output', () => {
      const ReactiveJSON = jsonx.getReactElementFromJSONX.call({}, { ...sampleJSONX, test: true });
      expectCHAI(ReactiveJSON).to.be.a('string');
      expectCHAI(ReactiveJSON).to.include('element');
      expectCHAI(ReactiveJSON).to.include('props');
      expectCHAI(ReactiveJSON).to.include('children');
    });
  });
  describe('getReactElementFromJSON', () => {
    it('should return an instance of a react element', () => {
      //@ts-ignore
      const ReactiveJSON = jsonx.getReactElementFromJSON(sampleJSONXJSON);
      //@ts-ignore
      const ReactiveSimpleJSON = jsonx.getReactElementFromJSON(simpleJSONXJSON);
      expectCHAI(ReactTestUtils.isElement(ReactiveJSON)).to.be.true;
      expectCHAI(ReactTestUtils.isElement(ReactiveSimpleJSON)).to.be.true;
      expectCHAI(ReactiveJSON).to.be.an('object');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('$$typeof');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('type');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('key');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('ref');
      expectCHAI(ReactiveJSON).to.haveOwnProperty('props');
    });
  });
  describe('compile', () => { 
    it('should convert JSONX to React Element', () => {
      const dom = new JSDOM(`<!DOCTYPE html>
      <body>
        <div id="root"/>
      </body>`);
      // global.document = dom.window.document;
      // global.document.createElement = React.createElement;
      // console.log('dom.window',dom.window)
      //@ts-ignore
      global.window = dom.window;
      global.window.React = React;
      global.document = global.window.document;
      // console.log("dom.window.document.querySelector('#root')",dom.window.document.querySelector('#root'));
      //@ts-ignore
      const ReactiveJSON = jsonx.compile(sampleJSONXJSON);
      //@ts-ignore
      const testDOM = ReactTestUtils.renderIntoDocument(ReactiveJSON());
      // console.log({testDOM});
      //@ts-ignore
      expectCHAI(ReactTestUtils.isDOMComponent(testDOM)).to.be.true;
      expectCHAI(ReactiveJSON).to.be.a('function');
      // expectCHAI(ReactTestUtils.isCompositeComponent(ReactiveJSON)).to.be.true;
    });
  });
  describe('outputJSON', () => { 
    it('should convert JSONX to JSON', () => {
      const compiledJSON = jsonx.outputJSON(simpleDiv);
      const compiledJSONXJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true, }, simpleDiv);
      //@ts-ignore
      expectCHAI(compiledJSON.children).to.eql(compiledJSONXJSON.children);
      //@ts-ignore
      expectCHAI(compiledJSON.type).to.eql(compiledJSONXJSON.type);
    });
  });
  describe('outputJSX', () => {
    it('should compile to JSX String', () => {
      //@ts-ignore
      const JSXString = jsonx.outputJSX(simpleDiv);
      expectCHAI(JSXString).to.include('title="test">hello</div>');
      // console.log({ JSXString,  });
    });
  });
  describe('jsonToJSX', () => {
    // const util = require('util');
    // console.log(util.inspect({ simpleDivJSON, complexDivJSON, },{depth:20}));
    it('should compile to JSX String', () => {
      //@ts-ignore
      const JSXString = jsonx.jsonToJSX(simpleDivJSON);
      //@ts-ignore
      const complexJSXString = jsonx.jsonToJSX(complexDivJSON);
      expectCHAI(JSXString).to.include('title="test">hello</div>');
      expectCHAI(complexJSXString).to.be.a('string');
      // console.log({ JSXString, complexJSXString, });
      // console.log(complexJSXString);
    });
  });
  describe('outputHTML', () => {
    it('should be an alias for jsonxHTMLString', () => {
      expectCHAI(jsonx.outputHTML).to.eql(jsonx.jsonxHTMLString);
    });
  });
  describe('jsonxHTMLString', () => {
    it('should return an HTML string', () => {
      //@ts-ignore
      const jsonxString = jsonx.jsonxHTMLString({ jsonx: sampleJSONX, });
      const dom = new JSDOM(`<!DOCTYPE html><body>${jsonxString}</body>`);

      expectCHAI(jsonxString).to.be.a('string');
      expectCHAI(dom.window.document.body.querySelector('p').innerHTML).to.eql('hello world');
      expectCHAI(dom.window.document.body.querySelector('p').style.color).to.eql('red');
    });
  });
  describe('__express', () => {
    const sampleJSONXFilepath = path.resolve('./src/mock/sample.jsonx');
    const spantext = 'should render in express';
    it('should return an HTML string', (done) => {
      jsonx.__express(
        sampleJSONXFilepath,
        {
          spantext,
          __boundConfig: {
            debug:false,
          },
          __DOCTYPE:'',
        },
        //@ts-ignore
        ((err, renderedString) => {
          const dom = new JSDOM(renderedString);
          if (renderedString) {
            expectCHAI(dom.window.document.querySelector('#generatedJSONX').getAttribute('title')).to.eql(spantext);
            expectCHAI(err).to.be.null;
            expectCHAI(renderedString).to.be.a('String');
          }
          done(err);
        })
      );
    });
    it('it should handle errors', (done) => {
      //@ts-ignore
      expectCHAI(jsonx.__express.bind()).to.throw;
      //@ts-ignore
      jsonx.__express(null,null, (err,template) => {
        expectCHAI(err).to.eql(null);
        expectCHAI(template).to.eql('<!DOCTYPE html>\n');
        done();
      })
    });
  });
  describe('jsonxRender', () => {
    // beforeAll(function () {
    //   // this.jsdom = mochaJSDOM();
    // });
    it('should render component inside of querySelector', function () {
      const containerDiv = document.createElement('div');
      containerDiv.setAttribute('id', 'reactContainer');
      document.body.appendChild(containerDiv);
      //@ts-ignore
      jsonx.jsonxRender({ jsonx: sampleJSONX, querySelector:'#reactContainer', });
      //@ts-ignore
      expectCHAI(document.body.querySelector('p').innerHTML).to.eql('hello world');
      //@ts-ignore
      expectCHAI(document.body.querySelector('p').style.color).to.eql('red');
    });    
    // afterAll(function () {
    //   // this.jsdom();
    // });
  });
});