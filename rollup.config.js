import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from '@crokita/rollup-plugin-node-builtins';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';
import terser from 'rollup-plugin-terser-js';
import alias from '@rollup/plugin-alias';
import pkg from "./package.json";
// import { cloneElement } from 'react';

const name = 'jsonx';
const external = [
  // "react",
  // "react-dom",
];
const coreWebExternal = [
  "react",
  "react-dom",
];
const serverExternal = [
  'path',
  'react',
  'react-dom',
  'react-dom/server',
  'react-dom-factories',
  'create-react-class',
  'memory-cache',
  // 'use-global-hook',
  'ua-parser-js',
];
const windowGlobals = {
  // react: "React"
};
const coreWebWindowGlobals = {
  react: "React",
  'react-dom': "ReactDOM"
};


function getOutput({
  minify = false,
  server = false,
  serverDom = false,
  core = false,
  legacy = false,
}) {
  const output = server ? [{
      file: pkg.main,
      format: "cjs",
      exports: "named",
      name,
      sourcemap: true
    },
    {
      file: pkg.esm,
      format: "es",
      exports: "named",
      name,
      sourcemap: true
    }
  ] : [{
      file: pkg.browser,
      format: "umd",
      exports: "named",
      name,
      globals: core ? coreWebWindowGlobals : windowGlobals,
      sourcemap: true
    },
    {
      file: pkg.web,
      format: "iife",
      exports: "named",
      name,
      globals: core ? coreWebWindowGlobals : windowGlobals,
      sourcemap: true
    }
  ];
  if (minify) {
    return output.map(item => {
      const itemFileArray = item.file.split('.');
      if (core) itemFileArray.splice(itemFileArray.length - 1, 0, legacy?'core-legacy-min':'core-min');
      else itemFileArray.splice(itemFileArray.length - 1, 0, 'min');
      item.file = itemFileArray.join('.');
      item.sourcemap = false;
      return item;
    })
  }
  if (serverDom) {
    return output.map(item => {
      const itemFileArray = item.file.split('.');
      itemFileArray.splice(itemFileArray.length - 1, 0, 'server');
      item.file = itemFileArray.join('.');
      item.sourcemap = false;
      return item;
    })
  }
  if (core) {
    return output.map(item => {
      const itemFileArray = item.file.split('.');
      itemFileArray.splice(itemFileArray.length - 1, 0, legacy?'core-legacy':'core');
      item.file = itemFileArray.join('.');
      item.sourcemap = false;
      return item;
    })
  }
  return output;
}

function getPlugins({
  minify = false,
  server = false,
  serverDom = false,
  core = false,
  legacy = false,
}) {
  const plugins = [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': minify ?
        JSON.stringify('production') : JSON.stringify('development'),
      'global.': '(typeof global!=="undefined" ? global : window).'
    }),
    builtins({}),
    // nodePolyfills({}),
    resolve({
      preferBuiltins: true,
    }),
    typescript({
      noEmitOnError: false,
      declaration: false,
      declarationDir: null,
      allowJs:true,
      target: legacy?"es6":"esnext",
    }),
    commonjs({
      extensions: ['.js'],
    }), // so Rollup can convert `ms` to an ES module
    globals({
      // react: 'React',
      // 'react-dom': 'ReactDOM'
    }),
  ];
  if (serverDom) {
    plugins.push(alias({
      entries: {
        find: /react-dom$/,
        replacement: 'react-dom/server'
      }
    }));
  }

  if (minify) {
    const minifyPlugins = [

    ].concat(plugins,
      [
        terser({
          sourcemaps: true,
          compress: true,
          mangle: true,
          verbose: true,
        }),
      ]);
    return minifyPlugins;
  }
  return plugins;
}


export default [
  //web
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: false,
    }),
    external,
    plugins: getPlugins({
      minify: false,
    }),
  },
  //web core
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: false,
      core: true,
    }),
    external: coreWebExternal,
    plugins: getPlugins({
      minify: false,
      core: true,
    }),
  },
  //web minified
  {
    input: "src/index.ts",
    output: getOutput({
      minify: true,
      server: false,
    }),
    external,
    plugins: getPlugins({
      minify: true,
    }),
  },
  //web minified core
  {
    input: "src/index.ts",
    output: getOutput({
      minify: true,
      server: false,
      core: true,
    }),
    external: coreWebExternal,
    plugins: getPlugins({
      minify: true,
      core: true,
    }),
  },
  //web  legacy
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: false,
      legacy: true,
    }),
    external,
    plugins: getPlugins({
      minify: false,
      legacy: true,
    }),
  },
  //web  core legacy
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: false,
      legacy: true,
      core: true,
    }),
    external: coreWebExternal,
    plugins: getPlugins({
      legacy: true,
      minify: false,
      core: true,
    }),
  },
  //web minified legacy
  {
    input: "src/index.ts",
    output: getOutput({
      minify: true,
      server: false,
      legacy: true,
    }),
    external,
    plugins: getPlugins({
      minify: true,
      legacy: true,
    }),
  },
  //web minified core legacy
  {
    input: "src/index.ts",
    output: getOutput({
      minify: true,
      server: false,
      legacy: true,
      core: true,
    }),
    external: coreWebExternal,
    plugins: getPlugins({
      legacy: true,
      minify: true,
      core: true,
    }),
  },

  //server
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: true,
    }),
    external: serverExternal,
    plugins: getPlugins({
      minify: false,
      server: true,
    }),
  },
  //server react-dom-server
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: true,
      serverDom: true,
    }),
    external: serverExternal,
    plugins: getPlugins({
      minify: false,
      server: true,
      serverDom: true,
    }),
  },
];