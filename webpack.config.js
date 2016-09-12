var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;
var suffix = env === 'production' ? '.min' : '';
var filename = `react-mdl-selectfield${suffix}`;

var config = {
  entry: [
    path.resolve(__dirname, 'src', 'index')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${filename}.js`,
    library: filename,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.css'],
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    },{
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass'),
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new ExtractTextPlugin(`${filename}.css`)
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  )
}

module.exports = config
