import * as rjx from '../../src/main';
import mochaJSDOM from 'jsdom-global';
import path from 'path';
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

describe('rjx', function () { 
  describe('getRenderedJSON', () => {
    it('should return an instance of a react element', () => {
      const ReactiveJSON = rjx.getRenderedJSON(sampleRJX);
      const ReactiveSimpleJSON = rjx.getRenderedJSON(simpleRJX);
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
      const emptySpanComponent = rjx.getRenderedJSON({});
      const emptySpanComponentDebugged = rjx.getRenderedJSON.call({ debug: true, }, {}, {});
      expect(emptySpanComponent).to.be.an('object');
      expect(emptySpanComponentDebugged).to.be.an('object');
      expect(emptySpanComponentDebugged.props.children).to.eql('Error: Missing Component Object');
    });
    it('should throw an error with invalid components', () => {
      const loggerSpy = sinon.spy();
      expect(rjx.getRenderedJSON.bind({}, { component: 'somethingInvalid', })).to.throw('Invalid React Component (somethingInvalid)');
      try {
        rjx.getRenderedJSON.call({ debug: true, logError: loggerSpy, }, { component: 'somethingInvalid', }, {});
      } catch (e) {
        expect(loggerSpy.called).to.be.true;
        expect(e).to.be.an('error');
      }
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