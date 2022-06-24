import * as _jsonxUtils from './utils';

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
      expect(displayComponent()).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeFalsy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeFalsy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy()
      //@ts-ignore;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy()
      //@ts-ignore;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy()
      //@ts-ignore;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeFalsy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeFalsy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeFalsy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy()
      //@ts-ignore;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeFalsy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy()
      //@ts-ignore;
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeFalsy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeFalsy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeFalsy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeTruthy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeFalsy();
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
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX, props: testJSONX.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX2, props: testJSONX2.props, })).toBeTruthy();
      //@ts-ignore
      expect(displayComponent({ jsonx: testJSONX3, props: testJSONX3.props, })).toBeFalsy();
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
      expect(getAdvancedBinding.call({ window, })).toBeTruthy();
    });    
    it('should return false on all versions of IE/Trident', function () {
      const window = {
        navigator: {
          userAgent: 'Trident',
        },
      };
      expect(getAdvancedBinding.call({ window, })).toBeFalsy();
    });    
    it('should return false on old Android Browser', function () {
      const window = {
        navigator: {
          userAgent: 'Mozilla/5.0 (Linux; U; Android 1.5; de-de; HTC Magic Build/CRB17) AppleWebKit/528.5  (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
        },
      };
      expect(getAdvancedBinding.call({ window, })).toBeFalsy();
    });    
    it('should return false on old Chrome Browser', function () {
      const window = {
        navigator: {
          userAgent: 'Mozilla/5.0 (Linux; Android 4.1.2; GT-I9300 Build/JZO54K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
        },
      };
      expect(getAdvancedBinding.call({ window, })).toBeFalsy();
    });    
    it('should return false unknown browser', function () {
      expect(getAdvancedBinding.call({window:{} })).toBeFalsy();
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
      expect( traverse(testVals, testObj)).toMatchObject({ auth:testObj.authentication, username:testObj.user.name,  });
    });
    it('should return the entire object if no paths provided', () => {
      const testVals = { wholeObj: [], };
      expect( traverse(testVals, testObj)).toMatchObject({ wholeObj:testObj,  });
    });
    it('should return undefined if paths are invalid', () => {
      const testVals = { emptyObj: ['invalid', 'path',], };
      expect( traverse(testVals, testObj)).toMatchObject({ emptyObj:undefined, });
    });
    it('should throw an error if paths are not an array of strings or numeric indexes', () => {
      const testVals = { emptyObj: () => undefined, };
      //@ts-ignore
      expect(traverse.bind(null, testVals, testObj)).toThrow(Error);
    });
  });
  describe('validateJSONX', () => {
    const validateJSONX = _jsonxUtils.validateJSONX;
    it('should return true if JSONX is valid',  ()=> {
      expect(validateJSONX(sampleJSONX)).toBeTruthy();
    });
    it('should return string and warn of invalid JSONX props', () => {
      const invalidKeys = { incorrect: true, extra: true, };
      const invalidKeyJSONX = Object.assign({}, sampleJSONX, invalidKeys);
      const validationTest = validateJSONX(invalidKeyJSONX);
      expect(typeof validationTest).toBe('string');
      expect(validationTest).toBeTruthy();
      expect(validationTest).toBe(`Warning: Invalid Keys [${Object.keys(invalidKeys).join()}]`);
    });
    it('should throw a syntax error if JSONX is missing a component', () => {
      const validationTest = validateJSONX.bind({});
      expect(validationTest).toThrow('Missing React Component');
      expect(validationTest).toThrow(SyntaxError);
    });
    it('should throw multiple errors if returnAllErrors is true', () => {
      const validationTest = validateJSONX( {
        props: [],
      }, true);
      //@ts-ignore
      expect(Array.isArray(validationTest)).toBeTruthy();
      //@ts-ignore
      expect(validationTest[ 0 ]).toBeInstanceOf(Error);
    });
    it('should throw a type error if JSONX props is not an object, props.children or props._children', () => {
      const badPropTest1 = validateJSONX.bind(null, { component:'div', props:{ children:{}, }, });
      expect(validateJSONX.bind(null, { component:'div', props:'bad', })).toThrow(TypeError);
      expect(validateJSONX.bind(null, { component:'div', props:[], })).toThrow(TypeError);
      expect(badPropTest1).toThrow(TypeError);
      expect(validateJSONX.bind(null, { component: 'div', props: { _children: {}, }, })).toThrow(TypeError);
    });
    it('should throw a type error if JSONX children is not an array or JSONX docs or a string', () => {
      //@ts-ignore
      expect(validateJSONX.bind(null, { component:'div', children:{}, })).toThrow(TypeError);
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
      //@ts-ignore
      const childrenErrors = validateJSONX(jsonxObj, true);
      //@ts-ignore
      expect(Array.isArray(childrenErrors)).toBeTruthy();
      //@ts-ignore
      expect(childrenErrors[ 0 ]).toBeInstanceOf(Error);
    });
    //@ts-ignore
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
      //@ts-ignore
      const dynamicerrors = validateJSONX(jsonxObj, true);
      expect(Array.isArray(dynamicerrors)).toBeTruthy();
      //@ts-ignore
      expect(dynamicerrors.length).toBe(7);
      //@ts-ignore
      expect(dynamicerrors[ 0 ]).toBeInstanceOf(Error);
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
      //@ts-ignore
      const evalError = validateJSONX(jsonxObj, true);
      const evalError2 = validateJSONX(jsonxObj2);
      //@ts-ignore
      expect(evalError[ 0 ]).toBeInstanceOf(Error);
      expect(evalError2).toBeTruthy();
      // console.log({ evalError3 });
      // Array.isArray()expect(dynamicerrors).toBeTruthy();
      // expect(dynamicerrors.length).toBe(4);
      // expect(dynamicerrors[ 0 ]).toBeInstanceOf(Error);
    });
    it('should validate __dangerouslyEvalProps javascript', () => {
      const jsonxObj3 = {
        component: 'myComponent',
        __dangerouslyEvalProps: {
          testJS: '(=>true',
        },
      };
      //@ts-ignore
      const evalError3 = validateJSONX(jsonxObj3, true);
      //@ts-ignore
      expect(evalError3[ 0 ]).toBeInstanceOf(Error);
    });
    it('should validate __dangerouslyBindEvalProps as a function that can be bound javascript', () => {
      const jsonxObj4 = {
        component: 'myComponent',
        __dangerouslyBindEvalProps: {
          testJS1: '{}',
        },
      };
      //@ts-ignore
      const evalError4 = validateJSONX(jsonxObj4, true);
      //@ts-ignore
      expect(evalError4[ 0 ]).toBeInstanceOf(Error);
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
      //@ts-ignore
      expect(evalError[ 0 ]).toBeInstanceOf(Error);
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
      //@ts-ignore
      const evalError = validateJSONX(jsonxObj, true);
      //@ts-ignore
      const evalError2 = validateJSONX(jsonxObj2, true);
      const validTest = validateJSONX(jsonxObjValid);
      //@ts-ignore
      expect(evalError[0]).toBeInstanceOf(Error);
      //@ts-ignore
      expect(evalError2[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
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
      //@ts-ignore
      expect(evalError[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
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
      //@ts-ignore
      expect(evalError[0]).toBeInstanceOf(Error);
      //@ts-ignore
      expect(evalError2[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
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
      //@ts-ignore
      const evalError = validateJSONX(jsonxObj, true);
      //@ts-ignore
      const validTest = validateJSONX(jsonxObjValid);
      //@ts-ignore
      expect(evalError[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
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
      //@ts-ignore
      const evalError = validateJSONX(jsonxObj, true);
      //@ts-ignore
      const evalError1 = validateJSONX(jsonxObjin1, true);
      //@ts-ignore
      const evalError2 = validateJSONX(jsonxObjin2, true);
      //@ts-ignore
      const validTest = validateJSONX(jsonxObjValid);
      //@ts-ignore
      expect(evalError[0]).toBeInstanceOf(Error);
      //@ts-ignore
      expect(evalError1[0]).toBeInstanceOf(Error);
      //@ts-ignore
      expect(evalError2[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
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
      //@ts-ignore
      const evalError = validateJSONX(jsonxObj, true);
      const validTest = validateJSONX(jsonxObjValid);
      //@ts-ignore
      expect(evalError[ 0 ]).toBeInstanceOf(Error);
      expect(validTest).toBeTruthy();
    });
  });
  describe('validSimpleJSONXSyntax', () => {
    const validSimpleJSONXSyntax = _jsonxUtils.validSimpleJSONXSyntax;
    it('should invalidate shorthard simple syntax', () => {
      const validShorthand = {
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
      const validShorthand5 = {
        children:'p',
      };
      const validShorthand6 = {
        anything:'p',
      };
      const invalidShorthand7 = {
        anything: {
          component: 'p',
        },
      };
      expect(validSimpleJSONXSyntax(validShorthand)).toBeTruthy();
      expect(validSimpleJSONXSyntax(invalidShorthand2)).toBeFalsy();
      expect(validSimpleJSONXSyntax(invalidShorthand3)).toBeFalsy();
      expect(validSimpleJSONXSyntax(invalidShorthand4)).toBeFalsy();
      expect(validSimpleJSONXSyntax(validShorthand5)).toBeTruthy();
      expect(validSimpleJSONXSyntax(validShorthand6)).toBeTruthy();
      expect(validSimpleJSONXSyntax(invalidShorthand7)).toBeFalsy();
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
      expect(validSimpleJSONXSyntax(validShorthand)).toBeTruthy();
      expect(validSimpleJSONXSyntax(validShorthand2)).toBeTruthy();
      expect(validSimpleJSONXSyntax(validShorthand3)).toBeTruthy();
      expect(validSimpleJSONXSyntax(validShorthand4)).toBeTruthy();
      expect(validSimpleJSONXSyntax(validShorthand5)).toBeTruthy();
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
     
      expect((transformedSimpleSyntaxValid)).toBeTruthy();
      expect((transformedSimpleSyntaxValid2)).toBeTruthy();
      //@ts-ignore
      expect((transformedSimpleSyntaxValid3[0])).toBeInstanceOf(Error);
      //@ts-ignore
      expect((transformedSimpleSyntaxValid4[0])).toBeTruthy();
      expect((transformedSimpleSyntaxValid5)).toBeTruthy();
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

      expect(transformedJSONXSTRING).toBe(JSONXSTRING);
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
      expect(transformedJSONXSTRING).toBe(JSONXSTRING);
    });
    it('should return SimpleJSONX if already simple', () => {
      expect(simpleJSONX).toBe(getSimplifiedJSONX(simpleJSONX));
    });
  });
});