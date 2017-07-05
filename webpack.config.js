//webpack中的配置
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],

  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}