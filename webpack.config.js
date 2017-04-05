const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
  // devtool: "inline-source-map",
  // devtool: "source-map",
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './assets/'),
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: "babel-loader"
      },
      {
        test: /\.(png|jpg)$/,
        use: "url-loader?limit=8192&name=./img/[hash:8].[name].[ext]"
        //小于8192字节的图片会被转换为base64编码加入css
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: 'file-loader?name=./fonts/[name].[ext]'
      }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.BannerPlugin('Created by Reddy Huang.')
  ]
};


module.exports = config;