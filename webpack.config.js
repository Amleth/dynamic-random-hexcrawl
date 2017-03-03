const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, ''),
    historyApiFallback: true,
    hot: true,
    lazy: false,
    port: 9000,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: true
    }
  },
  //devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app', 'index.js'),
  module: {
    rules: [
      {
        test: /(\.js|.jsx$)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: true
  }
};
