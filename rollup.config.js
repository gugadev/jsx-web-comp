import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const paths = {
  source: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  example: path.resolve(__dirname, 'example', 'src')
}

const extensions = [
  '.ts', '.js'
]

const basePlugins = [
  resolve({
    extensions,
    mainFields: ['module']
  }),
  commonjs(),
  typescript(),
  terser()
]

export default [
  {
    input: path.resolve(paths.source, 'index.ts'),
    output: {
      file: path.resolve(paths.dist, 'index.js'),
      format: 'cjs'
    },
    plugins: [
      ...basePlugins,
      typescript({
        target: 'es5',
        module: 'commonjs'
      })
    ]
  },
  {
    input: path.resolve(paths.source, 'web-component.ts'),
    output: {
      file: path.resolve(paths.example, 'web-component.js'),
      format: 'esm'
    },
    plugins: basePlugins
  }
]
