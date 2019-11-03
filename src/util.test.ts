import * as jsonx from '.';
import * as _jsonxUtils from './utils';

import mochaJSDOM from 'jsdom-global';
import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import ReactDOMElements from 'react-dom-factories';
import { expect } from 'chai';
import { JSDOM, } from 'jsdom';
chai.use(require('sinon-chai'));
// import 'mocha-sinon';

const sampleJSONX = {
  component: 'div',
  props: {
    id: 'generatedJSONX',
    className: 'jsonx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};

describe('jsonx utils', function () { 
  describe('displayComponent', () => {
    const displayComponent = _jsonxUtils.displayComponent;
    it('should display by default return true', () => {
      expect(displayComponent()).to.be.true;
    });
    it('should display if left !== null||undefined', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['falsey', ],
          operation:'exists',
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: null,
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.false;
    });
    it('should display if left === null||undefined', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy',],
          operation:'dne',
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['falsey', ],
          operation:'undefined',
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: null,
          operation:'null',
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if left == right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['truthy', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'==',
          right:['falsey', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:1,
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if left === right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'seq',
          right:['truthy', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'===',
          right:['falsey', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'seq',
          right:1,
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.false;
    });
    it('should display if left != right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dneq',
          right:['truthy', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'!=',
          right:['falsey', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dneq',
          right:1,
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if left !== right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dnseq',
          right:['truthy', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'!==',
          right:['falsey', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dnseq',
          right:1,
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if left > right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'gt',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'>',
          right:['bigNum', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'gt',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.false;
    });
    it('should display if left >= right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'gte',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'>=',
          right:['bigNum', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'gte',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if left < right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'<',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lt',
          right:['bigNum', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lt',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.false;
    });
    it('should display if left <= right', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'lte',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'<=',
          right:['bigNum', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lte',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.false;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.true;
    });
    it('should display if multiple comprisons are true', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['truthy', ],
        }, {
          left: ['smallNum', ],
          operation:'==',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['falsey', ],
        }, {
          left: ['smallNum', ],
          operation:'eq',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.false;
    });
    it('should display if one or more using comparisonorprops comprisons are true', () => {
      const testJSONX = Object.assign({}, sampleJSONX, {
        comparisonorprops:true,
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['truthy', ],
        }, {
          left: ['smallNum', ],
          operation:'==',
          right:['smallNum', ],
        },],
      });
      const testJSONX2 = Object.assign({}, sampleJSONX, {
        comparisonorprops:true,
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['falsey', ],
        }, {
          left: ['smallNum', ],
          operation:'eq',
          right:['smallNum', ],
        },],
      });
      const testJSONX3 = Object.assign({}, sampleJSONX, {
        comparisonorprops:true,
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['falsey', ],
        }, {
          left: ['bigNum', ],
          operation:'eq',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).to.be.true;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).to.be.false;
    });
  });
  describe('getAdvancedBinding', () => {
    const getAdvancedBinding = _jsonxUtils.getAdvancedBinding;
    it('should return true if browser supports deep nesting', function () {
      const window = {
        navigator: {
          userAgent: 'Webkit',
        },
      };
      expect(getAdvancedBinding.call({ window, })).to.be.true;
    });    
    it('should return false on all versions of IE/Trident', function () {
      const window = {
        navigator: {
          userAgent: 'Trident',
        },
      };
      expect(getAdvancedBinding.call({ window, })).to.be.false;
    });    
    it('should return false on old Android Browser', function () {
      const window = {
        navigator: {
          userAgent: 'Mozilla/5.0 (Linux; U; Android 1.5; de-de; HTC Magic Build/CRB17) AppleWebKit/528.5  (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
        },
      };
      expect(getAdvancedBinding.call({ window, })).to.be.false;
    });    
    it('should return false on old Chrome Browser', function () {
      const window = {
        navigator: {
          userAgent: 'Mozilla/5.0 (Linux; Android 4.1.2; GT-I9300 Build/JZO54K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
        },
      };
      expect(getAdvancedBinding.call({ window, })).to.be.false;
    });    
    it('should return false unknown browser', function () {
      expect(getAdvancedBinding.call({window:{} })).to.be.false;
    });    
  });
  describe('traverse', () => {
    const testObj = {
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
    const traverse = _jsonxUtils.traverse;
    it('should return properties from an object from the array of paths', () => {
      const testVals = { auth: ['authentication', ], username: ['user', 'name', ], };
      expect( traverse(testVals, testObj)).to.eql({ auth:testObj.authentication, username:testObj.user.name,  });
    });
    it('should return the entire object if no paths provided', () => {
      const testVals = { wholeObj: [], };
      expect( traverse(testVals, testObj)).to.eql({ wholeObj:testObj,  });
    });
    it('should return undefined if paths are invalid', () => {
      const testVals = { emptyObj: ['invalid', 'path',], };
      expect( traverse(testVals, testObj)).to.eql({ emptyObj:undefined, });
    });
    it('should throw an error if paths are not an array of strings or numeric indexes', () => {
      const testVals = { emptyObj: ()=>undefined, };
      expect(traverse.bind(null, testVals, testObj)).to.throw(Error);
    });
  });
  describe('validateJSONX', () => {
    const validateJSONX = _jsonxUtils.validateJSONX;
    it('should return true if JSONX is valid',  ()=> {
      expect(validateJSONX(sampleJSONX)).to.be.true;
    });
    it('should return string and warn of invalid JSONX props', () => {
      const invalidKeys = { incorrect: true, extra: true, };
      const invalidKeyJSONX = Object.assign({}, sampleJSONX, invalidKeys);
      const validationTest = validateJSONX(invalidKeyJSONX);
      expect(validationTest).to.be.a('string').and.to.be.ok;
      expect(validationTest).to.eql(`Warning: Invalid Keys [${Object.keys(invalidKeys).join()}]`);
    });
    it('should throw a syntax error if JSONX is missing a component', () => {
      const validationTest = validateJSONX.bind({});
      expect(validationTest).to.throw('Missing React Component');
      expect(validationTest).to.throw(SyntaxError);
    });
    it('should throw multiple errors if returnAllErrors is true', () => {
      const validationTest = validateJSONX( {
        props: [],
      }, true);
      expect(validationTest).to.be.an('array');
      expect(validationTest[ 0 ]).to.be.an('error');
    });
    it('should throw a type error if JSONX props is not an object, props.children or props._children', () => {
      const badPropTest1 = validateJSONX.bind(null, { component:'div', props:{ children:{}, }, });
      expect(validateJSONX.bind(null, { component:'div', props:'bad', })).to.throw(TypeError);
      expect(validateJSONX.bind(null, { component:'div', props:[], })).to.throw(TypeError);
      expect(badPropTest1).to.throw(TypeError);
      expect(validateJSONX.bind(null, { component: 'div', props: { _children: {}, }, })).to.throw(TypeError);
    });
    it('should throw a type error if JSONX children is not an array or JSONX docs or a string', () => {
      expect(validateJSONX.bind(null, { component:'div', children:{}, })).to.throw(TypeError);
    });
    it('should validate child objects', () => {
      const jsonxObj = {
        component: 'div',
        children: [
          {
            props:'this is missing a component',
          },
          {
            component: 'p',
            children: {},
            asyncprops:'',
          },
        ],
      };
      const childrenErrors = validateJSONX(jsonxObj, true);
      expect(childrenErrors).to.be.an('array');
      expect(childrenErrors[ 0 ]).to.be.an('error');
    });
    it('should validate dynamic props[asyncprops,resourceprops,thisprops,windowprops]', () => {
      const jsonxObj = {
        component: 'myComponent',
        asyncprops: '[]',
        resourceprops: '[]',
        thisprops: {
          notStrings: [undefined, {}, ],
        },
        windowprops: {
          title:['navigator', 'userAgent', ],
        },
      };
      const dynamicerrors = validateJSONX(jsonxObj, true);
      expect(dynamicerrors).to.be.an('array');
      expect(dynamicerrors.length).to.eql(7);
      expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate eval props[__dangerouslyEvalProps,__dangerouslyBindEvalProps]', () => {
      const jsonxObj = {
        component: 'myComponent',
        __dangerouslyEvalProps: 'badobj',
      };
      const jsonxObj2 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS:'()=>true',
          testJS1:'3',
        },
      };
      const evalError = validateJSONX(jsonxObj, true);
      const evalError2 = validateJSONX(jsonxObj2);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2).to.be.true;
      // console.log({ evalError3 });
      // expect(dynamicerrors).to.be.an('array');
      // expect(dynamicerrors.length).to.eql(4);
      // expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyEvalProps javascript', () => {
      const jsonxObj3 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS: '(=>true',
        },
      };
      const evalError3 = validateJSONX(jsonxObj3, true);
      expect(evalError3[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyBindEvalProps as a function that can be bound javascript', () => {
      const jsonxObj4 = {
        component: 'myComponent',
        __dangerouslyBindEvalProps: {
          testJS1: '{}',
        },
      };
      const evalError4 = validateJSONX(jsonxObj4, true);
      expect(evalError4[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyInsertComponents are valid JSONX objects', () => {
      const jsonxObj = {
        component: 'myComponent',
        __dangerouslyInsertComponents: {
          testComponent: {
            component_missing: 'nodiv',
            props: {},
          },
        },
      };
      const evalError = validateJSONX(jsonxObj, true);
      expect(evalError[ 0 ]).to.be.an('error');
    });
    it('should validate __functionProps are valid function strings', () => {
      const jsonxObj = {
        component: 'myComponent',
        __functionProps: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const jsonxObj2 = {
        component: 'myComponent',
        __functionProps: 'should be an obj',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        __functionProps: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateJSONX(jsonxObj, true);
      const evalError2 = validateJSONX(jsonxObj2, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate __windowComponentProps is an object', () => {
      const jsonxObj = {
        component: 'myComponent',
        __windowComponentProps: 'should be an obj',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        __windowComponentProps: {
          goodProps:'ok',
        },
      };
      const evalError = validateJSONX(jsonxObj, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate __windowComponents are valid function strings', () => {
      const jsonxObj = {
        component: 'myComponent',
        __windowComponents: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const jsonxObj2 = {
        component: 'myComponent',
        __windowComponents: 'should be an obj',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        __windowComponents: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateJSONX(jsonxObj, true);
      const evalError2 = validateJSONX(jsonxObj2, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate comparisonorprops is boolean', () => {
      const jsonxObj = {
        component: 'myComponent',
        comparisonorprops: 'should be an obj',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        comparisonorprops: true,
      };
      const evalError = validateJSONX(jsonxObj, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate comparisonprops is an array of comaprisons', () => {
      const jsonxObj = {
        component: 'myComponent',
        comparisonprops: 'should be an array',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        comparisonprops: [],
      };
      const jsonxObjin1 = {
        component: 'myComponent',
        comparisonprops: [{},],
      };
      const jsonxObjin2 = {
        component: 'myComponent',
        comparisonprops: [() => { },],
      };
      const evalError = validateJSONX(jsonxObj, true);
      const evalError1 = validateJSONX(jsonxObjin1, true);
      const evalError2 = validateJSONX(jsonxObjin2, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError1[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate passprops is boolean', () => {
      const jsonxObj = {
        component: 'myComponent',
        passprops: 'should be an obj',
      };
      const jsonxObjValid = {
        component: 'myComponent',
        passprops: true,
      };
      const evalError = validateJSONX(jsonxObj, true);
      const validTest = validateJSONX(jsonxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
  });
  describe('validSimpleJSONXSyntax', () => {
    const validSimpleJSONXSyntax = _jsonxUtils.validSimpleJSONXSyntax;
    it('should invalidate shorthard simple syntax', () => {
      const invalidShorthand = {
        component:'p',
      };
      const invalidShorthand2 = {
        component: 'p',
        props: {
          style: {
            background:'red',
          },
        },
      };
      const invalidShorthand3 = {
        component: 'p',
        props:'hey',
      };
      const invalidShorthand4 = {
        component: 'p',
        props: {
          style: {
            background:'red',
          },
        },
        children:'hey',
      };
      const invalidShorthand5 = {
        children:'p',
      };
      const invalidShorthand6 = {
        anything:'p',
      };
      const invalidShorthand7 = {
        anything: {
          component: 'p',
        },
      };
      expect(validSimpleJSONXSyntax(invalidShorthand)).to.be.false;
      expect(validSimpleJSONXSyntax(invalidShorthand2)).to.be.false;
      expect(validSimpleJSONXSyntax(invalidShorthand3)).to.be.false;
      expect(validSimpleJSONXSyntax(invalidShorthand4)).to.be.false;
      expect(validSimpleJSONXSyntax(invalidShorthand5)).to.be.false;
      expect(validSimpleJSONXSyntax(invalidShorthand6)).to.be.false;
    });
    it('should validate shorthard simple syntax', () => {
      const validShorthand = {
        p:{},
      };
      const validShorthand2 = {
        p: {
          props: {
            style: {
              background:'red',
            },
          },
        },
      };
      const validShorthand3 = {
        p: {
          props:'hey',
        },
      };
      const validShorthand4 = {
        p: {
          props: {
            style: {
              background:'red',
            },
          },
          children:'hey',
        },
      };
      const validShorthand5 = {
        children: {
          children:'p',
        },
      };
      expect(validSimpleJSONXSyntax(validShorthand)).to.be.true;
      expect(validSimpleJSONXSyntax(validShorthand2)).to.be.true;
      expect(validSimpleJSONXSyntax(validShorthand3)).to.be.true;
      expect(validSimpleJSONXSyntax(validShorthand4)).to.be.true;
      expect(validSimpleJSONXSyntax(validShorthand5)).to.be.true;
    });
  });
  describe('simpleJSONXSyntax', () => {
    const simpleJSONXSyntax = _jsonxUtils.simpleJSONXSyntax;
    it('should return valid JSONX from simple JSONX syntax', () => {
      const validShorthand = {
        p:{},
      };
      const validShorthand2 = {
        p: {
          props: {
            style: {
              background:'red',
            },
          },
        },
      };
      const validShorthand3 = {
        p: {
          props:'hey',
        },
      };
      const validShorthand4 = {
        div: {
          props: {
            style: {
              background:'red',
            },
          },
          children: [
            {
              p: { children: 'hey', },
            },
          ],
        },
      };
      const validShorthand5 = {
        children: {
          children:'p',
        },
      };
      const transformedSimpleSyntaxValid = _jsonxUtils.validateJSONX(simpleJSONXSyntax(validShorthand), true);
      const transformedSimpleSyntaxValid2 = _jsonxUtils.validateJSONX(simpleJSONXSyntax(validShorthand2), true);
      const transformedSimpleSyntaxValid3 = _jsonxUtils.validateJSONX(simpleJSONXSyntax(validShorthand3), true);
      const transformedSimpleSyntaxValid4 = _jsonxUtils.validateJSONX(simpleJSONXSyntax(validShorthand4), true);
      const transformedSimpleSyntaxValid5 = _jsonxUtils.validateJSONX(simpleJSONXSyntax(validShorthand5), true);
     
      expect((transformedSimpleSyntaxValid)).to.be.true;
      expect((transformedSimpleSyntaxValid2)).to.be.true;
      expect((transformedSimpleSyntaxValid3[0])).to.be.an('error');
      expect((transformedSimpleSyntaxValid4[0])).to.be.true;
      expect((transformedSimpleSyntaxValid5)).to.be.true;
    });
    it('should produce equivalent JSONX', () => {
      const sampleJSONX = {
        component: 'div',
        props: {
          id: 'generatedJSONX',
          className: 'jsonx',
        },
        asyncprops: {
          test:['ok', 'cool',],
        },
        children: [
          {
            component: 'p',
            props: {
              style: {
                color: 'red',
                fontWeight: 'bold',
              },
            },
            children: 'hello world',
          },
        ],
      };

      const simpleJSONX = {
        div: {
          props: {
            id: 'generatedJSONX',
            className: 'jsonx',
          },
          asyncprops: {
            test:['ok', 'cool',],
          },
          children: [
            {
              p: {
                props: {
                  style: {
                    color: 'red',
                    fontWeight: 'bold',
                  },
                },
                children: 'hello world',
              },
            },
          ],
        },
      };
      const transformedJSONXSTRING = simpleJSONXSyntax(simpleJSONX).toString();
      const JSONXSTRING = sampleJSONX.toString();

      expect(transformedJSONXSTRING).to.eql(JSONXSTRING);
    });
  });
  describe('getSimplifiedJSONX', () => {
    const getSimplifiedJSONX = _jsonxUtils.getSimplifiedJSONX;
    const simpleJSONX = {
      div: {
        props: {
          id: 'generatedJSONX',
          className: 'jsonx',
        },
        asyncprops: {
          test:['ok', 'cool',],
        },
        children: [
          {
            p: {
              props: {
                style: {
                  color: 'red',
                  fontWeight: 'bold',
                },
              },
              children: 'hello world',
            },
          },
        ],
      },
    };
    const sampleJSONX = {
      component: 'div',
      props: {
        id: 'generatedJSONX',
        className: 'jsonx',
      },
      asyncprops: {
        test:['ok', 'cool',],
      },
      children: [
        {
          component: 'p',
          props: {
            style: {
              color: 'red',
              fontWeight: 'bold',
            },
          },
          children: 'hello world',
        },
      ],
    };
    it('should produce equivalent SimpleJSONX', () => {
      const transformedJSONXSTRING = getSimplifiedJSONX(sampleJSONX).toString();
      const JSONXSTRING = simpleJSONX.toString();
      expect(transformedJSONXSTRING).to.eql(JSONXSTRING);
    });
    it('should return SimpleJSONX if already simple', () => {
      expect(simpleJSONX).to.eql(getSimplifiedJSONX(simpleJSONX));
    });
  });
});