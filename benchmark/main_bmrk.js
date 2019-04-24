import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import * as jsonx from '../dist/jsonx-server.esm';
import * as jsonx from '../src/main';
import util from 'util';

// console.log({ jsonx, });
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
          })`
        }
      },
    },
  ],
};

const JSONXE = jsonx.getRenderedJSON(sampleJSONX);
const JSONXJ = jsonx.getRenderedJSON.call({
  returnJSON: true,
},
sampleJSONX);
const JSONXC = jsonx.compile(sampleJSONX);
const compiledReact = React.createElement('section', {}, [
  React.createElement('div', { title: 'this is a div', 'data-attr': 5, key: 1, }, 'inside of div'),
  React.createElement('img', { src: 'https://jsonx.io/favicon.png', alt: 'jsonx', key: 2, }),
]);

// const RE = React.createElement('div', { title: 'hello', }, 'hey there');

// console.log('JSONXC', util.inspect(JSONXC, { depth:20, }));
// // console.log('JSONXE', util.inspect(JSONXE, { depth:20, }));
// console.log('JSONXJ', util.inspect(JSONXJ, { depth:20, }));

const suite = new Benchmark.Suite;
// add tests
suite.add('JSONX', function () {
  jsonx.getRenderedJSON({
    component: 'div', children: [
      sampleJSONX,
    ],
  });
});
suite.add('JSONX JSON', function () {
  jsonx.getReactElementFromJSON(JSONXJ);
});
suite.add('Compiled JSONX', function () {
  React.createElement(JSONXC);
});
suite.add('React raw', function () {
  React.createElement('div', {}, [
    React.createElement('section', {}, [
      React.createElement('div', { title: 'this is a div', 'data-attr': eval(5), key:1, }, 'inside of div'),
      React.createElement('img', { src:'https://jsonx.io/favicon.png', alt:eval('"jsonx"'), key:2, }),
    ]),
  ]);
});
suite.add('React', function () {
  React.createElement('div', {}, [
    React.createElement('section', {}, [
      React.createElement('div', { title: 'this is a div', 'data-attr':5, key:1, }, 'inside of div'),
      React.createElement('img', { src:'https://jsonx.io/favicon.png', alt:'jsonx', key:2, }),
    ]),
  ]);
});
suite.add('React & JSONX', function () {
  React.createElement('div', { }, [JSONXE,]);
});
suite.add('React & React', function () {
  React.createElement('div', { }, [compiledReact,]);
});
// suite.add('JSONX', function () {
//   jsonx.getRenderedJSON({
//     component: 'div',
//     children: 'text body',
//   });
// });
// suite.add('React', function () {
//   ReactDOMServer.renderToString(React.createElement('div', { title: 'hello', }, 'text body'));
// });
// suite.add('React & React', function () {
//   React.createElement(RE);
// });
// add listeners
// suite.on('start', function (event) {
//   console.log('start', String(event.target));
// });
// suite.on('cycle', function (event) {
//   console.log(String(event.target));
// });
suite.on('cycle', function (event) {
  console.log(String(event.target));
});
suite.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});
// run async
suite.run({ 'async': true, });
// console.log({ suite, });