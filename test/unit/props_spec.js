const rjx = require('../../dist/rjx.cjs');
const mochaJSDOM = require('jsdom-global');
const chai = require('chai');
const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMElements = require('react-dom-factories');
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
  ],
};

const traverseObject = {
  user: {
    name: 'rjx',
    description: 'react withouth javascript',
  },
  stats: {
    logins: 102,
    comments: 3,
  },
  authentication: 'OAuth2',
};

describe('rjx props', function () { 
  describe('getRJXProps', () => {
    const getRJXProps = rjx._rjxProps.getRJXProps;
    it('should return resolved dynamic prop', () => {
      const testVals = {
        auth: [ 'authentication', ],
        username: [ 'user', 'name', ],
      };
      const testRJX = Object.assign({}, sampleRJX, { asyncprops: testVals, });
      const testRJX2 = Object.assign({}, sampleRJX, { thisprops: testVals, });
      const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
      const RJXP2 = getRJXProps({ rjx: testRJX2, traverseObject, propName:'thisprops', });
      expect(RJXP.auth).to.eql(traverseObject.authentication);
      expect(RJXP.username).to.eql(traverseObject.user.name);
      expect(RJXP2.auth).to.eql(traverseObject.authentication);
      expect(RJXP2.username).to.eql(traverseObject.user.name);
    });
    it('should return resolved dynamic prop with undefined values if reference is invalid', () => {
      const testVals = {
        auth: [ 'wrong', ],
        username: [ 'no', 'ref', ],
      };
      const testRJX = Object.assign({}, sampleRJX, { asyncprops: testVals, });
      const RJXP = getRJXProps({ rjx: testRJX, traverseObject, });
      expect(RJXP.auth).to.be.undefined;
      expect(RJXP.username).to.be.undefined;
    });
  });
  describe('getEvalProps', () => {
    const getEvalProps = rjx._rjxProps.getEvalProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        auth: 'true',
        username: '(user={})=>user.name',
      };
      const testRJX = Object.assign({}, sampleRJX, {
        __dangerouslyEvalProps: testVals, __dangerouslyBindEvalProps: {
          email: '(function getUser(user={}){ return this.testBound(); })',
        },
      });
      // console.log({ testRJX });
      const RJXP = getEvalProps.call({ testBound: () => 'bounded', }, { rjx: testRJX, });
      const evalutedComputedFunc = RJXP.username({ name: 'bob', });
      const evalutedComputedBoundFunc = RJXP.email({ email:'test@email.domain', });
      expect(RJXP.auth).to.be.true;
      expect(evalutedComputedFunc).to.eql('bob');
      expect(evalutedComputedBoundFunc).to.eql('bounded');
    });
  });
  describe('getComponentProps', () => {
    const getComponentProps = rjx._rjxProps.getComponentProps;
    it('should return evaluated props dangerously using eval', () => {
      const testVals = {
        myComponent: {
          component: 'p',
          children:'hello world',
        },
      };
      const testRJX = Object.assign({}, sampleRJX, { __dangerouslyInsertComponents: testVals,  });
      const RJXP = getComponentProps.call({ }, { rjx: testRJX, });
      expect(RJXP.myComponent).to.be.an('object');
      expect(RJXP.myComponent).to.haveOwnProperty('$$typeof');
      expect(RJXP.myComponent).to.haveOwnProperty('type');
      expect(RJXP.myComponent).to.haveOwnProperty('key');
      expect(RJXP.myComponent).to.haveOwnProperty('ref');
      expect(RJXP.myComponent).to.haveOwnProperty('props');
    });
  });
});