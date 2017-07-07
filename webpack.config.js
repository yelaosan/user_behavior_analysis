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
      hot: true,
      inline: true,
      stats: { colors: true },
      proxy: {
            // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
            '*': { 
                target: 'http://searchtouch.qunar.com',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            }
      }
  }
}