const path = require('path');

module.exports = {
  entry: {
    'my-stock-assistant-react': './src/index.jsx',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src|index\.js/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      index: '/example/',
    },
  },
  devtool: 'sourcemap',
  debug: true,
};
