import * as JSONX from "./index";
import { JSDOM } from "jsdom";
import numeral from "numeral";
import * as luxon from "luxon";
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
      expect(Array.isArray(JSONXChildren)).toBeTruthy()
      expect(JSONXChildren.length).toBe(sampleJSONX.children.length);
      expect(typeof JSONXChildrenPTag).toBe("string");
      expect(JSONXChildrenPTag).toBe(sampleJSONX.children[0].children);
      expect(
        getChildrenProperty({
          jsonx: {
            props: { _children: {} },
            children: "hello"
          }
        })
      ).toBe("hello");
      expect(
        getChildrenProperty({
          jsonx: {}
        })
      ).toBeNull();
      expect(Array.isArray(getChildrenProperty({ props: { children: [1, 2, 3] } }))).toBeTruthy();
      expect(
        getChildrenProperty({ jsonx: { props: { children: "hello" } } })
      ).toBe("hello");
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
      expect(typeof JSONXChildren).toBe("string");
      expect(JSONXChildren).toBe(testJSONX.props._children);
      expect(Array.isArray(JSONXChildren2)).toBeTruthy();
      expect(JSONXChildren2.length).toBe(testJSONX2.props._children.length);
      expect(typeof JSONXChildren3).toBe("string");
      expect(JSONXChildren3).toBe(testJSONX3.props._children);
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
      expect(typeof JSONXChildren).toBe("string");
      expect(JSONXChildren).toBe(testJSONX.props.children);
      expect(Array.isArray(JSONXChildren2)).toBeTruthy()
      expect(JSONXChildren2.length).toBe(testJSONX2.props.children.length);
      expect(Array.isArray(JSONXChildren3)).toBeTruthy()
      expect(JSONXChildren3).toBe(testJSONX3.children);
      expect(typeof JSONXChildren4).toBe("function");
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
      expect(childProps).toBe(childjsonx);
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
      expect(childProps_span.props.title).toBe(passableJSONX.props.title);
      //@ts-ignore
      expect(childProps_p.props.title).toBe(passableJSONX.props.title);
      //@ts-ignore
      expect(childProps_p.props.style.color).toBe(
        //@ts-ignore
        passableJSONX.children[1].props.style.color
      );
      //@ts-ignore
      expect(childProps_p.props.key === renderIndex).toBeFalsy()
      //@ts-ignore
      expect(childProps_span.props.key === renderIndex).toBeFalsy();
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
      expect(childProps_span.props).toMatchObject({ value: 302, size: 2 })      
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
        expect(typeof ReactiveJSON).toBe("object");
        expect(ReactiveJSON).toHaveProperty("$$typeof");
        expect(ReactiveJSON).toHaveProperty("type");
        expect(ReactiveJSON).toHaveProperty("key");
        expect(ReactiveJSON).toHaveProperty("ref");
        expect(ReactiveJSON).toHaveProperty("props");
      });
    });
    it("should return null on error", () => {
      //@ts-ignore
      expect(getJSONXChildren.call({}, { logError: () => {} })).toBeNull();
    });
    it("should stringify children", () => {
      const obj = { some: "data", to: "stringify" };
      expect(
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
      ).toBe(JSON.stringify(obj, null, 2));
      //normal stringify
      expect(
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
      ).toBe(JSON.stringify(obj, null, 2));
    });
    it("should toString children", () => {
      const obj = { some: "data", to: "stringify" };
      const testDate = new Date();
      expect(
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
      ).toBe(obj.toString());
      expect(
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
      ).toBe(testDate.toString());
    });
    it("should convert children to numeral formatted string", () => {
      const numeralValue = 1500.23;
      const numeralFormat = "0,0";
      const numeralFormattedString = numeral(numeralValue).format(
        numeralFormat
      );
      expect(
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
      ).toBe(numeralFormattedString);
    });
    it("should convert children date object to luxon formatted string", () => {
      const testLuxonFormat = luxon.DateTime.fromJSDate(testDate).toFormat(
        luxonFormat
      );
      // console.log({ testDate, testDateISO, luxonFormat, testLuxonFormat });
      expect(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              children: testDate,
              ___JSDatetoLuxonString: luxonFormat
            }
          }
        )
      ).toBe(testLuxonFormat);
    });
    it("should convert children iso string to luxon formatted string", () => {
      const testLuxonFormat = luxon.DateTime.fromISO(testDateISO).toFormat(
        luxonFormat
      );
      expect(
        getJSONXChildren.call(
          {},
          {
            jsonx: {
              children: testDateISO,
              ___ISOtoLuxonString: luxonFormat
            }
          }
        )
      ).toBe(testLuxonFormat);
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
      expect(_jsonxChildren.templateCache.size).toBe(1);
      expect(Array.isArray(importedTemplate)).toBeTruthy();
      //@ts-ignore
      expect(importedTemplate[0].type).toBe("div");
      //@ts-ignore
      expect(importedTemplate[0].children).toBe("from external template");
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
