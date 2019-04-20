import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import * as rjx from '../dist/rjx-server.esm';
import * as rjx from '../src/main';
import util from 'util';

// console.log({ rjx, });
const sampleRJX = {
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
          src:'https://rjx.io/favicon.png',
        },
        __dangerouslyEvalProps: {
          alt:'"rjx"',
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

const RJXE = rjx.getRenderedJSON(sampleRJX);
const RJXJ = rjx.getRenderedJSON.call({
  returnJSON: true,
},
sampleRJX);
const RJXC = rjx.compile(sampleRJX);
const compiledReact = React.createElement('section', {}, [
  React.createElement('div', { title: 'this is a div', 'data-attr': 5, key: 1, }, 'inside of div'),
  React.createElement('img', { src: 'https://rjx.io/favicon.png', alt: 'rjx', key: 2, }),
]);

// const RE = React.createElement('div', { title: 'hello', }, 'hey there');

// console.log('RJXC', util.inspect(RJXC, { depth:20, }));
// // console.log('RJXE', util.inspect(RJXE, { depth:20, }));
// console.log('RJXJ', util.inspect(RJXJ, { depth:20, }));

const suite = new Benchmark.Suite;
// add tests
suite.add('RJX', function () {
  rjx.getRenderedJSON({
    component: 'div', children: [
      sampleRJX,
    ],
  });
});
suite.add('RJX JSON', function () {
  rjx.getReactElementFromJSON(RJXJ);
});
suite.add('Compiled RJX', function () {
  React.createElement(RJXC);
});
suite.add('React raw', function () {
  React.createElement('div', {}, [
    React.createElement('section', {}, [
      React.createElement('div', { title: 'this is a div', 'data-attr': eval(5), key:1, }, 'inside of div'),
      React.createElement('img', { src:'https://rjx.io/favicon.png', alt:eval('"rjx"'), key:2, }),
    ]),
  ]);
});
suite.add('React', function () {
  React.createElement('div', {}, [
    React.createElement('section', {}, [
      React.createElement('div', { title: 'this is a div', 'data-attr':5, key:1, }, 'inside of div'),
      React.createElement('img', { src:'https://rjx.io/favicon.png', alt:'rjx', key:2, }),
    ]),
  ]);
});
suite.add('React & RJX', function () {
  React.createElement('div', { }, [RJXE,]);
});
suite.add('React & React', function () {
  React.createElement('div', { }, [compiledReact,]);
});
// suite.add('RJX', function () {
//   rjx.getRenderedJSON({
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