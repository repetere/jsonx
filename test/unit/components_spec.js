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
  children: 'some div',
};

const sampleCustomElementRJX = {
  component: 'div',
  props: {
    id: 'customRJX',
    className:'rjx',
  },
  thisprops: {
    title: ['extraname', ],
  },
  children: [
    {
      component: 'p',
      children:'some text',
    },
    {
      component: 'Welcome',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
    {
      component: 'WelcomeBindSpy',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
    {
      component: 'WelcomeNonBind',
      props: {
        style: {
          color: 'red',
          fontWeight:'bold',
        },
        name:'fromCustom',
      },
      thisprops: {
        title: ['elementProperties', 'title', ],
      },
      children:'hello customElement2',
    },
  ],
};

class Welcome extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeBindSpy extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

class WelcomeNonBind extends React.Component {
  render() {
    return React.createElement('h1', { name: 'Welcome', }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

describe('rjx components', function () { 
  describe('getBoundedComponents', () => {
    it('should bind this to reactComponents', () => {
      const bindSpy = sinon.spy();
      WelcomeBindSpy.bind = bindSpy;
      const reactComponents = {
        Welcome,
        WelcomeNonBind,
        WelcomeBindSpy,
      };
      const boundedComponents = ['Welcome', 'WelcomeBindSpy', ];
      const customComponents = rjx._rjxComponents.getBoundedComponents({ reactComponents, boundedComponents, advancedBinding:true, });
      const customThis = {
        props: {
          name:'customElementTest',
          extraname: 'customElementTestName',
          elementProperties: {
            title: 'AddedWithThis',
          },
        },
        boundedComponents,
        reactComponents,
        // debug: false,
        // logError:()=>null,
      };
      const RJXPropCheck = rjx.getRenderedJSON.call(customThis, sampleCustomElementRJX);

      expect(bindSpy.called).to.be.true;
      expect(RJXPropCheck.props.title).to.eql(customThis.props.extraname);
      expect(customComponents.length).to.eql(reactComponents.length);
    });
  });
  describe('getComponentFromMap', () => {
    const reactBootstrap = {
      Welcome,
      WelcomeNonBind,
    };
    const componentLibraries = {
      reactBootstrap,
    };
    it('should return a function if rjx.component is not a string', () => {
      expect(rjx._rjxComponents.getComponentFromMap({
        rjx: {
          component:Welcome,
        }, })).to.be.a('function').and.to.eql(Welcome);
    });
    it('should return the dom element string if a valid DOM elmenet in ReactDOM', () => {
      [ 'div', 'span', 'p', 'section', ].forEach(el => {
        const rjxObj = { rjx: { component: el, }, };
        expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(el);
      });
    });
    it('should return a custom element', () => {
      const rjxObj = {
        rjx: {
          component: 'Welcome',
        },
        reactComponents: {
          Welcome,
        },
      };
      expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should return a component library react element', () => {
      const rjxObj = {
        rjx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(rjx._rjxComponents.getComponentFromMap(rjxObj)).to.eql(Welcome);
    });
    it('should handle errors', () => { 
      const logError = sinon.spy();
      expect(rjx._rjxComponents.getComponentFromMap.bind(null)).to.throw();
      try {
        rjx._rjxComponents.getComponentFromMap({ debug: true, logError, });
      } catch (e) {
        expect(e).to.be.a('error');
        expect(logError.called).to.be.true;
      }
    });
  });
  describe('getComponentFromLibrary', () => {
    const reactBootstrap = {
      Welcome,
      WelcomeNonBind,
    };
    const componentLibraries = {
      reactBootstrap,
    };
    it('should return undefined if not valid', () => {
      expect(rjx._rjxComponents.getComponentFromLibrary()).to.be.undefined;
    });
    it('should return a function if selecting valid component library', () => {
      const rjxObj = {
        rjx: {
          component: 'reactBootstrap.Welcome',
        },
        componentLibraries,
      };
      expect(rjx._rjxComponents.getComponentFromLibrary(rjxObj)).to.be.eql(Welcome);
    });
  });
  describe('componentMap', () => {
    before(function () {
      this.jsdom = mochaJSDOM();
    });
    it('should accept components from a window property', function () {
      global.window.__rjx_custom_elements = {
        Welcome,
        WelcomeNonBind,
        WelcomeBindSpy,
      };
      delete require.cache[ require.resolve('../../dist/rjx.cjs') ];
      const window_test_rjx = require('../../dist/rjx.cjs');

      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('Welcome');
      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('WelcomeNonBind');
      expect(window_test_rjx._rjxComponents.componentMap).to.haveOwnProperty('WelcomeBindSpy');
    });    
    after(function () {
      this.jsdom();
    });
  });
});