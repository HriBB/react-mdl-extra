const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [{
      test  : /\.css$/,
      loader: 'style!css?sourceMap!postcss?sourceMap',
    },{
      test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000',
    }]
  },
  postcss: function() {
    return [
      require('autoprefixer'),
    ]
  },
};
