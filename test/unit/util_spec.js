import * as rjx from '../../src/main';
import * as _rjxUtils from '../../src/utils';

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
import 'mocha-sinon';

const sampleRJX = {
  component: 'div',
  props: {
    id: 'generatedRJX',
    className: 'rjx',
    bigNum: 1430931039,
    smallNum: 0.425,
    falsey: false,
    truthy: true,
  },
  children: 'some div',
};

describe('rjx utils', function () { 
  describe('displayComponent', () => {
    const displayComponent = _rjxUtils.displayComponent;
    it('should display by default return true', () => {
      expect(displayComponent()).to.be.true;
    });
    it('should display if left !== null||undefined', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['falsey', ],
          operation:'exists',
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: null,
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.false;
    });
    it('should display if left === null||undefined', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy',],
          operation:'dne',
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['falsey', ],
          operation:'undefined',
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: null,
          operation:'null',
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if left == right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:['truthy', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'==',
          right:['falsey', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'eq',
          right:1,
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if left === right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'seq',
          right:['truthy', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'===',
          right:['falsey', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'seq',
          right:1,
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.false;
    });
    it('should display if left != right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dneq',
          right:['truthy', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'!=',
          right:['falsey', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dneq',
          right:1,
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if left !== right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dnseq',
          right:['truthy', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'!==',
          right:['falsey', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['truthy', ],
          operation:'dnseq',
          right:1,
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if left > right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'gt',
          right:['smallNum', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'>',
          right:['bigNum', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'gt',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.false;
    });
    it('should display if left >= right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'gte',
          right:['smallNum', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'>=',
          right:['bigNum', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'gte',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if left < right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'<',
          right:['smallNum', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lt',
          right:['bigNum', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lt',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.false;
    });
    it('should display if left <= right', () => {
      const testRJX = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['bigNum', ],
          operation:'lte',
          right:['smallNum', ],
        },],
      });
      const testRJX2 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'<=',
          right:['bigNum', ],
        },],
      });
      const testRJX3 = Object.assign({}, sampleRJX, {
        comparisonprops: [{
          left: ['smallNum', ],
          operation:'lte',
          right:['smallNum', ],
        },],
      });
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.false;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.true;
    });
    it('should display if multiple comprisons are true', () => {
      const testRJX = Object.assign({}, sampleRJX, {
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
      const testRJX2 = Object.assign({}, sampleRJX, {
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
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.false;
    });
    it('should display if one or more using comparisonorprops comprisons are true', () => {
      const testRJX = Object.assign({}, sampleRJX, {
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
      const testRJX2 = Object.assign({}, sampleRJX, {
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
      const testRJX3 = Object.assign({}, sampleRJX, {
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
      expect(displayComponent({ rjx: testRJX, props: testRJX.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX2, props: testRJX2.props, })).to.be.true;
      expect(displayComponent({ rjx: testRJX3, props: testRJX3.props, })).to.be.false;
    });
  });
  describe('getAdvancedBinding', () => {
    const getAdvancedBinding = _rjxUtils.getAdvancedBinding;
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
      expect(getAdvancedBinding.call({ })).to.be.false;
    });    
  });
  describe('traverse', () => {
    const testObj = {
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
    const traverse = _rjxUtils.traverse;
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
  describe('validateRJX', () => {
    const validateRJX = _rjxUtils.validateRJX;
    it('should return true if RJX is valid',  ()=> {
      expect(validateRJX(sampleRJX)).to.be.true;
    });
    it('should return string and warn of invalid RJX props', () => {
      const invalidKeys = { incorrect: true, extra: true, };
      const invalidKeyRJX = Object.assign({}, sampleRJX, invalidKeys);
      const validationTest = validateRJX(invalidKeyRJX);
      expect(validationTest).to.be.a('string').and.to.be.ok;
      expect(validationTest).to.eql(`Warning: Invalid Keys [${Object.keys(invalidKeys).join()}]`);
    });
    it('should throw a syntax error if RJX is missing a component', () => {
      const validationTest = validateRJX.bind({});
      expect(validationTest).to.throw('Missing React Component');
      expect(validationTest).to.throw(SyntaxError);
    });
    it('should throw multiple errors if returnAllErrors is true', () => {
      const validationTest = validateRJX( {
        props: [],
      }, true);
      expect(validationTest).to.be.an('array');
      expect(validationTest[ 0 ]).to.be.an('error');
    });
    it('should throw a type error if RJX props is not an object, props.children or props._children', () => {
      const badPropTest1 = validateRJX.bind(null, { component:'div', props:{ children:{}, }, });
      expect(validateRJX.bind(null, { component:'div', props:'bad', })).to.throw(TypeError);
      expect(validateRJX.bind(null, { component:'div', props:[], })).to.throw(TypeError);
      expect(badPropTest1).to.throw(TypeError);
      expect(validateRJX.bind(null, { component: 'div', props: { _children: {}, }, })).to.throw(TypeError);
    });
    it('should throw a type error if RJX children is not an array or RJX docs or a string', () => {
      expect(validateRJX.bind(null, { component:'div', children:{}, })).to.throw(TypeError);
    });
    it('should validate child objects', () => {
      const rjxObj = {
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
      const childrenErrors = validateRJX(rjxObj, true);
      expect(childrenErrors).to.be.an('array');
      expect(childrenErrors[ 0 ]).to.be.an('error');
    });
    it('should validate dynamic props[asyncprops,resourceprops,thisprops,windowprops]', () => {
      const rjxObj = {
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
      const dynamicerrors = validateRJX(rjxObj, true);
      expect(dynamicerrors).to.be.an('array');
      expect(dynamicerrors.length).to.eql(7);
      expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate eval props[__dangerouslyEvalProps,__dangerouslyBindEvalProps]', () => {
      const rjxObj = {
        component: 'myComponent',
        __dangerouslyEvalProps: 'badobj',
      };
      const rjxObj2 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS:'()=>true',
          testJS1:'3',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2).to.be.true;
      // console.log({ evalError3 });
      // expect(dynamicerrors).to.be.an('array');
      // expect(dynamicerrors.length).to.eql(4);
      // expect(dynamicerrors[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyEvalProps javascript', () => {
      const rjxObj3 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS: '(=>true',
        },
      };
      const evalError3 = validateRJX(rjxObj3, true);
      expect(evalError3[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyBindEvalProps as a function that can be bound javascript', () => {
      const rjxObj4 = {
        component: 'myComponent',
        __dangerouslyBindEvalProps: {
          testJS1: '{}',
        },
      };
      const evalError4 = validateRJX(rjxObj4, true);
      expect(evalError4[ 0 ]).to.be.an('error');
    });
    it('should validate __dangerouslyInsertComponents are valid RJX objects', () => {
      const rjxObj = {
        component: 'myComponent',
        __dangerouslyInsertComponents: {
          testComponent: {
            component_missing: 'nodiv',
            props: {},
          },
        },
      };
      const evalError = validateRJX(rjxObj, true);
      expect(evalError[ 0 ]).to.be.an('error');
    });
    it('should validate __functionProps are valid function strings', () => {
      const rjxObj = {
        component: 'myComponent',
        __functionProps: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const rjxObj2 = {
        component: 'myComponent',
        __functionProps: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        __functionProps: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate __windowComponentProps is an object', () => {
      const rjxObj = {
        component: 'myComponent',
        __windowComponentProps: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        __windowComponentProps: {
          goodProps:'ok',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate __windowComponents are valid function strings', () => {
      const rjxObj = {
        component: 'myComponent',
        __windowComponents: {
          invalidFunc: {
            isString: {},
          },
        },
      };
      const rjxObj2 = {
        component: 'myComponent',
        __windowComponents: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        __windowComponents: {
          goodFunc:'func:this.someFunc',
        },
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError2 = validateRJX(rjxObj2, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate comparisonorprops is boolean', () => {
      const rjxObj = {
        component: 'myComponent',
        comparisonorprops: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        comparisonorprops: true,
      };
      const evalError = validateRJX(rjxObj, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate comparisonprops is an array of comaprisons', () => {
      const rjxObj = {
        component: 'myComponent',
        comparisonprops: 'should be an array',
      };
      const rjxObjValid = {
        component: 'myComponent',
        comparisonprops: [],
      };
      const rjxObjin1 = {
        component: 'myComponent',
        comparisonprops: [{},],
      };
      const rjxObjin2 = {
        component: 'myComponent',
        comparisonprops: [() => { },],
      };
      const evalError = validateRJX(rjxObj, true);
      const evalError1 = validateRJX(rjxObjin1, true);
      const evalError2 = validateRJX(rjxObjin2, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(evalError1[ 0 ]).to.be.an('error');
      expect(evalError2[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
    it('should validate passprops is boolean', () => {
      const rjxObj = {
        component: 'myComponent',
        passprops: 'should be an obj',
      };
      const rjxObjValid = {
        component: 'myComponent',
        passprops: true,
      };
      const evalError = validateRJX(rjxObj, true);
      const validTest = validateRJX(rjxObjValid);
      expect(evalError[ 0 ]).to.be.an('error');
      expect(validTest).to.be.true;
    });
  });
  describe('validSimpleRJXSyntax', () => {
    const validSimpleRJXSyntax = _rjxUtils.validSimpleRJXSyntax;
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
      expect(validSimpleRJXSyntax(invalidShorthand)).to.be.false;
      expect(validSimpleRJXSyntax(invalidShorthand2)).to.be.false;
      expect(validSimpleRJXSyntax(invalidShorthand3)).to.be.false;
      expect(validSimpleRJXSyntax(invalidShorthand4)).to.be.false;
      expect(validSimpleRJXSyntax(invalidShorthand5)).to.be.false;
      expect(validSimpleRJXSyntax(invalidShorthand6)).to.be.false;
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
      expect(validSimpleRJXSyntax(validShorthand)).to.be.true;
      expect(validSimpleRJXSyntax(validShorthand2)).to.be.true;
      expect(validSimpleRJXSyntax(validShorthand3)).to.be.true;
      expect(validSimpleRJXSyntax(validShorthand4)).to.be.true;
      expect(validSimpleRJXSyntax(validShorthand5)).to.be.true;
    });
  });
  describe('simpleRJXSyntax', () => {
    const simpleRJXSyntax = _rjxUtils.simpleRJXSyntax;
    it('should return valid RJX from simple RJX syntax', () => {
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
      const transformedSimpleSyntaxValid = _rjxUtils.validateRJX(simpleRJXSyntax(validShorthand), true);
      const transformedSimpleSyntaxValid2 = _rjxUtils.validateRJX(simpleRJXSyntax(validShorthand2), true);
      const transformedSimpleSyntaxValid3 = _rjxUtils.validateRJX(simpleRJXSyntax(validShorthand3), true);
      const transformedSimpleSyntaxValid4 = _rjxUtils.validateRJX(simpleRJXSyntax(validShorthand4), true);
      const transformedSimpleSyntaxValid5 = _rjxUtils.validateRJX(simpleRJXSyntax(validShorthand5), true);
     
      expect((transformedSimpleSyntaxValid)).to.be.true;
      expect((transformedSimpleSyntaxValid2)).to.be.true;
      expect((transformedSimpleSyntaxValid3[0])).to.be.an('error');
      expect((transformedSimpleSyntaxValid4[0])).to.be.true;
      expect((transformedSimpleSyntaxValid5)).to.be.true;
    });
    it('should produce equivalent RXJ', () => {
      const sampleRJX = {
        component: 'div',
        props: {
          id: 'generatedRJX',
          className: 'rjx',
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

      const simpleRJX = {
        div: {
          props: {
            id: 'generatedRJX',
            className: 'rjx',
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
      const transformedRJXSTRING = simpleRJXSyntax(simpleRJX).toString();
      const RJXSTRING = sampleRJX.toString();

      expect(transformedRJXSTRING).to.eql(RJXSTRING);
    });
  });
  describe('getSimplifiedRJX', () => {
    const getSimplifiedRJX = _rjxUtils.getSimplifiedRJX;
    const simpleRJX = {
      div: {
        props: {
          id: 'generatedRJX',
          className: 'rjx',
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
    const sampleRJX = {
      component: 'div',
      props: {
        id: 'generatedRJX',
        className: 'rjx',
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
    it('should produce equivalent SimpleRJX', () => {
      const transformedRJXSTRING = getSimplifiedRJX(sampleRJX).toString();
      const RJXSTRING = simpleRJX.toString();
      expect(transformedRJXSTRING).to.eql(RJXSTRING);
    });
    it('should return SimpleRJX if already simple', () => {
      expect(simpleRJX).to.eql(getSimplifiedRJX(simpleRJX));
    });
  });
});