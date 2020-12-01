const webpack = require("webpack");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  target: "electron-preload",
  entry: {
    preload: "./app/preload.ts",
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
  ],
});