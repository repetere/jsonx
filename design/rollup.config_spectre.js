// $ rollup --config test/mock/rollup-semantic.config.js 
// import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
// import alias from 'rollup-plugin-alias';
// import { terser, } from 'rollup-plugin-terser';
import terser from 'rollup-plugin-terser-js';
// const inputPath = path.resolve(__dirname, 'node_modules/semantic-ui-react/src');

export default [
  // browser-friendly UMD build
  {
    // input: inputPath, //'node_modules/semantic-ui-react/src',
    input: './design/spectre.js',
    external: ['react',], // <-- suppresses the warning
    output: [
      {
        exports: 'named',
        file: './design/spectre.umd.js',
        format: 'umd',
        name: 'Spectre',
        globals: {
          'react':'React',
        },
      },
      {
        exports: 'named',
        file: './design/spectre.web.js',
        format: 'iife',
        name: 'Spectre',
        globals: {
          'react':'React',
        },
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
      babel({
        exclude: ['node_modules/@babel/runtime/**','node_modules/classnames/**',],
        runtimeHelpers: true,
        'presets': [
          ['@babel/env', { }, ],
          ['@babel/preset-react', { }, 'reactpreset',],
        ],
        plugins: [
          [
            '@babel/transform-runtime',
          ],
          [
            '@babel/plugin-proposal-export-default-from',
          ],
          [
            '@babel/plugin-proposal-export-namespace-from',
          ],
          // ['babel-plugin-replace-imports', {
          //   'test': /classnames$/,
          //   'replacer': path.resolve(__dirname, 'test/mock/_mock_react-_classnames.js'),
          // }, 'classname-replace',],
          // ['babel-plugin-replace-imports', {
          //   'test': /shallowequal$/,
          //   'replacer': path.resolve(__dirname, 'test/mock/_mock_react-_shallowequal.js'),
          // }, 'SHALLOW', ],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        namedExports: {
        },
      }), // so Rollup can convert `ms` to an ES module
      globals({
      }),
      terser({
        sourcemaps:true,
        compress:true,
        mangle:true,
        verbose:true,
      }),
    ],
  },
];