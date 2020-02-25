import * as jsonx from './index';
// import mochaJSDOM from 'jsdom-global';
import path from 'path';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect, } from 'chai';
import { JSDOM, } from 'jsdom';
// chai.use(require('sinon-chai'));
// import 'mocha-sinon';

// import useGlobalHook from 'use-global-hook';


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

describe('jsonx', function () { 
  describe('helper functions', () => {
    // it('should return useGlobalHook', () => {
    //   const ugh = jsonx.__getUseGlobalHook();
    //   console.log({ ugh });
    //   expect(jsonx.__getUseGlobalHook()).to.be.a('function');
    // });
    it('should return React', () => {
      expect(jsonx.__getReact()).to.eql(React);
    });
    it('should return ReactDOM', () => {
      expect(jsonx.__getReactDOM()).to.eql(ReactDOM);
    });
  });
  describe('getReactElementFromJSONX', () => {
    it('should return an instance of a react element', () => {
      const ReactiveJSON = jsonx.getReactElementFromJSONX(sampleJSONX);
      const ReactiveSimpleJSON = jsonx.getReactElementFromJSONX(simpleJSONX);
      expect(ReactTestUtils.isElement(ReactiveJSON));
      expect(ReactTestUtils.isElement(ReactiveSimpleJSON));
      expect(ReactiveJSON).to.be.an('object');
      expect(ReactiveJSON).to.haveOwnProperty('$$typeof');
      expect(ReactiveJSON).to.haveOwnProperty('type');
      expect(ReactiveJSON).to.haveOwnProperty('key');
      expect(ReactiveJSON).to.haveOwnProperty('ref');
      expect(ReactiveJSON).to.haveOwnProperty('props');
    });
    it('should handle errors with empty components', () => {
      const emptySpanComponent = jsonx.getReactElementFromJSONX({});
      const emptySpanComponentDebugged = jsonx.getReactElementFromJSONX.call({ debug: true, }, {}, {});
      expect(emptySpanComponent).to.be.an('object');
      expect(emptySpanComponentDebugged).to.be.an('object');
      expect(emptySpanComponentDebugged.props.children).to.eql('Error: Missing Component Object');
    });
    it('should throw an error with invalid components', () => {
      const loggerSpy = sinon.spy();
      expect(jsonx.getReactElementFromJSONX.bind({}, { component: 'somethingInvalid', })).to.throw('Invalid React Component (somethingInvalid)');
      try {
        jsonx.getReactElementFromJSONX.call({ debug: true, logError: loggerSpy, }, { component: 'somethingInvalid', }, {});
      } catch (e) {
        expect(loggerSpy.called).to.be.true;
        expect(e).to.be.an('error');
      }
    });
  });
  describe('getReactElementFromJSON', () => {
    it('should return an instance of a react element', () => {
      const ReactiveJSON = jsonx.getReactElementFromJSON(sampleJSONXJSON);
      const ReactiveSimpleJSON = jsonx.getReactElementFromJSON(simpleJSONXJSON);
      expect(ReactTestUtils.isElement(ReactiveJSON)).to.be.true;
      expect(ReactTestUtils.isElement(ReactiveSimpleJSON)).to.be.true;
      expect(ReactiveJSON).to.be.an('object');
      expect(ReactiveJSON).to.haveOwnProperty('$$typeof');
      expect(ReactiveJSON).to.haveOwnProperty('type');
      expect(ReactiveJSON).to.haveOwnProperty('key');
      expect(ReactiveJSON).to.haveOwnProperty('ref');
      expect(ReactiveJSON).to.haveOwnProperty('props');
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
      global.window = dom.window;
      global.window.React = React;
      global.document = global.window.document;
      // console.log("dom.window.document.querySelector('#root')",dom.window.document.querySelector('#root'));
      const ReactiveJSON = jsonx.compile(sampleJSONXJSON);
      const testDOM = ReactTestUtils.renderIntoDocument(ReactiveJSON());
      // console.log({testDOM});
      expect(ReactTestUtils.isDOMComponent(testDOM)).to.be.true;
      expect(ReactiveJSON).to.be.a('function');
      // expect(ReactTestUtils.isCompositeComponent(ReactiveJSON)).to.be.true;
    });
  });
  describe('outputJSON', () => { 
    it('should convert JSONX to JSON', () => {
      const compiledJSON = jsonx.outputJSON(simpleDiv);
      const compiledJSONXJSON = jsonx.getReactElementFromJSONX.call({ returnJSON: true, }, simpleDiv);
      expect(compiledJSON.children).to.eql(compiledJSONXJSON.children);
      expect(compiledJSON.type).to.eql(compiledJSONXJSON.type);
    });
  });
  describe('outputJSX', () => {
    it('should compile to JSX String', () => {
      const JSXString = jsonx.outputJSX(simpleDiv);
      expect(JSXString).to.include('title="test">hello</div>');
      // console.log({ JSXString,  });
    });
  });
  describe('jsonToJSX', () => {
    // const util = require('util');
    // console.log(util.inspect({ simpleDivJSON, complexDivJSON, },{depth:20}));
    it('should compile to JSX String', () => {
      const JSXString = jsonx.jsonToJSX(simpleDivJSON);
      const complexJSXString = jsonx.jsonToJSX(complexDivJSON);
      expect(JSXString).to.include('title="test">hello</div>');
      expect(complexJSXString).to.be.a('string');
      // console.log({ JSXString, complexJSXString, });
      // console.log(complexJSXString);
    });
  });
  describe('outputHTML', () => {
    it('should be an alias for jsonxHTMLString', () => {
      expect(jsonx.outputHTML).to.eql(jsonx.jsonxHTMLString);
    });
  });
  describe('jsonxHTMLString', () => {
    it('should return an HTML string', () => {
      const jsonxString = jsonx.jsonxHTMLString({ jsonx: sampleJSONX, });
      const dom = new JSDOM(`<!DOCTYPE html><body>${jsonxString}</body>`);

      expect(jsonxString).to.be.a('string');
      expect(dom.window.document.body.querySelector('p').innerHTML).to.eql('hello world');
      expect(dom.window.document.body.querySelector('p').style.color).to.eql('red');
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
        ((err, renderedString) => {
          const dom = new JSDOM(renderedString);
          if (renderedString) {
            expect(dom.window.document.querySelector('#generatedJSONX').getAttribute('title')).to.eql(spantext);
            expect(err).to.be.null;
            expect(renderedString).to.be.a('String');
          }
          done(err);
        })
      );
    });
    it('it should handle errors', (done) => {
      expect(jsonx.__express.bind()).to.throw;
      jsonx.__express(null,null, (err) => {
        expect(err).to.be.a('error');
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
      jsonx.jsonxRender({ jsonx: sampleJSONX, querySelector:'#reactContainer', });
      
      expect(document.body.querySelector('p').innerHTML).to.eql('hello world');
      expect(document.body.querySelector('p').style.color).to.eql('red');
    });    
    // afterAll(function () {
    //   // this.jsdom();
    // });
  });
});