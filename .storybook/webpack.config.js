const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [{
      test  : /\.(scss|css)$/,
      loader: 'style!css?sourceMap!postcss!sass?sourceMap'
    },{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },{
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  }
};
