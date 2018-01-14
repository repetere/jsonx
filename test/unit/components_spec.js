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
        title: [ 'elementProperties','title' ],
      },
      children:'hello customElement2',
    },
  ],
};

class Welcome extends React.Component {
  render() {
    // console.log('this', this);
    console.log('this.props', this.props);
    return React.createElement('h1', { name: 'Welcome' }, `Hello, ${this.props.name} ${this.props.title||'NA'}`);
  }
}

describe('rjx components', function () { 
  describe('getBoundedComponents', () => {
    it('should bind this to reactComponents', () => {
      const reactComponents = {
        Welcome,
      };
      const boundedComponents = [ 'Welcome', ];
      const customComponents = rjx._rjxComponents.getBoundedComponents({ reactComponents, boundedComponents, });
      const customThis = {
        name:'customElementTest',
        extraname: 'customElementTestName',
        props: {
          
          elementProperties: {
            title: 'AddedWithThis',
          },
        },
        boundedComponents,
        reactComponents,
      };
      const ReactiveJSONString = rjx.rjxHTMLString.call(
        customThis,
        {
          rjx: sampleCustomElementRJX,
        });
      console.log({ ReactiveJSONString });
      // expect(ReactiveJSON).to.be.an('object');
      // expect(ReactiveJSON).to.haveOwnProperty('$$typeof');
      // expect(ReactiveJSON).to.haveOwnProperty('type');
      // expect(ReactiveJSON).to.haveOwnProperty('key');
      // expect(ReactiveJSON).to.haveOwnProperty('ref');
      // expect(ReactiveJSON).to.haveOwnProperty('props');
    });
    // it('should handle errors with empty components', () => {
    //   const emptySpanComponent = rjx.getRenderedJSON({});
    //   const emptySpanComponentDebugged = rjx.getRenderedJSON({}, {}, { debug: true, });
    //   expect(emptySpanComponent).to.be.an('object');
    //   expect(emptySpanComponentDebugged).to.be.an('object');
    //   expect(emptySpanComponentDebugged.props.children).to.eql('Error: Missing Component Object');
    // });
    // it('should throw an error with invalid components', () => {
    //   const loggerSpy = sinon.spy();
    //   expect(rjx.getRenderedJSON.bind(null, { component: 'somethingInvalid', })).to.throw('Invalid React Component(somethingInvalid)');
    //   try {
    //     rjx.getRenderedJSON.call(null, { component: 'somethingInvalid', }, {}, { debug: true, logError: loggerSpy, });
    //   } catch (e) {
    //     expect(loggerSpy.called).to.be.true;
    //     expect(e).to.be.an('error');
    //   }
    // });
  });
  describe('getComponentFromMap', () => {
    // it('should return an HTML string', () => {
    //   const rjxString = rjx.rjxHTMLString({ rjx: sampleRJX, });
    //   const dom = new JSDOM(`<!DOCTYPE html><body>${rjxString}</body>`);

    //   expect(rjxString).to.be.a('string');
    //   expect(dom.window.document.body.querySelector('p').innerHTML).to.eql('hello world');
    //   expect(dom.window.document.body.querySelector('p').style.color).to.eql('red');
    // });
  });
  describe('componentMap', () => {
    // before(function () {
    //   this.jsdom = mochaJSDOM();
    // });
    // it('should render component inside of querySelector', function () {
    //   const containerDiv = document.createElement('div');
    //   containerDiv.setAttribute('id', 'reactContainer');
    //   document.body.appendChild(containerDiv);
    //   rjx.rjxRender({ rjx: sampleRJX, querySelector:'#reactContainer', });
      
    //   expect(document.body.querySelector('p').innerHTML).to.eql('hello world');
    //   expect(document.body.querySelector('p').style.color).to.eql('red');
    // });    
    // after(function () {
    //   this.jsdom();
    // });
  });
});