const webpack = require('webpack');
const pkg = require('./package.json');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.jsx',
    './src/css/main.less'
  ],
  output: {
    filename: 'bundle.js', //this is the default name, so you can skip it
    //at this directory our bundle file will be available
    //make sure port 8090 is used when launching webpack-dev-server
    publicPath: 'http://localhost:8090/assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src|index\.js/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { 
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      { test: /\.(woff|woff2|eot|ttf)$/, 
        loader: 'url-loader?limit=100000'
      },
      { test: /\.png$/, loader: "file-loader" },
      { test: /\.gif$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.jpg$/, loader: "file-loader" }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin( "main.css" )
  ],
  debug: false
};

