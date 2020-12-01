const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'app': path.resolve(__dirname, '../app'),
      'src': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'awesome-typescript-loader',
      }],
    }],
  },
  output: {
    path: path.join(__dirname, '..', 'output', 'main'),
    filename: '[name].js',
  },
  // https://webpack.js.org/configuration/node/
  // 避免webpack配置导致的__dirname和__filename和实际输出文件的不一致
  node: {
    __dirname: false,
    __filename: false,
  },
  // 启用source-map
  devtool: 'source-map',
  plugins: [
  ]
};