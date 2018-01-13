import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
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
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          // 'node_modules/ml-array-utils/src/index.js': [ 'scale' ]
        },
      }), // so Rollup can convert `ms` to an ES module
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
    // external: ['ms'],
    external: ['react',], // <-- suppresses the warning
    output: [
      {
        name: 'rjx',
        exports: 'named',
        file: pkg.main, format: 'cjs',
      },
      {
        name: 'rjx',
        exports: 'named',
        file: pkg.module, format: 'es',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
    ],
    watch: {
      include: 'src/**',
    },
  },
];