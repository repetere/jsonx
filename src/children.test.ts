import * as JSONX from "./index";
import mochaJSDOM from "jsdom-global";
import chai from "chai";
import sinon from "sinon";
import React from "react";
import ReactTestUtils from "react-dom/test-utils"; // ES6
import ReactDOM from "react-dom";
import ReactDOMElements from "react-dom-factories";
import { expect as expectCHAI } from "chai";
import { JSDOM } from "jsdom";
import numeral from "numeral";
import * as luxon from "luxon";
chai.use(require("sinon-chai"));
// import 'mocha-sinon';

const _jsonxChildren = JSONX._jsonxChildren;

const sampleJSONX = {
  component: "div",
  props: {
    id: "generatedJSONX",
    className: "jsonx"
  },
  children: [
    {
      component: "p",
      props: {
        style: {
          color: "red",
          fontWeight: "bold"
        }
      },
      children: "hello world"
    },
    {
      component: "div",
      children: [
        {
          component: "ul",
          children: [
            {
              component: "li",
              children: "hey"
            },
            {
              component: "li",
              children: "in"
            },
            {
              component: "li",
              children: "list"
            }
          ]
        }
      ]
    }
  ]
};

const passableJSONX = {
  component: "div",
  props: {
    title: "this is passed",
    style: {
      color: "red"
    }
  },
  passprops: true,
  children: [
    {
      component: "span",
      props:{},
      children: "should have props"
    },
    {
      component: "p",
      props: {
        style: {
          color: "blue"
        }
      },
      children: "but no style"
    }
  ]
};

describe("jsonx", function() {
  describe("getChildrenProperty", () => {
    const getChildrenProperty = _jsonxChildren.getChildrenProperty;
    it("should return the children of an JSONX Object", () => {
      const JSONXChildren = getChildrenProperty({ jsonx: sampleJSONX });
      const JSONXChildrenPTag = getChildrenProperty({
        jsonx: sampleJSONX.children[0]
      });
      expectCHAI(JSONXChildren).to.be.an("array");
      expectCHAI(JSONXChildren.length).to.eql(sampleJSONX.children.length);
      expectCHAI(JSONXChildrenPTag).to.be.a("string");
      expectCHAI(JSONXChildrenPTag).to.eql(sampleJSONX.children[0].children);
      expectCHAI(
        getChildrenProperty({
          jsonx: {
            props: { _children: {} },
            children: "hello"
          }
        })
      ).to.eql("hello");
      expectCHAI(
        getChildrenProperty({
          jsonx: {}
        })
      ).to.eql(null);
      expectCHAI(getChildrenProperty({ props: { children: [1, 2, 3] } })).to.be.an(
        "array"
      );
      expectCHAI(
        getChildrenProperty({ jsonx: { props: { children: "hello" } } })
      ).to.eql("hello");
    });
    it("should get the children from jsonx.props._children property", () => {
      const testJSONX = {
        component: "div",
        props: {
          _children: "some text"
        }
      };
      const testJSONX2 = {
        component: "div",
        props: {
          _children: [
            {
              component: "p",
              children: "nested p tag"
            },
            {
              component: "p",
              children: "nested p tag"
            }
          ]
        }
      };
      const testJSONX3 = {
        component: "div",
        props: {
          _children: "some text",
          children: "ignore this prop for children"
        },
        children: [
          {
            component: "p",
            children: "should ignore nested p tag"
          },
          {
            component: "p",
            children: "should ignore nested p tag"
          }
        ]
      };
      const JSONXChildren = getChildrenProperty({ jsonx: testJSONX });
      const JSONXChildren2 = getChildrenProperty({ jsonx: testJSONX2 });
      const JSONXChildren3 = getChildrenProperty({ jsonx: testJSONX3 });
      expectCHAI(JSONXChildren).to.be.a("string");
      expectCHAI(JSONXChildren).to.eql(testJSONX.props._children);
      expectCHAI(JSONXChildren2).to.be.an("array");
      expectCHAI(JSONXChildren2.length).to.eql(testJSONX2.props._children.length);
      expectCHAI(JSONXChildren3).to.be.a("string");
      expectCHAI(JSONXChildren3).to.eql(testJSONX3.props._children);
    });
    it("should get the children from jsonx.props.children property", () => {
      const testJSONX = {
        component: "div",
        props: {
          children: "some text"
        }
      };
      const testJSONX2 = {
        component: "div",
        props: {
          children: [
            {
              component: "p",
              children: "nested p tag"
            },
            {
              component: "p",
              children: "nested p tag"
            }
          ]
        }
      };
      const testJSONX3 = {
        component: "div",
        props: {
          children: "ignore this prop for children"
        },
        children: [
          {
            component: "p",
            children: "should ignore nested p tag"
          },
          {
            component: "p",
            children: "should ignore nested p tag"
          }
        ]
      };
      const testJSONX4 = {
        component: "div",
        props: {
          children: () => "not valid, should be null"
        }
      };
      const JSONXChildren = getChildrenProperty({ jsonx: testJSONX });
      const JSONXChildren2 = getChildrenProperty({ jsonx: testJSONX2 });
      const JSONXChildren3 = getChildrenProperty({ jsonx: testJSONX3 });
      const JSONXChildren4 = getChildrenProperty({ jsonx: testJSONX4 });
      expectCHAI(JSONXChildren).to.be.a("string");
      expectCHAI(JSONXChildren).to.eql(testJSONX.props.children);
      expectCHAI(JSONXChildren2).to.be.an("array");
      expectCHAI(JSONXChildren2.length).to.eql(testJSONX2.props.children.length);
      expectCHAI(JSONXChildren3).to.be.a("array");
      expectCHAI(JSONXChildren3).to.eql(testJSONX3.children);
      expectCHAI(JSONXChildren4).to.be.a("function");
    });
  });
  describe("getChildrenProps", () => {
    const getChildrenProps = _jsonxChildren.getChildrenProps.bind({});
    const getChildrenProperty = _jsonxChildren.getChildrenProperty;
    it("should return child JSONX if not passing props", () => {
      const renderIndex = 1;
      const childjsonx = getChildrenProperty({ jsonx: sampleJSONX })[0];
      const childProps = getChildrenProps({
        jsonx: sampleJSONX,
        childjsonx,
        renderIndex
      });
      expectCHAI(childProps).to.eq(childjsonx);
    });
    it("should pass props except for styles", () => {
      const renderIndex = 1;
      const childjsonx_span = getChildrenProperty({ jsonx: passableJSONX })[0];
      const childjsonx_p = getChildrenProperty({ jsonx: passableJSONX })[1];
      const childProps_span = getChildrenProps({
        jsonx: passableJSONX,
        childjsonx: childjsonx_span,
        renderIndex
      });
      const childProps_p = getChildrenProps({
        jsonx: passableJSONX,
        childjsonx: childjsonx_p,
        renderIndex
      });
      //@ts-ignore
      expectCHAI(childProps_span.props.title).to.eq(passableJSONX.props.title);
      //@ts-ignore
      expectCHAI(childProps_p.props.title).to.eq(passableJSONX.props.title);
      //@ts-ignore
      expectCHAI(childProps_p.props.style.color).to.eq(
        //@ts-ignore
        passableJSONX.children[1].props.style.color
      );
      //@ts-ignore
      expectCHAI(childProps_p.props.key).to.not.eq(renderIndex);
      //@ts-ignore
      expectCHAI(childProps_span.props.key).to.not.eq(renderIndex);
    });
    it('should only pass selected props',()=>{
      const renderIndex = 1;
      const passableSelectedJSONX = {
        component: "div",
        props: {
          title: "this is passed",
          anotherProp:true,
          additionalProp:true,
          value:302,
          size:2
        },
        passprops: ['value','size'],
        children: [
          {
            component: "span",
            props:{},
            children: "should have props"
          },
          {
            component: "p",
            props: {
              style: {
                color: "blue"
              }
            },
            children: "but no style"
          }
        ]
      };
      const childjsonx_span = getChildrenProperty({ jsonx: passableSelectedJSONX })[0];
      const childProps_span = getChildrenProps({
        jsonx: passableSelectedJSONX,
        childjsonx: childjsonx_span,
        renderIndex
      });
      //@ts-ignore
      expectCHAI(childProps_span.props).to.eql({ value: 302, size: 2 })      
    })
  });
  describe("getJSONXChildren", () => {
    const getJSONXChildren = _jsonxChildren.getJSONXChildren;
    const testDate = new Date();
    const testDateISO = testDate.toISOString();
    const luxonFormat = "LL/dd/yyyy";
    it("should work with JSON", () => {
      const getJSONXChildren = _jsonxChildren.getJSONXChildren.bind({
        returnJSON: true
      });
      const JXM = {
        component: "ol",
        // props: { data: "ok" }
        children: [null, null, null]
        // children: [
        //   { component: "li", children: "1st" },
        //   { component: "li", children: "2nd" },
        //   { component: "li", children: "3rd" },
        //   { component: "li", children: "4th" }
        // ]
      };

      // const JXMChildrenJSON = getJSONXChildren({ jsonx: JXM });
    });
    it("should return JSONX Child Objects", () => {
      const renderIndex = 1;
      const JSONXChildren = getJSONXChildren.call(
        {},
        {
          jsonx: passableJSONX,
          renderIndex
        }
      );
      //@ts-ignore
      JSONXChildren.forEach(ReactiveJSON => {
        expectCHAI(ReactiveJSON).to.be.an("object");
        expectCHAI(ReactiveJSON).to.haveOwnProperty("$$typeof");
        expectCHAI(ReactiveJSON).to.haveOwnProperty("type");
        expectCHAI(ReactiveJSON).to.haveOwnProperty("key");
        expectCHAI(ReactiveJSON).to.haveOwnProperty("ref");
        expectCHAI(ReactiveJSON).to.haveOwnProperty("props");
      });
    });
    it("should return null on error", () => {
      //@ts-ignore
      expectCHAI(getJSONXChildren.call({}, { logError: () => {} })).to.eql(null);
    });
    it("should stringify children", () => {
      const obj = { some: "data", to: "stringify" };
      expectCHAI(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              //@ts-ignore
              children: obj,
              //@ts-ignore
              ___stringifyChildren: [null, 2]
            }
          }
        )
      ).to.eql(JSON.stringify(obj, null, 2));
      //normal stringify
      expectCHAI(
        //@ts-ignore
        getJSONXChildren(
          {
            jsonx: {
              //@ts-ignore
              children: obj,
              //@ts-ignore
              ___stringifyChildren: true
            }
          }
        )
      ).to.eql(JSON.stringify(obj, null, 2));
    });
    it("should toString children", () => {
      const obj = { some: "data", to: "stringify" };
      const testDate = new Date();
      expectCHAI(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              //@ts-ignore
              children: obj,
              //@ts-ignore
              ___toStringChildren: true
            }
          }
        )
      ).to.eql(obj.toString());
      expectCHAI(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              
              component: 'div',
              children: testDate,
              ___toStringChildren: true
            }
          }
        )
      ).to.eql(testDate.toString());
    });
    it("should convert children to numeral formatted string", () => {
      const numeralValue = 1500.23;
      const numeralFormat = "0,0";
      const numeralFormattedString = numeral(numeralValue).format(
        numeralFormat
      );
      expectCHAI(
        //@ts-ignore
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              //@ts-ignore
              children: numeralValue,
              ___toNumeral: numeralFormat
            }
          }
        )
      ).to.eql(numeralFormattedString);
    });
    it("should convert children date object to luxon formatted string", () => {
      const testLuxonFormat = luxon.DateTime.fromJSDate(testDate).toFormat(
        luxonFormat
      );
      // console.log({ testDate, testDateISO, luxonFormat, testLuxonFormat });
      expectCHAI(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              children: testDate,
              ___JSDatetoLuxonString: luxonFormat
            }
          }
        )
      ).to.eql(testLuxonFormat);
    });
    it("should convert children iso string to luxon formatted string", () => {
      const testLuxonFormat = luxon.DateTime.fromISO(testDateISO).toFormat(
        luxonFormat
      );
      expectCHAI(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              children: testDateISO,
              ___ISOtoLuxonString: luxonFormat
            }
          }
        )
      ).to.eql(testLuxonFormat);
    });
    it("should import templates into children", () => {
      const importedTemplate = JSONX._jsonxChildren.getJSONXChildren.call(
        //@ts-ignore
        { returnJSON: true, debug:true },
        {
          jsonx: {
            component: "Fragment",
            ___template: "./src/mock/simple_template.jxm.json"
          }
        }
      );
      expectCHAI(_jsonxChildren.templateCache).to.be.lengthOf(1);
      expectCHAI(importedTemplate).to.be.an("array");
      //@ts-ignore
      expectCHAI(importedTemplate[0].type).to.eql("div");
      //@ts-ignore
      expectCHAI(importedTemplate[0].children).to.eql("from external template");
    });
  });
  describe('fetchJSONSync', () => {
    const fetchJSONSync = _jsonxChildren.fetchJSONSync;
    const xmlhttpreq ={
      status: 200,
      responseText: '{"some":"data"}',
      DONE: 1,
      HEADERS_RECEIVED: 1,
      LOADING: 1,
      OPENED: 1,
      UNSENT: 1,
    }
    it('should returns sync json',()=>{
      const returnJSON = {
        open            : jest.fn(),
        send            : jest.fn(),
        setRequestHeader: jest.fn(),
      }
      const xhrMockClass = () => ({
        ...returnJSON,
        ...xmlhttpreq
      }) 
      //@ts-ignore
      window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
      const response = fetchJSONSync('/mock-endpoint')
      expect(response).toBe('{"some":"data"}')
      expect(returnJSON.open).toHaveBeenCalledTimes(1)
      expect(returnJSON.send).toHaveBeenCalledTimes(1)
      expect(returnJSON.setRequestHeader).toHaveBeenCalledTimes(0)
    });
    it('should apply custom headers',()=>{
      const cusomtHEADER = {
        open            : jest.fn(),
        send            : jest.fn(),
        setRequestHeader: jest.fn(),
      }
      const xhrMockClass = () => ({
        ...cusomtHEADER,
        ...xmlhttpreq
      });
      //@ts-ignore
      window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
      const response = fetchJSONSync('/mock-endpoint',{headers:[{user:'testUser'}]})
      expect(response).toBe('{"some":"data"}')
      expect(cusomtHEADER.open).toHaveBeenCalledTimes(1)
      expect(cusomtHEADER.send).toHaveBeenCalledTimes(1)
      expect(cusomtHEADER.setRequestHeader).toHaveBeenCalledTimes(1)
    });
    it('should handle request errors',()=>{
      const handleError = {
        open            : jest.fn(),
        send            : jest.fn(),
        setRequestHeader: jest.fn(),
      }
      const xhrMockClass = () => ({
        ...handleError,
        ...xmlhttpreq,
        status: 500,
        responseText: 'Testing Response Errors',
      });
      //@ts-ignore
      window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
      expect(()=>{
        fetchJSONSync('/mock-endpoint')
      }).toThrow('Testing Response Errors')
      // const response = fetchJSONSync('/mock-endpoint')
      // console.log({response})
      // expect(response).toBe('{"some":"data"}')
      expect(handleError.open).toHaveBeenCalledTimes(1)
      expect(handleError.send).toHaveBeenCalledTimes(1)
      expect(handleError.setRequestHeader).toHaveBeenCalledTimes(0)
    });
  });
  describe('getChildrenTemplate',()=>{
    const {getChildrenTemplate,templateCache,clearTemplateCache} = _jsonxChildren;
    it('should fetch json templates via ajax',()=>{
      const xhrMockClass = () => ({
        open            : jest.fn(),
        send            : jest.fn(),
        setRequestHeader: jest.fn(),
        status: 200,
        responseText: '{"some":"data"}',
        DONE: 1,
        HEADERS_RECEIVED: 1,
        LOADING: 1,
        OPENED: 1,
        UNSENT: 1,
      });
      //@ts-ignore
      window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
      //@ts-ignore
      const response = getChildrenTemplate('/mock-endpoint','fetch')
      expect(response).toMatchObject({ some: 'data' })
    })
    it('should handle no input',()=>{
      //@ts-ignore
      const response = getChildrenTemplate()
      expect(response).toBe(null)
    })
    it('should clear cache w/clearTemplateCache',()=>{
      expect(()=>{
        clearTemplateCache()
      }).not.toThrow()
      expect(templateCache.size).toBe(0)
    })
  })
});
