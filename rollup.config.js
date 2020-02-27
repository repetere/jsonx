import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';
import terser from 'rollup-plugin-terser-js';
import alias from '@rollup/plugin-alias';
import pkg from "./package.json";

const name = 'jsonx';
const external = [
  // "react",
  // "react-dom",
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

function getOutput({ minify = false, server = false, serverDom = false, }) {
  const output = server ?
    [ {
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
    ] :
    [ {
      file: pkg.browser,
      format: "umd",
      exports: "named",
      name,
      globals:windowGlobals,
      sourcemap: true
    },
    {
      file: pkg.web,
      format: "iife",
      exports: "named",
      name,
      globals:windowGlobals,
      sourcemap: true
    }
  ];
    if (minify) {
        return output.map(item => {
            const itemFileArray = item.file.split('.');
            itemFileArray.splice(itemFileArray.length - 1, 0, 'min');
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
    return output;
}

function getPlugins({
  minify = false,
  server = false,
  serverDom = false,
}) {
  const plugins = [
    // // external(),
    replace({
      'process.env.NODE_ENV': minify ?
        JSON.stringify('production') : JSON.stringify('development'),
      'global.': '(typeof global!=="undefined" ? global : window).'
    }),
    resolve({
      preferBuiltins: true,
    }),
    builtins({}),
    typescript({
      noEmitOnError: false,
      declaration: false,
      declarationDir: null,
    }),
    commonjs({
      extensions: [ '.js', '.ts' ],
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        // 'node_modules/ml-array-utils/src/index.js': [ 'scale' ]
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createContext', 'Fragment', 'Suspense', 'lazy', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', ],

        'node_modules/memory-cache/index.js':[
          'cache',
          'default',
        ],
      },
    }), // so Rollup can convert `ms` to an ES module
    globals({
      // react: 'React',
      // 'react-dom': 'ReactDOM'
    }),
  ];
  if (serverDom) {
    plugins.push(alias({
      entries:{ find:/react-dom$/, replacement: 'react-dom/server' }
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
  // {
  //   input: "src/index.ts",
  //   output: getOutput({
  //     minify: false,
  //     server: false,
  //   }),
  //   external,
  //   plugins: getPlugins({
  //     minify: false,
  //   }),
  // },
  // {
  //   input: "src/index.ts",
  //   output: getOutput({
  //     minify: false,
  //     server: true,
  //   }),
  //   external:serverExternal,
  //   plugins: getPlugins({
  //     minify: false,
  //     server: true,
  //   }),
  // },
  // {
  //   input: "src/index.ts",
  //   output: getOutput({
  //     minify: true,
  //     server: false,
  //   }),
  //   external,
  //   plugins: getPlugins({
  //     minify: true,
  //   }),
  // },
  {
    input: "src/index.ts",
    output: getOutput({
      minify: false,
      server: true,
      serverDom:true,
    }),
    external:serverExternal,
    plugins: getPlugins({
      minify: false,
      server: true,
      serverDom:true,
    }),
  },
];