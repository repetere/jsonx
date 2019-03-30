// $ rollup --config test/mock/rollup-semantic.config.js 
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
// import alias from 'rollup-plugin-alias';
import { terser, } from 'rollup-plugin-terser';
// const inputPath = path.resolve(__dirname, 'node_modules/semantic-ui-react/src');

export default [
  // browser-friendly UMD build
  {
    // input: inputPath, //'node_modules/semantic-ui-react/src',
    input: './node_modules/semantic-ui-react/src',
    external: [ 'react', 'react-dom', ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: './design/semantic.umd.js',
      format: 'umd',
      name: 'SemanticUI',
      globals: {
        'react':'React',
        'react-dom':'ReactDOM',
      },
    }, {
      exports: 'named',
      file: './design/semantic.web.js',
      format: 'iife',
      name: 'SemanticUI',
      globals: {
        'react':'React',
        'react-dom':'ReactDOM',
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
        exclude: [
          'node_modules/@babel/runtime/**',
          'node_modules/classnames/**',
          'node_modules/keyboard-key/**',
          'node_modules/semantic-ui-react/node_modules/@babel/runtime/**',
          'node_modules/shallowequal/**',
        ],
        runtimeHelpers: true,
        'presets': [
          ['@babel/env', { },],
          ['@babel/preset-react', { }, 'reactpreset', ],
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
          [
            '@babel/plugin-proposal-class-properties',
          ],
          [
            '@babel/plugin-syntax-dynamic-import',
          ],
          ['babel-plugin-replace-imports', {
            'test': /lodash$/,
            'replacer': 'lodash-es',
          },],
          ['babel-plugin-replace-imports', {
            'test': /classnames$/,
            'replacer': path.resolve(__dirname, 'class_names_replacement.js'),
          }, 'classname', ],
          // ['babel-plugin-replace-imports', {
          //   'test': /shallowequal$/,
          //   'replacer': path.resolve(__dirname, 'test/mock/_mock_react-_shallowequal.js'),
          // }, 'SHALLOW', ],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        namedExports: {
          // 'node_modules/react/index.js': [
          //   'Children', 'Component', 'PropTypes', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'cloneElement', 'createRef', 'isValidElement', 'Fragment', 'PureComponent',
          // ],
          // ['node_modules/keyboard-key/src/keyboardKey.js']: [
          //   // 'keyboardKey',
          //   'default',
          // ],
          // ['node_modules/object-assign/index.js']: [
          //   // 'keyboardKey',
          //   'default',
          // ],
          // ['node_modules/react-dom/index.js']: [
          //   'findDOMNode',
          //   'createPortal',
          // ],
          ['node_modules/react-is/index.js']: [
            'isForwardRef',
          ],
          // ['node_modules/classnames/index.js']: [
          //   'default',
          // ],
          ['node_modules/prop-types/index.js']: [
            'func',
            'object',
            'oneOfType',
            'element',
          ],
        },
      }), // so Rollup can convert `ms` to an ES module
      globals({
      }),
      terser({
        sourcemap: true,
      }),
    ],
  },
];