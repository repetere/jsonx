import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
// import alias from 'rollup-plugin-alias';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    // external: [ 'react' ], // <-- suppresses the warning
    output: {
      exports: 'named',
      file: pkg.browser,
      format: 'umd',
      name: 'rjx',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
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
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          // 'node_modules/ml-array-utils/src/index.js': [ 'scale' ]
        },
      }), // so Rollup can convert `ms` to an ES module
      globals({
      }),
    ],
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
];