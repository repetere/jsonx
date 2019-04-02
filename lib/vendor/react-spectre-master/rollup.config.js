import path from 'path'
import glob from 'glob'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import { capitalize, get } from 'lodash'

// Read all public packages.
const pkgs = glob
  .sync(path.join(__dirname, './packages/*/package.json'))
  .map(pkg => ({
    filepath: pkg,
    source: require(pkg)
  }))
  .filter(pkg => get(pkg.source, 'publishConfig.access') === 'public')

// Export configuration for each package.
export default pkgs
  .map(pkg => {
    const dirpath = path.dirname(pkg.filepath)
    const input = path.join(dirpath, './src/index.js')
    const name = path.basename(path.dirname(dirpath))

    const configs = [
      {
        input,
        output: [
          // Browser config.
          {
            name: `ReactSpectre.${capitalize(name)}`,
            file: path.join(dirpath, pkg.source.browser),
            format: 'umd',
            sourcemap: true,
            globals: {
              react: 'React'
            }
          }
        ],
        external: ['react'],
        plugins: [
          babel({
            exclude: ['node_modules/**', 'packages/**/node_modules/**']
          }),
          resolve({
            customResolveOptions: {
              moduleDirectory: ['node_modules']
            }
          }),
          commonjs({
            include: /node_modules/
          }),
          replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          })
        ]
      },
      {
        input,
        output: [
          // Commonjs module config.
          {
            file: path.join(dirpath, pkg.source.main),
            format: 'cjs',
            sourcemap: true
          },
          // ES module config.
          {
            file: path.join(dirpath, pkg.source.module),
            format: 'es',
            sourcemap: true
          }
        ],
        external: [
          'react',
          'prop-types',
          'classnames',
          '@react-spectre/typography',
          '@react-spectre/table',
          '@react-spectre/button',
          '@react-spectre/form',
          '@react-spectre/icon',
          '@react-spectre/label',
          '@react-spectre/media',
          '@react-spectre/grid',
          '@react-spectre/navbar',
          '@react-spectre/accordion',
          '@react-spectre/autocomplete',
          '@react-spectre/avatar',
          '@react-spectre/badge',
          '@react-spectre/bar',
          '@react-spectre/toast'
        ],
        plugins: [babel(), resolve()]
      }
    ]

    if (process.env.NODE_ENV === 'production') {
      configs.forEach(config => {
        config.plugins.push(uglify({}, minify))
      })
    }

    return configs
  })
  .reduce((p, c) => p.concat(c))
