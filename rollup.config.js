// import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
// import alias from 'rollup-plugin-alias';
import pkg from './package.json';
// import { terser, } from 'rollup-plugin-terser';
import terser from 'rollup-plugin-terser-js';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    // external: [ 'react' ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      name: 'rjx',
    }, {
      exports: 'named',
      file: pkg.web,
      format: 'iife',
      name: 'rjx',
    },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' ),
        // 'process.env.NODE_ENV': JSON.stringify( 'production' ),
      }),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      builtins({
      }),
      babel({
        runtimeHelpers: true,
        // 'presets': [
        //   ['@babel/env', { },],
        // ],
        plugins: [
          [
            '@babel/transform-runtime',
            // { useESModules: output.format !== 'cjs' }
          ],

          [
            '@babel/plugin-proposal-export-namespace-from',
          ],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          // 'node_modules/ml-array-utils/src/index.js': [ 'scale' ]
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createContext', 'Fragment', 'Suspense', 'lazy', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', ],

        },
      }), // so Rollup can convert `ms` to an ES module
      globals({
      }),
      // terser({
      //   sourcemap: true
      // }),
    ],
    watch: {
      exclude: 'node_modules/**',
    },
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: [
      'react',
      'react-dom',
      'react-dom/server',
      'react-dom-factories',
      'create-react-class',
      // 'use-global-hook',
      'ua-parser-js',
    ], // <-- suppresses the warning
    output: [
      {
        name: 'rjx',
        exports: 'named',
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: 'rjx',
        exports: 'named',
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      babel({
        // exclude: 'node_modules/**', // only transpile our source code
        runtimeHelpers: true,
        // 'presets': [
        //   // ['@babel/env', { },],
        //   '@babel/env'
        // ],
        plugins: [
          [
            '@babel/transform-runtime',
            // { useESModules: output.format !== 'cjs' }
          ],

          [
            '@babel/plugin-proposal-export-namespace-from',
          ],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
    watch: {
      include: 'src/**',
    },
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: [
      'react',
      'react-dom',
      'react-dom/server',
      'react-dom-factories',
      'create-react-class',
      // 'use-global-hook',
      'ua-parser-js',
    ], // <-- suppresses the warning
    output: [
      {
        name: 'rjx',
        exports: 'named',
        file: 'dist/rjx-server.cjs.js',
        format: 'cjs',
      },
      {
        name: 'rjx',
        exports: 'named',
        file: 'dist/rjx-server.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      // aliasModuleSpecifiers({
      //   'react-dom/': 'react-dom/server/',
      // }),
      // alias({
      //   'react-dom': path.resolve('./node_modules/react-dom/server.node.js'),
      //   ReactDOM: path.resolve('./node_modules/react-dom/server.node.js'),
      // }),

      resolve({
        preferBuiltins: true,
      }),
      babel({
        // exclude: 'node_modules/**', // only transpile our source code
        runtimeHelpers: true,
        // 'presets': [
        //   // ['@babel/env', { },],
        //   '@babel/env'
        // ],
        plugins: [
          [
            '@babel/transform-runtime',
            // { useESModules: output.format !== 'cjs' }
          ],

          [
            '@babel/plugin-proposal-export-namespace-from',
          ],
          ['babel-plugin-replace-imports', {
            'test': /react-dom$/,
            'replacer': 'react-dom/server',
          },],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
    watch: {
      include: 'src/**',
    },
  },
  // BROWSER MIN
  {
    input: 'src/main.js',
    // external: [ 'react' ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: 'dist/rjx.umd.min.js',
      format: 'umd',
      name: 'rjx',
    }, {
      exports: 'named',
      file: 'dist/rjx.web.min.js',
      format: 'iife',
      name: 'rjx',
    },
    ],
    plugins: [
      replace({
        // 'process.env.NODE_ENV': JSON.stringify( 'development' ),
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
      }),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      commonjs({
        namedExports: {
          'node_modules/react/index.js':[
          // 'node_modules/react/cjs/react.production.min.js': [
            // 'default',
            'Children', 'Component', 'PropTypes', 'createContext', 'Fragment', 'Suspense', 'lazy', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue',
          ],
        },
      }), // so Rollup can convert `ms` to an ES module
      builtins({
      }),
      globals({
      }),
      babel({
        runtimeHelpers: true,
        externalHelpers: true,
        // exclude: 'node_modules/@babel/runtime/**',
        exclude: 'node_modules/@babel/runtime/helpers/typeof.js',
        'presets': [
          ['@babel/env', {}, ],
        ],
        plugins: [
          [
            '@babel/transform-runtime',
          ],
          [
            '@babel/plugin-proposal-export-namespace-from',
          ],
          ['babel-plugin-replace-imports', {
            'test': /react-dom\/server/,
            'replacer': '../design/_mock_react-dom-server',
          },],
          ['babel-plugin-replace-imports', {
            'test': /express/,
            'replacer': '../design/_mock_express',
          },'u-rename-express' ],
          // ['babel-plugin-replace-imports', {
          //   'test': /ua-parser-js$/,
          //   'replacer': '../design/_mock_react-dom-server',
          // },'u-rename' ],
        ],
      }),
      terser({
        sourcemaps:true,
        compress: true,
        mangle: true,
      }),
    ],
  },
];