const rjx = require('../../dist/rjx.cjs');
const mochaJSDOM = require('jsdom-global');
const chai = require('chai');
const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('chai').expect;
const jsdom = require('jsdom');
const { JSDOM, } = jsdom;
chai.use(require('sinon-chai'));
require('mocha-sinon');

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
    {
      component: 'div',
      children: [
        {
          component: 'ul',
          children: [
            {
              component: 'li',
              children:'hey',
            },
            {
              component: 'li',
              children:'in',
            },
            {
              component: 'li',
              children:'list',
            },
          ],
        },
      ],
    },
  ],
};

describe('rjx', function () { 
  describe('getChildrenProperty', () => {
    const getChildrenProperty = rjx._rjxChildren.getChildrenProperty;
    it('should return the children of an RJX Object', () => {
      const RJXChildren = getChildrenProperty({ rjx: sampleRJX, });
      const RJXChildrenPTag = getChildrenProperty({ rjx: sampleRJX.children[ 0 ], });
      expect(RJXChildren).to.be.an('array');
      expect(RJXChildren.length).to.eql(sampleRJX.children.length);
      expect(RJXChildrenPTag).to.be.a('string');
      expect(RJXChildrenPTag).to.eql(sampleRJX.children[0].children);
    });
    it('should get the children from rjx.props._children property', () => {
      const testRJX = {
        component: 'div',
        props: {
          _children:'some text',
        },
      };
      const testRJX2 = {
        component: 'div',
        props: {
          _children: [
            {
              component: 'p',
              children:'nested p tag',
            },
            {
              component: 'p',
              children:'nested p tag',
            },
          ],
        },
      };
      const testRJX3 = {
        component: 'div',
        props: {
          _children: 'some text',
          children:'ignore this prop for children',
        },
        children:[
          {
            component: 'p',
            children:'should ignore nested p tag',
          },
          {
            component: 'p',
            children:'should ignore nested p tag',
          },
        ],
      };
      const RJXChildren = getChildrenProperty({ rjx: testRJX, });
      const RJXChildren2 = getChildrenProperty({ rjx: testRJX2, });
      const RJXChildren3 = getChildrenProperty({ rjx: testRJX3, });
      expect(RJXChildren).to.be.a('string');
      expect(RJXChildren).to.eql(testRJX.props._children);
      expect(RJXChildren2).to.be.an('array');
      expect(RJXChildren2.length).to.eql(testRJX2.props._children.length);
      expect(RJXChildren3).to.be.a('string');
      expect(RJXChildren3).to.eql(testRJX3.props._children);
    });
    it('should get the children from rjx.props.children property', () => {
      const testRJX = {
        component: 'div',
        props: {
          children:'some text',
        },
      };
      const testRJX2 = {
        component: 'div',
        props: {
          children: [
            {
              component: 'p',
              children:'nested p tag',
            },
            {
              component: 'p',
              children:'nested p tag',
            },
          ],
        },
      };
      const testRJX3 = {
        component: 'div',
        props: {
          children:'ignore this prop for children',
        },
        children:[
          {
            component: 'p',
            children:'should ignore nested p tag',
          },
          {
            component: 'p',
            children:'should ignore nested p tag',
          },
        ],
      };
      const testRJX4 = {
        component: 'div',
        props: {
          children:()=>'not valid, should be null',
        },
      };
      const RJXChildren = getChildrenProperty({ rjx: testRJX, });
      const RJXChildren2 = getChildrenProperty({ rjx: testRJX2, });
      const RJXChildren3 = getChildrenProperty({ rjx: testRJX3, });
      const RJXChildren4 = getChildrenProperty({ rjx: testRJX4, });
      expect(RJXChildren).to.be.a('string');
      expect(RJXChildren).to.eql(testRJX.props.children);
      expect(RJXChildren2).to.be.an('array');
      expect(RJXChildren2.length).to.eql(testRJX2.props.children.length);
      expect(RJXChildren3).to.be.a('array');
      expect(RJXChildren3).to.eql(testRJX3.children);
      expect(RJXChildren4).to.be.null;
    });
  });
  /*
  describe('rjxHTMLString', () => {
    it('should return an HTML string', () => {
      const rjxString = rjx.rjxHTMLString({ rjx: sampleRJX, });
      const dom = new JSDOM(`<!DOCTYPE html><body>${rjxString}</body>`);

      expect(rjxString).to.be.a('string');
      expect(dom.window.document.body.querySelector('p').innerHTML).to.eql('hello world');
      expect(dom.window.document.body.querySelector('p').style.color).to.eql('red');
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
  */
});