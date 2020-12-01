const webpack = require('webpack')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  // https://webpack.js.org/configuration/target/
  // webpack可以针对多种环境或目标进行编译，包括electron-main和electron-preload。
  target: 'electron-main',
  entry: {
    index: './app/index.ts',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
})