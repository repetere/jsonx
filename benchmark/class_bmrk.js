import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import * as jsonx from '../dist/jsonx-server.esm';
import * as jsonx from '../src/main';
import * as jsonxComponents from '../src/components';

import util from 'util';

/**
 * BASELINE
 * ---
JSONX Class x 20,260 ops/sec ±4.05% (76 runs sampled)
JSONX Function x 179,251 ops/sec ±0.66% (86 runs sampled)
React Class x 952,871 ops/sec ±3.14% (70 runs sampled)
React Function x 767,292,810 ops/sec ±1.00% (88 runs sampled)
JSONX & JSONX Class x 6,296 ops/sec ±0.96% (86 runs sampled)
JSONX & JSONX Function x 11,839 ops/sec ±0.88% (88 runs sampled)
React & React Class x 806,450 ops/sec ±0.82% (87 runs sampled)
React & React Function x 810,213 ops/sec ±0.82% (88 runs sampled)
JSONX & React Class x 11,981 ops/sec ±1.13% (87 runs sampled)
JSONX & React Function x 11,833 ops/sec ±2.16% (83 runs sampled)
React & JSONX Class x 732,506 ops/sec ±3.27% (82 runs sampled)
React & JSONX Function x 810,262 ops/sec ±0.72% (86 runs sampled)
Fastest is React Function
 */

const sampleJSONX = {
  component: 'section',
  children: [
    {
      component: 'div',
      props: {
        title:'this is a div',
      },
      __dangerouslyEvalProps: {
        'data-attr':5,
      },
      children:'inside of div',
    },
    {
      img: {
        // debug:true,
        props: {
          src:'https://jsonx.io/favicon.png',
        },
        __dangerouslyEvalProps: {
          alt:'"jsonx"',
        },
        __dangerouslyBindEvalProps:{
          onClick:`(function(e){ 
            console.warn('click event',{e});
          })`,
        },
      },
    },
  ],
};

const sampleReact = React.createElement('section', {}, [
  React.createElement('div', { title: 'this is a div', 'data-attr': 5, key: 1, }, 'inside of div'),
  React.createElement('img', { src: 'https://jsonx.io/favicon.png', alt: 'jsonx', key: 2, }),
]);

const jsonxClass = jsonxComponents.getReactClassComponent({ render: { body: sampleJSONX, }, });

const jsonxFunction = jsonxComponents.getReactFunctionComponent(sampleJSONX, '', {});

class reactClass extends React.Component{
  render() {
    return sampleReact;
  }
}

const reactFunction = function reactFunction(props) {
  return sampleReact(props);
};

const suite = new Benchmark.Suite;
// add tests
suite.add('JSONX Class', function () {
  const jsonxClass = jsonxComponents.getReactClassComponent({ render: { body: sampleJSONX, }, });
});
suite.add('JSONX Function', function () {
  const jsonxFunction = jsonxComponents.getReactFunctionComponent(sampleJSONX, '', {});
});
suite.add('React Class', function () {
  class reactClass extends React.Component{
    render() {
      return sampleReact;
    }
  }
});
suite.add('React Function', function () {
  const reactFunction = function (props) {
    return sampleReact(props);
  };
});
suite.add('JSONX & JSONX Class', function () {
  jsonx.getRenderedJSON({
    component: 'div', children: [
      jsonxClass,
    ],
  });
});
suite.add('JSONX & JSONX Function', function () {
  jsonx.getRenderedJSON({
    component: 'div', children: [
      jsonxFunction,
    ],
  });
});
suite.add('React & React Class', function () {
  React.createElement('div', { }, [reactClass,]);
});
suite.add('React & React Function', function () {
  React.createElement('div', { }, [reactFunction,]);
});
suite.add('JSONX & React Class', function () {
  jsonx.getRenderedJSON({
    component: 'div', children: [
      reactClass,
    ],
  });
});
suite.add('JSONX & React Function', function () {
  jsonx.getRenderedJSON({
    component: 'div', children: [
      reactFunction,
    ],
  });
});
suite.add('React & JSONX Class', function () {
  React.createElement('div', { }, [jsonxClass,]);
});
suite.add('React & JSONX Function', function () {
  React.createElement('div', { }, [jsonxFunction,]);
});
suite.on('cycle', function (event) {
  console.log(String(event.target));
});
suite.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});
// run async
suite.run({ 'async': true, });
// console.log({ suite, });