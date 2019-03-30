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
    // external: [ 'react' ], // <-- suppresses the warning
    output:[{
      exports: 'named',
      file: './semantic.umd.js',
      format: 'umd',
      name: 'semanticUI',
    }, {
      exports: 'named',
      file: './semantic.web.js',
      format: 'iife',
      name: 'semanticUI',
      globals: {
        'shallowEqual': 'shallowEqual',
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
        exclude: 'node_modules/@babel/runtime/**',
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
            'replacer': path.resolve(__dirname, 'test/mock/_mock_react-_classnames.js'),
          }, 'classname', ],
          ['babel-plugin-replace-imports', {
            'test': /shallowequal$/,
            'replacer': path.resolve(__dirname, 'test/mock/_mock_react-_shallowequal.js'),
          }, 'SHALLOW', ],
        ],
        // exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        // include: path.resolve(__dirname, '../../node_modules/semantic-ui-react'),
        // exclude: 'node_modules/@babel/runtime/**/*.js',
        // include: [
        //   'node_modules/object-assign/**',
        //   'node_modules/react/**',
        //   'node_modules/react-dom/**',
        //   'node_modules/react-is/**',
        //   'node_modules/@babel/**',
        //   'node_modules/debug/**',
        //   'node_modules/lodash/**',
        //   'node_modules/prop-types/**',
        //   'node_modules/@semantic-ui-react/**',
        // ],

        namedExports: {
          'node_modules/react/index.js': [
            'Children', 'Component', 'PropTypes', 'createElement', 'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect', 'useDebugValue', 'cloneElement', 'createRef', 'isValidElement', 'Fragment', 'PureComponent',
          ],
          // 'node_modules/lodash/index.js': [
          //   '_',
          //   'default',
          // ],
          ['node_modules/keyboard-key/src/keyboardKey.js']: [
            // 'keyboardKey',
            'default',
          ],
          ['node_modules/object-assign/index.js']: [
            // 'keyboardKey',
            'default',
          ],
          ['node_modules/react-dom/index.js']: [
            'findDOMNode',
            'createPortal',
          ],
          ['node_modules/react-is/index.js']: [
            'isForwardRef',
          ],
          // ['node_modules/shallowequal/index.js']: [
          //   'shallowEqual',
          // ],
          ['node_modules/classnames/index.js']: [
            'default',
          ],
          ['node_modules/prop-types/index.js']: [
            'func',
            'object',
            'oneOfType',
            'element',
          ],
          // [ 'node_modules/semantic-ui-react/src/addons/Pagination/PaginationItem.js' ]: [
          // // [ path.resolve(__dirname, '../../node_modules/semantic-ui-react/src/addons/Pagination/PaginationItem.js') ]: [
          //   // 'createShorthandFactory',
          //   'default',
          // ],

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