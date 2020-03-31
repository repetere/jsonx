import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';
import terser from 'rollup-plugin-terser-js';
import sucrase from '@rollup/plugin-sucrase';

export default [
  // browser-friendly UMD build
  {
    // input: inputPath, //'node_modules/semantic-ui-react/src',
    input: './node_modules/semantic-ui-react/dist/es',
    // input: './node_modules/semantic-ui-react/src',
    external: [ 'react', 'react-dom', ], // <-- suppresses the warning
    output: [
      {
        exports: 'named',
        file: './design/semantic.umd.js',
        format: 'umd',
        name: 'SemanticUI',
        globals: {
          'react':'React', 'react-dom':'ReactDOM',
        },
      },
      {
        exports: 'named',
        file: './design/semantic.web.js',
        format: 'iife',
        name: 'SemanticUI',
        globals: {
          'react':'React', 'react-dom':'ReactDOM',
        },
      },
    ],
    plugins: [
      sucrase({
        // exclude: ['node_modules/**'],
        transforms: ['jsx','typescript']
      }),
      typescript({
        noEmitOnError: false,
        declaration: false,
        declarationDir: null,
        // typeRoots: ['./design'],
      }),
      replace({
        // 'process.env.NODE_ENV': JSON.stringify( 'development' ),
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
      }),
      resolve({
        preferBuiltins: true,
      }), // so Rollup can find `ms`
      builtins({
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