/* eslint-disable @typescript-eslint/no-var-requires */
const MinifyPlugin = require('babel-minify-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.ts',
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new MinifyPlugin()],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  target: 'node',
}
