import * as _rjxChildren from '../../src/children';
import mochaJSDOM from 'jsdom-global';
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

const passableRJX = {
  component: 'div',
  props: {
    title: 'this is passed',
    style: {
      color:'red',
    },
  },
  passprops: true,
  children: [
    {
      component: 'span',
      children:'should have props',
    },
    {
      component: 'p',
      props: {
        style: {
          color:'blue',
        },
      },
      children:'but no style',
    },
  ],
};

describe('rjx', function () { 
  describe('getChildrenProperty', () => {
    const getChildrenProperty = _rjxChildren.getChildrenProperty;
    it('should return the children of an RJX Object', () => {
      const RJXChildren = getChildrenProperty({ rjx: sampleRJX, });
      const RJXChildrenPTag = getChildrenProperty({ rjx: sampleRJX.children[ 0 ], });
      expect(RJXChildren).to.be.an('array');
      expect(RJXChildren.length).to.eql(sampleRJX.children.length);
      expect(RJXChildrenPTag).to.be.a('string');
      expect(RJXChildrenPTag).to.eql(sampleRJX.children[ 0 ].children);
      expect(getChildrenProperty({
        rjx: {
          props: { _children: {}, },
          children:'hello',
        },
      })).to.eql('hello');
      expect(getChildrenProperty({
        rjx: {
        },
      })).to.eql(null);
      expect(getChildrenProperty({ props: { children: [1, 2, 3,], }, })).to.be.an('array');
      expect(getChildrenProperty({ rjx:{ props: { children: 'hello', }, },  })).to.eql('hello');
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
      expect(RJXChildren4).to.be.a('function');
    });
  });
  describe('getChildrenProps', () => {
    const getChildrenProps = _rjxChildren.getChildrenProps;
    const getChildrenProperty = _rjxChildren.getChildrenProperty;
    it('should return child RJX if not passing props', () => {
      const renderIndex = 1;
      const childrjx = getChildrenProperty({ rjx: sampleRJX, })[0];
      const childProps = getChildrenProps({ rjx: sampleRJX, childrjx, renderIndex, });
      expect(childProps).to.eq(childrjx);
    });
    it('should pass props except for styles', () => {
      const renderIndex = 1;
      const childrjx_span = getChildrenProperty({ rjx: passableRJX, })[0];
      const childrjx_p = getChildrenProperty({ rjx: passableRJX, })[1];
      const childProps_span = getChildrenProps({ rjx: passableRJX, childrjx:childrjx_span, renderIndex, });
      const childProps_p = getChildrenProps({ rjx: passableRJX, childrjx:childrjx_p, renderIndex, });
      expect(childProps_span.props.title).to.eq(passableRJX.props.title);
      expect(childProps_p.props.title).to.eq(passableRJX.props.title);
      expect(childProps_p.props.style.color).to.eq(passableRJX.children[ 1 ].props.style.color);
      expect(childProps_p.props.key).to.not.eq(renderIndex);
      expect(childProps_span.props.key).to.not.eq(renderIndex);
    });
  });
  describe('getRJXChildren', () => {
    const getRJXChildren = _rjxChildren.getRJXChildren;
    it('should return RJX Child Objects', () => {
      const renderIndex = 1;
      const RJXChildren = getRJXChildren.call({}, {
        rjx: passableRJX,
        renderIndex,
      });
      RJXChildren.forEach(ReactiveJSON => {
        expect(ReactiveJSON).to.be.an('object');
        expect(ReactiveJSON).to.haveOwnProperty('$$typeof');
        expect(ReactiveJSON).to.haveOwnProperty('type');
        expect(ReactiveJSON).to.haveOwnProperty('key');
        expect(ReactiveJSON).to.haveOwnProperty('ref');
        expect(ReactiveJSON).to.haveOwnProperty('props');
      });
    });
    it('should return null on error', () => {
      expect(getRJXChildren({ logError: () => { }, })).to.eql(null);

    });
  });
});