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
    input: './design/spectre.ts',
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
        extensions: ['.js', '.ts'],
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