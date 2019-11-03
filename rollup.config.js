// import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
// import alias from 'rollup-plugin-alias';
import pkg from './package.json';
import { terser, } from 'rollup-plugin-terser';
// import terser from 'rollup-plugin-terser-js';
import typescript from 'rollup-plugin-typescript';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    // external: [ 'react' ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      name: 'jsonx',
    }, {
      exports: 'named',
      file: pkg.web,
      format: 'iife',
      name: 'jsonx',
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
      typescript(),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          // 'node_modules/ml-array-utils/src/index.js': [ 'scale' ]
          'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createContext', 'Fragment', 'Suspense', 'lazy', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', ],

          'node_modules/memory-cache/index.js':[
            'cache',
            'Cache',
            'default',
          ],
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
    input: 'src/index.ts',
    external: [
      'path',
      'react',
      'react-dom',
      'react-dom/server',
      'react-dom-factories',
      'create-react-class',
      'memory-cache',
      // 'use-global-hook',
      'ua-parser-js',
    ], // <-- suppresses the warning
    output: [
      {
        name: 'jsonx',
        exports: 'named',
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: 'jsonx',
        exports: 'named',
        file: pkg.esm,
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      builtins({
      }),
      commonjs({}),
      typescript(),
      globals({
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
    input: 'src/index.ts',
    external: [
      'path',
      'react',
      'react-dom',
      'react-dom/server',
      'react-dom-factories',
      'create-react-class',
      'memory-cache',
      // 'use-global-hook',
      'ua-parser-js',
    ], // <-- suppresses the warning
    output: [
      {
        name: 'jsonx',
        exports: 'named',
        file: 'dist/jsonx-server.cjs.js',
        format: 'cjs',
      },
      {
        name: 'jsonx',
        exports: 'named',
        file: 'dist/jsonx-server.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      typescript(),
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
    input: 'src/index.ts',
    // external: [ 'react' ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: 'dist/jsonx.umd.min.js',
      format: 'umd',
      name: 'jsonx',
      sourcemap:true,
      compress: true,
      mangle: true,
    }, {
      exports: 'named',
      file: 'dist/jsonx.web.min.js',
      format: 'iife',
      name: 'jsonx',
      sourcemap:true,
      compress: true,
      mangle: true,

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
      builtins({
      }),
      typescript(),
      commonjs({
        namedExports: {
          'node_modules/react/index.js':[
          // 'node_modules/react/cjs/react.production.min.js': [
            // 'default',
            'Children', 'Component', 'PropTypes', 'createContext', 'Fragment', 'Suspense', 'lazy', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue',
          ],
          'node_modules/memory-cache/index.js':[
            'cache',
            'Cache',
            'default',
          ],
        },
      }), // so Rollup can convert `ms` to an ES module
      
      globals({
      }),

      terser({
        // sourceMap: {
        //   filename: 'dist/jsonx.web.min.js',
        //   url: 'dist/jsonx.web.min.js.map',
        // },
        // sourcemaps:true,
        // sourcemap:true,
        compress: true,
        mangle: true,
      }),

      // terser({
      //   sourcemap: true
      // }),
    ],
  },
];