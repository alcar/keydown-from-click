/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.ts',
  externals: [nodeExternals()],
  externalsPresets: { node: true },
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
