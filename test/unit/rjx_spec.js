import * as rjx from '../../src/main';
import mochaJSDOM from 'jsdom-global';
import path from 'path';
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

import useGlobalHook from 'use-global-hook';


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
const simpleRJX = {
  div: {
    props: {
      id: 'generatedRJX',
      className:'rjx',
    },
    children: [
      {
        p: {
          props: {
            style: {
              color: 'red',
              fontWeight:'bold',
            },
          },
          children:'hello world',
        },
      },
    ],
  },
};
const sampleRJXJSON = rjx.getReactElementFromRJX.call({ returnJSON: true }, sampleRJX);
const simpleRJXJSON = rjx.getReactElementFromRJX.call({ returnJSON: true }, simpleRJX);

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
const simpleDivJSON = rjx.getReactElementFromRJX.call({ returnJSON: true, }, simpleDiv);
const complexDivJSON = rjx.getReactElementFromRJX.call({ returnJSON: true, exposeEval:true, }, complexDiv);

describe('rjx', function () { 
  describe('helper functions', () => {
    it('should return useGlobalHook', () => {
      expect(rjx.__getUseGlobalHook()).to.eql(useGlobalHook);
    });
    it('should return React', () => {
      expect(rjx.__getReact()).to.eql(React);
    });
    it('should return ReactDOM', () => {
      expect(rjx.__getReactDOM()).to.eql(ReactDOM);
    });
  });
  describe('getReactElementFromRJX', () => {
    it('should return an instance of a react element', () => {
      const ReactiveJSON = rjx.getReactElementFromRJX(sampleRJX);
      const ReactiveSimpleJSON = rjx.getReactElementFromRJX(simpleRJX);
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
      const emptySpanComponent = rjx.getReactElementFromRJX({});
      const emptySpanComponentDebugged = rjx.getReactElementFromRJX.call({ debug: true, }, {}, {});
      expect(emptySpanComponent).to.be.an('object');
      expect(emptySpanComponentDebugged).to.be.an('object');
      expect(emptySpanComponentDebugged.props.children).to.eql('Error: Missing Component Object');
    });
    it('should throw an error with invalid components', () => {
      const loggerSpy = sinon.spy();
      expect(rjx.getReactElementFromRJX.bind({}, { component: 'somethingInvalid', })).to.throw('Invalid React Component (somethingInvalid)');
      try {
        rjx.getReactElementFromRJX.call({ debug: true, logError: loggerSpy, }, { component: 'somethingInvalid', }, {});
      } catch (e) {
        expect(loggerSpy.called).to.be.true;
        expect(e).to.be.an('error');
      }
    });
  });
  describe('getReactElementFromJSON', () => {
    it('should return an instance of a react element', () => {
      const ReactiveJSON = rjx.getReactElementFromJSON(sampleRJXJSON);
      const ReactiveSimpleJSON = rjx.getReactElementFromJSON(simpleRJXJSON);
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
    it('should convert RJX to React Element', () => {
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
      const ReactiveJSON = rjx.compile(sampleRJXJSON);
      const testDOM = ReactTestUtils.renderIntoDocument(ReactiveJSON());
      // console.log({testDOM});
      expect(ReactTestUtils.isDOMComponent(testDOM)).to.be.true;
      expect(ReactiveJSON).to.be.a('function');
      // expect(ReactTestUtils.isCompositeComponent(ReactiveJSON)).to.be.true;
    });
  });
  describe('outputJSON', () => { 
    it('should convert RJX to JSON', () => {
      const compiledJSON = rjx.outputJSON(simpleDiv);
      const compiledRJXJSON = rjx.getReactElementFromRJX.call({ returnJSON: true, }, simpleDiv);
      expect(compiledJSON.children).to.eql(compiledRJXJSON.children);
      expect(compiledJSON.type).to.eql(compiledRJXJSON.type);
    });
  });
  describe('outputJSX', () => {
    it('should compile to JSX String', () => {
      const JSXString = rjx.outputJSX(simpleDiv);
      expect(JSXString).to.include('title="test">hello</div>');
      // console.log({ JSXString, complexJSXString, });
    });
  });
  describe('jsonToJSX', () => {
    // const util = require('util');
    // console.log(util.inspect({ simpleDivJSON, complexDivJSON, },{depth:20}));
    it('should compile to JSX String', () => {
      const JSXString = rjx.jsonToJSX(simpleDivJSON);
      const complexJSXString = rjx.jsonToJSX(complexDivJSON);
      expect(JSXString).to.include('title="test">hello</div>');
      expect(complexJSXString).to.be.a('string');
      // console.log({ JSXString, complexJSXString, });
    });
  });
  describe('outputHTML', () => {
    it('should be an alias for rjxHTMLString', () => {
      expect(rjx.outputHTML).to.eql(rjx.rjxHTMLString);
    });
  });
  describe('rjxHTMLString', () => {
    it('should return an HTML string', () => {
      const rjxString = rjx.rjxHTMLString({ rjx: sampleRJX, });
      const dom = new JSDOM(`<!DOCTYPE html><body>${rjxString}</body>`);

      expect(rjxString).to.be.a('string');
      expect(dom.window.document.body.querySelector('p').innerHTML).to.eql('hello world');
      expect(dom.window.document.body.querySelector('p').style.color).to.eql('red');
    });
  });
  describe('__express', () => {
    const sampleRJXFilepath = path.resolve('./test/mock/sample.rjx');
    const spantext = 'should render in express';
    it('should return an HTML string', (done) => {
      rjx.__express(
        sampleRJXFilepath,
        {
          spantext,
          __boundConfig: {
            debug:true,
          },
          __DOCTYPE:'',
        },
        ((err, renderedString) => {
          const dom = new JSDOM(renderedString);
          if (renderedString) {
            expect(dom.window.document.querySelector('#generatedRJX').getAttribute('title')).to.eql(spantext);
            expect(err).to.be.null;
            expect(renderedString).to.be.a('String');
          }
          done(err);
        })
      );
    });
    it('it should handle errors', (done) => {
      expect(rjx.__express.bind()).to.throw;
      rjx.__express(null,null, (err) => {
        expect(err).to.be.a('error');
        done();
      })
    });
  });
  describe('rjxRender', () => {
    before(function () {
      this.jsdom = mochaJSDOM();
    });
    it('should render component inside of querySelector', function () {
      const containerDiv = document.createElement('div');
      containerDiv.setAttribute('id', 'reactContainer');
      document.body.appendChild(containerDiv);
      rjx.rjxRender({ rjx: sampleRJX, querySelector:'#reactContainer', });
      
      expect(document.body.querySelector('p').innerHTML).to.eql('hello world');
      expect(document.body.querySelector('p').style.color).to.eql('red');
    });    
    after(function () {
      this.jsdom();
    });
  });
});